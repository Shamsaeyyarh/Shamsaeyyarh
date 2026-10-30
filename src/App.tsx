import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { MarketplaceView } from './components/marketplace/MarketplaceView';
import { ProductDetailModal } from './components/marketplace/ProductDetailModal';
import { FarmerDashboard } from './components/farmer/FarmerDashboard';
import { AddProduceModal } from './components/farmer/AddProduceModal';
import { FarmerProfileModal } from './components/farmer/FarmerProfileModal';
import { OrdersView } from './components/orders/OrdersView';
import { OrderCheckoutModal } from './components/orders/OrderCheckoutModal';
import { ChatView } from './components/chat/ChatView';
import { ProfileView } from './components/profile/ProfileView';
import { AgriPriceAdvisorModal } from './components/ai/AgriPriceAdvisorModal';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { OnboardingModal } from './components/onboarding/OnboardingModal';
import { FoodstuffPricesTable } from './components/prices/FoodstuffPricesTable';
import { AwarenessView } from './components/awareness/AwarenessView';
import { AiAgriAdvisorView } from './components/ai/AiAgriAdvisorView';
import { AuthPage } from './components/auth/AuthPage';
import { Wifi, Battery, Signal, Smartphone, Monitor } from 'lucide-react';

const AppContent: React.FC = () => {
  const { 
    activeTab, 
    hasCompletedOnboarding, 
    displayMode, 
    setDisplayMode 
  } = useApp();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Render tab content
  const renderActiveView = () => {
    switch (activeTab) {
      case 'marketplace':
        return <MarketplaceView />;
      case 'prices':
        return <FoodstuffPricesTable />;
      case 'awareness':
        return <AwarenessView />;
      case 'ai_copilot':
        return <AiAgriAdvisorView />;
      case 'dashboard':
        return <FarmerDashboard />;
      case 'orders':
        return <OrdersView />;
      case 'messages':
        return <ChatView />;
      case 'auth':
        return <AuthPage />;
      case 'profile':
        return <ProfileView />;
      default:
        return <MarketplaceView />;
    }
  };

  const appInner = (
    <div className="min-h-screen bg-[#F7F8F4] flex flex-col selection:bg-[#16834B]/20 selection:text-[#16834B]">
      {/* Top Header */}
      <Header onOpenNotifications={() => setIsNotificationsOpen(true)} />

      {/* Main Page Body */}
      <main className="flex-1 w-full">
        {renderActiveView()}
      </main>

      {/* Mobile Bottom Thumb Bar */}
      <BottomNav />

      {/* Overlays and Modals */}
      {!hasCompletedOnboarding && <OnboardingModal />}
      <ProductDetailModal />
      <OrderCheckoutModal />
      <AddProduceModal />
      <FarmerProfileModal />
      <AgriPriceAdvisorModal />
      <NotificationDrawer 
        isOpen={isNotificationsOpen} 
        onClose={() => setIsNotificationsOpen(false)} 
      />
    </div>
  );

  // If user requested Smartphone Frame Mode
  if (displayMode === 'mobile_frame') {
    return (
      <div className="min-h-screen bg-stone-900 flex flex-col items-center justify-center p-2 sm:p-6">
        
        {/* Switch back banner */}
        <div className="mb-3 flex items-center justify-between w-full max-w-[420px] text-xs text-stone-300 px-2">
          <span className="font-semibold text-[#F4A62A] flex items-center gap-1.5">
            <Smartphone className="w-4 h-4" />
            <span>Mobile Device Simulation</span>
          </span>
          <button
            onClick={() => setDisplayMode('responsive')}
            className="flex items-center gap-1 text-white hover:text-[#16834B] bg-stone-800 hover:bg-stone-700 py-1 px-2.5 rounded-lg transition-colors font-medium"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Full Responsive</span>
          </button>
        </div>

        {/* Smartphone Chassis Container */}
        <div className="relative w-full max-w-[400px] h-[844px] bg-black rounded-[48px] p-3 shadow-2xl ring-1 ring-white/10 flex flex-col overflow-hidden">
          
          {/* Top Speaker & Camera Dynamic Island */}
          <div className="absolute top-0 left-0 right-0 h-10 z-50 flex items-center justify-between px-7 text-white text-[11px] font-semibold select-none pointer-events-none">
            <span>09:41</span>
            <div className="w-24 h-4 bg-black rounded-full" />
            <div className="flex items-center gap-1.5">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <Battery className="w-4 h-4" />
            </div>
          </div>

          {/* Screen Content Wrapper */}
          <div className="w-full h-full rounded-[38px] overflow-y-auto overflow-x-hidden bg-[#F7F8F4] flex flex-col pt-3 relative no-scrollbar">
            {appInner}
          </div>

          {/* Home indicator bar at bottom */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/40 rounded-full z-50 pointer-events-none" />
        </div>
      </div>
    );
  }

  // Standard responsive view
  return appInner;
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
