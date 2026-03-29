"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Send, RotateCcw } from "lucide-react";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');`;

const c = {
  bg: "#F8F6F1", card: "#FFFFFF", dark: "#08090C",
  text: "#111214", sub: "#4A4F5C", muted: "#888E9C",
  accent: "#2563EB", accentSoft: "#ECF2FF",
  border: "#E3DDD2",
  green: "#22C55E", greenSoft: "#ECFDF3", greenDk: "#15803D",
  amber: "#F59E0B", amberSoft: "#FFFBEB",
  red: "#EF4444", redSoft: "#FEF2F2",
};

type Msg = { from: "user" | "laura"; text: string; urgency?: "routine" | "soon" | "urgent" | "emergency" };

const urgencyColors = {
  routine: { bg: c.greenSoft, text: c.greenDk, label: "Routine" },
  soon: { bg: c.amberSoft, text: "#92400E", label: "Book soon" },
  urgent: { bg: "#FFF7ED", text: "#C2410C", label: "Urgent" },
  emergency: { bg: c.redSoft, text: "#991B1B", label: "Emergency" },
};

function getResponse(input: string): { text: string; urgency: Msg["urgency"] } {
  const lower = input.toLowerCase();

  if (lower.match(/chest\s*pain|heart\s*attack|can'?t\s*breathe|breathing|unconscious|stroke|seizure/)) {
    return { text: "This sounds like it could be a medical emergency. Please call 999 (UK), 911 (US), or your local emergency number immediately. Do not wait. If someone is with you, ask them to help while you call.", urgency: "emergency" };
  }
  if (lower.match(/fever|temperature|hot|chills|shivering/)) {
    return { text: "A persistent fever can sometimes need same-day clinical attention, especially if it has lasted more than 48 hours or is above 39\u00B0C. I would recommend contacting your GP for a same-day consultation. Shall I find practices near you?", urgency: "urgent" };
  }
  if (lower.match(/headache|head\s*hurts|migraine/)) {
    return { text: "Headaches can have many causes. If this is a sudden, severe headache unlike anything you have experienced before, seek urgent care. For recurring headaches, booking a routine appointment would be a good next step. Want me to search for GPs near your postcode?", urgency: "soon" };
  }
  if (lower.match(/sore\s*throat|throat|cough|cold|flu|runny\s*nose|congestion/)) {
    return { text: "Sore throats and colds are usually manageable at home with rest, fluids, and over-the-counter remedies. If symptoms persist beyond 7 days or you develop difficulty swallowing or breathing, it would be worth seeing a GP. Would you like me to find one near you?", urgency: "routine" };
  }
  if (lower.match(/rash|skin|itch|hives|spots|bumps/)) {
    return { text: "Skin concerns can vary widely. If the rash is spreading rapidly, accompanied by fever, or near your eyes or mouth, consider urgent care. For a rash that appeared gradually, a routine GP appointment should be sufficient. Shall I search for a doctor?", urgency: "soon" };
  }
  if (lower.match(/stomach|belly|abdomen|nausea|vomit|diarr/)) {
    return { text: "Stomach issues are common but can sometimes signal something that needs attention. If you are experiencing severe pain, blood in your stool, or inability to keep fluids down for more than 24 hours, seek same-day advice. Otherwise, a routine appointment would help. Want me to find nearby practices?", urgency: "soon" };
  }
  if (lower.match(/back\s*pain|back\s*hurts|spine|lower\s*back/)) {
    return { text: "Most back pain improves within a few weeks. Rest, gentle movement, and pain relief can help. If you have numbness in your legs, loss of bladder or bowel control, or the pain followed an injury, seek urgent care. Would you like me to find a GP near you?", urgency: "routine" };
  }
  if (lower.match(/anxiety|depressed|depression|mental\s*health|stressed|panic/)) {
    return { text: "Thank you for sharing that. Mental health is just as important as physical health. I would recommend booking an appointment with your GP to discuss how you are feeling. Many practices now offer same-day mental health consultations. Want me to find support near you?", urgency: "soon" };
  }
  if (lower.match(/prescription|medication|refill|repeat|medicine/)) {
    return { text: "For repeat prescriptions, your GP practice can usually process these within 48 hours. Many practices accept requests online or by phone. I can help you find your nearest practice and their prescription request process. Shall I search?", urgency: "routine" };
  }
  if (lower.match(/dentist|tooth|teeth|dental|gum|filling/)) {
    return { text: "For dental concerns, you will need a dentist rather than a GP. I can search for dental practices near your postcode. If you have severe dental pain with swelling or fever, consider an emergency dental service. Want me to find dentists nearby?", urgency: "soon" };
  }
  if (lower.match(/appointment|book|gp|doctor|find|near|postcode|zip/)) {
    return { text: "I can search for GP and dental practices near your location. What is your postcode or zip code? I will show you the nearest options with availability and help you request a callback.", urgency: "routine" };
  }
  if (lower.match(/94\d{3}|[A-Z]{1,2}\d{1,2}\s?\d[A-Z]{2}/i)) {
    return { text: "I found 4 practices near that area. The closest is accepting new patients and has availability this week. I can request a callback for you, or provide their contact details. What would you prefer?", urgency: "routine" };
  }
  if (lower.match(/thank|thanks|great|perfect|yes|callback|please/)) {
    return { text: "I have submitted a callback request on your behalf. You should receive a call within the next working day. Is there anything else I can help you with?", urgency: "routine" };
  }
  if (lower.match(/hello|hi|hey|good\s*(morning|afternoon|evening)/)) {
    return { text: "Hello! I am Laura, your AI health assistant. You can tell me about any symptoms you are experiencing, ask me to find a GP or dentist near you, or check how urgent something might be. How can I help you today?", urgency: undefined };
  }

  return { text: "I understand. Could you tell me a bit more about what you are experiencing? For example, describe any symptoms, how long they have lasted, and whether anything makes them better or worse. This will help me give you better guidance.", urgency: undefined };
}

const suggestions = [
  "I have a sore throat and fever",
  "Find a GP near 94103",
  "I have been feeling anxious lately",
  "I need a repeat prescription",
  "My child has a rash",
  "I have chest pain",
];

export default function DemoPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { from: "laura", text: "Hello! I am Laura, your AI health assistant. Tell me what you are experiencing and I will help you figure out the right next step. You can describe symptoms, ask me to find a doctor, or check how urgent something is." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  function sendMessage(text: string) {
    if (!text.trim()) return;
    const userMsg: Msg = { from: "user", text: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    const response = getResponse(text);
    const delay = 800 + Math.random() * 1200;

    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { from: "laura", text: response.text, urgency: response.urgency }]);
    }, delay);
  }

  function resetChat() {
    setMessages([{ from: "laura", text: "Hello! I am Laura, your AI health assistant. Tell me what you are experiencing and I will help you figure out the right next step." }]);
    setInput("");
    setTyping(false);
  }

  return (
    <>
      <style>{FONT}</style>
      <style>{CSS}</style>
      <div className="demoWrap">
        {/* Nav */}
        <nav className="demoNav">
          <div className="container demoNavInner">
            <Link href="/" className="demoNavBrand">
              <div className="demoNavLogo"><Image src="/omela-logo-mark.png" alt="Omela" width={32} height={32} style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
              <div><div className="demoNavName">Omela</div><div className="demoNavSub serif">Try Laura</div></div>
            </Link>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <button onClick={resetChat} className="demoResetBtn"><RotateCcw size={14} /> Reset</button>
              <Link href="/#waitlist" className="btnP demoBackBtn">Get early access <ArrowRight size={13} /></Link>
            </div>
          </div>
        </nav>

        {/* Disclaimer */}
        <div className="demoDisclaimer">
          <span className="demoDisTxt">This is a preview demo with simulated responses. Laura is not providing real medical advice. For emergencies, call 999 or 911.</span>
        </div>

        {/* Chat area */}
        <div className="demoChatWrap">
          <div className="demoChatInner">
            {/* Messages */}
            <div className="demoChatMessages">
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className={`demoMsg ${msg.from === "user" ? "demoMsgR" : "demoMsgL"}`}>
                    {msg.from === "laura" && (
                      <div className="demoMsgAvatar">
                        <Image src="/laura-avatar.png" alt="Laura" fill sizes="32px" style={{ objectFit: "cover" }} />
                      </div>
                    )}
                    <div className={`demoMsgContent ${msg.from === "user" ? "demoMsgU" : "demoMsgLa"}`}>
                      <p className="demoMsgTxt">{msg.text}</p>
                      {msg.urgency && (
                        <div className="demoUrgency" style={{ background: urgencyColors[msg.urgency].bg, color: urgencyColors[msg.urgency].text }}>
                          <span className="demoUrgDot" style={{ background: urgencyColors[msg.urgency].text }} />
                          {urgencyColors[msg.urgency].label}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="demoMsg demoMsgL">
                  <div className="demoMsgAvatar"><Image src="/laura-avatar.png" alt="Laura" fill sizes="32px" style={{ objectFit: "cover" }} /></div>
                  <div className="demoMsgLa demoTyping">
                    <span /><span /><span />
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            {messages.length <= 1 && (
              <div className="demoSuggestions">
                <p className="demoSugLabel">Try asking Laura:</p>
                <div className="demoSugGrid">
                  {suggestions.map(s => (
                    <button key={s} className="demoSugBtn" onClick={() => sendMessage(s)}>{s}</button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="demoInput">
              <input
                ref={inputRef}
                type="text"
                placeholder="Describe your symptoms or ask a question..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !typing) sendMessage(input); }}
                disabled={typing}
                className="demoInputField"
              />
              <button onClick={() => sendMessage(input)} disabled={typing || !input.trim()} className="demoSendBtn">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const CSS = `
*{box-sizing:border-box;margin:0;padding:0}html,body{height:100%;max-width:100%;overflow:hidden}
body{background:${c.bg};color:${c.text};font-family:'DM Sans',-apple-system,sans-serif;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}button,input{font-family:inherit}
.serif{font-family:'Instrument Serif',Georgia,serif}
.container{max-width:1200px;margin:0 auto;padding:0 20px}
.btnP{display:inline-flex;align-items:center;gap:6px;background:${c.dark};color:#fff;border:none;border-radius:999px;padding:10px 18px;font-size:13px;font-weight:700;cursor:pointer;white-space:nowrap}

.demoWrap{display:flex;flex-direction:column;height:100vh;height:100dvh}
.demoNav{background:rgba(248,246,241,0.94);backdrop-filter:blur(16px);border-bottom:1px solid ${c.border};flex-shrink:0;z-index:10}
.demoNavInner{display:flex;align-items:center;justify-content:space-between;height:56px;gap:10px}
.demoNavBrand{display:flex;align-items:center;gap:8px;text-decoration:none;flex-shrink:0}
.demoNavLogo{width:30px;height:30px;border-radius:9px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06)}
.demoNavName{font-size:13px;font-weight:800;letter-spacing:-0.03em}
.demoNavSub{font-size:10px;color:${c.accent};font-weight:700;margin-top:1px}
.demoResetBtn{display:inline-flex;align-items:center;gap:5px;background:rgba(255,255,255,0.8);border:1px solid ${c.border};border-radius:999px;padding:7px 14px;font-size:12px;font-weight:600;color:${c.sub};cursor:pointer}
.demoBackBtn{padding:8px 16px!important;font-size:12px!important}

.demoDisclaimer{background:${c.amberSoft};border-bottom:1px solid #FDE68A;padding:8px 20px;flex-shrink:0}
.demoDisTxt{font-size:11px;color:#92400E;font-weight:600;display:block;text-align:center;line-height:1.5}

.demoChatWrap{flex:1;display:flex;flex-direction:column;overflow:hidden}
.demoChatInner{max-width:760px;width:100%;margin:0 auto;display:flex;flex-direction:column;height:100%;padding:0 16px}

.demoChatMessages{flex:1;overflow-y:auto;padding:20px 0;display:flex;flex-direction:column;gap:16px;scrollbar-width:thin;scrollbar-color:${c.border} transparent}
.demoChatMessages::-webkit-scrollbar{width:4px}
.demoChatMessages::-webkit-scrollbar-thumb{background:${c.border};border-radius:4px}

.demoMsg{display:flex;gap:10px;align-items:flex-start}
.demoMsgR{flex-direction:row-reverse}
.demoMsgL{flex-direction:row}
.demoMsgAvatar{position:relative;width:32px;height:32px;border-radius:999px;overflow:hidden;flex-shrink:0;border:1.5px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.08)}
.demoMsgContent{max-width:75%;padding:14px 18px;border-radius:20px}
.demoMsgU{background:${c.dark};color:#fff;border-radius:20px 20px 6px 20px}
.demoMsgLa{background:${c.card};border:1px solid ${c.border};border-radius:20px 20px 20px 6px;box-shadow:0 2px 8px rgba(0,0,0,0.03)}
.demoMsgTxt{font-size:14px;line-height:1.7}

.demoUrgency{display:inline-flex;align-items:center;gap:6px;margin-top:10px;padding:6px 12px;border-radius:999px;font-size:11px;font-weight:700}
.demoUrgDot{width:6px;height:6px;border-radius:999px;flex-shrink:0}

.demoTyping{display:flex;gap:4px;padding:16px 20px}
.demoTyping span{width:7px;height:7px;border-radius:999px;background:${c.muted};animation:typingDot 1.2s infinite}
.demoTyping span:nth-child(2){animation-delay:0.2s}
.demoTyping span:nth-child(3){animation-delay:0.4s}
@keyframes typingDot{0%,80%{opacity:0.3;transform:scale(0.8)}40%{opacity:1;transform:scale(1)}}

.demoSuggestions{padding:0 0 16px;flex-shrink:0}
.demoSugLabel{font-size:12px;font-weight:700;color:${c.muted};margin-bottom:10px;text-transform:uppercase;letter-spacing:0.1em}
.demoSugGrid{display:flex;flex-wrap:wrap;gap:8px}
.demoSugBtn{background:rgba(255,255,255,0.9);border:1px solid ${c.border};border-radius:12px;padding:10px 16px;font-size:13px;font-weight:600;color:${c.sub};cursor:pointer;transition:all 0.2s;text-align:left;line-height:1.4}
.demoSugBtn:hover{background:#fff;border-color:#D0CBBD;transform:translateY(-1px);box-shadow:0 4px 12px rgba(0,0,0,0.06)}

.demoInput{display:flex;gap:8px;padding:12px 0 20px;flex-shrink:0;border-top:1px solid ${c.border}}
.demoInputField{flex:1;height:52px;border-radius:16px;border:1px solid ${c.border};background:#fff;padding:0 18px;font-size:15px;color:${c.text};outline:none}
.demoInputField:focus{border-color:${c.accent};box-shadow:0 0 0 3px rgba(37,99,235,0.06)}
.demoInputField:disabled{opacity:0.6}
.demoSendBtn{width:52px;height:52px;border-radius:16px;background:${c.accent};color:#fff;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.2s;flex-shrink:0}
.demoSendBtn:hover:not(:disabled){background:#1D4ED8;transform:translateY(-1px)}
.demoSendBtn:disabled{opacity:0.4;cursor:not-allowed}

@media(min-width:640px){
  .container{padding:0 28px}
  .demoChatInner{padding:0 28px}
  .demoMsgContent{max-width:65%}
  .demoNavInner{height:64px}
}
`;
