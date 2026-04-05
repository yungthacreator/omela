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
    id: "who-we-are",
    title: "1. Who we are",
    summary: "Who Omela is, what Laura is, and who controls your data.",
    content: [
      `Omela is a digital health company building Laura, a care navigation platform. Laura is a care navigation assistant, not a medical professional. She does not provide diagnosis or treatment.`,
      `For the purposes of UK data protection law, Omela is the data controller responsible for your personal information.`,
      `Contact: notice@omela.ai. Location: United Kingdom.`,
    ],
  },
  {
    id: "what-we-collect",
    title: "2. What we collect",
    summary: "The information you give us and the technical data we collect automatically.",
    content: [
      `We collect information you provide directly, including your email address, the role you select such as patient, provider, or developer, and any health-related information you choose to share during conversations with Laura.`,
      `We also collect technical data automatically, such as device type, browser, pages visited, and approximate location derived from your IP address.`,
      `If you purchase credits, Stripe processes your payment information. We do not store card details.`,
    ],
  },
  {
    id: "lawful-basis",
    title: "3. Lawful basis for processing",
    summary: "The legal reasons we rely on to process your data under UK GDPR.",
    content: [
      `We process your data under the lawful bases set out in Article 6 of the UK GDPR.`,
      `Consent: when you join our waitlist, create an account, or begin using Laura. You may withdraw consent at any time.`,
      `Explicit consent for health-related data: health-related information is special category data under Article 9 of the UK GDPR. We only process health-related information you share with Laura after obtaining your explicit consent.`,
      `Legitimate interests: to operate, improve, and secure our services, where those interests do not override your rights and freedoms.`,
      `Contractual necessity: where processing is required to provide services you have requested, such as credit purchases or account management.`,
      `Legal obligation: where we are required by law to process or retain certain data, such as financial records for tax purposes.`,
    ],
  },
  {
    id: "how-we-use",
    title: "4. How we use your information",
    summary: "How your data supports Laura, your account, and platform safety.",
    content: [
      `We use your information to provide Laura's care navigation services, manage your account and credit balance, communicate service updates, respond to support requests, improve Laura's accuracy and safety, ensure platform security, and comply with legal obligations.`,
      `We do not sell your personal data.`,
      `We do not use your data for advertising.`,
    ],
  },
  {
    id: "sharing",
    title: "5. Data sharing and third-party processors",
    summary: "The service providers that help us run Omela and when data may be shared.",
    content: [
      `We share data with service providers who help us operate Laura.`,
      `Cloud hosting: Vercel for application hosting and deployment. Data may be processed in the EU and US.`,
      `Database: Neon for PostgreSQL database hosting. Data may be processed in the EU.`,
      `AI model providers: we use third-party AI model providers to power Laura's responses. Conversation content is sent to these providers for processing. We select providers with strong data protection practices and do not permit them to use your data for training purposes.`,
      `Payment processing: Stripe processes credit purchases. We do not store card details.`,
      `All processors act only on our instructions and are contractually bound to protect your data under Article 28 of the UK GDPR.`,
      `We may share data with healthcare providers only when you explicitly request Laura to prepare a callback, registration, or prescription request on your behalf, and only with your approval before submission.`,
      `We may also disclose data to legal authorities where required by law.`,
    ],
  },
  {
    id: "international-transfers",
    title: "6. International transfers",
    summary: "How we protect data when service providers operate outside the UK.",
    content: [
      `Some of our service providers operate outside the United Kingdom.`,
      `Where data is transferred internationally, we ensure appropriate safeguards are in place, including Standard Contractual Clauses approved by the ICO or adequacy decisions recognised by the UK Government.`,
    ],
  },
  {
    id: "retention",
    title: "7. Data retention",
    summary: "How long we keep different types of data.",
    content: [
      `Account data: retained for as long as your account is active. If you delete your account, associated personal data is removed within 30 days unless retention is legally required.`,
      `Conversation data: retained for up to 12 months to improve safety and quality, then automatically deleted.`,
      `Health-related data: follows the same 12-month retention period unless you request earlier deletion.`,
      `Financial records: retained for 6 years for tax and accounting purposes as required by UK law.`,
      `Waitlist data: if you join the waitlist but do not create an account, your email and role selection are retained until you are onboarded or until you request removal.`,
    ],
  },
  {
    id: "rights",
    title: "8. Your rights under UK GDPR",
    summary: "The rights you can exercise over your personal data.",
    content: [
      `You have the right of access, rectification, erasure, data portability, restriction of processing, objection, and the right to withdraw consent where consent is the basis for processing.`,
      `You can request deletion of your data at any time. Upon receiving a valid deletion request, we will remove your personal data within 30 days, except where retention is required by law.`,
      `To exercise your rights, email notice@omela.ai. We will respond within 30 days as required by UK GDPR.`,
      `There is no fee for making a request unless it is manifestly unfounded or excessive.`,
    ],
  },
  {
    id: "security",
    title: "9. Security",
    summary: "The measures we take to protect your information.",
    content: [
      `We implement appropriate technical and organisational measures to protect your data, including encryption in transit, encryption at rest for sensitive fields, access controls, rate limiting, input validation, regular security reviews, and dependency scanning.`,
      `No system is perfectly secure, but we take proportionate steps to protect your information.`,
    ],
  },
  {
    id: "cookies",
    title: "10. Cookies",
    summary: "The limited use of cookies on Omela.",
    content: [
      `We use essential cookies for authentication and site functionality.`,
      `We do not use advertising or tracking cookies.`,
      `If we introduce analytics cookies in future, we will request your consent first.`,
    ],
  },
  {
    id: "children",
    title: "11. Children",
    summary: "How Omela treats data relating to children.",
    content: [
      `Laura is not intended for use by individuals under 16 without parental or guardian supervision.`,
      `We do not knowingly collect data from children under 16 without appropriate consent.`,
      `If we become aware that we have collected such data without appropriate consent, we will delete it promptly.`,
    ],
  },
  {
    id: "complaints",
    title: "12. Complaints",
    summary: "How to complain if you are unhappy with our handling of your data.",
    content: [
      `If you are unhappy with how we handle your data, you have the right to lodge a complaint with the Information Commissioner's Office.`,
      `Website: ico.org.uk`,
      `Phone: 0303 123 1113`,
    ],
  },
  {
    id: "changes",
    title: "13. Changes",
    summary: "How updates to this notice will be handled.",
    content: [
      `We may update this notice from time to time.`,
      `Significant changes will be communicated by email at least 14 days in advance where appropriate.`,
      `The latest version will always be available on this page.`,
    ],
  },
  {
    id: "contact",
    title: "14. Contact",
    summary: "How to contact us about privacy or data questions.",
    content: [
      `For questions about this privacy notice or your data, email notice@omela.ai.`,
    ],
  },
];

export default function Privacy() {
  const [openItems, setOpenItems] = useState<string[]>([
    "who-we-are",
    "rights",
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

            <h1 className="serif title">Privacy Notice</h1>

            <p className="intro">
              This notice explains how Omela collects, uses, and protects your
              personal information when you use Laura and our services. Omela
              is committed to compliance with the UK General Data Protection
              Regulation and the Data Protection Act 2018.
            </p>

            <div className="topCards">
              <div className="topCard">
                <span className="topCardLabel">Controller</span>
                <p>Omela, United Kingdom</p>
              </div>

              <div className="topCard">
                <span className="topCardLabel">Contact</span>
                <a href="mailto:notice@omela.ai" className="link">
                  notice@omela.ai
                </a>
              </div>

              <div className="topCard">
                <span className="topCardLabel">Important</span>
                <p>Laura is a care navigation assistant, not a medical professional.</p>
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
                            ) : paragraph.includes("ico.org.uk") ? (
                              <>
                                Website:{" "}
                                <a
                                  href="https://ico.org.uk"
                                  className="link"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  ico.org.uk
                                </a>
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
              <Link href="/terms" className="footerLink">
                Terms
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