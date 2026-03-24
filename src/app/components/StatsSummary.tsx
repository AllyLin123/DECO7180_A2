import { Users, AlertCircle, TrendingUp, MapPin } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'increase' | 'decrease';
}

function StatCard({ icon, title, value, change, changeType }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-blue-100 rounded-lg">
          {icon}
        </div>
        {change && (
          <span className={`text-sm font-medium ${
            changeType === 'increase' ? 'text-red-500' : 'text-green-500'
          }`}>
            {change}
          </span>
        )}
      </div>
      <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

export function StatsSummary() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard
        icon={<AlertCircle className="w-6 h-6 text-blue-500" />}
        title="Total Complaints"
        value="1,845"
        change="+12%"
        changeType="increase"
      />
      <StatCard
        icon={<MapPin className="w-6 h-6 text-blue-500" />}
        title="Areas Covered"
        value="10"
        change="Brisbane main areas"
      />
      <StatCard
        icon={<Users className="w-6 h-6 text-blue-500" />}
        title="Total Population"
        value="117,500"
      />
      <StatCard
        icon={<TrendingUp className="w-6 h-6 text-blue-500" />}
        title="Average Density"
        value="15.7"
        change="per 1k people"
      />
    </div>
  );
}
