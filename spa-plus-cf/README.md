# SPA + Cloudflare

A basic example of deploying a React Router Single Page Application (SPA) on Cloudflare Workers.

## Overview

This project demonstrates the simplest approach to running a React application on Cloudflare's edge network. It represents the starting point of our journey into Cloudflare Workers development.

### Key Features

-   Basic React Router setup in SPA mode
-   Simple Worker configuration
-   Basic page components
-   Integration with Cloudflare Workers

### Development Experience

This version uses a basic setup where:

-   The frontend and Worker code are built separately
-   Local development requires running both the Vite dev server and Wrangler
-   Manual configuration is needed to connect the frontend with the Worker
-   Limited development-production parity

### Areas for Improvement

The following aspects could be enhanced in the next iteration:

-   Eliminate the need to run separate development servers
-   Reduce manual configuration between frontend and Worker
-   Implement automatic asset handling
-   Add hot module replacement for Worker code

## Structure

-   `/src` - React application source code
-   `/cloudflare` - Worker implementation
-   `wrangler.jsonc` - Cloudflare Workers configuration
