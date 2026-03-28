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

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');`;

const c = {
  bg: "#F8F6F1", bgCard: "#FFFFFF", bgDark: "#08090C", bgDarkCard: "#111318",
  text: "#141517", textSub: "#555B69", textMuted: "#8B919F",
  accent: "#2563EB", accentSoft: "#ECF2FF",
  border: "#E3DDD2", borderDark: "#222633",
  green: "#22C55E", greenSoft: "#ECFDF3", greenDark: "#15803D",
};

type RoleKey = "patient" | "provider" | "developer";

function FadeIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });
  return (<motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>);
}

function Pill({ children, animated = false }: { children: ReactNode; animated?: boolean }) {
  return (<div className={`pill${animated ? " pillAnim" : ""}`}>{animated && <span className="pillShine" />}<span className="pillInner">{children}</span></div>);
}

function SH({ badge, title, body, dark = false }: { badge?: string; title: ReactNode; body?: string; dark?: boolean }) {
  return (
    <div className="shWrap">
      {badge && <Pill>{badge}</Pill>}
      <h2 className="serif shTitle" style={{ marginTop: badge ? "20px" : 0, color: dark ? "#fff" : c.text }}>{title}</h2>
      {body && <p className="shBody" style={{ color: dark ? "rgba(255,255,255,0.6)" : c.textSub }}>{body}</p>}
    </div>
  );
}

function Chk({ dark = false }: { dark?: boolean }) {
  return <span className={`chk${dark ? " chkD" : ""}`}>&#10003;</span>;
}

/* Status Bar */
function StatusBar() {
  const items = ["Chat Engine", "Triage", "Scheduling", "Translation", "Provider API", "Chat Engine", "Triage", "Scheduling", "Translation", "Provider API"];
  return (
    <div className="statusBar">
      <div className="container statusInner">
        <div className="statusLeft">
          <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} className="statusDot" />
          <span className="statusLabel">All systems operational</span>
        </div>
        <div className="statusTicker">
          <motion.div className="statusTickerTrack" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 20, ease: "linear", repeat: Infinity }}>
            {items.map((s, i) => (<span key={`${s}-${i}`} className="statusSvc"><span className="statusSvcDot" />{s}</span>))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* Capability Cards */
function CapIcon({ type }: { type: "voice" | "heart" | "infra" }) {
  const Icon = type === "voice" ? Mic : type === "heart" ? Heart : Blocks;
  return (
    <div className="capIco">
      <motion.span className="capIcoPulse" animate={{ scale: [1, 1.25, 1], opacity: [0.15, 0.35, 0.15] }} transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: type === "heart" ? 0.3 : type === "infra" ? 0.6 : 0 }} />
      <motion.div animate={type === "voice" ? { y: [0, -3, 0] } : type === "heart" ? { scale: [1, 1.1, 0.96, 1.08, 1] } : { rotate: [0, 5, 0, -5, 0] }} transition={{ duration: type === "heart" ? 1.8 : 2.8, repeat: Infinity, ease: "easeInOut" }} style={{ position: "relative", zIndex: 2 }}>
        <Icon size={22} strokeWidth={2} color={c.accent} />
      </motion.div>
    </div>
  );
}

