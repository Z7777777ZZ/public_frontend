# 项目架构文档

## 目录结构说明

本项目使用 Next.js 14+ App Router 架构，目录结构经过优化，清晰分离了路由定义和 UI 组件。

### 核心概念

- **`app/` 目录**：定义路由和页面结构（对应 URL）
- **`components/` 目录**：存放所有可复用的 UI 组件（不影响路由）

---

## App 目录结构

```
app/
├── page.tsx                    # 首页路由: /
├── layout.tsx                  # 根布局（应用于所有页面）
├── (public)/                   # 路由组（括号表示不影响 URL）
│   ├── layout.tsx             # 公共页面的共享布局
│   ├── blog/
│   │   ├── page.tsx           # 博客列表: /blog
│   │   ├── loading.tsx        # 加载状态
│   │   └── [postSlug]/        # 动态路由
│   │       └── page.tsx       # 博客文章: /blog/:postSlug
│   ├── projects/
│   │   ├── page.tsx           # 项目页: /projects
│   │   └── loading.tsx
│   ├── workbench/
│   │   ├── page.tsx           # 工作台: /workbench
│   │   └── loading.tsx
│   ├── notes/
│   │   └── page.tsx           # 笔记页: /notes
│   └── introduction/
│       └── page.tsx           # 介绍页: /introduction
├── error.tsx                   # 全局错误页
├── not-found.tsx              # 404 页面
└── globals.css                # 全局样式
```

### App 目录职责
- ✅ 定义路由结构（文件夹结构 = URL）
- ✅ 组合 components 中的 UI 组件
- ✅ 定义页面 metadata（SEO）
- ✅ 数据获取（Server Components）
- ❌ 不应包含复杂的 UI 实现

---

## Components 目录结构

```
components/
├── layout/                     # 布局相关组件
│   ├── header.tsx             # 全局导航栏
│   ├── footer.tsx             # 全局页脚
│   └── cursor-glow.tsx        # 光标特效
│
├── home/                       # 首页专用组件
│   ├── hero-section.tsx       # 英雄区域（打字机效果）
│   ├── projects-grid.tsx      # 项目展示网格
│   ├── lab-notes.tsx          # 实验室笔记预览
│   └── workbench.tsx          # 工作台预览
│
├── blog/                       # Blog 页面组件
│   ├── blog-hero.tsx          # Blog 英雄区域
│   ├── blog-list.tsx          # 博客文章列表
│   ├── blog-post-content.tsx  # 单篇文章内容
│   └── blog-sidebar.tsx       # 侧边栏
│
├── projects/                   # Projects 页面组件
│   └── projects-page-content.tsx
│
├── workbench/                  # Workbench 页面组件
│   └── workbench-page-content.tsx
│
├── notes/                      # Notes 页面组件
│   └── notes-page-content.tsx
│
├── theme/                      # 主题相关组件
│   ├── theme-provider.tsx     # 主题上下文提供者
│   ├── theme-toggle.tsx       # 明暗模式切换
│   └── theme-changer.tsx      # 主题颜色选择器
│
└── ui/                         # 基础 UI 组件库 (shadcn/ui)
    ├── button.tsx
    ├── card.tsx
    ├── dialog.tsx
    └── ...（60+ 组件）
```

### Components 目录职责
- ✅ 实现具体的 UI 逻辑和样式
- ✅ 状态管理和用户交互
- ✅ 可复用的组件封装
- ❌ 不定义路由
- ❌ 不定义 metadata

---

## 页面组成示例

### 首页 (`/`)

**文件**: `app/page.tsx`

**组成部分**:
```typescript
import { Header } from "@/components/layout/header"
import { HeroSection } from "@/components/home/hero-section"
import { ProjectsGrid } from "@/components/home/projects-grid"
import { LabNotes } from "@/components/home/lab-notes"
import { Workbench } from "@/components/home/workbench"
import { Footer } from "@/components/layout/footer"
import { CursorGlow } from "@/components/layout/cursor-glow"
```

**结构**:
1. `CursorGlow` - 鼠标光标跟随特效
2. `Header` - 顶部导航栏
3. `HeroSection` - 英雄区域（标题、打字机效果、介绍）
4. `ProjectsGrid` - 精选项目展示（可筛选）
5. `LabNotes` - 技术笔记预览
6. `Workbench` - 进行中的项目
7. `Footer` - 页脚（联系方式、社交链接）

---

### Blog 页面 (`/blog`)

**文件**: `app/(public)/blog/page.tsx`

**继承布局**: `app/(public)/layout.tsx`（已包含 Header, Footer, CursorGlow）

**额外组成部分**:
```typescript
import { BlogHero } from "@/components/blog/blog-hero"
import { BlogList } from "@/components/blog/blog-list"
import { BlogSidebar } from "@/components/blog/blog-sidebar"
```

**结构**:
1. Header (来自 layout)
2. `BlogHero` - Blog 页面英雄区域
3. `BlogList` - 博客文章列表（主内容区）
4. `BlogSidebar` - 侧边栏（分类、标签、搜索）
5. Footer (来自 layout)

