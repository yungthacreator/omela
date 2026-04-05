"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock3, Mail, Server, ShieldCheck, Wrench } from "lucide-react";

const FONT=`@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');`;
const c={bg:"#F8F6F1",text:"#111214",sub:"#4A4F5C",muted:"#888E9C",accent:"#2563EB",accentSoft:"#ECF2FF",border:"#E3DDD2",dark:"#08090C",green:"#22C55E",greenSoft:"#ECFDF3",greenDk:"#15803D",warm:"#C9956B",amber:"#F59E0B",amberSoft:"#FFFBEB",amberDk:"#92400E",red:"#EF4444",redSoft:"#FEF2F2",redDk:"#991B1B"};

function FI({children,delay=0,className=""}:{children:ReactNode;delay?:number;className?:string}){const ref=useRef<HTMLDivElement>(null);const v=useInView(ref,{once:true,amount:0.08});return<motion.div ref={ref} initial={{opacity:0,y:16}} animate={v?{opacity:1,y:0}:{}} transition={{duration:0.55,delay,ease:[0.22,1,0.36,1]}} className={className}>{children}</motion.div>;}

type SvcStatus="operational"|"degraded"|"outage";
type Svc={name:string;status:SvcStatus;uptime:string;desc:string;bars:SvcStatus[]};
type Incident={date:string;title:string;body:string;impact:"resolved"|"monitoring"};

function bb(len:number,deg:number[]=[],out:number[]=[]):SvcStatus[]{return Array.from({length:len},(_,i)=>{if(out.includes(i))return"outage";if(deg.includes(i))return"degraded";return"operational";});}

const services:Svc[]=[
  {name:"Laura Chat",status:"operational",uptime:"99.94%",desc:"Core conversation layer for care navigation support.",bars:bb(30,[6,19])},
  {name:"Urgency Support",status:"operational",uptime:"99.98%",desc:"Structured urgency flow and escalation guidance.",bars:bb(30,[11])},
  {name:"Provider Search",status:"operational",uptime:"99.91%",desc:"Practice and route discovery across supported flows.",bars:bb(30,[8,9,22])},
  {name:"Translation Layer",status:"operational",uptime:"99.96%",desc:"Bilingual notes and multilingual understanding support.",bars:bb(30,[14])},
  {name:"Waitlist API",status:"operational",uptime:"100%",desc:"Waitlist form submissions and onboarding capture.",bars:bb(30)},
  {name:"Admin Dashboard",status:"operational",uptime:"99.89%",desc:"Internal operational tools and monitoring surfaces.",bars:bb(30,[4,17],[18])},
];

const incidents:Incident[]=[
  {date:"28 March 2026",title:"Scheduled maintenance completed",body:"Planned infrastructure maintenance completed successfully. No user-facing outage occurred.",impact:"resolved"},
  {date:"22 March 2026",title:"Temporary translation latency",body:"Some translation requests responded more slowly than usual for a short period. Service returned to normal after provider-side adjustment.",impact:"resolved"},
  {date:"15 March 2026",title:"Provider search refresh delay",body:"A scheduled index refresh caused a brief delay in some provider search responses. Normal performance was restored.",impact:"resolved"},
];

const stColor:Record<SvcStatus,{bg:string;text:string;label:string}>={operational:{bg:c.greenSoft,text:c.greenDk,label:"Operational"},degraded:{bg:c.amberSoft,text:c.amberDk,label:"Degraded"},outage:{bg:c.redSoft,text:c.redDk,label:"Outage"}};
const barColor:Record<SvcStatus,string>={operational:c.green,degraded:c.amber,outage:c.red};

