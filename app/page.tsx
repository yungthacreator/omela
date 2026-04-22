"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import {
  Check,
  ChevronDown,
  Copy,
  Database,
  Eye,
  History,
  Home,
  Quote,
  RefreshCw,
  Shield,
  Stethoscope,
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

type Role = "carer" | "household" | "care_team" | "pharmacy" | "other";

type TimelineItem = {
  done: boolean;
  text: string;
  meta: string;
};

type Resident = {
  initials: string;
  tone: "w" | "b" | "g";
  name: string;
  shortName: string;
  age: string;
  med: string;
  medShort: string;
  rx: string;
  status: string;
  statusChip: "fo" | "se" | "re" | "du";
  statusValueClass: "" | "bad" | "ok";
  owner: string;
  practice: string;
  pharmacy: string;
  evalTask: string;
  next: string;
  daysLeft: number;
  supplyPercent: number;
  timeline: TimelineItem[];
};

const RESIDENTS: Resident[] = [
  {
    initials: "ML",
    tone: "w",
    name: "Margaret Littlewood",
    shortName: "Margaret L.",
    age: "78",
    med: "Amlodipine 5mg, once daily",
    medShort: "Amlodipine 5mg",
    rx: "RX-20814",
    status: "Needs follow-up",
    statusChip: "fo",
    statusValueClass: "bad",
    owner: "Ada Kelly · daughter",
    practice: "Greenfield Medical",
    pharmacy: "Boots, High Street",
    evalTask: "Checking Margaret's amlodipine supply",
    next: "Ada to call the practice before 4pm today.",
    daysLeft: 2,
    supplyPercent: 7,
    timeline: [
      { done: true, text: "Draft prepared", meta: "Mon 09:14" },
      { done: true, text: "Sent to practice", meta: "Tue 11:32" },
      { done: true, text: "Practice acknowledged", meta: "Tue 16:05" },
      { done: false, text: "Awaiting response", meta: "3 days" },
    ],
  },
  {
    initials: "DR",
    tone: "b",
    name: "David Reyes",
    shortName: "David Reyes",
    age: "64",
    med: "Metformin 500mg, twice daily",
    medShort: "Metformin 500mg",
    rx: "RX-20819",
    status: "Request sent",
    statusChip: "se",
    statusValueClass: "",
    owner: "Jamie Marsh · support worker",
    practice: "Northgate Surgery",
    pharmacy: "Well, Market Square",
    evalTask: "Drafting Metformin refill for David",
    next: "No action needed. Omela will alert on any change.",
    daysLeft: 6,
    supplyPercent: 20,
    timeline: [
      { done: true, text: "Draft prepared", meta: "Tue 08:02" },
      { done: true, text: "Approved internally", meta: "Tue 09:41" },
      { done: true, text: "Sent to practice", meta: "Wed 10:15" },
      { done: false, text: "Awaiting GP response", meta: "today" },
    ],
  },
  {
    initials: "IK",
    tone: "g",
    name: "Irene Kowalski",
    shortName: "Irene Kowalski",
    age: "81",
    med: "Sertraline 50mg, once daily",
    medShort: "Sertraline 50mg",
    rx: "RX-20806",
    status: "Ready to collect",
    statusChip: "re",
    statusValueClass: "ok",
    owner: "James Kowalski · son",
    practice: "Hillside Practice",
    pharmacy: "Boots, High Street",
    evalTask: "Notifying James about collection window",
    next: "Collection window open until 6pm.",
    daysLeft: 14,
    supplyPercent: 47,
    timeline: [
      { done: true, text: "Draft prepared", meta: "Fri 14:20" },
      { done: true, text: "Sent to practice", meta: "Mon 09:03" },
      { done: true, text: "Dispensed", meta: "today 11:20" },
      { done: true, text: "Ready at pharmacy", meta: "today 12:44" },
    ],
  },
  {
    initials: "SW",
    tone: "b",
    name: "Samuel Wright",
    shortName: "Samuel Wright",
    age: "72",
    med: "Apixaban 5mg, twice daily",
    medShort: "Apixaban 5mg",
    rx: "RX-20901",
    status: "Due soon",
    statusChip: "du",
    statusValueClass: "bad",
    owner: "Clara Moss · wife",
    practice: "Riverbank Surgery",
    pharmacy: "Lloyds, Station Road",
    evalTask: "Reviewing Samuel's next refill date",
    next: "Clara to confirm medication list before noon.",
    daysLeft: 4,
    supplyPercent: 13,
    timeline: [
      { done: true, text: "Cycle detected", meta: "today 08:10" },
      { done: true, text: "Reminder sent", meta: "today 08:11" },
      { done: false, text: "Awaiting request draft", meta: "today" },
    ],
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Omela is the first thing I open on a Monday morning. I can see what needs attention across every resident in one place.",
    name: "Care team lead",
    domain: "Residential care",
  },
  {
    quote:
      "Three of us manage prescriptions for my mum. Before Omela we were double-calling the GP. Now we just see who did what.",
    name: "Family carer",
    domain: "Supporting a parent",
  },
  {
    quote:
      "The pharmacy queue makes more sense when we can see the request state before the person even calls us.",
    name: "Pharmacy manager",
    domain: "Community pharmacy",
  },
];

const FAQS = [
  {
    q: "Is Omela only for healthcare?",
    a: "Omela is focused on repeat prescription coordination today. The product stays intentionally narrow so the workflow remains clear, calm, and useful from the start.",
  },
  {
    q: "How is this different from Asana or Trello?",
    a: "Asana and Trello help teams manage internal tasks. Omela is built for repeat prescription workflows that cross people, organisations, and external systems.",
  },
  {
    q: "Do you need access to clinical records or patient data?",
    a: "No. Omela is designed as a coordination layer, not a clinical record system. We only handle the state of a request, not its clinical content.",
  },
  {
    q: "Is Omela a medical device?",
    a: "No. Omela does not diagnose, prescribe, or make medical decisions. It helps track ownership, status, and next steps.",
  },
  {
    q: "What happens when I book a demo?",
    a: "We walk through your current workflow, show how Omela fits, and decide together whether it is a good operational fit for you or your team.",
  },
  {
    q: "Who is Omela for right now?",
    a: "Omela is designed for family carers, residential care teams, supported living teams, and community pharmacies coordinating repeat prescriptions.",
  },
];

const INFRA_LOGOS = [
  { src: "/logos/stripe.svg", alt: "Stripe" },
  { src: "/logos/twilio.svg", alt: "Twilio" },
  { src: "/logos/microsoft-logo.png", alt: "Microsoft" },
  { src: "/logos/google-logo.png", alt: "Google" },
  { src: "/logos/aws-logo.png", alt: "AWS" },
  { src: "/logos/openai-wordmark.svg", alt: "OpenAI" },
  { src: "/logos/vercel.svg", alt: "Vercel" },
];

const FEED_ITEMS = [
  {
    dot: "b",
    who: "Jamie M.",
    what: "drafted Metformin refill for David",
    when: "now",
    fresh: true,
  },
  {
    dot: "w",
    who: "Ada Kelly",
    what: "approved Margaret's amlodipine request",
    when: "14m",
    fresh: false,
  },
  {
    dot: "g",
    who: "Jamie M.",
    what: "marked Sertraline ready at Boots",
    when: "42m",
    fresh: false,
  },
];

const c = {
  bg: "#F8F6F1",
  bg2: "#F3EFE8",
  white: "#FFFFFF",
  ink: "#111214",
  sub: "#4A4F5C",
  muted: "#888E9C",
  border: "#E3DDD2",
  warm: "#C9956B",
  warmDk: "#A07545",
  warmBg: "#FFF8F0",
  green: "#15803D",
  greenBg: "#ECFDF3",
  blue: "#1D4ED8",
  blueBg: "#EFF6FF",
  red: "#B91C1C",
  redBg: "#FEF2F2",
  dark: "#0F1829",
};

function LogoMark({ inverted = false }: { inverted?: boolean }) {
  return (
    <Image
      src="/omela-logo-mark.png"
      alt=""
      aria-hidden="true"
      width={17}
      height={17}
      className={`omela-mark ${inverted ? "inv" : ""}`}
    />
  );
}

function Overline({
  children,
  warm = false,
}: {
  children: ReactNode;
  warm?: boolean;
}) {
  return <span className={`overline ${warm ? "warm" : ""}`}>{children}</span>;
}

