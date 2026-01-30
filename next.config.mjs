/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. 开启静态导出（构建后生成 out 文件夹）
  output: 'export',
  
  // 2. 必须配置！告诉项目它跑在 /codingsphere 下
  basePath: '/codingsphere',
  
  // 3. TypeScript 配置
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // 4. 必须配置！纯静态模式不支持 Next 自带的图片服务器优化
  images: {
    unoptimized: true,
  },
}

export default nextConfig
