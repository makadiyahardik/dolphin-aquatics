# Dolphin Aquatics

**India's #1 Swimming Academy** | Est. 1992 | In Pursuit of Excellence

A modern, responsive website for Dolphin Aquatics swimming academy, built with Next.js 16 and featuring stunning animations, multiple theme options, and world-class design.

---

## About Dolphin Aquatics

Dolphin Aquatics has been India's premier swimming academy since 1992, led by **Dronacharya Awardee Coach Nihar Ameen**. Our champions have represented India at the Olympics, Asian Games, Commonwealth Games, and World Championships.

### Our Champions Include:
- **Nisha Millet** - Sydney 2000 Olympian, Arjuna Awardee
- **Srihari Nataraj** - Two-time Olympian (Tokyo 2020, Paris 2024)
- **Dhinidhi Desinghu** - Paris 2024 Olympian, Youngest Indian swimmer at Olympics
- **Maana Patel** - Tokyo 2020 Olympian
- **Rehan Poncha** - Beijing 2008 Olympian, Arjuna Awardee
- **Virdhawal Khade** - Asian Games Bronze Medalist
- And many more national champions...

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router |
| **React 19** | UI library |
| **Tailwind CSS v4** | Styling |
| **Framer Motion** | Animations |
| **Heroicons** | Icons |

---

## Features

### Multiple Theme Support
Switch between themes using URL parameters:
- `?v=1` - Dark Ocean (Default)
- `?v=2` - Light Azure
- `?v=3` - Aqua Fresh
- `?v=4` - Deep Sea
- `?v=5` - Twilight
- `?v=6` - Azure Sky Refined (with alternating section backgrounds)

### Sections
- **Hero** - Animated statistics, call-to-action
- **About** - Academy legacy and achievements
- **Coach** - Dronacharya Awardee Coach Nihar Ameen profile
- **Champions** - Interactive gallery of Olympic and national swimmers
- **Facilities** - CSE (Centre for Sports Excellence) world-class infrastructure
- **Footer** - Contact form, location, and social links

### Design Highlights
- Smooth scroll animations with Framer Motion
- Interactive hover effects on cards
- Responsive design for all devices
- Optimized images with Next.js Image component
- Custom fonts: Inter (body) and Playfair Display (headings)

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-repo/dolphin-website.git

# Navigate to project
cd dolphin-website

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Project Structure

```
dolphin-website/
├── public/
│   └── media/           # Images and assets
│       ├── optimized/   # WebP optimized images
│       └── *.jpg/png    # Swimmer photos, facilities
├── src/
│   ├── app/
│   │   ├── layout.js    # Root layout with fonts
│   │   ├── page.jsx     # Home page
│   │   └── globals.css  # Global styles
│   └── components/
│       ├── ThemeProvider.jsx  # Theme context & CSS variables
│       ├── Navigation.jsx     # Sticky navigation
│       ├── Hero.jsx           # Hero section
│       ├── About.jsx          # About section
│       ├── Coach.jsx          # Coach profile
│       ├── Champions.jsx      # Champions gallery
│       ├── Facilities.jsx     # Facilities showcase
│       └── Footer.jsx         # Contact & footer
├── CLAUDE.md            # Claude Code instructions
└── README.md            # This file
```

---

## Theme System

The website uses a custom theme system via `ThemeProvider.jsx`:

```jsx
import { useTheme } from "./ThemeProvider";

const theme = useTheme();
// Access: theme.primary, theme.background, theme.foreground, etc.
```

### Theme Variables
- `primary` / `primaryLight` / `primaryDark` - Brand colors
- `background` / `backgroundAlt` - Background colors
- `foreground` / `foregroundMuted` - Text colors
- `card` / `border` - Component styling
- `sectionWhite` / `sectionDark` / `sectionWater` - Section backgrounds (v=6)

---

## Location

**Dolphin Aquatics Academy**
@ Centre for Sports Excellence (CSE)
Tavarekere, Bengaluru, Karnataka 560029
India

### Facilities at CSE:
- 50m Olympic-size heated pool (Myrtha-built)
- 20m indoor training pool
- State-of-the-art fitness centre
- Sports science lab
- 100m athletic track

---

## Contact

- **Phone:** +91 80 2634 5678
- **Email:** info@dolphinaquatics.in
- **Website:** [dolphinaquatics.in](https://dolphinaquatics.in)

---

## License

Copyright 2024 Dolphin Aquatics. All rights reserved.

---

<p align="center">
  <strong>In Pursuit of Excellence</strong><br>
  <em>Dolphin Aquatics - India's #1 Swimming Team Since 2010</em>
</p>
