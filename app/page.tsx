"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Blocks, Heart, Mic } from "lucide-react";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');`;

const c = {
  bg: "#F8F6F1", card: "#FFFFFF", dark: "#08090C", darkCard: "#111318",
  text: "#141517", sub: "#555B69", muted: "#8B919F",
  accent: "#2563EB", accentSoft: "#ECF2FF",
  border: "#E3DDD2", borderDk: "#222633",
  green: "#22C55E", greenSoft: "#ECFDF3", greenDk: "#15803D",
};

type Role = "patient" | "provider" | "developer";

function FadeIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const v = useInView(ref, { once: true, amount: 0.08 });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>;
}

function Pill({ children }: { children: ReactNode }) {
  return <div className="pill"><span className="pillInner">{children}</span></div>;
}

function ComingSoon() {
  return <span className="comingSoon"><span className="csShine" />Soon</span>;
}

function SH({ badge, title, body, dark = false }: { badge?: string; title: ReactNode; body?: string; dark?: boolean }) {
  return (
    <div className="shWrap">
      {badge && <Pill>{badge}</Pill>}
      <h2 className="serif shTitle" style={{ marginTop: badge ? "18px" : 0, color: dark ? "#fff" : c.text }}>{title}</h2>
      {body && <p className="shBody" style={{ color: dark ? "rgba(255,255,255,0.6)" : c.sub }}>{body}</p>}
    </div>
  );
}

function Chk({ dark = false }: { dark?: boolean }) {
  return <span className={`chk${dark ? " chkD" : ""}`}>&#10003;</span>;
}

/* Status Bar */
function StatusBar() {
  const items = ["Laura Chat", "Urgency Engine", "Provider Search", "Translation", "Laura Chat", "Urgency Engine", "Provider Search", "Translation"];
  return (
    <div className="statusBar">
      <div className="container statusInner">
        <div className="statusLeft">
          <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} className="statusDot" />
          <span className="statusLabel">All systems operational</span>
          <Link href="/status" className="statusLink">View status</Link>
        </div>
        <div className="statusTicker">
          <motion.div className="statusTickerTrack" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 22, ease: "linear", repeat: Infinity }}>
            {items.map((s, i) => (<span key={`${s}-${i}`} className="statusSvc"><span className="svcDot" />{s}</span>))}
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
      <motion.span className="capPulse" animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: type === "heart" ? 0.3 : type === "infra" ? 0.6 : 0 }} />
      <motion.div animate={type === "voice" ? { y: [0, -2, 0] } : type === "heart" ? { scale: [1, 1.08, 0.97, 1.06, 1] } : { rotate: [0, 4, 0, -4, 0] }} transition={{ duration: type === "heart" ? 1.8 : 2.6, repeat: Infinity, ease: "easeInOut" }} style={{ position: "relative", zIndex: 2 }}>
        <Icon size={20} strokeWidth={2} color={c.accent} />
      </motion.div>
    </div>
  );
}

