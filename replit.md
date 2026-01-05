# News Article Mobile Layout

## Overview
A mobile-first news article layout built with pure HTML/CSS/JS, optimized for ultra-high loading speeds and high conversion tráfego.

## Project Architecture
- **Type**: Single-file HTML (Zero external dependencies except fonts)
- **Styling**: Pure CSS (Inlined in index.html)
- **Performance**: 
  - Zero Render Blocking CSS (Inlined)
  - Deferred JS execution
  - Lazy-loaded video player (VTurb)
  - No external framework (Tailwind removed for performance)

## Directory Structure
```
├── index.html        # Main entry point (All-in-one)
└── replit.md         # Project documentation
```

## Recent Changes
- 2026-01-05: Completely removed Tailwind CSS and moved all styles/scripts to index.html for maximum performance (Speed Optimization). Deleted unused assets folder.
