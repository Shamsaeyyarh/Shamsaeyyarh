import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  ShieldCheck, 
  Truck, 
  MapPin, 
  CreditCard, 
  Building2, 
  TrendingDown, 
  CheckCircle2, 
  ArrowRight,
  Plus,
  Minus
} from 'lucide-react';

export const OrderCheckoutModal: React.FC = () => {
  const { 
    checkoutProduce, 
    closeCheckout, 
    placeOrder, 
    setActiveTab, 
    currentUser 
  } = useApp();

  if (!checkoutProduce) return null;

  const [quantity, setQuantity] = useState<number>(checkoutProduce.minimumOrderQuantity || 1);
  const [fulfillmentType, setFulfillmentType] = useState<'agrifest_logistics' | 'farm_pickup'>('agrifest_logistics');
  const [paymentMethod, setPaymentMethod] = useState<'bank_transfer' | 'card' | 'ussd'>('bank_transfer');
  
  const [addressState, setAddressState] = useState<string>(currentUser.location.state || 'Lagos');
  const [addressCity, setAddressCity] = useState<string>(currentUser.location.city || 'Ikeja');
  const [addressStreet, setAddressStreet] = useState<string>(currentUser.location.farmAddress || '14 Allen Avenue, Central Commercial Mart');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  // Math
  const produceTotal = checkoutProduce.unitPrice * quantity;
  const logisticsFee = fulfillmentType === 'agrifest_logistics' ? Math.round(quantity * 2500) : 0;
  const escrowFee = Math.round(produceTotal * 0.015);
  const grandTotal = produceTotal + logisticsFee + escrowFee;
  
  const middlemanTotal = checkoutProduce.middlemanRetailPrice * quantity;
  const estimatedSavings = middlemanTotal - produceTotal;

  const handleIncrement = () => {
    if (quantity < checkoutProduce.availableQuantity) {
      setQuantity(prev => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > checkoutProduce.minimumOrderQuantity) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const created = placeOrder({
        produce: checkoutProduce,
        quantity,
        fulfillmentType,
        deliveryAddress: {
          state: addressState,
          city: addressCity,
          street: addressStreet
        }
      });
      setIsSubmitting(false);
      setOrderSuccess(created.trackingNumber);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-white px-5 py-3.5 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#16834B]" />
            <h2 className="font-bold text-base text-stone-900">
              Escrow Direct Checkout
            </h2>
          </div>
          <button
            onClick={closeCheckout}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {orderSuccess ? (
          <div className="p-8 text-center space-y-4 my-auto">
            <div className="w-16 h-16 bg-[#16834B]/10 text-[#16834B] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-stone-900">
                Order Placed & Escrow Secured!
              </h3>
              <p className="text-xs text-stone-500 font-mono">
                Tracking Number: {orderSuccess}
              </p>
            </div>

            <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
              Your payment of <strong className="text-stone-900">₦{grandTotal.toLocaleString()}</strong> is safely locked in Escrow. Farmer <strong className="text-stone-900">{checkoutProduce.farmerName}</strong> has been notified to prepare and package your fresh harvest.
            </p>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/80 text-xs text-emerald-800 text-left space-y-1">
              <div className="font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#16834B]" />
                <span>Zero Risk Guarantee</span>
              </div>
              <p className="text-[11px] text-emerald-900">
                You will inspect the produce upon arrival in {addressCity}, {addressState} before any funds are released to the farmer.
              </p>
            </div>

            <button
              onClick={() => {
                closeCheckout();
                setActiveTab('orders');
              }}
              className="w-full py-3 bg-[#16834B] hover:bg-[#126c3d] text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-sm"
            >
              Track Order Live
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmitOrder} className="overflow-y-auto p-5 space-y-5">
            
            {/* Produce item summary */}
            <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-2xl border border-stone-200/70">
              <img
                src={checkoutProduce.image}
                alt={checkoutProduce.title}
                className="w-16 h-16 rounded-xl object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-xs sm:text-sm text-stone-900 truncate">
                  {checkoutProduce.title}
                </h4>
                <p className="text-[11px] text-stone-500">
                  {checkoutProduce.farmerName} · {checkoutProduce.farmerLocation.state}
                </p>
                <div className="text-xs font-extrabold text-[#16834B] mt-0.5 tabular-nums">
                  ₦{checkoutProduce.unitPrice.toLocaleString()} / {checkoutProduce.unitMeasurement}
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 flex items-center justify-between">
                <span>Select Order Quantity ({checkoutProduce.unitMeasurement}s)</span>
                <span className="text-[11px] font-normal text-stone-500">
                  Min: {checkoutProduce.minimumOrderQuantity} | In Stock: {checkoutProduce.availableQuantity}
                </span>
              </label>

              <div className="flex items-center gap-3">
                <div className="flex items-center border border-stone-200 rounded-xl bg-white shadow-2xs">
                  <button
                    type="button"
                    onClick={handleDecrement}
                    disabled={quantity <= checkoutProduce.minimumOrderQuantity}
                    className="p-2.5 text-stone-600 hover:text-stone-900 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-extrabold text-sm text-stone-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={handleIncrement}
                    disabled={quantity >= checkoutProduce.availableQuantity}
                    className="p-2.5 text-stone-600 hover:text-stone-900 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-xs text-stone-500">
                  Total Produce: <strong className="text-stone-900 tabular-nums">₦{produceTotal.toLocaleString()}</strong>
                </div>
              </div>
            </div>

            {/* Savings Callout */}
            {estimatedSavings > 0 && (
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/80 flex items-center justify-between text-xs text-emerald-900">
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-[#16834B]" />
                  <span>Direct Farmgate Savings vs Mile 12 Middlemen</span>
                </div>
                <strong className="font-extrabold text-[#16834B] tabular-nums">
                  -₦{estimatedSavings.toLocaleString()}
                </strong>
              </div>
            )}

            {/* Fulfillment Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-700 block">
                Fulfillment & Logistics Method
              </label>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setFulfillmentType('agrifest_logistics')}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    fulfillmentType === 'agrifest_logistics'
                      ? 'border-[#16834B] bg-emerald-50/50 text-[#16834B] ring-1 ring-[#16834B]'
                      : 'border-stone-200 hover:border-stone-300 text-stone-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold mb-0.5">
                    <Truck className="w-4 h-4" />
                    <span>Agrifest Truck Delivery</span>
                  </div>
                  <p className="text-[10px] text-stone-500">
                    Refrigerated cold-chain straight to your doorstep (₦2,500/bag)
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setFulfillmentType('farm_pickup')}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    fulfillmentType === 'farm_pickup'
                      ? 'border-[#16834B] bg-emerald-50/50 text-[#16834B] ring-1 ring-[#16834B]'
                      : 'border-stone-200 hover:border-stone-300 text-stone-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold mb-0.5">
                    <MapPin className="w-4 h-4" />
                    <span>Farmgate Self-Pickup</span>
                  </div>
                  <p className="text-[10px] text-stone-500">
                    Pick up directly at the farm in {checkoutProduce.farmerLocation.state} (Free)
                  </p>
                </button>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-700 block">
                Delivery Destination (Nigeria)
              </label>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  placeholder="State (e.g. Lagos)"
                  value={addressState}
                  onChange={(e) => setAddressState(e.target.value)}
                  className="p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#16834B]"
                />
                <input
                  type="text"
                  required
                  placeholder="City / Area (e.g. Ikeja)"
                  value={addressCity}
                  onChange={(e) => setAddressCity(e.target.value)}
                  className="p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#16834B]"
                />
              </div>

              <input
                type="text"
                required
                placeholder="Street address / Landmark / Warehouse location"
                value={addressStreet}
                onChange={(e) => setAddressStreet(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#16834B]"
              />
            </div>

            {/* Escrow Fee & Price Breakdown */}
            <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Produce Total ({quantity} units)</span>
                <span className="font-semibold text-stone-800 tabular-nums">₦{produceTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Agrifest Transit Logistics</span>
                <span className="font-semibold text-stone-800 tabular-nums">₦{logisticsFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-1">
                  <span>Escrow Guarantee Fee (1.5%)</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#16834B]" />
                </span>
                <span className="font-semibold text-stone-800 tabular-nums">₦{escrowFee.toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-extrabold text-stone-900">
                <span>Total Escrow Amount</span>
                <span className="text-[#16834B] tabular-nums">₦{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Sticky submit button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl bg-[#16834B] hover:bg-[#126c3d] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <ShieldCheck className="w-4 h-4 text-[#F4A62A]" />
                <span>
                  {isSubmitting ? 'Securing Escrow...' : `Lock Escrow & Place Order (₦${grandTotal.toLocaleString()})`}
                </span>
              </button>
              <p className="text-[11px] text-stone-400 text-center mt-1.5">
                Funds remain in Escrow. Farmer is only paid when you inspect and approve produce.
              </p>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
