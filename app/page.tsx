"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import {
  ArrowRight,
  Bell,
  Building2,
  Check,
  CheckCircle2,
  Copy,
  FileText,
  Globe,
  Package,
  RefreshCw,
  Share2,
  Users,
} from "lucide-react";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
});

const c = {
  bg: "#F8F6F1",
  card: "#FFFFFF",
  cream: "#FAF7F2",
  dark: "#08090C",
  text: "#111214",
  sub: "#4A4F5C",
  muted: "#888E9C",
  accent: "#2563EB",
  accentSoft: "#ECF2FF",
  border: "#E3DDD2",
  borderSoft: "#EDE8DF",
  green: "#22C55E",
  greenSoft: "#ECFDF3",
  greenDk: "#15803D",
  warm: "#C9956B",
  warmDk: "#A07545",
  warmSoft: "#FFF8F0",
  red: "#EF4444",
};

type Role = "carer" | "household" | "care_team";

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
  const visible = useInView(ref, { once: true, amount: 0.08 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Overline({
  children,
  tone = "default",
  className = "",
}: {
  children: ReactNode;
  tone?: "default" | "warm" | "blue" | "green";
  className?: string;
}) {
  return (
    <span className={`overline overline--${tone} ${className}`.trim()}>
      {children}
    </span>
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
    typeof window !== "undefined" && referralCode
      ? `${window.location.origin}?ref=${referralCode}`
      : "";

  async function copyLink() {
    if (!link) return;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  async function shareLink() {
    if (!link) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Laura early access",
          text: "Join Laura early access",
          url: link,
        });
      } catch {
        return;
      }
    } else {
      await copyLink();
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modO"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modB"
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ type: "spring", damping: 22, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modSeal">
              <CheckCircle2 size={22} />
            </div>
            <h3 className="serif modTi">You&apos;re on the list.</h3>
            <p className="modBd">
              We&apos;ll be in touch as Laura opens up, starting with carers,
              households, and selected care teams in the UK.
            </p>

            {referralCode ? (
              <div className="modRef">
                <p className="modRefLbl">Share with a family member or care team</p>
                <div className="modRefBox">
                  <span className="modRefUrl">
                    {link.replace("https://", "").replace("http://", "")}
                  </span>
                  <button onClick={copyLink} className="modRefCp" type="button">
                    {copied ? <Check size={13} /> : <Copy size={13} />}
                  </button>
                </div>
                <div className="modRefBts">
                  <button
                    onClick={shareLink}
                    className="btnP modShareBtn"
                    type="button"
                  >
                    <Share2 size={13} />
                    Share
                  </button>
                </div>
              </div>
            ) : null}

            <button type="button" className="modClose" onClick={onClose}>
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────────────
   Laura workspace — detail-first layout
   Left: compact people list with initial avatars
   Right: rich detail card for the selected person (cream, not dark)
   ───────────────────────────────────────────────────────────── */
function LauraWorkspace() {
  type Step = {
    state: "done" | "active";
    label: string;
    meta: string;
  };

  type Person = {
    initials: string;
    name: string;
    med: string;
    tone: "warm" | "blue" | "green";
    owner: string;
    status: string;
    statusSub: string;
    timeline: Step[];
    next: string;
  };

  const people: Person[] = [
    {
      initials: "ML",
      name: "Margaret Littlewood",
      med: "Amlodipine 5mg",
      tone: "warm",
      owner: "Ada, daughter",
      status: "Needs follow-up",
      statusSub: "No update from practice in 3 days",
      timeline: [
        { state: "done", label: "Request prepared", meta: "Mon" },
        { state: "done", label: "Sent to practice", meta: "Tue" },
        { state: "active", label: "Waiting on response", meta: "3 days" },
      ],
      next: "Ada to call the practice before 4pm today.",
    },
    {
      initials: "DR",
      name: "David Reyes",
      med: "Metformin 500mg",
      tone: "blue",
      owner: "Laura",
      status: "Request sent",
      statusSub: "Pharmacy processing",
      timeline: [
        { state: "done", label: "Draft prepared", meta: "Tue" },
        { state: "done", label: "Sent to pharmacy", meta: "Wed" },
        { state: "active", label: "Awaiting confirmation", meta: "today" },
      ],
      next: "No action needed. Laura will alert on any change.",
    },
    {
      initials: "IK",
      name: "Irene Kowalski",
      med: "Sertraline 50mg",
      tone: "green",
      owner: "Support worker",
      status: "Ready to collect",
      statusSub: "Boots, 12 High Street",
      timeline: [
        { state: "done", label: "Draft prepared", meta: "Fri" },
        { state: "done", label: "Sent to practice", meta: "Mon" },
        { state: "done", label: "Ready at pharmacy", meta: "today" },
      ],
      next: "Collection window open until 6pm.",
    },
  ];

  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((p) => (p + 1) % people.length);
    }, 3800);
    return () => window.clearInterval(timer);
  }, [people.length]);

  const current = people[active];

  return (
    <div className="wsWrap">
      <motion.div
        className="wsGlow"
        animate={{ opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <div className="wsShell">
        <div className="wsHead">
          <div className="wsBrand">
            <div className="wsMark">
              <Image
                src="/omela-logo-mark.png"
                alt=""
                width={22}
                height={22}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
            <div className="wsBrandTx">
              <div className="wsName serif">Laura</div>
              <div className="wsBy">by Omela</div>
            </div>
          </div>

          <div className="wsHeadMeta">
            <span className="wsHeadMetaLbl">Today</span>
            <span className="wsHeadMetaVal">Tue, 7 Apr</span>
          </div>
        </div>

        <div className="wsBody">
          <div className="wsList">
            <div className="wsListHd">
              <span>People</span>
              <span className="wsListCt">{people.length}</span>
            </div>

            {people.map((p, i) => {
              const isActive = i === active;
              return (
                <button
                  key={p.initials}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`wsRow ${isActive ? "wsRowA" : ""}`}
                >
                  <div className={`wsAv wsAv--${p.tone}`}>{p.initials}</div>
                  <div className="wsRowTx">
                    <div className="wsRowNm">{p.name}</div>
                    <div className="wsRowMd">{p.med}</div>
                    <div className={`wsRowSt wsRowSt--${p.tone}`}>
                      {p.status}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="wsDetail">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.initials}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="wsDtHd">
                  <div className={`wsAv wsAvLg wsAv--${current.tone}`}>
                    {current.initials}
                  </div>
                  <div className="wsDtHdTx">
                    <div className="wsDtNm">{current.name}</div>
                    <div className="wsDtMd">{current.med}</div>
                  </div>
                </div>

                <div className="wsDtMeta">
                  <div className="wsDtMetaRow">
                    <span className="wsDtMetaLbl">Status</span>
                    <span className={`wsDtMetaVal wsDtMetaVal--${current.tone}`}>
                      {current.status}
                    </span>
                  </div>
                  <div className="wsDtMetaRow">
                    <span className="wsDtMetaLbl">Owner</span>
                    <span className="wsDtMetaVal">{current.owner}</span>
                  </div>
                  <div className="wsDtMetaRow">
                    <span className="wsDtMetaLbl">Detail</span>
                    <span className="wsDtMetaVal wsDtMetaValSub">
                      {current.statusSub}
                    </span>
                  </div>
                </div>

                <div className="wsDtTl">
                  <div className="wsDtTlHd">Timeline</div>
                  <div className="wsDtTlList">
                    {current.timeline.map((step, i) => (
                      <div
                        key={`${current.initials}-${i}`}
                        className={`wsTlStep wsTlStep--${step.state}`}
                      >
                        <div className="wsTlMark">
                          {step.state === "done" ? (
                            <Check size={11} strokeWidth={3} />
                          ) : (
                            <span className="wsTlPulse" />
                          )}
                        </div>
                        <span className="wsTlLbl">{step.label}</span>
                        <span className="wsTlMeta">{step.meta}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="wsDtNext">
                  <div className="wsDtNextLbl">Next</div>
                  <div className="wsDtNextTx">{current.next}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   HomeScene — illustrated "helping a parent" scene
   (kept; minor caption refinements)
   ───────────────────────────────────────────────────────────── */
function HomeScene() {
  const captions = [
    "Laura quietly keeps track before supply becomes urgent.",
    "A reminder arrives before anyone starts chasing.",
    "The next request is prepared and easy to review.",
    "Parent and carer can both see what is happening.",
    "The request is confirmed and nothing is dropped.",
  ];

  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setStep((s) => (s + 1) % 5);
    }, 2200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="sceneWrap">
      <svg
        viewBox="0 0 480 300"
        className="sceneSvg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0" y="0" width="480" height="300" fill="#FAF7F2" rx="20" />
        <rect x="0" y="0" width="480" height="195" fill="#F2EDE4" rx="20" />
        <rect x="0" y="188" width="480" height="7" fill="#E8E0D5" />
        <rect x="0" y="195" width="480" height="105" fill="#EDE8DF" />
        {[210, 240, 270].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="480"
            y2={y}
            stroke="#E3DDD2"
            strokeWidth="0.6"
          />
        ))}
        {[80, 160, 240, 320, 400].map((x) => (
          <line
            key={x}
            x1={x}
            y1="195"
            x2={x}
            y2="300"
            stroke="#E3DDD2"
            strokeWidth="0.6"
          />
        ))}

        <rect
          x="170"
          y="18"
          width="140"
          height="110"
          rx="6"
          fill="#D8EDF5"
          stroke="#C8D8E5"
          strokeWidth="1.5"
        />
        <line x1="240" y1="18" x2="240" y2="128" stroke="#C8D8E5" strokeWidth="1" />
        <line x1="170" y1="73" x2="310" y2="73" stroke="#C8D8E5" strokeWidth="1" />
        <rect x="171" y="19" width="138" height="108" rx="5" fill="url(#winGlow)" />
        <defs>
          <linearGradient id="winGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8F4FC" />
            <stop offset="100%" stopColor="#C8E8F8" />
          </linearGradient>
        </defs>
        <path d="M170,18 Q158,60 163,128 L170,128 Z" fill="#D4CCBC" opacity="0.6" />
        <path d="M310,18 Q322,60 317,128 L310,128 Z" fill="#D4CCBC" opacity="0.6" />
        <circle cx="220" cy="50" r="14" fill="#F5D78A" opacity="0.5" />
        <ellipse cx="270" cy="42" rx="18" ry="9" fill="#fff" opacity="0.6" />
        <ellipse cx="284" cy="38" rx="12" ry="8" fill="#fff" opacity="0.6" />

        <rect
          x="36"
          y="28"
          width="72"
          height="54"
          rx="3"
          fill="#E8E0D0"
          stroke="#D8D0C0"
          strokeWidth="1.2"
        />
        <ellipse cx="72" cy="55" rx="18" ry="14" fill="#C4B898" opacity="0.6" />
        <path d="M54,68 Q72,44 90,68" fill="#B8C8A8" opacity="0.5" />

        <rect x="28" y="175" width="70" height="8" rx="3" fill="#C4B090" />
        <rect x="38" y="183" width="8" height="17" rx="2" fill="#B8A880" />
        <rect x="52" y="183" width="8" height="17" rx="2" fill="#B8A880" />
        <rect x="32" y="158" width="14" height="18" rx="3" fill="#C9956B" opacity="0.85" />
        <rect x="33" y="155" width="12" height="5" rx="1.5" fill="#B8844A" opacity="0.85" />
        <rect x="50" y="160" width="12" height="16" rx="3" fill="#7EA8D4" opacity="0.85" />
        <rect x="51" y="157" width="10" height="5" rx="1.5" fill="#5E88B4" opacity="0.85" />
        <rect x="66" y="163" width="10" height="13" rx="2.5" fill="#A8C890" opacity="0.85" />
        <rect x="34" y="163" width="10" height="1.5" rx="1" fill="rgba(255,255,255,0.5)" />
        <rect x="34" y="166" width="8" height="1.5" rx="1" fill="rgba(255,255,255,0.5)" />

        <rect x="300" y="162" width="120" height="38" rx="10" fill="#C9B898" />
        <rect x="308" y="168" width="104" height="28" rx="7" fill="#D4C4A8" />
        <rect x="300" y="130" width="120" height="36" rx="10" fill="#C9B898" />
        <rect x="308" y="135" width="104" height="28" rx="6" fill="#D4C4A8" />
        <rect x="296" y="148" width="18" height="38" rx="6" fill="#BEA888" />
        <rect x="406" y="148" width="18" height="38" rx="6" fill="#BEA888" />
        <rect x="308" y="196" width="8" height="14" rx="3" fill="#A89070" />
        <rect x="404" y="196" width="8" height="14" rx="3" fill="#A89070" />

        <rect x="334" y="148" width="52" height="42" rx="12" fill="#E8D8C4" />
        <rect x="334" y="158" width="52" height="32" rx="10" fill="#B8A888" opacity="0.7" />
        <circle cx="360" cy="135" r="20" fill="#E8D4B8" />
        <path d="M340,130 Q342,112 360,112 Q378,112 380,130" fill="#E8E4DC" />
        <path
          d="M340,128 Q338,120 344,116"
          stroke="#D8D4CC"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M380,128 Q382,120 376,116"
          stroke="#D8D4CC"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="353" cy="135" r="6" fill="none" stroke="#8A7A6A" strokeWidth="1.2" />
        <circle cx="367" cy="135" r="6" fill="none" stroke="#8A7A6A" strokeWidth="1.2" />
        <line x1="359" y1="135" x2="361" y2="135" stroke="#8A7A6A" strokeWidth="1" />
        <line x1="347" y1="135" x2="343" y2="134" stroke="#8A7A6A" strokeWidth="1" />
        <line x1="373" y1="135" x2="377" y2="134" stroke="#8A7A6A" strokeWidth="1" />
        <circle cx="353" cy="135" r="2.5" fill="#5A4A3A" />
        <circle cx="367" cy="135" r="2.5" fill="#5A4A3A" />
        {step >= 3 ? (
          <path
            d="M354,143 Q360,149 366,143"
            stroke="#8A6A5A"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        ) : (
          <line
            x1="355"
            y1="143"
            x2="365"
            y2="143"
            stroke="#8A6A5A"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        )}
        <path
          d="M334,168 Q322,172 318,182"
          stroke="#E8D4B8"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M386,168 Q398,172 402,180"
          stroke="#E8D4B8"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
        />

        <rect x="50" y="165" width="180" height="35" rx="10" fill="#A8B8C8" />
        <rect x="58" y="171" width="164" height="26" rx="7" fill="#B8C8D8" />
        <rect x="50" y="140" width="180" height="30" rx="10" fill="#A8B8C8" />
        <rect x="58" y="145" width="164" height="24" rx="6" fill="#B8C8D8" />
        <rect x="46" y="150" width="16" height="36" rx="6" fill="#98A8B8" />
        <rect x="218" y="150" width="16" height="36" rx="6" fill="#98A8B8" />
        <rect x="60" y="196" width="8" height="14" rx="3" fill="#7A8898" />
        <rect x="212" y="196" width="8" height="14" rx="3" fill="#7A8898" />

        <rect x="102" y="143" width="56" height="44" rx="12" fill="#7A9CB8" />
        <circle cx="130" cy="126" r="22" fill="#E8C8A8" />
        <path d="M108,120 Q110,100 130,98 Q150,100 152,120" fill="#3A3028" />
        <circle cx="123" cy="125" r="2.5" fill="#2A2018" />
        <circle cx="137" cy="125" r="2.5" fill="#2A2018" />
        <path
          d="M124,133 Q130,138 136,133"
          stroke="#8A6A5A"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M102,157 Q88,162 82,172"
          stroke="#E8C8A8"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M158,157 Q172,165 176,172"
          stroke="#E8C8A8"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
        />

        <motion.g
          animate={{
            rotate: step >= 2 ? 18 : 0,
            x: step >= 2 ? 30 : 0,
            y: step >= 2 ? -8 : 0,
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "82px 172px" }}
        >
          <rect x="68" y="163" width="28" height="48" rx="5" fill="#1A1A1E" />
          <rect x="70" y="166" width="24" height="42" rx="3.5" fill="#F8F6F2" />
          <rect x="78" y="165" width="12" height="3" rx="1.5" fill="#111" />
          <rect
            x="72"
            y="170"
            width="20"
            height="3"
            rx="1.5"
            fill={step === 0 ? "#D8D4CC" : "#ECF2FF"}
          />
          <rect
            x="72"
            y="175"
            width="14"
            height="2.5"
            rx="1"
            fill={step === 0 ? "#E4E0D8" : "#BDD0F8"}
          />
          <rect
            x="72"
            y="179"
            width="16"
            height="2.5"
            rx="1"
            fill={step === 0 ? "#E4E0D8" : "#BDD0F8"}
          />
          {step >= 1 && (
            <motion.circle
              cx="91"
              cy="168"
              r="4"
              fill="#EF4444"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
            />
          )}
          {step >= 1 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <circle cx="82" cy="185" r="5" fill="#C9956B" opacity="0.9" />
              <rect x="76" y="192" width="12" height="9" rx="2" fill="#ECF2FF" />
              <rect
                x="77"
                y="193.5"
                width="10"
                height="1.5"
                rx="0.75"
                fill="#2563EB"
                opacity="0.8"
              />
              <rect
                x="77"
                y="196"
                width="7"
                height="1.5"
                rx="0.75"
                fill="#2563EB"
                opacity="0.5"
              />
            </motion.g>
          )}
        </motion.g>

        <AnimatePresence>
          {step === 1 && (
            <motion.g
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <rect
                x="96"
                y="82"
                width="148"
                height="54"
                rx="12"
                fill="#fff"
                filter="url(#notifShadow)"
              />
              <rect
                x="96"
                y="82"
                width="148"
                height="54"
                rx="12"
                fill="none"
                stroke="#E3DDD2"
                strokeWidth="1"
              />
              <circle cx="115" cy="97" r="8" fill="#C9956B" opacity="0.9" />
              <circle cx="115" cy="94" r="3.5" fill="#E8D4B8" />
              <path
                d="M109,100 Q115,104 121,100"
                stroke="#E8D4B8"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
              <rect x="128" y="91" width="56" height="4" rx="2" fill="#111214" />
              <rect
                x="128"
                y="97"
                width="72"
                height="3.5"
                rx="1.75"
                fill="#888E9C"
              />
              <rect
                x="128"
                y="102"
                width="60"
                height="3.5"
                rx="1.75"
                fill="#888E9C"
              />
              <rect
                x="128"
                y="116"
                width="48"
                height="14"
                rx="7"
                fill="#FFF8F0"
                stroke="rgba(201,149,107,0.2)"
                strokeWidth="1"
              />
              <rect x="134" y="121" width="36" height="3" rx="1.5" fill="#C9956B" />
              <defs>
                <filter
                  id="notifShadow"
                  x="-10%"
                  y="-10%"
                  width="120%"
                  height="140%"
                >
                  <feDropShadow
                    dx="0"
                    dy="4"
                    stdDeviation="8"
                    floodColor="rgba(0,0,0,0.08)"
                  />
                </filter>
              </defs>
            </motion.g>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step >= 2 && step <= 3 && (
            <motion.g
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <rect
                x="220"
                y="96"
                width="140"
                height="62"
                rx="12"
                fill="#ECF2FF"
                stroke="rgba(37,99,235,0.15)"
                strokeWidth="1"
              />
              <path d="M310,158 L322,168 L330,158" fill="#ECF2FF" />
              <rect
                x="232"
                y="107"
                width="80"
                height="4"
                rx="2"
                fill="#1E40AF"
                opacity="0.8"
              />
              <rect
                x="232"
                y="113"
                width="112"
                height="3.5"
                rx="1.75"
                fill="#3B82F6"
                opacity="0.6"
              />
              <rect
                x="232"
                y="119"
                width="96"
                height="3.5"
                rx="1.75"
                fill="#3B82F6"
                opacity="0.6"
              />
              <rect
                x="232"
                y="128"
                width="116"
                height="18"
                rx="6"
                fill="rgba(37,99,235,0.06)"
                stroke="rgba(37,99,235,0.1)"
                strokeWidth="1"
              />
              <rect
                x="240"
                y="133"
                width="10"
                height="8"
                rx="2"
                fill="#C9956B"
                opacity="0.8"
              />
              <rect
                x="254"
                y="134"
                width="68"
                height="3.5"
                rx="1.75"
                fill="#C9956B"
                opacity="0.7"
              />
              <rect
                x="254"
                y="139"
                width="48"
                height="3"
                rx="1.5"
                fill="#888E9C"
                opacity="0.7"
              />
            </motion.g>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step === 4 && (
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <circle
                cx="360"
                cy="90"
                r="22"
                fill="#ECFDF3"
                stroke="rgba(34,197,94,0.25)"
                strokeWidth="1.5"
              />
              <motion.path
                d="M349,90 L357,98 L371,82"
                stroke="#15803D"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              />
              <rect
                x="258"
                y="78"
                width="84"
                height="24"
                rx="8"
                fill="#fff"
                stroke="#E3DDD2"
                strokeWidth="1"
              />
              <rect
                x="266"
                y="85"
                width="68"
                height="3.5"
                rx="1.75"
                fill="#15803D"
                opacity="0.8"
              />
              <rect
                x="266"
                y="91"
                width="50"
                height="3"
                rx="1.5"
                fill="#888E9C"
                opacity="0.7"
              />
            </motion.g>
          )}
        </AnimatePresence>

        <ellipse cx="240" cy="225" rx="130" ry="26" fill="#D4C8B4" opacity="0.4" />
        <ellipse
          cx="240"
          cy="225"
          rx="116"
          ry="20"
          fill="none"
          stroke="#C8BCA8"
          strokeWidth="1"
          opacity="0.4"
        />
      </svg>

      <div className="sceneCap">
        <AnimatePresence mode="wait">
          <motion.span
            key={step}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3 }}
          >
            {captions[step]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CareHomeScene — care team illustrated scene
   ───────────────────────────────────────────────────────────── */
function CareHomeScene() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setTick((p) => p + 1), 2600);
    return () => window.clearInterval(timer);
  }, []);

  const residents = [
    {
      name: "Evelyn",
      col: "#C9956B",
      statuses: ["3 days left", "Request sent", "GP approved", "Ready"],
      medCol: ["#FFFBEB", "#FFF8F0", "#ECF2FF", "#ECFDF3"],
      textCol: ["#D97706", "#C9956B", "#2563EB", "#15803D"],
    },
    {
      name: "Bernard",
      col: "#7EA8D4",
      statuses: ["5 days left", "Draft ready", "Submitted", "In review"],
      medCol: ["#ECFDF3", "#FFF8F0", "#FFF8F0", "#ECF2FF"],
      textCol: ["#15803D", "#C9956B", "#C9956B", "#2563EB"],
    },
    {
      name: "Irene",
      col: "#A8C890",
      statuses: ["7 days left", "7 days left", "Request sent", "Ready"],
      medCol: ["#ECFDF3", "#ECFDF3", "#FFF8F0", "#ECFDF3"],
      textCol: ["#15803D", "#15803D", "#C9956B", "#15803D"],
    },
  ] as const;

  return (
    <div className="sceneWrap">
      <svg
        viewBox="0 0 480 300"
        className="sceneSvg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0" y="0" width="480" height="300" fill="#FAF7F2" rx="20" />
        <rect x="0" y="0" width="480" height="185" fill="#F0EBE2" rx="20" />
        <rect x="0" y="178" width="480" height="7" fill="#E4DDD4" />
        <rect x="0" y="185" width="480" height="115" fill="#EDE8DF" />
        {[200, 230, 260].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="480"
            y2={y}
            stroke="#E3DDD2"
            strokeWidth="0.5"
          />
        ))}

        <rect
          x="14"
          y="18"
          width="88"
          height="68"
          rx="4"
          fill="#E8D8B8"
          stroke="#D4C4A4"
          strokeWidth="1"
        />
        <rect x="20" y="24" width="76" height="10" rx="2" fill="#C9956B" opacity="0.6" />
        <rect x="22" y="38" width="40" height="3" rx="1.5" fill="#A89070" opacity="0.7" />
        <rect x="22" y="44" width="56" height="3" rx="1.5" fill="#A89070" opacity="0.5" />
        <rect x="22" y="50" width="48" height="3" rx="1.5" fill="#A89070" opacity="0.5" />
        <rect x="22" y="56" width="52" height="3" rx="1.5" fill="#A89070" opacity="0.5" />
        <rect x="22" y="62" width="36" height="3" rx="1.5" fill="#A89070" opacity="0.5" />
        <circle cx="58" cy="19" r="3" fill="#A89070" opacity="0.6" />

        <rect
          x="380"
          y="14"
          width="88"
          height="72"
          rx="6"
          fill="#D8EDF5"
          stroke="#C8D8E5"
          strokeWidth="1.2"
        />
        <line x1="424" y1="14" x2="424" y2="86" stroke="#C8D8E5" strokeWidth="0.8" />
        <line x1="380" y1="50" x2="468" y2="50" stroke="#C8D8E5" strokeWidth="0.8" />
        <circle cx="400" cy="34" r="9" fill="#F5D78A" opacity="0.5" />

        <rect x="40" y="185" width="400" height="10" rx="4" fill="#BEB098" />
        <rect x="50" y="195" width="14" height="30" rx="3" fill="#A89878" />
        <rect x="416" y="195" width="14" height="30" rx="3" fill="#A89878" />

        {[78, 228, 378].map((x, i) => (
          <g key={i}>
            <rect x={x} y="152" width="44" height="32" rx="8" fill="#C4B8A4" />
            <rect x={x + 4} y="157" width="36" height="24" rx="5" fill="#D4C8B4" />
          </g>
        ))}

        {residents.map((r, i) => {
          const bx = [78, 228, 378][i];
          return (
            <g key={r.name}>
              <rect
                x={bx + 4}
                y="157"
                width="36"
                height="28"
                rx="8"
                fill={["#D4C4B0", "#B8C8D8", "#C4D4B8"][i]}
              />
              <circle
                cx={bx + 22}
                cy="144"
                r="16"
                fill={["#E8C8A8", "#D4B898", "#E0CAAC"][i]}
              />
              {i === 0 && (
                <path
                  d={`M${bx + 6},138 Q${bx + 8},125 ${bx + 22},124 Q${bx + 36},125 ${bx + 38},138`}
                  fill="#E8E4DC"
                />
              )}
              {i === 1 && (
                <path
                  d={`M${bx + 8},136 Q${bx + 10},126 ${bx + 22},125 Q${bx + 34},126 ${bx + 36},136`}
                  fill="#3A3028"
                />
              )}
              {i === 2 && (
                <path
                  d={`M${bx + 7},137 Q${bx + 9},126 ${bx + 22},125 Q${bx + 35},126 ${bx + 37},137`}
                  fill="#7A6858"
                />
              )}
              {i === 0 && (
                <>
                  <circle
                    cx={bx + 17}
                    cy="145"
                    r="4.5"
                    fill="none"
                    stroke="#8A7A6A"
                    strokeWidth="0.9"
                  />
                  <circle
                    cx={bx + 27}
                    cy="145"
                    r="4.5"
                    fill="none"
                    stroke="#8A7A6A"
                    strokeWidth="0.9"
                  />
                  <line
                    x1={bx + 21.5}
                    y1="145"
                    x2={bx + 22.5}
                    y2="145"
                    stroke="#8A7A6A"
                    strokeWidth="0.8"
                  />
                </>
              )}
              <circle cx={bx + 17} cy="145" r="1.8" fill="#2A2018" />
              <circle cx={bx + 27} cy="145" r="1.8" fill="#2A2018" />
              <path
                d={`M${bx + 16},151 Q${bx + 22},155 ${bx + 28},151`}
                stroke="#8A6A5A"
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d={`M${bx + 8},170 Q${bx + 4},180 ${bx + 8},185`}
                stroke={["#E8C8A8", "#D4B898", "#E0CAAC"][i]}
                strokeWidth="9"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d={`M${bx + 36},170 Q${bx + 40},180 ${bx + 36},185`}
                stroke={["#E8C8A8", "#D4B898", "#E0CAAC"][i]}
                strokeWidth="9"
                strokeLinecap="round"
                fill="none"
              />
              <rect
                x={bx + 14}
                y="182"
                width="16"
                height="12"
                rx="3"
                fill={["#F0C890", "#90B8D0", "#A8C890"][i]}
                opacity="0.6"
              />
              <path
                d={`M${bx + 30},184 Q${bx + 34},188 ${bx + 30},192`}
                stroke={["#E0B870", "#7A9EC0", "#90B870"][i]}
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                opacity="0.6"
              />
            </g>
          );
        })}

        <rect x="424" y="168" width="38" height="36" rx="10" fill="#8888B8" />
        <rect x="432" y="175" width="12" height="16" rx="2" fill="#fff" opacity="0.8" />
        <rect x="433" y="177" width="10" height="2" rx="1" fill="#8888B8" opacity="0.6" />
        <circle cx="443" cy="154" r="17" fill="#DDB898" />
        <path d="M426,148 Q428,135 443,133 Q458,135 460,148" fill="#2A3048" />
        <circle cx="437" cy="154" r="2" fill="#2A2018" />
        <circle cx="449" cy="154" r="2" fill="#2A2018" />
        <path
          d="M438,161 Q443,165 448,161"
          stroke="#8A6A5A"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M424,178 Q414,188 412,196"
          stroke="#DDB898"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M462,178 Q466,184 462,196"
          stroke="#DDB898"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />
        <rect x="408" y="192" width="52" height="36" rx="5" fill="#1A1A1E" />
        <rect x="410" y="194" width="48" height="32" rx="3.5" fill="#F0EDF8" />
        <rect x="414" y="198" width="28" height="3" rx="1.5" fill="#2563EB" opacity="0.8" />
        {residents.map((r, i) => (
          <motion.g
            key={r.name}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.3 }}
          >
            <rect
              x="414"
              y={204 + i * 7}
              width="5"
              height="5"
              rx="1"
              fill={r.col}
              opacity="0.8"
            />
            <rect
              x="421"
              y={205 + i * 7}
              width="28"
              height="3"
              rx="1.5"
              fill="#888E9C"
              opacity="0.7"
            />
          </motion.g>
        ))}

        {residents.map((r, i) => {
          const si = tick % r.statuses.length;
          const bx = [78, 228, 378][i];
          return (
            <motion.g
              key={`card-${r.name}`}
              animate={{ y: [0, -3, 0] }}
              transition={{
                duration: 3 + i * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.g
                  key={`${r.name}-${si}`}
                  initial={{ opacity: 0, y: 6, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <rect
                    x={bx - 14}
                    y="50"
                    width="72"
                    height="56"
                    rx="10"
                    fill="#fff"
                    style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.07))" }}
                  />
                  <rect
                    x={bx - 14}
                    y="50"
                    width="72"
                    height="56"
                    rx="10"
                    fill="none"
                    stroke="#E3DDD2"
                    strokeWidth="0.8"
                  />
                  <line
                    x1={bx + 22}
                    y1="106"
                    x2={bx + 22}
                    y2="127"
                    stroke="#D4CCC0"
                    strokeWidth="1"
                    strokeDasharray="3 2"
                  />
                  <circle cx={bx - 2} cy="64" r="7" fill={r.medCol[si]} />
                  <rect
                    x={bx - 5.5}
                    y="61"
                    width="7"
                    height="6"
                    rx="1.5"
                    fill={r.textCol[si]}
                    opacity="0.7"
                  />
                  <rect
                    x={bx + 8}
                    y="61"
                    width="36"
                    height="3.5"
                    rx="1.75"
                    fill="#111214"
                    opacity="0.7"
                  />
                  <rect
                    x={bx - 10}
                    y="72"
                    width="60"
                    height="3"
                    rx="1.5"
                    fill="#888E9C"
                    opacity="0.6"
                  />
                  <rect
                    x={bx - 10}
                    y="79"
                    width="62"
                    height="20"
                    rx="6"
                    fill={r.medCol[si]}
                    stroke="rgba(17,18,20,0.05)"
                    strokeWidth="0.8"
                  />
                  <rect
                    x={bx - 4}
                    y="86"
                    width="42"
                    height="3.5"
                    rx="1.75"
                    fill={r.textCol[si]}
                    opacity="0.8"
                  />
                </motion.g>
              </AnimatePresence>
            </motion.g>
          );
        })}

        <rect
          x="196"
          y="186"
          width="88"
          height="52"
          rx="8"
          fill="#fff"
          stroke="#E3DDD2"
          strokeWidth="1"
          opacity="0.9"
        />
        <rect x="200" y="191" width="40" height="4" rx="2" fill="#2563EB" opacity="0.7" />
        <rect x="200" y="197" width="78" height="3" rx="1.5" fill="#888E9C" opacity="0.5" />
        <rect x="200" y="203" width="62" height="3" rx="1.5" fill="#888E9C" opacity="0.5" />
        <rect x="200" y="211" width="76" height="6" rx="3" fill="#F2EDE4" />
        <motion.rect
          x="200"
          y="211"
          height="6"
          rx="3"
          fill="#22C55E"
          animate={{ width: [20, 56, 20] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <circle cx="267" cy="194" r="4.5" fill="#C9956B" opacity="0.7" />
      </svg>

      <div className="sceneCap">
        <AnimatePresence mode="wait">
          <motion.span
            key={tick % 4}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {
              [
                "Every resident stays visible in one place.",
                "Drafts are prepared before supply becomes urgent.",
                "Staff can see status across residents at a glance.",
                "Less switching, less calling, less uncertainty.",
              ][tick % 4]
            }
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Page() {
  const [role, setRole] = useState<Role>("carer");
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
      setRole("carer");
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
      <style>{CSS}</style>
      <SuccessModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        referralCode={referralCode}
      />

      <div className={`${dmSans.variable} ${instrumentSerif.variable} wrap`}>
        <motion.nav
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="nav"
        >
          <div className="container navR">
            <Link href="/" className="navBr">
              <div className="navLo">
                <Image
                  src="/omela-logo-mark.png"
                  alt="Laura"
                  width={34}
                  height={34}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>
              <div className="navBrTx">
                <span className="navNm serif">Laura</span>
                <span className="navBy">by Omela</span>
              </div>
            </Link>

            <div className="navLks">
              <a href="#how" className="navLk">
                How it works
              </a>
              <a href="#who" className="navLk">
                Who it helps
              </a>
              <a href="#waitlist" className="navLk">
                Early access
              </a>
            </div>

            <div className="navRight">
              <Link href="/login" className="navSignIn">
                Sign in
              </Link>
              <a href="#waitlist" className="btnP navCt">
                Join early access
                <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </motion.nav>

        <section className="heroSec">
          <div className="container heroGrid">
            <div className="heroTxt">
              <FI delay={0.04}>
                <Overline tone="warm">Laura &mdash; by Omela</Overline>
              </FI>

              <FI delay={0.08}>
                <h1 className="serif heroTi">
                  Coordinate repeat prescriptions
                  <br />
                  <span className="heroAc">without the chasing.</span>
                </h1>
              </FI>

              <FI delay={0.12}>
                <p className="heroSub">
                  Laura helps carers and care teams stay on top of medication
                  admin across multiple people. Shared visibility, clearer
                  ownership, and calmer follow-through.
                </p>
              </FI>

              <FI delay={0.16}>
                <p className="heroCredLine">
                  See who handled it last, who owns it now, and what happens next.
                </p>
              </FI>

              <FI delay={0.2}>
                <div className="heroBt">
                  <a href="#waitlist" className="btnP">
                    Join early access
                    <ArrowRight size={14} />
                  </a>
                  <a href="#how" className="btnS">
                    See how Laura works
                  </a>
                </div>
              </FI>
            </div>

            <FI delay={0.14} className="heroBoardCol">
              <LauraWorkspace />
            </FI>
          </div>
        </section>

        <section className="sec secTight">
          <div className="container">
            <FI>
              <div className="problemStrip">
                {[
                  {
                    n: "01",
                    t: "Nobody is fully sure who handled the next step.",
                  },
                  {
                    n: "02",
                    t: "A request can be sent, delayed, part-ready, or still unresolved.",
                  },
                  {
                    n: "03",
                    t: "Simple follow-up turns into repeated checking, calling, and memory work.",
                  },
                ].map((p) => (
                  <div className="problemStripItem" key={p.n}>
                    <span className="problemNum">{p.n}</span>
                    <p>{p.t}</p>
                  </div>
                ))}
              </div>
            </FI>
          </div>
        </section>

        <section id="how" className="sec">
          <div className="container">
            <FI>
              <div className="shW">
                <Overline>How Laura works</Overline>
                <h2 className="serif shT shTSpaced">
                  One calm workflow from due soon to ready.
                </h2>
                <p className="shB">
                  Laura makes repeat-prescription admin feel visible, owned, and
                  easier to follow across households and care teams.
                </p>
              </div>
            </FI>

            <div className="proofGrid">
              {[
                {
                  icon: <Bell size={22} />,
                  title: "See what needs attention",
                  body: "Know what is due soon, what is delayed, and what needs follow-up right now.",
                  tone: "warm",
                },
                {
                  icon: <FileText size={22} />,
                  title: "Keep ownership clear",
                  body: "See who updated the request last, who owns the next step, and what comes after.",
                  tone: "blue",
                },
                {
                  icon: <Package size={22} />,
                  title: "Follow every update",
                  body: "Track progress from preparation to ready-to-collect without losing context along the way.",
                  tone: "green",
                },
              ].map((item, i) => (
                <FI key={item.title} delay={i * 0.06}>
                  <div className="proofCard">
                    <motion.div
                      className={`proofIc proofIc--${item.tone}`}
                      animate={{ y: [0, -3, 0] }}
                      transition={{
                        duration: 3.5 + i * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {item.icon}
                    </motion.div>
                    <h3 className="proofTi">{item.title}</h3>
                    <p className="proofBd">{item.body}</p>
                  </div>
                </FI>
              ))}
            </div>

            <div className="scenesGrid">
              <FI delay={0.04}>
                <div className="sceneCard">
                  <div className="sceneCardHead">
                    <Overline tone="warm">Home coordination</Overline>
                    <h3 className="serif sceneCardTitle">
                      Helping a parent stay on top of repeat prescriptions.
                    </h3>
                    <p className="sceneCardBody">
                      Laura keeps supply, preparation, and status visible, so
                      the next request feels calmer before it ever becomes
                      urgent.
                    </p>
                  </div>
                  <HomeScene />
                </div>
              </FI>

              <FI delay={0.08}>
                <div className="sceneCard">
                  <div className="sceneCardHead">
                    <Overline tone="blue">Care team coordination</Overline>
                    <h3 className="serif sceneCardTitle">
                      Tracking requests across residents without losing
                      visibility.
                    </h3>
                    <p className="sceneCardBody">
                      No spreadsheets, no fragmented updates, no guessing. Laura
                      keeps the workflow visible from due soon to ready.
                    </p>
                  </div>
                  <CareHomeScene />
                </div>
              </FI>
            </div>
          </div>
        </section>

        <section id="who" className="sec secTinted">
          <div className="container">
            <FI>
              <div className="shW">
                <Overline>Who Laura is for</Overline>
                <h2 className="serif shT shTSpaced">
                  Built for real responsibility.
                </h2>
                <p className="shB">
                  Laura is designed for the people doing the follow-through, not
                  just the ordering.
                </p>
              </div>
            </FI>

            <div className="audGrid">
              {[
                {
                  icon: <Users size={22} />,
                  title: "Family carers",
                  desc: "For people helping a parent, partner, or relative stay on top of repeat prescriptions without carrying every detail alone.",
                  color: c.warm,
                },
                {
                  icon: <RefreshCw size={22} />,
                  title: "Households",
                  desc: "For homes managing medication admin across more than one person, where visibility and handoff matter.",
                  color: c.accent,
                },
                {
                  icon: <Building2 size={22} />,
                  title: "Care teams",
                  desc: "For supported living, residential care, and teams coordinating repeat-prescription workflows across residents.",
                  color: c.green,
                },
              ].map((item, i) => (
                <FI key={item.title} delay={i * 0.06}>
                  <div className="audCard">
                    <div
                      className="audIc"
                      style={{
                        background: `${item.color}0A`,
                        color: item.color,
                      }}
                    >
                      {item.icon}
                    </div>
                    <h3 className="audTi">{item.title}</h3>
                    <p className="audBd">{item.desc}</p>
                  </div>
                </FI>
              ))}
            </div>
          </div>
        </section>

        <section className="sec">
          <div className="container">
            <FI>
              <div className="langCard">
                <div className="langTop">
                  <div className="langOrb">
                    <Globe size={22} />
                  </div>
                  <div>
                    <Overline tone="warm">Clarity that feels familiar</Overline>
                    <h2 className="serif langTi langTiSpaced">
                      Easier updates, in the language people are most
                      comfortable with.
                    </h2>
                  </div>
                </div>

                <p className="langBd">
                  Laura is being designed to explain updates, letters, and next
                  steps in simpler language and across 40+ languages, so repeat
                  prescription admin feels easier to follow and easier to hand
                  over.
                </p>

                <div className="langChips">
                  {[
                    "English",
                    "French",
                    "Spanish",
                    "Portuguese",
                    "Yoruba",
                    "Arabic",
                    "Hindi",
                    "Urdu",
                    "Mandarin",
                    "40+ more",
                  ].map((l) => (
                    <span key={l} className="langChip">
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            </FI>
          </div>
        </section>

        <section id="waitlist" className="sec secTinted">
          <div className="container">
            <FI>
              <div className="wlC">
                <Overline>Early access</Overline>
                <h2 className="serif wlTi wlTiSpaced">Join Laura early.</h2>
                <p className="wlSub">
                  Starting in the UK with repeat prescription coordination for
                  carers, households, and selected care teams.
                </p>

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
                    <option value="carer">
                      I help manage prescriptions for a family member
                    </option>
                    <option value="household">
                      I manage medication admin across my household
                    </option>
                    <option value="care_team">I work in a care team</option>
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

                  <button
                    type="submit"
                    className="btnP wlBt"
                    disabled={submitting || !agreed}
                  >
                    {submitting ? "Submitting..." : "Join early access"}
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

                {success ? <div className="fmOk">{success}</div> : null}
                {error ? <div className="fmEr">{error}</div> : null}

                <p className="wlAlready">
                  Already have access?{" "}
                  <Link href="/login" className="wlAlreadyLk">
                    Sign in
                  </Link>
                </p>
              </div>
            </FI>
          </div>
        </section>

        <footer className="ft">
          <div className="container ftIn">
            <div className="ftTop">
              <div className="ftBrand">
                <Link href="/" className="ftBr">
                  <div className="navLo ftLoW">
                    <Image
                      src="/omela-logo-mark.png"
                      alt="Laura"
                      width={24}
                      height={24}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <div className="ftBrTx">
                    <span className="ftBrN serif">Laura</span>
                    <span className="ftBrBy">by Omela</span>
                  </div>
                </Link>
                <p className="ftBrDesc">
                  A calmer coordination layer for repeat-prescription admin.
                  Built for the people doing the follow-through.
                </p>
              </div>

              <div className="ftCols">
                <div className="ftCol">
                  <div className="ftColT">Product</div>
                  <a href="#how" className="ftLk">
                    How it works
                  </a>
                  <a href="#who" className="ftLk">
                    Who it helps
                  </a>
                  <a href="#waitlist" className="ftLk">
                    Early access
                  </a>
                  <Link href="/login" className="ftLk">
                    Sign in
                  </Link>
                </div>

                <div className="ftCol">
                  <div className="ftColT">Company</div>
                  <span className="ftLk ftLkStatic">Omela</span>
                  <a href="mailto:hello@omela.ai" className="ftLk">
                    Contact
                  </a>
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
                    Notices
                  </a>
                </div>
              </div>
            </div>

            <div className="ftDsc">
              Laura is Omela&apos;s coordination agent for repeat-prescription
              admin and next-step guidance. She does not provide diagnosis,
              treatment, or emergency care. In an emergency, call 999.
            </div>

            <div className="ftBtm">
              <p>&copy; 2026 Omela Ltd.</p>
              <p className="ftBtmRt">Made with care in the UK.</p>
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
  font-family:var(--font-dm-sans),-apple-system,sans-serif;
  -webkit-font-smoothing:antialiased;
  font-size:15px
}
a{color:inherit;text-decoration:none}
button,input,select{font-family:inherit}
::selection{background:${c.accent};color:#fff}

.serif{font-family:var(--font-instrument-serif),Georgia,serif}
.wrap{width:100%;overflow-x:clip}
.container{max-width:1120px;margin:0 auto;padding:0 20px}

.sec{padding:72px 0}
.secTight{padding:26px 0 12px}
.secTinted{padding:76px 0;background:linear-gradient(180deg,#F5F1EA,${c.bg})}

/* ───── Overlines (replaces pills) ───── */
.overline{
  display:inline-block;
  font-size:11px;
  font-weight:700;
  letter-spacing:.16em;
  text-transform:uppercase;
  color:${c.muted};
  line-height:1
}
.overline--warm{color:${c.warm}}
.overline--blue{color:${c.accent}}
.overline--green{color:${c.greenDk}}

/* ───── Buttons ───── */
.btnP{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:6px;
  background:${c.dark};
  color:#fff;
  border:none;
  border-radius:999px;
  padding:13px 22px;
  font-size:14px;
  font-weight:700;
  cursor:pointer;
  transition:all .25s;
  white-space:nowrap;
  box-shadow:0 3px 10px rgba(0,0,0,.08)
}
.btnP:hover:not(:disabled){
  transform:translateY(-1px);
  box-shadow:0 8px 24px rgba(0,0,0,.13)
}
.btnP:disabled{opacity:.5;cursor:not-allowed}
.btnS{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:6px;
  background:rgba(255,255,255,.88);
  color:${c.text};
  border:1px solid ${c.border};
  border-radius:999px;
  padding:13px 22px;
  font-size:14px;
  font-weight:700;
  cursor:pointer;
  transition:all .25s;
  white-space:nowrap
}
.btnS:hover{background:#fff;box-shadow:0 4px 14px rgba(0,0,0,.05)}

/* ───── Section headers ───── */
.shW{text-align:center;max-width:760px;margin:0 auto}
.shT{
  font-size:clamp(28px,4.8vw,50px);
  line-height:1.05;
  letter-spacing:-.045em
}
.shTSpaced{margin-top:14px}
.shB{
  font-size:clamp(14px,2.2vw,16px);
  line-height:1.78;
  margin-top:14px;
  max-width:600px;
  margin-left:auto;
  margin-right:auto;
  color:${c.sub}
}

/* ───── Nav ───── */
.nav{
  position:sticky;
  top:0;
  z-index:100;
  background:rgba(248,246,241,.9);
  backdrop-filter:blur(20px);
  -webkit-backdrop-filter:blur(20px);
  border-bottom:1px solid rgba(227,221,210,.45)
}
.navR{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:8px;
  height:60px
}
.navBr{display:flex;align-items:center;gap:9px;flex-shrink:0}
.navLo{
  width:32px;
  height:32px;
  border-radius:8px;
  overflow:hidden;
  flex-shrink:0;
  box-shadow:0 1px 4px rgba(0,0,0,.06)
}
.navBrTx{display:flex;flex-direction:column;line-height:1}
.navNm{font-size:18px;font-weight:400;letter-spacing:-.025em;color:${c.text}}
.navBy{
  font-size:9.5px;
  font-weight:700;
  letter-spacing:.1em;
  text-transform:uppercase;
  color:${c.muted};
  margin-top:2px
}
.navLks{display:none;align-items:center;gap:22px}
.navLk{
  font-size:13px;
  font-weight:600;
  color:${c.sub};
  transition:color .2s
}
.navLk:hover{color:${c.text}}
.navRight{display:flex;align-items:center;gap:14px}
.navSignIn{
  display:none;
  font-size:13px;
  font-weight:700;
  color:${c.sub};
  transition:color .2s
}
.navSignIn:hover{color:${c.text}}
.navCt{padding:9px 16px!important;font-size:12px!important;flex-shrink:0}

/* ───── Hero ───── */
.heroSec{padding:48px 0 40px;position:relative;overflow:hidden}
.heroGrid{display:grid;grid-template-columns:1fr;gap:34px;align-items:center}
.heroTxt{max-width:590px}
.heroTi{
  margin-top:18px;
  font-size:clamp(38px,8vw,76px);
  line-height:.94;
  letter-spacing:-.055em
}
.heroAc{color:${c.accent};font-style:italic}
.heroSub{
  margin-top:20px;
  font-size:clamp(15px,2.2vw,18px);
  line-height:1.78;
  color:${c.sub};
  max-width:560px
}
.heroCredLine{
  margin-top:14px;
  font-size:14px;
  line-height:1.7;
  color:${c.muted};
  font-style:italic;
  max-width:560px
}
.heroBt{display:flex;flex-wrap:wrap;gap:10px;margin-top:26px}
.heroBoardCol{display:flex;justify-content:center}

/* ───── Laura workspace (hero board) ───── */
.wsWrap{width:100%;max-width:540px;position:relative}
.wsGlow{
  position:absolute;
  inset:-30px;
  border-radius:46px;
  background:radial-gradient(circle,rgba(201,149,107,.06),transparent 68%);
  z-index:0
}
.wsShell{
  position:relative;
  z-index:1;
  background:rgba(255,255,255,.96);
  border:1px solid rgba(227,221,210,.92);
  border-radius:28px;
  padding:18px;
  box-shadow:0 22px 48px rgba(14,18,26,.07)
}
.wsHead{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
  padding:6px 6px 16px;
  border-bottom:1px solid rgba(227,221,210,.7)
}
.wsBrand{display:flex;align-items:center;gap:11px}
.wsMark{
  width:36px;
  height:36px;
  border-radius:11px;
  overflow:hidden;
  flex-shrink:0;
  background:${c.warmSoft};
  border:1px solid rgba(201,149,107,.16);
  display:flex;
  align-items:center;
  justify-content:center;
  padding:5px
}
.wsBrandTx{display:flex;flex-direction:column;line-height:1}
.wsName{
  font-size:20px;
  font-weight:400;
  letter-spacing:-.03em;
  color:${c.text}
}
.wsBy{
  font-size:10px;
  font-weight:700;
  letter-spacing:.1em;
  text-transform:uppercase;
  color:${c.muted};
  margin-top:4px
}
.wsHeadMeta{text-align:right;line-height:1}
.wsHeadMetaLbl{
  display:block;
  font-size:9.5px;
  font-weight:700;
  letter-spacing:.1em;
  text-transform:uppercase;
  color:${c.muted}
}
.wsHeadMetaVal{
  display:block;
  margin-top:4px;
  font-size:12px;
  font-weight:700;
  color:${c.text}
}

.wsBody{
  display:grid;
  grid-template-columns:1fr;
  gap:14px;
  margin-top:16px
}

/* People list */
.wsList{
  background:${c.cream};
  border:1px solid ${c.borderSoft};
  border-radius:20px;
  padding:10px
}
.wsListHd{
  display:flex;
  justify-content:space-between;
  align-items:center;
  font-size:10px;
  font-weight:700;
  text-transform:uppercase;
  letter-spacing:.11em;
  color:${c.muted};
  padding:6px 8px 10px
}
.wsListCt{
  font-size:10px;
  color:${c.muted}
}
.wsRow{
  display:flex;
  align-items:flex-start;
  gap:11px;
  width:100%;
  padding:11px;
  border:none;
  background:transparent;
  border-radius:14px;
  cursor:pointer;
  text-align:left;
  transition:background .25s;
}
.wsRow + .wsRow{margin-top:4px}
.wsRowA{
  background:#fff;
  box-shadow:0 4px 14px rgba(14,18,26,.05)
}
.wsAv{
  width:34px;
  height:34px;
  border-radius:50%;
  flex-shrink:0;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:11px;
  font-weight:800;
  letter-spacing:.03em;
  border:1px solid rgba(0,0,0,.04)
}
.wsAv--warm{
  background:linear-gradient(135deg,#F7E7D2,#F0D5B6);
  color:${c.warmDk}
}
.wsAv--blue{
  background:linear-gradient(135deg,#E3EDFB,#C9DBF6);
  color:#1E40AF
}
.wsAv--green{
  background:linear-gradient(135deg,#DFF3E4,#C7E8CF);
  color:${c.greenDk}
}
.wsAvLg{
  width:46px;
  height:46px;
  font-size:14px
}
.wsRowTx{flex:1;min-width:0}
.wsRowNm{
  font-size:13px;
  font-weight:800;
  letter-spacing:-.015em;
  color:${c.text}
}
.wsRowMd{
  margin-top:2px;
  font-size:11.5px;
  color:${c.sub}
}
.wsRowSt{
  margin-top:6px;
  font-size:10.5px;
  font-weight:700;
  letter-spacing:.02em
}
.wsRowSt--warm{color:${c.warm}}
.wsRowSt--blue{color:${c.accent}}
.wsRowSt--green{color:${c.greenDk}}

/* Detail panel */
.wsDetail{
  background:${c.cream};
  border:1px solid ${c.borderSoft};
  border-radius:20px;
  padding:20px;
  min-height:260px
}
.wsDtHd{
  display:flex;
  align-items:center;
  gap:12px;
  padding-bottom:14px;
  border-bottom:1px solid rgba(227,221,210,.7)
}
.wsDtHdTx{flex:1;min-width:0}
.wsDtNm{
  font-size:15px;
  font-weight:800;
  letter-spacing:-.02em;
  color:${c.text}
}
.wsDtMd{
  margin-top:3px;
  font-size:12px;
  color:${c.sub}
}
.wsDtMeta{
  display:flex;
  flex-direction:column;
  gap:7px;
  margin-top:14px
}
.wsDtMetaRow{
  display:flex;
  align-items:baseline;
  gap:10px;
  font-size:11.5px
}
.wsDtMetaLbl{
  flex-shrink:0;
  width:50px;
  font-size:9.5px;
  font-weight:700;
  letter-spacing:.1em;
  text-transform:uppercase;
  color:${c.muted}
}
.wsDtMetaVal{
  font-weight:700;
  color:${c.text}
}
.wsDtMetaVal--warm{color:${c.warm}}
.wsDtMetaVal--blue{color:${c.accent}}
.wsDtMetaVal--green{color:${c.greenDk}}
.wsDtMetaValSub{
  font-weight:500;
  color:${c.sub}
}

.wsDtTl{
  margin-top:16px;
  padding-top:14px;
  border-top:1px solid rgba(227,221,210,.7)
}
.wsDtTlHd{
  font-size:9.5px;
  font-weight:700;
  letter-spacing:.1em;
  text-transform:uppercase;
  color:${c.muted};
  margin-bottom:10px
}
.wsDtTlList{display:flex;flex-direction:column;gap:8px}
.wsTlStep{
  display:flex;
  align-items:center;
  gap:10px;
  font-size:11.5px
}
.wsTlMark{
  width:18px;
  height:18px;
  border-radius:50%;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-shrink:0;
  background:#fff;
  border:1px solid ${c.border}
}
.wsTlStep--done .wsTlMark{
  background:${c.greenSoft};
  border-color:rgba(34,197,94,.3);
  color:${c.greenDk}
}
.wsTlStep--active .wsTlMark{
  background:${c.warmSoft};
  border-color:rgba(201,149,107,.35)
}
.wsTlPulse{
  width:6px;
  height:6px;
  border-radius:50%;
  background:${c.warm};
  animation:pulse 1.6s ease-in-out infinite
}
@keyframes pulse{
  0%,100%{opacity:.5;transform:scale(.9)}
  50%{opacity:1;transform:scale(1.15)}
}
.wsTlLbl{
  flex:1;
  color:${c.text};
  font-weight:600
}
.wsTlStep--done .wsTlLbl{color:${c.sub}}
.wsTlMeta{
  font-size:10.5px;
  color:${c.muted};
  font-weight:600
}

.wsDtNext{
  margin-top:14px;
  padding:12px 14px;
  background:#fff;
  border:1px solid rgba(227,221,210,.7);
  border-radius:12px
}
.wsDtNextLbl{
  font-size:9.5px;
  font-weight:700;
  letter-spacing:.1em;
  text-transform:uppercase;
  color:${c.muted};
  margin-bottom:5px
}
.wsDtNextTx{
  font-size:12.5px;
  line-height:1.55;
  color:${c.text};
  font-weight:600
}

/* ───── Problem strip ───── */
.problemStrip{display:grid;grid-template-columns:1fr;gap:10px}
.problemStripItem{
  display:flex;
  align-items:flex-start;
  gap:12px;
  padding:16px 18px;
  border-radius:18px;
  background:rgba(255,255,255,.84);
  border:1px solid rgba(227,221,210,.8)
}
.problemNum{
  font-size:11px;
  font-weight:800;
  color:${c.muted};
  width:22px;
  flex-shrink:0;
  margin-top:1px;
  letter-spacing:.05em
}
.problemStripItem p{
  font-size:14px;
  line-height:1.66;
  color:${c.sub}
}

/* ───── Proof grid ───── */
.proofGrid{
  display:grid;
  grid-template-columns:1fr;
  gap:14px;
  margin-top:42px
}
.proofCard{
  padding:26px;
  border-radius:22px;
  background:rgba(255,255,255,.94);
  border:1px solid ${c.border};
  box-shadow:0 4px 18px rgba(0,0,0,.02);
  transition:all .3s
}
.proofCard:hover{
  box-shadow:0 10px 32px rgba(0,0,0,.05);
  transform:translateY(-1px)
}
.proofIc{
  width:48px;
  height:48px;
  border-radius:14px;
  display:flex;
  align-items:center;
  justify-content:center;
  margin-bottom:14px
}
.proofIc--warm{background:${c.warmSoft};color:${c.warm}}
.proofIc--blue{background:${c.accentSoft};color:${c.accent}}
.proofIc--green{background:${c.greenSoft};color:${c.greenDk}}
.proofTi{font-size:17px;font-weight:800;letter-spacing:-.02em}
.proofBd{margin-top:6px;font-size:13.5px;line-height:1.78;color:${c.sub}}

/* ───── Scene cards ───── */
.scenesGrid{
  display:grid;
  grid-template-columns:1fr;
  gap:20px;
  margin-top:42px
}
.sceneCard{
  background:rgba(255,255,255,.94);
  border:1px solid ${c.border};
  border-radius:28px;
  overflow:hidden;
  box-shadow:0 6px 28px rgba(0,0,0,.04);
  transition:box-shadow .3s
}
.sceneCard:hover{box-shadow:0 12px 44px rgba(0,0,0,.07)}
.sceneCardHead{padding:30px 30px 22px}
.sceneCardTitle{
  margin-top:14px;
  font-size:clamp(22px,3vw,28px);
  line-height:1.1;
  letter-spacing:-.04em;
  margin-bottom:10px
}
.sceneCardBody{
  font-size:14px;
  line-height:1.78;
  color:${c.sub};
  max-width:500px
}

.sceneWrap{padding:0 16px 24px;position:relative}
.sceneSvg{width:100%;height:auto;display:block;border-radius:16px;overflow:hidden}
.sceneCap{
  text-align:center;
  padding:14px 20px 0;
  min-height:44px;
  display:flex;
  align-items:center;
  justify-content:center
}
.sceneCap span{
  font-size:12.5px;
  color:${c.muted};
  font-weight:500;
  line-height:1.6;
  text-align:center;
  max-width:360px;
  font-style:italic
}

/* ───── Audience grid ───── */
.audGrid{display:grid;grid-template-columns:1fr;gap:14px;margin-top:40px}
.audCard{
  padding:26px;
  border:1px solid ${c.border};
  border-radius:22px;
  background:rgba(255,255,255,.94);
  transition:all .3s
}
.audCard:hover{box-shadow:0 8px 24px rgba(0,0,0,.04)}
.audIc{
  width:48px;
  height:48px;
  border-radius:14px;
  display:flex;
  align-items:center;
  justify-content:center;
  margin-bottom:12px
}
.audTi{font-size:17px;font-weight:800;letter-spacing:-.02em}
.audBd{margin-top:6px;font-size:13.5px;line-height:1.78;color:${c.sub}}

/* ───── Language card ───── */
.langCard{
  max-width:960px;
  margin:0 auto;
  padding:36px;
  border-radius:30px;
  background:linear-gradient(180deg,rgba(255,255,255,.97),rgba(255,248,240,.88));
  border:1px solid ${c.border};
  box-shadow:0 10px 34px rgba(0,0,0,.035)
}
.langTop{display:flex;align-items:flex-start;gap:18px}
.langOrb{
  width:56px;
  height:56px;
  border-radius:999px;
  display:flex;
  align-items:center;
  justify-content:center;
  background:linear-gradient(135deg,#FFF8F0,#F4F7FF);
  border:1px solid rgba(201,149,107,.16);
  color:${c.warm};
  flex-shrink:0;
  box-shadow:0 6px 18px rgba(0,0,0,.03)
}
.langTi{
  font-size:clamp(28px,4.5vw,48px);
  line-height:1.02;
  letter-spacing:-.045em
}
.langTiSpaced{margin-top:12px}
.langBd{
  margin-top:18px;
  max-width:740px;
  font-size:15px;
  line-height:1.82;
  color:${c.sub}
}
.langChips{display:flex;flex-wrap:wrap;gap:8px;margin-top:24px}
.langChip{
  display:inline-flex;
  align-items:center;
  min-height:32px;
  padding:0 14px;
  border-radius:999px;
  background:rgba(255,255,255,.9);
  border:1px solid rgba(227,221,210,.95);
  color:${c.sub};
  font-size:12px;
  font-weight:600;
  letter-spacing:.01em
}

/* ───── Waitlist ───── */
.wlC{
  background:rgba(255,255,255,.94);
  border:1px solid ${c.border};
  border-radius:28px;
  padding:36px 30px;
  max-width:720px;
  margin:0 auto;
  box-shadow:0 4px 18px rgba(0,0,0,.03);
  text-align:center
}
.wlTi{font-size:clamp(26px,4.5vw,42px);letter-spacing:-.045em}
.wlTiSpaced{margin-top:14px}
.wlSub{
  margin-top:14px;
  font-size:14.5px;
  line-height:1.78;
  color:${c.sub};
  max-width:520px;
  margin-left:auto;
  margin-right:auto
}
.wlF{
  display:grid;
  grid-template-columns:1fr;
  gap:8px;
  margin-top:24px;
  position:relative
}
.wlBt{height:48px;width:100%}
.inp{
  width:100%;
  height:48px;
  border-radius:12px;
  border:1px solid ${c.border};
  background:#fff;
  padding:0 14px;
  font-size:14px;
  color:${c.text};
  outline:none;
  transition:all .2s
}
.inp:focus{
  border-color:${c.accent};
  box-shadow:0 0 0 3px rgba(37,99,235,.05)
}
.pvL{
  display:flex;
  align-items:flex-start;
  gap:6px;
  margin-top:14px;
  color:${c.sub};
  font-size:11px;
  line-height:1.55;
  cursor:pointer;
  max-width:460px;
  margin-left:auto;
  margin-right:auto
}
.pvC{
  margin-top:1px;
  width:14px;
  height:14px;
  accent-color:${c.accent};
  flex-shrink:0
}
.pvLk{
  color:${c.text};
  font-weight:700;
  text-decoration:underline;
  text-underline-offset:2px
}
.fmOk{
  margin-top:12px;
  background:${c.greenSoft};
  color:${c.greenDk};
  border-radius:12px;
  padding:12px;
  text-align:center;
  font-size:13px;
  font-weight:600
}
.fmEr{
  margin-top:12px;
  background:#FFF7F7;
  color:#B91C1C;
  border-radius:12px;
  padding:12px;
  text-align:center;
  font-size:13px;
  font-weight:600
}
.wlAlready{
  margin-top:22px;
  padding-top:18px;
  border-top:1px solid rgba(227,221,210,.7);
  font-size:12px;
  color:${c.muted}
}
.wlAlreadyLk{
  color:${c.text};
  font-weight:700;
  text-decoration:underline;
  text-underline-offset:3px
}

/* ───── Success modal ───── */
.modO{
  position:fixed;
  inset:0;
  z-index:220;
  background:rgba(9,10,13,.5);
  backdrop-filter:blur(18px);
  -webkit-backdrop-filter:blur(18px);
  display:flex;
  align-items:center;
  justify-content:center;
  padding:14px
}
.modB{
  width:100%;
  max-width:400px;
  background:rgba(255,255,255,.98);
  border:1px solid ${c.border};
  border-radius:24px;
  padding:28px;
  box-shadow:0 20px 50px rgba(0,0,0,.16);
  position:relative;
  overflow:hidden;
  text-align:center
}
.modSeal{
  width:52px;
  height:52px;
  border-radius:999px;
  background:linear-gradient(135deg,#FFF8F0,#ECFDF3);
  border:1px solid rgba(34,197,94,.12);
  display:flex;
  align-items:center;
  justify-content:center;
  margin:0 auto 14px;
  color:${c.greenDk}
}
.modTi{
  font-size:clamp(22px,4.5vw,30px);
  letter-spacing:-.045em
}
.modBd{
  margin-top:6px;
  color:${c.sub};
  font-size:13px;
  line-height:1.72
}
.modRef{
  margin-top:18px;
  padding:14px;
  border-radius:14px;
  background:rgba(37,99,235,.03);
  border:1px solid rgba(37,99,235,.07)
}
.modRefLbl{
  font-size:9px;
  font-weight:700;
  text-transform:uppercase;
  letter-spacing:.1em;
  color:${c.muted};
  margin-bottom:6px
}
.modRefBox{
  display:flex;
  align-items:center;
  gap:6px;
  background:#fff;
  border:1px solid ${c.border};
  border-radius:8px;
  padding:6px 8px
}
.modRefUrl{
  flex:1;
  font-size:11px;
  color:${c.sub};
  font-weight:500;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  text-align:left
}
.modRefCp{
  width:30px;
  height:30px;
  border-radius:7px;
  background:${c.accentSoft};
  border:1px solid rgba(37,99,235,.08);
  color:${c.accent};
  display:flex;
  align-items:center;
  justify-content:center;
  cursor:pointer;
  flex-shrink:0
}
.modRefBts{display:flex;gap:6px;margin-top:10px}
.modShareBtn{flex:1;padding:8px 12px!important;font-size:12px!important}
.modClose{
  margin-top:12px;
  background:none;
  border:none;
  color:${c.muted};
  font-size:11px;
  font-weight:600;
  cursor:pointer;
  padding:3px 6px
}

/* ───── Footer ───── */
.ft{background:${c.dark};padding:56px 0 22px;color:#fff}
.ftTop{
  display:grid;
  grid-template-columns:1fr;
  gap:34px;
  padding-bottom:34px;
  border-bottom:1px solid rgba(255,255,255,.06)
}
.ftBrand{max-width:340px}
.ftBr{display:flex;align-items:center;gap:10px;text-decoration:none;color:#fff}
.ftLoW{background:rgba(255,255,255,.08);border-radius:8px;padding:3px}
.ftBrTx{display:flex;flex-direction:column;line-height:1}
.ftBrN{font-size:20px;font-weight:400;letter-spacing:-.03em;color:#fff}
.ftBrBy{
  font-size:9.5px;
  font-weight:700;
  letter-spacing:.1em;
  text-transform:uppercase;
  color:rgba(255,255,255,.4);
  margin-top:4px
}
.ftBrDesc{
  margin-top:16px;
  font-size:12.5px;
  line-height:1.72;
  color:rgba(255,255,255,.48);
  max-width:300px
}
.ftCols{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:22px
}
.ftCol{display:flex;flex-direction:column;gap:8px}
.ftColT{
  font-size:9.5px;
  font-weight:800;
  color:rgba(255,255,255,.28);
  text-transform:uppercase;
  letter-spacing:.12em;
  margin-bottom:4px
}
.ftLk{
  font-size:12px;
  color:rgba(255,255,255,.52);
  font-weight:500;
  transition:color .2s
}
.ftLk:hover{color:#fff}
.ftLkStatic{cursor:default}
.ftLkStatic:hover{color:rgba(255,255,255,.52)}
.ftDsc{
  margin-top:26px;
  padding:16px 0;
  font-size:10.5px;
  color:rgba(255,255,255,.32);
  line-height:1.7;
  text-align:center;
  max-width:620px;
  margin-left:auto;
  margin-right:auto
}
.ftBtm{
  border-top:1px solid rgba(255,255,255,.05);
  padding-top:16px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:10px;
  flex-wrap:wrap;
  font-size:10px;
  color:rgba(255,255,255,.32)
}
.ftBtmRt{color:rgba(255,255,255,.28);font-style:italic}

@media(max-width:639px){
  .heroBt{flex-direction:column}
  .heroBt .btnP,.heroBt .btnS{width:100%;text-align:center}
  .heroSec{padding:32px 0 28px}
  .navR{height:52px}
  .langCard{padding:26px}
  .langTop{gap:14px}
  .langOrb{width:48px;height:48px}
  .ftCols{grid-template-columns:1fr 1fr;gap:24px}
}

@media(min-width:640px){
  .container{padding:0 24px}
  .sec{padding:84px 0}
  .secTinted{padding:84px 0}
  .navR{height:64px}
  .navLks{display:flex}
  .navSignIn{display:inline-flex}
  .heroGrid{grid-template-columns:1.02fr .98fr;gap:40px}
  .problemStrip{grid-template-columns:repeat(3,1fr)}
  .proofGrid{grid-template-columns:repeat(3,1fr)}
  .audGrid{grid-template-columns:repeat(3,1fr)}
  .scenesGrid{grid-template-columns:repeat(2,1fr)}
  .wlF{grid-template-columns:1.2fr .9fr auto}
  .wlBt{width:auto}
  .ftTop{grid-template-columns:1.2fr 2fr;gap:48px}
  .ftCols{grid-template-columns:repeat(3,1fr);gap:32px}
  .wsBody{grid-template-columns:.9fr 1.1fr}
}

@media(min-width:960px){
  .container{padding:0 32px}
  .sec{padding:92px 0}
  .secTinted{padding:92px 0}
  .navR{height:68px}
  .heroSec{padding:60px 0 44px}
  .wsShell{padding:20px}
}

@media(min-width:1100px){
  .heroTi{font-size:clamp(54px,6.5vw,78px)}
}
`;
