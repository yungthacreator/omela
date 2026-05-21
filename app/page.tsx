"use client";

import Link from "next/link";
import { Inter } from "next/font/google";
import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  Check,
  ChevronDown,
  ClipboardCheck,
  Copy,
  FileText,
  History,
  LockKeyhole,
  PhoneCall,
  RefreshCw,
  ShieldCheck,
  UserRound,
  UserRoundCheck,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

type Role = "self" | "carer" | "household" | "care_team" | "pharmacy" | "other";

type Resident = {
  id: string;
  initials: string;
  name: string;
  psw: string;
  medicine: string;
  rx: string;
  status: "Needs follow-up" | "Request sent" | "Ready to collect" | "Due soon";
  statusTone: "danger" | "info" | "success" | "warning";
  summaryStatus: "Needs action" | "In progress" | "Ready";
  owner: string;
  worker: string;
  practice: string;
  pharmacy: string;
  next: string;
  supply: number;
  progress: number;
  timeline: { done: boolean; label: string; meta: string }[];
  activity: { text: string; time: string; icon: "check" | "bell" | "phone" }[];
};

type Feature = {
  icon: LucideIcon;
  title: string;
  copy: string;
  bullets: string[];
};

type BrandLogo = {
  src: string;
  alt: string;
};

type Audience = {
  title: string;
  label: string;
  image: string;
  copy: string;
  track: string;
};

type PainMessage = {
  speaker: string;
  text: string;
  side: "left" | "right";
};

const RESIDENTS: Resident[] = [
  {
    id: "margaret",
    initials: "ML",
    name: "Margaret Littlewood",
    psw: "PSW1",
    medicine: "Amlodipine 5mg",
    rx: "RX-20814",
    status: "Needs follow-up",
    statusTone: "danger",
    summaryStatus: "Needs action",
    owner: "Ada Kelly",
    worker: "Tomi Adebayo",
    practice: "Greenfield Medical",
    pharmacy: "Boots, High Street",
    next: "Call Greenfield Medical to confirm whether the request was approved.",
    supply: 2,
    progress: 58,
    timeline: [
      { done: true, label: "Reminder sent", meta: "Today 08:10" },
      { done: true, label: "Request prepared", meta: "Today 08:18" },
      { done: true, label: "Sent to practice", meta: "Today 08:26" },
      { done: false, label: "Awaiting response", meta: "Now" },
    ],
    activity: [
      { text: "Tomi updated Margaret’s note", time: "Now", icon: "check" },
      { text: "Follow-up reminder scheduled", time: "12m", icon: "bell" },
      { text: "Practice contact added", time: "38m", icon: "phone" },
    ],
  },
  {
    id: "david",
    initials: "DR",
    name: "David Reyes",
    psw: "PSW2",
    medicine: "Metformin 500mg",
    rx: "RX-20831",
    status: "Request sent",
    statusTone: "info",
    summaryStatus: "In progress",
    owner: "James Otieno",
    worker: "Ben Carter",
    practice: "Northgate Surgery",
    pharmacy: "Well, Market Square",
    next: "Wait for the practice to confirm approval before updating the pharmacy.",
    supply: 8,
    progress: 68,
    timeline: [
      { done: true, label: "Reminder sent", meta: "Mon 09:02" },
      { done: true, label: "Request prepared", meta: "Mon 09:10" },
      { done: true, label: "Sent to practice", meta: "Mon 09:18" },
      { done: false, label: "Awaiting approval", meta: "Now" },
    ],
    activity: [
      { text: "Ben sent David’s request", time: "Now", icon: "check" },
      { text: "Practice note added", time: "19m", icon: "phone" },
      { text: "Timeline reviewed", time: "44m", icon: "bell" },
    ],
  },
  {
    id: "irene",
    initials: "IK",
    name: "Irene Kowalski",
    psw: "PSW3",
    medicine: "Sertraline 50mg",
    rx: "RX-20806",
    status: "Ready to collect",
    statusTone: "success",
    summaryStatus: "Ready",
    owner: "James Kowalski",
    worker: "Maya Singh",
    practice: "Hillside Practice",
    pharmacy: "Boots, High Street",
    next: "Collection window is open until 6pm.",
    supply: 14,
    progress: 92,
    timeline: [
      { done: true, label: "Request prepared", meta: "Fri 14:20" },
      { done: true, label: "Sent to practice", meta: "Mon 09:03" },
      { done: true, label: "Dispensed", meta: "Today 11:20" },
      { done: true, label: "Ready at pharmacy", meta: "Today 12:44" },
    ],
    activity: [
      { text: "Maya updated Irene’s timeline", time: "Now", icon: "check" },
      { text: "Collection reminder sent", time: "14m", icon: "bell" },
      { text: "Pharmacy status confirmed", time: "42m", icon: "phone" },
    ],
  },
  {
    id: "samuel",
    initials: "SW",
    name: "Samuel Wright",
    psw: "PSW4",
    medicine: "Apixaban 5mg",
    rx: "RX-20901",
    status: "Due soon",
    statusTone: "warning",
    summaryStatus: "Needs action",
    owner: "Clara Moss",
    worker: "Ben Carter",
    practice: "Riverbank Surgery",
    pharmacy: "Lloyds, Station Road",
    next: "Confirm the medication list before noon.",
    supply: 4,
    progress: 42,
    timeline: [
      { done: true, label: "Cycle detected", meta: "Today 08:10" },
      { done: true, label: "Reminder sent", meta: "Today 08:11" },
      { done: false, label: "Confirm medication list", meta: "Today" },
      { done: false, label: "Prepare request", meta: "Next" },
    ],
    activity: [
      { text: "Ben updated Samuel’s timeline", time: "Now", icon: "check" },
      { text: "Follow-up reminder sent", time: "14m", icon: "bell" },
      { text: "Practice note added", time: "42m", icon: "phone" },
    ],
  },
];

const BRAND_LOGOS: BrandLogo[] = [
  { src: "/logos/stripe.svg", alt: "Stripe" },
  { src: "/logos/twilio.svg", alt: "Twilio" },
  { src: "/logos/microsoft-logo.png", alt: "Microsoft" },
  { src: "/logos/google-logo.png", alt: "Google" },
  { src: "/logos/aws-logo.png", alt: "AWS" },
];

const LOGO_LOOP = [...BRAND_LOGOS, ...BRAND_LOGOS, ...BRAND_LOGOS];

const FEATURES: Feature[] = [
  {
    icon: FileText,
    title: "Request preparation",
    copy: "Prepare care admin requests with the person, context, owner, notes, and next step in one place.",
    bullets: ["Person details", "Request context", "Notes", "Family-ready update"],
  },
  {
    icon: UserRoundCheck,
    title: "Ownership",
    copy: "Make it obvious who is responsible for the next step, so follow-up does not sit in someone’s memory.",
    bullets: ["Named owner", "Support worker", "Handover clarity", "Reminder routing"],
  },
  {
    icon: ClipboardCheck,
    title: "Status tracking",
    copy: "See whether a request is due, prepared, sent, acknowledged, delayed, approved, or ready.",
    bullets: ["Due soon", "Sent", "In progress", "Ready"],
  },
  {
    icon: History,
    title: "Shared timeline",
    copy: "Keep the full trail visible, so families, managers, and support workers do not reconstruct it from memory.",
    bullets: ["Every update", "Every owner", "Every status", "Every next step"],
  },
];

const WORKFLOW = [
  ["01", "Spot what needs attention", "Omela shows what is due before anyone has to chase."],
  ["02", "Prepare the request", "The person, context, notes, and next step stay together."],
  ["03", "Assign ownership", "Everyone can see who owns the next action."],
  ["04", "Track until complete", "The request stays visible until the work is done."],
];

const PAIN_MESSAGES: PainMessage[] = [
  { speaker: "Family carer", text: "Did you call the GP yet?", side: "left" },
  { speaker: "Support worker", text: "I thought you were handling it.", side: "right" },
  { speaker: "Pharmacy", text: "We have not received the request.", side: "left" },
  { speaker: "Family carer", text: "She only has two days left.", side: "right" },
];

const TEAMS: Audience[] = [
  {
    title: "Family carers",
    label: "For families",
    image: "/audiences/family-carers.png",
    copy: "Coordinate care admin for a parent, partner, or relative without carrying every reminder alone.",
    track: "Reminders, ownership, status, collection",
  },
  {
    title: "Residential care",
    label: "For care homes",
    image: "/audiences/residential-care.png",
    copy: "Give managers and staff one shared view of what is due, ready, waiting, or needs follow-up.",
    track: "Residents, handovers, staff notes, timelines",
  },
  {
    title: "Supported living",
    label: "For support teams",
    image: "/audiences/supported-living.png",
    copy: "Help support workers and service managers stay aligned around each person’s next action.",
    track: "People supported, PSWs, next actions, updates",
  },
  {
    title: "Community pharmacies",
    label: "For pharmacies",
    image: "/audiences/community-pharmacy.png",
    copy: "Understand incoming prescription work with clearer context and fewer chasing calls.",
    track: "Collection status, request context, follow-up",
  },
];

