"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowRight,
  Building2,
  FileText,
  Globe2,
  Languages,
  MapPin,
  Mic,
  Phone,
  Pill,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');`;

const c = {
  bg: "#F8F6F1",
  card: "#FFFFFF",
  dark: "#08090C",
  text: "#111214",
  sub: "#4A4F5C",
  muted: "#888E9C",
  accent: "#2563EB",
  accentSoft: "#ECF2FF",
  border: "#E3DDD2",
  borderDk: "#202430",
  green: "#22C55E",
  greenSoft: "#ECFDF3",
  greenDk: "#15803D",
  warm: "#C9956B",
  red: "#E45454",
  redSoft: "#FEF2F2",
};

type Role = "patient" | "provider" | "developer";

type ChatMessage = {
  from: "user" | "laura" | "action";
  text: string;
};

const heroLines = [
  "You call at 8am and still get no slot.",
  "You need a repeat prescription by tomorrow.",
  "You moved city and do not know how to register.",
  "You got a hospital letter you do not understand.",
];

const phoneFlows: {
  lang: string;
  flag: string;
  messages: ChatMessage[];
}[] = [
  {
    lang: "English",
    flag: "🇬🇧",
    messages: [
      {
        from: "user",
        text: "I just moved to Manchester and need to register with a GP.",
      },
      {
        from: "laura",
        text: "I found 3 practices near you accepting new patients.",
      },
      {
        from: "action",
        text: "City Health Centre · 0.3 miles · Accepting new patients",
      },
      {
        from: "laura",
        text: "Callback requested. Bring photo ID and proof of address.",
      },
    ],
  },
  {
    lang: "Français",
    flag: "🇫🇷",
    messages: [
      {
        from: "user",
        text: "J'ai besoin de renouveler mon ordonnance.",
      },
      {
        from: "laura",
        text: "Je peux vous aider. Quel médicament prenez-vous ?",
      },
      {
        from: "user",
        text: "Amlodipine 5mg, tous les jours.",
      },
      {
        from: "action",
        text: "Demande de renouvellement préparée pour votre cabinet",
      },
    ],
  },
  {
    lang: "Yorùbá",
    flag: "🇳🇬",
    messages: [
      {
        from: "user",
        text: "Mo fẹ́ rí dókítà tó súnmọ́ mi.",
      },
      {
        from: "laura",
        text: "Mo rí ilé ìwòsàn mẹ́ta nítòsí. Ẹ jẹ́ kí n ràn ẹ́ lọ́wọ́.",
      },
      {
        from: "user",
        text: "Mo wà ní HD1.",
      },
      {
        from: "action",
        text: "Practice méjì nítòsí rẹ · 0.4 miles",
      },
    ],
  },
];

const problemCards = [
  {
    icon: Pill,
    title: "Repeat prescriptions",
    body: "Laura helps users structure refill requests before they run out, instead of repeating the same call every month.",
  },
  {
    icon: MapPin,
    title: "GP registration",
    body: "Laura finds nearby practices, explains what to bring, and guides people through registering in a new area.",
  },
  {
    icon: FileText,
    title: "Referral clarity",
    body: "Laura explains hospital letters, appointments, scans, and next steps in language normal people can understand.",
  },
  {
    icon: Languages,
    title: "Language access",
    body: "Laura replies in the user's language and prepares clear bilingual notes for reception or triage.",
  },
];

const useCases = [
  {
    emoji: "💊",
    title: "Stop chasing repeat prescriptions",
    body: "Draft the request, track the next step, and remind the patient before medication runs out.",
  },
  {
    emoji: "📍",
    title: "Register with the right GP",
    body: "Find nearby practices, understand the process, and remove the panic of starting from zero in a new city.",
  },
  {
    emoji: "📄",
    title: "Explain what the letter actually means",
    body: "Turn hospital jargon into plain language, with what to bring, where to go, and what happens next.",
  },
];

const countryStories = [
  {
    flag: "🇬🇧",
    country: "United Kingdom",
    quote:
      "I called at 8:01am. Busy. By 8:15 all slots were gone. Three weeks of this.",
    body:
      "Laura structures the request earlier, makes the callback clearer, and helps people stop starting from zero every morning.",
  },
  {
    flag: "🇺🇸",
    country: "United States",
    quote:
      "I delayed seeing a doctor for six months because I was terrified of the cost.",
    body:
      "Laura helps people understand the next step earlier, before delay makes the problem harder and more expensive.",
  },
  {
    flag: "🇳🇬",
    country: "Nigeria",
    quote:
      "Four doctors for ten thousand people. I spent two days trying to find someone.",
    body:
      "Laura helps route people to the most realistic next option faster when access is stretched and time matters.",
  },
];

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Badge({ children }: { children: ReactNode }) {
  return <div className="badge">{children}</div>;
}

function Soon() {
  return (
    <span className="soon">
      <span className="soonShine" />
      Soon
    </span>
  );
}

function Check({ dark = false }: { dark?: boolean }) {
  return <span className={`check${dark ? " checkDark" : ""}`}>✓</span>;
}

function StatusBar() {
  return (
    <div className="statusBar">
      <div className="container statusInner">
        <motion.span
          className="statusDot"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="statusText">All systems operational</span>
        <Link href="/status" className="statusLink">
          View status
        </Link>
      </div>
    </div>
  );
}

function Typewriter() {
  const lines = useMemo(() => heroLines, []);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = lines[lineIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex < current.length) {
      timer = setTimeout(() => setCharIndex((p) => p + 1), 28);
    } else if (!isDeleting && charIndex === current.length) {
      timer = setTimeout(() => setIsDeleting(true), 1400);
    } else if (isDeleting && charIndex > 0) {
      timer = setTimeout(() => setCharIndex((p) => p - 1), 16);
    } else {
      setIsDeleting(false);
      setLineIndex((p) => (p + 1) % lines.length);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, lineIndex, lines]);

  return (
    <span className="typeLine">
      {lines[lineIndex].slice(0, charIndex)}
      <span className="typeCursor">|</span>
    </span>
  );
}

