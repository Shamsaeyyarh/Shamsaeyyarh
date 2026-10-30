import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  MapPin, 
  ShieldCheck, 
  Star, 
  Calendar, 
  Package, 
  TrendingDown, 
  CheckCircle2, 
  MessageSquare, 
  ShoppingBag,
  Sparkles,
  Truck,
  Leaf
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { 
    selectedProduce, 
    setSelectedProduce, 
    openCheckout, 
    startChatWithFarmer,
    setSelectedFarmerId,
    reviews 
  } = useApp();

  if (!selectedProduce) return null;

  const relevantReviews = reviews.filter(
    r => r.farmerId === selectedProduce.farmerId || r.produceId === selectedProduce.id
  );

  const unitSavings = selectedProduce.middlemanRetailPrice - selectedProduce.unitPrice;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header & Close */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-5 py-3 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#16834B] bg-[#16834B]/10 px-2.5 py-0.5 rounded-full">
              {selectedProduce.category}
            </span>
            {selectedProduce.isOrganic && (
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Leaf className="w-3 h-3" />
                <span>Organic</span>
              </span>
            )}
          </div>

          <button
            onClick={() => setSelectedProduce(null)}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Main Visual Image */}
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-stone-100 shadow-inner">
            <img
              src={selectedProduce.image}
              alt={selectedProduce.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-3 right-3 bg-[#16834B] text-white px-3 py-1.5 rounded-xl font-bold text-xs shadow-md flex items-center gap-1.5">
              <TrendingDown className="w-4 h-4" />
              <span>Save {selectedProduce.estimatedBuyerSavingsPercent}% vs Middleman</span>
            </div>

            <div className="absolute bottom-3 left-3 bg-black/60 text-white backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-medium">
              Grade: {selectedProduce.qualityGrade}
            </div>
          </div>

          {/* Title & Description */}
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight leading-snug">
              {selectedProduce.title}
            </h2>

            <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500">
              <span className="flex items-center gap-1 text-stone-700 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#16834B]" />
                <span>{selectedProduce.farmerLocation.city}, {selectedProduce.farmerLocation.state} State</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                <span>Harvested: {selectedProduce.harvestDate}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Package className="w-3.5 h-3.5 text-stone-400" />
                <span>Freshness shelf life: {selectedProduce.freshnessGuaranteeDays} days</span>
              </span>
            </div>

            <p className="text-sm text-stone-600 leading-relaxed pt-1">
              {selectedProduce.description}
            </p>
          </div>

          {/* Pricing & Value Proposition Comparison Grid */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/90 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-500 font-medium uppercase tracking-wider block">
                  Direct Farmgate Price
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#16834B] tabular-nums">
                  ₦{selectedProduce.unitPrice.toLocaleString()}
                  <span className="text-xs text-stone-500 font-normal ml-1">/ {selectedProduce.unitMeasurement}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-stone-400 block line-through tabular-nums">
                  ₦{selectedProduce.middlemanRetailPrice.toLocaleString()} Mile 12 / Bodija
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md inline-block mt-0.5">
                  Save ₦{unitSavings.toLocaleString()} per unit
                </span>
              </div>
            </div>

            {/* Inventory Status */}
            <div className="flex items-center justify-between text-xs pt-2 border-t border-stone-200 text-stone-600">
              <span>Available Stock: <strong className="text-stone-900">{selectedProduce.availableQuantity} units</strong></span>
              <span>Minimum Order: <strong className="text-stone-900">{selectedProduce.minimumOrderQuantity} units</strong></span>
            </div>
          </div>

          {/* Farmer Card */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs space-y-3">
            <div className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              Verified Farm Gate Seller
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedProduce.farmerAvatar}
                  alt={selectedProduce.farmerName}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-[#16834B]/30"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-stone-900">
                      {selectedProduce.farmerName}
                    </span>
                    {selectedProduce.isVerifiedFarmer && (
                      <ShieldCheck className="w-4 h-4 text-[#16834B]" />
                    )}
                  </div>
                  <div className="text-xs text-stone-500">
                    {selectedProduce.farmName}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-amber-600 font-medium mt-0.5">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>{selectedProduce.farmerRating} ({selectedProduce.farmerReviewsCount} verified orders)</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedFarmerId(selectedProduce.farmerId);
                  setSelectedProduce(null);
                }}
                className="text-xs font-semibold text-[#16834B] hover:underline whitespace-nowrap"
              >
                View Farm Profile
              </button>
            </div>
          </div>

          {/* Buyer Reviews */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-stone-900 flex items-center justify-between">
              <span>Verified Buyer Reviews ({relevantReviews.length})</span>
              <span className="text-xs font-normal text-stone-500">Escrow authenticated</span>
            </h3>

            {relevantReviews.length === 0 ? (
              <p className="text-xs text-stone-400 italic">No reviews yet for this harvest.</p>
            ) : (
              <div className="space-y-2.5">
                {relevantReviews.map((rev) => (
                  <div key={rev.id} className="p-3 bg-stone-50 rounded-xl border border-stone-200/70 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <div className="font-semibold text-stone-800 flex items-center gap-1.5">
                        <span>{rev.buyerName}</span>
                        {rev.verifiedPurchase && (
                          <span className="text-[10px] text-[#16834B] bg-emerald-50 px-1.5 py-0.2 rounded font-medium">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <div className="flex items-center text-amber-500">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">{rev.comment}</p>
                    <div className="text-[10px] text-stone-400">{rev.date}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Escrow Guarantee Banner */}
          <div className="p-3.5 bg-emerald-50/80 rounded-xl border border-emerald-200/80 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#16834B] shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-950 space-y-0.5">
              <span className="font-bold block">100% HackAgrifest Escrow Guarantee</span>
              <span className="text-emerald-800 leading-snug block">
                Your payment is safely held until produce is delivered to your address and you inspect quality.
              </span>
            </div>
          </div>

        </div>

        {/* Modal Sticky Bottom Actions */}
        <div className="sticky bottom-0 bg-white border-t border-stone-200 p-4 flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              startChatWithFarmer(selectedProduce.farmerId, selectedProduce);
              setSelectedProduce(null);
            }}
            className="py-3 px-4 rounded-xl border border-stone-200 hover:border-stone-300 bg-stone-50 hover:bg-stone-100 text-stone-800 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-stone-600" />
            <span>Chat Farmer</span>
          </button>

          <button
            onClick={() => {
              const p = selectedProduce;
              setSelectedProduce(null);
              openCheckout(p);
            }}
            className="flex-1 py-3 px-5 rounded-xl bg-[#16834B] hover:bg-[#126c3d] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Order Direct (₦{selectedProduce.unitPrice.toLocaleString()})</span>
          </button>
        </div>

      </div>
    </div>
  );
};
