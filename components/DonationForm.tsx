import React, { useState } from 'react';
import { DonationType } from '../types';
import { generateImpactStory, suggestNgoMatch } from '../services/geminiService';
import { Loader2, CheckCircle2, Package, Sparkles } from 'lucide-react';

export const DonationForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [impactStory, setImpactStory] = useState<string | null>(null);
  const [trackingId, setTrackingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    type: DonationType.STATIONERY,
    items: '',
    address: '',
    pickupTime: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API delay and processing
    const generatedId = "DON-" + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    // Call Gemini for impact story
    const story = await generateImpactStory(formData.type, formData.items);
    
    setTrackingId(generatedId);
    setImpactStory(story);
    setLoading(false);
    setStep(2);
  };

  if (step === 2) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-emerald-100 mt-10 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-emerald-100 p-4 rounded-full">
            <CheckCircle2 size={48} className="text-emerald-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Donation Scheduled!</h2>
        <p className="text-slate-600 mb-6">Your pickup has been automated.</p>
        
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-6 text-left">
          <p className="text-xs text-slate-500 uppercase font-bold mb-1">Your Tracking ID</p>
          <p className="text-xl font-mono font-bold text-slate-800 tracking-wider">{trackingId}</p>
          <p className="text-xs text-slate-400 mt-2">Use this to track your donation's journey (Solution #2).</p>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100 mb-6 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
             <Sparkles size={64} className="text-indigo-600" />
           </div>
           <h3 className="text-indigo-900 font-bold flex items-center justify-center gap-2 mb-3">
             <Sparkles size={18} />
             AI-Predicted Impact
           </h3>
           <p className="text-indigo-800 italic text-lg leading-relaxed">"{impactStory}"</p>
        </div>

        <button 
          onClick={() => { setStep(1); setTrackingId(null); setImpactStory(null); }}
          className="bg-slate-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors"
        >
          Make Another Donation
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="bg-emerald-600 p-6 text-white">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Package />
            Schedule Pickup
          </h2>
          <p className="text-emerald-100 opacity-90 mt-1">Simple. Fast. Impactful.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">What are you donating?</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.values(DonationType).map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setFormData({...formData, type})}
                  className={`p-3 text-sm rounded-lg border transition-all ${
                    formData.type === type 
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-700 font-medium' 
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Item Details</label>
            <textarea 
              required
              className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              placeholder="E.g., 5 unused notebooks, 2 boxes of pencils..."
              rows={3}
              value={formData.items}
              onChange={(e) => setFormData({...formData, items: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Pickup Address</label>
                <input 
                  type="text"
                  required
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="Street, City"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
             </div>
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Time</label>
                <input 
                  type="datetime-local"
                  required
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={formData.pickupTime}
                  onChange={(e) => setFormData({...formData, pickupTime: e.target.value})}
                />
             </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Confirm Pickup'}
          </button>
          
          <p className="text-center text-xs text-slate-400">
            By confirming, you agree to our logistics terms (Solution #8).
          </p>
        </form>
      </div>
    </div>
  );
};
