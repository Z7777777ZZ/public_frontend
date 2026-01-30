# 部署指南

## 配置说明

本项目支持两种运行模式：

### 1. 开发模式（Development）
- **访问地址**：`http://localhost:3000`
- **特点**：不使用 basePath，直接访问根路径
- **启动命令**：`pnpm dev`

### 2. 生产模式（Production）
- **访问地址**：`https://nb.zju.edu.cn/codingsphere`
- **特点**：使用 `/codingsphere` 作为 basePath
- **构建命令**：`pnpm build`

## 配置原理

在 `next.config.mjs` 中，我们使用环境变量来区分开发和生产环境：

```javascript
const isProduction = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: 'export',
  // 仅在生产环境使用 basePath
  ...(isProduction && { basePath: '/codingsphere' }),
  // ...其他配置
}
```

### 资源路径处理

- **Next.js Image 组件**：自动处理 basePath，无需手动修改
- **原生 video/audio 标签**：需要使用 `getAssetPath()` 工具函数

示例：
```tsx
import { getAssetPath } from "@/lib/utils"

// 在 video 标签中使用
<video>
  <source src={getAssetPath("/demo-video/sample.mp4")} />
</video>
```

## 本地开发

### 1. 安装依赖
```bash
pnpm install
```

### 2. 启动开发服务器
```bash
pnpm dev
```

### 3. 访问
打开浏览器访问 `http://localhost:3000`

**注意**：开发模式下直接访问 `localhost:3000` 即可，不需要加 `/codingsphere` 路径。

## 生产部署

### 1. 构建静态文件
```bash
pnpm build
```

这会在项目根目录生成 `out` 文件夹，包含所有静态文件。

### 2. 上传到服务器
将 `out` 文件夹的内容上传到 f9 服务器的指定目录：

```bash
# 示例：使用 scp 上传
scp -r out/* user@f9-server:/path/to/web/codingsphere/
```

### 3. Nginx 配置

在主服务器（nb.zju.edu.cn）上配置 Nginx 反向代理：

```nginx
# /etc/nginx/sites-available/nb.zju.edu.cn

server {
    listen 80;
    server_name nb.zju.edu.cn;

    # 转发到 f9 服务器
    location /codingsphere {
        proxy_pass http://f9-server-ip/codingsphere;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # 其他配置...
}
```

或者如果 f9 服务器直接提供静态文件：

```nginx
server {
    listen 80;
    server_name nb.zju.edu.cn;

    location /codingsphere {
        alias /path/to/web/codingsphere;
        try_files $uri $uri/ /codingsphere/index.html;
        
        # 处理静态资源
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|mp4)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

### 4. 重启 Nginx
```bash
sudo nginx -t  # 测试配置
sudo systemctl reload nginx
```

## 访问测试

### 开发环境
```bash
# 启动开发服务器
pnpm dev

# 访问
http://localhost:3000
```

### 生产环境
```bash
# 访问主页
https://nb.zju.edu.cn/codingsphere

# 访问其他页面
https://nb.zju.edu.cn/codingsphere/datasets
https://nb.zju.edu.cn/codingsphere/rank
```

## 常见问题

### Q1: 开发模式下访问 localhost:3000 显示 404
**A**: 确保你是在开发模式下运行（`pnpm dev`），而不是使用 `pnpm build` 后的构建文件。开发模式不会使用 basePath。

### Q2: 生产环境下图片/视频无法加载
**A**: 
- 检查 Next.js Image 组件是否正确使用
- 对于 video 标签，确保使用了 `getAssetPath()` 函数
- 检查 Nginx 配置是否正确

### Q3: 如何在本地测试生产环境的效果？
**A**: 构建后使用静态服务器：
```bash
pnpm build
npx serve out -p 3001
# 访问 http://localhost:3001/codingsphere
```

### Q4: 修改 basePath 后需要做什么？
**A**: 
1. 修改 `next.config.mjs` 中的 `basePath` 值
2. 修改 `lib/utils.ts` 中 `getAssetPath()` 函数的 basePath
3. 重新构建：`pnpm build`
4. 更新 Nginx 配置
5. 上传新的构建文件

## 目录结构

```
out/                          # 构建输出目录（生产环境）
├── _next/                   # Next.js 资源
├── demo-video/              # 视频文件
├── contributors/            # 贡献者图片
├── logos/                   # Logo 图片
├── index.html              # 主页
└── ...                     # 其他页面和资源
```

## 技术栈

- **框架**：Next.js 15 (静态导出模式)
- **部署方式**：静态文件部署
- **服务器**：Nginx (反向代理/静态文件服务)
- **域名**：nb.zju.edu.cn
- **子路径**：/codingsphere

## 更新流程

1. 本地开发和测试
2. 提交代码到 Git
3. 在服务器上拉取最新代码
4. 执行 `pnpm build`
5. 重启或重新加载 Nginx（如需要）

## 注意事项

⚠️ **重要提示**：
- 所有静态资源路径必须使用 `/` 开头的绝对路径
- video/audio 等原生 HTML 标签需要使用 `getAssetPath()` 函数
- 不要在路径中硬编码 `/codingsphere`，让配置自动处理
- 开发环境和生产环境使用不同的访问路径