function CountUp({
  target,
  suffix = "",
  decimals = 0,
  prefix = "",
}: {
  target: number;
  suffix?: string;
  decimals?: number;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [started, setStarted] = useState(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || started) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setStarted(true);
        obs.disconnect();
      },
      { threshold: 0.4 }
    );

    obs.observe(el);

    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    let frame = 0;
    const duration = 1800;
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [started, target]);

  const shown = decimals > 0 ? value.toFixed(decimals) : String(Math.round(value));

  return (
    <span ref={ref}>
      {prefix}
      {shown}
      {suffix}
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
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && referralCode) {
      setShareUrl(`${window.location.origin}?ref=${referralCode}`);
    } else {
      setShareUrl("");
    }
  }, [referralCode]);

  async function copyLink() {
    if (!shareUrl) return;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  if (!open) return null;

  return (
    <div className="modO" onClick={onClose}>
      <div className="modB" onClick={(e) => e.stopPropagation()}>
        <div className="modSeal">
          <Check size={22} />
        </div>

        <h3 className="serif modTi">You are on the list.</h3>
        <p className="modBd">
          We will be in touch after your demo request is reviewed.
        </p>

        {referralCode && shareUrl ? (
          <div className="modRef">
            <p className="modRefLbl">Share with a family member or team</p>

            <div className="modRefBox">
              <span className="modRefUrl">
                {shareUrl.replace("https://", "").replace("http://", "")}
              </span>
              <button onClick={copyLink} className="modRefCp" type="button">
                {copied ? <Check size={13} /> : <Copy size={13} />}
              </button>
            </div>
          </div>
        ) : null}

        <button type="button" className="modClose" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="faq-wrap">
      {FAQS.map((item, index) => {
        const open = openIndex === index;
        return (
          <div key={item.q} className={`fq-item ${open ? "open" : ""}`}>
            <button
              className="fq-btn"
              type="button"
              onClick={() => setOpenIndex(open ? null : index)}
            >
              {item.q}
              <span className="fq-icon">
                <span>
                  <ChevronDown size={16} />
                </span>
              </span>
            </button>
            <div className="fq-answer">
              <div className="fq-answer-inner">{item.a}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const [selectedResident, setSelectedResident] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [visibleBubbles, setVisibleBubbles] = useState([false, false, false, false]);

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

  const activeResident = RESIDENTS[selectedResident];
  const testimonial = TESTIMONIALS[testimonialIndex];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const p = new URLSearchParams(window.location.search);
      const r = p.get("ref");
      if (r) setRefParam(r);
    }
  }, []);

  useEffect(() => {
    const timers = [0, 380, 760, 1140].map((delay, index) =>
      window.setTimeout(() => {
        setVisibleBubbles((prev) => {
          const next = [...prev];
          next[index] = true;
          return next;
        });
      }, delay + 700)
    );

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSelectedResident((prev) => (prev + 1) % RESIDENTS.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5600);

    return () => window.clearInterval(interval);
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

  return (
    <>
      <style>{CSS}</style>

      <SuccessModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        referralCode={referralCode}
      />

      <div className={`${dmSans.variable} ${instrumentSerif.variable}`}>
        <nav>
          <div className="nav-inner">
            <a className="nav-logo" href="#">
              <div className="nav-logo-mark">
                <LogoMark />
              </div>
              <span className="nav-logo-name">Omela</span>
            </a>

            <div className="nav-links">
              <a className="nav-link" href="#how">
                Product
              </a>
              <a className="nav-link" href="#audiences">
                Who it&apos;s for
              </a>
              <a className="nav-link" href="#pricing">
                Pricing
              </a>
              <a className="nav-link" href="#faq">
                FAQ
              </a>
            </div>

            <div className="nav-right">
              <Link className="btn-ghost" href="/login">
                Sign in
              </Link>
              <a className="btn-primary" href="#onboarding">
                Book a demo
              </a>
            </div>
          </div>
        </nav>

        <div className="hero">
          <h1>
            Stop chasing GPs, pharmacies, and family for <em>repeat prescriptions.</em>
          </h1>

          <p className="hero-sub">
            Omela keeps every request owned, tracked, and followed through, so nothing gets missed.
          </p>

          <p className="hero-pain">
            No more chasing updates across calls, emails, and memory.
          </p>

          <div className="hero-btns">
            <a className="btn-primary" href="#how">
              See the workflow
            </a>
            <a className="btn-secondary" href="#pricing">
              View pricing
            </a>
          </div>
        </div>

        <div className="workspace-section">
          <div className="workspace-shell">
            <div className="ws-titlebar">
              <div className="ws-dots">
                <span />
                <span />
                <span />
              </div>
              <div className="ws-url">omela.ai / workspace / care-team</div>
            </div>

            <div className="ws-body">
              <div className="ws-sb">
                <div className="ws-sb-head">
                  <div className="ws-brand">
                    <div className="ws-brand-mark ws-brand-logo">
                      <LogoMark />
                    </div>
                    <div>
                      <div className="ws-brand-name">Omela</div>
                      <div className="ws-live">
                        <span className="live-dot small-dot" />
                        Live · Healthcare
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ws-stats">
                  <div className="ws-stat">
                    <div className="ws-stat-n a">5</div>
                    <div className="ws-stat-l">Due Soon</div>
                  </div>
                  <div className="ws-stat">
                    <div className="ws-stat-n r">1</div>
                    <div className="ws-stat-l">Delayed</div>
                  </div>
                  <div className="ws-stat">
                    <div className="ws-stat-n g">2</div>
                    <div className="ws-stat-l">Ready</div>
                  </div>
                </div>

                <div className="ws-list-hd">
                  <span>Residents</span>
                  <span>4</span>
                </div>

                {RESIDENTS.map((resident, index) => (
                  <button
                    key={resident.rx}
                    className={`ws-item ${selectedResident === index ? "sel" : ""}`}
                    onClick={() => setSelectedResident(index)}
                    type="button"
                  >
                    <div className="ws-item-top">
                      <div className={`ws-av ${resident.tone}`}>{resident.initials}</div>
                      <span className="ws-item-name">{resident.shortName}</span>
                      <span className="ws-item-age"> · {resident.age}</span>
                    </div>

                    <div className="ws-item-med">{resident.medShort}</div>

                    <div className="ws-item-row">
                      <span className={`chip ${resident.statusChip}`}>{resident.status}</span>
                      <span className="ws-item-days">{resident.daysLeft}d left</span>
                    </div>

                    <div className="supply-bar">
                      <div className="supply-track">
                        <div
                          className={`supply-fill ${
                            resident.tone === "g" ? "g" : resident.tone === "b" ? "b" : "w"
                          }`}
                          style={{ width: `${resident.supplyPercent}%` }}
                        />
                      </div>
                      <span className="supply-lbl">{resident.daysLeft}d</span>
                    </div>
                  </button>
                ))}

                <div className="ws-feed">
                  <div className="ws-feed-hd">
                    <RefreshCw size={9} />
                    Recent activity
                  </div>

                  <div className="ws-feed-vp">
                    <div className="ws-feed-track">
                      {[...FEED_ITEMS, ...FEED_ITEMS].map((item, index) => (
                        <div key={`${item.who}-${item.what}-${index}`} className="ws-feed-item">
                          <span className={`ws-feed-dot ${item.dot}`} />
                          <span className="ws-feed-who">{item.who}</span>
                          <span className="ws-feed-what"> {item.what}</span>
                          <span className={`ws-feed-when ${item.fresh ? "fresh" : ""}`}>
                            {item.when}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="ws-main">
                <div className="ws-eval">
                  <div className="ws-eval-copy">
                    <span className="ws-eval-lbl">Omela is evaluating</span>
                    <span className="ws-eval-task">{activeResident.evalTask}</span>
                  </div>
                  <div className="ws-eval-prog">
                    <div className="ws-eval-fill" />
                  </div>
                </div>

                <div className="ws-main-head">
                  <div>
                    <div className="ws-main-title">{activeResident.name}</div>
                    <div className="ws-main-sub">
                      {activeResident.med} · {activeResident.rx}
                    </div>
                  </div>
                  <span className={`chip ${activeResident.statusChip}`}>
                    {activeResident.status}
                  </span>
                </div>

                <div className="ws-tl">
                  <div className="ws-tl-hd">Timeline</div>

                  {activeResident.timeline.map((item, index) => (
                    <div key={`${item.text}-${index}`}>
                      {index > 0 ? <div className="ws-connector" /> : null}

                      <div className="ws-tl-item">
                        <div className={`ws-tl-node ${item.done ? "done" : "wait"}`}>
                          {item.done ? (
                            <Check size={9} strokeWidth={2.5} />
                          ) : (
                            <svg viewBox="0 0 10 10" width="9" height="9" aria-hidden="true">
                              <circle cx="5" cy="5" r="2.2" fill={c.warm} />
                            </svg>
                          )}
                        </div>

                        <span className={`ws-tl-text ${item.done ? "" : "p"}`}>{item.text}</span>

                        <span className="ws-tl-time">{item.meta}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="ws-next">
                  <div className="ws-next-lbl">Next action · Today</div>
                  <div className="ws-next-text">{activeResident.next}</div>
                </div>
              </div>

              <div className="ws-detail">
                <div className={`ws-detail-av ${activeResident.tone}`}>{activeResident.initials}</div>
                <div className="ws-detail-name">{activeResident.name}</div>
                <div className="ws-detail-med">{activeResident.med}</div>
                <div className="ws-detail-rx">{activeResident.rx}</div>

                <div className="ws-field">
                  <div className="ws-field-l">Status</div>
                  <div className={`ws-field-v ${activeResident.statusValueClass}`}>
                    {activeResident.status}
                  </div>
                </div>

                <div className="ws-field">
                  <div className="ws-field-l">Owner</div>
                  <div className="ws-field-v">{activeResident.owner}</div>
                </div>

                <div className="ws-field">
                  <div className="ws-field-l">Practice</div>
                  <div className="ws-field-v">{activeResident.practice}</div>
                </div>

                <div className="ws-field">
                  <div className="ws-field-l">Pharmacy</div>
                  <div className="ws-field-v">{activeResident.pharmacy}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="marquee-section">
          <div className="marquee-label">
            Built on infrastructure trusted by secure teams worldwide
          </div>

          <div className="marquee-track-wrap infra-wrap">
            <div className="marquee-track infra-track">
              {[...INFRA_LOGOS, ...INFRA_LOGOS].map((logo, index) => (
                <div key={`${logo.alt}-${index}`} className="infra-logo-card">
                  <img src={logo.src} alt={logo.alt} className="infra-logo-img" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pain-section">
          <div className="pain-inner">
            <div className="pain-bubbles">
              <div className={`bubble ${visibleBubbles[0] ? "show" : ""}`}>Did you call the GP yet?</div>
              <div className={`bubble right ${visibleBubbles[1] ? "show" : ""}`}>
                I thought you were handling it
              </div>
              <div className={`bubble ${visibleBubbles[2] ? "show" : ""}`}>
                The pharmacy says they never got the request
              </div>
              <div className={`bubble right ${visibleBubbles[3] ? "show" : ""}`}>
                She has 2 days of tablets left
              </div>
            </div>

            <Overline warm>Why this matters</Overline>

            <h2 className="pain-heading">
              Things get <em>delayed</em> when nobody owns the next step.
            </h2>

            <p className="pain-body">
              Requests get dropped. Pharmacies chase practices. Families chase pharmacies. Staff
              assume someone else handled it. Updates scatter across calls, emails, and memory.
            </p>

            <p className="pain-punch">
              Omela removes the chasing with one shared coordination layer.
            </p>
          </div>
        </div>

        <section className="pad white-bg" id="how">
          <div className="sec-inner">
            <div className="sh-c">
              <Overline>How Omela works</Overline>
              <h2>
                From due soon to resolved,
                <br />
                without the chasing.
              </h2>
            </div>

            <div className="how-grid">
              <div className="how-card">
                <div className="how-num">01</div>
                <h3>Omela spots what is due</h3>
                <p>Repeat cycles, supply timing, and follow-up dates are tracked in one place.</p>
              </div>

              <div className="how-card">
                <div className="how-num">02</div>
                <h3>A request is prepared</h3>
                <p>
                  Each request is linked to the person, medication, owner, and next action before
                  it gets sent.
                </p>
              </div>

              <div className="how-card">
                <div className="how-num">03</div>
                <h3>Status stays visible</h3>
                <p>
                  From sent, to acknowledged, to ready for collection, everyone sees the same
                  timeline.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="pad bg-main">
          <div className="sec-inner">
            <div className="sh-c">
              <Overline>What Omela gives you</Overline>
              <h2>
                One place to see what is due,
                <br />
                delayed, and done.
              </h2>
              <p className="sec-sub">
                The shared coordination layer for repeat prescription requests. Keeps ownership,
                status, and next steps visible without replacing clinical systems.
              </p>
            </div>

            <div className="benefit-grid">
              <div className="benefit-card">
                <div className="benefit-icon warm">
                  <RefreshCw size={20} />
                </div>
                <h3>See what needs attention now</h3>
                <p>
                  Know what is due soon, what is delayed, and what needs following up today.
                </p>
              </div>

              <div className="benefit-card">
                <div className="benefit-icon blue">
                  <Users size={20} />
                </div>
                <h3>Keep ownership clear</h3>
                <p>
                  See who last handled the request, who owns the next step, and what should happen
                  next.
                </p>
              </div>

              <div className="benefit-card">
                <div className="benefit-icon green">
                  <Check size={20} />
                </div>
                <h3>Follow every update</h3>
                <p>
                  Track progress from draft through acknowledgement to collection in one shared
                  timeline.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="pad white-bg" id="audiences">
          <div className="sec-inner">
            <div className="sh-c">
              <Overline warm>Built first for</Overline>
              <h2>
                The people carrying
                <br />
                the follow-through.
              </h2>
            </div>

            <div className="audience-grid">
              <div className="audience-card">
                <div className="audience-card-top">
                  <div className="audience-icon">
                    <Users size={20} />
                  </div>
                  <div className="live-tag">
                    <span className="live-tag-dot" />
                    Live
                  </div>
                </div>
                <h3>Family carers</h3>
                <p>
                  Helping a parent, partner, or relative stay on top of repeat prescriptions
                  without carrying every detail alone.
                </p>
                <div className="audience-players">Family · GP · Pharmacy</div>
              </div>

              <div className="audience-card">
                <div className="audience-card-top">
                  <div className="audience-icon">
                    <Home size={20} />
                  </div>
                  <div className="live-tag">
                    <span className="live-tag-dot" />
                    Live
                  </div>
                </div>
                <h3>Residential care</h3>
                <p>
                  Coordinating repeat prescription workflows across residents, practices, and
                  pharmacies in one place.
                </p>
                <div className="audience-players">Care team · GP · Pharmacy</div>
              </div>

              <div className="audience-card">
                <div className="audience-card-top">
                  <div className="audience-icon">
                    <Home size={20} />
                  </div>
                  <div className="live-tag">
                    <span className="live-tag-dot" />
                    Live
                  </div>
                </div>
                <h3>Supported living</h3>
                <p>
                  Giving staff and families a shared view of medication follow-up across handovers.
                </p>
                <div className="audience-players">Staff · Family · GP</div>
              </div>

              <div className="audience-card">
                <div className="audience-card-top">
                  <div className="audience-icon">
                    <Stethoscope size={20} />
                  </div>
                  <div className="live-tag">
                    <span className="live-tag-dot" />
                    Live
                  </div>
                </div>
                <h3>Community pharmacies</h3>
                <p>
                  A clearer incoming queue with context on who ordered what, for whom, and what
                  still needs follow-up.
                </p>
                <div className="audience-players">Pharmacy · Patients · GPs</div>
              </div>
            </div>
          </div>
        </section>

        <div className="dark-section">
          <div className="dark-inner">
            <Overline>Why repeat prescriptions first</Overline>

            <h2>Starting with one of the largest unresolved admin workflows in healthcare.</h2>

            <p className="sec-sub dark-sub">
              Repeat prescriptions are frequent, repetitive, multi-party, and still poorly
              coordinated across patients, practices, pharmacies, and care teams. That makes them
              painful enough to matter and common enough to build a serious business around.
            </p>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-val">
                  <CountUp target={1.1} decimals={1} suffix="B" />
                </div>
                <div className="stat-lbl">
                  prescription items issued each year in England (NHSBSA)
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-val">
                  <CountUp target={77} suffix="%" />
                </div>
                <div className="stat-lbl">
                  of all prescription items are repeats (NHS England)
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-val">
                  £<CountUp target={300} suffix="M" />
                </div>
                <div className="stat-lbl">
                  estimated medicines waste each year (NHS England)
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-val multi-party">
                  Multi-
                  <br />
                  party
                </div>
                <div className="stat-lbl">
                  patient, practice, pharmacy, and carer all involved in every cycle
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="pad bg2">
          <div className="sec-inner">
            <div className="sh-c testimonial-shell">
              <Overline>What teams say</Overline>
              <h2>
                The first thing they open
                <br />
                when the week starts.
              </h2>
            </div>

            <div className="tst-wrap">
              <div className="tst-icon">
                <Quote size={20} />
              </div>

              <div className="tst-quote">{testimonial.quote}</div>

              <div className="tst-attr">
                <span className="tst-attr-name">{testimonial.name}</span>
                <span>·</span>
                <span>{testimonial.domain}</span>
              </div>

              <div className="tst-dots">
                {TESTIMONIALS.map((_, index) => (
                  <button
                    key={index}
                    className={`tst-dot ${index === testimonialIndex ? "active" : ""}`}
                    onClick={() => setTestimonialIndex(index)}
                    type="button"
                    aria-label={`Testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="pad white-bg">
          <div className="sec-inner">
            <div className="sh-c">
              <Overline>Trust and boundaries</Overline>
              <h2>
                We take the thin slice.
                <br />
                You keep the rest.
              </h2>
              <p className="sec-sub">
                Omela is a coordination layer, not a system of record. We handle ownership, status,
                and next actions. Clinical records stay where they belong.
              </p>
            </div>

            <div className="trust-grid">
              <div className="trust-card">
                <div className="trust-top">
                  <span className="trust-num">01</span>
                  <div className="trust-icon-wrap">
                    <Shield size={16} />
                  </div>
                </div>
                <h3>Metadata, not content</h3>
                <p>
                  Omela tracks the state of a request, not the underlying clinical record.
                </p>
              </div>

              <div className="trust-card">
                <div className="trust-top">
                  <span className="trust-num">02</span>
                  <div className="trust-icon-wrap">
                    <Eye size={16} />
                  </div>
                </div>
                <h3>Role-based visibility</h3>
                <p>Each workspace has explicit roles and scoped access.</p>
              </div>

              <div className="trust-card">
                <div className="trust-top">
                  <span className="trust-num">03</span>
                  <div className="trust-icon-wrap">
                    <History size={16} />
                  </div>
                </div>
                <h3>Full audit trail</h3>
                <p>Every status change, ownership transfer, and action is timestamped.</p>
              </div>

              <div className="trust-card">
                <div className="trust-top">
                  <span className="trust-num">04</span>
                  <div className="trust-icon-wrap">
                    <Database size={16} />
                  </div>
                </div>
                <h3>Minimum data by design</h3>
                <p>Only the fields needed to move a request forward.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="pad bg-main" id="pricing">
          <div className="sec-inner">
            <div className="sh-c">
              <Overline warm>Simple pricing</Overline>
              <h2>
                Pay for the people you coordinate,
                <br />
                not the seats.
              </h2>
              <p className="sec-sub">
                Built for carers, care teams, and growing providers. Transparent monthly pricing
                for early teams.
              </p>
            </div>

            <div className="pricing-grid">
              <div className="p-card">
                <div className="p-tier">Family</div>
                <div className="p-price">
                  <span className="p-amount">£9</span>
                  <span className="p-per">/ month</span>
                </div>
                <p className="p-desc">
                  For one person coordinating repeat prescriptions for a relative or household.
                </p>
                <ul className="p-features">
                  <li>
                    <span className="p-check">
                      <Check size={9} />
                    </span>
                    Up to 3 people
                  </li>
                  <li>
                    <span className="p-check">
                      <Check size={9} />
                    </span>
                    Unlimited requests
                  </li>
                  <li>
                    <span className="p-check">
                      <Check size={9} />
                    </span>
                    Email reminders
                  </li>
                  <li>
                    <span className="p-check">
                      <Check size={9} />
                    </span>
                    Activity history
                  </li>
                </ul>
                <a href="#onboarding" className="btn-secondary p-btn">
                  Book a demo
                </a>
              </div>

              <div className="p-card feat">
                <div className="p-badge">
                  <span className="p-badge-dot" />
                  Most popular
                </div>
                <div className="p-tier">Team</div>
                <div className="p-price">
                  <span className="p-amount">£49</span>
                  <span className="p-per">/ month</span>
                </div>
                <p className="p-desc">
                  For care teams and pharmacies managing ongoing prescription workflows.
                </p>
                <ul className="p-features">
                  <li>
                    <span className="p-check">
                      <Check size={9} />
                    </span>
                    Up to 25 active people
                  </li>
                  <li>
                    <span className="p-check">
                      <Check size={9} />
                    </span>
                    Shared workspace
                  </li>
                  <li>
                    <span className="p-check">
                      <Check size={9} />
                    </span>
                    Role permissions
                  </li>
                  <li>
                    <span className="p-check">
                      <Check size={9} />
                    </span>
                    Email support
                  </li>
                  <li>
                    <span className="p-check">
                      <Check size={9} />
                    </span>
                    Audit trail
                  </li>
                </ul>
                <a href="#onboarding" className="btn-primary p-btn">
                  Book a demo
                </a>
              </div>

              <div className="p-card">
                <div className="p-tier">Organisation</div>
                <div className="p-custom">Custom</div>
                <div className="p-custom-note">Annual contract</div>
                <p className="p-desc">
                  For multi-site providers with onboarding, controls, and structured rollout.
                </p>
                <ul className="p-features">
                  <li>
                    <span className="p-check">
                      <Check size={9} />
                    </span>
                    Unlimited items
                  </li>
                  <li>
                    <span className="p-check">
                      <Check size={9} />
                    </span>
                    SSO and Microsoft Entra
                  </li>
                  <li>
                    <span className="p-check">
                      <Check size={9} />
                    </span>
                    Onboarding support
                  </li>
                  <li>
                    <span className="p-check">
                      <Check size={9} />
                    </span>
                    Data processing agreement
                  </li>
                </ul>
                <a href="mailto:hello@omela.ai" className="btn-secondary p-btn">
                  Talk to us
                </a>
              </div>
            </div>

            <p className="pricing-note">
              All plans include role-based access and full audit history. Questions?{" "}
              <a href="mailto:hello@omela.ai">Contact us.</a>
            </p>
          </div>
        </section>

        <section className="pad white-bg" id="onboarding">
          <div className="sec-inner">
            <div className="ob-box">
              <Overline>Book a demo</Overline>
              <h2>See whether Omela fits your workflow.</h2>
              <p>
                Tell us how you currently manage repeat prescriptions and we will show you the
                cleanest way Omela would work for you.
              </p>

              <form className="ob-form" onSubmit={handleSubmit}>
                <input
                  className="ob-input"
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />

                <select
                  className="ob-select"
                  value={role}
                  onChange={(e) => setRole(e.target.value as Role)}
                >
                  <option value="carer">I manage for a family member</option>
                  <option value="household">I manage across my household</option>
                  <option value="care_team">I work in a care team</option>
                  <option value="pharmacy">I work in a pharmacy</option>
                  <option value="other">Something else</option>
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
                  className="btn-primary ob-submit"
                  type="submit"
                  disabled={!mounted || submitting || !agreed}
                >
                  {submitting ? "Submitting..." : "Request a demo"}
                </button>
              </form>

              <label className="agree-row">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  required
                />
                <span>
                  By submitting you agree to our <Link href="/privacy">Privacy Notice</Link> and{" "}
                  <Link href="/terms">Terms</Link>.
                </span>
              </label>

              {success ? <div className="form-ok">{success}</div> : null}
              {error ? <div className="form-er">{error}</div> : null}
            </div>
          </div>
        </section>

        <section className="pad bg-main" id="faq">
          <div className="sec-inner">
            <div className="sh-c faq-head">
              <Overline>Questions</Overline>
              <h2>Answers to what most people ask.</h2>
              <p className="sec-sub">
                If your question is not here, send a note to{" "}
                <a href="mailto:hello@omela.ai">hello@omela.ai</a> and a real person will reply.
              </p>
            </div>

            <FAQAccordion />
          </div>
        </section>

        <section className="pad white-bg future-section">
          <div className="sec-inner">
            <div className="future-block">
              <Overline warm>Focused first</Overline>
              <h2>
                One workflow,
                <br />
                done properly.
              </h2>
              <p className="sec-sub">
                Omela is focused on making repeat prescription coordination clear, calm, and
                visible across the people involved.
              </p>
            </div>
          </div>
        </section>

        <div className="final-cta">
          <h2>
            Still managing repeat prescriptions
            <br />
            across calls, notes, and memory?
          </h2>

          <p>
            See how Omela keeps repeat prescription requests visible from first draft to final
            collection.
          </p>

          <div className="final-btns">
            <a href="#onboarding" className="btn-white">
              Book a demo
            </a>
            <a href="#how" className="btn-outline-white">
              See the workflow
            </a>
          </div>
        </div>

        <footer>
          <div className="ft-inner">
            <div className="ft-top">
              <div>
                <div className="ft-brand-logo">
                  <div className="ft-lm">
                    <LogoMark />
                  </div>
                  <span className="ft-ln">Omela</span>
                </div>
                <p className="ft-tagline">
                  The coordination layer for repeat prescription workflows. Built for the people
                  carrying the follow-through.
                </p>
              </div>

              <div>
                <div className="ft-col-title">Product</div>
                <a className="ft-link" href="#how">
                  How it works
                </a>
                <a className="ft-link" href="#audiences">
                  Who it&apos;s for
                </a>
                <a className="ft-link" href="#pricing">
                  Pricing
                </a>
                <a className="ft-link" href="#onboarding">
                  Book a demo
                </a>
              </div>

              <div>
                <div className="ft-col-title">Company</div>
                <span className="ft-link">Omela Ltd.</span>
                <a className="ft-link" href="mailto:hello@omela.ai">
                  Contact
                </a>
                <a className="ft-link" href="#onboarding">
                  Book a demo
                </a>
              </div>

              <div>
                <div className="ft-col-title">Legal</div>
                <Link className="ft-link" href="/privacy">
                  Privacy
                </Link>
                <Link className="ft-link" href="/terms">
                  Terms
                </Link>
                <a className="ft-link" href="mailto:notice@omela.ai">
                  Notices
                </a>
              </div>
            </div>

            <div className="ft-bottom">
              <p className="ft-copy">© 2026 Omela Ltd.</p>
              <p className="ft-disc">
                Omela is a coordination layer, not a clinical system of record, and does not make
                medical decisions. In a healthcare emergency, contact local emergency services.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

const CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased}
body{
  font-family:var(--font-dm-sans),-apple-system,sans-serif;
  background:${c.bg};
  color:${c.ink};
  font-size:16px;
  line-height:1.6;
  overflow-x:hidden
}
a{color:inherit;text-decoration:none}
button,input,select{font-family:inherit}
::selection{background:${c.warm};color:#fff}
.serif{font-family:var(--font-instrument-serif),Georgia,serif}

/* ---- NAV ---- */
nav{
  position:sticky;top:0;z-index:200;
  background:rgba(248,246,241,.94);
  backdrop-filter:blur(20px);
  border-bottom:1px solid rgba(227,221,210,.6);
  height:68px;
}
.nav-inner{
  max-width:1200px;margin:0 auto;padding:0 32px;
  height:100%;display:flex;align-items:center;justify-content:space-between;gap:16px;
}
.nav-logo{display:flex;align-items:center;gap:10px;text-decoration:none}
.nav-logo-mark{
  width:32px;height:32px;background:${c.white};border-radius:8px;
  border:1px solid ${c.border};
  box-shadow:0 2px 10px rgba(0,0,0,.05);
  display:flex;align-items:center;justify-content:center;
}
.nav-logo-name{
  font-family:var(--font-instrument-serif),Georgia,serif;
  font-size:21px;color:${c.ink};letter-spacing:-.01em
}
.omela-mark{
  width:17px;
  height:17px;
  object-fit:contain;
  display:block;
}
.omela-mark.inv{
  filter:brightness(0) invert(1);
}
.nav-links{display:flex;align-items:center;gap:2px}
.nav-link{
  font-size:14.5px;font-weight:500;color:${c.sub};
  padding:7px 14px;border-radius:8px;transition:color .15s,background .15s
}
.nav-link:hover{color:${c.ink};background:rgba(0,0,0,.04)}
.nav-right{display:flex;align-items:center;gap:10px}
.btn-ghost{
  font-size:14.5px;font-weight:500;color:${c.sub};background:none;border:none;cursor:pointer;
  padding:7px 14px;border-radius:8px;transition:color .15s,background .15s
}
.btn-ghost:hover{color:${c.ink};background:rgba(0,0,0,.04)}
.btn-primary{
  display:inline-flex;align-items:center;gap:7px;
  background:${c.warm};color:#fff;
  font-size:14.5px;font-weight:700;padding:10px 22px;border-radius:100px;border:none;
  cursor:pointer;transition:all .2s;white-space:nowrap;letter-spacing:-.01em;
}
.btn-primary:hover:not(:disabled){
  background:${c.warmDk};
  transform:translateY(-1px);
  box-shadow:0 6px 20px rgba(160,117,69,.3)
}
.btn-primary:disabled{opacity:.6;cursor:not-allowed}
.btn-secondary{
  display:inline-flex;align-items:center;gap:7px;
  background:${c.white};color:${c.ink};
  font-size:14.5px;font-weight:700;padding:10px 22px;border-radius:100px;
  border:1.5px solid ${c.border};cursor:pointer;transition:all .2s;letter-spacing:-.01em;
}
.btn-secondary:hover{border-color:${c.ink};transform:translateY(-1px)}

/* ---- HERO ---- */
.hero{padding:88px 32px 72px;max-width:1200px;margin:0 auto;text-align:center}
.live-dot{width:7px;height:7px;background:${c.green};border-radius:50%;animation:livePulse 2s infinite}
.small-dot{width:5px!important;height:5px!important}
@keyframes livePulse{
  0%,100%{box-shadow:0 0 0 0 rgba(21,128,61,.4)}
  60%{box-shadow:0 0 0 6px rgba(21,128,61,0)}
}
h1{
  font-family:var(--font-instrument-serif),Georgia,serif;
  font-size:clamp(42px,6.5vw,80px);
  line-height:.98;letter-spacing:-.025em;color:${c.ink};
  margin-bottom:24px;
  animation:fadeUp .6s .08s both;
}
h1 em{font-style:italic;color:${c.warmDk}}
.hero-sub{
  font-size:19px;color:${c.sub};line-height:1.65;max-width:540px;margin:0 auto 10px;
  animation:fadeUp .6s .14s both;
}
.hero-pain{
  font-size:14px;color:${c.ink};font-weight:700;margin-bottom:36px;
  animation:fadeUp .6s .18s both
}
.hero-btns{
  display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;margin-bottom:0;
  animation:fadeUp .6s .22s both;
}
.hero-btns .btn-primary{font-size:16px;padding:14px 30px}
.hero-btns .btn-secondary{font-size:16px;padding:13px 30px}
@keyframes fadeUp{
  from{opacity:0;transform:translateY(20px)}
  to{opacity:1;transform:none}
}

/* ---- WORKSPACE MOCKUP ---- */
.workspace-section{padding:0 32px 100px;animation:fadeUp .8s .3s both}
.workspace-shell{
  max-width:1040px;margin:0 auto;
  background:${c.white};border:1px solid rgba(227,221,210,.9);
  border-radius:24px;
  box-shadow:0 1px 0 rgba(255,255,255,.8) inset, 0 2px 8px rgba(0,0,0,.04), 0 24px 60px rgba(15,24,41,.1);
  overflow:hidden;
}
.ws-titlebar{
  background:${c.bg2};border-bottom:1px solid ${c.border};
  padding:12px 18px;display:flex;align-items:center;gap:10px;
}
.ws-dots{display:flex;gap:6px}
.ws-dots span{width:12px;height:12px;border-radius:50%;display:block}
.ws-dots span:nth-child(1){background:#FF5F57}
.ws-dots span:nth-child(2){background:#FEBC2E}
.ws-dots span:nth-child(3){background:#28C840}
.ws-url{
  flex:1;background:${c.white};border:1px solid ${c.border};
  border-radius:6px;padding:5px 12px;font-size:12px;color:${c.muted};
  text-align:center;max-width:280px;margin:0 auto;
}
.ws-body{display:grid;grid-template-columns:240px 1fr 250px;min-height:420px}

/* sidebar */
.ws-sb{background:${c.bg};border-right:1px solid ${c.border}}
.ws-sb-head{padding:16px;border-bottom:1px solid ${c.border}}
.ws-brand{display:flex;align-items:center;gap:9px;margin-bottom:5px}
.ws-brand-mark{
  width:26px;height:26px;background:${c.white};border-radius:7px;
  border:1px solid rgba(227,221,210,.9);
  color:transparent;
  box-shadow:0 2px 8px rgba(0,0,0,.04);
  display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800
}
.ws-brand-logo .omela-mark{
  width:14px;
  height:14px;
}
.ws-brand-name{
  font-family:var(--font-instrument-serif),Georgia,serif;
  font-size:15px;color:${c.ink}
}
.ws-live{
  display:flex;align-items:center;gap:5px;font-size:10px;font-weight:700;color:${c.green};
  text-transform:uppercase;letter-spacing:.06em
}
.ws-stats{display:grid;grid-template-columns:repeat(3,1fr);border-bottom:1px solid ${c.border}}
.ws-stat{padding:11px 13px;border-right:1px solid ${c.border}}
.ws-stat:last-child{border-right:none}
.ws-stat-n{
  font-family:var(--font-instrument-serif),Georgia,serif;
  font-size:24px;line-height:1;letter-spacing:-.02em
}
.ws-stat-n.a{color:${c.warmDk}}
.ws-stat-n.r{color:${c.red}}
.ws-stat-n.g{color:${c.green}}
.ws-stat-l{
  font-size:9.5px;font-weight:700;text-transform:uppercase;
  letter-spacing:.08em;color:${c.muted};margin-top:3px
}
.ws-list-hd{
  padding:9px 14px;font-size:9.5px;font-weight:700;text-transform:uppercase;
  letter-spacing:.1em;color:${c.muted};border-bottom:1px solid ${c.border};
  display:flex;justify-content:space-between
}
.ws-item{
  width:100%;
  background:none;
  border:none;
  padding:11px 14px;border-bottom:1px solid rgba(227,221,210,.5);
  cursor:pointer;transition:background .15s;position:relative;text-align:left
}
.ws-item:hover{background:rgba(255,255,255,.7)}
.ws-item.sel{background:${c.white};border-left:2.5px solid ${c.warm}}
.ws-item-top{display:flex;align-items:center;gap:8px;margin-bottom:4px}
.ws-av{
  width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;
  font-size:9.5px;font-weight:800;flex-shrink:0
}
.ws-av.w{background:linear-gradient(135deg,#F7E7D2,#F0D5B6);color:${c.warmDk}}
.ws-av.b{background:linear-gradient(135deg,#E0EDFB,#C6D9F5);color:#1E40AF}
.ws-av.g{background:linear-gradient(135deg,#DCF2E4,#C4E8CF);color:${c.green}}
.ws-item-name{font-size:12px;font-weight:700;color:${c.ink};letter-spacing:-.01em}
.ws-item-age{font-size:10px;color:${c.muted}}
.ws-item-med{font-size:10.5px;color:${c.sub};margin-left:34px;margin-bottom:4px}
.ws-item-row{display:flex;align-items:center;justify-content:space-between;margin-left:34px}
.chip{
  display:inline-flex;align-items:center;gap:3px;font-size:9.5px;font-weight:700;
  padding:2px 8px;border-radius:100px;letter-spacing:.02em
}
.chip.fo{background:${c.warmBg};color:${c.warmDk}}
.chip.se{background:${c.blueBg};color:${c.blue}}
.chip.re{background:${c.greenBg};color:${c.green}}
.chip.du{background:#FEF9EC;color:#92400E}
.ws-item-days{font-size:10px;color:${c.muted}}
.supply-bar{margin:5px 0 0 34px;display:flex;align-items:center;gap:7px}
.supply-track{flex:1;height:2.5px;background:rgba(0,0,0,.07);border-radius:99px;overflow:hidden}
.supply-fill{height:100%;border-radius:99px}
.supply-fill.w{background:linear-gradient(90deg,${c.red},${c.warm})}
.supply-fill.b{background:${c.blue}}
.supply-fill.g{background:${c.green}}
.supply-lbl{
  font-size:9.5px;font-weight:700;color:${c.muted};white-space:nowrap
}

/* main panel */
.ws-main{border-right:1px solid ${c.border}}
.ws-eval{
  background:${c.warmBg};border-bottom:1px solid rgba(201,149,107,.3);
  padding:9px 18px;display:flex;align-items:center;gap:12px;font-size:12px;
  min-height:44px;transition:opacity .3s;
}
.ws-eval-copy{flex:1}
.ws-eval-lbl{
  font-size:9.5px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;
  color:${c.warmDk};display:block;margin-bottom:2px
}
.ws-eval-task{font-weight:600;color:${c.ink}}
.ws-eval-prog{
  flex:1;height:3px;background:rgba(201,149,107,.2);border-radius:99px;
  margin-left:auto;max-width:80px;overflow:hidden
}
.ws-eval-fill{
  height:100%;background:linear-gradient(90deg,${c.warm},${c.warmDk});
  border-radius:99px;animation:evalFill 3.2s ease-in-out infinite alternate
}
@keyframes evalFill{0%{width:10%}100%{width:90%}}
.ws-main-head{
  padding:14px 18px;border-bottom:1px solid ${c.border};
  display:flex;align-items:center;justify-content:space-between;gap:16px
}
.ws-main-title{font-size:14px;font-weight:800;letter-spacing:-.02em}
.ws-main-sub{font-size:10.5px;color:${c.muted};margin-top:1px}
.ws-tl{padding:16px 18px}
.ws-tl-hd{
  font-size:9.5px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;
  color:${c.muted};margin-bottom:14px
}
.ws-tl-item{display:flex;align-items:flex-start;gap:10px;margin-bottom:11px}
.ws-tl-node{
  width:18px;height:18px;border-radius:50%;flex-shrink:0;
  display:flex;align-items:center;justify-content:center;margin-top:1px
}
.ws-tl-node.done{background:${c.greenBg};border:1px solid rgba(21,128,61,.25)}
.ws-tl-node.wait{
  background:${c.warmBg};border:1px solid rgba(201,149,107,.3);
  animation:nodePulse 2s infinite
}
.ws-tl-node svg{width:9px;height:9px}
@keyframes nodePulse{0%,100%{transform:scale(1)}50%{transform:scale(1.12)}}
.ws-tl-text{font-size:12px;font-weight:500;color:${c.ink};flex:1}
.ws-tl-text.p{color:${c.warmDk};font-style:italic}
.ws-tl-time{font-size:10px;color:${c.muted}}
.ws-connector{width:2px;height:9px;background:${c.border};margin:1px 0 1px 8px}
.ws-next{
  margin:2px 16px 16px;background:${c.white};border:1px solid ${c.border};
  border-radius:10px;padding:10px 14px
}
.ws-next-lbl{
  font-size:9.5px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;
  color:${c.muted};margin-bottom:4px
}
.ws-next-text{font-size:12px;font-weight:600;color:${c.ink};line-height:1.5}

/* detail */
.ws-detail{padding:16px}
.ws-detail-av{
  width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;
  font-size:13px;font-weight:800;margin-bottom:10px;transition:all .4s
}
.ws-detail-av.w{background:linear-gradient(135deg,#F7E7D2,#F0D5B6);color:${c.warmDk}}
.ws-detail-av.b{background:linear-gradient(135deg,#E0EDFB,#C6D9F5);color:#1E40AF}
.ws-detail-av.g{background:linear-gradient(135deg,#DCF2E4,#C4E8CF);color:${c.green}}
.ws-detail-name{
  font-size:14px;font-weight:800;letter-spacing:-.02em;margin-bottom:2px;transition:all .3s
}
.ws-detail-med{font-size:11.5px;color:${c.sub};margin-bottom:1px}
.ws-detail-rx{
  font-size:10px;color:${c.muted};padding-bottom:12px;border-bottom:1px solid ${c.border};
  margin-bottom:12px
}
.ws-field{margin-bottom:9px}
.ws-field-l{
  font-size:9px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;
  color:${c.muted};margin-bottom:2px
}
.ws-field-v{font-size:12px;font-weight:700;color:${c.ink}}
.ws-field-v.bad{color:${c.red}}
.ws-field-v.ok{color:${c.green}}

/* activity feed */
.ws-feed{border-top:1px solid ${c.border};padding:10px 14px}
.ws-feed-hd{
  font-size:9.5px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;
  color:${c.muted};margin-bottom:8px;display:flex;align-items:center;gap:5px
}
.ws-feed-vp{
  height:74px;
  overflow:hidden;
  position:relative;
  mask-image:linear-gradient(180deg,transparent,#000 14%,#000 86%,transparent);
}
.ws-feed-track{
  display:flex;
  flex-direction:column;
  gap:0;
  animation:feedScroll 12s linear infinite;
}
.ws-feed:hover .ws-feed-track{
  animation-play-state:paused;
}
@keyframes feedScroll{
  from{transform:translateY(0)}
  to{transform:translateY(-50%)}
}
.ws-feed-item{display:flex;align-items:center;gap:7px;font-size:10.5px;padding:3px 0}
.ws-feed-dot{width:5px;height:5px;border-radius:50%;flex-shrink:0}
.ws-feed-dot.w{background:${c.warm}}
.ws-feed-dot.b{background:${c.blue}}
.ws-feed-dot.g{background:${c.green}}
.ws-feed-who{font-weight:700;flex-shrink:0}
.ws-feed-what{
  flex:1;color:${c.sub};overflow:hidden;text-overflow:ellipsis;white-space:nowrap
}
.ws-feed-when{
  color:${c.muted};font-size:9.5px;font-weight:600;flex-shrink:0
}
.ws-feed-when.fresh{
  color:${c.blue};font-weight:800;text-transform:uppercase;letter-spacing:.04em
}

/* ---- LOGO MARQUEE ---- */
.marquee-section{
  border-top:1px solid ${c.border};border-bottom:1px solid ${c.border};
  padding:34px 0;overflow:hidden;
  background:rgba(255,255,255,.42);
}
.marquee-label{
  text-align:center;font-size:11px;font-weight:700;letter-spacing:.16em;
  text-transform:uppercase;color:${c.muted};margin-bottom:22px
}
.marquee-track-wrap{
  overflow:hidden;mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)
}
.infra-wrap{
  mask-image:linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent);
}
.marquee-track{
  display:flex;align-items:center;gap:56px;width:max-content;animation:marquee 28s linear infinite
}
.infra-track{
  gap:18px;
}
.marquee-track:hover{animation-play-state:paused}
@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.infra-logo-card{
  height:76px;
  min-width:184px;
  padding:0 24px;
  border-radius:20px;
  border:1px solid rgba(227,221,210,.9);
  background:rgba(255,255,255,.72);
  display:flex;
  align-items:center;
  justify-content:center;
  box-shadow:0 8px 22px rgba(15,24,41,.04);
}
.infra-logo-img{
  height:28px;
  width:auto;
  max-width:130px;
  object-fit:contain;
  display:block;
  opacity:.96;
}

/* ---- PAIN SECTION ---- */
.pain-section{
  background:${c.warmBg};
  border-top:1px solid rgba(201,149,107,.2);
  border-bottom:1px solid rgba(201,149,107,.2);
  padding:96px 32px;
}
.pain-inner{max-width:680px;margin:0 auto;text-align:center}
.pain-bubbles{
  margin-bottom:40px;position:relative;min-height:120px;display:flex;
  flex-direction:column;gap:10px;align-items:flex-start
}
.bubble{
  background:rgba(255,255,255,.9);border:1px solid ${c.border};
  border-radius:18px 18px 18px 4px;
  padding:10px 16px;font-size:14px;color:${c.sub};font-weight:500;
  display:inline-block;max-width:80%;box-shadow:0 2px 8px rgba(0,0,0,.06);
  opacity:0;transform:translateX(-16px);transition:all .5s ease;
}
.bubble.right{
  align-self:flex-end;border-radius:18px 18px 4px 18px;transform:translateX(16px)
}
.bubble.show{opacity:1;transform:none;animation:bobLeft 5.2s ease-in-out infinite}
.bubble.right.show{animation:bobRight 5.8s ease-in-out infinite}
@keyframes bobLeft{
  0%,100%{transform:translateY(0)}
  50%{transform:translateY(-6px)}
}
@keyframes bobRight{
  0%,100%{transform:translateY(0)}
  50%{transform:translateY(-6px)}
}
.pain-heading{
  font-family:var(--font-instrument-serif),Georgia,serif;
  font-size:clamp(32px,5vw,54px);line-height:1.05;letter-spacing:-.03em;
  margin-bottom:20px;color:${c.ink}
}
.pain-heading em{font-style:italic}
.pain-body{font-size:17px;color:${c.sub};line-height:1.72;margin-bottom:14px}
.pain-punch{font-size:17px;font-weight:700;color:${c.ink}}

/* ---- GENERIC SECTION ---- */
section.pad{padding:96px 32px}
.sec-inner{max-width:1100px;margin:0 auto}
.overline{
  display:block;font-size:11px;font-weight:700;letter-spacing:.14em;
  text-transform:uppercase;color:${c.muted};margin-bottom:16px
}
.overline.warm{color:${c.warmDk}}
h2{
  font-family:var(--font-instrument-serif),Georgia,serif;
  font-size:clamp(30px,4.5vw,52px);line-height:1.08;letter-spacing:-.03em;
  margin-bottom:18px;color:${c.ink}
}
h2 em{font-style:italic;color:${c.warmDk}}
.sec-sub{font-size:17px;color:${c.sub};line-height:1.7;max-width:580px}
.sh-c{text-align:center;max-width:760px;margin:0 auto 56px}
.sh-c .sec-sub{margin:0 auto}
.white-bg{background:${c.white}}
.bg-main{background:${c.bg}}
.bg2{background:${c.bg2}}

/* ---- HOW IT WORKS ---- */
.how-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:16px}
.how-card{
  background:${c.white};border:1px solid ${c.border};border-radius:20px;padding:32px 28px;
  transition:transform .25s,box-shadow .25s,border-color .25s;
}
.how-card:hover{
  transform:translateY(-3px);box-shadow:0 12px 32px rgba(0,0,0,.07);
  border-color:rgba(201,149,107,.4)
}
.how-num{
  font-family:var(--font-instrument-serif),Georgia,serif;
  font-size:52px;color:${c.warm};opacity:.35;line-height:1;margin-bottom:18px;
  letter-spacing:-.02em
}
.how-card h3{font-size:17px;font-weight:800;letter-spacing:-.02em;margin-bottom:10px}
.how-card p{font-size:14.5px;color:${c.sub};line-height:1.7}

/* ---- BENEFIT CARDS ---- */
.benefit-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.benefit-card{
  background:${c.white};border:1px solid ${c.border};border-radius:20px;padding:32px 28px;
  transition:transform .25s,box-shadow .25s
}
.benefit-card:hover{transform:translateY(-3px);box-shadow:0 12px 32px rgba(0,0,0,.07)}
.benefit-icon{
  width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;
  margin-bottom:20px
}
.benefit-icon.warm{background:${c.warmBg};color:${c.warm}}
.benefit-icon.blue{background:${c.blueBg};color:${c.blue}}
.benefit-icon.green{background:${c.greenBg};color:${c.green}}
.benefit-card h3{font-size:17px;font-weight:800;letter-spacing:-.02em;margin-bottom:10px}
.benefit-card p{font-size:14.5px;color:${c.sub};line-height:1.7}

/* ---- AUDIENCE GRID ---- */
.audience-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.audience-card{
  background:${c.white};border:1px solid ${c.border};border-radius:20px;padding:28px 24px;
  display:flex;flex-direction:column;transition:transform .25s,border-color .25s,box-shadow .25s;
}
.audience-card:hover{
  transform:translateY(-3px);border-color:rgba(201,149,107,.4);
  box-shadow:0 12px 32px rgba(0,0,0,.06)
}
.audience-card-top{
  display:flex;align-items:center;justify-content:space-between;margin-bottom:16px
}
.audience-icon{
  width:42px;height:42px;border-radius:11px;background:${c.warmBg};
  border:1px solid rgba(201,149,107,.2);display:flex;align-items:center;justify-content:center;
  color:${c.warmDk}
}
.live-tag{
  display:inline-flex;align-items:center;gap:5px;background:${c.greenBg};
  border:1px solid rgba(21,128,61,.2);border-radius:100px;padding:3px 9px;
  font-size:10px;font-weight:700;color:${c.green}
}
.live-tag-dot{
  width:5px;height:5px;background:${c.green};border-radius:50%;animation:livePulse 2s infinite
}
.audience-card h3{font-size:16px;font-weight:800;letter-spacing:-.02em;margin-bottom:9px}
.audience-card p{font-size:14px;color:${c.sub};line-height:1.68;flex:1}
.audience-players{
  margin-top:14px;padding-top:12px;border-top:1px solid ${c.border};
  font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:${c.muted}
}

/* ---- DARK STATS ---- */
.dark-section{background:${c.dark};padding:96px 32px}
.dark-inner{max-width:1100px;margin:0 auto}
.dark-inner .overline{color:rgba(255,255,255,.35)}
.dark-inner h2{color:#fff;max-width:680px;margin-bottom:20px}
.dark-inner .dark-sub{color:rgba(255,255,255,.55);margin-bottom:56px}
.stats-grid{
  display:grid;grid-template-columns:repeat(4,1fr);gap:2px;
  border:1px solid rgba(255,255,255,.08);border-radius:18px;overflow:hidden
}
.stat-card{
  padding:36px 28px;background:rgba(255,255,255,.03);
  border-right:1px solid rgba(255,255,255,.06);transition:background .2s
}
.stat-card:hover{background:rgba(255,255,255,.06)}
.stat-card:last-child{border-right:none}
.stat-val{
  font-family:var(--font-instrument-serif),Georgia,serif;
  font-size:52px;line-height:1;letter-spacing:-.03em;color:#fff;margin-bottom:12px
}
.stat-lbl{font-size:13px;color:rgba(255,255,255,.45);line-height:1.55}
.multi-party{font-size:32px!important;line-height:1.3!important}

/* ---- TESTIMONIALS ---- */
.testimonial-shell{margin-bottom:40px}
.tst-wrap{
  max-width:700px;margin:0 auto;text-align:center;min-height:220px;
  display:flex;flex-direction:column;align-items:center;justify-content:center
}
.tst-icon{
  width:44px;height:44px;background:${c.warmBg};
  border:1px solid rgba(201,149,107,.2);border-radius:12px;
  display:flex;align-items:center;justify-content:center;margin:0 auto 28px;color:${c.warm}
}
.tst-quote{
  font-family:var(--font-instrument-serif),Georgia,serif;
  font-size:clamp(22px,3vw,30px);line-height:1.38;letter-spacing:-.02em;
  color:${c.ink};margin-bottom:24px;transition:opacity .25s,transform .25s
}
.tst-attr{
  font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.09em;
  color:${c.muted};display:flex;align-items:center;justify-content:center;gap:8px
}
.tst-attr-name{color:${c.warmDk}}
.tst-dots{display:flex;gap:6px;margin-top:28px;justify-content:center}
.tst-dot{
  width:7px;height:7px;border-radius:50%;background:rgba(0,0,0,.15);
  border:none;cursor:pointer;padding:0;transition:all .3s
}
.tst-dot.active{width:24px;border-radius:100px;background:${c.warmDk}}

/* ---- TRUST ---- */
.trust-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.trust-card{
  background:${c.white};border:1px solid ${c.border};border-radius:20px;padding:28px 24px;
  transition:transform .25s,border-color .25s
}
.trust-card:hover{transform:translateY(-3px);border-color:rgba(201,149,107,.35)}
.trust-top{display:flex;align-items:center;gap:12px;margin-bottom:14px}
.trust-num{
  font-family:var(--font-instrument-serif),Georgia,serif;
  font-size:26px;color:${c.warm};opacity:.6;line-height:1
}
.trust-icon-wrap{
  width:34px;height:34px;background:${c.warmBg};border-radius:9px;
  border:1px solid rgba(201,149,107,.2);display:flex;align-items:center;justify-content:center;
  color:${c.warmDk}
}
.trust-card h3{font-size:15px;font-weight:800;letter-spacing:-.02em;margin-bottom:8px}
.trust-card p{font-size:14px;color:${c.sub};line-height:1.68}

/* ---- PRICING ---- */
.pricing-grid{
  display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:1000px;margin:0 auto
}
.p-card{
  background:${c.white};border:1.5px solid ${c.border};border-radius:22px;padding:32px 28px;
  position:relative;display:flex;flex-direction:column;transition:transform .25s,box-shadow .25s
}
.p-card:hover{transform:translateY(-3px);box-shadow:0 16px 40px rgba(0,0,0,.07)}
.p-card.feat{border-color:${c.warm};box-shadow:0 0 0 1px ${c.warm}}
.p-badge{
  position:absolute;top:-13px;left:50%;transform:translateX(-50%);
  background:${c.ink};color:#fff;font-size:11px;font-weight:700;letter-spacing:.06em;
  text-transform:uppercase;padding:4px 14px;border-radius:100px;display:flex;
  align-items:center;gap:5px;white-space:nowrap
}
.p-badge-dot{
  width:5px;height:5px;background:${c.warm};border-radius:50%;
  box-shadow:0 0 0 3px rgba(201,149,107,.3)
}
.p-tier{
  font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
  color:${c.warmDk};margin-bottom:12px
}
.p-price{display:flex;align-items:baseline;gap:5px;margin-bottom:6px}
.p-amount{
  font-family:var(--font-instrument-serif),Georgia,serif;
  font-size:52px;line-height:1;letter-spacing:-.03em
}
.p-per{font-size:14px;color:${c.muted}}
.p-custom{
  font-family:var(--font-instrument-serif),Georgia,serif;
  font-size:42px;line-height:1;letter-spacing:-.02em;margin-bottom:4px
}
.p-custom-note{font-size:12px;color:${c.muted};margin-bottom:6px}
.p-desc{
  font-size:14px;color:${c.sub};line-height:1.6;padding-bottom:20px;
  border-bottom:1px solid ${c.border};margin-bottom:20px
}
.p-features{list-style:none;margin-bottom:28px;flex:1}
.p-features li{display:flex;align-items:center;gap:9px;font-size:14px;color:${c.sub};padding:5.5px 0}
.p-check{
  width:16px;height:16px;background:${c.greenBg};border-radius:50%;
  display:flex;align-items:center;justify-content:center;flex-shrink:0;color:${c.green}
}
.p-btn{width:100%;text-align:center;justify-content:center;display:flex}
.pricing-note{
  text-align:center;margin-top:24px;font-size:13px;color:${c.muted}
}
.pricing-note a{
  color:${c.ink};font-weight:700;text-decoration:underline;text-underline-offset:2px
}

/* ---- ONBOARDING ---- */
.ob-box{
  max-width:640px;margin:0 auto;
  background:${c.white};border:1px solid ${c.border};border-radius:24px;padding:48px 44px;text-align:center;
  box-shadow:0 4px 24px rgba(0,0,0,.05);
}
.ob-box h2{font-size:clamp(24px,3.5vw,38px);margin-bottom:14px}
.ob-box>p{font-size:16px;color:${c.sub};margin-bottom:28px;line-height:1.65}
.ob-form{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;position:relative}
.ob-input{
  flex:1;min-width:180px;padding:13px 18px;border-radius:100px;
  border:1.5px solid ${c.border};font-size:14px;background:${c.bg};
  color:${c.ink};outline:none;transition:border-color .15s;
}
.ob-input:focus{border-color:${c.warm}}
.ob-select{
  padding:13px 36px 13px 18px;border-radius:100px;border:1.5px solid ${c.border};
  font-size:14px;
  background:${c.bg};
  appearance:none;color:${c.ink};outline:none;cursor:pointer;transition:border-color .15s;
}
.ob-select:focus{border-color:${c.warm}}
.ob-submit{padding:13px 24px;border-radius:100px}
.agree-row{
  display:flex;align-items:flex-start;justify-content:center;gap:8px;
  margin-top:14px;font-size:12px;color:${c.muted};line-height:1.6
}
.agree-row input{margin-top:2px}
.agree-row a{color:${c.sub};text-decoration:underline;text-underline-offset:2px}
.form-ok{
  margin-top:14px;background:${c.greenBg};color:${c.green};
  border-radius:12px;padding:13px;font-size:13.5px;font-weight:600
}
.form-er{
  margin-top:14px;background:${c.redBg};color:${c.red};
  border-radius:12px;padding:13px;font-size:13.5px;font-weight:600
}

/* ---- FAQ ---- */
.faq-head a{color:${c.ink};font-weight:700;text-decoration:underline;text-underline-offset:2px}
.faq-wrap{max-width:720px;margin:0 auto}
.fq-item{border-bottom:1px solid ${c.border}}
.fq-btn{
  width:100%;background:none;border:none;cursor:pointer;
  display:flex;align-items:center;justify-content:space-between;gap:16px;
  padding:22px 0;text-align:left;font-family:inherit;font-size:16px;font-weight:700;
  color:${c.ink};letter-spacing:-.015em;transition:color .15s;
}
.fq-btn:hover{color:${c.warmDk}}
.fq-icon{
  width:28px;height:28px;border-radius:8px;background:${c.bg2};border:1px solid ${c.border};
  display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .2s;
}
.fq-icon span{
  font-size:18px;font-weight:300;color:${c.sub};line-height:1;display:flex;
  align-items:center;justify-content:center;transition:transform .28s
}
.fq-item.open .fq-icon{background:${c.ink};border-color:${c.ink}}
.fq-item.open .fq-icon span{color:#fff;transform:rotate(180deg)}
.fq-answer{max-height:0;overflow:hidden;transition:max-height .35s ease}
.fq-answer-inner{padding-bottom:22px;font-size:15px;color:${c.sub};line-height:1.75}
.fq-item.open .fq-answer{max-height:220px}

/* ---- FUTURE ---- */
.future-section{padding-bottom:48px}
.future-block{max-width:600px}

/* ---- FINAL CTA ---- */
.final-cta{background:${c.dark};padding:96px 32px;text-align:center}
.final-cta h2{
  color:#fff;max-width:640px;margin:0 auto 18px;
  font-family:var(--font-instrument-serif),Georgia,serif;
  font-size:clamp(30px,4.5vw,52px);line-height:1.08;letter-spacing:-.03em
}
.final-cta p{
  font-size:17px;color:rgba(255,255,255,.5);max-width:480px;margin:0 auto 36px;line-height:1.7
}
.final-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.btn-white{
  display:inline-flex;align-items:center;gap:7px;background:#fff;color:${c.ink};
  font-size:16px;font-weight:700;padding:14px 30px;border-radius:100px;border:none;
  cursor:pointer;transition:all .2s;letter-spacing:-.01em
}
.btn-white:hover{background:${c.bg2};transform:translateY(-1px)}
.btn-outline-white{
  display:inline-flex;align-items:center;gap:7px;background:transparent;color:rgba(255,255,255,.8);
  font-size:16px;font-weight:700;padding:13px 30px;border-radius:100px;
  border:1.5px solid rgba(255,255,255,.2);cursor:pointer;transition:all .2s;letter-spacing:-.01em
}
.btn-outline-white:hover{border-color:rgba(255,255,255,.5);transform:translateY(-1px)}

/* ---- FOOTER ---- */
footer{background:${c.dark};border-top:1px solid rgba(255,255,255,.06);padding:60px 32px 36px}
.ft-inner{max-width:1100px;margin:0 auto}
.ft-top{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:48px;margin-bottom:48px}
.ft-brand-logo{display:flex;align-items:center;gap:9px;margin-bottom:16px}
.ft-lm{
  width:28px;height:28px;background:rgba(255,255,255,.92);border-radius:7px;
  border:1px solid rgba(255,255,255,.12);
  display:flex;align-items:center;justify-content:center
}
.ft-ln{
  font-family:var(--font-instrument-serif),Georgia,serif;
  font-size:18px;color:rgba(255,255,255,.85)
}
.ft-tagline{font-size:13.5px;color:rgba(255,255,255,.35);line-height:1.7}
.ft-col-title{
  font-size:10.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
  color:rgba(255,255,255,.35);margin-bottom:14px
}
.ft-link{display:block;font-size:14px;color:rgba(255,255,255,.45);padding:4px 0;transition:color .15s}
.ft-link:hover{color:rgba(255,255,255,.85)}
.ft-bottom{
  border-top:1px solid rgba(255,255,255,.07);padding-top:24px;
  display:flex;justify-content:space-between;align-items:flex-start;gap:24px;flex-wrap:wrap
}
.ft-copy{font-size:12px;color:rgba(255,255,255,.3)}
.ft-disc{
  font-size:12px;color:rgba(255,255,255,.2);max-width:540px;text-align:right;line-height:1.6
}

/* ---- MODAL ---- */
.modO{
  position:fixed;inset:0;z-index:220;background:rgba(9,10,13,.55);
  backdrop-filter:blur(18px);display:flex;align-items:center;justify-content:center;padding:14px
}
.modB{
  width:100%;max-width:420px;background:#fff;border:1px solid ${c.border};border-radius:24px;
  padding:30px;box-shadow:0 20px 50px rgba(0,0,0,.18);text-align:center
}
.modSeal{
  width:54px;height:54px;border-radius:999px;background:linear-gradient(135deg,#FFF8F0,#ECFDF3);
  border:1px solid rgba(34,197,94,.14);display:flex;align-items:center;justify-content:center;
  margin:0 auto 16px;color:${c.green}
}
.modTi{
  font-family:var(--font-instrument-serif),Georgia,serif;
  font-size:clamp(24px,4.5vw,30px);letter-spacing:-.045em
}
.modBd{margin-top:8px;color:${c.sub};font-size:14px;line-height:1.68}
.modRef{
  margin-top:20px;padding:15px;border-radius:14px;background:rgba(29,78,216,.03);
  border:1px solid rgba(29,78,216,.08)
}
.modRefLbl{
  font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;
  color:${c.muted};margin-bottom:8px
}
.modRefBox{
  display:flex;align-items:center;gap:6px;background:#fff;border:1px solid ${c.border};
  border-radius:8px;padding:7px 9px
}
.modRefUrl{
  flex:1;font-size:12px;color:${c.sub};font-weight:500;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:left
}
.modRefCp{
  width:32px;height:32px;border-radius:7px;background:${c.blueBg};
  border:1px solid rgba(29,78,216,.1);color:${c.blue};display:flex;
  align-items:center;justify-content:center;cursor:pointer;flex-shrink:0
}
.modClose{
  margin-top:14px;background:none;border:none;color:${c.muted};
  font-size:12px;font-weight:600;cursor:pointer
}

/* ---- RESPONSIVE ---- */
@media(max-width:1024px){
  .ws-body{grid-template-columns:220px 1fr}
  .ws-detail{display:none}
  .audience-grid{grid-template-columns:repeat(2,1fr)}
  .trust-grid{grid-template-columns:repeat(2,1fr)}
  .stats-grid{grid-template-columns:repeat(2,1fr)}
  .ft-top{grid-template-columns:1fr 1fr}
}
@media(max-width:720px){
  nav .nav-inner{padding:0 16px}
  .nav-links{display:none}
  .hero,.workspace-section,.dark-section,section.pad,.pain-section,.final-cta,footer{padding-left:20px;padding-right:20px}
  h1{font-size:clamp(36px,12vw,54px);line-height:1.02}
  .how-grid,.benefit-grid,.pricing-grid{grid-template-columns:1fr}
  .audience-grid,.trust-grid{grid-template-columns:1fr}
  .stats-grid{grid-template-columns:repeat(2,1fr)}
  .ws-body{grid-template-columns:1fr}
  .ws-sb{display:none}
  .ft-top{grid-template-columns:1fr;gap:28px}
  .ft-disc{text-align:left}
  .ob-box{padding:32px 22px}
  .ob-form{flex-direction:column}
  .agree-row{align-items:flex-start;text-align:left}
  .ob-submit{width:100%}
  .infra-logo-card{
    min-width:150px;
    height:66px;
    padding:0 18px;
  }
  .infra-logo-img{
    height:24px;
    max-width:108px;
  }
}
`;