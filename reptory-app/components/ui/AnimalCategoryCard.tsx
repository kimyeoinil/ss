'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BallPythonIcon, LeopardGeckoIcon, CrestedGeckoIcon, BeardedDragonIcon, TortoiseIcon } from '@/components/icons/AnimalIcons';

interface AnimalCategoryCardProps {
  id: string;
  name: string;
  image: string;
  count: number;
  iconType: 'ball_python' | 'leopard_gecko' | 'crested_gecko' | 'bearded_dragon' | 'tortoise';
}

const iconMap = {
  'ball_python': BallPythonIcon,
  'leopard_gecko': LeopardGeckoIcon,
  'crested_gecko': CrestedGeckoIcon,
  'bearded_dragon': BeardedDragonIcon,
  'tortoise': TortoiseIcon,
};

export default function AnimalCategoryCard({ id, name, image, count, iconType }: AnimalCategoryCardProps) {
  const [imageError, setImageError] = useState(false);
  const Icon = iconMap[iconType];

  return (
    <Link
      href={`/animals?species=${id}`}
      className="card overflow-hidden group"
    >
      <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
        {!imageError ? (
          <img
            src={image}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <Icon className="w-16 h-16" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-3">
        <h3 className="font-medium text-gray-900 text-sm">{name}</h3>
        <p className="text-xs text-gray-600">{count}마리</p>
      </div>
    </Link>
  );
}