function PhoneMockup() {
  const [flowIndex, setFlowIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);

  const flow = phoneFlows[flowIndex];

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (visibleCount >= flow.messages.length) {
      timer = setTimeout(() => {
        setFlowIndex((p) => (p + 1) % phoneFlows.length);
        setVisibleCount(0);
        setTyping(false);
      }, 2200);
      return () => clearTimeout(timer);
    }

    const current = flow.messages[visibleCount];

    if (current.from === "user" || current.from === "action") {
      timer = setTimeout(() => {
        setVisibleCount((p) => p + 1);
      }, 700);
      return () => clearTimeout(timer);
    }

    setTyping(true);
    timer = setTimeout(() => {
      setTyping(false);
      setVisibleCount((p) => p + 1);
    }, 850);

    return () => clearTimeout(timer);
  }, [flow, visibleCount]);

  return (
    <div className="phoneWrap">
      <motion.div
        className="phoneAura"
        animate={{ opacity: [0.14, 0.3, 0.14] }}
        transition={{ duration: 4.6, repeat: Infinity }}
      />
      <div className="phoneFrame">
        <div className="phoneNotch" />
        <div className="phoneScreen">
          <div className="phoneTop">
            <div className="phoneIdentity">
              <div className="phoneAvatar">
                <Image
                  src="/laura-avatar.png"
                  alt="Laura"
                  fill
                  sizes="26px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div>
                <div className="phoneName">
                  Laura
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
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
                <div className="phoneOnline">
                  <span className="phoneOnlineDot" />
                  online
                </div>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={flowIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="phoneLang"
            >
              {flow.flag} {flow.lang}
            </motion.div>
          </AnimatePresence>

          <div className="phoneBody">
            {flow.messages.slice(0, visibleCount).map((msg, i) => (
              <motion.div
                key={`${flowIndex}-${i}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className={`phoneRow ${
                  msg.from === "user" ? "phoneRowUser" : "phoneRowLaura"
                }`}
              >
                {msg.from === "action" ? (
                  <div className="phoneAction">{msg.text}</div>
                ) : (
                  <div
                    className={`phoneBubble ${
                      msg.from === "user"
                        ? "phoneBubbleUser"
                        : "phoneBubbleLaura"
                    }`}
                  >
                    {msg.text}
                  </div>
                )}
              </motion.div>
            ))}

            {typing && (
              <div className="phoneRow phoneRowLaura">
                <div className="phoneBubble phoneBubbleLaura phoneTyping">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
          </div>

          <div className="phoneComposer">
            <div className="phoneComposerField">Message</div>
            <div className="phoneComposerMic">
              <Mic size={12} color="#fff" />
            </div>
          </div>
        </div>
      </div>
    </div>
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
      '    concern: "repeat prescription",',
      '    lang: "fr"',
      "  });",
      "",
      "  // request drafted and practice matched",
      "  Done in 1.1s",
    ],
    []
  );

  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (lineIndex >= lines.length) {
      const t = setTimeout(() => {
        setLineIndex(0);
        setCharIndex(0);
      }, 2800);
      return () => clearTimeout(t);
    }

    const line = lines[lineIndex];

    if (charIndex < line.length) {
      const t = setTimeout(
        () => setCharIndex((p) => p + 1),
        line.startsWith("  //") ? 34 : 18
      );
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setLineIndex((p) => p + 1);
      setCharIndex(0);
    }, line === "" ? 60 : 140);

    return () => clearTimeout(t);
  }, [charIndex, lineIndex, lines]);

  return (
    <div className="terminal">
      <div className="terminalTop">
        <div className="terminalDots">
          <span />
          <span />
          <span />
        </div>
        <span className="terminalTitle">Laura SDK</span>
        <Soon />
      </div>

      <div className="terminalBody">
        {lines.slice(0, lineIndex + 1).map((line, i) => {
          const active = i === lineIndex;
          const color = line.startsWith("  Done") || line.startsWith("  //")
            ? "#4ADE80"
            : line.startsWith("$")
            ? "#E2E8F0"
            : "#94A3B8";

          return (
            <div key={i} className="terminalLine" style={{ color }}>
              {active ? line.slice(0, charIndex) : line}
              {active && <span className="terminalCursor">|</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SuccessModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="modalOverlay"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            className="modalBox"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="serif modalTitle">You are on the list.</h3>
            <p className="modalBody">
              Laura will reach out as access opens. Follow @joinomela for
              updates.
            </p>
            <div className="modalActions">
              <a
                href="https://x.com/joinomela"
                target="_blank"
                rel="noreferrer"
                className="btnPrimary"
              >
                Follow on X
              </a>
              <button type="button" className="btnSecondary" onClick={onClose}>
                Close
              </button>
            </div>
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
  const [activeStory, setActiveStory] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => {
      setActiveStory((p) => (p + 1) % countryStories.length);
    }, 5200);
    return () => clearTimeout(t);
  }, [activeStory]);

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
        body: JSON.stringify({ email, role, website, source: "landing-page", marketingOptIn: false }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      setSuccess(data.message || "You are in.");
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

  const story = countryStories[activeStory];

  return (
    <>
      <style>{FONT}</style>
      <style>{CSS}</style>

      <SuccessModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <div className="wrap">
        <StatusBar />

        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="nav"
        >
          <div className="container navRow">
            <Link href="/" className="navBrand">
              <div className="navLogo">
                <Image
                  src="/omela-logo-mark.png"
                  alt="Omela"
                  width={34}
                  height={34}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>
              <div>
                <div className="navName">Omela</div>
                <div className="navSub">POWERED BY LAURA</div>
              </div>
            </Link>

            <div className="navLinks">
              <a href="#what" className="navLink">
                What Laura does
              </a>
              <a href="#who" className="navLink">
                Who it is for
              </a>
              <a href="#pricing" className="navLink">
                Pricing
              </a>
            </div>

            <a href="#waitlist" className="btnPrimary navCta">
              Join waitlist
              <ArrowRight size={13} />
            </a>
          </div>
        </motion.nav>

        <section className="heroSection">
          <div className="container heroGrid">
            <div className="heroCopy">
              <Reveal>
                <Badge>Primary care access, rebuilt</Badge>
              </Reveal>

              <Reveal delay={0.04}>
                <h1 className="serif heroTitle">
                  Getting through your GP
                  <span className="heroAccent">should not feel like a second job.</span>
                </h1>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="heroType">
                  <Typewriter />
                </div>
              </Reveal>

              <Reveal delay={0.12}>
                <p className="heroBody">
                  Laura is not a generic health chatbot. She helps people
                  register with a GP, handle repeat prescriptions, understand
                  hospital letters, and move through care access faster.
                </p>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="heroButtons">
                  <Link href="/demo" className="btnPrimary">
                    See product demo
                    <ArrowRight size={14} />
                  </Link>
                  <a href="#waitlist" className="btnSecondary">
                    Join waitlist
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="heroProofs">
                  <span className="heroProof">GP registration</span>
                  <span className="heroProof">Repeat prescriptions</span>
                  <span className="heroProof">Referral guidance</span>
                  <span className="heroProof">40+ languages</span>
                </div>
              </Reveal>
            </div>

            <div className="heroVisual">
              <PhoneMockup />
            </div>
          </div>
        </section>

        <section id="what" className="section sectionTopLess">
          <div className="container">
            <Reveal>
              <div className="sectionHead">
                <Badge>What Laura actually does</Badge>
                <h2 className="serif sectionTitle">
                  Built for the moments where access usually breaks.
                </h2>
                <p className="sectionBody">
                  Laura helps people move through care. Not just read about it.
                </p>
              </div>
            </Reveal>

            <div className="problemGrid">
              {problemCards.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.title} delay={i * 0.05}>
                    <div className="problemCard">
                      <div className="problemIcon">
                        <Icon size={22} strokeWidth={2.1} color={c.accent} />
                      </div>
                      <h3 className="problemTitle">{item.title}</h3>
                      <p className="problemBody">{item.body}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section sectionTopLess">
          <div className="container">
            <Reveal>
              <div className="contrastGrid">
                <div className="contrastCard contrastMuted">
                  <div className="contrastTitle">Generic health chatbot</div>
                  <div className="contrastList">
                    {[
                      "Explains symptoms in broad terms",
                      "Does not know the local care path",
                      "Does not help register with a GP",
                      "Does not structure callback requests",
                      "Does not reduce reception admin",
                    ].map((item) => (
                      <div key={item} className="contrastItem">
                        <span className="contrastX">×</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="contrastCard contrastAccent">
                  <div className="contrastTitle">Laura</div>
                  <div className="contrastList">
                    {[
                      "Finds practices near the user",
                      "Guides GP registration",
                      "Helps handle repeat prescriptions",
                      "Explains letters and referrals",
                      "Supports multilingual intake",
                    ].map((item) => (
                      <div key={item} className="contrastItem contrastGood">
                        <Check />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section sectionTopLess">
          <div className="container">
            <Reveal>
              <div className="sectionHead narrow">
                <Badge>Use cases</Badge>
                <h2 className="serif sectionTitle">
                  The product shines in boring, painful, everyday healthcare admin.
                </h2>
              </div>
            </Reveal>

            <div className="useCaseGrid">
              {useCases.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.05}>
                  <div className="useCaseCard">
                    <span className="useCaseEmoji">{item.emoji}</span>
                    <h3 className="useCaseTitle">{item.title}</h3>
                    <p className="useCaseBody">{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.18}>
              <div className="useCaseAction">
                <Link href="/how-laura-helps" className="useCaseLink">
                  See all care scenarios
                  <ArrowRight size={14} />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section sectionTopLess">
          <div className="container">
            <Reveal>
              <div className="sectionHead narrow">
                <Badge>How it works</Badge>
                <h2 className="serif sectionTitle">
                  Three steps from confusion to a clear next move.
                </h2>
              </div>
            </Reveal>

            <div className="stepsGrid">
              <Reveal delay={0.04}>
                <div className="stepCard">
                  <div className="stepNum">01</div>
                  <h3 className="stepTitle">Tell Laura what is happening</h3>
                  <p className="stepBody">
                    In plain language, in your own language, without needing to
                    sound clinical.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="stepCard">
                  <div className="stepNum">02</div>
                  <h3 className="stepTitle">Laura structures the request</h3>
                  <p className="stepBody">
                    Laura makes the problem usable for the next care path,
                    callback, registration, or referral step.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="stepCard">
                  <div className="stepNum">03</div>
                  <h3 className="stepTitle">You move faster</h3>
                  <p className="stepBody">
                    Less chasing. Less repetition. More clarity on what to do
                    and where to go next.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="globeSection">
          <div className="container">
            <Reveal>
              <div className="sectionHead">
                <Badge>Global access problems</Badge>
                <h2 className="serif sectionTitle">
                  The pain changes by country. The friction feels the same.
                </h2>
                <p className="sectionBody">
                  Delay, confusion, language, cost, distance. Laura is built for
                  the layer between needing care and actually reaching it.
                </p>
              </div>
            </Reveal>

            <div className="globeWrap">
              <div className="globeVisual">
                <svg viewBox="0 0 100 100" className="globeSvg">
                  <circle
                    cx="50"
                    cy="50"
                    r="47"
                    fill="none"
                    stroke="#C8BFA8"
                    strokeWidth="0.5"
                  />
                  {[22, 32, 42, 50, 58, 68, 78].map((y) => (
                    <ellipse
                      key={y}
                      cx="50"
                      cy="50"
                      rx={Math.sqrt(Math.max(0, 2209 - (y - 50) * (y - 50)))}
                      ry="3.5"
                      fill="none"
                      stroke="#D0C9B8"
                      strokeWidth="0.18"
                      opacity="0.48"
                      transform={`translate(0,${y - 50})`}
                    />
                  ))}
                  {[-30, -15, 0, 15, 30].map((x) => (
                    <ellipse
                      key={x}
                      cx="50"
                      cy="50"
                      rx="3.5"
                      ry="47"
                      fill="none"
                      stroke="#D0C9B8"
                      strokeWidth="0.18"
                      opacity="0.42"
                      transform={`rotate(${x},50,50)`}
                    />
                  ))}
                  <path
                    d="M43,22 L48,20 L53,23 L54,28 L49,31 L44,29 Z"
                    fill="#D7D0C1"
                    opacity="0.34"
                  />
                  <path
                    d="M45,31 L52,31 L54,39 L50,43 L44,39 L43,35 Z"
                    fill="#D7D0C1"
                    opacity="0.3"
                  />
                  <path
                    d="M19,31 L35,28 L38,35 L31,40 L21,38 L18,34 Z"
                    fill="#D7D0C1"
                    opacity="0.24"
                  />
                  <path
                    d="M27,51 L34,47 L36,55 L31,63 L26,59 Z"
                    fill="#D7D0C1"
                    opacity="0.24"
                  />
                  <path
                    d="M62,34 L75,32 L78,40 L72,48 L64,44 L60,38 Z"
                    fill="#D7D0C1"
                    opacity="0.24"
                  />

                  {countryStories.map((s, i) => {
                    const coords = [
                      { x: 48, y: 30 },
                      { x: 26, y: 36 },
                      { x: 50, y: 52 },
                    ][i];
                    return (
                      <g key={s.country}>
                        <line
                          x1={coords.x}
                          y1={coords.y}
                          x2="50"
                          y2="50"
                          stroke={i === activeStory ? c.warm : "#D8D0C0"}
                          strokeWidth={i === activeStory ? "0.55" : "0.2"}
                          opacity={i === activeStory ? "0.55" : "0.25"}
                          strokeDasharray={i === activeStory ? "2 2" : "0"}
                        />
                        {i === activeStory && (
                          <motion.circle
                            cx={coords.x}
                            cy={coords.y}
                            r="5.6"
                            fill={c.warm}
                            opacity="0.12"
                            animate={{
                              r: [5.6, 8.2, 5.6],
                              opacity: [0.12, 0.22, 0.12],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                        <circle
                          cx={coords.x}
                          cy={coords.y}
                          r={i === activeStory ? "2.5" : "1.3"}
                          fill={i === activeStory ? c.warm : "#B1A997"}
                          style={{ cursor: "pointer", transition: "all .35s" }}
                          onClick={() => setActiveStory(i)}
                        />
                      </g>
                    );
                  })}
                </svg>
              </div>

              <div className="globeCard">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStory}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="globeCountry">
                      <span className="globeFlag">{story.flag}</span>
                      <span className="globeCountryName">{story.country}</span>
                    </div>
                    <p className="serif globeQuote">“{story.quote}”</p>
                    <div className="globeLauraNote">
                      <div className="globeLauraIcon">
                        <Image
                          src="/laura-avatar.png"
                          alt="Laura"
                          fill
                          sizes="22px"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <p className="globeLauraText">{story.body}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="globeControls">
                  <div className="globeDots">
                    {countryStories.map((_, i) => (
                      <button
                        key={i}
                        className={`globeDot${
                          i === activeStory ? " globeDotActive" : ""
                        }`}
                        onClick={() => setActiveStory(i)}
                        aria-label={`Go to story ${i + 1}`}
                      />
                    ))}
                  </div>
                  <div className="globeActions">
                    <button
                      className="globeArrow"
                      onClick={() =>
                        setActiveStory(
                          (p) => (p - 1 + countryStories.length) % countryStories.length
                        )
                      }
                    >
                      <Globe2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="who" className="section">
          <div className="container">
            <Reveal>
              <div className="sectionHead">
                <Badge>Who Laura is for</Badge>
                <h2 className="serif sectionTitle">Three audiences. One platform.</h2>
              </div>
            </Reveal>

            <div className="audienceGrid">
              <Reveal delay={0.04}>
                <div className="audienceCard">
                  <div className="audienceBadge">1</div>
                  <h3 className="audienceTitle">For people</h3>
                  <p className="audienceBody">
                    You are sick, confused, or stuck. Laura helps you reach the
                    next step faster and with less friction.
                  </p>
                  <div className="featureList">
                    {[
                      "Find doctors near you",
                      "Handle repeat prescriptions",
                      "Understand referral letters",
                      "Speak in your own language",
                    ].map((item) => (
                      <div key={item} className="featureRow">
                        <Check />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="audienceCard">
                  <div className="audienceBadge">2</div>
                  <h3 className="audienceTitle">For practices</h3>
                  <p className="audienceBody">
                    Laura reduces reception pressure by capturing the request
                    properly before the phone queue becomes the bottleneck.
                  </p>
                  <div className="featureList">
                    {[
                      "Structured intake",
                      "Urgency at a glance",
                      "Callback workflows",
                      "Multilingual access",
                    ].map((item) => (
                      <div key={item} className="featureRow">
                        <Check />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="audienceCard">
                  <div className="audienceBadge audienceBadgeWide">
                    3 <Soon />
                  </div>
                  <h3 className="audienceTitle">For developers</h3>
                  <p className="audienceBody">
                    Embed the care access layer into your own product instead of
                    rebuilding the workflow from scratch.
                  </p>
                  <div className="featureList">
                    {[
                      "API and SDK access",
                      "Embeddable widget",
                      "Workflow triggers",
                      "Audit logs",
                    ].map((item) => (
                      <div key={item} className="featureRow">
                        <Check />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="darkSection">
          <div className="container">
            <Reveal>
              <div className="sectionHead">
                <Badge>Developer platform</Badge>
                <h2 className="serif sectionTitle darkTitle">Build with Laura.</h2>
                <p className="sectionBody darkBody">
                  Embed GP access, provider routing, multilingual intake, and
                  structured care access workflows into patient portals, apps,
                  or internal systems.
                </p>
              </div>
            </Reveal>

            <div className="devGrid">
              <Reveal>
                <SDKTerminal />
              </Reveal>

              <Reveal delay={0.08}>
                <div className="devCard">
                  <div className="devIcon">
                    <ShieldCheck size={22} color="#4ADE80" />
                  </div>
                  <h3 className="devTitle">Built for integration teams</h3>
                  <p className="devBody">
                    Add Laura to patient portals, health apps, or internal
                    tooling with workflows designed for real care access.
                  </p>

                  <div className="featureList devFeatureList">
                    {[
                      "REST API and SDK",
                      "Embeddable chat",
                      "Workflow triggers",
                      "Auth and audit trails",
                    ].map((item) => (
                      <div key={item} className="featureRow devFeatureRow">
                        <Check dark />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="devRoadmap">
                    Developer access on the roadmap
                    <Soon />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="pricing" className="section">
          <div className="container">
            <Reveal>
              <div className="sectionHead">
                <Badge>Pricing</Badge>
                <h2 className="serif sectionTitle">Simple, transparent access.</h2>
              </div>
            </Reveal>

            <div className="pricingGrid">
              <Reveal delay={0.04}>
                <div className="pricingCard">
                  <div className="pricingHead">People</div>
                  <div className="pricingValueWrap">
                    <span className="serif pricingValue">Free</span>
                    <span className="pricingPeriod">during early access</span>
                  </div>
                  <p className="pricingBody">
                    Registration help, provider search, prescription support,
                    and referral guidance.
                  </p>
                  <div className="pricingDivider" />
                  <div className="featureList">
                    {[
                      "GP registration support",
                      "Provider search",
                      "Prescription support",
                      "Referral guidance",
                    ].map((item) => (
                      <div key={item} className="featureRow">
                        <Check />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <a href="#waitlist" className="btnPrimary pricingBtn">
                    Join waitlist
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="pricingCard pricingCardDark">
                  <div className="pricingTag">Best for practices</div>
                  <div className="pricingHead pricingHeadDark">Care Teams</div>
                  <div className="pricingValueWrap">
                    <span className="serif pricingValue pricingValueDark">
                      Starting at £2,500
                    </span>
                    <span className="pricingPeriod pricingPeriodDark">/mo</span>
                  </div>
                  <p className="pricingBody pricingBodyDark">
                    Laura captures the request before reception becomes the
                    bottleneck.
                  </p>
                  <div className="pricingDivider pricingDividerDark" />
                  <div className="featureList">
                    {[
                      "Structured intake",
                      "Urgency dashboard",
                      "Multilingual access",
                      "Request management",
                    ].map((item) => (
                      <div key={item} className="featureRow featureRowDark">
                        <Check dark />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <a href="#waitlist" className="btnPrimary pricingBtn pricingBtnLight">
                    Request demo
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="pricingCard">
                  <div className="pricingTop">
                    <div className="pricingHead">Developer</div>
                    <Soon />
                  </div>
                  <div className="pricingValueWrap">
                    <span className="serif pricingValue">Custom</span>
                  </div>
                  <p className="pricingBody">
                    Add the care access layer to your health product with
                    components, analytics, and onboarding support.
                  </p>
                  <div className="pricingDivider" />
                  <div className="featureList">
                    {[
                      "API and SDK access",
                      "Embeddable components",
                      "Usage analytics",
                      "Technical onboarding",
                    ].map((item) => (
                      <div key={item} className="featureRow">
                        <Check />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <a href="#waitlist" className="btnPrimary pricingBtn">
                    Talk to us
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="waitlist" className="section">
          <div className="container">
            <Reveal>
              <div className="waitlistCard">
                <div className="sectionHead">
                  <Badge>Early access</Badge>
                  <h2 className="serif sectionTitle">Join the waitlist.</h2>
                  <p className="sectionBody">
                    Tell us who you are. We will prioritise access as Laura rolls out.
                  </p>
                </div>

                <form className="waitlistForm" onSubmit={handleSubmit}>
                  <input
                    className="field"
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />

                  <select
                    className="field"
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

                  <button
                    type="submit"
                    className="btnPrimary waitlistBtn"
                    disabled={submitting || !agreed}
                  >
                    {submitting ? "Submitting..." : "Join waitlist"}
                  </button>
                </form>

                <label className="agreeRow">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    required
                    className="agreeCheck"
                  />
                  <span>
                    I agree to the{" "}
                    <Link href="/privacy" className="agreeLink">
                      Privacy Notice
                    </Link>{" "}
                    and{" "}
                    <Link href="/terms" className="agreeLink">
                      Terms
                    </Link>
                    .
                  </span>
                </label>

                {success && <div className="formOk">{success}</div>}
                {error && <div className="formErr">{error}</div>}
              </div>
            </Reveal>
          </div>
        </section>

        <footer className="footer">
          <div className="container footerInner">
            <div className="footerTop">
              <div>
                <Link href="/" className="footerBrand">
                  <div className="navLogo footerLogo">
                    <Image
                      src="/omela-logo-mark.png"
                      alt="Omela"
                      width={26}
                      height={26}
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                  </div>
                  <div>
                    <div className="footerBrandName">Omela</div>
                    <div className="footerBrandSub">POWERED BY LAURA</div>
                  </div>
                </Link>
              </div>

              <div className="footerCols">
                <div className="footerCol">
                  <div className="footerColTitle">Product</div>
                  <Link href="/demo" className="footerLink">
                    Try Laura
                  </Link>
                  <Link href="/how-laura-helps" className="footerLink">
                    Use cases
                  </Link>
                  <Link href="/quiz" className="footerLink">
                    Health Quiz
                  </Link>
                  <Link href="/status" className="footerLink">
                    Status
                  </Link>
                </div>

                <div className="footerCol">
                  <div className="footerColTitle">Legal</div>
                  <Link href="/privacy" className="footerLink">
                    Privacy
                  </Link>
                  <Link href="/terms" className="footerLink">
                    Terms
                  </Link>
                  <a href="mailto:notice@omela.ai" className="footerLink">
                    Contact
                  </a>
                </div>
              </div>
            </div>

            <div className="footerBottom">
              <p>
                © 2026 Omela. Laura is a care navigator, not a medical
                professional. For emergencies, call 999 or 911.
              </p>
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
body{background:${c.bg};color:${c.text};font-family:'DM Sans',-apple-system,sans-serif;-webkit-font-smoothing:antialiased;font-size:16px}
a{color:inherit;text-decoration:none}
button,input,select{font-family:inherit}
::selection{background:${c.accent};color:#fff}

@keyframes blink{0%,50%{opacity:1}50.01%,100%{opacity:0}}
@keyframes shine{0%{transform:translateX(-100%)}100%{transform:translateX(200%)}}
@keyframes typingDot{0%,80%{opacity:.3;transform:scale(.8)}40%{opacity:1;transform:scale(1)}}

.serif{font-family:'Instrument Serif',Georgia,serif}
.wrap{width:100%;overflow-x:clip}
.container{max-width:1160px;margin:0 auto;padding:0 20px}

.section{padding:74px 0}
.sectionTopLess{padding-top:18px}
.darkSection{padding:82px 0;background:
radial-gradient(circle at 18% 18%,rgba(37,99,235,.09),transparent 28%),
linear-gradient(180deg,#090B10,#07080C);color:#fff}
.globeSection{padding:82px 0;background:linear-gradient(180deg,${c.bg},#EFE9DE,${c.bg})}

.badge{display:inline-flex;align-items:center;justify-content:center;padding:8px 14px;border-radius:999px;border:1px solid ${c.border};background:rgba(255,255,255,.78);font-size:12px;font-weight:700;color:${c.sub};backdrop-filter:blur(10px)}

.soon{display:inline-flex;align-items:center;justify-content:center;padding:3px 8px;border-radius:999px;background:linear-gradient(135deg,#FEF3C7,#FDE68A);color:#92400E;font-size:8px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;position:relative;overflow:hidden;flex-shrink:0}
.soonShine{position:absolute;top:0;left:0;width:60%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.48),transparent);animation:shine 2.5s ease-in-out infinite}

.check{width:18px;height:18px;border-radius:999px;background:${c.greenSoft};color:${c.green};display:inline-flex;align-items:center;justify-content:center;font-size:9px;font-weight:800;flex-shrink:0;margin-top:2px}
.checkDark{background:rgba(34,197,94,.12);color:#4ADE80}

.btnPrimary{display:inline-flex;align-items:center;justify-content:center;gap:7px;background:${c.dark};color:#fff;border:none;border-radius:999px;padding:13px 22px;font-size:14px;font-weight:700;cursor:pointer;transition:all .25s;white-space:nowrap}
.btnPrimary:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 10px 28px rgba(0,0,0,.12)}
.btnPrimary:disabled{opacity:.5;cursor:not-allowed;transform:none}
.btnSecondary{display:inline-flex;align-items:center;justify-content:center;gap:7px;background:rgba(255,255,255,.88);color:${c.text};border:1px solid ${c.border};border-radius:999px;padding:13px 22px;font-size:14px;font-weight:700;cursor:pointer;transition:all .25s;white-space:nowrap}
.btnSecondary:hover{background:#fff}

.statusBar{background:${c.greenSoft};border-bottom:1px solid rgba(34,197,94,.12);padding:6px 0}
.statusInner{display:flex;align-items:center;gap:7px}
.statusDot{width:6px;height:6px;border-radius:999px;background:${c.green};display:inline-block;box-shadow:0 0 5px ${c.green}44}
.statusText{font-size:12px;font-weight:700;color:${c.greenDk}}
.statusLink{font-size:11px;font-weight:700;color:${c.accent};text-decoration:underline;text-underline-offset:2px}

.nav{position:sticky;top:0;z-index:100;background:rgba(248,246,241,.9);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid rgba(227,221,210,.5)}
.navRow{display:flex;align-items:center;justify-content:space-between;gap:10px;height:56px}
.navBrand{display:flex;align-items:center;gap:7px;flex-shrink:0}
.navLogo{width:32px;height:32px;border-radius:10px;overflow:hidden;flex-shrink:0;box-shadow:0 2px 8px rgba(0,0,0,.05)}
.navName{font-size:14px;font-weight:800;letter-spacing:-.03em}
.navSub{font-size:8px;font-weight:800;letter-spacing:.1em;color:${c.accent};margin-top:1px}
.navLinks{display:none;align-items:center;gap:22px}
.navLink{font-size:13px;font-weight:600;color:${c.sub}}
.navCta{padding:9px 16px!important;font-size:12px!important;flex-shrink:0}

.heroSection{padding:58px 0 24px;background:
radial-gradient(circle at 15% 16%,rgba(37,99,235,.05),transparent 28%),
radial-gradient(circle at 82% 26%,rgba(201,149,107,.08),transparent 24%)}
.heroGrid{display:grid;grid-template-columns:1fr;gap:30px;align-items:center}
.heroCopy{max-width:580px}
.heroTitle{font-size:clamp(40px,8vw,86px);line-height:.95;letter-spacing:-.055em}
.heroAccent{display:block;color:${c.accent};font-style:italic}
.heroType{min-height:48px}
.typeLine{font-size:clamp(16px,2.8vw,20px);line-height:1.45;color:${c.text};font-weight:600;display:block;margin-top:16px}
.typeCursor{color:${c.accent};animation:blink 1s step-end infinite;font-weight:300}
.heroBody{font-size:clamp(14px,2.2vw,16px);line-height:1.82;color:${c.sub};max-width:520px;margin-top:8px}
.heroButtons{display:flex;flex-direction:column;gap:8px;margin-top:22px}
.heroButtons .btnPrimary,.heroButtons .btnSecondary{width:100%;text-align:center}
.heroProofs{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}
.heroProof{display:inline-flex;align-items:center;justify-content:center;padding:7px 12px;border-radius:999px;border:1px solid ${c.border};background:rgba(255,255,255,.84);font-size:11px;font-weight:700;color:${c.sub}}

.heroVisual{display:flex;justify-content:center;position:relative}

.phoneWrap{width:100%;max-width:262px;position:relative}
.phoneAura{position:absolute;inset:-34px;border-radius:999px;background:radial-gradient(circle,rgba(37,99,235,.07),transparent 70%);z-index:0}
.phoneFrame{position:relative;z-index:1;background:#1A1A1E;border-radius:36px;padding:5px;box-shadow:0 18px 42px rgba(0,0,0,.14)}
.phoneNotch{width:68px;height:18px;border-radius:999px;background:#000;margin:0 auto 3px}
.phoneScreen{background:#FAFAFA;border-radius:31px;overflow:hidden}
.phoneTop{display:flex;align-items:center;gap:6px;padding:7px 8px;background:#fff;border-bottom:1px solid #F0F0F0}
.phoneIdentity{display:flex;align-items:center;gap:7px}
.phoneAvatar{position:relative;width:24px;height:24px;border-radius:999px;overflow:hidden;flex-shrink:0;border:1px solid #fff}
.phoneName{display:flex;align-items:center;gap:3px;font-size:10px;font-weight:700}
.phoneOnline{display:flex;align-items:center;gap:2px;font-size:7px;color:${c.green};font-weight:600}
.phoneOnlineDot{width:3px;height:3px;border-radius:999px;background:${c.green};display:inline-block}
.phoneLang{display:flex;align-items:center;justify-content:center;gap:3px;padding:3px 0;background:#F7F7FB;font-size:8px;font-weight:700;color:${c.accent}}
.phoneBody{display:flex;flex-direction:column;gap:4px;padding:7px 6px;height:280px;overflow:hidden;justify-content:flex-end;background:linear-gradient(180deg,#F5F5F0,#ECE5DA)}
.phoneRow{display:flex}
.phoneRowUser{justify-content:flex-end}
.phoneRowLaura{justify-content:flex-start}
.phoneBubble{max-width:86%;padding:6px 8px;font-size:8.8px;line-height:1.46;word-break:break-word}
.phoneBubbleUser{background:#E7FFDB;color:#111;border-radius:8px 8px 2px 8px}
.phoneBubbleLaura{background:#fff;color:#111;border-radius:8px 8px 8px 2px;box-shadow:0 1px 2px rgba(0,0,0,.03)}
.phoneAction{width:88%;margin:2px auto;padding:6px 8px;background:${c.accentSoft};border:1px solid rgba(37,99,235,.1);border-radius:8px;font-size:8px;font-weight:700;color:${c.accent};text-align:center}
.phoneTyping{display:flex;gap:3px;padding:9px 12px}
.phoneTyping span{width:4px;height:4px;border-radius:999px;background:${c.muted};animation:typingDot 1.2s infinite}
.phoneTyping span:nth-child(2){animation-delay:.2s}
.phoneTyping span:nth-child(3){animation-delay:.4s}
.phoneComposer{padding:4px 4px 7px;display:flex;align-items:center;gap:3px;background:#F0EBE3}
.phoneComposerField{flex:1;height:20px;border-radius:999px;background:#fff;display:flex;align-items:center;padding:0 6px;color:${c.muted};font-size:8px}
.phoneComposerMic{width:20px;height:20px;border-radius:999px;background:#25D366;display:flex;align-items:center;justify-content:center;flex-shrink:0}

.sectionHead{text-align:center;max-width:760px;margin:0 auto}
.sectionHead.narrow{max-width:700px}
.sectionTitle{font-size:clamp(28px,5vw,50px);line-height:1.08;letter-spacing:-.04em;margin-top:14px}
.sectionBody{font-size:clamp(14px,2.5vw,16px);line-height:1.78;margin-top:10px;max-width:560px;margin-left:auto;margin-right:auto;color:${c.sub}}

.problemGrid{display:grid;grid-template-columns:1fr;gap:12px;margin-top:30px}
.problemCard{padding:24px;border:1px solid ${c.border};border-radius:20px;background:rgba(255,255,255,.92);transition:all .25s}
.problemCard:hover{box-shadow:0 10px 28px rgba(0,0,0,.05);transform:translateY(-2px)}
.problemIcon{width:44px;height:44px;border-radius:14px;background:${c.accentSoft};display:flex;align-items:center;justify-content:center}
.problemTitle{font-size:18px;font-weight:800;letter-spacing:-.03em;margin-top:14px}
.problemBody{font-size:14px;line-height:1.76;color:${c.sub};margin-top:6px}

.contrastGrid{display:grid;grid-template-columns:1fr;gap:12px}
.contrastCard{border-radius:22px;padding:26px;border:1px solid ${c.border}}
.contrastMuted{background:rgba(255,255,255,.7)}
.contrastAccent{background:linear-gradient(180deg,#F7FBFF,#EFF5FF)}
.contrastTitle{font-size:17px;font-weight:800;letter-spacing:-.03em}
.contrastList{display:flex;flex-direction:column;gap:10px;margin-top:16px}
.contrastItem{display:flex;align-items:flex-start;gap:8px;font-size:14px;line-height:1.65;color:${c.sub}}
.contrastGood{color:${c.text}}
.contrastX{width:18px;height:18px;border-radius:999px;background:${c.redSoft};color:${c.red};display:inline-flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;flex-shrink:0;margin-top:2px}

.useCaseGrid{display:grid;grid-template-columns:1fr;gap:12px;margin-top:30px}
.useCaseCard{padding:24px;border:1px solid ${c.border};border-radius:20px;background:rgba(255,255,255,.92)}
.useCaseEmoji{font-size:24px;display:block}
.useCaseTitle{font-size:18px;font-weight:800;letter-spacing:-.03em;margin-top:12px}
.useCaseBody{font-size:14px;line-height:1.74;color:${c.sub};margin-top:6px}
.useCaseAction{text-align:center;margin-top:22px}
.useCaseLink{display:inline-flex;align-items:center;gap:6px;font-size:14px;font-weight:700;color:${c.accent}}

.stepsGrid{display:grid;grid-template-columns:1fr;gap:12px;margin-top:28px}
.stepCard{padding:24px;border:1px solid ${c.border};border-radius:20px;background:rgba(255,255,255,.88)}
.stepNum{font-size:12px;font-weight:800;letter-spacing:.12em;color:${c.muted}}
.stepTitle{font-size:18px;font-weight:800;letter-spacing:-.03em;margin-top:10px}
.stepBody{font-size:14px;line-height:1.74;color:${c.sub};margin-top:6px}

.globeWrap{display:grid;grid-template-columns:1fr;gap:24px;align-items:center;margin-top:28px}
.globeVisual{width:100%;max-width:360px;aspect-ratio:1;margin:0 auto}
.globeSvg{width:100%;height:100%}
.globeCard{background:rgba(255,255,255,.84);border:1px solid ${c.border};border-radius:20px;padding:22px}
.globeCountry{display:flex;align-items:center;gap:8px}
.globeFlag{font-size:18px}
.globeCountryName{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.12em;color:${c.muted};background:rgba(255,255,255,.9);padding:4px 10px;border-radius:999px}
.globeQuote{font-size:clamp(18px,3.8vw,28px);line-height:1.34;letter-spacing:-.02em;font-style:italic;margin-top:12px}
.globeLauraNote{display:flex;align-items:flex-start;gap:8px;margin-top:14px;background:#fff;border:1px solid ${c.border};border-radius:14px;padding:12px}
.globeLauraIcon{position:relative;width:22px;height:22px;border-radius:999px;overflow:hidden;flex-shrink:0;border:1px solid #fff}
.globeLauraText{font-size:13px;line-height:1.68;color:${c.sub}}
.globeControls{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:16px}
.globeDots{display:flex;gap:5px}
.globeDot{width:7px;height:7px;border-radius:999px;background:${c.border};border:none;cursor:pointer;transition:all .3s;padding:0}
.globeDotActive{width:20px;background:${c.warm}}
.globeActions{display:flex;gap:6px}
.globeArrow{width:34px;height:34px;border-radius:999px;background:#fff;border:1px solid ${c.border};display:flex;align-items:center;justify-content:center;cursor:pointer;color:${c.sub}}

.audienceGrid{display:grid;grid-template-columns:1fr;gap:12px;margin-top:30px}
.audienceCard{background:rgba(255,255,255,.92);border:1px solid ${c.border};border-radius:20px;padding:24px}
.audienceBadge{display:inline-flex;align-items:center;justify-content:center;min-width:36px;height:36px;padding:0 12px;border-radius:12px;background:${c.accentSoft};color:${c.accent};font-size:16px;font-weight:800;gap:6px}
.audienceBadgeWide{justify-content:flex-start}
.audienceTitle{font-size:18px;font-weight:800;letter-spacing:-.03em;margin-top:12px}
.audienceBody{font-size:14px;line-height:1.74;color:${c.sub};margin-top:6px}
.featureList{display:flex;flex-direction:column;gap:7px;margin-top:14px}
.featureRow{display:flex;align-items:flex-start;gap:7px;font-size:14px;line-height:1.6;color:${c.sub}}
.featureRowDark{color:rgba(255,255,255,.74)}

.darkTitle{color:#fff}
.darkBody{color:rgba(255,255,255,.56)}

.devGrid{display:grid;grid-template-columns:1fr;gap:16px;margin-top:28px}
.terminal{background:#07080B;border:1px solid #1F2330;border-radius:14px;overflow:hidden;box-shadow:0 12px 30px rgba(0,0,0,.16)}
.terminalTop{display:flex;align-items:center;gap:6px;padding:8px 11px;border-bottom:1px solid #1B1F2B;background:#0E1118}
.terminalDots{display:flex;gap:4px}
.terminalDots span{width:7px;height:7px;border-radius:999px;display:inline-block}
.terminalDots span:nth-child(1){background:#FF5F57}
.terminalDots span:nth-child(2){background:#FEBC2E}
.terminalDots span:nth-child(3){background:#28C840}
.terminalTitle{font-size:9px;color:#6B7280;font-weight:700;flex:1}
.terminalBody{padding:10px;height:290px;overflow:hidden}
.terminalLine{white-space:pre-wrap;word-break:break-all;font-size:10px;line-height:1.7;font-family:'SF Mono',ui-monospace,Menlo,Consolas,monospace}
.terminalCursor{color:#60A5FA;animation:blink .8s step-end infinite}

.devCard{background:linear-gradient(180deg,rgba(16,19,24,.98),rgba(13,15,20,.98));border:1px solid ${c.borderDk};border-radius:20px;padding:24px;box-shadow:0 14px 36px rgba(0,0,0,.18)}
.devIcon{width:42px;height:42px;border-radius:12px;background:rgba(74,222,128,.1);display:flex;align-items:center;justify-content:center}
.devTitle{font-size:20px;font-weight:800;color:#fff;margin-top:14px}
.devBody{font-size:14px;line-height:1.78;color:rgba(255,255,255,.56);margin-top:6px}
.devFeatureList{margin-top:14px}
.devFeatureRow{color:rgba(255,255,255,.74)}
.devRoadmap{display:inline-flex;align-items:center;gap:6px;margin-top:14px;padding:8px 11px;border-radius:999px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);color:rgba(255,255,255,.58);font-size:10px;font-weight:700}

.pricingGrid{display:grid;grid-template-columns:1fr;gap:12px;margin-top:30px}
.pricingCard{background:rgba(255,255,255,.92);border:1px solid ${c.border};border-radius:20px;padding:24px;position:relative;display:flex;flex-direction:column}
.pricingCardDark{background:linear-gradient(180deg,#111318,#0D0F14);border-color:${c.borderDk};color:#fff;box-shadow:0 14px 36px rgba(0,0,0,.18)}
.pricingTag{position:absolute;top:12px;right:12px;border-radius:999px;padding:4px 9px;background:rgba(255,255,255,.1);color:rgba(255,255,255,.7);font-size:8px;font-weight:800;text-transform:uppercase;letter-spacing:.08em}
.pricingTop{display:flex;align-items:center;gap:8px}
.pricingHead{font-size:16px;font-weight:800}
.pricingHeadDark{color:#fff}
.pricingValueWrap{display:flex;align-items:baseline;gap:5px;margin-top:12px;flex-wrap:wrap}
.pricingValue{font-size:clamp(32px,6vw,46px);letter-spacing:-.05em}
.pricingValueDark{color:#fff}
.pricingPeriod{font-size:13px;color:${c.muted}}
.pricingPeriodDark{color:rgba(255,255,255,.42)}
.pricingBody{font-size:14px;line-height:1.72;color:${c.sub};margin-top:8px}
.pricingBodyDark{color:rgba(255,255,255,.56)}
.pricingDivider{height:1px;background:${c.border};margin:16px 0 0}
.pricingDividerDark{background:${c.borderDk}}
.pricingBtn{width:100%;margin-top:18px}
.pricingBtnLight{background:#fff;color:${c.dark}}

.waitlistCard{background:rgba(255,255,255,.92);border:1px solid ${c.border};border-radius:20px;padding:24px;max-width:760px;margin:0 auto}
.waitlistForm{display:grid;grid-template-columns:1fr;gap:8px;margin-top:16px;position:relative}
.waitlistBtn{height:48px;width:100%}
.field{width:100%;height:48px;border-radius:12px;border:1px solid ${c.border};background:#fff;padding:0 14px;font-size:14px;color:${c.text};outline:none}
.field:focus{border-color:${c.accent};box-shadow:0 0 0 3px rgba(37,99,235,.05)}
.agreeRow{display:flex;align-items:flex-start;gap:7px;margin-top:10px;color:${c.sub};font-size:11px;line-height:1.65;max-width:480px;margin-left:auto;margin-right:auto}
.agreeCheck{margin-top:1px;width:14px;height:14px;accent-color:${c.accent};flex-shrink:0}
.agreeLink{color:${c.text};font-weight:700;text-decoration:underline;text-underline-offset:2px}
.formOk{margin-top:8px;background:${c.greenSoft};color:${c.greenDk};border-radius:10px;padding:10px;text-align:center;font-size:13px;font-weight:600}
.formErr{margin-top:8px;background:#FFF7F7;color:#B91C1C;border-radius:10px;padding:10px;text-align:center;font-size:13px;font-weight:600}

.modalOverlay{position:fixed;inset:0;z-index:220;background:rgba(9,10,13,.4);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;padding:14px}
.modalBox{width:100%;max-width:380px;background:rgba(255,255,255,.96);border:1px solid ${c.border};border-radius:20px;padding:22px;box-shadow:0 24px 56px rgba(0,0,0,.14)}
.modalTitle{font-size:clamp(20px,4vw,28px);letter-spacing:-.04em}
.modalBody{margin-top:4px;color:${c.sub};font-size:13px;line-height:1.7}
.modalActions{margin-top:14px;display:flex;gap:8px;flex-wrap:wrap}

.footer{background:${c.dark};padding:32px 0 20px;color:#fff}
.footerTop{display:flex;flex-direction:column;gap:20px}
.footerBrand{display:flex;align-items:center;gap:7px;color:#fff}
.footerLogo{width:26px;height:26px}
.footerBrandName{font-size:13px;font-weight:800}
.footerBrandSub{font-size:8px;font-weight:800;letter-spacing:.1em;color:${c.accent};margin-top:1px}
.footerCols{display:flex;gap:32px}
.footerCol{display:flex;flex-direction:column;gap:6px}
.footerColTitle{font-size:10px;font-weight:800;color:rgba(255,255,255,.3);text-transform:uppercase;letter-spacing:.1em;margin-bottom:2px}
.footerLink{font-size:12px;color:rgba(255,255,255,.56);font-weight:500;transition:color .2s}
.footerLink:hover{color:#fff}
.footerBottom{border-top:1px solid rgba(255,255,255,.06);padding-top:14px;margin-top:20px;font-size:10px;color:rgba(255,255,255,.24)}

@media(min-width:640px){
  .container{padding:0 24px}
  .navRow{height:64px}
  .navLinks{display:flex}
  .navCta{padding:10px 18px!important;font-size:13px!important}
  .heroButtons{flex-direction:row}
  .heroButtons .btnPrimary,.heroButtons .btnSecondary{width:auto}
  .problemGrid{grid-template-columns:repeat(2,1fr)}
  .useCaseGrid{grid-template-columns:repeat(3,1fr)}
  .stepsGrid{grid-template-columns:repeat(3,1fr)}
  .contrastGrid{grid-template-columns:repeat(2,1fr)}
  .audienceGrid{grid-template-columns:repeat(3,1fr)}
  .devGrid{grid-template-columns:repeat(2,1fr)}
  .pricingGrid{grid-template-columns:repeat(3,1fr)}
  .waitlistForm{grid-template-columns:1.2fr .8fr auto}
  .waitlistBtn{width:auto}
  .footerTop{flex-direction:row;justify-content:space-between}
  .globeWrap{grid-template-columns:.95fr 1.05fr;gap:34px}
}

@media(min-width:980px){
  .container{padding:0 36px}
  .navRow{height:72px}
  .heroGrid{grid-template-columns:1.05fr .95fr;gap:44px}
  .heroSection{padding:72px 0 34px}
  .problemGrid{grid-template-columns:repeat(4,1fr)}
  .phoneWrap{max-width:284px}
  .phoneBody{height:310px}
  .terminalBody{height:320px}
}
`;