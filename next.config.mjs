/** @type {import('next').NextConfig} */

// 判断是否为生产环境构建
const isProduction = process.env.NODE_ENV === 'production'

const nextConfig = {
  // 1. 开启静态导出（构建后生成 out 文件夹）
  output: 'export',
  
  // 2. 仅在生产环境使用 basePath（开发环境直接访问 localhost:3000）
  ...(isProduction && { basePath: '/codingsphere' }),
  
  // 3. 环境变量（注入到客户端）
  env: {
    NEXT_PUBLIC_BASE_PATH: isProduction ? '/codingsphere' : '',
  },
  
  // 4. TypeScript 配置
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // 5. 必须配置！纯静态模式不支持 Next 自带的图片服务器优化
  images: {
    unoptimized: true,
  },
  
  // 6. 禁用实验性功能避免字体加载问题
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

export default nextConfig
