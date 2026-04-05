"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');`;

const c = {
  bg: "#F8F6F1",
  surface: "#FFFFFF",
  text: "#121317",
  sub: "#4D5360",
  muted: "#858C9B",
  accent: "#2563EB",
  accentSoft: "#ECF2FF",
  border: "#E4DDD2",
  dark: "#0A0B0F",
};

type Section = {
  id: string;
  title: string;
  summary: string;
  content: string[];
};

const sections: Section[] = [
  {
    id: "about-laura",
    title: "1. About Laura",
    summary: "What Laura is, what she helps with, and what she is not.",
    content: [
      `Laura is a care navigation platform. She helps people find healthcare providers, prepare prescription requests, explain medical correspondence, help organise urgency-related concerns, and navigate healthcare systems.`,
      `Laura is not a medical professional. She does not provide clinical diagnoses, medical advice, or treatment recommendations.`,
      `Laura may assist in preparing requests or information, but does not act on behalf of users without their explicit confirmation.`,
      `Always consult a qualified healthcare professional for medical concerns. In an emergency, call 999 in the UK or 911 in the US.`,
    ],
  },
  {
    id: "eligibility",
    title: "2. Eligibility",
    summary: "Who can use Laura.",
    content: [
      `You must be at least 16 years old to use Laura.`,
      `If you are under 16, you may only use Laura with parental or guardian supervision.`,
    ],
  },
  {
    id: "accounts-credits",
    title: "3. Accounts and credits",
    summary: "How accounts, free credits, and paid credits work.",
    content: [
      `When you create an account, you may receive an initial allocation of free credits.`,
      `Credits are consumed when Laura performs actions within the platform, including messages, provider searches, prescription drafts, urgency-related guidance flows, and bilingual note generation.`,
      `You can purchase additional credits through our platform.`,
      `Credits are non-refundable, non-transferable, and do not roll over between billing periods on subscription plans unless we state otherwise.`,
      `We reserve the right to modify credit pricing with 30 days notice.`,
      `Current credit pricing and allocation details are displayed on our pricing page and may be updated from time to time.`,
    ],
  },
  {
    id: "acceptable-use",
    title: "4. Acceptable use",
    summary: "What you agree not to do when using Omela.",
    content: [
      `You agree not to misuse Omela, attempt to reverse-engineer our systems, impersonate another person, submit false health information with intent to deceive, use Laura as a substitute for emergency services, or attempt to extract Laura's system prompts or training data.`,
      `Violation of these terms may result in account suspension or termination.`,
    ],
  },
  {
    id: "limitations",
    title: "5. Limitations of Laura",
    summary: "Why Laura should be understood as a navigation tool, not a clinical authority.",
    content: [
      `Laura provides care navigation support based on the information you share and publicly available provider data.`,
      `Her outputs are informational only and should not replace professional medical judgement.`,
      `Laura may occasionally provide incomplete or imperfect guidance, and we are continuously improving her capabilities.`,
      `Provider information may not always be current.`,
      `Laura prepares requests and information to help you navigate the healthcare system, but any submission of requests to healthcare providers requires your explicit review and approval.`,
    ],
  },
  {
    id: "data-protection",
    title: "6. Data protection",
    summary: "How these terms connect to your privacy rights and data handling.",
    content: [
      `Your use of Laura is also governed by our Privacy Notice.`,
      `We process your data in accordance with the UK GDPR and the Data Protection Act 2018.`,
      `Health-related data is processed only with your explicit consent.`,
      `You have the right to access, correct, or delete your data at any time by contacting us at notice@omela.ai.`,
    ],
  },
  {
    id: "ip",
    title: "7. Intellectual property",
    summary: "Who owns the product, content, and underlying technology.",
    content: [
      `All content, design, and technology on this site and within Laura are owned by or licensed to Omela.`,
      `You may not reproduce, distribute, or create derivative works without our written permission.`,
    ],
  },
  {
    id: "availability",
    title: "8. Service availability",
    summary: "How Omela may change over time and what we do not guarantee.",
    content: [
      `We may update, suspend, or change parts of Omela from time to time.`,
      `We do not guarantee uninterrupted availability.`,
      `Scheduled maintenance will be communicated in advance where possible.`,
      `Laura currently works through the website. Additional access channels such as WhatsApp are part of our roadmap and will be announced when available.`,
    ],
  },
  {
    id: "liability",
    title: "9. Limitation of liability",
    summary: "The limits of our legal responsibility, as allowed by law.",
    content: [
      `To the maximum extent permitted by law, Omela shall not be liable for any indirect, incidental, or consequential damages arising from your use of Laura.`,
      `Our total liability shall not exceed the amount you have paid us in the 12 months preceding the claim.`,
      `Nothing in these terms excludes liability for death, personal injury caused by negligence, or fraud.`,
    ],
  },
  {
    id: "changes",
    title: "10. Changes to terms",
    summary: "How updates to these terms will be handled.",
    content: [
      `We may update these terms from time to time.`,
      `Continued use of Laura after changes constitutes acceptance of the updated terms.`,
      `We will notify you of significant changes by email at least 14 days in advance where appropriate.`,
    ],
  },
  {
    id: "law",
    title: "11. Governing law",
    summary: "Which legal system applies to these terms.",
    content: [
      `These terms are governed by the laws of England and Wales.`,
      `Any disputes will be subject to the exclusive jurisdiction of the English courts.`,
    ],
  },
  {
    id: "contact",
    title: "12. Contact",
    summary: "How to contact us about these terms.",
    content: [
      `For questions about these terms, email notice@omela.ai.`,
    ],
  },
];

