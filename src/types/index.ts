export type UserRole = 'farmer' | 'buyer';

export type LanguageCode = 'en' | 'ha' | 'yo' | 'ig';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar: string;
  location: {
    state: string;
    city: string;
    farmAddress?: string;
  };
  farmName?: string;
  farmSizeHectares?: number;
  cooperativeName?: string;
  isVerified: boolean;
  memberSince: string;
  rating: number;
  totalDeals: number;
  bio?: string;
}

export type ProduceCategory = 
  | 'Grains & Cereals'
  | 'Tubers & Roots'
  | 'Vegetables & Peppers'
  | 'Legumes & Beans'
  | 'Fruits'
  | 'Cash Crops & Spices';

export interface ProduceItem {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  farmName: string;
  farmerLocation: {
    state: string;
    city: string;
  };
  farmerRating: number;
  farmerReviewsCount: number;
  farmerAvatar: string;
  isVerifiedFarmer: boolean;
  
  title: string;
  category: ProduceCategory;
  description: string;
  image: string;
  galleryImages?: string[];
  unitPrice: number; // in Nigerian Naira (₦)
  unitMeasurement: string; // e.g., '50kg Bag', '100kg Bag', 'Raffia Basket', 'Crate', 'Tuber'
  availableQuantity: number;
  minimumOrderQuantity: number;
  harvestDate: string;
  freshnessGuaranteeDays: number;
  isOrganic: boolean;
  qualityGrade: 'Grade A (Export / Premium)' | 'Grade B (Standard)' | 'Bulk Processing';
  
  // Market comparison to illustrate middleman savings
  middlemanRetailPrice: number; // e.g. Price at Mile 12 / Bodija
  estimatedBuyerSavingsPercent: number;
  
  dateListed: string;
  status: 'available' | 'low_stock' | 'sold_out';
}

export type OrderStatus = 
  | 'pending_confirmation'
  | 'harvest_packaging'
  | 'in_transit'
  | 'delivered_pending_inspection'
  | 'completed'
  | 'cancelled';

export interface Order {
  id: string;
  trackingNumber: string;
  produceId: string;
  produceTitle: string;
  produceImage: string;
  unitMeasurement: string;
  unitPrice: number;
  quantity: number;
  totalProduceAmount: number;
  logisticsFee: number;
  escrowFee: number;
  totalAmount: number;
  
  buyerId: string;
  buyerName: string;
  buyerPhone: string;
  deliveryAddress: {
    state: string;
    city: string;
    street: string;
  };
  
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  farmerLocation: string;
  
  fulfillmentType: 'farm_pickup' | 'agrifest_logistics';
  status: OrderStatus;
  statusTimestamps: {
    placed: string;
    confirmed?: string;
    harvested?: string;
    dispatched?: string;
    delivered?: string;
    escrowReleased?: string;
  };
  escrowSecured: boolean;
  escrowReleased: boolean;
  transporterDetails?: {
    driverName: string;
    driverPhone: string;
    vehiclePlate: string;
  };
  hasReviewed?: boolean;
}

export interface Review {
  id: string;
  produceId?: string;
  orderId?: string;
  farmerId: string;
  buyerId: string;
  buyerName: string;
  buyerRole: string;
  rating: number; // 1 to 5
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  text: string;
  timestamp: string;
  produceId?: string;
  produceTitle?: string;
  producePrice?: number;
  isOffer?: boolean;
  offerAmount?: number;
}

export interface Conversation {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerAvatar: string;
  buyerId: string;
  buyerName: string;
  buyerAvatar: string;
  produceTitle?: string;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'order' | 'escrow' | 'message' | 'price_alert';
  linkTarget?: string;
}

export interface MarketPriceInsight {
  crop: string;
  farmgateAvg: number;
  middlemanRetailAvg: number;
  priceTrend: 'rising' | 'falling' | 'stable';
  topSupplyRegion: string;
  highDemandMarket: string;
  recommendation: string;
}

export interface NigerianFoodstuffPrice {
  id: string;
  foodstuff: string;
  category: ProduceCategory;
  varietyOrGrade: string;
  standardMeasurement: string; // e.g. 100kg Bag, 50kg Bag, Raffia Basket, 25L Keg
  farmgatePriceNaira: number; // ₦
  middlemanRetailPriceNaira: number; // ₦ at Mile 12 / Bodija
  savingsAmountNaira: number;
  savingsPercentage: number;
  harvestStates: string[];
  peakHarvestSeason: string;
  currentAvailability: 'High' | 'Moderate' | 'Limited (Seasonal)';
  keyQualityIndicators: string[];
}

export interface AwarenessGuide {
  id: string;
  targetAudience: 'farmer' | 'buyer' | 'both';
  title: string;
  subtitle: string;
  category: 'Middleman Elimination' | 'Post-Harvest Loss Prevention' | 'Pricing Rights' | 'Escrow & Safety';
  readingTimeMinutes: number;
  keyTakeaway: string;
  contentParagraphs: string[];
  actionChecklist: string[];
}
