# News Article Mobile Layout

## Overview
A mobile-first news article layout built with Vite, styled with Tailwind CSS (CDN), and featuring embedded video content. The design mimics a El País news article style.

## Project Architecture
- **Build System**: Vite 6.x
- **Styling**: Tailwind CSS via CDN + custom CSS
- **Fonts**: Google Fonts (Merriweather, Playfair Display, Libre Franklin)
- **Language**: HTML, CSS, JavaScript

## Directory Structure
```
├── assets/
│   ├── media/        # Media files
│   ├── script.js     # JavaScript utilities
│   └── style.css     # Custom styles
├── index.html        # Main entry point
├── vite.config.ts    # Vite configuration
└── package.json      # Dependencies
```

## Development
- **Dev Server**: `npm run dev` (runs on port 5000)
- **Build**: `npm run build` (outputs to `dist/`)
- **Preview**: `npm run preview`

## Deployment
- Static deployment configured
- Build command: `npm run build`
- Output directory: `dist`

## Recent Changes
- 2026-01-05: Initial setup for Replit environment, configured Vite to use port 5000 with allowedHosts enabled
