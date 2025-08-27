# Guest Book

A full-featured application demonstrating React Router's framework mode with Cloudflare Workers integration.

## Overview

This project represents the culmination of our exploration, showcasing a complete fullstack application using React Router's framework mode running on Cloudflare Workers.

### Key Features

- Server-side rendering with React Router
- Framework mode configuration
- Complex UI components
- Worker bindings integration
- Geolocation features
- Interactive guest map

### Improvements from Previous Version

- **Full SSR Support**: Leverages React Router's framework mode for server-side rendering
- **Enhanced Development Experience**: The Cloudflare Vite plugin now handles both client and server builds
- **Advanced Worker Integration**: Deeper integration with Worker bindings and edge features
- **Production Optimizations**: Improved asset handling and caching strategies

### Cloudflare Vite Plugin Advantages

- Unified build pipeline for both client and server code
- Automatic handling of SSR assets and hydration
- Seamless development-to-production workflow
- Enhanced debugging capabilities
- Full support for React Router's framework mode

## Structure

- `/app` - Main application code
    - `/components` - UI components including guest map
    - `/hooks` - Custom React hooks
    - `/routes` - Route components and handlers
    - `/types` - TypeScript type definitions
- `/workers` - Worker implementation
- `/build` - Build output for client and server
- `react-router.config.ts` - React Router framework configuration
- `wrangler.jsonc` - Cloudflare Workers configuration
