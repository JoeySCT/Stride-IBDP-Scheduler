import React from 'react';

/**
 * WelcomeProps interface defines the props for the Welcome component
 */
interface WelcomeProps {
  message?: string;
}

/**
 * Welcome Component - Application Introduction
 * 
 * Displays a welcome message to users with information about the application.
 * Features responsive text styling and theme-aware colors.
 * 
 * @param message - Optional welcome message (defaults to academic year info)
 */
export default function Welcome({ 
  message = "IBDP Schedule for the 2025-2026 academic year." 
}: WelcomeProps) {
  return (
    <div className="p-5 text-center">
      <p className="mb-2 text-lg text-foreground/90 font-medium">{message}</p>
      <p className="text-sm text-foreground/70">Select your subjects and manage your assignments</p>
    </div>
  );
}
