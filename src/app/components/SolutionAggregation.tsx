import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis } from 'recharts';
import { CheckCircle, TrendingUp } from 'lucide-react';

const solutionData = [
  { solution: 'Enhanced Training', votes: 245 },
  { solution: 'Fence Management', votes: 189 },
  { solution: 'Community Education', votes: 167 },
  { solution: 'Law Enforcement', votes: 134 },
  { solution: 'Pet Registration', votes: 98 },
];

const priorityData = [
  { name: 'High Priority', value: 412, color: '#ef4444' },
  { name: 'Medium Priority', value: 289, color: '#f59e0b' },
  { name: 'Low Priority', value: 132, color: '#10b981' },
];

const timelineData = [
  { month: 'Jan', complaints: 145 },
  { month: 'Feb', complaints: 178 },
  { month: 'Mar', complaints: 203 },
  { month: 'Apr', complaints: 189 },
  { month: 'May', complaints: 234 },
  { month: 'Jun', complaints: 267 },
];

const correlationData = [
  { area: 'Brisbane City', population: 15000, complaints: 245, density: 16.3 },
  { area: 'Fortitude Valley', population: 18000, complaints: 312, density: 17.3 },
  { area: 'New Farm', population: 14000, complaints: 167, density: 11.9 },
  { area: 'South Brisbane', population: 12000, complaints: 198, density: 16.5 },
  { area: 'West End', population: 11000, complaints: 156, density: 14.2 },
  { area: 'Toowong', population: 13000, complaints: 189, density: 14.5 },
  { area: 'Woolloongabba', population: 8000, complaints: 123, density: 15.4 },
  { area: 'Kangaroo Point', population: 9000, complaints: 134, density: 14.9 },
  { area: 'Paddington', population: 10000, complaints: 145, density: 14.5 },
  { area: 'Spring Hill', population: 7500, complaints: 98, density: 13.1 },
];

export function SolutionAggregation() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-6 h-6 text-purple-500" />
          <h2 className="text-xl font-semibold">Population Density vs Complaints Analysis</h2>
        </div>
        <p className="text-gray-600 mb-4">
          Analysis shows: areas with higher population density (such as Fortitude Valley and Brisbane City) indeed have more animal complaint cases.
        </p>
        <ResponsiveContainer width="100%" height={350}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <XAxis
              type="number"
              dataKey="population"
              name="Population"
              label={{ value: 'Population', position: 'insideBottom', offset: -10 }}
            />
            <YAxis
              type="number"
              dataKey="complaints"
              name="Complaints"
              label={{ value: 'Complaints', angle: -90, position: 'insideLeft' }}
            />
            <ZAxis range={[100, 400]} />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                      <p className="font-semibold">{data.area}</p>
                      <p className="text-sm">Population: {data.population.toLocaleString()}</p>
                      <p className="text-sm">Complaints: {data.complaints}</p>
                      <p className="text-sm">Density: {data.density} / 1k people</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Scatter name="Area" data={correlationData} fill="#8b5cf6" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <CheckCircle className="w-6 h-6 text-green-500" />
          <h2 className="text-xl font-semibold">Proposed Solutions by Public</h2>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={solutionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="solution" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="votes" fill="#3b82f6" name="Votes" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Priority Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={priorityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {priorityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Complaint Trends (Last 6 Months)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="complaints" fill="#8b5cf6" name="Complaints" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Solution Details</h3>
        <div className="space-y-3">
          {solutionData.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">{item.solution}</span>
              <div className="flex items-center gap-4">
                <div className="w-48 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(item.votes / 245) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-semibold w-12 text-right">{item.votes}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
