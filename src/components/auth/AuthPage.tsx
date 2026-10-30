import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../common/Logo';
import { 
  Lock, 
  Mail, 
  Phone, 
  User, 
  ShieldCheck, 
  Wheat, 
  ShoppingBag, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  LogOut, 
  CheckCircle2, 
  MapPin, 
  Building2,
  Sparkles
} from 'lucide-react';
import { DEMO_USERS, HERO_IMAGE } from '../../data/mockData';

export const AuthPage: React.FC = () => {
  const { 
    currentUser, 
    isAuthenticated, 
    signIn, 
    signUp, 
    signOut, 
    setActiveTab 
  } = useApp();

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [role, setRole] = useState<'farmer' | 'buyer'>('farmer');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Registration fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('Kano');
  const [city, setCity] = useState('');
  const [farmOrBizName, setFarmOrBizName] = useState('');
  const [farmSize, setFarmSize] = useState<number>(15);

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) return;
    signIn(emailOrPhone, role, fullName);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !emailOrPhone.trim()) return;

    signUp({
      name: fullName,
      email: emailOrPhone.includes('@') ? emailOrPhone : `${emailOrPhone.replace(/\s+/g, '')}@hackagrifest.ng`,
      phone: phone || '+234 803 123 4567',
      role,
      farmName: role === 'farmer' ? farmOrBizName || `${fullName} Agricultural Farm` : undefined,
      farmSizeHectares: role === 'farmer' ? farmSize : undefined,
      location: {
        state,
        city: city || (role === 'farmer' ? 'Dawanau LGA' : 'Ikeja'),
        farmAddress: farmOrBizName ? `${farmOrBizName}, ${city}, ${state}` : undefined
      }
    });
  };

  const handleQuickDemoFill = (user: typeof DEMO_USERS[0]) => {
    setEmailOrPhone(user.email);
    setPassword('••••••••');
    setRole(user.role);
    signIn(user.email, user.role, user.name);
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] pb-24 md:pb-12 max-w-5xl mx-auto px-4 sm:px-6 pt-6 flex flex-col justify-center">
      
      {/* If already signed in, show Main Account State & Sign Out card */}
      {isAuthenticated ? (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm max-w-xl mx-auto w-full text-center space-y-6">
          <div className="w-20 h-20 rounded-full mx-auto relative ring-4 ring-[#16834B]/20">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-full h-full rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
            {currentUser.isVerified && (
              <span className="absolute bottom-0 right-0 p-1 bg-[#16834B] text-white rounded-full ring-2 ring-white">
                <ShieldCheck className="w-4 h-4" />
              </span>
            )}
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight">
              Signed in as {currentUser.name}
            </h1>
            <p className="text-xs font-semibold text-[#16834B] uppercase tracking-wider">
              {currentUser.role === 'farmer' ? `🌾 Verified Farmer (${currentUser.location.state} State)` : `🛒 Verified Buyer (${currentUser.location.state} State)`}
            </p>
            <p className="text-xs text-stone-500 font-mono">
              {currentUser.email} · {currentUser.phone}
            </p>
          </div>

          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-left text-xs text-stone-600 space-y-2">
            <div className="flex justify-between">
              <span>Account Type</span>
              <strong className="text-stone-900 uppercase">{currentUser.role}</strong>
            </div>
            <div className="flex justify-between">
              <span>Primary Operating Hub</span>
              <strong className="text-stone-900">{currentUser.location.city}, {currentUser.location.state}</strong>
            </div>
            {currentUser.farmName && (
              <div className="flex justify-between">
                <span>Farm Name</span>
                <strong className="text-stone-900">{currentUser.farmName}</strong>
              </div>
            )}
            <div className="flex justify-between">
              <span>Escrow Security Status</span>
              <strong className="text-[#16834B] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified & Protected</span>
              </strong>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => setActiveTab(currentUser.role === 'farmer' ? 'dashboard' : 'marketplace')}
              className="w-full sm:flex-1 py-3 px-4 bg-[#16834B] hover:bg-[#126c3d] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
            >
              <span>Continue to {currentUser.role === 'farmer' ? 'Farm Dashboard' : 'Marketplace'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Explicit Sign Out Button */}
            <button
              onClick={signOut}
              className="w-full sm:w-auto py-3 px-5 bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs sm:text-sm rounded-xl transition-colors border border-red-200 flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      ) : (
        /* Sign In / Sign Up Form */
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 max-w-4xl mx-auto w-full">
          
          {/* Left Decorative Banner */}
          <div className="lg:col-span-5 bg-[#252B27] p-8 text-white relative flex flex-col justify-between overflow-hidden">
            <img
              src={HERO_IMAGE}
              alt="Nigerian Agriculture Harvest"
              className="absolute inset-0 w-full h-full object-cover opacity-25"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#252B27] via-[#252B27]/80 to-transparent" />

            <div className="relative z-10 space-y-4">
              <Logo size="md" />
              <div className="inline-block text-[11px] font-semibold text-[#F4A62A] tracking-wider uppercase">
                Direct Nigerian Agricultural Trade
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold leading-tight">
                Empowering Farmers. Lowering Food Costs.
              </h2>
              <p className="text-xs text-stone-300 leading-relaxed">
                Connect directly with verified farmers and commercial food buyers nationwide with guaranteed escrow safety.
              </p>
            </div>

            <div className="relative z-10 pt-8 space-y-2 border-t border-white/10 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F4A62A]" />
                <span>Zero middleman commission deductions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F4A62A]" />
                <span>100% Escrow security on every harvest order</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F4A62A]" />
                <span>Interstate cold-chain and dry freight haulage</span>
              </div>
            </div>
          </div>

          {/* Right Form Container */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            {/* Form Toggle: Sign In vs Sign Up */}
            <div>
              <div className="flex items-center p-1 bg-stone-100 rounded-xl mb-5">
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                    mode === 'signin' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  Sign In to Account
                </button>
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                    mode === 'signup' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  Create New Account
                </button>
              </div>

              {/* Role Selector: Farmer vs Buyer */}
              <div className="space-y-1.5 mb-4">
                <label className="text-xs font-bold text-stone-700 block">
                  Select Your Account Role
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setRole('farmer')}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                      role === 'farmer'
                        ? 'border-[#16834B] bg-[#16834B]/5 text-[#16834B] ring-1 ring-[#16834B]'
                        : 'border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <Wheat className="w-5 h-5 shrink-0" />
                    <div>
                      <span className="font-bold text-xs block">Farmer</span>
                      <span className="text-[10px] text-stone-400">Sell Harvest Direct</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole('buyer')}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                      role === 'buyer'
                        ? 'border-[#16834B] bg-[#16834B]/5 text-[#16834B] ring-1 ring-[#16834B]'
                        : 'border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <ShoppingBag className="w-5 h-5 shrink-0" />
                    <div>
                      <span className="font-bold text-xs block">Produce Buyer</span>
                      <span className="text-[10px] text-stone-400">Wholesale / Retail</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Quick 1-Click Demo Logins */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 mb-4 space-y-1.5">
                <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#F4A62A]" />
                  <span>Quick Demo Sign-In (1 Click)</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleQuickDemoFill(DEMO_USERS[0])}
                    className="py-1 px-2.5 bg-white hover:bg-stone-100 text-stone-700 text-[11px] font-medium rounded-lg border border-stone-200 shadow-2xs"
                  >
                    🌾 Mallam Ibrahim (Farmer, Kano)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemoFill(DEMO_USERS[2])}
                    className="py-1 px-2.5 bg-white hover:bg-stone-100 text-stone-700 text-[11px] font-medium rounded-lg border border-stone-200 shadow-2xs"
                  >
                    🛒 Chioma Okeke (Buyer, Lagos)
                  </button>
                </div>
              </div>

              {/* Sign In Form */}
              {mode === 'signin' ? (
                <form onSubmit={handleSignInSubmit} className="space-y-3.5">
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      Email Address or Phone Number (+234)
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={emailOrPhone}
                        onChange={(e) => setEmailOrPhone(e.target.value)}
                        placeholder="e.g. ibrahim.musa@hackagrifest.ng or 08034519022"
                        className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#16834B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your secure password"
                        className="w-full pl-9 pr-9 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#16834B]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#16834B] hover:bg-[#126c3d] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-[0.98] mt-2"
                  >
                    Sign In to HackAgrifest
                  </button>
                </form>
              ) : (
                /* Sign Up Form */
                <form onSubmit={handleSignUpSubmit} className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      Full Legal Name / Business Representative
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Terseer Iorfa or Dayo Adeyemi"
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#16834B]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1">Email</label>
                      <input
                        type="email"
                        required
                        value={emailOrPhone}
                        onChange={(e) => setEmailOrPhone(e.target.value)}
                        placeholder="you@email.com"
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1">Phone</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+234 803 000 0000"
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1">State</label>
                      <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900"
                      >
                        <option value="Kano">Kano</option>
                        <option value="Plateau">Plateau (Jos)</option>
                        <option value="Benue">Benue</option>
                        <option value="Kaduna">Kaduna</option>
                        <option value="Kebbi">Kebbi</option>
                        <option value="Lagos">Lagos</option>
                        <option value="Oyo">Oyo</option>
                        <option value="Abuja">Abuja FCT</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1">
                        {role === 'farmer' ? 'Farm LGA / Cluster' : 'Delivery City'}
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder={role === 'farmer' ? 'e.g. Bokkos LGA' : 'e.g. Ikeja'}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900"
                      />
                    </div>
                  </div>

                  {role === 'farmer' && (
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs font-bold text-stone-700 block mb-1">Farm Name</label>
                        <input
                          type="text"
                          value={farmOrBizName}
                          onChange={(e) => setFarmOrBizName(e.target.value)}
                          placeholder="e.g. Benue Agro Cluster"
                          className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-stone-700 block mb-1">Farm Size (Hectares)</label>
                        <input
                          type="number"
                          min={1}
                          value={farmSize}
                          onChange={(e) => setFarmSize(Number(e.target.value))}
                          className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900"
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#16834B] hover:bg-[#126c3d] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-[0.98] mt-2"
                  >
                    Complete Registration & Trade Direct
                  </button>
                </form>
              )}
            </div>

            <p className="text-[11px] text-stone-400 text-center">
              By continuing you agree to the HackAgrifest Fair Agricultural Trade & Escrow charter.
            </p>

          </div>
        </div>
      )}

    </div>
  );
};
