"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Bell, FileText, Package, Globe2, PhoneOff, Users } from "lucide-react";

const FONT=`@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');`;
const c={bg:"#F8F6F1",dark:"#08090C",text:"#111214",sub:"#4A4F5C",muted:"#888E9C",accent:"#2563EB",accentSoft:"#ECF2FF",border:"#E3DDD2",green:"#22C55E",greenSoft:"#ECFDF3",greenDk:"#15803D",warm:"#C9956B",warmSoft:"#FFF8F0"};

function FI({children,delay=0,className=""}:{children:ReactNode;delay?:number;className?:string}){const ref=useRef<HTMLDivElement>(null);const v=useInView(ref,{once:true,amount:0.08});return<motion.div ref={ref} initial={{opacity:0,y:16}} animate={v?{opacity:1,y:0}:{}} transition={{duration:0.55,delay,ease:[0.22,1,0.36,1]}} className={className}>{children}</motion.div>;}

const scenarios=[
  {num:"01",icon:<Bell size={20}/>,label:"Prescriptions",title:"Chasing repeat medication every month",situation:"You depend on regular medication but keep running into busy lines, slow admin, and the same repeated request cycle.",laura:"Laura reminds you before you run low, prepares a clean refill request, and helps you track it through to pickup or delivery.",outcome:"Less repeated chasing. Less uncertainty. A calmer route to keeping treatment on track.",color:c.warm},
  {num:"02",icon:<Users size={20}/>,label:"Carer coordination",title:"Managing prescriptions for someone else",situation:"You handle medication for a parent, partner, or resident and it is hard to keep track of who needs what and when.",laura:"Laura tracks multiple refill timelines, prepares requests for each person, and alerts you before anything runs low.",outcome:"Less mental load. Fewer missed refills. A clearer picture across everyone you support.",color:c.accent},
  {num:"03",icon:<Package size={20}/>,label:"Status tracking",title:"Is my prescription ready yet?",situation:"You submitted a request days ago and have no idea if it has been processed, is ready for collection, or is still pending.",laura:"Laura checks the status and notifies you when it is ready, so you do not waste a trip to the pharmacy.",outcome:"No more guessing. No more wasted journeys. A clear answer before you leave.",color:c.green},
  {num:"04",icon:<FileText size={20}/>,label:"Letters",title:"A hospital letter you do not understand",situation:"You receive a referral or appointment letter, but the terms are unfamiliar and the next step still feels vague.",laura:"Laura turns admin language into plain language, explains what the letter is about, and helps prepare for what happens next.",outcome:"More confidence before the appointment. Less panic caused by paperwork that feels cold or unclear.",color:c.accent},
  {num:"05",icon:<Globe2 size={20}/>,label:"Language",title:"Explaining your needs in a language that is not yours",situation:"You know what you need but cannot explain it with enough confidence in English under pressure.",laura:"Laura captures the issue in your language and prepares a structured bilingual note you can share with the practice or pharmacy.",outcome:"Less communication strain. More dignity in the interaction. A better first conversation.",color:c.green},
  {num:"06",icon:<PhoneOff size={20}/>,label:"Access loops",title:"Three weeks of trying and still not getting through",situation:"You have spent days or weeks in an access loop, repeating the same story and still not reaching the right next step.",laura:"Laura organises the context, captures the failed attempts clearly, and prepares a stronger request that is harder to dismiss.",outcome:"Less emotional exhaustion. Stronger communication. A better chance of moving forward.",color:c.warm},
];

