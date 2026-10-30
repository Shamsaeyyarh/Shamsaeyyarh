import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  MapPin, 
  ShieldCheck, 
  Star, 
  Phone, 
  MessageSquare, 
  Wheat, 
  Building2, 
  Calendar,
  ShoppingBag
} from 'lucide-react';
import { DEMO_USERS } from '../../data/mockData';

export const FarmerProfileModal: React.FC = () => {
  const { 
    selectedFarmerId, 
    setSelectedFarmerId, 
    produceList, 
    reviews, 
    setSelectedProduce, 
    startChatWithFarmer 
  } = useApp();

  if (!selectedFarmerId) return null;

  const farmer = DEMO_USERS.find(u => u.id === selectedFarmerId) || {
    id: selectedFarmerId,
    name: 'Verified Nigerian Farmer',
    email: 'farmer@hackagrifest.ng',
    phone: '+234 803 000 1234',
    role: 'farmer' as const,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    location: { state: 'Plateau', city: 'Jos', farmAddress: 'Jos Farm Cluster' },
    farmName: 'Plateau Agro Farm',
    farmSizeHectares: 15,
    cooperativeName: 'Plateau Farmers League',
    isVerified: true,
    memberSince: '2023',
    rating: 4.9,
    totalDeals: 75,
    bio: 'Dedicated to cultivating fresh organic vegetables and grains for direct supply across Nigerian commercial markets.'
  };

  const farmerProduce = produceList.filter(p => p.farmerId === selectedFarmerId);
  const farmerReviews = reviews.filter(r => r.farmerId === selectedFarmerId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-white px-5 py-3 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wheat className="w-5 h-5 text-[#16834B]" />
            <h2 className="font-bold text-base text-stone-900">
              Verified Farmer Profile
            </h2>
          </div>
          <button
            onClick={() => setSelectedFarmerId(null)}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Farmer Hero Bio */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-stone-50 p-4 rounded-2xl border border-stone-200/80">
            <img
              src={farmer.avatar}
              alt={farmer.name}
              className="w-20 h-20 rounded-2xl object-cover ring-2 ring-[#16834B]/30"
              referrerPolicy="no-referrer"
            />
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-stone-900">
                  {farmer.name}
                </h3>
                {farmer.isVerified && (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-[#16834B] bg-[#16834B]/10 px-2 py-0.5 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </span>
                )}
              </div>

              <div className="text-xs text-stone-600 font-medium">
                {farmer.farmName}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 pt-0.5">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  <span>{farmer.location.city}, {farmer.location.state} State</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 text-amber-600 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{farmer.rating} ({farmer.totalDeals} orders)</span>
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                startChatWithFarmer(farmer.id);
                setSelectedFarmerId(null);
              }}
              className="w-full sm:w-auto py-2.5 px-4 bg-[#16834B] hover:bg-[#126c3d] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat Farmer</span>
            </button>
          </div>

          {/* Farm Specs Strip */}
          <div className="grid grid-cols-3 gap-3 p-3.5 bg-white rounded-2xl border border-stone-200 text-center">
            <div>
              <span className="text-[10px] text-stone-400 uppercase font-bold block">Farm Size</span>
              <strong className="text-sm font-extrabold text-stone-900">{farmer.farmSizeHectares || 20} Hectares</strong>
            </div>
            <div>
              <span className="text-[10px] text-stone-400 uppercase font-bold block">Affiliation</span>
              <strong className="text-xs font-bold text-stone-900 truncate block">
                {farmer.cooperativeName?.split(' ')[0] || 'Union'}
              </strong>
            </div>
            <div>
              <span className="text-[10px] text-stone-400 uppercase font-bold block">Member Since</span>
              <strong className="text-sm font-extrabold text-stone-900">{farmer.memberSince}</strong>
            </div>
          </div>

          {/* Bio Story */}
          {farmer.bio && (
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                About the Farm
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {farmer.bio}
              </p>
            </div>
          )}

          {/* Active Produce from this Farmer */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              Produce Currently Available ({farmerProduce.length})
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {farmerProduce.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setSelectedProduce(p);
                    setSelectedFarmerId(null);
                  }}
                  className="p-3 bg-stone-50 hover:bg-stone-100 rounded-xl border border-stone-200/80 cursor-pointer transition-colors flex items-center gap-3"
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-14 h-14 rounded-lg object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-xs text-stone-900 truncate">{p.title}</h5>
                    <p className="text-[11px] text-stone-500">{p.unitMeasurement}</p>
                    <div className="text-xs font-extrabold text-[#16834B] tabular-nums mt-0.5">
                      ₦{p.unitPrice.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Reviews */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              Buyer Feedback ({farmerReviews.length})
            </h4>

            {farmerReviews.length === 0 ? (
              <p className="text-xs text-stone-400 italic">No buyer reviews yet.</p>
            ) : (
              <div className="space-y-2">
                {farmerReviews.map((rev) => (
                  <div key={rev.id} className="p-3 bg-stone-50 rounded-xl border border-stone-200/60 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-stone-800">{rev.buyerName}</span>
                      <div className="flex items-center text-amber-500">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-stone-600">{rev.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
