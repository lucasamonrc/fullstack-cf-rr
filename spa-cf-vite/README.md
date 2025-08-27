# SPA with Vite + Cloudflare

An enhanced Single Page Application example using Vite and Cloudflare Workers, with database integration.

## Overview

This project showcases a more sophisticated setup that leverages the Cloudflare Vite plugin for improved developer experience and introduces database integration.

### Key Features

-   Vite + React Router setup
-   Cloudflare Vite Plugin integration
-   Database integration using Drizzle ORM
-   Advanced Worker configuration

### Improvements from Previous Version

-   **Unified Development Experience**: The Cloudflare Vite plugin enables running both the frontend and Worker in a single dev server
-   **Simplified Configuration**: Automatic asset handling and routing between the frontend and Worker
-   **Database Integration**: Introduction of Drizzle ORM for type-safe database operations
-   **Better Development-Production Parity**: The development environment more closely matches production

### Cloudflare Vite Plugin Benefits

-   Automatic handling of static assets
-   Unified development server
-   Simplified Worker bindings configuration
-   Hot Module Replacement (HMR) support

### Areas for Improvement

While this version significantly improves the development experience, there are still areas that could be enhanced:

-   Add server-side rendering capabilities
-   Improve handling of server-side state
-   Enhance build optimization for server-side code
-   Better integration with React Router's framework mode

## Structure

-   `/src` - React application source code
-   `/worker` - Worker implementation
-   `/db` - Database schema and configuration
-   `/drizzle` - Database migrations
-   `vite.config.ts` - Vite configuration with Cloudflare plugin
-   `wrangler.jsonc` - Cloudflare Workers configuration
