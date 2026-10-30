import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  ProduceItem, 
  Order, 
  Review, 
  AppNotification, 
  ChatMessage, 
  Conversation, 
  LanguageCode, 
  OrderStatus 
} from '../types';
import { 
  DEMO_USERS, 
  INITIAL_PRODUCE, 
  INITIAL_ORDERS, 
  INITIAL_REVIEWS, 
  INITIAL_NOTIFICATIONS, 
  TRANSLATIONS 
} from '../data/mockData';

interface AppContextType {
  currentUser: User;
  switchUser: (userId: string) => void;
  updateCurrentUserProfile: (updates: Partial<User>) => void;
  
  produceList: ProduceItem[];
  addProduce: (produce: Omit<ProduceItem, 'id' | 'dateListed'>) => void;
  updateProduce: (id: string, updates: Partial<ProduceItem>) => void;
  deleteProduce: (id: string) => void;
  
  orders: Order[];
  placeOrder: (orderInput: {
    produce: ProduceItem;
    quantity: number;
    fulfillmentType: 'farm_pickup' | 'agrifest_logistics';
    deliveryAddress: { state: string; city: string; street: string };
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  releaseEscrow: (orderId: string) => void;
  
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  
  notifications: AppNotification[];
  markNotificationAsRead: (id: string) => void;
  unreadNotificationsCount: number;
  
  conversations: Conversation[];
  messages: Record<string, ChatMessage[]>;
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  sendMessage: (recipientId: string, text: string, produceItem?: ProduceItem) => void;
  startChatWithFarmer: (farmerId: string, produceItem?: ProduceItem) => void;
  
  activeTab: 'marketplace' | 'prices' | 'awareness' | 'ai_copilot' | 'orders' | 'messages' | 'dashboard' | 'profile' | 'auth';
  setActiveTab: (tab: 'marketplace' | 'prices' | 'awareness' | 'ai_copilot' | 'orders' | 'messages' | 'dashboard' | 'profile' | 'auth') => void;
  
  isAuthenticated: boolean;
  signIn: (emailOrPhone: string, role: 'farmer' | 'buyer', name?: string) => void;
  signUp: (userData: Partial<User>) => void;
  signOut: () => void;

  askAgriAI: (prompt: string, crop?: string, state?: string) => Promise<{ text: string; source: string }>;
  
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  
  displayMode: 'responsive' | 'mobile_frame';
  setDisplayMode: (mode: 'responsive' | 'mobile_frame') => void;
  
  selectedProduce: ProduceItem | null;
  setSelectedProduce: (item: ProduceItem | null) => void;
  
  checkoutProduce: ProduceItem | null;
  openCheckout: (item: ProduceItem) => void;
  closeCheckout: () => void;
  
  isAddProduceOpen: boolean;
  setIsAddProduceOpen: (open: boolean) => void;
  
  isAgriAdvisorOpen: boolean;
  setIsAgriAdvisorOpen: (open: boolean) => void;
  
  hasCompletedOnboarding: boolean;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  
  selectedFarmerId: string | null;
  setSelectedFarmerId: (id: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load persisted state or initial seed
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('hag_current_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    // Default to buyer Chioma Okeke for a rich initial marketplace exploration experience
    return DEMO_USERS[2];
  });

  const [produceList, setProduceList] = useState<ProduceItem[]>(() => {
    const saved = localStorage.getItem('hag_produce_list');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_PRODUCE;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('hag_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_ORDERS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('hag_reviews');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_REVIEWS;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('hag_notifications');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_NOTIFICATIONS;
  });

  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(() => {
    return localStorage.getItem('hag_onboarded') === 'true';
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const authVal = localStorage.getItem('hag_auth');
    return authVal !== 'false';
  });

  const [language, setLanguage] = useState<LanguageCode>('en');
  const [displayMode, setDisplayMode] = useState<'responsive' | 'mobile_frame'>('responsive');
  const [activeTab, setActiveTab] = useState<'marketplace' | 'prices' | 'awareness' | 'ai_copilot' | 'orders' | 'messages' | 'dashboard' | 'profile' | 'auth'>('marketplace');
  
  const [selectedProduce, setSelectedProduce] = useState<ProduceItem | null>(null);
  const [checkoutProduce, setCheckoutProduce] = useState<ProduceItem | null>(null);
  const [isAddProduceOpen, setIsAddProduceOpen] = useState(false);
  const [isAgriAdvisorOpen, setIsAgriAdvisorOpen] = useState(false);
  const [selectedFarmerId, setSelectedFarmerId] = useState<string | null>(null);

  // Chat conversations
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 'conv-1',
      farmerId: 'farmer-1',
      farmerName: 'Mallam Ibrahim Musa',
      farmerAvatar: DEMO_USERS[0].avatar,
      buyerId: 'buyer-1',
      buyerName: 'Chioma Okeke',
      buyerAvatar: DEMO_USERS[2].avatar,
      produceTitle: 'Clean Sun-Dried Yellow Maize (100kg Bag)',
      lastMessage: 'Good day Hajiya Chioma, the 20 bags were weighed and loaded on the truck this morning.',
      lastTimestamp: '10:45 AM',
      unreadCount: 1
    },
    {
      id: 'conv-2',
      farmerId: 'farmer-2',
      farmerName: 'Hajiya Fatima Aliyu',
      farmerAvatar: DEMO_USERS[1].avatar,
      buyerId: 'buyer-1',
      buyerName: 'Chioma Okeke',
      buyerAvatar: DEMO_USERS[2].avatar,
      produceTitle: 'Fresh Jos Highland Plum Tomatoes',
      lastMessage: 'We have 15 more baskets reserved for you if needed.',
      lastTimestamp: 'Yesterday',
      unreadCount: 0
    }
  ]);

  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({
    'conv-1': [
      {
        id: 'msg-1',
        conversationId: 'conv-1',
        senderId: 'buyer-1',
        senderName: 'Chioma Okeke',
        senderRole: 'buyer',
        text: 'Hello Mallam Ibrahim, is this batch of yellow maize completely de-stoned? We are grinding for food seasoning.',
        timestamp: '10:30 AM',
        produceTitle: 'Clean Sun-Dried Yellow Maize (100kg Bag)'
      },
      {
        id: 'msg-2',
        conversationId: 'conv-1',
        senderId: 'farmer-1',
        senderName: 'Mallam Ibrahim Musa',
        senderRole: 'farmer',
        text: 'Good day Hajiya Chioma! Yes, our cooperative ran it through double optical destoners. Zero pebbles, 100% clean.',
        timestamp: '10:38 AM'
      },
      {
        id: 'msg-3',
        conversationId: 'conv-1',
        senderId: 'farmer-1',
        senderName: 'Mallam Ibrahim Musa',
        senderRole: 'farmer',
        text: 'Good day Hajiya Chioma, the 20 bags were weighed and loaded on the truck this morning.',
        timestamp: '10:45 AM'
      }
    ],
    'conv-2': [
      {
        id: 'msg-4',
        conversationId: 'conv-2',
        senderId: 'buyer-1',
        senderName: 'Chioma Okeke',
        senderRole: 'buyer',
        text: 'Hajiya Fatima, can the refrigerated transit arrive in Ikeja within 36 hours?',
        timestamp: 'Yesterday 02:15 PM'
      },
      {
        id: 'msg-5',
        conversationId: 'conv-2',
        senderId: 'farmer-2',
        senderName: 'Hajiya Fatima Aliyu',
        senderRole: 'farmer',
        text: 'Yes madam, our refrigerated cold-chain truck departs Jos every evening. It will reach Lagos by 6 AM.',
        timestamp: 'Yesterday 02:40 PM'
      },
      {
        id: 'msg-6',
        conversationId: 'conv-2',
        senderId: 'farmer-2',
        senderName: 'Hajiya Fatima Aliyu',
        senderRole: 'farmer',
        text: 'We have 15 more baskets reserved for you if needed.',
        timestamp: 'Yesterday 04:10 PM'
      }
    ]
  });

  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('hag_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('hag_produce_list', JSON.stringify(produceList));
  }, [produceList]);

  useEffect(() => {
    localStorage.setItem('hag_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('hag_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('hag_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const switchUser = (userId: string) => {
    const found = DEMO_USERS.find(u => u.id === userId);
    if (found) {
      setCurrentUser(found);
      // Auto switch to appropriate default tab
      if (found.role === 'farmer') {
        setActiveTab('dashboard');
      } else {
        setActiveTab('marketplace');
      }
    }
  };

  const updateCurrentUserProfile = (updates: Partial<User>) => {
    setCurrentUser(prev => ({ ...prev, ...updates }));
  };

  const addProduce = (produce: Omit<ProduceItem, 'id' | 'dateListed'>) => {
    const newItem: ProduceItem = {
      ...produce,
      id: `prod-${Date.now()}`,
      dateListed: new Date().toISOString().split('T')[0],
      status: 'available'
    };
    setProduceList(prev => [newItem, ...prev]);

    // Push notification
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Produce Listed Successfully',
      message: `Your listing for "${newItem.title}" is now live on the marketplace.`,
      timestamp: 'Just now',
      read: false,
      type: 'order'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const updateProduce = (id: string, updates: Partial<ProduceItem>) => {
    setProduceList(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const deleteProduce = (id: string) => {
    setProduceList(prev => prev.filter(item => item.id !== id));
  };

  const placeOrder = ({
    produce,
    quantity,
    fulfillmentType,
    deliveryAddress
  }: {
    produce: ProduceItem;
    quantity: number;
    fulfillmentType: 'farm_pickup' | 'agrifest_logistics';
    deliveryAddress: { state: string; city: string; street: string };
  }): Order => {
    const totalProduceAmount = produce.unitPrice * quantity;
    const logisticsFee = fulfillmentType === 'agrifest_logistics' ? Math.round(quantity * 2500) : 0;
    const escrowFee = Math.round(totalProduceAmount * 0.015); // 1.5% escrow security fee
    const totalAmount = totalProduceAmount + logisticsFee + escrowFee;
    const trackingNumber = `HAG-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      trackingNumber,
      produceId: produce.id,
      produceTitle: produce.title,
      produceImage: produce.image,
      unitMeasurement: produce.unitMeasurement,
      unitPrice: produce.unitPrice,
      quantity,
      totalProduceAmount,
      logisticsFee,
      escrowFee,
      totalAmount,
      buyerId: currentUser.id,
      buyerName: currentUser.name,
      buyerPhone: currentUser.phone,
      deliveryAddress,
      farmerId: produce.farmerId,
      farmerName: produce.farmerName,
      farmerPhone: produce.farmerPhone,
      farmerLocation: `${produce.farmerLocation.city}, ${produce.farmerLocation.state}`,
      fulfillmentType,
      status: 'pending_confirmation',
      statusTimestamps: {
        placed: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today'
      },
      escrowSecured: true,
      escrowReleased: false,
      transporterDetails: fulfillmentType === 'agrifest_logistics' ? {
        driverName: 'Emeka Nwosu (Agrifest Fleet)',
        driverPhone: '+234 803 219 9081',
        vehiclePlate: 'AGR-442-LA'
      } : undefined
    };

    setOrders(prev => [newOrder, ...prev]);

    // Decrease produce stock
    updateProduce(produce.id, {
      availableQuantity: Math.max(0, produce.availableQuantity - quantity)
    });

    // Create notification
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Order Placed & Escrow Secured',
      message: `Your payment of ₦${totalAmount.toLocaleString()} for ${quantity}x ${produce.title} is locked in Escrow. Farmer notified!`,
      timestamp: 'Just now',
      read: false,
      type: 'escrow',
      linkTarget: 'orders'
    };
    setNotifications(prev => [newNotif, ...prev]);

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today';
        const timestamps = { ...order.statusTimestamps };
        if (status === 'harvest_packaging') timestamps.harvested = timeNow;
        if (status === 'in_transit') timestamps.dispatched = timeNow;
        if (status === 'delivered_pending_inspection') timestamps.delivered = timeNow;
        if (status === 'completed') timestamps.escrowReleased = timeNow;

        return {
          ...order,
          status,
          statusTimestamps: timestamps
        };
      }
      return order;
    }));
  };

  const releaseEscrow = (orderId: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today';
        return {
          ...order,
          status: 'completed',
          escrowReleased: true,
          statusTimestamps: {
            ...order.statusTimestamps,
            escrowReleased: timeNow
          }
        };
      }
      return order;
    }));

    // Notification
    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Escrow Funds Disbursed to Farmer',
      message: `Inspection confirmed! Funds have been credited to the farmer's verified bank account. Thank you for trading on HackAgrifest.`,
      timestamp: 'Just now',
      read: false,
      type: 'escrow'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const addReview = (review: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...review,
      id: `rev-${Date.now()}`,
      date: 'Today'
    };
    setReviews(prev => [newReview, ...prev]);

    // Mark order as reviewed if applicable
    if (review.orderId) {
      setOrders(prev => prev.map(o => o.id === review.orderId ? { ...o, hasReviewed: true } : o));
    }
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  const sendMessage = (recipientId: string, text: string, produceItem?: ProduceItem) => {
    let convId = activeConversationId;
    if (!convId) {
      // Find or create conversation
      const existing = conversations.find(c => 
        (c.farmerId === recipientId && c.buyerId === currentUser.id) ||
        (c.buyerId === recipientId && c.farmerId === currentUser.id)
      );
      if (existing) {
        convId = existing.id;
      } else {
        const otherUser = DEMO_USERS.find(u => u.id === recipientId);
        convId = `conv-${Date.now()}`;
        const newConv: Conversation = {
          id: convId,
          farmerId: currentUser.role === 'farmer' ? currentUser.id : recipientId,
          farmerName: currentUser.role === 'farmer' ? currentUser.name : (otherUser?.name || 'Farmer'),
          farmerAvatar: currentUser.role === 'farmer' ? currentUser.avatar : (otherUser?.avatar || DEMO_USERS[0].avatar),
          buyerId: currentUser.role === 'buyer' ? currentUser.id : recipientId,
          buyerName: currentUser.role === 'buyer' ? currentUser.name : (otherUser?.name || 'Buyer'),
          buyerAvatar: currentUser.role === 'buyer' ? currentUser.avatar : (otherUser?.avatar || DEMO_USERS[2].avatar),
          produceTitle: produceItem?.title,
          lastMessage: text,
          lastTimestamp: 'Just now',
          unreadCount: 0
        };
        setConversations(prev => [newConv, ...prev]);
      }
    }

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId: convId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentUser.role,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      produceTitle: produceItem?.title,
      producePrice: produceItem?.unitPrice
    };

    setMessages(prev => ({
      ...prev,
      [convId!]: [...(prev[convId!] || []), newMsg]
    }));

    setConversations(prev => prev.map(c => c.id === convId ? {
      ...c,
      lastMessage: text,
      lastTimestamp: 'Just now'
    } : c));

    // Simulated farmer response if user is buyer
    if (currentUser.role === 'buyer') {
      setTimeout(() => {
        const replyText = text.toLowerCase().includes('delivery') 
          ? 'Yes, we have Agrifest refrigerated cold-chain trucks leaving tomorrow. We can dispatch right to your warehouse.'
          : text.toLowerCase().includes('price') || text.toLowerCase().includes('discount')
          ? 'Our price is already set at direct farmgate level with zero middleman markup. If you take 20+ bags we can offer a 3% cooperative discount.'
          : 'Thank you for reaching out! The produce is freshly harvested and ready for inspection. Would you like to proceed with an escrow order?';

        const replyMsg: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          conversationId: convId!,
          senderId: recipientId,
          senderName: 'Farmer Partner',
          senderRole: 'farmer',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => ({
          ...prev,
          [convId!]: [...(prev[convId!] || []), replyMsg]
        }));

        setConversations(prev => prev.map(c => c.id === convId ? {
          ...c,
          lastMessage: replyText,
          lastTimestamp: 'Just now'
        } : c));
      }, 1400);
    }
  };

  const startChatWithFarmer = (farmerId: string, produceItem?: ProduceItem) => {
    const existing = conversations.find(c => 
      (c.farmerId === farmerId && c.buyerId === currentUser.id) ||
      (c.buyerId === farmerId && c.farmerId === currentUser.id)
    );

    if (existing) {
      setActiveConversationId(existing.id);
    } else {
      const otherUser = DEMO_USERS.find(u => u.id === farmerId);
      const convId = `conv-${Date.now()}`;
      const newConv: Conversation = {
        id: convId,
        farmerId,
        farmerName: otherUser?.name || 'Farmer Partner',
        farmerAvatar: otherUser?.avatar || DEMO_USERS[0].avatar,
        buyerId: currentUser.id,
        buyerName: currentUser.name,
        buyerAvatar: currentUser.avatar,
        produceTitle: produceItem?.title,
        lastMessage: `Inquiring about ${produceItem?.title || 'farm produce'}`,
        lastTimestamp: 'Just now',
        unreadCount: 0
      };
      setConversations(prev => [newConv, ...prev]);
      setActiveConversationId(convId);
    }

    setActiveTab('messages');
  };

  const completeOnboarding = () => {
    localStorage.setItem('hag_onboarded', 'true');
    setHasCompletedOnboarding(true);
  };

  const resetOnboarding = () => {
    localStorage.removeItem('hag_onboarded');
    setHasCompletedOnboarding(false);
  };

  const openCheckout = (item: ProduceItem) => {
    setCheckoutProduce(item);
  };

  const closeCheckout = () => {
    setCheckoutProduce(null);
  };

  const signIn = (emailOrPhone: string, role: 'farmer' | 'buyer', customName?: string) => {
    // Check if matches a demo user
    const matched = DEMO_USERS.find(
      u => u.email.toLowerCase() === emailOrPhone.toLowerCase() || u.phone.includes(emailOrPhone)
    );

    if (matched) {
      setCurrentUser(matched);
    } else {
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: customName || (role === 'farmer' ? 'New Nigerian Farmer' : 'New Direct Buyer'),
        email: emailOrPhone.includes('@') ? emailOrPhone : `${emailOrPhone}@hackagrifest.ng`,
        phone: emailOrPhone.includes('+') ? emailOrPhone : '+234 803 000 0000',
        role,
        avatar: role === 'farmer' ? DEMO_USERS[0].avatar : DEMO_USERS[2].avatar,
        location: {
          state: role === 'farmer' ? 'Kano' : 'Lagos',
          city: role === 'farmer' ? 'Dawanau' : 'Ikeja',
          farmAddress: role === 'farmer' ? 'Agro Cluster, Plot 12' : 'Wholesale Store 4'
        },
        farmName: role === 'farmer' ? `${customName || 'Farm'} Agricultural Estate` : undefined,
        farmSizeHectares: role === 'farmer' ? 18 : undefined,
        isVerified: true,
        memberSince: 'October 2026',
        rating: 5.0,
        totalDeals: 1,
        bio: role === 'farmer' ? 'Registered farmer on HackAgrifest direct trade network.' : 'Commercial buyer direct procurement.'
      };
      setCurrentUser(newUser);
    }

    setIsAuthenticated(true);
    localStorage.setItem('hag_auth', 'true');
    setActiveTab(role === 'farmer' ? 'dashboard' : 'marketplace');
  };

  const signUp = (userData: Partial<User>) => {
    const role = userData.role || 'buyer';
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: userData.name || (role === 'farmer' ? 'Registered Farmer' : 'Verified Buyer'),
      email: userData.email || 'user@hackagrifest.ng',
      phone: userData.phone || '+234 800 000 0000',
      role,
      avatar: role === 'farmer' ? DEMO_USERS[0].avatar : DEMO_USERS[2].avatar,
      location: userData.location || {
        state: role === 'farmer' ? 'Plateau' : 'Lagos',
        city: role === 'farmer' ? 'Jos' : 'Ikeja'
      },
      farmName: userData.farmName,
      farmSizeHectares: userData.farmSizeHectares,
      isVerified: true,
      memberSince: 'October 2026',
      rating: 5.0,
      totalDeals: 0,
      bio: userData.bio || 'Active member of HackAgrifest.'
    };
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('hag_auth', 'true');
    setActiveTab(role === 'farmer' ? 'dashboard' : 'marketplace');
  };

  const signOut = () => {
    setIsAuthenticated(false);
    localStorage.setItem('hag_auth', 'false');
    setActiveTab('auth');
  };

  const askAgriAI = async (prompt: string, crop?: string, state?: string): Promise<{ text: string; source: string }> => {
    try {
      const response = await fetch('/api/gemini/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          crop,
          state: state || currentUser.location.state,
          userRole: currentUser.role
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.text) {
          return { text: data.text, source: data.source || 'gemini_api' };
        }
      }
    } catch (err) {
      console.warn('API call fallback to local intelligence:', err);
    }

    // Dynamic agronomic fallback
    const cropKey = crop?.toLowerCase() || prompt.toLowerCase();
    if (cropKey.includes('tomato') || cropKey.includes('jos')) {
      return {
        text: `🍅 **Plateau & Northern Tomato Advisory**: Current farmgate price in Jos/Bokkos is ₦28,000–₦30,000/basket vs ₦42,000 at Mile 12. **Loss Prevention**: Move fruit in rigid ventilated plastic crates rather than overloaded baskets to reduce crushing rot from 35% to under 4%.`,
        source: 'local_intelligence'
      };
    }
    if (cropKey.includes('rice') || cropKey.includes('abakaliki') || cropKey.includes('kebbi')) {
      return {
        text: `🌾 **Stone-Free Rice Price Advisory**: Farmgate 50kg bag is ₦68,000–₦70,000 vs ₦89,000 in open retail. **Direct Margin**: Eliminate transit middlemen who charge ₦15,000/bag for mere aggregation. Direct buyer-to-farmer contracts yield maximum ROI.`,
        source: 'local_intelligence'
      };
    }
    return {
      text: `🌱 **Nigerian Agricultural Market Analysis**: Direct farmgate contracts on HackAgrifest allow farmers to capture up to 35% more margin while buyers save 25% compared to multi-tier middleman cartels. All payments are backed by 100% inspection Escrow.`,
      source: 'local_intelligence'
    };
  };

  const t = (key: string): string => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS['en']?.[key] || key;
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        switchUser,
        updateCurrentUserProfile,
        produceList,
        addProduce,
        updateProduce,
        deleteProduce,
        orders,
        placeOrder,
        updateOrderStatus,
        releaseEscrow,
        reviews,
        addReview,
        notifications,
        markNotificationAsRead,
        unreadNotificationsCount,
        conversations,
        messages,
        activeConversationId,
        setActiveConversationId,
        sendMessage,
        startChatWithFarmer,
        activeTab,
        setActiveTab,
        isAuthenticated,
        signIn,
        signUp,
        signOut,
        askAgriAI,
        language,
        setLanguage,
        t,
        displayMode,
        setDisplayMode,
        selectedProduce,
        setSelectedProduce,
        checkoutProduce,
        openCheckout,
        closeCheckout,
        isAddProduceOpen,
        setIsAddProduceOpen,
        isAgriAdvisorOpen,
        setIsAgriAdvisorOpen,
        hasCompletedOnboarding,
        completeOnboarding,
        resetOnboarding,
        selectedFarmerId,
        setSelectedFarmerId
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
