"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useCallback, type ReactNode } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  ArrowRight, Bell, FileText, Package, Users, Building2, Pill,
  Copy, Check, Share2, CheckCircle2, Clock, RefreshCw,
} from "lucide-react";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');`;

const c = {
  bg: "#F8F6F1", card: "#FFFFFF", dark: "#08090C",
  text: "#111214", sub: "#4A4F5C", muted: "#888E9C",
  accent: "#2563EB", accentSoft: "#ECF2FF",
  border: "#E3DDD2", borderDk: "#1E2130",
  green: "#22C55E", greenSoft: "#ECFDF3", greenDk: "#15803D",
  warm: "#C9956B", warmSoft: "#FFF8F0", red: "#EF4444",
};

type Role = "patient" | "provider" | "pharmacy";

/* ─── FadeIn ─── */
function FI({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const v = useInView(ref, { once: true, amount: 0.05 });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 16 }} animate={v ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

function Chk({ dark = false }: { dark?: boolean }) {
  return <span className={`chk${dark ? " chkD" : ""}`}>&#10003;</span>;
}

function Soon() { return <span className="soon">Coming soon</span>; }

/* ══════════════════════════════════════════════════════════════
   HOME SCENE — adult helping aged parent at home
   ══════════════════════════════════════════════════════════════ */
function HomeScene() {
  const [step, setStep] = useState(0);
  // steps: 0=idle, 1=notification arrives, 2=child shows phone to parent, 3=parent sees it, 4=confirmed
  useEffect(() => {
    const timings = [2200, 1800, 1800, 2000, 2400];
    let idx = 0;
    function next() {
      idx = (idx + 1) % 5;
      setStep(idx);
      setTimeout(next, timings[idx]);
    }
    const t = setTimeout(next, timings[0]);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="sceneWrap">
      <svg viewBox="0 0 480 300" className="sceneSvg" xmlns="http://www.w3.org/2000/svg">
        {/* ── Room background ── */}
        <rect x="0" y="0" width="480" height="300" fill="#FAF7F2" rx="20" />
        {/* Wall */}
        <rect x="0" y="0" width="480" height="195" fill="#F2EDE4" rx="20" />
        {/* Skirting */}
        <rect x="0" y="188" width="480" height="7" fill="#E8E0D5" />
        {/* Floor */}
        <rect x="0" y="195" width="480" height="105" fill="#EDE8DF" rx="0" />
        {/* Floor lines */}
        {[210, 240, 270].map(y => <line key={y} x1="0" y1={y} x2="480" y2={y} stroke="#E3DDD2" strokeWidth="0.6" />)}
        {[80, 160, 240, 320, 400].map(x => <line key={x} x1={x} y1="195" x2={x} y2="300" stroke="#E3DDD2" strokeWidth="0.6" />)}

        {/* ── Window ── */}
        <rect x="170" y="18" width="140" height="110" rx="6" fill="#D8EDF5" stroke="#C8D8E5" strokeWidth="1.5" />
        <line x1="240" y1="18" x2="240" y2="128" stroke="#C8D8E5" strokeWidth="1" />
        <line x1="170" y1="73" x2="310" y2="73" stroke="#C8D8E5" strokeWidth="1" />
        {/* Window glow */}
        <rect x="171" y="19" width="138" height="108" rx="5" fill="url(#winGlow)" />
        <defs>
          <linearGradient id="winGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8F4FC" />
            <stop offset="100%" stopColor="#C8E8F8" />
          </linearGradient>
        </defs>
        {/* Curtains */}
        <path d="M170,18 Q158,60 163,128 L170,128 Z" fill="#D4CCBC" opacity="0.6" />
        <path d="M310,18 Q322,60 317,128 L310,128 Z" fill="#D4CCBC" opacity="0.6" />
        {/* Outdoor hint — sun */}
        <circle cx="220" cy="50" r="14" fill="#F5D78A" opacity="0.5" />
        {/* Cloud */}
        <ellipse cx="270" cy="42" rx="18" ry="9" fill="#fff" opacity="0.6" />
        <ellipse cx="284" cy="38" rx="12" ry="8" fill="#fff" opacity="0.6" />

        {/* ── Painting on wall ── */}
        <rect x="36" y="28" width="72" height="54" rx="3" fill="#E8E0D0" stroke="#D8D0C0" strokeWidth="1.2" />
        <ellipse cx="72" cy="55" rx="18" ry="14" fill="#C4B898" opacity="0.6" />
        <path d="M54,68 Q72,44 90,68" fill="#B8C8A8" opacity="0.5" />

        {/* ── Side table (left) with meds ── */}
        <rect x="28" y="175" width="70" height="8" rx="3" fill="#C4B090" />
        <rect x="38" y="183" width="8" height="17" rx="2" fill="#B8A880" />
        <rect x="52" y="183" width="8" height="17" rx="2" fill="#B8A880" />
        {/* Medication bottles */}
        <rect x="32" y="158" width="14" height="18" rx="3" fill="#C9956B" opacity="0.85" />
        <rect x="33" y="155" width="12" height="5" rx="1.5" fill="#B8844A" opacity="0.85" />
        <rect x="50" y="160" width="12" height="16" rx="3" fill="#7EA8D4" opacity="0.85" />
        <rect x="51" y="157" width="10" height="5" rx="1.5" fill="#5E88B4" opacity="0.85" />
        <rect x="66" y="163" width="10" height="13" rx="2.5" fill="#A8C890" opacity="0.85" />
        {/* label lines */}
        <rect x="34" y="163" width="10" height="1.5" rx="1" fill="rgba(255,255,255,0.5)" />
        <rect x="34" y="166" width="8" height="1.5" rx="1" fill="rgba(255,255,255,0.5)" />

        {/* ── Armchair (right — elderly parent) ── */}
        {/* Chair body */}
        <rect x="300" y="162" width="120" height="38" rx="10" fill="#C9B898" />
        {/* Seat cushion */}
        <rect x="308" y="168" width="104" height="28" rx="7" fill="#D4C4A8" />
        {/* Backrest */}
        <rect x="300" y="130" width="120" height="36" rx="10" fill="#C9B898" />
        <rect x="308" y="135" width="104" height="28" rx="6" fill="#D4C4A8" />
        {/* Armrests */}
        <rect x="296" y="148" width="18" height="38" rx="6" fill="#BEA888" />
        <rect x="406" y="148" width="18" height="38" rx="6" fill="#BEA888" />
        {/* Chair legs */}
        <rect x="308" y="196" width="8" height="14" rx="3" fill="#A89070" />
        <rect x="404" y="196" width="8" height="14" rx="3" fill="#A89070" />

        {/* ── Elderly parent figure ── */}
        {/* Body */}
        <rect x="334" y="148" width="52" height="42" rx="12" fill="#E8D8C4" />
        {/* Cardigan */}
        <rect x="334" y="158" width="52" height="32" rx="10" fill="#B8A888" opacity="0.7" />
        {/* Head */}
        <circle cx="360" cy="135" r="20" fill="#E8D4B8" />
        {/* White hair */}
        <path d="M340,130 Q342,112 360,112 Q378,112 380,130" fill="#E8E4DC" />
        <path d="M340,128 Q338,120 344,116" stroke="#D8D4CC" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M380,128 Q382,120 376,116" stroke="#D8D4CC" strokeWidth="3" strokeLinecap="round" fill="none" />
        {/* Glasses */}
        <circle cx="353" cy="135" r="6" fill="none" stroke="#8A7A6A" strokeWidth="1.2" />
        <circle cx="367" cy="135" r="6" fill="none" stroke="#8A7A6A" strokeWidth="1.2" />
        <line x1="359" y1="135" x2="361" y2="135" stroke="#8A7A6A" strokeWidth="1" />
        <line x1="347" y1="135" x2="343" y2="134" stroke="#8A7A6A" strokeWidth="1" />
        <line x1="373" y1="135" x2="377" y2="134" stroke="#8A7A6A" strokeWidth="1" />
        {/* Eyes */}
        <circle cx="353" cy="135" r="2.5" fill="#5A4A3A" />
        <circle cx="367" cy="135" r="2.5" fill="#5A4A3A" />
        {/* Mouth — neutral → smile at step 3+ */}
        {step >= 3
          ? <path d="M354,143 Q360,149 366,143" stroke="#8A6A5A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          : <line x1="355" y1="143" x2="365" y2="143" stroke="#8A6A5A" strokeWidth="1.5" strokeLinecap="round" />
        }
        {/* Arms of parent */}
        <path d="M334,168 Q322,172 318,182" stroke="#E8D4B8" strokeWidth="12" strokeLinecap="round" fill="none" />
        <path d="M386,168 Q398,172 402,180" stroke="#E8D4B8" strokeWidth="12" strokeLinecap="round" fill="none" />

        {/* ── Sofa (left — adult child) ── */}
        <rect x="50" y="165" width="180" height="35" rx="10" fill="#A8B8C8" />
        <rect x="58" y="171" width="164" height="26" rx="7" fill="#B8C8D8" />
        <rect x="50" y="140" width="180" height="30" rx="10" fill="#A8B8C8" />
        <rect x="58" y="145" width="164" height="24" rx="6" fill="#B8C8D8" />
        {/* Sofa arms */}
        <rect x="46" y="150" width="16" height="36" rx="6" fill="#98A8B8" />
        <rect x="218" y="150" width="16" height="36" rx="6" fill="#98A8B8" />
        {/* Sofa legs */}
        <rect x="60" y="196" width="8" height="14" rx="3" fill="#7A8898" />
        <rect x="212" y="196" width="8" height="14" rx="3" fill="#7A8898" />

        {/* ── Adult child figure (sitting on sofa) ── */}
        {/* Body */}
        <rect x="102" y="143" width="56" height="44" rx="12" fill="#7A9CB8" />
        {/* Head */}
        <circle cx="130" cy="126" r="22" fill="#E8C8A8" />
        {/* Hair (dark) */}
        <path d="M108,120 Q110,100 130,98 Q150,100 152,120" fill="#3A3028" />
        {/* Eyes */}
        <circle cx="123" cy="125" r="2.5" fill="#2A2018" />
        <circle cx="137" cy="125" r="2.5" fill="#2A2018" />
        {/* Mouth */}
        <path d="M124,133 Q130,138 136,133" stroke="#8A6A5A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        {/* Left arm holding phone */}
        <path d="M102,157 Q88,162 82,172" stroke="#E8C8A8" strokeWidth="12" strokeLinecap="round" fill="none" />
        {/* Right arm */}
        <path d="M158,157 Q172,165 176,172" stroke="#E8C8A8" strokeWidth="12" strokeLinecap="round" fill="none" />

        {/* ── Phone in child's hand ── */}
        {/* Phone tilts toward parent at step 2+ */}
        <motion.g
          animate={{ rotate: step >= 2 ? 18 : 0, x: step >= 2 ? 30 : 0, y: step >= 2 ? -8 : 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "82px 172px" }}
        >
          <rect x="68" y="163" width="28" height="48" rx="5" fill="#1A1A1E" />
          <rect x="70" y="166" width="24" height="42" rx="3.5" fill="#F8F6F2" />
          {/* Notch */}
          <rect x="78" y="165" width="12" height="3" rx="1.5" fill="#111" />
          {/* Phone screen content — changes with steps */}
          <rect x="72" y="170" width="20" height="3" rx="1.5" fill={step === 0 ? "#D8D4CC" : "#ECF2FF"} />
          <rect x="72" y="175" width="14" height="2.5" rx="1" fill={step === 0 ? "#E4E0D8" : "#BDD0F8"} />
          <rect x="72" y="179" width="16" height="2.5" rx="1" fill={step === 0 ? "#E4E0D8" : "#BDD0F8"} />
          {/* Notification dot on phone */}
          {step >= 1 && (
            <motion.circle cx="91" cy="168" r="4" fill="#EF4444"
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }} />
          )}
          {/* Laura icon on screen */}
          {step >= 1 && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <circle cx="82" cy="185" r="5" fill="#C9956B" opacity="0.9" />
              <rect x="76" y="192" width="12" height="9" rx="2" fill="#ECF2FF" />
              <rect x="77" y="193.5" width="10" height="1.5" rx="0.75" fill="#2563EB" opacity="0.8" />
              <rect x="77" y="196" width="7" height="1.5" rx="0.75" fill="#2563EB" opacity="0.5" />
            </motion.g>
          )}
        </motion.g>

        {/* ── Floating notification bubble ── */}
        <AnimatePresence>
          {step === 1 && (
            <motion.g
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <rect x="96" y="82" width="148" height="54" rx="12" fill="#fff" filter="url(#notifShadow)" />
              <rect x="96" y="82" width="148" height="54" rx="12" fill="none" stroke="#E3DDD2" strokeWidth="1" />
              {/* Laura avatar in notif */}
              <circle cx="115" cy="97" r="8" fill="#C9956B" opacity="0.9" />
              <circle cx="115" cy="94" r="3.5" fill="#E8D4B8" />
              <path d="M109,100 Q115,104 121,100" stroke="#E8D4B8" strokeWidth="2" fill="none" strokeLinecap="round" />
              {/* Text */}
              <rect x="128" y="91" width="56" height="4" rx="2" fill="#111214" />
              <rect x="128" y="97" width="72" height="3.5" rx="1.75" fill="#888E9C" />
              <rect x="128" y="102" width="60" height="3.5" rx="1.75" fill="#888E9C" />
              {/* Badge */}
              <rect x="128" y="116" width="48" height="14" rx="7" fill="#FFF8F0" stroke="rgba(201,149,107,0.2)" strokeWidth="1" />
              <rect x="134" y="121" width="36" height="3" rx="1.5" fill="#C9956B" />
              <defs>
                <filter id="notifShadow" x="-10%" y="-10%" width="120%" height="140%">
                  <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="rgba(0,0,0,0.08)" />
                </filter>
              </defs>
            </motion.g>
          )}
        </AnimatePresence>

        {/* ── Speech / shown screen bubble from child to parent ── */}
        <AnimatePresence>
          {step >= 2 && step <= 3 && (
            <motion.g
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <rect x="220" y="96" width="140" height="62" rx="12" fill="#ECF2FF" stroke="rgba(37,99,235,0.15)" strokeWidth="1" />
              {/* Tail toward parent */}
              <path d="M310,158 L322,168 L330,158" fill="#ECF2FF" />
              <rect x="232" y="107" width="80" height="4" rx="2" fill="#1E40AF" opacity="0.8" />
              <rect x="232" y="113" width="112" height="3.5" rx="1.75" fill="#3B82F6" opacity="0.6" />
              <rect x="232" y="119" width="96" height="3.5" rx="1.75" fill="#3B82F6" opacity="0.6" />
              {/* Med name highlight */}
              <rect x="232" y="128" width="116" height="18" rx="6" fill="rgba(37,99,235,0.06)" stroke="rgba(37,99,235,0.1)" strokeWidth="1" />
              <rect x="240" y="133" width="10" height="8" rx="2" fill="#C9956B" opacity="0.8" />
              <rect x="254" y="134" width="68" height="3.5" rx="1.75" fill="#C9956B" opacity="0.7" />
              <rect x="254" y="139" width="48" height="3" rx="1.5" fill="#888E9C" opacity="0.7" />
            </motion.g>
          )}
        </AnimatePresence>

        {/* ── Confirmed checkmark ── */}
        <AnimatePresence>
          {step === 4 && (
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <circle cx="360" cy="90" r="22" fill="#ECFDF3" stroke="rgba(34,197,94,0.25)" strokeWidth="1.5" />
              <motion.path
                d="M349,90 L357,98 L371,82"
                stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              />
              <rect x="258" y="78" width="84" height="24" rx="8" fill="#fff" stroke="#E3DDD2" strokeWidth="1" />
              <rect x="266" y="85" width="68" height="3.5" rx="1.75" fill="#15803D" opacity="0.8" />
              <rect x="266" y="91" width="50" height="3" rx="1.5" fill="#888E9C" opacity="0.7" />
            </motion.g>
          )}
        </AnimatePresence>

        {/* ── Small rug ── */}
        <ellipse cx="240" cy="225" rx="130" ry="26" fill="#D4C8B4" opacity="0.4" />
        <ellipse cx="240" cy="225" rx="116" ry="20" fill="none" stroke="#C8BC A8" strokeWidth="1" opacity="0.4" />
      </svg>

      {/* Step caption */}
      <div className="sceneCap">
        <AnimatePresence mode="wait">
          <motion.span key={step}
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3 }}>
            {["Laura monitors supply levels quietly in the background.",
              "A reminder arrives before the medication runs out.",
              "The request is ready — no phone calls needed.",
              "Parent and child both see what is happening.",
              "Request confirmed. Prescription on its way."][step]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   CARE HOME SCENE — staff tracking meds for multiple residents
   ══════════════════════════════════════════════════════════════ */
function CareHomeScene() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick(p => p + 1), 2600);
    return () => clearInterval(t);
  }, []);

  const residents = [
    { name: "Evelyn", x: 90, col: "#C9956B", statuses: ["3 days left", "Request sent", "GP approved", "Ready ✓"], medCol: ["#FFFBEB","#FFF8F0","#ECF2FF","#ECFDF3"], textCol: ["#D97706","#C9956B","#2563EB","#15803D"] },
    { name: "Bernard", x: 240, col: "#7EA8D4", statuses: ["5 days left", "Draft ready", "Submitted", "In review"], medCol: ["#ECFDF3","#FFF8F0","#FFF8F0","#ECF2FF"], textCol: ["#15803D","#C9956B","#C9956B","#2563EB"] },
    { name: "Irene", x: 390, col: "#A8C890", statuses: ["7 days left", "7 days left", "Request sent", "Ready ✓"], medCol: ["#ECFDF3","#ECFDF3","#FFF8F0","#ECFDF3"], textCol: ["#15803D","#15803D","#C9956B","#15803D"] },
  ];

  return (
    <div className="sceneWrap">
      <svg viewBox="0 0 480 300" className="sceneSvg" xmlns="http://www.w3.org/2000/svg">
        {/* ── Room ── */}
        <rect x="0" y="0" width="480" height="300" fill="#FAF7F2" rx="20" />
        <rect x="0" y="0" width="480" height="185" fill="#F0EBE2" rx="20" />
        <rect x="0" y="178" width="480" height="7" fill="#E4DDD4" />
        <rect x="0" y="185" width="480" height="115" fill="#EDE8DF" />
        {[200, 230, 260].map(y => <line key={y} x1="0" y1={y} x2="480" y2={y} stroke="#E3DDD2" strokeWidth="0.5" />)}

        {/* Notice board */}
        <rect x="14" y="18" width="88" height="68" rx="4" fill="#E8D8B8" stroke="#D4C4A4" strokeWidth="1" />
        <rect x="20" y="24" width="76" height="10" rx="2" fill="#C9956B" opacity="0.6" />
        <rect x="22" y="38" width="40" height="3" rx="1.5" fill="#A89070" opacity="0.7" />
        <rect x="22" y="44" width="56" height="3" rx="1.5" fill="#A89070" opacity="0.5" />
        <rect x="22" y="50" width="48" height="3" rx="1.5" fill="#A89070" opacity="0.5" />
        <rect x="22" y="56" width="52" height="3" rx="1.5" fill="#A89070" opacity="0.5" />
        <rect x="22" y="62" width="36" height="3" rx="1.5" fill="#A89070" opacity="0.5" />
        <circle cx="58" cy="19" r="3" fill="#A89070" opacity="0.6" />

        {/* Window */}
        <rect x="380" y="14" width="88" height="72" rx="6" fill="#D8EDF5" stroke="#C8D8E5" strokeWidth="1.2" />
        <line x1="424" y1="14" x2="424" y2="86" stroke="#C8D8E5" strokeWidth="0.8" />
        <line x1="380" y1="50" x2="468" y2="50" stroke="#C8D8E5" strokeWidth="0.8" />
        <circle cx="400" cy="34" r="9" fill="#F5D78A" opacity="0.5" />

        {/* ── Long table ── */}
        <rect x="40" y="185" width="400" height="10" rx="4" fill="#BEB098" />
        <rect x="50" y="195" width="14" height="30" rx="3" fill="#A89878" />
        <rect x="416" y="195" width="14" height="30" rx="3" fill="#A89878" />

        {/* ── Chairs behind table ── */}
        {[78, 228, 378].map((x, i) => (
          <g key={i}>
            <rect x={x} y="152" width="44" height="32" rx="8" fill="#C4B8A4" />
            <rect x={x + 4} y="157" width="36" height="24" rx="5" fill="#D4C8B4" />
          </g>
        ))}

        {/* ── Resident figures at table ── */}
        {residents.map((r, i) => {
          const bx = [78, 228, 378][i];
          return (
            <g key={r.name}>
              {/* Body */}
              <rect x={bx + 4} y="157" width="36" height="28" rx="8" fill={[`#D4C4B0`, `#B8C8D8`, `#C4D4B8`][i]} />
              {/* Head */}
              <circle cx={bx + 22} cy="144" r="16" fill={[`#E8C8A8`, `#D4B898`, `#E0CAAC`][i]} />
              {/* Hair */}
              {i === 0 && <path d={`M${bx+6},138 Q${bx+8},125 ${bx+22},124 Q${bx+36},125 ${bx+38},138`} fill="#E8E4DC" />}
              {i === 1 && <path d={`M${bx+8},136 Q${bx+10},126 ${bx+22},125 Q${bx+34},126 ${bx+36},136`} fill="#3A3028" />}
              {i === 2 && <path d={`M${bx+7},137 Q${bx+9},126 ${bx+22},125 Q${bx+35},126 ${bx+37},137`} fill="#7A6858" />}
              {/* Glasses for resident 0 */}
              {i === 0 && <>
                <circle cx={bx + 17} cy="145" r="4.5" fill="none" stroke="#8A7A6A" strokeWidth="0.9" />
                <circle cx={bx + 27} cy="145" r="4.5" fill="none" stroke="#8A7A6A" strokeWidth="0.9" />
                <line x1={bx + 21.5} y1="145" x2={bx + 22.5} y2="145" stroke="#8A7A6A" strokeWidth="0.8" />
              </>}
              {/* Eyes */}
              <circle cx={bx + 17} cy="145" r="1.8" fill="#2A2018" />
              <circle cx={bx + 27} cy="145" r="1.8" fill="#2A2018" />
              {/* Mouth — smiles */}
              <path d={`M${bx+16},151 Q${bx+22},155 ${bx+28},151`} stroke="#8A6A5A" strokeWidth="1.2" strokeLinecap="round" fill="none" />
              {/* Arms on table */}
              <path d={`M${bx+8},170 Q${bx+4},180 ${bx+8},185`} stroke={[`#E8C8A8`,`#D4B898`,`#E0CAAC`][i]} strokeWidth="9" strokeLinecap="round" fill="none" />
              <path d={`M${bx+36},170 Q${bx+40},180 ${bx+36},185`} stroke={[`#E8C8A8`,`#D4B898`,`#E0CAAC`][i]} strokeWidth="9" strokeLinecap="round" fill="none" />
              {/* Mug on table */}
              <rect x={bx + 14} y="182" width="16" height="12" rx="3" fill={[`#F0C890`,`#90B8D0`,`#A8C890`][i]} opacity="0.6" />
              <path d={`M${bx+30},184 Q${bx+34},188 ${bx+30},192`} stroke={[`#E0B870`,`#7A9EC0`,`#90B870`][i]} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
            </g>
          );
        })}

        {/* ── Staff member (right side, standing with tablet) ── */}
        {/* Body */}
        <rect x="424" y="168" width="38" height="36" rx="10" fill="#8888B8" />
        {/* ID badge */}
        <rect x="432" y="175" width="12" height="16" rx="2" fill="#fff" opacity="0.8" />
        <rect x="433" y="177" width="10" height="2" rx="1" fill="#8888B8" opacity="0.6" />
        {/* Head */}
        <circle cx="443" cy="154" r="17" fill="#DDB898" />
        {/* Hair */}
        <path d="M426,148 Q428,135 443,133 Q458,135 460,148" fill="#2A3048" />
        {/* Eyes */}
        <circle cx="437" cy="154" r="2" fill="#2A2018" />
        <circle cx="449" cy="154" r="2" fill="#2A2018" />
        <path d="M438,161 Q443,165 448,161" stroke="#8A6A5A" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        {/* Arms holding tablet */}
        <path d="M424,178 Q414,188 412,196" stroke="#DDB898" strokeWidth="10" strokeLinecap="round" fill="none" />
        <path d="M462,178 Q466,184 462,196" stroke="#DDB898" strokeWidth="10" strokeLinecap="round" fill="none" />
        {/* Tablet */}
        <rect x="408" y="192" width="52" height="36" rx="5" fill="#1A1A1E" />
        <rect x="410" y="194" width="48" height="32" rx="3.5" fill="#F0EDF8" />
        {/* Tablet screen content — updates with tick */}
        <rect x="414" y="198" width="28" height="3" rx="1.5" fill="#2563EB" opacity="0.8" />
        {residents.map((r, i) => {
          const si = tick % r.statuses.length;
          return (
            <motion.g key={r.name}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.3 }}>
              <rect x="414" y={204 + i * 7} width="5" height="5" rx="1" fill={r.col} opacity="0.8" />
              <rect x="421" y={205 + i * 7} width="28" height="3" rx="1.5" fill="#888E9C" opacity="0.7" />
            </motion.g>
          );
        })}

        {/* ── Floating status cards above each resident ── */}
        {residents.map((r, i) => {
          const si = tick % r.statuses.length;
          const bx = [78, 228, 378][i];
          return (
            <motion.g key={`card-${r.name}`}
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}>
              <AnimatePresence mode="wait">
                <motion.g key={`${r.name}-${si}`}
                  initial={{ opacity: 0, y: 6, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
                  {/* Card bg */}
                  <rect x={bx - 14} y="50" width="72" height="56" rx="10" fill="#fff"
                    style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.07))" }} />
                  <rect x={bx - 14} y="50" width="72" height="56" rx="10" fill="none" stroke="#E3DDD2" strokeWidth="0.8" />
                  {/* Connector line */}
                  <line x1={bx + 22} y1="106" x2={bx + 22} y2="127" stroke="#D4CCC0" strokeWidth="1" strokeDasharray="3 2" />
                  {/* Icon */}
                  <circle cx={bx - 2} cy="64" r="7" fill={r.medCol[si]} />
                  <rect x={bx - 5.5} y="61" width="7" height="6" rx="1.5"
                    fill={r.textCol[si]} opacity="0.7" />
                  {/* Name */}
                  <rect x={bx + 8} y="61" width="36" height="3.5" rx="1.75" fill="#111214" opacity="0.7" />
                  {/* Medication line */}
                  <rect x={bx - 10} y="72" width="60" height="3" rx="1.5" fill="#888E9C" opacity="0.6" />
                  {/* Status badge */}
                  <rect x={bx - 10} y="79" width="62" height="20" rx="6" fill={r.medCol[si]}
                    stroke={r.textCol[si].replace(")", ", 0.2)").replace("rgb", "rgba")} strokeWidth="0.8" />
                  <rect x={bx - 4} y="86" width="42" height="3.5" rx="1.75" fill={r.textCol[si]} opacity="0.8" />
                </motion.g>
              </AnimatePresence>
            </motion.g>
          );
        })}

        {/* ── Laura app overlay on table ── */}
        <rect x="196" y="186" width="88" height="52" rx="8" fill="#fff" stroke="#E3DDD2" strokeWidth="1" opacity="0.9" />
        <rect x="200" y="191" width="40" height="4" rx="2" fill="#2563EB" opacity="0.7" />
        <rect x="200" y="197" width="78" height="3" rx="1.5" fill="#888E9C" opacity="0.5" />
        <rect x="200" y="203" width="62" height="3" rx="1.5" fill="#888E9C" opacity="0.5" />
        {/* Mini progress bar */}
        <rect x="200" y="211" width="76" height="6" rx="3" fill="#F2EDE4" />
        <motion.rect x="200" y="211" height="6" rx="3" fill="#22C55E"
          animate={{ width: [20, 56, 20] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
        {/* Omela logo mini */}
        <circle cx="267" cy="194" r="4.5" fill="#C9956B" opacity="0.7" />
      </svg>

      <div className="sceneCap">
        <AnimatePresence mode="wait">
          <motion.span key={tick % 4}
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}>
            {["Every resident's medication is tracked in one place.",
              "Drafts prepare automatically before supply runs out.",
              "Staff can see status across all residents at a glance.",
              "No more chasing, calling, or switching systems."][tick % 4]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Phone Mockup ─── */
function PhoneMockup() {
  const cards = [
    { badge: "Reminder", title: "Amlodipine 5mg", body: "3 days left. Laura is getting your next request ready before this becomes urgent.", time: "Mon 9:15am", color: c.warm },
    { badge: "Request prepared", title: "Repeat prescription", body: "A clean request is ready for review before it is sent on.", time: "Mon 9:16am", color: c.accent },
    { badge: "Status update", title: "Sent to practice", body: "Your request has been received. Laura will keep you posted as it moves forward.", time: "Mon 11:02am", color: c.accent },
    { badge: "Ready", title: "Pickup confirmed", body: "Your prescription is ready at Boots, 12 High Street. Open until 6pm.", time: "Wed 2:14pm", color: c.green },
  ];
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % cards.length), 3200);
    return () => clearInterval(t);
  }, [cards.length]);

  return (
    <div className="phW">
      <motion.div className="phGlow" animate={{ opacity: [0.1, 0.22, 0.1] }} transition={{ duration: 6, repeat: Infinity }} />
      <motion.div className="phF" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <div className="phB">
          <div className="phNotch" />
          <div className="phS">
            <div className="phHead">
              <div className="phAv">
                <Image src="/laura-avatar.png" alt="Laura" fill sizes="28px" style={{ objectFit: "cover" }} />
              </div>
              <div>
                <div className="phName">Laura</div>
                <div className="phSub">Prescription coordination</div>
              </div>
            </div>
            <div className="phBody">
              <AnimatePresence mode="wait">
                {cards.map((card, i) => i === active && (
                  <motion.div key={i} className="phCard"
                    initial={{ opacity: 0, y: 10, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
                    <div className="phCardBadge" style={{ background: `${card.color}12`, color: card.color, borderColor: `${card.color}20` }}>{card.badge}</div>
                    <h4 className="phCardTitle">{card.title}</h4>
                    <p className="phCardBody">{card.body}</p>
                    <span className="phCardTime">{card.time}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div className="phDots">
                {cards.map((_, i) => <span key={i} className={`phDot${i === active ? " phDotA" : ""}`} />)}
              </div>
            </div>
            <div className="phFoot">Less chasing. More clarity.</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Cityscape ─── */
function Cityscape() {
  return (
    <div className="cityW">
      <svg viewBox="0 0 800 120" className="citySvg" preserveAspectRatio="xMidYMax slice">
        <rect x="0" y="100" width="800" height="20" fill="#E8E0D4" rx="2" />
        <line x1="0" y1="100" x2="800" y2="100" stroke="#D4CCC0" strokeWidth="0.5" />
        <g opacity="0.4">
          <rect x="40" y="60" width="36" height="40" rx="2" fill="#C9B99A" /><rect x="48" y="70" width="8" height="10" rx="1" fill="#B8A888" /><polygon points="38,60 76,60 58,44" fill="#BBA98A" />
          <rect x="100" y="55" width="28" height="45" rx="2" fill="#CBBFA0" /><rect x="106" y="62" width="6" height="8" rx="1" fill="#B8A888" /><polygon points="98,55 128,55 114,42" fill="#BBA98A" />
          <rect x="620" y="58" width="34" height="42" rx="2" fill="#C9B99A" /><rect x="628" y="66" width="7" height="9" rx="1" fill="#B8A888" /><polygon points="618,58 654,58 636,44" fill="#BBA98A" />
          <rect x="700" y="52" width="40" height="48" rx="2" fill="#CBBFA0" /><rect x="710" y="60" width="8" height="10" rx="1" fill="#B8A888" /><polygon points="698,52 740,52 720,38" fill="#BBA98A" />
        </g>
        <g opacity="0.5">
          <rect x="360" y="48" width="80" height="52" rx="3" fill="#D4CCB8" />
          <rect x="370" y="56" width="14" height="16" rx="1.5" fill="#C4BBAA" /><rect x="392" y="56" width="14" height="16" rx="1.5" fill="#C4BBAA" /><rect x="414" y="56" width="14" height="16" rx="1.5" fill="#C4BBAA" />
          <rect x="388" y="80" width="24" height="20" rx="1.5" fill="#C4BBAA" />
          <text x="400" y="45" textAnchor="middle" fontSize="7" fontWeight="700" fill="#A09480" fontFamily="DM Sans,sans-serif">PHARMACY</text>
          <circle cx="400" cy="38" r="4" fill="none" stroke="#A09480" strokeWidth="0.8" />
          <path d="M398,38 L402,38 M400,36 L400,40" stroke="#A09480" strokeWidth="0.8" />
        </g>
        <g opacity="0.3">
          {[160, 220, 540, 580, 680].map(x => <g key={x}><circle cx={x} cy="78" r="12" fill="#B8C4A0" /><rect x={x - 1.5} y="88" width="3" height="12" rx="1" fill="#A09480" /></g>)}
        </g>
        <motion.g animate={{ x: [-100, 900] }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}>
          <rect x="0" y="82" width="44" height="18" rx="3" fill="#C9956B" opacity="0.5" />
          <rect x="4" y="85" width="10" height="8" rx="1" fill="#B8864A" opacity="0.4" /><rect x="18" y="85" width="10" height="8" rx="1" fill="#B8864A" opacity="0.4" />
          <circle cx="10" cy="100" r="3" fill="#A09480" opacity="0.4" /><circle cx="34" cy="100" r="3" fill="#A09480" opacity="0.4" />
        </motion.g>
        <motion.g animate={{ x: [900, -100] }} transition={{ duration: 14, repeat: Infinity, ease: "linear" }}>
          <rect x="0" y="88" width="26" height="12" rx="3" fill="#8E99A8" opacity="0.35" />
          <rect x="3" y="86" width="8" height="6" rx="1.5" fill="#7A8494" opacity="0.3" /><rect x="14" y="86" width="8" height="6" rx="1.5" fill="#7A8494" opacity="0.3" />
          <circle cx="6" cy="100" r="2.5" fill="#A09480" opacity="0.35" /><circle cx="20" cy="100" r="2.5" fill="#A09480" opacity="0.35" />
        </motion.g>
      </svg>
    </div>
  );
}

/* ─── SDK Terminal ─── */
function SDKTerminal() {
  const lines = useMemo(() => [
    '$ npm install @omela/laura-sdk', '',
    '  const laura = new Laura({',
    '    apiKey: process.env.OMELA_KEY,',
    '    region: "eu-west-2"',
    '  });', '',
    '  const refill = await laura.prescription({',
    '    patient: "patient_4102",',
    '    medication: "Amlodipine 5mg",',
    '    action: "prepare-request"',
    '  });', '',
    '  // Request prepared, status: pending',
    '  Done in 0.9s',
  ], []);
  const [vl, setVl] = useState(0);
  const [ci, setCi] = useState(0);
  useEffect(() => {
    if (vl >= lines.length) { const t = setTimeout(() => { setVl(0); setCi(0); }, 3000); return () => clearTimeout(t); }
    const line = lines[vl];
    if (ci < line.length) { const t = setTimeout(() => setCi(p => p + 1), line.startsWith("  //") ? 36 : 18); return () => clearTimeout(t); }
    else { const t = setTimeout(() => { setVl(p => p + 1); setCi(0); }, line === "" ? 50 : 140); return () => clearTimeout(t); }
  }, [vl, ci, lines]);
  return (
    <div className="trm">
      <div className="trmT"><div className="trmD"><span /><span /><span /></div><span className="trmTi">Laura SDK</span><Soon /></div>
      <div className="trmB">{lines.slice(0, vl + 1).map((line, i) => {
        const a = i === vl;
        return <div key={i} className="trmL" style={{ color: line.startsWith("  Done") || line.startsWith("  //") ? "#4ADE80" : line.startsWith("$") ? "#E2E8F0" : "#94A3B8" }}>{a ? line.slice(0, ci) : line}{a && <span className="trmC">|</span>}</div>;
      })}</div>
    </div>
  );
}

/* ─── Logo Marquee ─── */
function LogoMarquee() {
  const logos = [
    { src: "/logos/openai-wordmark.svg", alt: "OpenAI", w: 120, h: 28 },
    { src: "/logos/stripe.svg", alt: "Stripe", w: 72, h: 28 },
    { src: "/logos/twilio.svg", alt: "Twilio", w: 88, h: 28 },
    { src: "/logos/vercel.svg", alt: "Vercel", w: 96, h: 24 },
    { src: "/logos/microsoft-logo.png", alt: "Microsoft", w: 120, h: 26 },
  ];
  const doubled = [...logos, ...logos];
  return (
    <section className="logoSec">
      <div className="container logoHd"><p className="logoLbl">Built on trusted infrastructure</p></div>
      <div className="logoMarqueeW">
        <div className="logoFadeL" /><div className="logoFadeR" />
        <motion.div className="logoTrack" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }}>
          {doubled.map((l, i) => (
            <div key={i} className="logoItem">
              <Image src={l.src} alt={l.alt} width={l.w} height={l.h} unoptimized={l.src.endsWith(".svg")}
                style={{ width: l.w, height: l.h, objectFit: "contain", opacity: l.src.endsWith(".png") ? 0.4 : 0.35, filter: "grayscale(1)" }} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Confetti ─── */
const CONF = Array.from({ length: 18 }, (_, i) => ({ id: i, emoji: ["🎉", "✨", "🎊", "🌟"][i % 4], left: (i * 17) % 100, delay: (i % 6) * 0.08, dur: 1.4 + (i % 5) * 0.12, rot: (i * 43) % 360 }));
function Confetti() {
  return <div className="confW">{CONF.map(p => <motion.span key={p.id} className="confP" initial={{ opacity: 1, y: 0, scale: 0 }} animate={{ opacity: [1, 1, 0], y: -110, scale: [0, 1.1, 0.7], rotate: p.rot }} transition={{ duration: p.dur, delay: p.delay, ease: "easeOut" }} style={{ left: `${p.left}%` }}>{p.emoji}</motion.span>)}</div>;
}

/* ─── Success Modal ─── */
function SuccessModal({ open, onClose, referralCode }: { open: boolean; onClose: () => void; referralCode: string }) {
  const [copied, setCopied] = useState(false);
  const link = typeof window !== "undefined" ? `${window.location.origin}?ref=${referralCode}` : "";
  function copyLink() { navigator.clipboard.writeText(link).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }); }
  async function shareLink() { if (navigator.share) { try { await navigator.share({ title: "Join Omela", text: "Healthcare admin should feel easier. Try Laura.", url: link }); } catch {} } else { copyLink(); } }
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="modO">
          <motion.div initial={{ opacity: 0, y: 18, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10 }} transition={{ type: "spring", damping: 22, stiffness: 300 }} onClick={e => e.stopPropagation()} className="modB">
            <Confetti />
            <motion.div className="modCel" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2, stiffness: 400, damping: 15 }}><span style={{ fontSize: "28px" }}>🎉</span></motion.div>
            <h3 className="serif modTi">You are on the list!</h3>
            <p className="modBd">We will reach out as access opens. Invite 3 friends to move up the waitlist and unlock bonus credits.</p>
            {referralCode && (
              <div className="modRef">
                <p className="modRefLbl">Your referral link</p>
                <div className="modRefBox"><span className="modRefUrl">{link.replace("https://", "").replace("http://", "")}</span><button onClick={copyLink} className="modRefCp" type="button">{copied ? <Check size={13} /> : <Copy size={13} />}</button></div>
                <div className="modRefBts"><button onClick={shareLink} className="btnP modShareBtn" type="button"><Share2 size={12} />Share</button><a href="https://x.com/joinomela" target="_blank" rel="noreferrer" className="btnS modXBtn">Follow @joinomela</a></div>
              </div>
            )}
            <button type="button" className="modClose" onClick={onClose}>Close</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ══════════════════════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════════════════════ */
export default function Page() {
  const [role, setRole] = useState<Role>("patient");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [refParam, setRefParam] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const p = new URLSearchParams(window.location.search);
      const r = p.get("ref");
      if (r) setRefParam(r);
    }
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!agreed) return;
    setSubmitting(true); setSuccess(""); setError("");
    try {
      const res = await fetch("/api/waitlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, role, website, source: "landing-page", marketingOptIn: false, ref: refParam || undefined }) });
      const data = await res.json();
      if (!res.ok) { if (data.referralCode) setReferralCode(data.referralCode); setError(data.error || "Something went wrong."); return; }
      setSuccess(data.message || "You are in.");
      if (data.referralCode) setReferralCode(data.referralCode);
      setEmail(""); setRole("patient"); setWebsite(""); setAgreed(false); setModalOpen(true);
    } catch { setError("Something went wrong."); } finally { setSubmitting(false); }
  }

  return (
    <>
      <style>{FONT}</style>
      <style>{CSS}</style>
      <SuccessModal open={modalOpen} onClose={() => setModalOpen(false)} referralCode={referralCode} />

      <div className="wrap">
        {/* ── NAV ── */}
        <motion.nav initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="nav">
          <div className="container navR">
            <Link href="/" className="navBr">
              <div className="navLo"><Image src="/omela-logo-mark.png" alt="Omela" width={34} height={34} style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
              <span className="navNm">Omela</span>
            </Link>
            <div className="navLks">
              <a href="#how" className="navLk">How it works</a>
              <a href="#who" className="navLk">Who it helps</a>
              <a href="#pricing" className="navLk">Pricing</a>
            </div>
            <a href="#waitlist" className="btnP navCt">Join waitlist <ArrowRight size={13} /></a>
          </div>
        </motion.nav>

        {/* ── HERO ── */}
        <section className="heroSec">
          <div className="container heroGrid">
            <div className="heroTxt">
              <FI delay={0.04}><h1 className="serif heroTi">Stop wondering<br /><span className="heroAc">what is happening.</span></h1></FI>
              <FI delay={0.08}><p className="heroSub">Omela helps people stay on top of repeat prescriptions with reminders, cleaner requests, and clearer updates from request to pickup or delivery.</p></FI>
              <FI delay={0.12}><p className="heroCredLine">For people, carers, and care teams who are tired of chasing repeat prescriptions and unclear updates.</p></FI>
              <FI delay={0.16}><div className="heroBt"><Link href="/demo" className="btnP">See Laura in action <ArrowRight size={14} /></Link><a href="#waitlist" className="btnS">Join waitlist</a></div></FI>
            </div>
            <FI delay={0.1} className="heroPhCol"><PhoneMockup /></FI>
          </div>
          <Cityscape />
        </section>

        {/* ── PROBLEM STRIP ── */}
        <section className="sec secTight">
          <div className="container">
            <FI>
              <div className="problemStrip">
                {[
                  { n: "01", t: "You only remember when you are nearly out." },
                  { n: "02", t: "You are not sure whether the request was received." },
                  { n: "03", t: "You do not know if it is delayed, approved, or ready." },
                ].map(p => (
                  <div className="problemStripItem" key={p.n}>
                    <span className="problemNum">{p.n}</span>
                    <p>{p.t}</p>
                  </div>
                ))}
              </div>
            </FI>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section id="how" className="sec">
          <div className="container">
            <FI><div className="shW"><h2 className="serif shT">Three calm steps.</h2><p className="shB">Laura turns repeat-prescription admin into a workflow you can actually follow.</p></div></FI>
            <div className="proofGrid">
              {[
                { icon: <Bell size={22} />, title: "Know before you run low", body: "Laura reminds you before medication becomes urgent, so you are not relying on memory at the last minute.", tone: "warm" },
                { icon: <FileText size={22} />, title: "Prepare the request clearly", body: "Laura helps organise the next request so the process feels cleaner, easier, and less repetitive.", tone: "blue" },
                { icon: <Package size={22} />, title: "See what is happening", body: "Follow the journey from request to pickup or delivery, with clearer status and fewer unknowns.", tone: "green" },
              ].map((item, i) => (
                <FI key={item.title} delay={i * 0.06}>
                  <div className="proofCard">
                    <motion.div className={`proofIc proofIc--${item.tone}`} animate={{ y: [0, -3, 0] }} transition={{ duration: 3.5 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}>{item.icon}</motion.div>
                    <h3 className="proofTi">{item.title}</h3>
                    <p className="proofBd">{item.body}</p>
                  </div>
                </FI>
              ))}
            </div>
          </div>
        </section>

        {/* ── SCENES SECTION ── */}
        <section className="sec secTinted sceneSec">
          <div className="container">
            <FI>
              <div className="shW">
                <h2 className="serif shT">Built for real moments.</h2>
                <p className="shB">Whether you are helping a parent at home or coordinating across an entire care home, Laura works alongside you.</p>
              </div>
            </FI>

            <div className="scenesGrid">
              <FI delay={0.04}>
                <div className="sceneCard">
                  <div className="sceneCardHead">
                    <div className="sceneCardTag sceneCardTag--warm">
                      <div className="sceneTagDot sceneTagDot--warm" />
              
                    </div>
                    <h3 className="serif sceneCardTitle">Helping a parent manage their medication.</h3>
                    <p className="sceneCardBody">You do not need to remember for them. Laura monitors supply, prepares the request, and keeps you both informed before it ever becomes urgent.</p>
                  </div>
                  <HomeScene />
                </div>
              </FI>

              <FI delay={0.08}>
                <div className="sceneCard">
                  <div className="sceneCardHead">
                    <div className="sceneCardTag sceneCardTag--blue">
                      <div className="sceneTagDot sceneTagDot--blue" />
      
                    </div>
                    <h3 className="serif sceneCardTitle">Tracking prescriptions across every resident.</h3>
                    <p className="sceneCardBody">No spreadsheets. No calling the surgery for updates. Every resident's medication status is visible at a glance, from due-soon to ready to collect.</p>
                  </div>
                  <CareHomeScene />
                </div>
              </FI>
            </div>
          </div>
        </section>

        {/* ── PAIN ── */}
        <section className="sec">
          <div className="container">
            <FI><div className="shW"><h2 className="serif shT">The pain is not the medicine. It is the admin around it.</h2></div></FI>
            <FI>
              <div className="painGrid">
                {[
                  "You remember too late and the whole process becomes urgent.",
                  "You are never fully sure if the request has been received.",
                  "You do not know when it will be ready, so you keep checking.",
                  "You waste time calling, following up, and chasing simple updates.",
                  "Carers and care teams end up doing this across multiple people at once.",
                ].map((item, i) => (
                  <motion.div key={i} className="painItem" initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                    <span className="painNum">{String(i + 1).padStart(2, "0")}</span>
                    <p>{item}</p>
                  </motion.div>
                ))}
              </div>
            </FI>
          </div>
        </section>

        {/* ── WHO IT IS FOR ── */}
        <section id="who" className="sec secTinted">
          <div className="container">
            <FI><div className="shW"><h2 className="serif shT">Built for the people carrying the admin.</h2><p className="shB">The value is not another app. It is less stress, less chasing, and fewer dropped balls.</p></div></FI>
            <div className="audGrid">
              {[
                { icon: <Users size={22} />, title: "People", desc: "For anyone tired of keeping repeat prescriptions in their head and dealing with the same monthly admin.", color: c.accent },
                { icon: <Building2 size={22} />, title: "Care teams", desc: "For supported living, care homes, and residential teams coordinating repeat prescriptions across residents.", color: c.green },
                { icon: <Pill size={22} />, title: "Pharmacies", desc: "For pharmacies that want cleaner incoming requests and better communication over time.", color: c.warm },
              ].map((item, i) => (
                <FI key={item.title} delay={i * 0.06}>
                  <div className="audCard">
                    <div className="audIc" style={{ background: `${item.color}0A`, color: item.color }}>{item.icon}</div>
                    <h3 className="audTi">{item.title}</h3>
                    <p className="audBd">{item.desc}</p>
                  </div>
                </FI>
              ))}
            </div>
          </div>
        </section>

        {/* ── LANGUAGE ── */}
        <section className="sec">
          <div className="container">
            <FI>
              <div className="langCard">
                <div className="langTop">
                  <div className="langOrb">🌍</div>
                  <div><p className="langEyebrow">Language support</p><h2 className="serif langTi">Laura understands 40+ languages.</h2></div>
                </div>
                <p className="langBd">Help should feel familiar. Laura is being designed to support people in the language they are most comfortable with, so updates, letters, and next steps feel easier to follow.</p>
                <div className="langChips">
                  {["🇬🇧 English", "🇫🇷 French", "🇪🇸 Spanish", "🇧🇷 Portuguese", "🇳🇬 Yoruba", "🇸🇦 Arabic", "🇮🇳 Hindi", "🇵🇰 Urdu", "🇨🇳 Mandarin", "🌍 40+ more"].map(l => <span key={l} className="langChip">{l}</span>)}
                </div>
              </div>
            </FI>
          </div>
        </section>

        {/* ── BUILD WITH LAURA ── */}
        <section className="secDk">
          <div className="container">
            <FI><div className="shW"><h2 className="serif shT" style={{ color: "#fff" }}>Build with Laura.</h2><p className="shB" style={{ color: "rgba(255,255,255,0.45)" }}>Embed prescription coordination, status tracking, and calmer admin workflows into your product.</p></div></FI>
            <div className="g2" style={{ marginTop: "28px" }}>
              <FI><SDKTerminal /></FI>
              <FI delay={0.06}>
                <div className="dkC">
                  <h3 className="dkCT">Infrastructure for modern care products</h3>
                  <p className="dkCB">Add Laura to patient portals, pharmacy platforms, or care-team tooling.</p>
                  <div className="ftL">
                    {["Prescription coordination API", "Refill status tracking", "Multi-person workflow support", "Pharmacy integration pathways"].map(f => <div key={f} className="ftR"><Chk dark /><span>{f}</span></div>)}
                  </div>
                </div>
              </FI>
            </div>
          </div>
        </section>

        <LogoMarquee />

        {/* ── PRICING ── */}
        <section id="pricing" className="sec">
          <div className="container">
            <FI><div className="shW"><h2 className="serif shT">Simple plans for people and teams.</h2><p className="shB">Omela is priced around calmer coordination, not confusing usage units.</p></div></FI>
            <div className="prGrid">
              {([
                { name: "Personal", price: "£7.99", period: "/month", desc: "For one person managing repeat prescriptions with calmer reminders, clearer status, and less chasing.", features: ["Refill reminders", "Request preparation", "Status tracking", "Pickup or delivery updates", "Notes and follow-up context"], cta: "Join waitlist", featured: false, badge: "" },
                { name: "Family", price: "£14.99", period: "/month", desc: "For carers and households managing prescriptions for more than one person.", features: ["Everything in Personal", "Multi-person tracking", "Shared admin view", "Due-soon visibility", "Support for household coordination"], cta: "Join waitlist", featured: true, badge: "Best for carers" },
                { name: "Care Teams", price: "Custom", period: "pricing", desc: "For supported living, care homes, and residential teams coordinating repeat-prescription workflows.", features: ["Multi-person refill tracking", "Operational visibility", "Status tracking across requests", "Handover support", "Team workflow coordination"], cta: "Request demo", featured: false, badge: "" },
              ] as { name: string; price: string; period: string; desc: string; features: string[]; cta: string; featured: boolean; badge: string }[]).map((p, i) => (
                <FI key={p.name} delay={i * 0.05}>
                  <div className={`prCard${p.featured ? " prCardDk" : ""}`}>
                    {p.badge && <div className="prBg">{p.badge}</div>}
                    <span className="prNm">{p.name}</span>
                    <div className="prPr"><span className="serif prAmt">{p.price}</span></div>
                    <p className="prPd">{p.period}</p>
                    <p className="prDs">{p.desc}</p>
                    <div className="prFts">{p.features.map(f => <div key={f} className="prFt"><Chk dark={p.featured} /><span>{f}</span></div>)}</div>
                    <a href="#waitlist" className={`btnP prBt${p.featured ? " prBtW" : ""}`}>{p.cta}</a>
                  </div>
                </FI>
              ))}
            </div>
          </div>
        </section>

        {/* ── WAITLIST ── */}
        <section id="waitlist" className="sec secTinted">
          <div className="container">
            <FI>
              <div className="wlC">
                <h2 className="serif wlTi">Join the waitlist.</h2>
                <p className="wlSub">Be first to try Laura as Omela opens repeat-prescription coordination in stages, starting in the UK.</p>
                <form className="wlF" onSubmit={handleSubmit}>
                  <input className="inp" type="email" placeholder="Your email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
                  <select className="inp" value={role} onChange={e => setRole(e.target.value as Role)}>
                    <option value="patient">I manage my own prescriptions</option>
                    <option value="provider">I work in a care team</option>
                    <option value="pharmacy">I work in a pharmacy</option>
                  </select>
                  <input type="text" name="website" value={website} onChange={e => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none", height: 0, width: 0 }} />
                  <button type="submit" className="btnP wlBt" disabled={submitting || !agreed}>{submitting ? "Submitting..." : "Join waitlist"}</button>
                </form>
                <label className="pvL">
                  <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} required className="pvC" />
                  <span>I agree to the <Link href="/privacy" className="pvLk">Privacy Notice</Link> and <Link href="/terms" className="pvLk">Terms</Link>.</span>
                </label>
                {success && <div className="fmOk">{success}</div>}
                {error && <div className="fmEr">{error}</div>}
              </div>
            </FI>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="ft">
          <div className="container ftIn">
            <div className="ftTop">
              <div>
                <Link href="/" className="ftBr">
                  <div className="navLo ftLoW"><Image src="/omela-logo-mark.png" alt="Omela" width={24} height={24} style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
                  <span className="ftBrN">Omela</span>
                </Link>
              </div>
              <div className="ftCols">
                <div className="ftCol"><div className="ftColT">Product</div><Link href="/demo" className="ftLk">Demo</Link><Link href="/how-laura-helps" className="ftLk">Use cases</Link><Link href="/status" className="ftLk">Status</Link></div>
                <div className="ftCol"><div className="ftColT">Legal</div><Link href="/privacy" className="ftLk">Privacy</Link><Link href="/terms" className="ftLk">Terms</Link><a href="mailto:notice@omela.ai" className="ftLk">Contact</a></div>
              </div>
            </div>
            <div className="ftDsc">Laura helps coordinate repeat-prescription admin and next-step guidance. She does not provide diagnosis, treatment, or emergency care. In an emergency, call 999.</div>
            <div className="ftBtm"><p>&copy; 2026 Omela.</p></div>
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
html{scroll-behavior:smooth}html,body{max-width:100%;overflow-x:clip}
body{background:${c.bg};color:${c.text};font-family:'DM Sans',-apple-system,sans-serif;-webkit-font-smoothing:antialiased;font-size:15px}
a{color:inherit;text-decoration:none}button,input,select{font-family:inherit}
::selection{background:${c.accent};color:#fff}
@keyframes blink{0%,50%{opacity:1}50.01%,100%{opacity:0}}

.serif{font-family:'Instrument Serif',Georgia,serif}
.wrap{width:100%;overflow-x:clip}
.container{max-width:1080px;margin:0 auto;padding:0 20px}
.sec{padding:68px 0}.secTight{padding:24px 0 12px}
.secTinted{padding:68px 0;background:linear-gradient(180deg,#F5F1EA,${c.bg})}
.secDk{padding:68px 0;background:${c.dark};color:#fff}

.soon{display:inline-flex;padding:2px 7px;border-radius:5px;background:rgba(37,99,235,0.06);color:${c.accent};font-size:9px;font-weight:700;border:1px solid rgba(37,99,235,0.1)}
.chk{width:18px;height:18px;border-radius:999px;background:${c.greenSoft};color:${c.greenDk};display:inline-flex;align-items:center;justify-content:center;font-size:9px;font-weight:800;flex-shrink:0;margin-top:1px}
.chkD{background:rgba(34,197,94,0.12);color:#4ADE80}

.btnP{display:inline-flex;align-items:center;justify-content:center;gap:6px;background:${c.dark};color:#fff;border:none;border-radius:999px;padding:13px 22px;font-size:14px;font-weight:700;cursor:pointer;transition:all 0.25s;white-space:nowrap;box-shadow:0 3px 10px rgba(0,0,0,0.08)}
.btnP:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 8px 24px rgba(0,0,0,0.13)}
.btnP:disabled{opacity:0.5;cursor:not-allowed}
.btnS{display:inline-flex;align-items:center;justify-content:center;gap:6px;background:rgba(255,255,255,0.88);color:${c.text};border:1px solid ${c.border};border-radius:999px;padding:13px 22px;font-size:14px;font-weight:700;cursor:pointer;transition:all 0.25s;white-space:nowrap}
.btnS:hover{background:#fff;box-shadow:0 4px 14px rgba(0,0,0,0.05)}

.shW{text-align:center;max-width:720px;margin:0 auto}
.shT{font-size:clamp(24px,4.8vw,44px);line-height:1.08;letter-spacing:-0.04em}
.shB{font-size:clamp(14px,2.2vw,16px);line-height:1.76;margin-top:12px;max-width:560px;margin-left:auto;margin-right:auto;color:${c.sub}}

.nav{position:sticky;top:0;z-index:100;background:rgba(248,246,241,0.9);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid rgba(227,221,210,0.45)}
.navR{display:flex;align-items:center;justify-content:space-between;gap:8px;height:58px}
.navBr{display:flex;align-items:center;gap:7px;flex-shrink:0}
.navLo{width:30px;height:30px;border-radius:8px;overflow:hidden;flex-shrink:0;box-shadow:0 1px 4px rgba(0,0,0,0.06)}
.navNm{font-size:15px;font-weight:800;letter-spacing:-0.03em}
.navLks{display:none;align-items:center;gap:22px}
.navLk{font-size:13px;font-weight:600;color:${c.sub};transition:color 0.2s}
.navLk:hover{color:${c.text}}
.navCt{padding:9px 16px!important;font-size:12px!important;flex-shrink:0}

.heroSec{padding:48px 0 0;position:relative;overflow:hidden}
.heroGrid{display:grid;grid-template-columns:1fr;gap:28px;align-items:center}
.heroTxt{max-width:580px}
.heroKicker{display:inline-flex;padding:6px 12px;border-radius:999px;background:rgba(201,149,107,0.08);border:1px solid rgba(201,149,107,0.16);font-size:11px;font-weight:800;letter-spacing:0.06em;text-transform:uppercase;color:${c.warm}}
.heroTi{margin-top:12px;font-size:clamp(36px,8vw,72px);line-height:0.94;letter-spacing:-0.05em}
.heroAc{color:${c.accent};font-style:italic}
.heroSub{margin-top:16px;font-size:clamp(15px,2.2vw,17px);line-height:1.72;color:${c.sub};max-width:540px}
.heroCredLine{margin-top:10px;font-size:13px;line-height:1.65;color:${c.muted};font-weight:700;max-width:560px}
.heroBt{display:flex;flex-wrap:wrap;gap:8px;margin-top:20px}
.heroMiniProof{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}
.heroMiniProof span{display:inline-flex;align-items:center;min-height:34px;padding:0 12px;border-radius:999px;background:rgba(255,255,255,0.72);border:1px solid rgba(227,221,210,0.9);font-size:12px;font-weight:700;color:${c.sub}}
.heroPhCol{display:flex;justify-content:center}

.cityW{width:100%;margin-top:8px;overflow:hidden;opacity:0.7}
.citySvg{width:100%;height:auto;display:block}

.phW{width:100%;max-width:290px;position:relative}
.phGlow{position:absolute;inset:-24px;border-radius:999px;background:radial-gradient(circle,rgba(37,99,235,0.05),transparent 65%);z-index:0}
.phF{position:relative;z-index:1}
.phB{background:#111;border-radius:32px;padding:5px;box-shadow:0 18px 44px rgba(0,0,0,0.14),0 0 0 1px rgba(255,255,255,0.04) inset}
.phNotch{width:80px;height:22px;border-radius:999px;background:#000;margin:0 auto 3px}
.phS{background:#FAFAF8;border-radius:28px;overflow:hidden;min-height:430px;display:flex;flex-direction:column}
.phHead{display:flex;align-items:center;gap:9px;padding:14px 16px 12px;background:rgba(255,255,255,0.9);border-bottom:1px solid rgba(228,221,210,0.6)}
.phAv{position:relative;width:28px;height:28px;border-radius:999px;overflow:hidden;flex-shrink:0;border:1.5px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.06)}
.phName{font-size:13px;font-weight:800;letter-spacing:-0.02em}
.phSub{font-size:10px;color:${c.accent};font-weight:700;margin-top:1px}
.phBody{flex:1;display:flex;flex-direction:column;justify-content:center;padding:16px;gap:10px}
.phCard{padding:18px;border-radius:18px;background:rgba(255,255,255,0.92);border:1px solid rgba(228,221,210,0.7);box-shadow:0 4px 16px rgba(0,0,0,0.03)}
.phCardBadge{display:inline-flex;padding:3px 9px;border-radius:999px;font-size:10px;font-weight:800;border:1px solid}
.phCardTitle{margin-top:10px;font-size:14px;font-weight:800;letter-spacing:-0.02em}
.phCardBody{margin-top:5px;font-size:11.5px;line-height:1.6;color:${c.sub}}
.phCardTime{display:block;margin-top:8px;font-size:10px;color:${c.muted};font-weight:600}
.phDots{display:flex;gap:4px;justify-content:center;margin-top:4px}
.phDot{width:5px;height:5px;border-radius:999px;background:${c.border}}
.phDotA{background:${c.accent};width:14px}
.phFoot{padding:12px 16px;font-size:10px;color:${c.muted};font-weight:700;text-align:center;border-top:1px solid rgba(228,221,210,0.4)}

.problemStrip{display:grid;grid-template-columns:1fr;gap:10px}
.problemStripItem{display:flex;align-items:flex-start;gap:12px;padding:16px 18px;border-radius:18px;background:rgba(255,255,255,0.84);border:1px solid rgba(227,221,210,0.8)}
.problemNum{font-size:11px;font-weight:800;color:${c.muted};width:22px;flex-shrink:0;margin-top:1px}
.problemStripItem p{font-size:14px;line-height:1.62;color:${c.sub}}

.proofGrid{display:grid;grid-template-columns:1fr;gap:14px;margin-top:32px}
.proofCard{padding:26px;border-radius:22px;background:rgba(255,255,255,0.94);border:1px solid ${c.border};box-shadow:0 4px 18px rgba(0,0,0,0.02);transition:all 0.3s}
.proofCard:hover{box-shadow:0 10px 32px rgba(0,0,0,0.05);transform:translateY(-1px)}
.proofIc{width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:14px}
.proofIc--warm{background:${c.warmSoft};color:${c.warm}}
.proofIc--blue{background:${c.accentSoft};color:${c.accent}}
.proofIc--green{background:${c.greenSoft};color:${c.greenDk}}
.proofTi{font-size:17px;font-weight:800;letter-spacing:-0.02em}
.proofBd{margin-top:6px;font-size:13.5px;line-height:1.72;color:${c.sub}}

/* ── SCENES ── */
.sceneSec{}
.scenesGrid{display:grid;grid-template-columns:1fr;gap:20px;margin-top:32px}
.sceneCard{background:rgba(255,255,255,0.94);border:1px solid ${c.border};border-radius:28px;overflow:hidden;box-shadow:0 6px 28px rgba(0,0,0,0.04);transition:box-shadow 0.3s}
.sceneCard:hover{box-shadow:0 12px 44px rgba(0,0,0,0.07)}
.sceneCardHead{padding:28px 28px 20px}
.sceneCardTag{display:inline-flex;align-items:center;gap:7px;font-size:11px;font-weight:800;letter-spacing:.10em;text-transform:uppercase;padding:4px 12px 4px 10px;border-radius:999px;border:1px solid;margin-bottom:14px}
.sceneCardTag--warm{color:${c.warm};background:${c.warmSoft};border-color:rgba(201,149,107,0.2)}
.sceneCardTag--blue{color:${c.accent};background:${c.accentSoft};border-color:rgba(37,99,235,0.15)}
.sceneTagDot{width:6px;height:6px;border-radius:50%}
.sceneTagDot--warm{background:${c.warm}}
.sceneTagDot--blue{background:${c.accent}}
.sceneCardTitle{font-size:clamp(20px,3vw,26px);line-height:1.12;letter-spacing:-0.035em;margin-bottom:10px}
.sceneCardBody{font-size:14px;line-height:1.76;color:${c.sub};max-width:480px}

.sceneWrap{padding:0 16px 24px;position:relative}
.sceneSvg{width:100%;height:auto;display:block;border-radius:16px;overflow:hidden}
.sceneCap{text-align:center;padding:14px 20px 0;min-height:44px;display:flex;align-items:center;justify-content:center}
.sceneCap span{font-size:12.5px;color:${c.muted};font-weight:600;line-height:1.6;text-align:center;max-width:360px}

.painGrid{display:flex;flex-direction:column;gap:10px;max-width:680px;margin:28px auto 0}
.painItem{display:flex;align-items:flex-start;gap:12px;padding:16px 18px;border-radius:16px;background:rgba(255,255,255,0.74);border:1px solid rgba(228,221,210,0.5)}
.painNum{font-size:11px;font-weight:800;color:${c.muted};flex-shrink:0;margin-top:1px;width:20px}
.painItem p{font-size:14px;line-height:1.68;color:${c.sub}}

.audGrid{display:grid;grid-template-columns:1fr;gap:14px;margin-top:32px}
.audCard{padding:26px;border:1px solid ${c.border};border-radius:22px;background:rgba(255,255,255,0.94);transition:all 0.3s}
.audCard:hover{box-shadow:0 8px 24px rgba(0,0,0,0.04)}
.audIc{width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:12px}
.audTi{font-size:17px;font-weight:800;letter-spacing:-0.02em}
.audBd{margin-top:6px;font-size:13.5px;line-height:1.76;color:${c.sub}}

.langCard{max-width:940px;margin:0 auto;padding:32px;border-radius:30px;background:linear-gradient(180deg,rgba(255,255,255,0.97),rgba(255,248,240,0.88));border:1px solid ${c.border};box-shadow:0 10px 34px rgba(0,0,0,0.035)}
.langTop{display:flex;align-items:flex-start;gap:16px}
.langOrb{width:56px;height:56px;border-radius:999px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#FFF8F0,#F4F7FF);border:1px solid rgba(201,149,107,0.16);font-size:24px;flex-shrink:0;box-shadow:0 6px 18px rgba(0,0,0,0.03)}
.langEyebrow{font-size:11px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:${c.warm}}
.langTi{margin-top:6px;font-size:clamp(28px,4.5vw,46px);line-height:1.02;letter-spacing:-0.045em}
.langBd{margin-top:14px;max-width:720px;font-size:15px;line-height:1.8;color:${c.sub}}
.langChips{display:flex;flex-wrap:wrap;gap:10px;margin-top:22px}
.langChip{display:inline-flex;align-items:center;gap:8px;min-height:40px;padding:0 14px;border-radius:999px;background:rgba(255,255,255,0.9);border:1px solid rgba(227,221,210,0.95);color:${c.text};font-size:13px;font-weight:700;box-shadow:0 2px 10px rgba(0,0,0,0.02)}

.g2{display:grid;grid-template-columns:1fr;gap:14px}
.trm{background:#07080B;border:1px solid #1E2130;border-radius:16px;overflow:hidden;height:320px;display:flex;flex-direction:column}
.trmT{display:flex;align-items:center;gap:5px;padding:9px 12px;border-bottom:1px solid #1B1F2B;background:#0E1118;flex-shrink:0}
.trmD{display:flex;gap:4px}.trmD span{width:7px;height:7px;border-radius:999px;display:inline-block}
.trmD span:nth-child(1){background:#FF5F57}.trmD span:nth-child(2){background:#FEBC2E}.trmD span:nth-child(3){background:#28C840}
.trmTi{font-size:9px;color:#5B6270;font-weight:700;flex:1}
.trmB{padding:12px;flex:1;overflow:hidden}
.trmL{white-space:pre-wrap;word-break:break-all;font-size:10px;line-height:1.7;font-family:'SF Mono',ui-monospace,Menlo,monospace}
.trmC{color:#60A5FA;animation:blink 0.8s step-end infinite}
.dkC{background:linear-gradient(180deg,rgba(14,17,24,0.98),rgba(10,13,19,0.98));border:1px solid #1E2130;border-radius:20px;padding:24px}
.dkCT{font-size:clamp(16px,2.8vw,20px);font-weight:800;color:#fff}
.dkCB{margin-top:6px;color:rgba(255,255,255,0.45);font-size:13px;line-height:1.78}
.ftL{display:flex;flex-direction:column;gap:6px;margin-top:12px}
.ftR{display:flex;align-items:flex-start;gap:6px;font-size:12.5px;line-height:1.5;color:rgba(255,255,255,0.6)}

.logoSec{padding:32px 0;border-top:1px solid rgba(228,221,210,0.6);border-bottom:1px solid rgba(228,221,210,0.6);overflow:hidden}
.logoHd{text-align:center;margin-bottom:16px}.logoLbl{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:${c.muted}}
.logoMarqueeW{position:relative;width:100%;overflow:hidden}
.logoFadeL,.logoFadeR{position:absolute;top:0;bottom:0;width:60px;z-index:2;pointer-events:none}
.logoFadeL{left:0;background:linear-gradient(90deg,${c.bg},transparent)}
.logoFadeR{right:0;background:linear-gradient(270deg,${c.bg},transparent)}
.logoTrack{display:flex;width:max-content;gap:52px;align-items:center;padding:4px 0}
.logoItem{flex:0 0 auto;display:flex;align-items:center;justify-content:center}

.prGrid{display:grid;grid-template-columns:1fr;gap:14px;margin-top:32px}
.prCard{background:rgba(255,255,255,0.96);border:1px solid ${c.border};border-radius:22px;padding:28px;position:relative;transition:all 0.3s;display:flex;flex-direction:column}
.prCard:hover{box-shadow:0 10px 32px rgba(0,0,0,0.05)}
.prCardDk{background:linear-gradient(180deg,#111318,#0D0F14)!important;border:1px solid #1E2130!important;color:#fff!important}
.prBg{position:absolute;top:12px;right:12px;border-radius:6px;padding:4px 10px;background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.65);font-size:9px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase}
.prNm{font-size:16px;font-weight:800}.prPr{margin-top:10px}.prAmt{font-size:clamp(22px,4.5vw,34px);letter-spacing:-0.04em}
.prPd{font-size:12px;color:${c.muted};margin-top:3px}.prCardDk .prPd{color:rgba(255,255,255,0.3)}
.prDs{margin-top:10px;font-size:13px;line-height:1.72;color:${c.sub}}.prCardDk .prDs{color:rgba(255,255,255,0.5)}
.prFts{display:flex;flex-direction:column;gap:6px;margin-top:16px;padding-top:16px;border-top:1px solid ${c.border};flex:1}
.prCardDk .prFts{border-top-color:rgba(255,255,255,0.07)}
.prFt{display:flex;align-items:flex-start;gap:6px;font-size:12.5px;line-height:1.5;color:${c.sub}}
.prCardDk .prFt{color:rgba(255,255,255,0.6)}
.prBt{margin-top:18px;width:100%}.prBtW{background:#fff!important;color:${c.dark}!important}

.wlC{background:rgba(255,255,255,0.94);border:1px solid ${c.border};border-radius:24px;padding:28px;max-width:700px;margin:0 auto;box-shadow:0 4px 18px rgba(0,0,0,0.03);text-align:center}
.wlTi{font-size:clamp(24px,4.5vw,38px);letter-spacing:-0.04em}
.wlSub{margin-top:10px;font-size:14px;line-height:1.72;color:${c.sub};max-width:500px;margin-left:auto;margin-right:auto}
.wlF{display:grid;grid-template-columns:1fr;gap:8px;margin-top:16px;position:relative}
.wlBt{height:48px;width:100%}
.inp{width:100%;height:48px;border-radius:12px;border:1px solid ${c.border};background:#fff;padding:0 14px;font-size:14px;color:${c.text};outline:none;transition:all 0.2s}
.inp:focus{border-color:${c.accent};box-shadow:0 0 0 3px rgba(37,99,235,0.05)}
.pvL{display:flex;align-items:flex-start;gap:5px;margin-top:10px;color:${c.sub};font-size:11px;line-height:1.55;cursor:pointer;max-width:430px;margin-left:auto;margin-right:auto}
.pvC{margin-top:1px;width:14px;height:14px;accent-color:${c.accent};flex-shrink:0}
.pvLk{color:${c.text};font-weight:700;text-decoration:underline;text-underline-offset:2px}
.fmOk{margin-top:10px;background:${c.greenSoft};color:${c.greenDk};border-radius:12px;padding:12px;text-align:center;font-size:13px;font-weight:600}
.fmEr{margin-top:10px;background:#FFF7F7;color:#B91C1C;border-radius:12px;padding:12px;text-align:center;font-size:13px;font-weight:600}

.modO{position:fixed;inset:0;z-index:220;background:rgba(9,10,13,0.5);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);display:flex;align-items:center;justify-content:center;padding:14px}
.modB{width:100%;max-width:400px;background:rgba(255,255,255,0.98);border:1px solid ${c.border};border-radius:22px;padding:28px;box-shadow:0 20px 50px rgba(0,0,0,0.16);position:relative;overflow:hidden;text-align:center}
.modCel{width:52px;height:52px;border-radius:999px;background:linear-gradient(135deg,#FFF8F0,#ECFDF3);border:1px solid rgba(34,197,94,0.12);display:flex;align-items:center;justify-content:center;margin:0 auto 14px}
.modTi{font-size:clamp(20px,4.5vw,28px);letter-spacing:-0.04em}
.modBd{margin-top:6px;color:${c.sub};font-size:13px;line-height:1.7}
.modRef{margin-top:18px;padding:14px;border-radius:14px;background:rgba(37,99,235,0.03);border:1px solid rgba(37,99,235,0.07)}
.modRefLbl{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:${c.muted};margin-bottom:6px}
.modRefBox{display:flex;align-items:center;gap:6px;background:#fff;border:1px solid ${c.border};border-radius:8px;padding:6px 8px}
.modRefUrl{flex:1;font-size:11px;color:${c.sub};font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:left}
.modRefCp{width:30px;height:30px;border-radius:7px;background:${c.accentSoft};border:1px solid rgba(37,99,235,0.08);color:${c.accent};display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0}
.modRefBts{display:flex;gap:6px;margin-top:10px}
.modShareBtn{flex:1;padding:8px 12px!important;font-size:12px!important}
.modXBtn{flex:1;padding:8px 12px!important;font-size:12px!important}
.modClose{margin-top:12px;background:none;border:none;color:${c.muted};font-size:11px;font-weight:600;cursor:pointer;padding:3px 6px}
.confW{position:absolute;inset:0;pointer-events:none;overflow:hidden}
.confP{position:absolute;bottom:40%;font-size:14px;pointer-events:none}

.ft{background:${c.dark};padding:34px 0 18px;color:#fff}
.ftTop{display:flex;flex-direction:column;gap:20px}
.ftBr{display:flex;align-items:center;gap:6px;text-decoration:none;color:#fff}
.ftLoW{background:rgba(255,255,255,0.1);border-radius:7px;padding:2px}
.ftBrN{font-size:13px;font-weight:800}
.ftCols{display:flex;gap:32px}.ftCol{display:flex;flex-direction:column;gap:6px}
.ftColT{font-size:9px;font-weight:800;color:rgba(255,255,255,0.25);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:2px}
.ftLk{font-size:12px;color:rgba(255,255,255,0.45);font-weight:500;transition:color 0.2s}.ftLk:hover{color:#fff}
.ftDsc{margin-top:22px;padding:12px 0;border-top:1px solid rgba(255,255,255,0.05);font-size:10px;color:rgba(255,255,255,0.25);line-height:1.65;text-align:center}
.ftBtm{border-top:1px solid rgba(255,255,255,0.05);padding-top:12px;font-size:9px;color:rgba(255,255,255,0.18);text-align:center}

@media(max-width:639px){
  .heroBt{flex-direction:column}.heroBt .btnP,.heroBt .btnS{width:100%;text-align:center}
  .heroSec{padding:32px 0 0}.navR{height:50px}
  .langCard{padding:24px}.langTop{gap:12px}.langOrb{width:48px;height:48px;font-size:20px}
  .langChip{font-size:12px;min-height:36px;padding:0 12px}
}
@media(min-width:640px){
  .container{padding:0 24px}.sec{padding:76px 0}.secTinted{padding:76px 0}.secDk{padding:76px 0}
  .navR{height:62px}.navLks{display:flex}
  .heroGrid{grid-template-columns:1.08fr 0.92fr;gap:36px}.heroPhCol{align-self:start}
  .problemStrip{grid-template-columns:repeat(3,1fr)}
  .proofGrid{grid-template-columns:repeat(3,1fr)}
  .scenesGrid{grid-template-columns:repeat(2,1fr)}
  .audGrid{grid-template-columns:repeat(3,1fr)}
  .prGrid{grid-template-columns:repeat(3,1fr)}
  .g2{grid-template-columns:repeat(2,1fr);gap:16px}
  .wlF{grid-template-columns:1.2fr 0.8fr auto}.wlBt{width:auto}.wlC{padding:32px}
  .ftTop{flex-direction:row;justify-content:space-between}
}
@media(min-width:960px){
  .container{padding:0 32px}.sec{padding:84px 0}.secTinted{padding:84px 0}.secDk{padding:84px 0}
  .navR{height:68px}.heroSec{padding:56px 0 0}
  .phW{max-width:305px}.phS{min-height:460px}
}
@media(min-width:1100px){.heroTi{font-size:clamp(52px,6.5vw,72px)}}
`;
