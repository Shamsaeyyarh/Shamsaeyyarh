import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Send, 
  MessageSquare, 
  ShieldCheck, 
  ShoppingBag, 
  ArrowLeft, 
  Phone, 
  Sparkles,
  CheckCheck
} from 'lucide-react';

export const ChatView: React.FC = () => {
  const { 
    conversations, 
    messages, 
    activeConversationId, 
    setActiveConversationId, 
    sendMessage, 
    currentUser,
    produceList,
    openCheckout
  } = useApp();

  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-select first conversation if none selected
  useEffect(() => {
    if (!activeConversationId && conversations.length > 0) {
      setActiveConversationId(conversations[0].id);
    }
  }, [conversations, activeConversationId, setActiveConversationId]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeConversationId]);

  const activeConv = conversations.find(c => c.id === activeConversationId);
  const currentMessages = activeConversationId ? messages[activeConversationId] || [] : [];

  const recipientId = activeConv 
    ? (currentUser.id === activeConv.farmerId ? activeConv.buyerId : activeConv.farmerId)
    : '';

  const recipientName = activeConv
    ? (currentUser.id === activeConv.farmerId ? activeConv.buyerName : activeConv.farmerName)
    : '';

  const recipientAvatar = activeConv
    ? (currentUser.id === activeConv.farmerId ? activeConv.buyerAvatar : activeConv.farmerAvatar)
    : '';

  // Quick inquiry templates
  const quickTemplates = [
    'Is refrigerated delivery to Lagos available?',
    'Can we negotiate on 20+ bags bulk order?',
    'Can you send harvest inspection photos?',
    'When will the next truck leave the farm?'
  ];

  const handleSend = (text: string) => {
    if (!text.trim() || !recipientId) return;
    sendMessage(recipientId, text);
    setInputText('');
  };

  // Find linked produce if any
  const matchedProduce = produceList.find(p => p.title === activeConv?.produceTitle);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-20 md:pb-12 h-[calc(100vh-5rem)]">
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-2xs h-full flex overflow-hidden">
        
        {/* Left Column: Conversations List */}
        <div className={`w-full md:w-80 border-r border-stone-200 flex flex-col shrink-0 ${
          activeConversationId ? 'hidden md:flex' : 'flex'
        }`}>
          <div className="p-4 border-b border-stone-100 flex items-center justify-between">
            <h2 className="font-extrabold text-base text-stone-900 tracking-tight">
              Direct Farmer Messages
            </h2>
            <span className="text-xs font-semibold text-stone-400">
              {conversations.length} active
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-stone-100">
            {conversations.length === 0 ? (
              <div className="p-6 text-center text-xs text-stone-400">
                No active conversations yet. Visit the marketplace to chat directly with verified farmers.
              </div>
            ) : (
              conversations.map((conv) => {
                const isSelected = conv.id === activeConversationId;
                const otherName = currentUser.id === conv.farmerId ? conv.buyerName : conv.farmerName;
                const otherAvatar = currentUser.id === conv.farmerId ? conv.buyerAvatar : conv.farmerAvatar;

                return (
                  <button
                    key={conv.id}
                    onClick={() => setActiveConversationId(conv.id)}
                    className={`w-full p-3.5 text-left transition-colors flex items-start gap-3 hover:bg-stone-50 ${
                      isSelected ? 'bg-emerald-50/60 border-l-4 border-[#16834B]' : ''
                    }`}
                  >
                    <img
                      src={otherAvatar}
                      alt={otherName}
                      className="w-11 h-11 rounded-full object-cover shrink-0 ring-1 ring-stone-200"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-stone-900 truncate">
                          {otherName}
                        </span>
                        <span className="text-[10px] text-stone-400 shrink-0">
                          {conv.lastTimestamp}
                        </span>
                      </div>

                      {conv.produceTitle && (
                        <span className="text-[10px] text-[#16834B] font-medium truncate block mt-0.5">
                          🌾 {conv.produceTitle}
                        </span>
                      )}

                      <p className="text-xs text-stone-500 truncate mt-1">
                        {conv.lastMessage}
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Chat Thread */}
        {activeConv ? (
          <div className={`flex-1 flex flex-col h-full ${!activeConversationId ? 'hidden md:flex' : 'flex'}`}>
            
            {/* Thread Header */}
            <div className="p-3.5 sm:p-4 border-b border-stone-200/80 bg-stone-50/50 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveConversationId(null)}
                  className="md:hidden p-1.5 text-stone-600 hover:text-stone-900"
                  aria-label="Back to conversations"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <img
                  src={recipientAvatar}
                  alt={recipientName}
                  className="w-10 h-10 rounded-full object-cover ring-1 ring-stone-200"
                  referrerPolicy="no-referrer"
                />

                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-stone-900">
                      {recipientName}
                    </span>
                    <ShieldCheck className="w-4 h-4 text-[#16834B]" />
                  </div>
                  <span className="text-[11px] text-stone-500 block">
                    {currentUser.role === 'farmer' ? 'Verified Buyer' : 'Verified Farm Owner'} · Direct Peer Connection
                  </span>
                </div>
              </div>

              {/* Order produce action if buyer */}
              {matchedProduce && currentUser.role === 'buyer' && (
                <button
                  onClick={() => openCheckout(matchedProduce)}
                  className="flex items-center gap-1.5 bg-[#16834B] hover:bg-[#126c3d] text-white text-xs font-bold py-2 px-3 rounded-xl shadow-xs transition-colors"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Order</span>
                  <span>(₦{matchedProduce.unitPrice.toLocaleString()})</span>
                </button>
              )}
            </div>

            {/* Produce Context Bar */}
            {activeConv.produceTitle && (
              <div className="bg-stone-100/90 px-4 py-2 text-xs text-stone-600 flex items-center justify-between shrink-0 border-b border-stone-200/60">
                <span className="truncate">
                  Discussing: <strong className="text-stone-900">{activeConv.produceTitle}</strong>
                </span>
                <span className="text-[10px] text-[#16834B] font-semibold uppercase tracking-wider shrink-0 ml-2">
                  100% Escrow Protected
                </span>
              </div>
            )}

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F7F8F4]/40">
              {currentMessages.map((msg) => {
                const isMe = msg.senderId === currentUser.id;

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-md rounded-2xl p-3 text-xs sm:text-sm leading-relaxed ${
                        isMe
                          ? 'bg-[#16834B] text-white rounded-br-xs shadow-xs'
                          : 'bg-white border border-stone-200 text-stone-800 rounded-bl-xs shadow-2xs'
                      }`}
                    >
                      <p>{msg.text}</p>
                    </div>

                    <div className="flex items-center gap-1 text-[10px] text-stone-400 mt-1 px-1">
                      <span>{msg.timestamp}</span>
                      {isMe && <CheckCheck className="w-3 h-3 text-[#16834B]" />}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Inquiry Suggestions */}
            {currentUser.role === 'buyer' && (
              <div className="px-3 pt-2 bg-white flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
                {quickTemplates.map((t, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(t)}
                    className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-medium transition-colors"
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <div className="p-3 sm:p-4 bg-white border-t border-stone-200 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputText);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your message, bargain quantity, or delivery inquiry..."
                  className="flex-1 py-2.5 px-4 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#16834B] focus:bg-white"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="p-2.5 bg-[#16834B] hover:bg-[#126c3d] text-white rounded-xl shadow-xs transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>
        ) : (
          <div className="flex-1 hidden md:flex items-center justify-center p-8 text-center text-stone-400 space-y-2 flex-col">
            <MessageSquare className="w-12 h-12 text-stone-300" />
            <h3 className="font-bold text-stone-700">Select a Conversation</h3>
            <p className="text-xs">Chat directly with farmers to verify harvest status and coordinate logistics.</p>
          </div>
        )}

      </div>
    </div>
  );
};
