"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Share2, Calendar, Trophy, ArrowLeft } from "lucide-react";
const FONT=`@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');`;
const c={bg:"#F8F6F1",card:"#fff",dark:"#08090C",text:"#111214",sub:"#4A4F5C",muted:"#888E9C",accent:"#2563EB",accentSoft:"#ECF2FF",border:"#E3DDD2",green:"#22C55E",greenSoft:"#ECFDF3",greenDk:"#15803D",red:"#EF4444",redSoft:"#FEF2F2",redDk:"#991B1B"};
type Q={q:string;opts:string[];correct:number;why:string;tip:string;cat:string};
const questions:Q[]=[
  {q:"Your GP says take antibiotics for 5 days. You feel better after 3. Should you stop?",opts:["Yes, you feel better","No, finish the full course","Depends on the antibiotic","Ask a pharmacist"],correct:1,why:"Stopping early can leave resistant bacteria. Always finish the course unless your doctor says otherwise.",tip:"If side effects bother you, call your GP before stopping.",cat:"Medication"},
  {q:"You Google a persistent headache and see 'brain tumour.' How likely is that?",opts:["Very likely","About 50/50","Less than 1%","Impossible to say"],correct:2,why:"Less than 1% of headaches indicate anything serious. Tension headaches and migraines are far more common.",tip:"Write down when headaches happen and what helps. Your GP will find this more useful than anything online.",cat:"Myth vs Fact"},
  {q:"A friend says drink 8 glasses of water daily or you will dehydrate. True?",opts:["Yes, everyone needs 8","No, needs vary by person","You need even more","Only athletes need that"],correct:1,why:"The '8 glasses' rule has no strong scientific basis. Needs vary by size, activity, climate, and diet.",tip:"Pale yellow urine is a good sign. Dark yellow means drink more.",cat:"Nutrition"},
  {q:"You cut your finger cooking. Bleeding steadily but you can move it. First step?",opts:["Go to A&E","Apply pressure for 10 minutes","Run under cold water","Put a plaster on"],correct:1,why:"Firm pressure with a clean cloth for 10 minutes lets blood clot. Most cuts do not need A&E.",tip:"Keep a basic first aid kit at home.",cat:"First Aid"},
  {q:"Your elderly parent fell but says they are fine. No head impact. Concerned?",opts:["No, trust them","Monitor for 24 hours","Take to A&E regardless","Only if they cannot walk"],correct:1,why:"Falls in elderly people can cause injuries not immediately obvious. Watch for pain or bruising over 24 hours.",tip:"Ask your GP about a falls risk assessment. Simple changes like grab rails reduce risk significantly.",cat:"Elderly Care"},
  {q:"Feeling low and unmotivated for 3 weeks. See a GP about it?",opts:["No, everyone gets sad","Yes, 2+ weeks is worth discussing","Only if you cannot function","Mental health is not a GP issue"],correct:1,why:"The NHS recommends speaking to your GP if low mood persists more than 2 weeks.",tip:"You do not need a reason to feel low. Asking for help is self-care.",cat:"Mental Health"},
  {q:"Your child has a temperature of 38.2. Give paracetamol immediately?",opts:["Yes, bring fever down fast","Only if they seem distressed","Never give children paracetamol","Only above 40"],correct:1,why:"Fever is natural. The goal is comfort, not elimination. If eating, drinking, and playing normally, medication may not be needed.",tip:"Never give aspirin to children under 16.",cat:"Children"},
  {q:"You read not to eat after 8pm for weight loss. Supported by science?",opts:["Yes, late eating causes gain","No, total calories matter more","Depends on metabolism","Do not eat after 6pm"],correct:1,why:"Weight is about total intake vs expenditure, not timing.",tip:"Focus on eating when genuinely hungry and stopping when satisfied.",cat:"Nutrition"},
  {q:"You notice a new mole on your arm. When should you worry?",opts:["All new moles are dangerous","If asymmetrical, uneven, or growing","Only if it hurts","New moles after 30 are fine"],correct:1,why:"Use ABCDE: Asymmetry, Border irregularity, Colour variation, Diameter over 6mm, Evolving.",tip:"Take photos to monitor changes. A before photo helps your GP assess.",cat:"Skin Health"},
  {q:"You have a cold. Should you ask your GP for antibiotics?",opts:["Yes, to recover faster","No, colds are viral","Only if it lasts a week","Yes, to prevent it getting worse"],correct:1,why:"Colds are caused by viruses. Antibiotics only work against bacteria.",tip:"Rest, fluids, and paracetamol. See a GP if symptoms worsen after 7 to 10 days.",cat:"Medication"},
];
export default function QuizPage(){
  const todayIdx=useMemo(()=>{const d=new Date();return(d.getFullYear()*366+d.getMonth()*31+d.getDate())%questions.length;},[]);
  const [qi,setQi]=useState(todayIdx);const [sel,setSel]=useState<number|null>(null);const [revealed,setRevealed]=useState(false);const [score,setScore]=useState(0);const [total,setTotal]=useState(0);const [done,setDone]=useState(false);
  const q=questions[qi];const correct=sel===q.correct;
  function pick(i:number){if(!revealed)setSel(i);}
  function reveal(){if(sel===null||revealed)return;setRevealed(true);setTotal(p=>p+1);if(sel===q.correct)setScore(p=>p+1);}
  function next(){if(total>=10){setDone(true);return;}setQi(p=>(p+1)%questions.length);setSel(null);setRevealed(false);}
  return(<><style>{FONT}</style><style>{CSS}</style><div className="qW">
    <nav className="qN"><div className="cnt qNI"><Link href="/" className="qBr"><div className="qLo"><Image src="/omela-logo-mark.png" alt="Omela" width={28} height={28} style={{width:"100%",height:"100%",objectFit:"contain"}}/></div><span className="qBrN">Omela</span></Link><Link href="/" className="qBk"><ArrowLeft size={14}/>Back</Link></div></nav>
    <main className="qM"><div className="cnt">
      <div className="qHd"><div><h1 className="serif qTi">Would you know what to do?</h1><p className="qBd">Real health scenarios. See if you would make the right call.</p></div>{total>0&&<div className="qSc"><span className="qScN">{score}/{total}</span></div>}</div>
      {done?(<motion.div initial={{opacity:0,scale:0.97}} animate={{opacity:1,scale:1}} className="qDone">
        <Trophy size={36} color="#F59E0B"/>
        <h2 className="serif qDoneT">10 questions completed</h2>
        <p className="qDoneS">You scored <b>{score}/10</b></p>
        <p className="qDoneB">Building health knowledge is a daily habit. Come back tomorrow for a new set.</p>
        <div className="qDoneCal"><Calendar size={18} color={c.accent}/><span>Check in tomorrow</span></div>
        <div className="qDoneBt"><button className="bP" onClick={()=>{setDone(false);setTotal(0);setScore(0);setQi(0);setSel(null);setRevealed(false);}}>Start over</button><button className="bS" onClick={()=>{if(typeof navigator!=="undefined"&&navigator.share)navigator.share({title:"Omela Health Quiz",text:`I scored ${score}/10!`,url:"https://omela-rho.vercel.app/quiz"});}}><Share2 size={13}/>Share</button></div>
      </motion.div>):(
      <AnimatePresence mode="wait"><motion.div key={qi} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}} className="qCd">
        <div className="qCdT"><span className="qCt">{q.cat}</span><span className="qNum">{total+1}/10</span></div>
        <h2 className="qQ">{q.q}</h2>
        <div className="qOs">{q.opts.map((opt,i)=>{let cls="qO";if(revealed){if(i===q.correct)cls+=" qOOk";else if(i===sel)cls+=" qOBd";else cls+=" qODm";}else if(i===sel)cls+=" qOSl";return<button key={i} className={cls} onClick={()=>pick(i)}><span className="qOL">{String.fromCharCode(65+i)}</span><span className="qOT">{opt}</span></button>;})}</div>
        {!revealed?<button className="bP qSb" onClick={reveal} disabled={sel===null}>Check answer</button>:(
          <div className="qRs">
            <div className={`qRsB ${correct?"qRsOk":"qRsBd"}`}>{correct?"Correct.":"Not this time."}</div>
            <div className="qEx"><b>Why:</b> {q.why}</div>
            <div className="qTp"><b>Tip:</b> {q.tip}</div>
            <div className="qAc"><button className="bP" onClick={next}>{total>=10?"See results":"Next"}<ArrowRight size={12}/></button><button className="bS" onClick={()=>{if(typeof navigator!=="undefined"&&navigator.share)navigator.share({title:"Omela Quiz",text:`I scored ${score}/${total}!`,url:"https://omela-rho.vercel.app/quiz"});}}><Share2 size={12}/>Share</button></div>
          </div>
        )}
      </motion.div></AnimatePresence>)}
      <div className="qPr"><p>Have a real concern? Laura can help.</p><Link href="/demo" className="bP qPrB">Try Laura<ArrowRight size={12}/></Link></div>
    </div></main>
    <footer className="qFt"><div className="cnt qFtI"><p>&copy; 2026 Omela</p><div style={{display:"flex",gap:"12px"}}><Link href="/privacy" className="qFtL">Privacy</Link><Link href="/terms" className="qFtL">Terms</Link></div></div></footer>
  </div></>);
}
const CSS=`
*{box-sizing:border-box;margin:0;padding:0}body{background:${c.bg};color:${c.text};font-family:'DM Sans',-apple-system,sans-serif;-webkit-font-smoothing:antialiased;font-size:16px}a{color:inherit;text-decoration:none}button,input{font-family:inherit}
.serif{font-family:'Instrument Serif',Georgia,serif}.cnt{max-width:640px;margin:0 auto;padding:0 16px}
.bP{display:inline-flex;align-items:center;gap:5px;background:${c.dark};color:#fff;border:none;border-radius:999px;padding:12px 20px;font-size:14px;font-weight:700;cursor:pointer;white-space:nowrap}.bP:disabled{opacity:0.4;cursor:not-allowed}
.bS{display:inline-flex;align-items:center;gap:5px;background:rgba(255,255,255,0.85);color:${c.text};border:1px solid ${c.border};border-radius:999px;padding:12px 20px;font-size:14px;font-weight:700;cursor:pointer}
.qW{min-height:100vh;display:flex;flex-direction:column}.qN{border-bottom:1px solid ${c.border};background:rgba(248,246,241,0.94);backdrop-filter:blur(16px);position:sticky;top:0;z-index:10}.qNI{display:flex;align-items:center;justify-content:space-between;height:52px}
.qBr{display:flex;align-items:center;gap:6px;font-size:13px;font-weight:800}.qLo{width:24px;height:24px;border-radius:7px;overflow:hidden}.qBrN{letter-spacing:-0.03em}.qBk{display:flex;align-items:center;gap:3px;font-size:12px;font-weight:600;color:${c.muted}}
.qM{flex:1;padding:28px 0 40px}.qHd{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:24px}.qTi{font-size:clamp(26px,6vw,40px);letter-spacing:-0.04em;line-height:1.08}.qBd{font-size:15px;color:${c.sub};margin-top:6px}.qSc{background:#fff;border:1px solid ${c.border};border-radius:12px;padding:10px 16px;flex-shrink:0}.qScN{font-size:22px;font-weight:800;color:${c.accent}}
.qCd{background:#fff;border:1px solid ${c.border};border-radius:20px;padding:24px}.qCdT{display:flex;justify-content:space-between;margin-bottom:10px}.qCt{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;color:${c.accent}}.qNum{font-size:11px;font-weight:700;color:${c.muted}}
.qQ{font-size:clamp(17px,4vw,22px);font-weight:800;letter-spacing:-0.02em;line-height:1.3}
.qOs{display:flex;flex-direction:column;gap:8px;margin-top:18px}
.qO{display:flex;align-items:center;gap:12px;width:100%;padding:14px 16px;background:rgba(255,255,255,0.5);border:2px solid ${c.border};border-radius:14px;cursor:pointer;text-align:left;font-family:inherit;transition:all 0.2s}.qO:hover{border-color:#ccc}
.qOSl{border-color:${c.accent};background:${c.accentSoft}}.qOOk{border-color:${c.green};background:${c.greenSoft}}.qOBd{border-color:${c.red};background:${c.redSoft}}.qODm{opacity:0.4}
.qOL{width:28px;height:28px;border-radius:8px;background:${c.bg};display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:${c.muted};flex-shrink:0}.qOT{font-size:14px;font-weight:600;flex:1}
.qSb{margin-top:18px;width:100%}
.qRs{margin-top:18px}.qRsB{padding:12px 16px;border-radius:12px;font-size:15px;font-weight:800}.qRsOk{background:${c.greenSoft};color:${c.greenDk}}.qRsBd{background:${c.redSoft};color:${c.redDk}}
.qEx{margin-top:14px;padding:16px;background:${c.bg};border-radius:12px;font-size:14px;line-height:1.7;color:${c.sub}}
.qTp{margin-top:10px;padding:16px;background:${c.accentSoft};border-radius:12px;font-size:14px;line-height:1.7;color:${c.sub}}
.qAc{display:flex;gap:8px;margin-top:16px;flex-wrap:wrap}
.qDone{background:#fff;border:1px solid ${c.border};border-radius:20px;padding:32px;text-align:center}.qDoneT{font-size:clamp(22px,5vw,32px);letter-spacing:-0.04em;margin-top:12px}.qDoneS{font-size:18px;color:${c.sub};margin-top:6px}.qDoneS b{color:${c.accent}}.qDoneB{font-size:14px;color:${c.muted};margin-top:10px;max-width:360px;margin-left:auto;margin-right:auto;line-height:1.6}
.qDoneCal{display:flex;align-items:center;justify-content:center;gap:8px;margin-top:20px;padding:12px 20px;border-radius:14px;background:${c.accentSoft};font-size:14px;font-weight:700;color:${c.accent}}
.qDoneBt{display:flex;gap:8px;justify-content:center;margin-top:18px;flex-wrap:wrap}
.qPr{margin-top:28px;padding:18px;background:#fff;border:1px solid ${c.border};border-radius:16px;display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}.qPr p{font-size:13px;color:${c.sub};flex:1;min-width:140px}.qPrB{padding:8px 14px!important;font-size:12px!important;flex-shrink:0}
.qFt{border-top:1px solid ${c.border};padding:14px 0}.qFtI{display:flex;align-items:center;justify-content:space-between}.qFtI p{font-size:10px;color:${c.muted}}.qFtL{font-size:10px;color:${c.muted};font-weight:600}
@media(min-width:640px){.cnt{padding:0 24px}.qM{padding:36px 0 52px}.qCd{padding:28px}}
`;
