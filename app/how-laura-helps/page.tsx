"use client";

import Image from "next/image";
import Link from "next/link";
import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');`;

const c = {
  bg: "#F8F6F1",
  surface: "#FFFFFF",
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
  dark: "#090B10",
};

type Scenario = {
  id: string;
  emoji: string;
  eyebrow: string;
  title: string;
  situation: string;
  help: string;
  outcome: string;
  flow: string;
};

const scenarios: Scenario[] = [
  {
    id: "prescriptions",
    emoji: "💊",
    eyebrow: "Prescriptions and repeat requests",
    title: "Chasing repeat medication every month",
    situation:
      "Someone depends on regular medication but keeps running into busy lines, slow admin, and the same repeated request cycle.",
    help:
      "Laura helps turn that friction into a clearer refill request, cleaner supporting detail, and a more structured next step.",
    outcome:
      "Less repeated chasing, less uncertainty, and a calmer route into keeping treatment on track.",
    flow:
      "Medication details are captured, the remaining supply is clarified, and a clean repeat-request draft is prepared for review before submission.",
  },
  {
    id: "registration",
    emoji: "📍",
    eyebrow: "Registration and finding a practice",
    title: "Moving to a new city and not knowing where to start",
    situation:
      "Someone has moved, needs a GP or local practice, and is faced with different instructions, unclear requirements, and too much guesswork.",
    help:
      "Laura helps narrow the right place to go, prepares the registration step more clearly, and reduces the uncertainty around what comes next.",
    outcome:
      "Faster orientation, less confusion, and a more confident start to entering a new care system.",
    flow:
      "Location context is captured, relevant options are narrowed, and a clearer registration request or callback note is prepared for review.",
  },
  {
    id: "child",
    emoji: "🌙",
    eyebrow: "Late-night access stress",
    title: "Feeling overwhelmed when a child is unwell late at night",
    situation:
      "A parent is tired, worried, and unsure whether the next step is to monitor, call urgent care, or prepare for first contact in the morning.",
    help:
      "Laura helps organise the situation, structure the important details, and prepare a clearer summary for the next care conversation.",
    outcome:
      "Less panic, better preparation, and less emotional strain before the family reaches the right service.",
    flow:
      "Key symptoms, timing, and changes are captured in a cleaner format so the next call, visit, or request starts from clearer context.",
  },
  {
    id: "letters",
    emoji: "📋",
    eyebrow: "Letters and admin language",
    title: "Receiving a hospital letter you do not understand",
    situation:
      "Someone receives a referral or appointment letter, but the terms are unfamiliar and the next step still feels vague.",
    help:
      "Laura helps turn admin language into plain language, explains what the letter is about, and helps prepare for what happens next.",
    outcome:
      "More confidence before the appointment and less panic caused by paperwork that feels cold or unclear.",
    flow:
      "A referral letter is turned into a simpler summary, a clearer explanation of the appointment type, and a short preparation note.",
  },
  {
    id: "language",
    emoji: "🌍",
    eyebrow: "Language and communication",
    title: "Trying to explain symptoms in a language that is not yours",
    situation:
      "Someone knows something is wrong but cannot explain it with enough confidence in English under pressure.",
    help:
      "Laura helps capture the issue in the language the person starts with and prepares a clearer bilingual note for sharing.",
    outcome:
      "Less communication strain, more dignity in the interaction, and a better first conversation at the point of care access.",
    flow:
      "Symptoms are captured in the original language, translated into a structured bilingual format, and prepared for review before sharing.",
  },
  {
    id: "callback",
    emoji: "😤",
    eyebrow: "Access loops and callback frustration",
    title: "Trying for weeks and still not getting through",
    situation:
      "Someone has spent days or weeks in an access loop, repeating the same story and still not reaching the right next step.",
    help:
      "Laura helps organise the context, capture the failed attempts clearly, and prepare a stronger request that is harder to dismiss.",
    outcome:
      "Less emotional exhaustion, stronger communication, and a better chance of moving the process forward.",
    flow:
      "The issue, the timeline, and the failed attempts are summarised into a structured callback or access request ready for review.",
  },
];

