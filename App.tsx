import React, { useState } from 'react';
import { ViewState } from './types';
import { ProblemSolutionSection } from './components/ProblemSolution';
import { Dashboard } from './components/Dashboard';
import { DonationForm } from './components/DonationForm';
import { MOCK_NGOS } from './constants';
import { 
  Heart, 
  Menu, 
  X, 
  Home, 
  LayoutDashboard, 
  Truck, 
  Users,
  Search,
  CheckCircle2,
  Star,
  MapPin
} from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [trackIdInput, setTrackIdInput] = useState('');
  const [trackResult, setTrackResult] = useState<string | null>(null);

  const navItems = [
    { label: 'Home', value: ViewState.HOME, icon: Home },
    { label: 'Donate', value: ViewState.DONATE, icon: Heart },
    { label: 'Data & Impact', value: ViewState.DASHBOARD, icon: LayoutDashboard },
    { label: 'Verified NGOs', value: ViewState.NGOS, icon: Users },
  ];

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation
    if (trackIdInput.length > 5) {
      setTrackResult("Status: In Transit to EduCare Foundation (Est. 2 days)");
    } else {
      setTrackResult("Invalid ID. Please check and try again.");
    }
  };

  const renderContent = () => {
    switch (view) {
      case ViewState.HOME:
        return (
          <>
            {/* Hero */}
            <div className="bg-emerald-900 text-white pt-24 pb-16 px-4 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-800 opacity-20 -skew-x-12 transform translate-x-20"></div>
               <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12">
                 <div className="flex-1 space-y-6">
                    <div className="inline-flex items-center gap-2 bg-emerald-800/50 px-4 py-2 rounded-full text-emerald-100 text-sm font-medium border border-emerald-700">
                       <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                       Connecting Donors & Communities
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                       Make Giving <span className="text-green-400">Simple</span> & Transparent.
                    </h1>
                    <p className="text-emerald-100 text-lg max-w-lg">
                      Don't let your unused stationery and clothes gather dust. 
                      We handle the logistics, tracking, and matching so you can focus on the impact.
                    </p>
                    <div className="flex gap-4 pt-4">
                      <button 
                        onClick={() => setView(ViewState.DONATE)}
                        className="bg-green-500 hover:bg-green-400 text-emerald-950 px-8 py-3 rounded-lg font-bold transition-all shadow-lg hover:shadow-green-500/20"
                      >
                        Start Donating
                      </button>
                      <button 
                        onClick={() => setView(ViewState.TRACK)}
                        className="bg-transparent border border-emerald-700 hover:bg-emerald-800 text-white px-8 py-3 rounded-lg font-medium transition-all"
                      >
                        Track Donation
                      </button>
                    </div>
                 </div>
                 <div className="flex-1 w-full max-w-md">
                   <div className="bg-white/10 backdrop-blur-sm p-2 rounded-2xl border border-white/20 shadow-2xl">
                     <img 
                       src="https://picsum.photos/600/400" 
                       alt="Happy children with school supplies" 
                       className="rounded-xl w-full h-auto object-cover"
                     />
                   </div>
                 </div>
               </div>
            </div>

            {/* Problem & Solution Grid (User's core request) */}
            <ProblemSolutionSection />

            {/* Impact Dashboard Section */}
            <div className="bg-slate-100/50 border-t border-slate-200">
               <Dashboard />
            </div>
          </>
        );

      case ViewState.DONATE:
        return <DonationForm />;

      case ViewState.DASHBOARD:
        return <Dashboard />;

      case ViewState.NGOS:
        return (
          <div className="max-w-7xl mx-auto p-6 mt-6">
            <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <Users className="text-emerald-600" />
              Verified NGO Directory
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {MOCK_NGOS.map(ngo => (
                <div key={ngo.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-xl text-slate-800">{ngo.name}</h3>
                    {ngo.verified && (
                       <span className="flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                         <CheckCircle2 size={12} /> Verified
                       </span>
                    )}
                  </div>
                  <p className="text-slate-600 text-sm mb-4 min-h-[40px]">{ngo.description}</p>
                  <div className="flex items-center gap-2 mb-4 text-sm text-slate-500">
                    <MapPin size={16} /> {ngo.location}
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                     <div className="flex gap-1">
                        {ngo.focus.map(f => (
                          <span key={f} className="text-[10px] uppercase font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded">
                            {f}
                          </span>
                        ))}
                     </div>
                     <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                       <Star size={14} fill="currentColor" /> {ngo.rating}
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case ViewState.TRACK:
        return (
          <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl shadow-xl border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-2 flex items-center gap-2">
              <Truck className="text-blue-600" />
              Track Donation
            </h2>
            <p className="text-slate-500 mb-6">Enter your unique ID to see where your items are.</p>
            <form onSubmit={handleTrack} className="space-y-4">
              <input 
                type="text" 
                placeholder="Enter Donation ID (e.g., DON-X9Y2...)"
                className="w-full p-4 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono"
                value={trackIdInput}
                onChange={(e) => setTrackIdInput(e.target.value)}
              />
              <button className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-colors">
                Track Status
              </button>
            </form>
            {trackResult && (
              <div className="mt-6 p-4 bg-blue-50 text-blue-800 rounded-lg border border-blue-100 animate-in fade-in slide-in-from-bottom-2">
                {trackResult}
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div 
              className="flex items-center gap-2 font-bold text-xl text-emerald-700 cursor-pointer"
              onClick={() => setView(ViewState.HOME)}
            >
              <div className="bg-emerald-100 p-2 rounded-lg">
                <Heart size={20} className="text-emerald-600" fill="currentColor" />
              </div>
              ShareCare
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setView(item.value)}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    view === item.value 
                    ? 'text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full' 
                    : 'text-slate-600 hover:text-emerald-600'
                  }`}
                >
                  <item.icon size={16} />
                  {item.label}
                </button>
              ))}
              <button 
                onClick={() => setView(ViewState.TRACK)}
                className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
              >
                Track ID
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 absolute w-full shadow-lg">
            <div className="p-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    setView(item.value);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full p-3 rounded-lg text-sm font-medium ${
                    view === item.value 
                    ? 'bg-emerald-50 text-emerald-700' 
                    : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
              <div className="pt-2 border-t border-slate-100 mt-2">
                <button 
                  onClick={() => { setView(ViewState.TRACK); setMobileMenuOpen(false); }}
                  className="w-full text-left p-3 text-sm font-medium text-slate-600 flex items-center gap-3"
                >
                  <Search size={18} />
                  Track Donation
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-16 min-h-[calc(100vh-4rem)]">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 font-bold text-white text-xl mb-4">
              <Heart size={20} className="text-emerald-500" fill="currentColor" />
              ShareCare Connect
            </div>
            <p className="max-w-xs text-sm leading-relaxed">
              Bridging the gap between surplus and scarcity. We use technology to ensure your donations reach the hands that need them most, transparently and efficiently.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => setView(ViewState.DONATE)} className="hover:text-emerald-400">Donate Now</button></li>
              <li><button onClick={() => setView(ViewState.NGOS)} className="hover:text-emerald-400">Verified NGOs</button></li>
              <li><button onClick={() => setView(ViewState.DASHBOARD)} className="hover:text-emerald-400">Impact Dashboard</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li>About Us</li>
              <li>Contact Support</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-xs">
          © {new Date().getFullYear()} ShareCare Connect. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;