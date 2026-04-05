"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Mail,
  Server,
  ShieldCheck,
  Wrench,
} from "lucide-react";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');`;

const c = {
  bg: "#F8F6F1",
  surface: "#FFFFFF",
  dark: "#090B10",
  text: "#111214",
  sub: "#4A4F5C",
  muted: "#8A90A0",
  accent: "#2563EB",
  accentSoft: "#ECF2FF",
  border: "#E4DDD2",
  green: "#22C55E",
  greenSoft: "#ECFDF3",
  greenText: "#166534",
  amber: "#F59E0B",
  amberSoft: "#FFFBEB",
  amberText: "#92400E",
  red: "#EF4444",
  redSoft: "#FEF2F2",
  redText: "#991B1B",
};

type ServiceStatus = "operational" | "degraded" | "outage";

type Service = {
  name: string;
  status: ServiceStatus;
  uptime: string;
  description: string;
  bars: ServiceStatus[];
};

type Incident = {
  date: string;
  title: string;
  body: string;
  impact: "resolved" | "monitoring";
};

function buildBars(
  length: number,
  degradedDays: number[] = [],
  outageDays: number[] = []
): ServiceStatus[] {
  return Array.from({ length }, (_, index) => {
    if (outageDays.includes(index)) return "outage";
    if (degradedDays.includes(index)) return "degraded";
    return "operational";
  });
}

const services: Service[] = [
  {
    name: "Laura Chat",
    status: "operational",
    uptime: "99.94%",
    description: "Core conversation layer for care-navigation support.",
    bars: buildBars(30, [6, 19]),
  },
  {
    name: "Urgency Support",
    status: "operational",
    uptime: "99.98%",
    description: "Structured urgency flow and escalation guidance.",
    bars: buildBars(30, [11]),
  },
  {
    name: "Provider Search",
    status: "operational",
    uptime: "99.91%",
    description: "Practice and route discovery across supported flows.",
    bars: buildBars(30, [8, 9, 22]),
  },
  {
    name: "Translation Layer",
    status: "operational",
    uptime: "99.96%",
    description: "Bilingual notes and multilingual understanding support.",
    bars: buildBars(30, [14]),
  },
  {
    name: "Waitlist API",
    status: "operational",
    uptime: "100%",
    description: "Waitlist form submissions and onboarding capture.",
    bars: buildBars(30),
  },
  {
    name: "Admin Dashboard",
    status: "operational",
    uptime: "99.89%",
    description: "Internal operational tools and monitoring surfaces.",
    bars: buildBars(30, [4, 17], [18]),
  },
];

const incidents: Incident[] = [
  {
    date: "28 March 2026",
    title: "Scheduled maintenance completed",
    body: "Planned infrastructure maintenance completed successfully. No customer-facing outage occurred.",
    impact: "resolved",
  },
  {
    date: "22 March 2026",
    title: "Temporary translation latency",
    body: "Some translation-related requests responded more slowly than usual for a short period. Service returned to normal after provider-side adjustment.",
    impact: "resolved",
  },
  {
    date: "15 March 2026",
    title: "Provider search refresh delay",
    body: "A scheduled index refresh caused a brief delay in some provider-search responses. No data was lost and normal performance was restored.",
    impact: "resolved",
  },
];

const statusColors: Record<ServiceStatus, { bg: string; text: string; label: string }> = {
  operational: {
    bg: c.greenSoft,
    text: c.greenText,
    label: "Operational",
  },
  degraded: {
    bg: c.amberSoft,
    text: c.amberText,
    label: "Degraded",
  },
  outage: {
    bg: c.redSoft,
    text: c.redText,
    label: "Outage",
  },
};

const barColors: Record<ServiceStatus, string> = {
  operational: c.green,
  degraded: c.amber,
  outage: c.red,
};

