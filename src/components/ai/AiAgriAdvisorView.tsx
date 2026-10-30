import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  Send, 
  Wheat, 
  ShieldCheck, 
  TrendingUp, 
  AlertCircle, 
  Bot, 
  User as UserIcon, 
  RefreshCw,
  Clock,
  HelpCircle
} from 'lucide-react';

interface ChatEntry {
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  source?: string;
}

export const AiAgriAdvisorView: React.FC = () => {
  const { askAgriAI, currentUser } = useApp();
  
  const [messages, setMessages] = useState<ChatEntry[]>([
    {
      sender: 'ai',
      text: `Hello ${currentUser.name}! I am your **HackAgrifest AI Agricultural Copilot**. \n\nI can help you with:\n• **Real-time Farmgate Fair Pricing** across Nigerian states (Kano, Plateau, Benue, Kebbi, Kaduna, etc.)\n• **Post-Harvest Loss Prevention** (moisture drying, tomato transit rot reduction, hermetic storage)\n• **Middleman Elimination Analysis** (calculating direct savings vs Mile 12 / Bodija open retail)\n• **Escrow Verification** and produce quality grading standards.\n\nWhat crop or market question would you like to explore today?`,
      timestamp: 'Just now',
      source: 'gemini_api'
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const presetQuestions = [
    'How do I transport Jos tomatoes to Lagos with under 5% spoilage?',
    'What is the fair farmgate price for 100kg yellow maize in Kano today?',
    'How does HackAgrifest Escrow protect me as a buyer upon truck arrival?',
    'Which Nigerian states have the cheapest farmgate prices for stone-free rice?'
  ];

  const handleSend = async (queryText: string) => {
    if (!queryText.trim() || isLoading) return;

    const userEntry: ChatEntry = {
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userEntry]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const response = await askAgriAI(queryText);
      const aiEntry: ChatEntry = {
        sender: 'ai',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: response.source
      };
      setMessages(prev => [...prev, aiEntry]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: 'Unable to connect to advisory service. Please check network connection and try again.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-24 md:pb-12 max-w-5xl mx-auto px-4 sm:px-6 pt-4 h-[calc(100vh-5.5rem)] flex flex-col">
      
      {/* Header Bar */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-2xs flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-[#16834B] to-[#0f5c34] text-[#F4A62A] rounded-xl shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-extrabold text-base sm:text-lg text-stone-900 flex items-center gap-2">
              <span>HackAgrifest AI Agricultural Copilot</span>
              <span className="text-[10px] font-semibold text-[#16834B] bg-[#16834B]/10 px-2 py-0.5 rounded-full">
                Gemini 3.8 Flash
              </span>
            </h1>
            <p className="text-xs text-stone-500">
              Live agronomic market intelligence, fair farmgate pricing & post-harvest loss prevention.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setMessages([messages[0]]);
          }}
          className="text-xs text-stone-400 hover:text-stone-700 p-2 rounded-lg hover:bg-stone-50"
          title="Reset Chat"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Main Chat Scroll Container */}
      <div className="flex-1 bg-white rounded-3xl border border-stone-200/90 shadow-2xs overflow-hidden flex flex-col">
        
        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#F7F8F4]/40">
          {messages.map((m, idx) => {
            const isUser = m.sender === 'user';
            return (
              <div
                key={idx}
                className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                    isUser
                      ? 'bg-[#16834B] text-white'
                      : 'bg-stone-900 text-[#F4A62A]'
                  }`}
                >
                  {isUser ? <UserIcon className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[85%] sm:max-w-xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed space-y-2 ${
                    isUser
                      ? 'bg-[#16834B] text-white rounded-tr-xs shadow-xs'
                      : 'bg-white border border-stone-200 text-stone-800 rounded-tl-xs shadow-2xs'
                  }`}
                >
                  <div className="whitespace-pre-line">
                    {m.text}
                  </div>

                  <div className={`flex items-center justify-between text-[10px] pt-1 border-t ${
                    isUser ? 'border-white/20 text-emerald-100' : 'border-stone-100 text-stone-400'
                  }`}>
                    <span>{m.timestamp}</span>
                    {m.source && (
                      <span className="font-mono">
                        {m.source === 'gemini_api' ? '⚡ Gemini 3.8 Flash' : '🌾 Agrifest Market Index'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-stone-900 text-[#F4A62A] flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-white border border-stone-200 rounded-2xl p-3 text-xs text-stone-500 shadow-2xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#16834B] animate-pulse" />
                <span>Consulting Nigerian agronomic models & market indices...</span>
              </div>
            </div>
          )}
        </div>

        {/* Preset Question Chips */}
        <div className="px-4 py-2 border-t border-stone-100 bg-stone-50/60 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <HelpCircle className="w-3 h-3 text-[#16834B]" />
            <span>Suggested:</span>
          </span>
          {presetQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="whitespace-nowrap px-3 py-1 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg text-stone-700 text-[11px] font-medium transition-colors shadow-2xs"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-stone-200 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputPrompt);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Ask about fair pricing in Kano/Jos, tomato cold-chain, rice storage, or middleman markups..."
              className="flex-1 py-3 px-4 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#16834B] focus:bg-white"
            />
            <button
              type="submit"
              disabled={isLoading || !inputPrompt.trim()}
              className="p-3 bg-[#16834B] hover:bg-[#126c3d] text-white rounded-xl shadow-xs transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
