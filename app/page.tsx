"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Blocks, Heart, Mic, Globe, ArrowRight } from "lucide-react";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');`;

const c = {
  bg: "#F8F6F1", card: "#FFFFFF", dark: "#08090C", darkCard: "#111318",
  text: "#111214", sub: "#4A4F5C", muted: "#888E9C",
  accent: "#2563EB", accentSoft: "#ECF2FF",
  border: "#E3DDD2", borderDk: "#222633",
  green: "#22C55E", greenSoft: "#ECFDF3", greenDk: "#15803D",
};

type Role = "patient" | "provider" | "developer";

function FadeIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const v = useInView(ref, { once: true, amount: 0.06 });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>;
}

function Pill({ children }: { children: ReactNode }) {
  return <div className="pill"><span className="pillIn">{children}</span></div>;
}

function ComingSoon() {
  return <span className="cs"><span className="csShine" />Soon</span>;
}

/* ═══════════ STATUS BAR ═══════════ */
function StatusBar() {
  const items = ["Laura Chat", "Urgency Engine", "Provider Search", "Translation", "Laura Chat", "Urgency Engine", "Provider Search", "Translation"];
  return (
    <div className="stBar">
      <div className="container stInner">
        <div className="stLeft">
          <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} className="stDot" />
          <span className="stLabel">All systems operational</span>
          <Link href="/status" className="stLink">View status</Link>
        </div>
        <div className="stTicker">
          <motion.div className="stTkTrack" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 22, ease: "linear", repeat: Infinity }}>
            {items.map((s, i) => <span key={`${s}-${i}`} className="stSvc"><span className="stSvcD" />{s}</span>)}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════ MULTILINGUAL PHONE MOCKUP ═══════════ */
const langConvos = [
  { lang: "English", flag: "🇬🇧", msgs: [
    { f: "u", t: "I have a sore throat, fever, and I feel weak." },
    { f: "l", t: "Based on your symptoms, you may need same-day advice. Let me find a GP near you in 94103." },
  ]},
  { lang: "Fran\u00e7ais", flag: "🇫🇷", msgs: [
    { f: "u", t: "J'ai mal \u00e0 la gorge et de la fi\u00e8vre." },
    { f: "l", t: "D'apr\u00e8s vos sympt\u00f4mes, je vous recommande de consulter rapidement. Je cherche un m\u00e9decin pr\u00e8s de chez vous." },
  ]},
  { lang: "Espa\u00f1ol", flag: "🇪🇸", msgs: [
    { f: "u", t: "Tengo dolor de cabeza y n\u00e1useas desde ayer." },
    { f: "l", t: "Entendido. Voy a buscar un m\u00e9dico cerca de su c\u00f3digo postal." },
  ]},
  { lang: "Portugu\u00eas", flag: "🇧🇷", msgs: [
    { f: "u", t: "Estou com dor no peito e falta de ar." },
    { f: "l", t: "Isso pode ser urgente. Recomendo procurar atendimento imediato. Posso ajudar a encontrar uma cl\u00ednica?" },
  ]},
  { lang: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629", flag: "🇸🇦", msgs: [
    { f: "u", t: "\u0639\u0646\u062f\u064a \u0635\u062f\u0627\u0639 \u0634\u062f\u064a\u062f \u0645\u0646\u0630 \u064a\u0648\u0645\u064a\u0646" },
    { f: "l", t: "\u0633\u0623\u0633\u0627\u0639\u062f\u0643. \u062f\u0639\u0646\u064a \u0623\u0628\u062d\u062b \u0639\u0646 \u0637\u0628\u064a\u0628 \u0642\u0631\u064a\u0628 \u0645\u0646\u0643." },
  ]},
  { lang: "Hindi", flag: "🇮🇳", msgs: [
    { f: "u", t: "\u092e\u0941\u091d\u0947 \u092c\u0941\u0916\u093e\u0930 \u0914\u0930 \u0938\u093f\u0930 \u0926\u0930\u094d\u0926 \u0939\u0948\u0964" },
    { f: "l", t: "\u092e\u0948\u0902 \u0906\u092a\u0915\u0947 \u0932\u093f\u090f \u0928\u091c\u0926\u0940\u0915\u0940 \u0921\u0949\u0915\u094d\u091f\u0930 \u0922\u0942\u0902\u0922 \u0930\u0939\u0940 \u0939\u0942\u0901\u0964" },
  ]},
  { lang: "\u4e2d\u6587", flag: "🇨🇳", msgs: [
    { f: "u", t: "\u6211\u80a9\u8180\u75bc\u4e86\u4e00\u5468\u4e86\u3002" },
    { f: "l", t: "\u6211\u5efa\u8bae\u60a8\u5c3d\u5feb\u5c31\u8bca\u3002\u8ba9\u6211\u4e3a\u60a8\u67e5\u627e\u9644\u8fd1\u7684\u8bca\u6240\u3002" },
  ]},
  { lang: "Yor\u00f9b\u00e1", flag: "🇳🇬", msgs: [
    { f: "u", t: "Mo ni iba ati efori l\u00e1ti ana." },
    { f: "l", t: "Mo le ran \u1ecd \u0301 l\u1ecd\u0301w\u1ecd\u0301. J\u1eb9\u0301 k\u00ed n w\u00e1 d\u1ecd\u0301k\u00edt\u00e0 t\u00f3 s\u00fan m\u1ecd\u0301." },
  ]},
  { lang: "Polski", flag: "🇵🇱", msgs: [
    { f: "u", t: "Mam silny b\u00f3l brzucha od wczoraj." },
    { f: "l", t: "Rozumiem. Szukam lekarza w pobli\u017cu Twojego kodu pocztowego." },
  ]},
  { lang: "Deutsch", flag: "🇩🇪", msgs: [
    { f: "u", t: "Ich habe seit drei Tagen Halsschmerzen." },
    { f: "l", t: "Ich suche einen Arzt in Ihrer N\u00e4he. Soll ich einen R\u00fcckruf vereinbaren?" },
  ]},
];