export default function Terms() {
  const [openItems, setOpenItems] = useState<string[]>([
    "about-laura",
    "liability",
  ]);

  function toggleItem(id: string) {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

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
                  width={28}
                  height={28}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>
              <span className="brandName">Omela</span>
            </Link>

            <Link href="/" className="backLink">
              <ArrowLeft size={14} />
              Back
            </Link>
          </div>
        </nav>

        <main className="main">
          <div className="container content">
            <p className="updated">Last updated: 3 April 2026</p>

            <h1 className="serif title">Terms of Service</h1>

            <p className="intro">
              By accessing or using Omela and Laura, you agree to these terms.
              Omela is built with UK data protection principles in mind and is
              committed to compliance with UK GDPR.
            </p>

            <div className="badges">
              <span className="badge">Care navigation, not clinical care</span>
              <span className="badge">Built with UK legal clarity in mind</span>
            </div>

            <div className="topCards">
              <div className="topCard">
                <span className="topCardLabel">Product</span>
                <p>Laura by Omela</p>
              </div>

              <div className="topCard">
                <span className="topCardLabel">Important</span>
                <p>Laura is not a medical professional and does not provide diagnosis or treatment.</p>
              </div>

              <div className="topCard">
                <span className="topCardLabel">Contact</span>
                <a href="mailto:notice@omela.ai" className="link">
                  notice@omela.ai
                </a>
              </div>
            </div>

            <div className="accordion">
              {sections.map((section) => {
                const isOpen = openItems.includes(section.id);

                return (
                  <section key={section.id} className="accordionItem">
                    <button
                      type="button"
                      className="accordionButton"
                      onClick={() => toggleItem(section.id)}
                      aria-expanded={isOpen}
                      aria-controls={`panel-${section.id}`}
                    >
                      <div className="accordionHeading">
                        <h2>{section.title}</h2>
                        <p>{section.summary}</p>
                      </div>

                      <ChevronDown
                        size={18}
                        className={`chevron${isOpen ? " chevronOpen" : ""}`}
                      />
                    </button>

                    {isOpen && (
                      <div
                        id={`panel-${section.id}`}
                        className="accordionPanel"
                      >
                        {section.content.map((paragraph, index) => (
                          <p key={index}>
                            {paragraph.includes("notice@omela.ai") ? (
                              <>
                                {paragraph.split("notice@omela.ai")[0]}
                                <a
                                  href="mailto:notice@omela.ai"
                                  className="link"
                                >
                                  notice@omela.ai
                                </a>
                                {paragraph.split("notice@omela.ai")[1]}
                              </>
                            ) : (
                              paragraph
                            )}
                          </p>
                        ))}
                      </div>
                    )}
                  </section>
                );
              })}
            </div>
          </div>
        </main>

        <footer className="footer">
          <div className="container footerInner">
            <p>&copy; 2026 Omela</p>
            <div className="footerLinks">
              <Link href="/privacy" className="footerLink">
                Privacy
              </Link>
              <Link href="/status" className="footerLink">
                Status
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
  font-family:'DM Sans',-apple-system,sans-serif;
  -webkit-font-smoothing:antialiased;
  font-size:16px;
}
a{color:inherit;text-decoration:none}
button{font-family:inherit}
.serif{font-family:'Instrument Serif',Georgia,serif}

.page{
  min-height:100vh;
  display:flex;
  flex-direction:column;
}

.container{
  max-width:760px;
  margin:0 auto;
  padding:0 20px;
}

.nav{
  position:sticky;
  top:0;
  z-index:20;
  border-bottom:1px solid ${c.border};
  background:rgba(248,246,241,0.94);
  backdrop-filter:blur(16px);
  -webkit-backdrop-filter:blur(16px);
}

.navInner{
  height:58px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
}

.brand{
  display:flex;
  align-items:center;
  gap:8px;
  font-size:14px;
  font-weight:800;
}

.brandMark{
  width:28px;
  height:28px;
  border-radius:8px;
  overflow:hidden;
}

.brandName{
  letter-spacing:-0.03em;
}

.backLink{
  display:flex;
  align-items:center;
  gap:5px;
  font-size:13px;
  font-weight:600;
  color:${c.muted};
}

.main{
  flex:1;
  padding:48px 0 70px;
}

.content{
  display:flex;
  flex-direction:column;
}

.updated{
  font-size:12px;
  font-weight:600;
  color:${c.muted};
  margin-bottom:8px;
}

.title{
  font-size:clamp(34px,7vw,52px);
  line-height:1.04;
  letter-spacing:-0.045em;
}

.intro{
  margin-top:16px;
  font-size:15px;
  line-height:1.82;
  color:${c.sub};
  max-width:680px;
}

.badges{
  display:flex;
  flex-wrap:wrap;
  gap:8px;
  margin-top:16px;
}

.badge{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  padding:6px 12px;
  border-radius:999px;
  background:rgba(37,99,235,0.06);
  border:1px solid rgba(37,99,235,0.1);
  color:${c.accent};
  font-size:11px;
  font-weight:700;
}

.topCards{
  display:grid;
  grid-template-columns:1fr;
  gap:10px;
  margin-top:22px;
}

.topCard{
  padding:16px 18px;
  border-radius:16px;
  background:${c.surface};
  border:1px solid ${c.border};
}

.topCardLabel{
  display:block;
  font-size:11px;
  font-weight:800;
  letter-spacing:0.08em;
  text-transform:uppercase;
  color:${c.muted};
  margin-bottom:6px;
}

.topCard p,
.topCard a{
  font-size:14px;
  line-height:1.7;
  color:${c.sub};
}

.accordion{
  display:flex;
  flex-direction:column;
  gap:12px;
  margin-top:24px;
}

.accordionItem{
  background:${c.surface};
  border:1px solid ${c.border};
  border-radius:18px;
  overflow:hidden;
}

.accordionButton{
  width:100%;
  border:none;
  background:transparent;
  text-align:left;
  padding:18px;
  display:flex;
  align-items:flex-start;
  justify-content:space-between;
  gap:14px;
  cursor:pointer;
}

.accordionHeading{
  min-width:0;
}

.accordionHeading h2{
  font-size:16px;
  line-height:1.35;
  font-weight:800;
  letter-spacing:-0.02em;
  color:${c.text};
}

.accordionHeading p{
  margin-top:6px;
  font-size:13px;
  line-height:1.65;
  color:${c.muted};
}

.chevron{
  flex-shrink:0;
  color:${c.muted};
  transition:transform 0.2s ease;
  margin-top:2px;
}

.chevronOpen{
  transform:rotate(180deg);
}

.accordionPanel{
  padding:0 18px 18px 18px;
  border-top:1px solid ${c.border};
}

.accordionPanel p{
  font-size:14px;
  line-height:1.8;
  color:${c.sub};
  margin-top:12px;
}

.accordionPanel p:first-child{
  margin-top:14px;
}

.link{
  color:${c.accent};
  font-weight:600;
  text-decoration:underline;
  text-underline-offset:2px;
}

.footer{
  border-top:1px solid ${c.border};
  padding:16px 0;
}

.footerInner{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
}

.footerInner p{
  font-size:11px;
  color:${c.muted};
}

.footerLinks{
  display:flex;
  gap:12px;
}

.footerLink{
  font-size:11px;
  font-weight:600;
  color:${c.muted};
}

@media(min-width:640px){
  .container{padding:0 28px}
  .topCards{
    grid-template-columns:repeat(3,1fr);
  }
}
`;