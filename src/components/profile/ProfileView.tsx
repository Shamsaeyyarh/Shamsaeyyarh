import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  User, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Smartphone, 
  Monitor, 
  RotateCcw, 
  Star, 
  Wheat, 
  ShoppingBag,
  Check,
  CheckCircle2
} from 'lucide-react';
import { DEMO_USERS } from '../../data/mockData';
import { LanguageCode } from '../../types';

export const ProfileView: React.FC = () => {
  const { 
    currentUser, 
    switchUser, 
    language, 
    setLanguage, 
    resetOnboarding,
    displayMode,
    setDisplayMode,
    orders,
    setActiveTab
  } = useApp();

  const [savedSuccess, setSavedSuccess] = useState(false);

  const completedOrdersCount = orders.filter(
    o => o.status === 'completed' && (o.buyerId === currentUser.id || o.farmerId === currentUser.id)
  ).length;

  const languages: { code: LanguageCode; label: string; desc: string }[] = [
    { code: 'en', label: 'English', desc: 'Default Interface Language' },
    { code: 'ha', label: 'Harshen Hausa', desc: 'Haɗa Manoma da Masu Saye' },
    { code: 'yo', label: 'Èdè Yorùbá', desc: 'Ọjà Agbẹ ati Olura Taara' },
    { code: 'ig', label: 'Asụsụ Igbo', desc: 'Ahịa Ndị Ọrụ Ugbo na Ndị Ọzụzụ' },
  ];

  return (
    <div className="space-y-6 pb-24 md:pb-12 max-w-4xl mx-auto px-4 sm:px-6 pt-4">
      
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-[#16834B]/30 shrink-0"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
                  {currentUser.name}
                </h1>
                {currentUser.isVerified && (
                  <ShieldCheck className="w-5 h-5 text-[#16834B] shrink-0" />
                )}
              </div>

              <div className="text-xs font-semibold text-[#16834B] mt-0.5">
                {currentUser.role === 'farmer' ? `🌾 Verified Farmer · ${currentUser.farmName || 'Cooperative Partner'}` : `🛒 Verified Direct Buyer · ${currentUser.bio?.split('.')[0] || 'Commercial Purchaser'}`}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  <span>{currentUser.location.city}, {currentUser.location.state} State</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 text-amber-600 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{currentUser.rating} Rating</span>
                </span>
              </div>
            </div>
          </div>

          <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200 text-center w-full sm:w-auto">
            <span className="text-[10px] text-stone-400 font-bold uppercase block">Escrow Deals</span>
            <strong className="text-xl font-extrabold text-[#16834B] tabular-nums">
              {currentUser.totalDeals + completedOrdersCount}
            </strong>
          </div>
        </div>

        {/* Demo Persona Quick Switcher */}
        <div className="pt-4 border-t border-stone-100">
          <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2.5">
            Switch Demo Account (Experience Farmer & Buyer Portals)
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {DEMO_USERS.map((user) => {
              const isSelected = currentUser.id === user.id;
              return (
                <button
                  key={user.id}
                  onClick={() => switchUser(user.id)}
                  className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                    isSelected
                      ? 'border-[#16834B] bg-[#16834B]/5 ring-1 ring-[#16834B]'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-xl object-cover shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="truncate">
                      <div className="font-bold text-xs text-stone-900 truncate flex items-center gap-1">
                        <span>{user.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#16834B]" />}
                      </div>
                      <p className="text-[11px] text-stone-500">
                        {user.role === 'farmer' ? `🌾 Farmer (${user.location.state})` : `🛒 Buyer (${user.location.state})`}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Language Preferences */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#16834B]" />
            <h2 className="font-bold text-base text-stone-900">
              Language & Regional Options
            </h2>
          </div>
          <span className="text-xs text-stone-400">
            Supports major Nigerian languages
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => setLanguage(l.code)}
              className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                language === l.code
                  ? 'border-[#16834B] bg-[#16834B]/5 font-semibold text-[#16834B]'
                  : 'border-stone-200 hover:border-stone-300 text-stone-700'
              }`}
            >
              <div>
                <span className="text-sm block">{l.label}</span>
                <span className="text-[11px] text-stone-400 font-normal">{l.desc}</span>
              </div>
              {language === l.code && <Check className="w-4 h-4 text-[#16834B]" />}
            </button>
          ))}
        </div>
      </div>

      {/* App Display & Environment Preferences */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-2xs space-y-4">
        <h2 className="font-bold text-base text-stone-900">
          Viewport & Presentation Settings
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => setDisplayMode('responsive')}
            className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all ${
              displayMode === 'responsive'
                ? 'border-[#16834B] bg-[#16834B]/5 font-semibold text-[#16834B]'
                : 'border-stone-200 text-stone-700'
            }`}
          >
            <Monitor className="w-5 h-5" />
            <div>
              <span className="text-sm block">Full Responsive Web</span>
              <span className="text-[11px] text-stone-400 font-normal">Spans desktop and tablet viewports</span>
            </div>
          </button>

          <button
            onClick={() => setDisplayMode('mobile_frame')}
            className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all ${
              displayMode === 'mobile_frame'
                ? 'border-[#16834B] bg-[#16834B]/5 font-semibold text-[#16834B]'
                : 'border-stone-200 text-stone-700'
            }`}
          >
            <Smartphone className="w-5 h-5" />
            <div>
              <span className="text-sm block">Smartphone Preview Frame</span>
              <span className="text-[11px] text-stone-400 font-normal">Native mobile chassis container</span>
            </div>
          </button>
        </div>

        <div className="pt-2 flex items-center justify-between border-t border-stone-100 text-xs">
          <span className="text-stone-500">Need to view the platform intro again?</span>
          <button
            onClick={resetOnboarding}
            className="flex items-center gap-1.5 text-[#16834B] font-semibold hover:underline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart Onboarding Tour</span>
          </button>
        </div>
      </div>

      {/* Platform Navigation Shortcuts */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-2xs space-y-3">
        <h2 className="font-bold text-base text-stone-900">
          Agricultural Hub & Learning
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => setActiveTab('prices')}
            className="p-3.5 rounded-2xl border border-stone-200 hover:border-[#16834B] text-left transition-all flex items-center gap-3 bg-stone-50 hover:bg-stone-100/80"
          >
            <Wheat className="w-5 h-5 text-[#16834B] shrink-0" />
            <div>
              <span className="text-xs font-bold text-stone-900 block">Nigerian Foodstuff Harvest Prices</span>
              <span className="text-[11px] text-stone-500">Live directory of 15+ crops across states</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('awareness')}
            className="p-3.5 rounded-2xl border border-stone-200 hover:border-[#16834B] text-left transition-all flex items-center gap-3 bg-stone-50 hover:bg-stone-100/80"
          >
            <ShieldCheck className="w-5 h-5 text-[#F4A62A] shrink-0" />
            <div>
              <span className="text-xs font-bold text-stone-900 block">Middleman & Post-Harvest Awareness</span>
              <span className="text-[11px] text-stone-500">Guides for farmers & commercial buyers</span>
            </div>
          </button>
        </div>

        <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
          <span className="text-xs text-stone-500">Finished your session?</span>
          <button
            onClick={() => setActiveTab('auth')}
            className="py-2 px-4 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs transition-colors border border-red-200"
          >
            Manage Sign In / Sign Out
          </button>
        </div>
      </div>

      {/* Trust & Escrow Guarantee Footer */}
      <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200/80 flex items-start gap-3 text-xs text-emerald-900">
        <ShieldCheck className="w-5 h-5 text-[#16834B] shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-bold block">HackAgrifest Trust Guarantee</span>
          <p className="text-emerald-800 leading-relaxed">
            Registered agricultural cooperatives and vetted food businesses. 100% Escrow security protects both farmer payouts and buyer quality inspections.
          </p>
        </div>
      </div>

    </div>
  );
};
