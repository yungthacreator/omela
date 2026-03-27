"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
`;

const colors = {
  bg: "#F7F5F0",
  bgCard: "#FFFFFF",
  bgSoft: "#F2F0EA",
  bgDark: "#0C0C0E",
  bgDarkCard: "#151518",
  text: "#18181B",
  textMuted: "#5F6470",
  textLight: "#8B93A1",
  accent: "#2563EB",
  accentSoft: "#EEF4FF",
  border: "#E7E2D8",
  borderDark: "#2A2A2E",
  success: "#16A34A",
};

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

function FadeIn({ children, delay = 0, className = "" }: FadeInProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.18 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
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
          lineHeight: 1.06,
          letterSpacing: "-0.035em",
          marginTop: badge ? "18px" : 0,
        }}
      >
        {title}
      </h2>
      {body ? (
        <p
          style={{
            fontSize: "17px",
            lineHeight: 1.75,
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

function PhoneMockup() {
  const [visibleMessages, setVisibleMessages] = useState(0);

  useEffect(() => {
    const timers = [0, 1, 2, 3].map((i) =>
      window.setTimeout(() => setVisibleMessages(i + 1), 700 + i * 850)
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
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
              <div style={{ fontSize: "14px", fontWeight: 700, color: colors.text }}>
                Laura
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "11px",
                  color: colors.success,
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
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
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={
                  i < visibleMessages
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 12, scale: 0.98 }
                }
                transition={{ duration: 0.35, ease: "easeOut" }}
                style={{
                  alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
                  maxWidth: "84%",
                }}
              >
                <div
                  style={{
                    padding: "11px 14px",
                    borderRadius:
                      msg.from === "user"
                        ? "18px 18px 4px 18px"
                        : "18px 18px 18px 4px",
                    background: msg.from === "user" ? colors.accent : colors.bgCard,
                    color: msg.from === "user" ? "#fff" : colors.text,
                    fontSize: "13px",
                    lineHeight: "1.55",
                    boxShadow:
                      msg.from === "laura" ? "0 2px 8px rgba(0,0,0,0.05)" : "none",
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
          <span className="terminalPrompt">$</span> import {"{ Laura }"} from
          {" "} "@smarthealth/laura-sdk";
        </div>
        <div className="terminalLine">
          <span className="terminalPrompt">$</span> const laura = new Laura({"{"}
          apiKey: process.env.NEXT_PUBLIC_SMART_HEALTH_KEY {"}"});
        </div>
        <div className="terminalLine">
          <span className="terminalPrompt">$</span> await laura.chat({"{"}
          userId: "user_123",
        </div>
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
      desc: "Use Laura directly for symptom understanding, guidance, booking support, medication questions, and care navigation.",
      bullets: ["Symptom guidance", "Care navigation", "Booking support", "24/7 availability"],
    },
    {
      title: "For providers",
      desc: "Use Laura to reduce front-desk load, handle intake, guide triage, support prescriptions, and improve multilingual access.",
      bullets: ["Voice and chat intake", "Appointment workflows", "Triage support", "Multilingual interactions"],
    },
    {
      title: "For developers",
      desc: "Embed Laura into apps, patient experiences, provider workflows, and digital health platforms with APIs and SDKs.",
      bullets: ["API and SDK access", "Embeddable widgets", "Secure auth flows", "Observability and logs"],
    },
  ];

  const publicUseCases = [
    "Understand symptoms before deciding the next step",
    "Ask Laura everyday health questions in plain language",
    "Get help booking appointments and navigating services",
  ];

  const providerUseCases = [
    "Answer routine patient calls automatically",
    "Book, reschedule, and confirm appointments",
    "Handle prescription and follow-up requests",
  ];

  const developerFeatures = [
    "REST API and SDK access",
    "Embeddable chat and voice widgets",
    "Patient workflow triggers",
    "Secure event logging and audit trails",
  ];

  const metrics = [
    { value: "24/7", label: "always-on access" },
    { value: "40+", label: "supported languages" },
    { value: "<2s", label: "average response time" },
    { value: "3x", label: "broader market coverage" },
  ];

  const pricingPlans = [
    {
      name: "Public Access",
      price: "Waitlist",
      period: "",
      desc: "For early users who want direct access to Laura.",
      features: ["Symptom guidance", "Care navigation", "Appointment support", "Early product access"],
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
        body {
          background: ${colors.bg};
          color: ${colors.text};
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }
        a { color: inherit; text-decoration: none; }
        button, input, select { font-family: inherit; }
        ::selection { background: ${colors.accent}; color: white; }

        .serif {
          font-family: 'Instrument Serif', Georgia, serif;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
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
        }

        .btnPrimary:hover {
          transform: translateY(-1px);
          background: #1A1A20;
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
        }

        .btnSecondary:hover {
          background: ${colors.bgCard};
          border-color: #D9D1C4;
        }

        .section {
          padding: 88px 0;
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
          border-radius: 24px;
          padding: 28px;
        }

        .darkCard {
          background: ${colors.bgDarkCard};
          border: 1px solid ${colors.borderDark};
          border-radius: 24px;
          padding: 28px;
        }

        .heroWrap {
          display: grid;
          grid-template-columns: 1.12fr 0.88fr;
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
          line-height: 1.8;
          color: ${colors.textMuted};
          max-width: 640px;
        }

        .heroButtons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 32px;
        }

        .logoStrip {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 28px;
        }

        .logoChip {
          border: 1px solid ${colors.border};
          background: ${colors.bgCard};
          color: ${colors.textLight};
          border-radius: 999px;
          padding: 11px 16px;
          font-size: 13px;
          font-weight: 700;
        }

        .phoneWrap {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .phoneFrame {
          width: min(100%, 348px);
          background: white;
          border: 2px solid ${colors.border};
          border-radius: 40px;
          padding: 12px;
          box-shadow: 0 34px 80px rgba(0,0,0,0.1);
        }

        .phoneNotch {
          width: 120px;
          height: 28px;
          border-radius: 999px;
          background: ${colors.bgDark};
          margin: 0 auto 8px;
        }

        .phoneScreen {
          height: 500px;
          background: #F8F8FB;
          border-radius: 28px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
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
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 16px;
          overflow: hidden;
        }

        .featureList {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 18px;
        }

        .featureRow {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          color: ${colors.textMuted};
          font-size: 14px;
          line-height: 1.65;
        }

        .dotCheck {
          width: 18px;
          height: 18px;
          margin-top: 2px;
          border-radius: 999px;
          background: ${colors.accentSoft};
          color: ${colors.accent};
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          flex-shrink: 0;
        }

        .terminalCard {
          background: #0A0A0D;
          color: #E5E7EB;
          border: 1px solid #22242B;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 24px 60px rgba(0,0,0,0.25);
        }

        .terminalTop {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          border-bottom: 1px solid #1E2027;
          background: #111319;
        }

        .terminalDots {
          display: flex;
          gap: 8px;
        }

        .terminalDots span {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          display: inline-block;
          background: #343844;
        }

        .terminalDots span:nth-child(1) { background: #F87171; }
        .terminalDots span:nth-child(2) { background: #FBBF24; }
        .terminalDots span:nth-child(3) { background: #34D399; }

        .terminalTitle {
          font-size: 12px;
          color: #9CA3AF;
          font-weight: 700;
        }

        .terminalBody {
          padding: 18px;
          overflow-x: auto;
        }

        .terminalLine {
          white-space: pre;
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
          border-radius: 28px;
          padding: 32px;
          max-width: 880px;
          margin: 0 auto;
        }

        .waitlistForm {
          display: grid;
          grid-template-columns: 1.2fr 0.9fr auto;
          gap: 12px;
          margin-top: 24px;
        }

        .inputBase {
          width: 100%;
          height: 54px;
          border-radius: 16px;
          border: 1px solid ${colors.border};
          background: ${colors.bgCard};
          padding: 0 16px;
          font-size: 15px;
          color: ${colors.text};
          outline: none;
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
        }

        .footerRow {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        @media (max-width: 1100px) {
          .heroWrap {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 900px) {
          .grid3 {
            grid-template-columns: 1fr;
          }

          .grid2 {
            grid-template-columns: 1fr;
          }

          .metricsGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .waitlistForm {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 720px) {
          .container {
            padding: 0 18px;
          }

          .section {
            padding: 72px 0;
          }

          .navLinks {
            display: none !important;
          }

          .heroTitle {
            font-size: clamp(42px, 14vw, 68px);
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
            width: min(100%, 320px);
          }

          .phoneScreen {
            height: 470px;
          }

          .metricsGrid {
            grid-template-columns: 1fr;
          }

          .waitlistWrap {
            padding: 22px;
          }
        }
      `}</style>

      <div style={{ minHeight: "100vh" }}>
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
              height: "82px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "18px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "14px",
                  background: colors.bgDark,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
                  <rect x="4" y="8" width="3.5" height="16" rx="1.75" fill="#fff" />
                  <rect x="10.5" y="5" width="3.5" height="22" rx="1.75" fill="#fff" />
                  <rect x="17" y="11" width="3.5" height="10" rx="1.75" fill="#fff" />
                  <rect x="23.5" y="7" width="3.5" height="18" rx="1.75" fill="#fff" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: "15px", fontWeight: 800, letterSpacing: "-0.03em" }}>
                  Smart Health
                </div>
                <div style={{ fontSize: "12px", color: colors.textLight, marginTop: "2px" }}>
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

            <a href="#waitlist" className="btnPrimary" style={{ padding: "13px 20px" }}>
              Get early access
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

        <section className="section" style={{ paddingTop: "88px", paddingBottom: "54px" }}>
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
                    Providers use her to automate front-desk workflows. Developers integrate her
                    through APIs, SDKs, and embeddable experiences.
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

                <FadeIn delay={0.3}>
                  <div style={{ marginTop: "18px", fontSize: "13px", color: colors.textLight }}>
                    Built for public access, providers, and health platforms
                  </div>
                </FadeIn>
              </div>

              <FadeIn delay={0.2}>
                <PhoneMockup />
              </FadeIn>
            </div>

            <FadeIn delay={0.35}>
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

        <section className="section" style={{ paddingTop: "34px" }}>
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
                      lineHeight: 1.07,
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
                <div className="card" style={{ background: colors.bgSoft }}>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: colors.textLight,
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                    }}
                  >
                    Example prompts
                  </div>

                  <div style={{ display: "grid", gap: "12px", marginTop: "18px" }}>
                    {[
                      "I have a rash and headache. What should I do next?",
                      "Can you help me understand this prescription?",
                      "Book the earliest available appointment near me.",
                    ].map((q) => (
                      <div
                        key={q}
                        style={{
                          border: `1px solid ${colors.border}`,
                          background: colors.bgCard,
                          borderRadius: "18px",
                          padding: "16px",
                          fontSize: "15px",
                          lineHeight: 1.7,
                          color: colors.text,
                        }}
                      >
                        {q}
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <section id="providers" className="section">
          <div className="container">
            <div className="grid2" style={{ alignItems: "center" }}>
              <FadeIn>
                <div className="card">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                      gap: "14px",
                    }}
                  >
                    {[
                      "Calls handled",
                      "Appointment requests",
                      "Prescription follow-ups",
                      "Multilingual patient support",
                    ].map((item, i) => (
                      <div
                        key={item}
                        style={{
                          border: `1px solid ${colors.border}`,
                          borderRadius: "18px",
                          padding: "18px",
                          background: i % 2 === 0 ? colors.bgSoft : colors.bgCard,
                        }}
                      >
                        <div style={{ fontSize: "13px", color: colors.textLight, fontWeight: 700 }}>
                          Workflow
                        </div>
                        <div
                          style={{
                            marginTop: "8px",
                            fontSize: "18px",
                            lineHeight: 1.4,
                            letterSpacing: "-0.02em",
                            fontWeight: 700,
                          }}
                        >
                          {item}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.08}>
                <div>
                  <Badge>Laura for providers</Badge>
                  <h2
                    className="serif"
                    style={{
                      fontSize: "clamp(30px, 5vw, 54px)",
                      lineHeight: 1.07,
                      letterSpacing: "-0.04em",
                      marginTop: "18px",
                    }}
                  >
                    Reduce admin load without reducing quality.
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
                    Providers use Laura to handle repetitive front-desk demand, guide intake,
                    support basic triage flows, and improve access at scale. She becomes an always-on
                    care access layer, not just a chatbot.
                  </p>

                  <div className="featureList" style={{ marginTop: "24px" }}>
                    {providerUseCases.map((item) => (
                      <div className="featureRow" key={item}>
                        <span className="dotCheck">✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
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
                body="Embed health guidance, care flows, and conversational support into apps, patient journeys, and provider workflows."
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
                    Built for real integration teams
                  </h3>
                  <p
                    style={{
                      marginTop: "12px",
                      color: "rgba(255,255,255,0.62)",
                      fontSize: "15px",
                      lineHeight: 1.8,
                    }}
                  >
                    Laura is not only a front-end experience. She can be embedded into platforms,
                    products, marketplaces, patient apps, internal tooling, and provider systems.
                  </p>

                  <div className="featureList" style={{ marginTop: "22px" }}>
                    {developerFeatures.map((item) => (
                      <div
                        className="featureRow"
                        key={item}
                        style={{ color: "rgba(255,255,255,0.75)" }}
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
                title={<>Simple access for public, provider, and platform use.</>}
                body="Start with the audience that matters most now, then expand as Laura becomes part of your workflow or product."
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
                        color: plan.highlighted ? "rgba(255,255,255,0.65)" : colors.textMuted,
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
                              ? "rgba(255,255,255,0.78)"
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
                        textTransform: "lowercase",
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
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "12px",
                    background: colors.bgDark,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 32 32" fill="none">
                    <rect x="4" y="8" width="3.5" height="16" rx="1.75" fill="#fff" />
                    <rect x="10.5" y="5" width="3.5" height="22" rx="1.75" fill="#fff" />
                    <rect x="17" y="11" width="3.5" height="10" rx="1.75" fill="#fff" />
                    <rect x="23.5" y="7" width="3.5" height="18" rx="1.75" fill="#fff" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 800 }}>Smart Health</div>
                  <div style={{ fontSize: "12px", color: colors.textLight }}>Powered by Laura</div>
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
                © 2026 Smart Health. Built for public, provider, and platform use.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}