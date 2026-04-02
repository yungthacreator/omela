"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
const FONT=`@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');`;
const c={bg:"#F8F6F1",text:"#111214",sub:"#4A4F5C",muted:"#888E9C",accent:"#2563EB",border:"#E3DDD2",dark:"#08090C"};
export default function Privacy(){return(<><style>{FONT}</style><style>{CSS}</style><div className="lW">
  <nav className="lN"><div className="cnt lNI"><Link href="/" className="lBr"><div className="lLo"><Image src="/omela-logo-mark.png" alt="Omela" width={28} height={28} style={{width:"100%",height:"100%",objectFit:"contain"}}/></div><span className="lBrN">Omela</span></Link><Link href="/" className="lBk"><ArrowLeft size={14}/>Back</Link></div></nav>
  <main className="lM"><div className="cnt lC">
    <p className="lUp">Last updated: 1 April 2026</p>
    <h1 className="serif lTi">Privacy Notice</h1>
    <p className="lIn">This notice explains how Omela ("we", "us") collects, uses, and protects your personal information when you use Laura and our services.</p>
    <section className="lS"><h2>1. What we collect</h2><p>When you join our waitlist or use Laura, we may collect your email address, the role you select (patient, provider, or developer), and any health-related information you share during conversations with Laura. We also collect basic usage data such as pages visited and device type.</p></section>
    <section className="lS"><h2>2. How we use your information</h2><p>We use your information to provide and improve Laura, to manage your waitlist position, to communicate updates about our service, and to ensure the safety and security of our platform. We do not sell your personal data to third parties.</p></section>
    <section className="lS"><h2>3. Health information</h2><p>Laura may process health-related information you share during conversations. This information is used solely to provide care navigation guidance. Laura does not store conversation history beyond what is needed to maintain context within a single session unless you explicitly opt in to saved history.</p></section>
    <section className="lS"><h2>4. Data storage and security</h2><p>Your data is stored securely using industry-standard encryption. We use Neon (PostgreSQL) for database services and Vercel for hosting. All data transfers are encrypted using TLS. We regularly review our security practices and limit access to personal data to authorised personnel only.</p></section>
    <section className="lS"><h2>5. Your rights</h2><p>Under UK GDPR, you have the right to access, correct, or delete your personal data. You may also request a copy of your data in a portable format. To exercise any of these rights, contact us at notice@omela.ai.</p></section>
    <section className="lS"><h2>6. Cookies</h2><p>We use essential cookies to maintain site functionality. We do not use advertising or tracking cookies. Analytics cookies are only used with your consent.</p></section>
    <section className="lS"><h2>7. Third parties</h2><p>We may share data with service providers who help us operate Laura (such as cloud hosting and AI model providers). These providers are contractually bound to protect your data and use it only for the purposes we specify.</p></section>
    <section className="lS"><h2>8. Children</h2><p>Laura is not intended for use by individuals under 16 without parental supervision. We do not knowingly collect data from children under 16.</p></section>
    <section className="lS"><h2>9. Changes to this notice</h2><p>We may update this notice from time to time. Significant changes will be communicated via email to waitlist members. The latest version will always be available on this page.</p></section>
    <section className="lS"><h2>10. Contact</h2><p>If you have questions about this privacy notice or how we handle your data, email us at <a href="mailto:notice@omela.ai" className="lLk">notice@omela.ai</a>.</p></section>
  </div></main>
  <footer className="lFt"><div className="cnt lFtI"><p>&copy; 2026 Omela</p><div className="lFtLks"><Link href="/terms" className="lFtL">Terms</Link><Link href="/status" className="lFtL">Status</Link></div></div></footer>
</div></>);}
const CSS=`
*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}body{background:${c.bg};color:${c.text};font-family:'DM Sans',-apple-system,sans-serif;-webkit-font-smoothing:antialiased;font-size:16px}a{color:inherit;text-decoration:none}
.serif{font-family:'Instrument Serif',Georgia,serif}.cnt{max-width:680px;margin:0 auto;padding:0 20px}
.lW{min-height:100vh;display:flex;flex-direction:column}.lN{border-bottom:1px solid ${c.border};background:rgba(248,246,241,0.94);backdrop-filter:blur(16px);position:sticky;top:0;z-index:10}.lNI{display:flex;align-items:center;justify-content:space-between;height:56px}.lBr{display:flex;align-items:center;gap:7px;font-size:14px;font-weight:800}.lLo{width:26px;height:26px;border-radius:8px;overflow:hidden}.lBrN{letter-spacing:-0.03em}.lBk{display:flex;align-items:center;gap:4px;font-size:13px;font-weight:600;color:${c.muted}}
.lM{flex:1;padding:48px 0 64px}.lC{}.lUp{font-size:12px;color:${c.muted};font-weight:600;margin-bottom:8px}.lTi{font-size:clamp(32px,7vw,48px);letter-spacing:-0.04em;line-height:1.06}.lIn{margin-top:16px;font-size:16px;line-height:1.75;color:${c.sub};padding-bottom:28px;border-bottom:1px solid ${c.border}}
.lS{padding:24px 0;border-bottom:1px solid ${c.border}}.lS h2{font-size:17px;font-weight:800;letter-spacing:-0.02em;margin-bottom:8px}.lS p{font-size:15px;line-height:1.78;color:${c.sub}}.lLk{color:${c.accent};font-weight:600;text-decoration:underline;text-underline-offset:2px}
.lFt{border-top:1px solid ${c.border};padding:16px 0}.lFtI{display:flex;align-items:center;justify-content:space-between}.lFtI p{font-size:11px;color:${c.muted}}.lFtLks{display:flex;gap:12px}.lFtL{font-size:11px;color:${c.muted};font-weight:600}
@media(min-width:640px){.cnt{padding:0 28px}.lM{padding:56px 0 72px}}
`;