export default function HowLauraHelpsPage(){
  return(<><style>{FONT}</style><style>{CSS}</style>
    <div className="pg">
      <motion.nav initial={{opacity:0,y:-6}} animate={{opacity:1,y:0}} className="nav"><div className="container navR">
        <Link href="/" className="navBr"><div className="navLo"><Image src="/omela-logo-mark.png" alt="Omela" width={30} height={30} style={{width:"100%",height:"100%",objectFit:"contain"}}/></div><span className="navNm">Omela</span></Link>
        <Link href="/" className="btnP navCt">Back to Omela <ArrowRight size={12}/></Link>
      </div></motion.nav>

      <section className="hero"><div className="heroGlow"/><div className="container heroIn">
        <FI><span className="eyebrow">How Laura helps</span></FI>
        <FI delay={0.04}><h1 className="serif heroTi">Real prescription<br/>frustrations.<br/><span className="heroAc">Clearer next steps.</span></h1></FI>
        <FI delay={0.08}><p className="heroSub">From repeat refills and status tracking to letters, language barriers, and access loops. Laura is designed for the practical burden around getting through care admin.</p></FI>
        <FI delay={0.12}><div className="heroBt"><Link href="/demo" className="btnP">See Laura in action <ArrowRight size={13}/></Link><Link href="/#waitlist" className="btnS">Join waitlist</Link></div></FI>
      </div></section>

      <section className="strip"><div className="container stripIn">
        <FI><div className="stripItem"><span className="serif stripNum">6</span><span className="stripLbl">Care scenarios</span></div></FI>
        <FI delay={0.06}><div className="stripItem"><span className="serif stripNum">3</span><span className="stripLbl">Languages shown</span></div></FI>
        <FI delay={0.12}><div className="stripItem"><span className="serif stripNum">0</span><span className="stripLbl">Diagnosis or treatment</span></div></FI>
      </div></section>

      <section className="scSec"><div className="container">
        <FI><div className="shW"><h2 className="serif shT">Familiar moments.<br/>Better preparation.</h2><p className="shB">These are the moments Laura is being designed to handle more clearly. Each one is a real frustration people face.</p></div></FI>
        <div className="scStack">{scenarios.map((sc,i)=>(
          <FI key={sc.num} delay={i*0.04}><article className="scCard">
            <div className="scHead">
              <div className="scNumW" style={{background:`${sc.color}08`,borderColor:`${sc.color}15`}}><span className="scNum" style={{color:sc.color}}>{sc.num}</span></div>
              <div className="scHeadTxt"><div className="scLblRow"><div className="scIcW" style={{color:sc.color}}>{sc.icon}</div><span className="scLbl">{sc.label}</span></div><h3 className="scTi">{sc.title}</h3></div>
            </div>
            <div className="scGrid">
              <div className="scPanel scPanelSit"><span className="scPanLbl">The situation</span><p>{sc.situation}</p></div>
              <div className="scPanel scPanelLaura"><div className="scLauraHead"><div className="scLauraAv"><Image src="/laura-avatar.png" alt="Laura" fill sizes="18px" style={{objectFit:"cover"}}/></div><span className="scPanLbl scPanLblA">How Laura helps</span></div><p>{sc.laura}</p></div>
              <div className="scPanel scPanelOut"><span className="scPanLbl scPanLblG">Likely outcome</span><p>{sc.outcome}</p></div>
            </div>
            <Link href="/demo" className="scLink">Try this in the demo <ArrowRight size={13}/></Link>
          </article></FI>
        ))}</div>
      </div></section>

      <section className="ctaSec"><div className="container"><FI><div className="ctaCard">
        <h2 className="serif ctaTi">Less friction before care begins.</h2>
        <p className="ctaSub">Laura reduces stress around repeat prescriptions with clearer requests, better tracking, and calmer preparation before the next step.</p>
        <div className="ctaBt"><Link href="/demo" className="btnP">Try Laura demo <ArrowRight size={13}/></Link><Link href="/#waitlist" className="btnS">Get early access</Link></div>
        <p className="ctaNote">Laura coordinates repeat prescriptions. She does not diagnose, treat, or replace emergency services.</p>
      </div></FI></div></section>

      <footer className="ft"><div className="container ftIn">
        <p className="ftCopy">&copy; 2026 Omela</p>
        <div className="ftLks"><Link href="/demo" className="ftLk">Demo</Link><Link href="/privacy" className="ftLk">Privacy</Link><Link href="/terms" className="ftLk">Terms</Link><Link href="/status" className="ftLk">Status</Link></div>
      </div></footer>
    </div>
  </>);
}

