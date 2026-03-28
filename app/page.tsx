"use client";

import Image from "next/image";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Blocks, Heart, Mic } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   FONTS — DM Sans body (warm geometric) + Instrument Serif display
   ═══════════════════════════════════════════════════════════════ */
const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');
`;

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS
   ═══════════════════════════════════════════════════════════════ */
const c = {
  bg: "#F8F6F1",
  bgCard: "#FFFFFF",
  bgDark: "#08090C",
  bgDarkCard: "#111318",
  text: "#141517",
  textSub: "#555B69",
  textMuted: "#8B919F",
  accent: "#2563EB",
  accentSoft: "#ECF2FF",
  border: "#E3DDD2",
  borderDark: "#222633",
  green: "#22C55E",
  greenSoft: "#ECFDF3",
  greenDark: "#15803D",
};

/* ═══════════════════════════════════════════════════════════════
   REUSABLE PRIMITIVES
   ═══════════════════════════════════════════════════════════════ */
type RoleKey = "patient" | "provider" | "developer";

function FadeIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return <div className="pill">{children}</div>;
}

function SectionHeading({ badge, title, body, dark = false }: { badge?: string; title: ReactNode; body?: string; dark?: boolean }) {
  return (
    <div style={{ textAlign: "center", maxWidth: "780px", margin: "0 auto" }}>
      {badge && <Pill>{badge}</Pill>}
      <h2 className="serif" style={{ fontSize: "clamp(32px, 5vw, 56px)", lineHeight: 1.04, letterSpacing: "-0.045em", marginTop: badge ? "20px" : 0, color: dark ? "#fff" : c.text }}>{title}</h2>
      {body && <p style={{ fontSize: "17px", lineHeight: 1.82, color: dark ? "rgba(255,255,255,0.6)" : c.textSub, marginTop: "16px", maxWidth: "600px", margin: "16px auto 0" }}>{body}</p>}
    </div>
  );
}

function CheckDot({ dark = false }: { dark?: boolean }) {
  return (
    <span style={{ width: "22px", height: "22px", borderRadius: "999px", background: dark ? "rgba(34,197,94,0.12)" : c.greenSoft, color: dark ? "#4ADE80" : c.green, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 800, flexShrink: 0 }}>
      ✓
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   OPERATIONAL STATUS BAR — like Stripe/Linear status pages
   ═══════════════════════════════════════════════════════════════ */
function StatusBar() {
  return (
    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="statusBar">
      <div className="container statusBarInner">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} style={{ width: "8px", height: "8px", borderRadius: "999px", background: c.green, display: "inline-block", boxShadow: `0 0 8px ${c.green}44` }} />
          <span style={{ fontSize: "12px", fontWeight: 700, color: c.greenDark, letterSpacing: "0.02em" }}>All systems operational</span>
        </div>
        <div className="statusServices">
          {["Voice API", "Chat Engine", "Scheduling", "Translation"].map((s) => (
            <span key={s} style={{ fontSize: "11px", color: c.textMuted, fontWeight: 600, display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "999px", background: c.green, display: "inline-block" }} />
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO CAPABILITY CARDS — horizontal, animated, premium
   ═══════════════════════════════════════════════════════════════ */
function CapabilityIcon({ type }: { type: "voice" | "heart" | "infra" }) {
  const Icon = type === "voice" ? Mic : type === "heart" ? Heart : Blocks;
  return (
    <div className="capIconShell">
      <motion.span className="capIconPulse" animate={{ scale: [1, 1.25, 1], opacity: [0.15, 0.35, 0.15] }} transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: type === "heart" ? 0.3 : type === "infra" ? 0.6 : 0 }} />
      <motion.div animate={type === "voice" ? { y: [0, -3, 0] } : type === "heart" ? { scale: [1, 1.1, 0.96, 1.08, 1] } : { rotate: [0, 5, 0, -5, 0] }} transition={{ duration: type === "heart" ? 1.8 : 2.8, repeat: Infinity, ease: "easeInOut" }} style={{ position: "relative", zIndex: 2 }}>
        <Icon size={24} strokeWidth={2} color={c.accent} />
      </motion.div>
    </div>
  );
}

function HeroCapabilities() {
  const cards = [
    { type: "voice" as const, title: "Voice & chat ready", body: "Conversational care access across spoken and text interactions with clinical-grade language understanding." },
    { type: "heart" as const, title: "Care navigation", body: "Guides people toward the right next step with structured symptom capture and smart routing." },
    { type: "infra" as const, title: "Infrastructure grade", body: "Built for product teams and cloud systems with audit trails, compliance controls, and 99.9% uptime." },
  ];

  return (
    <div className="capGrid">
      {cards.map((card, i) => (
        <motion.div
          key={card.title}
          className="capCard"
          initial={{ opacity: 0, y: 36, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -5, boxShadow: "0 28px 64px rgba(0,0,0,0.07), 0 0 0 1px rgba(37,99,235,0.06)", transition: { duration: 0.22 } }}
        >
          <div className="capCardShimmer" />
          <div className="capCardContent">
            <CapabilityIcon type={card.type} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 className="capCardTitle">{card.title}</h3>
              <p className="capCardBody">{card.body}</p>
            </div>
            <div className="capCardArrow">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PHONE MOCKUP — realistic iPhone 15 Pro with WhatsApp verified
   ═══════════════════════════════════════════════════════════════ */
function VerifiedBadge() {
  return (
    <span className="verifiedBadge" title="Meta Verified Business">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 1L14.9 3.6L18.6 3.2L19.4 6.8L22.5 8.7L21.2 12.2L22.5 15.7L19.4 17.6L18.6 21.2L14.9 20.8L12 23.4L9.1 20.8L5.4 21.2L4.6 17.6L1.5 15.7L2.8 12.2L1.5 8.7L4.6 6.8L5.4 3.2L9.1 3.6L12 1Z" fill="#22C55E"/>
        <path d="M8.5 12.5L10.5 14.5L15.5 9.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  );
}

function PhoneMockup() {
  const msgs = useMemo(() => [
    { from: "user" as const, text: "I have a sore throat, fever, and I feel weak. What should I do?" },
    { from: "laura" as const, text: "I can help. Based on what you've described, you may benefit from same-day clinical advice if the fever is persistent." },
    { from: "user" as const, text: "Can you book the earliest appointment near me?" },
    { from: "laura" as const, text: "Yes. Dr. Patel has a slot tomorrow at 9:30 AM. I've held it for 5 minutes. I can also guide you on what to do until then." },
  ], []);

  const [displayed, setDisplayed] = useState<string[]>(Array(msgs.length).fill(""));
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const current = msgs[activeIndex];
    if (!current) return;
    const shown = displayed[activeIndex] ?? "";
    let timer: number | undefined;
    if (shown.length < current.text.length) {
      timer = window.setTimeout(() => {
        setDisplayed((prev) => { const next = [...prev]; next[activeIndex] = current.text.slice(0, shown.length + 1); return next; });
      }, current.from === "user" ? 22 : 16);
    } else if (activeIndex < msgs.length - 1) {
      timer = window.setTimeout(() => setActiveIndex((p) => p + 1), 700);
    } else {
      timer = window.setTimeout(() => { setDisplayed(Array(msgs.length).fill("")); setActiveIndex(0); }, 2400);
    }
    return () => { if (timer) clearTimeout(timer); };
  }, [activeIndex, displayed, msgs]);

  function getStatus(i: number) {
    const done = displayed[i]?.length === msgs[i].text.length;
    if (!done) return "sending";
    if (i === 0) return activeIndex >= 1 ? "seen" : "delivered";
    if (i === 2) return (displayed[3]?.length === msgs[3].text.length) ? "seen" : "delivered";
    return "delivered";
  }

  return (
    <div className="phoneOuter">
      <motion.div className="phoneDevice" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
        <div className="phoneBezel">
          <div className="dynamicIsland"><div className="diCamera" /></div>
          <div className="phoneScreen">
            {/* Header */}
            <div className="chatHeader">
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div className="chatAvatar"><Image src="/laura-avatar.png" alt="Laura" fill sizes="40px" style={{ objectFit: "cover" }} /></div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <span style={{ fontSize: "15px", fontWeight: 700, color: c.text }}>Laura</span>
                    <VerifiedBadge />
                  </div>
                  <div className="chatOnline">
                    <motion.span animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.8, repeat: Infinity }} style={{ width: "6px", height: "6px", borderRadius: "999px", background: c.green, display: "inline-block" }} />
                    <span>online</span>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "16px" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B919F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" /></svg>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B919F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72"/></svg>
              </div>
            </div>

            {/* Encryption */}
            <div className="chatEncrypt">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="#92711A" stroke="none"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" fill="none" stroke="#92711A" strokeWidth="2"/></svg>
              Messages are end-to-end encrypted
            </div>

            {/* Messages */}
            <div className="chatBody">
              {msgs.map((msg, i) => {
                const text = displayed[i];
                if (!text) return null;
                const status = getStatus(i);
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.28 }} className={`chatRow ${msg.from === "user" ? "chatRowRight" : "chatRowLeft"}`}>
                    <div className={`chatBubble ${msg.from === "user" ? "bubbleUser" : "bubbleLaura"}`}>
                      {text}
                      <span className="bubbleMeta">
                        <span>9:{30 + i}</span>
                        {msg.from === "user" && (
                          <svg width="16" height="11" viewBox="0 0 20 14" fill="none">
                            <path d="M1.5 7.6L4.7 10.8L10.2 5.2" stroke={status === "seen" ? "#53BDEB" : "#8B919F"} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M7.3 7.6L10.5 10.8L18.2 3.2" stroke={status === "seen" ? "#53BDEB" : "#8B919F"} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Composer */}
            <div className="chatComposer">
              <div className="composerField">
                <span style={{ fontSize: "18px", opacity: 0.4 }}>😊</span>
                <span style={{ color: c.textMuted, fontSize: "14px", flex: 1 }}>Message</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B919F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg>
              </div>
              <div className="composerMic"><Mic size={18} color="#fff" strokeWidth={2.2} /></div>
            </div>
          </div>
        </div>

        <motion.div className="phoneCallout" animate={{ y: [0, -4, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "999px", background: c.green, display: "inline-block" }} />
          Voice + Chat + Triage
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LOGO MARQUEE — smooth, glass cards
   ═══════════════════════════════════════════════════════════════ */
function LogoMarquee() {
  const logos = [
    { name: "AWS", src: "/logos/aws-logo.png" },
    { name: "Microsoft", src: "/logos/microsoft-logo.png" },
    { name: "Google", src: "/logos/google-logo.png" },
    { name: "Salesforce", src: "/logos/salesforce-logo.png" },
    { name: "Twilio", src: "/logos/twilio-logo.png" },
    { name: "Epic", src: "/logos/epic-logo.png" },
    { name: "Veradigm", src: "/logos/veradigm-logo.png" },
    { name: "GitHub", src: "/logos/github-logo.png", blend: true },
  ];
  const doubled = useMemo(() => [...logos, ...logos], []);

  return (
    <div style={{ marginTop: "52px" }}>
      <p className="marqueeLabel">Designed for the systems behind modern care</p>
      <div className="marqueeViewport">
        <motion.div className="marqueeTrack" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 32, ease: "linear", repeat: Infinity }}>
          {doubled.map((logo, i) => (
            <motion.div key={`${logo.name}-${i}`} className="marqueeCard" whileHover={{ y: -3, scale: 1.02, transition: { duration: 0.2 } }}>
              <Image src={logo.src} alt={logo.name} width={130} height={40} className={`marqueeImg${logo.blend ? " marqueeBlend" : ""}`} />
            </motion.div>
          ))}
        </motion.div>
      </div>
      <p className="marqueeCaption">Representative platforms Omela is designed to work alongside.</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SDK TERMINAL — typewriter line-by-line
   ═══════════════════════════════════════════════════════════════ */
function SDKTerminal() {
  const lines = useMemo(() => [
    '$ npm install @omela/laura-sdk',
    '$ import { Laura } from "@omela/laura-sdk";',
    '',
    '  const laura = new Laura({',
    '    apiKey: process.env.OMELA_KEY,',
    '    region: "eu-west-2"',
    '  });',
    '',
    '  const response = await laura.chat({',
    '    userId: "patient_8291",',
    '    message: "I have a rash and headache."',
    '  });',
    '',
    '  → Laura is thinking...',
    '  ✔ Response generated in 1.2s',
  ], []);

  const [visibleLines, setVisibleLines] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (visibleLines >= lines.length) {
      const t = setTimeout(() => { setVisibleLines(0); setCharIndex(0); }, 3000);
      return () => clearTimeout(t);
    }
    const line = lines[visibleLines];
    if (charIndex < line.length) {
      const t = setTimeout(() => setCharIndex((p) => p + 1), line.startsWith("  →") ? 40 : 20);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => { setVisibleLines((p) => p + 1); setCharIndex(0); }, line === "" ? 80 : 200);
      return () => clearTimeout(t);
    }
  }, [visibleLines, charIndex, lines]);

  return (
    <div className="terminal">
      <div className="terminalTop">
        <div className="terminalDots"><span /><span /><span /></div>
        <span className="terminalTitle">Laura SDK — Terminal</span>
      </div>
      <div className="terminalBody">
        {lines.slice(0, visibleLines + 1).map((line, i) => {
          const active = i === visibleLines;
          const text = active ? line.slice(0, charIndex) : line;
          return (
            <div key={i} className="terminalLine" style={{ color: line.startsWith("  ✔") ? "#4ADE80" : line.startsWith("  →") ? "#FBBF24" : line.startsWith("$") ? "#E2E8F0" : "#94A3B8" }}>
              {text}
              {active && <span className="terminalCursor">▊</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TYPEWRITER PROMPTS
   ═══════════════════════════════════════════════════════════════ */
function TypewriterPrompts() {
  const prompts = useMemo(() => [
    "Can you help me understand what my symptoms might mean?",
    "Book the earliest available appointment near me.",
    "Can you explain this prescription in simpler language?",
  ], []);
  const [pi, setPi] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = prompts[pi];
    const speed = deleting ? 16 : 32;
    const timer = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, typed.length + 1);
        setTyped(next);
        if (next === current) setTimeout(() => setDeleting(true), 1200);
      } else {
        const next = current.slice(0, Math.max(0, typed.length - 1));
        setTyped(next);
        if (!next.length) { setDeleting(false); setPi((p) => (p + 1) % prompts.length); }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [typed, deleting, pi, prompts]);

  return (
    <div className="promptCard">
      <div className="promptLabel">Example prompts</div>
      <div className="promptBox">
        <span>{typed}</span>
        <span className="promptCursor">|</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SUCCESS MODAL
   ═══════════════════════════════════════════════════════════════ */
function getSuccessCopy(role: RoleKey) {
  const map = {
    patient: { eyebrow: "Early access confirmed", title: "You are in early.", body: "You are now on the Omela early access list. Laura will reach out as access opens. Follow us on X @joinomela for launch updates." },
    provider: { eyebrow: "Provider access confirmed", title: "Your place is reserved.", body: "You are now on the Omela provider list. Laura will reach out as live operations open. Follow us on X @joinomela." },
    developer: { eyebrow: "Developer access confirmed", title: "You are on the list.", body: "You are now on the Omela developer list. Laura will reach out as API access opens. Follow us on X @joinomela." },
  };
  return map[role];
}

function SuccessModal({ open, role, onClose }: { open: boolean; role: RoleKey; onClose: () => void }) {
  const copy = getSuccessCopy(role);
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="modalOverlay">
          <motion.div initial={{ opacity: 0, y: 16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.98 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }} onClick={(e) => e.stopPropagation()} className="modalContent">
            <div className="modalIcon"><svg width="26" height="26" viewBox="0 0 32 32" fill="none"><path d="M7 16.5L12.8 22L25 9.5" stroke={c.green} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
            <div className="modalEyebrow">{copy.eyebrow}</div>
            <h3 className="serif modalTitle">{copy.title}</h3>
            <p className="modalBody">{copy.body}</p>
            <div style={{ marginTop: "20px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a href="https://x.com/joinomela" target="_blank" rel="noreferrer" className="btnPrimary">Follow on X</a>
              <button type="button" className="btnSecondary" onClick={onClose}>Continue</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function Page() {
  const [role, setRole] = useState<RoleKey>("patient");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const audienceCards = [
    { title: "For people", desc: "Symptom guidance, health questions, care navigation, and booking support through natural conversation.", bullets: ["Symptom guidance", "Health questions", "Care navigation", "24/7 access"] },
    { title: "For providers", desc: "Reduce front desk load, guide intake, support appointment workflows, and improve multilingual access.", bullets: ["Voice & chat intake", "Scheduling support", "Triage routing", "Multilingual access"] },
    { title: "For developers", desc: "Embed Laura into apps, patient journeys, and health platforms through APIs, SDKs, and widgets.", bullets: ["API & SDK access", "Embeddable widgets", "Workflow triggers", "Secure audit logs"] },
  ];

  const workflowItems = [
    { title: "People ask Laura", body: "Users describe symptoms, ask questions, or request help with care access in natural language." },
    { title: "Laura guides the next step", body: "She provides structured guidance, routes intent, and supports booking or clinical navigation." },
    { title: "Care teams move faster", body: "Teams receive cleaner demand, better intake quality, and lower operational friction." },
  ];

  const devFeatures = ["REST API and SDK access", "Embeddable chat and voice widgets", "Patient workflow triggers", "Secure auth, logging, and audit trails"];

  const metrics = [
    { value: "24/7", label: "Always-on access" },
    { value: "40+", label: "Supported languages" },
    { value: "<2s", label: "Average response time" },
    { value: "3×", label: "Broader market reach" },
  ];

  const plans = [
    { name: "Public Access", price: "£3.99", period: "/mo", desc: "For people who want direct access to Laura for guidance and care navigation.", features: ["Symptom guidance", "Health questions", "Care navigation", "Booking support"], hl: false, cta: "Join waitlist" },
    { name: "Provider", price: "£1,250", period: "/mo", desc: "For clinics and practices using Laura in live operations.", features: ["Voice & chat intake", "Scheduling workflows", "Multilingual support", "Provider dashboard"], hl: true, badge: "Best for care teams", cta: "Request demo" },
    { name: "Developer", price: "Custom", period: "", desc: "For teams embedding Laura into products and platforms.", features: ["API & SDK access", "Embeddable components", "Usage analytics", "Technical onboarding"], hl: false, cta: "Talk to us" },
  ];

  const publicUseCases = [
    "Understand symptoms before deciding the next step",
    "Ask Laura everyday health questions in plain language",
    "Get help booking appointments and navigating services",
  ];

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!agreed) return;
    setSubmitting(true); setSuccess(""); setError("");
    try {
      const res = await fetch("/api/waitlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, role, website, source: "landing-page", marketingOptIn: false }) });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Something went wrong."); return; }
      setSuccess(data.message || "You are in."); setEmail(""); setRole("patient"); setWebsite(""); setAgreed(false); setModalOpen(true);
    } catch { setError("Something went wrong."); } finally { setSubmitting(false); }
  }

  return (
    <>
      <style>{FONT_IMPORT}</style>
      <style>{PAGE_CSS}</style>
      <SuccessModal open={modalOpen} role={role} onClose={() => setModalOpen(false)} />

      <div className="siteWrap">
        <StatusBar />

        {/* NAV */}
        <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="nav">
          <div className="container navInner">
            <div className="navBrand">
              <div className="navLogo"><Image src="/omela-logo-mark.png" alt="Omela" width={42} height={42} style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
              <div><div className="navBrandName">Omela</div><div className="navBrandSub serif">Powered by Laura</div></div>
            </div>
            <div className="navLinks">
              {["People", "Providers", "Developers", "Pricing"].map((item) => (<a key={item} href={`#${item.toLowerCase()}`} className="navLink">{item}</a>))}
            </div>
            <a href="#waitlist" className="btnPrimary navCta">Get early access <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg></a>
          </div>
        </motion.nav>

        {/* HERO */}
        <section className="heroSection">
          <div className="container">
            <div className="heroGrid">
              <div>
                <FadeIn><Pill><span className="greenDot" />Now onboarding patients, providers & developers</Pill></FadeIn>
                <FadeIn delay={0.06}><h1 className="serif heroTitle">The AI health agent<span className="heroAccent">for care, triage, and access.</span></h1></FadeIn>
                <FadeIn delay={0.12}><p className="heroBody">Laura gives people a clearer starting point, gives care teams faster intake and routing, and gives developers a care-ready AI layer for products and workflows.</p></FadeIn>
                <FadeIn delay={0.18}>
                  <div className="heroButtons">
                    <a href="#waitlist" className="btnPrimary">Get early access <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg></a>
                    <a href="#developers" className="btnSecondary">Explore developer tools</a>
                  </div>
                </FadeIn>
                <FadeIn delay={0.24}><HeroCapabilities /></FadeIn>
              </div>
              <PhoneMockup />
            </div>
            <FadeIn delay={0.3}><LogoMarquee /></FadeIn>
          </div>
        </section>

        {/* AUDIENCE */}
        <section className="section">
          <div className="container">
            <FadeIn><SectionHeading badge="Built for everyone" title={<>One platform. Three entry points.</>} body="Laura works as a direct health experience for the public, an operations layer for care teams, and an integration layer for digital health products." /></FadeIn>
            <div className="grid3" style={{ marginTop: "52px" }}>
              {audienceCards.map((card, i) => (
                <FadeIn key={card.title} delay={i * 0.1}>
                  <motion.div className="card" whileHover={{ y: -4, transition: { duration: 0.2 } }}>
                    <div className="cardNumber">{i + 1}</div>
                    <h3 className="cardTitle">{card.title}</h3>
                    <p className="cardBody">{card.desc}</p>
                    <div className="featureList">{card.bullets.map((b) => (<div key={b} className="featureRow"><CheckDot /><span>{b}</span></div>))}</div>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* PEOPLE */}
        <section id="people" className="section">
          <div className="container">
            <div className="grid2" style={{ alignItems: "center" }}>
              <FadeIn>
                <div>
                  <Pill>Laura for people</Pill>
                  <h2 className="serif" style={{ fontSize: "clamp(30px, 5vw, 52px)", lineHeight: 1.06, letterSpacing: "-0.04em", marginTop: "18px" }}>Healthcare guidance that starts with a conversation.</h2>
                  <p style={{ marginTop: "16px", color: c.textSub, fontSize: "17px", lineHeight: 1.84, maxWidth: "540px" }}>Ask questions in plain language, understand what may matter, get guided next steps, and move faster toward the right kind of care.</p>
                  <div className="featureList" style={{ marginTop: "24px" }}>{publicUseCases.map((item) => (<div key={item} className="featureRow"><CheckDot /><span>{item}</span></div>))}</div>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}><TypewriterPrompts /></FadeIn>
            </div>
          </div>
        </section>

        {/* WORKFLOW */}
        <section id="providers" className="section" style={{ paddingTop: "24px" }}>
          <div className="container">
            <FadeIn><SectionHeading badge="Workflow" title={<>A cleaner flow from demand to care.</>} body="Laura turns fragmented intake and requests into clearer action." /></FadeIn>
            <div className="workflowGrid">
              {workflowItems.map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.1}>
                  <motion.div className="workflowCard" whileHover={{ y: -3, transition: { duration: 0.2 } }}>
                    {i < workflowItems.length - 1 && <div className="workflowArrow"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c.textMuted} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg></div>}
                    <div className="workflowStep">Step {i + 1}</div>
                    <h3 className="workflowTitle">{item.title}</h3>
                    <p className="workflowBody">{item.body}</p>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* DEVELOPERS */}
        <section id="developers" className="sectionDark">
          <div className="container">
            <FadeIn><SectionHeading dark badge="Developer platform" title={<>Integrate Laura into your product in minutes.</>} body="Embed health guidance, conversational support, and care flows into apps and workflows." /></FadeIn>
            <div className="grid2" style={{ marginTop: "52px", alignItems: "center" }}>
              <FadeIn><SDKTerminal /></FadeIn>
              <FadeIn delay={0.1}>
                <div className="darkCard">
                  <h3 style={{ fontSize: "26px", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff" }}>Built for modern integration teams</h3>
                  <p style={{ marginTop: "14px", color: "rgba(255,255,255,0.6)", fontSize: "15px", lineHeight: 1.9 }}>Laura can be embedded into consumer health apps, marketplaces, internal tooling, and provider systems.</p>
                  <div className="featureList" style={{ marginTop: "22px" }}>{devFeatures.map((f) => (<div key={f} className="featureRow" style={{ color: "rgba(255,255,255,0.8)" }}><CheckDot dark /><span>{f}</span></div>))}</div>
                  <div className="darkPill">API, SDK, widget, and workflow ready</div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="section">
          <div className="container">
            <FadeIn><SectionHeading badge="Pricing" title={<>Simple access for everyone.</>} body="Start with the audience that matters now, then expand." /></FadeIn>
            <div className="grid3" style={{ marginTop: "52px" }}>
              {plans.map((plan, i) => (
                <FadeIn key={plan.name} delay={i * 0.1}>
                  <motion.div className={`card ${plan.hl ? "cardDark" : ""}`} whileHover={{ y: -4, transition: { duration: 0.2 } }} style={{ position: "relative" }}>
                    {plan.badge && <div className="pricingBadge">{plan.badge}</div>}
                    <div style={{ fontSize: "16px", fontWeight: 700 }}>{plan.name}</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginTop: "18px", flexWrap: "wrap" }}>
                      <span className="serif" style={{ fontSize: "46px", letterSpacing: "-0.05em" }}>{plan.price}</span>
                      {plan.period && <span style={{ fontSize: "14px", color: plan.hl ? "rgba(255,255,255,0.5)" : c.textMuted }}>{plan.period}</span>}
                    </div>
                    <p style={{ marginTop: "10px", color: plan.hl ? "rgba(255,255,255,0.6)" : c.textSub, fontSize: "14px", lineHeight: 1.8 }}>{plan.desc}</p>
                    <div style={{ marginTop: "22px", paddingTop: "20px", borderTop: `1px solid ${plan.hl ? c.borderDark : c.border}`, display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
                      {plan.features.map((f) => (<div key={f} className="featureRow" style={{ color: plan.hl ? "rgba(255,255,255,0.8)" : c.textSub }}><CheckDot dark={plan.hl} /><span>{f}</span></div>))}
                    </div>
                    <a href="#waitlist" className="btnPrimary" style={{ marginTop: "24px", width: "100%", background: plan.hl ? "#fff" : c.bgDark, color: plan.hl ? c.bgDark : "#fff", border: "none" }}>{plan.cta}</a>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* METRICS */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <FadeIn>
              <div className="metricsGrid">{metrics.map((m) => (<div key={m.label} className="metricCell"><div className="serif metricValue">{m.value}</div><div className="metricLabel">{m.label}</div></div>))}</div>
            </FadeIn>
          </div>
        </section>

        {/* WAITLIST */}
        <section id="waitlist" className="section">
          <div className="container">
            <FadeIn>
              <div className="waitlistCard">
                <SectionHeading badge="Get early access" title={<>Join the next wave of Laura users.</>} body="Choose how you want to use Laura. We will tailor the next step." />
                <form className="waitlistForm" onSubmit={handleSubmit}>
                  <input className="input" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
                  <select className="input" value={role} onChange={(e) => setRole(e.target.value as RoleKey)}>
                    <option value="patient">Patient</option><option value="provider">Provider</option><option value="developer">Developer</option>
                  </select>
                  <input type="text" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none", height: 0, width: 0 }} />
                  <button type="submit" className="btnPrimary" style={{ height: "56px" }} disabled={submitting || !agreed}>{submitting ? "Submitting..." : "Get early access"}</button>
                </form>
                <label className="privacyLabel">
                  <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} required className="privacyCheck" />
                  <span>I agree that Omela may use my information to manage my early access request. <a href="/privacy" className="privacyLink">Privacy Notice</a>.</span>
                </label>
                <p style={{ marginTop: "8px", textAlign: "center", color: c.textMuted, fontSize: "12px" }}>We will not sell your personal information.</p>
                {success && <div className="formSuccess">{success}</div>}
                {error && <div className="formError">{error}</div>}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="container footerInner">
            <div className="navBrand">
              <div className="navLogo" style={{ width: "34px", height: "34px" }}><Image src="/omela-logo-mark.png" alt="Omela" width={34} height={34} style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
              <div><div style={{ fontSize: "14px", fontWeight: 800 }}>Omela</div><div className="serif" style={{ fontSize: "12px", color: c.textMuted, fontStyle: "italic" }}>Powered by Laura</div></div>
            </div>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              {["Privacy Notice", "Terms", "Contact"].map((l) => (<a key={l} href="#" className="footerLink">{l}</a>))}
            </div>
            <p style={{ fontSize: "12px", color: c.textMuted }}>© 2026 Omela. Built for modern care access.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STYLES
   ═══════════════════════════════════════════════════════════════ */
const PAGE_CSS = `
* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
html, body { max-width: 100%; overflow-x: clip; }
body {
  background: ${c.bg};
  color: ${c.text};
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
}
a { color: inherit; text-decoration: none; }
button, input, select { font-family: inherit; }
::selection { background: ${c.accent}; color: #fff; }
@keyframes blink { 0%,50%{opacity:1} 50.01%,100%{opacity:0} }

.serif { font-family: 'Instrument Serif', Georgia, serif; }
.siteWrap { width: 100%; overflow-x: clip; }
.container { max-width: 1220px; margin: 0 auto; padding: 0 24px; }
.section { padding: 88px 0; }
.sectionDark { padding: 88px 0; background: radial-gradient(circle at 16% 20%, rgba(37,99,235,0.08) 0%, transparent 28%), ${c.bgDark}; color: #fff; }

/* STATUS */
.statusBar { background: ${c.greenSoft}; border-bottom: 1px solid rgba(34,197,94,0.15); padding: 10px 0; }
.statusBarInner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
.statusServices { display: flex; align-items: center; gap: 16px; }

/* PILL */
.pill { display: inline-flex; align-items: center; gap: 10px; padding: 10px 18px; border-radius: 999px; border: 1px solid ${c.border}; background: rgba(255,255,255,0.8); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); font-size: 13px; font-weight: 700; color: ${c.textSub}; box-shadow: 0 6px 20px rgba(0,0,0,0.03); }
.greenDot { width: 9px; height: 9px; border-radius: 999px; background: ${c.green}; display: inline-block; box-shadow: 0 0 8px rgba(34,197,94,0.3); }

/* BUTTONS */
.btnPrimary { display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: ${c.bgDark}; color: #fff; border: none; border-radius: 999px; padding: 14px 26px; font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.25s; }
.btnPrimary:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(0,0,0,0.15); background: #161820; }
.btnPrimary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }
.btnSecondary { display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: rgba(255,255,255,0.85); color: ${c.text}; border: 1px solid ${c.border}; border-radius: 999px; padding: 14px 26px; font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.25s; backdrop-filter: blur(10px); }
.btnSecondary:hover { background: #fff; border-color: #D0CBBD; }

/* NAV */
.nav { position: sticky; top: 0; z-index: 100; background: rgba(248,246,241,0.9); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border-bottom: 1px solid ${c.border}; }
.navInner { display: flex; align-items: center; justify-content: space-between; gap: 12px; height: 76px; }
.navBrand { display: flex; align-items: center; gap: 12px; min-width: 0; }
.navLogo { width: 42px; height: 42px; border-radius: 14px; overflow: hidden; flex-shrink: 0; box-shadow: 0 6px 18px rgba(0,0,0,0.06); }
.navBrandName { font-size: 16px; font-weight: 800; letter-spacing: -0.03em; }
.navBrandSub { font-size: 12px; color: ${c.textMuted}; font-style: italic; margin-top: 1px; }
.navLinks { display: flex; align-items: center; gap: 28px; }
.navLink { font-size: 14px; font-weight: 600; color: ${c.textSub}; transition: color 0.2s; }
.navLink:hover { color: ${c.text}; }
.navCta { padding: 12px 20px; flex-shrink: 0; }

/* HERO */
.heroSection { padding: 72px 0 48px; }
.heroGrid { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 48px; align-items: start; }
.heroTitle { font-size: clamp(48px, 7vw, 88px); line-height: 0.96; letter-spacing: -0.055em; margin-top: 22px; }
.heroAccent { color: ${c.accent}; font-style: italic; display: block; }
.heroBody { margin-top: 22px; font-size: 18px; line-height: 1.78; color: ${c.textSub}; max-width: 580px; }
.heroButtons { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 30px; }

/* CAPABILITY CARDS */
.capGrid { display: flex; flex-direction: column; gap: 12px; margin-top: 36px; }
.capCard { position: relative; border-radius: 20px; border: 1px solid ${c.border}; background: rgba(255,255,255,0.92); backdrop-filter: blur(12px); box-shadow: 0 10px 32px rgba(0,0,0,0.03); overflow: hidden; cursor: default; }
.capCardShimmer { position: absolute; inset: 0; background: linear-gradient(135deg, transparent 40%, rgba(37,99,235,0.03) 50%, transparent 60%); pointer-events: none; }
.capCardContent { position: relative; z-index: 2; display: flex; align-items: center; gap: 20px; padding: 22px 26px; }
.capCardTitle { font-size: 16px; font-weight: 800; letter-spacing: -0.02em; }
.capCardBody { font-size: 13px; line-height: 1.65; color: ${c.textSub}; margin-top: 3px; }
.capCardArrow { color: ${c.textMuted}; flex-shrink: 0; margin-left: auto; }
.capIconShell { position: relative; width: 52px; height: 52px; border-radius: 16px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; background: linear-gradient(180deg, #F5F8FF, #EAF0FF); border: 1px solid rgba(190,210,250,0.5); box-shadow: 0 8px 24px rgba(37,99,235,0.06); overflow: hidden; }
.capIconPulse { position: absolute; inset: 10px; border-radius: 12px; background: rgba(37,99,235,0.12); z-index: 1; }

/* PHONE */
.phoneOuter { display: flex; justify-content: center; padding-top: 8px; }
.phoneDevice { position: relative; width: min(100%, 380px); }
.phoneBezel { background: #1A1A1E; border-radius: 48px; padding: 10px; box-shadow: 0 0 0 1px rgba(255,255,255,0.06), 0 50px 100px rgba(0,0,0,0.16), 0 20px 40px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.06); }
.dynamicIsland { width: 126px; height: 34px; border-radius: 999px; background: #000; margin: 0 auto 8px; display: flex; align-items: center; justify-content: flex-end; padding-right: 20px; box-shadow: inset 0 0 4px rgba(0,0,0,0.5); }
.diCamera { width: 10px; height: 10px; border-radius: 999px; background: radial-gradient(circle, #1a2540 30%, #0a1025 100%); border: 1px solid rgba(255,255,255,0.08); }
.phoneScreen { background: #FAFAFA; border-radius: 40px; overflow: hidden; display: flex; flex-direction: column; }

.chatHeader { display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; background: #fff; border-bottom: 1px solid #f0f0f0; }
.chatAvatar { position: relative; width: 40px; height: 40px; border-radius: 999px; overflow: hidden; flex-shrink: 0; background: #E8EAF0; border: 2px solid #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
.chatOnline { display: flex; align-items: center; gap: 5px; font-size: 11px; color: ${c.green}; font-weight: 600; margin-top: 2px; }
.verifiedBadge { display: inline-flex; flex-shrink: 0; }
.chatEncrypt { display: flex; align-items: center; justify-content: center; gap: 6px; padding: 8px; background: #FFF8E1; font-size: 10px; color: #92711A; font-weight: 600; }
.chatBody { display: flex; flex-direction: column; gap: 8px; padding: 12px 10px; min-height: 360px; max-height: 360px; overflow: hidden; justify-content: flex-end; background: linear-gradient(180deg, #F5F5F0, #ECE5DA); background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23000' fill-opacity='.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); }
.chatRow { display: flex; }
.chatRowRight { justify-content: flex-end; }
.chatRowLeft { justify-content: flex-start; }
.chatBubble { max-width: 82%; padding: 9px 12px; font-size: 13px; line-height: 1.5; word-break: break-word; position: relative; }
.bubbleUser { background: #E7FFDB; color: #111; border-radius: 14px 14px 4px 14px; box-shadow: 0 1px 2px rgba(0,0,0,0.06); }
.bubbleLaura { background: #fff; color: #111; border-radius: 14px 14px 14px 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
.bubbleMeta { display: flex; align-items: center; gap: 4px; justify-content: flex-end; margin-top: 3px; font-size: 10px; color: #8B919F; font-weight: 500; }
.chatComposer { padding: 10px 10px 16px; display: flex; align-items: center; gap: 8px; background: #F0EBE3; }
.composerField { flex: 1; height: 42px; border-radius: 999px; background: #fff; border: none; display: flex; align-items: center; gap: 10px; padding: 0 14px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
.composerMic { width: 42px; height: 42px; border-radius: 999px; background: #25D366; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 2px 8px rgba(37,211,102,0.3); }
.phoneCallout { position: absolute; right: -12px; bottom: 32px; border-radius: 999px; background: rgba(255,255,255,0.95); border: 1px solid ${c.border}; padding: 12px 16px; color: ${c.textSub}; font-size: 13px; font-weight: 700; box-shadow: 0 12px 32px rgba(0,0,0,0.08); display: flex; align-items: center; gap: 8px; }

/* MARQUEE */
.marqueeLabel { text-align: center; font-size: 11px; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; color: ${c.textMuted}; margin-bottom: 20px; }
.marqueeViewport { overflow: hidden; mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent); -webkit-mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent); }
.marqueeTrack { display: flex; align-items: center; gap: 14px; width: max-content; }
.marqueeCard { display: flex; align-items: center; justify-content: center; min-width: 200px; height: 78px; border: 1px solid ${c.border}; background: rgba(255,255,255,0.9); border-radius: 18px; padding: 16px 20px; box-shadow: 0 8px 24px rgba(0,0,0,0.03); }
.marqueeImg { width: auto; max-width: 120px; height: auto; max-height: 30px; object-fit: contain; }
.marqueeBlend { mix-blend-mode: multiply; }
.marqueeCaption { margin-top: 14px; text-align: center; font-size: 13px; color: ${c.textMuted}; }

/* CARDS */
.grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
.grid2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; }
.card { background: rgba(255,255,255,0.92); border: 1px solid ${c.border}; border-radius: 26px; padding: 30px; min-width: 0; box-shadow: 0 12px 36px rgba(0,0,0,0.03); backdrop-filter: blur(10px); display: flex; flex-direction: column; }
.cardDark { background: linear-gradient(180deg, #111318, #0D0F14) !important; border: 1px solid ${c.borderDark} !important; color: #fff !important; box-shadow: 0 28px 72px rgba(0,0,0,0.2) !important; }
.cardNumber { width: 44px; height: 44px; border-radius: 14px; background: ${c.accentSoft}; color: ${c.accent}; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 800; }
.cardTitle { font-size: 22px; font-weight: 800; letter-spacing: -0.03em; margin-top: 16px; }
.cardBody { margin-top: 8px; color: ${c.textSub}; font-size: 15px; line-height: 1.78; }
.darkCard { background: linear-gradient(180deg, rgba(16,19,24,0.98), rgba(13,15,20,0.98)); border: 1px solid ${c.borderDark}; border-radius: 26px; padding: 32px; box-shadow: 0 24px 60px rgba(0,0,0,0.2); }
.darkPill { display: inline-flex; margin-top: 22px; padding: 10px 14px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.04); color: rgba(255,255,255,0.7); font-size: 13px; font-weight: 700; }
.featureList { display: flex; flex-direction: column; gap: 10px; margin-top: 16px; }
.featureRow { display: flex; align-items: flex-start; gap: 10px; font-size: 14px; line-height: 1.7; color: ${c.textSub}; }

/* WORKFLOW */
.workflowGrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 48px; }
.workflowCard { background: #fff; border: 1px solid ${c.border}; border-radius: 24px; padding: 26px; position: relative; box-shadow: 0 8px 24px rgba(0,0,0,0.03); }
.workflowArrow { position: absolute; top: 50%; right: -17px; transform: translateY(-50%); width: 34px; height: 34px; border-radius: 999px; background: #fff; border: 1px solid ${c.border}; display: flex; align-items: center; justify-content: center; z-index: 2; box-shadow: 0 4px 12px rgba(0,0,0,0.04); }
.workflowStep { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; color: ${c.textMuted}; }
.workflowTitle { margin-top: 10px; font-size: 20px; font-weight: 800; letter-spacing: -0.03em; }
.workflowBody { margin-top: 10px; color: ${c.textSub}; font-size: 14px; line-height: 1.8; }

/* TERMINAL */
.terminal { background: #07080B; border: 1px solid #1F2330; border-radius: 22px; overflow: hidden; box-shadow: 0 24px 60px rgba(0,0,0,0.25); }
.terminalTop { display: flex; align-items: center; gap: 12px; padding: 14px 18px; border-bottom: 1px solid #1B1F2B; background: #0E1118; }
.terminalDots { display: flex; gap: 7px; }
.terminalDots span { width: 10px; height: 10px; border-radius: 999px; display: inline-block; }
.terminalDots span:nth-child(1) { background: #FF5F57; }
.terminalDots span:nth-child(2) { background: #FEBC2E; }
.terminalDots span:nth-child(3) { background: #28C840; }
.terminalTitle { font-size: 12px; color: #6B7280; font-weight: 700; }
.terminalBody { padding: 20px; min-height: 300px; }
.terminalLine { white-space: pre-wrap; word-break: break-word; font-size: 13px; line-height: 1.85; font-family: 'SF Mono', ui-monospace, Menlo, Consolas, monospace; }
.terminalCursor { color: #60A5FA; animation: blink 0.8s step-end infinite; margin-left: 1px; }

/* PROMPTS */
.promptCard { border: 1px solid ${c.border}; background: #fff; border-radius: 26px; padding: 22px; box-shadow: 0 16px 40px rgba(0,0,0,0.04); }
.promptLabel { font-size: 11px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: ${c.textMuted}; margin-bottom: 14px; }
.promptBox { border: 1px solid ${c.border}; background: #FCFBF8; border-radius: 18px; min-height: 120px; padding: 20px; font-size: 17px; line-height: 1.7; color: ${c.text}; }
.promptCursor { color: ${c.accent}; animation: blink 1s step-end infinite; margin-left: 2px; }

/* PRICING */
.pricingBadge { position: absolute; top: 18px; right: 18px; border-radius: 999px; padding: 6px 12px; background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.75); font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; }

/* METRICS */
.metricsGrid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: ${c.border}; border: 1px solid ${c.border}; border-radius: 22px; overflow: hidden; }
.metricCell { background: #fff; padding: 30px 22px; text-align: center; }
.metricValue { font-size: 40px; letter-spacing: -0.05em; line-height: 1; }
.metricLabel { margin-top: 8px; font-size: 13px; color: ${c.textSub}; }

/* WAITLIST */
.waitlistCard { background: rgba(255,255,255,0.92); border: 1px solid ${c.border}; border-radius: 30px; padding: 36px; max-width: 920px; margin: 0 auto; box-shadow: 0 20px 56px rgba(0,0,0,0.04); backdrop-filter: blur(12px); }
.waitlistForm { display: grid; grid-template-columns: 1.2fr 0.8fr auto; gap: 12px; margin-top: 24px; }
.input { width: 100%; height: 56px; border-radius: 16px; border: 1px solid ${c.border}; background: #fff; padding: 0 16px; font-size: 15px; color: ${c.text}; outline: none; }
.input:focus { border-color: ${c.accent}; box-shadow: 0 0 0 4px rgba(37,99,235,0.06); }
.privacyLabel { display: flex; align-items: flex-start; gap: 10px; margin-top: 16px; color: ${c.textSub}; font-size: 13px; line-height: 1.7; cursor: pointer; justify-content: center; text-align: left; max-width: 700px; margin-left: auto; margin-right: auto; }
.privacyCheck { margin-top: 3px; width: 16px; height: 16px; accent-color: ${c.accent}; flex-shrink: 0; }
.privacyLink { color: ${c.text}; font-weight: 700; text-decoration: underline; text-underline-offset: 3px; }
.formSuccess { margin-top: 16px; border: 1px solid ${c.border}; background: ${c.greenSoft}; color: ${c.greenDark}; border-radius: 16px; padding: 14px 18px; text-align: center; font-size: 14px; font-weight: 600; }
.formError { margin-top: 16px; border: 1px solid ${c.border}; background: #FFF7F7; color: #B91C1C; border-radius: 16px; padding: 14px 18px; text-align: center; font-size: 14px; font-weight: 600; }

/* MODAL */
.modalOverlay { position: fixed; inset: 0; z-index: 220; background: rgba(9,10,13,0.4); backdrop-filter: blur(12px); display: flex; align-items: center; justify-content: center; padding: 20px; }
.modalContent { width: 100%; max-width: 540px; background: rgba(255,255,255,0.94); border: 1px solid ${c.border}; border-radius: 28px; padding: 30px; box-shadow: 0 40px 100px rgba(0,0,0,0.18); }
.modalIcon { width: 56px; height: 56px; border-radius: 18px; background: linear-gradient(180deg, #F7FBFF, ${c.accentSoft}); border: 1px solid ${c.border}; display: flex; align-items: center; justify-content: center; }
.modalEyebrow { margin-top: 16px; font-size: 11px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: ${c.textMuted}; }
.modalTitle { font-size: clamp(28px, 4vw, 40px); line-height: 1.04; letter-spacing: -0.04em; margin-top: 8px; }
.modalBody { margin-top: 12px; color: ${c.textSub}; font-size: 15px; line-height: 1.8; }

/* FOOTER */
.footer { border-top: 1px solid ${c.border}; padding: 32px 0 42px; }
.footerInner { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; }
.footerLink { font-size: 13px; color: ${c.textMuted}; font-weight: 600; transition: color 0.2s; }
.footerLink:hover { color: ${c.text}; }

/* RESPONSIVE */
@media (max-width: 1100px) { .heroGrid { grid-template-columns: 1fr; gap: 40px; } }
@media (max-width: 960px) { .grid3, .workflowGrid { grid-template-columns: 1fr; } .grid2 { grid-template-columns: 1fr; } .workflowArrow { display: none; } .metricsGrid { grid-template-columns: repeat(2, 1fr); } .waitlistForm { grid-template-columns: 1fr; } .statusServices { display: none; } }
@media (max-width: 680px) { .navLinks { display: none !important; } .heroTitle { font-size: clamp(40px, 12vw, 60px); } .heroButtons { flex-direction: column; } .btnPrimary, .btnSecondary { width: 100%; } .capCardContent { flex-direction: column; align-items: flex-start; } .capCardArrow { display: none; } .phoneCallout { position: static; margin: 12px auto 0; width: fit-content; } .metricsGrid { grid-template-columns: 1fr; } .container { padding: 0 16px; } .marqueeCard { min-width: 170px; height: 70px; } }
`;
