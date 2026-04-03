"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');`;
const c = { bg: "#F8F6F1", text: "#111214", sub: "#4A4F5C", muted: "#888E9C", accent: "#2563EB", border: "#E3DDD2" };

export default function Privacy() {
  return (
    <>
      <style>{FONT}</style>
      <style>{CSS}</style>
      <div className="lW">
        <nav className="lN">
          <div className="cnt lNI">
            <Link href="/" className="lBr"><div className="lLo"><Image src="/omela-logo-mark.png" alt="Omela" width={28} height={28} style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div><span className="lBrN">Omela</span></Link>
            <Link href="/" className="lBk"><ArrowLeft size={14} />Back</Link>
          </div>
        </nav>
        <main className="lM">
          <div className="cnt lC">
            <p className="lUp">Last updated: 3 April 2026</p>
            <h1 className="serif lTi">Privacy Notice</h1>
            <p className="lIn">This notice explains how Omela (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, uses, and protects your personal information when you use Laura and our services. Omela is committed to compliance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.</p>
            <div className="lBadges">
              <span className="lBadge">Privacy-first by design</span>
              <span className="lBadge">Built with UK data protection in mind</span>
            </div>

            <section className="lS">
              <h2>1. Who we are</h2>
              <p>Omela is a digital health company building Laura, a care navigation platform. Laura is a care navigation assistant, not a medical professional. She does not provide diagnosis or treatment. For the purposes of UK data protection law, Omela is the data controller responsible for your personal information. Contact: notice@omela.ai. Location: United Kingdom.</p>
            </section>

            <section className="lS">
              <h2>2. What we collect</h2>
              <p>We collect information you provide directly: your email address, the role you select (patient, provider, or developer), and any health-related information you share during conversations with Laura. We also collect technical data automatically: device type, browser, pages visited, and approximate location derived from your IP address. If you purchase credits, Stripe processes your payment information. We do not store card details.</p>
            </section>

            <section className="lS">
              <h2>3. Lawful basis for processing</h2>
              <p>We process your data under the following lawful bases as defined by Article 6 of the UK GDPR:</p>
              <p><strong>Consent:</strong> When you join our waitlist, create an account, or start a conversation with Laura. You may withdraw consent at any time by contacting us or deleting your account.</p>
              <p><strong>Explicit consent for health-related data:</strong> Health-related information is classified as special category data under Article 9 of the UK GDPR. We will only process health-related data you share with Laura after obtaining your explicit consent. You will be asked to confirm before any health-related information is processed. You may withdraw this consent at any time without affecting the lawfulness of processing carried out before withdrawal.</p>
              <p><strong>Legitimate interests:</strong> To operate, improve, and secure our services, provided these interests do not override your rights and freedoms.</p>
              <p><strong>Contractual necessity:</strong> Where processing is required to provide services you have requested, such as credit purchases or account management.</p>
              <p><strong>Legal obligation:</strong> Where we are required by law to process or retain certain data, such as financial records for tax purposes.</p>
            </section>

            <section className="lS">
              <h2>4. How we use your information</h2>
              <p>We use your information to provide Laura's care navigation services, manage your account and credit balance, communicate service updates, respond to support requests, improve Laura's accuracy and safety, ensure platform security, and comply with legal obligations. We do not sell your personal data. We do not use your data for advertising.</p>
            </section>

            <section className="lS">
              <h2>5. Data sharing and third-party processors</h2>
              <p>We share data with the following categories of service providers who help us operate Laura:</p>
              <p><strong>Cloud hosting:</strong> Vercel (application hosting and deployment). Data may be processed in the EU and US.</p>
              <p><strong>Database:</strong> Neon (PostgreSQL database hosting). Data may be processed in the EU.</p>
              <p><strong>AI model providers:</strong> We use third-party AI model providers to power Laura's responses. Conversation content is sent to these providers for processing. We select providers with strong data protection practices and do not permit them to use your data for training purposes.</p>
              <p><strong>Payment processing:</strong> Stripe processes credit purchases. We do not store card details.</p>
              <p>All processors act only on our instructions and are contractually bound to protect your data under Article 28 of the UK GDPR.</p>
              <p>We may share data with healthcare providers only when you explicitly request Laura to prepare a callback, registration, or prescription request on your behalf, and only with your approval before submission. We may disclose data to legal authorities where required by law.</p>
            </section>

            <section className="lS">
              <h2>6. International transfers</h2>
              <p>Some of our service providers operate outside the United Kingdom. Where data is transferred internationally, we ensure appropriate safeguards are in place, including Standard Contractual Clauses approved by the ICO or adequacy decisions recognised by the UK Government.</p>
            </section>

            <section className="lS">
              <h2>7. Data retention</h2>
              <p><strong>Account data:</strong> Retained for as long as your account is active. If you delete your account, all associated personal data is removed within 30 days.</p>
              <p><strong>Conversation data:</strong> Conversations with Laura are retained for up to 12 months to improve safety and quality. Conversation data is only stored as needed for these purposes and is automatically deleted after 12 months.</p>
              <p><strong>Health-related data:</strong> Health-related information shared during conversations follows the same 12-month retention period. You may request earlier deletion at any time.</p>
              <p><strong>Financial records:</strong> Credit transaction records are retained for 6 years for tax and accounting purposes as required by UK law.</p>
              <p><strong>Waitlist data:</strong> If you join the waitlist but do not create an account, your email and role selection are retained until you are onboarded or until you request removal.</p>
            </section>

            <section className="lS">
              <h2>8. Your rights under UK GDPR</h2>
              <p>You have the following rights in relation to your personal data:</p>
              <p><strong>Right of access:</strong> You can request a copy of all personal data we hold about you (data subject access request).</p>
              <p><strong>Right to rectification:</strong> You can request correction of any inaccurate or incomplete information.</p>
              <p><strong>Right to erasure:</strong> You can request deletion of your data at any time. Upon receiving a valid deletion request, we will remove your personal data within 30 days, except where retention is required by law.</p>
              <p><strong>Right to data portability:</strong> You can request your data in a structured, commonly used, machine-readable format.</p>
              <p><strong>Right to restrict processing:</strong> You can request that we limit how we use your data in certain circumstances.</p>
              <p><strong>Right to object:</strong> You can object to processing based on legitimate interests.</p>
              <p><strong>Right to withdraw consent:</strong> Where processing is based on consent, you may withdraw it at any time without affecting prior processing.</p>
              <p>To exercise any of these rights, email <a href="mailto:notice@omela.ai" className="lLk">notice@omela.ai</a>. We will respond within 30 days as required by UK GDPR. There is no fee for making a request unless it is manifestly unfounded or excessive.</p>
            </section>

            <section className="lS">
              <h2>9. Security</h2>
              <p>We implement appropriate technical and organisational measures to protect your data: encryption in transit (TLS) and at rest (AES-256 for sensitive fields), access controls, rate limiting, input validation, regular security reviews, and dependency scanning. No system is perfectly secure, but we take proportionate steps to protect your information.</p>
            </section>

            <section className="lS">
              <h2>10. Cookies</h2>
              <p>We use essential cookies for authentication and site functionality. We do not use advertising or tracking cookies. If we introduce analytics cookies in future, we will request your consent first.</p>
            </section>

            <section className="lS">
              <h2>11. Children</h2>
              <p>Laura is not intended for use by individuals under 16 without parental or guardian supervision. We do not knowingly collect data from children under 16. If we become aware that we have collected data from a child under 16 without appropriate consent, we will delete it promptly.</p>
            </section>

            <section className="lS">
              <h2>12. Complaints</h2>
              <p>If you are unhappy with how we handle your data, you have the right to lodge a complaint with the Information Commissioner's Office (ICO). Website: ico.org.uk. Phone: 0303 123 1113.</p>
            </section>

            <section className="lS">
              <h2>13. Changes</h2>
              <p>We may update this notice from time to time. Significant changes will be communicated by email at least 14 days in advance. The latest version will always be available on this page.</p>
            </section>

            <section className="lS" style={{ borderBottom: "none" }}>
              <h2>14. Contact</h2>
              <p>For questions about this privacy notice or your data, email <a href="mailto:notice@omela.ai" className="lLk">notice@omela.ai</a>.</p>
            </section>
          </div>
        </main>
        <footer className="lFt">
          <div className="cnt lFtI">
            <p>&copy; 2026 Omela</p>
            <div className="lFtLks"><Link href="/terms" className="lFtL">Terms</Link><Link href="/status" className="lFtL">Status</Link></div>
          </div>
        </footer>
      </div>
    </>
  );
}

const CSS = `
*{box-sizing:border-box;margin:0;padding:0}body{background:${c.bg};color:${c.text};font-family:'DM Sans',-apple-system,sans-serif;-webkit-font-smoothing:antialiased;font-size:16px}a{color:inherit;text-decoration:none}
.serif{font-family:'Instrument Serif',Georgia,serif}.cnt{max-width:680px;margin:0 auto;padding:0 20px}
.lW{min-height:100vh;display:flex;flex-direction:column}.lN{border-bottom:1px solid ${c.border};background:rgba(248,246,241,0.94);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);position:sticky;top:0;z-index:10}.lNI{display:flex;align-items:center;justify-content:space-between;height:56px}.lBr{display:flex;align-items:center;gap:7px;font-size:14px;font-weight:800}.lLo{width:26px;height:26px;border-radius:8px;overflow:hidden}.lBrN{letter-spacing:-0.03em}.lBk{display:flex;align-items:center;gap:4px;font-size:13px;font-weight:600;color:${c.muted}}
.lM{flex:1;padding:48px 0 64px}.lUp{font-size:12px;color:${c.muted};font-weight:600;margin-bottom:8px}.lTi{font-size:clamp(32px,7vw,48px);letter-spacing:-0.04em;line-height:1.06}.lIn{margin-top:16px;font-size:15px;line-height:1.78;color:${c.sub};padding-bottom:20px;border-bottom:1px solid ${c.border}}
.lBadges{display:flex;gap:8px;margin-top:14px;margin-bottom:6px;flex-wrap:wrap}.lBadge{padding:5px 12px;border-radius:8px;background:rgba(37,99,235,0.06);border:1px solid rgba(37,99,235,0.1);color:${c.accent};font-size:11px;font-weight:700}
.lS{padding:22px 0;border-bottom:1px solid ${c.border}}.lS h2{font-size:16px;font-weight:800;letter-spacing:-0.02em;margin-bottom:8px}.lS p{font-size:14px;line-height:1.78;color:${c.sub};margin-bottom:8px}.lS p:last-child{margin-bottom:0}.lS strong{color:${c.text};font-weight:700}.lLk{color:${c.accent};font-weight:600;text-decoration:underline;text-underline-offset:2px}
.lFt{border-top:1px solid ${c.border};padding:16px 0}.lFtI{display:flex;align-items:center;justify-content:space-between}.lFtI p{font-size:11px;color:${c.muted}}.lFtLks{display:flex;gap:12px}.lFtL{font-size:11px;color:${c.muted};font-weight:600}
@media(min-width:640px){.cnt{padding:0 28px}}
`;