function HeroCaps() {
  const cards = [
    { type: "voice" as const, title: "Skip the phone queue", body: "Talk to Laura anytime, in 40+ languages. No busy signals, no hold music, no 8am rush." },
    { type: "heart" as const, title: "Know if it's urgent", body: "Laura checks your symptoms and tells you whether you need same-day advice, a routine visit, or emergency care." },
    { type: "infra" as const, title: "Find care near you", body: "Laura finds GP and dental practices near your postcode and can request a callback on your behalf." },
  ];
  return (
    <div className="capGrid">
      {cards.map((card, i) => (
        <motion.div key={card.title} className="capCard" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }} whileHover={{ y: -3, boxShadow: "0 20px 48px rgba(0,0,0,0.06)", transition: { duration: 0.2 } }}>
          <div className="capInner">
            <CapIcon type={card.type} />
            <div className="capText">
              <h3 className="capTitle">{card.title}</h3>
              <p className="capBody">{card.body}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* Phone Mockup */
function VBadge() {
  return <span className="vBadge"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 1L14.9 3.6L18.6 3.2L19.4 6.8L22.5 8.7L21.2 12.2L22.5 15.7L19.4 17.6L18.6 21.2L14.9 20.8L12 23.4L9.1 20.8L5.4 21.2L4.6 17.6L1.5 15.7L2.8 12.2L1.5 8.7L4.6 6.8L5.4 3.2L9.1 3.6L12 1Z" fill="#22C55E"/><path d="M8.5 12.5L10.5 14.5L15.5 9.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>;
}

function PhoneMockup() {
  const msgs = useMemo(() => [
    { from: "u" as const, text: "I have a sore throat, fever, and I feel weak. What should I do?" },
    { from: "l" as const, text: "Based on what you described, a persistent fever with weakness may need same-day clinical advice. Let me find a GP near you." },
    { from: "u" as const, text: "Yes please, I'm in HD1." },
    { from: "l" as const, text: "I found 3 GP practices near HD1. The nearest has availability tomorrow at 9:30 AM. Shall I request a callback for you?" },
  ], []);
  const [disp, setDisp] = useState<string[]>(Array(msgs.length).fill(""));
  const [ai, setAi] = useState(0);
  useEffect(() => {
    const cur = msgs[ai]; if (!cur) return;
    const shown = disp[ai] ?? "";
    let t: number | undefined;
    if (shown.length < cur.text.length) { t = window.setTimeout(() => { setDisp(p => { const n = [...p]; n[ai] = cur.text.slice(0, shown.length + 1); return n; }); }, cur.from === "u" ? 20 : 14); }
    else if (ai < msgs.length - 1) { t = window.setTimeout(() => setAi(p => p + 1), 600); }
    else { t = window.setTimeout(() => { setDisp(Array(msgs.length).fill("")); setAi(0); }, 2200); }
    return () => { if (t) clearTimeout(t); };
  }, [ai, disp, msgs]);
  const st = (i: number) => { const d = disp[i]?.length === msgs[i].text.length; if (!d) return "s"; if (i === 0) return ai >= 1 ? "r" : "d"; if (i === 2) return disp[3]?.length === msgs[3].text.length ? "r" : "d"; return "d"; };

  return (
    <div className="phoneWrap">
      <motion.div className="phoneFrame" initial={{ opacity: 0, y: 24, rotateY: -4 }} whileInView={{ opacity: 1, y: 0, rotateY: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
        <div className="phoneBezel">
          <div className="phoneDI"><div className="diCam" /></div>
          <div className="phoneScr">
            <div className="pHead">
              <div className="pHeadL">
                <div className="pAv"><Image src="/laura-avatar.png" alt="Laura" fill sizes="32px" style={{ objectFit: "cover" }} /></div>
                <div><div className="pName">Laura <VBadge /></div><div className="pOn"><motion.span animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.8, repeat: Infinity }} className="pOnD" />online</div></div>
              </div>
              <div className="pHeadR">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B919F" strokeWidth="1.8"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" /></svg>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B919F" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72"/></svg>
              </div>
            </div>
            <div className="pEnc"><svg width="7" height="7" viewBox="0 0 24 24" fill="#92711A"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" fill="none" stroke="#92711A" strokeWidth="2"/></svg>End-to-end encrypted</div>
            <div className="pBody">
              {msgs.map((msg, i) => { const text = disp[i]; if (!text) return null; const s = st(i); return (
                <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className={`pRow ${msg.from === "u" ? "pRowR" : "pRowL"}`}>
                  <div className={`pBub ${msg.from === "u" ? "pBubU" : "pBubL"}`}>
                    {text}
                    <span className="pMeta"><span>9:{30 + i}</span>{msg.from === "u" && <svg width="12" height="8" viewBox="0 0 20 14" fill="none"><path d="M1.5 7.6L4.7 10.8L10.2 5.2" stroke={s === "r" ? "#53BDEB" : "#8B919F"} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /><path d="M7.3 7.6L10.5 10.8L18.2 3.2" stroke={s === "r" ? "#53BDEB" : "#8B919F"} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>}</span>
                  </div>
                </motion.div>
              ); })}
            </div>
            <div className="pComp"><div className="pCompF"><span style={{ fontSize: "14px", opacity: 0.4 }}>&#128522;</span><span style={{ color: c.muted, fontSize: "12px", flex: 1 }}>Message</span></div><div className="pCompM"><Mic size={14} color="#fff" strokeWidth={2.2} /></div></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* Logo Marquee */
function LogoMarquee() {
  const logos = [{ n: "AWS", s: "/logos/aws-logo.png" }, { n: "Microsoft", s: "/logos/microsoft-logo.png" }, { n: "Google", s: "/logos/google-logo.png" }, { n: "Salesforce", s: "/logos/salesforce-logo.png" }, { n: "Twilio", s: "/logos/twilio-logo.png" }, { n: "Epic", s: "/logos/epic-logo.png" }, { n: "Veradigm", s: "/logos/veradigm-logo.png" }, { n: "GitHub", s: "/logos/github-logo.png", b: true }];
  const d = useMemo(() => [...logos, ...logos], []);
  return (
    <div className="mqSec">
      <p className="mqLabel">Designed for the systems behind modern care</p>
      <div className="mqVp"><motion.div className="mqTr" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 30, ease: "linear", repeat: Infinity }}>
        {d.map((l, i) => <div key={`${l.n}-${i}`} className="mqC"><Image src={l.s} alt={l.n} width={110} height={32} className={`mqI${l.b ? " mqB" : ""}`} /></div>)}
      </motion.div></div>
    </div>
  );
}

/* SDK Terminal */
function SDKTerminal() {
  const lines = useMemo(() => ['$ npm install @omela/laura-sdk', '', '  import { Laura } from "@omela/laura-sdk";', '', '  const laura = new Laura({', '    apiKey: process.env.OMELA_KEY,', '    region: "eu-west-2"', '  });', '', '  const res = await laura.chat({', '    userId: "patient_8291",', '    lang: "yo",', '    message: "Mo ni iba ati efori."', '  });', '', '  > Laura is responding in Yoruba...', '  Done in 1.2s'], []);
  const [vl, setVl] = useState(0); const [ci, setCi] = useState(0);
  useEffect(() => {
    if (vl >= lines.length) { const t = setTimeout(() => { setVl(0); setCi(0); }, 3000); return () => clearTimeout(t); }
    const line = lines[vl];
    if (ci < line.length) { const t = setTimeout(() => setCi(p => p + 1), line.startsWith("  >") ? 36 : 18); return () => clearTimeout(t); }
    else { const t = setTimeout(() => { setVl(p => p + 1); setCi(0); }, line === "" ? 60 : 180); return () => clearTimeout(t); }
  }, [vl, ci, lines]);
  return (
    <div className="term">
      <div className="termTop"><div className="termDots"><span /><span /><span /></div><span className="termTitle">Laura SDK</span><ComingSoon /></div>
      <div className="termBody">{lines.slice(0, vl + 1).map((line, i) => { const a = i === vl; return (
        <div key={i} className="termLine" style={{ color: line.startsWith("  Done") ? "#4ADE80" : line.startsWith("  >") ? "#FBBF24" : line.startsWith("$") ? "#E2E8F0" : "#94A3B8" }}>
          {a ? line.slice(0, ci) : line}{a && <span className="termCur">|</span>}
        </div>
      ); })}</div>
    </div>
  );
}

/* Success Modal */
function SuccessModal({ open, role, onClose }: { open: boolean; role: Role; onClose: () => void }) {
  const m: Record<Role, { ey: string; t: string; b: string }> = {
    patient: { ey: "Early access confirmed", t: "You are in early.", b: "Laura will reach out as access opens. Follow us on X @joinomela." },
    provider: { ey: "Provider access confirmed", t: "Your place is reserved.", b: "Laura will reach out as live operations open. Follow @joinomela." },
    developer: { ey: "Developer access confirmed", t: "You are on the list.", b: "Laura will reach out as API access opens. Follow @joinomela." },
  };
  const copy = m[role];
  return <AnimatePresence>{open && (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="modOv">
      <motion.div initial={{ opacity: 0, y: 16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12 }} onClick={e => e.stopPropagation()} className="modBox">
        <div className="modIco"><svg width="24" height="24" viewBox="0 0 32 32" fill="none"><path d="M7 16.5L12.8 22L25 9.5" stroke={c.green} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
        <div className="modEy">{copy.ey}</div>
        <h3 className="serif modTitle">{copy.t}</h3>
        <p className="modBody">{copy.b}</p>
        <div style={{ marginTop: "18px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <a href="https://x.com/joinomela" target="_blank" rel="noreferrer" className="btnP">Follow on X</a>
          <button type="button" className="btnS" onClick={onClose}>Continue</button>
        </div>
      </motion.div>
    </motion.div>
  )}</AnimatePresence>;
}

/* ════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════ */
export default function Page() {
  const [role, setRole] = useState<Role>("patient");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
      <style>{FONT}</style>
      <style>{CSS}</style>
      <SuccessModal open={modalOpen} role={role} onClose={() => setModalOpen(false)} />
      <div className="wrap">
        <StatusBar />

        {/* NAV */}
        <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="nav">
          <div className="container navRow">
            <Link href="/" className="navBrand">
              <div className="navLogo"><Image src="/omela-logo-mark.png" alt="Omela" width={36} height={36} style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
              <div><div className="navName">Omela</div><div className="navSub serif">Powered by Laura</div></div>
            </Link>
            <div className="navLinks">
              {["People", "Providers", "Developers", "Pricing"].map(i => <a key={i} href={`#${i.toLowerCase()}`} className="navLink">{i}</a>)}
            </div>
            <a href="#waitlist" className="btnP navCta"><span className="navCtaL">Get early access</span><span className="navCtaS">Early access</span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg></a>
          </div>
        </motion.nav>

        {/* HERO */}
        <section className="heroSec">
          <div className="container">
            <div className="heroText">
              <FadeIn>
                <Pill>
                  <span className="pillStar">&#10038;</span>
                  <span>Now onboarding early access users</span>
                </Pill>
              </FadeIn>
              <FadeIn delay={0.06}><h1 className="serif heroTitle">Never wait on hold<span className="heroAccent">for your GP again.</span></h1></FadeIn>
              <FadeIn delay={0.12}><p className="heroBody">Laura is an AI health assistant that checks your symptoms, tells you how urgent it is, finds nearby GPs and dentists, and requests a callback for you. Available 24/7, in 40+ languages, with no queue and no busy signal.</p></FadeIn>
              <FadeIn delay={0.18}><div className="heroBtns">
                <Link href="/demo" className="btnP">Try Laura <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg></Link>
                <a href="#waitlist" className="btnS">Get early access</a>
              </div></FadeIn>
              <FadeIn delay={0.2}><p className="heroSub">Free for early users. No app download required.</p></FadeIn>
            </div>
            <div className="heroPhone"><PhoneMockup /></div>
            <FadeIn delay={0.24}><HeroCaps /></FadeIn>
            <FadeIn delay={0.3}><LogoMarquee /></FadeIn>
          </div>
        </section>

        {/* WHO IS LAURA FOR */}
        <section id="people" className="sec">
          <div className="container">
            <FadeIn><SH badge="Who is Laura for?" title={<>Three audiences. One platform.</>} body="Whether you are a patient trying to get seen, a practice trying to manage demand, or a developer building health products." /></FadeIn>
            <div className="g3" style={{ marginTop: "44px" }}>
              {[
                { title: "For people", desc: "You call at 8am and get a busy tone. You sit on symptoms because you are not sure if it is worth calling. You moved to a new area and have no GP. Laura gives you a way in.", bullets: ["Skip the phone queue", "Check how urgent it is", "Find practices near you", "Request a callback"], ico: "1" },
                { title: "For care teams", desc: "Your receptionists are drowning in routine calls. Laura handles the intake, sorts by urgency, and sends structured requests so your team can focus on patients, not phones.", bullets: ["Reduce reception pressure", "See urgency at a glance", "Structured callback requests", "Multilingual patient access"], ico: "2" },
                { title: "For developers", desc: "Embed Laura into your health app, patient portal, or marketplace. Our API and SDK let you add care-access intelligence without building it from scratch.", bullets: ["API and SDK access", "Embeddable chat widget", "Workflow triggers", "Audit logs and auth"], ico: "3", soon: true },
              ].map((card, i) => (
                <FadeIn key={card.title} delay={i * 0.1}><div className="card">
                  <div className="cardNum">{card.ico}{card.soon && <ComingSoon />}</div>
                  <h3 className="cardT">{card.title}</h3>
                  <p className="cardB">{card.desc}</p>
                  <div className="ftList">{card.bullets.map(b => <div key={b} className="ftRow"><Chk /><span>{b}</span></div>)}</div>
                </div></FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="providers" className="sec" style={{ paddingTop: "24px" }}>
          <div className="container">
            <FadeIn><SH badge="How it works" title={<>Three steps. No waiting.</>} body="Laura replaces the 8am phone rush with a calm, structured process that works for patients and care teams." /></FadeIn>
            <div className="wfGrid">
              {[
                { title: "You describe what is wrong", body: "Tell Laura your symptoms in plain language. She works in 40+ languages, so you can speak in the one you are most comfortable with." },
                { title: "Laura checks the urgency", body: "She sorts your concern into urgency levels: routine, soon, urgent, or emergency. No guessing, no Googling, no panic." },
                { title: "You get matched to care", body: "Laura finds nearby GP or dental practices, checks availability, and requests a callback on your behalf. You wake up with a confirmed slot." },
              ].map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.1}><div className="wfCard">
                  {i < 2 && <div className="wfArrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg></div>}
                  <div className="wfStep">Step {i + 1}</div><h3 className="wfTitle">{item.title}</h3><p className="wfBody">{item.body}</p>
                </div></FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* GLOBAL */}
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="container">
            <FadeIn>
              <div className="globalCard">
                <h2 className="serif globalTitle">Laura speaks your language.</h2>
                <p className="globalBody">Whether you speak English, Yoruba, Urdu, Polish, Spanish, Arabic, or Mandarin, Laura replies in the language you start with. No translators, no confusion, no barriers to care.</p>
                <div className="globalFlags">
                  {["🇬🇧 United Kingdom", "🇺🇸 United States", "🇳🇬 Nigeria", "🇮🇳 India", "🇵🇰 Pakistan", "🇵🇱 Poland", "🇪🇸 Spain", "🌍 40+ languages"].map(f => (
                    <span key={f} className="globalFlag">{f}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* DEVELOPERS */}
        <section id="developers" className="secDark">
          <div className="container">
            <FadeIn><SH dark badge="Developer platform" title={<>Build with Laura.</>} body="Embed care access, urgency checks, and provider routing into your health products." /></FadeIn>
            <div className="g2" style={{ marginTop: "44px" }}>
              <FadeIn><SDKTerminal /></FadeIn>
              <FadeIn delay={0.1}><div className="dkCard">
                <h3 className="dkCardT">Built for integration teams</h3>
                <p className="dkCardB">Add Laura to patient portals, health apps, or internal tooling through a clean API layer.</p>
                <div className="ftList" style={{ marginTop: "20px" }}>
                  {["REST API and SDK access", "Embeddable chat widgets", "Patient workflow triggers", "Secure auth and audit trails"].map(f => <div key={f} className="ftRow" style={{ color: "rgba(255,255,255,0.8)" }}><Chk dark /><span>{f}</span></div>)}
                </div>
                <div className="dkPill">Developer access on the roadmap <ComingSoon /></div>
              </div></FadeIn>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="sec">
          <div className="container">
            <FadeIn><SH badge="Pricing" title={<>Simple, transparent access.</>} body="Start with the plan that fits. Scale as Laura becomes part of your workflow." /></FadeIn>
            <div className="g3" style={{ marginTop: "44px" }}>
              {[
                { name: "People", price: "\u00A33.99", period: "/mo", desc: "For individuals who want direct access to Laura for symptom checks, provider search, and callback requests.", ft: ["Symptom check and urgency", "GP and dental search", "Callback requests", "40+ languages"], hl: false, cta: "Join waitlist" },
                { name: "Care Teams", price: "\u00A31,999.99", period: "/mo", desc: "For practices that want Laura handling intake, urgency sorting, and callback management at scale.", ft: ["Structured patient intake", "Urgency dashboard", "Multilingual access", "Request management"], hl: true, badge: "Best for practices", cta: "Request demo" },
                { name: "Developer", price: "Custom", period: "", desc: "For teams embedding Laura into health products and patient journeys.", ft: ["API and SDK access", "Embeddable components", "Usage analytics", "Technical onboarding"], hl: false, cta: "Talk to us", soon: true },
              ].map((p, i) => (
                <FadeIn key={p.name} delay={i * 0.1}><div className={`card ${p.hl ? "cardDk" : ""}`} style={{ position: "relative" }}>
                  {p.badge && <div className="prBadge">{p.badge}</div>}
                  <div style={{ fontSize: "15px", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" }}>{p.name} {p.soon && <ComingSoon />}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginTop: "14px", flexWrap: "wrap" }}>
                    <span className="serif" style={{ fontSize: "clamp(30px, 5vw, 42px)", letterSpacing: "-0.05em" }}>{p.price}</span>
                    {p.period && <span style={{ fontSize: "13px", color: p.hl ? "rgba(255,255,255,0.5)" : c.muted }}>{p.period}</span>}
                  </div>
                  <p style={{ marginTop: "8px", color: p.hl ? "rgba(255,255,255,0.6)" : c.sub, fontSize: "13px", lineHeight: 1.8 }}>{p.desc}</p>
                  <div style={{ marginTop: "18px", paddingTop: "16px", borderTop: `1px solid ${p.hl ? c.borderDk : c.border}`, display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
                    {p.ft.map(f => <div key={f} className="ftRow" style={{ color: p.hl ? "rgba(255,255,255,0.8)" : c.sub }}><Chk dark={p.hl} /><span>{f}</span></div>)}
                  </div>
                  <a href="#waitlist" className="btnP" style={{ marginTop: "20px", width: "100%", background: p.hl ? "#fff" : c.dark, color: p.hl ? c.dark : "#fff", border: "none" }}>{p.cta}</a>
                </div></FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* HEALTH QUIZ TEASER */}
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="container">
            <FadeIn>
              <Link href="/quiz" className="quizCard">
                <div className="quizLeft">
                  <Pill>Daily health check</Pill>
                  <h3 className="serif quizTitle">Test your health knowledge.</h3>
                  <p className="quizBody">One question a day. Learn something new about your health in 30 seconds.</p>
                  <span className="btnP quizBtn">Take today's quiz <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg></span>
                </div>
                <div className="quizRight">
                  <div className="quizEmoji">&#129657;</div>
                </div>
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* METRICS */}
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="container"><FadeIn><div className="metGrid">
            {[{ v: "24/7", l: "Always available" }, { v: "40+", l: "Languages" }, { v: "<2s", l: "Response time" }, { v: "0", l: "Time on hold" }].map(m => <div key={m.l} className="metCell"><div className="serif metVal">{m.v}</div><div className="metLab">{m.l}</div></div>)}
          </div></FadeIn></div>
        </section>

        {/* WAITLIST */}
        <section id="waitlist" className="sec">
          <div className="container"><FadeIn><div className="wlCard">
            <SH badge="Get early access" title={<>Be the first to use Laura.</>} body="Tell us who you are and we will prioritize your access." />
            <form className="wlForm" onSubmit={handleSubmit}>
              <input className="inp" type="email" placeholder="Your email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
              <select className="inp" value={role} onChange={e => setRole(e.target.value as Role)}><option value="patient">I am a patient</option><option value="provider">I am a provider</option><option value="developer">I am a developer</option></select>
              <input type="text" name="website" value={website} onChange={e => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none", height: 0, width: 0 }} />
              <button type="submit" className="btnP wlBtn" disabled={submitting || !agreed}>{submitting ? "Submitting..." : "Get early access"}</button>
            </form>
            <label className="pvLabel"><input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} required className="pvCheck" /><span>I agree that Omela may use my information to manage my early access request. <Link href="/privacy" className="pvLink">Privacy Notice</Link>.</span></label>
            <p className="pvNote">We will not sell your personal information.</p>
            {success && <div className="fmOk">{success}</div>}
            {error && <div className="fmErr">{error}</div>}
          </div></FadeIn></div>
        </section>

        {/* EMERGENCY */}
        <section style={{ padding: "0 0 36px" }}><div className="container"><div className="emNotice">Laura is an AI care-access assistant. She is not a substitute for emergency services or clinical diagnosis. If you believe you are experiencing an emergency, call 999 (UK), 911 (US), or your local emergency number immediately.</div></div></section>

        {/* FOOTER */}
        <footer className="ft">
          <div className="container ftInner">
            <Link href="/" className="navBrand"><div className="navLogo" style={{ width: "28px", height: "28px" }}><Image src="/omela-logo-mark.png" alt="Omela" width={28} height={28} style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div><div><div style={{ fontSize: "12px", fontWeight: 800 }}>Omela</div><div className="serif" style={{ fontSize: "10px", color: c.muted, fontStyle: "italic" }}>Powered by Laura</div></div></Link>
            <div className="ftLinks">
              <Link href="/privacy" className="ftLink">Privacy</Link>
              <Link href="/terms" className="ftLink">Terms</Link>
              <Link href="/status" className="ftLink">Status</Link>
              <Link href="/quiz" className="ftLink">Health Quiz</Link>
              <Link href="/demo" className="ftLink">Try Laura</Link>
              <a href="mailto:notice@omela.ai" className="ftLink">Contact</a>
            </div>
            <p className="ftCopy">&copy; 2026 Omela. Built for modern care access.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

/* ═══════ CSS ═══════ */
const CSS = `
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
html,body{max-width:100%;overflow-x:clip}
body{background:${c.bg};color:${c.text};font-family:'DM Sans',-apple-system,sans-serif;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}button,input,select{font-family:inherit}
::selection{background:${c.accent};color:#fff}
@keyframes blink{0%,50%{opacity:1}50.01%,100%{opacity:0}}
@keyframes csShine{0%{transform:translateX(-100%)}100%{transform:translateX(200%)}}

.serif{font-family:'Instrument Serif',Georgia,serif}
.wrap{width:100%;overflow-x:clip}
.container{max-width:1220px;margin:0 auto;padding:0 16px}
.sec{padding:56px 0}.secDark{padding:56px 0;background:radial-gradient(circle at 16% 20%,rgba(37,99,235,0.08) 0%,transparent 28%),${c.dark};color:#fff}

/* Coming Soon tag */
.comingSoon{display:inline-flex;align-items:center;padding:3px 8px;border-radius:999px;background:linear-gradient(135deg,#FEF3C7,#FDE68A);color:#92400E;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.06em;position:relative;overflow:hidden;margin-left:6px;flex-shrink:0}
.csShine{position:absolute;top:0;left:0;width:60%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent);animation:csShine 2.5s ease-in-out infinite}

/* Status */
.statusBar{background:${c.greenSoft};border-bottom:1px solid rgba(34,197,94,0.15);padding:7px 0}
.statusInner{display:flex;align-items:center;gap:8px}
.statusLeft{display:flex;align-items:center;gap:8px;flex-shrink:0}
.statusDot{width:7px;height:7px;border-radius:999px;background:${c.green};display:inline-block;box-shadow:0 0 6px ${c.green}44}
.statusLabel{font-size:11px;font-weight:700;color:${c.greenDk};white-space:nowrap}
.statusLink{font-size:10px;font-weight:700;color:${c.accent};white-space:nowrap;text-decoration:underline;text-underline-offset:2px}
.statusTicker{flex:1;min-width:0;overflow:hidden;mask-image:linear-gradient(90deg,transparent,black 10%,black 90%,transparent);-webkit-mask-image:linear-gradient(90deg,transparent,black 10%,black 90%,transparent)}
.statusTickerTrack{display:flex;gap:14px;width:max-content}
.statusSvc{font-size:10px;color:${c.muted};font-weight:600;display:flex;align-items:center;gap:4px;white-space:nowrap}
.svcDot{width:4px;height:4px;border-radius:999px;background:${c.green};display:inline-block;flex-shrink:0}

/* Pill */
.pill{display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border-radius:999px;border:1px solid ${c.border};background:rgba(255,255,255,0.8);backdrop-filter:blur(10px);font-size:12px;font-weight:700;color:${c.sub};position:relative;overflow:hidden}
.pillInner{position:relative;z-index:2;display:inline-flex;align-items:center;gap:8px}
.pillStar{color:${c.accent};font-size:14px;flex-shrink:0}

.chk{width:18px;height:18px;border-radius:999px;background:${c.greenSoft};color:${c.green};display:inline-flex;align-items:center;justify-content:center;font-size:9px;font-weight:800;flex-shrink:0;margin-top:2px}
.chkD{background:rgba(34,197,94,0.12);color:#4ADE80}

.shWrap{text-align:center;max-width:720px;margin:0 auto}
.shTitle{font-size:clamp(26px,5vw,52px);line-height:1.04;letter-spacing:-0.045em}
.shBody{font-size:clamp(14px,2.2vw,16px);line-height:1.82;margin-top:12px;max-width:560px;margin-left:auto;margin-right:auto}

.btnP{display:inline-flex;align-items:center;justify-content:center;gap:7px;background:${c.dark};color:#fff;border:none;border-radius:999px;padding:12px 20px;font-size:13px;font-weight:700;cursor:pointer;transition:all 0.25s;white-space:nowrap}
.btnP:hover{transform:translateY(-1px);box-shadow:0 10px 28px rgba(0,0,0,0.14);background:#161820}
.btnP:disabled{opacity:0.5;cursor:not-allowed;transform:none;box-shadow:none}
.btnS{display:inline-flex;align-items:center;justify-content:center;gap:7px;background:rgba(255,255,255,0.85);color:${c.text};border:1px solid ${c.border};border-radius:999px;padding:12px 20px;font-size:13px;font-weight:700;cursor:pointer;transition:all 0.25s;white-space:nowrap}
.btnS:hover{background:#fff}

/* Nav */
.nav{position:sticky;top:0;z-index:100;background:rgba(248,246,241,0.92);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid ${c.border}}
.navRow{display:flex;align-items:center;justify-content:space-between;gap:10px;height:56px}
.navBrand{display:flex;align-items:center;gap:8px;min-width:0;text-decoration:none;flex-shrink:0}
.navLogo{width:32px;height:32px;border-radius:10px;overflow:hidden;flex-shrink:0;box-shadow:0 3px 10px rgba(0,0,0,0.06)}
.navName{font-size:13px;font-weight:800;letter-spacing:-0.03em}
.navSub{font-size:10px;color:${c.muted};font-style:italic;margin-top:1px}
.navLinks{display:none;align-items:center;gap:22px}
.navLink{font-size:13px;font-weight:600;color:${c.sub};transition:color 0.2s}
.navLink:hover{color:${c.text}}
.navCta{padding:8px 14px!important;font-size:11px!important;flex-shrink:0}
.navCtaL{display:none}.navCtaS{display:inline}

/* Hero */
.heroSec{padding:36px 0 20px}
.heroText{max-width:560px}
.heroTitle{font-size:clamp(32px,8vw,78px);line-height:0.96;letter-spacing:-0.055em;margin-top:16px}
.heroAccent{color:${c.accent};font-style:italic;display:block}
.heroBody{margin-top:14px;font-size:clamp(14px,2.5vw,17px);line-height:1.78;color:${c.sub};max-width:520px}
.heroSub{margin-top:10px;font-size:12px;color:${c.muted}}
.heroBtns{display:flex;flex-direction:column;gap:8px;margin-top:22px}
.heroBtns .btnP,.heroBtns .btnS{width:100%;text-align:center}

/* Phone - SMALLER and more realistic */
.phoneWrap{margin-top:28px;width:100%;display:flex;justify-content:center}
.phoneFrame{position:relative;width:100%;max-width:280px}
.phoneBezel{background:#1A1A1E;border-radius:36px;padding:7px;box-shadow:0 0 0 1px rgba(255,255,255,0.06),0 28px 56px rgba(0,0,0,0.14),inset 0 1px 0 rgba(255,255,255,0.04)}
.phoneDI{width:86px;height:24px;border-radius:999px;background:#000;margin:0 auto 4px;display:flex;align-items:center;justify-content:flex-end;padding-right:14px}
.diCam{width:7px;height:7px;border-radius:999px;background:radial-gradient(circle,#1a2540,#0a1025);border:1px solid rgba(255,255,255,0.08)}
.phoneScr{background:#FAFAFA;border-radius:30px;overflow:hidden;display:flex;flex-direction:column}
.pHead{display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:#fff;border-bottom:1px solid #f0f0f0}
.pHeadL{display:flex;align-items:center;gap:7px;min-width:0}
.pHeadR{display:flex;gap:10px;flex-shrink:0}
.pAv{position:relative;width:30px;height:30px;border-radius:999px;overflow:hidden;flex-shrink:0;background:#E8EAF0;border:1.5px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.08)}
.pName{display:flex;align-items:center;gap:3px;font-size:12px;font-weight:700;color:${c.text}}
.pOn{display:flex;align-items:center;gap:3px;font-size:9px;color:${c.green};font-weight:600;margin-top:1px}
.pOnD{width:4px;height:4px;border-radius:999px;background:${c.green};display:inline-block}
.vBadge{display:inline-flex;flex-shrink:0}
.pEnc{display:flex;align-items:center;justify-content:center;gap:3px;padding:4px;background:#FFF8E1;font-size:8px;color:#92711A;font-weight:600}
.pBody{display:flex;flex-direction:column;gap:5px;padding:8px 6px;height:220px;overflow:hidden;justify-content:flex-end;background:linear-gradient(180deg,#F5F5F0,#ECE5DA);background-image:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23000' fill-opacity='.015'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")}
.pRow{display:flex}.pRowR{justify-content:flex-end}.pRowL{justify-content:flex-start}
.pBub{max-width:84%;padding:6px 9px;font-size:10.5px;line-height:1.5;word-break:break-word}
.pBubU{background:#E7FFDB;color:#111;border-radius:10px 10px 3px 10px;box-shadow:0 1px 2px rgba(0,0,0,0.04)}
.pBubL{background:#fff;color:#111;border-radius:10px 10px 10px 3px;box-shadow:0 1px 2px rgba(0,0,0,0.04)}
.pMeta{display:flex;align-items:center;gap:2px;justify-content:flex-end;margin-top:1px;font-size:8px;color:#8B919F;font-weight:500}
.pComp{padding:6px 6px 10px;display:flex;align-items:center;gap:5px;background:#F0EBE3}
.pCompF{flex:1;height:30px;border-radius:999px;background:#fff;border:none;display:flex;align-items:center;gap:6px;padding:0 8px;box-shadow:0 1px 2px rgba(0,0,0,0.03)}
.pCompM{width:30px;height:30px;border-radius:999px;background:#25D366;display:flex;align-items:center;justify-content:center;flex-shrink:0}

/* Capability Cards */
.capGrid{display:flex;flex-direction:column;gap:8px;margin-top:36px;width:100%}
.capCard{position:relative;border-radius:16px;border:1px solid ${c.border};background:rgba(255,255,255,0.92);box-shadow:0 6px 22px rgba(0,0,0,0.025);overflow:hidden;width:100%}
.capInner{position:relative;z-index:2;display:flex;flex-direction:column;gap:10px;padding:16px 18px}
.capText{min-width:0}
.capTitle{font-size:14px;font-weight:800;letter-spacing:-0.02em}
.capBody{font-size:12px;line-height:1.6;color:${c.sub};margin-top:2px}
.capIco{position:relative;width:42px;height:42px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(180deg,#F5F8FF,#EAF0FF);border:1px solid rgba(190,210,250,0.5);box-shadow:0 4px 14px rgba(37,99,235,0.05);overflow:hidden}
.capPulse{position:absolute;inset:6px;border-radius:8px;background:rgba(37,99,235,0.1);z-index:1}

/* Marquee */
.mqSec{margin-top:36px}
.mqLabel{text-align:center;font-size:9px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;color:${c.muted};margin-bottom:14px}
.mqVp{overflow:hidden;mask-image:linear-gradient(90deg,transparent,black 8%,black 92%,transparent);-webkit-mask-image:linear-gradient(90deg,transparent,black 8%,black 92%,transparent)}
.mqTr{display:flex;align-items:center;gap:8px;width:max-content}
.mqC{display:flex;align-items:center;justify-content:center;min-width:120px;height:48px;border:1px solid ${c.border};background:rgba(255,255,255,0.9);border-radius:12px;padding:8px 12px}
.mqI{width:auto;max-width:80px;height:auto;max-height:20px;object-fit:contain}
.mqB{mix-blend-mode:multiply}

/* Grids */
.g3{display:grid;grid-template-columns:1fr;gap:12px}
.g2{display:grid;grid-template-columns:1fr;gap:20px}

/* Cards */
.card{background:rgba(255,255,255,0.92);border:1px solid ${c.border};border-radius:20px;padding:20px;min-width:0;box-shadow:0 6px 20px rgba(0,0,0,0.025);display:flex;flex-direction:column}
.cardDk{background:linear-gradient(180deg,#111318,#0D0F14)!important;border:1px solid ${c.borderDk}!important;color:#fff!important;box-shadow:0 20px 50px rgba(0,0,0,0.2)!important}
.cardNum{display:flex;align-items:center;gap:6px;width:fit-content;padding:0 12px;height:34px;border-radius:10px;background:${c.accentSoft};color:${c.accent};font-size:15px;font-weight:800}
.cardT{font-size:18px;font-weight:800;letter-spacing:-0.03em;margin-top:12px}
.cardB{margin-top:6px;color:${c.sub};font-size:13px;line-height:1.78}
.dkCard{background:linear-gradient(180deg,rgba(16,19,24,0.98),rgba(13,15,20,0.98));border:1px solid ${c.borderDk};border-radius:20px;padding:20px;box-shadow:0 18px 44px rgba(0,0,0,0.2)}
.dkCardT{font-size:clamp(17px,3vw,24px);font-weight:800;letter-spacing:-0.03em;color:#fff}
.dkCardB{margin-top:10px;color:rgba(255,255,255,0.6);font-size:13px;line-height:1.9}
.dkPill{display:inline-flex;align-items:center;margin-top:16px;padding:8px 12px;border-radius:999px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.04);color:rgba(255,255,255,0.7);font-size:11px;font-weight:700;gap:4px;flex-wrap:wrap}
.ftList{display:flex;flex-direction:column;gap:7px;margin-top:12px}
.ftRow{display:flex;align-items:flex-start;gap:7px;font-size:12px;line-height:1.6;color:${c.sub}}

/* Global */
.globalCard{border:1px solid ${c.border};background:rgba(255,255,255,0.9);border-radius:22px;padding:24px;text-align:center}
.globalTitle{font-size:clamp(24px,5vw,42px);letter-spacing:-0.04em;line-height:1.06}
.globalBody{margin-top:10px;color:${c.sub};font-size:14px;line-height:1.8;max-width:520px;margin-left:auto;margin-right:auto}
.globalFlags{display:flex;flex-wrap:wrap;justify-content:center;gap:6px;margin-top:18px}
.globalFlag{padding:6px 10px;border-radius:999px;border:1px solid ${c.border};background:rgba(255,255,255,0.8);font-size:11px;font-weight:600;color:${c.sub};white-space:nowrap}

/* Workflow */
.wfGrid{display:grid;grid-template-columns:1fr;gap:10px;margin-top:32px}
.wfCard{background:#fff;border:1px solid ${c.border};border-radius:16px;padding:18px;position:relative;box-shadow:0 4px 14px rgba(0,0,0,0.02)}
.wfArrow{display:none}
.wfStep{font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;color:${c.muted}}
.wfTitle{margin-top:6px;font-size:16px;font-weight:800;letter-spacing:-0.03em}
.wfBody{margin-top:4px;color:${c.sub};font-size:12px;line-height:1.72}

/* Terminal */
.term{background:#07080B;border:1px solid #1F2330;border-radius:14px;overflow:hidden;box-shadow:0 16px 40px rgba(0,0,0,0.18)}
.termTop{display:flex;align-items:center;gap:8px;padding:9px 12px;border-bottom:1px solid #1B1F2B;background:#0E1118}
.termDots{display:flex;gap:5px}
.termDots span{width:8px;height:8px;border-radius:999px;display:inline-block}
.termDots span:nth-child(1){background:#FF5F57}
.termDots span:nth-child(2){background:#FEBC2E}
.termDots span:nth-child(3){background:#28C840}
.termTitle{font-size:10px;color:#6B7280;font-weight:700;flex:1}
.termBody{padding:12px;height:280px;overflow:hidden}
.termLine{white-space:pre-wrap;word-break:break-all;font-size:10.5px;line-height:1.75;font-family:'SF Mono',ui-monospace,Menlo,Consolas,monospace}
.termCur{color:#60A5FA;animation:blink 0.8s step-end infinite}

/* Quiz teaser */
.quizCard{display:flex;align-items:center;justify-content:space-between;gap:20px;border:1px solid ${c.border};background:rgba(255,255,255,0.9);border-radius:22px;padding:24px;transition:all 0.25s;text-decoration:none}
.quizCard:hover{box-shadow:0 16px 40px rgba(0,0,0,0.06);transform:translateY(-2px)}
.quizLeft{flex:1;min-width:0}
.quizTitle{font-size:clamp(20px,4vw,32px);letter-spacing:-0.04em;line-height:1.1;margin-top:10px}
.quizBody{margin-top:8px;color:${c.sub};font-size:13px;line-height:1.7}
.quizBtn{margin-top:14px}
.quizRight{flex-shrink:0}
.quizEmoji{font-size:48px}

/* Pricing */
.prBadge{position:absolute;top:12px;right:12px;border-radius:999px;padding:4px 9px;background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.75);font-size:8px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em}

/* Metrics */
.metGrid{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:${c.border};border:1px solid ${c.border};border-radius:14px;overflow:hidden}
.metCell{background:#fff;padding:18px 12px;text-align:center}
.metVal{font-size:clamp(24px,5vw,36px);letter-spacing:-0.05em;line-height:1}
.metLab{margin-top:4px;font-size:10px;color:${c.sub}}

/* Waitlist */
.wlCard{background:rgba(255,255,255,0.92);border:1px solid ${c.border};border-radius:20px;padding:20px;max-width:860px;margin:0 auto;box-shadow:0 12px 32px rgba(0,0,0,0.03)}
.wlForm{display:grid;grid-template-columns:1fr;gap:8px;margin-top:16px}
.wlBtn{height:48px;width:100%}
.inp{width:100%;height:48px;border-radius:12px;border:1px solid ${c.border};background:#fff;padding:0 12px;font-size:13px;color:${c.text};outline:none}
.inp:focus{border-color:${c.accent};box-shadow:0 0 0 3px rgba(37,99,235,0.06)}
.pvLabel{display:flex;align-items:flex-start;gap:7px;margin-top:10px;color:${c.sub};font-size:10px;line-height:1.7;cursor:pointer}
.pvCheck{margin-top:2px;width:14px;height:14px;accent-color:${c.accent};flex-shrink:0}
.pvLink{color:${c.text};font-weight:700;text-decoration:underline;text-underline-offset:2px}
.pvNote{margin-top:4px;text-align:center;color:${c.muted};font-size:9px}
.fmOk{margin-top:10px;border:1px solid ${c.border};background:${c.greenSoft};color:${c.greenDk};border-radius:10px;padding:10px;text-align:center;font-size:12px;font-weight:600}
.fmErr{margin-top:10px;border:1px solid ${c.border};background:#FFF7F7;color:#B91C1C;border-radius:10px;padding:10px;text-align:center;font-size:12px;font-weight:600}

.emNotice{text-align:center;font-size:10px;line-height:1.7;color:${c.muted};max-width:640px;margin:0 auto;padding:12px;border:1px solid ${c.border};border-radius:12px;background:rgba(255,255,255,0.6)}

/* Modal */
.modOv{position:fixed;inset:0;z-index:220;background:rgba(9,10,13,0.4);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;padding:16px}
.modBox{width:100%;max-width:400px;background:rgba(255,255,255,0.96);border:1px solid ${c.border};border-radius:20px;padding:20px;box-shadow:0 32px 72px rgba(0,0,0,0.18)}
.modIco{width:44px;height:44px;border-radius:12px;background:linear-gradient(180deg,#F7FBFF,${c.accentSoft});border:1px solid ${c.border};display:flex;align-items:center;justify-content:center}
.modEy{margin-top:10px;font-size:9px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:${c.muted}}
.modTitle{font-size:clamp(20px,4vw,30px);line-height:1.04;letter-spacing:-0.04em;margin-top:4px}
.modBody{margin-top:6px;color:${c.sub};font-size:12px;line-height:1.8}

/* Footer */
.ft{border-top:1px solid ${c.border};padding:20px 0 26px}
.ftInner{display:flex;flex-direction:column;gap:12px;align-items:center;text-align:center}
.ftLinks{display:flex;gap:12px;flex-wrap:wrap;justify-content:center}
.ftLink{font-size:11px;color:${c.muted};font-weight:600;transition:color 0.2s}
.ftLink:hover{color:${c.text}}
.ftCopy{font-size:10px;color:${c.muted}}

/* TABLET 640px+ */
@media(min-width:640px){
  .container{padding:0 24px}
  .sec{padding:72px 0}.secDark{padding:72px 0}
  .navRow{height:64px}
  .navCta{padding:9px 16px!important;font-size:12px!important}
  .navCtaL{display:inline}.navCtaS{display:none}
  .heroSec{padding:48px 0 28px}
  .heroBtns{flex-direction:row}.heroBtns .btnP,.heroBtns .btnS{width:auto}
  .g3{grid-template-columns:repeat(2,1fr);gap:14px}
  .g2{grid-template-columns:repeat(2,1fr);gap:24px}
  .metGrid{grid-template-columns:repeat(4,1fr)}
  .wlForm{grid-template-columns:1.2fr 0.8fr auto}.wlBtn{height:48px;width:auto}
  .wlCard{padding:26px}
  .capInner{flex-direction:row;align-items:center;gap:14px;padding:16px 20px}
  .pBody{height:260px}
  .phoneFrame{max-width:300px}
  .ftInner{flex-direction:row;justify-content:space-between;text-align:left}
  .mqC{min-width:150px;height:56px}.mqI{max-width:90px;max-height:22px}
  .termBody{height:300px}
  .secT2{font-size:clamp(24px,5vw,44px)}
  .globalCard{padding:32px}
}

/* DESKTOP 960px+ */
@media(min-width:960px){
  .container{padding:0 40px}
  .sec{padding:84px 0}.secDark{padding:84px 0}
  .navLinks{display:flex}.navRow{height:72px}
  .navCta{padding:10px 20px!important;font-size:13px!important}
  .heroSec{padding:60px 0 36px}
  .heroSec .container{display:grid;grid-template-columns:1.08fr 0.92fr;grid-template-rows:auto auto auto;gap:0 44px}
  .heroText{grid-column:1;grid-row:1}
  .heroPhone{grid-column:2;grid-row:1/3;margin-top:0;align-self:start}
  .capGrid{grid-column:1;grid-row:2;margin-top:28px}
  .mqSec{grid-column:1/-1;grid-row:3}
  .g3{grid-template-columns:repeat(3,1fr);gap:16px}
  .wfGrid{grid-template-columns:repeat(3,1fr);gap:16px}
  .wfArrow{display:flex;position:absolute;top:50%;right:-15px;transform:translateY(-50%);width:30px;height:30px;border-radius:999px;background:#fff;border:1px solid ${c.border};align-items:center;justify-content:center;z-index:2;box-shadow:0 3px 10px rgba(0,0,0,0.04)}
  .phoneFrame{max-width:320px}
  .phoneBezel{border-radius:40px;padding:8px}
  .phoneScr{border-radius:34px}
  .pBody{height:280px}
  .card{padding:26px;border-radius:24px}
  .dkCard{padding:28px;border-radius:24px}
  .mqC{min-width:180px;height:68px}.mqI{max-width:110px;max-height:26px}
  .termBody{height:320px}
  .globalCard{padding:40px}
}
@media(min-width:1100px){.heroTitle{font-size:clamp(56px,6.5vw,78px)}}
`;
