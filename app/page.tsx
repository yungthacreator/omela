"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
`;

const colors = {
  bg: "#F7F4ED",
  bgSoft: "#F2EEE5",
  bgCard: "#FFFFFF",
  bgCardSoft: "rgba(255,255,255,0.82)",
  bgDark: "#09111F",
  bgDarkSoft: "#0F172A",
  text: "#161922",
  textMuted: "#626A79",
  textLight: "#959DAC",
  border: "#E5DED1",
  borderStrong: "#D8D0C2",
  borderDark: "rgba(255,255,255,0.1)",
  accent: "#2F6BEA",
  accentSoft: "#EEF4FF",
  success: "#16A34A",
  successSoft: "#EAF8EE",
  purple: "#8B5CF6",
  purpleSoft: "#F4EEFF",
};

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

type RoleKey = "patient" | "provider" | "developer";
type Tone = "light" | "dark";

type PhoneMessage = {
  from: "user" | "laura";
  text: string;
  status?: "Delivered" | "Seen";
};

type EcosystemLogoItem = {
  name: string;
  src: string;
  width: number;
  height: number;
  blend?: boolean;
  scale?: number;
};

const navItems = [
  { label: "People", href: "#people" },
  { label: "Providers", href: "#providers" },
  { label: "Developers", href: "#developers" },
  { label: "Pricing", href: "#pricing" },
];

const roleLabels: Record<RoleKey, string> = {
  patient: "Patient",
  provider: "Provider",
  developer: "Developer",
};

const roleNotes: Record<RoleKey, string> = {
  patient:
    "You will hear about consumer access, guided care experiences, and Laura rollout windows.",
  provider:
    "You will hear about care team onboarding, workflow access, and provider demos as capacity opens.",
  developer:
    "You will hear about API access, integration previews, and technical onboarding as tools become available.",
};

const audienceCards = [
  {
    title: "For people",
    desc: "Laura gives people a clearer first step for symptoms, everyday health questions, care navigation, and appointment support.",
    bullets: [
      "Symptom guidance",
      "Health questions",
      "Care navigation",
      "Booking support",
    ],
  },
  {
    title: "For providers",
    desc: "Laura helps care teams reduce front desk pressure, improve intake quality, and support access with calmer operations.",
    bullets: [
      "Voice and chat intake",
      "Scheduling support",
      "Triage support",
      "Multilingual access",
    ],
  },
  {
    title: "For developers",
    desc: "Laura can be embedded into apps, workflows, and digital health products through APIs, SDKs, and adaptable components.",
    bullets: [
      "API and SDK access",
      "Embeddable widgets",
      "Workflow triggers",
      "Secure logs",
    ],
  },
];

const heroSignals = [
  {
    kind: "voice" as const,
    title: "Voice and chat ready",
    desc: "Designed for conversational care access across text and spoken interactions.",
  },
  {
    kind: "care" as const,
    title: "Care navigation support",
    desc: "Helps guide people toward the right next step with clearer routing.",
  },
  {
    kind: "infra" as const,
    title: "Built for modern infrastructure",
    desc: "Structured for product teams, cloud systems, and real operational workflows.",
  },
];

const publicUseCases = [
  "Understand symptoms before deciding the next step",
  "Ask Laura everyday health questions in plain language",
  "Get help booking appointments and navigating services",
];

const developerFeatures = [
  "REST API and SDK access",
  "Embeddable chat and voice widgets",
  "Patient workflow triggers",
  "Secure auth, logging, and audit trails",
];

const workflowItems = [
  {
    title: "People ask Laura",
    body: "Users describe symptoms, ask questions, or request help with navigation and access.",
  },
  {
    title: "Laura structures intent",
    body: "She guides the next step, routes demand, and supports booking or follow through.",
  },
  {
    title: "Care teams move faster",
    body: "Teams receive clearer intake, reduced friction, and better readiness for real demand.",
  },
];

const metrics = [
  { value: "24/7", label: "always on availability" },
  { value: "40+", label: "supported languages" },
  { value: "<2s", label: "average response time" },
  { value: "3x", label: "broader market reach" },
];

const pricingPlans = [
  {
    name: "Public Access",
    price: "£3.99",
    period: "/mo",
    desc: "For people who want direct access to Laura for guidance, health questions, and care navigation.",
    features: [
      "Symptom guidance",
      "Everyday health questions",
      "Care navigation",
      "Booking support",
    ],
    highlighted: false,
    cta: "Join waitlist",
  },
  {
    name: "Provider",
    price: "£1,250",
    period: "/mo",
    desc: "For clinics and care teams using Laura in intake, routing, and patient communication workflows.",
    features: [
      "Voice and chat intake",
      "Scheduling workflows",
      "Multilingual support",
      "Provider dashboard",
    ],
    highlighted: true,
    badge: "Best for care teams",
    cta: "Request demo",
  },
  {
    name: "Developer",
    price: "Custom",
    period: "",
    desc: "For product teams embedding Laura into apps, marketplaces, and digital healthcare experiences.",
    features: [
      "API and SDK access",
      "Embeddable components",
      "Usage analytics",
      "Technical onboarding",
    ],
    highlighted: false,
    cta: "Talk to us",
  },
];

const ecosystemLogos: EcosystemLogoItem[] = [
  { name: "AWS", src: "/logos/aws-logo.png", width: 126, height: 34, scale: 1 },
  {
    name: "Microsoft",
    src: "/logos/microsoft-logo.png",
    width: 132,
    height: 30,
    scale: 1,
  },
  {
    name: "Google",
    src: "/logos/google-logo.png",
    width: 120,
    height: 38,
    scale: 1,
  },
  {
    name: "Salesforce",
    src: "/logos/salesforce-logo.png",
    width: 104,
    height: 34,
    scale: 1.18,
  },
  {
    name: "Twilio",
    src: "/logos/twilio-logo.png",
    width: 110,
    height: 28,
    scale: 1.05,
  },
  {
    name: "Epic",
    src: "/logos/epic-logo.png",
    width: 88,
    height: 26,
    scale: 1.04,
  },
  {
    name: "Veradigm",
    src: "/logos/veradigm-logo.png",
    width: 132,
    height: 28,
    scale: 1.02,
  },
  {
    name: "GitHub",
    src: "/logos/github-logo.png",
    width: 108,
    height: 30,
    blend: true,
    scale: 1.02,
  },
];

function FadeIn({ children, delay = 0, className = "" }: FadeInProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.16 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.58, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Badge({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: Tone;
}) {
  const isDark = tone === "dark";

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px 16px",
        borderRadius: "999px",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.14)" : colors.border}`,
        background: isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.74)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        fontSize: "13px",
        fontWeight: 700,
        color: isDark ? "rgba(255,255,255,0.78)" : colors.textMuted,
        maxWidth: "100%",
      }}
    >
      {children}
    </div>
  );
}

