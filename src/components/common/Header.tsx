import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from './Logo';
import { 
  Bell, 
  ChevronDown, 
  Sparkles, 
  Plus, 
  Smartphone, 
  Monitor, 
  Globe, 
  Check, 
  ShieldCheck,
  UserCheck,
  Wheat
} from 'lucide-react';
import { DEMO_USERS } from '../../data/mockData';
import { LanguageCode } from '../../types';

interface HeaderProps {
  onOpenNotifications: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenNotifications }) => {
  const { 
    currentUser, 
    switchUser, 
    activeTab, 
    setActiveTab, 
    unreadNotificationsCount,
    language,
    setLanguage,
    t,
    displayMode,
    setDisplayMode,
    setIsAddProduceOpen,
    setIsAgriAdvisorOpen,
    isAuthenticated
  } = useApp();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages: { code: LanguageCode; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇳🇬' },
    { code: 'ha', label: 'Hausa', flag: '🌾' },
    { code: 'yo', label: 'Yorùbá', flag: '🌱' },
    { code: 'ig', label: 'Igbo', flag: '🍃' },
  ];

  return (
    <header className="sticky top-0 z-30 w-full bg-[#F7F8F4]/95 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
        
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab(currentUser.role === 'farmer' ? 'dashboard' : 'marketplace')} 
            className="flex items-center text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16834B] rounded-lg"
          >
            <Logo size="md" />
          </button>
        </div>

        {/* Zone 2: Navigation Links (single-line, clean unboxed) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-700">
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`whitespace-nowrap transition-colors py-1 hover:text-[#16834B] ${
              activeTab === 'marketplace' ? 'text-[#16834B] font-semibold border-b-2 border-[#16834B]' : ''
            }`}
          >
            {t('marketplace')}
          </button>

          <button
            onClick={() => setActiveTab('prices')}
            className={`whitespace-nowrap transition-colors py-1 hover:text-[#16834B] ${
              activeTab === 'prices' ? 'text-[#16834B] font-semibold border-b-2 border-[#16834B]' : ''
            }`}
          >
            Foodstuff Prices
          </button>

          <button
            onClick={() => setActiveTab('awareness')}
            className={`whitespace-nowrap transition-colors py-1 hover:text-[#16834B] ${
              activeTab === 'awareness' ? 'text-[#16834B] font-semibold border-b-2 border-[#16834B]' : ''
            }`}
          >
            Awareness Hub
          </button>

          <button
            onClick={() => setActiveTab('ai_copilot')}
            className={`whitespace-nowrap transition-colors py-1 flex items-center gap-1 hover:text-[#16834B] ${
              activeTab === 'ai_copilot' ? 'text-[#16834B] font-semibold border-b-2 border-[#16834B]' : ''
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F4A62A]" />
            <span>AI Copilot</span>
          </button>

          {currentUser.role === 'farmer' ? (
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`whitespace-nowrap transition-colors py-1 hover:text-[#16834B] ${
                activeTab === 'dashboard' ? 'text-[#16834B] font-semibold border-b-2 border-[#16834B]' : ''
              }`}
            >
              {t('dashboard')}
            </button>
          ) : null}

          <button
            onClick={() => setActiveTab('orders')}
            className={`whitespace-nowrap transition-colors py-1 hover:text-[#16834B] ${
              activeTab === 'orders' ? 'text-[#16834B] font-semibold border-b-2 border-[#16834B]' : ''
            }`}
          >
            {t('orders')}
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`whitespace-nowrap transition-colors py-1 hover:text-[#16834B] ${
              activeTab === 'messages' ? 'text-[#16834B] font-semibold border-b-2 border-[#16834B]' : ''
            }`}
          >
            {t('messages')}
          </button>
        </nav>

        {/* Zone 3: Primary Action & Utilities */}
        <div className="flex items-center gap-2.5">
          {/* Responsive / Mobile Frame Preview Switcher */}
          <button
            onClick={() => setDisplayMode(displayMode === 'responsive' ? 'mobile_frame' : 'responsive')}
            className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors hidden sm:flex items-center gap-1 text-xs"
            title={displayMode === 'responsive' ? 'Switch to Smartphone Preview Frame' : 'Switch to Fullscreen Responsive View'}
          >
            {displayMode === 'responsive' ? (
              <Smartphone className="w-4 h-4 text-[#16834B]" />
            ) : (
              <Monitor className="w-4 h-4 text-[#16834B]" />
            )}
            <span className="hidden lg:inline">{displayMode === 'responsive' ? 'Mobile View' : 'Full Width'}</span>
          </button>

          {/* Language Switcher */}
          <div className="relative" ref={langMenuRef}>
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors flex items-center gap-1 text-xs"
              title="Change Language"
            >
              <Globe className="w-4 h-4 text-stone-500" />
              <span className="uppercase font-semibold">{language}</span>
            </button>

            {isLangMenuOpen && (
              <div className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-lg border border-stone-200 py-1 z-50 animate-in fade-in zoom-in-95">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setIsLangMenuOpen(false);
                    }}
                    className={`w-full px-3 py-1.5 text-left text-xs flex items-center justify-between hover:bg-stone-50 ${
                      language === l.code ? 'font-semibold text-[#16834B]' : 'text-stone-700'
                    }`}
                  >
                    <span>{l.flag} {l.label}</span>
                    {language === l.code && <Check className="w-3.5 h-3.5 text-[#16834B]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Button */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F4A62A] rounded-full ring-2 ring-white" />
            )}
          </button>

          {/* Primary Action Button: "List Produce" for Farmer OR "Sign In" if unauthenticated */}
          {!isAuthenticated ? (
            <button
              onClick={() => setActiveTab('auth')}
              className="bg-[#16834B] hover:bg-[#126c3d] text-white text-xs font-bold py-2 px-3.5 rounded-lg shadow-sm transition-all whitespace-nowrap active:scale-[0.98]"
            >
              Sign In
            </button>
          ) : currentUser.role === 'farmer' ? (
            <button
              onClick={() => setIsAddProduceOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#16834B] hover:bg-[#126c3d] text-white text-xs font-semibold py-2 px-3.5 rounded-lg shadow-sm transition-all whitespace-nowrap active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              <span>{t('addProduce')}</span>
            </button>
          ) : (
            <button
              onClick={() => setActiveTab('prices')}
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#16834B] hover:bg-[#126c3d] text-white text-xs font-semibold py-2 px-3.5 rounded-lg shadow-sm transition-all whitespace-nowrap active:scale-[0.98]"
            >
              <Wheat className="w-4 h-4 text-[#F4A62A]" />
              <span>Harvest Prices</span>
            </button>
          )}

          {/* User Account & Demo Role Switcher Dropdown */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-full border border-stone-200 hover:border-stone-300 bg-white shadow-2xs transition-colors"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 rounded-full object-cover ring-1 ring-[#16834B]/30"
                referrerPolicy="no-referrer"
              />
              <span className="text-xs font-semibold text-stone-800 hidden md:inline truncate max-w-[90px]">
                {currentUser.name.split(' ')[0]}
              </span>
              <span className="text-[10px] text-stone-500 uppercase tracking-wider hidden lg:inline font-mono">
                ({currentUser.role})
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-stone-200 p-2 z-50 animate-in fade-in zoom-in-95">
                <div className="p-3 border-b border-stone-100 flex items-center gap-3">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-[#16834B]/30"
                    referrerPolicy="no-referrer"
                  />
                  <div className="overflow-hidden">
                    <div className="font-semibold text-sm text-stone-900 truncate flex items-center gap-1.5">
                      <span>{currentUser.name}</span>
                      {currentUser.isVerified && <ShieldCheck className="w-4 h-4 text-[#16834B] shrink-0" />}
                    </div>
                    <div className="text-xs text-stone-500 truncate">{currentUser.email}</div>
                    <div className="text-[11px] text-[#16834B] font-medium mt-0.5">
                      {currentUser.role === 'farmer' ? `Farmer · ${currentUser.location.state} State` : `Direct Buyer · ${currentUser.location.state}`}
                    </div>
                  </div>
                </div>

                {/* Role Switcher Section */}
                <div className="py-2">
                  <div className="px-3 py-1 text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                    Switch Demo Persona
                  </div>
                  {DEMO_USERS.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => {
                        switchUser(user.id);
                        setIsUserMenuOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left rounded-xl text-xs flex items-center justify-between hover:bg-stone-50 transition-colors ${
                        currentUser.id === user.id ? 'bg-[#16834B]/5 text-[#16834B] font-semibold' : 'text-stone-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-6 h-6 rounded-full object-cover shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="truncate">
                          <p className="truncate font-medium">{user.name}</p>
                          <p className="text-[10px] text-stone-500">
                            {user.role === 'farmer' ? `🌾 Farmer (${user.location.state})` : `🛒 Buyer (${user.location.state})`}
                          </p>
                        </div>
                      </div>
                      {currentUser.id === user.id && <Check className="w-4 h-4 text-[#16834B] shrink-0" />}
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-stone-100 space-y-1">
                  <button
                    onClick={() => {
                      setActiveTab('profile');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left text-xs text-stone-700 hover:bg-stone-50 rounded-lg font-medium flex items-center gap-2"
                  >
                    <UserCheck className="w-4 h-4 text-stone-400" />
                    <span>View Profile & Settings</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('auth');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left text-xs text-red-600 hover:bg-red-50 rounded-lg font-semibold flex items-center gap-2"
                  >
                    <UserCheck className="w-4 h-4 text-red-400" />
                    <span>Sign Out / Switch Account</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </header>
  );
};
