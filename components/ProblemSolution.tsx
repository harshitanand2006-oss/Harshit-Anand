import React from 'react';
import { PROBLEM_SOLUTIONS } from '../constants';
import { 
  Search, 
  MapPin, 
  BarChart3, 
  Heart, 
  Navigation, 
  ShieldCheck, 
  Smartphone, 
  Truck,
  ArrowRight
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Search, MapPin, BarChart3, Heart, Navigation, ShieldCheck, Smartphone, Truck
};

export const ProblemSolutionSection: React.FC = () => {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Why ShareCare Connect?</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          We analyzed the biggest hurdles in charitable giving and built a platform to solve them.
          From logistics to transparency, we've got it covered.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROBLEM_SOLUTIONS.map((item) => {
          const Icon = iconMap[item.iconName] || Heart;
          return (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-red-50 p-3 rounded-lg text-red-500 shrink-0">
                    <Icon size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="mb-4">
                      <span className="text-xs font-semibold text-red-500 uppercase tracking-wide">The Problem</span>
                      <p className="text-slate-700 font-medium mt-1 leading-snug">
                        {item.problem}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2 text-slate-300 mb-4">
                       <ArrowRight size={16} />
                    </div>

                    <div>
                      <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">Our Solution</span>
                      <p className="text-emerald-900 font-medium mt-1 leading-snug">
                        {item.solution}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
