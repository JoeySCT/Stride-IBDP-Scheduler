import React from 'react';

interface HeaderProps {
  title?: string;
}

export default function Header({ title = "Welcome to React - IB Scheduler List" }: HeaderProps) {
  return (
    <header className="glass-effect border-b shadow-sm">
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          {title}
        </h1>
      </div>
    </header>
  );
}
