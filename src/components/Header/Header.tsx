import React from 'react';
import { ModeToggle } from '@/components/ModeToggle';

/**
 * HeaderProps interface defines the props for the Header component
 */
interface HeaderProps {
  title?: string;
}

/**
 * Header Component - Application Header with Theme Toggle
 * 
 * Features:
 * - Responsive header with centered title
 * - Integrated theme toggle functionality
 * - Glass morphism styling for modern appearance
 * - Flexible title prop for customization
 * 
 * @param title - Optional title text (defaults to "Welcome to React - IB Scheduler List")
 */
export default function Header({ title = "Stride 1.0.0" }: HeaderProps) {
  return (
    <header className="glass-effect border-b shadow-sm">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center">
          <div className="flex-1"></div>
          <div className="flex-1 text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent whitespace-nowrap">
              {title}
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mt-1 font-medium italic">
              Move forward with purpose
            </p>
          </div>
          <div className="flex-1 flex justify-end">
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
