export const HealthCheckIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#10B981" fillOpacity="0.2"/>
    <path d="M12 6V12L16 14" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 10L10 12L14 8" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const HealthGoodIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="14" fill="#10B981"/>
    <path d="M10 16L14 20L22 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const HealthWarningIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 4L2 28H30L16 4Z" fill="#F59E0B"/>
    <path d="M16 11V18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="16" cy="23" r="1" fill="white"/>
  </svg>
);

export const HealthDangerIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="14" fill="#EF4444"/>
    <path d="M20 12L12 20M12 12L20 20" stroke="white" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

export const AIScanIcon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="32" height="32" rx="8" fill="#EDE9FE"/>
    <path d="M16 12V8H12V16H8" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M32 12V8H36V16H40" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 36V40H12V32H8" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M32 36V40H36V32H40" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="24" cy="24" r="8" fill="#7C3AED" fillOpacity="0.2"/>
    <circle cx="24" cy="24" r="4" fill="#7C3AED"/>
    <circle cx="24" cy="20" r="1" fill="white"/>
    <circle cx="20" cy="26" r="1" fill="white"/>
    <circle cx="28" cy="26" r="1" fill="white"/>
  </svg>
);