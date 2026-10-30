import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  TrendingDown, 
  Wheat, 
  ShoppingBag, 
  AlertTriangle, 
  CheckCircle2, 
  Lightbulb, 
  Truck, 
  BookOpen, 
  Leaf, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { AWARENESS_GUIDES } from '../../data/mockData';

export const AwarenessView: React.FC = () => {
  const { setActiveTab, setIsAgriAdvisorOpen } = useApp();
  const [filterAudience, setFilterAudience] = useState<'all' | 'farmer' | 'buyer'>('all');
  const [selectedCropSim, setSelectedCropSim] = useState<'tomatoes' | 'maize' | 'yam' | 'rice'>('tomatoes');

  // Interactive Simulation Data
  const simData = {
    tomatoes: {
      crop: 'Fresh Jos Tomatoes (Large Basket)',
      traditionalFarmerPaid: 25000,
      middleman1Markup: 5500,
      middleman2Markup: 4500,
      retailerMarkup: 7000,
      traditionalConsumerPaid: 42000,
      directFarmgatePrice: 28500,
      directBuyerPaidTotal: 31000,
      farmerExtraEarnings: 3500,
      buyerSavingsTotal: 11000
    },
    maize: {
      crop: 'Yellow Maize (100kg Jute Bag)',
      traditionalFarmerPaid: 36000,
      middleman1Markup: 7000,
      middleman2Markup: 6500,
      retailerMarkup: 8500,
      traditionalConsumerPaid: 58000,
      directFarmgatePrice: 42000,
      directBuyerPaidTotal: 44500,
      farmerExtraEarnings: 6000,
      buyerSavingsTotal: 13500
    },
    yam: {
      crop: 'Zaki Biam White Yam (50 Tubers)',
      traditionalFarmerPaid: 45000,
      middleman1Markup: 11000,
      middleman2Markup: 9000,
      retailerMarkup: 13000,
      traditionalConsumerPaid: 78000,
      directFarmgatePrice: 55000,
      directBuyerPaidTotal: 58500,
      farmerExtraEarnings: 10000,
      buyerSavingsTotal: 19500
    },
    rice: {
      crop: 'Stone-Free Rice (50kg Bag)',
      traditionalFarmerPaid: 58000,
      middleman1Markup: 10000,
      middleman2Markup: 8000,
      retailerMarkup: 13000,
      traditionalConsumerPaid: 89000,
      directFarmgatePrice: 68000,
      directBuyerPaidTotal: 71000,
      farmerExtraEarnings: 10000,
      buyerSavingsTotal: 18000
    }
  };

  const activeSim = simData[selectedCropSim];

  const displayedGuides = AWARENESS_GUIDES.filter(g => {
    if (filterAudience === 'all') return true;
    return g.targetAudience === filterAudience || g.targetAudience === 'both';
  });

  return (
    <div className="space-y-8 pb-24 md:pb-12 max-w-5xl mx-auto px-4 sm:px-6 pt-4">
      
      {/* Awareness Header */}
      <div className="bg-gradient-to-br from-[#16834B] to-[#0d4f2d] text-white rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden space-y-4">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#F4A62A]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#F4A62A] tracking-wider uppercase">
          <ShieldCheck className="w-4 h-4" />
          <span>Fair Trade & Post-Harvest Education</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight max-w-2xl">
          Empowering Nigerian Farmers. Protecting Direct Food Buyers.
        </h1>

        <p className="text-xs sm:text-sm text-stone-200 max-w-2xl leading-relaxed">
          Why do Nigerian food prices soar while farmers stay in debt? Understand the multi-layered middleman structure, learn post-harvest storage techniques, and master your inspection escrow rights.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => {
              const el = document.getElementById('middleman-simulator');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-[#F4A62A] hover:bg-[#e0941e] text-[#252B27] font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <span>Launch Middleman Simulator</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsAgriAdvisorOpen(true)}
            className="bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm py-2.5 px-4 rounded-xl backdrop-blur-md border border-white/20 transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-[#F4A62A]" />
            <span>Consult AI Agri-Advisor</span>
          </button>
        </div>
      </div>

      {/* Interactive Middleman Simulator */}
      <div id="middleman-simulator" className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
              <span>Interactive Middleman Elimination Simulator</span>
            </h2>
            <p className="text-xs text-stone-500">
              See where every Naira goes in traditional open markets versus HackAgrifest Direct.
            </p>
          </div>

          {/* Crop selector */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl overflow-x-auto no-scrollbar">
            <button
              onClick={() => setSelectedCropSim('tomatoes')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCropSim === 'tomatoes' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600'
              }`}
            >
              🍅 Jos Tomatoes
            </button>
            <button
              onClick={() => setSelectedCropSim('maize')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCropSim === 'maize' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600'
              }`}
            >
              🌾 Yellow Maize
            </button>
            <button
              onClick={() => setSelectedCropSim('yam')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCropSim === 'yam' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600'
              }`}
            >
              🥔 Benue Yam
            </button>
            <button
              onClick={() => setSelectedCropSim('rice')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCropSim === 'rice' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600'
              }`}
            >
              🍚 Abakaliki Rice
            </button>
          </div>
        </div>

        {/* Side by side comparison cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Traditional Middleman Chain */}
          <div className="p-5 rounded-2xl bg-red-50/50 border border-red-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-red-900 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span>Traditional Multi-Tier Middlemen</span>
              </span>
              <span className="text-xs font-mono font-bold text-red-700">Broken System</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-red-100">
                <span className="text-stone-600">Farmer is Paid at Gate</span>
                <strong className="text-stone-900 tabular-nums">₦{activeSim.traditionalFarmerPaid.toLocaleString()}</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-red-100 text-red-800">
                <span>+ Village Agent Commission</span>
                <span className="font-semibold tabular-nums">+₦{activeSim.middleman1Markup.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-red-100 text-red-800">
                <span>+ Regional Transit Middleman</span>
                <span className="font-semibold tabular-nums">+₦{activeSim.middleman2Markup.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-red-100 text-red-800">
                <span>+ Market Union Retail Markup (Mile 12)</span>
                <span className="font-semibold tabular-nums">+₦{activeSim.retailerMarkup.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-2 text-sm font-extrabold text-stone-900">
                <span>Final Price Buyer Pays</span>
                <span className="text-red-700 tabular-nums">₦{activeSim.traditionalConsumerPaid.toLocaleString()}</span>
              </div>
            </div>

            <div className="p-2.5 bg-red-100/60 rounded-xl text-[11px] text-red-900">
              <strong>Outcome:</strong> Farmer only receives ~55% of the produce value while bearing all production risks.
            </div>
          </div>

          {/* HackAgrifest Direct Trade */}
          <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#16834B] uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#16834B]" />
                <span>HackAgrifest Direct Farmgate</span>
              </span>
              <span className="text-xs font-bold text-[#16834B] bg-[#16834B]/10 px-2 py-0.5 rounded-full">Fair Trade</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-emerald-100">
                <span className="text-stone-700 font-semibold">Farmer Direct Payout</span>
                <strong className="text-[#16834B] font-extrabold tabular-nums">
                  ₦{activeSim.directFarmgatePrice.toLocaleString()} (+₦{activeSim.farmerExtraEarnings.toLocaleString()})
                </strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-emerald-100 text-stone-600">
                <span>Middlemen Commission</span>
                <strong className="text-[#16834B]">₦0 (Zero Markup)</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-emerald-100 text-stone-600">
                <span>Agrifest Cold-Chain Freight</span>
                <span className="font-semibold tabular-nums">₦2,500</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-emerald-100 text-stone-600">
                <span>100% Escrow Guarantee</span>
                <span className="font-semibold tabular-nums">Protected</span>
              </div>
              <div className="flex justify-between pt-2 text-sm font-extrabold text-stone-900">
                <span>Final Price Buyer Pays</span>
                <span className="text-[#16834B] tabular-nums">₦{activeSim.directBuyerPaidTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="p-2.5 bg-emerald-100/80 rounded-xl text-[11px] text-emerald-950 font-medium">
              <strong>Outcome:</strong> Farmer takes home <span className="font-bold text-[#16834B]">+35% more cash</span>, and the buyer saves <span className="font-bold text-[#16834B]">₦{activeSim.buyerSavingsTotal.toLocaleString()}</span> per unit!
            </div>
          </div>

        </div>
      </div>

      {/* Awareness Guides Segmented Tabs */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-stone-900 tracking-tight">
              Educational Guides & Best Practices
            </h2>
            <p className="text-xs text-stone-500">
              Field-tested agricultural insights curated for Nigerian farmers and commercial food buyers.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl self-start sm:self-auto">
            <button
              onClick={() => setFilterAudience('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterAudience === 'all' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600'
              }`}
            >
              All Topics
            </button>
            <button
              onClick={() => setFilterAudience('farmer')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterAudience === 'farmer' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600'
              }`}
            >
              🌾 For Farmers
            </button>
            <button
              onClick={() => setFilterAudience('buyer')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterAudience === 'buyer' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600'
              }`}
            >
              🛒 For Buyers
            </button>
          </div>
        </div>

        {/* Guides Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {displayedGuides.map((guide) => (
            <div
              key={guide.id}
              className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-2xs hover:shadow-xs transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#16834B] bg-[#16834B]/10 px-2.5 py-0.5 rounded-full text-[10px]">
                    {guide.category}
                  </span>
                  <span className="text-[11px] text-stone-400">
                    {guide.readingTimeMinutes} min read
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-stone-900 leading-snug">
                  {guide.title}
                </h3>

                <p className="text-xs text-stone-500 leading-relaxed">
                  {guide.subtitle}
                </p>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/70 text-xs text-stone-700 leading-relaxed space-y-2">
                  {guide.contentParagraphs.map((p: string, idx: number) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>

              {/* Action Checklist */}
              <div className="space-y-2 pt-2 border-t border-stone-100">
                <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block">
                  Action Checklist
                </span>
                <ul className="space-y-1.5 text-xs text-stone-600">
                  {guide.actionChecklist.map((act: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#16834B] shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
