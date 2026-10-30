import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Upload, 
  Sparkles, 
  Check, 
  Leaf, 
  TrendingDown, 
  Package, 
  DollarSign 
} from 'lucide-react';
import { ProduceCategory } from '../../types';
import { 
  TOMATOES_IMAGE, 
  GRAIN_SACKS_IMAGE, 
  YAM_PEPPERS_IMAGE, 
  HERO_IMAGE 
} from '../../data/mockData';

const PRESET_IMAGES = [
  { label: 'Grains / Maize / Rice Sacks', url: GRAIN_SACKS_IMAGE },
  { label: 'Fresh Jos Tomatoes Basket', url: TOMATOES_IMAGE },
  { label: 'Benue Yam & Peppers', url: YAM_PEPPERS_IMAGE },
  { label: 'Lush Farm Harvest Fields', url: HERO_IMAGE },
];

export const AddProduceModal: React.FC = () => {
  const { isAddProduceOpen, setIsAddProduceOpen, addProduce, currentUser } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ProduceCategory>('Grains & Cereals');
  const [description, setDescription] = useState('');
  const [unitPrice, setUnitPrice] = useState<number>(35000);
  const [unitMeasurement, setUnitMeasurement] = useState('50kg Bag');
  const [availableQuantity, setAvailableQuantity] = useState<number>(50);
  const [minimumOrderQuantity, setMinimumOrderQuantity] = useState<number>(2);
  const [isOrganic, setIsOrganic] = useState(true);
  const [qualityGrade, setQualityGrade] = useState<'Grade A (Export / Premium)' | 'Grade B (Standard)' | 'Bulk Processing'>('Grade A (Export / Premium)');
  const [selectedImage, setSelectedImage] = useState(GRAIN_SACKS_IMAGE);

  if (!isAddProduceOpen) return null;

  // Auto-benchmark estimated middleman price for transparency
  const middlemanRetailPrice = Math.round(unitPrice * 1.35);
  const estimatedSavingsPercent = Math.round(((middlemanRetailPrice - unitPrice) / middlemanRetailPrice) * 100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !unitPrice) return;

    addProduce({
      farmerId: currentUser.id,
      farmerName: currentUser.name,
      farmerPhone: currentUser.phone,
      farmName: currentUser.farmName || 'Verified Farm Partner',
      farmerLocation: {
        state: currentUser.location.state,
        city: currentUser.location.city
      },
      farmerRating: currentUser.rating || 4.9,
      farmerReviewsCount: currentUser.totalDeals || 12,
      farmerAvatar: currentUser.avatar,
      isVerifiedFarmer: true,
      title,
      category,
      description,
      image: selectedImage,
      unitPrice,
      unitMeasurement,
      availableQuantity,
      minimumOrderQuantity,
      harvestDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      freshnessGuaranteeDays: category === 'Vegetables & Peppers' ? 14 : category === 'Tubers & Roots' ? 90 : 180,
      isOrganic,
      qualityGrade,
      middlemanRetailPrice,
      estimatedBuyerSavingsPercent: estimatedSavingsPercent,
      status: 'available'
    });

    setIsAddProduceOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-white px-5 py-3.5 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-[#16834B]" />
            <h2 className="font-bold text-base text-stone-900">
              List Fresh Farmgate Produce
            </h2>
          </div>
          <button
            onClick={() => setIsAddProduceOpen(false)}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 space-y-4">
          
          {/* Produce Name */}
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              Produce Name / Crop Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Clean Stone-Free White Rice (50kg Bag)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#16834B]"
            />
          </div>

          {/* Category & Unit of Measure Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Produce Category
              </label>
              <select
                value={category}
                onChange={(e) => {
                  const cat = e.target.value as ProduceCategory;
                  setCategory(cat);
                  if (cat === 'Vegetables & Peppers') setSelectedImage(TOMATOES_IMAGE);
                  else if (cat === 'Tubers & Roots') setSelectedImage(YAM_PEPPERS_IMAGE);
                  else setSelectedImage(GRAIN_SACKS_IMAGE);
                }}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#16834B]"
              >
                <option value="Grains & Cereals">Grains & Cereals</option>
                <option value="Tubers & Roots">Tubers & Roots</option>
                <option value="Vegetables & Peppers">Vegetables & Peppers</option>
                <option value="Legumes & Beans">Legumes & Beans</option>
                <option value="Cash Crops & Spices">Cash Crops & Spices</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Unit of Measure
              </label>
              <select
                value={unitMeasurement}
                onChange={(e) => setUnitMeasurement(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#16834B]"
              >
                <option value="50kg Bag">50kg Bag</option>
                <option value="100kg Bag">100kg Jute Bag</option>
                <option value="Large Raffia Basket">Large Raffia Basket</option>
                <option value="Wooden Crate">Wooden Crate</option>
                <option value="Batch of 50 Tubers">Batch of 50 Tubers</option>
                <option value="Metric Tonne">Metric Tonne</option>
              </select>
            </div>
          </div>

          {/* Farmgate Pricing & Quantity Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Farmgate Price (₦) *
              </label>
              <input
                type="number"
                required
                min={500}
                value={unitPrice}
                onChange={(e) => setUnitPrice(Number(e.target.value))}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 font-bold text-[#16834B] tabular-nums focus:outline-none focus:ring-2 focus:ring-[#16834B]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Available Stock
              </label>
              <input
                type="number"
                required
                min={1}
                value={availableQuantity}
                onChange={(e) => setAvailableQuantity(Number(e.target.value))}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 tabular-nums focus:outline-none focus:ring-2 focus:ring-[#16834B]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Min Order Qty
              </label>
              <input
                type="number"
                required
                min={1}
                value={minimumOrderQuantity}
                onChange={(e) => setMinimumOrderQuantity(Number(e.target.value))}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 tabular-nums focus:outline-none focus:ring-2 focus:ring-[#16834B]"
              />
            </div>
          </div>

          {/* Pricing Preview Comparison */}
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 text-xs text-stone-600 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-stone-400 block uppercase">Middleman Benchmark (Mile 12)</span>
              <span className="font-semibold text-stone-700 tabular-nums">₦{middlemanRetailPrice.toLocaleString()}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-stone-400 block uppercase">Buyer Saving Appeal</span>
              <span className="font-bold text-emerald-700">Save {estimatedSavingsPercent}% directly</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              Description & Quality Notes
            </label>
            <textarea
              rows={2}
              placeholder="Detail moisture level, processing method, sorting standards, or origin..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#16834B]"
            />
          </div>

          {/* Image Selection Presets */}
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1.5">
              Select High-Quality Farm Photo
            </label>
            <div className="grid grid-cols-4 gap-2">
              {PRESET_IMAGES.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(img.url)}
                  className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === img.url
                      ? 'border-[#16834B] ring-2 ring-[#16834B]/30'
                      : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.label}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {selectedImage === img.url && (
                    <div className="absolute inset-0 bg-[#16834B]/30 flex items-center justify-center text-white">
                      <Check className="w-5 h-5 drop-shadow-md" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Organic & Quality Checkbox */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-800">
              <input
                type="checkbox"
                checked={isOrganic}
                onChange={(e) => setIsOrganic(e.target.checked)}
                className="w-4 h-4 text-[#16834B] rounded border-stone-300 focus:ring-[#16834B]"
              />
              <span>100% Naturally Grown / Pesticide-Free</span>
            </label>

            <select
              value={qualityGrade}
              onChange={(e) => setQualityGrade(e.target.value as any)}
              className="text-xs p-1.5 bg-stone-50 border border-stone-200 rounded-lg"
            >
              <option value="Grade A (Export / Premium)">Grade A (Export / Premium)</option>
              <option value="Grade B (Standard)">Grade B (Standard)</option>
              <option value="Bulk Processing">Bulk Processing</option>
            </select>
          </div>

          {/* Submit CTA */}
          <div className="pt-3 border-t border-stone-200">
            <button
              type="submit"
              className="w-full py-3 bg-[#16834B] hover:bg-[#126c3d] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-[0.98]"
            >
              Publish Farmgate Listing
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