function SectionHeading({
  badge,
  title,
  body,
  tone = "light",
}: {
  badge?: string;
  title: ReactNode;
  body?: string;
  tone?: Tone;
}) {
  const isDark = tone === "dark";

  return (
    <div style={{ textAlign: "center", maxWidth: "820px", margin: "0 auto" }}>
      {badge ? <Badge tone={tone}>{badge}</Badge> : null}

      <h2
        className="serif"
        style={{
          fontSize: "clamp(34px, 5vw, 58px)",
          lineHeight: 1.02,
          letterSpacing: "-0.05em",
          marginTop: badge ? "18px" : 0,
          color: isDark ? "#FFFFFF" : colors.text,
        }}
      >
        {title}
      </h2>

      {body ? (
        <p
          style={{
            fontSize: "17px",
            lineHeight: 1.88,
            color: isDark ? "rgba(255,255,255,0.72)" : colors.textMuted,
            marginTop: "16px",
          }}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}

function HeroSignalIcon({
  kind,
}: {
  kind: "voice" | "care" | "infra";
}) {
  if (kind === "voice") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 15a3 3 0 0 0 3-3V7a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M19 11.5a7 7 0 0 1-14 0"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M12 18.5V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (kind === "care") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 21s-6.5-4.35-8.5-8.08C1.9 10 3.2 6.5 6.6 5.7c2.1-.5 4.1.42 5.4 2.1 1.3-1.68 3.3-2.6 5.4-2.1 3.4.8 4.7 4.3 3.1 7.22C18.5 16.65 12 21 12 21Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="13" y="4" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="4" y="13" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="13" y="13" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function TypewriterPrompts() {
  const prompts = [
    "Can you help me understand what my symptoms might mean?",
    "Book the earliest available appointment near me.",
    "Can you explain this prescription in simpler language?",
  ];

  const [promptIndex, setPromptIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = prompts[promptIndex];
    const speed = deleting ? 18 : 34;

    const timer = window.setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, typed.length + 1);
        setTyped(next);

        if (next === current) {
          window.setTimeout(() => setDeleting(true), 1200);
        }
      } else {
        const next = current.slice(0, Math.max(0, typed.length - 1));
        setTyped(next);

        if (next.length === 0) {
          setDeleting(false);
          setPromptIndex((prev) => (prev + 1) % prompts.length);
        }
      }
    }, speed);

    return () => window.clearTimeout(timer);
  }, [typed, deleting, promptIndex]);

  return (
    <div className="promptCard">
      <div className="promptTop">
        <span className="promptTopLabel">Example prompts</span>
        <span className="promptTopHint">Consumer experience</span>
      </div>

      <div className="promptStage">
        <div className="promptTyped">
          {typed}
          <span className="promptCaret">|</span>
        </div>
      </div>

      <div className="promptFooter">
        Laura responds in plain language and helps route the next step with a calmer
        starting point.
      </div>
    </div>
  );
}