export default function StatusPage() {
  const allOperational = services.every((service) => service.status === "operational");

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
                <div className="brandSub">System status</div>
              </div>
            </Link>

            <Link href="/" className="backButton">
              <ArrowLeft size={14} />
              Back to Omela
            </Link>
          </div>
        </nav>

        <main className="main">
          <div className="container">
            <motion.section
              className="hero"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="eyebrow">Live system status</span>

              <h1 className="serif heroTitle">Calm, clear reliability.</h1>

              <p className="heroBody">
                A public view of service health across the Laura experience and supporting systems.
              </p>

              <div className={`overallBanner ${allOperational ? "overallOk" : "overallWarn"}`}>
                <div className="overallLeft">
                  <div className="overallIconWrap">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <div className="overallTitle">
                      {allOperational
                        ? "All systems operational"
                        : "Some systems are experiencing issues"}
                    </div>
                    <div className="overallSub">
                      Updated automatically as service health changes.
                    </div>
                  </div>
                </div>

                <a href="mailto:notice@omela.ai" className="subscribeLink">
                  <Mail size={14} />
                  Subscribe to updates
                </a>
              </div>
            </motion.section>

            <section className="summaryGrid">
              <motion.div
                className="summaryCard"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.06 }}
              >
                <div className="summaryIcon summaryIconGreen">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <div className="summaryLabel">Platform health</div>
                  <div className="summaryValue">Operational</div>
                </div>
              </motion.div>

              <motion.div
                className="summaryCard"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.12 }}
              >
                <div className="summaryIcon summaryIconBlue">
                  <Server size={18} />
                </div>
                <div>
                  <div className="summaryLabel">Services tracked</div>
                  <div className="summaryValue">{services.length} active services</div>
                </div>
              </motion.div>

              <motion.div
                className="summaryCard"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.18 }}
              >
                <div className="summaryIcon summaryIconWarm">
                  <Clock3 size={18} />
                </div>
                <div>
                  <div className="summaryLabel">Reporting window</div>
                  <div className="summaryValue">Last 30 days</div>
                </div>
              </motion.div>
            </section>

            <section className="section">
              <div className="sectionHead">
                <h2 className="serif sectionTitle">Service health</h2>
                <p className="sectionBody">
                  Rolling availability view across core Omela services.
                </p>
              </div>

              <div className="serviceList">
                {services.map((service, index) => (
                  <motion.article
                    key={service.name}
                    className="serviceCard"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.42, delay: 0.08 + index * 0.05 }}
                  >
                    <div className="serviceTop">
                      <div>
                        <div className="serviceName">{service.name}</div>
                        <p className="serviceDescription">{service.description}</p>
                      </div>

                      <div className="serviceMeta">
                        <span className="serviceUptime">{service.uptime}</span>
                        <span
                          className="serviceStatus"
                          style={{
                            background: statusColors[service.status].bg,
                            color: statusColors[service.status].text,
                          }}
                        >
                          {statusColors[service.status].label}
                        </span>
                      </div>
                    </div>

                    <div className="serviceBars">
                      {service.bars.map((bar, barIndex) => (
                        <div
                          key={barIndex}
                          className="serviceBar"
                          style={{ background: barColors[bar] }}
                          title={`Day ${barIndex + 1}: ${bar}`}
                        />
                      ))}
                    </div>

                    <div className="serviceLabels">
                      <span>30 days ago</span>
                      <span>Today</span>
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>

            <section className="section">
              <div className="sectionHead sectionHeadLeft">
                <h2 className="serif sectionTitle">Past incidents</h2>
                <p className="sectionBody">
                  Recent resolved events and maintenance activity.
                </p>
              </div>

              <div className="incidentList">
                {incidents.map((incident, index) => (
                  <motion.article
                    key={`${incident.date}-${incident.title}`}
                    className="incidentCard"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.42, delay: 0.18 + index * 0.06 }}
                  >
                    <div className="incidentTop">
                      <span className="incidentDate">{incident.date}</span>
                      <span className="incidentBadge">
                        <Wrench size={12} />
                        {incident.impact === "resolved" ? "Resolved" : "Monitoring"}
                      </span>
                    </div>

                    <h3 className="incidentTitle">{incident.title}</h3>
                    <p className="incidentBody">{incident.body}</p>
                  </motion.article>
                ))}
              </div>
            </section>
          </div>
        </main>

        <footer className="footer">
          <div className="container footerInner">
            <p className="footerText">&copy; 2026 Omela</p>

            <div className="footerLinks">
              <Link href="/privacy" className="footerLink">
                Privacy
              </Link>
              <Link href="/terms" className="footerLink">
                Terms
              </Link>
              <a href="mailto:notice@omela.ai" className="footerLink">
                Contact
              </a>
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
  max-width:1040px;
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
.brandSub{
  margin-top:2px;
  font-size:12px;
  color:${c.accent};
  font-weight:700;
}
.backButton{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:6px;
  min-height:48px;
  padding:0 18px;
  border-radius:999px;
  border:1px solid rgba(228,221,210,0.94);
  background:rgba(255,255,255,0.8);
  font-size:14px;
  font-weight:700;
  color:${c.text};
  transition:transform .22s ease,box-shadow .22s ease;
}
.backButton:hover{
  transform:translateY(-1px);
  box-shadow:0 10px 24px rgba(17,18,20,0.06);
}

.main{
  flex:1;
  padding:52px 0 78px;
}

