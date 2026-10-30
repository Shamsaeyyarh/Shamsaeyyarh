import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  MapPin, 
  ShieldCheck, 
  Wheat, 
  AlertCircle, 
  Lightbulb, 
  ArrowRight,
  Send
} from 'lucide-react';
import { MARKET_PRICE_INSIGHTS } from '../../data/mockData';

export const AgriPriceAdvisorModal: React.FC = () => {
  const { isAgriAdvisorOpen, setIsAgriAdvisorOpen } = useApp();
  
  const [selectedCrop, setSelectedCrop] = useState<string>('Yellow Maize (100kg)');
  const [customQuery, setCustomQuery] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isAgriAdvisorOpen) return null;

  const currentInsight = MARKET_PRICE_INSIGHTS.find(i => i.crop.toLowerCase().includes(selectedCrop.toLowerCase().split(' ')[0])) || MARKET_PRICE_INSIGHTS[0];

  const handleAskAI = (queryText: string) => {
    if (!queryText.trim()) return;
    setIsLoading(true);

    // Simulate AI response calculation with realistic agronomic market data
    setTimeout(() => {
      setIsLoading(false);
      const textLower = queryText.toLowerCase();

      if (textLower.includes('onion') || textLower.includes('aliero') || textLower.includes('sokoto')) {
        setAiAnalysis(
          `🧅 **Aliero & Sokoto Onion Market Advisory**: Current northern farmgate price is ₦45,000–₦52,000 per 100kg bag. Retailers at Mile 12 are selling at ₦75,000 due to transport fuel spikes. **Recommendation**: Group shipments with cooperative refrigerated trucks to preserve bulb firmness and capture ₦18,000 extra net profit per bag.`
        );
      } else if (textLower.includes('rice') || textLower.includes('kebbi') || textLower.includes('abakaliki')) {
        setAiAnalysis(
          `🌾 **Stone-Free Rice Price Index**: Farmgate paddy is stable, but milled stone-free 50kg bags are trending upward from ₦66,000 to ₦71,000. **Recommendation for Buyers**: Lock forward orders directly through HackAgrifest Escrow now before pre-holiday rush pushes open market prices above ₦92,000.`
        );
      } else if (textLower.includes('tomato') || textLower.includes('jos') || textLower.includes('plateau')) {
        setAiAnalysis(
          `🍅 **Plateau Fresh Tomato Advisory**: Peak harvest in Bokkos and Mangu is yielding surplus volumes. Farmgate price is ₦28,000/basket. Middlemen exploit high post-harvest perishability. **Recommendation for Farmers**: Utilize HackAgrifest cold-chain transit to ship direct to Lagos supermarkets within 24 hours to prevent 35% spoilage losses.`
        );
      } else {
        setAiAnalysis(
          `🌱 **AI Fair Price Intelligence for "${queryText}"**: Direct farmgate benchmark currently yields **32% greater take-home revenue** for farmers compared to local village brokers, while delivering fresh produce to coastal buyers 24–30% below retail depot markups. HackAgrifest Escrow guarantees zero default risk.`
        );
      }
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 to-stone-900 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-[#F4A62A] text-[#252B27] rounded-xl">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-base tracking-tight">
                AgriPrice AI Market Advisor
              </h2>
              <span className="text-xs text-stone-300">
                Live Farmgate vs Middleman Price Intelligence
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsAgriAdvisorOpen(false)}
            className="p-1.5 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Quick Crop Selector Buttons */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
              Select Agricultural Benchmark Index
            </span>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {MARKET_PRICE_INSIGHTS.map((item) => (
                <button
                  key={item.crop}
                  onClick={() => {
                    setSelectedCrop(item.crop);
                    setAiAnalysis(null);
                  }}
                  className={`whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    selectedCrop === item.crop
                      ? 'bg-[#16834B] text-white shadow-xs'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  {item.crop}
                </button>
              ))}
            </div>
          </div>

          {/* Comparative Price Card */}
          <div className="bg-stone-50 rounded-2xl p-4 sm:p-5 border border-stone-200/90 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-500">Benchmark Produce</span>
                <h3 className="text-lg font-extrabold text-stone-900">{currentInsight.crop}</h3>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-lg">
                {currentInsight.priceTrend === 'rising' ? (
                  <>
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Demand Rising</span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="w-3.5 h-3.5" />
                    <span>Harvest Peak Volume</span>
                  </>
                )}
              </div>
            </div>

            {/* Price Comparison Meter */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-2xs">
                <span className="text-[11px] font-semibold text-stone-500 block uppercase">
                  Direct Farmgate Avg
                </span>
                <div className="text-xl font-extrabold text-[#16834B] tabular-nums mt-0.5">
                  ₦{currentInsight.farmgateAvg.toLocaleString()}
                </div>
                <span className="text-[10px] text-stone-400">Paid directly to farmer</span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-2xs">
                <span className="text-[11px] font-semibold text-stone-500 block uppercase">
                  Middleman Retail (Mile 12)
                </span>
                <div className="text-xl font-extrabold text-stone-800 tabular-nums mt-0.5">
                  ₦{currentInsight.middlemanRetailAvg.toLocaleString()}
                </div>
                <span className="text-[10px] text-amber-600 font-medium">
                  +₦{(currentInsight.middlemanRetailAvg - currentInsight.farmgateAvg).toLocaleString()} markup
                </span>
              </div>
            </div>

            {/* Supply & Demand Centers */}
            <div className="grid grid-cols-2 gap-2 text-xs text-stone-600 pt-1">
              <div>
                <span className="text-[10px] text-stone-400 uppercase block font-semibold">Primary Supply Hubs</span>
                <strong className="text-stone-800">{currentInsight.topSupplyRegion}</strong>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 uppercase block font-semibold">High Demand Markets</span>
                <strong className="text-stone-800">{currentInsight.highDemandMarket}</strong>
              </div>
            </div>

            {/* Recommendation */}
            <div className="p-3 bg-white rounded-xl border border-stone-200/80 flex items-start gap-2.5 text-xs text-stone-700">
              <Lightbulb className="w-4 h-4 text-[#F4A62A] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Agronomist Analysis:</strong> {currentInsight.recommendation}
              </p>
            </div>
          </div>

          {/* Custom AI Crop Query Bar */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 block">
              Ask AI About Any Crop or Regional Pricing
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customQuery}
                onChange={(e) => setCustomQuery(e.target.value)}
                placeholder="e.g. Current onion prices in Aliero, or ginger demand in Kaduna..."
                className="flex-1 p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#16834B]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAskAI(customQuery);
                }}
              />
              <button
                onClick={() => handleAskAI(customQuery)}
                disabled={isLoading || !customQuery.trim()}
                className="py-2.5 px-4 bg-[#16834B] hover:bg-[#126c3d] text-white text-xs font-bold rounded-xl transition-colors shadow-xs disabled:opacity-40 flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-[#F4A62A]" />
                <span>{isLoading ? 'Analyzing...' : 'Ask AI'}</span>
              </button>
            </div>

            {/* Quick Prompt Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
              {['Onions in Aliero', 'Plateau Tomatoes', 'Kebbi Rice', 'Kaduna Ginger'].map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCustomQuery(chip);
                    handleAskAI(chip);
                  }}
                  className="whitespace-nowrap px-2.5 py-1 bg-stone-100 hover:bg-stone-200 rounded-lg text-[11px] text-stone-600 transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* AI Response Box */}
          {aiAnalysis && (
            <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200 text-xs text-stone-800 space-y-1.5 animate-in fade-in">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#16834B]">
                <Sparkles className="w-4 h-4 text-[#F4A62A]" />
                <span>AI Market Recommendation</span>
              </div>
              <p className="leading-relaxed whitespace-pre-line text-stone-700">
                {aiAnalysis}
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
