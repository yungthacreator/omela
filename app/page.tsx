"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
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

const HERO_SIGNAL_LINES = [
  "See what is due soon.",
  "See what is delayed.",
  "See who owns the next step.",
  "See what happens next.",
] as const;

type LanguageOption = {
  label: string;
  emoji: string;
  sample: string;
  note: string;
};

const LANGUAGE_OPTIONS: LanguageOption[] = [
  {
    label: "English",
    emoji: "🇬🇧",
    sample:
      "Clear updates that feel calm, natural, and easy to act on.",
    note:
      "Helpful when carers, relatives, or support staff need a shared view of what has been requested, what is ready, and what still needs attention.",
  },
  {
    label: "French",
    emoji: "🇫🇷",
    sample:
      "Softer wording for updates, letters, and next steps around repeat prescriptions.",
    note:
      "Designed to make medication admin feel more familiar and less stressful for households and carers.",
  },
  {
    label: "Spanish",
    emoji: "🇪🇸",
    sample:
      "Simple guidance that makes requests and progress easier to follow together.",
    note:
      "Useful when one person starts the process and someone else needs to carry it forward.",
  },
  {
    label: "Portuguese",
    emoji: "🇵🇹",
    sample:
      "Clearer explanations for delays, status changes, and what happens next.",
    note:
      "Built to make shared medication admin feel easier across family members, carers, and support teams.",
  },
  {
    label: "Yoruba",
    emoji: "🇳🇬",
    sample:
      "Familiar communication that helps people stay aligned on the next step.",
    note:
      "Especially useful when several people are helping one person stay on top of repeat prescriptions.",
  },
  {
    label: "Arabic",
    emoji: "🇸🇦",
    sample:
      "Calmer updates for letters, status changes, and follow-through.",
    note:
      "Made to reduce friction when people are already carrying a lot of care admin.",
  },
  {
    label: "Hindi",
    emoji: "🇮🇳",
    sample:
      "Straightforward language that reduces confusion around requests and collection.",
    note:
      "Designed so the important part stays clear without the experience feeling cold or technical.",
  },
  {
    label: "Urdu",
    emoji: "🇵🇰",
    sample:
      "Simple shared visibility that makes handover easier across family members.",
    note:
      "Useful when more than one person needs to understand what has happened and what still needs doing.",
  },
  {
    label: "Mandarin",
    emoji: "🇨🇳",
    sample:
      "Easier status updates for households and care teams managing more than one person.",
    note:
      "Helps turn repeat prescription admin into something clearer, calmer, and easier to explain.",
  },
];

function formatTodayLabel(date: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).formatToParts(date);

  const weekday = parts.find((part) => part.type === "weekday")?.value ?? "";
  const day = parts.find((part) => part.type === "day")?.value ?? "";
  const month = parts.find((part) => part.type === "month")?.value ?? "";

  return `${weekday}, ${day} ${month}`;
}

function useTodayLabel() {
  const [todayLabel, setTodayLabel] = useState("");

  useEffect(() => {
    const update = () => {
      setTodayLabel(formatTodayLabel(new Date()));
    };

    update();
    const interval = window.setInterval(update, 60_000);

    return () => window.clearInterval(interval);
  }, []);

  return todayLabel;
}

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

function HeroSignal() {
  const [lineIndex, setLineIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = HERO_SIGNAL_LINES[lineIndex];
    let timeout: number;

    if (!deleting && displayed.length < current.length) {
      timeout = window.setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length + 1));
      }, 34);
    } else if (!deleting && displayed.length === current.length) {
      timeout = window.setTimeout(() => {
        setDeleting(true);
      }, 1500);
    } else if (deleting && displayed.length > 0) {
      timeout = window.setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length - 1));
      }, 18);
    } else {
      timeout = window.setTimeout(() => {
        setDeleting(false);
        setLineIndex((p) => (p + 1) % HERO_SIGNAL_LINES.length);
      }, 180);
    }

    return () => window.clearTimeout(timeout);
  }, [displayed, deleting, lineIndex]);

  return (
    <div className="heroCredWrap">
      <span className="heroCredLead">Laura keeps the handoff visible</span>
      <div className="heroCredLine" aria-live="polite">
        <span>{displayed}</span>
        <span className="heroCursor" aria-hidden="true" />
      </div>
    </div>
  );
}

