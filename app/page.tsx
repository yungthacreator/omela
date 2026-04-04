"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Mic,
  ChevronLeft,
  ChevronRight,
  Search,
  FileCheck,
  Languages,
  Users,
  Building2,
  Code2,
  Copy,
  Check,
  Share2,
} from "lucide-react";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');`;

const c = {
  bg: "#F8F6F1",
  dark: "#08090C",
  text: "#111214",
  sub: "#4A4F5C",
  muted: "#888E9C",
  accent: "#2563EB",
  accentSoft: "#ECF2FF",
  border: "#E3DDD2",
  borderDk: "#222633",
  green: "#22C55E",
  greenSoft: "#ECFDF3",
  greenDk: "#15803D",
  warm: "#C9956B",
};

type Role = "patient" | "provider" | "developer";
type FlagCode = "gb" | "fr" | "ng" | "us" | "in" | "br" | "global";
type ProductBadgeKind =
  | "routing"
  | "portal"
  | "message"
  | "language"
  | "telehealth"
  | "success";

function FI({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.05 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Soon() {
  return <span className="soon">Coming soon</span>;
}

function Chk({ dark = false }: { dark?: boolean }) {
  return (
    <motion.span
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 500, damping: 18 }}
      className={`chk${dark ? " chkD" : ""}`}
    >
      &#10003;
    </motion.span>
  );
}

