"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Mic, Globe, ArrowRight, Phone, FileText, Clock, MapPin, Pill as PillIcon, MessageSquare } from "lucide-react";

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
  return <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>;
}

function Tag({ children }: { children: ReactNode }) {
  return <div className="tag"><span className="tagIn">{children}</span></div>;
}

function CS() {
  return <span className="cs"><span className="csS" />Soon</span>;
}

function SH({ badge, title, body, dark = false }: { badge?: string; title: ReactNode; body?: string; dark?: boolean }) {
  return (
    <div className="shW">
      {badge && <Tag>{badge}</Tag>}
      <h2 className="serif shT" style={{ marginTop: badge ? "18px" : 0, color: dark ? "#fff" : c.text }}>{title}</h2>
      {body && <p className="shB" style={{ color: dark ? "rgba(255,255,255,0.6)" : c.sub }}>{body}</p>}
    </div>
  );
}

function Chk({ dark = false }: { dark?: boolean }) {
  return <span className={`chk${dark ? " chkD" : ""}`}>&#10003;</span>;
}

/* ── Status Bar ── */
function StatusBar() {
  const items = ["Laura Chat", "Urgency Engine", "Provider Search", "Translation", "Laura Chat", "Urgency Engine", "Provider Search", "Translation"];
  return (
    <div className="stBar">
      <div className="container stIn">
        <div className="stL">
          <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} className="stDot" />
          <span className="stLbl">All systems operational</span>
          <Link href="/status" className="stLnk">View status</Link>
        </div>
        <div className="stTk"><motion.div className="stTkTr" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 22, ease: "linear", repeat: Infinity }}>
          {items.map((s, i) => <span key={`${s}-${i}`} className="stSvc"><span className="stSvcD" />{s}</span>)}
        </motion.div></div>
      </div>
    </div>
  );
}

/* ── Multilingual Phone ── */
const langConvos = [
  { lang: "English", flag: "\u{1F1EC}\u{1F1E7}", msgs: [
    { f: "u", t: "I need to refill my blood pressure medication but the GP line is always busy." },
    { f: "l", t: "I can help. Let me find your practice and draft a refill request so you do not have to sit on hold." },
  ]},
  { lang: "Fran\u00e7ais", flag: "\u{1F1EB}\u{1F1F7}", msgs: [
    { f: "u", t: "J'ai mal \u00e0 la gorge et de la fi\u00e8vre depuis hier." },
    { f: "l", t: "Je comprends. Je vais chercher un m\u00e9decin pr\u00e8s de chez vous et pr\u00e9parer une note pour l'accueil." },
  ]},
  { lang: "Espa\u00f1ol", flag: "\u{1F1EA}\u{1F1F8}", msgs: [
    { f: "u", t: "Llevo 3 semanas intentando conseguir cita y no hay turnos." },
    { f: "l", t: "Eso es muy frustrante. Puedo buscar cl\u00ednicas sin cita previa cerca de ti." },
  ]},
  { lang: "Portugu\u00eas", flag: "\u{1F1E7}\u{1F1F7}", msgs: [
    { f: "u", t: "Recebi uma carta de encaminhamento mas n\u00e3o entendo o que devo fazer." },
    { f: "l", t: "Posso explicar tudo sobre a consulta: o que levar, onde ir e o que esperar." },
  ]},
  { lang: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629", flag: "\u{1F1F8}\u{1F1E6}", msgs: [
    { f: "u", t: "\u0639\u0646\u062f\u064a \u0635\u062f\u0627\u0639 \u0634\u062f\u064a\u062f \u0648\u0644\u0627 \u0623\u0639\u0631\u0641 \u0625\u0630\u0627 \u0643\u0627\u0646 \u064a\u062c\u0628 \u0623\u0646 \u0623\u0630\u0647\u0628 \u0644\u0644\u0637\u0648\u0627\u0631\u0626" },
    { f: "l", t: "\u0633\u0623\u0633\u0627\u0639\u062f\u0643 \u0639\u0644\u0649 \u062a\u062d\u062f\u064a\u062f \u0645\u062f\u0649 \u0627\u0644\u062d\u0627\u062c\u0629 \u0644\u0644\u0639\u0646\u0627\u064a\u0629 \u0627\u0644\u0639\u0627\u062c\u0644\u0629." },
  ]},
  { lang: "Hindi", flag: "\u{1F1EE}\u{1F1F3}", msgs: [
    { f: "u", t: "\u092e\u0941\u091d\u0947 \u092c\u0941\u0916\u093e\u0930 \u0914\u0930 \u0938\u093f\u0930 \u0926\u0930\u094d\u0926 \u0939\u0948\u0964" },
    { f: "l", t: "\u092e\u0948\u0902 \u0906\u092a\u0915\u0947 \u0932\u093f\u090f \u0928\u091c\u0926\u0940\u0915\u0940 \u0921\u0949\u0915\u094d\u091f\u0930 \u0922\u0942\u0902\u0922 \u0930\u0939\u0940 \u0939\u0942\u0901\u0964" },
  ]},
  { lang: "Yor\u00f9b\u00e1", flag: "\u{1F1F3}\u{1F1EC}", msgs: [
    { f: "u", t: "Mo ni iba ati efori. Mo nilo iranlowo." },
    { f: "l", t: "Mo le ran o lowo. Je ki n wa dokita to sun mo o." },
  ]},
  { lang: "Polski", flag: "\u{1F1F5}\u{1F1F1}", msgs: [
    { f: "u", t: "Mam silny b\u00f3l brzucha od wczoraj i nie wiem co robi\u0107." },
    { f: "l", t: "Rozumiem. Pomog\u0119 oceni\u0107 pilno\u015b\u0107 i znajd\u0119 lekarza w pobli\u017cu." },
  ]},
  { lang: "Deutsch", flag: "\u{1F1E9}\u{1F1EA}", msgs: [
    { f: "u", t: "Ich habe seit drei Tagen Halsschmerzen und weiss nicht ob ich zum Arzt soll." },
    { f: "l", t: "Ich helfe Ihnen. Soll ich einen Arzt in Ihrer N\u00e4he suchen?" },
  ]},
  { lang: "\u4e2d\u6587", flag: "\u{1F1E8}\u{1F1F3}", msgs: [
    { f: "u", t: "\u6211\u80a9\u8180\u75bc\u4e86\u4e00\u5468\u4e86\u3002\u8be5\u770b\u533b\u751f\u5417\uff1f" },
    { f: "l", t: "\u6211\u5efa\u8bae\u60a8\u5c3d\u5feb\u5c31\u8bca\u3002\u8ba9\u6211\u67e5\u627e\u9644\u8fd1\u7684\u8bca\u6240\u3002" },
  ]},
];

