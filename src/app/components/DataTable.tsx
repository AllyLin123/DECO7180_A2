import { ArrowUpDown } from 'lucide-react';
import { useState } from 'react';

interface AreaData {
  area: string;
  population: number;
  complaints: number;
  density: number;
}

const tableData: AreaData[] = [
  { area: 'Fortitude Valley', population: 18000, complaints: 312, density: 17.3 },
  { area: 'South Brisbane', population: 12000, complaints: 198, density: 16.5 },
  { area: 'Brisbane City', population: 15000, complaints: 245, density: 16.3 },
  { area: 'Woolloongabba', population: 8000, complaints: 123, density: 15.4 },
  { area: 'Kangaroo Point', population: 9000, complaints: 134, density: 14.9 },
  { area: 'Toowong', population: 13000, complaints: 189, density: 14.5 },
  { area: 'Paddington', population: 10000, complaints: 145, density: 14.5 },
  { area: 'West End', population: 11000, complaints: 156, density: 14.2 },
  { area: 'Spring Hill', population: 7500, complaints: 98, density: 13.1 },
  { area: 'New Farm', population: 14000, complaints: 167, density: 11.9 },
];

type SortKey = 'area' | 'population' | 'complaints' | 'density';

export function DataTable() {
  const [sortKey, setSortKey] = useState<SortKey>('density');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  const sortedData = [...tableData].sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return sortDirection === 'asc'
      ? (aValue as number) - (bValue as number)
      : (bValue as number) - (aValue as number);
  });

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Detailed Area Data Table</h2>
        <p className="text-sm text-gray-600 mt-1">Click column headers to sort</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('area')}
                  className="flex items-center gap-1 font-semibold text-gray-900 hover:text-blue-500"
                >
                  Area
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
              <th className="px-6 py-3 text-right">
                <button
                  onClick={() => handleSort('population')}
                  className="flex items-center gap-1 font-semibold text-gray-900 hover:text-blue-500 ml-auto"
                >
                  Population
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
              <th className="px-6 py-3 text-right">
                <button
                  onClick={() => handleSort('complaints')}
                  className="flex items-center gap-1 font-semibold text-gray-900 hover:text-blue-500 ml-auto"
                >
                  Complaints
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
              <th className="px-6 py-3 text-right">
                <button
                  onClick={() => handleSort('density')}
                  className="flex items-center gap-1 font-semibold text-gray-900 hover:text-blue-500 ml-auto"
                >
                  Density (per 1k)
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedData.map((row, index) => (
              <tr
                key={row.area}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </span>
                    <span className="font-medium">{row.area}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">{row.population.toLocaleString()}</td>
                <td className="px-6 py-4 text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800">
                    {row.complaints}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className={`font-semibold ${
                    row.density > 16 ? 'text-red-600' :
                    row.density > 14 ? 'text-orange-600' :
                    'text-green-600'
                  }`}>
                    {row.density}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <p>Showing {sortedData.length} areas</p>
          <p>Total Complaints: {sortedData.reduce((sum, row) => sum + row.complaints, 0).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
