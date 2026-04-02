"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
const FONT=`@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');`;
const c={bg:"#F8F6F1",text:"#111214",sub:"#4A4F5C",muted:"#888E9C",accent:"#2563EB",border:"#E3DDD2"};
export default function Terms(){return(<><style>{FONT}</style><style>{CSS}</style><div className="lW">
  <nav className="lN"><div className="cnt lNI"><Link href="/" className="lBr"><div className="lLo"><Image src="/omela-logo-mark.png" alt="Omela" width={28} height={28} style={{width:"100%",height:"100%",objectFit:"contain"}}/></div><span className="lBrN">Omela</span></Link><Link href="/" className="lBk"><ArrowLeft size={14}/>Back</Link></div></nav>
  <main className="lM"><div className="cnt lC">
    <p className="lUp">Last updated: 1 April 2026</p>
    <h1 className="serif lTi">Terms of Service</h1>
    <p className="lIn">By accessing or using Omela and Laura, you agree to these terms. Please read them carefully.</p>
    <section className="lS"><h2>1. About Laura</h2><p>Laura is an AI-powered care navigation assistant. She helps people find healthcare providers, understand medical correspondence, manage prescription requests, and navigate healthcare systems. Laura is not a medical professional and does not provide clinical diagnoses, medical advice, or treatment recommendations. Always consult a qualified healthcare professional for medical concerns.</p></section>
    <section className="lS"><h2>2. Eligibility</h2><p>You must be at least 16 years old to use Laura. If you are under 16, you may only use Laura with parental or guardian supervision.</p></section>
    <section className="lS"><h2>3. Account and waitlist</h2><p>When you join our waitlist, you provide an email address and select a role. You are responsible for ensuring this information is accurate. We reserve the right to manage waitlist access at our discretion.</p></section>
    <section className="lS"><h2>4. Acceptable use</h2><p>You agree not to use Laura for any unlawful purpose, to attempt to reverse-engineer our systems, to impersonate another person, or to submit false or misleading health information with intent to deceive. You also agree not to use Laura as a substitute for emergency medical services.</p></section>
    <section className="lS"><h2>5. Limitations of Laura</h2><p>Laura provides care navigation guidance based on the information you share. Her suggestions are informational only and should not replace professional medical judgement. Laura may occasionally provide incomplete or imperfect guidance. We are continuously improving her capabilities.</p></section>
    <section className="lS"><h2>6. Intellectual property</h2><p>All content, design, and technology on this site and within Laura are owned by Omela. You may not reproduce, distribute, or create derivative works without our written permission.</p></section>
    <section className="lS"><h2>7. Privacy</h2><p>Your use of Laura is also governed by our <Link href="/privacy" className="lLk">Privacy Notice</Link>, which explains how we collect, use, and protect your data.</p></section>
    <section className="lS"><h2>8. Limitation of liability</h2><p>To the maximum extent permitted by law, Omela shall not be liable for any indirect, incidental, or consequential damages arising from your use of Laura. Our total liability shall not exceed the amount you have paid us in the 12 months preceding the claim.</p></section>
    <section className="lS"><h2>9. Changes to terms</h2><p>We may update these terms from time to time. Continued use of Laura after changes constitutes acceptance of the updated terms. We will notify waitlist members of significant changes by email.</p></section>
    <section className="lS"><h2>10. Governing law</h2><p>These terms are governed by the laws of England and Wales. Any disputes will be subject to the exclusive jurisdiction of the English courts.</p></section>
    <section className="lS"><h2>11. Contact</h2><p>For questions about these terms, email <a href="mailto:notice@omela.ai" className="lLk">notice@omela.ai</a>.</p></section>
  </div></main>
  <footer className="lFt"><div className="cnt lFtI"><p>&copy; 2026 Omela</p><div className="lFtLks"><Link href="/privacy" className="lFtL">Privacy</Link><Link href="/status" className="lFtL">Status</Link></div></div></footer>
</div></>);}
const CSS=`
*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}body{background:${c.bg};color:${c.text};font-family:'DM Sans',-apple-system,sans-serif;-webkit-font-smoothing:antialiased;font-size:16px}a{color:inherit;text-decoration:none}
.serif{font-family:'Instrument Serif',Georgia,serif}.cnt{max-width:680px;margin:0 auto;padding:0 20px}
.lW{min-height:100vh;display:flex;flex-direction:column}.lN{border-bottom:1px solid ${c.border};background:rgba(248,246,241,0.94);backdrop-filter:blur(16px);position:sticky;top:0;z-index:10}.lNI{display:flex;align-items:center;justify-content:space-between;height:56px}.lBr{display:flex;align-items:center;gap:7px;font-size:14px;font-weight:800}.lLo{width:26px;height:26px;border-radius:8px;overflow:hidden}.lBrN{letter-spacing:-0.03em}.lBk{display:flex;align-items:center;gap:4px;font-size:13px;font-weight:600;color:${c.muted}}
.lM{flex:1;padding:48px 0 64px}.lUp{font-size:12px;color:${c.muted};font-weight:600;margin-bottom:8px}.lTi{font-size:clamp(32px,7vw,48px);letter-spacing:-0.04em;line-height:1.06}.lIn{margin-top:16px;font-size:16px;line-height:1.75;color:${c.sub};padding-bottom:28px;border-bottom:1px solid ${c.border}}
.lS{padding:24px 0;border-bottom:1px solid ${c.border}}.lS h2{font-size:17px;font-weight:800;letter-spacing:-0.02em;margin-bottom:8px}.lS p{font-size:15px;line-height:1.78;color:${c.sub}}.lLk{color:${c.accent};font-weight:600;text-decoration:underline;text-underline-offset:2px}
.lFt{border-top:1px solid ${c.border};padding:16px 0}.lFtI{display:flex;align-items:center;justify-content:space-between}.lFtI p{font-size:11px;color:${c.muted}}.lFtLks{display:flex;gap:12px}.lFtL{font-size:11px;color:${c.muted};font-weight:600}
@media(min-width:640px){.cnt{padding:0 28px}.lM{padding:56px 0 72px}}
`;
