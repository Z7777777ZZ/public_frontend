# 📁 项目目录结构

## 完整目录树

\`\`\`
public_frontend/
├── 📂 app/                          # Next.js App Router (路由定义)
│   ├── 📄 page.tsx                 # 首页 /
│   ├── 📄 layout.tsx               # 根布局
│   ├── 📄 globals.css              # 全局样式
│   ├── 📄 error.tsx                # 全局错误页
│   ├── 📄 not-found.tsx            # 404 页面
│   ├── 📄 robots.ts                # robots.txt 生成器
│   ├── 📄 sitemap.ts               # sitemap.xml 生成器
│   └── 📂 (public)/                # 路由组（不影响 URL）
│       ├── 📄 layout.tsx           # 公共页面布局
│       ├── 📄 error.tsx            # 错误处理
│       ├── 📂 blog/                # 博客模块 /blog
│       │   ├── 📄 page.tsx
│       │   ├── 📄 loading.tsx
│       │   └── 📂 [postSlug]/      # 动态路由
│       │       ├── 📄 page.tsx
│       │       └── 📄 loading.tsx
│       ├── 📂 projects/            # 项目页 /projects
│       │   ├── 📄 page.tsx
│       │   └── 📄 loading.tsx
│       ├── 📂 workbench/           # 工作台 /workbench
│       │   ├── 📄 page.tsx
│       │   └── 📄 loading.tsx
│       ├── 📂 notes/               # 笔记 /notes
│       │   └── 📄 page.tsx
│       └── 📂 introduction/        # 介绍 /introduction
│           └── 📄 page.tsx
│
├── 📂 components/                   # React 组件库
│   ├── 📂 layout/                  # 布局组件
│   │   ├── 📄 header.tsx           # 全局导航栏
│   │   ├── 📄 footer.tsx           # 全局页脚
│   │   └── 📄 cursor-glow.tsx      # 光标特效
│   │
│   ├── 📂 home/                    # 首页组件
│   │   ├── 📄 hero-section.tsx     # 英雄区域
│   │   ├── 📄 projects-grid.tsx    # 项目网格预览
│   │   ├── 📄 lab-notes.tsx        # 笔记预览
│   │   └── 📄 workbench.tsx        # 工作台预览
│   │
│   ├── 📂 blog/                    # 博客组件
│   │   ├── 📄 blog-hero.tsx        # Blog 英雄区域
│   │   ├── 📄 blog-list.tsx        # 文章列表
│   │   ├── 📄 blog-post-content.tsx # 文章详情
│   │   └── 📄 blog-sidebar.tsx     # 侧边栏
│   │
│   ├── 📂 projects/                # 项目页组件
│   │   └── 📄 projects-page-content.tsx
│   │
│   ├── 📂 workbench/               # 工作台组件
│   │   └── 📄 workbench-page-content.tsx
│   │
│   ├── 📂 notes/                   # 笔记组件
│   │   └── 📄 notes-page-content.tsx
│   │
│   ├── 📂 theme/                   # 主题系统
│   │   ├── 📄 theme-provider.tsx   # 主题上下文
│   │   ├── 📄 theme-toggle.tsx     # 明暗切换
│   │   └── 📄 theme-changer.tsx    # 颜色选择
│   │
│   └── 📂 ui/                      # shadcn/ui 基础组件
│       ├── 📄 button.tsx
│       ├── 📄 card.tsx
│       ├── 📄 dialog.tsx
│       └── ... (60+ 组件)
│
├── 📂 lib/                         # 工具函数和配置
│   ├── 📄 utils.ts                 # 通用工具 (cn 函数等)
│   ├── 📄 blog-data.tsx            # 博客数据
│   ├── 📄 themes.ts                # 主题配置
│   └── 📄 structured-data.ts       # SEO 结构化数据
│
├── 📂 hooks/                       # 自定义 React Hooks
│   ├── 📄 use-mobile.ts
│   └── 📄 use-toast.ts
│
├── 📂 types/                       # TypeScript 类型定义
│   └── 📄 css.d.ts
│
├── 📂 public/                      # 静态资源
│   ├── 📄 og-image.png             # Open Graph 图片
│   ├── 📄 icon.svg                 # 网站图标
│   └── 📂 og-images/               # 各页面 OG 图片
│
├── 📂 docs/                        # 项目文档
│   ├── 📄 architecture.md
│   ├── 📄 development.md
│   ├── 📄 deployment.md
│   └── 📄 performance.md
│
├── 📄 ARCHITECTURE.md              # 架构说明文档
├── 📄 STRUCTURE.md                 # 本文件
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 next.config.mjs
├── 📄 tailwind.config.ts
└── 📄 README.md
\`\`\`

---

## 📊 目录分类说明

### 🎯 核心目录

| 目录 | 用途 | 说明 |
|------|------|------|
| \`app/\` | 路由定义 | Next.js App Router，文件结构对应 URL |
| \`components/\` | UI 组件 | 可复用的 React 组件，不影响路由 |
| \`lib/\` | 工具函数 | 通用逻辑、配置、数据处理 |

### 🧩 组件分类

| 组件类型 | 目录 | 示例 |
|---------|------|------|
| 布局组件 | \`components/layout/\` | Header, Footer |
| 页面组件 | \`components/home/\`, \`components/blog/\` | 特定页面的内容组件 |
| 主题组件 | \`components/theme/\` | 主题切换、颜色选择 |
| 基础组件 | \`components/ui/\` | Button, Card, Dialog |

---

## 🗺️ 路由映射表

| URL | 文件路径 | 主要组件 |
|-----|---------|---------|
| \`/\` | \`app/page.tsx\` | HeroSection, ProjectsGrid, LabNotes, Workbench |
| \`/blog\` | \`app/(public)/blog/page.tsx\` | BlogHero, BlogList, BlogSidebar |
| \`/blog/:slug\` | \`app/(public)/blog/[postSlug]/page.tsx\` | BlogPostContent |
| \`/projects\` | \`app/(public)/projects/page.tsx\` | ProjectsPageContent |
| \`/workbench\` | \`app/(public)/workbench/page.tsx\` | WorkbenchPageContent |
| \`/notes\` | \`app/(public)/notes/page.tsx\` | NotesPageContent |
| \`/introduction\` | \`app/(public)/introduction/page.tsx\` | 自定义内容 |

---

## 🎨 样式系统

### 样式层级
1. **全局样式**: \`app/globals.css\`
2. **Tailwind 配置**: \`tailwind.config.ts\`
3. **组件样式**: 内联 Tailwind classes
4. **CSS 变量**: 主题颜色定义

### 主题系统
- **Provider**: \`components/theme/theme-provider.tsx\`
- **配置**: \`lib/themes.ts\`
- **切换器**: \`components/theme/theme-toggle.tsx\`

---

## 📦 依赖关系

\`\`\`
app/page.tsx
  ├── components/layout/header.tsx
  │   ├── components/theme/theme-toggle.tsx
  │   └── components/theme/theme-changer.tsx
  ├── components/home/hero-section.tsx
  ├── components/home/projects-grid.tsx
  ├── components/home/lab-notes.tsx
  ├── components/home/workbench.tsx
  └── components/layout/footer.tsx

app/(public)/blog/page.tsx
  ├── components/blog/blog-hero.tsx
  ├── components/blog/blog-list.tsx
  └── components/blog/blog-sidebar.tsx
\`\`\`

---

## 🔄 重构对比

### ❌ 旧结构（混乱）
\`\`\`
components/
├── header.tsx                    # 布局组件？
├── hero-section.tsx              # 首页组件？
├── projects-grid.tsx             # 通用组件？
├── theme-provider.tsx            # 主题组件？
└── public/                       # 为什么叫 public？
    └── blog/
        └── blog-hero.tsx
\`\`\`

### ✅ 新结构（清晰）
\`\`\`
components/
├── layout/                       # 明确：布局相关
│   └── header.tsx
├── home/                         # 明确：首页专用
│   └── hero-section.tsx
├── blog/                         # 明确：博客页面
│   └── blog-hero.tsx
└── theme/                        # 明确：主题系统
    └── theme-provider.tsx
\`\`\`

---

## 📝 命名规范

### 文件命名
- **组件文件**: \`kebab-case.tsx\` (例: \`hero-section.tsx\`)
- **工具文件**: \`kebab-case.ts\` (例: \`use-mobile.ts\`)
- **类型文件**: \`kebab-case.d.ts\` (例: \`css.d.ts\`)

### 组件命名
- **组件名**: \`PascalCase\` (例: \`HeroSection\`)
- **函数名**: \`camelCase\` (例: \`getPostBySlug\`)
- **常量名**: \`UPPER_SNAKE_CASE\` (例: \`SITE_URL\`)

---

## 🚀 开发指南

### 添加新页面
1. 在 \`app/\` 创建路由文件
2. 在 \`components/\` 创建对应组件目录
3. 更新此文档的路由映射表

### 添加新组件
1. 确定组件类型（layout/home/blog 等）
2. 放入对应的 \`components/\` 子目录
3. 使用 \`@/components/...\` 导入

### 修改主题
1. 编辑 \`lib/themes.ts\`
2. 更新 \`app/globals.css\` 的 CSS 变量
3. 测试 \`theme-toggle.tsx\` 和 \`theme-changer.tsx\`

---

## 📚 相关文档

- 📖 [架构说明](./ARCHITECTURE.md) - 详细的架构设计文档
- 🛠️ [开发指南](./docs/development.md) - 本地开发环境配置
- 🚀 [部署指南](./docs/deployment.md) - 生产环境部署流程
- ⚡ [性能优化](./docs/performance.md) - 性能优化建议

---

**最后更新**: 2026-01-10
