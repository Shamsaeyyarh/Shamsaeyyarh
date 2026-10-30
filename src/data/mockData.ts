import { 
  User, 
  ProduceItem, 
  Order, 
  Review, 
  AppNotification, 
  MarketPriceInsight,
  NigerianFoodstuffPrice,
  AwarenessGuide
} from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_nigerian_farm_1793374138160.jpg';
export const TOMATOES_IMAGE = '/src/assets/images/produce_fresh_tomatoes_1793374135064.jpg';
export const GRAIN_SACKS_IMAGE = '/src/assets/images/produce_grain_sacks_1793374135338.jpg';
export const YAM_PEPPERS_IMAGE = '/src/assets/images/produce_yam_peppers_1793374134897.jpg';
export const FARMER_IBRAHIM_IMAGE = '/src/assets/images/farmer_portrait_ibrahim_1793374135668.jpg';

export const DEMO_USERS: User[] = [
  {
    id: 'farmer-1',
    name: 'Mallam Ibrahim Musa',
    email: 'ibrahim.musa@hackagrifest.ng',
    phone: '+234 803 451 9022',
    role: 'farmer',
    avatar: FARMER_IBRAHIM_IMAGE,
    location: {
      state: 'Kano',
      city: 'Dawanau LGA',
      farmAddress: 'Plot 4, Dawanau Grain Belt, Kano'
    },
    farmName: 'Arewa Golden Fields Cooperative',
    farmSizeHectares: 24,
    cooperativeName: 'Kano Grains & Legumes Union',
    isVerified: true,
    memberSince: 'March 2023',
    rating: 4.9,
    totalDeals: 148,
    bio: 'Third-generation grain farmer specializing in high-yield yellow maize, stone-free rice, and dried beans. Passionate about direct trade and zero post-harvest wastage.'
  },
  {
    id: 'farmer-2',
    name: 'Hajiya Fatima Aliyu',
    email: 'fatima.aliyu@hackagrifest.ng',
    phone: '+234 812 789 4431',
    role: 'farmer',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    location: {
      state: 'Plateau',
      city: 'Jos South',
      farmAddress: 'Bokkos Agro Cluster, Jos Plateau'
    },
    farmName: 'Plateau Highland Fresh Farms',
    farmSizeHectares: 12,
    cooperativeName: 'Plateau Vegetable Growers Association',
    isVerified: true,
    memberSince: 'August 2023',
    rating: 4.8,
    totalDeals: 96,
    bio: 'Specialist grower of Jos plum tomatoes, sweet bell peppers, carrots, and Irish potatoes cultivated in cool plateau soils under hygienic, pesticide-safe conditions.'
  },
  {
    id: 'buyer-1',
    name: 'Chioma Okeke',
    email: 'chioma.okeke@naijafoodhub.com',
    phone: '+234 802 334 8871',
    role: 'buyer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    location: {
      state: 'Lagos',
      city: 'Ikeja / Victoria Island',
      farmAddress: '14 Allen Avenue, Ikeja, Lagos'
    },
    isVerified: true,
    memberSince: 'January 2024',
    rating: 5.0,
    totalDeals: 62,
    bio: 'Procurement Director at Taste of Nigeria Restaurant Chain & Catering Services. Sourcing bulk grains, tubers, and fresh vegetables directly from farmgate.'
  },
  {
    id: 'buyer-2',
    name: 'Dayo Adeyemi',
    email: 'dayo.adeyemi@agrigrocer.ng',
    phone: '+234 814 621 0093',
    role: 'buyer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    location: {
      state: 'Oyo',
      city: 'Ibadan (Bodija)',
      farmAddress: 'Bodija Central Wholesale Mart, Ibadan'
    },
    isVerified: true,
    memberSince: 'May 2024',
    rating: 4.7,
    totalDeals: 39,
    bio: 'Wholesale aggregator supplying 14 supermarkets across Oyo, Ogun, and Osun states.'
  }
];

