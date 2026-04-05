"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  FileText,
  Globe2,
  MapPinned,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');`;

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
};

function Reveal({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const scenarios = [
  {
    eyebrow: "Prescription access",
    title: "Chasing repeat prescriptions every month",
    pain:
      "You rely on medication, but every refill turns into hold music, repeated details, and uncertainty about whether anything has actually moved.",
    laura:
      "Laura helps gather the details, prepares a clearer refill request, and keeps the next step easier to track and repeat.",
    outcome:
      "Less chasing, less repetition, and a more prepared request before you contact the practice or pharmacy.",
    example:
      "A patient with 4 days of supply left opens Laura, confirms the medication, reviews a prepared request, and sets a reminder before the next refill cycle.",
    icon: <FileText size={18} />,
    tint: c.accent,
    bg: c.accentSoft,
  },
  {
    eyebrow: "Registration support",
    title: "Moving to a new city with no doctor",
    pain:
      "You have just moved. You do not know which practice is relevant, whether they are accepting patients, or what documents you may need.",
    laura:
      "Laura helps narrow the search, explains the registration path in plain language, and prepares what to say next.",
    outcome:
      "You go from scattered tabs and guesswork to a clearer route, a clearer request, and less wasted time.",
    example:
      "A new resident enters a postcode, reviews nearby options, sees what registration usually requires, and leaves with a prepared note instead of starting from zero.",
    icon: <MapPinned size={18} />,
    tint: c.warm,
    bg: c.warmSoft,
  },
  {
    eyebrow: "Letters and admin language",
    title: "Receiving a hospital letter you do not understand",
    pain:
      "You get a referral or appointment letter, but the terms are unfamiliar and the next step still feels vague.",
    laura:
      "Laura helps turn admin language into plain language, explains what the letter is about, and helps you prepare for what happens next.",
    outcome:
      "More confidence before the appointment and less panic caused by paperwork that feels cold or unclear.",
    example:
      "Someone uploads a referral letter, gets a simpler summary, a short explanation of the appointment type, and a clearer sense of what to bring or ask.",
    icon: <MessageSquareText size={18} />,
    tint: c.green,
    bg: c.greenSoft,
  },
  {
    eyebrow: "Language support",
    title: "Trying to explain symptoms in a language that is not yours",
    pain:
      "You know something is wrong, but finding the right words in the moment feels stressful, especially at the front desk or on a call.",
    laura:
      "Laura helps capture the concern in your language and prepares a structured bilingual note that is easier to review and share.",
    outcome:
      "Less pressure in the conversation and a better chance of being understood clearly the first time.",
    example:
      "A user writes in French, reviews a bilingual English and French note, and arrives with a clearer summary instead of trying to translate everything live.",
    icon: <Globe2 size={18} />,
    tint: c.accent,
    bg: c.accentSoft,
  },
  {
    eyebrow: "Persistent access friction",
    title: "Being told to try again tomorrow",
    pain:
      "You call at opening time, wait, get turned away, and repeat the same cycle while symptoms or worry keep building in the background.",
    laura:
      "Laura helps organise the context, document the issue more clearly, and prepare a stronger request for the next contact point.",
    outcome:
      "A more structured request and less emotional exhaustion from starting the story again each day.",
    example:
      "After several failed attempts, a user prepares a short summary of the concern, duration, and access difficulty before contacting the practice again.",
    icon: <ShieldCheck size={18} />,
    tint: c.warm,
    bg: c.warmSoft,
  },
  {
    eyebrow: "Family coordination",
    title: "Helping a parent, partner, or child while tired and stressed",
    pain:
      "The hard part is often not just the health issue. It is coordinating what happened, what changed, and what to say when everyone is already drained.",
    laura:
      "Laura helps organise the information, turn scattered details into one clearer note, and make the next conversation easier to handle.",
    outcome:
      "More calm, fewer forgotten details, and a better starting point when time and energy are low.",
    example:
      "A family member uses Laura to collect symptoms, timing, medication notes, and key questions into one prepared summary before reaching out.",
    icon: <Sparkles size={18} />,
    tint: c.green,
    bg: c.greenSoft,
  },
];

const proofPoints = [
  {
    title: "Real care access moments",
    body: "This page focuses on practical scenarios people actually recognise, not abstract feature claims.",
  },
  {
    title: "Next-step support",
    body: "Laura is designed to help people move forward with clearer requests, clearer notes, and clearer preparation.",
  },
  {
    title: "Legally careful by design",
    body: "Omela is not framed as diagnosis, treatment, or triage. The product stays focused on care navigation.",
  },
];

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
                  width={32}
                  height={32}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>

              <div>
                <div className="brandName">Omela</div>
                <div className="brandSub">LAURA BY OMELA</div>
              </div>
            </Link>

            <div className="navActions">
              <Link href="/demo" className="buttonSecondary navButtonSecondary">
                Try demo
              </Link>
              <Link href="/" className="buttonPrimary navButtonPrimary">
                Back to Omela
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </nav>

        <main>
          <section className="hero">
            <div className="container heroInner">
              <Reveal>
                <span className="heroEyebrow">How Laura helps</span>
              </Reveal>

              <Reveal delay={0.04}>
                <h1 className="heroTitle serif">
                  Real healthcare frustrations.
                  <br />
                  Clearer next steps.
                </h1>
              </Reveal>

              <Reveal delay={0.08}>
                <p className="heroBody">
                  Laura is built for the messy part of healthcare access. Finding the
                  right place to go. Preparing what to say. Understanding what is
                  happening. This page shows how that looks in real scenarios people
                  already know too well.
                </p>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="heroPill">
                  <Sparkles size={14} />
                  <span>Not just answers. A way forward.</span>
                </div>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="heroButtons">
                  <Link href="/demo" className="buttonPrimary">
                    See Laura in action
                    <ArrowRight size={14} />
                  </Link>
                  <Link href="/#waitlist" className="buttonSecondary">
                    Join waitlist
                  </Link>
                </div>
              </Reveal>
            </div>
          </section>

          <section className="section">
            <div className="container">
              <Reveal>
                <div className="proofIntro">
                  <div className="sectionHead">
                    <span className="sectionEyebrow">Why this page matters</span>
                    <h2 className="sectionTitle serif">
                      Product proof should feel human, not theoretical.
                    </h2>
                    <p className="sectionBody">
                      People need to see themselves in the problem before they believe the
                      product. These scenarios are written to make the value legible fast.
                    </p>
                  </div>
                </div>
              </Reveal>

              <div className="proofGrid">
                {proofPoints.map((item, index) => (
                  <Reveal key={item.title} delay={index * 0.06}>
                    <article className="proofCard">
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="section sectionScenarios">
            <div className="container">
              <Reveal>
                <div className="sectionHead sectionHeadLeft">
                  <span className="sectionEyebrow">Scenario library</span>
                  <h2 className="sectionTitle serif">
                    What Laura looks like when real life gets messy.
                  </h2>
                  <p className="sectionBody">
                    Each scenario is structured to show the pain, the product move, and
                    the outcome people actually care about.
                  </p>
                </div>
              </Reveal>

              <div className="scenarioList">
                {scenarios.map((scenario, index) => (
                  <Reveal key={scenario.title} delay={index * 0.05}>
                    <article className="scenarioCard">
                      <div className="scenarioTop">
                        <div
                          className="scenarioIcon"
                          style={{
                            color: scenario.tint,
                            background: scenario.bg,
                          }}
                        >
                          {scenario.icon}
                        </div>

                        <div className="scenarioTopCopy">
                          <span className="scenarioEyebrow">{scenario.eyebrow}</span>
                          <h3 className="scenarioTitle">{scenario.title}</h3>
                        </div>
                      </div>

                      <div className="scenarioGrid">
                        <div className="scenarioBlock">
                          <span className="blockLabel">The situation</span>
                          <p>{scenario.pain}</p>
                        </div>

                        <div className="scenarioBlock scenarioBlockAccent">
                          <span className="blockLabel blockLabelAccent">
                            How Laura helps
                          </span>
                          <p>{scenario.laura}</p>
                        </div>
                      </div>

                      <div className="scenarioBottom">
                        <div className="scenarioOutcome">
                          <span className="blockLabel">Likely outcome</span>
                          <p>{scenario.outcome}</p>
                        </div>

                        <div className="scenarioExample">
                          <span className="blockLabel">Example flow</span>
                          <p>{scenario.example}</p>
                        </div>
                      </div>

                      <div className="scenarioFooter">
                        <Link href="/demo" className="scenarioLink">
                          Try this in the demo
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="section sectionCallout">
            <div className="container">
              <Reveal>
                <div className="calloutCard">
                  <div className="calloutText">
                    <span className="sectionEyebrow">What makes this different</span>
                    <h2 className="sectionTitle serif">
                      Laura is designed to reduce stress around access, not add another
                      vague layer of chat.
                    </h2>
                    <p className="sectionBody">
                      The product is grounded in practical care-navigation moments people
                      already recognise. That is what makes Omela feel credible.
                    </p>
                  </div>

                  <div className="calloutActions">
                    <Link href="/demo" className="buttonPrimary">
                      Try Laura demo
                      <ArrowRight size={14} />
                    </Link>
                    <Link href="/#waitlist" className="buttonSecondary">
                      Get early access
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        </main>

        <footer className="footer">
          <div className="container footerInner">
            <div className="footerTop">
              <p>&copy; 2026 Omela</p>

              <div className="footerLinks">
                <Link href="/privacy" className="footerLink">
                  Privacy
                </Link>
                <Link href="/terms" className="footerLink">
                  Terms
                </Link>
                <Link href="/status" className="footerLink">
                  Status
                </Link>
              </div>
            </div>

            <p className="footerNote">
              Laura is a care navigation assistant, not a medical professional. She does
              not provide diagnosis or treatment.
            </p>
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
button,input{font-family:inherit}
::selection{background:${c.accent};color:#fff}

.serif{font-family:'Instrument Serif',Georgia,serif}
.page{min-height:100vh;display:flex;flex-direction:column}
.container{max-width:1060px;margin:0 auto;padding:0 20px}

.nav{
  position:sticky;
  top:0;
  z-index:120;
  background:rgba(248,246,241,0.86);
  backdrop-filter:blur(16px);
  -webkit-backdrop-filter:blur(16px);
  border-bottom:1px solid rgba(228,221,210,0.74);
}
.navInner{
  min-height:72px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
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
  box-shadow:0 3px 12px rgba(0,0,0,0.06);
}
.brandName{
  font-size:15px;
  font-weight:800;
  letter-spacing:-0.03em;
}
.brandSub{
  margin-top:2px;
  font-size:8.5px;
  font-weight:800;
  letter-spacing:0.14em;
  color:${c.accent};
}

.navActions{
  display:flex;
  align-items:center;
  gap:8px;
}
.buttonPrimary,
.buttonSecondary{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:8px;
  border-radius:999px;
  padding:13px 20px;
  font-size:14px;
  font-weight:700;
  white-space:nowrap;
  transition:transform .22s ease,box-shadow .22s ease,background .22s ease,color .22s ease;
}
.buttonPrimary{
  background:${c.dark};
  color:#fff;
  border:none;
  box-shadow:0 10px 24px rgba(10,11,15,0.12);
}
.buttonPrimary:hover{
  transform:translateY(-1px);
  box-shadow:0 16px 30px rgba(10,11,15,0.16);
}
.buttonSecondary{
  background:rgba(255,255,255,0.88);
  color:${c.text};
  border:1px solid rgba(228,221,210,0.92);
}
.buttonSecondary:hover{
  transform:translateY(-1px);
  background:#fff;
  box-shadow:0 10px 24px rgba(17,18,20,0.06);
}
.navButtonPrimary{
  padding:10px 16px;
  font-size:12px;
}
.navButtonSecondary{
  padding:10px 16px;
  font-size:12px;
}

.hero{
  position:relative;
  padding:62px 0 34px;
  overflow:hidden;
}
.hero::before{
  content:"";
  position:absolute;
  inset:0;
  pointer-events:none;
  background:
    radial-gradient(circle at 16% 16%, rgba(37,99,235,0.06), transparent 26%),
    radial-gradient(circle at 82% 18%, rgba(201,149,107,0.11), transparent 24%),
    linear-gradient(180deg, rgba(255,255,255,0.45), rgba(255,255,255,0));
}
.heroInner{
  position:relative;
  z-index:2;
  max-width:760px;
}
.heroEyebrow,
.sectionEyebrow{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  font-size:11px;
  font-weight:800;
  letter-spacing:.12em;
  text-transform:uppercase;
  color:${c.muted};
}
.heroTitle,
.sectionTitle{
  margin-top:12px;
  font-size:clamp(34px,6.5vw,64px);
  line-height:1.02;
  letter-spacing:-0.05em;
}
.heroBody,
.sectionBody{
  margin-top:14px;
  max-width:680px;
  font-size:17px;
  line-height:1.78;
  color:${c.sub};
}
.heroPill{
  margin-top:18px;
  display:inline-flex;
  align-items:center;
  gap:8px;
  padding:10px 14px;
  border-radius:999px;
  background:rgba(255,255,255,0.86);
  border:1px solid rgba(228,221,210,0.92);
  color:${c.text};
  font-size:14px;
  font-weight:700;
  box-shadow:0 10px 24px rgba(17,18,20,0.04);
}
.heroButtons{
  margin-top:26px;
  display:flex;
  flex-wrap:wrap;
  gap:10px;
}

.section{
  padding:80px 0;
}
.sectionScenarios{
  padding-top:28px;
}
.sectionCallout{
  padding-top:10px;
}
.sectionHead{
  max-width:760px;
  margin:0 auto;
  text-align:center;
}
.sectionHeadLeft{
  margin:0;
  text-align:left;
}
.proofIntro{
  margin-bottom:28px;
}

.proofGrid{
  display:grid;
  grid-template-columns:1fr;
  gap:14px;
}
.proofCard{
  padding:24px;
  border-radius:22px;
  background:rgba(255,255,255,0.94);
  border:1px solid rgba(228,221,210,0.92);
  box-shadow:0 12px 28px rgba(17,18,20,0.04);
}
.proofCard h3{
  font-size:18px;
  font-weight:800;
  letter-spacing:-0.02em;
}
.proofCard p{
  margin-top:8px;
  font-size:14px;
  line-height:1.78;
  color:${c.sub};
}

.scenarioList{
  margin-top:34px;
  display:flex;
  flex-direction:column;
  gap:16px;
}
.scenarioCard{
  padding:28px;
  border-radius:26px;
  background:rgba(255,255,255,0.96);
  border:1px solid rgba(228,221,210,0.92);
  box-shadow:0 14px 30px rgba(17,18,20,0.04);
}
.scenarioTop{
  display:flex;
  align-items:flex-start;
  gap:14px;
}
.scenarioIcon{
  width:46px;
  height:46px;
  border-radius:15px;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-shrink:0;
}
.scenarioTopCopy{
  min-width:0;
}
.scenarioEyebrow{
  display:inline-flex;
  font-size:11px;
  font-weight:800;
  letter-spacing:.12em;
  text-transform:uppercase;
  color:${c.muted};
}
.scenarioTitle{
  margin-top:6px;
  font-size:24px;
  line-height:1.18;
  font-weight:800;
  letter-spacing:-0.035em;
}
.scenarioGrid{
  margin-top:18px;
  display:grid;
  grid-template-columns:1fr;
  gap:12px;
}
.scenarioBlock{
  padding:18px;
  border-radius:18px;
  background:#fff;
  border:1px solid rgba(228,221,210,0.92);
}
.scenarioBlockAccent{
  background:linear-gradient(180deg,#FFFFFF,#F8FBFF);
}
.blockLabel{
  display:inline-flex;
  font-size:11px;
  font-weight:800;
  letter-spacing:.1em;
  text-transform:uppercase;
  color:${c.muted};
}
.blockLabelAccent{
  color:${c.accent};
}
.scenarioBlock p,
.scenarioOutcome p,
.scenarioExample p{
  margin-top:8px;
  font-size:14px;
  line-height:1.8;
  color:${c.sub};
}
.scenarioBottom{
  margin-top:14px;
  display:grid;
  grid-template-columns:1fr;
  gap:12px;
}
.scenarioOutcome,
.scenarioExample{
  padding:18px;
  border-radius:18px;
  background:${c.bg};
  border:1px solid rgba(228,221,210,0.92);
}
.scenarioFooter{
  margin-top:18px;
}
.scenarioLink{
  display:inline-flex;
  align-items:center;
  gap:7px;
  font-size:14px;
  font-weight:700;
  color:${c.accent};
}

.calloutCard{
  padding:30px;
  border-radius:28px;
  background:linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,255,255,0.9));
  border:1px solid rgba(228,221,210,0.92);
  box-shadow:0 14px 30px rgba(17,18,20,0.04);
}
.calloutActions{
  margin-top:22px;
  display:flex;
  flex-wrap:wrap;
  gap:10px;
}

.footer{
  margin-top:auto;
  border-top:1px solid rgba(228,221,210,0.9);
  padding:20px 0 24px;
}
.footerInner{
  display:flex;
  flex-direction:column;
  gap:14px;
}
.footerTop{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:10px;
  flex-wrap:wrap;
}
.footerTop p{
  font-size:11px;
  color:${c.muted};
}
.footerLinks{
  display:flex;
  align-items:center;
  gap:14px;
  flex-wrap:wrap;
}
.footerLink{
  font-size:11px;
  font-weight:700;
  color:${c.muted};
}
.footerNote{
  font-size:12px;
  line-height:1.7;
  color:${c.muted};
}

@media(min-width:720px){
  .container{padding:0 24px}
  .proofGrid{
    grid-template-columns:repeat(3,1fr);
  }
  .scenarioGrid{
    grid-template-columns:1fr 1fr;
  }
  .scenarioBottom{
    grid-template-columns:1fr 1fr;
  }
}

@media(min-width:960px){
  .container{padding:0 32px}
  .hero{padding:76px 0 40px}
  .section{padding:96px 0}
  .sectionScenarios{padding-top:34px}
}

@media(max-width:639px){
  .navInner{
    min-height:66px;
  }
  .brandName{
    font-size:14px;
  }
  .navButtonSecondary{
    display:none;
  }
  .heroTitle,
  .sectionTitle{
    font-size:clamp(34px,10vw,54px);
  }
  .heroBody,
  .sectionBody{
    font-size:16px;
  }
  .scenarioCard{
    padding:22px;
  }
  .scenarioTitle{
    font-size:22px;
  }
  .calloutCard{
    padding:24px;
  }
}
`;