import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { MOCK_IMPACT_DATA } from '../constants';

export const Dashboard: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Live Impact Dashboard</h2>
        <p className="text-slate-600">Solving the imbalance: Monitoring real-time needs vs. donations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold mb-6">Donation Balance</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={MOCK_IMPACT_DATA}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend />
                <Bar dataKey="value" name="Donations Received" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="need" name="Pending Requests" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold mb-4">Urgent Needs Map (Concept)</h3>
            <div className="bg-slate-100 rounded-lg h-[300px] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/800/600')] bg-cover bg-center"></div>
                <div className="relative z-10 text-center p-4">
                   <p className="text-slate-500 font-medium">Interactive Map Integration</p>
                   <p className="text-sm text-slate-400 mt-2">Connecting underserved areas (Solution #5)</p>
                   <div className="mt-4 flex gap-2 justify-center">
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold animate-pulse">North: Stationery Critical</span>
                      <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold">East: Winter Clothes</span>
                   </div>
                </div>
            </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
            <div className="text-3xl font-bold text-emerald-600">1,240</div>
            <div className="text-emerald-800 font-medium">Families Helped</div>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <div className="text-3xl font-bold text-blue-600">85</div>
            <div className="text-blue-800 font-medium">Verified NGOs</div>
          </div>
          <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
            <div className="text-3xl font-bold text-purple-600">98%</div>
            <div className="text-purple-800 font-medium">Distribution Rate</div>
          </div>
      </div>
    </div>
  );
};
