import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Order, OrderStatus } from '../../types';
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Star, 
  ExternalLink,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

export const OrdersView: React.FC = () => {
  const { 
    orders, 
    currentUser, 
    updateOrderStatus, 
    releaseEscrow, 
    addReview,
    startChatWithFarmer,
    t 
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'completed'>('active');
  const [selectedOrderForReview, setSelectedOrderForReview] = useState<Order | null>(null);
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState<string>('');

  // Filter orders relevant to current user
  const userOrders = orders.filter(o => 
    currentUser.role === 'farmer' ? o.farmerId === currentUser.id : o.buyerId === currentUser.id
  );

  const displayedOrders = userOrders.filter(o => {
    if (activeFilter === 'active') return o.status !== 'completed' && o.status !== 'cancelled';
    if (activeFilter === 'completed') return o.status === 'completed';
    return true;
  });

  const getStatusStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'pending_confirmation': return 0;
      case 'harvest_packaging': return 1;
      case 'in_transit': return 2;
      case 'delivered_pending_inspection': return 3;
      case 'completed': return 4;
      default: return 0;
    }
  };

  const statusSteps = [
    { label: 'Order Placed & Escrow Secured', short: 'Placed' },
    { label: 'Harvested & Packaged', short: 'Harvested' },
    { label: 'In Transit / Logistics', short: 'In Transit' },
    { label: 'Delivered (Inspection)', short: 'Delivered' },
    { label: 'Escrow Released & Complete', short: 'Completed' },
  ];

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderForReview) return;

    addReview({
      farmerId: selectedOrderForReview.farmerId,
      buyerId: currentUser.id,
      buyerName: currentUser.name,
      buyerRole: `${currentUser.name.split(' ')[0]} (Direct Buyer)`,
      orderId: selectedOrderForReview.id,
      produceId: selectedOrderForReview.produceId,
      rating: reviewRating,
      comment: reviewComment,
      verifiedPurchase: true
    });

    setSelectedOrderForReview(null);
    setReviewComment('');
  };

  return (
    <div className="space-y-6 pb-24 md:pb-12 max-w-5xl mx-auto px-4 sm:px-6 pt-4">
      
      {/* Title & Filter Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#252B27] tracking-tight">
            {currentUser.role === 'farmer' ? 'Incoming Farm Orders & Deliveries' : 'Your Farmgate Orders & Escrow'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            {currentUser.role === 'farmer'
              ? 'Prepare produce, dispatch cold-chain trucks and receive escrow payouts.'
              : 'Track fresh harvest from the ridges to your doorstep with guaranteed escrow protection.'}
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setActiveFilter('active')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeFilter === 'active'
                ? 'bg-white text-stone-900 shadow-2xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Active Orders ({userOrders.filter(o => o.status !== 'completed').length})
          </button>
          <button
            onClick={() => setActiveFilter('completed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeFilter === 'completed'
                ? 'bg-white text-stone-900 shadow-2xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Completed ({userOrders.filter(o => o.status === 'completed').length})
          </button>
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeFilter === 'all'
                ? 'bg-white text-stone-900 shadow-2xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            All
          </button>
        </div>
      </div>

      {/* Orders List */}
      {displayedOrders.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8 space-y-3">
          <Package className="w-12 h-12 text-stone-300 mx-auto" />
          <h3 className="text-base font-bold text-stone-800">No {activeFilter} orders found</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            {currentUser.role === 'farmer'
              ? 'When buyers place orders for your produce, they will appear here with instant escrow protection.'
              : 'Browse our marketplace to purchase fresh produce directly from verified Nigerian farmers.'}
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {displayedOrders.map((order) => {
            const currentStepIdx = getStatusStepIndex(order.status);

            return (
              <div 
                key={order.id}
                className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-sm transition-all overflow-hidden space-y-4 p-5"
              >
                {/* Order Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={order.produceImage}
                      alt={order.produceTitle}
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-stone-900">
                          {order.trackingNumber}
                        </span>
                        <span className="text-[10px] text-stone-400">· {order.statusTimestamps.placed}</span>
                      </div>
                      <h4 className="font-bold text-sm text-stone-900 mt-0.5">
                        {order.quantity}x {order.produceTitle}
                      </h4>
                      <p className="text-xs text-stone-500">
                        {currentUser.role === 'farmer' ? `Buyer: ${order.buyerName}` : `Farmer: ${order.farmerName} (${order.farmerLocation})`}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-extrabold text-[#16834B] tabular-nums">
                      ₦{order.totalAmount.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-emerald-800 justify-end mt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#16834B]" />
                      <span>{order.escrowReleased ? 'Escrow Disbursed' : 'Escrow Secured'}</span>
                    </div>
                  </div>
                </div>

                {/* Tracking Stepper Progress Bar */}
                <div className="pt-2">
                  <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">
                    Produce Fulfillment Timeline
                  </div>

                  {/* Visual Stepper */}
                  <div className="relative">
                    <div className="overflow-hidden h-1.5 mb-4 text-xs flex rounded bg-stone-100">
                      <div 
                        style={{ width: `${((currentStepIdx + 1) / statusSteps.length) * 100}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#16834B] transition-all duration-500"
                      />
                    </div>

                    <div className="grid grid-cols-5 text-center gap-1">
                      {statusSteps.map((step, idx) => {
                        const isDone = idx <= currentStepIdx;
                        const isCurrent = idx === currentStepIdx;
                        return (
                          <div key={idx} className="space-y-1">
                            <div 
                              className={`w-6 h-6 rounded-full mx-auto flex items-center justify-center text-[10px] font-bold ${
                                isDone 
                                  ? 'bg-[#16834B] text-white' 
                                  : 'bg-stone-100 text-stone-400'
                              } ${isCurrent ? 'ring-2 ring-[#F4A62A]' : ''}`}
                            >
                              {isDone ? '✓' : idx + 1}
                            </div>
                            <span className={`text-[10px] block leading-tight ${isCurrent ? 'font-bold text-[#16834B]' : 'text-stone-500'}`}>
                              {step.short}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Transporter / Driver Details Card if in transit or delivered */}
                {order.transporterDetails && (
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 flex items-center justify-between text-xs text-stone-700">
                    <div className="flex items-center gap-2.5">
                      <Truck className="w-4 h-4 text-[#16834B]" />
                      <div>
                        <span className="font-semibold block">{order.transporterDetails.driverName}</span>
                        <span className="text-[11px] text-stone-500">Plate: {order.transporterDetails.vehiclePlate}</span>
                      </div>
                    </div>
                    <a
                      href={`tel:${order.transporterDetails.driverPhone}`}
                      className="flex items-center gap-1 text-[#16834B] font-semibold hover:underline"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{order.transporterDetails.driverPhone}</span>
                    </a>
                  </div>
                )}

                {/* Delivery Destination */}
                <div className="text-xs text-stone-600 flex items-center gap-1.5 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>
                    Destination: {order.deliveryAddress.street}, {order.deliveryAddress.city}, {order.deliveryAddress.state} State
                  </span>
                </div>

                {/* Action Buttons depending on role and status */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100">
                  <button
                    onClick={() => startChatWithFarmer(
                      currentUser.role === 'farmer' ? order.buyerId : order.farmerId
                    )}
                    className="flex items-center gap-1.5 text-xs text-stone-700 hover:text-[#16834B] font-semibold py-1.5 px-3 rounded-lg border border-stone-200 hover:border-stone-300"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Message {currentUser.role === 'farmer' ? 'Buyer' : 'Farmer'}</span>
                  </button>

                  {/* BUYER ACTION: If delivered, confirm inspection to disburse escrow */}
                  {currentUser.role === 'buyer' && order.status === 'delivered_pending_inspection' && (
                    <button
                      onClick={() => releaseEscrow(order.id)}
                      className="bg-[#16834B] hover:bg-[#126c3d] text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-xs transition-colors flex items-center gap-2 animate-pulse"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm Produce Quality & Release Escrow</span>
                    </button>
                  )}

                  {/* BUYER ACTION: If completed and not reviewed */}
                  {currentUser.role === 'buyer' && order.status === 'completed' && !order.hasReviewed && (
                    <button
                      onClick={() => setSelectedOrderForReview(order)}
                      className="bg-amber-500 hover:bg-amber-600 text-[#252B27] text-xs font-bold py-2 px-3.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                    >
                      <Star className="w-4 h-4 fill-[#252B27]" />
                      <span>Rate Farmer & Produce</span>
                    </button>
                  )}

                  {/* FARMER ACTIONS: Progress the order lifecycle */}
                  {currentUser.role === 'farmer' && order.status === 'pending_confirmation' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'harvest_packaging')}
                      className="bg-[#16834B] hover:bg-[#126c3d] text-white text-xs font-semibold py-2 px-3.5 rounded-xl shadow-xs transition-colors"
                    >
                      Acknowledge & Begin Packaging
                    </button>
                  )}

                  {currentUser.role === 'farmer' && order.status === 'harvest_packaging' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'in_transit')}
                      className="bg-[#16834B] hover:bg-[#126c3d] text-white text-xs font-semibold py-2 px-3.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                    >
                      <Truck className="w-4 h-4" />
                      <span>Handover to Agrifest Logistics</span>
                    </button>
                  )}

                  {currentUser.role === 'farmer' && order.status === 'in_transit' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'delivered_pending_inspection')}
                      className="bg-stone-800 hover:bg-stone-900 text-white text-xs font-semibold py-2 px-3.5 rounded-xl shadow-xs transition-colors"
                    >
                      Mark as Arrived at Buyer Address
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Review Modal */}
      {selectedOrderForReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-stone-200 shadow-xl space-y-4">
            <h3 className="font-bold text-base text-stone-900">
              Review {selectedOrderForReview.farmerName}
            </h3>
            <p className="text-xs text-stone-500">
              How was the freshness and packaging of {selectedOrderForReview.produceTitle}?
            </p>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                  Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setReviewRating(s)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star 
                        className={`w-7 h-7 ${s <= reviewRating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Comments & Feedback
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Excellent dry maize, zero weevils, prompt delivery..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#16834B]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedOrderForReview(null)}
                  className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#16834B] hover:bg-[#126c3d] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                >
                  Submit Verified Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
