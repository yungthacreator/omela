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
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Building2,
  ChevronLeft,
  ChevronRight,
  Code2,
  FileText,
  Globe2,
  Languages,
  MapPinned,
  MessageSquareMore,
  PhoneCall,
  Users,
} from "lucide-react";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');`;

const c = {
  bg: "#F8F6F1",
  surface: "#FFFFFF",
  dark: "#090B10",
  text: "#111214",
  sub: "#4A4F5C",
  muted: "#8A90A0",
  accent: "#2563EB",
  accentSoft: "#ECF2FF",
  warm: "#C9956B",
  warmSoft: "#FFF5EC",
  green: "#22C55E",
  greenSoft: "#ECFDF3",
  greenText: "#166534",
  border: "#E4DDD2",
};

type Role = "patient" | "provider" | "developer";

type Story = {
  country: string;
  flag: string;
  person: string;
  quote: string;
  response: string;
};

type RoadmapItem = {
  step: string;
  title: string;
  body: string;
};

type PricingCard = {
  name: string;
  price: string;
  subtitle: string;
  description: string;
  features: string[];
  cta: string;
  featured?: boolean;
  soon?: boolean;
  href?: string;
};

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
  const visible = useInView(ref, { once: true, amount: 0.08 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 18 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function PathMark() {
  return (
    <motion.div
      className="pathMark"
      animate={{ y: [0, -1.5, 0] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 32 32" className="pathMarkSvg">
        <motion.path
          d="M6 23C9 23 10.5 19 13 19C15.4 19 16.6 13 20 13C22.8 13 23.6 9 26 9"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0.2, opacity: 0.5 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.8, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.circle
          cx="6"
          cy="23"
          r="2.1"
          fill="currentColor"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
        <motion.circle
          cx="20"
          cy="13"
          r="2.1"
          fill="currentColor"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: 0.3 }}
        />
        <motion.path
          d="M24.7 9H28.3V12.6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ rotate: [0, 4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          style={{ transformOrigin: "26px 11px" }}
        />
      </svg>
    </motion.div>
  );
}

function Tick() {
  return <span className="tick">✓</span>;
}

function PhoneMockup() {
  const cards = [
    {
      badge: "Practice match",
      title: "City Health Centre",
      body: "Relevant practice nearby. Registration request can be prepared for review.",
      tone: "blue",
    },
    {
      badge: "Prepared",
      title: "Callback request prepared",
      body: "Clear reason, short summary, ready to review.",
      tone: "green",
    },
    {
      badge: "Explained",
      title: "Referral letter explained",
      body: "Plain language summary plus what to do next.",
      tone: "warm",
    },
    {
      badge: "Language support",
      title: "Bilingual note ready",
      body: "English and French summary prepared for sharing.",
      tone: "green",
    },
  ] as const;

  return (
    <div className="phoneWrap">
      <motion.div
        className="phoneGlow"
        animate={{ opacity: [0.18, 0.34, 0.18], scale: [1, 1.03, 1] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="phoneFrame">
        <div className="phoneNotch" />
        <div className="phoneScreen">
          <div className="phoneHead">
            <div className="phoneAvatar">
              <Image
                src="/laura-avatar.png"
                alt="Laura"
                fill
                sizes="30px"
                style={{ objectFit: "cover" }}
              />
            </div>

            <div>
              <div className="phoneName">Laura</div>
              <div className="phoneSub">Care navigation by Omela</div>
            </div>
          </div>

          <motion.div
            className="phoneIntro"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Need help getting through care access in Manchester.
          </motion.div>

          <div className="phoneCards">
            {cards.map((card, index) => (
              <motion.div
                key={card.title}
                className={`phoneCard phoneCard--${card.tone}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: 0.08 * index,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="phoneBadge">{card.badge}</div>
                <h4>{card.title}</h4>
                <p>{card.body}</p>
              </motion.div>
            ))}
          </div>

          <div className="phoneFoot">For the messy part of healthcare access</div>
        </div>
      </div>
    </div>
  );
}

function AnimatedCapabilityIcon({
  children,
  tone = "blue",
}: {
  children: ReactNode;
  tone?: "blue" | "warm" | "green";
}) {
  return (
    <motion.div
      className={`capIcon capIcon--${tone}`}
      animate={{ y: [0, -4, 0], rotate: [0, 1.5, 0] }}
      transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

function GlobeStories() {
  const stories: Story[] = useMemo(
    () => [
      {
        country: "United Kingdom",
        flag: "🇬🇧",
        person: "Sarah, Leeds",
        quote:
          "I moved and had no idea where to register. Every practice page said something slightly different.",
        response:
          "Laura helps narrow the practice search, prepares a cleaner request, and makes the next step easier to understand.",
      },
      {
        country: "France",
        flag: "🇫🇷",
        person: "Camille, Lyon",
        quote:
          "I could explain the pain in French, but not well enough in English when I travelled.",
        response:
          "Laura can help capture symptoms in the language you start with and prepare a bilingual note for sharing.",
      },
      {
        country: "Nigeria",
        flag: "🇳🇬",
        person: "Amina, Lagos",
        quote:
          "Finding the right route was harder than explaining the actual problem.",
        response:
          "Laura helps turn uncertainty into a clearer route, a clearer request, and less wasted time.",
      },
      {
        country: "United States",
        flag: "🇺🇸",
        person: "Marcus, Chicago",
        quote:
          "The letter sounded important, but I still did not know what I was supposed to do next.",
        response:
          "Laura explains the paperwork in plain language and helps prepare the next conversation or appointment step.",
      },
      {
        country: "India",
        flag: "🇮🇳",
        person: "Priya, Jaipur",
        quote:
          "The hard part was not just the health issue. It was the admin around it.",
        response:
          "That is exactly where Laura is focused: the practical, stressful, painfully administrative part of care access.",
      },
    ],
    []
  );

  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % stories.length);
    }, 5200);

    return () => window.clearInterval(id);
  }, [stories.length]);

  return (
    <section className="section sectionTinted">
      <div className="container">
        <Reveal>
          <div className="sectionHead">
            <span className="eyebrow">Real-world use and global relevance</span>
            <h2 className="serif sectionTitle">
              The problem is global.
              <br />
              The relief is human.
            </h2>
            <p className="sectionBody sectionBodyWide">
              Omela becomes more believable once people see the problem is global,
              human, and painfully administrative.
            </p>
          </div>
        </Reveal>

        <div className="globeGrid">
          <Reveal className="globeVisualWrap">
            <div className="globeVisual">
              <div className="globeCore" />
              <div className="globePulse globePulseA" />
              <div className="globePulse globePulseB" />
              {Array.from({ length: 80 }).map((_, index) => (
                <span
                  key={index}
                  className="globeDot"
                  style={{
                    left: `${10 + ((index * 11) % 80)}%`,
                    top: `${12 + ((index * 7) % 74)}%`,
                  }}
                />
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="storyCard">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28 }}
                >
                  <div className="storyTop">
                    <span className="storyFlag">{stories[active].flag}</span>
                    <span className="storyCountry">{stories[active].country}</span>
                  </div>

                  <p className="serif storyQuote">“{stories[active].quote}”</p>
                  <p className="storyPerson">{stories[active].person}</p>

                  <div className="storyResponse">
                    <div className="storyAvatar">
                      <Image
                        src="/laura-avatar.png"
                        alt="Laura"
                        fill
                        sizes="22px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <p>{stories[active].response}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="storyNav">
                <div className="storyDots">
                  {stories.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`storyDot${index === active ? " storyDotActive" : ""}`}
                      onClick={() => setActive(index)}
                    />
                  ))}
                </div>

                <div className="storyArrows">
                  <button
                    type="button"
                    className="storyArrow"
                    onClick={() =>
                      setActive((prev) => (prev - 1 + stories.length) % stories.length)
                    }
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    className="storyArrow"
                    onClick={() => setActive((prev) => (prev + 1) % stories.length)}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function RoadmapSection() {
  const items: RoadmapItem[] = [
    {
      step: "01",
      title: "Practice routing support",
      body: "Deeper pathways for helping people prepare and move common access requests forward.",
    },
    {
      step: "02",
      title: "Care-team workspace",
      body: "A calmer interface for teams reviewing prepared context, notes, and inbound requests.",
    },
    {
      step: "03",
      title: "WhatsApp access",
      body: "Familiar messaging entry points for people who do not want another app to learn.",
    },
    {
      step: "04",
      title: "Broader language coverage",
      body: "More bilingual note support so people can explain themselves more clearly across languages.",
    },
    {
      step: "05",
      title: "Telehealth pathways",
      body: "Carefully integrated telehealth handoffs for cases where remote access becomes the practical next step.",
    },
    {
      step: "06",
      title: "Developer SDK",
      body: "A structured way for partners to embed Laura inside health products and patient flows.",
    },
  ];

  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function scrollToIndex(index: number) {
    const track = trackRef.current;
    if (!track) return;

    const card = track.children[index] as HTMLElement | undefined;
    if (!card) return;

    track.scrollTo({
      left: card.offsetLeft - 8,
      behavior: "smooth",
    });

    setActive(index);
  }

  function next() {
    const nextIndex = Math.min(active + 1, items.length - 1);
    scrollToIndex(nextIndex);
  }

  function prev() {
    const prevIndex = Math.max(active - 1, 0);
    scrollToIndex(prevIndex);
  }

  function onScroll() {
    const track = trackRef.current;
    if (!track) return;

    const children = Array.from(track.children) as HTMLElement[];
    const midpoint = track.scrollLeft + track.clientWidth / 2;

    let nearest = 0;
    let smallest = Number.POSITIVE_INFINITY;

    children.forEach((child, index) => {
      const center = child.offsetLeft + child.clientWidth / 2;
      const distance = Math.abs(center - midpoint);
      if (distance < smallest) {
        smallest = distance;
        nearest = index;
      }
    });

    setActive(nearest);
  }

  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="sectionHead">
            <span className="eyebrow">Where Laura is going</span>
            <h2 className="serif sectionTitle">
              Start with care navigation first.
              <br />
              Grow carefully from there.
            </h2>
            <p className="sectionBody sectionBodyWide">
              Start with care navigation first. Grow carefully into a broader platform after
              the core pain is already solved.
            </p>
          </div>
        </Reveal>

        <div className="roadmapTop">
          <p className="roadmapHint">Swipe to explore what comes next</p>

          <div className="roadmapButtons">
            <button type="button" className="roadmapArrow" onClick={prev}>
              <ChevronLeft size={17} />
            </button>
            <button type="button" className="roadmapArrow" onClick={next}>
              <ChevronRight size={17} />
            </button>
          </div>
        </div>

        <div ref={trackRef} className="roadmapTrack" onScroll={onScroll}>
          {items.map((item, index) => (
            <Reveal key={item.step} delay={index * 0.05} className="roadmapCardWrap">
              <article className="roadmapCard">
                <span className="roadmapStep">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="roadmapDots">
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`roadmapDot${index === active ? " roadmapDotActive" : ""}`}
              onClick={() => scrollToIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function InfrastructureSection() {
  const logos = ["vercel", "stripe", "openai", "twilio"] as const;
  const repeated = [...logos, ...logos];

  return (
    <section className="section sectionInfrastructure">
      <div className="container">
        <Reveal>
          <div className="sectionHead">
            <span className="eyebrow">Trusted infrastructure</span>
            <h2 className="serif sectionTitle">
              Infrastructure
              <br />
              supports trust.
            </h2>
            <p className="sectionBody">
              Built on infrastructure teams already know.
            </p>
          </div>
        </Reveal>

        <div className="logoMarquee">
          <div className="logoFade logoFadeLeft" />
          <div className="logoFade logoFadeRight" />
          <div className="logoTrack">
            {repeated.map((logo, index) => (
              <div key={`${logo}-${index}`} className="logoItem">
                {logo === "vercel" && (
                  <svg
                    viewBox="0 0 140 34"
                    className="infraSvg"
                    role="img"
                    aria-label="Vercel"
                  >
                    <path d="M18 6L30 28H6L18 6Z" fill="currentColor" />
                    <text
                      x="42"
                      y="23"
                      fontSize="16"
                      fontWeight="700"
                      fontFamily="DM Sans, sans-serif"
                    >
                      Vercel
                    </text>
                  </svg>
                )}

                {logo === "stripe" && (
                  <svg
                    viewBox="0 0 120 34"
                    className="infraSvg"
                    role="img"
                    aria-label="Stripe"
                  >
                    <text
                      x="0"
                      y="24"
                      fontSize="18"
                      fontWeight="800"
                      fontFamily="DM Sans, sans-serif"
                    >
                      stripe
                    </text>
                  </svg>
                )}

                {logo === "openai" && (
                  <div className="openAiWrap" aria-label="OpenAI" role="img">
                    <img
                      src="/logos/openai-wordmark.svg"
                      alt="OpenAI"
                      className="openAiLogo"
                    />
                  </div>
                )}

                {logo === "twilio" && (
                  <svg
                    viewBox="0 0 132 34"
                    className="infraSvg"
                    role="img"
                    aria-label="Twilio"
                  >
                    <g transform="translate(2 7)" fill="none" stroke="currentColor" strokeWidth="1.9">
                      <circle cx="11" cy="10" r="9" />
                      <circle cx="8" cy="7" r="1.5" fill="currentColor" />
                      <circle cx="14" cy="7" r="1.5" fill="currentColor" />
                      <circle cx="8" cy="13" r="1.5" fill="currentColor" />
                      <circle cx="14" cy="13" r="1.5" fill="currentColor" />
                    </g>
                    <text
                      x="32"
                      y="24"
                      fontSize="16"
                      fontWeight="700"
                      fontFamily="DM Sans, sans-serif"
                    >
                      twilio
                    </text>
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
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
  const [refParam, setRefParam] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) setRefParam(ref);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!agreed || submitting) return;

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
        setError(data.error || "Something went wrong.");
        return;
      }

      setSuccess(data.message || "You are on the list.");
      setEmail("");
      setRole("patient");
      setWebsite("");
      setAgreed(false);
    } catch {
      setError("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  const proofCards = [
    {
      generic: "Generic AI can explain a referral letter",
      laura: "Laura explains it and helps you prepare the next step.",
    },
    {
      generic: "Generic AI can answer where to go",
      laura: "Laura helps you find a relevant practice and prepare the request.",
    },
    {
      generic: "Generic AI can translate text",
      laura: "Laura turns symptoms into a structured bilingual note ready to share.",
    },
  ];

  const capabilities = [
    {
      title: "Find the right place to go",
      body: "Laura helps narrow the route so people spend less time guessing where to start.",
      icon: <MapPinned size={24} />,
      tone: "blue" as const,
    },
    {
      title: "Prepare what to say next",
      body: "Laura turns stress into a clearer callback request, registration note, or refill message.",
      icon: <FileText size={24} />,
      tone: "warm" as const,
    },
    {
      title: "Understand what is happening",
      body: "Laura translates letters, admin language, and care paperwork into plain language people can act on.",
      icon: <Languages size={24} />,
      tone: "green" as const,
    },
  ];

  const audience = [
    {
      title: "People",
      icon: <Users size={22} />,
      body: "For people trying to get through healthcare access with less stress, less guesswork, and less time lost.",
    },
    {
      title: "Care teams",
      icon: <Building2 size={22} />,
      body: "For organisations that want better prepared context, calmer intake, and smoother access workflows.",
    },
    {
      title: "Developers",
      icon: <Code2 size={22} />,
      body: "For teams building health products that need structured care-navigation flows inside their own experience.",
    },
  ];

  const pricingCards: PricingCard[] = [
    {
      name: "People",
      price: "20 free credits",
      subtitle: "then £4.99 / 100 credits",
      description: "For individuals trying to get through healthcare access with less stress.",
      features: [
        "Practice search support",
        "Prepared requests",
        "Plain language letter help",
        "Structured bilingual notes",
        "Reminder support",
        "Appointment prep guidance",
        "Saved history and follow-up context",
      ],
      cta: "Join waitlist",
      href: "#waitlist",
    },
    {
      name: "Care teams",
      price: "From £2,500",
      subtitle: "/month",
      description: "For practices and organisations that want clearer inbound context and smoother access workflows.",
      features: [
        "Structured intake support",
        "Prepared patient context",
        "Multilingual access support",
        "Operational visibility",
        "Callback workflow support",
        "Letter simplification for patients",
        "Onboarding and rollout support",
      ],
      cta: "Request demo",
      featured: true,
      href: "/demo",
    },
    {
      name: "Developer",
      price: "Custom",
      subtitle: "usage based",
      description: "For teams planning to build Laura into existing products, portals, and operations.",
      features: [
        "Planned API access",
        "Sandbox environment",
        "Partner onboarding",
        "Priority support",
        "Structured outputs",
        "Embeddable care-navigation flows",
        "Auth and audit tooling roadmap",
      ],
      cta: "Talk to us",
      soon: true,
      href: "#waitlist",
    },
  ];

  return (
    <>
      <style>{FONT}</style>
      <style>{CSS}</style>

      <div className="page">
        <nav className="nav">
          <div className="container navInner">
            <Link href="/" className="brand">
              <div className="brandMark">
                <Image
                  src="/omela-logo-mark.png"
                  alt="Omela"
                  width={36}
                  height={36}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>
              <span className="brandName">Omela</span>
            </Link>

            <div className="navLinks">
              <a href="#how-laura-helps" className="navLink">
                How Laura helps
              </a>
              <Link href="/demo" className="navLink">
                Demo
              </Link>
              <a href="#pricing" className="navLink">
                Pricing
              </a>
            </div>

            <a href="#waitlist" className="buttonPrimary navButton">
              Join waitlist
              <ArrowRight size={14} />
            </a>
          </div>
        </nav>

        <section className="hero">
          <div className="container heroGrid">
            <div className="heroCopy">
              <Reveal>
                <span className="eyebrow">Care navigation</span>
              </Reveal>

              <Reveal delay={0.04}>
                <h1 className="serif heroTitle">
                  Getting care
                  <br />
                  should not be
                  <br />
                  this hard.
                </h1>
              </Reveal>

              <Reveal delay={0.08}>
                <p className="heroBody">
                  Laura helps people find the right practice, prepare requests, understand
                  letters, and move care access forward.
                </p>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="heroPill">
                  <PathMark />
                  <span>Not just answers. A way forward.</span>
                </div>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="heroButtons">
                  <Link href="/demo" className="buttonPrimary">
                    See Laura in action
                    <ArrowRight size={15} />
                  </Link>

                  <a href="#waitlist" className="buttonSecondary">
                    Join waitlist
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="heroVisual">
              <PhoneMockup />
            </Reveal>
          </div>
        </section>

        <section className="section" id="how-laura-helps">
          <div className="container">
            <Reveal>
              <div className="sectionHead">
                <span className="eyebrow">Immediate proof</span>
                <h2 className="serif sectionTitle">Not just answers. A way forward.</h2>
                <p className="sectionBody">
                  The difference is not that Laura talks. The difference is that Laura helps
                  people move.
                </p>
              </div>
            </Reveal>

            <div className="proofGrid">
              {proofCards.map((card, index) => (
                <Reveal key={card.generic} delay={index * 0.06}>
                  <article className="proofCard">
                    <span className="proofLabel">Generic AI</span>
                    <p className="proofGeneric">{card.generic}</p>

                    <div className="proofDivider" />

                    <span className="proofLabel proofLabelAccent">Laura</span>
                    <p className="proofLaura">{card.laura}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section sectionSoft">
          <div className="container">
            <Reveal>
              <div className="sectionHead">
                <span className="eyebrow">What Laura actually does</span>
                <h2 className="serif sectionTitle">
                  Outcome first.
                  <br />
                  Clarity first.
                </h2>
                <p className="sectionBody">
                  Laura is for the messy part of healthcare access, not generic conversation.
                </p>
              </div>
            </Reveal>

            <div className="capabilityGrid">
              {capabilities.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.07}>
                  <article className="capabilityCard">
                    <AnimatedCapabilityIcon tone={item.tone}>
                      {item.icon}
                    </AnimatedCapabilityIcon>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <Reveal>
              <div className="sectionHead">
                <span className="eyebrow">Emotional before and after</span>
                <h2 className="serif sectionTitle">
                  Less chasing.
                  <br />
                  Less guessing.
                </h2>
              </div>
            </Reveal>

            <div className="compareGrid">
              <Reveal delay={0.02}>
                <div className="compareCard compareCardBefore">
                  <h3>Without Laura</h3>
                  {[
                    "You keep refreshing different practice pages and still do not know the right route.",
                    "You repeat the same story each time you try to get through.",
                    "You receive a letter that sounds important but does not feel understandable.",
                    "You try to translate symptoms live while already stressed.",
                    "You lose time to admin before you even reach care.",
                  ].map((item) => (
                    <div key={item} className="compareItem">
                      <span className="compareX">✕</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="compareCard compareCardAfter">
                  <h3>With Laura</h3>
                  {[
                    "Laura narrows the route and helps people start in a more relevant place.",
                    "Laura prepares a cleaner request so the next step feels clearer.",
                    "Laura explains letters and admin language in plain language.",
                    "Laura helps prepare structured bilingual notes for sharing.",
                    "Laura reduces the stress around access so people can focus on care.",
                  ].map((item) => (
                    <div key={item} className="compareItem">
                      <Tick />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <GlobeStories />

        <section className="section">
          <div className="container">
            <Reveal>
              <div className="sectionHead">
                <span className="eyebrow">Who Laura is for</span>
                <h2 className="serif sectionTitle">
                  Built for people first.
                  <br />
                  Useful for systems too.
                </h2>
              </div>
            </Reveal>

            <div className="audienceGrid">
              {audience.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.06}>
                  <article className="audienceCard">
                    <div className="audienceIcon">{item.icon}</div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <RoadmapSection />

        <section className="section sectionDark">
          <div className="container buildGrid">
            <Reveal>
              <div className="buildCopy">
                <span className="eyebrow eyebrowOnDark">Build with Laura</span>
                <h2 className="serif buildTitle">A careful product now. A broader platform later.</h2>
                <p className="buildBody">
                  For care teams and developers, Laura is being designed as structured
                  care-navigation infrastructure, not just a front-end assistant.
                </p>

                <div className="buildList">
                  {[
                    "Structured care-navigation outputs",
                    "Prepared request objects and summaries",
                    "Multilingual note generation",
                    "Partner-ready pathways for future embed and API access",
                  ].map((item) => (
                    <div key={item} className="buildItem">
                      <Tick />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="sdkCard">
                <div className="sdkTop">
                  <span className="sdkDot" />
                  <span className="sdkDot" />
                  <span className="sdkDot" />
                  <span className="sdkLabel">Laura SDK preview</span>
                </div>

                <pre className="sdkPre">
{`const session = await laura.navigate({
  concern: "repeat prescription",
  locale: "en-GB",
  output: "structured"
});

session.nextStep
session.preparedRequest
session.shareableNote`}
                </pre>
              </div>
            </Reveal>
          </div>
        </section>

        <InfrastructureSection />

        <section className="section" id="pricing">
          <div className="container">
            <Reveal>
              <div className="sectionHead">
                <span className="eyebrow">Pricing</span>
                <h2 className="serif sectionTitle">
                  Clear plans for people,
                  <br />
                  care teams, and partners.
                </h2>
                <p className="sectionBody">
                  Start simply as an individual. Go deeper for care teams. Build with us as
                  a partner over time.
                </p>
              </div>
            </Reveal>

            <div className="pricingGrid">
              {pricingCards.map((card, index) => (
                <Reveal key={card.name} delay={index * 0.05}>
                  <article className={`priceCard${card.featured ? " priceCardFeatured" : ""}`}>
                    <div className="priceHead">
                      <div className="priceTitleRow">
                        <h3>{card.name}</h3>
                        {card.featured ? <span className="priceBadge">Best for teams</span> : null}
                        {card.soon ? <span className="priceBadge priceBadgeBlue">Coming soon</span> : null}
                      </div>

                      <div className="priceAmount serif">{card.price}</div>
                      <div className="priceSubtitle">{card.subtitle}</div>
                      <p className="priceDescription">{card.description}</p>
                    </div>

                    <div className="priceDivider" />

                    <div className="priceFeatures">
                      {card.features.map((feature) => (
                        <div key={feature} className="priceFeature">
                          <Tick />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <a
                      href={card.href || "#waitlist"}
                      className={`priceButton${card.featured ? " priceButtonLight" : ""}`}
                    >
                      {card.cta}
                    </a>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section waitlistSection" id="waitlist">
          <div className="container">
            <Reveal>
              <div className="waitlistCard">
                <span className="eyebrow">Waitlist</span>
                <h2 className="serif waitlistTitle">Join the waitlist.</h2>
                <p className="waitlistBody">
                  Get early access to Laura, product updates, and launch invites as Omela
                  opens new pathways.
                </p>

                <form className="waitlistForm" onSubmit={handleSubmit}>
                  <input
                    type="email"
                    className="input"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />

                  <select
                    className="input"
                    value={role}
                    onChange={(e) => setRole(e.target.value as Role)}
                  >
                    <option value="patient">I need care access</option>
                    <option value="provider">I run a care team</option>
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
                    className="buttonPrimary waitlistButton"
                    disabled={!agreed || submitting}
                  >
                    {submitting ? "Submitting..." : "Join waitlist"}
                  </button>
                </form>

                <label className="agreeRow">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="agreeCheck"
                    required
                  />
                  <span>
                    I agree to the{" "}
                    <Link href="/privacy" className="inlineLink">
                      Privacy Notice
                    </Link>{" "}
                    and{" "}
                    <Link href="/terms" className="inlineLink">
                      Terms
                    </Link>
                    .
                  </span>
                </label>

                {success ? <div className="formOk">{success}</div> : null}
                {error ? <div className="formError">{error}</div> : null}
              </div>
            </Reveal>
          </div>
        </section>

        <footer className="footer">
          <div className="container footerInner">
            <div className="footerBrand">
              <div className="footerMark">
                <Image
                  src="/omela-logo-mark.png"
                  alt="Omela"
                  width={28}
                  height={28}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>
              <span>Omela</span>
            </div>

            <div className="footerLinks">
              <Link href="/how-laura-helps" className="footerLink">
                How Laura helps
              </Link>
              <Link href="/demo" className="footerLink">
                Demo
              </Link>
              <Link href="/status" className="footerLink">
                Status
              </Link>
              <Link href="/privacy" className="footerLink">
                Privacy
              </Link>
              <Link href="/terms" className="footerLink">
                Terms
              </Link>
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
  font-family:'DM Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
  -webkit-font-smoothing:antialiased;
  font-size:16px;
}
a{color:inherit;text-decoration:none}
button,input,select{font-family:inherit}
::selection{background:${c.accent};color:#fff}

@keyframes marqueeMove{
  from{transform:translateX(0)}
  to{transform:translateX(-50%)}
}

.serif{font-family:'Instrument Serif',Georgia,serif}
.page{width:100%;overflow-x:clip}
.container{max-width:1240px;margin:0 auto;padding:0 20px}

.eyebrow{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  font-size:12px;
  font-weight:800;
  letter-spacing:0.14em;
  text-transform:uppercase;
  color:#8591A8;
}
.eyebrowOnDark{color:rgba(255,255,255,0.48)}

.section{
  padding:92px 0;
}
.sectionSoft{
  background:linear-gradient(180deg,rgba(255,255,255,0.38),rgba(255,255,255,0.12));
}
.sectionTinted{
  background:linear-gradient(180deg,#FBF8F3,#F5EFE5,#FBF8F3);
}
.sectionInfrastructure{
  border-top:1px solid rgba(228,221,210,0.85);
  border-bottom:1px solid rgba(228,221,210,0.85);
}
.sectionDark{
  background:${c.dark};
  color:#fff;
}
.sectionHead{
  max-width:900px;
  margin:0 auto;
  text-align:center;
}
.sectionTitle{
  margin-top:14px;
  font-size:clamp(34px,6vw,78px);
  line-height:0.98;
  letter-spacing:-0.055em;
}
.sectionBody{
  margin-top:16px;
  font-size:clamp(16px,2.2vw,18px);
  line-height:1.72;
  color:${c.sub};
}
.sectionBodyWide{
  max-width:760px;
  margin-left:auto;
  margin-right:auto;
}

.buttonPrimary,
.buttonSecondary,
.priceButton{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:8px;
  min-height:58px;
  padding:0 28px;
  border-radius:999px;
  font-size:16px;
  font-weight:700;
  transition:transform .24s ease,box-shadow .24s ease,background .24s ease;
}
.buttonPrimary{
  background:${c.dark};
  color:#fff;
  border:none;
  box-shadow:0 14px 28px rgba(9,11,16,0.14);
}
.buttonPrimary:hover:not(:disabled){
  transform:translateY(-1px);
  box-shadow:0 20px 34px rgba(9,11,16,0.18);
}
.buttonPrimary:disabled{
  opacity:0.45;
  cursor:not-allowed;
}
.buttonSecondary{
  background:rgba(255,255,255,0.86);
  color:${c.text};
  border:1px solid rgba(228,221,210,0.95);
}
.buttonSecondary:hover{
  transform:translateY(-1px);
  box-shadow:0 12px 24px rgba(17,18,20,0.06);
}

.nav{
  position:sticky;
  top:0;
  z-index:100;
  background:rgba(248,246,241,0.88);
  backdrop-filter:blur(18px);
  -webkit-backdrop-filter:blur(18px);
  border-bottom:1px solid rgba(228,221,210,0.72);
}
.navInner{
  min-height:76px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
}
.brand{
  display:flex;
  align-items:center;
  gap:10px;
  flex-shrink:0;
}
.brandMark{
  width:40px;
  height:40px;
  border-radius:12px;
  overflow:hidden;
  flex-shrink:0;
  box-shadow:0 4px 12px rgba(17,18,20,0.06);
}
.brandName{
  font-size:16px;
  font-weight:800;
  letter-spacing:-0.03em;
}
.navLinks{
  display:none;
  align-items:center;
  gap:34px;
}
.navLink{
  font-size:15px;
  font-weight:600;
  color:${c.sub};
}
.navLink:hover{color:${c.text}}
.navButton{
  min-height:50px!important;
  padding:0 24px!important;
  font-size:15px!important;
}

.hero{
  position:relative;
  padding:78px 0 52px;
  overflow:hidden;
}
.hero::before{
  content:"";
  position:absolute;
  inset:0;
  pointer-events:none;
  background:
    radial-gradient(circle at 12% 18%, rgba(37,99,235,0.06), transparent 24%),
    radial-gradient(circle at 84% 16%, rgba(201,149,107,0.10), transparent 22%);
}
.heroGrid{
  position:relative;
  z-index:2;
  display:grid;
  grid-template-columns:1fr;
  gap:42px;
  align-items:center;
}
.heroCopy{
  max-width:640px;
}
.heroTitle{
  margin-top:18px;
  font-size:clamp(58px,12vw,126px);
  line-height:0.92;
  letter-spacing:-0.065em;
}
.heroBody{
  margin-top:22px;
  font-size:clamp(22px,3vw,26px);
  line-height:1.54;
  color:${c.text};
  max-width:700px;
}
.heroPill{
  margin-top:24px;
  display:inline-flex;
  align-items:center;
  gap:10px;
  min-height:56px;
  padding:0 18px 0 14px;
  border-radius:999px;
  background:rgba(255,255,255,0.9);
  border:1px solid rgba(228,221,210,0.95);
  box-shadow:0 12px 24px rgba(17,18,20,0.04);
  font-size:17px;
  font-weight:700;
}
.pathMark{
  width:28px;
  height:28px;
  display:flex;
  align-items:center;
  justify-content:center;
  color:${c.accent};
  flex-shrink:0;
}
.pathMarkSvg{
  width:28px;
  height:28px;
  display:block;
}
.heroButtons{
  margin-top:28px;
  display:flex;
  flex-wrap:wrap;
  gap:14px;
}
.heroVisual{
  display:flex;
  justify-content:center;
}

.phoneWrap{
  position:relative;
  width:min(100%, 460px);
}
.phoneGlow{
  position:absolute;
  inset:-34px;
  border-radius:999px;
  background:radial-gradient(circle, rgba(37,99,235,0.14), rgba(37,99,235,0.03), transparent 72%);
}
.phoneFrame{
  position:relative;
  z-index:2;
  width:100%;
  max-width:390px;
  margin:0 auto;
  background:#0B0D12;
  border-radius:44px;
  padding:10px;
  box-shadow:0 30px 60px rgba(17,18,20,0.18);
}
.phoneNotch{
  width:118px;
  height:26px;
  border-radius:999px;
  background:#000;
  margin:0 auto 6px;
}
.phoneScreen{
  border-radius:34px;
  overflow:hidden;
  background:linear-gradient(180deg,#FAFAFA,#F0ECE6);
  min-height:640px;
  display:flex;
  flex-direction:column;
}
.phoneHead{
  display:flex;
  align-items:center;
  gap:12px;
  padding:18px 18px 16px;
  background:rgba(255,255,255,0.9);
  border-bottom:1px solid rgba(228,221,210,0.8);
}
.phoneAvatar{
  position:relative;
  width:30px;
  height:30px;
  border-radius:999px;
  overflow:hidden;
  flex-shrink:0;
}
.phoneName{
  font-size:16px;
  font-weight:800;
}
.phoneSub{
  margin-top:3px;
  font-size:13px;
  color:${c.accent};
  font-weight:700;
}
.phoneIntro{
  margin:18px;
  padding:16px 18px;
  border-radius:24px;
  background:rgba(255,255,255,0.88);
  border:1px solid rgba(228,221,210,0.8);
  font-size:14px;
  line-height:1.56;
  color:${c.text};
}
.phoneCards{
  display:flex;
  flex-direction:column;
  gap:14px;
  padding:0 18px 22px;
}
.phoneCard{
  padding:16px 16px 14px;
  border-radius:22px;
  background:rgba(255,255,255,0.92);
  border:1px solid rgba(228,221,210,0.85);
}
.phoneCard h4{
  margin-top:10px;
  font-size:15px;
  font-weight:800;
  letter-spacing:-0.02em;
}
.phoneCard p{
  margin-top:7px;
  font-size:13px;
  line-height:1.6;
  color:${c.sub};
}
.phoneBadge{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  min-height:30px;
  padding:0 12px;
  border-radius:999px;
  font-size:11px;
  font-weight:800;
}
.phoneCard--blue .phoneBadge{
  background:${c.accentSoft};
  color:${c.accent};
}
.phoneCard--green .phoneBadge{
  background:${c.greenSoft};
  color:${c.greenText};
}
.phoneCard--warm .phoneBadge{
  background:${c.warmSoft};
  color:${c.warm};
}
.phoneFoot{
  margin-top:auto;
  padding:18px;
  font-size:13px;
  color:#8C94A5;
  font-weight:700;
}

.proofGrid{
  margin-top:34px;
  display:grid;
  grid-template-columns:1fr;
  gap:18px;
}
.proofCard{
  padding:28px 28px 30px;
  border-radius:30px;
  background:rgba(255,255,255,0.92);
  border:1px solid rgba(228,221,210,0.94);
  box-shadow:0 16px 32px rgba(17,18,20,0.04);
}
.proofLabel{
  display:inline-flex;
  font-size:12px;
  font-weight:800;
  letter-spacing:0.14em;
  text-transform:uppercase;
  color:#8792A8;
}
.proofLabelAccent{
  color:${c.accent};
}
.proofGeneric{
  margin-top:18px;
  font-size:18px;
  line-height:1.58;
  color:${c.sub};
}
.proofDivider{
  width:100%;
  height:1px;
  background:rgba(228,221,210,0.88);
  margin:24px 0 18px;
}
.proofLaura{
  font-size:20px;
  line-height:1.6;
  font-weight:800;
  color:${c.text};
}

.capabilityGrid{
  margin-top:34px;
  display:grid;
  grid-template-columns:1fr;
  gap:18px;
}
.capabilityCard{
  padding:34px;
  border-radius:30px;
  background:rgba(255,255,255,0.92);
  border:1px solid rgba(228,221,210,0.94);
}
.capabilityCard h3{
  margin-top:18px;
  font-size:24px;
  line-height:1.2;
  font-weight:800;
  letter-spacing:-0.03em;
}
.capabilityCard p{
  margin-top:14px;
  font-size:16px;
  line-height:1.74;
  color:${c.sub};
}
.capIcon{
  width:66px;
  height:66px;
  border-radius:20px;
  display:flex;
  align-items:center;
  justify-content:center;
}
.capIcon--blue{
  background:${c.accentSoft};
  color:${c.accent};
}
.capIcon--warm{
  background:${c.warmSoft};
  color:${c.warm};
}
.capIcon--green{
  background:${c.greenSoft};
  color:${c.greenText};
}

.compareGrid{
  margin-top:34px;
  display:grid;
  grid-template-columns:1fr;
  gap:18px;
}
.compareCard{
  padding:30px;
  border-radius:30px;
  border:1px solid rgba(228,221,210,0.94);
}
.compareCardBefore{
  background:rgba(255,248,247,0.92);
}
.compareCardAfter{
  background:rgba(240,255,244,0.86);
}
.compareCard h3{
  font-size:24px;
  font-weight:800;
  letter-spacing:-0.03em;
}
.compareItem{
  margin-top:18px;
  display:flex;
  align-items:flex-start;
  gap:12px;
  font-size:16px;
  line-height:1.72;
  color:${c.sub};
}
.compareX{
  color:#D54A4A;
  font-weight:800;
  flex-shrink:0;
  margin-top:1px;
}
.tick{
  width:22px;
  height:22px;
  border-radius:999px;
  background:${c.greenSoft};
  color:${c.greenText};
  display:inline-flex;
  align-items:center;
  justify-content:center;
  font-size:12px;
  font-weight:800;
  flex-shrink:0;
  margin-top:2px;
}

.globeGrid{
  margin-top:36px;
  display:grid;
  grid-template-columns:1fr;
  gap:28px;
  align-items:center;
}
.globeVisualWrap{
  display:flex;
  justify-content:center;
}
.globeVisual{
  position:relative;
  width:min(100%, 420px);
  aspect-ratio:1;
  border-radius:999px;
  background:
    radial-gradient(circle at center, rgba(255,255,255,0.9), rgba(255,255,255,0.45) 48%, transparent 72%);
  border:1px solid rgba(228,221,210,0.74);
  overflow:hidden;
  box-shadow:inset 0 1px 0 rgba(255,255,255,0.7), 0 18px 40px rgba(17,18,20,0.04);
}
.globeCore{
  position:absolute;
  inset:16%;
  border-radius:999px;
  border:1px solid rgba(201,149,107,0.14);
}
.globePulse{
  position:absolute;
  border-radius:999px;
  border:1px dashed rgba(201,149,107,0.22);
}
.globePulseA{
  inset:9%;
  animation:spin 18s linear infinite;
}
.globePulseB{
  inset:24%;
  animation:spin 14s linear infinite reverse;
}
.globeDot{
  position:absolute;
  width:4px;
  height:4px;
  border-radius:999px;
  background:rgba(188,174,150,0.7);
}
@keyframes spin{
  from{transform:rotate(0deg)}
  to{transform:rotate(360deg)}
}

.storyCard{
  padding:32px;
  border-radius:34px;
  background:rgba(255,255,255,0.94);
  border:1px solid rgba(228,221,210,0.92);
  box-shadow:0 18px 38px rgba(17,18,20,0.05);
}
.storyTop{
  display:flex;
  align-items:center;
  gap:10px;
}
.storyFlag{
  font-size:22px;
}
.storyCountry{
  min-height:40px;
  padding:0 16px;
  border-radius:999px;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  background:${c.accentSoft};
  color:${c.accent};
  font-size:14px;
  font-weight:800;
  letter-spacing:0.08em;
  text-transform:uppercase;
}
.storyQuote{
  margin-top:26px;
  font-size:clamp(32px,5vw,58px);
  line-height:1.08;
  letter-spacing:-0.04em;
}
.storyPerson{
  margin-top:16px;
  font-size:18px;
  color:#7C8597;
  font-weight:700;
}
.storyResponse{
  margin-top:24px;
  padding:18px;
  border-radius:24px;
  background:rgba(255,255,255,0.82);
  border:1px solid rgba(228,221,210,0.92);
  display:flex;
  align-items:flex-start;
  gap:12px;
}
.storyAvatar{
  position:relative;
  width:26px;
  height:26px;
  border-radius:999px;
  overflow:hidden;
  flex-shrink:0;
}
.storyResponse p{
  font-size:16px;
  line-height:1.74;
  color:${c.sub};
}
.storyNav{
  margin-top:24px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:16px;
}
.storyDots{
  display:flex;
  gap:8px;
}
.storyDot,
.roadmapDot{
  width:10px;
  height:10px;
  border-radius:999px;
  background:rgba(17,18,20,0.14);
  border:none;
  cursor:pointer;
}
.storyDotActive,
.roadmapDotActive{
  width:30px;
  background:${c.warm};
}
.storyArrows,
.roadmapButtons{
  display:flex;
  gap:10px;
}
.storyArrow,
.roadmapArrow{
  width:44px;
  height:44px;
  border-radius:999px;
  border:1px solid rgba(228,221,210,0.92);
  background:rgba(255,255,255,0.9);
  color:${c.sub};
  display:flex;
  align-items:center;
  justify-content:center;
  cursor:pointer;
}

.audienceGrid{
  margin-top:34px;
  display:grid;
  grid-template-columns:1fr;
  gap:18px;
}
.audienceCard{
  padding:30px;
  border-radius:30px;
  background:rgba(255,255,255,0.92);
  border:1px solid rgba(228,221,210,0.94);
}
.audienceIcon{
  width:58px;
  height:58px;
  border-radius:18px;
  background:rgba(37,99,235,0.06);
  color:${c.accent};
  display:flex;
  align-items:center;
  justify-content:center;
}
.audienceCard h3{
  margin-top:18px;
  font-size:24px;
  font-weight:800;
  letter-spacing:-0.03em;
}
.audienceCard p{
  margin-top:12px;
  font-size:16px;
  line-height:1.74;
  color:${c.sub};
}

.roadmapTop{
  margin-top:30px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:16px;
}
.roadmapHint{
  font-size:16px;
  line-height:1.6;
  color:#8D97AA;
  font-weight:700;
}
.roadmapTrack{
  margin-top:18px;
  display:flex;
  gap:18px;
  overflow-x:auto;
  scroll-snap-type:x mandatory;
  -webkit-overflow-scrolling:touch;
  padding-bottom:8px;
  scrollbar-width:none;
}
.roadmapTrack::-webkit-scrollbar{display:none}
.roadmapCardWrap{
  flex:0 0 auto;
  width:min(72vw, 320px);
  scroll-snap-align:start;
}
.roadmapCard{
  min-height:360px;
  padding:30px;
  border-radius:30px;
  background:rgba(255,255,255,0.92);
  border:1px solid rgba(228,221,210,0.94);
}
.roadmapStep{
  display:inline-flex;
  min-height:38px;
  padding:0 16px;
  border-radius:999px;
  align-items:center;
  justify-content:center;
  background:${c.warmSoft};
  color:${c.warm};
  font-size:14px;
  font-weight:800;
}
.roadmapCard h3{
  margin-top:22px;
  font-size:24px;
  line-height:1.18;
  letter-spacing:-0.03em;
  font-weight:800;
}
.roadmapCard p{
  margin-top:18px;
  font-size:16px;
  line-height:1.72;
  color:${c.sub};
}
.roadmapDots{
  margin-top:18px;
  display:flex;
  gap:8px;
  align-items:center;
}

.buildGrid{
  display:grid;
  grid-template-columns:1fr;
  gap:24px;
  align-items:center;
}
.buildCopy{
  max-width:680px;
}
.buildTitle{
  margin-top:16px;
  font-size:clamp(34px,5vw,64px);
  line-height:1.02;
  letter-spacing:-0.05em;
}
.buildBody{
  margin-top:18px;
  font-size:18px;
  line-height:1.76;
  color:rgba(255,255,255,0.66);
}
.buildList{
  margin-top:24px;
  display:flex;
  flex-direction:column;
  gap:12px;
}
.buildItem{
  display:flex;
  gap:12px;
  align-items:flex-start;
  color:rgba(255,255,255,0.82);
  font-size:16px;
  line-height:1.68;
}
.sdkCard{
  background:linear-gradient(180deg,#0E1118,#0A0D13);
  border:1px solid rgba(255,255,255,0.08);
  border-radius:28px;
  overflow:hidden;
  box-shadow:0 22px 44px rgba(0,0,0,0.28);
}
.sdkTop{
  display:flex;
  align-items:center;
  gap:8px;
  padding:14px 18px;
  border-bottom:1px solid rgba(255,255,255,0.06);
  background:rgba(255,255,255,0.02);
}
.sdkDot{
  width:9px;
  height:9px;
  border-radius:999px;
  background:#FF5F57;
}
.sdkDot:nth-child(2){background:#FEBC2E}
.sdkDot:nth-child(3){background:#28C840}
.sdkLabel{
  margin-left:6px;
  font-size:12px;
  color:rgba(255,255,255,0.42);
  font-weight:700;
}
.sdkPre{
  padding:22px;
  color:#C7D0DD;
  font-size:14px;
  line-height:1.9;
  overflow:auto;
  font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
}

.logoMarquee{
  position:relative;
  margin-top:34px;
  overflow:hidden;
  width:100%;
  padding:10px 0;
}
.logoFade{
  position:absolute;
  top:0;
  bottom:0;
  width:120px;
  z-index:2;
  pointer-events:none;
}
.logoFadeLeft{
  left:0;
  background:linear-gradient(90deg,${c.bg},rgba(248,246,241,0));
}
.logoFadeRight{
  right:0;
  background:linear-gradient(270deg,${c.bg},rgba(248,246,241,0));
}
.logoTrack{
  display:flex;
  width:max-content;
  gap:18px;
  animation:marqueeMove 26s linear infinite;
}
.logoItem{
  flex:0 0 auto;
  min-width:260px;
  min-height:112px;
  padding:0 34px;
  border-radius:28px;
  background:rgba(255,255,255,0.92);
  border:1px solid rgba(228,221,210,0.94);
  display:flex;
  align-items:center;
  justify-content:center;
}
.infraSvg{
  width:auto;
  height:34px;
  display:block;
  color:${c.text};
}
.openAiWrap{
  display:flex;
  align-items:center;
  justify-content:center;
}
.openAiLogo{
  display:block;
  height:42px;
  width:auto;
  max-width:190px;
}

.pricingGrid{
  margin-top:34px;
  display:grid;
  grid-template-columns:1fr;
  gap:18px;
}
.priceCard{
  display:flex;
  flex-direction:column;
  padding:34px;
  border-radius:34px;
  background:rgba(255,255,255,0.94);
  border:1px solid rgba(228,221,210,0.94);
  min-height:100%;
}
.priceCardFeatured{
  background:${c.dark};
  color:#fff;
  border-color:rgba(255,255,255,0.08);
}
.priceHead{
  display:flex;
  flex-direction:column;
}
.priceTitleRow{
  display:flex;
  align-items:center;
  gap:10px;
  flex-wrap:wrap;
}
.priceHead h3{
  font-size:24px;
  font-weight:800;
  letter-spacing:-0.03em;
}
.priceBadge{
  min-height:36px;
  padding:0 14px;
  border-radius:999px;
  background:rgba(255,255,255,0.12);
  color:rgba(255,255,255,0.82);
  display:inline-flex;
  align-items:center;
  justify-content:center;
  font-size:13px;
  font-weight:800;
  letter-spacing:0.08em;
  text-transform:uppercase;
}
.priceBadgeBlue{
  background:${c.accentSoft};
  color:${c.accent};
}
.priceAmount{
  margin-top:20px;
  font-size:clamp(46px,6vw,70px);
  line-height:0.95;
  letter-spacing:-0.055em;
}
.priceSubtitle{
  margin-top:14px;
  font-size:16px;
  color:${c.muted};
}
.priceCardFeatured .priceSubtitle{
  color:rgba(255,255,255,0.56);
}
.priceDescription{
  margin-top:20px;
  font-size:16px;
  line-height:1.72;
  color:${c.sub};
}
.priceCardFeatured .priceDescription{
  color:rgba(255,255,255,0.72);
}
.priceDivider{
  width:100%;
  height:1px;
  background:rgba(228,221,210,0.88);
  margin:28px 0 24px;
}
.priceCardFeatured .priceDivider{
  background:rgba(255,255,255,0.10);
}
.priceFeatures{
  display:flex;
  flex-direction:column;
  gap:14px;
  flex:1;
}
.priceFeature{
  display:flex;
  align-items:flex-start;
  gap:12px;
  font-size:16px;
  line-height:1.7;
  color:${c.sub};
}
.priceCardFeatured .priceFeature{
  color:rgba(255,255,255,0.82);
}
.priceButton{
  margin-top:28px;
  background:${c.dark};
  color:#fff;
}
.priceCardFeatured .priceButton{
  background:#fff;
  color:${c.dark};
}
.priceButtonLight{
  background:#fff!important;
  color:${c.dark}!important;
}

.waitlistSection{
  padding-top:76px;
}
.waitlistCard{
  max-width:1080px;
  margin:0 auto;
  padding:40px 38px;
  border-radius:36px;
  background:rgba(255,255,255,0.94);
  border:1px solid rgba(228,221,210,0.94);
  box-shadow:0 18px 38px rgba(17,18,20,0.04);
  text-align:center;
}
.waitlistTitle{
  margin-top:12px;
  font-size:clamp(40px,6vw,78px);
  line-height:0.98;
  letter-spacing:-0.055em;
}
.waitlistBody{
  margin-top:18px;
  font-size:18px;
  line-height:1.74;
  color:${c.sub};
}
.waitlistForm{
  margin-top:28px;
  display:grid;
  grid-template-columns:1fr;
  gap:14px;
  position:relative;
}
.input{
  width:100%;
  min-height:64px;
  border-radius:22px;
  border:1px solid rgba(228,221,210,0.94);
  background:#fff;
  padding:0 20px;
  font-size:18px;
  color:${c.text};
  outline:none;
  transition:border-color .2s ease,box-shadow .2s ease;
}
.input:focus{
  border-color:${c.accent};
  box-shadow:0 0 0 4px rgba(37,99,235,0.08);
}
.waitlistButton{
  width:100%;
}
.agreeRow{
  margin-top:16px;
  display:flex;
  align-items:flex-start;
  justify-content:center;
  gap:10px;
  font-size:15px;
  line-height:1.7;
  color:${c.sub};
}
.agreeCheck{
  width:18px;
  height:18px;
  margin-top:3px;
  accent-color:${c.accent};
  flex-shrink:0;
}
.inlineLink{
  color:${c.text};
  font-weight:700;
  text-decoration:underline;
  text-underline-offset:2px;
}
.formOk,
.formError{
  margin-top:16px;
  padding:14px 16px;
  border-radius:18px;
  font-size:15px;
  font-weight:700;
}
.formOk{
  background:${c.greenSoft};
  color:${c.greenText};
}
.formError{
  background:#FEF2F2;
  color:#991B1B;
}

.footer{
  margin-top:12px;
  background:${c.dark};
  color:#fff;
  padding:26px 0;
}
.footerInner{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:16px;
  flex-wrap:wrap;
}
.footerBrand{
  display:flex;
  align-items:center;
  gap:10px;
  font-size:16px;
  font-weight:800;
}
.footerMark{
  width:32px;
  height:32px;
  border-radius:10px;
  overflow:hidden;
  background:rgba(255,255,255,0.08);
}
.footerLinks{
  display:flex;
  gap:26px;
  flex-wrap:wrap;
}
.footerLink{
  font-size:14px;
  color:rgba(255,255,255,0.74);
}
.footerLink:hover{
  color:#fff;
}

@media(min-width:760px){
  .navLinks{display:flex}
  .heroGrid{
    grid-template-columns:1.02fr 0.98fr;
    gap:26px;
  }
  .proofGrid{
    grid-template-columns:repeat(3,1fr);
  }
  .capabilityGrid{
    grid-template-columns:repeat(3,1fr);
  }
  .compareGrid{
    grid-template-columns:repeat(2,1fr);
  }
  .globeGrid{
    grid-template-columns:0.9fr 1.1fr;
  }
  .audienceGrid{
    grid-template-columns:repeat(3,1fr);
  }
  .buildGrid{
    grid-template-columns:1.02fr 0.98fr;
  }
  .pricingGrid{
    grid-template-columns:repeat(3,1fr);
  }
  .waitlistForm{
    grid-template-columns:1.2fr 0.86fr auto;
    align-items:center;
  }
  .waitlistButton{
    width:auto;
    min-width:168px;
  }
}

@media(min-width:1080px){
  .roadmapTrack{
    overflow:visible;
    display:grid;
    grid-template-columns:repeat(6, minmax(0,1fr));
  }
  .roadmapCardWrap{
    width:auto;
  }
  .roadmapButtons,
  .roadmapDots,
  .roadmapHint{
    display:none;
  }
}

@media(max-width:1079px){
  .roadmapCard{
    min-height:320px;
  }
}

@media(max-width:759px){
  .container{padding:0 18px}
  .navInner{
    min-height:68px;
  }
  .hero{
    padding:56px 0 40px;
  }
  .heroPill{
    min-height:52px;
    font-size:15px;
  }
  .heroBody{
    font-size:18px;
  }
  .buttonPrimary,
  .buttonSecondary{
    width:100%;
  }
  .phoneFrame{
    max-width:330px;
    border-radius:38px;
  }
  .phoneScreen{
    min-height:560px;
    border-radius:30px;
  }
  .waitlistCard{
    padding:34px 22px;
  }
}

@media(max-width:520px){
  .section{
    padding:76px 0;
  }
  .navLinks{display:none}
  .brandName{
    font-size:15px;
  }
  .navButton{
    min-height:46px!important;
    padding:0 18px!important;
    font-size:14px!important;
  }
  .phoneFrame{
    max-width:300px;
  }
  .phoneScreen{
    min-height:520px;
  }
  .storyQuote{
    font-size:clamp(26px,10vw,40px);
  }
  .logoItem{
    min-width:220px;
    min-height:96px;
  }
  .infraSvg{
    height:30px;
  }
  .openAiLogo{
    height:36px;
  }
}
`;