export default function StatusPage(){
  const allOk=services.every(s=>s.status==="operational");
  return(<><style>{FONT}</style><style>{CSS}</style>
    <div className="pg">
      {/* Nav */}
      <motion.nav initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} className="nav"><div className="container navR">
        <Link href="/" className="navBr"><div className="navLo"><Image src="/omela-logo-mark.png" alt="Omela" width={34} height={34} style={{width:"100%",height:"100%",objectFit:"contain"}}/></div><div><div className="navNm">Omela</div><div className="navSb">System status</div></div></Link>
        <Link href="/" className="btnS navBk">Back to Omela <ArrowRight size={13}/></Link>
      </div></motion.nav>

      <main className="main"><div className="container">
        {/* Hero */}
        <FI><section className="hero">
          <span className="eyebrow">Live system status</span>
          <h1 className="serif heroTi">Calm, clear<br/><span className="heroAc">reliability.</span></h1>
          <p className="heroSub">A public view of service health across the Laura experience and supporting systems.</p>
        </section></FI>

        {/* Overall Banner */}
        <FI delay={0.06}><div className={`banner ${allOk?"bannerOk":"bannerWarn"}`}>
          <div className="bannerL">
            <motion.div className="bannerIc" animate={{scale:[1,1.05,1]}} transition={{duration:3,repeat:Infinity}}>
              <CheckCircle2 size={18}/>
            </motion.div>
            <div>
              <div className="bannerTi">{allOk?"All systems operational":"Some systems are experiencing issues"}</div>
              <div className="bannerSub">Updated automatically as service health changes.</div>
            </div>
          </div>
          <a href="mailto:notice@omela.ai" className="bannerBtn"><Mail size={13}/>Subscribe</a>
        </div></FI>

        {/* Summary cards */}
        <div className="sumGrid">
          {[
            {icon:<ShieldCheck size={18}/>,label:"Platform health",value:"Operational",tone:"green"},
            {icon:<Server size={18}/>,label:"Services tracked",value:`${services.length} active`,tone:"blue"},
            {icon:<Clock3 size={18}/>,label:"Reporting window",value:"Last 30 days",tone:"warm"},
          ].map((item,i)=>(
            <FI key={item.label} delay={0.08+i*0.05}><div className="sumCard">
              <div className={`sumIc sumIc--${item.tone}`}>{item.icon}</div>
              <div><span className="sumLbl">{item.label}</span><span className="sumVal">{item.value}</span></div>
            </div></FI>
          ))}
        </div>

        {/* Services */}
        <FI delay={0.15}><section className="sectn">
          <h2 className="serif secTi">Service health</h2>
          <p className="secSub">Rolling availability view across core Omela services.</p>
          <div className="svcList">
            {services.map((svc,i)=>(
              <motion.article key={svc.name} className="svcCard" initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.4,delay:i*0.04}}>
                <div className="svcTop">
                  <div className="svcInfo">
                    <div className="svcName">{svc.name}</div>
                    <p className="svcDesc">{svc.desc}</p>
                  </div>
                  <div className="svcMeta">
                    <span className="svcUp">{svc.uptime}</span>
                    <span className="svcSt" style={{background:stColor[svc.status].bg,color:stColor[svc.status].text}}>{stColor[svc.status].label}</span>
                  </div>
                </div>
                <div className="svcBars">
                  {svc.bars.map((bar,bi)=>(
                    <motion.div key={bi} className="svcBar" style={{background:barColor[bar]}} initial={{scaleY:0}} whileInView={{scaleY:1}} viewport={{once:true}} transition={{duration:0.3,delay:bi*0.015}} title={`Day ${bi+1}: ${bar}`}/>
                  ))}
                </div>
                <div className="svcLbls"><span>30 days ago</span><span>Today</span></div>
              </motion.article>
            ))}
          </div>
        </section></FI>

        {/* Incidents */}
        <FI delay={0.1}><section className="sectn">
          <h2 className="serif secTi">Past incidents</h2>
          <p className="secSub">Recent resolved events and maintenance activity.</p>
          <div className="incList">
            {incidents.map((inc,i)=>(
              <motion.article key={inc.title} className="incCard" initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.4,delay:i*0.05}}>
                <div className="incTop">
                  <span className="incDate">{inc.date}</span>
                  <span className="incBadge"><Wrench size={11}/>{inc.impact==="resolved"?"Resolved":"Monitoring"}</span>
                </div>
                <h3 className="incTi">{inc.title}</h3>
                <p className="incBd">{inc.body}</p>
              </motion.article>
            ))}
          </div>
        </section></FI>
      </div></main>

      {/* Footer */}
      <footer className="ft"><div className="container ftIn">
        <p className="ftCp">&copy; 2026 Omela</p>
        <div className="ftLks"><Link href="/privacy" className="ftLk">Privacy</Link><Link href="/terms" className="ftLk">Terms</Link><a href="mailto:notice@omela.ai" className="ftLk">Contact</a></div>
      </div></footer>
    </div>
  </>);
}

