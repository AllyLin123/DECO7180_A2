import { ImageWithFallback } from './figma/ImageWithFallback';
import { TrendingUp } from 'lucide-react';

interface AnimalRank {
  rank: number;
  animal: string;
  animalName: string;
  complaints: number;
  change: number;
  imageUrl: string;
}

const mockRankings: AnimalRank[] = [
  { rank: 1, animal: 'dog', animalName: 'Dog', complaints: 1245, change: 12, imageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400' },
  { rank: 2, animal: 'cat', animalName: 'Cat', complaints: 687, change: -5, imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400' },
  { rank: 3, animal: 'possum', animalName: 'Possum', complaints: 423, change: 8, imageUrl: 'https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=400' },
  { rank: 4, animal: 'bird', animalName: 'Bird', complaints: 356, change: 3, imageUrl: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400' },
  { rank: 5, animal: 'deer', animalName: 'Deer', complaints: 234, change: -2, imageUrl: 'https://images.unsplash.com/photo-1551960952-c5de51592fab?w=400' },
];

export function AnimalRankingBoard() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-6 h-6 text-orange-500" />
        <h2 className="text-xl font-semibold">Most Complained Animals</h2>
      </div>

      <div className="space-y-3">
        {mockRankings.map((item) => (
          <div
            key={item.rank}
            className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className={`flex items-center justify-center w-8 h-8 rounded-full font-semibold ${
              item.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
              item.rank === 2 ? 'bg-gray-300 text-gray-700' :
              item.rank === 3 ? 'bg-orange-400 text-orange-900' :
              'bg-gray-200 text-gray-600'
            }`}>
              {item.rank}
            </div>

            <ImageWithFallback
              src={item.imageUrl}
              alt={item.animalName}
              className="w-16 h-16 rounded-lg object-cover"
            />

            <div className="flex-1">
              <h3 className="font-semibold">{item.animalName}</h3>
              <p className="text-sm text-gray-600 capitalize">{item.animal}</p>
            </div>

            <div className="text-right">
              <p className="font-semibold text-lg">{item.complaints}</p>
              <p className={`text-sm ${item.change > 0 ? 'text-red-500' : 'text-green-500'}`}>
                {item.change > 0 ? '+' : ''}{item.change}%
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-500 text-center">
          Data Updated: March 23, 2026
        </p>
      </div>
    </div>
  );
}
