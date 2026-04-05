"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Search, FileCheck, Languages, PhoneOff, Baby, FileText } from "lucide-react";

const FONT=`@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');`;
const c={bg:"#F8F6F1",card:"#fff",dark:"#08090C",text:"#111214",sub:"#4A4F5C",muted:"#888E9C",accent:"#2563EB",accentSoft:"#ECF2FF",border:"#E3DDD2",green:"#22C55E",greenSoft:"#ECFDF3",greenDk:"#15803D",warm:"#C9956B",warmSoft:"#FFF8F0"};

function FI({children,delay=0,className=""}:{children:ReactNode;delay?:number;className?:string}){const ref=useRef<HTMLDivElement>(null);const v=useInView(ref,{once:true,amount:0.08});return<motion.div ref={ref} initial={{opacity:0,y:20}} animate={v?{opacity:1,y:0}:{}} transition={{duration:0.6,delay,ease:[0.22,1,0.36,1]}} className={className}>{children}</motion.div>;}

const scenarios=[
  {num:"01",emoji:"\u{1F48A}",icon:<FileCheck size={22}/>,label:"Prescriptions",title:"Chasing repeat medication every month",situation:"You depend on regular medication but keep running into busy lines, slow admin, and the same repeated request cycle.",laura:"Laura captures your medication details, prepares a clean refill request, and helps you send it through the available channel.",outcome:"Less repeated chasing. Less uncertainty. A calmer route to keeping treatment on track.",color:c.accent},
  {num:"02",emoji:"\u{1F4CD}",icon:<Search size={22}/>,label:"Registration",title:"Moving to a new city with no doctor",situation:"You have moved, need a GP, and face different instructions, unclear requirements, and too much guesswork about where to start.",laura:"Laura narrows the right practices near you, prepares the registration step more clearly, and reduces the uncertainty.",outcome:"Faster orientation. Less confusion. A more confident start to entering a new care system.",color:c.green},
  {num:"03",emoji:"\u{1F319}",icon:<Baby size={22}/>,label:"Late-night worry",title:"Your child is unwell and it is 11pm",situation:"You are tired, worried, and unsure whether the next step is to monitor, call urgent care, or wait until morning.",laura:"Laura helps organise the situation, structure the important details, and prepare a clearer summary for the next care conversation.",outcome:"Less panic. Better preparation. Less emotional strain before reaching the right service.",color:c.warm},
  {num:"04",emoji:"\u{1F4CB}",icon:<FileText size={22}/>,label:"Letters",title:"A hospital letter you do not understand",situation:"You receive a referral or appointment letter, but the terms are unfamiliar and the next step still feels vague.",laura:"Laura turns admin language into plain language, explains what the letter is about, and helps prepare for what happens next.",outcome:"More confidence before the appointment. Less panic caused by paperwork that feels cold or unclear.",color:c.accent},
  {num:"05",emoji:"\u{1F30D}",icon:<Languages size={22}/>,label:"Language",title:"Explaining symptoms in a language that is not yours",situation:"You know something is wrong but cannot explain it with enough confidence in English under pressure.",laura:"Laura captures the issue in your language and prepares a structured bilingual note you can share with the practice.",outcome:"Less communication strain. More dignity in the interaction. A better first conversation at the point of care.",color:c.green},
  {num:"06",emoji:"\u{1F624}",icon:<PhoneOff size={22}/>,label:"Callback hell",title:"Three weeks of trying and still not getting through",situation:"You have spent days or weeks in an access loop, repeating the same story and still not reaching the right next step.",laura:"Laura organises the context, captures the failed attempts clearly, and prepares a stronger request that is harder to dismiss.",outcome:"Less emotional exhaustion. Stronger communication. A better chance of moving the process forward.",color:c.warm},
];