export const INITIAL_PRODUCE: ProduceItem[] = [
  {
    id: 'prod-1',
    farmerId: 'farmer-1',
    farmerName: 'Mallam Ibrahim Musa',
    farmerPhone: '+234 803 451 9022',
    farmName: 'Arewa Golden Fields Cooperative',
    farmerLocation: {
      state: 'Kano',
      city: 'Dawanau'
    },
    farmerRating: 4.9,
    farmerReviewsCount: 84,
    farmerAvatar: FARMER_IBRAHIM_IMAGE,
    isVerifiedFarmer: true,
    title: 'Clean Sun-Dried Yellow Maize (100kg Bag)',
    category: 'Grains & Cereals',
    description: 'High-energy grade A sun-dried yellow maize harvested this month. Free from weevils, dust, and stones. Perfect for poultry feed, flour milling, or bulk food processing.',
    image: GRAIN_SACKS_IMAGE,
    unitPrice: 42000,
    unitMeasurement: '100kg Jute Bag',
    availableQuantity: 450,
    minimumOrderQuantity: 5,
    harvestDate: 'October 24, 2026',
    freshnessGuaranteeDays: 180,
    isOrganic: true,
    qualityGrade: 'Grade A (Export / Premium)',
    middlemanRetailPrice: 58000,
    estimatedBuyerSavingsPercent: 27,
    dateListed: '2026-10-25',
    status: 'available'
  },
  {
    id: 'prod-2',
    farmerId: 'farmer-2',
    farmerName: 'Hajiya Fatima Aliyu',
    farmerPhone: '+234 812 789 4431',
    farmName: 'Plateau Highland Fresh Farms',
    farmerLocation: {
      state: 'Plateau',
      city: 'Bokkos'
    },
    farmerRating: 4.8,
    farmerReviewsCount: 42,
    farmerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    isVerifiedFarmer: true,
    title: 'Fresh Jos Highland Plum Tomatoes (Large Raffia Basket)',
    category: 'Vegetables & Peppers',
    description: 'Firm, richly ripe Jos highland plum tomatoes picked yesterday morning. Low moisture skin, ideal for extended shelf life during long-distance transit to Southern markets.',
    image: TOMATOES_IMAGE,
    unitPrice: 28500,
    unitMeasurement: 'Large Raffia Basket (~50kg)',
    availableQuantity: 180,
    minimumOrderQuantity: 3,
    harvestDate: 'October 28, 2026',
    freshnessGuaranteeDays: 14,
    isOrganic: false,
    qualityGrade: 'Grade A (Export / Premium)',
    middlemanRetailPrice: 42000,
    estimatedBuyerSavingsPercent: 32,
    dateListed: '2026-10-28',
    status: 'available'
  },
  {
    id: 'prod-3',
    farmerId: 'farmer-1',
    farmerName: 'Mallam Ibrahim Musa',
    farmerPhone: '+234 803 451 9022',
    farmName: 'Arewa Golden Fields Cooperative',
    farmerLocation: {
      state: 'Kano',
      city: 'Dawanau'
    },
    farmerRating: 4.9,
    farmerReviewsCount: 84,
    farmerAvatar: FARMER_IBRAHIM_IMAGE,
    isVerifiedFarmer: true,
    title: 'De-stoned Abakaliki Long Grain Rice (50kg Bag)',
    category: 'Grains & Cereals',
    description: 'Carefully sorted, 100% stone-free parboiled white long grain rice. High swelling ratio, aromatic natural taste, and vacuum packaged for hygiene.',
    image: GRAIN_SACKS_IMAGE,
    unitPrice: 68000,
    unitMeasurement: '50kg Bag',
    availableQuantity: 220,
    minimumOrderQuantity: 2,
    harvestDate: 'October 18, 2026',
    freshnessGuaranteeDays: 365,
    isOrganic: true,
    qualityGrade: 'Grade A (Export / Premium)',
    middlemanRetailPrice: 89000,
    estimatedBuyerSavingsPercent: 24,
    dateListed: '2026-10-20',
    status: 'available'
  },
  {
    id: 'prod-4',
    farmerId: 'farmer-3',
    farmerName: 'Terseer Iorfa',
    farmerPhone: '+234 806 912 3381',
    farmName: 'Benue Food Basket Growers',
    farmerLocation: {
      state: 'Benue',
      city: 'Zaki Biam'
    },
    farmerRating: 4.9,
    farmerReviewsCount: 65,
    farmerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    isVerifiedFarmer: true,
    title: 'Zaki Biam Pounded Yam Tubers (Batch of 50 Big Tubers)',
    category: 'Tubers & Roots',
    description: 'Authentic Benue Zaki Biam large white yam tubers. High starch content, sweet earthy flavor, excellent for smooth pounded yam without lumps. Meticulously inspected against rot.',
    image: YAM_PEPPERS_IMAGE,
    unitPrice: 55000,
    unitMeasurement: 'Batch of 50 Large Tubers',
    availableQuantity: 95,
    minimumOrderQuantity: 1,
    harvestDate: 'October 22, 2026',
    freshnessGuaranteeDays: 90,
    isOrganic: true,
    qualityGrade: 'Grade A (Export / Premium)',
    middlemanRetailPrice: 78000,
    estimatedBuyerSavingsPercent: 29,
    dateListed: '2026-10-23',
    status: 'available'
  },
  {
    id: 'prod-5',
    farmerId: 'farmer-2',
    farmerName: 'Hajiya Fatima Aliyu',
    farmerPhone: '+234 812 789 4431',
    farmName: 'Plateau Highland Fresh Farms',
    farmerLocation: {
      state: 'Plateau',
      city: 'Jos South'
    },
    farmerRating: 4.8,
    farmerReviewsCount: 42,
    farmerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    isVerifiedFarmer: true,
    title: 'Fresh Red Scotch Bonnet Pepper (Ata Rodo - 40kg Bag)',
    category: 'Vegetables & Peppers',
    description: 'Crisp, fiery red scotch bonnet hot peppers. Rich aromatic capsaicin flavor, sorted and cooled before bagging to ensure minimal moisture build-up.',
    image: YAM_PEPPERS_IMAGE,
    unitPrice: 34000,
    unitMeasurement: '40kg Ventilated Sack',
    availableQuantity: 70,
    minimumOrderQuantity: 2,
    harvestDate: 'October 27, 2026',
    freshnessGuaranteeDays: 10,
    isOrganic: true,
    qualityGrade: 'Grade A (Export / Premium)',
    middlemanRetailPrice: 48000,
    estimatedBuyerSavingsPercent: 29,
    dateListed: '2026-10-27',
    status: 'available'
  },
  {
    id: 'prod-6',
    farmerId: 'farmer-1',
    farmerName: 'Mallam Ibrahim Musa',
    farmerPhone: '+234 803 451 9022',
    farmName: 'Arewa Golden Fields Cooperative',
    farmerLocation: {
      state: 'Kano',
      city: 'Dawanau'
    },
    farmerRating: 4.9,
    farmerReviewsCount: 84,
    farmerAvatar: FARMER_IBRAHIM_IMAGE,
    isVerifiedFarmer: true,
    title: 'Oloyin Sweet Honey Beans (50kg Bag)',
    category: 'Legumes & Beans',
    description: 'Pure, authentic Oloyin honey beans from Kano fertile plains. Cooks rapidly with delightful natural sweetness. Naturally pest-protected with organic neem leaves.',
    image: GRAIN_SACKS_IMAGE,
    unitPrice: 52000,
    unitMeasurement: '50kg Bag',
    availableQuantity: 140,
    minimumOrderQuantity: 3,
    harvestDate: 'October 15, 2026',
    freshnessGuaranteeDays: 180,
    isOrganic: true,
    qualityGrade: 'Grade A (Export / Premium)',
    middlemanRetailPrice: 72000,
    estimatedBuyerSavingsPercent: 28,
    dateListed: '2026-10-18',
    status: 'available'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-8831',
    trackingNumber: 'HAG-2026-8831',
    produceId: 'prod-2',
    produceTitle: 'Fresh Jos Highland Plum Tomatoes (Large Raffia Basket)',
    produceImage: TOMATOES_IMAGE,
    unitMeasurement: 'Large Raffia Basket (~50kg)',
    unitPrice: 28500,
    quantity: 10,
    totalProduceAmount: 285000,
    logisticsFee: 25000,
    escrowFee: 4275,
    totalAmount: 314275,
    buyerId: 'buyer-1',
    buyerName: 'Chioma Okeke',
    buyerPhone: '+234 802 334 8871',
    deliveryAddress: {
      state: 'Lagos',
      city: 'Ikeja',
      street: '14 Allen Avenue, Central Kitchen'
    },
    farmerId: 'farmer-2',
    farmerName: 'Hajiya Fatima Aliyu',
    farmerPhone: '+234 812 789 4431',
    farmerLocation: 'Jos South, Plateau',
    fulfillmentType: 'agrifest_logistics',
    status: 'in_transit',
    statusTimestamps: {
      placed: '2026-10-28 09:14 AM',
      confirmed: '2026-10-28 10:30 AM',
      harvested: '2026-10-28 04:00 PM',
      dispatched: '2026-10-29 06:30 AM'
    },
    escrowSecured: true,
    escrowReleased: false,
    transporterDetails: {
      driverName: 'Chinedu Eze (Cold-Chain Truck)',
      driverPhone: '+234 805 119 7720',
      vehiclePlate: 'KJA-482-XA'
    }
  },
  {
    id: 'ord-8740',
    trackingNumber: 'HAG-2026-8740',
    produceId: 'prod-1',
    produceTitle: 'Clean Sun-Dried Yellow Maize (100kg Bag)',
    produceImage: GRAIN_SACKS_IMAGE,
    unitMeasurement: '100kg Jute Bag',
    unitPrice: 42000,
    quantity: 20,
    totalProduceAmount: 840000,
    logisticsFee: 60000,
    escrowFee: 12600,
    totalAmount: 912600,
    buyerId: 'buyer-1',
    buyerName: 'Chioma Okeke',
    buyerPhone: '+234 802 334 8871',
    deliveryAddress: {
      state: 'Lagos',
      city: 'Ikeja',
      street: '14 Allen Avenue, Central Kitchen'
    },
    farmerId: 'farmer-1',
    farmerName: 'Mallam Ibrahim Musa',
    farmerPhone: '+234 803 451 9022',
    farmerLocation: 'Dawanau, Kano',
    fulfillmentType: 'agrifest_logistics',
    status: 'delivered_pending_inspection',
    statusTimestamps: {
      placed: '2026-10-26 11:20 AM',
      confirmed: '2026-10-26 12:45 PM',
      harvested: '2026-10-26 03:00 PM',
      dispatched: '2026-10-27 05:00 AM',
      delivered: '2026-10-29 04:15 PM'
    },
    escrowSecured: true,
    escrowReleased: false,
    transporterDetails: {
      driverName: 'Sani Garba (Heavy Hauler)',
      driverPhone: '+234 803 992 4110',
      vehiclePlate: 'KAN-910-ZB'
    }
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    produceId: 'prod-1',
    farmerId: 'farmer-1',
    buyerId: 'buyer-1',
    buyerName: 'Chioma Okeke',
    buyerRole: 'Restaurant Procurement Director, Lagos',
    rating: 5,
    date: 'October 21, 2026',
    comment: 'Mallam Ibrahim delivered spotless yellow maize. Saved us over ₦320,000 compared to what middleman traders at Mile 12 quoted us last week. The escrow feature gave us total peace of mind!',
    verifiedPurchase: true
  },
  {
    id: 'rev-2',
    produceId: 'prod-2',
    farmerId: 'farmer-2',
    buyerId: 'buyer-2',
    buyerName: 'Dayo Adeyemi',
    buyerRole: 'Supermarket Aggregator, Ibadan',
    rating: 5,
    date: 'October 19, 2026',
    comment: 'The Jos tomatoes arrived completely fresh with zero crushed baskets. Hajiya Fatima even shared harvest photos before loading. Direct farmer communication changes everything.',
    verifiedPurchase: true
  },
  {
    id: 'rev-3',
    produceId: 'prod-4',
    farmerId: 'farmer-3',
    buyerId: 'buyer-1',
    buyerName: 'Chioma Okeke',
    buyerRole: 'Restaurant Procurement Director, Lagos',
    rating: 5,
    date: 'October 14, 2026',
    comment: 'Zaki Biam yams are legendary. Huge tubers, perfectly seasoned for pounding. Terseer is our permanent supplier now.',
    verifiedPurchase: true
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Produce Arrived at Destination',
    message: 'Order #HAG-2026-8740 (20 bags of Maize) has arrived in Ikeja. Please inspect and approve escrow release.',
    timestamp: '20 mins ago',
    read: false,
    type: 'escrow',
    linkTarget: 'orders'
  },
  {
    id: 'notif-2',
    title: 'Produce Dispatched with Agrifest Transit',
    message: 'Hajiya Fatima dispatched 10 baskets of Jos Tomatoes. Driver Chinedu is en route to Lagos.',
    timestamp: 'Yesterday',
    read: true,
    type: 'order',
    linkTarget: 'orders'
  },
  {
    id: 'notif-3',
    title: 'Market Intelligence Update',
    message: 'Tomato farmgate prices in Plateau are stabilizing. Buyers saving up to 32% vs Mile 12 prices.',
    timestamp: '2 days ago',
    read: true,
    type: 'price_alert'
  }
];