function DoubleTickIcon() {
  return (
    <svg
      width="16"
      height="12"
      viewBox="0 0 20 14"
      fill="none"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      <path
        d="M1.5 7.6L4.7 10.8L10.2 5.2"
        stroke={colors.success}
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.3 7.6L10.5 10.8L18.2 3.2"
        stroke={colors.success}
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MessageMeta({
  status,
}: {
  status: "Delivered" | "Seen";
}) {
  return (
    <div
      style={{
        marginTop: "6px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: "6px",
        color: colors.success,
        fontSize: "11px",
        fontWeight: 700,
      }}
    >
      <DoubleTickIcon />
      <span>{status}</span>
    </div>
  );
}

function PhoneMockup() {
  const messages: PhoneMessage[] = [
    {
      from: "user",
      text: "I have a sore throat, fever, and I feel weak. What should I do?",
      status: "Seen",
    },
    {
      from: "laura",
      text: "I can help you think through the next step. Based on what you shared, you may need same day clinical advice if the fever is persistent.",
    },
    {
      from: "user",
      text: "Can you book the earliest appointment near me?",
      status: "Delivered",
    },
    {
      from: "laura",
      text: "Yes. I found an available slot tomorrow at 9:30 AM. I can also guide you on self care until then.",
    },
  ];

  const [displayed, setDisplayed] = useState<string[]>(Array(messages.length).fill(""));
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const current = messages[activeIndex];
    if (!current) return;

    const shown = displayed[activeIndex] ?? "";
    let timer: number;

    if (shown.length < current.text.length) {
      timer = window.setTimeout(() => {
        setDisplayed((prev) => {
          const next = [...prev];
          next[activeIndex] = current.text.slice(0, shown.length + 1);
          return next;
        });
      }, current.from === "user" ? 24 : 16);
    } else if (activeIndex < messages.length - 1) {
      timer = window.setTimeout(() => {
        setActiveIndex((prev) => prev + 1);
      }, 760);
    } else {
      timer = window.setTimeout(() => {
        setDisplayed(Array(messages.length).fill(""));
        setActiveIndex(0);
      }, 2400);
    }

    return () => window.clearTimeout(timer);
  }, [activeIndex, displayed]);

  return (
    <div className="phoneShell">
      <div className="phoneFloatTag phoneFloatTagLeft">Same day care routing</div>
      <div className="phoneFloatTag phoneFloatTagRight">Voice + chat ready</div>

      <div className="phoneFrame">
        <div className="phoneNotch" />

        <div className="phoneScreen">
          <div className="phoneHeader">
            <div className="phoneAvatar">
              <Image
                src="/laura-avatar.png"
                alt="Laura"
                fill
                sizes="46px"
                style={{ objectFit: "cover" }}
              />
            </div>

            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "16px",
                  fontWeight: 800,
                  color: colors.text,
                }}
              >
                Laura
                <span className="verifiedBadge">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M3 8.2L6.1 11.2L13 4.5"
                      stroke={colors.success}
                      strokeWidth="2.1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>

              <div className="liveStatus">
                <span className="liveDot" />
                Live now
              </div>
            </div>
          </div>

          <div className="phoneConversation">
            <div className="phoneConversationInner">
              {messages.map((msg, index) => {
                const text = displayed[index];
                const isVisible = text.length > 0;

                if (!isVisible) return null;

                return (
                  <motion.div
                    key={`${msg.from}-${index}`}
                    initial={{ opacity: 0, y: 12, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.24, ease: "easeOut" }}
                    style={{
                      alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
                      maxWidth: msg.from === "user" ? "84%" : "88%",
                    }}
                  >
                    <div
                      style={{
                        padding: msg.from === "user" ? "13px 16px" : "14px 16px",
                        borderRadius:
                          msg.from === "user" ? "20px 20px 8px 20px" : "20px 20px 20px 8px",
                        background:
                          msg.from === "user"
                            ? "linear-gradient(180deg, #3471F2 0%, #245FDE 100%)"
                            : "rgba(255,255,255,0.96)",
                        color: msg.from === "user" ? "#FFFFFF" : colors.text,
                        fontSize: "13px",
                        lineHeight: 1.66,
                        boxShadow:
                          msg.from === "user"
                            ? "0 14px 28px rgba(41,100,234,0.18)"
                            : "0 10px 24px rgba(13,18,28,0.06)",
                        wordBreak: "break-word",
                        overflowWrap: "anywhere",
                      }}
                    >
                      {text}
                    </div>

                    {msg.from === "user" && msg.status ? <MessageMeta status={msg.status} /> : null}
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="phoneComposer">
            <div className="phoneComposerPill">
              <span className="phoneComposerPlus">+</span>
              <span className="phoneComposerText">Reply...</span>
            </div>

            <div className="phoneMic">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 15a3 3 0 0 0 3-3V7a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M19 11.5a7 7 0 0 1-14 0"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path d="M12 18.5V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CodeBlock() {
  return (
    <div className="terminalCard">
      <div className="terminalTop">
        <div className="terminalDots">
          <span />
          <span />
          <span />
        </div>
        <span className="terminalTitle">Laura SDK</span>
      </div>

      <div className="terminalBody">
        <div className="terminalLine">
          <span className="terminalPrompt">$</span> npm install @omela/laura-sdk
        </div>
        <div className="terminalLine">
          <span className="terminalPrompt">$</span> import {"{ Laura }"} from "@omela/laura-sdk";
        </div>
        <div className="terminalLine">
          <span className="terminalPrompt">$</span> const laura = new Laura({"{"}
          apiKey: process.env.NEXT_PUBLIC_OMELA_KEY {"}"});
        </div>
        <div className="terminalLine">
          <span className="terminalPrompt">$</span> await laura.chat({"{"}
        </div>
        <div className="terminalLine terminalIndent">userId: "user_123",</div>
        <div className="terminalLine terminalIndent">
          message: "I have a rash and a headache. What should I do?"
        </div>
        <div className="terminalLine">{"});"}</div>
      </div>
    </div>
  );
}

function EcosystemMarquee({ logos }: { logos: EcosystemLogoItem[] }) {
  const items = [...logos, ...logos];

  return (
    <div className="ecosystemMarqueeShell" aria-label="Platform ecosystem">
      <div className="ecosystemTrack">
        {items.map((logo, index) => (
          <div key={`${logo.name}-${index}`} className="ecosystemCard" aria-label={logo.name}>
            <div className="ecosystemLogoWrap">
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className={`ecosystemLogo${logo.blend ? " ecosystemLogoBlend" : ""}`}
                style={{
                  transform: `scale(${logo.scale ?? 1})`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getSuccessCopy(role: RoleKey) {
  if (role === "patient") {
    return {
      eyebrow: "Early access confirmed",
      title: "Congratulations. You are in early.",
      body:
        "You are now on the Omela early access list for patients. Laura will reach out as access opens for your care experience. Follow us on X @joinomela for launch drops, product notes, and first looks.",
    };
  }

  if (role === "provider") {
    return {
      eyebrow: "Provider access confirmed",
      title: "Congratulations. Your place is reserved.",
      body:
        "You are now on the Omela early access list for providers. Laura will reach out as access opens for care teams and live operations. Follow us on X @joinomela for rollout updates, demos, and product previews.",
    };
  }

  return {
    eyebrow: "Developer access confirmed",
    title: "Congratulations. You are on the list.",
    body:
      "You are now on the Omela early access list for developers. Laura will reach out as API and integration access opens for your use case. Follow us on X @joinomela for SDK updates, technical previews, and launch notes.",
  };
}

function SuccessModal({
  open,
  role,
  onClose,
}: {
  open: boolean;
  role: RoleKey;
  onClose: () => void;
}) {
  const copy = getSuccessCopy(role);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 220,
            background: "rgba(9,10,13,0.34)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.985 }}
            transition={{ duration: 0.26, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "580px",
              background: "rgba(255,255,255,0.94)",
              border: `1px solid ${colors.border}`,
              borderRadius: "32px",
              padding: "28px",
              boxShadow: "0 34px 90px rgba(0,0,0,0.18)",
            }}
          >
            <div
              style={{
                width: "62px",
                height: "62px",
                borderRadius: "22px",
                background: "linear-gradient(180deg, #F8FBFF 0%, #EDF3FF 100%)",
                border: `1px solid ${colors.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: colors.success,
              }}
            >
              <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path
                  d="M7 16.5L12.8 22L25 9.5"
                  stroke={colors.success}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div
              style={{
                marginTop: "18px",
                fontSize: "12px",
                fontWeight: 800,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: colors.textLight,
              }}
            >
              {copy.eyebrow}
            </div>

            <h3
              className="serif"
              style={{
                fontSize: "clamp(30px, 5vw, 44px)",
                lineHeight: 1.02,
                letterSpacing: "-0.05em",
                marginTop: "10px",
                color: colors.text,
              }}
            >
              {copy.title}
            </h3>

            <p
              style={{
                marginTop: "14px",
                color: colors.textMuted,
                fontSize: "16px",
                lineHeight: 1.84,
              }}
            >
              {copy.body}
            </p>

            <div
              style={{
                marginTop: "18px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 14px",
                borderRadius: "999px",
                background: colors.bgSoft,
                border: `1px solid ${colors.border}`,
                color: colors.text,
                fontSize: "13px",
                fontWeight: 700,
              }}
            >
              Follow on X <span style={{ color: colors.accent }}>@joinomela</span>
            </div>

            <div
              style={{
                marginTop: "24px",
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <a
                href="https://x.com/joinomela"
                target="_blank"
                rel="noreferrer"
                className="btnPrimary"
              >
                Follow on X
              </a>

              <button type="button" className="btnSecondary" onClick={onClose}>
                Continue exploring
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default function Page() {
  const [role, setRole] = useState<RoleKey>("patient");
  const [submittedRole, setSubmittedRole] = useState<RoleKey>("patient");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  async function handleWaitlistSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    const currentRole = role;

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          role: currentRole,
          website,
          source: "landing-page",
          marketingOptIn: false,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Something went wrong. Please try again.");
        return;
      }

      setSubmittedRole(currentRole);
      setSuccessMessage(
        data.message || "You're in. Laura will reach out as early access opens."
      );
      setEmail("");
      setRole("patient");
      setWebsite("");
      setIsSuccessOpen(true);
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <style>{FONT_IMPORT}</style>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        html, body {
          max-width: 100%;
          overflow-x: clip;
        }

        body {
          background:
            radial-gradient(circle at top left, rgba(139,92,246,0.06), transparent 26%),
            radial-gradient(circle at top right, rgba(47,107,234,0.06), transparent 22%),
            ${colors.bg};
          color: ${colors.text};
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        a { color: inherit; text-decoration: none; }
        button, input, select { font-family: inherit; }
        img, svg, canvas, video { max-width: 100%; display: block; }
        ::selection { background: ${colors.accent}; color: white; }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          50.01%, 100% { opacity: 0; }
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .serif {
          font-family: 'Instrument Serif', Georgia, serif;
        }

        .siteWrap {
          width: 100%;
          overflow-x: clip;
          position: relative;
        }

        .siteWrap::before,
        .siteWrap::after {
          content: "";
          position: absolute;
          pointer-events: none;
          filter: blur(70px);
          opacity: 0.5;
          z-index: 0;
        }

        .siteWrap::before {
          width: 280px;
          height: 280px;
          top: 120px;
          left: -80px;
          background: rgba(139,92,246,0.08);
        }

        .siteWrap::after {
          width: 340px;
          height: 340px;
          top: 540px;
          right: -120px;
          background: rgba(47,107,234,0.08);
        }

        .container {
          width: 100%;
          max-width: 1220px;
          margin: 0 auto;
          padding-left: 24px;
          padding-right: 24px;
          position: relative;
          z-index: 1;
        }

        .btnPrimary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: ${colors.bgDark};
          color: white;
          border: none;
          border-radius: 999px;
          padding: 15px 24px;
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
          max-width: 100%;
          text-align: center;
          white-space: nowrap;
        }

        .btnPrimary:hover {
          transform: translateY(-1px);
          background: #13203A;
          box-shadow: 0 14px 30px rgba(0,0,0,0.14);
        }

        .btnPrimary:disabled {
          opacity: 0.72;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .btnSecondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: transparent;
          color: ${colors.text};
          border: 1px solid ${colors.border};
          border-radius: 999px;
          padding: 15px 24px;
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
          transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
          max-width: 100%;
          text-align: center;
          white-space: nowrap;
        }

        .btnSecondary:hover {
          transform: translateY(-1px);
          background: rgba(255,255,255,0.72);
          border-color: ${colors.borderStrong};
        }

        .section {
          padding: 92px 0;
          overflow-x: clip;
          position: relative;
        }

        .grid3 {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 22px;
        }

        .grid2 {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 28px;
        }

        .card {
          background: ${colors.bgCardSoft};
          border: 1px solid ${colors.border};
          border-radius: 30px;
          padding: 30px;
          min-width: 0;
          overflow: hidden;
          box-shadow: 0 14px 34px rgba(10,14,22,0.04);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .darkCard {
          background:
            linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%),
            ${colors.bgDarkSoft};
          border: 1px solid ${colors.borderDark};
          border-radius: 30px;
          padding: 30px;
          min-width: 0;
          overflow: hidden;
          box-shadow: 0 24px 60px rgba(0,0,0,0.18);
        }

        .heroWrap {
          display: grid;
          grid-template-columns: 1.04fr 0.96fr;
          gap: 56px;
          align-items: center;
        }

        .heroTitle {
          font-size: clamp(54px, 7vw, 98px);
          line-height: 0.94;
          letter-spacing: -0.058em;
          color: ${colors.text};
        }

        .heroAccent {
          color: rgba(47,107,234,0.64);
          font-style: italic;
          display: block;
        }

        .heroBody {
          margin-top: 24px;
          font-size: 19px;
          line-height: 1.88;
          color: ${colors.textMuted};
          max-width: 690px;
        }

        .heroButtons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 34px;
        }

        .heroSignalGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
          margin-top: 24px;
        }

        .heroSignalCard {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          padding: 16px;
          border-radius: 22px;
          border: 1px solid ${colors.border};
          background: rgba(255,255,255,0.78);
          box-shadow: 0 12px 28px rgba(10,14,22,0.04);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .heroSignalIcon {
          width: 40px;
          height: 40px;
          min-width: 40px;
          border-radius: 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(180deg, #EFF4FF 0%, #DDE9FF 100%);
          color: ${colors.accent};
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.9);
        }

        .heroSignalTitle {
          font-size: 15px;
          font-weight: 800;
          line-height: 1.25;
          color: ${colors.text};
        }

        .heroSignalDesc {
          margin-top: 6px;
          font-size: 13px;
          line-height: 1.68;
          color: ${colors.textMuted};
        }

        .heroVisualPanel {
          position: relative;
          border-radius: 38px;
          padding: 22px;
          border: 1px solid ${colors.border};
          background:
            radial-gradient(circle at top, rgba(139,92,246,0.06), transparent 30%),
            linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.68) 100%);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 30px 80px rgba(10,14,22,0.08);
          min-width: 0;
        }

        .trustedHeader {
          margin-top: 34px;
          text-align: center;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: ${colors.textLight};
        }

        .ecosystemMarqueeShell {
          margin-top: 22px;
          overflow: hidden;
          position: relative;
          mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
        }

        .ecosystemTrack {
          display: flex;
          align-items: center;
          gap: 14px;
          width: max-content;
          padding: 8px 0;
          animation: marquee 26s linear infinite;
          will-change: transform;
        }

        .ecosystemCard {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 224px;
          min-height: 88px;
          border: 1px solid ${colors.border};
          background: rgba(255,255,255,0.86);
          border-radius: 24px;
          padding: 18px 20px;
          box-shadow: 0 12px 28px rgba(10,14,22,0.05);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .ecosystemLogoWrap {
          position: relative;
          width: 100%;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ecosystemLogo {
          width: auto;
          max-width: 136px;
          height: auto;
          max-height: 34px;
          object-fit: contain;
        }

        .ecosystemLogoBlend {
          mix-blend-mode: multiply;
          opacity: 0.94;
        }

        .ecosystemCaption {
          margin-top: 16px;
          text-align: center;
          font-size: 13px;
          line-height: 1.82;
          color: ${colors.textLight};
          max-width: 780px;
          margin-left: auto;
          margin-right: auto;
        }

        .phoneShell {
          position: relative;
          width: 100%;
          display: flex;
          justify-content: center;
          min-width: 0;
        }

        .phoneFloatTag {
          position: absolute;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          padding: 10px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,0.92);
          border: 1px solid ${colors.border};
          color: ${colors.textMuted};
          font-size: 12px;
          fontWeight: 800;
          letter-spacing: 0.02em;
          box-shadow: 0 14px 28px rgba(10,14,22,0.08);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          white-space: nowrap;
        }

        .phoneFloatTagLeft {
          top: 16px;
          left: -2px;
        }

        .phoneFloatTagRight {
          bottom: 20px;
          right: -4px;
        }

        .phoneFrame {
          width: min(100%, 374px);
          border-radius: 46px;
          padding: 12px;
          border: 1.5px solid ${colors.border};
          background: linear-gradient(180deg, #FFFFFF 0%, #FAF9F6 100%);
          box-shadow:
            0 24px 70px rgba(10,14,22,0.14),
            inset 0 1px 0 rgba(255,255,255,0.85);
          position: relative;
          flex-shrink: 1;
        }

        .phoneNotch {
          width: 122px;
          height: 28px;
          border-radius: 999px;
          background: ${colors.bgDark};
          margin: 0 auto 10px;
        }

        .phoneScreen {
          background: linear-gradient(180deg, #F8F8FC 0%, #F1F2F8 100%);
          border-radius: 32px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 600px;
        }

        .phoneHeader {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 18px 18px 16px;
          background: rgba(255,255,255,0.92);
          border-bottom: 1px solid ${colors.border};
          flex: 0 0 auto;
        }

        .phoneAvatar {
          position: relative;
          width: 46px;
          height: 46px;
          border-radius: 999px;
          overflow: hidden;
          flex-shrink: 0;
          border: 1px solid rgba(0,0,0,0.06);
          background: #EDEFF5;
        }

        .verifiedBadge {
          width: 24px;
          height: 24px;
          border-radius: 999px;
          background: ${colors.successSoft};
          border: 1px solid rgba(22,163,74,0.16);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .liveStatus {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 4px;
          font-size: 11px;
          color: ${colors.success};
          font-weight: 700;
        }

        .liveDot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: ${colors.success};
          display: inline-block;
        }

        .phoneConversation {
          flex: 1 1 auto;
          min-height: 0;
          overflow: hidden;
          padding: 16px 14px 8px;
          display: flex;
          align-items: flex-end;
        }

        .phoneConversationInner {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 10px;
          overflow: hidden;
        }

        .phoneComposer {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px 14px;
          background: rgba(255,255,255,0.82);
          border-top: 1px solid rgba(228,222,209,0.8);
        }

        .phoneComposerPill {
          flex: 1 1 auto;
          min-width: 0;
          display: flex;
          align-items: center;
          gap: 10px;
          height: 44px;
          border-radius: 999px;
          background: rgba(248,249,252,0.96);
          border: 1px solid ${colors.border};
          padding: 0 14px;
          color: ${colors.textLight};
          font-size: 13px;
          font-weight: 600;
        }

        .phoneComposerPlus {
          width: 22px;
          height: 22px;
          border-radius: 999px;
          background: ${colors.accentSoft};
          color: ${colors.accent};
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          flex-shrink: 0;
        }

        .phoneComposerText {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .phoneMic {
          width: 44px;
          height: 44px;
          border-radius: 999px;
          background: ${colors.bgDark};
          color: white;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 10px 22px rgba(10,14,22,0.18);
        }

        .promptCard {
          background: rgba(255,255,255,0.82);
          border: 1px solid ${colors.border};
          border-radius: 30px;
          padding: 24px;
          box-shadow: 0 16px 34px rgba(10,14,22,0.05);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .promptTop {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }

        .promptTopLabel {
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: ${colors.textLight};
        }

        .promptTopHint {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 12px;
          border-radius: 999px;
          background: ${colors.bgSoft};
          border: 1px solid ${colors.border};
          color: ${colors.textMuted};
          font-size: 12px;
          font-weight: 700;
        }

        .promptStage {
          margin-top: 16px;
          border: 1px solid ${colors.border};
          background: linear-gradient(180deg, #FCFBF8 0%, #F8F6F0 100%);
          border-radius: 22px;
          height: 144px;
          padding: 22px 20px;
          display: flex;
          align-items: flex-start;
        }

        .promptTyped {
          font-size: 18px;
          line-height: 1.72;
          color: ${colors.text};
          word-break: break-word;
          overflow-wrap: anywhere;
        }

        .promptCaret {
          display: inline-block;
          width: 10px;
          margin-left: 2px;
          color: ${colors.accent};
          animation: blink 1s step-end infinite;
        }

        .promptFooter {
          margin-top: 14px;
          font-size: 13px;
          line-height: 1.8;
          color: ${colors.textLight};
        }

        .featureList {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 18px;
          min-width: 0;
        }

        .featureRow {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          color: ${colors.textMuted};
          font-size: 14px;
          line-height: 1.78;
          min-width: 0;
        }

        .featureRow span:last-child {
          min-width: 0;
          overflow-wrap: anywhere;
        }

        .dotCheck {
          width: 20px;
          height: 20px;
          margin-top: 1px;
          border-radius: 999px;
          background: ${colors.accentSoft};
          color: ${colors.accent};
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          flex-shrink: 0;
        }

        .workflowGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
          align-items: stretch;
          margin-top: 48px;
        }

        .workflowItem {
          background: rgba(255,255,255,0.82);
          border: 1px solid ${colors.border};
          border-radius: 26px;
          padding: 26px;
          position: relative;
          min-width: 0;
          box-shadow: 0 12px 28px rgba(10,14,22,0.04);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .workflowArrow {
          position: absolute;
          top: 50%;
          right: -18px;
          transform: translateY(-50%);
          width: 36px;
          height: 36px;
          border-radius: 999px;
          background: ${colors.bgCard};
          border: 1px solid ${colors.border};
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${colors.textLight};
          z-index: 2;
        }

        .developerSection {
          background:
            radial-gradient(circle at 18% 20%, rgba(47,107,234,0.18), transparent 24%),
            radial-gradient(circle at 82% 18%, rgba(139,92,246,0.14), transparent 24%),
            linear-gradient(180deg, #0B1220 0%, #0F1B32 100%);
          color: #FFFFFF;
        }

        .terminalCard {
          width: 100%;
          max-width: 100%;
          background: #07080B;
          color: #E5E7EB;
          border: 1px solid #1F2330;
          border-radius: 26px;
          overflow: hidden;
          box-shadow: 0 24px 60px rgba(0,0,0,0.22);
        }

        .terminalTop {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 14px 16px;
          border-bottom: 1px solid #1B202B;
          background: #0E1118;
        }

        .terminalDots {
          display: flex;
          gap: 8px;
          flex-shrink: 0;
        }

        .terminalDots span {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          display: inline-block;
        }

        .terminalDots span:nth-child(1) { background: #F87171; }
        .terminalDots span:nth-child(2) { background: #FBBF24; }
        .terminalDots span:nth-child(3) { background: #34D399; }

        .terminalTitle {
          font-size: 12px;
          color: #9CA3AF;
          font-weight: 700;
          flex-shrink: 1;
          min-width: 0;
        }

        .terminalBody {
          padding: 18px;
          width: 100%;
          overflow-x: hidden;
        }

        .terminalLine {
          white-space: pre-wrap;
          overflow-wrap: anywhere;
          word-break: break-word;
          font-size: 13px;
          line-height: 1.9;
          color: #E5E7EB;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        }

        .terminalPrompt {
          color: #60A5FA;
          margin-right: 10px;
        }

        .terminalIndent {
          padding-left: 28px;
        }

        .waitlistWrap {
          background:
            radial-gradient(circle at top right, rgba(47,107,234,0.05), transparent 24%),
            radial-gradient(circle at top left, rgba(139,92,246,0.05), transparent 20%),
            rgba(255,255,255,0.9);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid ${colors.border};
          border-radius: 34px;
          padding: 34px;
          max-width: 920px;
          margin: 0 auto;
          width: 100%;
          overflow: hidden;
          position: relative;
          box-shadow: 0 24px 60px rgba(10,14,22,0.06);
        }

        .waitlistForm {
          display: grid;
          grid-template-columns: 1.2fr 0.9fr auto;
          gap: 12px;
          margin-top: 26px;
          width: 100%;
        }

        .inputBase {
          width: 100%;
          max-width: 100%;
          height: 58px;
          border-radius: 18px;
          border: 1px solid ${colors.border};
          background: rgba(255,255,255,0.88);
          padding: 0 16px;
          font-size: 15px;
          color: ${colors.text};
          outline: none;
          min-width: 0;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.7);
        }

        .inputBase:focus {
          border-color: ${colors.accent};
          box-shadow: 0 0 0 4px rgba(47,107,234,0.08);
        }

        .roleNote {
          margin-top: 14px;
          text-align: center;
          color: ${colors.textLight};
          font-size: 13px;
          line-height: 1.8;
        }

        .metricsGrid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 1px;
          background: ${colors.border};
          border: 1px solid ${colors.border};
          border-radius: 26px;
          overflow: hidden;
        }

        .metricCard {
          background: rgba(255,255,255,0.82);
          padding: 30px 20px;
          text-align: center;
          min-width: 0;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .footerRow {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .navCta { min-width: 0; }
        .navCtaMobile { display: none; }

        @media (max-width: 1100px) {
          .heroWrap {
            grid-template-columns: 1fr;
          }

          .heroVisualPanel {
            max-width: 520px;
            margin: 0 auto;
          }

          .heroSignalGrid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 900px) {
          .grid3,
          .grid2,
          .workflowGrid,
          .waitlistForm {
            grid-template-columns: 1fr;
          }

          .metricsGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .workflowArrow {
            display: none;
          }

          .ecosystemCard {
            min-width: 194px;
            min-height: 82px;
          }
        }

        @media (max-width: 720px) {
          .container {
            padding-left: 18px;
            padding-right: 18px;
          }

          .section {
            padding: 74px 0;
          }

          .navLinks {
            display: none !important;
          }

          .heroTitle {
            font-size: clamp(44px, 14vw, 68px);
          }

          .heroBody {
            font-size: 17px;
          }

          .heroButtons {
            flex-direction: column;
            align-items: stretch;
          }

          .btnPrimary,
          .btnSecondary {
            width: 100%;
          }

          .heroVisualPanel {
            padding: 16px;
            border-radius: 30px;
          }

          .heroSignalGrid {
            gap: 12px;
          }

          .heroSignalCard {
            padding: 16px 15px;
            border-radius: 20px;
          }

          .heroSignalIcon {
            width: 42px;
            height: 42px;
            min-width: 42px;
            border-radius: 14px;
          }

          .heroSignalTitle {
            font-size: 15px;
          }

          .heroSignalDesc {
            font-size: 12px;
            line-height: 1.65;
          }

          .phoneFrame {
            width: min(100%, 350px);
          }

          .phoneScreen {
            height: 560px;
          }

          .phoneFloatTag {
            display: none;
          }

          .terminalCard,
          .darkCard,
          .card,
          .waitlistWrap {
            max-width: 100%;
          }

          .terminalBody {
            padding: 16px;
          }

          .terminalLine {
            font-size: 12px;
            line-height: 1.75;
          }

          .metricsGrid {
            grid-template-columns: 1fr;
          }

          .waitlistWrap {
            padding: 24px;
            border-radius: 28px;
          }

          .navCta {
            width: auto !important;
            min-width: 164px;
            max-width: 52vw;
            padding: 12px 16px !important;
            font-size: 14px !important;
            white-space: nowrap;
          }

          .navCtaDesktop { display: none; }
          .navCtaMobile { display: inline; }

          .ecosystemTrack {
            gap: 12px;
          }

          .ecosystemCard {
            min-width: 170px;
            min-height: 76px;
            padding: 14px 16px;
            border-radius: 18px;
          }

          .ecosystemLogo {
            max-width: 112px;
            max-height: 28px;
          }
        }

        @media (max-width: 520px) {
          .container {
            padding-left: 14px;
            padding-right: 14px;
          }

          .navCta {
            min-width: 148px;
            max-width: 48vw;
            padding: 11px 14px !important;
            font-size: 13px !important;
          }

          .phoneFrame {
            width: min(100%, 338px);
            padding: 10px;
          }

          .phoneScreen {
            height: 540px;
            border-radius: 28px;
          }

          .phoneNotch {
            width: 112px;
            height: 26px;
          }

          .promptStage {
            height: 156px;
          }

          .ecosystemCard {
            min-width: 152px;
          }
        }
      `}</style>

      <SuccessModal
        open={isSuccessOpen}
        role={submittedRole}
        onClose={() => setIsSuccessOpen(false)}
      />

      <div className="siteWrap">
        <motion.nav
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            background: `${colors.bg}E8`,
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          <div
            className="container"
            style={{
              minHeight: "82px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                minWidth: 0,
                flex: "1 1 auto",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "46px",
                  height: "46px",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  overflow: "hidden",
                  boxShadow: "0 8px 24px rgba(10,14,22,0.08)",
                }}
              >
                <Image
                  src="/omela-logo-mark.png"
                  alt="Omela logo"
                  width={46}
                  height={46}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>

              <div style={{ minWidth: 0, overflow: "hidden" }}>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  Omela
                </div>

                <div
                  className="serif"
                  style={{
                    fontSize: "13px",
                    color: colors.textLight,
                    marginTop: "2px",
                    fontStyle: "italic",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  Powered by Laura
                </div>
              </div>
            </div>

            <div
              className="navLinks"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "28px",
                flex: "0 1 auto",
              }}
            >
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: colors.textMuted,
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <a
              href="#waitlist"
              className="btnPrimary navCta"
              style={{ padding: "13px 20px", flexShrink: 0 }}
            >
              <span className="navCtaDesktop">Get early access</span>
              <span className="navCtaMobile">Early access</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </motion.nav>

        <section className="section" style={{ paddingTop: "92px", paddingBottom: "54px" }}>
          <div className="container">
            <div className="heroWrap">
              <div>
                <FadeIn>
                  <Badge>
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        background: colors.success,
                        borderRadius: "999px",
                        display: "inline-block",
                      }}
                    />
                    Now onboarding patients, providers, and developers
                  </Badge>
                </FadeIn>

                <FadeIn delay={0.08}>
                  <h1 className="serif heroTitle" style={{ marginTop: "24px" }}>
                    The AI health agent
                    <span className="heroAccent">for care, triage, and access.</span>
                  </h1>
                </FadeIn>

                <FadeIn delay={0.16}>
                  <p className="heroBody">
                    Laura gives people a clearer starting point, gives care teams faster intake
                    and calmer routing, and gives developers a care ready AI layer for products,
                    workflows, and modern digital experiences.
                  </p>
                </FadeIn>

                <FadeIn delay={0.22}>
                  <div className="heroSignalGrid">
                    {heroSignals.map((signal) => (
                      <div key={signal.title} className="heroSignalCard">
                        <div className="heroSignalIcon">
                          <HeroSignalIcon kind={signal.kind} />
                        </div>

                        <div style={{ minWidth: 0 }}>
                          <div className="heroSignalTitle">{signal.title}</div>
                          <div className="heroSignalDesc">{signal.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </FadeIn>

                <FadeIn delay={0.28}>
                  <div className="heroButtons">
                    <a href="#waitlist" className="btnPrimary">
                      Get early access
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </a>

                    <a href="#developers" className="btnSecondary">
                      Explore developer tools
                    </a>
                  </div>
                </FadeIn>
              </div>

              <FadeIn delay={0.14}>
                <div className="heroVisualPanel">
                  <PhoneMockup />
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.32}>
              <div className="trustedHeader">Designed for the systems behind modern care</div>

              <EcosystemMarquee logos={ecosystemLogos} />

              <p className="ecosystemCaption">
                Representative platforms and infrastructure Omela is being designed to work
                alongside across cloud, care workflows, communication, and developer tooling.
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="section" style={{ paddingTop: "38px" }}>
          <div className="container">
            <FadeIn>
              <SectionHeading
                badge="Built for everyone"
                title={<>One platform. Three entry points.</>}
                body="Laura works as a direct health experience for the public, an operations layer for care teams, and an integration layer for digital health products."
              />
            </FadeIn>

            <div className="grid3" style={{ marginTop: "50px" }}>
              {audienceCards.map((card, index) => (
                <FadeIn key={card.title} delay={index * 0.08}>
                  <div className="card">
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "18px",
                        background:
                          index === 1
                            ? colors.purpleSoft
                            : index === 2
                            ? colors.bgSoft
                            : colors.accentSoft,
                        color:
                          index === 1
                            ? colors.purple
                            : index === 2
                            ? colors.textMuted
                            : colors.accent,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "20px",
                        fontWeight: 800,
                      }}
                    >
                      {index + 1}
                    </div>

                    <h3
                      style={{
                        fontSize: "24px",
                        fontWeight: 800,
                        letterSpacing: "-0.03em",
                        marginTop: "18px",
                      }}
                    >
                      {card.title}
                    </h3>

                    <p
                      style={{
                        marginTop: "10px",
                        color: colors.textMuted,
                        fontSize: "15px",
                        lineHeight: 1.84,
                      }}
                    >
                      {card.desc}
                    </p>

                    <div className="featureList">
                      {card.bullets.map((bullet) => (
                        <div className="featureRow" key={bullet}>
                          <span className="dotCheck">✓</span>
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section id="people" className="section">
          <div className="container">
            <div className="grid2" style={{ alignItems: "center" }}>
              <FadeIn>
                <div>
                  <Badge>Laura for people</Badge>

                  <h2
                    className="serif"
                    style={{
                      fontSize: "clamp(30px, 5vw, 54px)",
                      lineHeight: 1.05,
                      letterSpacing: "-0.045em",
                      marginTop: "18px",
                    }}
                  >
                    Healthcare guidance that starts with a conversation.
                  </h2>

                  <p
                    style={{
                      marginTop: "16px",
                      color: colors.textMuted,
                      fontSize: "17px",
                      lineHeight: 1.88,
                      maxWidth: "560px",
                    }}
                  >
                    Laura gives people a calmer first step. Ask questions in plain language,
                    understand what may matter, get guided next steps, and move faster toward the
                    right kind of care.
                  </p>

                  <div className="featureList" style={{ marginTop: "24px" }}>
                    {publicUseCases.map((item) => (
                      <div className="featureRow" key={item}>
                        <span className="dotCheck">✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.08}>
                <TypewriterPrompts />
              </FadeIn>
            </div>
          </div>
        </section>

        <section id="providers" className="section" style={{ paddingTop: "26px" }}>
          <div className="container">
            <FadeIn>
              <SectionHeading
                badge="Workflow"
                title={<>A cleaner flow from demand to care access.</>}
                body="Laura helps turn fragmented questions, intake, and requests into clearer action for people, care teams, and connected products."
              />
            </FadeIn>

            <div className="workflowGrid">
              {workflowItems.map((item, index) => (
                <FadeIn key={item.title} delay={index * 0.08}>
                  <div className="workflowItem">
                    {index < workflowItems.length - 1 ? (
                      <div className="workflowArrow">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </div>
                    ) : null}

                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        color: colors.textLight,
                      }}
                    >
                      Step {index + 1}
                    </div>

                    <h3
                      style={{
                        marginTop: "12px",
                        fontSize: "22px",
                        lineHeight: 1.2,
                        letterSpacing: "-0.03em",
                        fontWeight: 800,
                      }}
                    >
                      {item.title}
                    </h3>

                    <p
                      style={{
                        marginTop: "12px",
                        color: colors.textMuted,
                        fontSize: "15px",
                        lineHeight: 1.84,
                      }}
                    >
                      {item.body}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section id="developers" className="section developerSection">
          <div className="container">
            <FadeIn>
              <SectionHeading
                badge="Developer platform"
                title={
                  <>
                    Integrate Laura
                    <br />
                    into your product in minutes.
                  </>
                }
                body="Embed health guidance, conversational support, and care flows into apps, patient journeys, and internal healthcare workflows."
                tone="dark"
              />
            </FadeIn>

            <div className="grid2" style={{ marginTop: "50px", alignItems: "center" }}>
              <FadeIn>
                <CodeBlock />
              </FadeIn>

              <FadeIn delay={0.08}>
                <div className="darkCard">
                  <h3
                    style={{
                      fontSize: "28px",
                      lineHeight: 1.15,
                      letterSpacing: "-0.03em",
                      fontWeight: 800,
                      color: "#FFFFFF",
                    }}
                  >
                    Built for modern integration teams
                  </h3>

                  <p
                    style={{
                      marginTop: "14px",
                      color: "rgba(255,255,255,0.74)",
                      fontSize: "15px",
                      lineHeight: 1.96,
                      maxWidth: "560px",
                    }}
                  >
                    Laura can be embedded into consumer health apps, marketplaces, internal
                    tooling, and provider systems without forcing teams into fragile custom
                    workflows.
                  </p>

                  <div className="featureList" style={{ marginTop: "22px" }}>
                    {developerFeatures.map((item) => (
                      <div
                        className="featureRow"
                        key={item}
                        style={{ color: "rgba(255,255,255,0.82)" }}
                      >
                        <span
                          className="dotCheck"
                          style={{ background: "rgba(47,107,234,0.16)", color: "#7FB0FF" }}
                        >
                          ✓
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div
                    style={{
                      marginTop: "24px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "11px 14px",
                      borderRadius: "999px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      background: "rgba(255,255,255,0.04)",
                      color: "rgba(255,255,255,0.82)",
                      fontSize: "13px",
                      fontWeight: 700,
                      maxWidth: "100%",
                    }}
                  >
                    API, SDK, widget, and workflow ready
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <section id="pricing" className="section">
          <div className="container">
            <FadeIn>
              <SectionHeading
                badge="Pricing"
                title={<>Simple access for people, providers, and developers.</>}
                body="Start with the audience that matters now, then expand as Laura becomes part of your workflow, product, or daily care routine."
              />
            </FadeIn>

            <div className="grid3" style={{ marginTop: "50px" }}>
              {pricingPlans.map((plan, index) => (
                <FadeIn key={plan.name} delay={index * 0.08}>
                  <div
                    className="card"
                    style={{
                      background: plan.highlighted
                        ? "linear-gradient(180deg, #0D1524 0%, #13213D 100%)"
                        : "rgba(255,255,255,0.82)",
                      color: plan.highlighted ? "#FFFFFF" : colors.text,
                      border: plan.highlighted ? "none" : `1px solid ${colors.border}`,
                      boxShadow: plan.highlighted ? "0 28px 60px rgba(10,14,22,0.16)" : undefined,
                      position: "relative",
                    }}
                  >
                    {"badge" in plan && plan.badge ? (
                      <div
                        style={{
                          position: "absolute",
                          top: "18px",
                          right: "18px",
                          borderRadius: "999px",
                          padding: "7px 11px",
                          background: "rgba(255,255,255,0.1)",
                          color: "rgba(255,255,255,0.78)",
                          fontSize: "11px",
                          fontWeight: 800,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {plan.badge}
                      </div>
                    ) : null}

                    <div style={{ fontSize: "16px", fontWeight: 700 }}>{plan.name}</div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "4px",
                        marginTop: "16px",
                        flexWrap: "wrap",
                      }}
                    >
                      <div
                        className="serif"
                        style={{
                          fontSize: "44px",
                          letterSpacing: "-0.05em",
                        }}
                      >
                        {plan.price}
                      </div>

                      {plan.period ? (
                        <div
                          style={{
                            fontSize: "14px",
                            color: plan.highlighted
                              ? "rgba(255,255,255,0.55)"
                              : colors.textMuted,
                          }}
                        >
                          {plan.period}
                        </div>
                      ) : null}
                    </div>

                    <p
                      style={{
                        marginTop: "10px",
                        color: plan.highlighted ? "rgba(255,255,255,0.7)" : colors.textMuted,
                        fontSize: "14px",
                        lineHeight: 1.84,
                      }}
                    >
                      {plan.desc}
                    </p>

                    <div
                      style={{
                        marginTop: "22px",
                        paddingTop: "20px",
                        borderTop: `1px solid ${
                          plan.highlighted ? "rgba(255,255,255,0.1)" : colors.border
                        }`,
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      {plan.features.map((feature) => (
                        <div
                          key={feature}
                          className="featureRow"
                          style={{
                            color: plan.highlighted
                              ? "rgba(255,255,255,0.82)"
                              : colors.textMuted,
                          }}
                        >
                          <span
                            className="dotCheck"
                            style={{
                              background: plan.highlighted
                                ? "rgba(127,176,255,0.12)"
                                : colors.accentSoft,
                              color: plan.highlighted ? "#7FB0FF" : colors.accent,
                            }}
                          >
                            ✓
                          </span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <a
                      href="#waitlist"
                      className={plan.highlighted ? "btnSecondary" : "btnPrimary"}
                      style={{
                        marginTop: "24px",
                        width: "100%",
                        background: plan.highlighted ? "#FFFFFF" : colors.bgDark,
                        color: plan.highlighted ? colors.bgDark : "#FFFFFF",
                        border: "none",
                      }}
                    >
                      {plan.cta}
                    </a>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: "24px" }}>
          <div className="container">
            <FadeIn>
              <div className="metricsGrid">
                {metrics.map((metric) => (
                  <div className="metricCard" key={metric.label}>
                    <div
                      className="serif"
                      style={{
                        fontSize: "42px",
                        lineHeight: 1,
                        letterSpacing: "-0.05em",
                      }}
                    >
                      {metric.value}
                    </div>
                    <div
                      style={{
                        marginTop: "10px",
                        fontSize: "13px",
                        color: colors.textMuted,
                        lineHeight: 1.7,
                      }}
                    >
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        <section id="waitlist" className="section">
          <div className="container">
            <FadeIn>
              <div className="waitlistWrap">
                <SectionHeading
                  badge="Get early access"
                  title={<>Join the next wave of Laura users.</>}
                  body="Choose how you want to use Laura. Join as a patient, provider, or developer and we will tailor the next step."
                />

                <form className="waitlistForm" onSubmit={handleWaitlistSubmit}>
                  <input
                    className="inputBase"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />

                  <select
                    className="inputBase"
                    value={role}
                    onChange={(e) => setRole(e.target.value as RoleKey)}
                  >
                    <option value="patient">Patient</option>
                    <option value="provider">Provider</option>
                    <option value="developer">Developer</option>
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
                    className="btnPrimary"
                    style={{ height: "58px" }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Get early access"}
                  </button>
                </form>

                <div className="roleNote">
                  Selected role:{" "}
                  <strong style={{ color: colors.text }}>{roleLabels[role]}</strong> ·{" "}
                  {roleNotes[role]}
                </div>

                {successMessage ? (
                  <div
                    style={{
                      marginTop: "18px",
                      border: `1px solid ${colors.border}`,
                      background: "#F7FBF8",
                      color: "#166534",
                      borderRadius: "18px",
                      padding: "16px 18px",
                      textAlign: "center",
                      fontSize: "14px",
                      lineHeight: 1.7,
                      fontWeight: 600,
                    }}
                  >
                    {successMessage}
                  </div>
                ) : null}

                {errorMessage ? (
                  <div
                    style={{
                      marginTop: "18px",
                      border: `1px solid ${colors.border}`,
                      background: "#FFF7F7",
                      color: "#B91C1C",
                      borderRadius: "18px",
                      padding: "16px 18px",
                      textAlign: "center",
                      fontSize: "14px",
                      lineHeight: 1.7,
                      fontWeight: 600,
                    }}
                  >
                    {errorMessage}
                  </div>
                ) : null}
              </div>
            </FadeIn>
          </div>
        </section>

        <footer style={{ borderTop: `1px solid ${colors.border}`, padding: "34px 0 44px" }}>
          <div className="container">
            <div className="footerRow">
              <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "12px",
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src="/omela-logo-mark.png"
                    alt="Omela logo"
                    width={36}
                    height={36}
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </div>

                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: "14px", fontWeight: 800 }}>Omela</div>
                  <div
                    className="serif"
                    style={{ fontSize: "13px", color: colors.textLight, fontStyle: "italic" }}
                  >
                    Powered by Laura
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "18px", flexWrap: "wrap" }}>
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    style={{ fontSize: "13px", color: colors.textLight, fontWeight: 600 }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              <div style={{ fontSize: "13px", color: colors.textLight }}>
                © 2026 Omela. Built for modern care access.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}