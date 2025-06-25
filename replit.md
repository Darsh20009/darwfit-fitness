# Darwfit - Fitness and Nutrition Platform

## Overview

Darwfit is a comprehensive fitness and nutrition platform built as a full-stack web application. The system provides personalized workout plans, meal recommendations, calorie tracking, and subscription management for Arabic-speaking users focused on health and fitness goals.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Library**: Radix UI components with shadcn/ui styling
- **Styling**: Tailwind CSS with custom theme support
- **State Management**: React Context for authentication and theme, TanStack Query for server state
- **Build Tool**: Vite with React plugin
- **Language**: Arabic (RTL support)

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js 20
- **Development**: tsx for TypeScript execution
- **Production**: esbuild for bundling
- **Session Management**: In-memory storage with plans for database integration

### Data Storage Solutions
- **Database**: Drizzle ORM configured for PostgreSQL (currently using in-memory storage)
- **Local Storage**: Browser localStorage for client-side data persistence
- **File Storage**: Text file logging for form submissions
- **Future Integration**: Neon Database for production PostgreSQL

## Key Components

### Authentication System
- Context-based authentication with localStorage persistence
- Hardcoded credentials for demo purposes:
  - محمد السهلي: 123456 / subscription ID: 5001 / expires: 23 July 2025
  - يوسف درويش: 182009 / subscription ID: 2009 / expires: 6 months from login date
- Subscription-based access control with unique subscription IDs
- Protected routes for dashboard and authenticated features

### Subscription Management
- Multi-step form collection with validation using Zod schemas
- Arabic form fields for personal information, goals, and preferences
- WhatsApp integration for direct communication with trainers
- File-based submission logging with timestamps

### Fitness Features
- **Workout Plans**: Day-based exercise routines with detailed instructions
- **Meal Planning**: Comprehensive Arabic meal database with nutritional information
- **Calorie Calculator**: BMR calculation with activity level adjustments
- **Progress Tracking**: Local storage for workout and meal completion tracking
- **Free Plan System**: AI-powered plan generation with multiple templates
- **Smart Plan Selection**: Algorithm-based template selection based on user profile
- **30-Day Tracking**: Complete progress monitoring with visual calendar interface

### User Interface
- **Responsive Design**: Mobile-first approach with touch-optimized interactions
- **Theme Support**: Light/dark mode with system preference detection
- **RTL Layout**: Native Arabic text direction support
- **Component System**: Reusable UI components built on Radix primitives

## Data Flow

1. **User Registration**: Form submission → API endpoint → File logging → WhatsApp notification
2. **Authentication**: Login credentials → Context validation → localStorage persistence
3. **Dashboard Access**: Route protection → User data retrieval → Personalized content display
4. **Progress Tracking**: User interactions → localStorage updates → Visual feedback

## External Dependencies

### Core Dependencies
- **UI Framework**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Radix UI components
- **Database**: Drizzle ORM, PostgreSQL driver (@neondatabase/serverless)
- **Communication**: SendGrid for email, WhatsApp Web API integration
- **State Management**: TanStack Query, React Context
- **Date Handling**: date-fns with Arabic locale support

### Development Tools
- **Build**: Vite, esbuild, PostCSS
- **TypeScript**: Strict configuration with path mapping
- **Linting**: ESLint integration
- **Dev Server**: Vite dev server with HMR

## Deployment Strategy

### Development Environment
- **Platform**: Replit with Node.js 20 runtime
- **Port Configuration**: Local port 5000, external port 80
- **Hot Reload**: Vite development server with automatic restart
- **Database**: In-memory storage for development

### Production Deployment
- **Target**: Autoscale deployment on Replit
- **Build Process**: `npm run build` - Vite frontend build + esbuild server bundle
- **Start Command**: `npm run start` - Production server startup
- **Static Assets**: Served from dist/public directory

### Build Pipeline
1. Frontend compilation with Vite (React → static assets)
2. Backend bundling with esbuild (TypeScript → JavaScript)
3. Asset optimization and compression
4. Environment-specific configuration injection

## Recent Changes
- June 25, 2025: Updated خالد محمد to خالد عمر سعيد with new identity and specialized muscle-building nutrition plan
- June 25, 2025: Created comprehensive annual nutrition system for 15-year-old muscle building (4 phases: Foundation, Intensification, Peak, Stabilization)
- June 25, 2025: Implemented cost-effective meal planning targeting 2590-3660 daily calories and 144-181g protein
- June 25, 2025: Added creative user profiles system with detailed personality traits, challenges, and achievements for each user
- June 25, 2025: Successfully migrated from Replit Agent to standard Replit environment
- June 25, 2025: Unified workout plans across all users while maintaining individual meal plans
- June 25, 2025: Updated authentication system to support خالد عمر with 1-year subscription
- January 25, 2025: Successfully migrated from Replit Agent to Replit environment
- January 25, 2025: Implemented dynamic subscription days calculation based on real subscription end dates
- January 25, 2025: Enhanced subscription display with color-coded status indicators (green/amber/red)
- January 25, 2025: Updated authentication system to calculate subscription end date dynamically
- January 25, 2025: Added second user account (يوسف درويش) with 6-month subscription period
- January 25, 2025: Enhanced website design with modern animations and visual effects
- January 25, 2025: Created innovative free plan system with AI-generated custom meal and workout plans
- January 25, 2025: Implemented multiple plan templates (classic, intensive, beginner, female-focused)
- January 25, 2025: Added smart template selection algorithm based on user data
- January 25, 2025: Built comprehensive 30-day tracking system with progress monitoring
- January 25, 2025: Created separate authentication system for free users with registration/login
- January 25, 2025: Implemented user account management for free plan users with localStorage
- January 25, 2025: Added welcome page with DARWFIT branding and metallic effects

## Changelog
```
Changelog:
- June 23, 2025. Initial setup
- January 2025. Migration to Replit and subscription system improvements
```

## User Preferences
```
Preferred communication style: Simple, everyday language.
```