function PhoneMockup() {
  const [langIdx, setLangIdx] = useState(0);
  const [phase, setPhase] = useState<"typing-u" | "typing-l" | "done">("typing-u");
  const [charU, setCharU] = useState(0);
  const [charL, setCharL] = useState(0);

  const convo = langConvos[langIdx];
  const userMsg = convo.msgs[0].t;
  const lauraMsg = convo.msgs[1].t;

  useEffect(() => {
    if (phase === "typing-u") {
      if (charU < userMsg.length) {
        const t = setTimeout(() => setCharU(p => p + 1), 18);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("typing-l"), 400);
        return () => clearTimeout(t);
      }
    }
    if (phase === "typing-l") {
      if (charL < lauraMsg.length) {
        const t = setTimeout(() => setCharL(p => p + 1), 12);
        return () => clearTimeout(t);
      } else {
        setPhase("done");
      }
    }
    if (phase === "done") {
      const t = setTimeout(() => {
        setLangIdx(p => (p + 1) % langConvos.length);
        setPhase("typing-u");
        setCharU(0);
        setCharL(0);
      }, 1800);
      return () => clearTimeout(t);
    }
  }, [phase, charU, charL, userMsg, lauraMsg]);

  return (
    <div className="phWrap">
      <motion.div className="phFrame" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
        <div className="phBezel">
          <div className="phDI"><div className="phDICam" /></div>
          <div className="phScr">
            <div className="phHead">
              <div className="phHeadL">
                <div className="phAv"><Image src="/laura-avatar.png" alt="Laura" fill sizes="28px" style={{ objectFit: "cover" }} /></div>
                <div>
                  <div className="phName">Laura <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 1L14.9 3.6L18.6 3.2L19.4 6.8L22.5 8.7L21.2 12.2L22.5 15.7L19.4 17.6L18.6 21.2L14.9 20.8L12 23.4L9.1 20.8L5.4 21.2L4.6 17.6L1.5 15.7L2.8 12.2L1.5 8.7L4.6 6.8L5.4 3.2L9.1 3.6L12 1Z" fill="#22C55E"/><path d="M8.5 12.5L10.5 14.5L15.5 9.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                  <div className="phOn"><span className="phOnD" />online</div>
                </div>
              </div>
            </div>
            {/* Language indicator */}
            <AnimatePresence mode="wait">
              <motion.div key={langIdx} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }} className="phLang">
                <span>{convo.flag}</span>
                <span>{convo.lang}</span>
              </motion.div>
            </AnimatePresence>
            <div className="phBody">
              {charU > 0 && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="phRow phRowR">
                  <div className="phBub phBubU">{userMsg.slice(0, charU)}</div>
                </motion.div>
              )}
              {charL > 0 && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="phRow phRowL">
                  <div className="phBub phBubL">{lauraMsg.slice(0, charL)}</div>
                </motion.div>
              )}
            </div>
            <div className="phComp">
              <div className="phCompF"><span style={{ fontSize: "13px", opacity: 0.4 }}>&#128522;</span><span className="phCompTxt">Message</span></div>
              <div className="phCompM"><Mic size={13} color="#fff" strokeWidth={2.2} /></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════ SDK TERMINAL ═══════════ */
