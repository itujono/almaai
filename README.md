# Alma AI - Immigration Case Assessment Platform

A modern web application built with Next.js for managing immigration case assessments and leads.

## Tech Stack

- **Styling**: CSS Modules with nested support
- **UI Components**: BaseUI components with custom styling
- **Form Handling**: react-hook-form with Zod schema validation
- **State Management**: nuqs for URL-based state management

## Key Features

### Immigration Case Assessment Form (`/form`)

- Beautiful, responsive form UI with multi-section layout
- Client-side form validation using react-hook-form and Zod
- Fields include:
  - Personal information
  - Country of citizenship
  - Visa categories of interest
  - Case details and timeline
- Thank you dialog after submission

### Leads Management Dashboard (`/leads`)

- Comprehensive leads table with:
  - Search functionality (by name or country)
  - Status filtering (pending, reached out, closed)
  - Pagination (5 items per page)
  - Status updates for each lead
- Real-time filtering with API integration
- URL-based state management for filters
- Responsive design for all screen sizes

### Settings Page (`/settings`)

- Placeholder page

## Architecture

### Routing

- Dashboard layout with persistent sidebar (`/src/app/(dashboard)/layout.tsx`)
- Public form page with custom layout (`/src/app/form/page.tsx`)

### API Routes

- Leads endpoints:
  - GET `/api/leads` - Fetch leads with search and status filters
  - PATCH `/api/leads/[id]` - Update lead status

### State Management

- URL-based state management using `nuqs`
- Server actions for data mutations
- Mock data simulation with artificial delays

### Styling

- CSS Modules with nested selectors support
- Responsive design with mobile-first approach
- Custom variables for consistent theming

## Getting Started

First, run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development

### File Structure

```
src/
├── actions/         # Server actions
├── app/            # Main pages
│   ├── (dashboard) # Dashboard routes
│   ├── api/        # API routes
│   └── form/       # Public form page
├── components/     # Reusable UI components
└── styles/        # Global styles and variables
```

## Deployed on Vercel

This project is deployed on Vercel, you can access it at [https://almaai.vercel.app/](https://almaai.vercel.app/)
