import Image from 'next/image';
import Link from 'next/link';

interface AdBannerProps {
  imageUrl?: string;
  title: string;
  subtitle?: string;
  link?: string;
  backgroundColor?: string;
}

export default function AdBanner({ 
  imageUrl, 
  title, 
  subtitle, 
  link = '#',
  backgroundColor = 'bg-gradient-to-r from-green-500 to-green-600'
}: AdBannerProps) {
  return (
    <Link href={link} className="block">
      <div className={`relative overflow-hidden rounded-2xl ${backgroundColor} text-white`}>
        <div className="p-6">
          <h3 className="text-lg font-bold mb-1">{title}</h3>
          {subtitle && <p className="text-sm opacity-90">{subtitle}</p>}
        </div>
        {imageUrl && (
          <div className="absolute right-0 top-0 w-32 h-full">
            {/* 실제 이미지가 있을 때 사용 */}
            {/* <Image src={imageUrl} alt={title} fill className="object-cover" /> */}
          </div>
        )}
      </div>
    </Link>
  );
}