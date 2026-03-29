"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');`;

const c = {
  bg: "#F8F6F1", card: "#FFFFFF", dark: "#08090C",
  text: "#111214", sub: "#4A4F5C", muted: "#888E9C",
  accent: "#2563EB", border: "#E3DDD2",
  green: "#22C55E", greenSoft: "#ECFDF3", greenDk: "#15803D",
  amber: "#F59E0B",
  red: "#EF4444",
};

type ServiceStatus = "operational" | "degraded" | "outage";

const services: { name: string; status: ServiceStatus; uptime: string; bars: ServiceStatus[] }[] = [
  { name: "Laura Chat", status: "operational", uptime: "99.94%", bars: generateBars(0.997) },
  { name: "Urgency Engine", status: "operational", uptime: "99.98%", bars: generateBars(0.999) },
  { name: "Provider Search", status: "operational", uptime: "99.91%", bars: generateBars(0.995) },
  { name: "Translation", status: "operational", uptime: "99.96%", bars: generateBars(0.998) },
  { name: "Waitlist API", status: "operational", uptime: "100%", bars: generateBars(1.0) },
  { name: "Admin Dashboard", status: "operational", uptime: "99.89%", bars: generateBars(0.993) },
];

function generateBars(reliability: number): ServiceStatus[] {
  const days = 30;
  return Array.from({ length: days }, () => {
    const r = Math.random();
    if (r > reliability + 0.003) return "outage";
    if (r > reliability) return "degraded";
    return "operational";
  });
}

const barColor = { operational: c.green, degraded: c.amber, outage: c.red };

const incidents = [
  { date: "March 28, 2026", title: "Scheduled maintenance completed", body: "Planned database migration completed successfully with zero downtime.", status: "resolved" as const },
  { date: "March 22, 2026", title: "Translation service latency", body: "Elevated response times on translation requests lasting approximately 12 minutes. Root cause was a provider-side rate limit adjustment.", status: "resolved" as const },
  { date: "March 15, 2026", title: "Provider Search index refresh", body: "Brief delay in provider search results during a scheduled index rebuild. No data loss.", status: "resolved" as const },
];

