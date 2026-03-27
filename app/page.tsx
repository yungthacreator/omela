"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
`;

const colors = {
  bg: "#F7F5F0",
  bgCard: "#FFFFFF",
  bgSoft: "#F1EEE7",
  bgDark: "#090A0D",
  bgDarkCard: "#111318",
  text: "#17181C",
  textMuted: "#616775",
  textLight: "#9298A6",
  accent: "#2563EB",
  accentSoft: "#EEF4FF",
  border: "#E5E0D6",
  borderDark: "#252831",
  success: "#16A34A",
};

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

function FadeIn({ children, delay = 0, className = "" }: FadeInProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Badge({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "9px 16px",
        borderRadius: "999px",
        border: `1px solid ${colors.border}`,
        background: colors.bgCard,
        fontSize: "13px",
        fontWeight: 600,
        color: colors.textMuted,
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
}: {
  badge?: string;
  title: ReactNode;
  body?: string;
}) {
  return (
    <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto" }}>
      {badge ? <Badge>{badge}</Badge> : null}
      <h2
        className="serif"
        style={{
          fontSize: "clamp(32px, 5vw, 56px)",
          lineHeight: 1.04,
          letterSpacing: "-0.04em",
          marginTop: badge ? "18px" : 0,
        }}
      >
        {title}
      </h2>
      {body ? (
        <p
          style={{
            fontSize: "17px",
            lineHeight: 1.8,
            color: colors.textMuted,
            marginTop: "16px",
          }}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}

function TypewriterPrompts() {
  const prompts = useMemo(
    () => [
      "I have a rash and headache. What should I do next?",
      "Can you help me understand this prescription?",
      "Book the earliest available appointment near me.",
    ],
    []
  );

  const [promptIndex, setPromptIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = prompts[promptIndex];
    const speed = deleting ? 24 : 42;

    const timer = window.setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, typed.length + 1);
        setTyped(next);

        if (next === current) {
          window.setTimeout(() => setDeleting(true), 1100);
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
  }, [typed, deleting, promptIndex, prompts]);

  return (
    <div
      style={{
        border: `1px solid ${colors.border}`,
        background: colors.bgCard,
        borderRadius: "22px",
        padding: "18px 18px 22px",
      }}
    >
      <div
        style={{
          fontSize: "12px",
          fontWeight: 800,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: colors.textLight,
          marginBottom: "14px",
        }}
      >
        Example prompts
      </div>

      <div
        style={{
          border: `1px solid ${colors.border}`,
          background: "#FCFBF8",
          borderRadius: "18px",
          minHeight: "118px",
          padding: "20px",
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            fontSize: "17px",
            lineHeight: 1.7,
            color: colors.text,
            wordBreak: "break-word",
            overflowWrap: "anywhere",
          }}
        >
          {typed}
          <span
            style={{
              display: "inline-block",
              width: "10px",
              marginLeft: "2px",
              color: colors.accent,
              animation: "blink 1s step-end infinite",
            }}
          >
            |
          </span>
        </div>
      </div>
    </div>
  );
}

function PhoneMockup() {
  const [visibleMessages, setVisibleMessages] = useState(0);

  useEffect(() => {
    const timers = [0, 1, 2, 3].map((i) =>
      window.setTimeout(() => setVisibleMessages(i + 1), 550 + i * 700)
    );

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  const chatMessages = [
    {
      from: "user",
      text: "I have a sore throat, fever, and I feel weak. What should I do?",
    },
    {
      from: "laura",
      text: "I can help you think through the next step. Based on what you shared, you may need same-day clinical advice if the fever is persistent or you have trouble swallowing.",
    },
    {
      from: "user",
      text: "Can you book the earliest appointment near me?",
    },
    {
      from: "laura",
      text: "Yes. I found an available slot tomorrow at 9:30 AM. I can also guide you on self-care until then.",
    },
  ];

  return (
    <div className="phoneWrap">
      <div className="phoneFrame">
        <div className="phoneNotch" />

        <div className="phoneScreen">
          <div className="phoneHeader">
            <div className="phoneAvatar">L</div>

            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  fontSize: "14px",
                  fontWeight: 800,
                  color: colors.text,
                }}
              >
                Laura
                <span
                  style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "999px",
                    background: colors.accent,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: "11px",
                    lineHeight: 1,
                    flexShrink: 0,
                  }}
                >
                  ✓
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "11px",
                  color: colors.success,
                  marginTop: "3px",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "999px",
                    background: colors.success,
                    display: "inline-block",
                  }}
                />
                Live now
              </div>
            </div>
          </div>

          <div className="phoneBody">
            {chatMessages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={
                  i < visibleMessages
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 10, scale: 0.98 }
                }
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{
                  alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
                  maxWidth: "86%",
                }}
              >
                <div
                  style={{
                    padding: "12px 15px",
                    borderRadius:
                      msg.from === "user"
                        ? "18px 18px 6px 18px"
                        : "18px 18px 18px 6px",
                    background: msg.from === "user" ? colors.accent : colors.bgCard,
                    color: msg.from === "user" ? "#fff" : colors.text,
                    fontSize: "13px",
                    lineHeight: 1.6,
                    boxShadow:
                      msg.from === "laura" ? "0 2px 8px rgba(0,0,0,0.04)" : "none",
                    wordBreak: "break-word",
                    overflowWrap: "anywhere",
                  }}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
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
          <span className="terminalPrompt">$</span> npm install @smarthealth/laura-sdk
        </div>
        <div className="terminalLine">
          <span className="terminalPrompt">$</span> import {"{ Laura }"} from{" "}
          "@smarthealth/laura-sdk";
        </div>
        <div className="terminalLine">
          <span className="terminalPrompt">$</span> const laura = new Laura({"{"}
          apiKey: process.env.NEXT_PUBLIC_SMART_HEALTH_KEY {"}"});
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

export default function Page() {
  const [role, setRole] = useState("Patient");
  const [email, setEmail] = useState("");

  const navItems = ["People", "Providers", "Developers", "Pricing"];

  const integrations = ["NHS", "EMIS", "SystmOne", "Epic", "Cerner", "AccuRx"];

  const audienceCards = [
    {
      title: "For people",
      desc: "Use Laura directly for symptom understanding, everyday health guidance, care navigation, booking support, and medication questions.",
      bullets: ["Symptom guidance", "Health questions", "Care navigation", "24/7 access"],
    },
    {
      title: "For providers",
      desc: "Use Laura to reduce front-desk load, guide intake, support appointment workflows, and improve access at scale.",
      bullets: ["Voice and chat intake", "Scheduling support", "Triage support", "Multilingual access"],
    },
    {
      title: "For developers",
      desc: "Embed Laura into apps, patient journeys, marketplaces, and health platforms through APIs, SDKs, and widgets.",
      bullets: ["API and SDK access", "Embeddable widgets", "Workflow triggers", "Secure logs"],
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
      body: "Users describe symptoms, ask health questions, or request help with care access.",
    },
    {
      title: "Laura guides the next step",
      body: "She provides structured guidance, routes intent, and supports booking or navigation.",
    },
    {
      title: "Providers and platforms respond faster",
      body: "Teams and products receive cleaner demand, better workflows, and lower friction.",
    },
  ];

  const metrics = [
    { value: "24/7", label: "always-on access" },
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
      features: ["Symptom guidance", "Everyday health questions", "Care navigation", "Booking support"],
      highlighted: false,
      cta: "Join waitlist",
    },
    {
      name: "Provider",
      price: "£1,250",
      period: "/mo",
      desc: "For clinics and practices using Laura in operations.",
      features: ["Voice and chat intake", "Scheduling workflows", "Multilingual support", "Provider dashboard"],
      highlighted: true,
      badge: "Most popular",
      cta: "Request demo",
    },
    {
      name: "Developer",
      price: "Custom",
      period: "",
      desc: "For teams embedding Laura into products and services.",
      features: ["API and SDK access", "Embeddable components", "Usage analytics", "Technical onboarding"],
      highlighted: false,
      cta: "Talk to us",
    },
  ];

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
          background: ${colors.bg};
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

        .serif {
          font-family: 'Instrument Serif', Georgia, serif;
        }

        .siteWrap {
          width: 100%;
          overflow-x: clip;
        }

        .container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding-left: 24px;
          padding-right: 24px;
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
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          max-width: 100%;
          text-align: center;
        }

        .btnPrimary:hover {
          transform: translateY(-1px);
          background: #14161B;
          box-shadow: 0 10px 26px rgba(0,0,0,0.12);
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
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          max-width: 100%;
          text-align: center;
        }

        .btnSecondary:hover {
          background: ${colors.bgCard};
          border-color: #D8D1C5;
        }

        .section {
          padding: 88px 0;
          overflow-x: clip;
        }

        .grid3 {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
        }

        .grid2 {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px;
        }

        .card {
          background: ${colors.bgCard};
          border: 1px solid ${colors.border};
          border-radius: 26px;
          padding: 28px;
          min-width: 0;
          overflow: hidden;
        }

        .darkCard {
          background: ${colors.bgDarkCard};
          border: 1px solid ${colors.borderDark};
          border-radius: 26px;
          padding: 28px;
          min-width: 0;
          overflow: hidden;
        }

        .heroWrap {
          display: grid;
          grid-template-columns: 1.08fr 0.92fr;
          gap: 48px;
          align-items: center;
        }

        .heroTitle {
          font-size: clamp(52px, 7vw, 92px);
          line-height: 0.95;
          letter-spacing: -0.055em;
        }

        .heroAccent {
          color: ${colors.accent};
          font-style: italic;
          display: block;
        }

        .heroBody {
          margin-top: 22px;
          font-size: 19px;
          line-height: 1.82;
          color: ${colors.textMuted};
          max-width: 680px;
        }

        .heroButtons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 32px;
        }

        .trustedHeader {
          margin-top: 28px;
          text-align: center;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: ${colors.textLight};
        }

        .logoStrip {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 20px;
        }

        .logoChip {
          border: 1px solid ${colors.border};
          background: ${colors.bgCard};
          color: ${colors.textLight};
          border-radius: 999px;
          padding: 11px 16px;
          font-size: "13px";
          font-weight: 700;
        }

        .phoneWrap {
          width: 100%;
          display: flex;
          justify-content: center;
          min-width: 0;
        }

        .phoneFrame {
          width: min(100%, 352px);
          background: white;
          border: 2px solid ${colors.border};
          border-radius: 42px;
          padding: 12px;
          box-shadow: 0 34px 80px rgba(0,0,0,0.1);
          flex-shrink: 1;
        }

        .phoneNotch {
          width: 118px;
          height: 28px;
          border-radius: 999px;
          background: ${colors.bgDark};
          margin: 0 auto 8px;
        }

        .phoneScreen {
          background: #F7F7FB;
          border-radius: 30px;
          padding-bottom: 8px;
          overflow: hidden;
        }

        .phoneHeader {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 18px;
          background: ${colors.bgCard};
          border-bottom: 1px solid ${colors.border};
        }

        .phoneAvatar {
          width: 38px;
          height: 38px;
          border-radius: 999px;
          background: linear-gradient(135deg, ${colors.accent}, #7C3AED);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 800;
          font-size: 14px;
        }

        .phoneBody {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 16px;
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
          line-height: 1.68;
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
          margin-top: 46px;
        }

        .workflowItem {
          background: ${colors.bgCard};
          border: 1px solid ${colors.border};
          border-radius: 24px;
          padding: 24px;
          position: relative;
          min-width: 0;
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
          justifyContent: center;
          color: ${colors.textLight};
          z-index: 2;
        }

        .terminalCard {
          width: 100%;
          max-width: 100%;
          background: #07080B;
          color: #E5E7EB;
          border: 1px solid #1F2330;
          border-radius: 24px;
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
          line-height: 1.8;
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
          background: ${colors.bgCard};
          border: 1px solid ${colors.border};
          border-radius: 30px;
          padding: 32px;
          max-width: 880px;
          margin: 0 auto;
          width: 100%;
          overflow: hidden;
        }

        .waitlistForm {
          display: grid;
          grid-template-columns: 1.2fr 0.9fr auto;
          gap: 12px;
          margin-top: 24px;
          width: 100%;
        }

        .inputBase {
          width: 100%;
          max-width: 100%;
          height: 54px;
          border-radius: 16px;
          border: 1px solid ${colors.border};
          background: ${colors.bgCard};
          padding: 0 16px;
          font-size: 15px;
          color: ${colors.text};
          outline: none;
          min-width: 0;
        }

        .inputBase:focus {
          border-color: ${colors.accent};
          box-shadow: 0 0 0 4px rgba(37,99,235,0.08);
        }

        .metricsGrid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 1px;
          background: ${colors.border};
          border: 1px solid ${colors.border};
          border-radius: 24px;
          overflow: hidden;
        }

        .metricCard {
          background: ${colors.bgCard};
          padding: 28px 20px;
          text-align: center;
          min-width: 0;
        }

        .footerRow {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .navCta {
          min-width: 0;
        }

        @media (max-width: 1100px) {
          .heroWrap {
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
        }

        @media (max-width: 720px) {
          .container {
            padding-left: 18px;
            padding-right: 18px;
          }

          .section {
            padding: 70px 0;
          }

          .navLinks {
            display: none !important;
          }

          .heroTitle {
            font-size: clamp(42px, 14vw, 66px);
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

          .phoneFrame {
            width: min(100%, 340px);
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
            padding: 22px;
          }

          .navCta {
            width: auto !important;
            min-width: 162px;
            max-width: 52vw;
            padding: 12px 16px !important;
            font-size: 14px !important;
            white-space: nowrap;
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
        }
      `}</style>

      <div className="siteWrap">
        <motion.nav
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            background: `${colors.bg}EE`,
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
                gap: "10px",
                minWidth: 0,
                flex: "1 1 auto",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "14px",
                  background: colors.bgDark,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
                  <rect x="4" y="8" width="3.5" height="16" rx="1.75" fill="#fff" />
                  <rect x="10.5" y="5" width="3.5" height="22" rx="1.75" fill="#fff" />
                  <rect x="17" y="11" width="3.5" height="10" rx="1.75" fill="#fff" />
                  <rect x="23.5" y="7" width="3.5" height="18" rx="1.75" fill="#fff" />
                </svg>
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
                  Smart Health
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
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: colors.textMuted,
                  }}
                >
                  {item}
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

        <style>{`
          .navCtaMobile { display: none; }
          @media (max-width: 720px) {
            .navCtaDesktop { display: none; }
            .navCtaMobile { display: inline; }
          }
        `}</style>

        <section className="section" style={{ paddingTop: "88px", paddingBottom: "46px" }}>
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
                    Now onboarding people, providers, and developers
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
                    Laura helps people understand symptoms, navigate care, and get answers fast.
                    Providers use her to automate workflows. Developers integrate her through APIs,
                    SDKs, and embeddable experiences.
                  </p>
                </FadeIn>

                <FadeIn delay={0.24}>
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

              <FadeIn delay={0.16}>
                <PhoneMockup />
              </FadeIn>
            </div>

            <FadeIn delay={0.28}>
              <div className="trustedHeader">Trusted by teams across care delivery</div>
              <div className="logoStrip">
                {integrations.map((item) => (
                  <div className="logoChip" key={item}>
                    {item}
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="section" style={{ paddingTop: "36px" }}>
          <div className="container">
            <FadeIn>
              <SectionHeading
                badge="Built for everyone"
                title={<>One platform. Three entry points.</>}
                body="Laura works as a direct health experience for the public, an operations layer for providers, and an integration layer for digital health teams."
              />
            </FadeIn>

            <div className="grid3" style={{ marginTop: "48px" }}>
              {audienceCards.map((card, i) => (
                <FadeIn key={card.title} delay={i * 0.08}>
                  <div className="card">
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "16px",
                        background: colors.accentSoft,
                        color: colors.accent,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "20px",
                        fontWeight: 800,
                      }}
                    >
                      {i + 1}
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
                        lineHeight: 1.8,
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
                      lineHeight: 1.06,
                      letterSpacing: "-0.04em",
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
                      lineHeight: 1.8,
                      maxWidth: "560px",
                    }}
                  >
                    Laura gives people a clear starting point. Ask questions in plain language,
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

        <section id="providers" className="section" style={{ paddingTop: "22px" }}>
          <div className="container">
            <FadeIn>
              <SectionHeading
                badge="Workflow"
                title={<>A cleaner flow from demand to care access.</>}
                body="Laura helps turn fragmented questions, intake, and requests into clearer action for people, providers, and platforms."
              />
            </FadeIn>

            <div className="workflowGrid">
              {workflowItems.map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.08}>
                  <div className="workflowItem">
                    {i < workflowItems.length - 1 ? (
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
                      Step {i + 1}
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
                        lineHeight: 1.8,
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

        <section
          id="developers"
          className="section"
          style={{ background: colors.bgDark, color: "#fff" }}
        >
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
              />
            </FadeIn>

            <div className="grid2" style={{ marginTop: "48px", alignItems: "center" }}>
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
                    }}
                  >
                    Built for modern integration teams
                  </h3>

                  <p
                    style={{
                      marginTop: "12px",
                      color: "rgba(255,255,255,0.66)",
                      fontSize: "15px",
                      lineHeight: 1.85,
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
                        style={{ color: "rgba(255,255,255,0.78)" }}
                      >
                        <span
                          className="dotCheck"
                          style={{ background: "rgba(37,99,235,0.16)", color: "#60A5FA" }}
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
                      color: "rgba(255,255,255,0.8)",
                      fontSize: "13px",
                      fontWeight: 700,
                      maxWidth: "100%",
                    }}
                  >
                    API, SDK, widget, and workflow-ready
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
                body="Start with the audience that matters now, then expand as Laura becomes part of your workflow, product, or daily health routine."
              />
            </FadeIn>

            <div className="grid3" style={{ marginTop: "48px" }}>
              {pricingPlans.map((plan, i) => (
                <FadeIn key={plan.name} delay={i * 0.08}>
                  <div
                    className="card"
                    style={{
                      background: plan.highlighted ? colors.bgDark : colors.bgCard,
                      color: plan.highlighted ? "#fff" : colors.text,
                      border: plan.highlighted ? "none" : `1px solid ${colors.border}`,
                      boxShadow: plan.highlighted ? "0 24px 60px rgba(0,0,0,0.16)" : "none",
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
                          padding: "6px 10px",
                          background: "rgba(255,255,255,0.1)",
                          color: "rgba(255,255,255,0.75)",
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
                        color: plan.highlighted ? "rgba(255,255,255,0.68)" : colors.textMuted,
                        fontSize: "14px",
                        lineHeight: 1.75,
                      }}
                    >
                      {plan.desc}
                    </p>

                    <div
                      style={{
                        marginTop: "22px",
                        paddingTop: "20px",
                        borderTop: `1px solid ${
                          plan.highlighted ? colors.borderDark : colors.border
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
                              ? "rgba(255,255,255,0.8)"
                              : colors.textMuted,
                          }}
                        >
                          <span
                            className="dotCheck"
                            style={{
                              background: plan.highlighted
                                ? "rgba(96,165,250,0.12)"
                                : colors.accentSoft,
                              color: plan.highlighted ? "#60A5FA" : colors.accent,
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
                        background: plan.highlighted ? "#fff" : colors.bgDark,
                        color: plan.highlighted ? colors.bgDark : "#fff",
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
                        lineHeight: 1.6,
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
                  body="Choose how you want to use Laura. Join as a person, provider, or developer and we will tailor the next step."
                />

                <div className="waitlistForm">
                  <input
                    className="inputBase"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <select
                    className="inputBase"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option>Patient</option>
                    <option>Provider</option>
                    <option>Developer</option>
                  </select>

                  <button className="btnPrimary" style={{ height: "54px" }}>
                    Get early access
                  </button>
                </div>

                <div
                  style={{
                    marginTop: "14px",
                    textAlign: "center",
                    color: colors.textLight,
                    fontSize: "13px",
                    lineHeight: 1.7,
                  }}
                >
                  Selected role: <strong style={{ color: colors.text }}>{role}</strong> · Early
                  access requests help us prioritise launch order.
                </div>
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
                    width: "34px",
                    height: "34px",
                    borderRadius: "12px",
                    background: colors.bgDark,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 32 32" fill="none">
                    <rect x="4" y="8" width="3.5" height="16" rx="1.75" fill="#fff" />
                    <rect x="10.5" y="5" width="3.5" height="22" rx="1.75" fill="#fff" />
                    <rect x="17" y="11" width="3.5" height="10" rx="1.75" fill="#fff" />
                    <rect x="23.5" y="7" width="3.5" height="18" rx="1.75" fill="#fff" />
                  </svg>
                </div>

                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: "14px", fontWeight: 800 }}>Smart Health</div>
                  <div
                    className="serif"
                    style={{ fontSize: "13px", color: colors.textLight, fontStyle: "italic" }}
                  >
                    Powered by Laura
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "18px", flexWrap: "wrap" }}>
                {["People", "Providers", "Developers", "Pricing"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    style={{ fontSize: "13px", color: colors.textLight, fontWeight: 600 }}
                  >
                    {item}
                  </a>
                ))}
              </div>

              <div style={{ fontSize: "13px", color: colors.textLight }}>
                © 2026 Smart Health. Built with 💙 for all.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}