export const MARKET_PRICE_INSIGHTS: MarketPriceInsight[] = [
  {
    crop: 'Yellow Maize (100kg)',
    farmgateAvg: 42000,
    middlemanRetailAvg: 58000,
    priceTrend: 'rising',
    topSupplyRegion: 'Dawanau (Kano), Kaduna',
    highDemandMarket: 'Mile 12 (Lagos), Bodija (Ibadan)',
    recommendation: 'Direct purchasing saves buyers ₦16,000/bag while providing farmers +35% above exploitative local collector rates.'
  },
  {
    crop: 'Fresh Jos Tomatoes (Basket)',
    farmgateAvg: 28500,
    middlemanRetailAvg: 42000,
    priceTrend: 'falling',
    topSupplyRegion: 'Bokkos & Mangu (Plateau)',
    highDemandMarket: 'Lagos & Port Harcourt',
    recommendation: 'Plateau harvest is peaking. Buyers should lock in orders now with direct refrigerated haulage to avoid 40% post-harvest spoilage.'
  },
  {
    crop: 'Zaki Biam White Yam (50 Tubers)',
    farmgateAvg: 55000,
    middlemanRetailAvg: 78000,
    priceTrend: 'stable',
    topSupplyRegion: 'Zaki Biam (Benue), Taraba',
    highDemandMarket: 'Alaba Rago (Lagos), Onitsha',
    recommendation: 'Direct batch purchases save restaurants ~₦23,000 per bundle of 50 grade-A tubers.'
  },
  {
    crop: 'Stone-Free White Rice (50kg)',
    farmgateAvg: 68000,
    middlemanRetailAvg: 89000,
    priceTrend: 'rising',
    topSupplyRegion: 'Kebbi, Ebonyi, Kano',
    highDemandMarket: 'Lagos, Abuja, Warri',
    recommendation: 'Demand is surging ahead of holiday season. Cooperative pre-orders offer maximum farmer margin protection.'
  }
];

