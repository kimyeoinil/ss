'use client';

import { useState, useEffect } from 'react';
import AnimalCard from './AnimalCard';
import { Animal } from '@/types';
import { localStorage } from '@/lib/localStorage/storage';

interface RecommendedAnimalsProps {
  currentAnimalId: string;
  species: string;
}

export default function RecommendedAnimals({ 
  currentAnimalId, 
  species 
}: RecommendedAnimalsProps) {
  const [recommendedAnimals, setRecommendedAnimals] = useState<Animal[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const data = localStorage.getData();
    if (data) {
      // 같은 종류의 다른 동물들을 추천
      const sameSpeciesAnimals = data.animals
        .filter(animal => 
          animal.id !== currentAnimalId && 
          animal.species === species
        )
        .slice(0, 4);
      
      // 같은 종류가 4개 미만이면 다른 종류도 포함
      if (sameSpeciesAnimals.length < 4) {
        const otherAnimals = data.animals
          .filter(animal => 
            animal.id !== currentAnimalId && 
            animal.species !== species
          )
          .slice(0, 4 - sameSpeciesAnimals.length);
        
        setRecommendedAnimals([...sameSpeciesAnimals, ...otherAnimals]);
      } else {
        setRecommendedAnimals(sameSpeciesAnimals);
      }
      
      setFavorites(data.favorites);
    }
  }, [currentAnimalId, species]);

  const handleFavorite = (animalId: string) => {
    const newFavorites = favorites.includes(animalId)
      ? favorites.filter(id => id !== animalId)
      : [...favorites, animalId];
    
    setFavorites(newFavorites);
    localStorage.updateData(data => ({
      ...data,
      favorites: newFavorites
    }));
  };

  if (recommendedAnimals.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">
        비슷한 동물 추천
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {recommendedAnimals.map((animal) => (
          <AnimalCard
            key={animal.id}
            animal={animal}
            onFavorite={handleFavorite}
            isFavorite={favorites.includes(animal.id)}
          />
        ))}
      </div>
    </div>
  );
}