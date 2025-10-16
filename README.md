# Reese Shu Portfolio Clone

這是一個使用現代技術堆疊複製 Reese Shu 個人作品集網站的專案。

## 技術堆疊

- **Next.js** — React 框架，提供 SSR、SSG 和 App Router
- **Tailwind CSS** — 實用優先的 CSS 框架
- **TypeScript** — 型別安全的 JavaScript
- **Redux Toolkit** — 狀態管理
- **Goober** — 輕量級 CSS-in-JS 庫
- **PWA** — 漸進式網頁應用程式
- **Google Tag Manager** — 標籤管理
- **Google Analytics** — 網站分析
- **HSTS** — HTTP 嚴格傳輸安全
- **Vercel** — 部署平台

## 功能特色

- ✅ 響應式設計
- ✅ 深色/淺色主題切換
- ✅ 平滑滾動導航
- ✅ 動畫效果
- ✅ PWA 支援
- ✅ SEO 優化
- ✅ 安全標頭
- ✅ HTTPS 強制重定向
- ✅ 效能優化
- ✅ 無障礙設計

## 快速開始

### 安裝依賴

```bash
npm install
```

### 設定環境變數

複製 `env.example` 到 `.env.local` 並填入你的設定：

```bash
cp env.example .env.local
```

編輯 `.env.local`：

```env
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FLOODLIGHT_ID=XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_FORCE_HTTPS=true
```

**重要**：`NEXT_PUBLIC_SITE_URL` 必須使用 HTTPS 協議，這將用於 HTTPS 重定向功能。

### 開發模式

```bash
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000) 查看結果。

### 建置生產版本

```bash
npm run build
npm start
```

## 部署到 Vercel

1. 將專案推送到 GitHub
2. 在 [Vercel](https://vercel.com) 匯入專案
3. 設定環境變數
4. 部署

或使用 Vercel CLI：

```bash
npm i -g vercel
vercel
```

## 專案結構

```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx       # 根佈局
│   ├── page.tsx         # 首頁
│   └── globals.css      # 全域樣式
├── components/          # React 組件
│   ├── Header.tsx      # 導航列
│   ├── Hero.tsx         # 首頁橫幅
│   ├── About.tsx        # 關於我
│   ├── Experience.tsx   # 工作經驗
│   ├── Work.tsx         # 作品集
│   ├── Contact.tsx      # 聯絡方式
│   ├── Footer.tsx       # 頁尾
│   ├── Providers.tsx    # Redux Provider
│   ├── ThemeWrapper.tsx # 主題包裝器
│   └── GTM.tsx          # Google Tag Manager
└── store/               # Redux 狀態管理
    ├── store.ts         # Redux store
    └── slices/          # Redux slices
        ├── themeSlice.ts
        └── navigationSlice.ts
```

## 自訂

### 修改內容

編輯各個組件檔案來修改內容：

- `src/components/Hero.tsx` - 首頁內容
- `src/components/About.tsx` - 關於我內容
- `src/components/Experience.tsx` - 工作經驗
- `src/components/Work.tsx` - 作品集專案

### 修改樣式

- 編輯 `tailwind.config.ts` 來自訂主題
- 修改 `src/app/globals.css` 來添加自訂樣式
- 使用 Goober 在組件中添加動態樣式

### 修改顏色主題

在 `tailwind.config.ts` 中修改 `colors` 設定：

```typescript
colors: {
  primary: {
    // 你的主要顏色
  }
}
```

## 效能優化

- 使用 Next.js Image 組件優化圖片
- 實作 PWA 快取策略
- 使用 React.memo 和 useMemo 優化渲染
- 實作虛擬滾動（如需要）

## HTTPS 重定向設定

專案已配置自動將所有 HTTP 請求重定向到 HTTPS：

### 重定向機制

1. **Next.js 中間件** (`src/middleware.ts`)
   - 檢查 `x-forwarded-proto` 標頭
   - 自動重定向 HTTP 請求到 HTTPS
   - 使用 301 永久重定向

2. **Next.js 配置** (`next.config.js`)
   - 基於環境變數的動態重定向
   - 支援自定義域名

3. **Vercel 配置** (`vercel.json`)
   - 平台層級的重定向設定
   - 使用 `$VERCEL_URL` 變數

### 安全標頭

專案包含以下安全標頭：

- HSTS (HTTP Strict Transport Security)
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy
- Content-Security-Policy (upgrade-insecure-requests)

## 瀏覽器支援

- Chrome (最新)
- Firefox (最新)
- Safari (最新)
- Edge (最新)

## 授權

MIT License

## 貢獻

歡迎提交 Issue 和 Pull Request！

## 聯絡

如有問題，請透過 GitHub Issues 聯絡。