const TESTIMONIALS = [
  ["Family carer", "Before Omela, three of us were chasing the same prescription. Now we can see who owns the next step."],
  ["Care team lead", "The timeline makes handovers much easier. Staff do not have to reconstruct what happened from memory."],
  ["Service manager", "I can see what each support worker owns before it becomes a missed follow-up."],
  ["Pharmacy manager", "It gives us a clearer way to understand what is ready, delayed, or waiting on a response."],
  ["Supported living manager", "The biggest change is accountability. Every request has a person responsible for the next action."],
];

const PRICING = [
  {
    name: "Personal",
    price: "£7",
    suffix: "/month",
    copy: "For one person managing their own repeat prescription and care admin follow-through.",
    features: ["1 profile", "Repeat prescription reminders", "Request status tracking", "Personal timeline", "Email reminders"],
    cta: "Get started",
    href: "#waitlist",
  },
  {
    name: "Family",
    price: "£14",
    suffix: "/month",
    copy: "For households and family carers coordinating repeat prescriptions for someone else.",
    features: ["Up to 4 profiles", "Shared family access", "Ownership assignment", "Timeline and activity history", "Pharmacy and practice notes"],
    cta: "Get started",
    href: "#waitlist",
    featured: true,
  },
  {
    name: "Team",
    price: "£49",
    suffix: "/month",
    copy: "For care teams, supported living teams, and small operators managing multiple people.",
    features: ["Up to 25 profiles", "Shared workspace", "Staff roles", "Activity feed", "Audit trail", "Priority onboarding"],
    cta: "Get started",
    href: "#waitlist",
  },
  {
    name: "Organisation",
    price: "Custom",
    suffix: "",
    copy: "For multi-site providers, pharmacy groups, and larger care organisations.",
    features: ["Unlimited profiles", "Custom onboarding", "Advanced roles", "Data processing agreement", "Priority support"],
    cta: "Talk to us",
    href: "mailto:hello@omela.ai?subject=Omela%20organisation%20demo",
  },
];

const FAQS = [
  ["Is Omela a prescribing tool?", "No. Omela helps coordinate care admin. It does not prescribe, diagnose, or make medical decisions."],
  ["Does Omela replace my GP or pharmacy system?", "No. Omela sits around the workflow as a coordination layer. GP and pharmacy systems remain the systems of record."],
  ["Why start with repeat prescriptions?", "Repeat prescriptions are a painful recurring workflow for families, carers, care teams, and pharmacies. Omela starts there, then expands into other care admin requests that need follow-through."],
  ["Who is Omela for?", "Omela is for individuals, family carers, care teams, supported living teams, and pharmacies who need clearer follow-through."],
];

function Logo() {
  return (
    <span className="logo" aria-label="Omela">
      <img src="/omela-logo-mark.png" alt="" className="logo-img" />
      <span>Omela</span>
    </span>
  );
}

function SectionPill({ children }: { children: ReactNode }) {
  return <span className="section-pill">{children}</span>;
}

function DoubleUnderline({ children }: { children: ReactNode }) {
  return <span className="double-underline">{children}</span>;
}

function StatusPill({ tone, children }: { tone: Resident["statusTone"]; children: ReactNode }) {
  return <span className={`status-pill ${tone}`}>{children}</span>;
}

function PersonAvatar({ initials }: { initials: string }) {
  return (
    <span className="person-avatar">
      <UserRound size={12} />
      <strong>{initials}</strong>
    </span>
  );
}

function ActivityIcon({ icon }: { icon: Resident["activity"][number]["icon"] }) {
  if (icon === "bell") return <Bell size={13} />;
  if (icon === "phone") return <PhoneCall size={13} />;
  return <Check size={13} />;
}