export const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    appName: 'HackAgrifest',
    tagline: 'Connecting Farmers Directly to Buyers',
    marketplace: 'Marketplace',
    orders: 'My Orders',
    messages: 'Messages',
    dashboard: 'Dashboard',
    profile: 'Profile',
    searchPlaceholder: 'Search rice, maize, tomatoes, onions, yam...',
    allCategories: 'All Categories',
    farmgatePrice: 'Farmgate Price',
    savingsBadge: 'Middleman Markup Eliminated',
    directSavings: 'You save',
    vsMiddleman: 'vs retail middlemen',
    buyNow: 'Order Directly',
    messageFarmer: 'Message Farmer',
    escrowGuaranteed: '100% Escrow Protected: Funds released only after produce inspection',
    roleFarmer: 'Farmer Account',
    roleBuyer: 'Buyer Account',
    switchRole: 'Switch Role',
    addProduce: 'List New Produce',
    activeListings: 'Active Listings',
    totalRevenue: 'Total Farm Revenue',
    verifiedFarm: 'Verified Farm Gate'
  },
  ha: {
    appName: 'HackAgrifest',
    tagline: 'Haɗa Manoma Kai Tsaye da Masu Sayarwa',
    marketplace: 'Kasuwa',
    orders: 'Odojina',
    messages: 'Saƙonni',
    dashboard: 'Gidan Gona',
    profile: 'Tsarina',
    searchPlaceholder: 'Nemi shinkafa, masara, tumatur, albasa, doya...',
    allCategories: 'Dukkan Kayayyaki',
    farmgatePrice: 'Farashin Gonaki',
    savingsBadge: 'Babu Dillalai',
    directSavings: 'Kuna tanada',
    vsMiddleman: 'idan aka kwatanta da dillalai',
    buyNow: 'Yi Oda Kai Tsaye',
    messageFarmer: 'Aika Wa Manomi Saƙo',
    escrowGuaranteed: 'Tsaron Kuɗi: Ba za a biya ba sai an duba kaya',
    roleFarmer: 'Asusun Manomi',
    roleBuyer: 'Asusun Mai Saye',
    switchRole: 'Sauya Aiki',
    addProduce: 'Sanya Sabon Amfani',
    activeListings: 'Kayayyakin da ke Kasuwa',
    totalRevenue: 'Jimillar Kuɗin Shiga',
    verifiedFarm: 'Tabbatar da Gona'
  },
  yo: {
    appName: 'HackAgrifest',
    tagline: 'Sisopọ Awọn Agbẹ Taara si Awọn Olura',
    marketplace: 'Ọja',
    orders: 'Awọn Ibere Mi',
    messages: 'Awọn Ifiranṣẹ',
    dashboard: 'Ibi Iṣẹ Agbẹ',
    profile: 'Profaili',
    searchPlaceholder: 'Wa iresi, agbado, tomati, alubosa, isu...',
    allCategories: 'Gbogbo Ẹka',
    farmgatePrice: 'Iye Owo Oko',
    savingsBadge: 'Kò Sí Alárinà Kankan',
    directSavings: 'O fipamọ',
    vsMiddleman: 'ṣe akawe pẹlu awọn alagbata',
    buyNow: 'Paṣẹ Taara',
    messageFarmer: 'Fi Ifiranṣẹ Ranṣẹ si Agbẹ',
    escrowGuaranteed: 'Idaabobo Owo: Ko si isanwo titi ti o fi ri eso naa',
    roleFarmer: 'Akọọlẹ Agbẹ',
    roleBuyer: 'Akọọlẹ Olura',
    switchRole: 'Yi Ipa Pada',
    addProduce: 'Ṣafikun Eso Titun',
    activeListings: 'Awọn Ọja Ti O Wa',
    totalRevenue: 'Gbogbo Owo Ti O Wọle',
    verifiedFarm: 'Oko Ti A Fọwọsi'
  },
  ig: {
    appName: 'HackAgrifest',
    tagline: 'Ijikọ Ndị Ọrụ Ugbo na Ndị Na-azụ Ahịa',
    marketplace: 'Ahịa',
    orders: 'Iwu M',
    messages: 'Ozi',
    dashboard: 'Ebe Ọrụ Ugbo',
    profile: 'Nkọwa Onye',
    searchPlaceholder: 'Chọọ osikapa, ọka, tomato, yabasị, ji...',
    allCategories: 'Ngalaba Nile',
    farmgatePrice: 'Ọnụ Ahịa Ugbo',
    savingsBadge: 'Enweghị Ndị Ogbugbo',
    directSavings: 'Ị na-echekwa',
    vsMiddleman: 'tụnyere ndị na-azụ n’ahịa',
    buyNow: 'Mee Iwu Ugbu a',
    messageFarmer: 'Ziga Onye Ọrụ Ugbo Ozi',
    escrowGuaranteed: 'Nchekwa Ego: Agaghị akwụ ụgwọ ruo mgbe ị hụrụ ngwaahịa gị',
    roleFarmer: 'Akaụntụ Onye Ọrụ Ugbo',
    roleBuyer: 'Akaụntụ Onye Ọzụzụ',
    switchRole: 'Gbanwee Ọrụ',
    addProduce: 'Tinye Ngwaahịa Ọhụrụ',
    activeListings: 'Ngwaahịa Dị',
    totalRevenue: 'Ego Nile Batara',
    verifiedFarm: 'Ugbo E Kwadoro'
  }
};

