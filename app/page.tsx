"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import {
  Activity,
  ArrowRight,
  Bell,
  Building2,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Database,
  Eye,
  FileText,
  Globe,
  History,
  Package,
  RefreshCw,
  Share2,
  Shield,
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
  redSoft: "#FEF2F2",
  redDk: "#B91C1C",
};

type Role = "carer" | "household" | "care_team";

const HERO_ROTATING_PHRASES = [
  "what is due soon.",
  "what is delayed.",
  "who owns the next step.",
  "what happens next.",
] as const;

type LanguageOption = {
  label: string;
  nativeLabel: string;
  emoji: string;
  lang: string;
  dir?: "ltr" | "rtl";
  tags: [string, string, string];
  sample: string;
  note: string;
};

const LANGUAGE_OPTIONS: LanguageOption[] = [
  {
    label: "English",
    nativeLabel: "English",
    emoji: "🇬🇧",
    lang: "en-GB",
    dir: "ltr",
    tags: ["Updates", "Letters", "Next steps"],
    sample: "Clear updates that feel calm, natural, and easy to act on.",
    note:
      "Helpful when carers, relatives, or support staff need a shared view of what has been requested, what is ready, and what still needs attention.",
  },
  {
    label: "French",
    nativeLabel: "Français",
    emoji: "🇫🇷",
    lang: "fr",
    dir: "ltr",
    tags: ["Mises à jour", "Lettres", "Prochaines étapes"],
    sample:
      "Des mises à jour claires, naturelles et faciles à comprendre.",
    note:
      "Utile lorsque les aidants, la famille ou le personnel de soutien ont besoin d’une vision partagée de ce qui a été demandé, de ce qui est prêt et de ce qui nécessite encore une attention.",
  },
  {
    label: "Spanish",
    nativeLabel: "Español",
    emoji: "🇪🇸",
    lang: "es",
    dir: "ltr",
    tags: ["Actualizaciones", "Cartas", "Siguientes pasos"],
    sample:
      "Guía sencilla para seguir mejor las solicitudes y el progreso.",
    note:
      "Útil cuando una persona inicia el proceso y otra necesita continuarlo con claridad.",
  },
  {
    label: "Portuguese",
    nativeLabel: "Português",
    emoji: "🇵🇹",
    lang: "pt-PT",
    dir: "ltr",
    tags: ["Atualizações", "Cartas", "Próximos passos"],
    sample:
      "Atualizações claras e tranquilas, fáceis de acompanhar e pôr em prática.",
    note:
      "Útil quando familiares, cuidadores ou equipas de apoio precisam de uma visão partilhada do que foi pedido, do que está pronto e do que ainda precisa de atenção.",
  },
  {
    label: "Yoruba",
    nativeLabel: "Yorùbá",
    emoji: "🇳🇬",
    lang: "yo",
    dir: "ltr",
    tags: ["Àwọn ìmúdójúìwọ̀n", "Àwọn lẹ́tà", "Ìgbésẹ̀ tó kàn"],
    sample:
      "Àwọn ìmúdójúìwọ̀n tó rọrùn láti lóye, tó sì rọrùn láti tẹ̀lé.",
    note:
      "Ó wúlò nígbà tí ẹbí, olùtọ́jú, tàbí àwọn òṣìṣẹ́ àtìlẹ́yìn bá fẹ́ mọ ohun tí a ti béèrè, ohun tí ó ti ṣetán, àti ohun tí ó ṣì nílò àkíyèsí.",
  },
  {
    label: "Arabic",
    nativeLabel: "العربية",
    emoji: "🇸🇦",
    lang: "ar",
    dir: "rtl",
    tags: ["التحديثات", "الرسائل", "الخطوات التالية"],
    sample:
      "تحديثات واضحة وهادئة وسهلة الفهم واتخاذ الإجراء بشأنها.",
    note:
      "مفيد عندما يحتاج مقدمو الرعاية أو أفراد الأسرة أو فريق الدعم إلى رؤية مشتركة لما تم طلبه، وما أصبح جاهزًا، وما لا يزال يحتاج إلى متابعة.",
  },
  {
    label: "Hindi",
    nativeLabel: "हिन्दी",
    emoji: "🇮🇳",
    lang: "hi",
    dir: "ltr",
    tags: ["अपडेट", "पत्र", "अगले कदम"],
    sample:
      "स्पष्ट और आसान अपडेट, जिन्हें समझना और उन पर काम करना सरल हो.",
    note:
      "यह तब उपयोगी है जब देखभाल करने वालों, परिवार के लोगों या सहायता कर्मचारियों को यह साझा रूप से देखना हो कि क्या अनुरोध किया गया है, क्या तैयार है, और किस पर अभी ध्यान देने की ज़रूरत है.",
  },
  {
    label: "Urdu",
    nativeLabel: "اردو",
    emoji: "🇵🇰",
    lang: "ur",
    dir: "rtl",
    tags: ["اپ ڈیٹس", "خطوط", "اگلے مراحل"],
    sample:
      "واضح اور آسان اپ ڈیٹس جنہیں سمجھنا اور ان پر عمل کرنا آسان ہو۔",
    note:
      "یہ اُس وقت مفید ہے جب گھر والوں، کیئررز یا سپورٹ اسٹاف کو ایک مشترکہ نظر چاہیے ہو کہ کیا درخواست دی گئی ہے، کیا تیار ہے، اور کس چیز پر ابھی توجہ درکار ہے۔",
  },
  {
    label: "Mandarin",
    nativeLabel: "中文",
    emoji: "🇨🇳",
    lang: "zh-CN",
    dir: "ltr",
    tags: ["更新", "信件", "下一步"],
    sample:
      "清晰、自然、容易理解的更新，让后续处理更轻松。",
    note:
      "适用于照护者、家属或支持团队需要共同了解已提交的内容、已准备好的事项，以及仍需跟进的问题。",
  },
];

/* ──────────────────────────────────────────────────────────────
   Hooks
   ────────────────────────────────────────────────────────────── */
function formatTodayLabel(date: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).formatToParts(date);

  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
  const day = parts.find((p) => p.type === "day")?.value ?? "";
  const month = parts.find((p) => p.type === "month")?.value ?? "";

  return `${weekday}, ${day} ${month}`;
}

function useTodayLabel() {
  const [label, setLabel] = useState("");

  useEffect(() => {
    const update = () => setLabel(formatTodayLabel(new Date()));
    update();

    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return label;
}

function useCyclingTypewriter(
  phrases: readonly string[],
  opts: {
    typeSpeed?: number;
    deleteSpeed?: number;
    holdMs?: number;
    pauseMs?: number;
  } = {}
) {
  const {
    typeSpeed = 48,
    deleteSpeed = 26,
    holdMs = 1700,
    pauseMs = 320,
  } = opts;

  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<
    "typing" | "holding" | "deleting" | "paused"
  >("typing");

  useEffect(() => {
    const current = phrases[index] ?? "";
    let t: number | undefined;

    if (phase === "typing") {
      if (text.length < current.length) {
        t = window.setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          typeSpeed
        );
      } else {
        t = window.setTimeout(() => setPhase("holding"), 10);
      }
    } else if (phase === "holding") {
      t = window.setTimeout(() => setPhase("deleting"), holdMs);
    } else if (phase === "deleting") {
      if (text.length > 0) {
        t = window.setTimeout(
          () => setText(current.slice(0, text.length - 1)),
          deleteSpeed
        );
      } else {
        t = window.setTimeout(() => setPhase("paused"), 10);
      }
    } else {
      t = window.setTimeout(() => {
        setIndex((i) => (i + 1) % phrases.length);
        setPhase("typing");
      }, pauseMs);
    }

    return () => {
      if (t) window.clearTimeout(t);
    };
  }, [text, phase, index, phrases, typeSpeed, deleteSpeed, holdMs, pauseMs]);

  return { text, index };
}

function useRetypingTypewriter(value: string, speed = 24) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    if (!value) return;

    let cancelled = false;
    let i = 0;
    let timer: number;

    const tick = () => {
      if (cancelled) return;
      i += 1;
      setDisplayed(value.slice(0, i));
      if (i < value.length) {
        timer = window.setTimeout(tick, speed);
      }
    };

    timer = window.setTimeout(tick, speed);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [value, speed]);

  return displayed;
}