function HeroCaps() {
  const cards = [
    { type: "voice" as const, title: "Text and chat ready", body: "Multilingual care access through natural conversation with clinical-grade understanding." },
    { type: "heart" as const, title: "Care navigation", body: "Guides people toward the right next step with structured intake and smart urgency routing." },
    { type: "infra" as const, title: "Provider discovery", body: "Finds nearby GP and dental providers, supports callback requests, and hands off to booking." },
  ];
  return (
    <div className="capGrid">
      {cards.map((card, i) => (
        <motion.div key={card.title} className="capCard" initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }} whileHover={{ y: -4, boxShadow: "0 24px 56px rgba(0,0,0,0.07)", transition: { duration: 0.2 } }}>
          <div className="capCardInner">
            <CapIcon type={card.type} />
            <div className="capCardText">
              <h3 className="capCardTitle">{card.title}</h3>
              <p className="capCardBody">{card.body}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* Phone Mockup */
function VBadge() {
  return (<span className="vBadge"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 1L14.9 3.6L18.6 3.2L19.4 6.8L22.5 8.7L21.2 12.2L22.5 15.7L19.4 17.6L18.6 21.2L14.9 20.8L12 23.4L9.1 20.8L5.4 21.2L4.6 17.6L1.5 15.7L2.8 12.2L1.5 8.7L4.6 6.8L5.4 3.2L9.1 3.6L12 1Z" fill="#22C55E"/><path d="M8.5 12.5L10.5 14.5L15.5 9.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>);
}

function PhoneMockup() {
  const msgs = useMemo(() => [
    { from: "user" as const, text: "I have a sore throat, fever, and I feel weak. What should I do?" },
    { from: "laura" as const, text: "I can help. Based on what you described, you may benefit from same-day clinical advice if the fever is persistent." },
    { from: "user" as const, text: "Can you find a GP near me?" },
    { from: "laura" as const, text: "Yes. I found 3 GP practices near your postcode. The nearest has availability tomorrow at 9:30 AM. Shall I request a callback?" },
  ], []);
  const [displayed, setDisplayed] = useState<string[]>(Array(msgs.length).fill(""));
  const [ai, setAi] = useState(0);
  useEffect(() => {
    const cur = msgs[ai]; if (!cur) return;
    const shown = displayed[ai] ?? "";
    let t: number | undefined;
    if (shown.length < cur.text.length) { t = window.setTimeout(() => { setDisplayed(p => { const n = [...p]; n[ai] = cur.text.slice(0, shown.length + 1); return n; }); }, cur.from === "user" ? 22 : 16); }
    else if (ai < msgs.length - 1) { t = window.setTimeout(() => setAi(p => p + 1), 700); }
    else { t = window.setTimeout(() => { setDisplayed(Array(msgs.length).fill("")); setAi(0); }, 2400); }
    return () => { if (t) clearTimeout(t); };
  }, [ai, displayed, msgs]);
  const st = (i: number) => { const d = displayed[i]?.length === msgs[i].text.length; if (!d) return "s"; if (i === 0) return ai >= 1 ? "r" : "d"; if (i === 2) return displayed[3]?.length === msgs[3].text.length ? "r" : "d"; return "d"; };

  return (
    <div className="phoneWrap">
      <motion.div className="phoneFrame" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
        <div className="phoneBezel">
          <div className="phoneDI"><div className="phoneDICam" /></div>
          <div className="phoneScr">
            <div className="pHead">
              <div className="pHeadL">
                <div className="pAvatar"><Image src="/laura-avatar.png" alt="Laura" fill sizes="36px" style={{ objectFit: "cover" }} /></div>
                <div><div className="pName">Laura <VBadge /></div><div className="pOnline"><motion.span animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.8, repeat: Infinity }} className="pOnlineDot" />online</div></div>
              </div>
              <div className="pHeadR">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B919F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" /></svg>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B919F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72"/></svg>
              </div>
            </div>
            <div className="pEncrypt"><svg width="8" height="8" viewBox="0 0 24 24" fill="#92711A" stroke="none"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" fill="none" stroke="#92711A" strokeWidth="2"/></svg>Messages are end-to-end encrypted</div>
            <div className="pBody">
              {msgs.map((msg, i) => { const text = displayed[i]; if (!text) return null; const s = st(i); return (
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className={`pRow ${msg.from === "user" ? "pRowR" : "pRowL"}`}>
                  <div className={`pBub ${msg.from === "user" ? "pBubU" : "pBubL"}`}>
                    {text}
                    <span className="pMeta"><span>9:{30 + i}</span>{msg.from === "user" && <svg width="14" height="10" viewBox="0 0 20 14" fill="none"><path d="M1.5 7.6L4.7 10.8L10.2 5.2" stroke={s === "r" ? "#53BDEB" : "#8B919F"} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /><path d="M7.3 7.6L10.5 10.8L18.2 3.2" stroke={s === "r" ? "#53BDEB" : "#8B919F"} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>}</span>
                  </div>
                </motion.div>
              ); })}
            </div>
            <div className="pComp">
              <div className="pCompField"><span style={{ fontSize: "16px", opacity: 0.4 }}>&#128522;</span><span style={{ color: c.textMuted, fontSize: "13px", flex: 1 }}>Message</span></div>
              <div className="pCompMic"><Mic size={16} color="#fff" strokeWidth={2.2} /></div>
            </div>
          </div>
        </div>
        <motion.div className="pCallout" animate={{ y: [0, -4, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
          <span className="statusSvcDot" />Chat + Triage + Routing
        </motion.div>
      </motion.div>
    </div>
  );
}

/* Logo Marquee */
function LogoMarquee() {
  const logos = [
    { n: "AWS", s: "/logos/aws-logo.png" }, { n: "Microsoft", s: "/logos/microsoft-logo.png" }, { n: "Google", s: "/logos/google-logo.png" }, { n: "Salesforce", s: "/logos/salesforce-logo.png" },
    { n: "Twilio", s: "/logos/twilio-logo.png" }, { n: "Epic", s: "/logos/epic-logo.png" }, { n: "Veradigm", s: "/logos/veradigm-logo.png" }, { n: "GitHub", s: "/logos/github-logo.png", b: true },
  ];
  const d = useMemo(() => [...logos, ...logos], []);
  return (
    <div className="mqSection">
      <p className="mqLabel">Designed for the systems behind modern care</p>
      <div className="mqViewport"><motion.div className="mqTrack" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 32, ease: "linear", repeat: Infinity }}>
        {d.map((l, i) => (<div key={`${l.n}-${i}`} className="mqCard"><Image src={l.s} alt={l.n} width={120} height={36} className={`mqImg${l.b ? " mqBlend" : ""}`} /></div>))}
      </motion.div></div>
      <p className="mqCaption">Representative platforms Omela is designed to work alongside.</p>
    </div>
  );
}

/* SDK Terminal -- FIXED: uses fixed height so no layout shift */
function SDKTerminal() {
  const lines = useMemo(() => ['$ npm install @omela/laura-sdk', '$ import { Laura } from "@omela/laura-sdk";', '', '  const laura = new Laura({', '    apiKey: process.env.OMELA_KEY,', '    region: "eu-west-2"', '  });', '', '  const res = await laura.chat({', '    userId: "patient_8291",', '    message: "I have a rash."', '  });', '', '  > Laura is thinking...', '  Done. Response in 1.2s'], []);
  const [vl, setVl] = useState(0); const [ci, setCi] = useState(0);
  useEffect(() => {
    if (vl >= lines.length) { const t = setTimeout(() => { setVl(0); setCi(0); }, 3000); return () => clearTimeout(t); }
    const line = lines[vl];
    if (ci < line.length) { const t = setTimeout(() => setCi(p => p + 1), line.startsWith("  >") ? 40 : 20); return () => clearTimeout(t); }
    else { const t = setTimeout(() => { setVl(p => p + 1); setCi(0); }, line === "" ? 80 : 200); return () => clearTimeout(t); }
  }, [vl, ci, lines]);
  return (
    <div className="term">
      <div className="termTop"><div className="termDots"><span /><span /><span /></div><span className="termTitle">Laura SDK</span></div>
      <div className="termBody">{lines.slice(0, vl + 1).map((line, i) => { const a = i === vl; return (
        <div key={i} className="termLine" style={{ color: line.startsWith("  Done") ? "#4ADE80" : line.startsWith("  >") ? "#FBBF24" : line.startsWith("$") ? "#E2E8F0" : "#94A3B8" }}>
          {a ? line.slice(0, ci) : line}{a && <span className="termCur">|</span>}
        </div>
      ); })}</div>
    </div>
  );
}

/* Typewriter Prompts */
function TWPrompts() {
  const prompts = useMemo(() => ["Can you help me understand what my symptoms might mean?", "Find a GP near me for tomorrow morning.", "Can you explain this prescription in simpler language?"], []);
  const [pi, setPi] = useState(0); const [typed, setTyped] = useState(""); const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = prompts[pi]; const sp = del ? 16 : 32;
    const t = setTimeout(() => {
      if (!del) { const n = cur.slice(0, typed.length + 1); setTyped(n); if (n === cur) setTimeout(() => setDel(true), 1200); }
      else { const n = cur.slice(0, Math.max(0, typed.length - 1)); setTyped(n); if (!n.length) { setDel(false); setPi(p => (p + 1) % prompts.length); } }
    }, sp);
    return () => clearTimeout(t);
  }, [typed, del, pi, prompts]);
  return (<div className="prCard"><div className="prLabel">Example prompts</div><div className="prBox"><span>{typed}</span><span className="prCur">|</span></div></div>);
}

/* Success Modal */
function SuccessModal({ open, role, onClose }: { open: boolean; role: RoleKey; onClose: () => void }) {
  const m: Record<RoleKey, { ey: string; t: string; b: string }> = {
    patient: { ey: "Early access confirmed", t: "You are in early.", b: "Laura will reach out as access opens. Follow us on X @joinomela." },
    provider: { ey: "Provider access confirmed", t: "Your place is reserved.", b: "Laura will reach out as live operations open. Follow @joinomela." },
    developer: { ey: "Developer access confirmed", t: "You are on the list.", b: "Laura will reach out as API access opens. Follow @joinomela." },
  };
  const copy = m[role];
  return (<AnimatePresence>{open && (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="modOv">
      <motion.div initial={{ opacity: 0, y: 16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12 }} onClick={e => e.stopPropagation()} className="modBox">
        <div className="modIco"><svg width="26" height="26" viewBox="0 0 32 32" fill="none"><path d="M7 16.5L12.8 22L25 9.5" stroke={c.green} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
        <div className="modEy">{copy.ey}</div>
        <h3 className="serif modTitle">{copy.t}</h3>
        <p className="modBody">{copy.b}</p>
        <div style={{ marginTop: "20px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <a href="https://x.com/joinomela" target="_blank" rel="noreferrer" className="btnP">Follow on X</a>
          <button type="button" className="btnS" onClick={onClose}>Continue</button>
        </div>
      </motion.div>
    </motion.div>
  )}</AnimatePresence>);
}

/* ══════════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════════ */
export default function Page() {
  const [role, setRole] = useState<RoleKey>("patient");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const audCards = [
    { title: "For people", desc: "Describe your concern in natural language. Laura helps you understand next steps, find nearby providers, and request a callback.", bullets: ["Symptom guidance", "Urgency routing", "Provider discovery", "Callback requests"] },
    { title: "For providers", desc: "Receive structured intake with urgency bands. Manage callback requests and review patient needs from a clean admin dashboard.", bullets: ["Structured intake", "Urgency bands", "Request management", "Multilingual access"] },
    { title: "For developers", desc: "Embed Laura into apps and patient journeys through APIs and SDKs as the platform scales beyond version one.", bullets: ["API access (roadmap)", "Embeddable widgets", "Workflow triggers", "Secure audit logs"] },
  ];
  const wfItems = [
    { title: "People describe their concern", body: "Users explain symptoms or ask health questions in their preferred language." },
    { title: "Laura routes and guides", body: "She applies urgency bands, finds nearby GP or dental providers, and offers next steps." },
    { title: "Care teams receive clean requests", body: "Callback requests arrive structured with urgency, language, and summary context." },
  ];
  const devFt = ["REST API and SDK access", "Embeddable chat widgets", "Patient workflow triggers", "Secure auth and audit trails"];
  const metrics = [{ v: "24/7", l: "Always-on access" }, { v: "40+", l: "Supported languages" }, { v: "<2s", l: "Average response time" }, { v: "Text first", l: "Chat-led care access" }];
  const plans = [
    { name: "Public Access", price: "\u00A33.99", period: "/mo", desc: "For people who want direct access to Laura for care guidance and provider discovery.", ft: ["Symptom guidance", "Urgency routing", "GP and dental discovery", "Callback requests"], hl: false, cta: "Join waitlist" },
    { name: "Provider", price: "\u00A31,250", period: "/mo", desc: "For clinics and practices using Laura to manage intake and access.", ft: ["Structured intake", "Admin dashboard", "Multilingual support", "Request management"], hl: true, badge: "Best for care teams", cta: "Request demo" },
    { name: "Developer", price: "\u00A31,999.99", period: "/mo", desc: "For teams building on Laura with API, SDK, and embeddable components.", ft: ["API and SDK access", "Embeddable components", "Usage analytics", "Technical onboarding"], hl: false, cta: "Talk to us" },
  ];
  const pubUC = ["Describe symptoms and get structured guidance", "Find nearby GP or dental practices by postcode", "Request a callback or booking handoff"];

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); if (!agreed) return;
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
      <div className="wrap">
        <StatusBar />
        <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="nav">
          <div className="container navRow">
            <Link href="/" className="navBrand">
              <div className="navLogo"><Image src="/omela-logo-mark.png" alt="Omela" width={38} height={38} style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
              <div><div className="navName">Omela</div><div className="navSub serif">Powered by Laura</div></div>
            </Link>
            <div className="navLinks">{["People", "Providers", "Developers", "Pricing"].map(i => (<a key={i} href={`#${i.toLowerCase()}`} className="navLink">{i}</a>))}</div>
            <a href="#waitlist" className="btnP navCta"><span className="navCtaL">Get early access</span><span className="navCtaS">Early access</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg></a>
          </div>
        </motion.nav>

        <section className="heroSec">
          <div className="container">
            <div className="heroText">
              <FadeIn><Pill animated><span className="greenDot" /><span>Now onboarding early access users</span></Pill></FadeIn>
              <FadeIn delay={0.06}><h1 className="serif heroTitle">The AI front door<span className="heroAccent">for care access and triage.</span></h1></FadeIn>
              <FadeIn delay={0.12}><p className="heroBody">Laura helps people describe symptoms, find nearby providers, and request callbacks, giving care teams cleaner intake and faster routing from the first interaction.</p></FadeIn>
              <FadeIn delay={0.18}><div className="heroBtns"><a href="#waitlist" className="btnP">Get early access <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg></a><a href="#developers" className="btnS">Explore developer tools</a></div></FadeIn>
            </div>
            <div className="heroPhone"><PhoneMockup /></div>
            <FadeIn delay={0.24}><HeroCaps /></FadeIn>
            <FadeIn delay={0.3}><LogoMarquee /></FadeIn>
          </div>
        </section>

        <section className="sec">
          <div className="container">
            <FadeIn><SH badge="Built for everyone" title={<>One platform. Three entry points.</>} body="Laura works as a care-access experience for people, an intake layer for providers, and a future integration layer for developers." /></FadeIn>
            <div className="g3" style={{ marginTop: "48px" }}>{audCards.map((card, i) => (
              <FadeIn key={card.title} delay={i * 0.1}><div className="card"><div className="cardNum">{i + 1}</div><h3 className="cardT">{card.title}</h3><p className="cardB">{card.desc}</p><div className="ftList">{card.bullets.map(b => (<div key={b} className="ftRow"><Chk /><span>{b}</span></div>))}</div></div></FadeIn>
            ))}</div>
          </div>
        </section>

        <section id="people" className="sec">
          <div className="container">
            <div className="g2">
              <FadeIn><div>
                <Pill>Laura for people</Pill>
                <h2 className="serif secT2">Healthcare guidance that starts with a conversation.</h2>
                <p className="secB2">Describe your concern in plain language, get structured guidance, find nearby GP or dental providers by postcode, and request a callback without waiting on hold.</p>
                <div className="ftList" style={{ marginTop: "24px" }}>{pubUC.map(item => (<div key={item} className="ftRow"><Chk /><span>{item}</span></div>))}</div>
              </div></FadeIn>
              <FadeIn delay={0.1}><TWPrompts /></FadeIn>
            </div>
          </div>
        </section>

        <section id="providers" className="sec" style={{ paddingTop: "24px" }}>
          <div className="container">
            <FadeIn><SH badge="Workflow" title={<>A cleaner flow from demand to care.</>} body="Laura turns fragmented intake and requests into structured, actionable information for care teams." /></FadeIn>
            <div className="wfGrid">{wfItems.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}><div className="wfCard">
                {i < wfItems.length - 1 && <div className="wfArrow"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c.textMuted} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg></div>}
                <div className="wfStep">Step {i + 1}</div><h3 className="wfTitle">{item.title}</h3><p className="wfBody">{item.body}</p>
              </div></FadeIn>
            ))}</div>
          </div>
        </section>

        <section id="developers" className="secDark">
          <div className="container">
            <FadeIn><SH dark badge="Developer platform" title={<>Integrate Laura into your product.</>} body="Embed care access, conversational triage, and provider routing into apps and workflows as the platform scales." /></FadeIn>
            <div className="g2" style={{ marginTop: "48px" }}>
              <FadeIn><SDKTerminal /></FadeIn>
              <FadeIn delay={0.1}><div className="dkCard">
                <h3 className="dkCardT">Built for integration teams</h3>
                <p className="dkCardB">Laura can be embedded into health apps, patient journeys, and internal tooling.</p>
                <div className="ftList" style={{ marginTop: "22px" }}>{devFt.map(f => (<div key={f} className="ftRow" style={{ color: "rgba(255,255,255,0.8)" }}><Chk dark /><span>{f}</span></div>))}</div>
                <div className="dkPill">API, SDK, and widget access on the roadmap</div>
              </div></FadeIn>
            </div>
          </div>
        </section>

        <section id="pricing" className="sec">
          <div className="container">
            <FadeIn><SH badge="Pricing" title={<>Simple access for everyone.</>} body="Start with the audience that matters now, then expand." /></FadeIn>
            <div className="g3" style={{ marginTop: "48px" }}>{plans.map((p, i) => (
              <FadeIn key={p.name} delay={i * 0.1}><div className={`card ${p.hl ? "cardDk" : ""}`} style={{ position: "relative" }}>
                {p.badge && <div className="prBadge">{p.badge}</div>}
                <div style={{ fontSize: "15px", fontWeight: 700 }}>{p.name}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginTop: "16px", flexWrap: "wrap" }}>
                  <span className="serif" style={{ fontSize: "clamp(30px, 5vw, 44px)", letterSpacing: "-0.05em" }}>{p.price}</span>
                  {p.period && <span style={{ fontSize: "14px", color: p.hl ? "rgba(255,255,255,0.5)" : c.textMuted }}>{p.period}</span>}
                </div>
                <p style={{ marginTop: "10px", color: p.hl ? "rgba(255,255,255,0.6)" : c.textSub, fontSize: "14px", lineHeight: 1.8 }}>{p.desc}</p>
                <div style={{ marginTop: "20px", paddingTop: "18px", borderTop: `1px solid ${p.hl ? c.borderDark : c.border}`, display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                  {p.ft.map(f => (<div key={f} className="ftRow" style={{ color: p.hl ? "rgba(255,255,255,0.8)" : c.textSub }}><Chk dark={p.hl} /><span>{f}</span></div>))}
                </div>
                <a href="#waitlist" className="btnP" style={{ marginTop: "22px", width: "100%", background: p.hl ? "#fff" : c.bgDark, color: p.hl ? c.bgDark : "#fff", border: "none" }}>{p.cta}</a>
              </div></FadeIn>
            ))}</div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="container"><FadeIn><div className="metGrid">{metrics.map(m => (<div key={m.l} className="metCell"><div className="serif metVal">{m.v}</div><div className="metLab">{m.l}</div></div>))}</div></FadeIn></div>
        </section>

        <section id="waitlist" className="sec">
          <div className="container"><FadeIn><div className="wlCard">
            <SH badge="Get early access" title={<>Join the next wave of Laura users.</>} body="Choose how you want to use Laura. We will tailor the next step." />
            <form className="wlForm" onSubmit={handleSubmit}>
              <input className="inp" type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
              <select className="inp" value={role} onChange={e => setRole(e.target.value as RoleKey)}><option value="patient">Patient</option><option value="provider">Provider</option><option value="developer">Developer</option></select>
              <input type="text" name="website" value={website} onChange={e => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none", height: 0, width: 0 }} />
              <button type="submit" className="btnP wlBtn" disabled={submitting || !agreed}>{submitting ? "Submitting..." : "Get early access"}</button>
            </form>
            <label className="pvLabel"><input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} required className="pvCheck" /><span>I agree that Omela may use my information to manage my early access request. <Link href="/privacy" className="pvLink">Privacy Notice</Link>.</span></label>
            <p className="pvNote">We will not sell your personal information.</p>
            {success && <div className="fmOk">{success}</div>}
            {error && <div className="fmErr">{error}</div>}
          </div></FadeIn></div>
        </section>

        <section style={{ padding: "0 0 40px" }}><div className="container"><div className="emNotice">Laura is an AI care-access assistant for triage support, provider discovery, and navigation. She is not a substitute for emergency services or clinical diagnosis. If you believe you are experiencing an emergency, contact emergency services immediately.</div></div></section>

        <footer className="ft">
          <div className="container ftInner">
            <Link href="/" className="navBrand"><div className="navLogo" style={{ width: "30px", height: "30px" }}><Image src="/omela-logo-mark.png" alt="Omela" width={30} height={30} style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div><div><div style={{ fontSize: "13px", fontWeight: 800 }}>Omela</div><div className="serif" style={{ fontSize: "11px", color: c.textMuted, fontStyle: "italic" }}>Powered by Laura</div></div></Link>
            <div className="ftLinks"><Link href="/privacy" className="ftLink">Privacy Notice</Link><Link href="/terms" className="ftLink">Terms</Link><a href="mailto:notice@omela.ai" className="ftLink">Contact</a></div>
            <p className="ftCopy">&copy; 2026 Omela. Built for modern care access.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════
   CSS
   ══════════════════════════════════════════════════════════════ */