function FloatEmoji({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      className="scenarioEmojiWrap"
      animate={{ y: [0, -5, 0], rotate: [0, 2, 0] }}
      transition={{
        duration: 4.6,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

export default function HowLauraHelpsPage() {
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
                  width={30}
                  height={30}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>
              <span className="brandName">Omela</span>
            </Link>

            <div className="navActions">
              <Link href="/demo" className="ghostButton">
                Try demo
              </Link>

              <Link href="/" className="primaryButton">
                Back to Omela
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </nav>

        <main className="main">
          <section className="hero">
            <div className="container heroInner">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.52 }}
                className="heroCopy"
              >
                <span className="eyebrow">How Laura helps</span>

                <h1 className="serif heroTitle">
                  Real healthcare frustrations.
                  <br />
                  Clearer next steps.
                </h1>

                <p className="heroBody">
                  From registration and repeat prescriptions to letters, language barriers,
                  and access loops, Laura is designed for the practical burden around
                  getting through care.
                </p>

                <div className="heroButtons">
                  <Link href="/demo" className="primaryButton">
                    See Laura in action
                    <ArrowRight size={15} />
                  </Link>

                  <Link href="/#waitlist" className="secondaryButton">
                    Join waitlist
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          <section className="introSection">
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5 }}
                className="introBlock"
              >
                <span className="eyebrow">Common care access moments</span>
                <h2 className="serif introTitle">
                  Familiar moments.
                  <br />
                  Better preparation.
                </h2>
                <p className="introBody">
                  The product becomes easier to believe when the scenarios feel real. These
                  are the moments Laura is being designed to handle more clearly.
                </p>
              </motion.div>
            </div>
          </section>

          <section className="scenariosSection">
            <div className="container scenarioStack">
              {scenarios.map((scenario, index) => (
                <motion.article
                  key={scenario.id}
                  className="scenarioCard"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{ duration: 0.54, delay: index * 0.04 }}
                >
                  <div className="scenarioHeader">
                    <FloatEmoji delay={index * 0.08}>
                      <span className="scenarioEmoji">{scenario.emoji}</span>
                    </FloatEmoji>

                    <div className="scenarioHeaderCopy">
                      <span className="scenarioEyebrow">{scenario.eyebrow}</span>
                      <h3 className="scenarioTitle">{scenario.title}</h3>
                    </div>
                  </div>

                  <div className="scenarioGrid">
                    <div className="scenarioPanel">
                      <span className="panelLabel">The situation</span>
                      <p>{scenario.situation}</p>
                    </div>

                    <div className="scenarioPanel scenarioPanelAccent">
                      <span className="panelLabel panelLabelAccent">How Laura helps</span>
                      <p>{scenario.help}</p>
                    </div>

                    <div className="scenarioPanel">
                      <span className="panelLabel">Likely outcome</span>
                      <p>{scenario.outcome}</p>
                    </div>

                    <div className="scenarioPanel">
                      <span className="panelLabel">Example flow</span>
                      <p>{scenario.flow}</p>
                    </div>
                  </div>

                  <Link href="/demo" className="scenarioLink">
                    Try this in the demo
                    <ArrowRight size={15} />
                  </Link>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="closingSection">
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.5 }}
                className="closingCard"
              >
                <span className="eyebrow">Care navigation</span>
                <h2 className="serif closingTitle">
                  Less friction before care begins.
                </h2>
                <p className="closingBody">
                  Laura is designed to reduce stress around access with clearer requests,
                  clearer notes, and better preparation before the next conversation even
                  starts.
                </p>

                <div className="closingButtons">
                  <Link href="/demo" className="primaryButton">
                    Try Laura demo
                    <ArrowRight size={15} />
                  </Link>

                  <Link href="/#waitlist" className="secondaryButton">
                    Get early access
                  </Link>
                </div>

                <p className="closingNote">
                  Laura supports care navigation. She does not diagnose, treat, or replace
                  emergency services.
                </p>
              </motion.div>
            </div>
          </section>
        </main>

        <footer className="footer">
          <div className="container footerInner">
            <p className="footerText">&copy; 2026 Omela</p>

            <div className="footerLinks">
              <Link href="/demo" className="footerLink">
                Demo
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
body{
  background:${c.bg};
  color:${c.text};
  font-family:'DM Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
  -webkit-font-smoothing:antialiased;
}
a{color:inherit;text-decoration:none}
button,input{font-family:inherit}
::selection{background:${c.accent};color:#fff}
.serif{font-family:'Instrument Serif',Georgia,serif}

.page{
  min-height:100vh;
  display:flex;
  flex-direction:column;
}
.container{
  max-width:1180px;
  margin:0 auto;
  padding:0 20px;
}

.nav{
  position:sticky;
  top:0;
  z-index:30;
  background:rgba(248,246,241,0.9);
  backdrop-filter:blur(18px);
  -webkit-backdrop-filter:blur(18px);
  border-bottom:1px solid rgba(228,221,210,0.78);
}
.navInner{
  min-height:72px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:14px;
}
.brand{
  display:flex;
  align-items:center;
  gap:10px;
}
.brandMark{
  width:36px;
  height:36px;
  border-radius:12px;
  overflow:hidden;
  flex-shrink:0;
  box-shadow:0 4px 12px rgba(17,18,20,0.06);
}
.brandName{
  font-size:15px;
  font-weight:800;
  letter-spacing:-0.03em;
}
.navActions{
  display:flex;
  align-items:center;
  gap:10px;
}

.primaryButton,
.secondaryButton,
.ghostButton{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:8px;
  min-height:50px;
  padding:0 22px;
  border-radius:999px;
  font-size:15px;
  font-weight:700;
  transition:transform .22s ease,box-shadow .22s ease,background .22s ease;
}
.primaryButton{
  background:${c.dark};
  color:#fff;
  box-shadow:0 12px 24px rgba(9,11,16,0.14);
}
.primaryButton:hover{
  transform:translateY(-1px);
}
.secondaryButton,
.ghostButton{
  background:rgba(255,255,255,0.86);
  border:1px solid rgba(228,221,210,0.94);
  color:${c.text};
}
.secondaryButton:hover,
.ghostButton:hover{
  transform:translateY(-1px);
}

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

.main{
  flex:1;
}

.hero{
  padding:74px 0 48px;
  position:relative;
  overflow:hidden;
}
.hero::before{
  content:"";
  position:absolute;
  inset:0;
  pointer-events:none;
  background:
    radial-gradient(circle at 12% 18%, rgba(37,99,235,0.05), transparent 24%),
    radial-gradient(circle at 86% 14%, rgba(201,149,107,0.09), transparent 22%);
}
.heroInner{
  position:relative;
  z-index:2;
}
.heroCopy{
  max-width:860px;
}
.heroTitle{
  margin-top:18px;
  font-size:clamp(54px,9vw,112px);
  line-height:0.94;
  letter-spacing:-0.065em;
}
.heroBody{
  margin-top:22px;
  max-width:860px;
  font-size:clamp(22px,2.8vw,28px);
  line-height:1.62;
  color:${c.sub};
}
.heroButtons{
  margin-top:28px;
  display:flex;
  flex-wrap:wrap;
  gap:14px;
}

.introSection{
  padding:14px 0 18px;
}
.introBlock{
  max-width:900px;
  margin:0 auto;
  text-align:center;
}
.introTitle{
  margin-top:14px;
  font-size:clamp(38px,6vw,78px);
  line-height:0.98;
  letter-spacing:-0.055em;
}
.introBody{
  margin-top:16px;
  font-size:clamp(18px,2.2vw,22px);
  line-height:1.72;
  color:${c.sub};
}

.scenariosSection{
  padding:30px 0 84px;
}
.scenarioStack{
  display:flex;
  flex-direction:column;
  gap:20px;
}
.scenarioCard{
  background:rgba(255,255,255,0.94);
  border:1px solid rgba(228,221,210,0.94);
  border-radius:36px;
  padding:34px 36px;
  box-shadow:0 16px 34px rgba(17,18,20,0.04);
}
.scenarioHeader{
  display:flex;
  align-items:flex-start;
  gap:18px;
}
.scenarioEmojiWrap{
  width:58px;
  height:58px;
  border-radius:18px;
  background:rgba(255,255,255,0.88);
  border:1px solid rgba(228,221,210,0.94);
  display:flex;
  align-items:center;
  justify-content:center;
  flex-shrink:0;
  box-shadow:0 10px 20px rgba(17,18,20,0.04);
}
.scenarioEmoji{
  font-size:30px;
  line-height:1;
}
.scenarioHeaderCopy{
  min-width:0;
}
.scenarioEyebrow{
  display:inline-flex;
  font-size:12px;
  font-weight:800;
  letter-spacing:0.14em;
  text-transform:uppercase;
  color:#8591A8;
}
.scenarioTitle{
  margin-top:10px;
  font-size:clamp(28px,3.2vw,52px);
  line-height:1.05;
  letter-spacing:-0.045em;
  font-weight:800;
}
.scenarioGrid{
  margin-top:28px;
  display:grid;
  grid-template-columns:1fr;
  gap:14px;
}
.scenarioPanel{
  padding:24px 22px;
  border-radius:26px;
  background:rgba(255,255,255,0.7);
  border:1px solid rgba(228,221,210,0.92);
}
.scenarioPanelAccent{
  background:rgba(236,242,255,0.36);
}
.panelLabel{
  display:inline-flex;
  font-size:12px;
  font-weight:800;
  letter-spacing:0.14em;
  text-transform:uppercase;
  color:#8591A8;
}
.panelLabelAccent{
  color:${c.accent};
}
.scenarioPanel p{
  margin-top:14px;
  font-size:16px;
  line-height:1.82;
  color:${c.sub};
}
.scenarioLink{
  margin-top:24px;
  display:inline-flex;
  align-items:center;
  gap:8px;
  color:${c.accent};
  font-size:16px;
  font-weight:700;
}

.closingSection{
  padding:0 0 88px;
}
.closingCard{
  background:rgba(255,255,255,0.94);
  border:1px solid rgba(228,221,210,0.94);
  border-radius:38px;
  padding:40px 36px;
  box-shadow:0 18px 38px rgba(17,18,20,0.04);
  text-align:center;
}
.closingTitle{
  margin-top:14px;
  font-size:clamp(42px,6vw,82px);
  line-height:0.98;
  letter-spacing:-0.055em;
}
.closingBody{
  margin:18px auto 0;
  max-width:820px;
  font-size:clamp(18px,2.2vw,22px);
  line-height:1.72;
  color:${c.sub};
}
.closingButtons{
  margin-top:28px;
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
  gap:14px;
}
.closingNote{
  margin-top:22px;
  font-size:14px;
  line-height:1.7;
  color:${c.muted};
}

.footer{
  border-top:1px solid rgba(228,221,210,0.82);
  padding:20px 0;
}
.footerInner{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
  flex-wrap:wrap;
}
.footerText{
  font-size:12px;
  color:${c.muted};
}
.footerLinks{
  display:flex;
  gap:16px;
  flex-wrap:wrap;
}
.footerLink{
  font-size:12px;
  font-weight:700;
  color:${c.muted};
}
.footerLink:hover{
  color:${c.text};
}

@media(min-width:860px){
  .container{
    padding:0 28px;
  }
  .scenarioGrid{
    grid-template-columns:repeat(2,1fr);
  }
}

@media(max-width:859px){
  .hero{
    padding:60px 0 42px;
  }
  .scenarioCard{
    padding:28px 22px;
  }
  .closingCard{
    padding:34px 22px;
  }
}

@media(max-width:640px){
  .navInner{
    min-height:66px;
  }
  .navActions{
    gap:8px;
  }
  .ghostButton,
  .primaryButton,
  .secondaryButton{
    min-height:46px;
    padding:0 16px;
    font-size:14px;
  }
  .heroButtons,
  .closingButtons{
    flex-direction:column;
    align-items:stretch;
  }
  .scenarioHeader{
    gap:14px;
  }
  .scenarioEmojiWrap{
    width:52px;
    height:52px;
  }
}
`;