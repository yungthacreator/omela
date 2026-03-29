"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Mic, MapPin, ShieldCheck, Sparkles } from "lucide-react";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');`;

const c = {
  bg: "#F8F6F1",
  card: "#FFFFFF",
  dark: "#08090C",
  text: "#141517",
  sub: "#555B69",
  muted: "#8B919F",
  accent: "#2563EB",
  accentSoft: "#ECF2FF",
  border: "#E3DDD2",
  green: "#22C55E",
  amber: "#D97706",
  red: "#DC2626",
};

const scenarios = {
  sore_throat: {
    label: "Sore throat",
    user: "I have a sore throat, fever, and I feel weak.",
    laura: "This may need same-day clinical advice depending on how long the fever has lasted and whether you have difficulty swallowing or breathing.",
    urgency: "Soon",
    urgencyColor: c.amber,
    nextStep: "I can help you find a nearby GP and request a callback.",
  },
  tooth_pain: {
    label: "Tooth pain",
    user: "My tooth hurts badly and my cheek feels swollen.",
    laura: "Dental pain with swelling may need urgent dental attention, especially if the swelling is spreading or you have a fever.",
    urgency: "Urgent",
    urgencyColor: c.red,
    nextStep: "I can help you locate an urgent dental practice near you.",
  },
  headache: {
    label: "Headache",
    user: "I have had a headache since yesterday and feel tired.",
    laura: "A routine review may be appropriate if this is mild and improving, but I would ask a few more questions to rule out red flags.",
    urgency: "Routine",
    urgencyColor: c.green,
    nextStep: "I can guide you through next questions and nearby options.",
  },
};

type ScenarioKey = keyof typeof scenarios;

