/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. 开启静态导出（构建后生成 out 文件夹）
  output: 'export',
  
  // 2. 部署到子路径时取消注释（部署到服务器 /codingsphere 路径时使用）
  basePath: '/codingsphere',
  
  // 3. TypeScript 配置
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // 4. 必须配置！纯静态模式不支持 Next 自带的图片服务器优化
  images: {
    unoptimized: true,
  },
  
  // 5. 禁用实验性功能避免字体加载问题
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

export default nextConfig
