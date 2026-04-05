"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Check,
  ChevronLeft,
  ChevronRight,
  Code2,
  Copy,
  FileCheck2,
  Globe2,
  Languages,
  MapPinned,
  Share2,
  Sparkles,
  Users,
} from "lucide-react";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');`;

const c = {
  bg: "#F8F6F1",
  surface: "#FFFFFF",
  dark: "#0A0B0F",
  text: "#121317",
  sub: "#4D5360",
  muted: "#858C9B",
  accent: "#2563EB",
  accentSoft: "#ECF2FF",
  warm: "#C9956B",
  warmSoft: "#FFF5EC",
  green: "#22C55E",
  greenSoft: "#ECFDF3",
  border: "#E4DDD2",
  borderDark: "#202431",
};

type Role = "patient" | "provider" | "developer";

type CareStory = {
  country: string;
  code: string;
  name: string;
  quote: string;
  laura: string;
  lat: number;
  lng: number;
};

const differenceCards = [
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

const whatLauraDoes = [
  {
    icon: <MapPinned size={20} />,
    title: "Find the right place to go",
    body: "Laura helps narrow the route so people spend less time guessing where to start.",
    tint: c.accent,
    bg: c.accentSoft,
  },
  {
    icon: <FileCheck2 size={20} />,
    title: "Prepare what to say next",
    body: "Laura turns stress into a clearer callback request, registration note, or refill message.",
    tint: c.warm,
    bg: c.warmSoft,
  },
  {
    icon: <Languages size={20} />,
    title: "Understand what is happening",
    body: "Laura translates letters, admin language, and care paperwork into plain language people can act on.",
    tint: c.green,
    bg: c.greenSoft,
  },
];

const withoutLaura = [
  "You repeat yourself across calls, forms, and tabs.",
  "You get a letter and still do not know what to do next.",
  "You move city, switch practice, or travel and start from zero.",
  "You try to explain everything under pressure.",
];

const withLaura = [
  "You start with a clearer route to the right place.",
  "You review a prepared request before you share anything.",
  "You understand the letter and the next step in plain language.",
  "You share a structured note instead of starting from scratch.",
];

const careStories: CareStory[] = [
  {
    country: "United Kingdom",
    code: "UK",
    name: "Sarah, Leeds",
    quote:
      "I moved and had no idea where to register. Every practice page said something slightly different.",
    laura:
      "Laura helps narrow the practice search, prepares a cleaner request, and makes the next step easier to understand.",
    lat: 53.8,
    lng: -1.5,
  },
  {
    country: "United States",
    code: "US",
    name: "Marcus, Chicago",
    quote:
      "Even when I knew I should reach out, I kept putting it off because the whole process felt heavy.",
    laura:
      "Laura helps organise the next administrative step so people can move forward with more clarity.",
    lat: 41.9,
    lng: -87.6,
  },
  {
    country: "Nigeria",
    code: "NG",
    name: "Amina, Lagos",
    quote:
      "The hardest part was not the health issue itself. It was figuring out where to begin.",
    laura:
      "Laura helps compare relevant options faster and prepares what to ask when access is already stressful.",
    lat: 6.5,
    lng: 3.4,
  },
  {
    country: "India",
    code: "IN",
    name: "Priya, Jaipur",
    quote:
      "When care is far away, every call and every bit of confusion costs more time and energy.",
    laura:
      "Laura helps families prepare a clean summary before they travel or call, so the conversation starts clearer.",
    lat: 26.9,
    lng: 75.8,
  },
  {
    country: "Brazil",
    code: "BR",
    name: "Lucas, London",
    quote:
      "I knew how I felt. I just could not explain it properly in English when it mattered.",
    laura:
      "Laura captures the concern in one language and prepares a bilingual note ready to share.",
    lat: 51.5,
    lng: -0.1,
  },
];

const audienceCards = [
  {
    icon: <Users size={20} />,
    title: "People",
    body: "Less confusion, less repetition, and less time lost trying to get through the system.",
    tint: c.accent,
    bg: c.accentSoft,
  },
  {
    icon: <Building2 size={20} />,
    title: "Care teams",
    body: "Clearer incoming context and better prepared requests before more back and forth begins.",
    tint: c.green,
    bg: c.greenSoft,
  },
  {
    icon: <Code2 size={20} />,
    title: "Developers",
    body: "A future SDK and API for teams building care navigation into apps, portals, and operational tools.",
    tint: c.warm,
    bg: c.warmSoft,
    soon: true,
  },
];

const roadmapItems = [
  {
    title: "Practice routing support",
    desc: "Deeper pathways for helping people prepare and move common access requests forward.",
  },
  {
    title: "Care-team workspace",
    desc: "A calmer interface for teams reviewing prepared context, notes, and inbound requests.",
  },
  {
    title: "WhatsApp access",
    desc: "Familiar messaging entry points for people who do not want another app to learn.",
  },
  {
    title: "Broader language coverage",
    desc: "More bilingual note support so people can explain themselves more clearly across languages.",
  },
  {
    title: "Developer SDK",
    desc: "A structured way for partners to embed Laura inside health products and patient flows.",
  },
];

const pricingPlans = [
  {
    name: "People",
    price: "20 free credits",
    period: "then £4.99 / 100 credits",
    desc: "For individuals trying to get through healthcare access with less stress.",
    features: [
      "Practice search support",
      "Prepared requests",
      "Plain language letter help",
      "Structured bilingual notes",
    ],
    cta: "Join waitlist",
  },
  {
    name: "Care teams",
    price: "From £2,500",
    period: "/month",
    desc: "For practices and organisations that want clearer inbound context and smoother access workflows.",
    features: [
      "Structured intake support",
      "Prepared patient context",
      "Multilingual access support",
      "Operational visibility",
    ],
    cta: "Request demo",
    highlight: true,
    badge: "Best for teams",
  },
  {
    name: "Developer",
    price: "Custom",
    period: "usage based",
    desc: "For teams planning to build Laura into existing products, portals, and operations.",
    features: [
      "Planned API access",
      "Sandbox environment",
      "Partner onboarding",
      "Priority support",
    ],
    cta: "Talk to us",
    soon: true,
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
      className={className}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Soon() {
  return <span className="soon">Coming soon</span>;
}

function Tick({ dark = false }: { dark?: boolean }) {
  return (
    <span className={`tick${dark ? " tickDark" : ""}`}>
      <Check size={12} strokeWidth={2.7} />
    </span>
  );
}

function PhoneDemo() {
  return (
    <div className="phoneWrap">
      <motion.div
        className="phoneGlow phoneGlowA"
        animate={{ opacity: [0.32, 0.55, 0.32], scale: [1, 1.05, 1] }}
        transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="phoneGlow phoneGlowB"
        animate={{ opacity: [0.18, 0.32, 0.18], scale: [1, 1.08, 1] }}
        transition={{ duration: 7.8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="heroChip heroChipOne"
        initial={{ opacity: 0, x: -20, y: 10 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.12 }}
      >
        <MapPinned size={14} />
        Find a practice
      </motion.div>

      <motion.div
        className="heroChip heroChipTwo"
        initial={{ opacity: 0, x: 20, y: -10 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <FileCheck2 size={14} />
        Prepare a request
      </motion.div>

      <motion.div
        className="heroChip heroChipThree"
        initial={{ opacity: 0, x: 16, y: 14 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.28 }}
      >
        <Languages size={14} />
        Share a bilingual note
      </motion.div>

      <motion.div
        className="phoneFrame"
        initial={{ opacity: 0, y: 26, rotateX: 10, rotateY: -8 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 4, rotateY: -5 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="phoneInner">
          <div className="phoneNotch" />

          <div className="phoneTop">
            <div className="phoneAvatar">
              <Image
                src="/laura-avatar.png"
                alt="Laura"
                fill
                sizes="32px"
                style={{ objectFit: "cover" }}
              />
            </div>

            <div>
              <div className="phoneTitle">Laura</div>
              <div className="phoneSub">Care navigation by Omela</div>
            </div>
          </div>

          <div className="phoneBody">
            <div className="phonePrompt">
              Need help getting through care access in Manchester.
            </div>

            <motion.div
              className="phoneCard phoneCardPrimary"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="phoneCardTop">
                <span className="phonePill">Practice match</span>
                <span className="phonePill phonePillSoft">M1 area</span>
              </div>
              <h4>City Health Centre</h4>
              <p>Relevant practice nearby. Registration request can be prepared for review.</p>
            </motion.div>

            <motion.div
              className="phoneCard"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 5.1, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            >
              <div className="phoneRow">
                <Tick />
                <div>
                  <strong>Callback request prepared</strong>
                  <span>Clear reason, short summary, ready to review</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="phoneCard"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut", delay: 0.35 }}
            >
              <div className="phoneRow">
                <Tick />
                <div>
                  <strong>Referral letter explained</strong>
                  <span>Plain language summary plus what to do next</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="phoneCard"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 5.9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <div className="phoneRow">
                <Tick />
                <div>
                  <strong>Bilingual note ready</strong>
                  <span>English and French summary prepared for sharing</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="phoneComposer">
            <span>For the messy part of healthcare access</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

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
  const rotationRef = useRef(0.42);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };

    resize();

    const points: { x: number; y: number; z: number }[] = [];
    const total = 280;
    const golden = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < total; i += 1) {
      const theta = golden * i;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / total);

      points.push({
        x: Math.cos(theta) * Math.sin(phi),
        y: Math.cos(phi),
        z: Math.sin(theta) * Math.sin(phi),
      });
    }

    const cities = careStories.map((story) => latLngToXYZ(story.lat, story.lng));

    const draw = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const cx = w / 2;
      const cy = h / 2;
      const r = Math.min(w, h) * 0.42;
      const rot = rotationRef.current;
      const cosR = Math.cos(rot);
      const sinR = Math.sin(rot);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 1.4);
      glow.addColorStop(0, "rgba(201,149,107,0.12)");
      glow.addColorStop(0.5, "rgba(37,99,235,0.05)");
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(190,180,160,0.28)";
      ctx.lineWidth = 0.9;
      ctx.stroke();

      const sphereFill = ctx.createRadialGradient(cx - r * 0.25, cy - r * 0.25, r * 0.1, cx, cy, r);
      sphereFill.addColorStop(0, "rgba(255,255,255,0.22)");
      sphereFill.addColorStop(1, "rgba(255,255,255,0.04)");
      ctx.fillStyle = sphereFill;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      for (const point of points) {
        const x = point.x * cosR + point.z * sinR;
        const z = -point.x * sinR + point.z * cosR;
        const y = point.y;

        if (z < -0.05) continue;

        const sx = cx + x * r;
        const sy = cy - y * r;
        const alpha = Math.max(0, Math.min(1, (z + 0.3) * 0.65));
        const size = 0.9 + z * 0.9;

        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(176,166,146,${alpha * 0.58})`;
        ctx.fill();
      }

      const projected: { sx: number; sy: number; z: number }[] = [];

      for (let i = 0; i < cities.length; i += 1) {
        const point = cities[i];
        const x = point.x * cosR + point.z * sinR;
        const z = -point.x * sinR + point.z * cosR;
        const y = point.y;
        const sx = cx + x * r;
        const sy = cy - y * r;

        projected.push({ sx, sy, z });

        if (z < 0) continue;

        if (i === active) {
          ctx.beginPath();
          ctx.arc(sx, sy, 8, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(201,149,107,0.18)";
          ctx.fill();

          ctx.beginPath();
          ctx.arc(sx, sy, 14, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(37,99,235,0.08)";
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(sx, sy, i === active ? 4.2 : 2.6, 0, Math.PI * 2);
        ctx.fillStyle = i === active ? c.warm : "rgba(170,160,142,0.72)";
        ctx.fill();
      }

      for (let i = 0; i < projected.length; i += 1) {
        const next = (i + 1) % projected.length;
        const a = projected[i];
        const b = projected[next];

        if (a.z < -0.15 || b.z < -0.15) continue;

        const mx = (a.sx + b.sx) / 2;
        const my = (a.sy + b.sy) / 2 - Math.abs(a.sx - b.sx) * 0.18;

        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.quadraticCurveTo(mx, my, b.sx, b.sy);
        ctx.strokeStyle =
          i === active ? "rgba(201,149,107,0.36)" : "rgba(201,149,107,0.08)";
        ctx.lineWidth = i === active ? 1.25 : 0.55;
        ctx.setLineDash(i === active ? [4, 4] : []);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      rotationRef.current += 0.002;
      frameRef.current = window.requestAnimationFrame(draw);
    };

    frameRef.current = window.requestAnimationFrame(draw);

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(canvas);

    return () => {
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      resizeObserver.disconnect();
    };
  }, [active]);

  return <canvas ref={canvasRef} className="globeCanvas" />;
}

function GlobalSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((prev) => (prev + 1) % careStories.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, []);

  const story = careStories[active];

  return (
    <section className="section sectionWorld">
      <div className="container">
        <Reveal>
          <div className="sectionHead">
            <span className="eyebrow">Global relevance</span>
            <h2 className="sectionTitle">Healthcare access is messy everywhere.</h2>
            <p className="sectionLead">
              Omela becomes more believable once people see the problem is global, human,
              and painfully administrative.
            </p>
          </div>
        </Reveal>

        <div className="worldGrid">
          <Reveal className="worldVisual">
            <CanvasGlobe active={active} />
          </Reveal>

          <Reveal delay={0.06}>
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
                    <span className="storyCode">{story.code}</span>
                    <span className="storyCountry">{story.country}</span>
                  </div>

                  <p className="storyQuote">&ldquo;{story.quote}&rdquo;</p>
                  <p className="storyName">{story.name}</p>

                  <div className="storyLaura">
                    <div className="storyAvatar">
                      <Image
                        src="/laura-avatar.png"
                        alt="Laura"
                        fill
                        sizes="26px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <p>{story.laura}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="storyControls">
                <div className="storyDots">
                  {careStories.map((item, index) => (
                    <button
                      key={item.code}
                      type="button"
                      className={`storyDot${index === active ? " storyDotActive" : ""}`}
                      aria-label={`Show ${item.country}`}
                      onClick={() => setActive(index)}
                    />
                  ))}
                </div>

                <div className="storyArrows">
                  <button
                    type="button"
                    className="storyArrow"
                    aria-label="Previous story"
                    onClick={() =>
                      setActive((prev) => (prev - 1 + careStories.length) % careStories.length)
                    }
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    className="storyArrow"
                    aria-label="Next story"
                    onClick={() => setActive((prev) => (prev + 1) % careStories.length)}
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
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const handleScroll = () => {
      const cards = Array.from(scroller.querySelectorAll<HTMLElement>("[data-road-card]"));
      if (!cards.length) return;

      const left = scroller.getBoundingClientRect().left;
      let closest = 0;
      let distance = Number.POSITIVE_INFINITY;

      cards.forEach((card, index) => {
        const nextDistance = Math.abs(card.getBoundingClientRect().left - left);
        if (nextDistance < distance) {
          distance = nextDistance;
          closest = index;
        }
      });

      setActive(closest);
    };

    handleScroll();

    scroller.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      scroller.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollToCard = (index: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll<HTMLElement>("[data-road-card]"));
    cards[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
    setActive(index);
  };

  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="sectionHead">
            <span className="eyebrow">Roadmap</span>
            <h2 className="sectionTitle">Where Laura is going.</h2>
            <p className="sectionLead">
              Start with care navigation first. Grow carefully into a broader platform after
              the core pain is already solved.
            </p>
          </div>
        </Reveal>

        <div className="roadHeader">
          <p className="roadHint">Swipe to explore what comes next</p>

          <div className="roadActions">
            <button
              type="button"
              className="storyArrow"
              aria-label="Previous roadmap item"
              onClick={() =>
                scrollToCard((active - 1 + roadmapItems.length) % roadmapItems.length)
              }
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              className="storyArrow"
              aria-label="Next roadmap item"
              onClick={() => scrollToCard((active + 1) % roadmapItems.length)}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div ref={scrollerRef} className="roadScroller">
          {roadmapItems.map((item, index) => (
            <motion.article
              key={item.title}
              data-road-card
              className="roadCard"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
            >
              <div className="roadIndex">0{index + 1}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <div className="roadLine" />
            </motion.article>
          ))}
        </div>

        <div className="roadDots">
          {roadmapItems.map((item, index) => (
            <button
              key={item.title}
              type="button"
              className={`roadDot${index === active ? " roadDotActive" : ""}`}
              aria-label={`Go to ${item.title}`}
              onClick={() => scrollToCard(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function InfraLogo({ name }: { name: "vercel" | "stripe" | "openai" | "twilio" }) {
  if (name === "openai") {
    return (
      <div className="infraLogo infraLogoOpenAI" aria-label="OpenAI" role="img">
        <Image
          src="/logos/openai-wordmark.svg"
          alt="OpenAI"
          width={156}
          height={32}
          className="openAiWordmark"
        />
      </div>
    );
  }

  if (name === "vercel") {
    return (
      <svg viewBox="0 0 130 32" className="infraSvg" aria-label="Vercel" role="img">
        <path d="M15.2 5L28.4 27H2L15.2 5Z" fill="currentColor" />
        <text x="41" y="21" fontSize="15" fontWeight="700" fontFamily="DM Sans, sans-serif">
          Vercel
        </text>
      </svg>
    );
  }

  if (name === "stripe") {
    return (
      <svg viewBox="0 0 118 32" className="infraSvg" aria-label="Stripe" role="img">
        <text x="2" y="22" fontSize="18" fontWeight="800" fontFamily="DM Sans, sans-serif">
          stripe
        </text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 128 32" className="infraSvg" aria-label="Twilio" role="img">
      <g transform="translate(4 6)" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="10" cy="10" r="8.5" />
        <circle cx="7" cy="7" r="1.45" fill="currentColor" />
        <circle cx="13" cy="7" r="1.45" fill="currentColor" />
        <circle cx="7" cy="13" r="1.45" fill="currentColor" />
        <circle cx="13" cy="13" r="1.45" fill="currentColor" />
      </g>
      <text x="31" y="21" fontSize="15" fontWeight="700" fontFamily="DM Sans, sans-serif">
        twilio
      </text>
    </svg>
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

  const copyLink = async () => {
    if (!link || !navigator.clipboard?.writeText) return;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const shareLink = async () => {
    if (!link) return;

    if ("share" in navigator && typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: "Join Omela",
          text: "Join the Omela waitlist with my referral link.",
          url: link,
        });
      } catch {
        return;
      }
      return;
    }

    await copyLink();
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="modalOverlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modalCard"
            initial={{ opacity: 0, y: 22, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.99 }}
            transition={{ type: "spring", stiffness: 280, damping: 23 }}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="modalPill">Early access confirmed</span>

            <div className="modalSeal">
              <div className="modalSealInner">
                <Check size={26} />
              </div>
            </div>

            <h3 className="modalTitle serif">You are on the list.</h3>
            <p className="modalBody">
              Laura will open access in measured batches. Invite a few people to move up
              the waitlist.
            </p>

            {referralCode ? (
              <div className="modalReferral">
                <div className="modalReferralTop">
                  <div>
                    <p className="modalEyebrow">Referral link</p>
                    <p className="modalReferralTitle">Share Omela</p>
                  </div>
                  <span className="modalTag">Move up the list</span>
                </div>

                <div className="modalLinkBox">
                  <span className="modalLinkText">
                    {link.replace("https://", "").replace("http://", "")}
                  </span>

                  <button
                    type="button"
                    className="modalIconButton"
                    aria-label="Copy referral link"
                    onClick={copyLink}
                  >
                    {copied ? <Check size={15} /> : <Copy size={15} />}
                  </button>
                </div>

                <div className="modalButtons">
                  <button type="button" className="buttonPrimary" onClick={shareLink}>
                    <Share2 size={14} />
                    Share link
                  </button>

                  <a
                    href="https://x.com/joinomela"
                    target="_blank"
                    rel="noreferrer"
                    className="buttonSecondary"
                  >
                    Follow @joinomela
                  </a>
                </div>
              </div>
            ) : null}

            <button type="button" className="modalClose" onClick={onClose}>
              Close
            </button>
          </motion.div>
        </motion.div>
      ) : null}
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
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) setRefParam(ref);
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

      <div className="pageShell">
        <motion.nav
          className="nav"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="container navInner">
            <Link href="/" className="brand">
              <div className="brandMark">
                <Image
                  src="/omela-logo-mark.png"
                  alt="Omela"
                  width={34}
                  height={34}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>
              <div>
                <div className="brandName">Omela</div>
                <div className="brandSub">LAURA BY OMELA</div>
              </div>
            </Link>

            <div className="navLinks">
              <Link href="/how-laura-helps" className="navLink">
                How Laura helps
              </Link>
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
        </motion.nav>

        <main>
          <section className="hero">
            <div className="container heroGrid">
              <div className="heroCopy">
                <Reveal>
                  <span className="heroEyebrow">Laura by Omela</span>
                </Reveal>

                <Reveal delay={0.04}>
                  <h1 className="heroTitle serif">Getting care should not be this hard.</h1>
                </Reveal>

                <Reveal delay={0.08}>
                  <p className="heroSub">
                    Laura helps people find the right practice, prepare requests,
                    understand letters, and move care access forward.
                  </p>
                </Reveal>

                <Reveal delay={0.12}>
                  <div className="heroPosition">
                    <Sparkles size={15} />
                    <span>Not just answers. A way forward.</span>
                  </div>
                </Reveal>

                <Reveal delay={0.16}>
                  <div className="heroActions">
                    <Link href="/demo" className="buttonPrimary">
                      See Laura in action
                      <ArrowRight size={14} />
                    </Link>

                    <a href="#waitlist" className="buttonSecondary">
                      Join waitlist
                    </a>
                  </div>
                </Reveal>

                <Reveal delay={0.2}>
                  <div className="heroProofRow">
                    <span>Find the right practice</span>
                    <span>Prepare what to say</span>
                    <span>Understand the letter</span>
                  </div>
                </Reveal>
              </div>

              <div className="heroVisual">
                <PhoneDemo />
              </div>
            </div>
          </section>

          <section className="section sectionProof">
            <div className="container">
              <Reveal>
                <div className="sectionHead">
                  <span className="eyebrow">Immediate proof</span>
                  <h2 className="sectionTitle">Not just answers. A way forward.</h2>
                  <p className="sectionLead">
                    This section exists to kill the generic chatbot objection immediately.
                  </p>
                </div>
              </Reveal>

              <div className="proofGrid">
                {differenceCards.map((item, index) => (
                  <Reveal key={item.generic} delay={index * 0.06}>
                    <article className="proofCard">
                      <div className="proofLabel">Generic AI</div>
                      <p className="proofTop">{item.generic}</p>

                      <div className="proofDivider" />

                      <div className="proofLabel proofLabelLaura">Laura</div>
                      <p className="proofBottom">{item.laura}</p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="section" id="how">
            <div className="container">
              <Reveal>
                <div className="sectionHead">
                  <span className="eyebrow">What Laura actually does</span>
                  <h2 className="sectionTitle">Outcome first. Clarity first.</h2>
                  <p className="sectionLead">
                    Laura is for the messy part of healthcare access, not generic conversation.
                  </p>
                </div>
              </Reveal>

              <div className="doesGrid">
                {whatLauraDoes.map((item, index) => (
                  <Reveal key={item.title} delay={index * 0.07}>
                    <article className="doesCard">
                      <div className="iconBadge" style={{ background: item.bg, color: item.tint }}>
                        {item.icon}
                      </div>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="section sectionEmotion">
            <div className="container">
              <Reveal>
                <div className="sectionHead">
                  <span className="eyebrow">Emotional relief</span>
                  <h2 className="sectionTitle">The difference is functional and emotional.</h2>
                </div>
              </Reveal>

              <div className="stateGrid">
                <Reveal>
                  <article className="stateCard stateCardBad">
                    <div className="stateLabel">Without Laura</div>
                    <div className="stateItems">
                      {withoutLaura.map((item) => (
                        <div key={item} className="stateItem">
                          <span className="stateCross">×</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </article>
                </Reveal>

                <Reveal delay={0.06}>
                  <article className="stateCard stateCardGood">
                    <div className="stateLabel">With Laura</div>
                    <div className="stateItems">
                      {withLaura.map((item) => (
                        <div key={item} className="stateItem">
                          <Tick />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </article>
                </Reveal>
              </div>
            </div>
          </section>

          <GlobalSection />

          <section className="section">
            <div className="container">
              <Reveal>
                <div className="sectionHead">
                  <span className="eyebrow">Who Laura is for</span>
                  <h2 className="sectionTitle">Built for people, care teams, and developers.</h2>
                </div>
              </Reveal>

              <div className="audienceGrid">
                {audienceCards.map((item, index) => (
                  <Reveal key={item.title} delay={index * 0.07}>
                    <article className="audienceCard">
                      <div className="iconBadge" style={{ background: item.bg, color: item.tint }}>
                        {item.icon}
                      </div>

                      <div className="audienceTitleRow">
                        <h3>{item.title}</h3>
                        {item.soon ? <Soon /> : null}
                      </div>

                      <p>{item.body}</p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <RoadmapSection />

          <section className="section sectionDark">
            <div className="container">
              <Reveal>
                <div className="sectionHead sectionHeadDark">
                  <span className="eyebrow eyebrowDark">Build with Laura</span>
                  <h2 className="sectionTitle sectionTitleDark">Developer access comes later.</h2>
                  <p className="sectionLead sectionLeadDark">
                    The SDK and API story should support the product, not confuse the homepage.
                  </p>
                </div>
              </Reveal>

              <div className="buildGrid">
                <Reveal>
                  <div className="codeCard">
                    <div className="codeTop">
                      <div className="codeDots">
                        <span />
                        <span />
                        <span />
                      </div>
                      <span className="codeLabel">Planned SDK shape</span>
                      <Soon />
                    </div>

                    <pre className="codeBlock">{`import { Laura } from "@omela/laura-sdk";

const session = await laura.prepare({
  type: "practice_request",
  language: "fr",
  notes: "repeat prescription"
});`}</pre>
                  </div>
                </Reveal>

                <Reveal delay={0.08}>
                  <div className="buildCard">
                    <h3>Lower on the page. Still credible.</h3>
                    <p>
                      Teams will later be able to bring Laura into portals, products, and
                      operational workflows without turning the homepage into a developer site.
                    </p>

                    <div className="buildList">
                      {[
                        "Practice discovery support",
                        "Prepared request flows",
                        "Letter and note parsing",
                        "Multilingual note generation",
                      ].map((item) => (
                        <div key={item} className="buildItem">
                          <Tick dark />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          <section className="section sectionInfra">
            <div className="container">
              <Reveal>
                <div className="sectionHead">
                  <span className="eyebrow">Trusted infrastructure</span>
                  <h2 className="sectionTitle sectionTitleInfra">Infrastructure supports trust.</h2>
                  <p className="sectionLead">
                    These logos stay secondary. The product meaning should never depend on them.
                  </p>
                </div>
              </Reveal>

              <div className="infraGrid">
                <div className="infraItem">
                  <InfraLogo name="vercel" />
                </div>
                <div className="infraItem">
                  <InfraLogo name="stripe" />
                </div>
                <div className="infraItem infraItemOpenAI">
                  <InfraLogo name="openai" />
                </div>
                <div className="infraItem">
                  <InfraLogo name="twilio" />
                </div>
              </div>
            </div>
          </section>

          <section className="section" id="pricing">
            <div className="container">
              <Reveal>
                <div className="sectionHead">
                  <span className="eyebrow">Pricing</span>
                  <h2 className="sectionTitle">Simple once the product is understood.</h2>
                  <p className="sectionLead">
                    Pricing only works once visitors understand the product and why it is different.
                  </p>
                </div>
              </Reveal>

              <div className="pricingGrid">
                {pricingPlans.map((plan, index) => (
                  <Reveal key={plan.name} delay={index * 0.06}>
                    <article className={`pricingCard${plan.highlight ? " pricingCardHighlight" : ""}`}>
                      {plan.badge ? <span className="pricingBadge">{plan.badge}</span> : null}

                      <div className="pricingTopRow">
                        <h3>{plan.name}</h3>
                        {plan.soon ? <Soon /> : null}
                      </div>

                      <div className="pricingAmountWrap">
                        <div className="pricingAmount serif">{plan.price}</div>
                        <div className="pricingPeriod">{plan.period}</div>
                      </div>

                      <p className="pricingDesc">{plan.desc}</p>

                      <div className="pricingFeatures">
                        {plan.features.map((item) => (
                          <div key={item} className="pricingFeature">
                            <Tick dark={plan.highlight} />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      <a href="#waitlist" className={`buttonPrimary pricingButton${plan.highlight ? " pricingButtonLight" : ""}`}>
                        {plan.cta}
                      </a>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="section" id="waitlist">
            <div className="container">
              <Reveal>
                <div className="waitlistCard">
                  <div className="sectionHead">
                    <span className="eyebrow">Waitlist</span>
                    <h2 className="sectionTitle">Join the waitlist.</h2>
                    <p className="sectionLead">
                      Early access opens in measured batches. Keep the form clean and low friction.
                    </p>
                  </div>

                  <form className="waitlistForm" onSubmit={handleSubmit}>
                    <input
                      className="input"
                      type="email"
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
                      className="buttonPrimary waitlistButton"
                      disabled={submitting || !agreed}
                    >
                      {submitting ? "Submitting..." : "Join waitlist"}
                    </button>
                  </form>

                  <label className="policyLabel">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      required
                      className="policyCheckbox"
                    />
                    <span>
                      I agree to the{" "}
                      <Link href="/privacy" className="policyLink">
                        Privacy Notice
                      </Link>{" "}
                      and{" "}
                      <Link href="/terms" className="policyLink">
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
        </main>

        <footer className="footer">
          <div className="container footerInner">
            <div className="footerTop">
              <Link href="/" className="brand brandFooter">
                <div className="brandMark brandMarkFooter">
                  <Image
                    src="/omela-logo-mark.png"
                    alt="Omela"
                    width={30}
                    height={30}
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </div>
                <div>
                  <div className="brandName brandNameFooter">Omela</div>
                  <div className="brandSub">LAURA BY OMELA</div>
                </div>
              </Link>

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

            <p className="footerDisclaimer">
              Laura is a care navigation assistant, not a medical professional. She does
              not provide diagnosis or treatment. For emergencies, call 999 or 911.
            </p>

            <div className="footerBottom">
              <span>&copy; 2026 Omela.</span>
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
}
a{color:inherit;text-decoration:none}
button,input,select{font-family:inherit}
::selection{background:${c.accent};color:#fff}

@keyframes blink{0%,50%{opacity:1}50.01%,100%{opacity:0}}
@keyframes pulseSoft{0%,100%{transform:scale(1);opacity:.36}50%{transform:scale(1.08);opacity:.58}}

.serif{font-family:'Instrument Serif',Georgia,serif}
.pageShell{width:100%;overflow-x:clip}
.container{max-width:1180px;margin:0 auto;padding:0 20px}

.nav{
  position:sticky;
  top:0;
  z-index:120;
  background:rgba(248,246,241,0.82);
  backdrop-filter:blur(18px);
  -webkit-backdrop-filter:blur(18px);
  border-bottom:1px solid rgba(228,221,210,0.72);
}
.navInner{
  min-height:70px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:10px;
}
.brand{
  display:flex;
  align-items:center;
  gap:10px;
  min-width:0;
}
.brandMark{
  width:36px;
  height:36px;
  border-radius:12px;
  overflow:hidden;
  flex-shrink:0;
  box-shadow:0 3px 12px rgba(0,0,0,0.06);
}
.brandName{
  font-size:15px;
  font-weight:800;
  letter-spacing:-0.03em;
}
.brandSub{
  font-size:8.5px;
  line-height:1.2;
  font-weight:800;
  letter-spacing:0.14em;
  color:${c.accent};
  margin-top:2px;
}
.navLinks{
  display:none;
  align-items:center;
  gap:24px;
}
.navLink{
  font-size:13px;
  font-weight:600;
  color:${c.sub};
  transition:color .2s ease;
}
.navLink:hover{color:${c.text}}

.buttonPrimary,
.buttonSecondary{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:8px;
  border-radius:999px;
  padding:14px 22px;
  font-size:14px;
  font-weight:700;
  transition:transform .25s ease,box-shadow .25s ease,background .25s ease,color .25s ease,border-color .25s ease;
  white-space:nowrap;
  cursor:pointer;
}
.buttonPrimary{
  border:none;
  background:${c.dark};
  color:#fff;
  box-shadow:0 10px 24px rgba(10,11,15,0.12);
}
.buttonPrimary:hover:not(:disabled){
  transform:translateY(-1px);
  box-shadow:0 16px 30px rgba(10,11,15,0.18);
}
.buttonPrimary:disabled{
  opacity:.55;
  cursor:not-allowed;
}
.buttonSecondary{
  border:1px solid rgba(228,221,210,0.92);
  background:rgba(255,255,255,0.86);
  color:${c.text};
}
.buttonSecondary:hover{
  transform:translateY(-1px);
  background:#fff;
  box-shadow:0 10px 24px rgba(17,18,20,0.06);
}
.navButton{
  padding:10px 16px;
  font-size:12px;
}

.hero{
  position:relative;
  padding:48px 0 30px;
  overflow:hidden;
}
.hero::before{
  content:"";
  position:absolute;
  inset:0;
  pointer-events:none;
  background:
    radial-gradient(circle at 18% 14%, rgba(37,99,235,0.07), transparent 28%),
    radial-gradient(circle at 84% 18%, rgba(201,149,107,0.12), transparent 25%),
    linear-gradient(180deg, rgba(255,255,255,0.48), rgba(255,255,255,0));
}
.heroGrid{
  display:grid;
  grid-template-columns:1fr;
  gap:34px;
  align-items:center;
}
.heroCopy{position:relative;z-index:2}
.heroEyebrow{
  display:inline-flex;
  align-items:center;
  padding:8px 12px;
  border-radius:999px;
  background:rgba(37,99,235,0.06);
  border:1px solid rgba(37,99,235,0.1);
  color:${c.accent};
  font-size:11px;
  font-weight:800;
  letter-spacing:.1em;
  text-transform:uppercase;
}
.heroTitle{
  margin-top:16px;
  font-size:clamp(44px,9vw,88px);
  line-height:.94;
  letter-spacing:-.058em;
  max-width:10ch;
}
.heroSub{
  margin-top:18px;
  max-width:640px;
  font-size:clamp(17px,2.6vw,22px);
  line-height:1.55;
  color:${c.text};
  font-weight:500;
}
.heroPosition{
  margin-top:16px;
  display:inline-flex;
  align-items:center;
  gap:8px;
  border-radius:999px;
  padding:10px 14px;
  background:rgba(255,255,255,0.82);
  border:1px solid rgba(228,221,210,0.92);
  color:${c.text};
  font-size:14px;
  font-weight:700;
  box-shadow:0 10px 24px rgba(17,18,20,0.04);
}
.heroActions{
  margin-top:26px;
  display:flex;
  flex-direction:column;
  gap:12px;
}
.heroProofRow{
  margin-top:18px;
  display:flex;
  flex-wrap:wrap;
  gap:8px;
}
.heroProofRow span{
  display:inline-flex;
  align-items:center;
  padding:8px 12px;
  border-radius:999px;
  background:rgba(255,255,255,0.72);
  border:1px solid rgba(228,221,210,0.86);
  color:${c.sub};
  font-size:12px;
  font-weight:700;
}
.heroVisual{
  position:relative;
  display:flex;
  justify-content:center;
  z-index:1;
}

.phoneWrap{
  position:relative;
  width:100%;
  max-width:520px;
  min-height:560px;
  display:flex;
  align-items:center;
  justify-content:center;
}
.phoneGlow{
  position:absolute;
  border-radius:999px;
  filter:blur(22px);
  pointer-events:none;
}
.phoneGlowA{
  width:330px;
  height:330px;
  right:20px;
  top:30px;
  background:radial-gradient(circle, rgba(37,99,235,0.16), transparent 70%);
}
.phoneGlowB{
  width:280px;
  height:280px;
  left:40px;
  bottom:42px;
  background:radial-gradient(circle, rgba(201,149,107,0.18), transparent 72%);
}
.heroChip{
  position:absolute;
  z-index:3;
  display:inline-flex;
  align-items:center;
  gap:8px;
  padding:10px 13px;
  border-radius:999px;
  background:rgba(255,255,255,0.9);
  border:1px solid rgba(228,221,210,0.9);
  box-shadow:0 14px 28px rgba(17,18,20,0.08);
  font-size:12px;
  font-weight:700;
  color:${c.text};
}
.heroChipOne{top:38px;left:0}
.heroChipTwo{top:96px;right:0}
.heroChipThree{bottom:54px;right:14px}

.phoneFrame{
  position:relative;
  z-index:2;
  width:100%;
  max-width:290px;
  border-radius:40px;
  background:#111217;
  padding:7px;
  box-shadow:0 28px 60px rgba(17,18,20,0.18),0 10px 20px rgba(17,18,20,0.08);
}
.phoneInner{
  background:linear-gradient(180deg,#FAFAFB,#F5F2EC);
  border-radius:34px;
  overflow:hidden;
}
.phoneNotch{
  width:86px;
  height:20px;
  margin:0 auto 4px;
  border-radius:999px;
  background:#000;
}
.phoneTop{
  display:flex;
  align-items:center;
  gap:10px;
  padding:12px 14px;
  background:rgba(255,255,255,0.9);
  border-bottom:1px solid rgba(228,221,210,0.75);
}
.phoneAvatar{
  position:relative;
  width:32px;
  height:32px;
  border-radius:999px;
  overflow:hidden;
  flex-shrink:0;
  border:1px solid rgba(255,255,255,0.9);
}
.phoneTitle{
  font-size:13px;
  font-weight:800;
  letter-spacing:-.02em;
}
.phoneSub{
  margin-top:2px;
  font-size:10px;
  font-weight:700;
  color:${c.accent};
}
.phoneBody{
  padding:14px;
  display:flex;
  flex-direction:column;
  gap:10px;
  min-height:420px;
}
.phonePrompt{
  padding:10px 12px;
  border-radius:18px;
  background:#fff;
  color:${c.text};
  font-size:12px;
  line-height:1.55;
  box-shadow:0 4px 14px rgba(17,18,20,0.04);
}
.phoneCard{
  border-radius:20px;
  padding:13px;
  background:rgba(255,255,255,0.82);
  border:1px solid rgba(228,221,210,0.9);
  box-shadow:0 8px 20px rgba(17,18,20,0.04);
}
.phoneCardPrimary{
  background:linear-gradient(180deg,#FFFFFF,#F8FBFF);
}
.phoneCardTop{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:8px;
  margin-bottom:10px;
}
.phonePill{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  padding:5px 9px;
  border-radius:999px;
  background:rgba(37,99,235,0.08);
  color:${c.accent};
  font-size:10px;
  font-weight:800;
}
.phonePillSoft{
  background:rgba(201,149,107,0.12);
  color:${c.warm};
}
.phoneCard h4{
  font-size:14px;
  font-weight:800;
  letter-spacing:-.02em;
}
.phoneCard p{
  margin-top:6px;
  font-size:12px;
  line-height:1.6;
  color:${c.sub};
}
.phoneRow{
  display:flex;
  align-items:flex-start;
  gap:10px;
}
.phoneRow strong{
  display:block;
  font-size:13px;
  line-height:1.35;
}
.phoneRow span{
  display:block;
  margin-top:4px;
  font-size:11px;
  line-height:1.55;
  color:${c.sub};
}
.phoneComposer{
  padding:12px 14px 16px;
  background:rgba(255,255,255,0.72);
  border-top:1px solid rgba(228,221,210,0.75);
}
.phoneComposer span{
  display:block;
  padding:12px 14px;
  border-radius:999px;
  background:#fff;
  color:${c.muted};
  font-size:11px;
  font-weight:700;
}

.section{padding:82px 0}
.sectionProof{
  padding-top:56px;
}
.sectionEmotion{
  background:linear-gradient(180deg,rgba(255,255,255,0.5),rgba(255,255,255,0));
}
.sectionWorld{
  background:
    radial-gradient(circle at 18% 24%, rgba(201,149,107,0.06), transparent 22%),
    linear-gradient(180deg,${c.bg},#EFE8DD,${c.bg});
}
.sectionDark{
  background:${c.dark};
  color:#fff;
}
.sectionInfra{
  border-top:1px solid rgba(228,221,210,0.9);
  border-bottom:1px solid rgba(228,221,210,0.9);
  background:linear-gradient(180deg,rgba(255,255,255,0.5),rgba(255,255,255,0.18));
}

.sectionHead{
  max-width:760px;
  margin:0 auto;
  text-align:center;
}
.eyebrow{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  font-size:11px;
  font-weight:800;
  letter-spacing:.12em;
  text-transform:uppercase;
  color:${c.muted};
}
.eyebrowDark{color:rgba(255,255,255,0.56)}
.sectionTitle{
  margin-top:10px;
  font-size:clamp(30px,5vw,56px);
  line-height:1.02;
  letter-spacing:-.05em;
}
.sectionTitleDark{color:#fff}
.sectionTitleInfra{max-width:10ch;margin-left:auto;margin-right:auto}
.sectionLead{
  margin-top:14px;
  max-width:620px;
  margin-left:auto;
  margin-right:auto;
  font-size:16px;
  line-height:1.76;
  color:${c.sub};
}
.sectionLeadDark{color:rgba(255,255,255,0.58)}

.proofGrid{
  margin-top:34px;
  display:grid;
  grid-template-columns:1fr;
  gap:14px;
}
.proofCard{
  background:rgba(255,255,255,0.94);
  border:1px solid rgba(228,221,210,0.92);
  border-radius:24px;
  padding:24px;
  box-shadow:0 12px 28px rgba(17,18,20,0.04);
}
.proofLabel{
  font-size:11px;
  font-weight:800;
  letter-spacing:.1em;
  text-transform:uppercase;
  color:${c.muted};
}
.proofLabelLaura{color:${c.accent}}
.proofTop,
.proofBottom{
  margin-top:10px;
  font-size:16px;
  line-height:1.65;
  letter-spacing:-.01em;
}
.proofTop{color:${c.sub}}
.proofBottom{
  color:${c.text};
  font-weight:700;
}
.proofDivider{
  height:1px;
  background:linear-gradient(90deg,transparent,rgba(228,221,210,0.95),transparent);
  margin:18px 0;
}

.doesGrid,
.audienceGrid,
.pricingGrid{
  margin-top:34px;
  display:grid;
  grid-template-columns:1fr;
  gap:14px;
}
.doesCard,
.audienceCard,
.pricingCard{
  border-radius:24px;
  padding:28px;
  background:rgba(255,255,255,0.96);
  border:1px solid rgba(228,221,210,0.92);
  box-shadow:0 12px 28px rgba(17,18,20,0.04);
}
.iconBadge{
  width:50px;
  height:50px;
  border-radius:16px;
  display:flex;
  align-items:center;
  justify-content:center;
  margin-bottom:16px;
}
.doesCard h3,
.audienceCard h3,
.buildCard h3{
  font-size:20px;
  font-weight:800;
  letter-spacing:-.03em;
}
.doesCard p,
.audienceCard p,
.buildCard p{
  margin-top:10px;
  font-size:14px;
  line-height:1.8;
  color:${c.sub};
}
.audienceTitleRow{
  display:flex;
  align-items:center;
  gap:8px;
  flex-wrap:wrap;
}

.stateGrid{
  margin-top:34px;
  display:grid;
  grid-template-columns:1fr;
  gap:14px;
}
.stateCard{
  border-radius:24px;
  padding:28px;
  border:1px solid rgba(228,221,210,0.92);
}
.stateCardBad{
  background:rgba(255,244,242,0.8);
}
.stateCardGood{
  background:rgba(236,253,243,0.72);
}
.stateLabel{
  font-size:18px;
  font-weight:800;
  letter-spacing:-.02em;
}
.stateItems{
  margin-top:16px;
  display:flex;
  flex-direction:column;
  gap:12px;
}
.stateItem{
  display:flex;
  align-items:flex-start;
  gap:10px;
  font-size:14px;
  line-height:1.75;
  color:${c.sub};
}
.stateCross{
  width:18px;
  height:18px;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  border-radius:999px;
  background:rgba(239,68,68,0.1);
  color:#DC2626;
  font-weight:800;
  flex-shrink:0;
  margin-top:2px;
}

.tick{
  width:19px;
  height:19px;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  border-radius:999px;
  background:${c.greenSoft};
  color:${c.green};
  flex-shrink:0;
  margin-top:2px;
}
.tickDark{
  background:rgba(34,197,94,0.12);
  color:#4ADE80;
}

.worldGrid{
  margin-top:34px;
  display:grid;
  grid-template-columns:1fr;
  gap:22px;
  align-items:center;
}
.worldVisual{
  width:100%;
  max-width:380px;
  margin:0 auto;
  aspect-ratio:1;
}
.globeCanvas{
  width:100%;
  height:100%;
  display:block;
}
.storyCard{
  background:rgba(255,255,255,0.9);
  border:1px solid rgba(228,221,210,0.92);
  border-radius:26px;
  padding:26px;
  box-shadow:0 12px 28px rgba(17,18,20,0.04);
}
.storyTop{
  display:flex;
  align-items:center;
  gap:8px;
  flex-wrap:wrap;
}
.storyCode{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  min-width:34px;
  height:34px;
  padding:0 10px;
  border-radius:999px;
  background:#fff;
  border:1px solid rgba(228,221,210,0.92);
  font-size:11px;
  font-weight:800;
}
.storyCountry{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  min-height:34px;
  padding:0 12px;
  border-radius:999px;
  background:rgba(37,99,235,0.06);
  color:${c.accent};
  font-size:11px;
  font-weight:800;
  letter-spacing:.08em;
  text-transform:uppercase;
}
.storyQuote{
  margin-top:18px;
  font-size:clamp(19px,3.8vw,28px);
  line-height:1.34;
  letter-spacing:-.03em;
  font-family:'Instrument Serif',Georgia,serif;
}
.storyName{
  margin-top:10px;
  font-size:13px;
  font-weight:700;
  color:${c.muted};
}
.storyLaura{
  margin-top:18px;
  padding:14px;
  border-radius:18px;
  border:1px solid rgba(228,221,210,0.92);
  background:#fff;
  display:flex;
  align-items:flex-start;
  gap:10px;
}
.storyAvatar{
  position:relative;
  width:26px;
  height:26px;
  border-radius:999px;
  overflow:hidden;
  flex-shrink:0;
}
.storyLaura p{
  font-size:13px;
  line-height:1.7;
  color:${c.sub};
}
.storyControls{
  margin-top:18px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
}
.storyDots,
.roadDots{
  display:flex;
  align-items:center;
  gap:6px;
}
.storyDot,
.roadDot{
  width:7px;
  height:7px;
  border-radius:999px;
  border:none;
  background:rgba(18,19,23,0.16);
  cursor:pointer;
  transition:all .25s ease;
  padding:0;
}
.storyDotActive,
.roadDotActive{
  width:22px;
  background:${c.warm};
}
.storyArrows,
.roadActions{
  display:flex;
  align-items:center;
  gap:8px;
}
.storyArrow{
  width:34px;
  height:34px;
  border:none;
  border-radius:999px;
  background:#fff;
  border:1px solid rgba(228,221,210,0.92);
  color:${c.sub};
  display:inline-flex;
  align-items:center;
  justify-content:center;
  cursor:pointer;
  transition:transform .2s ease,box-shadow .2s ease,color .2s ease;
}
.storyArrow:hover{
  transform:translateY(-1px);
  box-shadow:0 8px 18px rgba(17,18,20,0.06);
  color:${c.text};
}

.roadHeader{
  margin-top:26px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
}
.roadHint{
  font-size:12px;
  font-weight:700;
  color:${c.muted};
}
.roadScroller{
  margin-top:16px;
  display:flex;
  gap:14px;
  overflow-x:auto;
  scroll-snap-type:x mandatory;
  scrollbar-width:none;
  -ms-overflow-style:none;
  scroll-padding-left:20px;
  padding:4px 22vw 10px 0;
}
.roadScroller::-webkit-scrollbar{display:none}
.roadCard{
  position:relative;
  flex:0 0 min(86vw, 320px);
  min-height:240px;
  scroll-snap-align:start;
  border-radius:24px;
  padding:24px;
  background:rgba(255,255,255,0.92);
  border:1px solid rgba(228,221,210,0.92);
  box-shadow:0 12px 28px rgba(17,18,20,0.04);
}
.roadIndex{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  min-width:42px;
  height:30px;
  padding:0 12px;
  border-radius:999px;
  background:rgba(201,149,107,0.12);
  color:${c.warm};
  font-size:12px;
  font-weight:800;
}
.roadCard h3{
  margin-top:16px;
  font-size:22px;
  line-height:1.18;
  letter-spacing:-.03em;
}
.roadCard p{
  margin-top:10px;
  font-size:14px;
  line-height:1.75;
  color:${c.sub};
}
.roadLine{
  position:absolute;
  left:24px;
  right:24px;
  bottom:0;
  height:2px;
  border-radius:999px;
  background:linear-gradient(90deg,transparent,rgba(201,149,107,0.38),transparent);
}

.buildGrid{
  margin-top:34px;
  display:grid;
  grid-template-columns:1fr;
  gap:16px;
}
.codeCard,
.buildCard{
  border-radius:24px;
  padding:28px;
}
.codeCard{
  background:#07080B;
  border:1px solid ${c.borderDark};
  overflow:hidden;
}
.codeTop{
  display:flex;
  align-items:center;
  gap:8px;
  margin-bottom:16px;
}
.codeDots{
  display:flex;
  gap:5px;
}
.codeDots span{
  width:8px;
  height:8px;
  border-radius:999px;
  display:block;
}
.codeDots span:nth-child(1){background:#FF5F57}
.codeDots span:nth-child(2){background:#FEBC2E}
.codeDots span:nth-child(3){background:#28C840}
.codeLabel{
  font-size:11px;
  font-weight:700;
  color:#6B7280;
  flex:1;
}
.codeBlock{
  font-family:'SF Mono',ui-monospace,Menlo,Consolas,monospace;
  font-size:13px;
  line-height:1.8;
  color:#D6DCE6;
  white-space:pre-wrap;
  word-break:break-word;
}
.buildCard{
  background:linear-gradient(180deg,rgba(18,21,28,0.96),rgba(12,14,19,0.98));
  border:1px solid ${c.borderDark};
}
.buildCard h3{color:#fff}
.buildCard p{color:rgba(255,255,255,0.58)}
.buildList{
  margin-top:18px;
  display:flex;
  flex-direction:column;
  gap:10px;
}
.buildItem{
  display:flex;
  align-items:flex-start;
  gap:10px;
  color:rgba(255,255,255,0.7);
  font-size:14px;
  line-height:1.7;
}

.infraGrid{
  margin-top:34px;
  display:grid;
  grid-template-columns:repeat(2,1fr);
  gap:14px;
}
.infraItem{
  min-height:86px;
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius:22px;
  background:rgba(255,255,255,0.78);
  border:1px solid rgba(228,221,210,0.92);
}
.infraItemOpenAI{padding:0 10px}
.infraSvg{
  width:auto;
  height:31px;
  color:rgba(18,19,23,0.74);
  overflow:visible;
}
.infraLogoOpenAI{
  display:flex;
  align-items:center;
  justify-content:center;
}
.openAiWordmark{
  width:auto;
  height:31px;
  object-fit:contain;
}

.pricingCard{
  position:relative;
  display:flex;
  flex-direction:column;
}
.pricingCardHighlight{
  background:linear-gradient(180deg,#111318,#0D0F14);
  color:#fff;
  border-color:${c.borderDark};
}
.pricingBadge{
  position:absolute;
  top:16px;
  right:16px;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  min-height:28px;
  padding:0 11px;
  border-radius:999px;
  background:rgba(255,255,255,0.1);
  color:rgba(255,255,255,0.7);
  font-size:10px;
  font-weight:800;
  letter-spacing:.08em;
  text-transform:uppercase;
}
.pricingTopRow{
  display:flex;
  align-items:center;
  gap:8px;
  flex-wrap:wrap;
}
.pricingTopRow h3{
  font-size:19px;
  font-weight:800;
  letter-spacing:-.02em;
}
.pricingAmountWrap{margin-top:14px}
.pricingAmount{
  font-size:clamp(30px,5vw,42px);
  line-height:.98;
  letter-spacing:-.05em;
}
.pricingPeriod{
  margin-top:6px;
  font-size:13px;
  color:${c.muted};
}
.pricingCardHighlight .pricingPeriod{color:rgba(255,255,255,0.42)}
.pricingDesc{
  margin-top:12px;
  font-size:14px;
  line-height:1.75;
  color:${c.sub};
}
.pricingCardHighlight .pricingDesc{color:rgba(255,255,255,0.58)}
.pricingFeatures{
  margin-top:18px;
  padding-top:18px;
  border-top:1px solid rgba(228,221,210,0.92);
  display:flex;
  flex-direction:column;
  gap:10px;
  flex:1;
}
.pricingCardHighlight .pricingFeatures{border-top-color:rgba(255,255,255,0.08)}
.pricingFeature{
  display:flex;
  align-items:flex-start;
  gap:10px;
  font-size:14px;
  line-height:1.7;
  color:${c.sub};
}
.pricingCardHighlight .pricingFeature{color:rgba(255,255,255,0.7)}
.pricingButton{
  margin-top:22px;
  width:100%;
}
.pricingButtonLight{
  background:#fff;
  color:${c.dark};
}

.waitlistCard{
  max-width:820px;
  margin:0 auto;
  padding:30px;
  border-radius:28px;
  background:rgba(255,255,255,0.96);
  border:1px solid rgba(228,221,210,0.92);
  box-shadow:0 14px 32px rgba(17,18,20,0.05);
}
.waitlistForm{
  margin-top:20px;
  display:grid;
  grid-template-columns:1fr;
  gap:10px;
}
.input{
  width:100%;
  height:50px;
  border-radius:16px;
  border:1px solid rgba(228,221,210,0.92);
  background:#fff;
  color:${c.text};
  padding:0 15px;
  font-size:14px;
  outline:none;
  transition:border-color .2s ease,box-shadow .2s ease;
}
.input:focus{
  border-color:${c.accent};
  box-shadow:0 0 0 3px rgba(37,99,235,0.08);
}
.waitlistButton{
  width:100%;
  height:50px;
}
.policyLabel{
  margin-top:12px;
  display:flex;
  align-items:flex-start;
  gap:8px;
  max-width:560px;
  margin-left:auto;
  margin-right:auto;
  color:${c.sub};
  font-size:12px;
  line-height:1.6;
}
.policyCheckbox{
  margin-top:2px;
  width:15px;
  height:15px;
  accent-color:${c.accent};
  flex-shrink:0;
}
.policyLink{
  font-weight:700;
  color:${c.text};
  text-decoration:underline;
  text-underline-offset:2px;
}
.formOk,
.formError{
  margin-top:12px;
  padding:12px 14px;
  border-radius:14px;
  text-align:center;
  font-size:13px;
  font-weight:700;
}
.formOk{
  background:${c.greenSoft};
  color:#166534;
}
.formError{
  background:#FFF5F5;
  color:#B91C1C;
}

.footer{
  background:${c.dark};
  color:#fff;
  padding:38px 0 22px;
}
.footerInner{display:flex;flex-direction:column;gap:18px}
.footerTop{
  display:flex;
  flex-direction:column;
  gap:22px;
}
.brandFooter{color:#fff}
.brandMarkFooter{
  background:rgba(255,255,255,0.08);
  padding:2px;
  border-radius:12px;
}
.brandNameFooter{font-size:14px}
.footerLinks{
  display:flex;
  flex-wrap:wrap;
  gap:14px 18px;
}
.footerLink{
  font-size:13px;
  color:rgba(255,255,255,0.56);
  transition:color .2s ease;
}
.footerLink:hover{color:#fff}
.footerDisclaimer{
  padding-top:18px;
  border-top:1px solid rgba(255,255,255,0.08);
  color:rgba(255,255,255,0.4);
  font-size:12px;
  line-height:1.75;
}
.footerBottom{
  padding-top:14px;
  border-top:1px solid rgba(255,255,255,0.08);
  color:rgba(255,255,255,0.28);
  font-size:11px;
}

.soon{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  padding:4px 8px;
  border-radius:999px;
  background:rgba(37,99,235,0.07);
  color:${c.accent};
  font-size:10px;
  font-weight:800;
  border:1px solid rgba(37,99,235,0.1);
  letter-spacing:.04em;
  text-transform:uppercase;
}

.modalOverlay{
  position:fixed;
  inset:0;
  z-index:240;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:18px;
  background:rgba(10,11,15,0.42);
  backdrop-filter:blur(16px);
  -webkit-backdrop-filter:blur(16px);
}
.modalCard{
  width:100%;
  max-width:470px;
  border-radius:30px;
  padding:28px;
  background:rgba(255,255,255,0.97);
  border:1px solid rgba(228,221,210,0.92);
  box-shadow:0 30px 70px rgba(0,0,0,0.18);
  text-align:center;
}
.modalPill{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  min-height:30px;
  padding:0 12px;
  border-radius:999px;
  background:rgba(37,99,235,0.06);
  border:1px solid rgba(37,99,235,0.1);
  color:${c.accent};
  font-size:10px;
  font-weight:800;
  letter-spacing:.1em;
  text-transform:uppercase;
}
.modalSeal{
  display:flex;
  align-items:center;
  justify-content:center;
  margin-top:18px;
}
.modalSealInner{
  width:74px;
  height:74px;
  border-radius:999px;
  display:flex;
  align-items:center;
  justify-content:center;
  background:linear-gradient(180deg,#fff,#F7FBFF);
  color:${c.accent};
  border:1px solid rgba(228,221,210,0.92);
  box-shadow:0 0 0 8px rgba(37,99,235,0.04);
  animation:pulseSoft 4.2s ease-in-out infinite;
}
.modalTitle{
  margin-top:18px;
  font-size:clamp(30px,6vw,42px);
  line-height:1;
  letter-spacing:-.05em;
}
.modalBody{
  margin-top:10px;
  color:${c.sub};
  font-size:14px;
  line-height:1.75;
}
.modalReferral{
  margin-top:22px;
  padding:16px;
  border-radius:18px;
  background:rgba(248,250,255,0.9);
  border:1px solid rgba(217,226,244,0.9);
  text-align:left;
}
.modalReferralTop{
  display:flex;
  align-items:flex-start;
  justify-content:space-between;
  gap:10px;
}
.modalEyebrow{
  font-size:10px;
  font-weight:800;
  letter-spacing:.08em;
  text-transform:uppercase;
  color:${c.muted};
}
.modalReferralTitle{
  margin-top:4px;
  font-size:14px;
  font-weight:800;
  color:${c.text};
}
.modalTag{
  flex-shrink:0;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  min-height:28px;
  padding:0 10px;
  border-radius:999px;
  background:rgba(201,149,107,0.12);
  color:${c.warm};
  font-size:10px;
  font-weight:800;
  letter-spacing:.04em;
}
.modalLinkBox{
  margin-top:14px;
  display:flex;
  align-items:center;
  gap:8px;
  border-radius:14px;
  background:#fff;
  border:1px solid rgba(228,221,210,0.92);
  padding:9px 10px;
}
.modalLinkText{
  flex:1;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  font-size:11px;
  font-weight:700;
  color:${c.sub};
}
.modalIconButton{
  width:36px;
  height:36px;
  border:none;
  border-radius:10px;
  background:${c.accentSoft};
  color:${c.accent};
  display:flex;
  align-items:center;
  justify-content:center;
  cursor:pointer;
}
.modalButtons{
  margin-top:12px;
  display:grid;
  grid-template-columns:1fr;
  gap:8px;
}
.modalClose{
  margin-top:16px;
  background:none;
  border:none;
  color:${c.muted};
  font-size:13px;
  font-weight:700;
  cursor:pointer;
}

@media(min-width:720px){
  .container{padding:0 24px}
  .heroActions{flex-direction:row}
  .proofGrid{grid-template-columns:repeat(3,1fr)}
  .stateGrid{grid-template-columns:repeat(2,1fr)}
  .doesGrid{grid-template-columns:repeat(3,1fr)}
  .audienceGrid{grid-template-columns:repeat(3,1fr)}
  .pricingGrid{grid-template-columns:repeat(3,1fr)}
  .infraGrid{grid-template-columns:repeat(4,1fr)}
  .waitlistForm{grid-template-columns:1.2fr .85fr auto}
  .waitlistButton{width:auto}
  .footerTop{flex-direction:row;align-items:center;justify-content:space-between}
  .modalButtons{grid-template-columns:1fr 1fr}
}

@media(min-width:960px){
  .container{padding:0 32px}
  .navLinks{display:flex}
  .hero{padding:64px 0 40px}
  .heroGrid{
    grid-template-columns:minmax(0, 1.02fr) minmax(0, .98fr);
    gap:24px 36px;
  }
  .heroVisual{justify-content:flex-end}
  .worldGrid{
    grid-template-columns:minmax(0, .95fr) minmax(0, 1.05fr);
    gap:32px;
  }
  .buildGrid{
    grid-template-columns:1fr 1fr;
    gap:20px;
  }
  .roadScroller{
    display:grid;
    grid-template-columns:repeat(5,1fr);
    overflow:visible;
    padding:0;
  }
  .roadCard{
    flex:unset;
    min-height:260px;
  }
  .roadHint{opacity:.8}
}

@media(max-width:959px){
  .heroChipOne{left:2px}
  .heroChipTwo{right:2px}
  .heroChipThree{right:10px}
}

@media(max-width:719px){
  .navInner{min-height:66px}
  .brandName{font-size:14px}
  .navButton{padding:9px 14px;font-size:12px}
  .heroTitle{max-width:11ch}
  .phoneWrap{
    min-height:500px;
    max-width:360px;
  }
  .heroChip{
    font-size:11px;
    padding:9px 11px;
  }
  .heroChipOne{top:18px}
  .heroChipTwo{top:72px}
  .heroChipThree{bottom:30px}
  .phoneFrame{max-width:258px}
  .phoneInner{border-radius:30px}
  .phoneBody{min-height:372px}
  .section{padding:74px 0}
  .sectionProof{padding-top:44px}
  .sectionTitleInfra{max-width:none}
  .modalCard{padding:24px}
  .modalReferralTop{flex-direction:column;align-items:flex-start}
  .infraSvg{height:28px}
  .openAiWordmark{height:28px;width:auto}
}

@media (prefers-reduced-motion: reduce){
  .modalSealInner,
  .phoneGlow,
  .heroChip,
  .phoneCard,
  .phoneFrame{
    animation:none!important;
    transition:none!important;
  }
}
`;