const CSS=`
*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}html,body{max-width:100%;overflow-x:clip}
body{background:${c.bg};color:${c.text};font-family:'DM Sans',-apple-system,sans-serif;-webkit-font-smoothing:antialiased;font-size:16px}
a{color:inherit;text-decoration:none}button,input{font-family:inherit}::selection{background:${c.accent};color:#fff}
.serif{font-family:'Instrument Serif',Georgia,serif}
.pg{min-height:100vh;display:flex;flex-direction:column}
.container{max-width:1000px;margin:0 auto;padding:0 20px}
.eyebrow{display:inline-flex;font-size:11px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;color:${c.muted}}

/* Buttons */
.btnS{display:inline-flex;align-items:center;justify-content:center;gap:6px;background:rgba(255,255,255,0.9);color:${c.text};border:1px solid ${c.border};border-radius:999px;padding:10px 18px;font-size:13px;font-weight:700;transition:all 0.3s;white-space:nowrap}.btnS:hover{background:#fff;box-shadow:0 4px 16px rgba(0,0,0,0.06);transform:translateY(-1px)}

/* Nav */
.nav{position:sticky;top:0;z-index:100;background:rgba(248,246,241,0.88);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border-bottom:1px solid rgba(227,221,210,0.5)}
.navR{display:flex;align-items:center;justify-content:space-between;gap:8px;height:64px}
.navBr{display:flex;align-items:center;gap:7px;flex-shrink:0}
.navLo{width:32px;height:32px;border-radius:9px;overflow:hidden;flex-shrink:0;box-shadow:0 2px 6px rgba(0,0,0,0.05)}
.navNm{font-size:14px;font-weight:800;letter-spacing:-0.03em}
.navSb{font-size:8px;font-weight:800;letter-spacing:0.1em;color:${c.accent};margin-top:1px}
.navBk{padding:8px 14px!important;font-size:12px!important}

/* Main */
.main{flex:1;padding:52px 0 80px}

/* Hero */
.hero{text-align:center;margin-bottom:28px}
.heroTi{margin-top:14px;font-size:clamp(36px,7vw,68px);line-height:0.96;letter-spacing:-0.05em}
.heroAc{color:${c.accent};font-style:italic}
.heroSub{margin-top:14px;font-size:clamp(15px,2.2vw,18px);line-height:1.76;color:${c.sub};max-width:520px;margin-left:auto;margin-right:auto}

/* Banner */
.banner{padding:20px 22px;border-radius:22px;border:1px solid ${c.border};display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;box-shadow:0 6px 24px rgba(0,0,0,0.03);margin-bottom:18px}
.bannerOk{background:linear-gradient(180deg,rgba(236,253,243,0.9),rgba(255,255,255,0.92))}
.bannerWarn{background:linear-gradient(180deg,rgba(255,251,235,0.9),rgba(255,255,255,0.92))}
.bannerL{display:flex;align-items:center;gap:12px}
.bannerIc{width:40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;background:${c.greenSoft};color:${c.greenDk};flex-shrink:0}
.bannerTi{font-size:16px;font-weight:800;letter-spacing:-0.02em}
.bannerSub{margin-top:2px;font-size:12px;color:${c.sub}}
.bannerBtn{display:inline-flex;align-items:center;gap:5px;padding:8px 14px;border-radius:999px;background:${c.dark};color:#fff;font-size:12px;font-weight:700;white-space:nowrap;transition:all 0.2s}.bannerBtn:hover{transform:translateY(-1px)}

/* Summary */
.sumGrid{display:grid;grid-template-columns:1fr;gap:10px;margin-bottom:32px}
.sumCard{padding:16px 18px;border-radius:18px;background:rgba(255,255,255,0.92);border:1px solid ${c.border};display:flex;align-items:center;gap:12px}
.sumIc{width:38px;height:38px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.sumIc--green{background:${c.greenSoft};color:${c.greenDk}}
.sumIc--blue{background:${c.accentSoft};color:${c.accent}}
.sumIc--warm{background:#FFF5E8;color:${c.amberDk}}
.sumLbl{display:block;font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:${c.muted}}
.sumVal{display:block;margin-top:3px;font-size:16px;font-weight:800;letter-spacing:-0.02em}

/* Section */
.sectn{margin-top:40px}
.secTi{font-size:clamp(24px,4vw,36px);letter-spacing:-0.04em;line-height:1.08}
.secSub{margin-top:8px;font-size:14px;line-height:1.7;color:${c.sub}}

/* Service cards */
.svcList{margin-top:18px;display:flex;flex-direction:column;gap:12px}
.svcCard{background:rgba(255,255,255,0.94);border:1px solid ${c.border};border-radius:20px;padding:20px 22px;box-shadow:0 4px 16px rgba(0,0,0,0.02);transition:all 0.25s}.svcCard:hover{box-shadow:0 8px 28px rgba(0,0,0,0.05)}
.svcTop{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap}
.svcInfo{flex:1;min-width:0}
.svcName{font-size:16px;font-weight:800;letter-spacing:-0.02em}
.svcDesc{margin-top:4px;font-size:12.5px;line-height:1.6;color:${c.sub}}
.svcMeta{display:flex;align-items:center;gap:8px;flex-shrink:0}
.svcUp{font-size:13px;color:${c.muted};font-weight:700}
.svcSt{min-height:28px;padding:0 10px;border-radius:999px;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:800}
.svcBars{margin-top:14px;display:flex;gap:3px;height:28px;align-items:stretch}
.svcBar{flex:1;min-width:0;border-radius:3px;transform-origin:bottom}
.svcLbls{margin-top:6px;display:flex;justify-content:space-between;font-size:10px;font-weight:700;color:${c.muted}}

/* Incidents */
.incList{margin-top:18px;display:flex;flex-direction:column;gap:12px}
.incCard{padding:20px 22px;border-radius:20px;background:rgba(255,255,255,0.94);border:1px solid ${c.border};transition:all 0.25s}.incCard:hover{box-shadow:0 6px 20px rgba(0,0,0,0.04)}
.incTop{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap}
.incDate{font-size:12px;color:${c.muted};font-weight:700}
.incBadge{display:inline-flex;align-items:center;gap:4px;min-height:26px;padding:0 8px;border-radius:999px;background:${c.greenSoft};color:${c.greenDk};font-size:10px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase}
.incTi{margin-top:10px;font-size:16px;font-weight:800;letter-spacing:-0.02em}
.incBd{margin-top:6px;font-size:13px;line-height:1.72;color:${c.sub}}

/* Footer */
.ft{border-top:1px solid ${c.border};padding:18px 0;margin-top:auto}
.ftIn{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
.ftCp{font-size:11px;color:${c.muted}}
.ftLks{display:flex;gap:16px}
.ftLk{font-size:11px;font-weight:700;color:${c.muted};transition:color 0.2s}.ftLk:hover{color:${c.text}}

/* Responsive */
@media(min-width:640px){
  .container{padding:0 24px}
  .navR{height:72px}
  .sumGrid{grid-template-columns:repeat(3,1fr)}
}
@media(max-width:639px){
  .bannerTi{font-size:14px}
  .bannerBtn{padding:6px 10px;font-size:11px}
  .navBk{padding:6px 10px!important;font-size:11px!important}
}
`;