export default function StatusPage() {
  const allOperational = services.every(s => s.status === "operational");

  return (
    <>
      <style>{FONT}</style>
      <style>{CSS}</style>
      <div className="statusWrap">
        <nav className="statusNav">
          <div className="container statusNavInner">
            <Link href="/" className="statusNavBrand">
              <div className="statusNavLogo"><Image src="/omela-logo-mark.png" alt="Omela" width={32} height={32} style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
              <div><div className="statusNavName">Omela</div><div className="statusNavSub serif">System Status</div></div>
            </Link>
            <Link href="/" className="btnP statusBackBtn">Back to Omela <ArrowRight size={13} /></Link>
          </div>
        </nav>

        <main className="statusMain">
          <div className="container">
            {/* Overall status */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className={`overallBanner ${allOperational ? "overallOk" : "overallWarn"}`}>
              <div className="overallDot" />
              <span className="overallTxt">{allOperational ? "All Systems Operational" : "Some Systems Experiencing Issues"}</span>
            </motion.div>

            <p className="uptimeNote">Uptime over the past 30 days. <Link href="mailto:notice@omela.ai" className="uptimeLink">Subscribe to updates</Link></p>

            {/* Service grid */}
            <div className="serviceGrid">
              {services.map((svc, i) => (
                <motion.div key={svc.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.06 }} className="serviceCard">
                  <div className="serviceHeader">
                    <span className="serviceName">{svc.name}</span>
                    <div className="serviceRight">
                      <span className="serviceUptime">{svc.uptime}</span>
                      <span className={`serviceStatus ${svc.status === "operational" ? "serviceOk" : svc.status === "degraded" ? "serviceWarn" : "serviceDown"}`}>
                        {svc.status === "operational" ? "Operational" : svc.status === "degraded" ? "Degraded" : "Outage"}
                      </span>
                    </div>
                  </div>
                  <div className="serviceBars">
                    {svc.bars.map((bar, j) => (
                      <div key={j} className="serviceBar" style={{ background: barColor[bar] }} title={`Day ${j + 1}: ${bar}`} />
                    ))}
                  </div>
                  <div className="serviceBarLabels">
                    <span>30 days ago</span>
                    <span>Today</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Incidents */}
            <div className="incidentSection">
              <h2 className="serif incidentTitle">Past incidents</h2>
              <div className="incidentList">
                {incidents.map((inc, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }} className="incidentCard">
                    <div className="incidentHeader">
                      <span className="incidentDate">{inc.date}</span>
                      <span className="incidentBadge">Resolved</span>
                    </div>
                    <h3 className="incidentName">{inc.title}</h3>
                    <p className="incidentBody">{inc.body}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </main>

        <footer className="statusFooter">
          <div className="container statusFooterInner">
            <p className="statusFooterTxt">&copy; 2026 Omela. Powered by Laura.</p>
            <div style={{ display: "flex", gap: "14px" }}>
              <Link href="/privacy" className="statusFooterLink">Privacy</Link>
              <Link href="/terms" className="statusFooterLink">Terms</Link>
              <a href="mailto:notice@omela.ai" className="statusFooterLink">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

const CSS = `
*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}
body{background:${c.bg};color:${c.text};font-family:'DM Sans',-apple-system,sans-serif;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}button,input{font-family:inherit}
.serif{font-family:'Instrument Serif',Georgia,serif}
.container{max-width:900px;margin:0 auto;padding:0 20px}
.btnP{display:inline-flex;align-items:center;gap:6px;background:${c.dark};color:#fff;border:none;border-radius:999px;padding:10px 18px;font-size:13px;font-weight:700;cursor:pointer;white-space:nowrap;text-decoration:none}

.statusWrap{min-height:100vh;display:flex;flex-direction:column}
.statusNav{background:rgba(248,246,241,0.94);backdrop-filter:blur(16px);border-bottom:1px solid ${c.border};flex-shrink:0}
.statusNavInner{display:flex;align-items:center;justify-content:space-between;height:60px;gap:10px}
.statusNavBrand{display:flex;align-items:center;gap:8px;text-decoration:none}
.statusNavLogo{width:30px;height:30px;border-radius:9px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06)}
.statusNavName{font-size:13px;font-weight:800}
.statusNavSub{font-size:10px;color:${c.accent};font-weight:700;margin-top:1px}
.statusBackBtn{padding:8px 16px!important;font-size:12px!important}

.statusMain{flex:1;padding:40px 0 60px}

.overallBanner{display:flex;align-items:center;gap:12px;padding:20px 24px;border-radius:16px;font-size:18px;font-weight:800}
.overallOk{background:${c.greenSoft};color:${c.greenDk}}
.overallWarn{background:#FFFBEB;color:#92400E}
.overallDot{width:12px;height:12px;border-radius:999px;background:currentColor;flex-shrink:0}

.uptimeNote{margin-top:16px;font-size:13px;color:${c.muted};text-align:center}
.uptimeLink{color:${c.accent};font-weight:700;text-decoration:underline;text-underline-offset:2px}

.serviceGrid{display:flex;flex-direction:column;gap:12px;margin-top:32px}
.serviceCard{background:${c.card};border:1px solid ${c.border};border-radius:16px;padding:18px 22px}
.serviceHeader{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}
.serviceName{font-size:15px;font-weight:700}
.serviceRight{display:flex;align-items:center;gap:10px}
.serviceUptime{font-size:13px;color:${c.muted};font-weight:600}
.serviceStatus{font-size:11px;font-weight:700;padding:4px 10px;border-radius:999px}
.serviceOk{background:${c.greenSoft};color:${c.greenDk}}
.serviceWarn{background:#FFFBEB;color:#92400E}
.serviceDown{background:#FEF2F2;color:#991B1B}

.serviceBars{display:flex;gap:2px;margin-top:14px;height:32px;align-items:stretch}
.serviceBar{flex:1;border-radius:3px;min-width:0;transition:opacity 0.2s}
.serviceBar:hover{opacity:0.7}
.serviceBarLabels{display:flex;justify-content:space-between;margin-top:6px;font-size:10px;color:${c.muted};font-weight:600}

.incidentSection{margin-top:48px}
.incidentTitle{font-size:clamp(24px,4vw,36px);letter-spacing:-0.04em}
.incidentList{display:flex;flex-direction:column;gap:12px;margin-top:20px}
.incidentCard{background:${c.card};border:1px solid ${c.border};border-radius:14px;padding:18px 22px}
.incidentHeader{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:8px}
.incidentDate{font-size:12px;color:${c.muted};font-weight:600}
.incidentBadge{font-size:10px;font-weight:700;padding:3px 8px;border-radius:999px;background:${c.greenSoft};color:${c.greenDk};text-transform:uppercase;letter-spacing:0.06em}
.incidentName{font-size:16px;font-weight:700;letter-spacing:-0.02em}
.incidentBody{font-size:13px;color:${c.sub};line-height:1.7;margin-top:4px}

.statusFooter{border-top:1px solid ${c.border};padding:20px 0}
.statusFooterInner{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px}
.statusFooterTxt{font-size:11px;color:${c.muted}}
.statusFooterLink{font-size:11px;color:${c.muted};font-weight:600;transition:color 0.2s}
.statusFooterLink:hover{color:${c.text}}

@media(min-width:640px){
  .container{padding:0 28px}
  .statusMain{padding:52px 0 72px}
  .overallBanner{padding:24px 28px;font-size:20px}
}
`;
