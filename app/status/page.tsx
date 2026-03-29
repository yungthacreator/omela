"use client";

import Link from "next/link";
import Image from "next/image";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');`;

const c = {
  bg: "#F8F6F1",
  text: "#141517",
  sub: "#555B69",
  muted: "#8B919F",
  border: "#E3DDD2",
  green: "#22C55E",
  greenSoft: "#ECFDF3",
  amber: "#D97706",
  amberSoft: "#FFF7ED",
  dark: "#08090C",
};

const systems = [
  { name: "Laura Chat", status: "Operational", tone: "green" },
  { name: "Urgency Engine", status: "Operational", tone: "green" },
  { name: "Provider Search", status: "Operational", tone: "green" },
  { name: "Translation", status: "Operational", tone: "green" },
  { name: "Callback Queue", status: "Operational", tone: "green" },
  { name: "Public API", status: "Degraded performance", tone: "amber" },
];

export default function StatusPage() {
  return (
    <>
      <style>{FONT}</style>
      <style>{CSS}</style>

      <div className="wrap">
        <nav className="nav">
          <div className="container navRow">
            <Link href="/" className="brand">
              <div className="logo">
                <Image src="/omela-logo-mark.png" alt="Omela" width={34} height={34} />
              </div>
              <div>
                <div className="brandName">Omela</div>
                <div className="brandSub">System status</div>
              </div>
            </Link>
            <div className="navActions">
              <Link href="/demo" className="btnGhost">Demo</Link>
              <Link href="/quiz" className="btnGhost">Quiz</Link>
              <a href="/#waitlist" className="btnPrimary">Get early access</a>
            </div>
          </div>
        </nav>

        <section className="hero">
          <div className="container">
            <div className="pillRow">
              <span className="dot" />
              <span>All systems operational</span>
            </div>
            <h1 className="serif title">Reliable systems build trust in care.</h1>
            <p className="body">
              Public visibility into service health, platform availability, and recent incidents across the Laura platform.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container statusGrid">
            {systems.map((item) => (
              <div key={item.name} className="statusCard">
                <div className="statusTop">
                  <div className="statusName">{item.name}</div>
                  <div className={`badge ${item.tone}`}>
                    <span className="badgeDot" />
                    {item.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section tightTop">
          <div className="container metrics">
            {[
              { value: "99.98%", label: "30-day uptime" },
              { value: "1.2s", label: "Avg. platform response" },
              { value: "1", label: "Incident last 30 days" },
              { value: "2", label: "Active regions" },
            ].map((m) => (
              <div key={m.label} className="metricCard">
                <div className="serif metricValue">{m.value}</div>
                <div className="metricLabel">{m.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="section tightTop">
          <div className="container historyWrap">
            <div className="historyCard">
              <h2 className="serif historyTitle">Recent incidents</h2>

              <div className="incident ok">
                <div>
                  <div className="incidentTitle">No incidents today</div>
                  <div className="incidentMeta">29 Mar 2026</div>
                </div>
                <div className="incidentState">Resolved</div>
              </div>

              <div className="incident warn">
                <div>
                  <div className="incidentTitle">Minor API latency spike</div>
                  <div className="incidentMeta">28 Mar 2026 · Public API · 18 minutes</div>
                </div>
                <div className="incidentState">Resolved</div>
              </div>

              <div className="incident ok">
                <div>
                  <div className="incidentTitle">No provider search issues reported</div>
                  <div className="incidentMeta">Last 7 days</div>
                </div>
                <div className="incidentState">Stable</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

const CSS = `
*{box-sizing:border-box;margin:0;padding:0}
html,body{max-width:100%;overflow-x:clip;background:${c.bg};color:${c.text};font-family:'DM Sans',sans-serif}
a{text-decoration:none;color:inherit}
.serif{font-family:'Instrument Serif',serif}
.container{max-width:1200px;margin:0 auto;padding:0 20px}
.nav{position:sticky;top:0;z-index:50;background:rgba(248,246,241,0.88);backdrop-filter:blur(14px);border-bottom:1px solid ${c.border}}
.navRow{height:72px;display:flex;align-items:center;justify-content:space-between;gap:20px}
.brand{display:flex;align-items:center;gap:10px}
.logo{width:34px;height:34px;border-radius:10px;overflow:hidden}
.brandName{font-weight:800;font-size:14px}
.brandSub{font-size:11px;color:${c.muted}}
.navActions{display:flex;gap:10px}
.btnPrimary,.btnGhost{display:inline-flex;align-items:center;justify-content:center;height:46px;padding:0 18px;border-radius:999px;font-size:13px;font-weight:700}
.btnPrimary{background:${c.dark};color:#fff}
.btnGhost{border:1px solid ${c.border};color:${c.sub}}
.hero{padding:72px 0 28px}
.pillRow{display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border-radius:999px;background:${c.greenSoft};color:${c.green};font-size:12px;font-weight:800}
.dot{width:8px;height:8px;border-radius:999px;background:${c.green};display:inline-block}
.title{margin-top:18px;font-size:clamp(40px,7vw,74px);line-height:0.95;letter-spacing:-0.06em;max-width:800px}
.body{margin-top:16px;max-width:640px;font-size:17px;line-height:1.85;color:${c.sub}}
.section{padding:28px 0}
.tightTop{padding-top:0}
.statusGrid{display:grid;grid-template-columns:1fr;gap:14px}
.statusCard{background:rgba(255,255,255,0.9);border:1px solid ${c.border};border-radius:22px;padding:18px}
.statusTop{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}
.statusName{font-size:16px;font-weight:800}
.badge{display:inline-flex;align-items:center;gap:8px;padding:8px 12px;border-radius:999px;font-size:12px;font-weight:800}
.badgeDot{width:7px;height:7px;border-radius:999px;background:currentColor}
.badge.green{background:${c.greenSoft};color:${c.green}}
.badge.amber{background:${c.amberSoft};color:${c.amber}}
.metrics{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
.metricCard{background:#fff;border:1px solid ${c.border};border-radius:22px;padding:20px;text-align:center}
.metricValue{font-size:clamp(28px,5vw,46px);letter-spacing:-0.05em}
.metricLabel{margin-top:8px;font-size:13px;color:${c.sub}}
.historyWrap{display:grid;grid-template-columns:1fr}
.historyCard{background:#fff;border:1px solid ${c.border};border-radius:24px;padding:22px}
.historyTitle{font-size:clamp(28px,5vw,42px);letter-spacing:-0.05em}
.incident{margin-top:16px;border-radius:18px;padding:16px;border:1px solid ${c.border};display:flex;justify-content:space-between;gap:12px;align-items:flex-start}
.incident.ok{background:#fff}
.incident.warn{background:#fffaf3}
.incidentTitle{font-size:15px;font-weight:800}
.incidentMeta{margin-top:5px;font-size:13px;color:${c.sub}}
.incidentState{font-size:12px;font-weight:800;color:${c.muted}}
@media(min-width:900px){
  .statusGrid{grid-template-columns:repeat(2,1fr)}
  .metrics{grid-template-columns:repeat(4,1fr)}
}
`;