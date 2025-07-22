# YouTube Tube App - Replit Configuration

## Overview

This is a full-stack web application called "透明インターTube" (Transparent Inter Tube) - a high-speed, anonymous, and secure YouTube viewing application with integrated browser games. The project features multiple video playback modes, full-screen video display, and six fully playable browser games with a space-themed UI design.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for development and production builds
- **Styling**: Tailwind CSS with shadcn/ui component library
- **UI Components**: Comprehensive set of Radix UI primitives wrapped in shadcn/ui
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing
- **Theme**: Dark space-themed design with purple accents and animated backgrounds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Development**: tsx for TypeScript execution in development
- **Build**: esbuild for production bundling
- **Database**: Configured for PostgreSQL with Drizzle ORM, currently using in-memory storage for development

### Database and ORM
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` for type sharing between frontend and backend
- **Migrations**: Stored in `migrations/` directory
- **Current Implementation**: In-memory storage class for development, ready for PostgreSQL integration

## Key Components

### Core Application Features
1. **Enhanced YouTube Player**: 
   - Multiple playback modes (Normal, No-Cookie, Proxy, Embed)
   - Large-screen display (80vh max height)
   - Third-party content protection settings
   - URL/Video ID input support
2. **Complete Browser Games Collection**:
   - Snake Game (fully functional with scoring)
   - Memory Card Game (8-pair color matching)
   - Pong Game (2-player with scoring)
   - Tetris Game (full block-falling puzzle with line clearing)
   - Platformer Game (coin collection with physics)
   - Space Invaders Game (shooting with lives and waves)

### UI Components
- **StaticBackground**: Static wave-based space background (no animation for stability)
- **ClockDisplay**: Real-time Japanese time and date display
- **Modal System**: Comprehensive modal system for documentation, FAQ, terms, and privacy
- **GameCanvas**: Advanced game rendering system with collision detection
- **Enhanced YouTube Player**: Multi-mode video display with large screen support

### Shared Resources
- **Schema**: User authentication schema with Zod validation
- **Types**: Shared TypeScript interfaces between client and server
- **Storage Interface**: Abstracted CRUD operations ready for database implementation

## Data Flow

1. **Client-Server Communication**: REST API pattern with `/api` prefix
2. **State Management**: TanStack Query handles server state, local state for games
3. **Type Safety**: Full TypeScript coverage with shared types via path aliases
4. **Authentication**: Schema ready for user authentication (not yet implemented)

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React ecosystem with hooks and context
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React icon library
- **Form Handling**: React Hook Form with Hookform resolvers
- **Date Handling**: date-fns for time formatting
- **Carousel**: Embla Carousel for UI components

### Backend Dependencies
- **Database**: Neon Database serverless PostgreSQL driver
- **Session Management**: connect-pg-simple for PostgreSQL session store
- **Validation**: Zod for schema validation
- **Development**: tsx for TypeScript execution

### Development Tools
- **Vite Plugins**: React plugin, runtime error overlay, cartographer for Replit
- **Build Tools**: esbuild for backend bundling
- **Code Quality**: TypeScript strict mode enabled

## Deployment Strategy

### Development Environment
- **Frontend**: Vite dev server with HMR
- **Backend**: tsx with automatic restart
- **Database**: In-memory storage for development
- **Integration**: Vite middleware mode for unified development server

### Production Build
- **Frontend**: Static build to `dist/public` directory
- **Backend**: Bundled with esbuild to `dist/index.js`
- **Database**: Ready for PostgreSQL with environment variable configuration
- **Deployment**: Render.com compatible with automated deployment

### Render.com Configuration
- **Service**: Web Service on free tier
- **Build Command**: npm ci && npm run build
- **Start Command**: npm start
- **Environment**: Node.js 20.x with production optimizations

### Environment Configuration
- **Database URL**: Required environment variable for PostgreSQL connection
- **Session Management**: Configured for PostgreSQL session storage
- **Static Assets**: Served from build directory in production

### Replit Integration
- **Development Banner**: Automatic development mode detection
- **Error Handling**: Runtime error modal for development
- **File System**: Configured for Replit environment constraints

The application is structured as a modern full-stack TypeScript application with a focus on user experience, featuring both entertainment (YouTube viewing and games) and a polished Japanese-themed UI. The architecture supports easy scaling from development to production with minimal configuration changes.