const CSS = `
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
html,body{max-width:100%;overflow-x:clip}
body{background:${c.bg};color:${c.text};font-family:'DM Sans',-apple-system,sans-serif;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
button,input,select{font-family:inherit}
::selection{background:${c.accent};color:#fff}
@keyframes blink{0%,50%{opacity:1}50.01%,100%{opacity:0}}
@keyframes pillShine{0%{transform:translateX(-100%) skewX(-15deg)}100%{transform:translateX(250%) skewX(-15deg)}}

.serif{font-family:'Instrument Serif',Georgia,serif}
.wrap{width:100%;overflow-x:clip}
.container{max-width:1220px;margin:0 auto;padding:0 16px}
.sec{padding:56px 0}
.secDark{padding:56px 0;background:radial-gradient(circle at 16% 20%,rgba(37,99,235,0.08) 0%,transparent 28%),${c.bgDark};color:#fff}

.statusBar{background:${c.greenSoft};border-bottom:1px solid rgba(34,197,94,0.15);padding:8px 0}
.statusInner{display:flex;align-items:center;gap:8px}
.statusLeft{display:flex;align-items:center;gap:8px;flex-shrink:0}
.statusDot{width:8px;height:8px;border-radius:999px;background:${c.green};display:inline-block;box-shadow:0 0 8px ${c.green}44}
.statusLabel{font-size:11px;font-weight:700;color:${c.greenDark};white-space:nowrap}
.statusTicker{flex:1;min-width:0;overflow:hidden;mask-image:linear-gradient(90deg,transparent,black 10%,black 90%,transparent);-webkit-mask-image:linear-gradient(90deg,transparent,black 10%,black 90%,transparent)}
.statusTickerTrack{display:flex;gap:16px;width:max-content}
.statusSvc{font-size:10px;color:${c.textMuted};font-weight:600;display:flex;align-items:center;gap:4px;white-space:nowrap}
.statusSvcDot{width:5px;height:5px;border-radius:999px;background:${c.green};display:inline-block;flex-shrink:0}

.pill{display:inline-flex;align-items:center;gap:8px;padding:9px 14px;border-radius:999px;border:1px solid ${c.border};background:rgba(255,255,255,0.8);backdrop-filter:blur(12px);font-size:12px;font-weight:700;color:${c.textSub};box-shadow:0 4px 16px rgba(0,0,0,0.03);position:relative;overflow:hidden}
.pillAnim{border-color:rgba(37,99,235,0.12);background:linear-gradient(135deg,rgba(255,255,255,0.92),rgba(236,242,255,0.5))}
.pillShine{position:absolute;top:0;left:0;width:50%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent);animation:pillShine 3s ease-in-out infinite}
.pillInner{position:relative;z-index:2;display:inline-flex;align-items:center;gap:8px}
.greenDot{width:8px;height:8px;border-radius:999px;background:${c.green};display:inline-block;box-shadow:0 0 6px rgba(34,197,94,0.3);flex-shrink:0}

.chk{width:20px;height:20px;border-radius:999px;background:${c.greenSoft};color:${c.green};display:inline-flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;flex-shrink:0;margin-top:1px}
.chkD{background:rgba(34,197,94,0.12);color:#4ADE80}

.shWrap{text-align:center;max-width:780px;margin:0 auto}
.shTitle{font-size:clamp(26px,5vw,56px);line-height:1.04;letter-spacing:-0.045em}
.shBody{font-size:clamp(14px,2.2vw,17px);line-height:1.82;margin-top:14px;max-width:600px;margin-left:auto;margin-right:auto}

.btnP{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:${c.bgDark};color:#fff;border:none;border-radius:999px;padding:13px 22px;font-size:14px;font-weight:700;cursor:pointer;transition:all 0.25s;white-space:nowrap}
.btnP:hover{transform:translateY(-2px);box-shadow:0 12px 32px rgba(0,0,0,0.15);background:#161820}
.btnP:disabled{opacity:0.5;cursor:not-allowed;transform:none;box-shadow:none}
.btnS{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:rgba(255,255,255,0.85);color:${c.text};border:1px solid ${c.border};border-radius:999px;padding:13px 22px;font-size:14px;font-weight:700;cursor:pointer;transition:all 0.25s;white-space:nowrap}
.btnS:hover{background:#fff}

.nav{position:sticky;top:0;z-index:100;background:rgba(248,246,241,0.92);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid ${c.border}}
.navRow{display:flex;align-items:center;justify-content:space-between;gap:10px;height:60px}
.navBrand{display:flex;align-items:center;gap:8px;min-width:0;text-decoration:none;flex-shrink:0}
.navLogo{width:36px;height:36px;border-radius:11px;overflow:hidden;flex-shrink:0;box-shadow:0 4px 12px rgba(0,0,0,0.06)}
.navName{font-size:14px;font-weight:800;letter-spacing:-0.03em}
.navSub{font-size:11px;color:${c.textMuted};font-style:italic;margin-top:1px}
.navLinks{display:none;align-items:center;gap:24px}
.navLink{font-size:13px;font-weight:600;color:${c.textSub};transition:color 0.2s}
.navLink:hover{color:${c.text}}
.navCta{padding:9px 14px!important;font-size:12px!important;flex-shrink:0}
.navCtaL{display:none}.navCtaS{display:inline}

.heroSec{padding:40px 0 24px}
.heroText{max-width:600px}
.heroTitle{font-size:clamp(34px,8vw,84px);line-height:0.96;letter-spacing:-0.055em;margin-top:18px}
.heroAccent{color:${c.accent};font-style:italic;display:block}
.heroBody{margin-top:16px;font-size:clamp(15px,2.5vw,18px);line-height:1.78;color:${c.textSub};max-width:580px}
.heroBtns{display:flex;flex-direction:column;gap:10px;margin-top:24px}
.heroBtns .btnP,.heroBtns .btnS{width:100%;text-align:center}

.heroPhone{margin-top:32px;width:100%;display:flex;justify-content:center}
.phoneWrap{width:100%;max-width:340px}
.phoneFrame{position:relative;width:100%}
.phoneBezel{background:#1A1A1E;border-radius:40px;padding:8px;box-shadow:0 0 0 1px rgba(255,255,255,0.06),0 32px 64px rgba(0,0,0,0.14)}
.phoneDI{width:100px;height:28px;border-radius:999px;background:#000;margin:0 auto 6px;display:flex;align-items:center;justify-content:flex-end;padding-right:16px}
.phoneDICam{width:8px;height:8px;border-radius:999px;background:radial-gradient(circle,#1a2540,#0a1025);border:1px solid rgba(255,255,255,0.08)}
.phoneScr{background:#FAFAFA;border-radius:34px;overflow:hidden;display:flex;flex-direction:column}
.pHead{display:flex;align-items:center;justify-content:space-between;padding:10px 12px;background:#fff;border-bottom:1px solid #f0f0f0}
.pHeadL{display:flex;align-items:center;gap:8px;min-width:0}
.pHeadR{display:flex;gap:12px;flex-shrink:0}
.pAvatar{position:relative;width:34px;height:34px;border-radius:999px;overflow:hidden;flex-shrink:0;background:#E8EAF0;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.08)}
.pName{display:flex;align-items:center;gap:4px;font-size:13px;font-weight:700;color:${c.text}}
.pOnline{display:flex;align-items:center;gap:4px;font-size:10px;color:${c.green};font-weight:600;margin-top:1px}
.pOnlineDot{width:5px;height:5px;border-radius:999px;background:${c.green};display:inline-block}
.vBadge{display:inline-flex;flex-shrink:0}
.pEncrypt{display:flex;align-items:center;justify-content:center;gap:4px;padding:6px;background:#FFF8E1;font-size:9px;color:#92711A;font-weight:600}
.pBody{display:flex;flex-direction:column;gap:6px;padding:10px 8px;height:260px;overflow:hidden;justify-content:flex-end;background:linear-gradient(180deg,#F5F5F0,#ECE5DA);background-image:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23000' fill-opacity='.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")}
.pRow{display:flex}.pRowR{justify-content:flex-end}.pRowL{justify-content:flex-start}
.pBub{max-width:82%;padding:8px 10px;font-size:12px;line-height:1.5;word-break:break-word}
.pBubU{background:#E7FFDB;color:#111;border-radius:12px 12px 4px 12px;box-shadow:0 1px 2px rgba(0,0,0,0.06)}
.pBubL{background:#fff;color:#111;border-radius:12px 12px 12px 4px;box-shadow:0 1px 3px rgba(0,0,0,0.06)}
.pMeta{display:flex;align-items:center;gap:3px;justify-content:flex-end;margin-top:2px;font-size:9px;color:#8B919F;font-weight:500}
.pComp{padding:8px 8px 12px;display:flex;align-items:center;gap:6px;background:#F0EBE3}
.pCompField{flex:1;height:36px;border-radius:999px;background:#fff;border:none;display:flex;align-items:center;gap:8px;padding:0 10px;box-shadow:0 1px 3px rgba(0,0,0,0.04)}
.pCompMic{width:36px;height:36px;border-radius:999px;background:#25D366;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.pCallout{position:absolute;left:50%;transform:translateX(-50%);bottom:-20px;border-radius:999px;background:rgba(255,255,255,0.95);border:1px solid ${c.border};padding:9px 14px;color:${c.textSub};font-size:11px;font-weight:700;box-shadow:0 8px 24px rgba(0,0,0,0.08);display:flex;align-items:center;gap:6px;white-space:nowrap}

.capGrid{display:flex;flex-direction:column;gap:10px;margin-top:40px;width:100%}
.capCard{position:relative;border-radius:18px;border:1px solid ${c.border};background:rgba(255,255,255,0.92);backdrop-filter:blur(12px);box-shadow:0 8px 28px rgba(0,0,0,0.03);overflow:hidden;cursor:default;width:100%}
.capCardInner{position:relative;z-index:2;display:flex;flex-direction:column;gap:12px;padding:20px}
.capCardText{min-width:0}
.capCardTitle{font-size:15px;font-weight:800;letter-spacing:-0.02em}
.capCardBody{font-size:13px;line-height:1.6;color:${c.textSub};margin-top:2px}
.capIco{position:relative;width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(180deg,#F5F8FF,#EAF0FF);border:1px solid rgba(190,210,250,0.5);box-shadow:0 6px 18px rgba(37,99,235,0.06);overflow:hidden}
.capIcoPulse{position:absolute;inset:8px;border-radius:10px;background:rgba(37,99,235,0.12);z-index:1}

.mqSection{margin-top:40px}
.mqLabel{text-align:center;font-size:10px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;color:${c.textMuted};margin-bottom:16px}
.mqViewport{overflow:hidden;mask-image:linear-gradient(90deg,transparent,black 8%,black 92%,transparent);-webkit-mask-image:linear-gradient(90deg,transparent,black 8%,black 92%,transparent)}
.mqTrack{display:flex;align-items:center;gap:10px;width:max-content}
.mqCard{display:flex;align-items:center;justify-content:center;min-width:140px;height:56px;border:1px solid ${c.border};background:rgba(255,255,255,0.9);border-radius:14px;padding:10px 14px}
.mqImg{width:auto;max-width:90px;height:auto;max-height:22px;object-fit:contain}
.mqBlend{mix-blend-mode:multiply}
.mqCaption{margin-top:10px;text-align:center;font-size:11px;color:${c.textMuted}}

.g3{display:grid;grid-template-columns:1fr;gap:14px}
.g2{display:grid;grid-template-columns:1fr;gap:24px}

.card{background:rgba(255,255,255,0.92);border:1px solid ${c.border};border-radius:22px;padding:22px;min-width:0;box-shadow:0 8px 24px rgba(0,0,0,0.03);display:flex;flex-direction:column}
.cardDk{background:linear-gradient(180deg,#111318,#0D0F14)!important;border:1px solid ${c.borderDark}!important;color:#fff!important;box-shadow:0 24px 60px rgba(0,0,0,0.2)!important}
.cardNum{width:38px;height:38px;border-radius:12px;background:${c.accentSoft};color:${c.accent};display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:800}
.cardT{font-size:20px;font-weight:800;letter-spacing:-0.03em;margin-top:14px}
.cardB{margin-top:6px;color:${c.textSub};font-size:14px;line-height:1.78}
.dkCard{background:linear-gradient(180deg,rgba(16,19,24,0.98),rgba(13,15,20,0.98));border:1px solid ${c.borderDark};border-radius:22px;padding:22px;box-shadow:0 20px 50px rgba(0,0,0,0.2)}
.dkCardT{font-size:clamp(18px,3vw,26px);font-weight:800;letter-spacing:-0.03em;color:#fff}
.dkCardB{margin-top:12px;color:rgba(255,255,255,0.6);font-size:14px;line-height:1.9}
.dkPill{display:inline-flex;margin-top:18px;padding:9px 12px;border-radius:999px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.04);color:rgba(255,255,255,0.7);font-size:11px;font-weight:700}
.ftList{display:flex;flex-direction:column;gap:8px;margin-top:14px}
.ftRow{display:flex;align-items:flex-start;gap:8px;font-size:13px;line-height:1.65;color:${c.textSub}}
.secT2{font-size:clamp(24px,5vw,48px);line-height:1.06;letter-spacing:-0.04em;margin-top:14px}
.secB2{margin-top:12px;color:${c.textSub};font-size:clamp(14px,2.5vw,16px);line-height:1.84;max-width:540px}

.wfGrid{display:grid;grid-template-columns:1fr;gap:12px;margin-top:36px}
.wfCard{background:#fff;border:1px solid ${c.border};border-radius:18px;padding:20px;position:relative;box-shadow:0 6px 18px rgba(0,0,0,0.03)}
.wfArrow{display:none}
.wfStep{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;color:${c.textMuted}}
.wfTitle{margin-top:8px;font-size:17px;font-weight:800;letter-spacing:-0.03em}
.wfBody{margin-top:6px;color:${c.textSub};font-size:13px;line-height:1.75}

/* TERMINAL — FIXED HEIGHT prevents layout shift */
.term{background:#07080B;border:1px solid #1F2330;border-radius:16px;overflow:hidden;box-shadow:0 18px 44px rgba(0,0,0,0.2)}
.termTop{display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid #1B1F2B;background:#0E1118}
.termDots{display:flex;gap:6px}
.termDots span{width:9px;height:9px;border-radius:999px;display:inline-block}
.termDots span:nth-child(1){background:#FF5F57}
.termDots span:nth-child(2){background:#FEBC2E}
.termDots span:nth-child(3){background:#28C840}
.termTitle{font-size:11px;color:#6B7280;font-weight:700}
.termBody{padding:14px;height:300px;overflow:hidden}
.termLine{white-space:pre-wrap;word-break:break-all;font-size:11px;line-height:1.8;font-family:'SF Mono',ui-monospace,Menlo,Consolas,monospace}
.termCur{color:#60A5FA;animation:blink 0.8s step-end infinite}

.prCard{border:1px solid ${c.border};background:#fff;border-radius:20px;padding:18px;box-shadow:0 10px 28px rgba(0,0,0,0.03)}
.prLabel{font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:${c.textMuted};margin-bottom:10px}
.prBox{border:1px solid ${c.border};background:#FCFBF8;border-radius:14px;min-height:90px;padding:14px;font-size:15px;line-height:1.7;color:${c.text}}
.prCur{color:${c.accent};animation:blink 1s step-end infinite}

.prBadge{position:absolute;top:14px;right:14px;border-radius:999px;padding:5px 10px;background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.75);font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em}

.metGrid{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:${c.border};border:1px solid ${c.border};border-radius:16px;overflow:hidden}
.metCell{background:#fff;padding:20px 14px;text-align:center}
.metVal{font-size:clamp(26px,5vw,38px);letter-spacing:-0.05em;line-height:1}
.metLab{margin-top:6px;font-size:11px;color:${c.textSub}}

.wlCard{background:rgba(255,255,255,0.92);border:1px solid ${c.border};border-radius:22px;padding:22px;max-width:920px;margin:0 auto;box-shadow:0 14px 38px rgba(0,0,0,0.04)}
.wlForm{display:grid;grid-template-columns:1fr;gap:10px;margin-top:18px}
.wlBtn{height:50px;width:100%}
.inp{width:100%;height:50px;border-radius:14px;border:1px solid ${c.border};background:#fff;padding:0 14px;font-size:14px;color:${c.text};outline:none}
.inp:focus{border-color:${c.accent};box-shadow:0 0 0 3px rgba(37,99,235,0.06)}
.pvLabel{display:flex;align-items:flex-start;gap:8px;margin-top:12px;color:${c.textSub};font-size:11px;line-height:1.7;cursor:pointer}
.pvCheck{margin-top:2px;width:16px;height:16px;accent-color:${c.accent};flex-shrink:0}
.pvLink{color:${c.text};font-weight:700;text-decoration:underline;text-underline-offset:3px}
.pvNote{margin-top:6px;text-align:center;color:${c.textMuted};font-size:10px}
.fmOk{margin-top:12px;border:1px solid ${c.border};background:${c.greenSoft};color:${c.greenDark};border-radius:12px;padding:12px;text-align:center;font-size:13px;font-weight:600}
.fmErr{margin-top:12px;border:1px solid ${c.border};background:#FFF7F7;color:#B91C1C;border-radius:12px;padding:12px;text-align:center;font-size:13px;font-weight:600}

.emNotice{text-align:center;font-size:11px;line-height:1.7;color:${c.textMuted};max-width:700px;margin:0 auto;padding:14px;border:1px solid ${c.border};border-radius:14px;background:rgba(255,255,255,0.6)}

.modOv{position:fixed;inset:0;z-index:220;background:rgba(9,10,13,0.4);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;padding:16px}
.modBox{width:100%;max-width:440px;background:rgba(255,255,255,0.96);border:1px solid ${c.border};border-radius:22px;padding:22px;box-shadow:0 36px 80px rgba(0,0,0,0.18)}
.modIco{width:48px;height:48px;border-radius:14px;background:linear-gradient(180deg,#F7FBFF,${c.accentSoft});border:1px solid ${c.border};display:flex;align-items:center;justify-content:center}
.modEy{margin-top:12px;font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:${c.textMuted}}
.modTitle{font-size:clamp(22px,4vw,34px);line-height:1.04;letter-spacing:-0.04em;margin-top:6px}
.modBody{margin-top:8px;color:${c.textSub};font-size:13px;line-height:1.8}

.ft{border-top:1px solid ${c.border};padding:22px 0 28px}
.ftInner{display:flex;flex-direction:column;gap:14px;align-items:center;text-align:center}
.ftLinks{display:flex;gap:14px;flex-wrap:wrap;justify-content:center}
.ftLink{font-size:12px;color:${c.textMuted};font-weight:600;transition:color 0.2s}
.ftLink:hover{color:${c.text}}
.ftCopy{font-size:11px;color:${c.textMuted}}

/* TABLET 640px+ */
@media(min-width:640px){
  .container{padding:0 24px}
  .sec{padding:72px 0}.secDark{padding:72px 0}
  .navRow{height:68px}
  .navCta{padding:10px 18px!important;font-size:13px!important}
  .navCtaL{display:inline}.navCtaS{display:none}
  .heroSec{padding:52px 0 32px}
  .heroBtns{flex-direction:row}
  .heroBtns .btnP,.heroBtns .btnS{width:auto}
  .g3{grid-template-columns:repeat(2,1fr);gap:16px}
  .g2{grid-template-columns:repeat(2,1fr);gap:28px}
  .metGrid{grid-template-columns:repeat(4,1fr)}
  .wlForm{grid-template-columns:1.2fr 0.8fr auto}
  .wlBtn{height:50px;width:auto}
  .wlCard{padding:28px}
  .capCardInner{flex-direction:row;align-items:center;gap:16px;padding:18px 22px}
  .pBody{height:300px}
  .phoneWrap{max-width:360px}
  .pCallout{left:auto;right:-10px;bottom:28px;transform:none}
  .mqCard{min-width:170px;height:64px}
  .mqImg{max-width:100px;max-height:24px}
  .ftInner{flex-direction:row;justify-content:space-between;text-align:left}
  .termBody{height:320px}
}

/* DESKTOP 960px+ */
@media(min-width:960px){
  .container{padding:0 40px}
  .sec{padding:88px 0}.secDark{padding:88px 0}
  .navLinks{display:flex}
  .navRow{height:76px}
  .navCta{padding:11px 22px!important;font-size:14px!important}
  .heroSec{padding:64px 0 40px}
  .heroSec .container{display:grid;grid-template-columns:1.05fr 0.95fr;grid-template-rows:auto auto auto;gap:0 48px}
  .heroText{grid-column:1;grid-row:1}
  .heroPhone{grid-column:2;grid-row:1/3;margin-top:0;align-self:start}
  .capGrid{grid-column:1;grid-row:2;margin-top:32px}
  .mqSection{grid-column:1/-1;grid-row:3}
  .g3{grid-template-columns:repeat(3,1fr);gap:18px}
  .wfGrid{grid-template-columns:repeat(3,1fr);gap:18px}
  .wfArrow{display:flex;position:absolute;top:50%;right:-17px;transform:translateY(-50%);width:34px;height:34px;border-radius:999px;background:#fff;border:1px solid ${c.border};align-items:center;justify-content:center;z-index:2;box-shadow:0 4px 12px rgba(0,0,0,0.04)}
  .phoneWrap{max-width:380px}
  .phoneBezel{border-radius:46px;padding:10px}
  .phoneScr{border-radius:38px}
  .pBody{height:340px}
  .card{padding:28px;border-radius:26px}
  .dkCard{padding:30px;border-radius:26px}
  .mqCard{min-width:200px;height:76px}
  .mqImg{max-width:120px;max-height:28px}
  .termBody{height:340px}
}

@media(min-width:1100px){
  .heroTitle{font-size:clamp(60px,7vw,84px)}
}
`;
