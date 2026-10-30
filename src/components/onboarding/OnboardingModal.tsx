import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../common/Logo';
import { 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Truck, 
  User, 
  Wheat, 
  ShoppingBag,
  Sparkles,
  Check
} from 'lucide-react';
import { HERO_IMAGE, DEMO_USERS } from '../../data/mockData';

export const OnboardingModal: React.FC = () => {
  const { completeOnboarding, switchUser, setDisplayMode } = useApp();
  const [step, setStep] = useState<number>(0);

  const slides = [
    {
      title: 'Connecting Farmers Directly to Buyers',
      subtitle: 'Eliminate exploitative middlemen who drive up food costs and reduce farm profits. Direct farmgate trading for a food-secure Nigeria.',
      badge: 'Zero Middleman Markup',
      icon: TrendingUp,
      stats: [
        { label: 'Farmer Profit Boost', val: '+35%' },
        { label: 'Buyer Cost Savings', val: '25%' },
        { label: 'Reduced Post-Harvest Waste', val: '40%' }
      ]
    },
    {
      title: '100% Escrow & Quality Protection',
      subtitle: 'Funds are securely locked in HackAgrifest Escrow. Cash is only disbursed to the farmer after you inspect and approve produce upon arrival.',
      badge: 'Protected Transactions',
      icon: ShieldCheck,
      stats: [
        { label: 'Escrow Security', val: '100%' },
        { label: 'Verified Farms', val: '1,200+' },
        { label: 'Cold-Chain Transit', val: 'Active' }
      ]
    },
    {
      title: 'Select How You Want to Trade',
      subtitle: 'Choose your account type to explore HackAgrifest right now, or select one of our preloaded demo personas.',
      badge: 'Instant Setup',
      icon: Wheat
    }
  ];

  const currentSlide = slides[step];

  const handleSelectRole = (userId: string) => {
    switchUser(userId);
    completeOnboarding();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#252B27]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#F7F8F4] rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Visual Hero Header */}
        <div className="relative h-48 bg-stone-900 shrink-0 overflow-hidden">
          <img
            src={HERO_IMAGE}
            alt="Nigerian Agriculture Farm"
            className="w-full h-full object-cover opacity-75"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#252B27] via-[#252B27]/40 to-transparent" />
          
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-xs">
              <Logo size="sm" />
            </div>
            <button
              onClick={() => {
                handleSelectRole('buyer-1');
              }}
              className="text-xs text-white/80 hover:text-white bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-lg transition-colors"
            >
              Skip to App
            </button>
          </div>

          <div className="absolute bottom-4 left-5 right-5 text-white">
            <div className="text-xs font-semibold text-[#F4A62A] tracking-wider uppercase flex items-center gap-1.5 mb-1">
              <span>{currentSlide.badge}</span>
            </div>
            <h2 className="text-xl font-bold leading-tight drop-shadow-xs">
              {currentSlide.title}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <p className="text-sm text-stone-600 leading-relaxed">
            {currentSlide.subtitle}
          </p>

          {/* Slide 1 & 2 Metrics */}
          {currentSlide.stats && (
            <div className="grid grid-cols-3 gap-3 p-4 bg-white rounded-2xl border border-stone-200/80 shadow-2xs">
              {currentSlide.stats.map((st, i) => (
                <div key={i} className="text-center">
                  <div className="text-xl font-extrabold text-[#16834B] tabular-nums">
                    {st.val}
                  </div>
                  <div className="text-[11px] font-medium text-stone-500 mt-0.5 leading-snug">
                    {st.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Slide 3: Account Choice & Quick Personas */}
          {step === 2 && (
            <div className="space-y-3 pt-1">
              <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Select Persona to Test
              </div>

              {/* Farmer Persona Card */}
              <button
                onClick={() => handleSelectRole('farmer-1')}
                className="w-full p-4 rounded-2xl border-2 border-stone-200 hover:border-[#16834B] bg-white text-left transition-all group flex items-start gap-4 hover:shadow-md"
              >
                <div className="p-3 bg-[#16834B]/10 rounded-xl text-[#16834B] shrink-0 group-hover:bg-[#16834B] group-hover:text-white transition-colors">
                  <Wheat className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-stone-900">
                      Mallam Ibrahim Musa
                    </span>
                    <span className="text-[10px] font-semibold text-[#16834B] bg-[#16834B]/10 px-2 py-0.5 rounded-full">
                      Farmer View
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Grain & Legume Farmer · Dawanau, Kano State
                  </p>
                  <p className="text-[11px] text-stone-400 mt-1">
                    Upload produce, manage stock, set farmgate prices & fulfill orders.
                  </p>
                </div>
              </button>

              {/* Buyer Persona Card */}
              <button
                onClick={() => handleSelectRole('buyer-1')}
                className="w-full p-4 rounded-2xl border-2 border-stone-200 hover:border-[#16834B] bg-white text-left transition-all group flex items-start gap-4 hover:shadow-md"
              >
                <div className="p-3 bg-[#F4A62A]/10 rounded-xl text-[#F4A62A] shrink-0 group-hover:bg-[#F4A62A] group-hover:text-[#252B27] transition-colors">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-stone-900">
                      Chioma Okeke
                    </span>
                    <span className="text-[10px] font-semibold text-[#F4A62A] bg-[#F4A62A]/20 px-2 py-0.5 rounded-full text-[#252B27]">
                      Buyer View
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Procurement Director · Taste of Nigeria, Lagos
                  </p>
                  <p className="text-[11px] text-stone-400 mt-1">
                    Browse produce, compare farmgate vs middleman prices & place escrow orders.
                  </p>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-5 border-t border-stone-200/90 bg-white flex items-center justify-between shrink-0">
          {/* Step dots */}
          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((s) => (
              <button
                key={s}
                onClick={() => setStep(s)}
                className={`h-2 rounded-full transition-all ${
                  step === s ? 'w-6 bg-[#16834B]' : 'w-2 bg-stone-300'
                }`}
                aria-label={`Slide ${s + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
              >
                Back
              </button>
            )}

            {step < 2 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="flex items-center gap-1.5 bg-[#16834B] hover:bg-[#126c3d] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-colors"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => handleSelectRole('buyer-1')}
                className="flex items-center gap-1.5 bg-[#16834B] hover:bg-[#126c3d] text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-xs transition-colors"
              >
                <span>Enter Marketplace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