export default function HowLauraHelpsPage(){
  return(<><style>{FONT}</style><style>{CSS}</style>
    <div className="pg">
      {/* Nav */}
      <motion.nav initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} className="nav"><div className="container navR">
        <Link href="/" className="navBr"><div className="navLo"><Image src="/omela-logo-mark.png" alt="Omela" width={34} height={34} style={{width:"100%",height:"100%",objectFit:"contain"}}/></div><div><div className="navNm">Omela</div><div className="navSb">POWERED BY LAURA</div></div></Link>
        <div className="navAc"><Link href="/demo" className="btnG">Try demo</Link><Link href="/" className="btnP navCt">Back to Omela <ArrowRight size={13}/></Link></div>
      </div></motion.nav>

      {/* Hero */}
      <section className="hero">
        <div className="heroGlow"/>
        <div className="container heroIn">
          <FI><span className="eyebrow">How Laura helps</span></FI>
          <FI delay={0.04}><h1 className="serif heroTi">Real healthcare<br/>frustrations.<br/><span className="heroAc">Clearer next steps.</span></h1></FI>
          <FI delay={0.08}><p className="heroSub">From registration and repeat prescriptions to letters, language barriers, and access loops. Laura is designed for the practical burden around getting through care.</p></FI>
          <FI delay={0.12}><div className="heroBt"><Link href="/demo" className="btnP">See Laura in action <ArrowRight size={14}/></Link><Link href="/#waitlist" className="btnS">Join waitlist</Link></div></FI>
        </div>
      </section>

      {/* Scenario count strip */}
      <section className="strip"><div className="container stripIn">
        <FI><div className="stripItem"><span className="serif stripNum">6</span><span className="stripLbl">Care scenarios</span></div></FI>
        <FI delay={0.06}><div className="stripItem"><span className="serif stripNum">3</span><span className="stripLbl">Languages shown</span></div></FI>
        <FI delay={0.12}><div className="stripItem"><span className="serif stripNum">0</span><span className="stripLbl">Diagnosis or treatment</span></div></FI>
      </div></section>

      {/* Scenarios */}
      <section className="scSec"><div className="container">
        <FI><div className="shW"><h2 className="serif shT">Familiar moments.<br/>Better preparation.</h2><p className="shB">These are the moments Laura is being designed to handle more clearly. Each one is a real frustration people face when trying to reach care.</p></div></FI>

        <div className="scStack">
          {scenarios.map((sc,i)=>(
            <FI key={sc.num} delay={i*0.04}>
              <article className="scCard">
                <div className="scHead">
                  <motion.div className="scNumW" animate={{rotate:[0,2,-2,0]}} transition={{duration:5+i,repeat:Infinity,ease:"easeInOut"}} style={{background:`${sc.color}08`,borderColor:`${sc.color}15`}}>
                    <span className="scNum" style={{color:sc.color}}>{sc.num}</span>
                  </motion.div>
                  <div className="scHeadTxt">
                    <div className="scLblRow">
                      <motion.span className="scEmoji" animate={{y:[0,-4,0]}} transition={{duration:3+i*0.3,repeat:Infinity,ease:"easeInOut"}}>{sc.emoji}</motion.span>
                      <span className="scLbl">{sc.label}</span>
                    </div>
                    <h3 className="scTi">{sc.title}</h3>
                  </div>
                </div>

                <div className="scGrid">
                  <div className="scPanel scPanelSit">
                    <span className="scPanLbl">The situation</span>
                    <p>{sc.situation}</p>
                  </div>
                  <div className="scPanel scPanelLaura">
                    <div className="scLauraHead">
                      <div className="scLauraAv"><Image src="/laura-avatar.png" alt="Laura" fill sizes="20px" style={{objectFit:"cover"}}/></div>
                      <span className="scPanLbl scPanLblA">How Laura helps</span>
                    </div>
                    <p>{sc.laura}</p>
                  </div>
                  <div className="scPanel scPanelOut">
                    <span className="scPanLbl scPanLblG">Likely outcome</span>
                    <p>{sc.outcome}</p>
                  </div>
                </div>

                <Link href="/demo" className="scLink">Try this in the demo <ArrowRight size={14}/></Link>
              </article>
            </FI>
          ))}
        </div>
      </div></section>

      {/* CTA */}
      <section className="ctaSec"><div className="container"><FI>
        <div className="ctaCard">
          <h2 className="serif ctaTi">Less friction before care begins.</h2>
          <p className="ctaSub">Laura reduces stress around access with clearer requests, clearer notes, and better preparation before the next conversation even starts.</p>
          <div className="ctaBt"><Link href="/demo" className="btnP">Try Laura demo <ArrowRight size={14}/></Link><Link href="/#waitlist" className="btnS">Get early access</Link></div>
          <p className="ctaNote">Laura supports care navigation. She does not diagnose, treat, or replace emergency services.</p>
        </div>
      </FI></div></section>

      {/* Footer */}
      <footer className="ft"><div className="container ftIn">
        <p className="ftCopy">&copy; 2026 Omela</p>
        <div className="ftLks"><Link href="/demo" className="ftLk">Demo</Link><Link href="/privacy" className="ftLk">Privacy</Link><Link href="/terms" className="ftLk">Terms</Link><Link href="/status" className="ftLk">Status</Link></div>
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
.container{max-width:1100px;margin:0 auto;padding:0 20px}

/* Shared */
.shW{text-align:center;max-width:700px;margin:0 auto}.shT{font-size:clamp(28px,5.5vw,52px);line-height:1.06;letter-spacing:-0.04em}.shB{font-size:clamp(14px,2.5vw,17px);line-height:1.78;margin-top:12px;max-width:540px;margin-left:auto;margin-right:auto;color:${c.sub}}
.eyebrow{display:inline-flex;font-size:11px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;color:${c.muted}}

/* Buttons */
.btnP{display:inline-flex;align-items:center;justify-content:center;gap:7px;background:${c.dark};color:#fff;border:none;border-radius:999px;padding:14px 24px;font-size:14px;font-weight:700;cursor:pointer;transition:all 0.3s;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.08)}.btnP:hover{transform:translateY(-1px);box-shadow:0 8px 28px rgba(0,0,0,0.14)}
.btnS{display:inline-flex;align-items:center;justify-content:center;gap:7px;background:rgba(255,255,255,0.9);color:${c.text};border:1px solid ${c.border};border-radius:999px;padding:14px 24px;font-size:14px;font-weight:700;cursor:pointer;transition:all 0.3s;white-space:nowrap}.btnS:hover{background:#fff;box-shadow:0 4px 16px rgba(0,0,0,0.06)}
.btnG{display:inline-flex;align-items:center;justify-content:center;gap:6px;background:transparent;color:${c.sub};border:1px solid ${c.border};border-radius:999px;padding:9px 16px;font-size:12px;font-weight:700;transition:all 0.2s}.btnG:hover{background:rgba(255,255,255,0.8);color:${c.text}}

/* Nav */
.nav{position:sticky;top:0;z-index:100;background:rgba(248,246,241,0.88);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border-bottom:1px solid rgba(227,221,210,0.5)}
.navR{display:flex;align-items:center;justify-content:space-between;gap:8px;height:64px}
.navBr{display:flex;align-items:center;gap:7px;flex-shrink:0}
.navLo{width:32px;height:32px;border-radius:9px;overflow:hidden;flex-shrink:0;box-shadow:0 2px 6px rgba(0,0,0,0.05)}
.navNm{font-size:14px;font-weight:800;letter-spacing:-0.03em}
.navSb{font-size:8px;font-weight:800;letter-spacing:0.1em;color:${c.accent};margin-top:1px}
.navAc{display:flex;align-items:center;gap:8px}
.navCt{padding:9px 16px!important;font-size:12px!important}

/* Hero */
.hero{position:relative;padding:72px 0 48px;overflow:hidden}
.heroGlow{position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at 12% 18%,rgba(37,99,235,0.05),transparent 24%),radial-gradient(circle at 86% 14%,rgba(201,149,107,0.09),transparent 22%)}
.heroIn{position:relative;z-index:2;max-width:720px}
.heroTi{margin-top:16px;font-size:clamp(42px,9vw,86px);line-height:0.94;letter-spacing:-0.055em}
.heroAc{color:${c.accent};font-style:italic}
.heroSub{margin-top:18px;font-size:clamp(16px,2.5vw,20px);line-height:1.72;color:${c.sub};max-width:560px}
.heroBt{margin-top:24px;display:flex;flex-wrap:wrap;gap:10px}

/* Strip */
.strip{padding:32px 0;border-top:1px solid ${c.border};border-bottom:1px solid ${c.border}}
.stripIn{display:flex;align-items:center;justify-content:center;gap:40px;flex-wrap:wrap}
.stripItem{display:flex;align-items:center;gap:10px}
.stripNum{font-size:clamp(28px,4vw,40px);letter-spacing:-0.04em;color:${c.text}}
.stripLbl{font-size:13px;font-weight:700;color:${c.muted};max-width:100px;line-height:1.3}

/* Scenarios */
.scSec{padding:72px 0 80px}
.scStack{display:flex;flex-direction:column;gap:20px;margin-top:40px}

.scCard{background:rgba(255,255,255,0.92);border:1px solid ${c.border};border-radius:24px;padding:32px;transition:all 0.3s;box-shadow:0 4px 20px rgba(0,0,0,0.03)}
.scCard:hover{box-shadow:0 12px 40px rgba(0,0,0,0.06);transform:translateY(-2px)}

.scHead{display:flex;align-items:flex-start;gap:16px}
.scNumW{width:52px;height:52px;border-radius:16px;border:1px solid;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.scNum{font-size:18px;font-weight:800}
.scHeadTxt{min-width:0;flex:1}
.scLblRow{display:flex;align-items:center;gap:6px}
.scEmoji{font-size:20px}
.scLbl{font-size:11px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:${c.muted}}
.scTi{margin-top:6px;font-size:clamp(20px,3.5vw,28px);font-weight:800;letter-spacing:-0.03em;line-height:1.15}

.scGrid{margin-top:24px;display:grid;grid-template-columns:1fr;gap:12px}

.scPanel{padding:20px;border-radius:16px;border:1px solid rgba(227,221,210,0.6);background:rgba(255,255,255,0.6)}
.scPanelLaura{background:rgba(37,99,235,0.03);border-color:rgba(37,99,235,0.08)}
.scPanelOut{background:rgba(34,197,94,0.03);border-color:rgba(34,197,94,0.08)}
.scPanLbl{display:block;font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:${c.muted};margin-bottom:8px}
.scPanLblA{color:${c.accent}}
.scPanLblG{color:${c.greenDk}}
.scPanel p{font-size:14px;line-height:1.76;color:${c.sub}}

.scLauraHead{display:flex;align-items:center;gap:6px;margin-bottom:8px}
.scLauraAv{position:relative;width:18px;height:18px;border-radius:999px;overflow:hidden;flex-shrink:0;border:1px solid #fff}

.scLink{margin-top:20px;display:inline-flex;align-items:center;gap:6px;color:${c.accent};font-size:13px;font-weight:700;transition:gap 0.2s}.scLink:hover{gap:10px}

/* CTA */
.ctaSec{padding:0 0 80px}
.ctaCard{background:rgba(255,255,255,0.94);border:1px solid ${c.border};border-radius:28px;padding:40px 32px;text-align:center;box-shadow:0 8px 32px rgba(0,0,0,0.04)}
.ctaTi{font-size:clamp(28px,5vw,48px);letter-spacing:-0.04em;line-height:1.06}
.ctaSub{margin-top:14px;font-size:clamp(14px,2.2vw,17px);line-height:1.76;color:${c.sub};max-width:560px;margin-left:auto;margin-right:auto}
.ctaBt{margin-top:24px;display:flex;flex-wrap:wrap;justify-content:center;gap:10px}
.ctaNote{margin-top:18px;font-size:12px;color:${c.muted};line-height:1.6}

/* Footer */
.ft{border-top:1px solid ${c.border};padding:18px 0;margin-top:auto}
.ftIn{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
.ftCopy{font-size:11px;color:${c.muted}}
.ftLks{display:flex;gap:16px}
.ftLk{font-size:11px;font-weight:700;color:${c.muted};transition:color 0.2s}.ftLk:hover{color:${c.text}}

/* Responsive */
@media(min-width:640px){
  .container{padding:0 24px}
  .navR{height:72px}
  .scGrid{grid-template-columns:repeat(3,1fr)}
  .heroBt{gap:12px}
  .stripIn{gap:60px}
}
@media(min-width:960px){
  .container{padding:0 36px}
  .hero{padding:88px 0 56px}
  .scCard{padding:36px}
}
@media(max-width:639px){
  .heroBt .btnP,.heroBt .btnS{width:100%}
  .ctaBt .btnP,.ctaBt .btnS{width:100%}
  .scHead{flex-direction:column;gap:12px}
}
`;