function LanguageExperience() {
  const [active, setActive] = useState<LanguageOption>(LANGUAGE_OPTIONS[0]);

  return (
    <div className="langCard">
      <div className="langTop">
        <div className="langOrb">
          <Globe size={22} />
        </div>

        <div className="langTopText">
          <Overline tone="warm" className="langOverline">
            Clarity that feels familiar
          </Overline>

          <h2 className="serif langTi langTiSpaced">
            Easier updates, in the language people are most comfortable with.
          </h2>
        </div>
      </div>

      <p className="langBd">
        Laura is being designed to explain updates, letters, and next steps in
        simpler language and across 40+ languages, so repeat prescription admin
        feels easier to follow, easier to hand over, and less stressful to stay
        on top of.
      </p>

      <div className="langChips">
        {LANGUAGE_OPTIONS.map((item) => {
          const isActive = active.label === item.label;

          return (
            <button
              key={item.label}
              type="button"
              className={`langChip ${isActive ? "langChipA" : ""}`}
              onClick={() => setActive(item)}
            >
              <span className="langChipFlag" aria-hidden="true">
                {item.emoji}
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}

        <button type="button" className="langChip langChipMore">
          <span className="langChipFlag" aria-hidden="true">
            🌍
          </span>
          <span>40+ more</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.label}
          className="langPreview"
          initial={{ opacity: 0, y: 10, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.985 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="langPreviewHead">
            <div className="langPreviewId">
              <div className="langPreviewFlag" aria-hidden="true">
                {active.emoji}
              </div>

              <div>
                <div className="langPreviewLabel">{active.label}</div>
                <div className="langPreviewMeta">Selected language view</div>
              </div>
            </div>

            <div className="langPreviewTags">
              <span className="langPreviewTag">Updates</span>
              <span className="langPreviewTag">Letters</span>
              <span className="langPreviewTag">Next steps</span>
            </div>
          </div>

          <p className="langPreviewBody">{active.sample}</p>
          <p className="langPreviewNote">{active.note}</p>
        </motion.div>
      </AnimatePresence>
    </div>
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
                <p className="modRefLbl">
                  Share with a family member or care team
                </p>

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
  const todayLabel = useTodayLabel();

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

      <motion.div
        className="wsShell"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
      >
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
            <span className="wsHeadMetaVal">{todayLabel || "..."}</span>
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
                    <span
                      className={`wsDtMetaVal wsDtMetaVal--${current.tone}`}
                    >
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
      </motion.div>
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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
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

  const workflowCards = [
    {
      icon: <Bell size={22} />,
      title: "See what needs attention",
      body: "Know what is due soon, what is delayed, and what needs follow-up right now.",
      tone: "warm",
    },
    {
      icon: <RefreshCw size={22} />,
      title: "Keep ownership clear",
      body: "See who handled the request last, who owns the next step, and what should happen next.",
      tone: "blue",
    },
    {
      icon: <Package size={22} />,
      title: "Follow every update",
      body: "Track progress from preparation to ready without losing the thread along the way.",
      tone: "green",
    },
  ] as const;

  const audienceCards = [
    {
      icon: <Users size={22} />,
      title: "Family carers",
      body: "For people helping a parent, partner, or relative stay on top of repeat prescriptions without carrying every detail alone.",
      tone: "warm",
    },
    {
      icon: <RefreshCw size={22} />,
      title: "Households",
      body: "For homes managing medication admin across more than one person, where visibility and handoff matter.",
      tone: "blue",
    },
    {
      icon: <Building2 size={22} />,
      title: "Care teams",
      body: "For supported living, residential care, and teams coordinating repeat-prescription workflows across residents.",
      tone: "green",
    },
  ] as const;

  const valueCards = [
    {
      icon: <Bell size={22} />,
      title: "Less chasing",
      body: "Surface what is due soon, delayed, or still unresolved before it turns into repeated checking and calls.",
      tone: "warm",
    },
    {
      icon: <FileText size={22} />,
      title: "Shared context",
      body: "Keep notes, updates, and timelines together so staff and family are not working from fragments.",
      tone: "blue",
    },
    {
      icon: <Users size={22} />,
      title: "Better handover",
      body: "Make follow-through easier when one person prepares the request and someone else needs to carry it forward.",
      tone: "green",
    },
    {
      icon: <Package size={22} />,
      title: "Calmer follow-through",
      body: "Turn a messy process into something clearer, more visible, and easier to stay on top of.",
      tone: "warm",
    },
  ] as const;

  const roadmapCards = [
    {
      title: "Shared medication timelines",
      body: "A clearer history of what was requested, when it changed, and what still needs attention.",
    },
    {
      title: "Delayed queue and escalation",
      body: "Flag requests that are stuck too long and surface what needs a reminder, a call, or a handoff.",
    },
    {
      title: "Proxy and consent support",
      body: "Make it clearer who is allowed to act, who should be updated, and how responsibility is shared.",
    },
    {
      title: "Collection and delivery guidance",
      body: "Track whether medicine is ready, delayed, collected, or waiting on a delivery decision.",
    },
    {
      title: "Bilingual explanations",
      body: "Explain status changes, letters, and next steps in simpler language and across multiple languages.",
    },
    {
      title: "Team and manager views",
      body: "A clearer picture across residents, households, and staff, without depending on memory or scattered notes.",
    },
  ] as const;

  const trustCards = [
    {
      title: "Protected access",
      body: "Built with secure sign-in and controlled access from day one.",
    },
    {
      title: "Clear visibility",
      body: "The right people see the right information, with clearer boundaries across family and care teams.",
    },
    {
      title: "Audit history",
      body: "A clearer record of updates, ownership changes, and follow-through over time.",
    },
    {
      title: "Focused data collection",
      body: "Designed to stay narrow and collect only what is needed for the workflow.",
    },
  ] as const;

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
              <a href="#coming-next" className="navLk">
                Coming next
              </a>
            </div>

            <div className="navRight">
              <Link href="/login" className="navSignIn">
                Sign in
              </Link>
              <a
                href="mailto:hello@omela.ai?subject=Omela%20pilot%20conversation"
                className="btnP navCt"
              >
                Book a demo
                <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </motion.nav>

        <section className="heroSec">
          <div className="container heroGrid">
            <div className="heroTxt">
              <FI delay={0.06}>
                <h1 className="serif heroTi">
                  Coordinate repeat prescriptions
                  <span className="heroAc">without the chasing.</span>
                </h1>
              </FI>

              <FI delay={0.12}>
                <p className="heroSub">
                  Laura helps carers and care teams keep repeat prescription
                  requests visible across multiple people, with clearer
                  ownership, calmer follow-through, and less admin friction.
                </p>
              </FI>

              <FI delay={0.18}>
                <HeroSignal />
              </FI>

              <FI delay={0.24}>
                <div className="heroBt">
                  <a
                    href="mailto:hello@omela.ai?subject=Omela%20pilot%20conversation"
                    className="btnP"
                  >
                    Book pilot conversation
                    <ArrowRight size={14} />
                  </a>
                  <a href="#waitlist" className="btnS">
                    Join early access
                  </a>
                </div>
              </FI>

              <FI delay={0.28}>
                <p className="heroFoot">
                  Starting in the UK with repeat prescription coordination for
                  carers, households, and selected care teams.
                </p>
              </FI>
            </div>

            <FI delay={0.16} className="heroBoardCol">
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
                    t: "Requests get delayed and nobody is fully sure who is following up.",
                  },
                  {
                    n: "02",
                    t: "Updates often sit across calls, shifts, notes, and memory instead of one clear view.",
                  },
                  {
                    n: "03",
                    t: "Small prescription admin turns into repeated checking, repeated calls, and repeated stress.",
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
                  One calmer workflow from due soon to ready.
                </h2>
                <p className="shB">
                  Laura is not a pharmacy, not telehealth, and not a diagnosis
                  tool. She is the coordination layer around repeat-prescription
                  admin.
                </p>
              </div>
            </FI>

            <div className="proofGrid">
              {workflowCards.map((item, i) => (
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
          </div>
        </section>

        <section className="sec secSoft">
          <div className="container">
            <FI>
              <div className="shW">
                <Overline tone="warm">Why people switch</Overline>
                <h2 className="serif shT shTSpaced">
                  Built to reduce follow-up chaos, not add another system.
                </h2>
                <p className="shB">
                  The value is operational clarity. Less chasing, clearer
                  ownership, better handover, and fewer status blind spots.
                </p>
              </div>
            </FI>

            <div className="valueGrid">
              {valueCards.map((item, i) => (
                <FI key={item.title} delay={i * 0.05}>
                  <div className="valueCard">
                    <div className={`valueIc valueIc--${item.tone}`}>
                      {item.icon}
                    </div>
                    <h3 className="valueTi">{item.title}</h3>
                    <p className="valueBd">{item.body}</p>
                  </div>
                </FI>
              ))}
            </div>
          </div>
        </section>

        <section id="who" className="sec secTinted">
          <div className="container">
            <FI>
              <div className="shW">
                <Overline>Who Laura is for</Overline>
                <h2 className="serif shT shTSpaced">
                  Built for the people carrying the admin.
                </h2>
                <p className="shB">
                  Laura is designed for the people doing the follow-through, not
                  just the ordering.
                </p>
              </div>
            </FI>

            <div className="audGrid">
              {audienceCards.map((item, i) => (
                <FI key={item.title} delay={i * 0.06}>
                  <div className="audCard">
                    <div className={`audIc audIc--${item.tone}`}>
                      {item.icon}
                    </div>
                    <h3 className="audTi">{item.title}</h3>
                    <p className="audBd">{item.body}</p>
                  </div>
                </FI>
              ))}
            </div>
          </div>
        </section>

        <section id="coming-next" className="sec">
          <div className="container">
            <FI>
              <div className="shW">
                <Overline tone="warm">Coming next</Overline>
                <h2 className="serif shT shTSpaced">
                  Starting with repeat prescriptions. Expanding into calmer
                  medication coordination.
                </h2>
                <p className="shB">
                  The first wedge is repeat-prescription admin. The broader
                  direction is shared medication coordination for carers and
                  care teams.
                </p>
              </div>
            </FI>

            <div className="roadmapGrid">
              {roadmapCards.map((item, i) => (
                <FI key={item.title} delay={i * 0.04}>
                  <div className="roadmapCard">
                    <div className="roadmapNo">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="roadmapTi">{item.title}</h3>
                    <p className="roadmapBd">{item.body}</p>
                  </div>
                </FI>
              ))}
            </div>
          </div>
        </section>

        <section className="sec secLanguage">
          <div className="container">
            <FI>
              <LanguageExperience />
            </FI>
          </div>
        </section>

        <section className="sec secSoft secSecurity">
          <div className="container">
            <FI>
              <div className="trustWrap">
                <div className="boundaryCard">
                  <Overline>Boundaries and trust</Overline>
                  <h3 className="serif boundaryTi">
                    Built to sit alongside existing care workflows.
                  </h3>
                  <p className="boundaryBd">
                    Omela is not a pharmacy, not telehealth, and not a diagnosis
                    tool. It is the coordination layer that helps carers and
                    care teams follow repeat-prescription admin more clearly.
                  </p>
                </div>

                <div className="trustGrid">
                  {trustCards.map((item, i) => (
                    <FI key={item.title} delay={i * 0.04}>
                      <div className="trustCard">
                        <h4 className="trustTi">{item.title}</h4>
                        <p className="trustBd">{item.body}</p>
                      </div>
                    </FI>
                  ))}
                </div>
              </div>
            </FI>
          </div>
        </section>

        <section id="waitlist" className="sec secTinted secWaitlist">
          <div className="container">
            <FI>
              <div className="wlC">
                <Overline>Early access</Overline>
                <h2 className="serif wlTi wlTiSpaced">
                  Join the first Omela pilots.
                </h2>
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
                    <option value="carer">I manage for a family member</option>
                    <option value="household">I manage across my household</option>
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
                  Prefer a team conversation?{" "}
                  <a
                    href="mailto:hello@omela.ai?subject=Omela%20pilot%20conversation"
                    className="wlAlreadyLk"
                  >
                    Book a demo
                  </a>
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
                  A calmer coordination platform for repeat-prescription admin.
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
                  <a href="#coming-next" className="ftLk">
                    Coming next
                  </a>
                  <a href="#waitlist" className="ftLk">
                    Early access
                  </a>
                </div>

                <div className="ftCol">
                  <div className="ftColT">Company</div>
                  <span className="ftLk ftLkStatic">Omela</span>
                  <a href="mailto:hello@omela.ai" className="ftLk">
                    Contact
                  </a>
                  <a
                    href="mailto:hello@omela.ai?subject=Omela%20pilot%20conversation"
                    className="ftLk"
                  >
                    Book a demo
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
              Laura is Omela&apos;s coordination layer for repeat-prescription
              admin, ownership, and next-step guidance. She does not provide
              diagnosis, treatment, or emergency care. In an emergency, call
              999.
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

.sec{padding:60px 0}
.secTight{padding:18px 0 8px}
.secTinted{padding:64px 0;background:linear-gradient(180deg,#F5F1EA,${c.bg})}
.secSoft{padding:60px 0;background:linear-gradient(180deg,rgba(255,255,255,.35),rgba(248,246,241,.65))}
.secLanguage{padding-top:56px;padding-bottom:34px}
.secSecurity{padding-top:34px;padding-bottom:54px}
.secWaitlist{padding-top:34px;padding-bottom:54px}

/* ───── Overlines ───── */
.overline{
  display:inline-block;
  font-size:11px;
  font-weight:700;
  letter-spacing:.16em;
  text-transform:uppercase;
  color:${c.muted};
  line-height:1;
  user-select:none
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
.btnS:hover{
  background:#fff;
  box-shadow:0 4px 14px rgba(0,0,0,.05)
}

/* ───── Section headers ───── */
.shW{text-align:center;max-width:760px;margin:0 auto}
.shT{
  font-size:clamp(28px,4.8vw,50px);
  line-height:1.05;
  letter-spacing:-.045em
}
.shTSpaced{margin-top:12px}
.shB{
  font-size:clamp(14px,2.2vw,16px);
  line-height:1.72;
  margin-top:12px;
  max-width:620px;
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
  margin-top:2px;
  user-select:none
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
.heroSec{
  padding:44px 0 34px;
  position:relative;
  overflow:hidden
}
.heroGrid{
  display:grid;
  grid-template-columns:1fr;
  gap:24px;
  align-items:center
}
.heroTxt{
  max-width:900px;
  margin:0 auto;
  text-align:center
}
.heroTi{
  font-size:clamp(42px,8vw,84px);
  line-height:.93;
  letter-spacing:-.058em
}
.heroAc{
  display:block;
  margin-top:.08em;
  font-style:italic;
  background:linear-gradient(135deg,#A97549 0%,#D6A47C 45%,#B98558 72%,#8E5E39 100%);
  -webkit-background-clip:text;
  background-clip:text;
  color:transparent;
  text-shadow:0 8px 26px rgba(201,149,107,.12)
}
.heroSub{
  margin-top:18px;
  font-size:clamp(15px,2.2vw,19px);
  line-height:1.72;
  color:${c.sub};
  max-width:760px;
  margin-left:auto;
  margin-right:auto
}
.heroCredWrap{
  margin-top:16px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:7px;
  user-select:none
}
.heroCredLead{
  font-size:10px;
  font-weight:800;
  letter-spacing:.15em;
  text-transform:uppercase;
  color:${c.warm}
}
.heroCredLine{
  min-height:26px;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:4px;
  font-size:15px;
  line-height:1.5;
  color:${c.sub};
  font-weight:600;
  letter-spacing:-.01em;
  text-align:center
}
.heroCursor{
  width:1.5px;
  height:1.05em;
  background:${c.warm};
  display:inline-block;
  border-radius:99px;
  animation:blink 1s step-end infinite
}
@keyframes blink{
  0%,49%{opacity:1}
  50%,100%{opacity:0}
}
.heroBt{
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
  align-items:center;
  gap:12px;
  margin-top:24px
}
.heroBt .btnP,
.heroBt .btnS{
  min-width:220px;
  min-height:54px;
  padding:15px 24px;
  font-size:15px
}
.heroFoot{
  margin-top:16px;
  font-size:12.5px;
  line-height:1.65;
  color:${c.muted}
}
.heroBoardCol{
  display:flex;
  justify-content:center;
  width:100%;
  margin-top:8px
}

/* ───── Laura workspace ───── */
.wsWrap{width:100%;max-width:740px;position:relative}
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
  padding:16px;
  box-shadow:0 22px 48px rgba(14,18,26,.07)
}
.wsHead{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
  padding:6px 6px 14px;
  border-bottom:1px solid rgba(227,221,210,.7);
  user-select:none
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
  gap:12px;
  margin-top:14px
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
  padding:6px 8px 10px;
  user-select:none
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
  transition:background .25s
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
  border:1px solid rgba(0,0,0,.04);
  user-select:none
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
  padding:18px;
  min-height:250px
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
  color:${c.muted};
  user-select:none
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
  margin-bottom:10px;
  user-select:none
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
  border:1px solid ${c.border};
  user-select:none
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
  font-weight:600;
  user-select:none
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
  margin-bottom:5px;
  user-select:none
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
  padding:14px 16px;
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
  letter-spacing:.05em;
  user-select:none
}
.problemStripItem p{
  font-size:13.5px;
  line-height:1.62;
  color:${c.sub}
}

/* ───── Workflow cards ───── */
.proofGrid{
  display:grid;
  grid-template-columns:1fr;
  gap:14px;
  margin-top:32px
}
.proofCard{
  padding:22px;
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
  width:46px;
  height:46px;
  border-radius:14px;
  display:flex;
  align-items:center;
  justify-content:center;
  margin-bottom:12px
}
.proofIc--warm{background:${c.warmSoft};color:${c.warm}}
.proofIc--blue{background:${c.accentSoft};color:${c.accent}}
.proofIc--green{background:${c.greenSoft};color:${c.greenDk}}
.proofTi{font-size:16px;font-weight:800;letter-spacing:-.02em}
.proofBd{margin-top:6px;font-size:13.2px;line-height:1.72;color:${c.sub}}

/* ───── Value grid ───── */
.valueGrid{
  display:grid;
  grid-template-columns:1fr;
  gap:14px;
  margin-top:32px
}
.valueCard{
  padding:22px;
  border-radius:22px;
  background:rgba(255,255,255,.92);
  border:1px solid rgba(227,221,210,.9);
  box-shadow:0 4px 18px rgba(0,0,0,.02);
  transition:transform .25s, box-shadow .25s
}
.valueCard:hover{
  transform:translateY(-1px);
  box-shadow:0 10px 28px rgba(0,0,0,.04)
}
.valueIc{
  width:44px;
  height:44px;
  border-radius:14px;
  display:flex;
  align-items:center;
  justify-content:center;
  margin-bottom:12px
}
.valueIc--warm{background:${c.warmSoft};color:${c.warm}}
.valueIc--blue{background:${c.accentSoft};color:${c.accent}}
.valueIc--green{background:${c.greenSoft};color:${c.greenDk}}
.valueTi{
  font-size:16px;
  font-weight:800;
  letter-spacing:-.02em;
  color:${c.text}
}
.valueBd{
  margin-top:6px;
  font-size:13.2px;
  line-height:1.72;
  color:${c.sub}
}

/* ───── Audience grid ───── */
.audGrid{display:grid;grid-template-columns:1fr;gap:14px;margin-top:34px}
.audCard{
  padding:22px;
  border:1px solid ${c.border};
  border-radius:22px;
  background:rgba(255,255,255,.94);
  transition:all .3s
}
.audCard:hover{box-shadow:0 8px 24px rgba(0,0,0,.04)}
.audIc{
  width:46px;
  height:46px;
  border-radius:14px;
  display:flex;
  align-items:center;
  justify-content:center;
  margin-bottom:12px
}
.audIc--warm{background:${c.warmSoft};color:${c.warm}}
.audIc--blue{background:${c.accentSoft};color:${c.accent}}
.audIc--green{background:${c.greenSoft};color:${c.greenDk}}
.audTi{font-size:16px;font-weight:800;letter-spacing:-.02em}
.audBd{margin-top:6px;font-size:13.2px;line-height:1.72;color:${c.sub}}

/* ───── Roadmap ───── */
.roadmapGrid{
  display:grid;
  grid-template-columns:1fr;
  gap:14px;
  margin-top:34px
}
.roadmapCard{
  padding:22px;
  border-radius:22px;
  background:rgba(255,255,255,.94);
  border:1px solid rgba(227,221,210,.92);
  box-shadow:0 4px 18px rgba(0,0,0,.02);
  transition:transform .25s, box-shadow .25s
}
.roadmapCard:hover{
  transform:translateY(-1px);
  box-shadow:0 10px 28px rgba(0,0,0,.04)
}
.roadmapNo{
  width:34px;
  height:34px;
  border-radius:999px;
  background:${c.warmSoft};
  color:${c.warmDk};
  border:1px solid rgba(201,149,107,.16);
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:11px;
  font-weight:800;
  letter-spacing:.08em;
  margin-bottom:12px;
  user-select:none
}
.roadmapTi{
  font-size:16px;
  font-weight:800;
  letter-spacing:-.02em;
  color:${c.text}
}
.roadmapBd{
  margin-top:6px;
  font-size:13.2px;
  line-height:1.72;
  color:${c.sub}
}

/* ───── Language card ───── */
.langCard{
  max-width:980px;
  margin:0 auto;
  padding:30px;
  border-radius:30px;
  background:linear-gradient(180deg,rgba(255,255,255,.97),rgba(255,248,240,.88));
  border:1px solid ${c.border};
  box-shadow:0 10px 34px rgba(0,0,0,.035)
}
.langTop{
  display:flex;
  align-items:flex-start;
  gap:18px
}
.langTopText{flex:1}
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
.langOverline{
  position:relative;
  padding-left:76px
}
.langOverline::before{
  content:"";
  position:absolute;
  left:0;
  top:50%;
  transform:translateY(-50%);
  width:62px;
  height:1px;
  background:rgba(201,149,107,.45)
}
.langTi{
  font-size:clamp(28px,4.5vw,48px);
  line-height:1.02;
  letter-spacing:-.045em
}
.langTiSpaced{margin-top:12px}
.langBd{
  margin-top:16px;
  max-width:760px;
  font-size:14.5px;
  line-height:1.78;
  color:${c.sub}
}
.langChips{
  display:flex;
  flex-wrap:wrap;
  gap:10px;
  margin-top:22px
}
.langChip{
  display:inline-flex;
  align-items:center;
  gap:8px;
  min-height:40px;
  padding:0 16px;
  border-radius:999px;
  background:rgba(255,255,255,.9);
  border:1px solid rgba(227,221,210,.95);
  color:${c.sub};
  font-size:13px;
  font-weight:700;
  letter-spacing:.01em;
  cursor:pointer;
  transition:all .25s;
  user-select:none
}
.langChip:hover{
  background:#fff;
  color:${c.text};
  transform:translateY(-1px);
  box-shadow:0 8px 18px rgba(0,0,0,.04)
}
.langChipA{
  background:#fff;
  color:${c.text};
  border-color:rgba(201,149,107,.42);
  box-shadow:0 10px 22px rgba(0,0,0,.04)
}
.langChipMore{cursor:default}
.langChipMore:hover{transform:none}
.langChipFlag{
  font-size:16px;
  line-height:1
}
.langPreview{
  margin-top:18px;
  padding:20px;
  border-radius:24px;
  background:rgba(255,255,255,.88);
  border:1px solid rgba(227,221,210,.95);
  box-shadow:0 10px 28px rgba(0,0,0,.03)
}
.langPreviewHead{
  display:flex;
  align-items:flex-start;
  justify-content:space-between;
  gap:14px;
  flex-wrap:wrap
}
.langPreviewId{
  display:flex;
  align-items:center;
  gap:12px
}
.langPreviewFlag{
  width:46px;
  height:46px;
  border-radius:14px;
  display:flex;
  align-items:center;
  justify-content:center;
  background:linear-gradient(135deg,#FFF8F0,#F6F8FF);
  border:1px solid rgba(201,149,107,.16);
  font-size:22px;
  box-shadow:0 6px 18px rgba(0,0,0,.03);
  user-select:none
}
.langPreviewLabel{
  font-size:15px;
  font-weight:800;
  letter-spacing:-.015em;
  color:${c.text}
}
.langPreviewMeta{
  margin-top:3px;
  font-size:10px;
  font-weight:700;
  letter-spacing:.12em;
  text-transform:uppercase;
  color:${c.muted};
  user-select:none
}
.langPreviewTags{
  display:flex;
  flex-wrap:wrap;
  gap:8px
}
.langPreviewTag{
  display:inline-flex;
  align-items:center;
  min-height:30px;
  padding:0 12px;
  border-radius:999px;
  background:${c.warmSoft};
  border:1px solid rgba(201,149,107,.16);
  color:${c.warmDk};
  font-size:11px;
  font-weight:700;
  letter-spacing:.03em;
  user-select:none
}
.langPreviewBody{
  margin-top:14px;
  font-size:clamp(18px,2.2vw,24px);
  line-height:1.5;
  letter-spacing:-.02em;
  color:${c.text};
  max-width:760px
}
.langPreviewNote{
  margin-top:8px;
  max-width:760px;
  font-size:13.2px;
  line-height:1.72;
  color:${c.sub}
}

/* ───── Trust and boundary ───── */
.trustWrap{
  max-width:980px;
  margin:0 auto
}
.boundaryCard{
  padding:24px;
  border-radius:24px;
  background:rgba(255,255,255,.94);
  border:1px solid rgba(227,221,210,.92);
  box-shadow:0 8px 24px rgba(0,0,0,.03)
}
.boundaryTi{
  margin-top:10px;
  font-size:clamp(24px,3vw,34px);
  line-height:1.08;
  letter-spacing:-.04em
}
.boundaryBd{
  margin-top:10px;
  max-width:760px;
  font-size:14px;
  line-height:1.74;
  color:${c.sub}
}
.trustGrid{
  display:grid;
  grid-template-columns:1fr;
  gap:14px;
  margin-top:18px
}
.trustCard{
  padding:20px;
  border-radius:20px;
  background:rgba(255,255,255,.9);
  border:1px solid rgba(227,221,210,.88)
}
.trustTi{
  font-size:15px;
  font-weight:800;
  letter-spacing:-.02em;
  color:${c.text}
}
.trustBd{
  margin-top:6px;
  font-size:13.2px;
  line-height:1.7;
  color:${c.sub}
}

/* ───── Waitlist ───── */
.wlC{
  background:rgba(255,255,255,.94);
  border:1px solid ${c.border};
  border-radius:28px;
  padding:30px 24px;
  max-width:720px;
  margin:0 auto;
  box-shadow:0 4px 18px rgba(0,0,0,.03);
  text-align:center
}
.wlTi{font-size:clamp(26px,4.5vw,42px);letter-spacing:-.045em}
.wlTiSpaced{margin-top:12px}
.wlSub{
  margin-top:12px;
  font-size:14.2px;
  line-height:1.72;
  color:${c.sub};
  max-width:540px;
  margin-left:auto;
  margin-right:auto
}
.wlF{
  display:grid;
  grid-template-columns:1fr;
  gap:8px;
  margin-top:22px;
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
  margin-top:12px;
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
  margin-top:18px;
  padding-top:16px;
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
.ft{
  background:${c.dark};
  padding:38px 0 18px;
  color:#fff
}
.ftTop{
  display:grid;
  grid-template-columns:1fr;
  gap:28px;
  padding-bottom:24px;
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
  margin-top:14px;
  font-size:12.2px;
  line-height:1.68;
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
  margin-top:18px;
  padding:14px 0;
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
  padding-top:14px;
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
  .heroSec{padding:30px 0 26px}
  .langOverline{padding-left:0}
  .langOverline::before{display:none}
  .navR{height:52px}
  .heroTi{font-size:clamp(38px,12vw,56px)}
  .heroBt{
    flex-direction:column;
    gap:10px
  }
  .heroBt .btnP,
  .heroBt .btnS{
    width:100%;
    min-width:0
  }
  .langCard{padding:24px}
  .langTop{
    gap:14px;
    flex-direction:column
  }
  .langOrb{width:48px;height:48px}
  .langPreview{padding:18px}
  .langPreviewHead{gap:12px}
  .langPreviewBody{font-size:clamp(17px,6vw,22px)}
  .ftCols{grid-template-columns:1fr 1fr;gap:22px}
}

@media(min-width:640px){
  .container{padding:0 24px}
  .sec{padding:74px 0}
  .secTinted{padding:78px 0}
  .secSoft{padding:72px 0}
  .secLanguage{padding-top:70px;padding-bottom:40px}
  .secSecurity{padding-top:40px;padding-bottom:62px}
  .secWaitlist{padding-top:40px;padding-bottom:62px}
  .navR{height:64px}
  .navLks{display:flex}
  .navSignIn{display:inline-flex}
  .problemStrip{grid-template-columns:repeat(3,1fr)}
  .proofGrid{grid-template-columns:repeat(3,1fr)}
  .valueGrid{grid-template-columns:repeat(2,1fr)}
  .audGrid{grid-template-columns:repeat(3,1fr)}
  .roadmapGrid{grid-template-columns:repeat(2,1fr)}
  .trustGrid{grid-template-columns:repeat(2,1fr)}
  .wlF{grid-template-columns:1.2fr .9fr auto}
  .wlBt{width:auto}
  .ftTop{grid-template-columns:1.2fr 2fr;gap:42px}
  .ftCols{grid-template-columns:repeat(3,1fr);gap:28px}
  .wsBody{grid-template-columns:.9fr 1.1fr}
}

@media(min-width:960px){
  .container{padding:0 32px}
  .sec{padding:86px 0}
  .secTinted{padding:90px 0}
  .secSoft{padding:82px 0}
  .secLanguage{padding-top:82px;padding-bottom:46px}
  .secSecurity{padding-top:46px;padding-bottom:72px}
  .secWaitlist{padding-top:46px;padding-bottom:72px}
  .navR{height:68px}
  .heroSec{padding:50px 0 38px}
  .wsShell{padding:18px}
  .roadmapGrid{grid-template-columns:repeat(3,1fr)}
  .valueGrid{grid-template-columns:repeat(4,1fr)}
}

@media(min-width:1100px){
  .heroTi{font-size:clamp(58px,6.7vw,86px)}
}
`;