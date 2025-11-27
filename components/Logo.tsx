import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* 
      Company Logo Construction: 
      Circle divided into 4 sectors with a whitespace X/Hourglass shape.
      Top/Bottom: Blue (#124E78)
      Left/Right: Green (#1E8E56)
    */}
    
    {/* Top Blue Sector */}
    <path 
      d="M50 42 L 78 14 A 45 45 0 0 0 22 14 L 50 42 Z" 
      fill="#124E78" 
    />
    
    {/* Bottom Blue Sector */}
    <path 
      d="M50 58 L 22 86 A 45 45 0 0 0 78 86 L 50 58 Z" 
      fill="#124E78" 
    />
    
    {/* Left Green Sector */}
    <path 
      d="M42 50 L 14 22 A 45 45 0 0 0 14 78 L 42 50 Z" 
      fill="#1E8E56" 
    />
    
    {/* Right Green Sector */}
    <path 
      d="M58 50 L 86 78 A 45 45 0 0 0 86 22 L 58 50 Z" 
      fill="#1E8E56" 
    />
  </svg>
);