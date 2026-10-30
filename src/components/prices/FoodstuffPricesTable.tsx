import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ProduceCategory, NigerianFoodstuffPrice } from '../../types';
import { NIGERIAN_FOODSTUFF_HARVEST_PRICES } from '../../data/mockData';
import { 
  Search, 
  MapPin, 
  TrendingDown, 
  Calendar, 
  ShieldCheck, 
  Wheat, 
  ShoppingBag, 
  ArrowRight,
  Filter,
  Sparkles
} from 'lucide-react';

export const FoodstuffPricesTable: React.FC = () => {
  const { openCheckout, produceList, setSelectedProduce, setIsAgriAdvisorOpen } = useApp();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories: ProduceCategory[] = [
    'Grains & Cereals',
    'Tubers & Roots',
    'Vegetables & Peppers',
    'Legumes & Beans',
    'Cash Crops & Spices'
  ];

  const filtered = useMemo(() => {
    return NIGERIAN_FOODSTUFF_HARVEST_PRICES.filter(item => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchQuery = 
        item.foodstuff.toLowerCase().includes(search.toLowerCase()) ||
        item.varietyOrGrade.toLowerCase().includes(search.toLowerCase()) ||
        item.harvestStates.some((s: string) => s.toLowerCase().includes(search.toLowerCase())) ||
        item.standardMeasurement.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [search, selectedCategory]);

  return (
    <div className="space-y-6 pb-24 md:pb-12 max-w-6xl mx-auto px-4 sm:px-6 pt-4">
      
      {/* Title & Overview Banner */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#16834B] uppercase tracking-wider mb-1">
              <Wheat className="w-4 h-4" />
              <span>Nigerian Harvested Foodstuffs Directory & Prices</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
              Current Nigerian Farmgate Produce Price Index
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              Verified harvest prices for staple crops harvested by Nigerian farmers across the Northern, Middle-Belt, and Southern agricultural corridors.
            </p>
          </div>

          <button
            onClick={() => setIsAgriAdvisorOpen(true)}
            className="flex items-center gap-2 bg-[#16834B] hover:bg-[#126c3d] text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-xs transition-colors whitespace-nowrap self-start sm:self-auto"
          >
            <Sparkles className="w-4 h-4 text-[#F4A62A]" />
            <span>AI Price Forecasting</span>
          </button>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="pt-4 border-t border-stone-100 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search rice, maize, yam, garri, pepper, tomatoes, onions, Kano, Benue, Plateau..."
              className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#16834B]"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#16834B] text-white shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
              }`}
            >
              All Harvested Stuffs ({NIGERIAN_FOODSTUFF_HARVEST_PRICES.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#16834B] text-white font-semibold shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Foodstuffs Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-stone-500">
          <span>Displaying {filtered.length} Nigerian agricultural staples</span>
          <span>All prices in Nigerian Naira (₦)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => {
            // Find if there is an active marketplace listing for this
            const matchingListing = produceList.find(
              p => p.title.toLowerCase().includes(item.foodstuff.toLowerCase().split(' ')[0]) ||
                   item.foodstuff.toLowerCase().includes(p.title.toLowerCase().split(' ')[0])
            );

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-stone-200/90 hover:border-[#16834B]/60 p-5 shadow-2xs hover:shadow-xs transition-all space-y-3.5 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[10px] font-bold text-[#16834B] bg-[#16834B]/10 px-2 py-0.5 rounded-full">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-stone-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-stone-400" />
                      <span>{item.peakHarvestSeason}</span>
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-stone-900 text-sm sm:text-base leading-snug">
                      {item.foodstuff}
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {item.varietyOrGrade} · <strong>{item.standardMeasurement}</strong>
                    </p>
                  </div>

                  {/* Pricing Comparison */}
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/70 space-y-1.5">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] text-stone-400 font-bold uppercase block">
                          Direct Farmgate Price
                        </span>
                        <div className="text-lg font-extrabold text-[#16834B] tabular-nums">
                          ₦{item.farmgatePriceNaira.toLocaleString()}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-stone-400 block line-through tabular-nums">
                          ₦{item.middlemanRetailPriceNaira.toLocaleString()} Retail
                        </span>
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                          Save ₦{item.savingsAmountNaira.toLocaleString()} ({item.savingsPercentage}%)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Harvest Belts */}
                  <div className="space-y-1 text-xs">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                      Major Nigerian Harvest States
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {item.harvestStates.map((st: string, i: number) => (
                        <span key={i} className="text-[11px] text-stone-700 bg-stone-100 px-2 py-0.5 rounded-md">
                          {st}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quality Indicators */}
                  <div className="text-[11px] text-stone-500 space-y-0.5 pt-1">
                    <span className="font-semibold text-stone-700 block">Quality Checklist:</span>
                    {item.keyQualityIndicators.map((ind: string, i: number) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#16834B]" />
                        <span>{ind}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Action Button */}
                <div className="pt-2 border-t border-stone-100">
                  {matchingListing ? (
                    <button
                      onClick={() => setSelectedProduce(matchingListing)}
                      className="w-full py-2.5 px-3 bg-[#16834B] hover:bg-[#126c3d] text-white text-xs font-bold rounded-xl transition-colors shadow-2xs flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Order Listed Batch (₦{matchingListing.unitPrice.toLocaleString()})</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsAgriAdvisorOpen(true)}
                      className="w-full py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#F4A62A]" />
                      <span>Ask AI for Suppliers</span>
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
