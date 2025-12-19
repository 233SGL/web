
import React, { useEffect, useRef } from 'react';

const BackgroundArt: React.FC = () => {
  const containerRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Basic subtle movement or pattern can be added here
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none opacity-40">
      <svg
        ref={containerRef}
        width="100%"
        height="100%"
        className="absolute top-0 left-0"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style={{ stopColor: '#e5e7eb', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 0 }} />
          </radialGradient>
        </defs>
        <circle cx="10%" cy="10%" r="400" fill="url(#grad1)" />
        <circle cx="90%" cy="80%" r="300" fill="url(#grad1)" />
        <circle cx="50%" cy="50%" r="200" fill="url(#grad1)" className="animate-pulse" />
      </svg>
    </div>
  );
};

export default BackgroundArt;
