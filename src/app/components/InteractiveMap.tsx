import { useState } from 'react';
import { MapPin } from 'lucide-react';

interface AreaData {
  id: string;
  name: string;
  x: number;
  y: number;
  population: number;
  complaints: number;
}

const brisbaneAreas: AreaData[] = [
  { id: '1', name: 'Brisbane City', x: 50, y: 45, population: 15000, complaints: 245 },
  { id: '2', name: 'South Brisbane', x: 48, y: 52, population: 12000, complaints: 198 },
  { id: '3', name: 'Fortitude Valley', x: 55, y: 38, population: 18000, complaints: 312 },
  { id: '4', name: 'New Farm', x: 60, y: 42, population: 14000, complaints: 167 },
  { id: '5', name: 'West End', x: 40, y: 55, population: 11000, complaints: 156 },
  { id: '6', name: 'Kangaroo Point', x: 58, y: 50, population: 9000, complaints: 134 },
  { id: '7', name: 'Paddington', x: 35, y: 40, population: 10000, complaints: 145 },
  { id: '8', name: 'Toowong', x: 30, y: 50, population: 13000, complaints: 189 },
  { id: '9', name: 'Woolloongabba', x: 52, y: 60, population: 8000, complaints: 123 },
  { id: '10', name: 'Spring Hill', x: 48, y: 35, population: 7500, complaints: 98 },
];

export function InteractiveMap() {
  const [selectedView, setSelectedView] = useState<'complaints' | 'density'>('complaints');
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  const getColor = (area: AreaData) => {
    if (selectedView === 'complaints') {
      const intensity = area.complaints / 312;
      if (intensity > 0.8) return '#dc2626';
      if (intensity > 0.6) return '#ea580c';
      if (intensity > 0.4) return '#f59e0b';
      return '#fbbf24';
    } else {
      const density = (area.complaints / area.population) * 1000;
      if (density > 16) return '#1e40af';
      if (density > 14) return '#3b82f6';
      if (density > 12) return '#60a5fa';
      return '#93c5fd';
    }
  };

  const getSize = (area: AreaData) => {
    if (selectedView === 'complaints') {
      return Math.max(40, (area.complaints / 312) * 100);
    } else {
      const density = (area.complaints / area.population) * 1000;
      return Math.max(40, (density / 20) * 100);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setSelectedView('complaints')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            selectedView === 'complaints'
              ? 'bg-red-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Complaint Count
        </button>
        <button
          onClick={() => setSelectedView('density')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            selectedView === 'density'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Complaint Density
        </button>
      </div>

      <div className="flex-1 rounded-lg overflow-hidden border border-gray-200 bg-gradient-to-br from-blue-50 to-green-50 relative">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          {brisbaneAreas.map((area) => {
            const size = getSize(area);
            const color = getColor(area);
            const density = ((area.complaints / area.population) * 1000).toFixed(1);
            const isHovered = hoveredArea === area.id;

            return (
              <g key={area.id}>
                <circle
                  cx={area.x}
                  cy={area.y}
                  r={size / 10}
                  fill={color}
                  opacity={isHovered ? 0.9 : 0.6}
                  stroke={color}
                  strokeWidth={isHovered ? 0.5 : 0.3}
                  className="cursor-pointer transition-all"
                  onMouseEnter={() => setHoveredArea(area.id)}
                  onMouseLeave={() => setHoveredArea(null)}
                />
                {isHovered && (
                  <g>
                    <rect
                      x={area.x + size / 10 + 2}
                      y={area.y - 5}
                      width="25"
                      height="12"
                      fill="white"
                      stroke="#333"
                      strokeWidth="0.2"
                      rx="1"
                    />
                    <text
                      x={area.x + size / 10 + 3}
                      y={area.y - 1}
                      fontSize="2.5"
                      fontWeight="bold"
                      fill="#333"
                    >
                      {area.name}
                    </text>
                    <text
                      x={area.x + size / 10 + 3}
                      y={area.y + 2}
                      fontSize="1.8"
                      fill="#666"
                    >
                      Pop: {(area.population / 1000).toFixed(0)}k
                    </text>
                    <text
                      x={area.x + size / 10 + 3}
                      y={area.y + 5}
                      fontSize="1.8"
                      fill="#666"
                    >
                      Complaints: {area.complaints}
                    </text>
                    <text
                      x={area.x + size / 10 + 3}
                      y={area.y + 8}
                      fontSize="1.8"
                      fill="#666"
                    >
                      Density: {density}/1k
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        <div className="absolute bottom-4 right-4 bg-white rounded-lg border border-gray-200 p-3 shadow-lg">
          <h4 className="text-xs font-semibold mb-2">Legend</h4>
          {selectedView === 'complaints' ? (
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#dc2626' }}></div>
                <span className="text-xs">250+ complaints</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ea580c' }}></div>
                <span className="text-xs">190-250 complaints</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#f59e0b' }}></div>
                <span className="text-xs">130-190 complaints</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#fbbf24' }}></div>
                <span className="text-xs">&lt;130 complaints</span>
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#1e40af' }}></div>
                <span className="text-xs">&gt;16 / 1k people</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#3b82f6' }}></div>
                <span className="text-xs">14-16 / 1k people</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#60a5fa' }}></div>
                <span className="text-xs">12-14 / 1k people</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#93c5fd' }}></div>
                <span className="text-xs">&lt;12 / 1k people</span>
              </div>
            </div>
          )}
        </div>

        <div className="absolute top-4 left-4 bg-white rounded-lg border border-gray-200 px-3 py-2 shadow-lg flex items-center gap-2">
          <MapPin className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-semibold">Brisbane Area Heatmap</span>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600 text-center">
        Tip: Hover over circles to view detailed information
      </div>
    </div>
  );
}
