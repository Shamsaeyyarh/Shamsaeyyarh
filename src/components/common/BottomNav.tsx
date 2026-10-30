import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Store, 
  PackageCheck, 
  MessageSquare, 
  LayoutDashboard, 
  User, 
  Sparkles,
  Wheat,
  ShieldCheck
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { 
    currentUser, 
    activeTab, 
    setActiveTab, 
    t, 
    orders, 
    conversations 
  } = useApp();

  // Active orders count for buyer/farmer
  const activeOrdersCount = orders.filter(
    o => o.status !== 'completed' && o.status !== 'cancelled'
  ).length;

  // Unread messages
  const totalUnreadMessages = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#F7F8F4]/95 backdrop-blur-lg border-t border-stone-200/90 shadow-lg px-2 pb-safe"
    >
      <div className="grid grid-cols-5 items-center h-16">
        
        {/* Tab 1: Marketplace */}
        <button
          onClick={() => setActiveTab('marketplace')}
          className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center transition-colors relative ${
            activeTab === 'marketplace' ? 'text-[#16834B]' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Store className={`w-5 h-5 ${activeTab === 'marketplace' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className={`text-[10px] tracking-tight mt-1 ${activeTab === 'marketplace' ? 'font-bold' : 'font-medium'}`}>
            Market
          </span>
          {activeTab === 'marketplace' && (
            <span className="w-1 h-1 rounded-full bg-[#16834B] mt-0.5" />
          )}
        </button>

        {/* Tab 2: Foodstuff Prices */}
        <button
          onClick={() => setActiveTab('prices')}
          className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center transition-colors relative ${
            activeTab === 'prices' ? 'text-[#16834B]' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Wheat className={`w-5 h-5 ${activeTab === 'prices' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className={`text-[10px] tracking-tight mt-1 ${activeTab === 'prices' ? 'font-bold' : 'font-medium'}`}>
            Prices
          </span>
          {activeTab === 'prices' && (
            <span className="w-1 h-1 rounded-full bg-[#16834B] mt-0.5" />
          )}
        </button>

        {/* Tab 3: AI Copilot */}
        <button
          onClick={() => setActiveTab('ai_copilot')}
          className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center transition-colors relative ${
            activeTab === 'ai_copilot' ? 'text-[#16834B]' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Sparkles className={`w-5 h-5 ${activeTab === 'ai_copilot' ? 'stroke-[2.5] text-[#F4A62A]' : 'stroke-[1.8] text-[#F4A62A]'}`} />
          <span className={`text-[10px] tracking-tight mt-1 ${activeTab === 'ai_copilot' ? 'font-bold' : 'font-medium'}`}>
            AI Copilot
          </span>
          {activeTab === 'ai_copilot' && (
            <span className="w-1 h-1 rounded-full bg-[#16834B] mt-0.5" />
          )}
        </button>

        {/* Tab 4: Awareness Hub */}
        <button
          onClick={() => setActiveTab('awareness')}
          className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center transition-colors relative ${
            activeTab === 'awareness' ? 'text-[#16834B]' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <ShieldCheck className={`w-5 h-5 ${activeTab === 'awareness' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className={`text-[10px] tracking-tight mt-1 ${activeTab === 'awareness' ? 'font-bold' : 'font-medium'}`}>
            Awareness
          </span>
          {activeTab === 'awareness' && (
            <span className="w-1 h-1 rounded-full bg-[#16834B] mt-0.5" />
          )}
        </button>

        {/* Tab 5: Orders / Account */}
        <button
          onClick={() => setActiveTab('orders')}
          className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center transition-colors relative ${
            activeTab === 'orders' ? 'text-[#16834B]' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <div className="relative">
            <PackageCheck className={`w-5 h-5 ${activeTab === 'orders' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            {activeOrdersCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#F4A62A] text-[#252B27] font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center ring-1 ring-white">
                {activeOrdersCount}
              </span>
            )}
          </div>
          <span className={`text-[10px] tracking-tight mt-1 ${activeTab === 'orders' ? 'font-bold' : 'font-medium'}`}>
            {t('orders')}
          </span>
          {activeTab === 'orders' && (
            <span className="w-1 h-1 rounded-full bg-[#16834B] mt-0.5" />
          )}
        </button>

      </div>
    </nav>
  );
};