function PhoneMockup() {
  const [li, setLi] = useState(0);
  const [phase, setPhase] = useState<"u" | "l" | "done">("u");
  const [cU, setCU] = useState(0);
  const [cL, setCL] = useState(0);
  const cv = langConvos[li];
  const uMsg = cv.msgs[0].t;
  const lMsg = cv.msgs[1].t;

  useEffect(() => {
    if (phase === "u") {
      if (cU < uMsg.length) { const t = setTimeout(() => setCU(p => p + 1), 16); return () => clearTimeout(t); }
      else { const t = setTimeout(() => setPhase("l"), 400); return () => clearTimeout(t); }
    }
    if (phase === "l") {
      if (cL < lMsg.length) { const t = setTimeout(() => setCL(p => p + 1), 11); return () => clearTimeout(t); }
      else setPhase("done");
    }
    if (phase === "done") {
      const t = setTimeout(() => { setLi(p => (p + 1) % langConvos.length); setPhase("u"); setCU(0); setCL(0); }, 1800);
      return () => clearTimeout(t);
    }
  }, [phase, cU, cL, uMsg, lMsg]);

  return (
    <div className="phW">
      <motion.div className="phF" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
        <div className="phB">
          <div className="phDI"><div className="phDIC" /></div>
          <div className="phS">
            <div className="phH">
              <div className="phHL">
                <div className="phAv"><Image src="/laura-avatar.png" alt="Laura" fill sizes="28px" style={{ objectFit: "cover" }} /></div>
                <div>
                  <div className="phN">Laura <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 1L14.9 3.6L18.6 3.2L19.4 6.8L22.5 8.7L21.2 12.2L22.5 15.7L19.4 17.6L18.6 21.2L14.9 20.8L12 23.4L9.1 20.8L5.4 21.2L4.6 17.6L1.5 15.7L2.8 12.2L1.5 8.7L4.6 6.8L5.4 3.2L9.1 3.6L12 1Z" fill="#22C55E"/><path d="M8.5 12.5L10.5 14.5L15.5 9.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                  <div className="phOn"><span className="phOnD" />online</div>
                </div>
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={li} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }} className="phLang">{cv.flag} {cv.lang}</motion.div>
            </AnimatePresence>
            <div className="phBdy">
              {cU > 0 && <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="phR phRR"><div className="phBb phBbU">{uMsg.slice(0, cU)}</div></motion.div>}
              {cL > 0 && <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="phR phRL"><div className="phBb phBbL">{lMsg.slice(0, cL)}</div></motion.div>}
            </div>
            <div className="phCo"><div className="phCoF"><span style={{ fontSize: "13px", opacity: 0.4 }}>&#128522;</span><span className="phCoT">Message</span></div><div className="phCoM"><Mic size={13} color="#fff" strokeWidth={2.2} /></div></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Logo Marquee ── */
function LogoMarquee() {
  const logos = [{ n: "AWS", s: "/logos/aws-logo.png" }, { n: "Microsoft", s: "/logos/microsoft-logo.png" }, { n: "Google", s: "/logos/google-logo.png" }, { n: "Salesforce", s: "/logos/salesforce-logo.png" }, { n: "Twilio", s: "/logos/twilio-logo.png" }, { n: "Epic", s: "/logos/epic-logo.png" }, { n: "Veradigm", s: "/logos/veradigm-logo.png" }, { n: "GitHub", s: "/logos/github-logo.png", b: true }];
  const d = useMemo(() => [...logos, ...logos], []);
  return (
    <div className="mqS">
      <p className="mqL">Built for the systems behind modern care</p>
      <div className="mqV"><motion.div className="mqT" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 30, ease: "linear", repeat: Infinity }}>
        {d.map((l, i) => <div key={`${l.n}-${i}`} className="mqC"><Image src={l.s} alt={l.n} width={110} height={32} className={`mqI${l.b ? " mqBl" : ""}`} /></div>)}
      </motion.div></div>
    </div>
  );
}

/* ── SDK Terminal ── */
function SDKTerminal() {
  const lines = useMemo(() => ['$ npm install @omela/laura-sdk', '', '  import { Laura } from "@omela/laura-sdk";', '', '  const laura = new Laura({', '    apiKey: process.env.OMELA_KEY,', '    region: "eu-west-2"', '  });', '', '  const res = await laura.chat({', '    userId: "patient_4102",', '    lang: "fr",', '    message: "J\'ai besoin de renouveler mon ordonnance."', '  });', '', '  > Laura responds in French...', '  Done in 1.1s'], []);
  const [vl, setVl] = useState(0); const [ci, setCi] = useState(0);
  useEffect(() => {
    if (vl >= lines.length) { const t = setTimeout(() => { setVl(0); setCi(0); }, 3000); return () => clearTimeout(t); }
    const line = lines[vl];
    if (ci < line.length) { const t = setTimeout(() => setCi(p => p + 1), line.startsWith("  >") ? 36 : 18); return () => clearTimeout(t); }
    else { const t = setTimeout(() => { setVl(p => p + 1); setCi(0); }, line === "" ? 60 : 160); return () => clearTimeout(t); }
  }, [vl, ci, lines]);
  return (
    <div className="trm">
      <div className="trmT"><div className="trmD"><span /><span /><span /></div><span className="trmTi">Laura SDK</span><CS /></div>
      <div className="trmB">{lines.slice(0, vl + 1).map((line, i) => { const a = i === vl; return (
        <div key={i} className="trmL" style={{ color: line.startsWith("  Done") ? "#4ADE80" : line.startsWith("  >") ? "#FBBF24" : line.startsWith("$") ? "#E2E8F0" : "#94A3B8" }}>
          {a ? line.slice(0, ci) : line}{a && <span className="trmC">|</span>}
        </div>
      ); })}</div>
    </div>
  );
}