export const NIGERIAN_FOODSTUFF_HARVEST_PRICES: NigerianFoodstuffPrice[] = [
  // Grains & Cereals
  {
    id: 'nfp-1',
    foodstuff: 'Clean Sun-Dried Yellow Maize',
    category: 'Grains & Cereals',
    varietyOrGrade: 'Grade A (Low Moisture <12%)',
    standardMeasurement: '100kg Jute Bag',
    farmgatePriceNaira: 42000,
    middlemanRetailPriceNaira: 58000,
    savingsAmountNaira: 16000,
    savingsPercentage: 28,
    harvestStates: ['Kano (Dawanau)', 'Kaduna', 'Katsina', 'Niger'],
    peakHarvestSeason: 'September – December',
    currentAvailability: 'High',
    keyQualityIndicators: ['Moisture below 12%', 'No weevil powder', 'Golden translucent kernels']
  },
  {
    id: 'nfp-2',
    foodstuff: 'De-stoned Abakaliki White Rice',
    category: 'Grains & Cereals',
    varietyOrGrade: 'Export Grade Long Grain (Stone-Free)',
    standardMeasurement: '50kg Bag',
    farmgatePriceNaira: 68000,
    middlemanRetailPriceNaira: 89000,
    savingsAmountNaira: 21000,
    savingsPercentage: 24,
    harvestStates: ['Ebonyi (Abakaliki)', 'Benue', 'Taraba', 'Kano'],
    peakHarvestSeason: 'October – January',
    currentAvailability: 'High',
    keyQualityIndicators: ['Double-optically sorted', 'Zero stones/pebbles', 'Natural non-sticky grain']
  },
  {
    id: 'nfp-3',
    foodstuff: 'Kebbi Parboiled Long-Grain Rice',
    category: 'Grains & Cereals',
    varietyOrGrade: 'Faro 44 Parboiled',
    standardMeasurement: '50kg Bag',
    farmgatePriceNaira: 69500,
    middlemanRetailPriceNaira: 91000,
    savingsAmountNaira: 21500,
    savingsPercentage: 24,
    harvestStates: ['Kebbi (Argungu/Suru)', 'Sokoto', 'Niger'],
    peakHarvestSeason: 'November – February',
    currentAvailability: 'High',
    keyQualityIndicators: ['High swelling ratio', 'Uniform cream color', 'Parboiled paddy aroma']
  },
  {
    id: 'nfp-4',
    foodstuff: 'Guinea Corn / Sorghum',
    category: 'Grains & Cereals',
    varietyOrGrade: 'Red & White Guinea Corn',
    standardMeasurement: '100kg Bag',
    farmgatePriceNaira: 38000,
    middlemanRetailPriceNaira: 52000,
    savingsAmountNaira: 14000,
    savingsPercentage: 27,
    harvestStates: ['Kano', 'Kaduna', 'Bauchi', 'Gombe'],
    peakHarvestSeason: 'November – January',
    currentAvailability: 'High',
    keyQualityIndicators: ['Clean dry grains', 'High starch yield for beverage & cereal porridge']
  },

  // Tubers & Roots
  {
    id: 'nfp-5',
    foodstuff: 'Zaki Biam White Pounded Yam',
    category: 'Tubers & Roots',
    varietyOrGrade: 'Giant Grade A (Hembamkwase / Giwa)',
    standardMeasurement: 'Batch of 50 Big Tubers',
    farmgatePriceNaira: 55000,
    middlemanRetailPriceNaira: 78000,
    savingsAmountNaira: 23000,
    savingsPercentage: 29,
    harvestStates: ['Benue (Zaki Biam)', 'Taraba (Wukari)', 'Nasarawa'],
    peakHarvestSeason: 'August – December',
    currentAvailability: 'High',
    keyQualityIndicators: ['Firm neck, no sponge texture', 'Sweet starch consistency', 'Zero skin rot']
  },
  {
    id: 'nfp-6',
    foodstuff: 'Abuja Pona Export Yam',
    category: 'Tubers & Roots',
    varietyOrGrade: 'Medium/Large Slender Pona',
    standardMeasurement: 'Batch of 50 Tubers',
    farmgatePriceNaira: 62000,
    middlemanRetailPriceNaira: 86000,
    savingsAmountNaira: 24000,
    savingsPercentage: 28,
    harvestStates: ['Niger (Suleja)', 'Abuja FCT', 'Oyo (Saki)'],
    peakHarvestSeason: 'July – November',
    currentAvailability: 'Moderate',
    keyQualityIndicators: ['Quick-boiling variety', 'Creamy snow-white interior', 'Fluffy pounded texture']
  },
  {
    id: 'nfp-7',
    foodstuff: 'Ijebu Crisp White Garri',
    category: 'Tubers & Roots',
    varietyOrGrade: 'Dry Fine Granules (Aged Fermentation)',
    standardMeasurement: '100kg Bag',
    farmgatePriceNaira: 44000,
    middlemanRetailPriceNaira: 60000,
    savingsAmountNaira: 16000,
    savingsPercentage: 27,
    harvestStates: ['Ogun (Ijebu)', 'Oyo', 'Ondo'],
    peakHarvestSeason: 'All Year Round',
    currentAvailability: 'High',
    keyQualityIndicators: ['Sour fermentation note', 'High crispiness, zero sand', 'Expands 3x in cold water']
  },
  {
    id: 'nfp-8',
    foodstuff: 'Bendel Oil-Fried Yellow Garri',
    category: 'Tubers & Roots',
    varietyOrGrade: 'Pure Red Palm Oil Enriched',
    standardMeasurement: '100kg Bag',
    farmgatePriceNaira: 46500,
    middlemanRetailPriceNaira: 63000,
    savingsAmountNaira: 16500,
    savingsPercentage: 26,
    harvestStates: ['Delta', 'Edo', 'Imo'],
    peakHarvestSeason: 'All Year Round',
    currentAvailability: 'High',
    keyQualityIndicators: ['Natural golden hue', 'No artificial food dyes', 'Fine uniform particle size']
  },

  // Vegetables & Peppers
  {
    id: 'nfp-9',
    foodstuff: 'Jos Highland Plum Tomatoes',
    category: 'Vegetables & Peppers',
    varietyOrGrade: 'Plum Hybrid (Thick Skin / Low Perishability)',
    standardMeasurement: 'Large Raffia Basket (~50kg)',
    farmgatePriceNaira: 28500,
    middlemanRetailPriceNaira: 42000,
    savingsAmountNaira: 13500,
    savingsPercentage: 32,
    harvestStates: ['Plateau (Bokkos/Mangu)', 'Kano', 'Kaduna'],
    peakHarvestSeason: 'September – March (Dry Irrigation)',
    currentAvailability: 'High',
    keyQualityIndicators: ['Firm flesh, low free water', 'Resistant to transit squeezing', 'Rich deep red color']
  },
  {
    id: 'nfp-10',
    foodstuff: 'Red Scotch Bonnet Pepper (Ata Rodo)',
    category: 'Vegetables & Peppers',
    varietyOrGrade: 'High Capsaicin Fiery Grade',
    standardMeasurement: '40kg Ventilated Sack',
    farmgatePriceNaira: 34000,
    middlemanRetailPriceNaira: 48000,
    savingsAmountNaira: 14000,
    savingsPercentage: 29,
    harvestStates: ['Oyo', 'Ogun', 'Kaduna', 'Plateau'],
    peakHarvestSeason: 'August – January',
    currentAvailability: 'High',
    keyQualityIndicators: ['Crinkled bell shape', 'Fresh green calyx stem', 'Pungent aroma']
  },
  {
    id: 'nfp-11',
    foodstuff: 'Aliero Dry Red & White Onions',
    category: 'Vegetables & Peppers',
    varietyOrGrade: 'Cured Export Onions',
    standardMeasurement: '100kg Jute Bag',
    farmgatePriceNaira: 48000,
    middlemanRetailPriceNaira: 68000,
    savingsAmountNaira: 20000,
    savingsPercentage: 29,
    harvestStates: ['Kebbi (Aliero)', 'Sokoto', 'Kano'],
    peakHarvestSeason: 'March – July',
    currentAvailability: 'High',
    keyQualityIndicators: ['Tight dry papery skins', 'Rock-hard bulbs', 'Zero soft rot or sprouting']
  },

  // Legumes & Beans
  {
    id: 'nfp-12',
    foodstuff: 'Oloyin Sweet Honey Beans',
    category: 'Legumes & Beans',
    varietyOrGrade: 'Natural Sweet Brown Cowpea',
    standardMeasurement: '50kg Bag',
    farmgatePriceNaira: 52000,
    middlemanRetailPriceNaira: 72000,
    savingsAmountNaira: 20000,
    savingsPercentage: 28,
    harvestStates: ['Kano', 'Jigawa', 'Borno'],
    peakHarvestSeason: 'October – January',
    currentAvailability: 'High',
    keyQualityIndicators: ['Sweet cooking water', 'Soft tender skin', 'Chemical-free neem-cured storage']
  },
  {
    id: 'nfp-13',
    foodstuff: 'Kano Brown Drum Beans',
    category: 'Legumes & Beans',
    varietyOrGrade: 'Potent High-Protein Drum Variety',
    standardMeasurement: '50kg Bag',
    farmgatePriceNaira: 54000,
    middlemanRetailPriceNaira: 75000,
    savingsAmountNaira: 21000,
    savingsPercentage: 28,
    harvestStates: ['Kano', 'Kaduna', 'Zamfara'],
    peakHarvestSeason: 'November – February',
    currentAvailability: 'High',
    keyQualityIndicators: ['Cooks in record time', 'Thick broth consistency', 'Sorted clean without dirt']
  },

  // Cash Crops & Spices
  {
    id: 'nfp-14',
    foodstuff: 'Sun-Dried Split Ginger',
    category: 'Cash Crops & Spices',
    varietyOrGrade: 'Kafanchan Clean Export Grade',
    standardMeasurement: '50kg Bag',
    farmgatePriceNaira: 82000,
    middlemanRetailPriceNaira: 115000,
    savingsAmountNaira: 33000,
    savingsPercentage: 29,
    harvestStates: ['Kaduna (Kafanchan/Jema’a)', 'Nasarawa'],
    peakHarvestSeason: 'December – March',
    currentAvailability: 'Moderate',
    keyQualityIndicators: ['High oleoresin & gingerol content', 'Sharp spicy pungency', 'Sun-bleached split rhizomes']
  },
  {
    id: 'nfp-15',
    foodstuff: 'Pure Unrefined Red Palm Oil',
    category: 'Cash Crops & Spices',
    varietyOrGrade: 'Cold-Pressed Free Fatty Acid <5%',
    standardMeasurement: '25L Jerrycan',
    farmgatePriceNaira: 26500,
    middlemanRetailPriceNaira: 37000,
    savingsAmountNaira: 10500,
    savingsPercentage: 28,
    harvestStates: ['Edo', 'Enugu', 'Ondo', 'Cross River'],
    peakHarvestSeason: 'February – May (Peak), Available Year-Round',
    currentAvailability: 'High',
    keyQualityIndicators: ['Zero water dilution', 'Deep red clotting consistency', 'Smoky aromatic palm smell']
  }
];

