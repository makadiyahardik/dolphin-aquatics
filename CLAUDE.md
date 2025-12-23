# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint (eslint-config-next with core-web-vitals and typescript)
```

## Architecture

This is a **Next.js 16** single-page marketing website for Dolphin Aquatics swimming academy. It uses the App Router with React 19.

### Tech Stack
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/postcss`)
- **Animations**: Framer Motion + custom CSS animations in `globals.css`
- **Icons**: Heroicons React
- **Fonts**: Inter (body) and Playfair Display (headings) via `next/font/google`

### Theme System

The site supports dual themes controlled via URL parameter `?v=1` (dark) or `?v=2` (light):

- **ThemeProvider** (`src/components/ThemeProvider.jsx`): Reads `?v` param, sets CSS custom properties on `:root`, provides theme context
- **Theme variables**: `--primary`, `--primary-light`, `--primary-dark`, `--bg`, `--bg-alt`, `--card`, `--foreground`, `--foreground-muted`
- Components use `useTheme()` hook to access `theme.primary`, `theme.background`, `theme.isLight`, etc.

### Component Structure

All components are in `src/components/`:
- Main components: `Navigation`, `Hero`, `About`, `Coach`, `Champions`, `Facilities`, `Footer`
- Alternative layouts in `src/components/elite/` (not currently used in main page)
- `ThemeSwitcher.jsx` - UI for switching themes

### Path Aliases

`@/*` maps to `./src/*` (configured in tsconfig.json)

### Images

Static images are in `public/media/` with optimized WebP versions in `public/media/optimized/`.
