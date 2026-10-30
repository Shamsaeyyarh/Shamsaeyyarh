import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Bell, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  Check, 
  MessageSquare,
  Clock
} from 'lucide-react';
import { AppNotification } from '../../types';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationAsRead, setActiveTab } = useApp();

  if (!isOpen) return null;

  const getIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'escrow': return <ShieldCheck className="w-4 h-4 text-[#16834B]" />;
      case 'order': return <Truck className="w-4 h-4 text-[#F4A62A]" />;
      case 'price_alert': return <Sparkles className="w-4 h-4 text-emerald-600" />;
      case 'message': return <MessageSquare className="w-4 h-4 text-blue-500" />;
      default: return <Bell className="w-4 h-4 text-stone-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col border-l border-stone-200 animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-4 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#16834B]" />
            <h2 className="font-bold text-base text-stone-900">Notifications</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto divide-y divide-stone-100 p-2">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-stone-400 text-xs">
              No notifications yet.
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => {
                  markNotificationAsRead(notif.id);
                  if (notif.linkTarget) {
                    setActiveTab(notif.linkTarget as any);
                    onClose();
                  }
                }}
                className={`p-3 rounded-xl transition-colors cursor-pointer space-y-1 ${
                  notif.read ? 'hover:bg-stone-50' : 'bg-[#16834B]/5 hover:bg-[#16834B]/10'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {getIcon(notif.type)}
                    <span className={`text-xs ${notif.read ? 'font-medium text-stone-800' : 'font-bold text-stone-900'}`}>
                      {notif.title}
                    </span>
                  </div>
                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-[#16834B] shrink-0 mt-1" />
                  )}
                </div>

                <p className="text-xs text-stone-600 pl-6 leading-relaxed">
                  {notif.message}
                </p>

                <div className="text-[10px] text-stone-400 pl-6 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{notif.timestamp}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-stone-100 bg-stone-50 text-center text-xs text-stone-500">
          Real-time trade & escrow alerts
        </div>

      </div>
    </div>
  );
};