/* ── Success Modal ── */
function SuccessModal({ open, role, onClose }: { open: boolean; role: Role; onClose: () => void }) {
  const m: Record<Role, { t: string; b: string }> = {
    patient: { t: "You are in early.", b: "Laura will reach out as access opens. Follow @joinomela on X." },
    provider: { t: "Your place is reserved.", b: "Laura will reach out as operations open. Follow @joinomela on X." },
    developer: { t: "You are on the list.", b: "Laura will reach out as API access opens. Follow @joinomela on X." },
  };
  const copy = m[role];
  return <AnimatePresence>{open && (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="modO">
      <motion.div initial={{ opacity: 0, y: 16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12 }} onClick={e => e.stopPropagation()} className="modB">
        <div className="modI"><svg width="24" height="24" viewBox="0 0 32 32" fill="none"><path d="M7 16.5L12.8 22L25 9.5" stroke={c.green} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
        <h3 className="serif modT">{copy.t}</h3>
        <p className="modBd">{copy.b}</p>
        <div style={{ marginTop: "16px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <a href="https://x.com/joinomela" target="_blank" rel="noreferrer" className="btnP">Follow on X</a>
          <button type="button" className="btnS" onClick={onClose}>Continue</button>
        </div>
      </motion.div>
    </motion.div>
  )}</AnimatePresence>;
}

/* ══════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════ */
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
          <div className="container navR">
            <Link href="/" className="navBr">
              <div className="navLo"><Image src="/omela-logo-mark.png" alt="Omela" width={36} height={36} style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
              <div><div className="navNm">Omela</div><div className="navSb serif">Powered by Laura</div></div>
            </Link>
            <div className="navLks">{["People", "Providers", "Developers", "Pricing"].map(i => <a key={i} href={`#${i.toLowerCase()}`} className="navLk">{i}</a>)}</div>
            <a href="#waitlist" className="btnP navCt"><span className="navCtL">Get early access</span><span className="navCtS">Early access</span><ArrowRight size={13} /></a>
          </div>
        </motion.nav>

        {/* ═══ HERO ═══ */}
        <section className="heroSec">
          <div className="container">
            <div className="heroTxt">
              <FadeIn><Tag><span className="tagStar">&#10038;</span>Now onboarding early access users</Tag></FadeIn>
              <FadeIn delay={0.06}><h1 className="serif heroTi">Getting care<br /><span className="heroAc">should not be this hard.</span></h1></FadeIn>
              <FadeIn delay={0.12}><p className="heroBd">You sit on hold for 45 minutes. You chase repeat prescriptions for days. You get a hospital letter you cannot understand. You move to a new city with no doctor and no idea where to start.<br /><br />Laura removes the exhausting parts of reaching care. She finds doctors, explains referrals, drafts prescription requests, and works in 40+ languages. Available 24/7, with no queue.</p></FadeIn>
              <FadeIn delay={0.18}><div className="heroBt">
                <Link href="/demo" className="btnP">See how Laura helps <ArrowRight size={15} /></Link>
                <a href="#waitlist" className="btnS">Get early access</a>
              </div></FadeIn>
            </div>
            <div className="heroPh"><PhoneMockup /></div>
          </div>
        </section>

        {/* ═══ REAL PROBLEMS — the emotional core ═══ */}
        <section className="sec">
          <div className="container">
            <FadeIn><SH badge="Real problems Laura solves" title={<>People do not just suffer because they are sick. They suffer because reaching care is exhausting.</>} /></FadeIn>
            <div className="probGrid">
              {[
                { emoji: "💊", title: "Chasing repeat prescriptions", body: "You depend on daily medication. Every month you call the GP, wait on hold, repeat the same information, and pray it is ready at the pharmacy. Laura drafts the refill request, tracks the status, and reminds you before you run out.", link: "/demo" },
                { emoji: "📍", title: "Moving to a new city with no doctor", body: "You just arrived. You do not know how the system works, which practices accept patients, or what documents you need. Laura finds practices near you, walks you through registration, and tells you exactly what to bring.", link: "/demo" },
                { emoji: "🌙", title: "It is 11pm and you are worried about your child", body: "Your child has a fever. Is it serious? Should you go to A&E or wait until morning? Laura helps you assess the situation calmly, tells you what to watch for, and finds the nearest out-of-hours service.", link: "/demo" },
                { emoji: "📋", title: "A hospital letter you do not understand", body: "You got a referral for something called an 'echocardiogram.' What does that mean? Where do you go? What do you bring? Laura explains everything in plain language so you walk in prepared, not panicking.", link: "/demo" },
                { emoji: "🌍", title: "Trying to explain pain in a language that is not yours", body: "You are in a new country. You know something is wrong but cannot find the words. Laura speaks your language. She translates your concern and prepares a note the receptionist can read.", link: "/demo" },
                { emoji: "😤", title: "Calling every day for 3 weeks and being told 'try again tomorrow'", body: "Your condition is getting worse. The system keeps turning you away. Laura finds alternative routes: walk-in clinics, online booking portals, or she submits a structured request that is harder for the practice to ignore.", link: "/demo" },
              ].map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.06}>
                  <Link href={item.link} className="probCard">
                    <span className="probEmoji">{item.emoji}</span>
                    <h3 className="probTitle">{item.title}</h3>
                    <p className="probBody">{item.body}</p>
                    <span className="probCta">See how Laura handles this <ArrowRight size={13} /></span>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ BIG STATEMENT ═══ */}
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="container">
            <FadeIn>
              <div className="bigSt">
                <h2 className="serif bigT">6.4 million people on NHS waiting lists. 100 million Americans with medical debt. 3.6 billion people worldwide without access to essential health services.</h2>
                <p className="bigB">The problem is not that care does not exist. It is that getting to it is slow, confusing, and unequal. Laura does not replace doctors. She replaces the phone queue, the language barrier, the referral confusion, and the prescription chase.</p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ═══ WHAT LAURA DOES ═══ */}
        <section className="sec">
          <div className="container">
            <FadeIn><SH title={<>Less chasing. Less confusion. More dignity when you already feel unwell.</>} /></FadeIn>
            <div className="capSec">
              {[
                { icon: <Phone size={20} />, title: "Skip the phone queue", body: "Talk to Laura anytime. No busy signals, no hold music, no 8am rush. She works 24/7 in over 40 languages." },
                { icon: <PillIcon size={20} />, title: "Stop chasing prescriptions", body: "Laura drafts refill requests, tracks status, and reminds you before you run out. You should not have to repeat the same admin loop every month." },
                { icon: <MapPin size={20} />, title: "Find care wherever you are", body: "New city, new country, no doctor. Laura finds practices near you, checks if they accept patients, and walks you through registration." },
                { icon: <FileText size={20} />, title: "Understand hospital letters", body: "Referral letters full of medical jargon. Laura explains what the appointment involves, what to bring, and what to expect." },
                { icon: <Globe size={20} />, title: "Speak your own language", body: "Laura responds in the language you start with. She prepares bilingual notes so receptionists understand your concern." },
                { icon: <Clock size={20} />, title: "Know if it can wait", body: "Is this an emergency or can it wait until morning? Laura helps you assess urgency so you make the right call without panic." },
              ].map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.05}>
                  <div className="capRow">
                    <div className="capIc">{item.icon}</div>
                    <div><h3 className="capTi">{item.title}</h3><p className="capBd">{item.body}</p></div>
                  </div>
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={0.2}><LogoMarquee /></FadeIn>
          </div>
        </section>

        {/* ═══ WHO IS LAURA FOR ═══ */}
        <section id="people" className="sec">
          <div className="container">
            <FadeIn><SH badge="Who is Laura for?" title={<>Three audiences. One platform.</>} /></FadeIn>
            <div className="g3" style={{ marginTop: "40px" }}>
              {[
                { title: "For people", desc: "You are sick, confused, or stuck in a system that was not designed for you. Laura gives you a way through.", bullets: ["Skip the phone queue", "Draft prescription refills", "Find doctors near you", "Understand referral letters"], ico: "1" },
                { title: "For care teams", desc: "Your receptionists are drowning. Laura handles intake, sorts by urgency, and sends structured requests so your team focuses on patients.", bullets: ["Reduce reception pressure", "See urgency at a glance", "Structured callback requests", "Multilingual patient access"], ico: "2" },
                { title: "For developers", desc: "Embed Laura into your health app, patient portal, or marketplace. Add care-access intelligence without building it from scratch.", bullets: ["API and SDK access", "Embeddable chat widget", "Workflow triggers", "Audit logs and auth"], ico: "3", soon: true },
              ].map((card, i) => (
                <FadeIn key={card.title} delay={i * 0.08}><div className="card">
                  <div className="cardN">{card.ico}{card.soon && <CS />}</div>
                  <h3 className="cardTi">{card.title}</h3>
                  <p className="cardBd">{card.desc}</p>
                  <div className="ftL">{card.bullets.map(b => <div key={b} className="ftR"><Chk /><span>{b}</span></div>)}</div>
                </div></FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ GLOBAL ═══ */}
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="container">
            <FadeIn>
              <div className="glC">
                <h2 className="serif glT">Laura speaks your language.</h2>
                <p className="glB">Whether you speak English, French, Spanish, Arabic, Hindi, Mandarin, Yoruba, Polish, Portuguese, or German. Laura replies in the language you start with. No translators. No barriers. No embarrassment.</p>
                <div className="glF">
                  {["\u{1F1EC}\u{1F1E7} UK", "\u{1F1FA}\u{1F1F8} US", "\u{1F1EB}\u{1F1F7} France", "\u{1F1F3}\u{1F1EC} Nigeria", "\u{1F1EE}\u{1F1F3} India", "\u{1F1E7}\u{1F1F7} Brazil", "\u{1F1F8}\u{1F1E6} Saudi Arabia", "\u{1F1E8}\u{1F1F3} China", "\u{1F1F5}\u{1F1F1} Poland", "\u{1F1E9}\u{1F1EA} Germany", "\u{1F30D} 40+ more"].map(f => <span key={f} className="glFi">{f}</span>)}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ═══ DEVELOPERS ═══ */}
        <section id="developers" className="secDk">
          <div className="container">
            <FadeIn><SH dark badge="Developer platform" title={<>Build with Laura.</>} body="Embed urgency checks, provider routing, and multilingual care access into your products." /></FadeIn>
            <div className="g2" style={{ marginTop: "40px" }}>
              <FadeIn><SDKTerminal /></FadeIn>
              <FadeIn delay={0.08}><div className="dkC">
                <h3 className="dkCT">Built for integration teams</h3>
                <p className="dkCB">Add Laura to patient portals, health apps, or internal tooling through a clean API layer.</p>
                <div className="ftL" style={{ marginTop: "18px" }}>
                  {["REST API and SDK access", "Embeddable chat widgets", "Patient workflow triggers", "Secure auth and audit trails"].map(f => <div key={f} className="ftR" style={{ color: "rgba(255,255,255,0.8)" }}><Chk dark /><span>{f}</span></div>)}
                </div>
                <div className="dkP">Developer access on the roadmap <CS /></div>
              </div></FadeIn>
            </div>
          </div>
        </section>

        {/* ═══ PRICING ═══ */}
        <section id="pricing" className="sec">
          <div className="container">
            <FadeIn><SH badge="Pricing" title={<>Simple, transparent access.</>} /></FadeIn>
            <div className="g3" style={{ marginTop: "40px" }}>
              {[
                { name: "People", price: "\u00A33.99", period: "/mo", desc: "Stop chasing prescriptions, sitting on hold, and feeling lost in the system.", ft: ["Urgency checks", "GP and dental search", "Prescription support", "Referral guidance"], hl: false, cta: "Join waitlist" },
                { name: "Care Teams", price: "\u00A31,999.99", period: "/mo", desc: "Give your receptionists their sanity back. Laura handles intake so your team handles patients.", ft: ["Structured intake", "Urgency dashboard", "Multilingual access", "Request management"], hl: true, badge: "Best for practices", cta: "Request demo" },
                { name: "Developer", price: "Custom", period: "", desc: "Embed Laura into your health product.", ft: ["API and SDK access", "Embeddable components", "Usage analytics", "Technical onboarding"], hl: false, cta: "Talk to us", soon: true },
              ].map((p, i) => (
                <FadeIn key={p.name} delay={i * 0.08}><div className={`card ${p.hl ? "cardDk" : ""}`} style={{ position: "relative" }}>
                  {p.badge && <div className="prBg">{p.badge}</div>}
                  <div style={{ fontSize: "16px", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" }}>{p.name} {p.soon && <CS />}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginTop: "14px" }}>
                    <span className="serif" style={{ fontSize: "clamp(32px, 6vw, 48px)", letterSpacing: "-0.05em" }}>{p.price}</span>
                    {p.period && <span style={{ fontSize: "14px", color: p.hl ? "rgba(255,255,255,0.5)" : c.muted }}>{p.period}</span>}
                  </div>
                  <p style={{ marginTop: "8px", color: p.hl ? "rgba(255,255,255,0.6)" : c.sub, fontSize: "14px", lineHeight: 1.7 }}>{p.desc}</p>
                  <div style={{ marginTop: "18px", paddingTop: "16px", borderTop: `1px solid ${p.hl ? c.borderDk : c.border}`, display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
                    {p.ft.map(f => <div key={f} className="ftR" style={{ color: p.hl ? "rgba(255,255,255,0.8)" : c.sub }}><Chk dark={p.hl} /><span>{f}</span></div>)}
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
            <FadeIn><Link href="/quiz" className="qzCd">
              <div><Tag>Daily health check</Tag><h3 className="serif qzTi">Would you know what to do?</h3><p className="qzBd">Real health scenarios. Test yourself in 30 seconds.</p><span className="btnP qzBtn">Take today&apos;s quiz <ArrowRight size={14} /></span></div>
              <div className="qzEm">&#129657;</div>
            </Link></FadeIn>
            <FadeIn><div className="metG" style={{ marginTop: "20px" }}>
              {[{ v: "24/7", l: "Always available" }, { v: "40+", l: "Languages" }, { v: "<2s", l: "Response time" }, { v: "0", l: "Time on hold" }].map(m => <div key={m.l} className="metC"><div className="serif metV">{m.v}</div><div className="metLb">{m.l}</div></div>)}
            </div></FadeIn>
          </div>
        </section>

        {/* ═══ WAITLIST ═══ */}
        <section id="waitlist" className="sec">
          <div className="container"><FadeIn><div className="wlC">
            <SH badge="Get early access" title={<>Be the first to use Laura.</>} body="Tell us who you are. We will prioritize your access." />
            <form className="wlF" onSubmit={handleSubmit}>
              <input className="inp" type="email" placeholder="Your email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
              <select className="inp" value={role} onChange={e => setRole(e.target.value as Role)}><option value="patient">I am a patient</option><option value="provider">I am a provider</option><option value="developer">I am a developer</option></select>
              <input type="text" name="website" value={website} onChange={e => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none", height: 0, width: 0 }} />
              <button type="submit" className="btnP wlBt" disabled={submitting || !agreed}>{submitting ? "Submitting..." : "Get early access"}</button>
            </form>
            <label className="pvL"><input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} required className="pvC" /><span>I agree that Omela may use my information to manage my request. <Link href="/privacy" className="pvLk">Privacy Notice</Link>.</span></label>
            {success && <div className="fmOk">{success}</div>}
            {error && <div className="fmEr">{error}</div>}
          </div></FadeIn></div>
        </section>

        <section style={{ padding: "0 0 32px" }}><div className="container"><div className="emN">Laura is an AI care-access assistant. She is not a substitute for emergency services or clinical diagnosis. If you are experiencing an emergency, call 999 (UK), 911 (US), or your local emergency number immediately.</div></div></section>

        <footer className="ft">
          <div className="container ftIn">
            <Link href="/" className="navBr"><div className="navLo" style={{ width: "26px", height: "26px" }}><Image src="/omela-logo-mark.png" alt="Omela" width={26} height={26} style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div><div><div style={{ fontSize: "12px", fontWeight: 800 }}>Omela</div></div></Link>
            <div className="ftLks"><Link href="/privacy" className="ftLk">Privacy</Link><Link href="/terms" className="ftLk">Terms</Link><Link href="/status" className="ftLk">Status</Link><Link href="/quiz" className="ftLk">Health Quiz</Link><Link href="/demo" className="ftLk">Try Laura</Link><a href="mailto:notice@omela.ai" className="ftLk">Contact</a></div>
            <p className="ftCp">&copy; 2026 Omela</p>
          </div>
        </footer>
      </div>
    </>
  );
}

const CSS = `
*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}html,body{max-width:100%;overflow-x:clip}
body{background:${c.bg};color:${c.text};font-family:'DM Sans',-apple-system,sans-serif;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}button,input,select{font-family:inherit}::selection{background:${c.accent};color:#fff}
@keyframes blink{0%,50%{opacity:1}50.01%,100%{opacity:0}}
@keyframes csA{0%{transform:translateX(-100%)}100%{transform:translateX(200%)}}
.serif{font-family:'Instrument Serif',Georgia,serif}.wrap{width:100%;overflow-x:clip}.container{max-width:1200px;margin:0 auto;padding:0 20px}
.sec{padding:64px 0}.secDk{padding:64px 0;background:radial-gradient(circle at 16% 20%,rgba(37,99,235,0.08) 0%,transparent 28%),${c.dark};color:#fff}
.cs{display:inline-flex;padding:3px 8px;border-radius:999px;background:linear-gradient(135deg,#FEF3C7,#FDE68A);color:#92400E;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.06em;position:relative;overflow:hidden;margin-left:6px;flex-shrink:0}
.csS{position:absolute;top:0;left:0;width:60%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent);animation:csA 2.5s ease-in-out infinite}

.stBar{background:${c.greenSoft};border-bottom:1px solid rgba(34,197,94,0.15);padding:7px 0}
.stIn{display:flex;align-items:center;gap:8px}.stL{display:flex;align-items:center;gap:8px;flex-shrink:0}
.stDot{width:7px;height:7px;border-radius:999px;background:${c.green};display:inline-block;box-shadow:0 0 6px ${c.green}44}
.stLbl{font-size:12px;font-weight:700;color:${c.greenDk};white-space:nowrap}
.stLnk{font-size:11px;font-weight:700;color:${c.accent};white-space:nowrap;text-decoration:underline;text-underline-offset:2px}
.stTk{flex:1;min-width:0;overflow:hidden;mask-image:linear-gradient(90deg,transparent,black 10%,black 90%,transparent);-webkit-mask-image:linear-gradient(90deg,transparent,black 10%,black 90%,transparent)}
.stTkTr{display:flex;gap:14px;width:max-content}.stSvc{font-size:10px;color:${c.muted};font-weight:600;display:flex;align-items:center;gap:4px;white-space:nowrap}
.stSvcD{width:4px;height:4px;border-radius:999px;background:${c.green};display:inline-block;flex-shrink:0}

.tag{display:inline-flex;align-items:center;gap:8px;padding:8px 16px;border-radius:999px;border:1px solid ${c.border};background:rgba(255,255,255,0.8);font-size:13px;font-weight:700;color:${c.sub};position:relative;overflow:hidden}
.tagIn{position:relative;z-index:2;display:inline-flex;align-items:center;gap:8px}.tagStar{color:${c.accent};font-size:15px;flex-shrink:0}
.chk{width:20px;height:20px;border-radius:999px;background:${c.greenSoft};color:${c.green};display:inline-flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;flex-shrink:0;margin-top:2px}
.chkD{background:rgba(34,197,94,0.12);color:#4ADE80}
.shW{text-align:center;max-width:760px;margin:0 auto}.shT{font-size:clamp(26px,5vw,52px);line-height:1.08;letter-spacing:-0.04em}.shB{font-size:clamp(15px,2.5vw,18px);line-height:1.8;margin-top:14px;max-width:580px;margin-left:auto;margin-right:auto}
.btnP{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:${c.dark};color:#fff;border:none;border-radius:999px;padding:14px 24px;font-size:15px;font-weight:700;cursor:pointer;transition:all 0.25s;white-space:nowrap}
.btnP:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 10px 28px rgba(0,0,0,0.14);background:#161820}.btnP:disabled{opacity:0.5;cursor:not-allowed;transform:none;box-shadow:none}
.btnS{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:rgba(255,255,255,0.85);color:${c.text};border:1px solid ${c.border};border-radius:999px;padding:14px 24px;font-size:15px;font-weight:700;cursor:pointer;transition:all 0.25s;white-space:nowrap}.btnS:hover{background:#fff}

.nav{position:sticky;top:0;z-index:100;background:rgba(248,246,241,0.92);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid ${c.border}}
.navR{display:flex;align-items:center;justify-content:space-between;gap:10px;height:60px}
.navBr{display:flex;align-items:center;gap:8px;min-width:0;text-decoration:none;flex-shrink:0}
.navLo{width:34px;height:34px;border-radius:10px;overflow:hidden;flex-shrink:0;box-shadow:0 3px 10px rgba(0,0,0,0.06)}
.navNm{font-size:14px;font-weight:800;letter-spacing:-0.03em}.navSb{font-size:10px;color:${c.muted};font-style:italic;margin-top:1px}
.navLks{display:none;align-items:center;gap:24px}.navLk{font-size:14px;font-weight:600;color:${c.sub};transition:color 0.2s}.navLk:hover{color:${c.text}}
.navCt{padding:10px 18px!important;font-size:13px!important;flex-shrink:0}.navCtL{display:none}.navCtS{display:inline}

.heroSec{padding:48px 0 20px}
.heroTxt{max-width:640px}
.heroTi{font-size:clamp(36px,9vw,84px);line-height:0.96;letter-spacing:-0.05em;margin-top:18px}
.heroAc{color:${c.accent};font-style:italic}
.heroBd{margin-top:20px;font-size:clamp(15px,2.5vw,18px);line-height:1.78;color:${c.sub};max-width:560px}
.heroBt{display:flex;flex-direction:column;gap:10px;margin-top:28px}
.heroBt .btnP,.heroBt .btnS{width:100%;text-align:center}

.heroPh{margin-top:36px;width:100%;display:flex;justify-content:center}
.phW{width:100%;max-width:260px}.phF{position:relative;width:100%}
.phB{background:#1A1A1E;border-radius:36px;padding:6px;box-shadow:0 0 0 1px rgba(255,255,255,0.06),0 24px 48px rgba(0,0,0,0.14),inset 0 1px 0 rgba(255,255,255,0.04)}
.phDI{width:80px;height:22px;border-radius:999px;background:#000;margin:0 auto 4px;display:flex;align-items:center;justify-content:flex-end;padding-right:12px}
.phDIC{width:6px;height:6px;border-radius:999px;background:radial-gradient(circle,#1a2540,#0a1025);border:1px solid rgba(255,255,255,0.08)}
.phS{background:#FAFAFA;border-radius:32px;overflow:hidden;display:flex;flex-direction:column}
.phH{display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:#fff;border-bottom:1px solid #f0f0f0}
.phHL{display:flex;align-items:center;gap:6px}
.phAv{position:relative;width:28px;height:28px;border-radius:999px;overflow:hidden;flex-shrink:0;background:#E8EAF0;border:1.5px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.06)}
.phN{display:flex;align-items:center;gap:3px;font-size:12px;font-weight:700;color:${c.text}}
.phOn{display:flex;align-items:center;gap:3px;font-size:9px;color:${c.green};font-weight:600;margin-top:1px}
.phOnD{width:4px;height:4px;border-radius:999px;background:${c.green};display:inline-block}
.phLang{display:flex;align-items:center;justify-content:center;gap:4px;padding:5px 0;background:#F7F7FB;font-size:10px;font-weight:700;color:${c.accent}}
.phBdy{display:flex;flex-direction:column;gap:6px;padding:10px 8px;height:220px;overflow:hidden;justify-content:flex-end;background:linear-gradient(180deg,#F5F5F0,#ECE5DA);background-image:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23000' fill-opacity='.015'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")}
.phR{display:flex}.phRR{justify-content:flex-end}.phRL{justify-content:flex-start}
.phBb{max-width:85%;padding:7px 10px;font-size:10px;line-height:1.45;word-break:break-word}
.phBbU{background:#E7FFDB;color:#111;border-radius:10px 10px 3px 10px}
.phBbL{background:#fff;color:#111;border-radius:10px 10px 10px 3px;box-shadow:0 1px 2px rgba(0,0,0,0.04)}
.phCo{padding:6px 6px 10px;display:flex;align-items:center;gap:5px;background:#F0EBE3}
.phCoF{flex:1;height:28px;border-radius:999px;background:#fff;display:flex;align-items:center;gap:6px;padding:0 8px}.phCoT{color:${c.muted};font-size:11px}
.phCoM{width:28px;height:28px;border-radius:999px;background:#25D366;display:flex;align-items:center;justify-content:center;flex-shrink:0}

/* PROBLEMS GRID */
.probGrid{display:grid;grid-template-columns:1fr;gap:14px;margin-top:40px}
.probCard{display:block;padding:24px;border:1px solid ${c.border};border-radius:20px;background:rgba(255,255,255,0.92);transition:all 0.25s;text-decoration:none}
.probCard:hover{border-color:#D0CBBD;box-shadow:0 12px 36px rgba(0,0,0,0.06);transform:translateY(-2px)}
.probEmoji{font-size:28px;display:block;margin-bottom:10px}
.probTitle{font-size:18px;font-weight:800;letter-spacing:-0.03em;color:${c.text};line-height:1.25}
.probBody{font-size:14px;line-height:1.72;color:${c.sub};margin-top:8px}
.probCta{display:inline-flex;align-items:center;gap:6px;margin-top:14px;font-size:13px;font-weight:700;color:${c.accent}}

/* CAPABILITY ROWS */
.capSec{max-width:800px;margin:40px auto 0;display:flex;flex-direction:column;gap:10px}
.capRow{display:flex;align-items:flex-start;gap:16px;padding:20px 22px;border:1px solid ${c.border};border-radius:18px;background:rgba(255,255,255,0.9)}
.capIc{width:42px;height:42px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(180deg,#F5F8FF,#EAF0FF);border:1px solid rgba(190,210,250,0.5);color:${c.accent}}
.capTi{font-size:16px;font-weight:800;letter-spacing:-0.02em}.capBd{font-size:14px;line-height:1.65;color:${c.sub};margin-top:3px}

/* BIG STATEMENT */
.bigSt{max-width:900px;margin:0 auto;text-align:center;padding:20px 0}
.bigT{font-size:clamp(20px,4vw,36px);line-height:1.25;letter-spacing:-0.03em;color:${c.text}}
.bigB{margin-top:16px;font-size:clamp(15px,2vw,18px);line-height:1.8;color:${c.sub};max-width:640px;margin-left:auto;margin-right:auto}

.mqS{margin-top:40px}.mqL{text-align:center;font-size:10px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;color:${c.muted};margin-bottom:14px}
.mqV{overflow:hidden;mask-image:linear-gradient(90deg,transparent,black 8%,black 92%,transparent);-webkit-mask-image:linear-gradient(90deg,transparent,black 8%,black 92%,transparent)}
.mqT{display:flex;align-items:center;gap:10px;width:max-content}
.mqC{display:flex;align-items:center;justify-content:center;min-width:130px;height:52px;border:1px solid ${c.border};background:rgba(255,255,255,0.9);border-radius:12px;padding:10px 14px}
.mqI{width:auto;max-width:85px;height:auto;max-height:20px;object-fit:contain}.mqBl{mix-blend-mode:multiply}

.g3{display:grid;grid-template-columns:1fr;gap:14px}.g2{display:grid;grid-template-columns:1fr;gap:20px}
.card{background:rgba(255,255,255,0.92);border:1px solid ${c.border};border-radius:22px;padding:24px;min-width:0;box-shadow:0 6px 20px rgba(0,0,0,0.025);display:flex;flex-direction:column}
.cardDk{background:linear-gradient(180deg,#111318,#0D0F14)!important;border:1px solid ${c.borderDk}!important;color:#fff!important;box-shadow:0 20px 50px rgba(0,0,0,0.2)!important}
.cardN{display:flex;align-items:center;gap:6px;width:fit-content;padding:0 12px;height:34px;border-radius:10px;background:${c.accentSoft};color:${c.accent};font-size:16px;font-weight:800}
.cardTi{font-size:20px;font-weight:800;letter-spacing:-0.03em;margin-top:14px}
.cardBd{margin-top:6px;color:${c.sub};font-size:15px;line-height:1.72}
.dkC{background:linear-gradient(180deg,rgba(16,19,24,0.98),rgba(13,15,20,0.98));border:1px solid ${c.borderDk};border-radius:22px;padding:24px;box-shadow:0 18px 44px rgba(0,0,0,0.2)}
.dkCT{font-size:clamp(18px,3vw,24px);font-weight:800;letter-spacing:-0.03em;color:#fff}.dkCB{margin-top:10px;color:rgba(255,255,255,0.6);font-size:14px;line-height:1.9}
.dkP{display:inline-flex;align-items:center;margin-top:16px;padding:8px 12px;border-radius:999px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.04);color:rgba(255,255,255,0.7);font-size:11px;font-weight:700;gap:4px;flex-wrap:wrap}
.ftL{display:flex;flex-direction:column;gap:8px;margin-top:14px}.ftR{display:flex;align-items:flex-start;gap:8px;font-size:14px;line-height:1.6;color:${c.sub}}

.glC{border:1px solid ${c.border};background:rgba(255,255,255,0.9);border-radius:24px;padding:28px;text-align:center}
.glT{font-size:clamp(26px,5vw,44px);letter-spacing:-0.04em;line-height:1.06}
.glB{margin-top:12px;color:${c.sub};font-size:15px;line-height:1.8;max-width:560px;margin-left:auto;margin-right:auto}
.glF{display:flex;flex-wrap:wrap;justify-content:center;gap:6px;margin-top:20px}
.glFi{padding:6px 12px;border-radius:999px;border:1px solid ${c.border};background:rgba(255,255,255,0.8);font-size:12px;font-weight:600;color:${c.sub};white-space:nowrap}

.trm{background:#07080B;border:1px solid #1F2330;border-radius:16px;overflow:hidden;box-shadow:0 16px 40px rgba(0,0,0,0.18)}
.trmT{display:flex;align-items:center;gap:8px;padding:10px 14px;border-bottom:1px solid #1B1F2B;background:#0E1118}
.trmD{display:flex;gap:5px}.trmD span{width:9px;height:9px;border-radius:999px;display:inline-block}
.trmD span:nth-child(1){background:#FF5F57}.trmD span:nth-child(2){background:#FEBC2E}.trmD span:nth-child(3){background:#28C840}
.trmTi{font-size:11px;color:#6B7280;font-weight:700;flex:1}
.trmB{padding:14px;height:300px;overflow:hidden}
.trmL{white-space:pre-wrap;word-break:break-all;font-size:11px;line-height:1.75;font-family:'SF Mono',ui-monospace,Menlo,Consolas,monospace}
.trmC{color:#60A5FA;animation:blink 0.8s step-end infinite}

.prBg{position:absolute;top:14px;right:14px;border-radius:999px;padding:5px 10px;background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.75);font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em}

.qzCd{display:flex;align-items:center;justify-content:space-between;gap:20px;border:1px solid ${c.border};background:rgba(255,255,255,0.9);border-radius:22px;padding:28px;transition:all 0.25s;text-decoration:none}
.qzCd:hover{box-shadow:0 16px 40px rgba(0,0,0,0.06);transform:translateY(-2px)}
.qzTi{font-size:clamp(20px,4vw,32px);letter-spacing:-0.04em;line-height:1.1;margin-top:10px}
.qzBd{margin-top:8px;color:${c.sub};font-size:14px;line-height:1.7}.qzBtn{margin-top:14px}.qzEm{font-size:52px;flex-shrink:0}

.metG{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:${c.border};border:1px solid ${c.border};border-radius:16px;overflow:hidden}
.metC{background:#fff;padding:22px 14px;text-align:center}
.metV{font-size:clamp(28px,6vw,40px);letter-spacing:-0.05em;line-height:1}.metLb{margin-top:5px;font-size:12px;color:${c.sub}}

.wlC{background:rgba(255,255,255,0.92);border:1px solid ${c.border};border-radius:22px;padding:24px;max-width:820px;margin:0 auto;box-shadow:0 12px 32px rgba(0,0,0,0.03)}
.wlF{display:grid;grid-template-columns:1fr;gap:10px;margin-top:18px}
.wlBt{height:52px;width:100%}
.inp{width:100%;height:52px;border-radius:14px;border:1px solid ${c.border};background:#fff;padding:0 16px;font-size:15px;color:${c.text};outline:none}
.inp:focus{border-color:${c.accent};box-shadow:0 0 0 3px rgba(37,99,235,0.06)}
.pvL{display:flex;align-items:flex-start;gap:8px;margin-top:12px;color:${c.sub};font-size:12px;line-height:1.7;cursor:pointer;max-width:600px;margin-left:auto;margin-right:auto}
.pvC{margin-top:2px;width:16px;height:16px;accent-color:${c.accent};flex-shrink:0}
.pvLk{color:${c.text};font-weight:700;text-decoration:underline;text-underline-offset:2px}
.fmOk{margin-top:12px;background:${c.greenSoft};color:${c.greenDk};border-radius:12px;padding:12px;text-align:center;font-size:14px;font-weight:600}
.fmEr{margin-top:12px;background:#FFF7F7;color:#B91C1C;border-radius:12px;padding:12px;text-align:center;font-size:14px;font-weight:600}
.emN{text-align:center;font-size:11px;line-height:1.7;color:${c.muted};max-width:640px;margin:0 auto;padding:14px;border:1px solid ${c.border};border-radius:14px;background:rgba(255,255,255,0.6)}

.modO{position:fixed;inset:0;z-index:220;background:rgba(9,10,13,0.4);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;padding:16px}
.modB{width:100%;max-width:420px;background:rgba(255,255,255,0.96);border:1px solid ${c.border};border-radius:22px;padding:24px;box-shadow:0 32px 72px rgba(0,0,0,0.18)}
.modI{width:44px;height:44px;border-radius:12px;background:linear-gradient(180deg,#F7FBFF,${c.accentSoft});border:1px solid ${c.border};display:flex;align-items:center;justify-content:center}
.modT{font-size:clamp(22px,4vw,32px);line-height:1.04;letter-spacing:-0.04em;margin-top:8px}
.modBd{margin-top:6px;color:${c.sub};font-size:14px;line-height:1.8}

.ft{border-top:1px solid ${c.border};padding:20px 0 26px}
.ftIn{display:flex;flex-direction:column;gap:12px;align-items:center;text-align:center}
.ftLks{display:flex;gap:14px;flex-wrap:wrap;justify-content:center}
.ftLk{font-size:12px;color:${c.muted};font-weight:600;transition:color 0.2s}.ftLk:hover{color:${c.text}}
.ftCp{font-size:10px;color:${c.muted}}

@media(min-width:640px){
  .container{padding:0 28px}.sec{padding:80px 0}.secDk{padding:80px 0}
  .navR{height:68px}.navCt{padding:11px 20px!important;font-size:14px!important}.navCtL{display:inline}.navCtS{display:none}
  .heroSec{padding:56px 0 28px}.heroBt{flex-direction:row}.heroBt .btnP,.heroBt .btnS{width:auto}
  .g3{grid-template-columns:repeat(2,1fr);gap:16px}.g2{grid-template-columns:repeat(2,1fr);gap:28px}
  .probGrid{grid-template-columns:repeat(2,1fr);gap:16px}
  .metG{grid-template-columns:repeat(4,1fr)}
  .wlF{grid-template-columns:1.2fr 0.8fr auto}.wlBt{height:52px;width:auto}.wlC{padding:32px}
  .phW{max-width:280px}.phBdy{height:260px}
  .ftIn{flex-direction:row;justify-content:space-between;text-align:left}
  .mqC{min-width:160px;height:60px}.mqI{max-width:95px;max-height:22px}
  .trmB{height:320px}.glC{padding:36px}
}
@media(min-width:960px){
  .container{padding:0 44px}.sec{padding:96px 0}.secDk{padding:96px 0}
  .navLks{display:flex}.navR{height:76px}
  .heroSec{padding:72px 0 36px}
  .heroSec .container{display:grid;grid-template-columns:1.1fr 0.9fr;gap:0 52px;align-items:start}
  .heroTxt{grid-column:1;grid-row:1}.heroPh{grid-column:2;grid-row:1;margin-top:0;align-self:start}
  .probGrid{grid-template-columns:repeat(3,1fr);gap:18px}
  .g3{grid-template-columns:repeat(3,1fr);gap:18px}
  .phW{max-width:300px}.phB{border-radius:42px;padding:8px}.phS{border-radius:36px}.phBdy{height:280px}
  .card{padding:28px;border-radius:24px}.dkC{padding:28px;border-radius:24px}
  .mqC{min-width:180px;height:68px}.mqI{max-width:110px;max-height:26px}
  .trmB{height:340px}.glC{padding:44px}
  .capRow{gap:20px;padding:24px 28px}.capTi{font-size:18px}.capBd{font-size:15px}
}
@media(min-width:1100px){.heroTi{font-size:clamp(64px,7vw,84px)}}
`;