const CSS=`
*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}html,body{max-width:100%;overflow-x:clip}
body{background:${c.bg};color:${c.text};font-family:'DM Sans',-apple-system,sans-serif;-webkit-font-smoothing:antialiased;font-size:15px}
a{color:inherit;text-decoration:none}button,input{font-family:inherit}::selection{background:${c.accent};color:#fff}
.serif{font-family:'Instrument Serif',Georgia,serif}
.pg{min-height:100vh;display:flex;flex-direction:column}
.container{max-width:1080px;margin:0 auto;padding:0 20px}
.shW{text-align:center;max-width:680px;margin:0 auto}.shT{font-size:clamp(24px,4.8vw,44px);line-height:1.08;letter-spacing:-0.04em}.shB{font-size:clamp(14px,2.2vw,16px);line-height:1.76;margin-top:10px;max-width:500px;margin-left:auto;margin-right:auto;color:${c.sub}}
.eyebrow{display:inline-flex;font-size:10px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;color:${c.muted}}
.btnP{display:inline-flex;align-items:center;justify-content:center;gap:6px;background:${c.dark};color:#fff;border:none;border-radius:999px;padding:12px 20px;font-size:13px;font-weight:700;cursor:pointer;transition:all 0.25s;white-space:nowrap;box-shadow:0 3px 10px rgba(0,0,0,0.08)}.btnP:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(0,0,0,0.13)}
.btnS{display:inline-flex;align-items:center;justify-content:center;gap:6px;background:rgba(255,255,255,0.88);color:${c.text};border:1px solid ${c.border};border-radius:999px;padding:12px 20px;font-size:13px;font-weight:700;cursor:pointer;transition:all 0.25s;white-space:nowrap}.btnS:hover{background:#fff;box-shadow:0 4px 14px rgba(0,0,0,0.05)}
.nav{position:sticky;top:0;z-index:100;background:rgba(248,246,241,0.9);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid rgba(227,221,210,0.45)}
.navR{display:flex;align-items:center;justify-content:space-between;gap:8px;height:56px}.navBr{display:flex;align-items:center;gap:6px;flex-shrink:0}.navLo{width:28px;height:28px;border-radius:8px;overflow:hidden;flex-shrink:0;box-shadow:0 1px 4px rgba(0,0,0,0.06)}.navNm{font-size:14px;font-weight:800;letter-spacing:-0.03em}.navCt{padding:8px 14px!important;font-size:11px!important}
.hero{position:relative;padding:64px 0 40px;overflow:hidden}.heroGlow{position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at 12% 18%,rgba(37,99,235,0.04),transparent 24%),radial-gradient(circle at 86% 14%,rgba(201,149,107,0.07),transparent 22%)}.heroIn{position:relative;z-index:2;max-width:680px}.heroTi{margin-top:12px;font-size:clamp(36px,8vw,72px);line-height:0.95;letter-spacing:-0.05em}.heroAc{color:${c.accent};font-style:italic}.heroSub{margin-top:14px;font-size:clamp(14px,2.2vw,17px);line-height:1.72;color:${c.sub};max-width:520px}.heroBt{margin-top:20px;display:flex;flex-wrap:wrap;gap:8px}
.strip{padding:28px 0;border-top:1px solid ${c.border};border-bottom:1px solid ${c.border}}.stripIn{display:flex;align-items:center;justify-content:center;gap:32px;flex-wrap:wrap}.stripItem{display:flex;align-items:center;gap:8px}.stripNum{font-size:clamp(24px,3.5vw,34px);letter-spacing:-0.04em;color:${c.text}}.stripLbl{font-size:12px;font-weight:700;color:${c.muted};max-width:90px;line-height:1.3}
.scSec{padding:64px 0 72px}.scStack{display:flex;flex-direction:column;gap:16px;margin-top:32px}
.scCard{background:rgba(255,255,255,0.92);border:1px solid ${c.border};border-radius:22px;padding:26px;transition:all 0.3s;box-shadow:0 3px 14px rgba(0,0,0,0.02)}.scCard:hover{box-shadow:0 10px 32px rgba(0,0,0,0.05);transform:translateY(-1px)}
.scHead{display:flex;align-items:flex-start;gap:14px}.scNumW{width:46px;height:46px;border-radius:14px;border:1px solid;display:flex;align-items:center;justify-content:center;flex-shrink:0}.scNum{font-size:15px;font-weight:800}.scHeadTxt{min-width:0;flex:1}.scLblRow{display:flex;align-items:center;gap:5px}.scIcW{display:flex;align-items:center}.scLbl{font-size:10px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:${c.muted}}.scTi{margin-top:5px;font-size:clamp(17px,3vw,24px);font-weight:800;letter-spacing:-0.03em;line-height:1.15}
.scGrid{margin-top:20px;display:grid;grid-template-columns:1fr;gap:10px}
.scPanel{padding:16px;border-radius:14px;border:1px solid rgba(227,221,210,0.5);background:rgba(255,255,255,0.6)}.scPanelLaura{background:rgba(37,99,235,0.03);border-color:rgba(37,99,235,0.07)}.scPanelOut{background:rgba(34,197,94,0.03);border-color:rgba(34,197,94,0.07)}
.scPanLbl{display:block;font-size:9px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:${c.muted};margin-bottom:6px}.scPanLblA{color:${c.accent}}.scPanLblG{color:${c.greenDk}}.scPanel p{font-size:13px;line-height:1.72;color:${c.sub}}
.scLauraHead{display:flex;align-items:center;gap:5px;margin-bottom:6px}.scLauraAv{position:relative;width:16px;height:16px;border-radius:999px;overflow:hidden;flex-shrink:0;border:1px solid #fff}
.scLink{margin-top:16px;display:inline-flex;align-items:center;gap:5px;color:${c.accent};font-size:12px;font-weight:700;transition:gap 0.2s}.scLink:hover{gap:8px}
.ctaSec{padding:0 0 72px}.ctaCard{background:rgba(255,255,255,0.94);border:1px solid ${c.border};border-radius:24px;padding:32px 26px;text-align:center;box-shadow:0 6px 24px rgba(0,0,0,0.03)}.ctaTi{font-size:clamp(24px,4.5vw,40px);letter-spacing:-0.04em;line-height:1.08}.ctaSub{margin-top:12px;font-size:clamp(13px,2vw,15px);line-height:1.76;color:${c.sub};max-width:500px;margin-left:auto;margin-right:auto}.ctaBt{margin-top:20px;display:flex;flex-wrap:wrap;justify-content:center;gap:8px}.ctaNote{margin-top:14px;font-size:11px;color:${c.muted};line-height:1.55}
.ft{border-top:1px solid ${c.border};padding:16px 0;margin-top:auto}.ftIn{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}.ftCopy{font-size:10px;color:${c.muted}}.ftLks{display:flex;gap:14px}.ftLk{font-size:10px;font-weight:700;color:${c.muted};transition:color 0.2s}.ftLk:hover{color:${c.text}}
@media(min-width:640px){.container{padding:0 24px}.scGrid{grid-template-columns:repeat(3,1fr)}.heroBt{gap:10px}.stripIn{gap:48px}.navR{height:62px}}
@media(min-width:960px){.container{padding:0 32px}.hero{padding:76px 0 48px}.scCard{padding:30px}}
@media(max-width:639px){.heroBt .btnP,.heroBt .btnS{width:100%}.ctaBt .btnP,.ctaBt .btnS{width:100%}.scHead{flex-direction:column;gap:10px}}
`;