/* ──────────────────────────────────────────────────────────────
   Small UI primitives
   ────────────────────────────────────────────────────────────── */
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

/* ──────────────────────────────────────────────────────────────
   Hero ticker
   ────────────────────────────────────────────────────────────── */
function HeroTicker() {
  const { text } = useCyclingTypewriter(HERO_ROTATING_PHRASES);

  return (
    <div className="heroTk" aria-live="polite">
      <span className="heroTkDot" aria-hidden="true" />
      <span className="heroTkLbl">Laura sees</span>
      <span className="heroTkTxt">
        {text}
        <span className="heroTkCursor" aria-hidden="true" />
      </span>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Language Experience
   ────────────────────────────────────────────────────────────── */
function LanguageExperience() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [manual, setManual] = useState(false);

  useEffect(() => {
    if (manual) return;

    const id = window.setInterval(() => {
      setActiveIdx((p) => (p + 1) % LANGUAGE_OPTIONS.length);
    }, 3600);

    return () => window.clearInterval(id);
  }, [manual]);

  const active = LANGUAGE_OPTIONS[activeIdx];
  const typedBody = useRetypingTypewriter(active.sample, 20);

  const handlePick = useCallback((i: number) => {
    setManual(true);
    setActiveIdx(i);
  }, []);

  return (
    <div className="langCard">
      <div className="langTop">
        <div className="langOrb">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Globe size={22} />
          </motion.div>
        </div>

        <div className="langTopText">
          <Overline tone="warm">Clarity that feels familiar</Overline>
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
        {LANGUAGE_OPTIONS.map((item, i) => {
          const isActive = i === activeIdx;

          return (
            <button
              key={item.label}
              type="button"
              className={`langChip ${isActive ? "langChipA" : ""}`}
              onClick={() => handlePick(i)}
              aria-pressed={isActive}
            >
              <span className="langChipFlag" aria-hidden="true">
                {item.emoji}
              </span>
              <span>{item.label}</span>
              {isActive ? (
                <motion.span
                  layoutId="langChipGlow"
                  className="langChipGlow"
                  transition={{ type: "spring", damping: 24, stiffness: 280 }}
                />
              ) : null}
            </button>
          );
        })}

        <button type="button" className="langChip langChipMore" disabled>
          <span className="langChipFlag" aria-hidden="true">
            🌍
          </span>
          <span>40+ more</span>
        </button>
      </div>

      <div className="langPreview">
        <div className="langPreviewHead">
          <div className="langPreviewId">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.label}
                className="langPreviewLabel"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.24 }}
          >
                {active.nativeLabel}
              </motion.div>
            </AnimatePresence>

            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.label}
                  className="langPreviewLabel"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.24 }}
                >
                  {active.label}
                </motion.div>
              </AnimatePresence>

              <div className="langPreviewMeta">
                <span className="langPreviewPulse" aria-hidden="true" />
                <span>Live preview</span>
              </div>
            </div>
          </div>

          <div className="langPreviewTags">
            {active.tags.map((tag) => (
              <span key={tag} className="langPreviewTag">
                {tag}
              </span>
          ))}
        </div>
        </div>

        <p
          className="langPreviewBody"
          lang={active.lang}
          dir={active.dir ?? "ltr"}
        >
        {typedBody}
        <span className="langPreviewCursor" aria-hidden="true" />
      </p>

        <AnimatePresence mode="wait">
          <motion.p
            key={active.label}
            className="langPreviewNote"
            lang={active.lang}
            dir={active.dir ?? "ltr"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.28, delay: 0.12 }}
          >
            {active.note}
        </motion.p>
        </AnimatePresence>

        <div className="langProgress" aria-hidden="true">
          {LANGUAGE_OPTIONS.map((item, i) => (
            <span
              key={item.label}
              className={`langProgressBar ${
                i === activeIdx ? "langProgressBarA" : ""
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Success modal
   ────────────────────────────────────────────────────────────── */
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
      {open ? (
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
      ) : null}
    </AnimatePresence>
  );
}

/* ──────────────────────────────────────────────────────────────
   Laura Workspace
   ────────────────────────────────────────────────────────────── */
function LauraWorkspace() {
  type Step = { state: "done" | "active"; label: string; meta: string };

  type Person = {
    initials: string;
    name: string;
    age: number;
    med: string;
    dose: string;
    tone: "warm" | "blue" | "green";
    owner: string;
    ownerRole: string;
    status: string;
    statusSub: string;
    practice: string;
    pharmacy: string;
    rxId: string;
    timeline: Step[];
    next: string;
  };

  const people: Person[] = [
    {
      initials: "ML",
      name: "Margaret Littlewood",
      age: 78,
      med: "Amlodipine",
      dose: "5mg · once daily",
      tone: "warm",
      owner: "Ada",
      ownerRole: "daughter",
      status: "Needs follow-up",
      statusSub: "No update from practice in 3 days",
      practice: "Greenfield Medical",
      pharmacy: "Boots · High Street",
      rxId: "RX-20814",
      timeline: [
        { state: "done", label: "Draft prepared", meta: "Mon 09:14" },
        { state: "done", label: "Sent to practice", meta: "Tue 11:32" },
        { state: "done", label: "Practice acknowledged", meta: "Tue 16:05" },
        { state: "active", label: "Awaiting response", meta: "3 days" },
      ],
      next: "Ada to call the practice before 4pm today.",
    },
    {
      initials: "DR",
      name: "David Reyes",
      age: 64,
      med: "Metformin",
      dose: "500mg · twice daily",
      tone: "blue",
      owner: "Laura",
      ownerRole: "auto",
      status: "Request sent",
      statusSub: "Pharmacy processing",
      practice: "Northgate Surgery",
      pharmacy: "Well · Market Square",
      rxId: "RX-20819",
      timeline: [
        { state: "done", label: "Draft prepared", meta: "Tue 08:02" },
        { state: "done", label: "Approved by Jamie", meta: "Tue 09:41" },
        { state: "done", label: "Sent to pharmacy", meta: "Wed 10:15" },
        { state: "active", label: "Awaiting confirmation", meta: "today" },
      ],
      next: "No action needed. Laura will alert on any change.",
    },
    {
      initials: "IK",
      name: "Irene Kowalski",
      age: 81,
      med: "Sertraline",
      dose: "50mg · once daily",
      tone: "green",
      owner: "Support worker",
      ownerRole: "care team",
      status: "Ready to collect",
      statusSub: "Boots · 12 High Street",
      practice: "Hillside Practice",
      pharmacy: "Boots · High Street",
      rxId: "RX-20806",
      timeline: [
        { state: "done", label: "Draft prepared", meta: "Fri 14:20" },
        { state: "done", label: "Sent to practice", meta: "Mon 09:03" },
        { state: "done", label: "Dispensed", meta: "today 11:20" },
        { state: "done", label: "Ready at pharmacy", meta: "today 12:44" },
      ],
      next: "Collection window open until 6pm.",
    },
  ];

  const stats = [
    { label: "Due soon", value: 5, tone: "warm" as const },
    { label: "Delayed", value: 1, tone: "red" as const },
    { label: "Ready", value: 2, tone: "green" as const },
  ];

  const activity: {
    who: string;
    what: string;
    when: string;
    tone: "warm" | "blue" | "green";
  }[] = [
    {
      who: "Laura",
      what: "drafted Metformin refill for David Reyes",
      when: "2m ago",
      tone: "blue",
    },
    {
      who: "Ada",
      what: "approved amlodipine request for Margaret",
      when: "14m ago",
      tone: "warm",
    },
    {
      who: "Boots",
      what: "marked Sertraline as ready for collection",
      when: "42m ago",
      tone: "green",
    },
  ];

  const [active, setActive] = useState(0);
  const todayLabel = useTodayLabel();

  useEffect(() => {
    const t = window.setInterval(() => {
      setActive((p) => (p + 1) % people.length);
    }, 4400);

    return () => window.clearInterval(t);
  }, [people.length]);

  const current = people[active];

  return (
    <div className="wsWrap">
      <motion.div
        className="wsGlow"
        animate={{ opacity: [0.08, 0.2, 0.08] }}
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
              <div className="wsBrandSub">
                <span className="wsLive">
                  <span className="wsLiveDot" aria-hidden="true" />
                  Live
                </span>
                <span className="wsBrandSep" aria-hidden="true">
                  ·
                </span>
                <span className="wsBrandDate">{todayLabel || "..."}</span>
              </div>
            </div>
          </div>

          <div className="wsHeadRight">
            <div className="wsHeadAvatars" aria-hidden="true">
              <span className="wsHeadAv wsHeadAv--warm">A</span>
              <span className="wsHeadAv wsHeadAv--blue">J</span>
              <span className="wsHeadAv wsHeadAv--green">S</span>
            </div>
          </div>
        </div>

        <div className="wsStats">
          {stats.map((s) => (
            <div key={s.label} className={`wsStat wsStat--${s.tone}`}>
              <div className="wsStatVal">{s.value}</div>
              <div className="wsStatLbl">{s.label}</div>
            </div>
          ))}
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
                    <div className="wsRowNm">
                      {p.name}
                      <span className="wsRowAge">· {p.age}</span>
                    </div>
                    <div className="wsRowMd">
                      {p.med} <span className="wsRowDose">{p.dose}</span>
                    </div>
                    <div className={`wsRowSt wsRowSt--${p.tone}`}>
                      <span className="wsRowStDot" aria-hidden="true" />
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
                    <div className="wsDtMd">
                      {current.med} {current.dose}
                    </div>
                  </div>

                  <div className="wsDtRx">
                    <div className="wsDtRxLbl">Rx</div>
                    <div className="wsDtRxVal">{current.rxId}</div>
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
                    <span className="wsDtMetaVal">
                      {current.owner}
                      <span className="wsDtMetaSub"> · {current.ownerRole}</span>
                    </span>
                  </div>

                  <div className="wsDtMetaRow">
                    <span className="wsDtMetaLbl">Practice</span>
                    <span className="wsDtMetaVal wsDtMetaValSub">
                      {current.practice}
                    </span>
                  </div>

                  <div className="wsDtMetaRow">
                    <span className="wsDtMetaLbl">Pharmacy</span>
                    <span className="wsDtMetaVal wsDtMetaValSub">
                      {current.pharmacy}
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
                  <div className="wsDtNextHd">
                    <span className="wsDtNextLbl">Next</span>
                    <span className="wsDtNextClock">
                      <Clock size={10} /> today
                    </span>
                  </div>
                  <div className="wsDtNextTx">{current.next}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="wsFeed">
          <div className="wsFeedHd">
            <Activity size={11} />
            <span>Activity</span>
          </div>

          <div className="wsFeedList">
            {activity.map((a, i) => (
              <motion.div
                key={`${a.who}-${i}`}
                className="wsFeedItem"
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
              >
                <span className={`wsFeedDot wsFeedDot--${a.tone}`} />
                <span className="wsFeedWho">{a.who}</span>
                <span className="wsFeedWhat">{a.what}</span>
                <span className="wsFeedWhen">{a.when}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Home scene
   ────────────────────────────────────────────────────────────── */
function HomeScene() {
  const captions = [
    "Laura quietly keeps track before supply becomes urgent.",
    "A reminder arrives before anyone starts chasing.",
    "The next request is prepared and easy to review.",
    "Parent and carer can both see what is happening.",
    "The request is confirmed and nothing is dropped.",
  ];

  const [step, setStep] = useState(0);
  const typedCaption = useRetypingTypewriter(captions[step], 22);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setStep((s) => (s + 1) % 5);
    }, 2600);

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
        <line
          x1="240"
          y1="18"
          x2="240"
          y2="128"
          stroke="#C8D8E5"
          strokeWidth="1"
        />
        <line
          x1="170"
          y1="73"
          x2="310"
          y2="73"
          stroke="#C8D8E5"
          strokeWidth="1"
        />
        <rect x="171" y="19" width="138" height="108" rx="5" fill="url(#winGlow)" />
        <defs>
          <linearGradient id="winGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8F4FC" />
            <stop offset="100%" stopColor="#C8E8F8" />
          </linearGradient>
        </defs>
        <path
          d="M170,18 Q158,60 163,128 L170,128 Z"
          fill="#D4CCBC"
          opacity="0.6"
        />
        <path
          d="M310,18 Q322,60 317,128 L310,128 Z"
          fill="#D4CCBC"
          opacity="0.6"
        />
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
        <circle
          cx="353"
          cy="135"
          r="6"
          fill="none"
          stroke="#8A7A6A"
          strokeWidth="1.2"
        />
        <circle
          cx="367"
          cy="135"
          r="6"
          fill="none"
          stroke="#8A7A6A"
          strokeWidth="1.2"
        />
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
          {step >= 1 ? (
            <motion.circle
              cx="91"
              cy="168"
              r="4"
              fill="#EF4444"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
            />
          ) : null}
          {step >= 1 ? (
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
          ) : null}
        </motion.g>

        <AnimatePresence>
          {step === 1 ? (
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
              <rect x="128" y="97" width="72" height="3.5" rx="1.75" fill="#888E9C" />
              <rect x="128" y="102" width="60" height="3.5" rx="1.75" fill="#888E9C" />
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
                <filter id="notifShadow" x="-10%" y="-10%" width="120%" height="140%">
                  <feDropShadow
                    dx="0"
                    dy="4"
                    stdDeviation="8"
                    floodColor="rgba(0,0,0,0.08)"
                  />
                </filter>
              </defs>
            </motion.g>
          ) : null}
        </AnimatePresence>

        <AnimatePresence>
          {step >= 2 && step <= 3 ? (
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
          ) : null}
        </AnimatePresence>

        <AnimatePresence>
          {step === 4 ? (
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
          ) : null}
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
        <span className="sceneCapTx">
          {typedCaption}
          <span className="sceneCapCursor" aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Care home scene
   ────────────────────────────────────────────────────────────── */
function CareHomeScene() {
  const captions = [
    "Every resident stays visible in one place.",
    "Drafts are prepared before supply becomes urgent.",
    "Staff can see status across residents at a glance.",
    "Less switching, less calling, less uncertainty.",
  ];

  const [tick, setTick] = useState(0);
  const typedCaption = useRetypingTypewriter(captions[tick % 4], 22);

  useEffect(() => {
    const t = window.setInterval(() => setTick((p) => p + 1), 2800);
    return () => window.clearInterval(t);
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
              {i === 0 ? (
                <path
                  d={`M${bx + 6},138 Q${bx + 8},125 ${bx + 22},124 Q${bx + 36},125 ${bx + 38},138`}
                  fill="#E8E4DC"
                />
              ) : null}
              {i === 1 ? (
                <path
                  d={`M${bx + 8},136 Q${bx + 10},126 ${bx + 22},125 Q${bx + 34},126 ${bx + 36},136`}
                  fill="#3A3028"
                />
              ) : null}
              {i === 2 ? (
                <path
                  d={`M${bx + 7},137 Q${bx + 9},126 ${bx + 22},125 Q${bx + 35},126 ${bx + 37},137`}
                  fill="#7A6858"
                />
              ) : null}
              {i === 0 ? (
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
              ) : null}
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
                    style={{
                      filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.07))",
                    }}
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
        <span className="sceneCapTx">
          {typedCaption}
          <span className="sceneCapCursor" aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Page
   ────────────────────────────────────────────────────────────── */
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
      tone: "warm" as const,
    },
    {
      icon: <RefreshCw size={22} />,
      title: "Keep ownership clear",
      body: "See who handled the request last, who owns the next step, and what should happen next.",
      tone: "blue" as const,
    },
    {
      icon: <Package size={22} />,
      title: "Follow every update",
      body: "Track progress from preparation to ready without losing the thread along the way.",
      tone: "green" as const,
    },
  ];

  const audienceCards = [
    {
      icon: <Users size={22} />,
      title: "Family carers",
      body: "For people helping a parent, partner, or relative stay on top of repeat prescriptions without carrying every detail alone.",
      tone: "warm" as const,
    },
    {
      icon: <RefreshCw size={22} />,
      title: "Households",
      body: "For homes managing medication admin across more than one person, where visibility and handoff matter.",
      tone: "blue" as const,
    },
    {
      icon: <Building2 size={22} />,
      title: "Care teams",
      body: "For supported living, residential care, and teams coordinating repeat-prescription workflows across residents.",
      tone: "green" as const,
    },
  ];

  const valueCards = [
    {
      icon: <Bell size={22} />,
      title: "Less chasing",
      body: "Surface what is due soon, delayed, or still unresolved before it turns into repeated checking and calls.",
      tone: "warm" as const,
    },
    {
      icon: <FileText size={22} />,
      title: "Shared context",
      body: "Keep notes, updates, and timelines together so staff and family are not working from fragments.",
      tone: "blue" as const,
    },
    {
      icon: <Users size={22} />,
      title: "Better handover",
      body: "Make follow-through easier when one person prepares the request and someone else needs to carry it forward.",
      tone: "green" as const,
    },
    {
      icon: <Package size={22} />,
      title: "Calmer follow-through",
      body: "Turn a messy process into something clearer, more visible, and easier to stay on top of.",
      tone: "warm" as const,
    },
  ];

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
  ];

  const trustCards = [
    {
      icon: <Shield size={18} />,
      title: "Protected access",
      body: "Built with secure sign-in and controlled access from day one.",
    },
    {
      icon: <Eye size={18} />,
      title: "Clear visibility",
      body: "The right people see the right information, with clearer boundaries across family and care teams.",
    },
    {
      icon: <History size={18} />,
      title: "Audit history",
      body: "A clearer record of updates, ownership changes, and follow-through over time.",
    },
    {
      icon: <Database size={18} />,
      title: "Focused data collection",
      body: "Designed to stay narrow and collect only what is needed for the workflow.",
    },
  ];

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
          <div className="heroBgGrid" aria-hidden="true" />
          <div className="heroBgGlow" aria-hidden="true" />

          <div className="container heroGrid">
            <div className="heroTxt">

              <FI delay={0.1}>
                <h1 className="serif heroTi">
                  Coordinate repeat
                  <br className="heroBr" /> prescriptions{" "}
                  <span className="heroAc">without the chasing.</span>
                </h1>
              </FI>

              <FI delay={0.16}>
                <p className="heroSub">
                  Laura helps carers and care teams keep repeat prescription
                  requests visible across multiple people, with clearer
                  ownership, calmer follow-through, and less admin friction.
                </p>
              </FI>

              <FI delay={0.22}>
                <HeroTicker />
              </FI>

              <FI delay={0.28}>
                <div className="heroBt">
                  <a
                    href="mailto:hello@omela.ai?subject=Omela%20pilot%20conversation"
                    className="btnP heroBtP"
                  >
                    Book pilot conversation
                    <ArrowRight size={14} />
                  </a>
                  <a href="#waitlist" className="btnS heroBtS">
                    Join early access
                  </a>
                </div>
              </FI>

              <FI delay={0.32}>
                <div className="heroTrust">
                  <div className="heroTrustAvs" aria-hidden="true">
                    <span className="heroTrustAv heroTrustAv--warm">A</span>
                    <span className="heroTrustAv heroTrustAv--blue">J</span>
                    <span className="heroTrustAv heroTrustAv--green">S</span>
                  </div>
                  <p className="heroTrustTx">
                    Built with carers, households, and care teams across the UK.
                  </p>
                </div>
              </FI>
            </div>

            <FI delay={0.18} className="heroBoardCol">
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
                    t: "Small prescription admin turns into repeated checking, calls, and stress.",
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
                    <div className="proofTop">
                      <span className="proofNo">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="proofArrow">
                        <ArrowRight size={14} />
                      </span>
                    </div>

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

        <section className="sec secStories">
          <div className="container">
            <FI>
              <div className="shW">
                <Overline tone="warm">How it looks in real life</Overline>
                <h2 className="serif shT shTSpaced">
                  Made for the moments where follow-through usually breaks.
                </h2>
                <p className="shB">
                  From helping a parent at home to coordinating across residents,
                  Laura is designed to keep the next step visible.
                </p>
              </div>
            </FI>

            <div className="scenesGrid">
              <FI delay={0.04}>
                <div className="sceneCard">
                  <div className="sceneCardHead">
                    <div className="sceneMeta">
                      <span className="sceneStep">01</span>
                      <span className="sceneArrow">
                        <ArrowRight size={14} />
                      </span>
                      <Overline tone="warm">Home coordination</Overline>
                    </div>

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
                    <div className="sceneMeta">
                      <span className="sceneStep sceneStepBlue">02</span>
                      <span className="sceneArrow sceneArrowBlue">
                        <ArrowRight size={14} />
                      </span>
                      <Overline tone="blue">Care team coordination</Overline>
                    </div>

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
                  <div className="boundaryHd">
                    <Overline>Boundaries and trust</Overline>
                    <div className="boundaryCount">04</div>
                  </div>

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
                    <FI key={item.title} delay={i * 0.05}>
                      <div className="trustCard">
                        <div className="trustCardTop">
                          <div className="trustNo">
                            {String(i + 1).padStart(2, "0")}
                          </div>
                          <div className="trustIc">{item.icon}</div>
                          <span className="trustArrow">
                            <ArrowRight size={13} />
                          </span>
                        </div>

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
.container{max-width:1180px;margin:0 auto;padding:0 20px}

.sec{padding:56px 0}
.secTight{padding:18px 0 8px}
.secTinted{padding:60px 0;background:linear-gradient(180deg,#F5F1EA,${c.bg})}
.secSoft{padding:56px 0;background:linear-gradient(180deg,rgba(255,255,255,.35),rgba(248,246,241,.65))}
.secStories{padding-top:24px;padding-bottom:20px}
.secLanguage{padding-top:48px;padding-bottom:30px}
.secSecurity{padding-top:28px;padding-bottom:48px}
.secWaitlist{padding-top:30px;padding-bottom:48px}

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
  background:rgba(255,255,255,.92);
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
.shW{text-align:center;max-width:720px;margin:0 auto}
.shT{
  font-size:clamp(26px,4.6vw,46px);
  line-height:1.05;
  letter-spacing:-.045em
}
.shTSpaced{margin-top:12px}
.shB{
  font-size:clamp(14px,2vw,16px);
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
.navCt{
  padding:9px 16px!important;
  font-size:12px!important;
  flex-shrink:0
}

/* ───── Hero ───── */
.heroSec{
  padding:36px 0 44px;
  position:relative;
  overflow:hidden
}
.heroBgGrid{
  position:absolute;
  inset:0;
  background-image:
    linear-gradient(rgba(201,149,107,.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(201,149,107,.04) 1px, transparent 1px);
  background-size:48px 48px;
  mask-image:radial-gradient(ellipse at center, #000 25%, transparent 70%);
  -webkit-mask-image:radial-gradient(ellipse at center, #000 25%, transparent 70%);
  pointer-events:none
}
.heroBgGlow{
  position:absolute;
  top:-120px;
  right:-160px;
  width:520px;
  height:520px;
  background:radial-gradient(circle,rgba(201,149,107,.14),transparent 70%);
  pointer-events:none;
  z-index:0
}
.heroGrid{
  position:relative;
  display:grid;
  grid-template-columns:1fr;
  gap:28px;
  align-items:center
}
.heroTxt{
  max-width:640px;
  margin:0 auto;
  text-align:center
}
.heroPill{
  display:inline-flex;
  align-items:center;
  gap:8px;
  padding:7px 14px;
  border-radius:999px;
  background:rgba(255,255,255,.88);
  border:1px solid ${c.border};
  box-shadow:0 2px 8px rgba(0,0,0,.03);
  user-select:none
}
.heroPillDot{
  width:7px;
  height:7px;
  border-radius:50%;
  background:${c.warm};
  box-shadow:0 0 0 3px rgba(201,149,107,.18);
  animation:pulse 2s ease-in-out infinite
}
.heroPillTxt{
  font-size:11.5px;
  font-weight:700;
  letter-spacing:.04em;
  color:${c.sub}
}
.heroTi{
  margin-top:18px;
  font-size:clamp(36px,8vw,72px);
  line-height:.96;
  letter-spacing:-.055em
}
.heroBr{display:none}
.heroAc{
  display:inline-block;
  background:linear-gradient(135deg,#A97549 0%,#D6A47C 45%,#B98558 72%,#8E5E39 100%);
  -webkit-background-clip:text;
  background-clip:text;
  color:transparent
}
.heroSub{
  margin-top:16px;
  font-size:clamp(14.5px,2vw,17px);
  line-height:1.7;
  color:${c.sub};
  max-width:580px;
  margin-left:auto;
  margin-right:auto
}
.heroTk{
  display:inline-flex;
  align-items:center;
  gap:10px;
  margin-top:18px;
  padding:9px 14px 9px 12px;
  border-radius:999px;
  background:linear-gradient(135deg,#FFF8F0,#F4F7FF);
  border:1px solid rgba(201,149,107,.2);
  box-shadow:0 4px 14px rgba(0,0,0,.04);
  max-width:100%
}
.heroTkDot{
  width:7px;
  height:7px;
  border-radius:50%;
  background:${c.warm};
  box-shadow:0 0 0 3px rgba(201,149,107,.22);
  flex-shrink:0;
  animation:pulse 1.8s ease-in-out infinite
}
.heroTkLbl{
  font-size:10.5px;
  font-weight:800;
  letter-spacing:.14em;
  text-transform:uppercase;
  color:${c.warmDk};
  flex-shrink:0
}
.heroTkTxt{
  font-size:13.5px;
  font-weight:700;
  color:${c.text};
  display:inline-flex;
  align-items:center;
  letter-spacing:-.005em;
  min-width:0;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis
}
.heroTkCursor{
  display:inline-block;
  width:1.5px;
  height:15px;
  background:${c.warm};
  border-radius:1px;
  margin-left:2px;
  flex-shrink:0;
  animation:blink 1s step-end infinite
}
@keyframes blink{
  0%,49%{opacity:1}
  50%,100%{opacity:0}
}
@keyframes pulse{
  0%,100%{opacity:.55;transform:scale(.9)}
  50%{opacity:1;transform:scale(1.15)}
}
.heroBt{
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
  align-items:center;
  gap:10px;
  margin-top:22px
}
.heroBtP,.heroBtS{
  min-height:50px;
  padding:14px 22px;
  font-size:14.5px
}
.heroTrust{
  display:flex;
  align-items:center;
  gap:10px;
  justify-content:center;
  margin-top:20px;
  flex-wrap:wrap
}
.heroTrustAvs{display:inline-flex;align-items:center}
.heroTrustAv{
  width:26px;
  height:26px;
  border-radius:50%;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  font-size:10px;
  font-weight:800;
  border:2px solid ${c.bg};
  user-select:none
}
.heroTrustAv + .heroTrustAv{margin-left:-8px}
.heroTrustAv--warm{
  background:linear-gradient(135deg,#F7E7D2,#F0D5B6);
  color:${c.warmDk}
}
.heroTrustAv--blue{
  background:linear-gradient(135deg,#E3EDFB,#C9DBF6);
  color:#1E40AF
}
.heroTrustAv--green{
  background:linear-gradient(135deg,#DFF3E4,#C7E8CF);
  color:${c.greenDk}
}
.heroTrustTx{
  font-size:12px;
  color:${c.muted};
  font-weight:500
}
.heroBoardCol{
  display:flex;
  justify-content:center;
  width:100%
}

/* ───── Workspace ───── */
.wsWrap{width:100%;max-width:560px;position:relative}
.wsGlow{
  position:absolute;
  inset:-36px;
  border-radius:52px;
  background:radial-gradient(circle,rgba(201,149,107,.08),transparent 68%);
  z-index:0
}
.wsShell{
  position:relative;
  z-index:1;
  background:rgba(255,255,255,.97);
  border:1px solid rgba(227,221,210,.92);
  border-radius:26px;
  padding:16px;
  box-shadow:
    0 1px 0 rgba(255,255,255,.9) inset,
    0 22px 48px rgba(14,18,26,.08),
    0 4px 14px rgba(14,18,26,.04)
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
  font-size:18px;
  font-weight:400;
  letter-spacing:-.03em;
  color:${c.text}
}
.wsBrandSub{
  display:flex;
  align-items:center;
  gap:6px;
  margin-top:4px;
  font-size:10px;
  font-weight:700;
  color:${c.muted}
}
.wsLive{
  display:inline-flex;
  align-items:center;
  gap:5px;
  color:${c.greenDk};
  letter-spacing:.04em;
  text-transform:uppercase;
  font-size:9.5px
}
.wsLiveDot{
  width:6px;
  height:6px;
  border-radius:50%;
  background:${c.green};
  box-shadow:0 0 0 2px rgba(34,197,94,.2);
  animation:pulse 1.6s ease-in-out infinite
}
.wsBrandSep{color:${c.border}}
.wsBrandDate{color:${c.sub};font-weight:700}
.wsHeadRight{display:flex;align-items:center;gap:8px}
.wsHeadAvatars{display:inline-flex;align-items:center}
.wsHeadAv{
  width:22px;
  height:22px;
  border-radius:50%;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  font-size:9px;
  font-weight:800;
  border:1.5px solid #fff;
  user-select:none
}
.wsHeadAv + .wsHeadAv{margin-left:-6px}
.wsHeadAv--warm{background:linear-gradient(135deg,#F7E7D2,#F0D5B6);color:${c.warmDk}}
.wsHeadAv--blue{background:linear-gradient(135deg,#E3EDFB,#C9DBF6);color:#1E40AF}
.wsHeadAv--green{background:linear-gradient(135deg,#DFF3E4,#C7E8CF);color:${c.greenDk}}

.wsStats{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:8px;
  margin-top:12px
}
.wsStat{
  padding:10px 12px;
  border-radius:14px;
  background:${c.cream};
  border:1px solid ${c.borderSoft}
}
.wsStat--warm{
  background:linear-gradient(180deg,#FFF8F0,#FDF3E6);
  border-color:rgba(201,149,107,.2)
}
.wsStat--red{
  background:linear-gradient(180deg,#FEF6F6,#FCECEC);
  border-color:rgba(239,68,68,.18)
}
.wsStat--green{
  background:linear-gradient(180deg,#F3FBF5,#E8F5EC);
  border-color:rgba(34,197,94,.2)
}
.wsStatVal{
  font-family:var(--font-instrument-serif),Georgia,serif;
  font-size:22px;
  font-weight:400;
  line-height:1;
  letter-spacing:-.02em
}
.wsStat--warm .wsStatVal{color:${c.warmDk}}
.wsStat--red .wsStatVal{color:${c.redDk}}
.wsStat--green .wsStatVal{color:${c.greenDk}}
.wsStatLbl{
  margin-top:4px;
  font-size:10px;
  font-weight:700;
  letter-spacing:.06em;
  text-transform:uppercase;
  color:${c.muted}
}

.wsBody{
  display:grid;
  grid-template-columns:1fr;
  gap:12px;
  margin-top:12px
}

.wsList{
  background:${c.cream};
  border:1px solid ${c.borderSoft};
  border-radius:18px;
  padding:8px
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
  padding:6px 8px 8px;
  user-select:none
}
.wsListCt{
  font-size:10px;
  color:${c.muted}
}
.wsRow{
  display:flex;
  align-items:flex-start;
  gap:10px;
  width:100%;
  padding:10px;
  border:none;
  background:transparent;
  border-radius:12px;
  cursor:pointer;
  text-align:left;
  transition:background .25s, box-shadow .25s
}
.wsRow + .wsRow{margin-top:2px}
.wsRowA{
  background:#fff;
  box-shadow:0 4px 14px rgba(14,18,26,.05)
}
.wsAv{
  width:32px;
  height:32px;
  border-radius:50%;
  flex-shrink:0;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:10.5px;
  font-weight:800;
  letter-spacing:.03em;
  border:1px solid rgba(0,0,0,.04);
  user-select:none
}
.wsAv--warm{background:linear-gradient(135deg,#F7E7D2,#F0D5B6);color:${c.warmDk}}
.wsAv--blue{background:linear-gradient(135deg,#E3EDFB,#C9DBF6);color:#1E40AF}
.wsAv--green{background:linear-gradient(135deg,#DFF3E4,#C7E8CF);color:${c.greenDk}}
.wsAvLg{
  width:44px;
  height:44px;
  font-size:13px
}
.wsRowTx{flex:1;min-width:0}
.wsRowNm{
  font-size:12.5px;
  font-weight:800;
  letter-spacing:-.015em;
  color:${c.text};
  display:flex;
  align-items:baseline;
  gap:5px
}
.wsRowAge{
  font-size:10.5px;
  color:${c.muted};
  font-weight:500
}
.wsRowMd{
  margin-top:2px;
  font-size:11px;
  color:${c.sub};
  font-weight:600
}
.wsRowDose{
  color:${c.muted};
  font-weight:500
}
.wsRowSt{
  margin-top:5px;
  font-size:10.2px;
  font-weight:700;
  letter-spacing:.02em;
  display:inline-flex;
  align-items:center;
  gap:5px
}
.wsRowStDot{
  width:5px;
  height:5px;
  border-radius:50%
}
.wsRowSt--warm{color:${c.warmDk}}
.wsRowSt--warm .wsRowStDot{background:${c.warm}}
.wsRowSt--blue{color:${c.accent}}
.wsRowSt--blue .wsRowStDot{background:${c.accent}}
.wsRowSt--green{color:${c.greenDk}}
.wsRowSt--green .wsRowStDot{background:${c.green}}

.wsDetail{
  background:${c.cream};
  border:1px solid ${c.borderSoft};
  border-radius:18px;
  padding:16px
}
.wsDtHd{
  display:flex;
  align-items:center;
  gap:12px;
  padding-bottom:12px;
  border-bottom:1px solid rgba(227,221,210,.7)
}
.wsDtHdTx{flex:1;min-width:0}
.wsDtNm{
  font-size:14px;
  font-weight:800;
  letter-spacing:-.02em;
  color:${c.text}
}
.wsDtMd{
  margin-top:3px;
  font-size:11.5px;
  color:${c.sub};
  font-weight:500
}
.wsDtRx{
  text-align:right;
  line-height:1.1
}
.wsDtRxLbl{
  font-size:8px;
  font-weight:800;
  letter-spacing:.14em;
  text-transform:uppercase;
  color:${c.muted}
}
.wsDtRxVal{
  margin-top:4px;
  font-size:10.5px;
  font-weight:800;
  color:${c.text};
  font-variant-numeric:tabular-nums
}
.wsDtMeta{
  display:flex;
  flex-direction:column;
  gap:7px;
  margin-top:12px
}
.wsDtMetaRow{
  display:flex;
  align-items:baseline;
  gap:10px;
  font-size:11px
}
.wsDtMetaLbl{
  flex-shrink:0;
  width:60px;
  font-size:9px;
  font-weight:800;
  letter-spacing:.1em;
  text-transform:uppercase;
  color:${c.muted};
  user-select:none
}
.wsDtMetaVal{
  font-weight:700;
  color:${c.text};
  min-width:0;
  flex:1;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap
}
.wsDtMetaSub{
  color:${c.muted};
  font-weight:500
}
.wsDtMetaVal--warm{color:${c.warmDk}}
.wsDtMetaVal--blue{color:${c.accent}}
.wsDtMetaVal--green{color:${c.greenDk}}
.wsDtMetaValSub{
  font-weight:600;
  color:${c.sub}
}
.wsDtTl{
  margin-top:14px;
  padding-top:12px;
  border-top:1px solid rgba(227,221,210,.7)
}
.wsDtTlHd{
  font-size:9px;
  font-weight:800;
  letter-spacing:.1em;
  text-transform:uppercase;
  color:${c.muted};
  margin-bottom:8px;
  user-select:none
}
.wsDtTlList{display:flex;flex-direction:column;gap:7px}
.wsTlStep{
  display:flex;
  align-items:center;
  gap:10px;
  font-size:11px
}
.wsTlMark{
  width:16px;
  height:16px;
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
  width:5px;
  height:5px;
  border-radius:50%;
  background:${c.warm};
  animation:pulse 1.6s ease-in-out infinite
}
.wsTlLbl{
  flex:1;
  color:${c.text};
  font-weight:600
}
.wsTlStep--done .wsTlLbl{color:${c.sub}}
.wsTlMeta{
  font-size:10px;
  color:${c.muted};
  font-weight:600;
  font-variant-numeric:tabular-nums;
  user-select:none
}
.wsDtNext{
  margin-top:12px;
  padding:11px 13px;
  background:#fff;
  border:1px solid rgba(227,221,210,.8);
  border-radius:12px
}
.wsDtNextHd{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:5px
}
.wsDtNextLbl{
  font-size:9px;
  font-weight:800;
  letter-spacing:.1em;
  text-transform:uppercase;
  color:${c.muted};
  user-select:none
}
.wsDtNextClock{
  display:inline-flex;
  align-items:center;
  gap:4px;
  font-size:9px;
  font-weight:700;
  color:${c.warmDk};
  letter-spacing:.04em;
  text-transform:uppercase
}
.wsDtNextTx{
  font-size:12px;
  line-height:1.55;
  color:${c.text};
  font-weight:600
}

.wsFeed{
  margin-top:12px;
  padding:12px 14px;
  background:${c.cream};
  border:1px solid ${c.borderSoft};
  border-radius:18px
}
.wsFeedHd{
  display:flex;
  align-items:center;
  gap:6px;
  font-size:9.5px;
  font-weight:800;
  letter-spacing:.12em;
  text-transform:uppercase;
  color:${c.muted};
  margin-bottom:8px;
  user-select:none
}
.wsFeedList{display:flex;flex-direction:column;gap:6px}
.wsFeedItem{
  display:flex;
  align-items:center;
  gap:7px;
  font-size:10.5px;
  line-height:1.4;
  color:${c.sub};
  overflow:hidden
}
.wsFeedDot{
  width:6px;
  height:6px;
  border-radius:50%;
  flex-shrink:0
}
.wsFeedDot--warm{background:${c.warm}}
.wsFeedDot--blue{background:${c.accent}}
.wsFeedDot--green{background:${c.green}}
.wsFeedWho{font-weight:800;color:${c.text};flex-shrink:0}
.wsFeedWhat{
  flex:1;
  min-width:0;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap
}
.wsFeedWhen{
  flex-shrink:0;
  color:${c.muted};
  font-weight:600;
  font-variant-numeric:tabular-nums
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
  margin-top:28px
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
.proofTop{
  display:flex;
  align-items:center;
  gap:8px;
  margin-bottom:12px
}
.proofNo{
  font-size:11px;
  font-weight:800;
  color:${c.muted};
  letter-spacing:.08em;
  user-select:none
}
.proofArrow{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  color:${c.warm}
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

/* ───── Story scenes ───── */
.scenesGrid{
  display:grid;
  grid-template-columns:1fr;
  gap:18px;
  margin-top:28px
}
.sceneCard{
  background:rgba(255,255,255,.94);
  border:1px solid ${c.border};
  border-radius:26px;
  overflow:hidden;
  box-shadow:0 6px 28px rgba(0,0,0,.04);
  transition:box-shadow .3s, transform .3s
}
.sceneCard:hover{
  box-shadow:0 12px 44px rgba(0,0,0,.07);
  transform:translateY(-1px)
}
.sceneCardHead{padding:24px 24px 16px}
.sceneMeta{
  display:flex;
  align-items:center;
  gap:8px;
  margin-bottom:12px
}
.sceneStep{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  min-width:32px;
  height:30px;
  padding:0 10px;
  border-radius:999px;
  background:${c.warmSoft};
  border:1px solid rgba(201,149,107,.18);
  color:${c.warmDk};
  font-size:11px;
  font-weight:800;
  letter-spacing:.08em;
  user-select:none
}
.sceneStepBlue{
  background:${c.accentSoft};
  border-color:rgba(37,99,235,.14);
  color:${c.accent}
}
.sceneArrow{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  color:${c.warm}
}
.sceneArrowBlue{color:${c.accent}}
.sceneCardTitle{
  margin-top:4px;
  font-size:clamp(20px,2.8vw,26px);
  line-height:1.08;
  letter-spacing:-.04em;
  margin-bottom:10px
}
.sceneCardBody{
  font-size:13.5px;
  line-height:1.72;
  color:${c.sub};
  max-width:500px
}
.sceneWrap{padding:0 16px 20px;position:relative}
.sceneSvg{
  width:100%;
  height:auto;
  display:block;
  border-radius:16px;
  overflow:hidden
}
.sceneCap{
  padding:14px 20px 0;
  min-height:48px;
  display:flex;
  align-items:flex-start;
  justify-content:center
}
.sceneCapTx{
  display:inline-flex;
  align-items:center;
  gap:2px;
  font-size:12.5px;
  color:${c.text};
  font-weight:600;
  line-height:1.55;
  text-align:center;
  max-width:380px;
  letter-spacing:-.005em
}
.sceneCapCursor{
  display:inline-block;
  width:1.5px;
  height:13px;
  background:${c.warm};
  border-radius:1px;
  margin-left:2px;
  animation:blink 1s step-end infinite
}

/* ───── Value grid ───── */
.valueGrid{
  display:grid;
  grid-template-columns:1fr;
  gap:14px;
  margin-top:28px
}
.valueCard{
  padding:20px;
  border-radius:20px;
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
  width:42px;
  height:42px;
  border-radius:13px;
  display:flex;
  align-items:center;
  justify-content:center;
  margin-bottom:12px
}
.valueIc--warm{background:${c.warmSoft};color:${c.warm}}
.valueIc--blue{background:${c.accentSoft};color:${c.accent}}
.valueIc--green{background:${c.greenSoft};color:${c.greenDk}}
.valueTi{
  font-size:15px;
  font-weight:800;
  letter-spacing:-.02em;
  color:${c.text}
}
.valueBd{
  margin-top:6px;
  font-size:13px;
  line-height:1.7;
  color:${c.sub}
}

/* ───── Audience grid ───── */
.audGrid{display:grid;grid-template-columns:1fr;gap:14px;margin-top:28px}
.audCard{
  padding:22px;
  border:1px solid ${c.border};
  border-radius:22px;
  background:rgba(255,255,255,.94);
  transition:all .3s
}
.audCard:hover{box-shadow:0 8px 24px rgba(0,0,0,.04)}
.audIc{
  width:44px;
  height:44px;
  border-radius:13px;
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
  margin-top:28px
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
  max-width:1000px;
  margin:0 auto;
  padding:28px;
  border-radius:30px;
  background:linear-gradient(180deg,rgba(255,255,255,.97),rgba(255,248,240,.88));
  border:1px solid ${c.border};
  box-shadow:0 10px 34px rgba(0,0,0,.035);
  position:relative;
  overflow:hidden
}
.langTop{
  display:flex;
  align-items:flex-start;
  gap:16px
}
.langTopText{flex:1;min-width:0}
.langOrb{
  width:54px;
  height:54px;
  border-radius:999px;
  display:flex;
  align-items:center;
  justify-content:center;
  background:linear-gradient(135deg,#FFF8F0,#F4F7FF);
  border:1px solid rgba(201,149,107,.18);
  color:${c.warm};
  flex-shrink:0;
  box-shadow:0 6px 18px rgba(0,0,0,.03)
}
.langTi{
  font-size:clamp(24px,4vw,42px);
  line-height:1.04;
  letter-spacing:-.045em
}
.langTiSpaced{margin-top:10px}
.langBd{
  margin-top:14px;
  max-width:760px;
  font-size:14px;
  line-height:1.72;
  color:${c.sub}
}
.langChips{
  display:flex;
  flex-wrap:wrap;
  gap:8px;
  margin-top:20px
}
.langChip{
  position:relative;
  display:inline-flex;
  align-items:center;
  gap:8px;
  min-height:38px;
  padding:0 14px;
  border-radius:999px;
  background:rgba(255,255,255,.9);
  border:1px solid rgba(227,221,210,.95);
  color:${c.sub};
  font-size:12.5px;
  font-weight:700;
  letter-spacing:.01em;
  cursor:pointer;
  transition:color .25s, border-color .25s, transform .2s;
  user-select:none;
  overflow:hidden
}
.langChip:hover{
  color:${c.text};
  border-color:rgba(201,149,107,.35);
  transform:translateY(-1px)
}
.langChipA{
  color:${c.text};
  border-color:rgba(201,149,107,.5);
  box-shadow:0 8px 22px rgba(201,149,107,.12)
}
.langChipGlow{
  position:absolute;
  inset:0;
  border-radius:999px;
  background:linear-gradient(135deg,rgba(255,248,240,.9),rgba(244,247,255,.7));
  z-index:-1
}
.langChip > *{position:relative;z-index:1}
.langChipMore{
  cursor:default;
  opacity:.8
}
.langChipMore:hover{
  transform:none;
  color:${c.sub};
  border-color:rgba(227,221,210,.95)
}
.langChipFlag{font-size:15px;line-height:1}

.langPreview{
  margin-top:18px;
  padding:20px;
  border-radius:22px;
  background:rgba(255,255,255,.92);
  border:1px solid rgba(227,221,210,.95);
  box-shadow:0 10px 28px rgba(0,0,0,.03);
  position:relative;
  overflow:hidden
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
  border:1px solid rgba(201,149,107,.18);
  font-size:22px;
  box-shadow:0 6px 18px rgba(0,0,0,.04);
  user-select:none
}
.langPreviewLabel{
  font-size:15px;
  font-weight:800;
  letter-spacing:-.015em;
  color:${c.text}
}
.langPreviewMeta{
  margin-top:4px;
  display:flex;
  align-items:center;
  gap:6px;
  font-size:9.5px;
  font-weight:800;
  letter-spacing:.12em;
  text-transform:uppercase;
  color:${c.muted};
  user-select:none
}
.langPreviewPulse{
  width:6px;
  height:6px;
  border-radius:50%;
  background:${c.green};
  box-shadow:0 0 0 2px rgba(34,197,94,.2);
  animation:pulse 1.6s ease-in-out infinite
}
.langPreviewTags{
  display:flex;
  flex-wrap:wrap;
  gap:6px
}
.langPreviewTag{
  display:inline-flex;
  align-items:center;
  min-height:26px;
  padding:0 11px;
  border-radius:999px;
  background:${c.warmSoft};
  border:1px solid rgba(201,149,107,.18);
  color:${c.warmDk};
  font-size:10.5px;
  font-weight:700;
  letter-spacing:.03em;
  user-select:none
}
.langPreviewBody{
  margin-top:16px;
  font-size:clamp(17px,2.2vw,22px);
  line-height:1.45;
  letter-spacing:-.02em;
  color:${c.text};
  font-weight:500;
  max-width:760px;
  min-height:32px
}
.langPreviewCursor{
  display:inline-block;
  width:2px;
  height:20px;
  background:${c.warm};
  border-radius:1px;
  margin-left:3px;
  vertical-align:text-bottom;
  animation:blink 1s step-end infinite
}
.langPreviewNote{
  margin-top:10px;
  max-width:760px;
  font-size:13px;
  line-height:1.7;
  color:${c.sub}
}
  .langPreviewBody[dir="rtl"],
.langPreviewNote[dir="rtl"]{
  text-align:right;
}
  
.langProgress{
  display:flex;
  gap:4px;
  margin-top:16px
}
.langProgressBar{
  flex:1;
  height:3px;
  border-radius:999px;
  background:rgba(201,149,107,.16);
  transition:background .3s
}
.langProgressBarA{
  background:${c.warm}
}

/* ───── Trust / boundary ───── */
.trustWrap{
  max-width:1020px;
  margin:0 auto
}
.boundaryCard{
  padding:26px 28px;
  border-radius:24px;
  background:rgba(255,255,255,.96);
  border:1px solid rgba(227,221,210,.92);
  box-shadow:0 8px 28px rgba(0,0,0,.04);
  position:relative;
  overflow:hidden
}
.boundaryHd{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:4px
}
.boundaryCount{
  font-family:var(--font-instrument-serif),Georgia,serif;
  font-size:36px;
  line-height:1;
  color:${c.warm};
  opacity:.5;
  letter-spacing:-.03em
}
.boundaryTi{
  margin-top:10px;
  font-size:clamp(22px,3vw,32px);
  line-height:1.08;
  letter-spacing:-.04em
}
.boundaryBd{
  margin-top:12px;
  max-width:760px;
  font-size:14px;
  line-height:1.72;
  color:${c.sub}
}
.trustGrid{
  display:grid;
  grid-template-columns:1fr;
  gap:12px;
  margin-top:16px
}
.trustCard{
  padding:22px;
  border-radius:20px;
  background:rgba(255,255,255,.94);
  border:1px solid rgba(227,221,210,.92);
  box-shadow:0 4px 14px rgba(0,0,0,.02);
  transition:transform .25s, box-shadow .25s, border-color .25s;
  position:relative
}
.trustCard:hover{
  transform:translateY(-2px);
  box-shadow:0 14px 32px rgba(0,0,0,.05);
  border-color:rgba(201,149,107,.3)
}
.trustCardTop{
  display:flex;
  align-items:center;
  gap:10px;
  margin-bottom:14px
}
.trustNo{
  font-family:var(--font-instrument-serif),Georgia,serif;
  font-size:22px;
  line-height:1;
  color:${c.warm};
  letter-spacing:-.02em;
  min-width:26px
}
.trustIc{
  width:32px;
  height:32px;
  border-radius:10px;
  background:${c.warmSoft};
  color:${c.warm};
  display:flex;
  align-items:center;
  justify-content:center;
  border:1px solid rgba(201,149,107,.18)
}
.trustArrow{
  margin-left:auto;
  display:inline-flex;
  color:${c.muted};
  opacity:.6;
  transition:color .2s, transform .25s
}
.trustCard:hover .trustArrow{
  color:${c.warm};
  transform:translateX(2px);
  opacity:1
}
.trustTi{
  font-size:15px;
  font-weight:800;
  letter-spacing:-.02em;
  color:${c.text}
}
.trustBd{
  margin-top:6px;
  font-size:13px;
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
  grid-template-columns:repeat(2,1fr);
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
.ftBtmRt{color:rgba(255,255,255,.28)}

/* ───── Responsive ───── */
@media(max-width:639px){
  .navR{height:56px}
  .navCt{padding:10px 14px!important}
  .heroSec{padding:28px 0 34px}
  .heroBr{display:block}
  .heroTi{font-size:clamp(34px,12vw,52px)}
  .heroTk{
    width:100%;
    justify-content:flex-start;
    border-radius:18px;
    padding:12px 14px
  }
  .heroTkLbl{display:none}
  .heroBt{
    flex-direction:column;
    gap:10px
  }
  .heroBtP,.heroBtS{
    width:100%;
    min-width:0
  }
  .heroTrust{
    justify-content:center
  }
  .langCard{padding:22px}
  .langTop{
    flex-direction:column;
    gap:14px
  }
  .langOrb{width:48px;height:48px}
  .langPreview{padding:18px}
  .langPreviewTags{gap:5px}
  .sceneCardHead{padding:22px 22px 14px}
  .wsStats{
    grid-template-columns:1fr 1fr 1fr;
    gap:6px
  }
  .wsStat{padding:9px 10px}
  .wsStatVal{font-size:18px}
  .wsFeedItem{
    display:grid;
    grid-template-columns:auto auto 1fr auto;
    align-items:center
  }
}

@media(min-width:640px){
  .container{padding:0 24px}
  .sec{padding:72px 0}
  .secTinted{padding:78px 0}
  .secSoft{padding:72px 0}
  .secStories{padding-top:34px;padding-bottom:28px}
  .secLanguage{padding-top:68px;padding-bottom:40px}
  .secSecurity{padding-top:38px;padding-bottom:62px}
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
  .scenesGrid{grid-template-columns:repeat(2,1fr)}
  .wlF{grid-template-columns:1.2fr .9fr auto}
  .wlBt{width:auto}
  .ftTop{grid-template-columns:1.2fr 2fr;gap:42px}
  .ftCols{grid-template-columns:repeat(3,1fr)}
  .wsBody{grid-template-columns:.92fr 1.08fr}
}

@media(min-width:960px){
  .container{padding:0 32px}
  .sec{padding:84px 0}
  .secTinted{padding:88px 0}
  .secSoft{padding:82px 0}
  .secStories{padding-top:34px;padding-bottom:26px}
  .secLanguage{padding-top:60px;padding-bottom:38px}
  .secSecurity{padding-top:34px;padding-bottom:56px}
  .secWaitlist{padding-top:36px;padding-bottom:58px}
  .navR{height:68px}
  .heroSec{padding:48px 0 56px}
  .heroGrid{grid-template-columns:minmax(0,1.02fr) minmax(520px,560px);gap:34px}
  .heroTxt{max-width:640px;margin:0;text-align:left}
  .heroBr{display:block}
  .heroSub{margin-left:0;margin-right:0}
  .heroBt{justify-content:flex-start}
  .heroTrust{justify-content:flex-start}
  .heroBoardCol{justify-content:flex-end}
  .proofGrid{grid-template-columns:repeat(3,1fr)}
  .valueGrid{grid-template-columns:repeat(4,1fr)}
  .audGrid{grid-template-columns:repeat(3,1fr)}
  .roadmapGrid{grid-template-columns:repeat(3,1fr)}
  .trustGrid{grid-template-columns:repeat(2,1fr)}
  .wlF{grid-template-columns:1.2fr .9fr auto}
  .wlBt{width:auto}
  .ftTop{grid-template-columns:1.1fr 1.9fr;gap:40px}
  .ftCols{grid-template-columns:repeat(3,1fr);gap:28px}
  .wsBody{grid-template-columns:.92fr 1.08fr}
}

@media(min-width:1180px){
  .heroTi{font-size:clamp(58px,6.1vw,82px)}
}
`;