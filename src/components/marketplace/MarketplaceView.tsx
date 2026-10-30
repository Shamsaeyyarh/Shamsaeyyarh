import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ProduceCategory, ProduceItem } from '../../types';
import { 
  Search, 
  MapPin, 
  ShieldCheck, 
  Star, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  Filter, 
  CheckCircle2, 
  Info,
  TrendingDown,
  ShoppingBag,
  MessageSquare
} from 'lucide-react';
import { HERO_IMAGE } from '../../data/mockData';

const CATEGORIES: ProduceCategory[] = [
  'Grains & Cereals',
  'Tubers & Roots',
  'Vegetables & Peppers',
  'Legumes & Beans'
];

export const MarketplaceView: React.FC = () => {
  const { 
    produceList, 
    setSelectedProduce, 
    openCheckout, 
    startChatWithFarmer,
    setSelectedFarmerId,
    setIsAgriAdvisorOpen,
    setActiveTab,
    t 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedState, setSelectedState] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'price_low' | 'price_high' | 'savings'>('recommended');

  // Extract unique states
  const states = useMemo(() => {
    const list = Array.from(new Set(produceList.map(p => p.farmerLocation.state)));
    return list.sort();
  }, [produceList]);

  // Filter & Sort
  const filteredProduce = useMemo(() => {
    return produceList.filter(item => {
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.farmerLocation.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.farmerLocation.city.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesState = selectedState === 'all' || item.farmerLocation.state === selectedState;

      return matchesSearch && matchesCategory && matchesState;
    }).sort((a, b) => {
      if (sortBy === 'price_low') return a.unitPrice - b.unitPrice;
      if (sortBy === 'price_high') return b.unitPrice - a.unitPrice;
      if (sortBy === 'savings') return b.estimatedBuyerSavingsPercent - a.estimatedBuyerSavingsPercent;
      return 0; // recommended order
    });
  }, [produceList, searchQuery, selectedCategory, selectedState, sortBy]);

  return (
    <div className="space-y-6 pb-20 md:pb-12 max-w-7xl mx-auto px-4 sm:px-6 pt-4">
      
      {/* Hero Showcase Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-sm border border-stone-200/90 bg-[#252B27] text-white">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Fertile Nigerian Agricultural Fields"
            className="w-full h-full object-cover opacity-35"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#252B27] via-[#252B27]/85 to-transparent" />
        </div>

        <div className="relative p-6 sm:p-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#F4A62A] uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#F4A62A]" />
            <span>Farmgate Direct Marketplace</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Fresh Produce Straight From Nigerian Farms
          </h1>

          <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
            Eliminate exploitative middlemen. Purchase verified grains, tubers, and vegetables at true farmgate prices with 100% Escrow security.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                const el = document.getElementById('produce-grid');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-[#16834B] hover:bg-[#126c3d] text-white font-semibold text-xs sm:text-sm py-2.5 px-5 rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <span>Explore Farmgate Produce</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsAgriAdvisorOpen(true)}
              className="bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm py-2.5 px-4 rounded-xl backdrop-blur-md border border-white/20 transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#F4A62A]" />
              <span>Check Market Price Index</span>
            </button>
          </div>

          {/* Value props strip */}
          <div className="pt-4 grid grid-cols-3 gap-2 border-t border-white/15 text-xs text-stone-300">
            <div>
              <span className="font-bold text-white block text-sm">~28% Cheaper</span>
              <span>Than Mile 12 / Bodija</span>
            </div>
            <div>
              <span className="font-bold text-white block text-sm">Escrow Protected</span>
              <span>Inspect before release</span>
            </div>
            <div>
              <span className="font-bold text-white block text-sm">Farm Traceability</span>
              <span>Direct farmer contact</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white rounded-2xl p-4 shadow-2xs border border-stone-200/80 space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search rice, maize, tomatoes, onions, yam, Kano, Plateau..."
              className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#16834B] focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
              >
                Clear
              </button>
            )}
          </div>

          {/* Nigerian State Selector */}
          <div className="flex items-center gap-2">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="py-2.5 px-3 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#16834B]"
            >
              <option value="all">All Farm States</option>
              {states.map(s => (
                <option key={s} value={s}>{s} State</option>
              ))}
            </select>

            {/* Sort selector */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="py-2.5 px-3 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#16834B]"
            >
              <option value="recommended">Recommended</option>
              <option value="savings">Highest Savings vs Middleman</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Horizontal Segmented Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#16834B] text-white shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
            }`}
          >
            All Produce ({produceList.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = produceList.filter(p => p.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#16834B] text-white font-semibold shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
                }`}
              >
                {cat} {count > 0 ? `(${count})` : ''}
              </button>
            );
          })}
        </div>
      </div>

      {/* Middleman Elimination Value Comparison Card */}
      <div className="bg-gradient-to-r from-emerald-50 via-amber-50/40 to-stone-50 rounded-2xl p-4 sm:p-5 border border-emerald-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-[#16834B] uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[#16834B]" />
            <span>Eliminating Exploitative Middlemen</span>
          </div>
          <p className="text-xs sm:text-sm text-stone-700">
            Traditional Nigerian trade adds 3–4 middlemen between farmgate and table, siphoning up to 45% of value. On HackAgrifest, farmers earn +35% more while buyers save ~28% with 100% Escrow security.
          </p>
          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={() => setActiveTab('awareness')}
              className="text-xs font-bold text-[#16834B] hover:underline flex items-center gap-1"
            >
              <span>Read Fair Trade Awareness Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-stone-300">·</span>
            <button
              onClick={() => setActiveTab('prices')}
              className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1"
            >
              <span>View All 15+ Harvest Prices</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <div className="shrink-0 flex items-center gap-3 text-xs">
          <div className="bg-white px-3 py-2 rounded-xl border border-stone-200 text-center">
            <span className="text-[10px] text-stone-500 block">Farmer Takes Home</span>
            <span className="font-extrabold text-[#16834B] text-base">+35%</span>
          </div>
          <div className="bg-white px-3 py-2 rounded-xl border border-stone-200 text-center">
            <span className="text-[10px] text-stone-500 block">Buyer Net Savings</span>
            <span className="font-extrabold text-[#F4A62A] text-base">~28%</span>
          </div>
        </div>
      </div>

      {/* Produce Grid */}
      <div id="produce-grid" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#252B27] tracking-tight">
            Available Farmgate Produce ({filteredProduce.length})
          </h2>
          <span className="text-xs text-stone-500">
            Prices displayed in Nigerian Naira (₦)
          </span>
        </div>

        {filteredProduce.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8 space-y-3">
            <p className="text-base font-semibold text-stone-700">No produce matches your filter</p>
            <p className="text-xs text-stone-500">Try adjusting your search keywords or switching category filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedState('all');
              }}
              className="text-xs font-semibold text-[#16834B] underline mt-2"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProduce.map((produce) => {
              const unitSavings = produce.middlemanRetailPrice - produce.unitPrice;
              return (
                <div
                  key={produce.id}
                  className="group bg-white rounded-2xl border border-stone-200/90 hover:border-[#16834B]/60 shadow-2xs hover:shadow-md transition-all flex flex-col overflow-hidden"
                >
                  {/* Produce Image Card Top */}
                  <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                    <img
                      src={produce.image}
                      alt={produce.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient Overlay for badges */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

                    {/* Category unboxed tag on top left */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-semibold text-stone-800 shadow-2xs">
                      {produce.category}
                    </div>

                    {/* Middleman Savings Badge on top right */}
                    <div className="absolute top-3 right-3 bg-[#16834B] text-white px-2.5 py-1 rounded-lg text-[11px] font-bold shadow-2xs flex items-center gap-1">
                      <TrendingDown className="w-3.5 h-3.5" />
                      <span>Save {produce.estimatedBuyerSavingsPercent}%</span>
                    </div>

                    {/* Organic badge if true */}
                    {produce.isOrganic && (
                      <div className="absolute bottom-3 left-3 bg-emerald-900/80 text-emerald-100 backdrop-blur-sm text-[10px] font-medium px-2 py-0.5 rounded-md">
                        100% Organic
                      </div>
                    )}

                    <div className="absolute bottom-3 right-3 bg-black/60 text-white backdrop-blur-sm text-[10px] font-medium px-2 py-0.5 rounded-md">
                      {produce.availableQuantity} in stock
                    </div>
                  </div>

                  {/* Produce Card Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    
                    {/* Farmer identity row */}
                    <div className="flex items-center justify-between text-xs text-stone-500 border-b border-stone-100 pb-2.5">
                      <button
                        onClick={() => setSelectedFarmerId(produce.farmerId)}
                        className="flex items-center gap-2 hover:text-[#16834B] transition-colors text-left"
                      >
                        <img
                          src={produce.farmerAvatar}
                          alt={produce.farmerName}
                          className="w-6 h-6 rounded-full object-cover ring-1 ring-stone-200"
                          referrerPolicy="no-referrer"
                        />
                        <span className="font-semibold text-stone-800 truncate max-w-[130px]">
                          {produce.farmerName}
                        </span>
                        {produce.isVerifiedFarmer && (
                          <ShieldCheck className="w-3.5 h-3.5 text-[#16834B] shrink-0" />
                        )}
                      </button>

                      <div className="flex items-center gap-1 text-[11px] text-stone-600">
                        <MapPin className="w-3 h-3 text-stone-400" />
                        <span>{produce.farmerLocation.city}, {produce.farmerLocation.state}</span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 
                        onClick={() => setSelectedProduce(produce)}
                        className="font-bold text-stone-900 text-sm leading-snug hover:text-[#16834B] cursor-pointer transition-colors line-clamp-1"
                      >
                        {produce.title}
                      </h3>
                      <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                        {produce.description}
                      </p>
                    </div>

                    {/* Unboxed Metadata (Zero-Pill discipline compliant) */}
                    <div className="flex items-center gap-2 text-[11px] text-stone-500 pt-1">
                      <span>Harvest: {produce.harvestDate}</span>
                      <span aria-hidden="true">·</span>
                      <span>Min: {produce.minimumOrderQuantity} {produce.unitMeasurement.split(' ')[0]}s</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-0.5 text-amber-600 font-medium">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <span>{produce.farmerRating}</span>
                      </span>
                    </div>

                    {/* Price and Comparison Block */}
                    <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200/60">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-[10px] text-stone-500 block uppercase font-medium">Farmgate Direct</span>
                          <div className="text-lg font-extrabold text-[#16834B] tabular-nums">
                            ₦{produce.unitPrice.toLocaleString()}
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] text-stone-400 block line-through tabular-nums">
                            ₦{produce.middlemanRetailPrice.toLocaleString()} retail
                          </span>
                          <span className="text-[11px] font-semibold text-emerald-700 tabular-nums">
                            -₦{unitSavings.toLocaleString()} saved/unit
                          </span>
                        </div>
                      </div>
                      <div className="text-[10px] text-stone-500 mt-1">
                        Per {produce.unitMeasurement}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-1 flex items-center gap-2">
                      <button
                        onClick={() => startChatWithFarmer(produce.farmerId, produce)}
                        className="p-2.5 rounded-xl border border-stone-200 hover:border-stone-300 text-stone-700 hover:bg-stone-50 transition-colors"
                        title="Chat with Farmer"
                        aria-label="Chat with Farmer"
                      >
                        <MessageSquare className="w-4 h-4 text-stone-600" />
                      </button>

                      <button
                        onClick={() => setSelectedProduce(produce)}
                        className="flex-1 py-2.5 px-3 rounded-xl border border-stone-200 hover:border-stone-300 bg-white text-stone-800 text-xs font-semibold hover:bg-stone-50 transition-colors text-center"
                      >
                        View Details
                      </button>

                      <button
                        onClick={() => openCheckout(produce)}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-[#16834B] hover:bg-[#126c3d] text-white text-xs font-semibold shadow-2xs hover:shadow-sm transition-all flex items-center justify-center gap-1 active:scale-[0.98]"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Order Now</span>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
