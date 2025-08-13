import Link from 'next/link';

interface EmptyStateProps {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  illustration?: 'favorites' | 'search' | 'general';
}

const FavoritesIllustration = () => (
  <svg className="w-32 h-32" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="64" cy="64" r="60" fill="#F3F4F6"/>
    <path d="M64 30C54 30 46 38 46 48C46 58 64 75 64 75C64 75 82 58 82 48C82 38 74 30 64 30Z" fill="#E5E7EB"/>
    <circle cx="40" cy="70" r="16" fill="#FEF3C7"/>
    <circle cx="39" cy="68" r="2" fill="#1F2937"/>
    <circle cx="47" cy="68" r="2" fill="#1F2937"/>
    <path d="M40 74C40 74 42 76 44 76C46 76 48 74 48 74" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M30 70C30 70 28 68 26 68C24 68 24 70 24 70" fill="#FCD34D"/>
    <path d="M50 70C50 70 52 68 54 68C56 68 56 70 56 70" fill="#FCD34D"/>
  </svg>
);

const SearchIllustration = () => (
  <svg className="w-32 h-32" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="64" cy="64" r="60" fill="#F3F4F6"/>
    <circle cx="52" cy="52" r="24" fill="none" stroke="#E5E7EB" strokeWidth="8"/>
    <line x1="68" y1="68" x2="84" y2="84" stroke="#E5E7EB" strokeWidth="8" strokeLinecap="round"/>
    <circle cx="80" cy="60" r="12" fill="#E0E7FF"/>
    <circle cx="79" cy="58" r="1.5" fill="#4C1D95"/>
    <circle cx="83" cy="58" r="1.5" fill="#4C1D95"/>
    <path d="M80 62C80 62 81 63 82 63C83 63 84 62 84 62" stroke="#4C1D95" strokeWidth="1" strokeLinecap="round"/>
  </svg>
);

const GeneralIllustration = () => (
  <svg className="w-32 h-32" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="64" cy="64" r="60" fill="#F3F4F6"/>
    <ellipse cx="64" cy="72" rx="32" ry="24" fill="#E5F4E3"/>
    <path d="M64 40C58 40 52 44 50 50C48 56 48 62 50 68C52 74 58 78 64 78C70 78 76 74 78 68C80 62 80 56 78 50C76 44 70 40 64 40Z" fill="#86EFAC"/>
    <circle cx="56" cy="56" r="3" fill="#052E16"/>
    <circle cx="72" cy="56" r="3" fill="#052E16"/>
    <path d="M60 64C60 64 62 66 64 66C66 66 68 64 68 64" stroke="#052E16" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  illustration = 'general'
}: EmptyStateProps) {
  const getIllustration = () => {
    switch (illustration) {
      case 'favorites':
        return <FavoritesIllustration />;
      case 'search':
        return <SearchIllustration />;
      default:
        return <GeneralIllustration />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="mb-6">
        {Icon ? (
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
            <Icon className="h-10 w-10 text-gray-400" />
          </div>
        ) : (
          getIllustration()
        )}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-gray-600 text-center mb-6 max-w-sm">{description}</p>
      )}
      {actionLabel && actionHref && (
        <Link href={actionHref} className="btn-primary">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}