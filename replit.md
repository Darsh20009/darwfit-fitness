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
- June 26, 2025: Enhanced calorie calculator with comprehensive Arabic food database containing 200+ authentic food items
- June 26, 2025: Implemented 10 food categories (Egyptian, Saudi/Gulf, Levantine, Turkish, Indian, Chinese, crepes, fatayer, desserts, beverages, snacks)
- June 26, 2025: Added advanced food search functionality with real-time results and nutritional information display
- June 26, 2025: Created smart food tracking system with daily goals, progress visualization, and localStorage persistence
- June 26, 2025: Integrated quantity conversion system supporting multiple measurement types (grams, tablespoons, cups, servings)
- June 26, 2025: Built tabbed interface for calculator, daily history, and personalized profile with BMR/TDEE calculations
- June 26, 2025: Created comprehensive "أذكار اليوم" (AzkarPage) - Islamic daily remembrance tracking system with authentic azkar content
- June 26, 2025: Implemented 7 azkar categories (morning, evening, sleep, waking, eating, daily, special) with 20+ authentic azkar from Quran and Sunnah
- June 26, 2025: Added sophisticated counter system with progress tracking, localStorage persistence, and completion badges
- June 26, 2025: Integrated AzkarPage with full navigation (HomePage button, desktop/mobile navbar) using emerald color scheme
- June 26, 2025: Created innovative "صفحة الإقلاع" (QuitPage) - comprehensive habit change tracking system with emerald color scheme
- June 26, 2025: Implemented 6 habit categories (smoking, gaming, social media, junk food, sugar, caffeine) with daily task tracking and progress monitoring
- June 26, 2025: Added QuitPage routing and navigation integration with HomePage button and Navbar links (desktop + mobile)
- August 7, 2025: Successfully completed migration from Replit Agent to Replit environment with full security and compatibility improvements
- August 7, 2025: Created revolutionary "صمم حياتك" (Design Your Life) system with 100,000+ personalized health plans
- August 7, 2025: Implemented comprehensive questionnaire system with smart plan generation algorithm
- August 7, 2025: Built downloadable HTML/CSS/JavaScript offline tracking system with real-time progress monitoring
- August 7, 2025: Added multi-step form with 13 detailed sections covering all aspects of fitness and nutrition planning
- August 7, 2025: Created intelligent plan customization based on budget, preferences, activity level, and goals
- August 8, 2025: Enhanced Azkar page with innovative interactive counter system for repetitive remembrances
- August 8, 2025: Added immersive full-screen colored counter interface with click-anywhere functionality
- August 8, 2025: Implemented smart counter activation for multi-repetition azkar with visual progress tracking
- August 8, 2025: Successfully completed second migration from Replit Agent to Replit environment with enhanced security and error handling
- August 8, 2025: Created revolutionary PersonalizedNutritionSystem component integrating user profiles with calorie calculator
- August 8, 2025: Implemented smart food recommendations system personalized for محمد السهلي، يوسف درويش، خالد عمر with budget-conscious options
- August 8, 2025: Added intelligent nutrition tracking with one-click food addition from recommended foods to daily intake
- August 8, 2025: Integrated comprehensive calorie calculator with personalized daily goals based on user age, profession, and fitness targets
- August 8, 2025: Enhanced dashboard with new "التغذية الذكية" (Smart Nutrition) tab providing complete personalized nutrition management
- August 8, 2025: Fixed console unhandled rejection errors with improved error handling in query client and authentication systems
- June 26, 2025: Applied comprehensive emerald green color scheme consistently across FreePlanPage.tsx and FreePlanViewPage.tsx loading screens and interfaces
- June 26, 2025: Updated download utilities to use emerald colors instead of gold throughout all generated files
- June 26, 2025: Enhanced welcome screen with "powered by procourse" branding below DARWFIT title
- June 26, 2025: Fixed authentication state management and navbar display issues
- June 26, 2025: Improved download buttons with descriptive Arabic text and emerald styling effects
- June 25, 2025: Created revolutionary tabbed dashboard interface with 5 sections (اليوم، الملف الشخصي، النصائح، التقدم، التفاصيل)
- June 25, 2025: Implemented custom user icons for each client (محمد السهلي: Crown, يوسف درويش: Star, خالد عمر: Dumbbell)
- June 25, 2025: Built dedicated tips section with smart fitness and budget advice
- June 25, 2025: Created comprehensive progress tracking with visual statistics and achievements
- June 25, 2025: Separated user profile display into dedicated tab with creative presentation
- June 25, 2025: Enhanced Enhanced Free Plan system with 40+ exercises and 15+ budget foods
- June 25, 2025: Built comprehensive exercise database with difficulty levels, equipment requirements, and detailed instructions
- June 25, 2025: Implemented budget-friendly food database with costs, nutritional info, and cooking methods
- June 25, 2025: Updated خالد محمد to خالد عمر سعيد with specialized muscle-building nutrition plan (15-year-old focused)
- June 25, 2025: Created 4-phase annual nutrition system targeting cost-effective muscle building
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