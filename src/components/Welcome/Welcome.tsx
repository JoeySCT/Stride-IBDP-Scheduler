import React from 'react';

interface WelcomeProps {
  message?: string;
}

export default function Welcome({ 
  message = "IBDP Schedule for the 2025-2026 academic year." 
}: WelcomeProps) {
  return (
    <div className="p-5 text-center text-black">
      <p className="mb-2 text-lg">{message}</p>
    </div>
  );
}