function FlagMark({
  code,
  className = "",
}: {
  code: FlagCode;
  className?: string;
}) {
  if (code === "gb") {
    return (
      <svg viewBox="0 0 24 24" className={`flagMark ${className}`} aria-hidden="true">
        <rect width="24" height="24" rx="12" fill="#1E3A8A" />
        <path d="M3 5L19 21" stroke="#fff" strokeWidth="4" />
        <path d="M21 5L5 21" stroke="#fff" strokeWidth="4" />
        <path d="M3 5L19 21" stroke="#DC2626" strokeWidth="2" />
        <path d="M21 5L5 21" stroke="#DC2626" strokeWidth="2" />
        <path d="M12 2V22" stroke="#fff" strokeWidth="6" />
        <path d="M2 12H22" stroke="#fff" strokeWidth="6" />
        <path d="M12 2V22" stroke="#DC2626" strokeWidth="3" />
        <path d="M2 12H22" stroke="#DC2626" strokeWidth="3" />
      </svg>
    );
  }

  if (code === "fr") {
    return (
      <svg viewBox="0 0 24 24" className={`flagMark ${className}`} aria-hidden="true">
        <rect width="24" height="24" rx="12" fill="#fff" />
        <clipPath id="frClip">
          <rect width="24" height="24" rx="12" />
        </clipPath>
        <g clipPath="url(#frClip)">
          <rect x="0" y="0" width="8" height="24" fill="#2563EB" />
          <rect x="8" y="0" width="8" height="24" fill="#fff" />
          <rect x="16" y="0" width="8" height="24" fill="#DC2626" />
        </g>
      </svg>
    );
  }

  if (code === "ng") {
    return (
      <svg viewBox="0 0 24 24" className={`flagMark ${className}`} aria-hidden="true">
        <rect width="24" height="24" rx="12" fill="#fff" />
        <clipPath id="ngClip">
          <rect width="24" height="24" rx="12" />
        </clipPath>
        <g clipPath="url(#ngClip)">
          <rect x="0" y="0" width="8" height="24" fill="#16A34A" />
          <rect x="8" y="0" width="8" height="24" fill="#fff" />
          <rect x="16" y="0" width="8" height="24" fill="#16A34A" />
        </g>
      </svg>
    );
  }

  if (code === "us") {
    return (
      <svg viewBox="0 0 24 24" className={`flagMark ${className}`} aria-hidden="true">
        <rect width="24" height="24" rx="12" fill="#fff" />
        <clipPath id="usClip">
          <rect width="24" height="24" rx="12" />
        </clipPath>
        <g clipPath="url(#usClip)">
          {Array.from({ length: 7 }).map((_, i) => (
            <rect
              key={i}
              x="0"
              y={i * 3.45}
              width="24"
              height="1.75"
              fill="#DC2626"
            />
          ))}
          <rect x="0" y="0" width="10.5" height="10.2" fill="#1E3A8A" />
          <circle cx="3" cy="3" r="0.75" fill="#fff" />
          <circle cx="6" cy="3" r="0.75" fill="#fff" />
          <circle cx="9" cy="3" r="0.75" fill="#fff" />
          <circle cx="4.5" cy="5.6" r="0.75" fill="#fff" />
          <circle cx="7.5" cy="5.6" r="0.75" fill="#fff" />
          <circle cx="3" cy="8.1" r="0.75" fill="#fff" />
          <circle cx="6" cy="8.1" r="0.75" fill="#fff" />
          <circle cx="9" cy="8.1" r="0.75" fill="#fff" />
        </g>
      </svg>
    );
  }

  if (code === "in") {
    return (
      <svg viewBox="0 0 24 24" className={`flagMark ${className}`} aria-hidden="true">
        <rect width="24" height="24" rx="12" fill="#fff" />
        <clipPath id="inClip">
          <rect width="24" height="24" rx="12" />
        </clipPath>
        <g clipPath="url(#inClip)">
          <rect x="0" y="0" width="24" height="8" fill="#F59E0B" />
          <rect x="0" y="8" width="24" height="8" fill="#fff" />
          <rect x="0" y="16" width="24" height="8" fill="#16A34A" />
          <circle cx="12" cy="12" r="2.3" fill="none" stroke="#2563EB" strokeWidth="1.4" />
        </g>
      </svg>
    );
  }

  if (code === "br") {
    return (
      <svg viewBox="0 0 24 24" className={`flagMark ${className}`} aria-hidden="true">
        <rect width="24" height="24" rx="12" fill="#16A34A" />
        <path d="M12 4L19.5 12L12 20L4.5 12Z" fill="#FACC15" />
        <circle cx="12" cy="12" r="3.6" fill="#2563EB" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={`flagMark ${className}`} aria-hidden="true">
      <rect width="24" height="24" rx="12" fill="#EFF6FF" />
      <circle cx="12" cy="12" r="7" fill="none" stroke="#2563EB" strokeWidth="1.5" />
      <path d="M5 12H19" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M12 5C10 7.2 9 9.6 9 12C9 14.4 10 16.8 12 19" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M12 5C14 7.2 15 9.6 15 12C15 14.4 14 16.8 12 19" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function ProductBadge({
  kind,
  size = "md",
}: {
  kind: ProductBadgeKind;
  size?: "md" | "lg";
}) {
  return (
    <div className={`pBadge pBadge--${kind} pBadge--${size}`}>
      {kind === "routing" && (
        <svg viewBox="0 0 56 56" aria-hidden="true">
          <circle cx="15" cy="17" r="5.5" fill="#E7F2FF" />
          <circle cx="42" cy="14" r="5.5" fill="#FFE7D3" />
          <circle cx="40" cy="40" r="6.5" fill="#EAF8EF" />
          <path
            d="M20.8 17H35"
            stroke="#9AA3B2"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M42 19.6V31.2"
            stroke="#9AA3B2"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M18.6 20.6L35.2 36.7"
            stroke="#2563EB"
            strokeWidth="2.3"
            strokeLinecap="round"
          />
          <path
            d="M34 36.5L33.8 31.5H38.8"
            stroke="#2563EB"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}

      {kind === "portal" && (
        <svg viewBox="0 0 56 56" aria-hidden="true">
          <rect x="9" y="12" width="38" height="30" rx="9" fill="#FFFFFF" />
          <rect x="13" y="16" width="12" height="22" rx="4" fill="#EEF4FF" />
          <rect x="28" y="18" width="14" height="4" rx="2" fill="#E6DFD3" />
          <rect x="28" y="26" width="11" height="4" rx="2" fill="#E6DFD3" />
          <circle cx="40" cy="37" r="7" fill="#ECFDF3" />
          <path
            d="M37.4 37.1L39.4 39.1L43.3 35"
            stroke="#15803D"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}

      {kind === "message" && (
        <svg viewBox="0 0 56 56" aria-hidden="true">
          <rect x="18" y="8" width="20" height="40" rx="8" fill="#FFFFFF" />
          <rect x="23" y="13" width="10" height="2.8" rx="1.4" fill="#D8DCE4" />
          <rect x="22" y="21" width="12" height="8" rx="4" fill="#EAF8EF" />
          <path
            d="M15 22C12.2 22 10 24.1 10 26.8C10 28.7 11.2 30.4 13 31.3V35L16.7 32.8H23"
            fill="#E7F2FF"
          />
          <path
            d="M15 22C12.2 22 10 24.1 10 26.8C10 28.7 11.2 30.4 13 31.3V35L16.7 32.8H23"
            stroke="#2563EB"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}

      {kind === "language" && (
        <svg viewBox="0 0 56 56" aria-hidden="true">
          <circle cx="24" cy="28" r="14" fill="#EAF3FF" />
          <path
            d="M12.5 28H35.5"
            stroke="#2563EB"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M24 14C20.8 17.7 19 22.6 19 28C19 33.4 20.8 38.3 24 42"
            stroke="#2563EB"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M24 14C27.2 17.7 29 22.6 29 28C29 33.4 27.2 38.3 24 42"
            stroke="#2563EB"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <rect x="34" y="17" width="13" height="13" rx="5" fill="#FFF5E8" />
          <path
            d="M38 21H43"
            stroke="#B8723E"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M38 25H41.5"
            stroke="#B8723E"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      )}

      {kind === "telehealth" && (
        <svg viewBox="0 0 56 56" aria-hidden="true">
          <rect x="9" y="13" width="28" height="20" rx="6" fill="#FFFFFF" />
          <rect x="18" y="35" width="10" height="3.5" rx="1.75" fill="#DCD6CB" />
          <path
            d="M23 19V27"
            stroke="#2563EB"
            strokeWidth="2.3"
            strokeLinecap="round"
          />
          <path
            d="M19 23H27"
            stroke="#2563EB"
            strokeWidth="2.3"
            strokeLinecap="round"
          />
          <circle cx="42" cy="32" r="8" fill="#EAF8EF" />
          <path
            d="M42 27.5V36.5"
            stroke="#15803D"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M37.5 32H46.5"
            stroke="#15803D"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}

      {kind === "success" && (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="32" cy="32" r="22" fill="#FFFFFF" />
          <circle cx="32" cy="32" r="16" fill="#F8FBFF" />
          <path
            d="M24.7 32.8L29.2 37.3L39.5 27"
            stroke="#2563EB"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M32 9V14"
            stroke="#C9956B"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M32 50V55"
            stroke="#C9956B"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M9 32H14"
            stroke="#C9956B"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M50 32H55"
            stroke="#C9956B"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}
    </div>
  );
}

function Typewriter() {
  const lines = useMemo(
    () => [
      "You sit on hold for 45 minutes.",
      "You chase prescriptions for days.",
      "You get a letter you do not understand.",
      "You move cities with no doctor.",
    ],
    []
  );

  const [li, setLi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (pause) {
      const t = window.setTimeout(() => {
        setPause(false);
        setDel(true);
      }, 1300);
      return () => window.clearTimeout(t);
    }

    const current = lines[li];

    if (!del) {
      if (ci < current.length) {
        const t = window.setTimeout(() => setCi((p) => p + 1), 24);
        return () => window.clearTimeout(t);
      }
      setPause(true);
    } else {
      if (ci > 0) {
        const t = window.setTimeout(() => setCi((p) => p - 1), 12);
        return () => window.clearTimeout(t);
      }
      setDel(false);
      setLi((p) => (p + 1) % lines.length);
    }
  }, [li, ci, del, pause, lines]);

  return (
    <span className="tw">
      {lines[li].slice(0, ci)}
      <span className="twC">|</span>
    </span>
  );
}

function StatusBar() {
  return (
    <div className="stBar">
      <div className="container stIn">
        <motion.span
          animate={{ scale: [1, 1.28, 1] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          className="stDot"
        />
        <span className="stLbl">All systems operational</span>
        <Link href="/status" className="stLnk">
          View status
        </Link>
      </div>
    </div>
  );
}

const convos = [
  {
    label: "English · EN",
    flag: "gb" as FlagCode,
    msgs: [
      { f: "u", t: "I just moved to Manchester and need to register with a GP." },
      { f: "l", t: "I will find practices near you. What is your postcode?" },
      { f: "u", t: "M1, near Piccadilly." },
      { f: "l", t: "Found 3 practices near M1." },
      { f: "a", t: "City Health Centre · 0.3mi · Accepting patients" },
      { f: "l", t: "I have prepared a registration callback request for you." },
      { f: "a", t: "Callback request prepared · Ready to review" },
    ],
  },
  {
    label: "Français · FR",
    flag: "fr" as FlagCode,
    msgs: [
      { f: "u", t: "J'ai besoin de renouveler mon ordonnance." },
      { f: "l", t: "Combien de jours de stock vous reste-t-il?" },
      { f: "u", t: "Environ 3 jours." },
      { f: "l", t: "J'ai préparé une demande de renouvellement." },
      { f: "a", t: "Demande préparée · Rappel dans 25 jours" },
      { f: "l", t: "Je vous rappellerai 5 jours avant la fin." },
    ],
  },
  {
    label: "Yorùbá · YO",
    flag: "ng" as FlagCode,
    msgs: [
      { f: "u", t: "Mo ni iba ati efori lati ana. Mo wa ni HD1." },
      { f: "l", t: "Mo ti ri ile-iwosan meji nitosi re." },
      { f: "a", t: "Spring Street Surgery · 0.4 maili" },
      { f: "l", t: "Se o fe ki n ran o lowo lati mura ibeere?" },
      { f: "u", t: "Beeni, e seun." },
      { f: "a", t: "Ibeere ipe-pada ti setan" },
    ],
  },
];

function PhoneMockup() {
  const initialVisible = 3;
  const [li, setLi] = useState(0);
  const [vi, setVi] = useState(initialVisible);
  const [typing, setTyping] = useState(false);
  const cv = convos[li];

  useEffect(() => {
    if (vi >= cv.msgs.length) {
      const t = window.setTimeout(() => {
        setLi((p) => (p + 1) % convos.length);
        setVi(initialVisible);
      }, 2300);
      return () => window.clearTimeout(t);
    }

    const msg = cv.msgs[vi];

    if (msg.f === "u") {
      const t = window.setTimeout(() => setVi((p) => p + 1), 380);
      return () => window.clearTimeout(t);
    }

    setTyping(true);
    const t = window.setTimeout(() => {
      setTyping(false);
      setVi((p) => p + 1);
    }, 520 + Math.random() * 420);

    return () => window.clearTimeout(t);
  }, [vi, li, cv.msgs]);

  return (
    <div className="phW">
      <motion.div
        className="phGlow"
        animate={{ opacity: [0.16, 0.34, 0.16], scale: [1, 1.03, 1] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="phF"
        initial={{ opacity: 0, y: 20, rotateX: 8, rotateY: -8 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 4, rotateY: -5 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="phB">
          <div className="phDI" />
          <div className="phS">
            <div className="phH">
              <div className="phAv">
                <Image
                  src="/laura-avatar.png"
                  alt="Laura"
                  fill
                  sizes="24px"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div className="phHeadCopy">
                <div className="phN">
                  Laura
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M12 1L14.9 3.6L18.6 3.2L19.4 6.8L22.5 8.7L21.2 12.2L22.5 15.7L19.4 17.6L18.6 21.2L14.9 20.8L12 23.4L9.1 20.8L5.4 21.2L4.6 17.6L1.5 15.7L2.8 12.2L1.5 8.7L4.6 6.8L5.4 3.2L9.1 3.6L12 1Z"
                      fill="#22C55E"
                    />
                    <path
                      d="M8.5 12.5L10.5 14.5L15.5 9.5"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="phOn">
                  <span className="phOnD" />
                  online
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={li}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="phLang"
              >
                <FlagMark code={cv.flag} className="phFlagMark" />
                <span>{cv.label}</span>
              </motion.div>
            </AnimatePresence>

            <div className="phBdy">
              {cv.msgs.slice(0, vi).map((msg, i) => (
                <motion.div
                  key={`${li}-${i}`}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`phR ${msg.f === "u" ? "phRR" : "phRL"}`}
                >
                  {msg.f === "a" ? (
                    <div className="phAct">{msg.t}</div>
                  ) : (
                    <div className={`phBb ${msg.f === "u" ? "phBbU" : "phBbL"}`}>
                      {msg.t}
                      {msg.f === "u" && (
                        <span className="phMt">
                          <svg width="10" height="7" viewBox="0 0 20 14" fill="none" aria-hidden="true">
                            <path
                              d="M1.5 7.6L4.7 10.8L10.2 5.2"
                              stroke="#53BDEB"
                              strokeWidth="1.7"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M7.3 7.6L10.5 10.8L18.2 3.2"
                              stroke="#53BDEB"
                              strokeWidth="1.7"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}

              {typing && (
                <div className="phR phRL">
                  <div className="phBb phBbL phTy">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}
            </div>

            <div className="phCo">
              <div className="phCoF">
                <span className="phCoT">Message</span>
              </div>
              <div className="phCoM">
                <Mic size={11} color="#fff" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function HeroStage() {
  return (
    <div className="heroStage">
      <motion.div
        className="heroAura heroAuraA"
        animate={{ opacity: [0.42, 0.7, 0.42], scale: [1, 1.05, 1] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="heroAura heroAuraB"
        animate={{ opacity: [0.16, 0.28, 0.16], scale: [1, 1.08, 1] }}
        transition={{ duration: 9.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="heroRing"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <motion.span
        className="heroDust heroDustA"
        animate={{ y: [0, -8, 0], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="heroDust heroDustB"
        animate={{ y: [0, 7, 0], opacity: [0.24, 0.55, 0.24] }}
        transition={{ duration: 6.7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="heroPlate" />
      <div className="heroPhoneWrap">
        <PhoneMockup />
      </div>
    </div>
  );
}

const gs = [
  {
    country: "United Kingdom",
    code: "UK",
    flag: "gb" as FlagCode,
    name: "Sarah, 34, Leeds",
    quote:
      "I called at 8:01am. Busy. By 8:15 all slots were gone. Three weeks of this.",
    laura:
      "Laura prepares a structured callback request so the practice can respond more efficiently.",
    lat: 54,
    lng: -1.5,
  },
  {
    country: "United States",
    code: "US",
    flag: "us" as FlagCode,
    name: "Marcus, 28, Chicago",
    quote:
      "I delayed seeing a doctor for six months because I was terrified of the cost.",
    laura:
      "Laura surfaces lower-cost options and community clinics near you automatically.",
    lat: 41.8,
    lng: -87.6,
  },
  {
    country: "Nigeria",
    code: "NG",
    flag: "ng" as FlagCode,
    name: "Amina, 41, Lagos",
    quote:
      "Four doctors for ten thousand people. I spent two days trying to find someone.",
    laura:
      "Laura searches provider availability in real time and helps route you to whoever can see you soonest.",
    lat: 6.5,
    lng: 3.4,
  },
  {
    country: "India",
    code: "IN",
    flag: "in" as FlagCode,
    name: "Priya, 55, Jaipur",
    quote:
      "My mother lives two hours from the nearest clinic. She never knows when to worry.",
    laura:
      "Laura helps assess urgency remotely and tells you whether to travel now or monitor at home.",
    lat: 26.9,
    lng: 75.8,
  },
  {
    country: "Brazil",
    code: "BR",
    flag: "br" as FlagCode,
    name: "Lucas, 23, London",
    quote:
      "I moved to London and could not explain my symptoms in English.",
    laura:
      "Laura captures symptoms in your language, generates a structured bilingual note, and helps you share it before you arrive.",
    lat: 51.5,
    lng: -0.1,
  },
];

function latLngToXYZ(lat: number, lng: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  return {
    x: -Math.sin(phi) * Math.cos(theta),
    y: Math.cos(phi),
    z: Math.sin(phi) * Math.sin(theta),
  };
}

function CanvasGlobe({ active }: { active: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotRef = useRef(0.4);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const ctx = canvasEl.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = canvasEl.getBoundingClientRect();
      canvasEl.width = rect.width * dpr;
      canvasEl.height = rect.height * dpr;
    };

    resize();

    const N = 300;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const dots: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < N; i++) {
      const theta = golden * i;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / N);
      dots.push({
        x: Math.cos(theta) * Math.sin(phi),
        y: Math.cos(phi),
        z: Math.sin(theta) * Math.sin(phi),
      });
    }

    const cityXYZ = gs.map((g) => latLngToXYZ(g.lat, g.lng));

    const draw = () => {
      const w = canvasEl.width / dpr;
      const h = canvasEl.height / dpr;
      const R = Math.min(w, h) * 0.42;
      const cx = w / 2;
      const cy = h / 2;
      const rot = rotRef.current;
      const cosR = Math.cos(rot);
      const sinR = Math.sin(rot);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const glow = ctx.createRadialGradient(
        cx - R * 0.2,
        cy - R * 0.2,
        0,
        cx,
        cy,
        R * 1.3
      );
      glow.addColorStop(0, "rgba(201,149,107,0.08)");
      glow.addColorStop(0.6, "rgba(201,149,107,0.025)");
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(192,184,164,0.28)";
      ctx.lineWidth = 0.8;
      ctx.stroke();

      const sg = ctx.createRadialGradient(
        cx - R * 0.24,
        cy - R * 0.24,
        R * 0.12,
        cx,
        cy,
        R
      );
      sg.addColorStop(0, "rgba(255,255,255,0.1)");
      sg.addColorStop(1, "rgba(224,218,200,0.03)");
      ctx.fillStyle = sg;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(200,192,172,0.08)";
      ctx.lineWidth = 0.5;

      for (let lat = -60; lat <= 60; lat += 30) {
        const p = ((90 - lat) * Math.PI) / 180;
        const rr = Math.sin(p) * R;
        const ry = cy - Math.cos(p) * R;
        ctx.beginPath();
        ctx.ellipse(cx, ry, rr, rr * 0.12, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      for (const p of dots) {
        const x = p.x * cosR + p.z * sinR;
        const z = -p.x * sinR + p.z * cosR;
        const y = p.y;

        if (z < -0.05) continue;

        const sx = cx + x * R;
        const sy = cy - y * R;
        const alpha = Math.max(0, Math.min(1, (z + 0.3) * 0.6));
        const sz = 1 + z * 0.8;

        ctx.beginPath();
        ctx.arc(sx, sy, sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,168,148,${alpha * 0.55})`;
        ctx.fill();
      }

      const projected: { sx: number; sy: number; z: number }[] = [];

      for (let i = 0; i < cityXYZ.length; i++) {
        const p = cityXYZ[i];
        const x = p.x * cosR + p.z * sinR;
        const z = -p.x * sinR + p.z * cosR;
        const y = p.y;
        const sx = cx + x * R;
        const sy = cy - y * R;

        projected.push({ sx, sy, z });

        if (z < 0) continue;

        if (i === active) {
          ctx.beginPath();
          ctx.arc(sx, sy, 8, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(201,149,107,0.16)";
          ctx.fill();

          ctx.beginPath();
          ctx.arc(sx, sy, 14, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(201,149,107,0.06)";
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(sx, sy, i === active ? 4 : 2.5, 0, Math.PI * 2);
        ctx.fillStyle = i === active ? c.warm : "rgba(176,168,148,0.7)";
        ctx.fill();
      }

      for (let i = 0; i < cityXYZ.length; i++) {
        const next = (i + 1) % cityXYZ.length;
        const a = projected[i];
        const b = projected[next];

        if (a.z < -0.2 || b.z < -0.2) continue;

        const mx = (a.sx + b.sx) / 2;
        const my = (a.sy + b.sy) / 2 - Math.abs(a.sx - b.sx) * 0.2;

        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.quadraticCurveTo(mx, my, b.sx, b.sy);
        ctx.strokeStyle =
          i === active ? "rgba(201,149,107,0.34)" : "rgba(201,149,107,0.06)";
        ctx.lineWidth = i === active ? 1.2 : 0.5;
        ctx.setLineDash(i === active ? [4, 3] : []);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      rotRef.current += 0.002;
      frameRef.current = window.requestAnimationFrame(draw);
    };

    frameRef.current = window.requestAnimationFrame(draw);

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });

    resizeObserver.observe(canvasEl);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [active]);

  return <canvas ref={canvasRef} className="globeCanvas" />;
}

function GlobeSection() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<number | null>(null);

  const reset = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => {
      setActive((p) => (p + 1) % gs.length);
    }, 6000);
  }, []);

  useEffect(() => {
    reset();
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [active, reset]);

  const story = gs[active];

  return (
    <section className="globeSec">
      <div className="container">
        <FI>
          <div className="shW">
            <h2 className="serif shT">How people struggle to reach care.</h2>
          </div>
        </FI>

        <div className="globeW">
          <div className="globeV">
            <CanvasGlobe active={active} />
          </div>

          <div className="globeC">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="globeStory"
              >
                <div className="globeCtry">
                  <FlagMark code={story.flag} className="globeFlagMark" />
                  <span className="globeCode">{story.code}</span>
                  <span className="globeCtryN">{story.country}</span>
                </div>

                <p className="serif globeQ">&ldquo;{story.quote}&rdquo;</p>
                <p className="globeNm">{story.name}</p>

                <div className="globeL">
                  <div className="globeLA">
                    <Image
                      src="/laura-avatar.png"
                      alt="Laura"
                      fill
                      sizes="22px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <p className="globeLT">{story.laura}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="globeNav">
              <div className="globeDs">
                {gs.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`globeD${i === active ? " globeDA" : ""}`}
                    onClick={() => setActive(i)}
                  />
                ))}
              </div>

              <div className="globeAs">
                <button
                  type="button"
                  className="globeA"
                  onClick={() => setActive((p) => (p - 1 + gs.length) % gs.length)}
                >
                  <ChevronLeft size={15} />
                </button>
                <button
                  type="button"
                  className="globeA"
                  onClick={() => setActive((p) => (p + 1) % gs.length)}
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SDKTerminal() {
  const lines = useMemo(
    () => [
      "$ npm install @omela/laura-sdk",
      "",
      '  import { Laura } from "@omela/laura-sdk";',
      "",
      "  const laura = new Laura({",
      "    apiKey: process.env.OMELA_KEY,",
      '    region: "eu-west-2"',
      "  });",
      "",
      "  const session = await laura.navigate({",
      '    userId: "patient_4102",',
      '    lang: "fr",',
      '    concern: "prescription renewal"',
      "  });",
      "",
      "  // Laura found 2 practices and prepared the next step",
      "  Done in 1.1s",
    ],
    []
  );

  const [vl, setVl] = useState(0);
  const [ci, setCi] = useState(0);

  useEffect(() => {
    if (vl >= lines.length) {
      const t = window.setTimeout(() => {
        setVl(0);
        setCi(0);
      }, 3000);
      return () => window.clearTimeout(t);
    }

    const line = lines[vl];

    if (ci < line.length) {
      const t = window.setTimeout(
        () => setCi((p) => p + 1),
        line.startsWith("  //") ? 34 : 18
      );
      return () => window.clearTimeout(t);
    }

    const t = window.setTimeout(() => {
      setVl((p) => p + 1);
      setCi(0);
    }, line === "" ? 50 : 130);

    return () => window.clearTimeout(t);
  }, [vl, ci, lines]);

  return (
    <div className="trm">
      <div className="trmT">
        <div className="trmD">
          <span />
          <span />
          <span />
        </div>
        <span className="trmTi">Laura SDK</span>
        <Soon />
      </div>

      <div className="trmB">
        {lines.slice(0, vl + 1).map((line, i) => {
          const active = i === vl;

          return (
            <div
              key={i}
              className="trmL"
              style={{
                color:
                  line.startsWith("  Done") || line.startsWith("  //")
                    ? "#4ADE80"
                    : line.startsWith("$")
                    ? "#E2E8F0"
                    : "#94A3B8",
              }}
            >
              {active ? line.slice(0, ci) : line}
              {active && <span className="trmC">|</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const roadmapItems: {
  title: string;
  desc: string;
  stage: string;
  kind: "routing" | "portal" | "message" | "language" | "telehealth";
}[] = [
  {
    title: "GP request routing",
    desc: "Laura will help route callback and prescription requests through supported practice channels.",
    stage: "Stage 2",
    kind: "routing",
  },
  {
    title: "Practice portal",
    desc: "A dashboard for care teams to manage structured intake, urgency support, and patient routing.",
    stage: "Stage 2",
    kind: "portal",
  },
  {
    title: "WhatsApp access",
    desc: "Reach Laura through familiar messaging for an even simpler, mobile-first care navigation experience.",
    stage: "Stage 2",
    kind: "message",
  },
  {
    title: "Multilingual notes",
    desc: "Full 40+ language support with bilingual structured notes for the practice.",
    stage: "Stage 2",
    kind: "language",
  },
  {
    title: "Telehealth pathways",
    desc: "Laura can later connect people to telehealth pathways where in-person care is not practical.",
    stage: "Stage 3",
    kind: "telehealth",
  },
];

function RoadmapCards() {
  return (
    <section className="sec">
      <div className="container">
        <FI>
          <div className="shW">
            <h2 className="serif shT">Where Laura is going.</h2>
            <p className="shB">
              We are starting with care navigation first. Here is what comes next.
            </p>
          </div>
        </FI>

        <div className="roadScroll">
          {roadmapItems.map((item, i) => (
            <motion.div
              key={item.title}
              className="roadCard"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="roadTop">
                <motion.div
                  className="roadBadgeWrap"
                  animate={{ y: [0, -4, 0], rotate: [0, 1.8, 0] }}
                  transition={{
                    duration: 4.8 + i * 0.35,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ProductBadge kind={item.kind} size="lg" />
                </motion.div>

                <motion.span
                  className="roadSt"
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.3 }}
                >
                  {item.stage}
                </motion.span>
              </div>

              <h4 className="roadTi">{item.title}</h4>
              <p className="roadDs">{item.desc}</p>
              <div className="roadLine" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const infraLogos = [
  { name: "vercel" },
  { name: "stripe" },
  { name: "openai" },
  { name: "twilio" },
] as const;

function InfraLogo({ name }: { name: (typeof infraLogos)[number]["name"] }) {
  if (name === "vercel") {
    return (
      <svg
        viewBox="0 0 128 28"
        className="infraSvg infraSvg--vercel"
        aria-label="Vercel"
        role="img"
      >
        <path d="M14 4L26 24H2L14 4Z" fill="currentColor" />
        <text x="38" y="19" fontSize="14" fontWeight="700" fontFamily="DM Sans, sans-serif">
          Vercel
        </text>
      </svg>
    );
  }

  if (name === "stripe") {
    return (
      <svg
        viewBox="0 0 112 28"
        className="infraSvg infraSvg--stripe"
        aria-label="Stripe"
        role="img"
      >
        <text x="2" y="21" fontSize="17" fontWeight="800" fontFamily="DM Sans, sans-serif">
          stripe
        </text>
      </svg>
    );
  }

  if (name === "openai") {
  return (
    <div className="infraRealLogo" aria-label="OpenAI" role="img">
      <img
        src="/openai-wordmark.svg"
        alt="OpenAI"
        className="infraRealLogoImg"
      />
    </div>
  );
}

  return (
    <svg
      viewBox="0 0 124 28"
      className="infraSvg infraSvg--twilio"
      aria-label="Twilio"
      role="img"
    >
      <g transform="translate(4 5)" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="9" cy="9" r="8.2" />
        <circle cx="6" cy="6" r="1.4" fill="currentColor" />
        <circle cx="12" cy="6" r="1.4" fill="currentColor" />
        <circle cx="6" cy="12" r="1.4" fill="currentColor" />
        <circle cx="12" cy="12" r="1.4" fill="currentColor" />
      </g>
      <text x="28" y="19" fontSize="14" fontWeight="700" fontFamily="DM Sans, sans-serif">
        twilio
      </text>
    </svg>
  );
}

function InfraSection() {
  return (
    <section className="infraSec">
      <div className="container">
        <FI>
          <div className="infraIn">
            <div className="infraHead">
              <span className="infraEyebrow" />
              <p className="infraLbl">Powered by trusted infrastructure</p>
              <span className="infraEyebrow" />
            </div>

            <p className="infraSub">
              Quietly reliable systems behind a calm patient experience.
            </p>

            <div className="infraTrackWrap">
              <div className="infraFade infraFadeL" />
              <div className="infraFade infraFadeR" />

              <div className="infraTrack">
                {Array.from({ length: 4 }).map((_, groupIndex) => (
                  <div className="infraSet" key={groupIndex}>
                    {infraLogos.map((logo) => (
                      <div
                        key={`${groupIndex}-${logo.name}`}
                        className={`infraItem infraItem--${logo.name}`}
                      >
                        <InfraLogo name={logo.name} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FI>
      </div>
    </section>
  );
}

function SuccessModal({
  open,
  onClose,
  referralCode,
}: {
  open: boolean;
  onClose: () => void;
  referralCode: string;
}) {
  const [copied, setCopied] = useState(false);
  const link =
    referralCode && typeof window !== "undefined"
      ? `${window.location.origin}?ref=${referralCode}`
      : "";

  function copyLink() {
    if (!link) return;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(link).then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      });
    }
  }

  async function shareLink() {
    if (!link) return;

    if ("share" in navigator && typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: "Join Omela",
          text: "Join the Omela waitlist and move up the queue with my referral link.",
          url: link,
        });
      } catch {
        // ignore
      }
    } else {
      copyLink();
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="modO"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
            className="modB"
          >
            <div className="modHalo modHaloA" />
            <div className="modHalo modHaloB" />

            <span className="modPill">Early access confirmed</span>

            <motion.div
              className="modSealWrap"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="modSealPulse" />
              <ProductBadge kind="success" size="lg" />
            </motion.div>

            <h3 className="serif modTi">You are on the list.</h3>
            <p className="modBd">
              Laura will open access in measured batches. Invite 3 people to move up
              the waitlist and unlock bonus credits.
            </p>

            {referralCode && (
              <motion.div
                className="modRef"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <div className="modRefHd">
                  <div>
                    <p className="modRefEyebrow">Move up the waitlist</p>
                    <p className="modRefTitle">Your referral link</p>
                  </div>
                  <span className="modRefTag">Invite 3 people</span>
                </div>

                <div className="modRefBox">
                  <span className="modRefUrl">
                    {link.replace("https://", "").replace("http://", "")}
                  </span>
                  <button
                    onClick={copyLink}
                    className="modRefCp"
                    type="button"
                    aria-label="Copy referral link"
                  >
                    {copied ? <Check size={15} /> : <Copy size={15} />}
                  </button>
                </div>

                <div className="modRefBts">
                  <button onClick={shareLink} className="btnP modShareBtn" type="button">
                    <Share2 size={13} />
                    Share link
                  </button>

                  <a
                    href="https://x.com/joinomela"
                    target="_blank"
                    rel="noreferrer"
                    className="btnS modXBtn"
                  >
                    Follow @joinomela
                  </a>
                </div>
              </motion.div>
            )}

            <button type="button" className="modClose" onClick={onClose}>
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

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
      const params = new URLSearchParams(window.location.search);
      const ref = params.get("ref");
      if (ref) setRefParam(ref);
    }
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!agreed) return;

    setSubmitting(true);
    setSuccess("");
    setError("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          role,
          website,
          source: "landing-page",
          marketingOptIn: false,
          ref: refParam || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.referralCode) setReferralCode(data.referralCode);
        setError(data.error || "Something went wrong.");
        return;
      }

      setSuccess(data.message || "You are in.");
      if (data.referralCode) setReferralCode(data.referralCode);
      setEmail("");
      setRole("patient");
      setWebsite("");
      setAgreed(false);
      setModalOpen(true);
    } catch {
      setError("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <style>{FONT}</style>
      <style>{CSS}</style>

      <SuccessModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        referralCode={referralCode}
      />

      <div className="wrap">
        <StatusBar />

        <motion.nav initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="nav">
          <div className="container navR">
            <Link href="/" className="navBr">
              <div className="navLo">
                <Image
                  src="/omela-logo-mark.png"
                  alt="Omela"
                  width={34}
                  height={34}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>
              <div>
                <div className="navNm">Omela</div>
                <div className="navSb">POWERED BY LAURA</div>
              </div>
            </Link>

            <div className="navLks">
              <a href="#how" className="navLk">
                How it works
              </a>
              <a href="#pricing" className="navLk">
                Pricing
              </a>
              <Link href="/how-laura-helps" className="navLk">
                Use cases
              </Link>
            </div>

            <a href="#waitlist" className="btnP navCt">
              Join waitlist <ArrowRight size={13} />
            </a>
          </div>
        </motion.nav>

        <section className="heroSec">
          <div className="container">
            <div className="heroTxt">
              <FI>
                <h1 className="serif heroTi">
                  Getting care
                  <br />
                  <span className="heroAc">should not be this hard.</span>
                </h1>
              </FI>

              <FI delay={0.05}>
                <p className="heroLead">Laura helps people move care access forward.</p>
              </FI>

              <FI delay={0.08}>
                <div className="heroBd">
                  <Typewriter />
                </div>
              </FI>

              <FI delay={0.11}>
                <p className="heroSub">
                  Find nearby practices, prepare prescription requests, understand referral
                  letters, and generate structured bilingual notes, all in one calm care
                  navigation experience.
                </p>
              </FI>

              <FI delay={0.14}>
                <div className="heroBt">
                  <Link href="/demo" className="btnP">
                    See Laura in action <ArrowRight size={14} />
                  </Link>
                  <a href="#waitlist" className="btnS">
                    Join waitlist
                  </a>
                </div>
              </FI>
            </div>

            <div className="heroPh">
              <HeroStage />
            </div>
          </div>
        </section>

        <section id="how" className="sec">
          <div className="container">
            <FI>
              <div className="shW">
                <h2 className="serif shT">
                  Laura does not just answer health questions.
                  <br />
                  She helps get the admin moving.
                </h2>
              </div>
            </FI>

            <div className="capGrid">
              {[
                {
                  icon: <Search size={22} />,
                  title: "Finds doctors and helps prepare requests",
                  body: "Laura searches practices near you, surfaces suitable options, and helps prepare registration or callback requests for sharing with your approval.",
                },
                {
                  icon: <FileCheck size={22} />,
                  title: "Drafts prescriptions and tracks refills",
                  body: "Laura prepares your repeat prescription request, helps you send it through the available channel, and reminds you before you run out.",
                },
                {
                  icon: <Languages size={22} />,
                  title: "Generates structured bilingual notes",
                  body: "Laura captures your symptoms in your language and turns them into a structured bilingual note you can share with the practice.",
                },
              ].map((item, i) => (
                <FI key={item.title} delay={i * 0.07}>
                  <div className="capCard">
                    <motion.div
                      className="capIc"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {item.icon}
                    </motion.div>
                    <h3 className="capTi">{item.title}</h3>
                    <p className="capBd">{item.body}</p>
                  </div>
                </FI>
              ))}
            </div>

            <FI delay={0.2}>
              <div style={{ textAlign: "center", marginTop: "28px" }}>
                <Link href="/how-laura-helps" className="seeAll">
                  See all care scenarios <ArrowRight size={14} />
                </Link>
              </div>
            </FI>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="container">
            <FI>
              <div className="shW">
                <h2 className="serif shT">
                  A chatbot answers questions.
                  <br />
                  Laura helps move care access forward.
                </h2>
              </div>
            </FI>

            <FI>
              <div className="baGrid">
                <div className="baCard baBf">
                  <h3 className="baTi">Without Laura</h3>
                  {[
                    "You call the GP. Busy signal. Try again tomorrow.",
                    "You email the pharmacy. No reply for three days.",
                    "You get a referral full of medical jargon with no guidance.",
                    "You arrive in a new city with zero medical contacts.",
                    "You try to explain symptoms in a language that is not yours.",
                  ].map((item) => (
                    <div key={item} className="baIt">
                      <span className="baX">&#10007;</span>
                      {item}
                    </div>
                  ))}
                </div>

                <div className="baCard baAf">
                  <h3 className="baTi">With Laura</h3>
                  {[
                    "Laura prepares a structured callback request and helps route it through the available channel.",
                    "Laura drafts your refill request and helps share it where supported.",
                    "Laura translates your referral into plain language with appointment prep.",
                    "Laura finds nearby accepting practices and helps prepare the registration request.",
                    "Laura prepares a bilingual note for the practice that you can review and share.",
                  ].map((item) => (
                    <div key={item} className="baIt">
                      <Chk />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FI>
          </div>
        </section>

        <GlobeSection />

        <section className="sec">
          <div className="container">
            <FI>
              <div className="shW">
                <h2 className="serif shT">Who Laura is for.</h2>
              </div>
            </FI>

            <div className="audGrid">
              {[
                {
                  icon: <Users size={22} />,
                  title: "People",
                  desc: "Laura helps act on your behalf. She finds nearby practices, drafts your prescription request, explains your hospital letter, and helps prepare your callback request. You spend less time chasing the system.",
                  color: c.accent,
                },
                {
                  icon: <Building2 size={22} />,
                  title: "Care teams",
                  desc: "Laura intercepts and structures incoming patient demand before it hits reception. She helps assess urgency, captures symptoms in structured format, and helps route the next step.",
                  color: c.green,
                },
                {
                  icon: <Code2 size={22} />,
                  title: "Developers",
                  desc: "Embed Laura's care-navigation engine into your product via API. Provider search, urgency support, prescription routing, and multilingual intake.",
                  color: c.warm,
                  soon: true,
                },
              ].map((item, i) => (
                <FI key={item.title} delay={i * 0.07}>
                  <div className="audCard">
                    <motion.div
                      className="audIc"
                      style={{ background: `${item.color}10`, color: item.color }}
                      animate={{ rotate: [0, 3, -3, 0] }}
                      transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {item.icon}
                    </motion.div>

                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <h3 className="audTi">{item.title}</h3>
                      {item.soon && <Soon />}
                    </div>

                    <p className="audBd">{item.desc}</p>
                  </div>
                </FI>
              ))}
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="container">
            <FI>
              <div className="glC">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  <h2 className="serif glT">Laura speaks your language.</h2>
                  <Soon />
                </div>

                <p className="glB">
                  40+ languages. Laura responds in the language you start with and
                  generates structured bilingual notes for the practice.
                </p>

                <div className="glF">
                  {[
                    { code: "gb" as FlagCode, label: "English · EN" },
                    { code: "fr" as FlagCode, label: "Français · FR" },
                    { code: "ng" as FlagCode, label: "Yorùbá · YO" },
                    { code: "global" as FlagCode, label: "العربية · AR" },
                    { code: "in" as FlagCode, label: "हिंदी · HI" },
                    { code: "global" as FlagCode, label: "40+ more" },
                  ].map((item) => (
                    <span key={item.label} className="glFi">
                      <FlagMark code={item.code} className="glChipFlag" />
                      <span>{item.label}</span>
                    </span>
                  ))}
                </div>
              </div>
            </FI>
          </div>
        </section>

        <section className="secDk">
          <div className="container">
            <FI>
              <div className="shW">
                <h2 className="serif shT" style={{ color: "#fff" }}>
                  Build with Laura.
                </h2>
                <p className="shB" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Embed care navigation, provider routing, and multilingual intake into
                  your product.
                </p>
              </div>
            </FI>

            <div className="g2" style={{ marginTop: "32px" }}>
              <FI>
                <SDKTerminal />
              </FI>

              <FI delay={0.08}>
                <div className="dkC">
                  <h3 className="dkCT">Infrastructure for health apps</h3>
                  <p className="dkCB">
                    Add Laura to patient portals, care platforms, or internal tooling.
                  </p>

                  <div className="ftL" style={{ marginTop: "16px" }}>
                    {[
                      "Provider search and availability API",
                      "Urgency assessment engine",
                      "Prescription and callback routing",
                      "Multilingual intake with bilingual notes",
                    ].map((f) => (
                      <div
                        key={f}
                        className="ftR"
                        style={{ color: "rgba(255,255,255,0.7)" }}
                      >
                        <Chk dark />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FI>
            </div>
          </div>
        </section>

        <RoadmapCards />
        <InfraSection />

        <section id="pricing" className="secPr">
          <div className="container">
            <FI>
              <div className="shW">
                <h2 className="serif shT">Credits-based pricing.</h2>
                <p className="shB">
                  Every action Laura takes uses credits. Start free. Pay as you grow.
                </p>
              </div>
            </FI>

            <div className="prGrid">
              {[
                {
                  name: "People",
                  price: "50 free credits",
                  period: "then £4.99 / 200 credits",
                  desc: "For individuals navigating the healthcare system.",
                  features: [
                    "Find nearby GP practices",
                    "Prepare callback requests",
                    "Draft repeat prescriptions",
                    "Explain referral letters",
                    "Urgency guidance",
                    "Bilingual note generation",
                  ],
                  cta: "Join waitlist",
                  hl: false,
                },
                {
                  name: "Care Teams",
                  price: "From £2,500",
                  period: "/month",
                  desc: "For GP practices, clinics, and care organisations managing patient demand at scale.",
                  features: [
                    "Structured patient intake",
                    "Urgency assessment and routing",
                    "Multilingual access for patients",
                    "Callback and request management",
                    "Demand analytics dashboard",
                    "Dedicated onboarding support",
                  ],
                  cta: "Request demo",
                  hl: true,
                  badge: "Best for practices",
                },
                {
                  name: "Developer",
                  price: "Custom",
                  period: "usage-based",
                  desc: "For health platforms, patient portals, and care apps embedding Laura's engine via API.",
                  features: [
                    "Full REST API access",
                    "Provider search endpoints",
                    "Urgency assessment engine",
                    "Prescription routing API",
                    "Multilingual intake pipeline",
                    "Sandbox environment",
                    "Priority engineering support",
                  ],
                  cta: "Talk to us",
                  hl: false,
                  soon: true,
                },
              ].map((p, i) => (
                <FI key={p.name} delay={i * 0.06}>
                  <div className={`prCard${p.hl ? " prCardDk" : ""}`}>
                    {p.badge && <div className="prBg">{p.badge}</div>}

                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span className="prNm">{p.name}</span>
                      {p.soon && <Soon />}
                    </div>

                    <div className="prPr">
                      <span className="serif prAmt">{p.price}</span>
                    </div>

                    <p className="prPd2">{p.period}</p>
                    <p className="prDs">{p.desc}</p>

                    <div className="prFts">
                      {p.features.map((f) => (
                        <div key={f} className="prFt">
                          <Chk dark={p.hl} />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>

                    <a href="#waitlist" className={`btnP prBt${p.hl ? " prBtW" : ""}`}>
                      {p.cta}
                    </a>
                  </div>
                </FI>
              ))}
            </div>
          </div>
        </section>

        <section id="waitlist" className="sec">
          <div className="container">
            <FI>
              <div className="wlC">
                <div className="shW">
                  <h2 className="serif shT">Join the waitlist.</h2>
                  <p className="shB">
                    We are onboarding in batches. Early members receive 50 free credits.
                  </p>
                </div>

                <form className="wlF" onSubmit={handleSubmit}>
                  <input
                    className="inp"
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />

                  <select
                    className="inp"
                    value={role}
                    onChange={(e) => setRole(e.target.value as Role)}
                  >
                    <option value="patient">I need care access</option>
                    <option value="provider">I run a practice</option>
                    <option value="developer">I am a developer</option>
                  </select>

                  <input
                    type="text"
                    name="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: "-9999px",
                      opacity: 0,
                      pointerEvents: "none",
                      height: 0,
                      width: 0,
                    }}
                  />

                  <button type="submit" className="btnP wlBt" disabled={submitting || !agreed}>
                    {submitting ? "Submitting..." : "Join waitlist"}
                  </button>
                </form>

                <label className="pvL">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    required
                    className="pvC"
                  />
                  <span>
                    I agree to the{" "}
                    <Link href="/privacy" className="pvLk">
                      Privacy Notice
                    </Link>{" "}
                    and{" "}
                    <Link href="/terms" className="pvLk">
                      Terms
                    </Link>
                    .
                  </span>
                </label>

                {success && <div className="fmOk">{success}</div>}
                {error && <div className="fmEr">{error}</div>}
              </div>
            </FI>
          </div>
        </section>

        <footer className="ft">
          <div className="container ftIn">
            <div className="ftTop">
              <div>
                <Link href="/" className="ftBr">
                  <div className="navLo ftLoW">
                    <Image
                      src="/omela-logo-mark.png"
                      alt="Omela"
                      width={26}
                      height={26}
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                  </div>
                  <div>
                    <div className="ftBrN">Omela</div>
                    <div className="ftBrS">POWERED BY LAURA</div>
                  </div>
                </Link>
              </div>

              <div className="ftCols">
                <div className="ftCol">
                  <div className="ftColT">Product</div>
                  <Link href="/demo" className="ftLk">
                    Try Laura
                  </Link>
                  <Link href="/how-laura-helps" className="ftLk">
                    Use cases
                  </Link>
                  <Link href="/quiz" className="ftLk">
                    Health Quiz
                  </Link>
                  <Link href="/status" className="ftLk">
                    Status
                  </Link>
                </div>

                <div className="ftCol">
                  <div className="ftColT">Legal</div>
                  <Link href="/privacy" className="ftLk">
                    Privacy
                  </Link>
                  <Link href="/terms" className="ftLk">
                    Terms
                  </Link>
                  <a href="mailto:notice@omela.ai" className="ftLk">
                    Contact
                  </a>
                </div>
              </div>
            </div>

            <div className="ftDsc">
              Laura is a care navigation assistant, not a medical professional. She does not
              provide diagnosis or treatment. For emergencies, call 999 or 911.
            </div>

            <div className="ftBtm">
              <p>&copy; 2026 Omela.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

const CSS = `
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
html,body{max-width:100%;overflow-x:clip}
body{
  background:${c.bg};
  color:${c.text};
  font-family:'DM Sans',-apple-system,sans-serif;
  -webkit-font-smoothing:antialiased;
  font-size:16px;
}
a{color:inherit;text-decoration:none}
button,input,select{font-family:inherit}
::selection{background:${c.accent};color:#fff}

@keyframes blink{0%,50%{opacity:1}50.01%,100%{opacity:0}}
@keyframes tDot{0%,80%{opacity:0.32;transform:scale(0.82)}40%{opacity:1;transform:scale(1)}}
@keyframes infraDrift{from{transform:translateX(0)}to{transform:translateX(-25%)}}

.serif{font-family:'Instrument Serif',Georgia,serif}
.wrap{width:100%;overflow-x:clip}
.container{max-width:1180px;margin:0 auto;padding:0 20px}

.flagMark{display:block;width:18px;height:18px;flex-shrink:0;border-radius:999px;overflow:hidden}
.phFlagMark{width:14px;height:14px}
.globeFlagMark{width:18px;height:18px}
.glChipFlag{width:15px;height:15px}

.sec{padding:74px 0}
.secDk{padding:74px 0;background:${c.dark};color:#fff}
.secPr{padding:74px 0;background:linear-gradient(180deg,#FDFCFA,${c.bg})}

.soon{
  display:inline-flex;
  padding:3px 8px;
  border-radius:999px;
  background:rgba(37,99,235,0.06);
  color:${c.accent};
  font-size:10px;
  font-weight:700;
  border:1px solid rgba(37,99,235,0.1);
}

.stBar{
  background:${c.greenSoft};
  border-bottom:1px solid rgba(34,197,94,0.12);
  padding:6px 0;
}
.stIn{display:flex;align-items:center;gap:7px}
.stDot{
  width:6px;height:6px;border-radius:999px;background:${c.green};display:inline-block;
  box-shadow:0 0 5px ${c.green}44;
}
.stLbl{font-size:12px;font-weight:700;color:${c.greenDk}}
.stLnk{
  font-size:11px;font-weight:700;color:${c.accent};
  text-decoration:underline;text-underline-offset:2px;
}

.chk{
  width:18px;height:18px;border-radius:999px;background:${c.greenSoft};color:${c.green};
  display:inline-flex;align-items:center;justify-content:center;font-size:9px;font-weight:800;
  flex-shrink:0;margin-top:2px;
}
.chkD{background:rgba(34,197,94,0.12);color:#4ADE80}

.shW{text-align:center;max-width:760px;margin:0 auto}
.shT{font-size:clamp(26px,5vw,50px);line-height:1.05;letter-spacing:-0.045em}
.shB{
  font-size:clamp(14px,2.5vw,16px);
  line-height:1.78;
  margin-top:12px;
  max-width:540px;
  margin-left:auto;
  margin-right:auto;
  color:${c.sub};
}

.btnP{
  display:inline-flex;align-items:center;justify-content:center;gap:7px;background:${c.dark};
  color:#fff;border:none;border-radius:999px;padding:14px 24px;font-size:14px;font-weight:700;
  cursor:pointer;transition:all 0.3s;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.08);
}
.btnP:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 10px 28px rgba(0,0,0,0.14)}
.btnP:disabled{opacity:0.5;cursor:not-allowed;transform:none}

.btnS{
  display:inline-flex;align-items:center;justify-content:center;gap:7px;background:rgba(255,255,255,0.88);
  color:${c.text};border:1px solid rgba(227,221,210,0.9);border-radius:999px;padding:14px 24px;
  font-size:14px;font-weight:700;cursor:pointer;transition:all 0.3s;white-space:nowrap;
}
.btnS:hover{background:#fff;box-shadow:0 4px 16px rgba(0,0,0,0.06)}

.nav{
  position:sticky;top:0;z-index:100;background:rgba(248,246,241,0.86);
  backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
  border-bottom:1px solid rgba(227,221,210,0.52);
}
.navR{display:flex;align-items:center;justify-content:space-between;gap:8px;height:56px}
.navBr{display:flex;align-items:center;gap:7px;flex-shrink:0}
.navLo{
  width:32px;height:32px;border-radius:10px;overflow:hidden;flex-shrink:0;
  box-shadow:0 2px 6px rgba(0,0,0,0.05);
}
.navNm{font-size:14px;font-weight:800;letter-spacing:-0.03em}
.navSb{font-size:8px;font-weight:800;letter-spacing:0.1em;color:${c.accent};margin-top:1px}
.navLks{display:none;align-items:center;gap:22px}
.navLk{font-size:13px;font-weight:600;color:${c.sub};transition:color 0.2s}
.navLk:hover{color:${c.text}}
.navCt{padding:9px 16px!important;font-size:12px!important;flex-shrink:0}

.heroSec{
  padding:56px 0 28px;
  position:relative;
  overflow:hidden;
}
.heroSec::before{
  content:"";
  position:absolute;
  inset:0;
  pointer-events:none;
  background:
    radial-gradient(circle at 18% 20%, rgba(37,99,235,0.055), transparent 28%),
    radial-gradient(circle at 82% 26%, rgba(201,149,107,0.09), transparent 24%);
}
.heroTxt{max-width:560px}
.heroTi{font-size:clamp(36px,8.6vw,82px);line-height:0.95;letter-spacing:-0.055em}
.heroAc{color:${c.accent};font-style:italic}
.heroLead{
  font-size:clamp(16px,3vw,20px);
  line-height:1.5;
  color:${c.text};
  font-weight:700;
  margin-top:16px;
}
.tw{
  font-size:clamp(16px,2.7vw,20px);
  line-height:1.55;
  color:${c.text};
  font-weight:600;
  min-height:1.5em;
  display:block;
  margin-top:8px;
}
.twC{color:${c.accent};animation:blink 1s step-end infinite;font-weight:300}
.heroSub{
  font-size:clamp(14px,2.15vw,16px);
  line-height:1.82;
  color:${c.sub};
  max-width:520px;
  margin-top:12px;
}
.heroBd{min-height:46px}
.heroBt{display:flex;flex-direction:column;gap:10px;margin-top:24px}
.heroBt .btnP,.heroBt .btnS{width:100%;text-align:center}
.heroPh{margin-top:36px;width:100%;display:flex;justify-content:center;position:relative}

.heroStage{
  position:relative;
  width:100%;
  max-width:560px;
  min-height:620px;
  display:flex;
  align-items:center;
  justify-content:center;
  perspective:1400px;
}
.heroAura{position:absolute;border-radius:999px;filter:blur(22px);pointer-events:none}
.heroAuraA{
  width:360px;height:360px;
  background:radial-gradient(circle, rgba(37,99,235,0.12), rgba(37,99,235,0.03), transparent 72%);
  right:80px;top:80px;
}
.heroAuraB{
  width:300px;height:300px;
  background:radial-gradient(circle, rgba(201,149,107,0.14), rgba(201,149,107,0.03), transparent 74%);
  left:120px;bottom:90px;
}
.heroRing{
  position:absolute;
  width:420px;height:420px;border-radius:999px;
  border:1px solid rgba(201,149,107,0.18);
  box-shadow:0 0 0 18px rgba(201,149,107,0.03),0 0 0 38px rgba(201,149,107,0.016);
  opacity:0.78;
}
.heroDust{
  position:absolute;
  width:10px;height:10px;border-radius:999px;
  background:linear-gradient(135deg, rgba(201,149,107,0.8), rgba(37,99,235,0.5));
  filter:blur(0.2px);
}
.heroDustA{right:64px;top:110px}
.heroDustB{left:96px;bottom:120px}
.heroPlate{
  position:absolute;
  width:360px;
  height:440px;
  border-radius:42px;
  background:linear-gradient(180deg, rgba(255,255,255,0.34), rgba(255,255,255,0.08));
  border:1px solid rgba(227,221,210,0.72);
  box-shadow:0 30px 60px rgba(17,18,20,0.05), inset 0 1px 0 rgba(255,255,255,0.55);
  backdrop-filter:blur(8px);
  -webkit-backdrop-filter:blur(8px);
  transform:rotate(-7deg);
}
.heroPhoneWrap{
  position:relative;
  z-index:5;
  transform-style:preserve-3d;
  filter:drop-shadow(0 32px 54px rgba(17,18,20,0.16));
}

.pBadge{
  display:flex;align-items:center;justify-content:center;flex-shrink:0;
  border-radius:18px;
  background:linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.72));
  border:1px solid rgba(227,221,210,0.82);
  box-shadow:0 8px 18px rgba(17,18,20,0.045),0 1px 0 rgba(255,255,255,0.8) inset;
}
.pBadge svg{display:block;width:100%;height:100%}
.pBadge--md{width:42px;height:42px;padding:7px}
.pBadge--lg{width:58px;height:58px;padding:9px}
.pBadge--routing{background:linear-gradient(180deg,#FFFFFF,#F7FBFF)}
.pBadge--portal{background:linear-gradient(180deg,#FFFFFF,#FBFBFF)}
.pBadge--message{background:linear-gradient(180deg,#FFFFFF,#F7FBFF)}
.pBadge--language{background:linear-gradient(180deg,#FFFFFF,#FFF8F0)}
.pBadge--telehealth{background:linear-gradient(180deg,#FFFFFF,#F9FCFF)}
.pBadge--success{
  background:linear-gradient(180deg,#FFFFFF,#FBFCFF);
  width:74px;height:74px;padding:10px;border-radius:999px;
  box-shadow:0 10px 28px rgba(17,18,20,0.07),0 0 0 8px rgba(37,99,235,0.04);
}

.phW{width:100%;max-width:278px;position:relative}
.phGlow{
  position:absolute;inset:-34px;border-radius:999px;
  background:radial-gradient(circle, rgba(37,99,235,0.09), rgba(37,99,235,0.03), transparent 70%);
  z-index:0;
}
.phF{position:relative;z-index:1}
.phB{
  background:#1A1A1E;border-radius:36px;padding:5px;
  box-shadow:0 18px 44px rgba(0,0,0,0.16),0 2px 8px rgba(0,0,0,0.06);
}
.phDI{width:78px;height:18px;border-radius:999px;background:#000;margin:0 auto 3px}
.phS{background:#FAFAFA;border-radius:32px;overflow:hidden}
.phH{
  display:flex;align-items:center;gap:6px;padding:8px 10px;background:#fff;border-bottom:1px solid #F0F0F3;
}
.phAv{
  position:relative;width:24px;height:24px;border-radius:999px;overflow:hidden;flex-shrink:0;border:1px solid #fff;
}
.phHeadCopy{display:flex;flex-direction:column}
.phN{display:flex;align-items:center;gap:3px;font-size:10px;font-weight:800}
.phOn{display:flex;align-items:center;gap:3px;font-size:7.5px;color:${c.green};font-weight:700}
.phOnD{width:4px;height:4px;border-radius:999px;background:${c.green};display:inline-block}
.phLang{
  display:flex;align-items:center;justify-content:center;gap:6px;padding:5px 0;
  background:#F7F8FC;font-size:8px;font-weight:800;color:${c.accent};letter-spacing:0.03em;
}
.phBdy{
  display:flex;flex-direction:column;gap:3px;padding:8px 7px;height:372px;overflow:hidden;justify-content:flex-end;
  background:
    radial-gradient(circle at top, rgba(255,255,255,0.22), transparent 30%),
    linear-gradient(180deg,#F5F5F0,#ECE5DA);
}
.phR{display:flex}
.phRR{justify-content:flex-end}
.phRL{justify-content:flex-start}
.phBb{
  max-width:88%;padding:7px 9px;font-size:8.8px;line-height:1.42;word-break:break-word;
  box-shadow:0 1px 0 rgba(0,0,0,0.02);
}
.phBbU{background:#E7FFDB;color:#111;border-radius:10px 10px 3px 10px}
.phBbL{background:#fff;color:#111;border-radius:10px 10px 10px 3px}
.phMt{display:flex;justify-content:flex-end;margin-top:2px}
.phAct{
  width:90%;margin:3px auto;padding:7px 9px;background:${c.accentSoft};
  border:1px solid rgba(37,99,235,0.12);border-radius:9px;font-size:8px;font-weight:800;color:${c.accent};text-align:center;
}
.phTy{display:flex;gap:2px;padding:8px 10px}
.phTy span{
  width:4px;height:4px;border-radius:999px;background:${c.muted};
  animation:tDot 1.2s infinite;
}
.phTy span:nth-child(2){animation-delay:0.2s}
.phTy span:nth-child(3){animation-delay:0.4s}
.phCo{padding:4px 5px 7px;display:flex;align-items:center;gap:4px;background:#F0EBE3}
.phCoF{
  flex:1;height:22px;border-radius:999px;background:#fff;display:flex;align-items:center;padding:0 8px;
}
.phCoT{color:${c.muted};font-size:7.5px}
.phCoM{
  width:22px;height:22px;border-radius:999px;background:#25D366;display:flex;align-items:center;justify-content:center;flex-shrink:0;
}

.capGrid{display:grid;grid-template-columns:1fr;gap:14px;margin-top:32px}
.capCard{
  padding:28px;border:1px solid rgba(227,221,210,0.92);border-radius:24px;background:rgba(255,255,255,0.96);
  transition:all 0.3s;box-shadow:0 6px 22px rgba(17,18,20,0.03);
}
.capCard:hover{box-shadow:0 12px 36px rgba(17,18,20,0.06);transform:translateY(-2px)}
.capIc{
  width:50px;height:50px;border-radius:14px;display:flex;align-items:center;justify-content:center;background:${c.accentSoft};
  color:${c.accent};border:1px solid rgba(37,99,235,0.08);margin-bottom:14px;
}
.capTi{font-size:17px;font-weight:800;letter-spacing:-0.03em}
.capBd{font-size:13.5px;line-height:1.72;color:${c.sub};margin-top:6px}
.seeAll{display:inline-flex;align-items:center;gap:5px;font-size:14px;font-weight:700;color:${c.accent}}

.baGrid{display:grid;grid-template-columns:1fr;gap:14px;margin-top:32px}
.baCard{border-radius:24px;padding:28px;border:1px solid rgba(227,221,210,0.92)}
.baBf{background:rgba(254,242,242,0.34)}
.baAf{background:rgba(236,253,243,0.34)}
.baTi{font-size:17px;font-weight:800;margin-bottom:16px}
.baIt{display:flex;align-items:flex-start;gap:8px;font-size:13.5px;line-height:1.68;color:${c.sub};margin-bottom:10px}
.baX{color:#EF4444;font-weight:800;flex-shrink:0;margin-top:1px}

.globeSec{padding:76px 0;background:linear-gradient(180deg,${c.bg},#EEE8DD,${c.bg})}
.globeW{display:flex;flex-direction:column;align-items:center;gap:24px;margin-top:32px}
.globeV{width:100%;max-width:340px;aspect-ratio:1;margin:0 auto}
.globeCanvas{width:100%;height:100%;display:block}
.globeC{width:100%;max-width:500px;text-align:center}
.globeStory{min-height:190px}
.globeCtry{display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:10px;flex-wrap:wrap}
.globeCode{
  width:28px;height:28px;border-radius:999px;display:inline-flex;align-items:center;justify-content:center;
  background:rgba(255,255,255,0.8);border:1px solid rgba(227,221,210,0.9);
  font-size:10px;font-weight:800;color:${c.text};
}
.globeCtryN{
  font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;color:${c.muted};
  background:rgba(255,255,255,0.8);padding:4px 10px;border-radius:999px;
}
.globeQ{font-size:clamp(15px,3.2vw,20px);line-height:1.35;letter-spacing:-0.02em;font-style:italic}
.globeNm{font-size:11px;color:${c.muted};font-weight:600;margin-top:8px;font-style:italic}
.globeL{
  display:flex;align-items:flex-start;gap:8px;margin-top:14px;background:rgba(255,255,255,0.88);
  border:1px solid rgba(227,221,210,0.9);border-radius:16px;padding:12px 14px;text-align:left;
}
.globeLA{
  position:relative;width:22px;height:22px;border-radius:999px;overflow:hidden;flex-shrink:0;border:1px solid #fff;
}
.globeLT{font-size:12.5px;line-height:1.65;color:${c.sub}}
.globeNav{display:flex;align-items:center;justify-content:center;gap:14px;margin-top:18px}
.globeDs{display:flex;gap:4px}
.globeD{width:6px;height:6px;border-radius:999px;background:${c.border};border:none;cursor:pointer;transition:all 0.3s;padding:0}
.globeDA{background:${c.warm};width:18px}
.globeAs{display:flex;gap:4px}
.globeA{
  width:30px;height:30px;border-radius:999px;background:rgba(255,255,255,0.92);
  border:1px solid rgba(227,221,210,0.9);display:flex;align-items:center;justify-content:center;cursor:pointer;color:${c.sub};
}

.audGrid{display:grid;grid-template-columns:1fr;gap:14px;margin-top:32px}
.audCard{
  padding:28px;border:1px solid rgba(227,221,210,0.92);border-radius:24px;background:rgba(255,255,255,0.96);
  transition:all 0.3s;box-shadow:0 6px 22px rgba(17,18,20,0.03);
}
.audCard:hover{box-shadow:0 8px 28px rgba(17,18,20,0.05)}
.audIc{
  width:50px;height:50px;border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:14px;
  border:1px solid rgba(0,0,0,0.04);
}
.audTi{font-size:18px;font-weight:800;letter-spacing:-0.03em}
.audBd{font-size:13.5px;line-height:1.78;color:${c.sub};margin-top:8px}

.g2{display:grid;grid-template-columns:1fr;gap:16px}
.dkC{
  background:linear-gradient(180deg,rgba(16,19,24,0.98),rgba(13,15,20,0.98));
  border:1px solid ${c.borderDk};border-radius:24px;padding:28px;
}
.dkCT{font-size:clamp(17px,3vw,22px);font-weight:800;color:#fff}
.dkCB{margin-top:8px;color:rgba(255,255,255,0.5);font-size:13.5px;line-height:1.8}

.ftL{display:flex;flex-direction:column;gap:6px;margin-top:10px}
.ftR{display:flex;align-items:flex-start;gap:6px;font-size:13px;line-height:1.55;color:${c.sub}}

.glC{
  border:1px solid rgba(227,221,210,0.92);background:rgba(255,255,255,0.94);border-radius:24px;padding:28px;text-align:center;
  box-shadow:0 6px 22px rgba(17,18,20,0.03);
}
.glT{font-size:clamp(22px,4.5vw,38px);letter-spacing:-0.04em;display:inline}
.glB{
  margin-top:8px;color:${c.sub};font-size:14px;line-height:1.75;max-width:460px;margin-left:auto;margin-right:auto;
}
.glF{display:flex;flex-wrap:wrap;justify-content:center;gap:6px;margin-top:16px}
.glFi{
  padding:7px 12px;border-radius:999px;border:1px solid rgba(227,221,210,0.9);background:rgba(255,255,255,0.86);
  font-size:11px;font-weight:700;color:${c.sub};display:inline-flex;align-items:center;gap:7px;
}

.trm{
  background:#07080B;border:1px solid #1F2330;border-radius:18px;overflow:hidden;height:340px;display:flex;flex-direction:column;
}
.trmT{
  display:flex;align-items:center;gap:6px;padding:10px 13px;border-bottom:1px solid #1B1F2B;background:#0E1118;flex-shrink:0;
}
.trmD{display:flex;gap:4px}
.trmD span{width:7px;height:7px;border-radius:999px;display:inline-block}
.trmD span:nth-child(1){background:#FF5F57}
.trmD span:nth-child(2){background:#FEBC2E}
.trmD span:nth-child(3){background:#28C840}
.trmTi{font-size:9px;color:#6B7280;font-weight:700;flex:1}
.trmB{padding:12px;flex:1;overflow:hidden}
.trmL{
  white-space:pre-wrap;word-break:break-all;font-size:10px;line-height:1.7;
  font-family:'SF Mono',ui-monospace,Menlo,Consolas,monospace;
}
.trmC{color:#60A5FA;animation:blink 0.8s step-end infinite}

.roadScroll{
  display:flex;gap:14px;margin-top:32px;overflow-x:auto;scroll-snap-type:x mandatory;
  -webkit-overflow-scrolling:touch;padding-bottom:8px;scrollbar-width:none;-ms-overflow-style:none;
}
.roadScroll::-webkit-scrollbar{display:none}
.roadCard{
  min-width:280px;max-width:320px;flex-shrink:0;scroll-snap-align:start;
  background:rgba(255,255,255,0.72);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
  border:1px solid rgba(227,221,210,0.9);border-radius:24px;padding:24px;position:relative;overflow:hidden;
  transition:all 0.3s;box-shadow:0 10px 28px rgba(17,18,20,0.04);
}
.roadCard:hover{
  border-color:rgba(201,149,107,0.28);
  box-shadow:0 14px 34px rgba(201,149,107,0.07);
  transform:translateY(-2px);
}
.roadTop{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:16px;gap:10px}
.roadBadgeWrap{display:flex}
.roadSt{
  padding:5px 11px;border-radius:999px;background:rgba(201,149,107,0.12);color:${c.warm};
  font-size:10px;font-weight:700;border:1px solid rgba(201,149,107,0.15);
}
.roadTi{font-size:17px;font-weight:800;color:#111214;letter-spacing:-0.02em}
.roadDs{font-size:13px;line-height:1.72;color:#4A4F5C;margin-top:7px;max-width:95%}
.roadLine{
  position:absolute;bottom:0;left:24px;right:24px;height:2px;
  background:linear-gradient(90deg,transparent,rgba(201,149,107,0.3),transparent);border-radius:1px;
}

.infraSec{
  padding:54px 0;
  border-top:1px solid rgba(227,221,210,0.9);
  border-bottom:1px solid rgba(227,221,210,0.9);
  background:linear-gradient(180deg,rgba(255,255,255,0.44),rgba(255,255,255,0.08)),${c.bg};
  position:relative;
  overflow:hidden;
}
.infraIn{text-align:center}
.infraHead{display:flex;align-items:center;justify-content:center;gap:10px}
.infraEyebrow{
  width:28px;height:1px;background:linear-gradient(90deg,transparent,rgba(201,149,107,0.45),transparent);display:block;
}
.infraLbl{
  font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.14em;color:${c.muted};
}
.infraSub{
  max-width:440px;margin:10px auto 0;color:${c.sub};font-size:13px;line-height:1.75;
}
.infraTrackWrap{
  position:relative;
  overflow:hidden;
  width:100%;
  padding:22px 0 10px;
  margin-top:8px;
}
.infraTrack{
  display:flex;
  width:max-content;
  will-change:transform;
  animation:infraDrift 34s linear infinite;
}
.infraTrackWrap:hover .infraTrack{animation-play-state:paused}
.infraSet{
  display:flex;
  align-items:center;
  gap:44px;
  flex-shrink:0;
  padding-right:44px;
}
.infraItem{
  flex:0 0 auto;
  display:flex;
  align-items:center;
  justify-content:center;
  opacity:0.72;
  transition:opacity 0.28s ease,transform 0.28s ease,color 0.28s ease;
}

.infraItem:hover{
  opacity:1;
  transform:translateY(-1px);
}

.infraSvg{
  width:auto;
  height:26px;
  color:rgba(17,18,20,0.72);
  display:block;
  overflow:visible;
}

.infraRealLogo{
  display:flex;
  align-items:center;
  justify-content:center;
}

.infraRealLogoImg{
  display:block;
  height:28px;
  width:auto;
  max-width:140px;
  object-fit:contain;
}

.infraFade{
  position:absolute;
  top:0;
  bottom:0;
  width:88px;
  z-index:2;
  pointer-events:none;
}

.infraFadeL{
  left:0;
  background:linear-gradient(90deg,${c.bg} 10%,rgba(248,246,241,0) 100%);
}

.infraFadeR{
  right:0;
  background:linear-gradient(270deg,${c.bg} 10%,rgba(248,246,241,0) 100%);
}
.prGrid{display:grid;grid-template-columns:1fr;gap:14px;margin-top:36px}
.prCard{
  background:rgba(255,255,255,0.96);border:1px solid rgba(227,221,210,0.92);border-radius:24px;padding:32px;
  position:relative;transition:all 0.3s;display:flex;flex-direction:column;box-shadow:0 6px 22px rgba(17,18,20,0.03);
}
.prCard:hover{box-shadow:0 12px 36px rgba(17,18,20,0.06)}
.prCardDk{
  background:linear-gradient(180deg,#111318,#0D0F14)!important;border:1px solid ${c.borderDk}!important;color:#fff!important;
}
.prBg{
  position:absolute;top:14px;right:14px;border-radius:999px;padding:4px 10px;background:rgba(255,255,255,0.1);
  color:rgba(255,255,255,0.65);font-size:9px;font-weight:700;
}
.prNm{font-size:16px;font-weight:800}
.prPr{margin-top:10px}
.prAmt{font-size:clamp(24px,5vw,36px);letter-spacing:-0.04em}
.prPd2{font-size:12px;color:${c.muted};margin-top:3px}
.prCardDk .prPd2{color:rgba(255,255,255,0.35)}
.prDs{margin-top:10px;font-size:13.5px;line-height:1.72;color:${c.sub}}
.prCardDk .prDs{color:rgba(255,255,255,0.52)}
.prFts{display:flex;flex-direction:column;gap:7px;margin-top:18px;padding-top:18px;border-top:1px solid rgba(227,221,210,0.9);flex:1}
.prCardDk .prFts{border-top-color:rgba(255,255,255,0.08)}
.prFt{display:flex;align-items:flex-start;gap:6px;font-size:12.5px;line-height:1.5;color:${c.sub}}
.prCardDk .prFt{color:rgba(255,255,255,0.62)}
.prBt{margin-top:20px;width:100%}
.prBtW{background:#fff!important;color:${c.dark}!important}

.wlC{
  background:rgba(255,255,255,0.96);border:1px solid rgba(227,221,210,0.92);border-radius:24px;padding:28px;
  max-width:760px;margin:0 auto;box-shadow:0 6px 22px rgba(17,18,20,0.03);
}
.wlF{display:grid;grid-template-columns:1fr;gap:10px;margin-top:16px}
.wlBt{height:48px;width:100%}
.inp{
  width:100%;height:48px;border-radius:14px;border:1px solid rgba(227,221,210,0.92);background:#fff;padding:0 14px;
  font-size:14px;color:${c.text};outline:none;transition:all 0.2s;
}
.inp:focus{border-color:${c.accent};box-shadow:0 0 0 3px rgba(37,99,235,0.06)}
.pvL{
  display:flex;align-items:flex-start;gap:6px;margin-top:10px;color:${c.sub};font-size:11px;line-height:1.6;cursor:pointer;
  max-width:500px;margin-left:auto;margin-right:auto;
}
.pvC{margin-top:1px;width:14px;height:14px;accent-color:${c.accent};flex-shrink:0}
.pvLk{color:${c.text};font-weight:700;text-decoration:underline;text-underline-offset:2px}
.fmOk{
  margin-top:10px;background:${c.greenSoft};color:${c.greenDk};border-radius:12px;padding:12px;text-align:center;font-size:13px;font-weight:600;
}
.fmEr{
  margin-top:10px;background:#FFF7F7;color:#B91C1C;border-radius:12px;padding:12px;text-align:center;font-size:13px;font-weight:600;
}

.modO{
  position:fixed;inset:0;z-index:220;background:rgba(9,10,13,0.42);
  backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);
  display:flex;align-items:center;justify-content:center;padding:16px;
}
.modO::before{
  content:"";
  position:absolute;
  left:15%;
  top:20%;
  width:240px;
  height:240px;
  border-radius:999px;
  background:radial-gradient(circle, rgba(37,99,235,0.12), transparent 72%);
  filter:blur(16px);
}
.modO::after{
  content:"";
  position:absolute;
  right:12%;
  bottom:16%;
  width:220px;
  height:220px;
  border-radius:999px;
  background:radial-gradient(circle, rgba(201,149,107,0.11), transparent 72%);
  filter:blur(18px);
}
.modB{
  width:100%;
  max-width:460px;
  background:rgba(255,255,255,0.97);
  border:1px solid rgba(227,221,210,0.92);
  border-radius:30px;
  padding:26px;
  box-shadow:0 30px 70px rgba(0,0,0,0.18);
  position:relative;
  overflow:hidden;
  text-align:center;
}
.modHalo{
  position:absolute;
  border-radius:999px;
  pointer-events:none;
  filter:blur(20px);
}
.modHaloA{
  width:180px;height:180px;
  left:-40px;top:-34px;
  background:radial-gradient(circle, rgba(37,99,235,0.1), transparent 72%);
}
.modHaloB{
  width:150px;height:150px;
  right:-30px;bottom:-24px;
  background:radial-gradient(circle, rgba(201,149,107,0.09), transparent 72%);
}
.modPill{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  padding:6px 12px;
  border-radius:999px;
  background:rgba(37,99,235,0.06);
  border:1px solid rgba(37,99,235,0.1);
  color:${c.accent};
  font-size:10px;
  font-weight:800;
  letter-spacing:0.08em;
  text-transform:uppercase;
}
.modSealWrap{
  position:relative;
  margin:18px auto 0;
  width:max-content;
}
.modSealPulse{
  position:absolute;
  inset:-8px;
  border-radius:999px;
  background:radial-gradient(circle, rgba(37,99,235,0.08), transparent 72%);
}
.modTi{
  font-size:clamp(28px,5vw,40px);
  letter-spacing:-0.04em;
  margin-top:18px;
}
.modBd{
  margin:10px auto 0;
  color:${c.sub};
  font-size:14px;
  line-height:1.76;
  max-width:350px;
}
.modRef{
  margin-top:22px;
  padding:16px;
  border-radius:18px;
  background:rgba(248,250,255,0.86);
  border:1px solid rgba(217,226,244,0.85);
  backdrop-filter:blur(14px);
  -webkit-backdrop-filter:blur(14px);
}
.modRefHd{
  display:flex;
  align-items:flex-start;
  justify-content:space-between;
  gap:10px;
  text-align:left;
}
.modRefEyebrow{
  font-size:10px;
  font-weight:800;
  text-transform:uppercase;
  letter-spacing:0.08em;
  color:${c.muted};
}
.modRefTitle{
  font-size:14px;
  font-weight:800;
  color:${c.text};
  margin-top:4px;
}
.modRefTag{
  flex-shrink:0;
  padding:5px 10px;
  border-radius:999px;
  background:rgba(201,149,107,0.1);
  color:${c.warm};
  border:1px solid rgba(201,149,107,0.15);
  font-size:10px;
  font-weight:800;
}
.modRefBox{
  display:flex;
  align-items:center;
  gap:8px;
  background:#fff;
  border:1px solid rgba(227,221,210,0.92);
  border-radius:14px;
  padding:9px 10px;
  margin-top:14px;
}
.modRefUrl{
  flex:1;
  font-size:11px;
  color:${c.sub};
  font-weight:600;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  text-align:left;
}
.modRefCp{
  width:36px;height:36px;border-radius:10px;background:${c.accentSoft};
  border:1px solid rgba(37,99,235,0.1);color:${c.accent};
  display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;transition:all 0.2s;
}
.modRefCp:hover{background:rgba(37,99,235,0.12)}
.modRefBts{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:8px;
  margin-top:12px;
}
.modShareBtn{
  padding:12px 14px!important;
  font-size:12px!important;
}
.modXBtn{
  padding:12px 14px!important;
  font-size:12px!important;
}
.modClose{
  margin-top:16px;
  background:none;
  border:none;
  color:${c.muted};
  font-size:13px;
  font-weight:700;
  cursor:pointer;
  padding:6px 10px;
}

.ft{background:${c.dark};padding:36px 0 20px;color:#fff}
.ftTop{display:flex;flex-direction:column;gap:24px}
.ftBr{display:flex;align-items:center;gap:7px;text-decoration:none;color:#fff}
.ftLoW{background:rgba(255,255,255,0.12);border-radius:9px;padding:2px}
.ftBrN{font-size:13px;font-weight:800}
.ftBrS{font-size:8px;font-weight:800;letter-spacing:0.1em;color:${c.accent};margin-top:1px}
.ftCols{display:flex;gap:36px}
.ftCol{display:flex;flex-direction:column;gap:7px}
.ftColT{
  font-size:10px;font-weight:800;color:rgba(255,255,255,0.3);
  text-transform:uppercase;letter-spacing:0.1em;margin-bottom:3px;
}
.ftLk{font-size:12px;color:rgba(255,255,255,0.5);font-weight:500;transition:color 0.2s}
.ftLk:hover{color:#fff}
.ftDsc{
  margin-top:24px;padding:14px 0;border-top:1px solid rgba(255,255,255,0.06);
  font-size:11px;color:rgba(255,255,255,0.3);line-height:1.7;text-align:center;
}
.ftBtm{
  border-top:1px solid rgba(255,255,255,0.06);
  padding-top:14px;font-size:10px;color:rgba(255,255,255,0.2);text-align:center;
}

@media(min-width:640px){
  .container{padding:0 24px}
  .sec{padding:84px 0}
  .secDk{padding:84px 0}
  .secPr{padding:84px 0}
  .navR{height:64px}
  .navLks{display:flex}
  .heroBt{flex-direction:row}
  .heroBt .btnP,.heroBt .btnS{width:auto}
  .capGrid{grid-template-columns:repeat(3,1fr)}
  .baGrid{grid-template-columns:repeat(2,1fr)}
  .audGrid{grid-template-columns:repeat(3,1fr)}
  .prGrid{grid-template-columns:repeat(3,1fr)}
  .g2{grid-template-columns:repeat(2,1fr);gap:20px}
  .wlF{grid-template-columns:1.2fr 0.8fr auto}
  .wlBt{width:auto}
  .wlC{padding:32px}
  .ftTop{flex-direction:row;justify-content:space-between}
  .globeW{flex-direction:row;align-items:center;gap:36px}
  .globeV{max-width:360px;flex-shrink:0}
  .globeC{text-align:left}
  .globeCtry{justify-content:flex-start}
  .globeQ{text-align:left}
  .globeNm{text-align:left}
  .roadCard{min-width:300px}
}

@media(min-width:960px){
  .container{padding:0 36px}
  .sec{padding:96px 0}
  .secDk{padding:96px 0}
  .secPr{padding:96px 0}
  .navR{height:72px}
  .heroSec{padding:66px 0 34px}
  .heroSec .container{
    display:grid;
    grid-template-columns:1.02fr 0.98fr;
    gap:0 36px;
    align-items:start;
  }
  .heroTxt{grid-column:1}
  .heroPh{grid-column:2;margin-top:0;align-self:start}
  .globeV{max-width:390px}
  .heroStage{max-width:580px;min-height:640px}
  .infraTrack{animation-duration:42s}
}

@media(max-width:959px){
  .heroStage{
    max-width:420px;
    min-height:520px;
  }
  .heroRing{
    width:320px;
    height:320px;
  }
  .heroPlate{
    width:290px;
    height:360px;
    border-radius:34px;
  }
}

@media(max-width:640px){
  .navR{height:58px}
  .navNm{font-size:13px}
  .heroStage{
    min-height:430px;
    max-width:330px;
  }
  .heroRing{
    width:260px;
    height:260px;
  }
  .heroPlate{
    width:220px;
    height:300px;
    border-radius:28px;
  }
  .heroAuraA{width:220px;height:220px;right:30px;top:68px}
  .heroAuraB{width:200px;height:200px;left:40px;bottom:70px}
  .phW{max-width:236px}
  .phB{border-radius:30px}
  .phS{border-radius:27px}
  .phBdy{height:314px}
  .globeCtryN{letter-spacing:0.08em}
  .modB{padding:22px}
  .modRefHd{flex-direction:column;align-items:flex-start}
  .modRefBts{grid-template-columns:1fr}
  .infraSet{gap:28px;padding-right:28px}
  .infraSvg{height:22px}

 .infraRealLogoImg{
    height:24px;
    max-width:120px;
  }
}

@media (prefers-reduced-motion: reduce){
  .infraTrack{animation:none}
}
`;