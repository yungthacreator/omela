"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');`;
const c = { bg: "#F8F6F1", text: "#111214", sub: "#4A4F5C", muted: "#888E9C", accent: "#2563EB", border: "#E3DDD2" };

export default function Terms() {
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
            <h1 className="serif lTi">Terms of Service</h1>
            <p className="lIn">By accessing or using Omela and Laura, you agree to these terms. Omela is built with UK data protection principles in mind and is committed to compliance with UK GDPR.</p>

            <section className="lS">
              <h2>1. About Laura</h2>
              <p>Laura is a care navigation platform. She helps people find healthcare providers, prepare prescription requests, explain medical correspondence, assess urgency, and navigate healthcare systems. Laura is not a medical professional. She does not provide clinical diagnoses, medical advice, or treatment recommendations. Laura may assist in preparing requests or information, but does not act on behalf of users without their explicit confirmation. Always consult a qualified healthcare professional for medical concerns. In an emergency, call 999 (UK) or 911 (US).</p>
            </section>

            <section className="lS">
              <h2>2. Eligibility</h2>
              <p>You must be at least 16 years old to use Laura. If you are under 16, you may only use Laura with parental or guardian supervision.</p>
            </section>

            <section className="lS">
              <h2>3. Accounts and credits</h2>
              <p>When you create an account, you receive an initial allocation of free credits. Credits are consumed when Laura performs actions on your behalf, including messages, provider searches, prescription drafts, urgency assessments, and bilingual note generation. You can purchase additional credits through our platform. Credits are non-refundable, non-transferable, and do not roll over between billing periods on subscription plans. We reserve the right to modify credit pricing with 30 days notice. Current credit pricing and allocation details are displayed on our pricing page and may be updated from time to time.</p>
            </section>

            <section className="lS">
              <h2>4. Acceptable use</h2>
              <p>You agree not to misuse Omela, attempt to reverse-engineer our systems, impersonate another person, submit false health information with intent to deceive, use Laura as a substitute for emergency services, or attempt to extract Laura's system prompts or training data. Violation of these terms may result in account suspension or termination.</p>
            </section>

            <section className="lS">
              <h2>5. Limitations of Laura</h2>
              <p>Laura provides care navigation guidance based on the information you share and publicly available provider data. Her suggestions are informational only and should not replace professional medical judgement. Laura may occasionally provide incomplete or imperfect guidance. We are continuously improving her capabilities. Laura's provider data may not always be current. Laura prepares requests and information to help you navigate the healthcare system, but any submission of requests to healthcare providers requires your explicit review and approval.</p>
            </section>

            <section className="lS">
              <h2>6. Data protection</h2>
              <p>Your use of Laura is governed by our <Link href="/privacy" className="lLk">Privacy Notice</Link>. We process your data in accordance with UK GDPR and the Data Protection Act 2018. Health-related data is processed only with your explicit consent. You have the right to access, correct, or delete your data at any time by contacting us at notice@omela.ai.</p>
            </section>

            <section className="lS">
              <h2>7. Intellectual property</h2>
              <p>All content, design, and technology on this site and within Laura are owned by or licensed to Omela. You may not reproduce, distribute, or create derivative works without our written permission.</p>
            </section>

            <section className="lS">
              <h2>8. Service availability</h2>
              <p>We may update, suspend, or change parts of Omela from time to time. We do not guarantee uninterrupted availability. Scheduled maintenance will be communicated in advance where possible. Laura currently works through the website. Additional access channels such as WhatsApp are part of our roadmap and will be announced when available.</p>
            </section>

            <section className="lS">
              <h2>9. Limitation of liability</h2>
              <p>To the maximum extent permitted by law, Omela shall not be liable for any indirect, incidental, or consequential damages arising from your use of Laura. Our total liability shall not exceed the amount you have paid us in the 12 months preceding the claim. Nothing in these terms excludes liability for death, personal injury caused by negligence, or fraud.</p>
            </section>

            <section className="lS">
              <h2>10. Changes to terms</h2>
              <p>We may update these terms from time to time. Continued use of Laura after changes constitutes acceptance. We will notify you of significant changes by email at least 14 days in advance.</p>
            </section>

            <section className="lS">
              <h2>11. Governing law</h2>
              <p>These terms are governed by the laws of England and Wales. Any disputes will be subject to the exclusive jurisdiction of the English courts.</p>
            </section>

            <section className="lS" style={{ borderBottom: "none" }}>
              <h2>12. Contact</h2>
              <p>For questions about these terms, email <a href="mailto:notice@omela.ai" className="lLk">notice@omela.ai</a>.</p>
            </section>
          </div>
        </main>
        <footer className="lFt">
          <div className="cnt lFtI">
            <p>&copy; 2026 Omela</p>
            <div className="lFtLks"><Link href="/privacy" className="lFtL">Privacy</Link><Link href="/status" className="lFtL">Status</Link></div>
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
.lS{padding:22px 0;border-bottom:1px solid ${c.border}}.lS h2{font-size:16px;font-weight:800;letter-spacing:-0.02em;margin-bottom:8px}.lS p{font-size:14px;line-height:1.78;color:${c.sub};margin-bottom:8px}.lS p:last-child{margin-bottom:0}.lLk{color:${c.accent};font-weight:600;text-decoration:underline;text-underline-offset:2px}
.lFt{border-top:1px solid ${c.border};padding:16px 0}.lFtI{display:flex;align-items:center;justify-content:space-between}.lFtI p{font-size:11px;color:${c.muted}}.lFtLks{display:flex;gap:12px}.lFtL{font-size:11px;color:${c.muted};font-weight:600}
@media(min-width:640px){.cnt{padding:0 28px}}
`;
