"use client";

import Image from "next/image";
import Link from "next/link";
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

/* ═══════════════════════════════════════════════════
   FONTS
   ═══════════════════════════════════════════════════ */
const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');
`;

/* ═══════════════════════════════════════════════════
   TOKENS
   ═══════════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════════
   PRIMITIVES
   ═══════════════════════════════════════════════════ */
type RoleKey = "patient" | "provider" | "developer";

function FadeIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

function Pill({ children, animated = false }: { children: ReactNode; animated?: boolean }) {
  return (
    <div className={`pill${animated ? " pillAnimated" : ""}`}>
      {animated && <span className="pillShine" />}
      <span style={{ position: "relative", zIndex: 2, display: "inline-flex", alignItems: "center", gap: "10px" }}>{children}</span>
    </div>
  );
}

function SectionHeading({ badge, title, body, dark = false }: { badge?: string; title: ReactNode; body?: string; dark?: boolean }) {
  return (
    <div style={{ textAlign: "center", maxWidth: "780px", margin: "0 auto" }}>
      {badge && <Pill>{badge}</Pill>}
      <h2 className="serif" style={{ fontSize: "clamp(28px, 5vw, 56px)", lineHeight: 1.04, letterSpacing: "-0.045em", marginTop: badge ? "20px" : 0, color: dark ? "#fff" : c.text }}>{title}</h2>
      {body && <p style={{ fontSize: "clamp(15px, 2.5vw, 17px)", lineHeight: 1.82, color: dark ? "rgba(255,255,255,0.6)" : c.textSub, marginTop: "16px", maxWidth: "600px", margin: "16px auto 0" }}>{body}</p>}
    </div>
  );
}

function CheckDot({ dark = false }: { dark?: boolean }) {
  return (
    <span className={`checkDot${dark ? " checkDotDark" : ""}`}>✓</span>
  );
}

/* ═══════════════════════════════════════════════════
   STATUS BAR
   ═══════════════════════════════════════════════════ */
function StatusBar() {
  const services = ["Chat Engine", "Triage", "Scheduling", "Translation"];
  return (
    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="statusBar">
      <div className="container statusBarInner">
        <div className="statusLeft">
          <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="statusDot" />
          <span className="statusLabel">All systems operational</span>
        </div>
        <div className="statusRight">
          {services.map((s) => (
            <span key={s} className="statusService">
              <span className="statusServiceDot" />
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   HERO CAPABILITY CARDS
   ═══════════════════════════════════════════════════ */
function CapabilityIcon({ type }: { type: "voice" | "heart" | "infra" }) {
  const Icon = type === "voice" ? Mic : type === "heart" ? Heart : Blocks;
  return (
    <div className="capIconShell">
      <motion.span className="capIconPulse" animate={{ scale: [1, 1.25, 1], opacity: [0.15, 0.35, 0.15] }} transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: type === "heart" ? 0.3 : type === "infra" ? 0.6 : 0 }} />
      <motion.div animate={type === "voice" ? { y: [0, -3, 0] } : type === "heart" ? { scale: [1, 1.1, 0.96, 1.08, 1] } : { rotate: [0, 5, 0, -5, 0] }} transition={{ duration: type === "heart" ? 1.8 : 2.8, repeat: Infinity, ease: "easeInOut" }} style={{ position: "relative", zIndex: 2 }}>
        <Icon size={22} strokeWidth={2} color={c.accent} />
      </motion.div>
    </div>
  );
}

function HeroCapabilities() {
  const cards = [
    { type: "voice" as const, title: "Text & chat ready", body: "Multilingual care access through natural conversation with clinical-grade understanding." },
    { type: "heart" as const, title: "Care navigation", body: "Guides people toward the right next step with structured intake and smart urgency routing." },
    { type: "infra" as const, title: "Provider discovery", body: "Finds nearby GP and dental providers, supports callback requests, and hands off to booking." },
  ];
  return (
    <div className="capGrid">
      {cards.map((card, i) => (
        <motion.div key={card.title} className="capCard" initial={{ opacity: 0, y: 36, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }} whileHover={{ y: -5, boxShadow: "0 28px 64px rgba(0,0,0,0.07)", transition: { duration: 0.22 } }}>
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

/* ═══════════════════════════════════════════════════
   PHONE MOCKUP
   ═══════════════════════════════════════════════════ */
function VerifiedBadge() {
  return (
    <span className="verifiedBadge">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 1L14.9 3.6L18.6 3.2L19.4 6.8L22.5 8.7L21.2 12.2L22.5 15.7L19.4 17.6L18.6 21.2L14.9 20.8L12 23.4L9.1 20.8L5.4 21.2L4.6 17.6L1.5 15.7L2.8 12.2L1.5 8.7L4.6 6.8L5.4 3.2L9.1 3.6L12 1Z" fill="#22C55E"/>
        <path d="M8.5 12.5L10.5 14.5L15.5 9.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  );
}

function PhoneMockup() {
  const msgs = useMemo(() => [
    { from: "user" as const, text: "I have a sore throat, fever, and I feel weak. What should I do?" },
    { from: "laura" as const, text: "I can help. Based on what you've described, you may benefit from same-day clinical advice if the fever is persistent." },
    { from: "user" as const, text: "Can you find a GP near me?" },
    { from: "laura" as const, text: "Yes. I found 3 GP practices near your postcode. The nearest has availability tomorrow at 9:30 AM. Shall I request a callback?" },
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
            <div className="chatHeader">
              <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
                <div className="chatAvatar"><Image src="/laura-avatar.png" alt="Laura" fill sizes="38px" style={{ objectFit: "cover" }} /></div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <span style={{ fontSize: "14px", fontWeight: 700, color: c.text }}>Laura</span>
                    <VerifiedBadge />
                  </div>
                  <div className="chatOnline">
                    <motion.span animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.8, repeat: Infinity }} className="chatOnlineDot" />
                    <span>online</span>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "14px", flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B919F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" /></svg>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B919F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72"/></svg>
              </div>
            </div>
            <div className="chatEncrypt">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="#92711A" stroke="none"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" fill="none" stroke="#92711A" strokeWidth="2"/></svg>
              Messages are end-to-end encrypted
            </div>
            <div className="chatBody">
              {msgs.map((msg, i) => {
                const text = displayed[i];
                if (!text) return null;
                const status = getStatus(i);
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.28 }} className={`chatRow ${msg.from === "user" ? "chatRowR" : "chatRowL"}`}>
                    <div className={`chatBubble ${msg.from === "user" ? "bubbleU" : "bubbleL"}`}>
                      {text}
                      <span className="bubbleMeta">
                        <span>9:{30 + i}</span>
                        {msg.from === "user" && (
                          <svg width="14" height="10" viewBox="0 0 20 14" fill="none">
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
            <div className="chatComposer">
              <div className="composerField">
                <span style={{ fontSize: "16px", opacity: 0.4 }}>😊</span>
                <span style={{ color: c.textMuted, fontSize: "13px", flex: 1 }}>Message</span>
              </div>
              <div className="composerMic"><Mic size={16} color="#fff" strokeWidth={2.2} /></div>
            </div>
          </div>
        </div>
        <motion.div className="phoneCallout" animate={{ y: [0, -4, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
          <span className="statusServiceDot" />
          Chat + Triage + Routing
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   LOGO MARQUEE
   ═══════════════════════════════════════════════════ */
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
    <div className="marqueeSection">
      <p className="marqueeLabel">Designed for the systems behind modern care</p>
      <div className="marqueeViewport">
        <motion.div className="marqueeTrack" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 32, ease: "linear", repeat: Infinity }}>
          {doubled.map((logo, i) => (
            <div key={`${logo.name}-${i}`} className="marqueeCard">
              <Image src={logo.src} alt={logo.name} width={120} height={36} className={`marqueeImg${logo.blend ? " marqueeBlend" : ""}`} />
            </div>
          ))}
        </motion.div>
      </div>
      <p className="marqueeCaption">Representative platforms Omela is designed to work alongside.</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SDK TERMINAL — typewriter
   ═══════════════════════════════════════════════════ */
function SDKTerminal() {
  const lines = useMemo(() => [
    '$ npm install @omela/laura-sdk',
    '$ import { Laura } from "@omela/laura-sdk";',
    '', '  const laura = new Laura({', '    apiKey: process.env.OMELA_KEY,', '    region: "eu-west-2"', '  });',
    '', '  const res = await laura.chat({', '    userId: "patient_8291",', '    message: "I have a rash."', '  });',
    '', '  → Laura is thinking...', '  ✔ Response in 1.2s',
  ], []);
  const [vl, setVl] = useState(0);
  const [ci, setCi] = useState(0);
  useEffect(() => {
    if (vl >= lines.length) { const t = setTimeout(() => { setVl(0); setCi(0); }, 3000); return () => clearTimeout(t); }
    const line = lines[vl];
    if (ci < line.length) { const t = setTimeout(() => setCi((p) => p + 1), line.startsWith("  →") ? 40 : 20); return () => clearTimeout(t); }
    else { const t = setTimeout(() => { setVl((p) => p + 1); setCi(0); }, line === "" ? 80 : 200); return () => clearTimeout(t); }
  }, [vl, ci, lines]);
  return (
    <div className="terminal">
      <div className="terminalTop">
        <div className="terminalDots"><span /><span /><span /></div>
        <span className="terminalTitle">Laura SDK</span>
      </div>
      <div className="terminalBody">
        {lines.slice(0, vl + 1).map((line, i) => {
          const active = i === vl;
          return (
            <div key={i} className="terminalLine" style={{ color: line.startsWith("  ✔") ? "#4ADE80" : line.startsWith("  →") ? "#FBBF24" : line.startsWith("$") ? "#E2E8F0" : "#94A3B8" }}>
              {active ? line.slice(0, ci) : line}
              {active && <span className="terminalCursor">▊</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   TYPEWRITER PROMPTS
   ═══════════════════════════════════════════════════ */
function TypewriterPrompts() {
  const prompts = useMemo(() => [
    "Can you help me understand what my symptoms might mean?",
    "Find a GP near me for tomorrow morning.",
    "Can you explain this prescription in simpler language?",
  ], []);
  const [pi, setPi] = useState(0);
  const [typed, setTyped] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = prompts[pi]; const speed = del ? 16 : 32;
    const t = setTimeout(() => {
      if (!del) { const n = cur.slice(0, typed.length + 1); setTyped(n); if (n === cur) setTimeout(() => setDel(true), 1200); }
      else { const n = cur.slice(0, Math.max(0, typed.length - 1)); setTyped(n); if (!n.length) { setDel(false); setPi((p) => (p + 1) % prompts.length); } }
    }, speed);
    return () => clearTimeout(t);
  }, [typed, del, pi, prompts]);
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

/* ═══════════════════════════════════════════════════
   SUCCESS MODAL
   ═══════════════════════════════════════════════════ */
function SuccessModal({ open, role, onClose }: { open: boolean; role: RoleKey; onClose: () => void }) {
  const map = {
    patient: { ey: "Early access confirmed", t: "You are in early.", b: "Laura will reach out as access opens. Follow us on X @joinomela." },
    provider: { ey: "Provider access confirmed", t: "Your place is reserved.", b: "Laura will reach out as live operations open. Follow @joinomela." },
    developer: { ey: "Developer access confirmed", t: "You are on the list.", b: "Laura will reach out as API access opens. Follow @joinomela." },
  };
  const copy = map[role];
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="modalOverlay">
          <motion.div initial={{ opacity: 0, y: 16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.98 }} onClick={(e) => e.stopPropagation()} className="modalContent">
            <div className="modalIcon"><svg width="26" height="26" viewBox="0 0 32 32" fill="none"><path d="M7 16.5L12.8 22L25 9.5" stroke={c.green} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
            <div className="modalEyebrow">{copy.ey}</div>
            <h3 className="serif modalTitle">{copy.t}</h3>
            <p className="modalBody">{copy.b}</p>
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

/* ═══════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════ */
export default function Page() {
  const [role, setRole] = useState<RoleKey>("patient");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  /* Copy aligned to roadmap — no overpromising */
  const audienceCards = [
    { title: "For people", desc: "Describe your concern in natural language and Laura helps you understand next steps, find nearby providers, and request a callback.", bullets: ["Symptom guidance", "Urgency routing", "Provider discovery", "Callback requests"] },
    { title: "For providers", desc: "Receive structured intake, see urgency bands, manage callback requests, and review patient needs from a clean admin dashboard.", bullets: ["Structured intake", "Urgency bands", "Request management", "Multilingual access"] },
    { title: "For developers", desc: "Embed Laura into apps and patient journeys through APIs and SDKs as the platform scales beyond version one.", bullets: ["API access (roadmap)", "Embeddable widgets", "Workflow triggers", "Secure audit logs"] },
  ];

  const workflowItems = [
    { title: "People describe their concern", body: "Users explain symptoms or ask health questions in their preferred language." },
    { title: "Laura routes and guides", body: "She applies urgency bands, finds nearby GP or dental providers, and offers next steps." },
    { title: "Care teams receive clean requests", body: "Callback requests arrive structured with urgency, language, and summary context." },
  ];

  const devFeatures = ["REST API and SDK access", "Embeddable chat widgets", "Patient workflow triggers", "Secure auth and audit trails"];

  const metrics = [
    { value: "24/7", label: "Always-on access" },
    { value: "40+", label: "Supported languages" },
    { value: "<2s", label: "Average response time" },
    { value: "Text first", label: "Chat-led care access" },
  ];

  const plans = [
    { name: "Public Access", price: "£3.99", period: "/mo", desc: "For people who want direct access to Laura for care guidance and provider discovery.", features: ["Symptom guidance", "Urgency routing", "GP & dental discovery", "Callback requests"], hl: false, cta: "Join waitlist" },
    { name: "Provider", price: "£1,999.99", period: "/mo", desc: "For clinics and practices using Laura to manage intake and access.", features: ["Structured intake", "Admin dashboard", "Multilingual support", "Request management"], hl: true, badge: "Best for care teams", cta: "Request demo" },
    { name: "Developer", price: "Custom", period: "", desc: "For teams planning to embed Laura into their products.", features: ["API access (roadmap)", "Embeddable components", "Usage analytics", "Technical onboarding"], hl: false, cta: "Talk to us" },
  ];

  const publicUseCases = [
    "Describe symptoms and get structured guidance",
    "Find nearby GP or dental practices by postcode",
    "Request a callback or booking handoff",
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
      <style>{CSS}</style>
      <SuccessModal open={modalOpen} role={role} onClose={() => setModalOpen(false)} />

      <div className="siteWrap">
        <StatusBar />

        {/* NAV */}
        <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="nav">
          <div className="container navInner">
            <Link href="/" className="navBrand">
              <div className="navLogo"><Image src="/omela-logo-mark.png" alt="Omela" width={40} height={40} style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
              <div className="navBrandText">
                <div className="navBrandName">Omela</div>
                <div className="navBrandSub serif">Powered by Laura</div>
              </div>
            </Link>
            <div className="navLinks">
              {["People", "Providers", "Developers", "Pricing"].map((item) => (<a key={item} href={`#${item.toLowerCase()}`} className="navLink">{item}</a>))}
            </div>
            <a href="#waitlist" className="btnPrimary navCta">
              <span className="navCtaFull">Get early access</span>
              <span className="navCtaShort">Early access</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </a>
          </div>
        </motion.nav>

        {/* HERO */}
        <section className="heroSection">
          <div className="container">
            <div className="heroGrid">
              <div>
                <FadeIn>
                  <Pill animated>
                    <span className="greenDot" />
                    <span>Now onboarding early access users</span>
                  </Pill>
                </FadeIn>
                <FadeIn delay={0.06}><h1 className="serif heroTitle">The AI front door<span className="heroAccent">for care access and triage.</span></h1></FadeIn>
                <FadeIn delay={0.12}><p className="heroBody">Laura helps people describe symptoms, find nearby providers, and request callbacks — giving care teams cleaner intake and faster routing from the first interaction.</p></FadeIn>
                <FadeIn delay={0.18}>
                  <div className="heroButtons">
                    <a href="#waitlist" className="btnPrimary heroBtn">Get early access <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg></a>
                    <a href="#developers" className="btnSecondary heroBtn">Explore developer tools</a>
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
            <FadeIn><SectionHeading badge="Built for everyone" title={<>One platform. Three entry points.</>} body="Laura works as a care-access experience for people, an intake layer for providers, and a future integration layer for developers." /></FadeIn>
            <div className="grid3" style={{ marginTop: "48px" }}>
              {audienceCards.map((card, i) => (
                <FadeIn key={card.title} delay={i * 0.1}>
                  <div className="card">
                    <div className="cardNumber">{i + 1}</div>
                    <h3 className="cardTitle">{card.title}</h3>
                    <p className="cardBody">{card.desc}</p>
                    <div className="featureList">{card.bullets.map((b) => (<div key={b} className="featureRow"><CheckDot /><span>{b}</span></div>))}</div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* PEOPLE */}
        <section id="people" className="section">
          <div className="container">
            <div className="grid2a">
              <FadeIn>
                <div>
                  <Pill>Laura for people</Pill>
                  <h2 className="serif sectionTitle2">Healthcare guidance that starts with a conversation.</h2>
                  <p className="sectionBody2">Describe your concern in plain language, get structured guidance, find nearby GP or dental providers by postcode, and request a callback — all without waiting on hold.</p>
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
            <FadeIn><SectionHeading badge="Workflow" title={<>A cleaner flow from demand to care.</>} body="Laura turns fragmented intake and requests into structured, actionable information for care teams." /></FadeIn>
            <div className="workflowGrid">
              {workflowItems.map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.1}>
                  <div className="workflowCard">
                    {i < workflowItems.length - 1 && <div className="workflowArrow"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c.textMuted} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg></div>}
                    <div className="workflowStep">Step {i + 1}</div>
                    <h3 className="workflowTitle">{item.title}</h3>
                    <p className="workflowBody">{item.body}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* DEVELOPERS */}
        <section id="developers" className="sectionDark">
          <div className="container">
            <FadeIn><SectionHeading dark badge="Developer platform" title={<>Integrate Laura into your product.</>} body="Embed care access, conversational triage, and provider routing into apps and workflows as the platform scales." /></FadeIn>
            <div className="grid2a" style={{ marginTop: "48px" }}>
              <FadeIn><SDKTerminal /></FadeIn>
              <FadeIn delay={0.1}>
                <div className="darkCard">
                  <h3 style={{ fontSize: "clamp(20px, 3vw, 26px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff" }}>Built for integration teams</h3>
                  <p style={{ marginTop: "14px", color: "rgba(255,255,255,0.6)", fontSize: "15px", lineHeight: 1.9 }}>Laura can be embedded into health apps, patient journeys, and internal tooling.</p>
                  <div className="featureList" style={{ marginTop: "22px" }}>{devFeatures.map((f) => (<div key={f} className="featureRow" style={{ color: "rgba(255,255,255,0.8)" }}><CheckDot dark /><span>{f}</span></div>))}</div>
                  <div className="darkPill">API, SDK, and widget access on the roadmap</div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="section">
          <div className="container">
            <FadeIn><SectionHeading badge="Pricing" title={<>Simple access for everyone.</>} body="Start with the audience that matters now, then expand." /></FadeIn>
            <div className="grid3" style={{ marginTop: "48px" }}>
              {plans.map((plan, i) => (
                <FadeIn key={plan.name} delay={i * 0.1}>
                  <div className={`card ${plan.hl ? "cardDark" : ""}`} style={{ position: "relative" }}>
                    {plan.badge && <div className="pricingBadge">{plan.badge}</div>}
                    <div style={{ fontSize: "15px", fontWeight: 700 }}>{plan.name}</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginTop: "16px", flexWrap: "wrap" }}>
                      <span className="serif" style={{ fontSize: "clamp(34px, 5vw, 46px)", letterSpacing: "-0.05em" }}>{plan.price}</span>
                      {plan.period && <span style={{ fontSize: "14px", color: plan.hl ? "rgba(255,255,255,0.5)" : c.textMuted }}>{plan.period}</span>}
                    </div>
                    <p style={{ marginTop: "10px", color: plan.hl ? "rgba(255,255,255,0.6)" : c.textSub, fontSize: "14px", lineHeight: 1.8 }}>{plan.desc}</p>
                    <div style={{ marginTop: "20px", paddingTop: "18px", borderTop: `1px solid ${plan.hl ? c.borderDark : c.border}`, display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                      {plan.features.map((f) => (<div key={f} className="featureRow" style={{ color: plan.hl ? "rgba(255,255,255,0.8)" : c.textSub }}><CheckDot dark={plan.hl} /><span>{f}</span></div>))}
                    </div>
                    <a href="#waitlist" className="btnPrimary" style={{ marginTop: "22px", width: "100%", background: plan.hl ? "#fff" : c.bgDark, color: plan.hl ? c.bgDark : "#fff", border: "none" }}>{plan.cta}</a>
                  </div>
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
                  <button type="submit" className="btnPrimary waitlistBtn" disabled={submitting || !agreed}>{submitting ? "Submitting..." : "Get early access"}</button>
                </form>
                <label className="privacyLabel">
                  <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} required className="privacyCheck" />
                  <span>I agree that Omela may use my information to manage my early access request. <Link href="/privacy" className="privacyLink">Privacy Notice</Link>.</span>
                </label>
                <p className="privacyNote">We will not sell your personal information.</p>
                {success && <div className="formSuccess">{success}</div>}
                {error && <div className="formError">{error}</div>}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* IMPORTANT: Not a substitute for emergency care */}
        <section style={{ padding: "0 0 40px" }}>
          <div className="container">
            <div className="emergencyNotice">
              Laura is an AI care-access assistant for triage support, provider discovery, and navigation. She is not a substitute for emergency services or clinical diagnosis. If you believe you are experiencing an emergency, contact emergency services immediately.
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="container footerInner">
            <Link href="/" className="navBrand">
              <div className="navLogo" style={{ width: "32px", height: "32px" }}><Image src="/omela-logo-mark.png" alt="Omela" width={32} height={32} style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
              <div><div style={{ fontSize: "13px", fontWeight: 800 }}>Omela</div><div className="serif" style={{ fontSize: "11px", color: c.textMuted, fontStyle: "italic" }}>Powered by Laura</div></div>
            </Link>
            <div className="footerLinks">
              <Link href="/privacy" className="footerLink">Privacy Notice</Link>
              <Link href="/terms" className="footerLink">Terms</Link>
              <a href="mailto:notice@omela.ai" className="footerLink">Contact</a>
            </div>
            <p className="footerCopy">© 2026 Omela. Built for modern care access.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════
   CSS — mobile-first, thoroughly responsive
   ═══════════════════════════════════════════════════ */
const CSS = `
* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
html, body { max-width: 100%; overflow-x: clip; }
body { background: ${c.bg}; color: ${c.text}; font-family: 'DM Sans', -apple-system, sans-serif; -webkit-font-smoothing: antialiased; }
a { color: inherit; text-decoration: none; }
button, input, select { font-family: inherit; }
::selection { background: ${c.accent}; color: #fff; }
@keyframes blink { 0%,50%{opacity:1} 50.01%,100%{opacity:0} }
@keyframes pillShine {
  0% { transform: translateX(-100%) skewX(-15deg); }
  100% { transform: translateX(200%) skewX(-15deg); }
}

.serif { font-family: 'Instrument Serif', Georgia, serif; }
.siteWrap { width: 100%; overflow-x: clip; }
.container { max-width: 1220px; margin: 0 auto; padding: 0 16px; }
.section { padding: 64px 0; }
.sectionDark { padding: 64px 0; background: radial-gradient(circle at 16% 20%, rgba(37,99,235,0.08) 0%, transparent 28%), ${c.bgDark}; color: #fff; }

/* STATUS BAR — visible on mobile too */
.statusBar { background: ${c.greenSoft}; border-bottom: 1px solid rgba(34,197,94,0.15); padding: 8px 0; }
.statusBarInner { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.statusLeft { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
.statusDot { width: 8px; height: 8px; border-radius: 999px; background: ${c.green}; display: inline-block; box-shadow: 0 0 8px ${c.green}44; }
.statusLabel { font-size: 12px; font-weight: 700; color: ${c.greenDark}; white-space: nowrap; }
.statusRight { display: flex; align-items: center; gap: 10px; overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none; flex-shrink: 1; min-width: 0; }
.statusRight::-webkit-scrollbar { display: none; }
.statusService { font-size: 11px; color: ${c.textMuted}; font-weight: 600; display: flex; align-items: center; gap: 4px; white-space: nowrap; }
.statusServiceDot { width: 5px; height: 5px; border-radius: 999px; background: ${c.green}; display: inline-block; flex-shrink: 0; }

/* PILL */
.pill { display: inline-flex; align-items: center; gap: 10px; padding: 9px 16px; border-radius: 999px; border: 1px solid ${c.border}; background: rgba(255,255,255,0.8); backdrop-filter: blur(12px); font-size: 13px; font-weight: 700; color: ${c.textSub}; box-shadow: 0 6px 20px rgba(0,0,0,0.03); position: relative; overflow: hidden; }
.pillAnimated { border-color: rgba(37,99,235,0.15); background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(236,242,255,0.6)); }
.pillShine { position: absolute; top: 0; left: 0; width: 60%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent); animation: pillShine 3s ease-in-out infinite; }
.greenDot { width: 9px; height: 9px; border-radius: 999px; background: ${c.green}; display: inline-block; box-shadow: 0 0 8px rgba(34,197,94,0.3); flex-shrink: 0; }

/* CHECK DOT */
.checkDot { width: 20px; height: 20px; border-radius: 999px; background: ${c.greenSoft}; color: ${c.green}; display: inline-flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 800; flex-shrink: 0; margin-top: 1px; }
.checkDotDark { background: rgba(34,197,94,0.12); color: #4ADE80; }

/* BUTTONS */
.btnPrimary { display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: ${c.bgDark}; color: #fff; border: none; border-radius: 999px; padding: 13px 24px; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.25s; white-space: nowrap; }
.btnPrimary:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(0,0,0,0.15); background: #161820; }
.btnPrimary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }
.btnSecondary { display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: rgba(255,255,255,0.85); color: ${c.text}; border: 1px solid ${c.border}; border-radius: 999px; padding: 13px 24px; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.25s; white-space: nowrap; }
.btnSecondary:hover { background: #fff; }

/* NAV — fixed mobile sizing */
.nav { position: sticky; top: 0; z-index: 100; background: rgba(248,246,241,0.92); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border-bottom: 1px solid ${c.border}; }
.navInner { display: flex; align-items: center; justify-content: space-between; gap: 12px; height: 64px; }
.navBrand { display: flex; align-items: center; gap: 10px; min-width: 0; text-decoration: none; flex-shrink: 0; }
.navLogo { width: 38px; height: 38px; border-radius: 12px; overflow: hidden; flex-shrink: 0; box-shadow: 0 4px 14px rgba(0,0,0,0.06); }
.navBrandText { min-width: 0; }
.navBrandName { font-size: 15px; font-weight: 800; letter-spacing: -0.03em; }
.navBrandSub { font-size: 11px; color: ${c.textMuted}; font-style: italic; margin-top: 1px; }
.navLinks { display: flex; align-items: center; gap: 24px; }
.navLink { font-size: 13px; font-weight: 600; color: ${c.textSub}; transition: color 0.2s; }
.navLink:hover { color: ${c.text}; }
/* Nav CTA: compact, never full-width */
.navCta { padding: 10px 18px !important; font-size: 13px !important; flex-shrink: 0; max-width: none; width: auto !important; }
.navCtaShort { display: none; }

/* HERO */
.heroSection { padding: 48px 0 32px; }
.heroGrid { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 40px; align-items: start; }
.heroTitle { font-size: clamp(36px, 6.5vw, 84px); line-height: 0.96; letter-spacing: -0.055em; margin-top: 20px; }
.heroAccent { color: ${c.accent}; font-style: italic; display: block; }
.heroBody { margin-top: 18px; font-size: clamp(15px, 2.5vw, 18px); line-height: 1.78; color: ${c.textSub}; max-width: 580px; }
.heroButtons { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 28px; }
.heroBtn { flex-shrink: 0; }

/* CAPABILITY CARDS */
.capGrid { display: flex; flex-direction: column; gap: 10px; margin-top: 28px; }
.capCard { position: relative; border-radius: 18px; border: 1px solid ${c.border}; background: rgba(255,255,255,0.92); backdrop-filter: blur(12px); box-shadow: 0 8px 28px rgba(0,0,0,0.03); overflow: hidden; cursor: default; }
.capCardShimmer { position: absolute; inset: 0; background: linear-gradient(135deg, transparent 40%, rgba(37,99,235,0.03) 50%, transparent 60%); pointer-events: none; }
.capCardContent { position: relative; z-index: 2; display: flex; align-items: center; gap: 16px; padding: 18px 20px; }
.capCardTitle { font-size: 15px; font-weight: 800; letter-spacing: -0.02em; }
.capCardBody { font-size: 13px; line-height: 1.6; color: ${c.textSub}; margin-top: 2px; }
.capCardArrow { color: ${c.textMuted}; flex-shrink: 0; margin-left: auto; }
.capIconShell { position: relative; width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; background: linear-gradient(180deg, #F5F8FF, #EAF0FF); border: 1px solid rgba(190,210,250,0.5); box-shadow: 0 6px 18px rgba(37,99,235,0.06); overflow: hidden; }
.capIconPulse { position: absolute; inset: 8px; border-radius: 10px; background: rgba(37,99,235,0.12); z-index: 1; }

/* PHONE */
.phoneOuter { display: flex; justify-content: center; width: 100%; }
.phoneDevice { position: relative; width: 100%; max-width: 380px; }
.phoneBezel { background: #1A1A1E; border-radius: 44px; padding: 10px; box-shadow: 0 0 0 1px rgba(255,255,255,0.06), 0 40px 80px rgba(0,0,0,0.14), 0 16px 32px rgba(0,0,0,0.08); }
.dynamicIsland { width: 110px; height: 30px; border-radius: 999px; background: #000; margin: 0 auto 6px; display: flex; align-items: center; justify-content: flex-end; padding-right: 18px; }
.diCamera { width: 8px; height: 8px; border-radius: 999px; background: radial-gradient(circle, #1a2540, #0a1025); border: 1px solid rgba(255,255,255,0.08); }
.phoneScreen { background: #FAFAFA; border-radius: 36px; overflow: hidden; display: flex; flex-direction: column; }
.chatHeader { display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; background: #fff; border-bottom: 1px solid #f0f0f0; }
.chatAvatar { position: relative; width: 36px; height: 36px; border-radius: 999px; overflow: hidden; flex-shrink: 0; background: #E8EAF0; border: 2px solid #fff; box-shadow: 0 2px 6px rgba(0,0,0,0.08); }
.chatOnline { display: flex; align-items: center; gap: 4px; font-size: 10px; color: ${c.green}; font-weight: 600; margin-top: 1px; }
.chatOnlineDot { width: 5px; height: 5px; border-radius: 999px; background: ${c.green}; display: inline-block; }
.verifiedBadge { display: inline-flex; flex-shrink: 0; }
.chatEncrypt { display: flex; align-items: center; justify-content: center; gap: 5px; padding: 6px; background: #FFF8E1; font-size: 9px; color: #92711A; font-weight: 600; }
.chatBody { display: flex; flex-direction: column; gap: 6px; padding: 10px 8px; min-height: 280px; max-height: 280px; overflow: hidden; justify-content: flex-end; background: linear-gradient(180deg, #F5F5F0, #ECE5DA); background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23000' fill-opacity='.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); }
.chatRow { display: flex; }
.chatRowR { justify-content: flex-end; }
.chatRowL { justify-content: flex-start; }
.chatBubble { max-width: 82%; padding: 8px 11px; font-size: 12px; line-height: 1.5; word-break: break-word; }
.bubbleU { background: #E7FFDB; color: #111; border-radius: 12px 12px 4px 12px; box-shadow: 0 1px 2px rgba(0,0,0,0.06); }
.bubbleL { background: #fff; color: #111; border-radius: 12px 12px 12px 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
.bubbleMeta { display: flex; align-items: center; gap: 4px; justify-content: flex-end; margin-top: 2px; font-size: 9px; color: #8B919F; font-weight: 500; }
.chatComposer { padding: 8px 10px 14px; display: flex; align-items: center; gap: 6px; background: #F0EBE3; }
.composerField { flex: 1; height: 38px; border-radius: 999px; background: #fff; border: none; display: flex; align-items: center; gap: 8px; padding: 0 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
.composerMic { width: 38px; height: 38px; border-radius: 999px; background: #25D366; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.phoneCallout { position: absolute; right: -8px; bottom: 28px; border-radius: 999px; background: rgba(255,255,255,0.95); border: 1px solid ${c.border}; padding: 10px 14px; color: ${c.textSub}; font-size: 12px; font-weight: 700; box-shadow: 0 10px 28px rgba(0,0,0,0.08); display: flex; align-items: center; gap: 6px; }

/* MARQUEE */
.marqueeSection { margin-top: 40px; }
.marqueeLabel { text-align: center; font-size: 10px; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; color: ${c.textMuted}; margin-bottom: 16px; }
.marqueeViewport { overflow: hidden; mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent); -webkit-mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent); }
.marqueeTrack { display: flex; align-items: center; gap: 12px; width: max-content; }
.marqueeCard { display: flex; align-items: center; justify-content: center; min-width: 160px; height: 64px; border: 1px solid ${c.border}; background: rgba(255,255,255,0.9); border-radius: 16px; padding: 12px 16px; }
.marqueeImg { width: auto; max-width: 100px; height: auto; max-height: 26px; object-fit: contain; }
.marqueeBlend { mix-blend-mode: multiply; }
.marqueeCaption { margin-top: 12px; text-align: center; font-size: 12px; color: ${c.textMuted}; }

/* GRIDS */
.grid3 { display: grid; grid-template-columns: 1fr; gap: 16px; }
.grid2a { display: grid; grid-template-columns: 1fr; gap: 28px; }

.card { background: rgba(255,255,255,0.92); border: 1px solid ${c.border}; border-radius: 22px; padding: 24px; min-width: 0; box-shadow: 0 10px 30px rgba(0,0,0,0.03); display: flex; flex-direction: column; }
.cardDark { background: linear-gradient(180deg, #111318, #0D0F14) !important; border: 1px solid ${c.borderDark} !important; color: #fff !important; box-shadow: 0 24px 60px rgba(0,0,0,0.2) !important; }
.cardNumber { width: 40px; height: 40px; border-radius: 12px; background: ${c.accentSoft}; color: ${c.accent}; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 800; }
.cardTitle { font-size: 20px; font-weight: 800; letter-spacing: -0.03em; margin-top: 14px; }
.cardBody { margin-top: 8px; color: ${c.textSub}; font-size: 14px; line-height: 1.78; }
.darkCard { background: linear-gradient(180deg, rgba(16,19,24,0.98), rgba(13,15,20,0.98)); border: 1px solid ${c.borderDark}; border-radius: 22px; padding: 24px; box-shadow: 0 20px 50px rgba(0,0,0,0.2); }
.darkPill { display: inline-flex; margin-top: 20px; padding: 9px 13px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.04); color: rgba(255,255,255,0.7); font-size: 12px; font-weight: 700; }
.featureList { display: flex; flex-direction: column; gap: 8px; margin-top: 14px; }
.featureRow { display: flex; align-items: flex-start; gap: 8px; font-size: 13px; line-height: 1.65; color: ${c.textSub}; }
.sectionTitle2 { font-size: clamp(26px, 5vw, 48px); line-height: 1.06; letter-spacing: -0.04em; margin-top: 16px; }
.sectionBody2 { margin-top: 14px; color: ${c.textSub}; font-size: clamp(14px, 2.5vw, 17px); line-height: 1.84; max-width: 540px; }

/* WORKFLOW */
.workflowGrid { display: grid; grid-template-columns: 1fr; gap: 14px; margin-top: 40px; }
.workflowCard { background: #fff; border: 1px solid ${c.border}; border-radius: 20px; padding: 22px; position: relative; box-shadow: 0 6px 20px rgba(0,0,0,0.03); }
.workflowArrow { display: none; }
.workflowStep { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; color: ${c.textMuted}; }
.workflowTitle { margin-top: 8px; font-size: 18px; font-weight: 800; letter-spacing: -0.03em; }
.workflowBody { margin-top: 8px; color: ${c.textSub}; font-size: 13px; line-height: 1.75; }

/* TERMINAL */
.terminal { background: #07080B; border: 1px solid #1F2330; border-radius: 18px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.2); }
.terminalTop { display: flex; align-items: center; gap: 10px; padding: 12px 14px; border-bottom: 1px solid #1B1F2B; background: #0E1118; }
.terminalDots { display: flex; gap: 6px; }
.terminalDots span { width: 9px; height: 9px; border-radius: 999px; display: inline-block; }
.terminalDots span:nth-child(1) { background: #FF5F57; }
.terminalDots span:nth-child(2) { background: #FEBC2E; }
.terminalDots span:nth-child(3) { background: #28C840; }
.terminalTitle { font-size: 11px; color: #6B7280; font-weight: 700; }
.terminalBody { padding: 16px; min-height: 240px; overflow-x: auto; }
.terminalLine { white-space: pre-wrap; word-break: break-all; font-size: 12px; line-height: 1.8; font-family: 'SF Mono', ui-monospace, Menlo, Consolas, monospace; }
.terminalCursor { color: #60A5FA; animation: blink 0.8s step-end infinite; }

/* PROMPTS */
.promptCard { border: 1px solid ${c.border}; background: #fff; border-radius: 22px; padding: 20px; box-shadow: 0 12px 32px rgba(0,0,0,0.03); }
.promptLabel { font-size: 10px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: ${c.textMuted}; margin-bottom: 12px; }
.promptBox { border: 1px solid ${c.border}; background: #FCFBF8; border-radius: 16px; min-height: 100px; padding: 16px; font-size: 15px; line-height: 1.7; color: ${c.text}; }
.promptCursor { color: ${c.accent}; animation: blink 1s step-end infinite; }

/* PRICING */
.pricingBadge { position: absolute; top: 16px; right: 16px; border-radius: 999px; padding: 5px 10px; background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.75); font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; }

/* METRICS */
.metricsGrid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: ${c.border}; border: 1px solid ${c.border}; border-radius: 18px; overflow: hidden; }
.metricCell { background: #fff; padding: 22px 16px; text-align: center; }
.metricValue { font-size: clamp(28px, 5vw, 40px); letter-spacing: -0.05em; line-height: 1; }
.metricLabel { margin-top: 6px; font-size: 12px; color: ${c.textSub}; }

/* WAITLIST */
.waitlistCard { background: rgba(255,255,255,0.92); border: 1px solid ${c.border}; border-radius: 24px; padding: 24px; max-width: 920px; margin: 0 auto; box-shadow: 0 16px 44px rgba(0,0,0,0.04); }
.waitlistForm { display: grid; grid-template-columns: 1fr; gap: 10px; margin-top: 20px; }
.waitlistBtn { height: 52px; width: 100%; }
.input { width: 100%; height: 52px; border-radius: 14px; border: 1px solid ${c.border}; background: #fff; padding: 0 14px; font-size: 14px; color: ${c.text}; outline: none; }
.input:focus { border-color: ${c.accent}; box-shadow: 0 0 0 3px rgba(37,99,235,0.06); }
.privacyLabel { display: flex; align-items: flex-start; gap: 8px; margin-top: 14px; color: ${c.textSub}; font-size: 12px; line-height: 1.7; cursor: pointer; }
.privacyCheck { margin-top: 2px; width: 16px; height: 16px; accent-color: ${c.accent}; flex-shrink: 0; }
.privacyLink { color: ${c.text}; font-weight: 700; text-decoration: underline; text-underline-offset: 3px; }
.privacyNote { margin-top: 6px; text-align: center; color: ${c.textMuted}; font-size: 11px; }
.formSuccess { margin-top: 14px; border: 1px solid ${c.border}; background: ${c.greenSoft}; color: ${c.greenDark}; border-radius: 14px; padding: 12px 16px; text-align: center; font-size: 13px; font-weight: 600; }
.formError { margin-top: 14px; border: 1px solid ${c.border}; background: #FFF7F7; color: #B91C1C; border-radius: 14px; padding: 12px 16px; text-align: center; font-size: 13px; font-weight: 600; }

/* EMERGENCY NOTICE */
.emergencyNotice { text-align: center; font-size: 12px; line-height: 1.7; color: ${c.textMuted}; max-width: 700px; margin: 0 auto; padding: 16px; border: 1px solid ${c.border}; border-radius: 16px; background: rgba(255,255,255,0.6); }

/* MODAL */
.modalOverlay { position: fixed; inset: 0; z-index: 220; background: rgba(9,10,13,0.4); backdrop-filter: blur(12px); display: flex; align-items: center; justify-content: center; padding: 16px; }
.modalContent { width: 100%; max-width: 480px; background: rgba(255,255,255,0.96); border: 1px solid ${c.border}; border-radius: 24px; padding: 24px; box-shadow: 0 40px 100px rgba(0,0,0,0.18); }
.modalIcon { width: 48px; height: 48px; border-radius: 16px; background: linear-gradient(180deg, #F7FBFF, ${c.accentSoft}); border: 1px solid ${c.border}; display: flex; align-items: center; justify-content: center; }
.modalEyebrow { margin-top: 14px; font-size: 10px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: ${c.textMuted}; }
.modalTitle { font-size: clamp(24px, 4vw, 36px); line-height: 1.04; letter-spacing: -0.04em; margin-top: 6px; }
.modalBody { margin-top: 10px; color: ${c.textSub}; font-size: 14px; line-height: 1.8; }

/* FOOTER */
.footer { border-top: 1px solid ${c.border}; padding: 24px 0 32px; }
.footerInner { display: flex; flex-direction: column; gap: 16px; align-items: center; text-align: center; }
.footerLinks { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; }
.footerLink { font-size: 12px; color: ${c.textMuted}; font-weight: 600; transition: color 0.2s; }
.footerLink:hover { color: ${c.text}; }
.footerCopy { font-size: 11px; color: ${c.textMuted}; }

/* ═════════════════════════════════════════════════
   TABLET (640px+)
   ═════════════════════════════════════════════════ */
@media (min-width: 640px) {
  .container { padding: 0 24px; }
  .section { padding: 80px 0; }
  .sectionDark { padding: 80px 0; }
  .grid3 { grid-template-columns: repeat(2, 1fr); }
  .grid2a { grid-template-columns: repeat(2, 1fr); gap: 32px; }
  .metricsGrid { grid-template-columns: repeat(4, 1fr); }
  .waitlistForm { grid-template-columns: 1.2fr 0.8fr auto; }
  .waitlistBtn { height: 56px; width: auto; }
  .waitlistCard { padding: 32px; }
  .heroSection { padding: 56px 0 40px; }
  .navInner { height: 72px; }
  .footerInner { flex-direction: row; justify-content: space-between; text-align: left; }
  .phoneCallout { right: -10px; }
  .chatBody { min-height: 320px; max-height: 320px; }
  .marqueeCard { min-width: 180px; height: 72px; }
}

/* ═════════════════════════════════════════════════
   DESKTOP (960px+)
   ═════════════════════════════════════════════════ */
@media (min-width: 960px) {
  .container { padding: 0 40px; }
  .section { padding: 88px 0; }
  .sectionDark { padding: 88px 0; }
  .heroGrid { grid-template-columns: 1.05fr 0.95fr; gap: 48px; }
  .grid3 { grid-template-columns: repeat(3, 1fr); gap: 18px; }
  .workflowGrid { grid-template-columns: repeat(3, 1fr); gap: 18px; }
  .workflowArrow { display: flex; position: absolute; top: 50%; right: -17px; transform: translateY(-50%); width: 34px; height: 34px; border-radius: 999px; background: #fff; border: 1px solid ${c.border}; align-items: center; justify-content: center; z-index: 2; box-shadow: 0 4px 12px rgba(0,0,0,0.04); }
  .navLinks { display: flex; }
  .navCta { padding: 11px 22px !important; font-size: 14px !important; }
  .navCtaFull { display: inline; }
  .navCtaShort { display: none; }
  .heroSection { padding: 72px 0 48px; }
  .chatBody { min-height: 340px; max-height: 340px; }
  .phoneBezel { border-radius: 48px; }
  .phoneScreen { border-radius: 40px; }
  .marqueeCard { min-width: 200px; height: 78px; }
  .marqueeImg { max-width: 120px; max-height: 30px; }
  .card { padding: 28px; border-radius: 26px; }
  .darkCard { padding: 30px; border-radius: 26px; }
}

/* ═════════════════════════════════════════════════
   SMALL MOBILE — critical nav fix
   ═════════════════════════════════════════════════ */
@media (max-width: 639px) {
  .navLinks { display: none !important; }
  /* KEY FIX: Nav CTA stays compact on mobile */
  .navCta { padding: 9px 14px !important; font-size: 12px !important; width: auto !important; max-width: fit-content !important; }
  .navCtaFull { display: none; }
  .navCtaShort { display: inline; }
  .heroButtons { flex-direction: column; }
  .heroBtn { width: 100%; }
  .capCardContent { flex-direction: column; align-items: flex-start; gap: 12px; }
  .capCardArrow { display: none; }
  .phoneCallout { position: static; margin: 10px auto 0; width: fit-content; }
  .privacyLabel { justify-content: flex-start; }
}
`;
