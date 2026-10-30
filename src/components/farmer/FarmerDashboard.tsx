import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Plus, 
  Package, 
  TrendingUp, 
  ShieldCheck, 
  MapPin, 
  Edit3, 
  Trash2, 
  Sparkles, 
  Truck, 
  Wheat, 
  CheckCircle2, 
  Clock, 
  AlertTriangle 
} from 'lucide-react';
import { ProduceItem } from '../../types';

export const FarmerDashboard: React.FC = () => {
  const { 
    currentUser, 
    produceList, 
    orders, 
    setIsAddProduceOpen, 
    deleteProduce,
    updateProduce,
    setActiveTab,
    setIsAgriAdvisorOpen
  } = useApp();

  const farmerListings = produceList.filter(p => p.farmerId === currentUser.id);
  const farmerOrders = orders.filter(o => o.farmerId === currentUser.id);
  
  // Calculate stats
  const totalRevenue = farmerOrders
    .filter(o => o.status === 'completed' || o.escrowSecured)
    .reduce((acc, o) => acc + o.totalProduceAmount, 0);

  const pendingOrders = farmerOrders.filter(
    o => o.status === 'pending_confirmation' || o.status === 'harvest_packaging'
  );

  return (
    <div className="space-y-6 pb-24 md:pb-12 max-w-6xl mx-auto px-4 sm:px-6 pt-4">
      
      {/* Farmer Farm Profile Overview Card */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#16834B]/30"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-stone-900 tracking-tight">
                  {currentUser.farmName || currentUser.name}
                </h1>
                {currentUser.isVerified && (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-[#16834B] bg-[#16834B]/10 px-2 py-0.5 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Farm Gate</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-500 mt-0.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                <span>{currentUser.location.farmAddress || `${currentUser.location.city}, ${currentUser.location.state} State`}</span>
                <span aria-hidden="true">·</span>
                <span>{currentUser.farmSizeHectares || 24} Hectares</span>
              </p>
              <div className="text-[11px] text-stone-400 mt-1">
                Member of {currentUser.cooperativeName || 'National Agricultural Producers Union'}
              </div>
            </div>
          </div>

          {/* Quick List Produce CTA */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsAgriAdvisorOpen(true)}
              className="flex items-center gap-1.5 py-2.5 px-3.5 rounded-xl border border-stone-200 hover:border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-semibold transition-colors"
            >
              <Sparkles className="w-4 h-4 text-[#F4A62A]" />
              <span>AgriPrice Index</span>
            </button>

            <button
              onClick={() => setIsAddProduceOpen(true)}
              className="flex items-center gap-1.5 bg-[#16834B] hover:bg-[#126c3d] text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Upload Produce</span>
            </button>
          </div>
        </div>

        {/* KPI Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 border-t border-stone-100 mt-6">
          <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/60">
            <span className="text-[11px] font-medium text-stone-500 block">Total Produce Revenue</span>
            <div className="text-xl font-black text-[#16834B] tabular-nums mt-0.5">
              ₦{totalRevenue.toLocaleString()}
            </div>
            <span className="text-[10px] text-stone-400">Escrow backed trade</span>
          </div>

          <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/60">
            <span className="text-[11px] font-medium text-stone-500 block">Active Listings</span>
            <div className="text-xl font-black text-stone-900 tabular-nums mt-0.5">
              {farmerListings.length}
            </div>
            <span className="text-[10px] text-stone-400">Live in marketplace</span>
          </div>

          <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/60">
            <span className="text-[11px] font-medium text-stone-500 block">Pending Orders</span>
            <div className="text-xl font-black text-[#F4A62A] tabular-nums mt-0.5">
              {pendingOrders.length}
            </div>
            <span className="text-[10px] text-stone-400">Awaiting harvest packaging</span>
          </div>

          <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/60">
            <span className="text-[11px] font-medium text-stone-500 block">Direct Margin Boost</span>
            <div className="text-xl font-black text-emerald-700 tabular-nums mt-0.5">
              +38%
            </div>
            <span className="text-[10px] text-stone-400">vs local exploitative middlemen</span>
          </div>
        </div>
      </div>

      {/* Pending Orders Action Banner if any */}
      {pendingOrders.length > 0 && (
        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200/90 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-900 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-stone-900">
                You have {pendingOrders.length} orders awaiting preparation!
              </h4>
              <p className="text-xs text-stone-600">
                Buyers have secured escrow funds. Please package and tag the produce for cold-chain transit.
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('orders')}
            className="shrink-0 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold py-2 px-3.5 rounded-xl shadow-xs transition-colors"
          >
            Manage Orders
          </button>
        </div>
      )}

      {/* Active Produce Listings Management Table / Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-stone-900 tracking-tight">
            Your Farmgate Produce Listings ({farmerListings.length})
          </h2>
          <button
            onClick={() => setIsAddProduceOpen(true)}
            className="text-xs font-semibold text-[#16834B] hover:underline flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Produce</span>
          </button>
        </div>

        {farmerListings.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
            <Wheat className="w-10 h-10 text-stone-300 mx-auto" />
            <p className="text-sm font-semibold text-stone-700">No produce listed yet</p>
            <p className="text-xs text-stone-500">Upload your rice, maize, yam or tomatoes to connect with direct buyers nationwide.</p>
            <button
              onClick={() => setIsAddProduceOpen(true)}
              className="py-2 px-4 bg-[#16834B] text-white text-xs font-semibold rounded-xl"
            >
              Upload First Produce
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {farmerListings.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-2xl border border-stone-200/90 p-4 shadow-2xs hover:shadow-xs transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-stone-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-stone-800">
                      {item.category}
                    </div>
                    <div className="absolute top-2 right-2 bg-[#16834B] text-white px-2 py-0.5 rounded text-[10px] font-bold">
                      {item.availableQuantity} in stock
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-stone-900 line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-2 mt-0.5">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-stone-600 pt-1">
                    <div>
                      <span className="text-[10px] text-stone-400 block">Unit Price</span>
                      <strong className="text-[#16834B] text-base tabular-nums font-extrabold">
                        ₦{item.unitPrice.toLocaleString()}
                      </strong>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-stone-400 block">Min Order</span>
                      <span className="font-semibold">{item.minimumOrderQuantity} {item.unitMeasurement}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                  <div className="text-[10px] text-stone-400">
                    Listed {item.dateListed}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        const newPrice = prompt(`Update unit price for ${item.title}:`, item.unitPrice.toString());
                        if (newPrice && !isNaN(Number(newPrice))) {
                          updateProduce(item.id, { unitPrice: Number(newPrice) });
                        }
                      }}
                      className="p-1.5 text-stone-500 hover:text-[#16834B] hover:bg-stone-50 rounded-lg transition-colors text-xs font-medium flex items-center gap-1"
                      title="Edit Price"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Remove listing "${item.title}"?`)) {
                          deleteProduce(item.id);
                        }
                      }}
                      className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Listing"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
