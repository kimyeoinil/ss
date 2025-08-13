export const AIIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 2L2 7V12C2 16.5 4.5 20.74 8.5 21.84C9.15 20.5 10.17 19.37 11.47 18.61C10.56 17.87 10 16.69 10 15.5C10 13.29 11.79 11.5 14 11.5C16.21 11.5 18 13.29 18 15.5C18 16.69 17.44 17.87 16.53 18.61C17.83 19.37 18.85 20.5 19.5 21.84C20.66 21.45 21.68 20.83 22.5 20C22.5 20 22 11.5 22 11.5L12 2Z"
      fill="currentColor"
    />
    <circle cx="14" cy="15.5" r="1.5" fill="currentColor" />
    <path
      d="M14 20C12.34 20 11 21.34 11 23H17C17 21.34 15.66 20 14 20Z"
      fill="currentColor"
    />
  </svg>
);