This is a project developed with Next.js, an open-source React based framework.

## Welcome to Stride

A modern scheduling application built with Next.js, React, and Tailwind CSS.

## Prerequisites

Before you begin, ensure you have the following installed on your computer:

- **Node.js** (version 18.0 or higher) - [Download from nodejs.org](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (for cloning the repository) - [Download from git-scm.com](https://git-scm.com/)

## Getting Started Locally

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ib-scheduler-list
```

### 2. Install Dependencies

npm install

### 3. Run the Development Server

```bash
# Using npm
npm run dev

```

### 4. Open Your Browser

Open [http://localhost:3000] with your browser to see the result.

The page will automatically reload when you make changes to the code. You can start editing the page by modifying `src/app/page.tsx`.

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout component
│   └── page.tsx        # Home page
├── components/         # Reusable React components
│   ├── ui/             # UI components (buttons, dialogs, etc.)
│   ├── Header/         # Header component
│   └── Welcome/        # Welcome component
└── lib/                # Utility functions
```

## Available Scripts

- `npm run dev` - Starts the development server with Turbopack
- `npm run build` - Builds the application for production
- `npm run start` - Starts the production server
- `npm run lint` - Runs ESLint to check for code quality issues

## Technologies Used

- **Next.js 15.5.4** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **next-themes** - Theme management
- **XLSX** - Excel file processing

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.


## Deploy on Vercel


