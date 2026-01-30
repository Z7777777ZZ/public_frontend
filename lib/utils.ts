import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 获取静态资源的完整路径
 * 在生产环境下会自动添加 basePath 前缀
 * @param path - 资源路径（以 / 开头）
 * @returns 完整的资源路径
 */
export function getAssetPath(path: string): string {
  // 如果路径已经包含 http:// 或 https://，直接返回
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }
  
  // 在生产环境下添加 basePath
  const basePath = process.env.NODE_ENV === 'production' ? '/codingsphere' : ''
  
  // 确保路径以 / 开头
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  
  return `${basePath}${normalizedPath}`
}