---

### Blog 文章详情页 (`/blog/:slug`)

**文件**: `app/(public)/blog/[postSlug]/page.tsx`

**组成部分**:
```typescript
import { BlogPostContent } from "@/components/blog/blog-post-content"
```

**结构**:
1. Header (来自 layout)
2. `BlogPostContent` - 文章内容（标题、作者、日期、正文、标签）
3. Footer (独立导入，不同样式)

---

### Projects 页面 (`/projects`)

**文件**: `app/(public)/projects/page.tsx`

**组成部分**:
```typescript
import { ProjectsPageContent } from "@/components/projects/projects-page-content"
```

**结构**:
1. Header (来自 layout)
2. `ProjectsPageContent` - 项目详细列表和筛选
3. Footer (来自 layout)

---

### Workbench 页面 (`/workbench`)

**文件**: `app/(public)/workbench/page.tsx`

**组成部分**:
```typescript
import { WorkbenchPageContent } from "@/components/workbench/workbench-page-content"
```

**结构**:
1. Header (来自 layout)
2. `WorkbenchPageContent` - 进行中项目的详细信息
3. Footer (来自 layout)

---

## 布局系统

### 根布局 (`app/layout.tsx`)
- 应用于所有页面
- 提供 ThemeProvider
- 配置字体和全局样式
- 包含 Analytics

### 公共页面布局 (`app/(public)/layout.tsx`)
- 应用于 `/blog`, `/projects`, `/workbench`, `/notes` 等页面
- 自动添加 Header, Footer, CursorGlow
- 统一的页面容器样式

### 首页特殊处理
- 首页 (`app/page.tsx`) **不使用** `(public)/layout.tsx`
- 直接导入所有需要的组件
- 可以自定义每个部分的顺序和样式

---

## 导入路径规范

### 使用 `@/` 别名（推荐）
```typescript
// ✅ 推荐：使用路径别名
import { Header } from "@/components/layout/header"
import { BlogHero } from "@/components/blog/blog-hero"
import { cn } from "@/lib/utils"
```

### 相对路径（特殊情况）
```typescript
// ⚠️ 仅用于同目录下的组件
// components/layout/header.tsx
import { ThemeToggle } from "../theme/theme-toggle"
```

---

## 组件命名规范

### 文件命名
- 使用 `kebab-case`：`hero-section.tsx`
- 组件名使用 `PascalCase`：`HeroSection`

### 目录组织
- 按**功能模块**分组，不按技术类型
- ✅ 好：`components/blog/`, `components/home/`
- ❌ 差：`components/sections/`, `components/widgets/`

---

## 数据流

```
app/page.tsx
  ↓ (props)
components/home/projects-grid.tsx
  ↓ (state)
Client-side state (useState, useEffect)
```

### 数据获取位置
- **Server Components** (app/*.tsx)：数据库查询、API 调用
- **Client Components** (components/*.tsx)：用户交互、动态状态

---

## 样式系统

- **Tailwind CSS**：主要样式方案
- **CSS Variables**：主题颜色定义在 `app/globals.css`
- **`cn()` 工具**：条件样式合并（来自 `@/lib/utils`）

```typescript
import { cn } from "@/lib/utils"

<div className={cn(
  "base-styles",
  isActive && "active-styles",
  className
)} />
```

---

## 优化建议

### 性能优化
1. 使用 `loading.tsx` 提供加载状态
2. 图片使用 Next.js `<Image>` 组件
3. 动态导入大型组件：`const Component = dynamic(() => import('./heavy'))`

### 代码组织
1. 保持 `app/*.tsx` 文件简洁（< 50 行）
2. 复杂逻辑封装到 `components/` 或 `lib/`
3. 共享类型定义放在 `types/` 目录

### SEO 优化
1. 每个页面定义 `metadata`
2. 使用 `generateMetadata` 处理动态页面
3. 添加 Structured Data (JSON-LD)

---

## 常见问题

### Q: 为什么首页不用 `(public)/layout.tsx`？
A: 首页需要特殊的布局和顺序，不适合共享布局。可以根据需要调整。

### Q: `components/home/` 和 `components/projects/` 的区别？
A: 
- `home/`：首页的**预览**组件（如 `projects-grid.tsx` 显示精选项目）
- `projects/`：独立页面的**完整**组件（如 `projects-page-content.tsx` 显示所有项目）

### Q: 什么时候使用 `"use client"`？
A: 
- ✅ 需要 hooks (useState, useEffect)
- ✅ 需要浏览器 API (window, document)
- ✅ 需要事件处理 (onClick, onChange)
- ❌ 纯展示组件可以是 Server Component

---

## 相关文档

- [Next.js App Router 文档](https://nextjs.org/docs/app)
- [shadcn/ui 组件库](https://ui.shadcn.com/)
- [Tailwind CSS 文档](https://tailwindcss.com/)