export default function DemoPage() {
  const [selected, setSelected] = useState<ScenarioKey>("sore_throat");
  const data = useMemo(() => scenarios[selected], [selected]);

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
                <div className="brandSub">Powered by Laura</div>
              </div>
            </Link>
            <div className="navActions">
              <Link href="/status" className="btnGhost">Status</Link>
              <Link href="/quiz" className="btnGhost">Quiz</Link>
              <a href="/#waitlist" className="btnPrimary">Get early access</a>
            </div>
          </div>
        </nav>

        <section className="hero">
          <div className="container heroGrid">
            <div>
              <div className="pill">Interactive product demo</div>
              <h1 className="serif title">Try Laura before the queue starts.</h1>
              <p className="body">
                Explore how Laura checks urgency, explains next steps, and routes people to the right care pathway in a calm, structured way.
              </p>

              <div className="scenarioRow">
                {(Object.keys(scenarios) as ScenarioKey[]).map((key) => (
                  <button
                    key={key}
                    className={`scenarioBtn ${selected === key ? "scenarioBtnActive" : ""}`}
                    onClick={() => setSelected(key)}
                    type="button"
                  >
                    {scenarios[key].label}
                  </button>
                ))}
              </div>

              <div className="trust">
                <ShieldCheck size={16} />
                <span>This is a simulated product demo and not live medical advice.</span>
              </div>

              <div className="ctaRow">
                <a href="/#waitlist" className="btnPrimary">Get early access</a>
                <Link href="/" className="btnSecondary">Back home</Link>
              </div>
            </div>

            <motion.div
              className="demoCard"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="phone">
                <div className="phoneTop">
                  <div className="phoneHead">
                    <div className="avatar">
                      <Image src="/laura-avatar.png" alt="Laura" fill sizes="36px" style={{ objectFit: "cover" }} />
                    </div>
                    <div>
                      <div className="phoneName">Laura</div>
                      <div className="phoneSub">AI care-access assistant</div>
                    </div>
                  </div>
                  <div className="micBubble">
                    <Mic size={14} />
                  </div>
                </div>

                <div className="chatArea">
                  <div className="msg msgUser">{data.user}</div>
                  <div className="msg msgLaura">{data.laura}</div>

                  <div className="resultCard">
                    <div className="resultTop">
                      <span className="resultLabel">Urgency</span>
                      <span className="urgency" style={{ background: `${data.urgencyColor}15`, color: data.urgencyColor }}>
                        {data.urgency}
                      </span>
                    </div>
                    <p className="resultText">{data.nextStep}</p>
                  </div>

                  <div className="providerCard">
                    <div className="providerTop">
                      <MapPin size={15} />
                      <span>Nearest available option</span>
                    </div>
                    <div className="providerName">Riverside Medical Practice</div>
                    <div className="providerMeta">HD1 · Callback window tomorrow 9:30 AM</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section">
          <div className="container cards">
            {[
              {
                title: "Symptom intake",
                body: "Laura turns unstructured descriptions into a clearer intake flow without forcing people through a confusing form.",
              },
              {
                title: "Urgency guidance",
                body: "Laura helps people understand whether their concern sounds routine, soon, urgent, or emergency.",
              },
              {
                title: "Care routing",
                body: "Laura can help connect the person to nearby GP or dental options and support callback requests.",
              },
            ].map((item) => (
              <div key={item.title} className="infoCard">
                <div className="iconWrap"><Sparkles size={16} /></div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
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
button{font-family:inherit}
.serif{font-family:'Instrument Serif',serif}
.wrap{min-height:100vh}
.container{max-width:1200px;margin:0 auto;padding:0 20px}
.nav{position:sticky;top:0;z-index:50;background:rgba(248,246,241,0.88);backdrop-filter:blur(14px);border-bottom:1px solid ${c.border}}
.navRow{height:72px;display:flex;align-items:center;justify-content:space-between;gap:20px}
.brand{display:flex;align-items:center;gap:10px}
.logo{width:34px;height:34px;border-radius:10px;overflow:hidden}
.brandName{font-weight:800;font-size:14px}
.brandSub{font-size:11px;color:${c.muted};font-style:italic}
.navActions{display:flex;align-items:center;gap:10px}
.pill{display:inline-flex;padding:8px 14px;border-radius:999px;border:1px solid ${c.border};background:rgba(255,255,255,0.75);font-size:12px;font-weight:700;color:${c.sub}}
.hero{padding:72px 0}
.heroGrid{display:grid;grid-template-columns:1fr;gap:36px;align-items:center}
.title{font-size:clamp(40px,7vw,76px);line-height:0.95;letter-spacing:-0.06em;margin-top:16px}
.body{margin-top:16px;max-width:620px;font-size:17px;line-height:1.85;color:${c.sub}}
.scenarioRow{display:flex;flex-wrap:wrap;gap:10px;margin-top:24px}
.scenarioBtn{padding:10px 14px;border-radius:999px;border:1px solid ${c.border};background:#fff;color:${c.sub};font-size:13px;font-weight:700;cursor:pointer}
.scenarioBtnActive{background:${c.dark};color:#fff;border-color:${c.dark}}
.trust{display:flex;align-items:center;gap:8px;margin-top:18px;color:${c.sub};font-size:13px}
.ctaRow{display:flex;flex-wrap:wrap;gap:10px;margin-top:24px}
.btnPrimary,.btnSecondary,.btnGhost{display:inline-flex;align-items:center;justify-content:center;height:46px;padding:0 18px;border-radius:999px;font-size:13px;font-weight:700}
.btnPrimary{background:${c.dark};color:#fff}
.btnSecondary{background:#fff;border:1px solid ${c.border}}
.btnGhost{background:transparent;border:1px solid ${c.border};color:${c.sub}}
.demoCard{display:flex;justify-content:center}
.phone{width:100%;max-width:390px;border-radius:32px;background:#111318;padding:8px;box-shadow:0 30px 70px rgba(0,0,0,0.14)}
.phoneTop{background:#fff;border-radius:24px 24px 0 0;padding:14px 14px 10px;display:flex;align-items:center;justify-content:space-between}
.phoneHead{display:flex;align-items:center;gap:10px}
.avatar{position:relative;width:36px;height:36px;border-radius:999px;overflow:hidden;background:#e8e8e8}
.phoneName{font-size:13px;font-weight:800}
.phoneSub{font-size:11px;color:${c.muted}}
.micBubble{width:34px;height:34px;border-radius:999px;background:${c.accentSoft};display:flex;align-items:center;justify-content:center;color:${c.accent}}
.chatArea{background:linear-gradient(180deg,#F5F5F0,#ECE5DA);padding:14px;display:flex;flex-direction:column;gap:10px;border-radius:0 0 24px 24px}
.msg{max-width:84%;padding:10px 12px;border-radius:16px;font-size:13px;line-height:1.6}
.msgUser{align-self:flex-end;background:#E7FFDB}
.msgLaura{align-self:flex-start;background:#fff}
.resultCard,.providerCard{background:#fff;border:1px solid ${c.border};border-radius:18px;padding:14px}
.resultTop,.providerTop{display:flex;align-items:center;justify-content:space-between;gap:10px}
.resultLabel{font-size:11px;font-weight:800;color:${c.muted};text-transform:uppercase;letter-spacing:0.08em}
.urgency{padding:6px 10px;border-radius:999px;font-size:12px;font-weight:800}
.resultText{margin-top:10px;font-size:13px;line-height:1.7;color:${c.sub}}
.providerTop{justify-content:flex-start;color:${c.sub};font-size:12px;font-weight:700}
.providerName{margin-top:8px;font-weight:800}
.providerMeta{margin-top:4px;font-size:12px;color:${c.muted}}
.section{padding:0 0 84px}
.cards{display:grid;grid-template-columns:1fr;gap:16px}
.infoCard{background:rgba(255,255,255,0.9);border:1px solid ${c.border};border-radius:24px;padding:22px}
.iconWrap{width:34px;height:34px;border-radius:12px;background:${c.accentSoft};display:flex;align-items:center;justify-content:center;color:${c.accent}}
.infoCard h3{margin-top:14px;font-size:18px;letter-spacing:-0.03em}
.infoCard p{margin-top:8px;font-size:14px;line-height:1.8;color:${c.sub}}
@media(min-width:980px){
  .heroGrid{grid-template-columns:1.05fr 0.95fr}
  .cards{grid-template-columns:repeat(3,1fr)}
}
`;