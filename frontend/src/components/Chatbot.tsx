import React, { useState, useRef, useEffect } from 'react';
import { Page } from '../types';
import { submitInquiry } from '../api/maruthi-toolings.api';
import { playClickSound } from '../utils/sounds';

interface ChatbotProps {
  setCurrentPage: (page: Page) => void;
}

interface Message {
  id: number;
  role: 'bot' | 'user';
  text: string;
  choices?: string[];
}

type LeadStep = 'idle' | 'ask-name' | 'ask-email' | 'ask-message' | 'submitting' | 'done';

// ─── FAQ / Navigation responses ──────────────────────────────────
function getBotResponse(
  input: string,
  navigate: (p: Page) => void
): { text: string; choices?: string[] } {
  const q = input.toLowerCase();

  if (q.includes('mould') || q.includes('mold')) {
    navigate('Moulds');
    return {
      text: "I've taken you to our **Moulds** page! We manufacture high-cavitation, 2K/3K, and custom injection moulds.",
      choices: ['Types of Moulds', 'Get a Quote', 'Contact Us'],
    };
  }
  if (q.includes('machine') || q.includes('cnc') || q.includes('edm')) {
    navigate('Products');
    return {
      text: "Our facility uses Cosmos CVM 1060 CNC VMCs, AMS MCV 400 machines, and Sparkronix ZNC EDMs for sub-micron precision toolmaking.",
      choices: ['Our Services', 'Contact Us'],
    };
  }
  if (q.includes('product') || q.includes('catalogue') || q.includes('catalog')) {
    navigate('Products');
    return { text: "Here's our full product catalogue! What are you looking for?", choices: ['Moulds', 'End Components'] };
  }
  if (q.includes('end component') || q.includes('component')) {
    navigate('End Components');
    return { text: "Showing our **End Components** — precision moulded plastic parts.", choices: ['Contact Us'] };
  }
  if (q.includes('service')) {
    navigate('Services');
    return { text: "We offer mould design, CNC machining, ZNC EDM spark erosion, and maintenance services.", choices: ['Get a Quote'] };
  }
  if (q.includes('contact') || q.includes('quote') || q.includes('enquir') || q.includes('inquiry')) {
    navigate('Contact Us');
    return { text: "Opened the **Contact Us** page! Or I can collect your details right here 👇", choices: ['Send my details', "I'll fill the form"] };
  }
  if (q.includes('career') || q.includes('job') || q.includes('hire')) {
    navigate('Careers');
    return { text: "We're hiring! CNC Operators, Mould Designers and Trainees.", choices: ['Tell me more'] };
  }
  if (q.includes('about') || q.includes('company') || q.includes('maruthi')) {
    navigate('About Us');
    return { text: "Maruthi Toolings — 25+ years of precision injection mould manufacturing in Hyderabad.", choices: ['Our Services', 'Contact Us'] };
  }
  if (q.includes('location') || q.includes('address') || q.includes('where')) {
    return {
      text: "📍 A-42/3, Rd No. 9, IDA Kukatpally, Hyderabad\n📞 +91 70951 70416\n✉️ marutitooling@gmail.com",
      choices: ['Get Directions', 'Contact Us'],
    };
  }
  if (q.includes('pharma') || q.includes('medical') || q.includes('syringe')) {
    return { text: "Yes! We specialise in pharma-grade moulds — syringe barrels, vial closures, high-cavitation tools.", choices: ['View Moulds', 'Contact Us'] };
  }
  if (q.includes('price') || q.includes('cost') || q.includes('budget')) {
    return { text: "Pricing depends on cavity count, complexity and material. Share your requirements for a quote within 24 hours.", choices: ['Send my details', 'Contact Us'] };
  }
  if (q.includes('direction') || q.includes('google map') || q.includes('map')) {
    window.open('https://www.google.com/maps/search/Maruthi+Toolings+Kukatpally', '_blank');
    return { text: "Opening Google Maps for you! 🗺️" };
  }

  return {
    text: "I'm here to help! Ask me about our moulds, services, pricing, or location.",
    choices: ['View Moulds', 'Our Services', 'Contact Us', 'Send my details'],
  };
}

const INIT_MESSAGES: Message[] = [
  {
    id: 0,
    role: 'bot',
    text: "👋 Hello! I'm MT Assistant from Maruthi Toolings. How can I help you today?",
    choices: ['View Moulds', 'End Components', 'Our Services', 'Get a Quote', 'Send my details'],
  },
];