function SDKTerminal() {
  const lines = useMemo(() => ['$ npm install @omela/laura-sdk', '', '  import { Laura } from "@omela/laura-sdk";', '', '  const laura = new Laura({', '    apiKey: process.env.OMELA_KEY,', '    region: "eu-west-2"', '  });', '', '  const res = await laura.chat({', '    userId: "patient_4102",', '    lang: "fr",', '    message: "J\'ai mal a la gorge."', '  });', '', '  > Laura responds in French...', '  Done in 1.1s'], []);
  const [vl, setVl] = useState(0); const [ci, setCi] = useState(0);
  useEffect(() => {
    if (vl >= lines.length) { const t = setTimeout(() => { setVl(0); setCi(0); }, 3000); return () => clearTimeout(t); }
    const line = lines[vl];
    if (ci < line.length) { const t = setTimeout(() => setCi(p => p + 1), line.startsWith("  >") ? 36 : 18); return () => clearTimeout(t); }
    else { const t = setTimeout(() => { setVl(p => p + 1); setCi(0); }, line === "" ? 60 : 160); return () => clearTimeout(t); }
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

/* ═══════════ LOGO MARQUEE ═══════════ */
function LogoMarquee() {
  const logos = [{ n: "AWS", s: "/logos/aws-logo.png" }, { n: "Microsoft", s: "/logos/microsoft-logo.png" }, { n: "Google", s: "/logos/google-logo.png" }, { n: "Salesforce", s: "/logos/salesforce-logo.png" }, { n: "Twilio", s: "/logos/twilio-logo.png" }, { n: "Epic", s: "/logos/epic-logo.png" }, { n: "Veradigm", s: "/logos/veradigm-logo.png" }, { n: "GitHub", s: "/logos/github-logo.png", b: true }];
  const d = useMemo(() => [...logos, ...logos], []);
  return (
    <div className="mqSec">
      <p className="mqLabel">Built for the systems behind modern care</p>
      <div className="mqVp"><motion.div className="mqTr" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 30, ease: "linear", repeat: Infinity }}>
        {d.map((l, i) => <div key={`${l.n}-${i}`} className="mqC"><Image src={l.s} alt={l.n} width={110} height={32} className={`mqI${l.b ? " mqB" : ""}`} /></div>)}
      </motion.div></div>
    </div>
  );
}

/* ═══════════ SUCCESS MODAL ═══════════ */
function SuccessModal({ open, role, onClose }: { open: boolean; role: Role; onClose: () => void }) {
  const m: Record<Role, { t: string; b: string }> = {
    patient: { t: "You are in early.", b: "Laura will reach out as access opens. Follow @joinomela on X." },
    provider: { t: "Your place is reserved.", b: "Laura will reach out as operations open. Follow @joinomela on X." },
    developer: { t: "You are on the list.", b: "Laura will reach out as API access opens. Follow @joinomela on X." },
  };
  const copy = m[role];
  return <AnimatePresence>{open && (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="modOv">
      <motion.div initial={{ opacity: 0, y: 16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12 }} onClick={e => e.stopPropagation()} className="modBox">
        <div className="modIco"><svg width="24" height="24" viewBox="0 0 32 32" fill="none"><path d="M7 16.5L12.8 22L25 9.5" stroke={c.green} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
        <h3 className="serif modTitle">{copy.t}</h3>
        <p className="modBody">{copy.b}</p>
        <div style={{ marginTop: "16px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <a href="https://x.com/joinomela" target="_blank" rel="noreferrer" className="btnP">Follow on X</a>
          <button type="button" className="btnS" onClick={onClose}>Continue</button>
        </div>
      </motion.div>
    </motion.div>
  )}</AnimatePresence>;
}

/* ═══════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════ */
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
            <a href="#waitlist" className="btnP navCta"><span className="navCtaL">Get early access</span><span className="navCtaS">Early access</span><ArrowRight size={14} /></a>
          </div>
        </motion.nav>

        {/* ═══ HERO ═══ */}
        <section className="heroSec">
          <div className="container">
            <div className="heroText">
              <FadeIn><Pill><span className="pillStar">&#10038;</span>Now onboarding early access users</Pill></FadeIn>
              <FadeIn delay={0.06}>
                <h1 className="serif heroTitle">
                  Healthcare access<br />
                  <span className="heroAccent">without the wait.</span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.12}><p className="heroBody">2 billion people worldwide struggle to access basic healthcare. Laura is an AI health assistant that checks your symptoms, tells you how urgent it is, finds doctors near you, and gets you seen. Available 24/7, in 40+ languages.</p></FadeIn>
              <FadeIn delay={0.18}><div className="heroBtns">
                <Link href="/demo" className="btnP">Try Laura <ArrowRight size={15} /></Link>
                <a href="#waitlist" className="btnS">Get early access</a>
              </div></FadeIn>
            </div>
            <div className="heroPhone"><PhoneMockup /></div>
          </div>
        </section>

        {/* ═══ WHAT LAURA DOES — constrained width ═══ */}
        <section className="sec">
          <div className="container">
            <FadeIn>
              <div className="capSection">
                {[
                  { icon: <Mic size={22} strokeWidth={2} />, title: "Skip the phone queue", body: "Talk to Laura anytime. No busy signals, no hold music, no 8am rush. She works 24/7 in over 40 languages." },
                  { icon: <Heart size={22} strokeWidth={2} />, title: "Know if it is urgent", body: "Laura checks your symptoms and tells you whether you need same-day advice, a routine visit, or emergency care." },
                  { icon: <Globe size={22} strokeWidth={2} />, title: "Find care near you", body: "Laura finds GP, dental, and urgent care near your postcode and can request a callback on your behalf." },
                ].map((item, i) => (
                  <FadeIn key={item.title} delay={i * 0.08}>
                    <div className="capRow">
                      <div className="capIco">{item.icon}</div>
                      <div><h3 className="capTitle">{item.title}</h3><p className="capBody">{item.body}</p></div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.2}><LogoMarquee /></FadeIn>
          </div>
        </section>

        {/* ═══ THE PROBLEM — Anthropic-style big statement ═══ */}
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="container">
            <FadeIn>
              <div className="bigStatement">
                <h2 className="serif bigTitle">6.4 million people are on NHS waiting lists. 100 million Americans carry medical debt. In Nigeria, there are 4 doctors for every 10,000 people.</h2>
                <p className="bigBody">Access to healthcare is broken everywhere. Not because care does not exist, but because getting to it is slow, confusing, and unequal. Laura changes how people reach care.</p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ═══ WHO IS LAURA FOR ═══ */}
        <section id="people" className="sec">
          <div className="container">
            <FadeIn><div className="shWrap"><Pill>Who is Laura for?</Pill><h2 className="serif shTitle" style={{ marginTop: "18px" }}>Three audiences. One platform.</h2></div></FadeIn>
            <div className="g3" style={{ marginTop: "40px" }}>
              {[
                { title: "For people", desc: "You call your GP and get a busy tone. You sit on symptoms because you are unsure if it is serious. You moved to a new city and have no doctor. Laura gives you a way in.", bullets: ["Skip the phone queue", "Check how urgent it is", "Find practices near you", "Request a callback"], ico: "1" },
                { title: "For care teams", desc: "Your receptionists are drowning in routine calls. Laura handles intake, sorts by urgency, and sends structured requests so your team focuses on patients, not phones.", bullets: ["Reduce reception pressure", "See urgency at a glance", "Structured callback requests", "Multilingual patient access"], ico: "2" },
                { title: "For developers", desc: "Embed Laura into your health app, patient portal, or marketplace. Add care-access intelligence to any product without building it from scratch.", bullets: ["API and SDK access", "Embeddable chat widget", "Workflow triggers", "Audit logs and auth"], ico: "3", soon: true },
              ].map((card, i) => (
                <FadeIn key={card.title} delay={i * 0.08}><div className="card">
                  <div className="cardNum">{card.ico}{card.soon && <ComingSoon />}</div>
                  <h3 className="cardT">{card.title}</h3>
                  <p className="cardB">{card.desc}</p>
                  <div className="ftList">{card.bullets.map(b => <div key={b} className="ftRow"><span className="chk">&#10003;</span><span>{b}</span></div>)}</div>
                </div></FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ HOW IT WORKS ═══ */}
        <section id="providers" className="sec">
          <div className="container">
            <FadeIn><div className="shWrap"><Pill>How it works</Pill><h2 className="serif shTitle" style={{ marginTop: "18px" }}>Three steps. No waiting.</h2></div></FadeIn>
            <div className="wfGrid">
              {[
                { title: "Describe what is wrong", body: "Tell Laura your symptoms in plain language. She responds in the language you start with." },
                { title: "Laura checks the urgency", body: "She sorts your concern into urgency levels: routine, soon, urgent, or emergency. No guessing." },
                { title: "Get matched to care", body: "Laura finds nearby practices, checks availability, and requests a callback. You wake up with a confirmed slot." },
              ].map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.08}><div className="wfCard">
                  {i < 2 && <div className="wfArrow"><ArrowRight size={14} color={c.muted} /></div>}
                  <div className="wfStep">Step {i + 1}</div><h3 className="wfTitle">{item.title}</h3><p className="wfBody">{item.body}</p>
                </div></FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ GLOBAL ═══ */}
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="container">
            <FadeIn>
              <div className="globalCard">
                <h2 className="serif globalTitle">Laura speaks your language.</h2>
                <p className="globalBody">Whether you speak English, French, Spanish, Arabic, Hindi, Mandarin, Yoruba, Polish, Portuguese, or German, Laura replies in the language you start with. No translators, no barriers.</p>
                <div className="globalFlags">
                  {["🇬🇧 UK", "🇺🇸 US", "🇫🇷 France", "🇳🇬 Nigeria", "🇮🇳 India", "🇧🇷 Brazil", "🇸🇦 Saudi Arabia", "🇨🇳 China", "🇵🇱 Poland", "🇩🇪 Germany", "🌍 40+ more"].map(f => <span key={f} className="globalFlag">{f}</span>)}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ═══ DEVELOPERS ═══ */}
        <section id="developers" className="secDark">
          <div className="container">
            <FadeIn><div className="shWrap"><Pill>Developer platform</Pill><h2 className="serif shTitle" style={{ marginTop: "18px", color: "#fff" }}>Build with Laura.</h2><p className="shBody" style={{ color: "rgba(255,255,255,0.6)" }}>Embed urgency checks, provider routing, and multilingual care access into your products.</p></div></FadeIn>
            <div className="g2" style={{ marginTop: "40px" }}>
              <FadeIn><SDKTerminal /></FadeIn>
              <FadeIn delay={0.08}><div className="dkCard">
                <h3 className="dkCardT">Built for integration teams</h3>
                <p className="dkCardB">Add Laura to patient portals, health apps, or internal tooling through a clean API layer.</p>
                <div className="ftList" style={{ marginTop: "18px" }}>
                  {["REST API and SDK access", "Embeddable chat widgets", "Patient workflow triggers", "Secure auth and audit trails"].map(f => <div key={f} className="ftRow" style={{ color: "rgba(255,255,255,0.8)" }}><span className="chk chkD">&#10003;</span><span>{f}</span></div>)}
                </div>
                <div className="dkPill">Developer access on the roadmap <ComingSoon /></div>
              </div></FadeIn>
            </div>
          </div>
        </section>

        {/* ═══ PRICING ═══ */}
        <section id="pricing" className="sec">
          <div className="container">
            <FadeIn><div className="shWrap"><Pill>Pricing</Pill><h2 className="serif shTitle" style={{ marginTop: "18px" }}>Simple, transparent access.</h2></div></FadeIn>
            <div className="g3" style={{ marginTop: "40px" }}>
              {[
                { name: "People", price: "\u00A33.99", period: "/mo", desc: "Symptom checks, urgency levels, provider search, and callback requests.", ft: ["Symptom check", "Urgency levels", "GP and dental search", "Callback requests"], hl: false, cta: "Join waitlist" },
                { name: "Care Teams", price: "\u00A31,999.99", period: "/mo", desc: "Laura handling intake, urgency sorting, and callback management at scale.", ft: ["Structured intake", "Urgency dashboard", "Multilingual access", "Request management"], hl: true, badge: "Best for practices", cta: "Request demo" },
                { name: "Developer", price: "Custom", period: "", desc: "API and SDK access for health products and patient journeys.", ft: ["API and SDK access", "Embeddable components", "Usage analytics", "Technical onboarding"], hl: false, cta: "Talk to us", soon: true },
              ].map((p, i) => (
                <FadeIn key={p.name} delay={i * 0.08}><div className={`card ${p.hl ? "cardDk" : ""}`} style={{ position: "relative" }}>
                  {p.badge && <div className="prBadge">{p.badge}</div>}
                  <div style={{ fontSize: "16px", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" }}>{p.name} {p.soon && <ComingSoon />}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginTop: "14px" }}>
                    <span className="serif" style={{ fontSize: "clamp(32px, 6vw, 48px)", letterSpacing: "-0.05em" }}>{p.price}</span>
                    {p.period && <span style={{ fontSize: "14px", color: p.hl ? "rgba(255,255,255,0.5)" : c.muted }}>{p.period}</span>}
                  </div>
                  <p style={{ marginTop: "8px", color: p.hl ? "rgba(255,255,255,0.6)" : c.sub, fontSize: "14px", lineHeight: 1.7 }}>{p.desc}</p>
                  <div style={{ marginTop: "18px", paddingTop: "16px", borderTop: `1px solid ${p.hl ? c.borderDk : c.border}`, display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
                    {p.ft.map(f => <div key={f} className="ftRow" style={{ color: p.hl ? "rgba(255,255,255,0.8)" : c.sub }}><span className={`chk${p.hl ? " chkD" : ""}`}>&#10003;</span><span>{f}</span></div>)}
                  </div>
                  <a href="#waitlist" className="btnP" style={{ marginTop: "20px", width: "100%", background: p.hl ? "#fff" : c.dark, color: p.hl ? c.dark : "#fff", border: "none" }}>{p.cta}</a>
                </div></FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ QUIZ + METRICS ═══ */}
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="container">
            <FadeIn>
              <Link href="/quiz" className="quizCard">
                <div><Pill>Daily health check</Pill><h3 className="serif quizTitle">Test your health knowledge.</h3><p className="quizBody">One question a day. Learn something new in 30 seconds.</p><span className="btnP quizBtn">Take today&apos;s quiz <ArrowRight size={14} /></span></div>
                <div className="quizEmoji">&#129657;</div>
              </Link>
            </FadeIn>
            <FadeIn><div className="metGrid" style={{ marginTop: "20px" }}>
              {[{ v: "24/7", l: "Always available" }, { v: "40+", l: "Languages" }, { v: "<2s", l: "Response time" }, { v: "0", l: "Time on hold" }].map(m => <div key={m.l} className="metCell"><div className="serif metVal">{m.v}</div><div className="metLab">{m.l}</div></div>)}
            </div></FadeIn>
          </div>
        </section>

        {/* ═══ WAITLIST ═══ */}
        <section id="waitlist" className="sec">
          <div className="container"><FadeIn><div className="wlCard">
            <div className="shWrap"><Pill>Get early access</Pill><h2 className="serif shTitle" style={{ marginTop: "18px" }}>Be the first to use Laura.</h2><p className="shBody">Tell us who you are. We will prioritize your access.</p></div>
            <form className="wlForm" onSubmit={handleSubmit}>
              <input className="inp" type="email" placeholder="Your email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
              <select className="inp" value={role} onChange={e => setRole(e.target.value as Role)}><option value="patient">I am a patient</option><option value="provider">I am a provider</option><option value="developer">I am a developer</option></select>
              <input type="text" name="website" value={website} onChange={e => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none", height: 0, width: 0 }} />
              <button type="submit" className="btnP wlBtn" disabled={submitting || !agreed}>{submitting ? "Submitting..." : "Get early access"}</button>
            </form>
            <label className="pvLabel"><input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} required className="pvCheck" /><span>I agree that Omela may use my information to manage my request. <Link href="/privacy" className="pvLink">Privacy Notice</Link>.</span></label>
            {success && <div className="fmOk">{success}</div>}
            {error && <div className="fmErr">{error}</div>}
          </div></FadeIn></div>
        </section>

        <section style={{ padding: "0 0 32px" }}><div className="container"><div className="emNotice">Laura is an AI care-access assistant. She is not a substitute for emergency services or clinical diagnosis. If you are experiencing an emergency, call 999 (UK), 911 (US), or your local emergency number immediately.</div></div></section>

        <footer className="ft">
          <div className="container ftInner">
            <Link href="/" className="navBrand"><div className="navLogo" style={{ width: "26px", height: "26px" }}><Image src="/omela-logo-mark.png" alt="Omela" width={26} height={26} style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div><div><div style={{ fontSize: "12px", fontWeight: 800 }}>Omela</div></div></Link>
            <div className="ftLinks"><Link href="/privacy" className="ftLink">Privacy</Link><Link href="/terms" className="ftLink">Terms</Link><Link href="/status" className="ftLink">Status</Link><Link href="/quiz" className="ftLink">Health Quiz</Link><Link href="/demo" className="ftLink">Try Laura</Link><a href="mailto:notice@omela.ai" className="ftLink">Contact</a></div>
            <p className="ftCopy">&copy; 2026 Omela</p>
          </div>
        </footer>
      </div>
    </>
  );
}

/* ═══════════ CSS ═══════════ */
const CSS = `
*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}html,body{max-width:100%;overflow-x:clip}
body{background:${c.bg};color:${c.text};font-family:'DM Sans',-apple-system,sans-serif;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}button,input,select{font-family:inherit}::selection{background:${c.accent};color:#fff}
@keyframes blink{0%,50%{opacity:1}50.01%,100%{opacity:0}}
@keyframes csAnim{0%{transform:translateX(-100%)}100%{transform:translateX(200%)}}
.serif{font-family:'Instrument Serif',Georgia,serif}.wrap{width:100%;overflow-x:clip}.container{max-width:1200px;margin:0 auto;padding:0 20px}
.sec{padding:64px 0}.secDark{padding:64px 0;background:radial-gradient(circle at 16% 20%,rgba(37,99,235,0.08) 0%,transparent 28%),${c.dark};color:#fff}

/* Coming Soon */
.cs{display:inline-flex;padding:3px 8px;border-radius:999px;background:linear-gradient(135deg,#FEF3C7,#FDE68A);color:#92400E;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.06em;position:relative;overflow:hidden;margin-left:6px;flex-shrink:0}
.csShine{position:absolute;top:0;left:0;width:60%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent);animation:csAnim 2.5s ease-in-out infinite}

/* Status */
.stBar{background:${c.greenSoft};border-bottom:1px solid rgba(34,197,94,0.15);padding:7px 0}
.stInner{display:flex;align-items:center;gap:8px}
.stLeft{display:flex;align-items:center;gap:8px;flex-shrink:0}
.stDot{width:7px;height:7px;border-radius:999px;background:${c.green};display:inline-block;box-shadow:0 0 6px ${c.green}44}
.stLabel{font-size:12px;font-weight:700;color:${c.greenDk};white-space:nowrap}
.stLink{font-size:11px;font-weight:700;color:${c.accent};white-space:nowrap;text-decoration:underline;text-underline-offset:2px}
.stTicker{flex:1;min-width:0;overflow:hidden;mask-image:linear-gradient(90deg,transparent,black 10%,black 90%,transparent);-webkit-mask-image:linear-gradient(90deg,transparent,black 10%,black 90%,transparent)}
.stTkTrack{display:flex;gap:14px;width:max-content}.stSvc{font-size:10px;color:${c.muted};font-weight:600;display:flex;align-items:center;gap:4px;white-space:nowrap}
.stSvcD{width:4px;height:4px;border-radius:999px;background:${c.green};display:inline-block;flex-shrink:0}

/* Pill */
.pill{display:inline-flex;align-items:center;gap:8px;padding:8px 16px;border-radius:999px;border:1px solid ${c.border};background:rgba(255,255,255,0.8);font-size:13px;font-weight:700;color:${c.sub};position:relative;overflow:hidden}
.pillIn{position:relative;z-index:2;display:inline-flex;align-items:center;gap:8px}
.pillStar{color:${c.accent};font-size:15px;flex-shrink:0}

/* Checks */
.chk{width:20px;height:20px;border-radius:999px;background:${c.greenSoft};color:${c.green};display:inline-flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;flex-shrink:0;margin-top:2px}
.chkD{background:rgba(34,197,94,0.12);color:#4ADE80}

/* Section heading */
.shWrap{text-align:center;max-width:760px;margin:0 auto}
.shTitle{font-size:clamp(30px,6vw,56px);line-height:1.04;letter-spacing:-0.045em}
.shBody{font-size:clamp(15px,2.5vw,18px);line-height:1.8;margin-top:14px;max-width:580px;margin-left:auto;margin-right:auto}

/* Buttons */
.btnP{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:${c.dark};color:#fff;border:none;border-radius:999px;padding:14px 24px;font-size:15px;font-weight:700;cursor:pointer;transition:all 0.25s;white-space:nowrap}
.btnP:hover{transform:translateY(-1px);box-shadow:0 10px 28px rgba(0,0,0,0.14);background:#161820}
.btnP:disabled{opacity:0.5;cursor:not-allowed;transform:none;box-shadow:none}
.btnS{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:rgba(255,255,255,0.85);color:${c.text};border:1px solid ${c.border};border-radius:999px;padding:14px 24px;font-size:15px;font-weight:700;cursor:pointer;transition:all 0.25s;white-space:nowrap}
.btnS:hover{background:#fff}

/* Nav */
.nav{position:sticky;top:0;z-index:100;background:rgba(248,246,241,0.92);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid ${c.border}}
.navRow{display:flex;align-items:center;justify-content:space-between;gap:10px;height:60px}
.navBrand{display:flex;align-items:center;gap:8px;min-width:0;text-decoration:none;flex-shrink:0}
.navLogo{width:34px;height:34px;border-radius:10px;overflow:hidden;flex-shrink:0;box-shadow:0 3px 10px rgba(0,0,0,0.06)}
.navName{font-size:14px;font-weight:800;letter-spacing:-0.03em}
.navSub{font-size:10px;color:${c.muted};font-style:italic;margin-top:1px}
.navLinks{display:none;align-items:center;gap:24px}
.navLink{font-size:14px;font-weight:600;color:${c.sub};transition:color 0.2s}
.navLink:hover{color:${c.text}}
.navCta{padding:10px 18px!important;font-size:13px!important;flex-shrink:0}
.navCtaL{display:none}.navCtaS{display:inline}

/* HERO */
.heroSec{padding:48px 0 20px}
.heroText{max-width:640px}
.heroTitle{font-size:clamp(38px,9vw,88px);line-height:0.95;letter-spacing:-0.05em;margin-top:18px}
.heroAccent{color:${c.accent};font-style:italic}
.heroBody{margin-top:18px;font-size:clamp(16px,2.5vw,20px);line-height:1.72;color:${c.sub};max-width:560px}
.heroBtns{display:flex;flex-direction:column;gap:10px;margin-top:28px}
.heroBtns .btnP,.heroBtns .btnS{width:100%;text-align:center}

/* Phone */
.heroPhone{margin-top:36px;width:100%;display:flex;justify-content:center}
.phWrap{width:100%;max-width:260px}
.phFrame{position:relative;width:100%}
.phBezel{background:#1A1A1E;border-radius:36px;padding:6px;box-shadow:0 0 0 1px rgba(255,255,255,0.06),0 24px 48px rgba(0,0,0,0.14),inset 0 1px 0 rgba(255,255,255,0.04)}
.phDI{width:80px;height:22px;border-radius:999px;background:#000;margin:0 auto 4px;display:flex;align-items:center;justify-content:flex-end;padding-right:12px}
.phDICam{width:6px;height:6px;border-radius:999px;background:radial-gradient(circle,#1a2540,#0a1025);border:1px solid rgba(255,255,255,0.08)}
.phScr{background:#FAFAFA;border-radius:32px;overflow:hidden;display:flex;flex-direction:column}
.phHead{display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:#fff;border-bottom:1px solid #f0f0f0}
.phHeadL{display:flex;align-items:center;gap:6px}
.phAv{position:relative;width:28px;height:28px;border-radius:999px;overflow:hidden;flex-shrink:0;background:#E8EAF0;border:1.5px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.06)}
.phName{display:flex;align-items:center;gap:3px;font-size:12px;font-weight:700;color:${c.text}}
.phOn{display:flex;align-items:center;gap:3px;font-size:9px;color:${c.green};font-weight:600;margin-top:1px}
.phOnD{width:4px;height:4px;border-radius:999px;background:${c.green};display:inline-block}
.phLang{display:flex;align-items:center;justify-content:center;gap:4px;padding:5px 0;background:#F7F7FB;font-size:10px;font-weight:700;color:${c.accent}}
.phBody{display:flex;flex-direction:column;gap:6px;padding:10px 8px;height:240px;overflow:hidden;justify-content:flex-end;background:linear-gradient(180deg,#F5F5F0,#ECE5DA);background-image:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23000' fill-opacity='.015'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")}
.phRow{display:flex}.phRowR{justify-content:flex-end}.phRowL{justify-content:flex-start}
.phBub{max-width:85%;padding:7px 10px;font-size:10px;line-height:1.45;word-break:break-word}
.phBubU{background:#E7FFDB;color:#111;border-radius:10px 10px 3px 10px}
.phBubL{background:#fff;color:#111;border-radius:10px 10px 10px 3px;box-shadow:0 1px 2px rgba(0,0,0,0.04)}
.phComp{padding:6px 6px 10px;display:flex;align-items:center;gap:5px;background:#F0EBE3}
.phCompF{flex:1;height:28px;border-radius:999px;background:#fff;display:flex;align-items:center;gap:6px;padding:0 8px}
.phCompTxt{color:${c.muted};font-size:11px}
.phCompM{width:28px;height:28px;border-radius:999px;background:#25D366;display:flex;align-items:center;justify-content:center;flex-shrink:0}

/* Capability rows — constrained */
.capSection{max-width:800px;margin:0 auto;display:flex;flex-direction:column;gap:12px}
.capRow{display:flex;align-items:flex-start;gap:16px;padding:20px 24px;border:1px solid ${c.border};border-radius:18px;background:rgba(255,255,255,0.9)}
.capIco{width:44px;height:44px;border-radius:14px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(180deg,#F5F8FF,#EAF0FF);border:1px solid rgba(190,210,250,0.5);color:${c.accent}}
.capTitle{font-size:16px;font-weight:800;letter-spacing:-0.02em}
.capBody{font-size:14px;line-height:1.65;color:${c.sub};margin-top:3px}

/* Big statement */
.bigStatement{max-width:900px;margin:0 auto;text-align:center;padding:20px 0}
.bigTitle{font-size:clamp(22px,4vw,38px);line-height:1.25;letter-spacing:-0.03em;color:${c.text}}
.bigBody{margin-top:16px;font-size:clamp(15px,2vw,18px);line-height:1.8;color:${c.sub};max-width:640px;margin-left:auto;margin-right:auto}

/* Marquee */
.mqSec{margin-top:40px}
.mqLabel{text-align:center;font-size:10px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;color:${c.muted};margin-bottom:14px}
.mqVp{overflow:hidden;mask-image:linear-gradient(90deg,transparent,black 8%,black 92%,transparent);-webkit-mask-image:linear-gradient(90deg,transparent,black 8%,black 92%,transparent)}
.mqTr{display:flex;align-items:center;gap:10px;width:max-content}
.mqC{display:flex;align-items:center;justify-content:center;min-width:130px;height:52px;border:1px solid ${c.border};background:rgba(255,255,255,0.9);border-radius:12px;padding:10px 14px}
.mqI{width:auto;max-width:85px;height:auto;max-height:20px;object-fit:contain}.mqB{mix-blend-mode:multiply}

/* Grids */
.g3{display:grid;grid-template-columns:1fr;gap:14px}
.g2{display:grid;grid-template-columns:1fr;gap:20px}

/* Cards */
.card{background:rgba(255,255,255,0.92);border:1px solid ${c.border};border-radius:22px;padding:24px;min-width:0;box-shadow:0 6px 20px rgba(0,0,0,0.025);display:flex;flex-direction:column}
.cardDk{background:linear-gradient(180deg,#111318,#0D0F14)!important;border:1px solid ${c.borderDk}!important;color:#fff!important;box-shadow:0 20px 50px rgba(0,0,0,0.2)!important}
.cardNum{display:flex;align-items:center;gap:6px;width:fit-content;padding:0 12px;height:34px;border-radius:10px;background:${c.accentSoft};color:${c.accent};font-size:16px;font-weight:800}
.cardT{font-size:20px;font-weight:800;letter-spacing:-0.03em;margin-top:14px}
.cardB{margin-top:6px;color:${c.sub};font-size:15px;line-height:1.72}
.dkCard{background:linear-gradient(180deg,rgba(16,19,24,0.98),rgba(13,15,20,0.98));border:1px solid ${c.borderDk};border-radius:22px;padding:24px;box-shadow:0 18px 44px rgba(0,0,0,0.2)}
.dkCardT{font-size:clamp(18px,3vw,24px);font-weight:800;letter-spacing:-0.03em;color:#fff}
.dkCardB{margin-top:10px;color:rgba(255,255,255,0.6);font-size:14px;line-height:1.9}
.dkPill{display:inline-flex;align-items:center;margin-top:16px;padding:8px 12px;border-radius:999px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.04);color:rgba(255,255,255,0.7);font-size:11px;font-weight:700;gap:4px;flex-wrap:wrap}
.ftList{display:flex;flex-direction:column;gap:8px;margin-top:14px}
.ftRow{display:flex;align-items:flex-start;gap:8px;font-size:14px;line-height:1.6;color:${c.sub}}

/* Global */
.globalCard{border:1px solid ${c.border};background:rgba(255,255,255,0.9);border-radius:24px;padding:28px;text-align:center}
.globalTitle{font-size:clamp(26px,5vw,44px);letter-spacing:-0.04em;line-height:1.06}
.globalBody{margin-top:12px;color:${c.sub};font-size:15px;line-height:1.8;max-width:560px;margin-left:auto;margin-right:auto}
.globalFlags{display:flex;flex-wrap:wrap;justify-content:center;gap:6px;margin-top:20px}
.globalFlag{padding:6px 12px;border-radius:999px;border:1px solid ${c.border};background:rgba(255,255,255,0.8);font-size:12px;font-weight:600;color:${c.sub};white-space:nowrap}

/* Workflow */
.wfGrid{display:grid;grid-template-columns:1fr;gap:12px;margin-top:36px}
.wfCard{background:#fff;border:1px solid ${c.border};border-radius:18px;padding:22px;position:relative;box-shadow:0 4px 14px rgba(0,0,0,0.02)}
.wfArrow{display:none}
.wfStep{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;color:${c.muted}}
.wfTitle{margin-top:8px;font-size:18px;font-weight:800;letter-spacing:-0.03em}
.wfBody{margin-top:6px;color:${c.sub};font-size:14px;line-height:1.7}

/* Terminal */
.term{background:#07080B;border:1px solid #1F2330;border-radius:16px;overflow:hidden;box-shadow:0 16px 40px rgba(0,0,0,0.18)}
.termTop{display:flex;align-items:center;gap:8px;padding:10px 14px;border-bottom:1px solid #1B1F2B;background:#0E1118}
.termDots{display:flex;gap:5px}.termDots span{width:9px;height:9px;border-radius:999px;display:inline-block}
.termDots span:nth-child(1){background:#FF5F57}.termDots span:nth-child(2){background:#FEBC2E}.termDots span:nth-child(3){background:#28C840}
.termTitle{font-size:11px;color:#6B7280;font-weight:700;flex:1}
.termBody{padding:14px;height:300px;overflow:hidden}
.termLine{white-space:pre-wrap;word-break:break-all;font-size:11px;line-height:1.75;font-family:'SF Mono',ui-monospace,Menlo,Consolas,monospace}
.termCur{color:#60A5FA;animation:blink 0.8s step-end infinite}

/* Quiz */
.quizCard{display:flex;align-items:center;justify-content:space-between;gap:20px;border:1px solid ${c.border};background:rgba(255,255,255,0.9);border-radius:22px;padding:28px;transition:all 0.25s;text-decoration:none}
.quizCard:hover{box-shadow:0 16px 40px rgba(0,0,0,0.06);transform:translateY(-2px)}
.quizTitle{font-size:clamp(20px,4vw,32px);letter-spacing:-0.04em;line-height:1.1;margin-top:10px}
.quizBody{margin-top:8px;color:${c.sub};font-size:14px;line-height:1.7}
.quizBtn{margin-top:14px}
.quizEmoji{font-size:52px;flex-shrink:0}

/* Pricing */
.prBadge{position:absolute;top:14px;right:14px;border-radius:999px;padding:5px 10px;background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.75);font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em}

/* Metrics */
.metGrid{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:${c.border};border:1px solid ${c.border};border-radius:16px;overflow:hidden}
.metCell{background:#fff;padding:22px 14px;text-align:center}
.metVal{font-size:clamp(28px,6vw,40px);letter-spacing:-0.05em;line-height:1}
.metLab{margin-top:5px;font-size:12px;color:${c.sub}}

/* Waitlist */
.wlCard{background:rgba(255,255,255,0.92);border:1px solid ${c.border};border-radius:22px;padding:24px;max-width:820px;margin:0 auto;box-shadow:0 12px 32px rgba(0,0,0,0.03)}
.wlForm{display:grid;grid-template-columns:1fr;gap:10px;margin-top:18px}
.wlBtn{height:52px;width:100%}
.inp{width:100%;height:52px;border-radius:14px;border:1px solid ${c.border};background:#fff;padding:0 16px;font-size:15px;color:${c.text};outline:none}
.inp:focus{border-color:${c.accent};box-shadow:0 0 0 3px rgba(37,99,235,0.06)}
.pvLabel{display:flex;align-items:flex-start;gap:8px;margin-top:12px;color:${c.sub};font-size:12px;line-height:1.7;cursor:pointer;max-width:600px;margin-left:auto;margin-right:auto}
.pvCheck{margin-top:2px;width:16px;height:16px;accent-color:${c.accent};flex-shrink:0}
.pvLink{color:${c.text};font-weight:700;text-decoration:underline;text-underline-offset:2px}
.fmOk{margin-top:12px;background:${c.greenSoft};color:${c.greenDk};border-radius:12px;padding:12px;text-align:center;font-size:14px;font-weight:600}
.fmErr{margin-top:12px;background:#FFF7F7;color:#B91C1C;border-radius:12px;padding:12px;text-align:center;font-size:14px;font-weight:600}

.emNotice{text-align:center;font-size:11px;line-height:1.7;color:${c.muted};max-width:640px;margin:0 auto;padding:14px;border:1px solid ${c.border};border-radius:14px;background:rgba(255,255,255,0.6)}

/* Modal */
.modOv{position:fixed;inset:0;z-index:220;background:rgba(9,10,13,0.4);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;padding:16px}
.modBox{width:100%;max-width:420px;background:rgba(255,255,255,0.96);border:1px solid ${c.border};border-radius:22px;padding:24px;box-shadow:0 32px 72px rgba(0,0,0,0.18)}
.modIco{width:44px;height:44px;border-radius:12px;background:linear-gradient(180deg,#F7FBFF,${c.accentSoft});border:1px solid ${c.border};display:flex;align-items:center;justify-content:center}
.modTitle{font-size:clamp(22px,4vw,32px);line-height:1.04;letter-spacing:-0.04em;margin-top:8px}
.modBody{margin-top:6px;color:${c.sub};font-size:14px;line-height:1.8}

/* Footer */
.ft{border-top:1px solid ${c.border};padding:20px 0 26px}
.ftInner{display:flex;flex-direction:column;gap:12px;align-items:center;text-align:center}
.ftLinks{display:flex;gap:14px;flex-wrap:wrap;justify-content:center}
.ftLink{font-size:12px;color:${c.muted};font-weight:600;transition:color 0.2s}.ftLink:hover{color:${c.text}}
.ftCopy{font-size:10px;color:${c.muted}}

/* TABLET 640px+ */
@media(min-width:640px){
  .container{padding:0 28px}.sec{padding:80px 0}.secDark{padding:80px 0}
  .navRow{height:68px}.navCta{padding:11px 20px!important;font-size:14px!important}
  .navCtaL{display:inline}.navCtaS{display:none}
  .heroSec{padding:56px 0 28px}
  .heroBtns{flex-direction:row}.heroBtns .btnP,.heroBtns .btnS{width:auto}
  .g3{grid-template-columns:repeat(2,1fr);gap:16px}
  .g2{grid-template-columns:repeat(2,1fr);gap:28px}
  .metGrid{grid-template-columns:repeat(4,1fr)}
  .wlForm{grid-template-columns:1.2fr 0.8fr auto}.wlBtn{height:52px;width:auto}
  .wlCard{padding:32px}
  .phWrap{max-width:280px}
  .phBody{height:260px}
  .ftInner{flex-direction:row;justify-content:space-between;text-align:left}
  .mqC{min-width:160px;height:60px}.mqI{max-width:95px;max-height:22px}
  .termBody{height:320px}
  .globalCard{padding:36px}
  .capRow{gap:20px;padding:24px 28px}
}

/* DESKTOP 960px+ */
@media(min-width:960px){
  .container{padding:0 44px}.sec{padding:96px 0}.secDark{padding:96px 0}
  .navLinks{display:flex}.navRow{height:76px}
  .heroSec{padding:72px 0 36px}
  .heroSec .container{display:grid;grid-template-columns:1.1fr 0.9fr;gap:0 52px;align-items:start}
  .heroText{grid-column:1;grid-row:1}
  .heroPhone{grid-column:2;grid-row:1;margin-top:0;align-self:start}
  .capSection{grid-column:1/-1}
  .mqSec{grid-column:1/-1}
  .g3{grid-template-columns:repeat(3,1fr);gap:18px}
  .wfGrid{grid-template-columns:repeat(3,1fr);gap:18px}
  .wfArrow{display:flex;position:absolute;top:50%;right:-16px;transform:translateY(-50%);width:32px;height:32px;border-radius:999px;background:#fff;border:1px solid ${c.border};align-items:center;justify-content:center;z-index:2;box-shadow:0 3px 10px rgba(0,0,0,0.04)}
  .phWrap{max-width:300px}
  .phBezel{border-radius:42px;padding:8px}
  .phScr{border-radius:36px}
  .phBody{height:300px}
  .card{padding:28px;border-radius:24px}
  .dkCard{padding:28px;border-radius:24px}
  .mqC{min-width:180px;height:68px}.mqI{max-width:110px;max-height:26px}
  .termBody{height:340px}
  .globalCard{padding:44px}
  .capRow{gap:24px;padding:26px 32px}
  .capTitle{font-size:18px}
  .capBody{font-size:15px}
}
@media(min-width:1100px){.heroTitle{font-size:clamp(64px,7vw,88px)}}
`;