function SuccessModal({
  open,
  referralCode,
  onClose,
}: {
  open: boolean;
  referralCode: string;
  onClose: () => void;
}) {
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && referralCode) {
      setShareUrl(`${window.location.origin}?ref=${referralCode}`);
    }
  }, [referralCode]);

  async function copy() {
    if (!shareUrl) return;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1300);
  }

  if (!open) return null;

  return (
    <div className="modal" onClick={onClose} role="presentation">
      <div className="modal-card" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true">
        <span className="modal-icon">
          <Check size={19} />
        </span>
        <h3>You are on the list.</h3>
        <p>We will use this to guide your Omela setup and send the next step.</p>

        {shareUrl ? (
          <div className="share">
            <span>{shareUrl.replace("https://", "").replace("http://", "")}</span>
            <button type="button" onClick={copy} aria-label="Copy referral link">
              {copied ? <Check size={15} /> : <Copy size={15} />}
            </button>
          </div>
        ) : null}

        <button type="button" className="modal-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

function OperationsDemo({
  active,
  setActive,
}: {
  active: number;
  setActive: (index: number) => void;
}) {
  const resident = RESIDENTS[active];

  const summaryCounts = {
    needsAction: RESIDENTS.filter((item) => item.summaryStatus === "Needs action").length,
    inProgress: RESIDENTS.filter((item) => item.summaryStatus === "In progress").length,
    ready: RESIDENTS.filter((item) => item.summaryStatus === "Ready").length,
  };

  return (
    <div className="hero-frame">
      <div className="hero-frame-inner">
        <div className="workspace-chrome">
          <div className="chrome-dots" aria-hidden="true">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
          </div>
          <div className="chrome-url">omela.ai / workspace / care-team</div>
          <div className="chrome-status">
            <span />
            Live workspace
          </div>
        </div>

        <div className="mobile-resident-strip">
          {RESIDENTS.map((person, index) => (
            <button type="button" key={person.rx} className={active === index ? "active" : ""} onClick={() => setActive(index)}>
              <PersonAvatar initials={person.initials} />
              <span>
                <strong>{person.name.split(" ")[0]}</strong>
                <em>{person.psw}</em>
              </span>
            </button>
          ))}
        </div>

        <div className="ops-room">
          <div className="ops-glow" />

          <aside className="ops-panel people-panel">
            <div className="panel-title">
              <span>People supported</span>
              <strong>{RESIDENTS.length}</strong>
            </div>

            <div className="people-list">
              {RESIDENTS.map((person, index) => (
                <button type="button" key={person.rx} className={active === index ? "active" : ""} onClick={() => setActive(index)}>
                  <PersonAvatar initials={person.initials} />
                  <span className="person-copy">
                    <span className="name-line">
                      <strong>{person.name.split(" ")[0]}</strong>
                      <em>{person.psw}</em>
                    </span>
                    <small>{person.medicine}</small>
                    <StatusPill tone={person.statusTone}>{person.status}</StatusPill>
                  </span>
                </button>
              ))}
            </div>
          </aside>

          <section className="ops-panel request-panel">
            <div className="request-head">
              <div>
                <span className="micro-label">Current request</span>
                <h3>{resident.name}</h3>
                <p>
                  {resident.medicine} · {resident.rx}
                </p>
              </div>
              <StatusPill tone={resident.statusTone}>{resident.status}</StatusPill>
            </div>

            <div className="next-action">
              <span>Next action</span>
              <strong>{resident.next}</strong>
            </div>

            <div className="tracking-row">
              <div>
                <span>Owner</span>
                <strong>{resident.owner}</strong>
              </div>
              <div>
                <span>Support worker</span>
                <strong>{resident.worker}</strong>
              </div>
              <div>
                <span>Supply left</span>
                <strong>{resident.supply} days</strong>
              </div>
            </div>

            <div className="timeline-card">
              <div className="timeline-top">
                <span>Timeline</span>
                <strong>{resident.progress}% complete</strong>
              </div>
              <div className="progress">
                <i style={{ width: `${resident.progress}%` }} />
              </div>

              <div className="timeline-list">
                {resident.timeline.map((item) => (
                  <div key={item.label} className="timeline-item">
                    <span className={item.done ? "done" : ""}>{item.done ? <Check size={10} /> : null}</span>
                    <div>
                      <strong>{item.label}</strong>
                      <small>{item.meta}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside className="ops-panel omela-panel">
            <div className="omela-status">
              <span>
                <RefreshCw size={15} />
              </span>
              <div>
                <strong>Omela</strong>
                <p>Checking owner, timeline, practice note, and pharmacy status.</p>
              </div>
            </div>

            <div className="manager-stats">
              <div>
                <strong>{summaryCounts.needsAction}</strong>
                <span>Needs action</span>
              </div>
              <div>
                <strong>{summaryCounts.inProgress}</strong>
                <span>In progress</span>
              </div>
              <div>
                <strong>{summaryCounts.ready}</strong>
                <span>Ready</span>
              </div>
            </div>

            <div className="activity-feed">
              <span>Recent activity</span>
              {resident.activity.map((item) => (
                <p key={`${item.text}-${item.time}`}>
                  <ActivityIcon icon={item.icon} />
                  {item.text}
                  <small>{item.time}</small>
                </p>
              ))}
            </div>
          </aside>
        </div>
      </div>

      <div className="resident-tabs">
        {RESIDENTS.map((person, index) => (
          <button type="button" key={person.rx} className={active === index ? "active" : ""} onClick={() => setActive(index)}>
            <PersonAvatar initials={person.initials} />
            <span>
              <strong>{person.name.split(" ")[0]}</strong>
              <em>{person.psw}</em>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function LogoMarquee() {
  return (
    <section className="trust-strip">
      <p>Built on infrastructure trusted by modern care teams</p>
      <div className="logo-marquee" aria-label="Trusted infrastructure logos">
        <div className="logo-track">
          {LOGO_LOOP.map((logo, index) => (
            <span key={`${logo.alt}-${index}`} className="brand-logo-cell">
              <img src={logo.src} alt={logo.alt} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureShowcase() {
  const [active, setActive] = useState(0);
  const feature = FEATURES[active];
  const Icon = feature.icon;

  useEffect(() => {
    const interval = window.setInterval(() => setActive((current) => (current + 1) % FEATURES.length), 4200);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="feature-showcase" id="product">
      <div className="feature-intro">
        <div>
          <h2>
            Inspired by care. Designed for <DoubleUnderline>follow-through</DoubleUnderline>.
          </h2>
        </div>
        <p>Omela is a calm workspace for care admin that usually gets scattered across calls, messages, notes, and memory.</p>
      </div>

      <div className="feature-stage">
        <aside className="feature-tabs" aria-label="Product features">
          {FEATURES.map((item, index) => {
            const TabIcon = item.icon;
            return (
              <button type="button" key={item.title} className={active === index ? "active" : ""} onClick={() => setActive(index)}>
                <span>
                  <TabIcon size={17} />
                </span>
                <strong>{item.title}</strong>
                <small>{item.copy}</small>
              </button>
            );
          })}
        </aside>

        <div className="feature-visual">
          <div className="feature-visual-head">
            <span>
              <Icon size={18} />
            </span>
            <div>
              <h3>{feature.title}</h3>
              <p>{feature.copy}</p>
            </div>
          </div>

          <div className="feature-mini-ui">
            <div className="mini-sidebar">
              <span />
              <span />
              <span />
            </div>

            <div className="mini-main">
              <div className="mini-row large-row">
                <strong>{feature.title}</strong>
                <em>Live</em>
              </div>

              {feature.bullets.map((bullet, index) => (
                <div className="mini-row" key={bullet}>
                  <span className="mini-check">
                    <Check size={11} />
                  </span>
                  <p>{bullet}</p>
                  <small>{index === 0 ? "Now" : `${index + 2}m`}</small>
                </div>
              ))}

              <div className="mini-note">Omela prepares a clear update for everyone with access.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TypewriterMessages() {
  const [active, setActive] = useState(0);
  const [typed, setTyped] = useState("");
  const [visible, setVisible] = useState<boolean[]>([false, false, false, false]);

  useEffect(() => {
    const text = PAIN_MESSAGES[active].text;
    setTyped("");
    let index = 0;

    setVisible((current) => {
      if (active === 0) return [true, false, false, false];
      const next = [...current];
      next[active] = true;
      return next;
    });

    const typing = window.setInterval(() => {
      index += 1;
      setTyped(text.slice(0, index));
      if (index >= text.length) window.clearInterval(typing);
    }, 30);

    const next = window.setTimeout(() => {
      setActive((current) => {
        const newIndex = (current + 1) % PAIN_MESSAGES.length;
        if (newIndex === 0) setVisible([false, false, false, false]);
        return newIndex;
      });
    }, 2450);

    return () => {
      window.clearInterval(typing);
      window.clearTimeout(next);
    };
  }, [active]);

  return (
    <div className="message-panel" aria-label="Care admin conversation preview">
      {PAIN_MESSAGES.map((message, index) => {
        const isActive = index === active;
        const shouldShow = visible[index] || isActive;
        const content = isActive ? typed : shouldShow ? message.text : "";

        return (
          <div key={message.text} className={`chat-slot ${message.side} ${shouldShow ? "show" : ""} ${isActive ? "active" : ""}`}>
            <div className="chat-bubble">
              <small>{message.speaker}</small>
              <span>{content || "\u00A0"}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function FAQAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <div className="faq-list">
      {FAQS.map(([question, answer], index) => (
        <div key={question} className={`faq-item ${open === index ? "open" : ""}`}>
          <button type="button" onClick={() => setOpen(open === index ? -1 : index)}>
            <span>{question}</span>
            <ChevronDown size={18} />
          </button>
          <div>
            <p>{answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Page() {
  const [activeResident, setActiveResident] = useState(2);
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("carer");
  const [website, setWebsite] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [refParam, setRefParam] = useState("");

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ref = new URLSearchParams(window.location.search).get("ref");
    if (ref) setRefParam(ref);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => setActiveResident((current) => (current + 1) % RESIDENTS.length), 5200);
    return () => window.clearInterval(interval);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!agreed) return;

    setSubmitting(true);
    setSuccess("");
    setError("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role, website, source: "landing-page", marketingOptIn: false, ref: refParam || undefined }),
      });

      const data = await response.json();

      if (!response.ok) {
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

      <SuccessModal open={modalOpen} referralCode={referralCode} onClose={() => setModalOpen(false)} />

      <div className={`${inter.variable} page`}>
        <header className="header">
          <div className="nav-shell">
            <Link href="/" className="logo-link" aria-label="Omela home">
              <Logo />
            </Link>

            <nav aria-label="Primary navigation">
              <a href="#product">Product</a>
              <a href="#teams">Resources</a>
              <a href="#pricing">Pricing</a>
            </nav>

            <div className="nav-actions">
              <Link href="/login" className="btn primary nav-signin">
                Sign in <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </header>

        <main>
          <section className="hero">
            <h1>
              The care admin workspace for <DoubleUnderline>every request</DoubleUnderline> that needs follow-through.
            </h1>
            <p>
              Omela starts with repeat prescriptions, giving families, carers, care teams, and pharmacies one shared place to
              prepare requests, assign ownership, track progress, and follow every update until it is complete.
            </p>

            <div className="hero-actions">
              <a href="#waitlist" className="btn primary hero-btn">
                Get started
              </a>
              <a href="#pricing" className="btn secondary hero-btn">
                Explore plans <ArrowRight size={16} />
              </a>
            </div>

            <OperationsDemo active={activeResident} setActive={setActiveResident} />
          </section>

          <LogoMarquee />

          <FeatureShowcase />

          <section className="section workflow" id="workflow">
            <div className="section-head center">
              <SectionPill>Workflow</SectionPill>
              <h2>
                From reminder to <DoubleUnderline>resolution</DoubleUnderline>.
              </h2>
              <p>
                Omela keeps the work visible from the first reminder to the final update, so nobody has to reconstruct what
                happened from calls, notes, and memory.
              </p>
            </div>

            <div className="workflow-grid">
              {WORKFLOW.map(([number, title, copy], index) => (
                <article key={title}>
                  <span className="step-number">{number}</span>
                  {index < WORKFLOW.length - 1 ? (
                    <span className="step-arrow">
                      <ArrowRight size={18} />
                    </span>
                  ) : null}
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="admin-stress">
            <div className="section-head center">
              <SectionPill>Real admin stress</SectionPill>
              <h2>
                Small gaps become <DoubleUnderline>stressful fast</DoubleUnderline>.
              </h2>
            </div>

            <TypewriterMessages />

            <p className="admin-stress-copy">
              A missed call, a handover note, or an update nobody shares can turn into avoidable stress. Omela keeps the
              request, owner, timeline, and next action in one shared place.
            </p>
          </section>

          <section className="section teams" id="teams">
            <div className="section-head center">
              <SectionPill>Who it is for</SectionPill>
              <h2>
                Built for the people carrying the <DoubleUnderline>follow-through</DoubleUnderline>.
              </h2>
            </div>

            <div className="teams-grid">
              {TEAMS.map((team) => (
                <article className="team-card" key={team.title}>
                  <div className="team-image">
                    <img src={team.image} alt={team.title} loading="lazy" />
                    <span>{team.label}</span>
                  </div>

                  <div className="team-copy">
                    <h3>{team.title}</h3>
                    <p>{team.copy}</p>

                    <div className="team-track">
                      <span>What they track</span>
                      <strong>{team.track}</strong>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="testimonials">
            <div className="section-head center">
              <SectionPill>What Omela users are saying</SectionPill>
              <h2>
                Clearer handovers. Calmer <DoubleUnderline>follow-through</DoubleUnderline>.
              </h2>
            </div>

            <div className="testimonial-marquee">
              <div>
                {[...TESTIMONIALS, ...TESTIMONIALS].map(([roleName, quote], index) => (
                  <article key={`${roleName}-${index}`}>
                    <p>
                      “<em>{quote}</em>”
                    </p>
                    <span>{roleName}</span>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="safe-section">
            <div className="safe-bg" />
            <div className="safe-content">
              <h2>Safe, clear, and accountable.</h2>
              <p>
                Omela coordinates care admin. It does not diagnose, prescribe, replace clinical judgement, or replace GP,
                pharmacy, or provider systems.
              </p>
              <div className="safe-badges">
                <span>
                  <ShieldCheck size={17} /> Role-based visibility
                </span>
                <span>
                  <History size={17} /> Activity trail
                </span>
                <span>
                  <LockKeyhole size={17} /> Minimum data
                </span>
              </div>
            </div>
          </section>

          <section className="section trust-boundaries">
            <div className="section-head center">
              <SectionPill>Trust and boundaries</SectionPill>
              <h2>
                Built on trust. Designed with <DoubleUnderline>limits</DoubleUnderline>.
              </h2>
              <p>Omela is a coordination layer, not a clinical record, triage tool, diagnosis tool, or prescribing system.</p>
            </div>

            <div className="boundary-grid">
              {[
                ["Coordination layer", "Ownership, status, and follow-up stay visible without becoming the clinical system of record."],
                ["Role-based visibility", "Families, carers, teams, and pharmacies only see workflow details relevant to their role."],
                ["Clear audit trail", "Every status change, owner change, and follow-up action is recorded with context."],
                ["Minimum data", "Omela asks only for information needed to move the request forward."],
              ].map(([title, copy], index) => (
                <article key={title}>
                  <span>0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section pricing" id="pricing">
            <div className="section-head center">
              <SectionPill>Pricing</SectionPill>
              <h2>
                Simple plans for families and <DoubleUnderline>care teams</DoubleUnderline>.
              </h2>
              <p>Start with the level of coordination you need. Every plan is designed around care admin follow-through.</p>
            </div>

            <div className="pricing-grid">
              {PRICING.map((plan) => (
                <article className={`price-card ${plan.featured ? "featured" : ""}`} key={plan.name}>
                  {plan.featured ? <em>Most common</em> : null}
                  <h3>{plan.name}</h3>
                  <div className="price-line">
                    <strong>{plan.price}</strong>
                    {plan.suffix ? <span>{plan.suffix}</span> : null}
                  </div>
                  <p>{plan.copy}</p>
                  <ul>
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <Check size={14} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a href={plan.href} className={`btn ${plan.featured ? "primary" : "secondary"}`}>
                    {plan.cta}
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section className="waitlist" id="waitlist">
            <div className="waitlist-card">
              <div className="waitlist-copy">
                <SectionPill>Get started</SectionPill>
                <h2>
                  Start with one <DoubleUnderline>care admin</DoubleUnderline> workflow.
                </h2>
                <p>Tell us who you coordinate for. We will use this to guide your setup and show the most relevant plan.</p>
                <div className="waitlist-steps">
                  <span>1. Choose your role</span>
                  <span>2. Join the pilot list</span>
                  <span>3. Get setup guidance</span>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <label>
                  <span>Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </label>

                <label>
                  <span>Your role</span>
                  <select value={role} onChange={(event) => setRole(event.target.value as Role)}>
                    <option value="self">I manage my own care admin</option>
                    <option value="carer">I manage for a family member</option>
                    <option value="household">I manage across my household</option>
                    <option value="care_team">I work in a care team</option>
                    <option value="pharmacy">I work in a pharmacy</option>
                    <option value="other">Something else</option>
                  </select>
                </label>

                <input
                  className="honeypot"
                  type="text"
                  name="website"
                  value={website}
                  onChange={(event) => setWebsite(event.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <label className="checkbox">
                  <input type="checkbox" checked={agreed} onChange={(event) => setAgreed(event.target.checked)} required />
                  <span>
                    I agree to Omela’s <Link href="/privacy">Privacy</Link> and <Link href="/terms">Terms</Link>.
                  </span>
                </label>

                <button className="btn primary" type="submit" disabled={!mounted || submitting || !agreed}>
                  {submitting ? "Submitting..." : "Get started"}
                </button>

                {success ? <p className="ok">{success}</p> : null}
                {error ? <p className="err">{error}</p> : null}
              </form>
            </div>
          </section>

          <section className="section faq" id="faq">
            <div className="section-head center">
              <SectionPill>FAQ</SectionPill>
              <h2>Questions before using Omela.</h2>
            </div>
            <FAQAccordion />
          </section>

          <section className="final-cta">
            <h2>
              Ready to stop chasing <DoubleUnderline>every update</DoubleUnderline>?
            </h2>
            <p>Start with repeat prescriptions, then build toward the wider care admin work your team already manages.</p>
            <a href="#waitlist" className="btn primary hero-btn">
              Get started
            </a>
          </section>
        </main>

        <footer className="site-footer">
          <div className="footer-shell">
            <h2>The care admin workspace for every request that needs follow-through.</h2>

            <div className="footer-main">
              <div className="footer-brand">
                <Logo />

                <div className="footer-address">
                  <p>United Kingdom</p>
                  <p>San Francisco, CA</p>
                </div>

                <a className="footer-email" href="mailto:hello@omela.ai">
                  hello@omela.ai
                </a>

                <div className="social-links" aria-label="Social links">
                  <a href="https://x.com/joinomela" target="_blank" rel="noreferrer" aria-label="Follow Omela on X">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M13.8 10.47 21.14 2h-1.74l-6.37 7.35L7.94 2H2.07l7.7 11.12L2.07 22h1.74l6.73-7.76L15.92 22h5.87l-7.99-11.53Zm-2.38 2.74-.78-1.11L4.44 3.3h2.66l5.01 7.11.78 1.11 6.51 9.25h-2.66l-5.32-7.56Z" />
                    </svg>
                    <span>Follow us on X</span>
                    <span className="social-arrow">
                      <ArrowUpRight size={13} />
                    </span>
                  </a>

                  <a
                    href="https://www.linkedin.com/company/joinomela"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Follow Omela on LinkedIn"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5ZM3 9.5h3.96V21H3V9.5Zm6.23 0h3.79v1.57h.05c.53-.95 1.82-1.95 3.74-1.95 4 0 4.74 2.63 4.74 6.05V21h-3.96v-5.17c0-1.23-.02-2.82-1.72-2.82-1.72 0-1.98 1.34-1.98 2.73V21H9.23V9.5Z" />
                    </svg>
                    <span>LinkedIn</span>
                    <span className="social-arrow">
                      <ArrowUpRight size={13} />
                    </span>
                  </a>
                </div>
              </div>

              <div className="footer-links">
                <div>
                  <strong>Product</strong>
                  <a href="#product">Product</a>
                  <a href="#workflow">Workflow</a>
                  <a href="#teams">Who it is for</a>
                  <a href="#pricing">Pricing</a>
                </div>
                <div>
                  <strong>Company</strong>
                  <a href="mailto:hello@omela.ai">Contact</a>
                  <Link href="/login">Sign in</Link>
                  <a href="#waitlist">Get started</a>
                </div>
                <div>
                  <strong>Legal</strong>
                  <Link href="/privacy">Privacy</Link>
                  <Link href="/terms">Terms</Link>
                </div>
              </div>
            </div>

            <div className="footer-bottom">
              <p>© 2026 Omela Ltd. All rights reserved.</p>
              <p>Omela does not diagnose, prescribe, or make medical decisions. In an emergency, contact local emergency services.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

const CSS = `
:root{
  --bg:#f7f5ee;
  --bg2:#faf9f3;
  --soft:#efede5;
  --card:#fffefa;
  --line:#e5dfd3;
  --ink:#171717;
  --muted:#565d66;
  --muted2:#7c838c;
  --teal:#59d0c3;
  --teal2:#3fc1b3;
  --tealSoft:#e8f8f5;
  --dark:#111827;
  --shadow:0 18px 60px rgba(17,24,39,.07);
  --softShadow:0 10px 34px rgba(17,24,39,.045);
}
*{box-sizing:border-box;min-width:0}
html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;overflow-x:hidden}
body{
  margin:0;
  width:100%;
  max-width:100vw;
  color:var(--ink);
  font-family:var(--font-inter),Inter,Arial,sans-serif;
  overflow-x:hidden;
  background:
    radial-gradient(circle at 8% 5%,rgba(89,208,195,.10),transparent 28%),
    radial-gradient(circle at 88% 10%,rgba(211,230,244,.22),transparent 30%),
    linear-gradient(180deg,var(--bg2) 0%,var(--bg) 100%);
}
a{text-decoration:none;color:inherit}
button,input,select{font:inherit}
button{cursor:pointer}
img{display:block;max-width:100%}
p,h1,h2,h3,h4{margin:0}

.page{
  width:100%;
  min-height:100vh;
  overflow:hidden;
  background:
    radial-gradient(circle at 8% 5%,rgba(89,208,195,.10),transparent 28%),
    radial-gradient(circle at 88% 10%,rgba(211,230,244,.22),transparent 30%),
    linear-gradient(180deg,var(--bg2) 0%,var(--bg) 100%);
}

.double-underline{
  position:relative;
  display:inline-block;
  white-space:normal;
}
.double-underline:before,
.double-underline:after{
  content:"";
  position:absolute;
  left:.02em;
  right:.02em;
  height:.065em;
  border-radius:999px;
  background:linear-gradient(90deg,rgba(89,208,195,.10),rgba(89,208,195,.78),rgba(89,208,195,.18));
  pointer-events:none;
}
.double-underline:before{bottom:.01em;transform:rotate(-1deg)}
.double-underline:after{bottom:-.11em;opacity:.55;transform:rotate(.7deg)}

.header{
  position:sticky;
  top:0;
  z-index:50;
  background:rgba(250,249,243,.9);
  backdrop-filter:blur(18px);
  border-bottom:1px solid rgba(229,223,211,.82);
}
.nav-shell{
  max-width:1320px;
  height:82px;
  margin:0 auto;
  padding:0 42px;
  display:grid;
  grid-template-columns:1fr auto 1fr;
  align-items:center;
  gap:34px;
}
.logo-link{width:max-content}
.logo{display:inline-flex;align-items:center;gap:10px;font-weight:650;letter-spacing:-.035em}
.logo span:last-child{font-size:24px;line-height:1}
.logo-img{width:38px;height:38px;object-fit:contain}
.nav-shell nav{display:flex;gap:38px;font-size:15px;font-weight:500}
.nav-shell nav a{transition:.18s}
.nav-shell nav a:hover{color:var(--teal2)}
.nav-actions{display:flex;justify-content:flex-end;gap:10px}

.btn{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:8px;
  border-radius:12px;
  border:1px solid transparent;
  padding:13px 21px;
  font-weight:500;
  font-size:15px;
  line-height:1;
  white-space:nowrap;
  transition:.18s;
}
.btn:hover:not(:disabled){transform:translateY(-1px)}
.btn:disabled{opacity:.55;cursor:not-allowed}
.primary{background:var(--teal);border-color:rgba(0,0,0,.06);color:#092c29;box-shadow:0 12px 28px rgba(63,193,179,.2)}
.primary:hover:not(:disabled){background:var(--teal2)}
.secondary{background:#fff;border-color:var(--line);box-shadow:0 6px 18px rgba(17,24,39,.04)}

.hero{
  width:100%;
  max-width:1320px;
  margin:0 auto;
  text-align:center;
  padding:84px 42px 58px;
}
.hero h1{
  max-width:840px;
  margin:0 auto;
  font-size:clamp(36px,3.9vw,54px);
  line-height:1.12;
  letter-spacing:-.052em;
  font-weight:400;
  text-wrap:balance;
}
.hero>p{
  max-width:740px;
  margin:22px auto 28px;
  color:var(--muted);
  font-size:17px;
  line-height:1.5;
  letter-spacing:-.02em;
}
.hero-actions{display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-bottom:52px}
.hero-btn{padding:15px 24px;border-radius:13px}

.hero-frame{width:100%;max-width:1160px;margin:0 auto;min-height:680px}
.hero-frame-inner{background:#fff;border-radius:28px;padding:10px;border:1px solid var(--line);box-shadow:var(--shadow);overflow:hidden}
.workspace-chrome{
  height:54px;
  display:grid;
  grid-template-columns:auto 1fr auto;
  align-items:center;
  gap:16px;
  padding:0 18px;
  background:rgba(255,255,255,.76);
  border-bottom:1px solid rgba(229,223,211,.72);
}
.chrome-dots{display:flex;gap:8px;align-items:center}
.dot{width:10px;height:10px;border-radius:999px;display:block}
.dot.red{background:#ff5f57}
.dot.yellow{background:#febc2e}
.dot.green{background:#28c840}
.chrome-url{
  justify-self:center;
  min-width:310px;
  max-width:420px;
  width:42%;
  border:1px solid rgba(17,24,39,.08);
  background:#fff;
  border-radius:999px;
  padding:9px 16px;
  color:#646a73;
  font-size:13px;
  font-weight:600;
  letter-spacing:-.01em;
  box-shadow:0 6px 18px rgba(17,24,39,.04);
}
.chrome-status{justify-self:end;display:flex;align-items:center;gap:8px;color:#26534f;font-size:13px;font-weight:600}
.chrome-status span{width:8px;height:8px;border-radius:999px;background:var(--teal);box-shadow:0 0 0 6px rgba(89,208,195,.14)}
.mobile-resident-strip{display:none}

.ops-room{
  position:relative;
  height:540px;
  overflow:hidden;
  background:radial-gradient(circle at 27% 26%,#f4eadb 0,#d9d0c2 28%,#403832 58%,#101216 100%);
  display:grid;
  grid-template-columns:255px minmax(0,1fr)260px;
  gap:16px;
  padding:24px;
  font-family:var(--font-inter),Inter,Arial,sans-serif;
}
.ops-glow{position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,255,255,.16),rgba(0,0,0,.18));pointer-events:none}
.ops-panel{
  position:relative;
  z-index:1;
  background:rgba(255,255,255,.92);
  border:1px solid rgba(255,255,255,.58);
  box-shadow:0 18px 56px rgba(0,0,0,.16);
  backdrop-filter:blur(16px);
  border-radius:21px;
}
.people-panel{padding:18px;height:492px}
.panel-title{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
.panel-title span,.micro-label,.timeline-top span,.activity-feed>span{
  display:block;color:var(--muted2);text-transform:uppercase;letter-spacing:.12em;font-size:10px;font-weight:700;
}
.panel-title strong{
  width:32px;height:32px;border-radius:999px;background:var(--tealSoft);display:flex;align-items:center;justify-content:center;font-size:13px;color:#08766e;
}
.people-list{display:grid;gap:9px}
.people-list button{
  width:100%;height:91px;border:1px solid var(--line);background:#fff;border-radius:16px;padding:10px;display:grid;
  grid-template-columns:auto minmax(0,1fr);align-items:center;gap:10px;text-align:left;transition:.18s;
}
.people-list button:hover,.people-list button.active{border-color:rgba(63,193,179,.75);box-shadow:0 10px 24px rgba(17,24,39,.055)}
.person-avatar{
  width:40px;height:40px;border-radius:999px;background:linear-gradient(180deg,#eafcf9,#def5f1);color:#08766e;
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;flex:0 0 auto;border:1px solid rgba(63,193,179,.18);
}
.person-avatar strong{font-size:9px;line-height:1;font-weight:700}
.name-line{display:flex;align-items:center;gap:7px;flex-wrap:wrap;margin-bottom:2px}
.name-line strong{display:block;font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.name-line em{
  display:inline-flex;align-items:center;padding:3px 7px;border-radius:999px;border:1px solid #e3e8ef;background:#f4f6f8;
  color:#69717e;font-style:normal;font-size:9px;font-weight:700;letter-spacing:.04em;
}
.person-copy small{display:block;color:var(--muted);font-size:12px;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.status-pill{display:inline-flex;width:max-content;max-width:100%;border-radius:999px;padding:6px 9px;font-size:11px;line-height:1;font-weight:700;white-space:nowrap}
.status-pill.danger{background:#fbebeb;color:#a33a3a}
.status-pill.info{background:#edf4ff;color:#2457c5}
.status-pill.success{background:#eaf9f0;color:#14764f}
.status-pill.warning{background:#f7f0dd;color:#8a6a25}

.request-panel{padding:24px;height:492px}
.request-head{display:flex;justify-content:space-between;gap:16px;align-items:flex-start;margin-bottom:16px;min-height:78px}
.request-head h3{font-size:27px;line-height:1.08;letter-spacing:-.045em;font-weight:500;margin-top:8px}
.request-head p{margin-top:7px;color:var(--muted);font-size:14px}
.next-action{background:var(--dark);color:#fff;border-radius:17px;padding:16px 18px;margin-bottom:13px;text-align:center;min-height:88px;display:flex;flex-direction:column;justify-content:center}
.next-action span{display:block;color:rgba(255,255,255,.56);text-transform:uppercase;letter-spacing:.12em;font-size:10px;font-weight:700;margin-bottom:8px}
.next-action strong{font-size:15px;line-height:1.38;font-weight:600;letter-spacing:-.02em}
.tracking-row{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:13px;min-height:88px}
.tracking-row div{border:1px solid var(--line);background:#fbfaf7;border-radius:16px;padding:12px;text-align:center;display:flex;flex-direction:column;justify-content:center}
.tracking-row span{display:block;color:var(--muted2);text-transform:uppercase;letter-spacing:.12em;font-size:10px;font-weight:700;margin-bottom:7px}
.tracking-row strong{font-size:14px;font-weight:600}
.timeline-card{background:#fff;border:1px solid var(--line);border-radius:17px;padding:16px;min-height:190px}
.timeline-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
.timeline-top strong{font-size:12px;color:var(--muted);font-weight:600}
.progress{height:8px;border-radius:999px;background:var(--soft);overflow:hidden;margin-bottom:14px}
.progress i{display:block;height:100%;background:var(--teal);border-radius:inherit;transition:.4s}
.timeline-list{display:grid;grid-template-columns:1fr 1fr;gap:10px 12px;min-height:104px}
.timeline-item{display:grid;grid-template-columns:auto 1fr;gap:8px;align-items:start}
.timeline-item>span{width:22px;height:22px;border-radius:999px;border:1px solid var(--line);display:flex;align-items:center;justify-content:center}
.timeline-item>span.done{background:var(--teal);border-color:var(--teal);color:#063f39}
.timeline-item strong{display:block;font-size:13px;font-weight:600}
.timeline-item small{display:block;color:var(--muted);font-size:11px;margin-top:2px}

.omela-panel{padding:18px;display:grid;gap:12px;align-content:start;height:492px}
.omela-status{display:flex;gap:10px;border:1px solid var(--line);background:#fff;border-radius:17px;padding:14px;min-height:106px}
.omela-status>span{width:34px;height:34px;border-radius:999px;background:var(--tealSoft);color:#08766e;display:flex;align-items:center;justify-content:center;flex:0 0 auto}
.omela-status strong{font-size:15px;font-weight:600}
.omela-status p{font-size:13px;line-height:1.45;color:var(--muted);margin-top:3px}
.manager-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.manager-stats div{background:#fff;border:1px solid var(--line);border-radius:16px;padding:12px;text-align:center;min-height:82px;display:flex;flex-direction:column;justify-content:center}
.manager-stats strong{display:block;font-size:23px;font-weight:600;letter-spacing:-.04em}
.manager-stats span{display:block;margin-top:4px;color:var(--muted);font-size:9px;text-transform:uppercase;letter-spacing:.08em;font-weight:700;line-height:1.2}
.activity-feed{background:#fff;border:1px solid var(--line);border-radius:17px;padding:15px;min-height:214px}
.activity-feed>span{margin-bottom:8px}
.activity-feed p{display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:start;border-top:1px solid var(--line);padding:10px 0;font-size:12px;line-height:1.35}
.activity-feed svg{color:#08766e;margin-top:1px}
.activity-feed small{font-weight:600;color:var(--muted)}

.resident-tabs{display:flex;justify-content:center;gap:10px;margin-top:16px;flex-wrap:wrap}
.resident-tabs button{
  display:flex;align-items:center;gap:8px;border:1px solid var(--line);background:#fff;border-radius:999px;padding:8px 12px 8px 8px;
  box-shadow:0 5px 14px rgba(17,24,39,.04);color:var(--muted);font-weight:600;
}
.resident-tabs button span:last-child{display:flex;align-items:center;gap:6px}
.resident-tabs strong{font-size:14px;font-weight:600}
.resident-tabs em{font-style:normal;font-size:9px;color:#69717e;background:#f4f6f8;border:1px solid #e3e8ef;border-radius:999px;padding:3px 7px}
.resident-tabs .person-avatar{width:30px;height:30px}
.resident-tabs .active{border-color:rgba(63,193,179,.75);color:var(--ink)}

.trust-strip{padding:38px 0;background:#fffefa;border-top:1px solid var(--line);border-bottom:1px solid var(--line);overflow:hidden}
.trust-strip p{text-align:center;font-size:11px;text-transform:uppercase;letter-spacing:.14em;font-weight:700;color:var(--muted);margin-bottom:24px}
.logo-marquee{overflow:hidden;mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)}
.logo-track{display:flex;width:max-content;gap:54px;align-items:center;animation:logoScroll 38s linear infinite}
.logo-marquee:hover .logo-track{animation-play-state:paused}
.brand-logo-cell{width:150px;height:58px;display:flex;align-items:center;justify-content:center;opacity:.56;filter:grayscale(1);transition:.18s}
.brand-logo-cell img{width:122px;height:36px;object-fit:contain}
@keyframes logoScroll{from{transform:translateX(0)}to{transform:translateX(-33.333%)}}

.feature-showcase{max-width:1240px;margin:0 auto;padding:82px 42px}
.feature-intro{display:grid;grid-template-columns:minmax(0,1fr) minmax(360px,.78fr);gap:84px;align-items:start;margin-bottom:54px}
.feature-intro h2,.section h2,.admin-stress h2,.trust-boundaries h2,.waitlist h2,.final-cta h2{
  font-size:clamp(31px,3.45vw,47px);line-height:1.1;letter-spacing:-.052em;font-weight:400;text-wrap:balance;
}
.feature-intro p{padding-top:9px}
.feature-intro p,.section-head p,.admin-stress-copy,.waitlist p,.final-cta p{color:var(--muted);font-size:16px;line-height:1.6;letter-spacing:-.02em}
.feature-stage{display:grid;grid-template-columns:370px 1fr;gap:20px;background:#fff;border:1px solid var(--line);border-radius:30px;padding:20px;box-shadow:var(--softShadow);min-height:500px}
.feature-tabs{display:grid;gap:10px}
.feature-tabs button{border:1px solid var(--line);background:#fbfaf7;border-radius:20px;padding:15px;text-align:left;transition:.18s;min-height:112px}
.feature-tabs button:hover,.feature-tabs button.active{background:#fff;border-color:rgba(63,193,179,.65);box-shadow:0 10px 28px rgba(17,24,39,.045)}
.feature-tabs button span{width:36px;height:36px;border-radius:999px;background:var(--tealSoft);color:#08766e;display:flex;align-items:center;justify-content:center;margin-bottom:12px}
.feature-tabs strong{display:block;font-size:16px;font-weight:500;letter-spacing:-.03em;margin-bottom:5px}
.feature-tabs small{display:block;color:var(--muted);font-size:12px;line-height:1.43}
.feature-visual{background:var(--soft);border-radius:24px;padding:30px;display:grid;align-content:center;min-height:458px}
.feature-visual-head{display:flex;gap:14px;margin-bottom:22px;min-height:96px}
.feature-visual-head>span{width:44px;height:44px;border-radius:999px;background:#fff;border:1px solid var(--line);display:flex;align-items:center;justify-content:center;color:#08766e;flex:0 0 auto}
.feature-visual h3{font-size:27px;font-weight:400;letter-spacing:-.045em;margin-bottom:8px}
.feature-visual p{font-size:15px;color:var(--muted);line-height:1.55}
.feature-mini-ui{display:grid;grid-template-columns:76px 1fr;min-height:300px;background:#fff;border:1px solid var(--line);border-radius:24px;box-shadow:0 14px 42px rgba(17,24,39,.07);overflow:hidden}
.mini-sidebar{background:#fbfaf7;border-right:1px solid var(--line);display:flex;flex-direction:column;gap:12px;align-items:center;padding-top:28px}
.mini-sidebar span{width:34px;height:34px;border-radius:12px;background:var(--tealSoft)}
.mini-main{padding:26px;display:grid;align-content:start;gap:11px}
.mini-row{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:10px;background:#fbfaf7;border:1px solid var(--line);border-radius:16px;padding:12px}
.mini-row.large-row{grid-template-columns:1fr auto;background:var(--dark);color:#fff}
.mini-row strong{font-weight:500}
.mini-row em{font-style:normal;color:var(--teal);font-size:12px;font-weight:700}
.mini-check{width:23px;height:23px;border-radius:999px;background:var(--teal);display:flex;align-items:center;justify-content:center;color:#073d38}
.mini-row p{font-size:14px;color:var(--ink)}
.mini-row small{font-size:12px;color:var(--muted);font-weight:600}
.mini-note{margin-top:8px;color:#08766e;background:var(--tealSoft);border:1px solid rgba(63,193,179,.25);border-radius:16px;padding:12px;font-size:13px;font-weight:600}

.section{max-width:1240px;margin:0 auto;padding:82px 42px}
.section-head{margin-bottom:44px}
.section-head.center{text-align:center;max-width:740px;margin-left:auto;margin-right:auto}
.section-pill{display:inline-flex;margin-bottom:16px;color:#08766e;background:var(--tealSoft);border:1px solid rgba(63,193,179,.24);border-radius:999px;padding:8px 11px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.13em}

.workflow-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.workflow-grid article{position:relative;background:#fff;border:1px solid var(--line);border-radius:28px;padding:26px;box-shadow:var(--softShadow);min-height:230px}
.step-number{width:52px;height:52px;border-radius:999px;background:var(--dark);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;margin-bottom:30px}
.step-arrow{position:absolute;right:-19px;top:48px;width:38px;height:38px;border-radius:999px;background:var(--teal);color:#073d38;display:flex;align-items:center;justify-content:center;z-index:2;box-shadow:0 10px 24px rgba(63,193,179,.24)}
.workflow-grid h3,.team-copy h3{font-size:21px;letter-spacing:-.04em;font-weight:500;margin-bottom:10px}
.workflow-grid p,.team-copy p{color:var(--muted);font-size:15px;line-height:1.56}

.admin-stress{max-width:980px;margin:0 auto;padding:18px 42px 90px;text-align:center}
.admin-stress .section-head{margin-bottom:30px}
.admin-stress-copy{max-width:720px;margin:30px auto 0}

.message-panel{
  background:#fff;
  border:1px solid var(--line);
  border-radius:30px;
  padding:28px;
  height:388px;
  min-height:388px;
  box-shadow:0 18px 60px rgba(17,24,39,.06);
  display:grid;
  grid-template-rows:repeat(4,76px);
  gap:12px;
  overflow:hidden;
}
.chat-slot{height:76px;display:flex;align-items:center;opacity:0;transition:opacity .25s ease}
.chat-slot.left{justify-content:flex-start}
.chat-slot.right{justify-content:flex-end}
.chat-slot.show,.chat-slot.active{opacity:1}
.chat-bubble{
  width:fit-content;
  max-width:min(86%,410px);
  min-height:62px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  border:1px solid var(--line);
  border-radius:20px 20px 20px 9px;
  background:#f8f6ef;
  padding:12px 16px;
  color:var(--ink);
  box-shadow:0 7px 18px rgba(17,24,39,.035);
  overflow-wrap:anywhere;
  text-align:left;
}
.chat-slot.right .chat-bubble{background:var(--tealSoft);border-color:rgba(63,193,179,.25);border-radius:20px 20px 9px 20px}
.chat-slot.active .chat-bubble{background:var(--dark);border-color:var(--dark);color:#fff}
.chat-bubble small{display:block;margin-bottom:5px;color:inherit;opacity:.58;font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
.chat-bubble span{display:inline;font-size:15px;line-height:1.38;font-weight:500}

.teams-grid,.pricing-grid,.boundary-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.team-card{background:#fff;border:1px solid var(--line);border-radius:30px;padding:12px;box-shadow:var(--softShadow);overflow:hidden;transition:transform .2s ease, box-shadow .2s ease, border-color .2s ease}
.team-card:hover{transform:translateY(-3px);border-color:rgba(89,208,195,.55);box-shadow:0 20px 60px rgba(17,24,39,.08)}
.team-image{position:relative;aspect-ratio:4/3;border-radius:24px;overflow:hidden;background:var(--soft);border:1px solid rgba(229,223,211,.8)}
.team-image img{width:100%;height:100%;object-fit:cover;object-position:center;filter:saturate(.96) contrast(.98);transform:scale(1.015)}
.team-image:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,255,255,0) 45%,rgba(17,17,17,.28) 100%);pointer-events:none}
.team-image span{
  position:absolute;left:14px;bottom:14px;z-index:2;display:inline-flex;align-items:center;border-radius:999px;padding:8px 10px;
  background:rgba(255,255,255,.88);backdrop-filter:blur(12px);color:#08766e;font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;border:1px solid rgba(255,255,255,.7);
}
.team-copy{padding:20px 8px 10px}
.team-track{margin-top:18px;border:1px solid var(--line);background:#fbfaf7;border-radius:18px;padding:13px}
.team-track span{display:block;color:var(--muted2);text-transform:uppercase;letter-spacing:.12em;font-size:10px;font-weight:700;margin-bottom:7px}
.team-track strong{display:block;font-size:13px;line-height:1.45;font-weight:600;color:var(--ink)}

.testimonials{padding:90px 0;background:var(--soft);overflow:hidden}
.testimonial-marquee{overflow:hidden;mask-image:linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)}
.testimonial-marquee div{display:flex;gap:18px;width:max-content;animation:comments 36s linear infinite}
.testimonial-marquee article{width:380px;min-height:190px;background:#fff;border:1px solid var(--line);border-radius:28px;padding:28px;box-shadow:var(--softShadow)}
.testimonial-marquee p{font-size:18px;line-height:1.45;letter-spacing:-.03em;margin-bottom:24px}
.testimonial-marquee em{font-style:italic}
.testimonial-marquee span{font-size:12px;color:var(--muted);text-transform:uppercase;letter-spacing:.12em;font-weight:700}
@keyframes comments{to{transform:translateX(-50%)}}

.safe-section{position:relative;min-height:440px;background:linear-gradient(180deg,rgba(20,22,24,.18),rgba(9,13,18,.94)),radial-gradient(circle at 35% 10%,#746d63 0,#2f2924 42%,#080c0f 100%);display:flex;align-items:center;justify-content:center;text-align:center;color:#fff;overflow:hidden}
.safe-bg{position:absolute;inset:0;background:radial-gradient(circle at 50% 0,rgba(255,255,255,.15),transparent 38%)}
.safe-content{position:relative;max-width:840px;padding:70px 32px}
.safe-content h2{font-size:clamp(34px,4.1vw,55px);line-height:1.08;letter-spacing:-.055em;font-weight:400;margin-bottom:18px}
.safe-content p{max-width:640px;margin:0 auto;color:rgba(255,255,255,.8);font-size:18px;line-height:1.55}
.safe-badges{display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:32px}
.safe-badges span{display:flex;align-items:center;gap:8px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.08);border-radius:999px;padding:10px 13px;color:rgba(255,255,255,.86);font-size:13px;font-weight:600}

.trust-boundaries{background:#fffefa;max-width:none;padding-left:max(42px,calc((100vw - 1240px)/2 + 42px));padding-right:max(42px,calc((100vw - 1240px)/2 + 42px))}
.boundary-grid article{background:#fbfaf7;border:1px solid var(--line);border-radius:26px;padding:24px;box-shadow:var(--softShadow)}
.boundary-grid span{color:#08766e;font-size:12px;font-weight:700}
.boundary-grid h3{font-size:20px;font-weight:400;letter-spacing:-.04em;margin:32px 0 10px}
.boundary-grid p{color:var(--muted);font-size:14px;line-height:1.56}

.price-card{position:relative;background:#fff;border:1px solid var(--line);border-radius:28px;padding:26px;box-shadow:var(--softShadow);min-height:500px;display:flex;flex-direction:column}
.price-card.featured{border-color:rgba(63,193,179,.75)}
.price-card em{position:absolute;right:18px;top:18px;font-style:normal;background:var(--tealSoft);color:#08766e;border-radius:999px;padding:7px 10px;font-size:11px;font-weight:700}
.price-card h3{font-size:22px;font-weight:400;letter-spacing:-.04em;margin-bottom:22px}
.price-line{display:flex;align-items:flex-end;gap:8px;margin-bottom:18px}
.price-line strong{font-size:40px;line-height:.9;letter-spacing:-.06em;font-weight:600}
.price-line span{color:var(--muted);font-weight:500}
.price-card>p{color:var(--muted);font-size:14px;line-height:1.56;min-height:84px}
.price-card ul{list-style:none;margin:22px 0 28px;padding:0;display:grid;gap:12px}
.price-card li{display:flex;align-items:flex-start;gap:9px;font-size:14px;line-height:1.4}
.price-card li svg{color:#178256;margin-top:2px;flex:0 0 auto}
.price-card .btn{width:100%;margin-top:auto}

.waitlist{max-width:1240px;margin:0 auto;padding:0 42px 96px}
.waitlist-card{background:#fff;border:1px solid var(--line);border-radius:32px;padding:46px;box-shadow:var(--shadow);display:grid;grid-template-columns:.9fr 1fr;gap:68px;align-items:center}
.waitlist h2{margin-bottom:18px}
.waitlist-steps{display:grid;gap:10px;margin-top:26px}
.waitlist-steps span{width:max-content;max-width:100%;border:1px solid var(--line);background:#fbfaf7;border-radius:999px;padding:9px 12px;color:var(--muted);font-size:13px;font-weight:600}
form{display:grid;gap:15px}
form label:not(.checkbox){display:grid;gap:8px}
form label>span{font-size:13px;font-weight:600;color:var(--muted)}
input,select{height:54px;width:100%;border:1px solid var(--line);border-radius:14px;background:#fbfaf7;padding:0 15px;outline:none;color:var(--ink);transition:.18s}
input:focus,select:focus{background:#fff;border-color:var(--teal2);box-shadow:0 0 0 4px rgba(89,208,195,.16)}
.honeypot{position:absolute!important;left:-9999px!important;width:1px!important;height:1px!important;opacity:0!important}
.checkbox{display:flex;gap:10px;align-items:flex-start;color:var(--muted);font-size:13px;line-height:1.5}
.checkbox input{width:16px;height:16px;margin-top:2px;accent-color:var(--teal);flex:0 0 auto}
.checkbox a{text-decoration:underline;text-underline-offset:3px;color:var(--ink)}
form .btn{width:100%;height:54px}
.ok,.err{border-radius:14px;padding:12px 14px;font-size:13px!important;font-weight:600}
.ok{background:#eaf9f0;color:#14764f}
.err{background:#fbebeb;color:#a33a3a}

.faq-list{max-width:900px;margin:0 auto;display:grid;gap:12px}
.faq-item{background:#fff;border:1px solid var(--line);border-radius:22px;overflow:hidden;box-shadow:0 8px 22px rgba(17,24,39,.035)}
.faq-item button{width:100%;border:0;background:transparent;padding:21px 24px;display:flex;align-items:center;justify-content:space-between;text-align:left;font-weight:600;color:var(--ink)}
.faq-item svg{transition:.18s}
.faq-item.open svg{transform:rotate(180deg)}
.faq-item>div{display:grid;grid-template-rows:0fr;transition:.2s}
.faq-item.open>div{grid-template-rows:1fr}
.faq-item p{overflow:hidden;padding:0 24px;color:var(--muted);font-size:15px;line-height:1.65}
.faq-item.open p{padding-bottom:22px}

.final-cta{max-width:960px;margin:0 auto;text-align:center;padding:10px 42px 104px}
.final-cta h2{margin-bottom:18px}
.final-cta p{max-width:620px;margin:0 auto 28px}

.site-footer{background:#fffefa;border-top:1px solid var(--line);padding:68px 42px 28px}
.footer-shell{max-width:1240px;margin:0 auto}
.footer-shell h2{max-width:820px;margin:0 0 84px;font-size:clamp(28px,3vw,42px);line-height:1.12;letter-spacing:-.055em;font-weight:400}
.footer-main{display:grid;grid-template-columns:.85fr 1.15fr;gap:90px;align-items:start}
.footer-brand p{color:var(--muted);font-size:15px;line-height:1.55}
.footer-address{display:grid;gap:6px;margin-top:34px}
.footer-email{display:inline-block;margin-top:22px;color:var(--ink);font-size:15px;font-weight:500}
.social-links{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}
.social-links a{display:inline-flex;align-items:center;gap:8px;border:1px solid var(--line);background:#fbfaf7;border-radius:999px;padding:10px 11px 10px 13px;color:var(--ink);font-size:13px;font-weight:600;transition:.18s}
.social-links a:hover{transform:translateY(-1px);border-color:rgba(63,193,179,.65);box-shadow:0 8px 20px rgba(17,24,39,.05)}
.social-links svg{width:16px;height:16px;fill:currentColor;flex:0 0 auto}
.social-arrow{width:24px;height:24px;border-radius:999px;background:#fff;border:1px solid var(--line);display:flex;align-items:center;justify-content:center;margin-left:4px}
.social-arrow svg{width:13px;height:13px;fill:none}
.footer-links{display:grid;grid-template-columns:repeat(3,1fr);gap:46px}
.footer-links strong{display:block;margin-bottom:18px;font-size:15px;font-weight:600}
.footer-links a{display:block;width:max-content;max-width:100%;margin-bottom:13px;color:var(--muted);font-size:15px;line-height:1.35}
.footer-links a:hover{color:var(--ink)}
.footer-bottom{margin-top:80px;padding-top:28px;border-top:1px solid var(--line);display:flex;justify-content:space-between;gap:28px;color:var(--muted);font-size:13px;line-height:1.55}
.footer-bottom p:last-child{max-width:660px;text-align:right}

.modal{position:fixed;inset:0;z-index:100;background:rgba(17,24,39,.48);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;padding:20px}
.modal-card{width:min(430px,100%);background:#fff;border:1px solid var(--line);border-radius:28px;padding:30px;text-align:center;box-shadow:0 28px 90px rgba(17,24,39,.28)}
.modal-icon{width:54px;height:54px;border-radius:18px;background:var(--tealSoft);color:#08766e;display:flex;align-items:center;justify-content:center;margin:0 auto 18px}
.modal-card h3{font-size:27px;letter-spacing:-.04em;font-weight:500;margin-bottom:10px}
.modal-card p{color:var(--muted);line-height:1.58}
.share{margin-top:20px;border:1px solid var(--line);background:#fbfaf7;border-radius:15px;padding:10px;display:flex;gap:10px;align-items:center}
.share span{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:left;color:var(--muted);font-size:13px}
.share button{width:38px;height:38px;border:0;border-radius:12px;background:var(--teal);display:flex;align-items:center;justify-content:center;color:#073d38}
.modal-close{margin-top:18px;width:100%;height:48px;border:1px solid var(--line);border-radius:14px;background:#fff;font-weight:600;color:var(--ink)}

@media (prefers-reduced-motion:reduce){
  *{animation:none!important;transition:none!important;scroll-behavior:auto!important}
}

@media (max-width:1180px){
  .ops-room{grid-template-columns:240px 1fr}
  .omela-panel{display:none}
  .feature-intro,.waitlist-card{grid-template-columns:1fr;gap:36px}
  .feature-stage{grid-template-columns:1fr}
  .feature-tabs{grid-template-columns:repeat(2,1fr)}
  .workflow-grid,.teams-grid,.pricing-grid,.boundary-grid{grid-template-columns:repeat(2,1fr)}
  .step-arrow{display:none}
  .footer-main{grid-template-columns:1fr;gap:54px}
  .footer-links{grid-template-columns:repeat(3,1fr)}
}

@media (max-width:820px){
  .nav-shell{height:74px;padding:0 18px;grid-template-columns:auto 1fr}
  .nav-shell nav{display:none}
  .logo-img{width:32px;height:32px}
  .logo span:last-child{font-size:22px}
  .nav-actions{gap:8px}
  .btn{padding:12px 13px;font-size:14px}
  .hero{padding:48px 18px 42px}
  .hero h1{max-width:100%;font-size:clamp(29px,7.7vw,37px);line-height:1.16;letter-spacing:-.052em}
  .hero>p{max-width:100%;font-size:15px;line-height:1.58;margin-top:18px}
  .hero-actions{display:grid;max-width:340px;margin-left:auto;margin-right:auto;margin-bottom:34px}
  .hero-btn{width:100%;padding:15px 18px}
  .hero-frame{max-width:100%;min-height:682px}
  .hero-frame-inner{border-radius:22px;padding:8px;max-width:100%;overflow:hidden}
  .workspace-chrome{height:auto;grid-template-columns:1fr;justify-items:start;padding:14px}
  .chrome-dots{display:none}
  .chrome-url{width:100%;min-width:0;max-width:none;text-align:center;font-size:12px;padding:8px 12px}
  .chrome-status{display:none}
  .mobile-resident-strip{display:flex;gap:8px;overflow-x:auto;padding:12px 8px;background:#fffefa;border-bottom:1px solid var(--line);scrollbar-width:none}
  .mobile-resident-strip::-webkit-scrollbar{display:none}
  .mobile-resident-strip button{flex:0 0 auto;border:1px solid var(--line);background:#fff;border-radius:999px;display:flex;align-items:center;gap:8px;padding:7px 10px 7px 7px;box-shadow:0 5px 14px rgba(17,24,39,.04)}
  .mobile-resident-strip button.active{border-color:rgba(63,193,179,.75)}
  .mobile-resident-strip .person-avatar{width:30px;height:30px}
  .mobile-resident-strip span:last-child{display:flex;align-items:center;gap:6px}
  .mobile-resident-strip strong{font-size:13px;font-weight:600}
  .mobile-resident-strip em{font-style:normal;font-size:9px;color:#69717e;background:#f4f6f8;border:1px solid #e3e8ef;border-radius:999px;padding:3px 6px}
  .ops-room{grid-template-columns:1fr;height:560px;padding:14px}
  .people-panel{display:none}
  .request-panel{padding:16px;border-radius:18px;height:532px}
  .request-head{flex-direction:column;gap:12px;margin-bottom:14px;min-height:114px}
  .request-head h3{font-size:23px;line-height:1.12}
  .request-head p{font-size:13px}
  .next-action{padding:14px 15px;border-radius:15px;min-height:88px}
  .next-action strong{font-size:14px;line-height:1.42}
  .tracking-row{grid-template-columns:1fr;min-height:0}
  .tracking-row div{padding:11px;min-height:62px}
  .timeline-card{min-height:210px}
  .timeline-list{grid-template-columns:1fr;min-height:130px}
  .resident-tabs{display:none}
  .trust-strip{padding:34px 0}
  .trust-strip p{line-height:1.5;padding:0 18px}
  .logo-track{gap:34px}
  .brand-logo-cell{width:128px;height:52px}
  .brand-logo-cell img{width:108px;height:32px}
  .feature-showcase,.section,.trust-boundaries{padding:72px 18px}
  .feature-intro{margin-bottom:34px}
  .feature-intro h2,.section h2,.admin-stress h2,.trust-boundaries h2,.waitlist h2,.final-cta h2{font-size:clamp(29px,7.8vw,39px)}
  .feature-intro p,.section-head p,.admin-stress-copy,.waitlist p,.final-cta p{font-size:16px}
  .feature-stage{padding:14px;border-radius:24px;min-height:auto}
  .feature-tabs{grid-template-columns:1fr}
  .feature-tabs button{min-height:120px}
  .feature-visual{padding:22px;min-height:450px}
  .feature-mini-ui{grid-template-columns:1fr}
  .mini-sidebar{display:none}
  .workflow-grid,.teams-grid,.pricing-grid,.boundary-grid{grid-template-columns:1fr}
  .admin-stress{padding:0 18px 74px}
  .message-panel{height:380px;min-height:380px;padding:20px;border-radius:24px;grid-template-rows:repeat(4,72px);gap:10px}
  .chat-slot{height:72px}
  .chat-bubble{max-width:86%;min-height:56px;padding:10px 13px}
  .chat-bubble span{font-size:13px;line-height:1.38}
  .team-image{border-radius:22px}
  .testimonials{padding:72px 0}
  .testimonial-marquee article{width:310px;padding:24px}
  .testimonial-marquee p{font-size:18px}
  .safe-section{min-height:420px}
  .safe-content{padding:68px 18px}
  .waitlist{padding:0 18px 74px}
  .waitlist-card{padding:24px;border-radius:24px;grid-template-columns:1fr}
  .final-cta{padding:10px 18px 74px}
  .site-footer{padding:52px 18px 24px}
  .footer-shell h2{margin-bottom:48px}
  .footer-main{grid-template-columns:1fr;gap:42px}
  .footer-links{grid-template-columns:1fr 1fr;gap:28px}
  .footer-bottom{margin-top:52px;flex-direction:column}
  .footer-bottom p:last-child{text-align:left}
}

@media (max-width:540px){
  .footer-links{grid-template-columns:1fr}
  .footer-shell h2{font-size:30px}
  .social-links a{width:100%;justify-content:center}
}

@media (max-width:460px){
  .nav-shell{padding:0 14px}
  .nav-signin{padding:12px 14px}
  .hero{padding:44px 14px 40px}
  .logo span:last-child{font-size:21px}
  .hero h1{font-size:30px;line-height:1.18}
  .hero>p{font-size:14px}
  .hero-frame{min-height:690px}
  .hero-frame-inner{border-radius:20px;padding:6px}
  .ops-room{padding:12px;height:565px}
  .request-panel{height:541px}
  .request-head h3{font-size:22px}
  .next-action strong{font-size:13px}
  .message-panel{height:368px;min-height:368px;padding:16px;grid-template-rows:repeat(4,70px)}
  .chat-slot{height:70px}
  .chat-bubble{max-width:90%}
  .price-card em{position:static;width:max-content;margin-bottom:16px}
}
`;