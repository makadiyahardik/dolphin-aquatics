# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important Rules

- **DO NOT push code to remote** until the user explicitly asks you to push
- Always commit changes locally, but wait for user approval before running `git push`

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

The site uses a single "Azure Sky Refined" theme with aqua blue background and alternating section styles:

- **ThemeProvider** (`src/components/ThemeProvider.jsx`): Sets CSS custom properties on `:root`, provides theme context
- **Theme variables**: `--primary`, `--primary-light`, `--primary-dark`, `--bg`, `--bg-alt`, `--card`, `--foreground`, `--foreground-muted`, `--border`
- **Section backgrounds**: `sectionWhite`, `sectionDark`, `sectionWater` for alternating section styles
- Components use `useTheme()` hook to access theme properties

### Component Structure

All components are in `src/components/`:
- Main components: `Navigation`, `Hero`, `About`, `Coach`, `Champions`, `Facilities`, `Footer`
- Alternative layouts in `src/components/elite/` (not currently used in main page)

### Path Aliases

`@/*` maps to `./src/*` (configured in tsconfig.json)

### Images

Static images are in `public/media/` with optimized WebP versions in `public/media/optimized/`.
