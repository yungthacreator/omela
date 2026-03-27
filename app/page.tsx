"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
`;

const colors = {
  bg: "#FAF9F5",
  bgCard: "#FFFFFF",
  bgDark: "#0C0C0E",
  bgDarkCard: "#161618",
  text: "#1A1A1E",
  textMuted: "#6B6B76",
  textLight: "#9B9BA6",
  accent: "#2563EB",
  accentSoft: "#EEF4FF",
  border: "#E8E6E1",
  borderDark: "#2A2A2E",
  cream: "#F5F3EE",
  success: "#16A34A",
};

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

function FadeIn({ children, delay = 0, className = "" }: FadeInProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
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
        padding: "8px 16px",
        borderRadius: "100px",
        border: `1px solid ${colors.border}`,
        background: colors.bgCard,
        fontSize: "13px",
        fontWeight: 600,
        color: colors.textMuted,
        letterSpacing: "0.02em",
      }}
    >
      {children}
    </div>
  );
}

function PhoneMockup() {
  const [visibleMessages, setVisibleMessages] = useState(0);

  useEffect(() => {
    const timers = [0, 1, 2, 3, 4].map((i) =>
      window.setTimeout(() => setVisibleMessages(i + 1), 800 + i * 900)
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const chatMessages = [
    { from: "patient", text: "Hi, I need to book an appointment for next week." },
    {
      from: "laura",
      text: "Of course! I can see Dr. Patel has availability on Tuesday at 10:00 and Thursday at 14:30. Which works better?",
    },
    { from: "patient", text: "Tuesday at 10 please. Also need a repeat prescription." },
    {
      from: "laura",
      text: "Done. Tuesday 10:00 with Dr. Patel is confirmed. I've flagged your repeat prescription request and it'll be reviewed today. Anything else?",
    },
    { from: "patient", text: "That's perfect, thank you!" },
  ];

  return (
    <div
      style={{
        position: "relative",
        width: "320px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          background: colors.bgCard,
          borderRadius: "40px",
          border: `2px solid ${colors.border}`,
          padding: "12px",
          boxShadow: "0 40px 80px rgba(0,0,0,0.08), 0 16px 32px rgba(0,0,0,0.04)",
        }}
      >
        <div
          style={{
            width: "120px",
            height: "28px",
            background: colors.bgDark,
            borderRadius: "20px",
            margin: "0 auto 8px",
          }}
        />

        <div
          style={{
            background: "#F8F8FA",
            borderRadius: "28px",
            overflow: "hidden",
            height: "480px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: "16px 20px",
              background: colors.bgCard,
              borderBottom: `1px solid ${colors.border}`,
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${colors.accent}, #7C3AED)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "14px",
                fontWeight: 700,
              }}
            >
              L
            </div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: colors.text }}>
                Laura
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: colors.success,
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: colors.success,
                    display: "inline-block",
                  }}
                />
                Online now
              </div>
            </div>
          </div>

          <div
            style={{
              flex: 1,
              padding: "16px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {chatMessages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={
                  i < visibleMessages
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 12, scale: 0.95 }
                }
                transition={{ duration: 0.35, ease: "easeOut" }}
                style={{
                  alignSelf: msg.from === "patient" ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                }}
              >
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius:
                      msg.from === "patient"
                        ? "18px 18px 4px 18px"
                        : "18px 18px 18px 4px",
                    background: msg.from === "patient" ? colors.accent : colors.bgCard,
                    color: msg.from === "patient" ? "#fff" : colors.text,
                    fontSize: "13px",
                    lineHeight: "1.5",
                    boxShadow:
                      msg.from === "laura" ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
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

export default function Page() {
  const navItems = ["Product", "Pricing", "About"];

  const logos = ["NHS", "EMIS", "SystmOne", "Epic", "Cerner", "AccuRx"];

  const features = [
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
        </svg>
      ),
      title: "Answers every call",
      desc: "Handles enquiries, overflow, after-hours, and follow-ups so your team never misses a patient.",
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
      title: "Books appointments live",
      desc: "Checks real availability, books, reschedules, and cancels without pushing staff back into admin loops.",
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
      ),
      title: "Multilingual from day one",
      desc: "Patients interact in their preferred language. No add-ons. No third-party middleware. Built in.",
    },
  ];

  const metrics = [
    { value: "60–80%", label: "Reduction in receptionist workload" },
    { value: "24/7", label: "Patient call coverage" },
    { value: "<2s", label: "Average response time" },
    { value: "40+", label: "Languages supported" },
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "£699",
      period: "/mo",
      desc: "For single-site practices starting with voice coverage.",
      features: [
        "Voice + web chat",
        "Appointment workflows",
        "After-hours coverage",
        "Basic analytics dashboard",
      ],
      cta: "Start free trial",
      highlighted: false,
    },
    {
      name: "Growth",
      price: "£1,750",
      period: "/mo",
      desc: "For growing teams that want deeper automation across channels.",
      features: [
        "Everything in Starter",
        "SMS + WhatsApp",
        "Translation workflows",
        "Priority support + SLA",
      ],
      cta: "Start free trial",
      highlighted: true,
      badge: "Most popular",
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      desc: "For health groups, trusts, and provider networks.",
      features: [
        "Everything in Growth",
        "EHR/PAS integrations",
        "Governance + audit controls",
        "Dedicated implementation",
      ],
      cta: "Talk to us",
      highlighted: false,
    },
  ];

  return (
    <>
      <style>{FONT_IMPORT}</style>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          background: ${colors.bg};
          font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
          color: ${colors.text};
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }
        a { text-decoration: none; color: inherit; }
        button { cursor: pointer; border: none; font-family: inherit; }
        ::selection { background: ${colors.accent}; color: #fff; }

        .serif { font-family: 'Instrument Serif', Georgia, serif; }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        @media (min-width: 768px) {
          .container { padding: 0 40px; }
        }

        @media (min-width: 1024px) {
          .container { padding: 0 48px; }
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          background: ${colors.bgDark};
          color: #fff;
          border-radius: 100px;
          font-size: 15px;
          font-weight: 600;
          transition: all 0.2s;
          letter-spacing: -0.01em;
        }

        .btn-primary:hover {
          background: #2A2A2E;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          background: transparent;
          color: ${colors.text};
          border-radius: 100px;
          font-size: 15px;
          font-weight: 600;
          border: 1px solid ${colors.border};
          transition: all 0.2s;
          letter-spacing: -0.01em;
        }

        .btn-secondary:hover {
          background: ${colors.bgCard};
          border-color: #D0CEC8;
        }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .logo-scroll {
          animation: scroll 20s linear infinite;
        }

        .logo-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div style={{ minHeight: "100vh" }}>
        <motion.nav
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            background: `${colors.bg}E8`,
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          <div
            className="container"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "72px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "10px",
                  background: colors.bgDark,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
                  <rect x="4" y="8" width="3.5" height="16" rx="1.75" fill="#fff" />
                  <rect x="10.5" y="5" width="3.5" height="22" rx="1.75" fill="#fff" />
                  <rect x="17" y="11" width="3.5" height="10" rx="1.75" fill="#fff" />
                  <rect x="23.5" y="7" width="3.5" height="18" rx="1.75" fill="#fff" />
                </svg>
              </div>
              <span style={{ fontSize: "18px", fontWeight: 700, letterSpacing: "-0.03em" }}>
                Smart Health
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "36px",
              }}
              className="desktop-nav"
            >
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: colors.textMuted,
                    transition: "color 0.15s",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = colors.text;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = colors.textMuted;
                  }}
                >
                  {item}
                </a>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <a
                href="#waitlist"
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: colors.textMuted,
                  display: "none",
                }}
                className="desktop-only"
              >
                Sign in
              </a>
              <button className="btn-primary" style={{ padding: "10px 22px", fontSize: "14px" }}>
                Request demo
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
              </button>
            </div>
          </div>
        </motion.nav>

        <section style={{ padding: "80px 0 40px", overflow: "hidden" }}>
          <div className="container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "60px",
                alignItems: "center",
              }}
            >
              <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
                <FadeIn>
                  <Badge>
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: colors.success,
                        display: "inline-block",
                      }}
                    />
                    Now onboarding UK practices
                  </Badge>
                </FadeIn>

                <FadeIn delay={0.1}>
                  <h1
                    className="serif"
                    style={{
                      fontSize: "clamp(42px, 6vw, 72px)",
                      lineHeight: 1.05,
                      letterSpacing: "-0.035em",
                      marginTop: "28px",
                      color: colors.text,
                    }}
                  >
                    The AI receptionist
                    <br />
                    <span style={{ fontStyle: "italic", color: colors.accent }}>
                      your practice deserves.
                    </span>
                  </h1>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <p
                    style={{
                      fontSize: "18px",
                      lineHeight: 1.7,
                      color: colors.textMuted,
                      marginTop: "24px",
                      maxWidth: "540px",
                      margin: "24px auto 0",
                    }}
                  >
                    Laura answers every patient call, books appointments, handles prescriptions,
                    and speaks 40+ languages  so your front desk can focus on care, not admin.
                  </p>
                </FadeIn>

                <FadeIn delay={0.3}>
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      marginTop: "36px",
                      justifyContent: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <button className="btn-primary">
                      Request a demo
                      <svg
                        width="16"
                        height="16"
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
                    </button>
                    <button className="btn-secondary">Watch Laura in action</button>
                  </div>
                </FadeIn>

                <FadeIn delay={0.35}>
                  <p
                    style={{
                      fontSize: "13px",
                      color: colors.textLight,
                      marginTop: "16px",
                    }}
                  >
                    Free pilot for qualifying practices · No integration required to start
                  </p>
                </FadeIn>
              </div>

              <FadeIn delay={0.4}>
                <PhoneMockup />
              </FadeIn>
            </div>
          </div>
        </section>

        <section style={{ padding: "40px 0 60px" }}>
          <div className="container">
            <p
              style={{
                fontSize: "12px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: colors.textLight,
                textAlign: "center",
                marginBottom: "28px",
              }}
            >
              Built to integrate with the systems providers already use
            </p>

            <div
              style={{
                position: "relative",
                overflow: "hidden",
                maskImage:
                  "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
              }}
            >
              <div
                className="logo-scroll"
                style={{
                  display: "flex",
                  gap: "48px",
                  width: "max-content",
                  alignItems: "center",
                }}
              >
                {[...logos, ...logos].map((logo, i) => (
                  <div
                    key={`${logo}-${i}`}
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: colors.textLight,
                      letterSpacing: "-0.02em",
                      whiteSpace: "nowrap",
                      opacity: 0.6,
                    }}
                  >
                    {logo}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: "40px 0" }}>
          <div className="container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1px",
                background: colors.border,
                borderRadius: "20px",
                overflow: "hidden",
                border: `1px solid ${colors.border}`,
              }}
            >
              {metrics.map((metric, i) => (
                <FadeIn key={metric.label} delay={i * 0.08}>
                  <div
                    style={{
                      background: colors.bgCard,
                      padding: "32px 28px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      className="serif"
                      style={{
                        fontSize: "36px",
                        fontWeight: 400,
                        letterSpacing: "-0.03em",
                        color: colors.text,
                      }}
                    >
                      {metric.value}
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: colors.textMuted,
                        marginTop: "6px",
                        lineHeight: 1.4,
                      }}
                    >
                      {metric.label}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section id="product" style={{ padding: "80px 0" }}>
          <div className="container">
            <FadeIn>
              <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
                <Badge>Product</Badge>
                <h2
                  className="serif"
                  style={{
                    fontSize: "clamp(32px, 4.5vw, 52px)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.03em",
                    marginTop: "20px",
                  }}
                >
                  Built like infrastructure,
                  <br />
                  not a chatbot demo.
                </h2>
                <p
                  style={{
                    fontSize: "17px",
                    lineHeight: 1.7,
                    color: colors.textMuted,
                    marginTop: "16px",
                  }}
                >
                  Laura fits into real clinical workflows: voice, messaging, scheduling,
                  prescriptions with the reliability providers actually need.
                </p>
              </div>
            </FadeIn>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "20px",
                marginTop: "56px",
              }}
            >
              {features.map((feature, i) => (
                <FadeIn key={feature.title} delay={i * 0.1}>
                  <div
                    style={{
                      padding: "36px 32px",
                      background: colors.bgCard,
                      border: `1px solid ${colors.border}`,
                      borderRadius: "20px",
                      transition: "all 0.25s",
                      height: "100%",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = "#D0CEC8";
                      e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.06)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = colors.border;
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "14px",
                        background: colors.cream,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: colors.accent,
                      }}
                    >
                      {feature.icon}
                    </div>
                    <h3
                      style={{
                        fontSize: "20px",
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                        marginTop: "20px",
                      }}
                    >
                      {feature.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "15px",
                        lineHeight: 1.7,
                        color: colors.textMuted,
                        marginTop: "10px",
                      }}
                    >
                      {feature.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section
          style={{
            background: colors.bgDark,
            padding: "80px 0",
            color: "#fff",
          }}
        >
          <div className="container">
            <FadeIn>
              <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 16px",
                    borderRadius: "100px",
                    border: `1px solid ${colors.borderDark}`,
                    background: "rgba(255,255,255,0.05)",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#60A5FA",
                      display: "inline-block",
                    }}
                  />
                  How it works
                </div>
                <h2
                  className="serif"
                  style={{
                    fontSize: "clamp(32px, 4.5vw, 52px)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.03em",
                    marginTop: "20px",
                  }}
                >
                  Live in days, not months.
                </h2>
                <p
                  style={{
                    fontSize: "17px",
                    lineHeight: 1.7,
                    color: "rgba(255,255,255,0.55)",
                    marginTop: "16px",
                  }}
                >
                  No complex integrations needed to start. Laura connects to your existing phone
                  system and scheduling tools.
                </p>
              </div>
            </FadeIn>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "1px",
                marginTop: "56px",
              }}
            >
              {[
                {
                  step: "01",
                  title: "Connect your phone line",
                  desc: "Forward calls to Laura or run her alongside your existing reception team.",
                },
                {
                  step: "02",
                  title: "Configure your workflows",
                  desc: "Define booking rules, triage paths, escalation triggers, and language preferences.",
                },
                {
                  step: "03",
                  title: "Go live",
                  desc: "Laura starts handling calls immediately. Your team reviews, monitors, and adjusts via the dashboard.",
                },
              ].map((item, i) => (
                <FadeIn key={item.step} delay={i * 0.12}>
                  <div
                    style={{
                      padding: "36px 32px",
                      background: colors.bgDarkCard,
                      borderRadius: "20px",
                      border: `1px solid ${colors.borderDark}`,
                      height: "100%",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "48px",
                        fontWeight: 700,
                        color: "rgba(255,255,255,0.08)",
                        letterSpacing: "-0.04em",
                        lineHeight: 1,
                      }}
                    >
                      {item.step}
                    </div>
                    <h3
                      style={{
                        fontSize: "20px",
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                        marginTop: "16px",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "15px",
                        lineHeight: 1.7,
                        color: "rgba(255,255,255,0.5)",
                        marginTop: "10px",
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" style={{ padding: "80px 0" }}>
          <div className="container">
            <FadeIn>
              <div style={{ textAlign: "center", maxWidth: "540px", margin: "0 auto" }}>
                <Badge>Pricing</Badge>
                <h2
                  className="serif"
                  style={{
                    fontSize: "clamp(32px, 4.5vw, 52px)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.03em",
                    marginTop: "20px",
                  }}
                >
                  Simple pricing plans.
                </h2>
                <p
                  style={{
                    fontSize: "17px",
                    lineHeight: 1.7,
                    color: colors.textMuted,
                    marginTop: "16px",
                  }}
                >
                  Start small and scale as Laura proves her value across your operations.
                </p>
              </div>
            </FadeIn>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "20px",
                maxWidth: "1000px",
                margin: "56px auto 0",
              }}
            >
              {pricingPlans.map((plan, i) => (
                <FadeIn key={plan.name} delay={i * 0.1}>
                  <div
                    style={{
                      padding: "36px 32px",
                      background: plan.highlighted ? colors.bgDark : colors.bgCard,
                      color: plan.highlighted ? "#fff" : colors.text,
                      border: plan.highlighted ? "none" : `1px solid ${colors.border}`,
                      borderRadius: "20px",
                      position: "relative",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      boxShadow: plan.highlighted
                        ? "0 24px 60px rgba(0,0,0,0.2)"
                        : "none",
                    }}
                  >
                    {"badge" in plan && plan.badge && (
                      <div
                        style={{
                          position: "absolute",
                          top: "20px",
                          right: "20px",
                          background: "rgba(255,255,255,0.12)",
                          padding: "4px 12px",
                          borderRadius: "100px",
                          fontSize: "11px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          color: "rgba(255,255,255,0.7)",
                        }}
                      >
                        {plan.badge}
                      </div>
                    )}

                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: 600,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {plan.name}
                    </div>

                    <div
                      style={{
                        marginTop: "20px",
                        display: "flex",
                        alignItems: "baseline",
                        gap: "4px",
                      }}
                    >
                      <span
                        className="serif"
                        style={{
                          fontSize: "44px",
                          letterSpacing: "-0.04em",
                        }}
                      >
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span
                          style={{
                            fontSize: "15px",
                            color: plan.highlighted
                              ? "rgba(255,255,255,0.5)"
                              : colors.textMuted,
                          }}
                        >
                          {plan.period}
                        </span>
                      )}
                    </div>

                    <p
                      style={{
                        fontSize: "14px",
                        lineHeight: 1.6,
                        color: plan.highlighted ? "rgba(255,255,255,0.55)" : colors.textMuted,
                        marginTop: "12px",
                      }}
                    >
                      {plan.desc}
                    </p>

                    <div
                      style={{
                        marginTop: "24px",
                        paddingTop: "24px",
                        borderTop: `1px solid ${
                          plan.highlighted ? colors.borderDark : colors.border
                        }`,
                        display: "flex",
                        flexDirection: "column",
                        gap: "14px",
                        flex: 1,
                      }}
                    >
                      {plan.features.map((f) => (
                        <div
                          key={f}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "10px",
                            fontSize: "14px",
                            color: plan.highlighted
                              ? "rgba(255,255,255,0.8)"
                              : colors.textMuted,
                          }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={plan.highlighted ? "#60A5FA" : colors.accent}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ marginTop: "2px", flexShrink: 0 }}
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          {f}
                        </div>
                      ))}
                    </div>

                    <button
                      style={{
                        marginTop: "28px",
                        padding: "14px 24px",
                        borderRadius: "100px",
                        fontSize: "14px",
                        fontWeight: 600,
                        background: plan.highlighted ? "#fff" : colors.bgDark,
                        color: plan.highlighted ? colors.bgDark : "#fff",
                        border: "none",
                        transition: "all 0.2s",
                        width: "100%",
                      }}
                    >
                      {plan.cta}
                    </button>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section id="waitlist" style={{ padding: "40px 0 80px" }}>
          <div className="container">
            <FadeIn>
              <div
                style={{
                  background: colors.bgCard,
                  border: `1px solid ${colors.border}`,
                  borderRadius: "24px",
                  padding: "64px 40px",
                  textAlign: "center",
                  maxWidth: "720px",
                  margin: "0 auto",
                }}
              >
                <h2
                  className="serif"
                  style={{
                    fontSize: "clamp(28px, 4vw, 44px)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.03em",
                  }}
                >
                  Ready to stop missing
                  <br />
                  patient calls?
                </h2>

                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.7,
                    color: colors.textMuted,
                    marginTop: "16px",
                    maxWidth: "440px",
                    margin: "16px auto 0",
                  }}
                >
                  Join the early rollout. Pilot access opens to selected UK practices first.
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    justifyContent: "center",
                    marginTop: "32px",
                    flexWrap: "wrap",
                  }}
                >
                  <button className="btn-primary">
                    Request a demo
                    <svg
                      width="16"
                      height="16"
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
                  </button>
                  <button className="btn-secondary">hello@smarthealth.ai</button>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "24px",
                    marginTop: "28px",
                    flexWrap: "wrap",
                  }}
                >
                  {[].map((m) => (
                    <span
                      key={m}
                      style={{
                        fontSize: "13px",
                        color: colors.textLight,
                      }}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <footer
          style={{
            borderTop: `1px solid ${colors.border}`,
            padding: "40px 0",
          }}
        >
          <div className="container">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "8px",
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
                <span style={{ fontSize: "14px", fontWeight: 600, color: colors.textMuted }}>
                  Smart Health
                </span>
              </div>

              <div style={{ display: "flex", gap: "24px" }}>
                {["Privacy", "Terms", "Contact"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    style={{
                      fontSize: "13px",
                      color: colors.textLight,
                      transition: "color 0.15s",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = colors.textMuted;
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = colors.textLight;
                    }}
                  >
                    {item}
                  </a>
                ))}
              </div>

              <p style={{ fontSize: "13px", color: colors.textLight }}>
                © 2026 Smart Health. Proudly built for the Globe.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}