export const AWARENESS_GUIDES: AwarenessGuide[] = [
  {
    id: 'aw-1',
    targetAudience: 'both',
    title: 'How Middlemen Siphon 40% of Nigeria’s Agricultural Value',
    subtitle: 'From farmgate in Jos to Mile 12 in Lagos: Breaking down the layers of unnecessary broker markups.',
    category: 'Middleman Elimination',
    readingTimeMinutes: 4,
    keyTakeaway: 'Eliminating intermediaries allows farmers to earn +35% while food buyers save up to 28% on identical produce.',
    contentParagraphs: [
      'In traditional Nigerian agricultural trade, produce changes hands four to six times between the farm ridges and the consumer’s kitchen. A basket of Jos plum tomatoes bought from a farmer at ₦25,000 passes through a village commission agent, a transit aggregator, a regional depot lord, a transport broker, and a market union retailer—eventually selling for ₦45,000.',
      'The tragic paradox is that the farmer who did 90% of the physical labor faces loan debts and post-harvest panic, while urban food buyers suffer crippling inflation.',
      'HackAgrifest provides a direct digital contract: verified buyers connect directly with farm owners. By pooling refrigerated transport and securing payments in digital escrow, neither party relies on exploitative market gatekeepers.'
    ],
    actionChecklist: [
      'Compare live farmgate indices before agreeing to local middleman offers.',
      'Always use HackAgrifest Escrow so cash is guaranteed before produce departs the farm.',
      'Take advantage of direct haulage routes from Northern belts to Southern consumer centers.'
    ]
  },
  {
    id: 'aw-2',
    targetAudience: 'farmer',
    title: 'Farmer’s Guide: Stopping Post-Harvest Rot & Spoilage',
    subtitle: 'Practical storage and packaging hacks for Nigerian maize, tomatoes, onions, and yams.',
    category: 'Post-Harvest Loss Prevention',
    readingTimeMinutes: 5,
    keyTakeaway: 'Over 40% of Nigerian perishables spoil during transit. Ventilated crates and proper moisture testing protect your profits.',
    contentParagraphs: [
      'Packaging tomatoes in tightly packed raffia baskets stacked five-high inside non-ventilated open trucks crushes the bottom layers, generating heat and causing rapid fungal decay before reaching Lagos or Port Harcourt.',
      'Transitioning to reusable plastic crates with slotted ventilation reduces transit losses from 35% down to less than 4%.',
      'For grains such as yellow maize and sorghum, never bag when moisture is above 13%. Use the simple salt-jar moisture test or solar drying tarpaulins before sealing into airtight PICS bags to kill weevil larvae without dangerous chemical fumigants.'
    ],
    actionChecklist: [
      'Adopt plastic field crates for soft vegetables instead of crushed baskets.',
      'Store dried beans and maize with dried neem leaves or inside multi-layered hermetic bags.',
      'Cure harvested yams in a shaded, well-ventilated barn for 10 days before long-distance transport.'
    ]
  },
  {
    id: 'aw-3',
    targetAudience: 'buyer',
    title: 'Buyer’s Guide: Quality Inspection & Escrow Release Rights',
    subtitle: 'How to verify bulk produce upon truck arrival before releasing payment to the farmer.',
    category: 'Escrow & Safety',
    readingTimeMinutes: 4,
    keyTakeaway: 'You have full inspection rights. Escrow guarantees funds are released only when goods match ordered specifications.',
    contentParagraphs: [
      'Buying bulk produce online in Nigeria traditionally came with the fear of receiving sand-filled grain bags, rotten yams, or unripe squashed tomatoes. HackAgrifest eliminates this risk with Escrow Protection.',
      'When the Agrifest transport driver arrives at your warehouse or restaurant address, you have the contractual right to open sample bags/crates and conduct quality verification.',
      'Inspect grain cleanliness, measure yam firmness, and test pepper freshness. Once satisfied, click "Confirm Produce Quality & Release Escrow" in your order dashboard. The farmer receives instant credit, and your transaction is officially certified.'
    ],
    actionChecklist: [
      'Sample at least 3 random bags/crates from the middle and bottom of the delivery vehicle.',
      'Check that grain is stone-free and completely dry to touch.',
      'Notify Agrifest support within the inspection window if any transit damage occurred.'
    ]
  },
  {
    id: 'aw-4',
    targetAudience: 'farmer',
    title: 'Cooperative Power: How Group Haulage Cuts Fuel Costs by 40%',
    subtitle: 'Why smallholder farmers earn more when banding together for bulk truck dispatches.',
    category: 'Pricing Rights',
    readingTimeMinutes: 3,
    keyTakeaway: 'A full 30-tonne truck costs 40% less per bag to charter than multiple small pickups.',
    contentParagraphs: [
      'High diesel and interstate transit levies represent the largest single cost factor in Nigerian food logistics. When 10 neighboring farmers in Dawanau, Bokkos, or Zaki Biam pool their harvests to fill a single articulated truck, individual freight costs drop dramatically.',
      'HackAgrifest enables local agricultural cooperatives to list collective produce batches, granting smallholders the bargaining power and logistical efficiency of industrial mega-farms.'
    ],
    actionChecklist: [
      'Coordinate harvest calendar dates with neighboring cooperative members.',
      'Standardize bag weights to exact 50kg or 100kg measurements before pickup.',
      'Use HackAgrifest group shipment tracking to monitor truck transit across interstate checkpoints.'
    ]
  }
];