.hero{
  text-align:center;
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
.heroTitle{
  margin-top:14px;
  font-size:clamp(40px,7vw,76px);
  line-height:0.98;
  letter-spacing:-0.055em;
}
.heroBody{
  max-width:720px;
  margin:18px auto 0;
  font-size:18px;
  line-height:1.74;
  color:${c.sub};
}

.overallBanner{
  margin-top:28px;
  padding:22px 24px;
  border-radius:26px;
  border:1px solid rgba(228,221,210,0.94);
  background:rgba(255,255,255,0.92);
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:16px;
  flex-wrap:wrap;
  box-shadow:0 14px 28px rgba(17,18,20,0.04);
}
.overallOk{
  background:linear-gradient(180deg, rgba(236,253,243,0.96), rgba(255,255,255,0.96));
}
.overallWarn{
  background:linear-gradient(180deg, rgba(255,251,235,0.96), rgba(255,255,255,0.96));
}
.overallLeft{
  display:flex;
  align-items:center;
  gap:14px;
}
.overallIconWrap{
  width:42px;
  height:42px;
  border-radius:14px;
  display:flex;
  align-items:center;
  justify-content:center;
  background:${c.greenSoft};
  color:${c.greenText};
  flex-shrink:0;
}
.overallTitle{
  font-size:20px;
  font-weight:800;
  letter-spacing:-0.02em;
}
.overallSub{
  margin-top:4px;
  font-size:14px;
  color:${c.sub};
}
.subscribeLink{
  display:inline-flex;
  align-items:center;
  gap:7px;
  min-height:44px;
  padding:0 16px;
  border-radius:999px;
  background:${c.dark};
  color:#fff;
  font-size:14px;
  font-weight:700;
  white-space:nowrap;
}

.summaryGrid{
  margin-top:22px;
  display:grid;
  grid-template-columns:1fr;
  gap:14px;
}
.summaryCard{
  padding:20px 22px;
  border-radius:22px;
  background:rgba(255,255,255,0.92);
  border:1px solid rgba(228,221,210,0.94);
  display:flex;
  align-items:center;
  gap:14px;
}
.summaryIcon{
  width:42px;
  height:42px;
  border-radius:14px;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-shrink:0;
}
.summaryIconGreen{
  background:${c.greenSoft};
  color:${c.greenText};
}
.summaryIconBlue{
  background:${c.accentSoft};
  color:${c.accent};
}
.summaryIconWarm{
  background:#FFF5E8;
  color:${c.amberText};
}
.summaryLabel{
  font-size:12px;
  font-weight:800;
  letter-spacing:0.12em;
  text-transform:uppercase;
  color:${c.muted};
}
.summaryValue{
  margin-top:4px;
  font-size:18px;
  font-weight:800;
  letter-spacing:-0.02em;
}

.section{
  margin-top:44px;
}
.sectionHead{
  text-align:center;
}
.sectionHeadLeft{
  text-align:left;
}
.sectionTitle{
  font-size:clamp(28px,5vw,42px);
  line-height:1.02;
  letter-spacing:-0.045em;
}
.sectionBody{
  margin-top:10px;
  font-size:16px;
  line-height:1.72;
  color:${c.sub};
}

.serviceList{
  margin-top:22px;
  display:flex;
  flex-direction:column;
  gap:14px;
}
.serviceCard{
  background:rgba(255,255,255,0.94);
  border:1px solid rgba(228,221,210,0.94);
  border-radius:24px;
  padding:22px 24px;
  box-shadow:0 12px 24px rgba(17,18,20,0.03);
}
.serviceTop{
  display:flex;
  align-items:flex-start;
  justify-content:space-between;
  gap:14px;
  flex-wrap:wrap;
}
.serviceName{
  font-size:18px;
  font-weight:800;
  letter-spacing:-0.02em;
}
.serviceDescription{
  margin-top:6px;
  font-size:14px;
  line-height:1.65;
  color:${c.sub};
}
.serviceMeta{
  display:flex;
  align-items:center;
  gap:10px;
  flex-wrap:wrap;
}
.serviceUptime{
  font-size:14px;
  color:${c.muted};
  font-weight:700;
}
.serviceStatus{
  min-height:32px;
  padding:0 12px;
  border-radius:999px;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  font-size:12px;
  font-weight:800;
}
.serviceBars{
  margin-top:18px;
  display:flex;
  gap:4px;
  height:34px;
  align-items:stretch;
}
.serviceBar{
  flex:1;
  min-width:0;
  border-radius:4px;
}
.serviceLabels{
  margin-top:8px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  font-size:11px;
  font-weight:700;
  color:${c.muted};
}

.incidentList{
  margin-top:22px;
  display:flex;
  flex-direction:column;
  gap:14px;
}
.incidentCard{
  padding:22px 24px;
  border-radius:24px;
  background:rgba(255,255,255,0.94);
  border:1px solid rgba(228,221,210,0.94);
}
.incidentTop{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:10px;
  flex-wrap:wrap;
}
.incidentDate{
  font-size:13px;
  color:${c.muted};
  font-weight:700;
}
.incidentBadge{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:6px;
  min-height:30px;
  padding:0 10px;
  border-radius:999px;
  background:${c.greenSoft};
  color:${c.greenText};
  font-size:11px;
  font-weight:800;
  letter-spacing:0.08em;
  text-transform:uppercase;
}
.incidentTitle{
  margin-top:12px;
  font-size:18px;
  font-weight:800;
  letter-spacing:-0.02em;
}
.incidentBody{
  margin-top:8px;
  font-size:15px;
  line-height:1.72;
  color:${c.sub};
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

@media(min-width:700px){
  .container{padding:0 28px}
  .summaryGrid{
    grid-template-columns:repeat(3,1fr);
  }
}

@media(max-width:699px){
  .navInner{
    min-height:64px;
  }
  .brandSub{
    font-size:11px;
  }
  .backButton{
    min-height:42px;
    padding:0 14px;
    font-size:13px;
  }
  .overallBanner{
    padding:20px;
  }
  .overallTitle{
    font-size:18px;
  }
}
`;