// ─── Typing indicator ─────────────────────────────────────────────
const TypingIndicator: React.FC = () => (
  <div className="flex justify-start">
    <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex items-center gap-1.5">
      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  </div>
);

const Chatbot: React.FC<ChatbotProps> = ({ setCurrentPage }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INIT_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [leadStep, setLeadStep] = useState<LeadStep>('idle');
  const [lead, setLead] = useState({ name: '', email: '', message: '' });
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      setUnread(0);
    }
  }, [open]);

  const addMessage = (msg: Omit<Message, 'id'>) => {
    setMessages(prev => [...prev, { ...msg, id: Date.now() }]);
    if (!open) setUnread(u => u + 1);
  };

  const showTypingThen = (fn: () => void, delay = 800) => {
    setIsTyping(true);
    setTimeout(() => { setIsTyping(false); fn(); }, delay);
  };

  const handleLeadFlow = async (userText: string): Promise<boolean> => {
    if (leadStep === 'ask-name') {
      setLead(l => ({ ...l, name: userText }));
      setLeadStep('ask-email');
      showTypingThen(() => addMessage({ role: 'bot', text: `Nice to meet you, ${userText}! 😊 What's your email address?` }));
      return true;
    }
    if (leadStep === 'ask-email') {
      if (!/\S+@\S+\.\S+/.test(userText)) {
        showTypingThen(() => addMessage({ role: 'bot', text: "Hmm, that doesn't look like a valid email. Please try again." }), 500);
        return true;
      }
      setLead(l => ({ ...l, email: userText }));
      setLeadStep('ask-message');
      showTypingThen(() => addMessage({ role: 'bot', text: "Great! Briefly tell us what you need — mould type, quantity, material, etc." }));
      return true;
    }
    if (leadStep === 'ask-message') {
      const finalLead = { ...lead, message: userText };
      setLead(finalLead);
      setLeadStep('submitting');
      showTypingThen(async () => {
        addMessage({ role: 'bot', text: "Sending your details to our team... ⏳" });
        try {
          await submitInquiry({ name: finalLead.name, email: finalLead.email, message: `[Via Chatbot] ${finalLead.message}` });
          setLeadStep('done');
          showTypingThen(() => addMessage({
            role: 'bot',
            text: `✅ Sent! Our team will reach out to you at\n📧 ${finalLead.email} within 24 hours.\n\nThank you, ${finalLead.name}!`,
            choices: ['View Products', 'Our Services'],
          }), 1000);
        } catch {
          setLeadStep('idle');
          showTypingThen(() => addMessage({
            role: 'bot',
            text: "⚠️ Couldn't send right now. Please email us at marutitooling@gmail.com",
          }), 500);
        }
      }, 600);
      return true;
    }
    return false;
  };

  const handleSend = async (text: string = input.trim()) => {
    if (!text) return;
    playClickSound('chip');
    setInput('');
    addMessage({ role: 'user', text });

    if (leadStep !== 'idle' && leadStep !== 'done') {
      await handleLeadFlow(text);
      return;
    }
    if (text.toLowerCase().includes('send my detail') || text.toLowerCase().includes("i'll fill")) {
      if (text.toLowerCase().includes("i'll fill")) return;
      setLeadStep('ask-name');
      showTypingThen(() => addMessage({ role: 'bot', text: "Sure! Let's start — what's your name?" }));
      return;
    }
    if (text === 'Get Directions') {
      window.open('https://www.google.com/maps/search/Maruthi+Toolings+Kukatpally', '_blank');
      return;
    }

    const pageMap: Record<string, Page> = {
      'View Products': 'Products', 'View Moulds': 'Moulds',
      'Moulds': 'Moulds', 'End Components': 'End Components',
      'Our Services': 'Services', 'Contact Us': 'Contact Us', 'Get a Quote': 'Contact Us',
    };
    if (pageMap[text]) setCurrentPage(pageMap[text]);

    const resp = getBotResponse(text, setCurrentPage);
    showTypingThen(() => addMessage({ role: 'bot', ...resp }));
  };

  return (
    <>
      {/* ── Floating button ──────────────────────────────── */}
      <button
        onClick={() => { playClickSound('open'); setOpen(o => !o); }}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl
                   flex items-center justify-center transition-all duration-300
                   ${open
                     ? 'bg-gray-700 hover:bg-gray-800 rotate-0'
                     : 'bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 hover:scale-110'
                   }`}
        aria-label="Chat with us"
        style={{ boxShadow: open ? undefined : '0 8px 32px rgba(37,99,235,0.45)' }}
      >
        <div className={`transition-transform duration-300 ${open ? 'rotate-90' : 'rotate-0'}`}>
          {open ? (
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          )}
        </div>

        {/* Pulse ring when closed */}
        {!open && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
        )}
        {/* Unread badge */}
        {!open && unread > 0 && (
          <span className="absolute -top-1.5 -left-1.5 min-w-[20px] h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
            {unread}
          </span>
        )}
      </button>

      {/* ── Chat window ──────────────────────────────────── */}
      {open && (
        <div
          className="fixed bottom-24 right-4 z-50 w-[340px] sm:w-[380px] flex flex-col rounded-3xl overflow-hidden"
          style={{
            height: '540px',
            boxShadow: '0 24px 80px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.05)',
          }}
        >
          {/* ── Header ──────────────────────────────── */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-5 py-4 flex items-center gap-3 flex-shrink-0">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg">
                🤖
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm">MT Assistant</p>
              <p className="text-blue-200 text-xs flex items-center gap-1">
                {isTyping ? (
                  <span className="text-blue-100">typing...</span>
                ) : (
                  <>
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    Online · Maruthi Toolings
                  </>
                )}
              </p>
            </div>
            <button
              onClick={() => { playClickSound('close'); setOpen(false); }}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition flex-shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* ── Messages ─────────────────────────────── */}
          <div
            className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
            style={{ background: 'linear-gradient(180deg, #f0f4ff 0%, #f8faff 100%)' }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {/* Bot avatar */}
                {msg.role === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs flex-shrink-0 mb-1">
                    🤖
                  </div>
                )}

                <div className="max-w-[78%]">
                  <div className={`px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-2xl rounded-br-sm'
                      : 'bg-white text-gray-800 rounded-2xl rounded-bl-sm shadow-sm border border-gray-100/80'
                  }`}>
                    {msg.text.split('\n').map((line, i) => (
                      <p key={i} className={i > 0 ? 'mt-0.5' : ''}>{line}</p>
                    ))}
                  </div>

                  {/* Quick reply chips */}
                  {msg.role === 'bot' && msg.choices && msg.choices.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {msg.choices.map(c => (
                        <button
                          key={c}
                          onClick={() => handleSend(c)}
                          className="text-xs bg-white text-blue-700 border border-blue-200 rounded-full px-3 py-1
                                     hover:bg-blue-600 hover:text-white hover:border-blue-600
                                     transition-all duration-150 shadow-sm hover:shadow-md"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* User avatar */}
                {msg.role === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs flex-shrink-0 mb-1">
                    👤
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>

          {/* ── Lead step indicator ───────────────────── */}
          {leadStep !== 'idle' && leadStep !== 'done' && (
            <div className="px-4 py-1.5 bg-blue-50 border-t border-blue-100 flex items-center gap-2">
              <div className="flex gap-1">
                {(['ask-name','ask-email','ask-message'] as LeadStep[]).map((step, i) => (
                  <div
                    key={step}
                    className={`h-1.5 w-8 rounded-full transition-colors ${
                      ['ask-name','ask-email','ask-message'].indexOf(leadStep) >= i
                        ? 'bg-blue-500' : 'bg-blue-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-blue-500">
                {{
                  'ask-name': 'Step 1/3 — Your name',
                  'ask-email': 'Step 2/3 — Your email',
                  'ask-message': 'Step 3/3 — Your requirement',
                  'submitting': 'Sending...',
                }[leadStep as string] ?? ''}
              </span>
            </div>
          )}

          {/* ── Input bar ────────────────────────────── */}
          <div className="px-3 py-3 bg-white border-t border-gray-100 flex items-center gap-2 flex-shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder={
                leadStep === 'ask-name' ? "Your name..." :
                leadStep === 'ask-email' ? "Your email..." :
                leadStep === 'ask-message' ? "Your requirement..." :
                "Ask me anything..."
              }
              className="flex-1 text-sm px-4 py-2.5 rounded-xl border border-gray-200
                         focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100
                         bg-gray-50 placeholder-gray-400 transition-all"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="w-10 h-10 bg-blue-600 hover:bg-blue-700 disabled:opacity-30 disabled:bg-gray-300
                         rounded-xl flex items-center justify-center transition-all duration-200
                         hover:scale-105 active:scale-95 flex-shrink-0"
            >
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>

          {/* ── Footer ───────────────────────────────── */}
          <div className="px-4 py-2 bg-white border-t border-gray-50 text-center flex-shrink-0">
            <p className="text-[10px] text-gray-300">Maruthi Toolings · Hyderabad</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
