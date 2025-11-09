# Reese Shu Portfolio

This is Reese Shu's personal portfolio website built with modern technology stack.

## Technology Stack

- **Next.js** — React framework providing SSR, SSG and App Router
- **Tailwind CSS** — Utility-first CSS framework
- **TypeScript** — Type-safe JavaScript
- **Redux Toolkit** — State management
- **Goober** — Lightweight CSS-in-JS library
- **PWA** — Progressive Web Application
- **Google Tag Manager** — Tag management
- **Google Analytics** — Website analytics
- **HSTS** — HTTP Strict Transport Security
- **Vercel** — Deployment platform

## Features

- ✅ Responsive design
- ✅ Dark/light theme toggle
- ✅ Smooth scroll navigation
- ✅ Animation effects
- ✅ PWA support
- ✅ SEO optimization
- ✅ Security headers
- ✅ HTTPS force redirect
- ✅ Performance optimization
- ✅ Accessibility design

## Quick Start

### Install Dependencies

```bash
npm install
```

### Environment Variables Setup

Copy `env.example` to `.env.local` and fill in your settings:

```bash
cp env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FLOODLIGHT_ID=XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_FORCE_HTTPS=true
```

**Important**: `NEXT_PUBLIC_SITE_URL` must use HTTPS protocol, which will be used for HTTPS redirect functionality.

### Development Mode

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the result.

### Build Production Version

```bash
npm run build
npm start
```

## Deploy to GitHub Pages

This project is configured for GitHub Pages deployment using GitHub Actions:

1. Push the project to GitHub
2. Go to repository Settings → Pages
3. Under "Source", select "GitHub Actions"
4. The GitHub Actions workflow will automatically build and deploy on push to main branch

The site will be available at: `https://reeseshu.github.io/portfolio/`

### Deploy to Vercel (Alternative)

1. Push the project to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Set environment variables
4. Deploy

Or use Vercel CLI:

```bash
npm i -g vercel
vercel
```

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/          # React components
│   ├── Header.tsx      # Navigation bar
│   ├── Hero.tsx         # Home banner
│   ├── About.tsx        # About me
│   ├── Experience.tsx   # Work experience
│   ├── Work.tsx         # Portfolio
│   ├── Contact.tsx      # Contact
│   ├── Footer.tsx       # Footer
│   ├── Providers.tsx    # Redux Provider
│   ├── ThemeWrapper.tsx # Theme wrapper
│   └── GTM.tsx          # Google Tag Manager
└── store/               # Redux state management
    ├── store.ts         # Redux store
    └── slices/          # Redux slices
        ├── themeSlice.ts
        └── navigationSlice.ts
```

## Customization

### Modify Content

Edit individual component files to modify content:

- `src/components/Hero.tsx` - Home page content
- `src/components/About.tsx` - About me content
- `src/components/Experience.tsx` - Work experience
- `src/components/Work.tsx` - Portfolio projects

### Modify Styles

- Edit `tailwind.config.ts` to customize theme
- Modify `src/app/globals.css` to add custom styles
- Use Goober to add dynamic styles in components

### Modify Color Theme

Modify the `colors` settings in `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    // Your primary colors
  }
}
```

## Performance Optimization

- Use Next.js Image component to optimize images
- Implement PWA caching strategies
- Use React.memo and useMemo to optimize rendering
- Implement virtual scrolling (if needed)

## HTTPS Redirect Configuration

The project is configured to automatically redirect all HTTP requests to HTTPS:

### Redirect Mechanism

1. **Next.js Middleware** (`src/middleware.ts`)
   - Check `x-forwarded-proto` header
   - Automatically redirect HTTP requests to HTTPS
   - Use 301 permanent redirect

2. **Next.js Configuration** (`next.config.js`)
   - Dynamic redirect based on environment variables
   - Support for custom domains

3. **Vercel Configuration** (`vercel.json`)
   - Platform-level redirect settings
   - Use `$VERCEL_URL` variable

### Security Headers

The project includes the following security headers:

- HSTS (HTTP Strict Transport Security)
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy
- Content-Security-Policy (upgrade-insecure-requests)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License

## Contributing

Welcome to submit Issues and Pull Requests!

## Contact

If you have any questions, please contact through GitHub Issues.
