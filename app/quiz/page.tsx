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
  {q:"You are nearly out of your repeat prescription. When should you request a refill?",opts:["When the last tablet is gone","5 to 7 days before running out","Only when symptoms return","At your next GP visit"],correct:1,why:"Requesting 5 to 7 days ahead gives the practice time to process and the pharmacy time to prepare, avoiding gaps in your medication.",tip:"Laura can set a reminder to request your refill at the right time automatically.",cat:"Prescriptions"},
  {q:"Can you request a repeat prescription without seeing your GP every time?",opts:["No, you must see a GP each time","Yes, if it is on your repeat list","Only for certain medications","Only by phone"],correct:1,why:"Medications on your repeat prescription list can usually be requested without a new appointment, through the practice or pharmacy.",tip:"Check with your practice which medications are on your repeat list.",cat:"Prescriptions"},
  {q:"Your pharmacy says your prescription is not ready. What is the most useful next step?",opts:["Keep calling every hour","Ask when it will be ready","Go to another pharmacy","Wait a full week"],correct:1,why:"Asking for an expected ready time saves repeated trips and gives you a clear timeline.",tip:"Laura can track status for you and notify you when it is ready.",cat:"Prescriptions"},
  {q:"You manage prescriptions for an elderly parent. What is the biggest risk?",opts:["Ordering too many","Missing a refill and running out","Taking medication with food","Changing pharmacies"],correct:1,why:"Gaps in medication are the most common and most dangerous risk for dependent patients, especially with conditions like blood pressure or diabetes.",tip:"Laura can track multiple refill timelines for carers managing prescriptions for others.",cat:"Carer Support"},
  {q:"A friend says drink 8 glasses of water daily or you will dehydrate. True?",opts:["Yes, everyone needs 8","No, needs vary by person","You need even more","Only athletes need that"],correct:1,why:"The '8 glasses' rule has no strong scientific basis. Needs vary by size, activity, climate, and diet.",tip:"Pale yellow urine is a good sign. Dark yellow means drink more.",cat:"Nutrition"},
  {q:"You cut your finger cooking. Bleeding steadily but you can move it. First step?",opts:["Go to A&E","Apply pressure for 10 minutes","Run under cold water","Put a plaster on"],correct:1,why:"Firm pressure with a clean cloth for 10 minutes lets blood clot. Most cuts do not need A&E.",tip:"Keep a basic first aid kit at home.",cat:"First Aid"},
  {q:"Can a pharmacist give you an emergency supply of your regular medication?",opts:["No, only a GP can","Yes, in most cases","Only for painkillers","Only in hospitals"],correct:1,why:"Most pharmacists can provide an emergency supply of regular medication if they can verify your prescription history. This is useful if you run out and cannot reach your GP.",tip:"Bring your repeat prescription slip or medication box to help the pharmacist verify.",cat:"Prescriptions"},
  {q:"Feeling low and unmotivated for 3 weeks. See a GP about it?",opts:["No, everyone gets sad","Yes, 2+ weeks is worth discussing","Only if you cannot function","Mental health is not a GP issue"],correct:1,why:"The NHS recommends speaking to your GP if low mood persists more than 2 weeks.",tip:"You do not need a reason to feel low. Asking for help is self-care.",cat:"Mental Health"},
  {q:"You have a cold. Should you ask your GP for antibiotics?",opts:["Yes, to recover faster","No, colds are viral","Only if it lasts a week","Yes, to prevent it getting worse"],correct:1,why:"Colds are caused by viruses. Antibiotics only work against bacteria.",tip:"Rest, fluids, and paracetamol. See a GP if symptoms worsen after 7 to 10 days.",cat:"Medication"},
];
export default function QuizPage(){
  const todayIdx=useMemo(()=>{const d=new Date();return(d.getFullYear()*366+d.getMonth()*31+d.getDate())%questions.length;},[]);
  const[qi,setQi]=useState(todayIdx);const[sel,setSel]=useState<number|null>(null);const[revealed,setRevealed]=useState(false);const[score,setScore]=useState(0);const[total,setTotal]=useState(0);const[done,setDone]=useState(false);
  const q=questions[qi];const correct=sel===q.correct;
  function pick(i:number){if(!revealed)setSel(i);}
  function reveal(){if(sel===null||revealed)return;setRevealed(true);setTotal(p=>p+1);if(sel===q.correct)setScore(p=>p+1);}
  function next(){if(total>=10){setDone(true);return;}setQi(p=>(p+1)%questions.length);setSel(null);setRevealed(false);}
  return(<><style>{FONT}</style><style>{CSS}</style><div className="qW">
    <nav className="qN"><div className="cnt qNI"><Link href="/" className="qBr"><div className="qLo"><Image src="/omela-logo-mark.png" alt="Omela" width={24} height={24} style={{width:"100%",height:"100%",objectFit:"contain"}}/></div><span className="qBrN">Omela</span></Link><Link href="/" className="qBk"><ArrowLeft size={13}/>Back</Link></div></nav>
    <main className="qM"><div className="cnt">
      <div className="qHd"><div><h1 className="serif qTi">Would you know what to do?</h1><p className="qBd">Real health and prescription scenarios. See if you would make the right call.</p></div>{total>0&&<div className="qSc"><span className="qScN">{score}/{total}</span></div>}</div>
      {done?(<motion.div initial={{opacity:0,scale:0.97}} animate={{opacity:1,scale:1}} className="qDone">
        <Trophy size={32} color="#F59E0B"/>
        <h2 className="serif qDoneT">10 questions completed</h2>
        <p className="qDoneS">You scored <b>{score}/10</b></p>
        <p className="qDoneB">Building health knowledge is a daily habit. Come back tomorrow for a new set.</p>
        <div className="qDoneCal"><Calendar size={16} color={c.accent}/><span>Check in tomorrow</span></div>
        <div className="qDoneBt"><button className="bP" onClick={()=>{setDone(false);setTotal(0);setScore(0);setQi(0);setSel(null);setRevealed(false);}}>Start over</button><button className="bS" onClick={()=>{if(typeof navigator!=="undefined"&&navigator.share)navigator.share({title:"Omela Health Quiz",text:`I scored ${score}/10!`,url:"https://omela-rho.vercel.app/quiz"});}}><Share2 size={12}/>Share</button></div>
      </motion.div>):(
      <AnimatePresence mode="wait"><motion.div key={qi} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}} className="qCd">
        <div className="qCdT"><span className="qCt">{q.cat}</span><span className="qNum">{total+1}/10</span></div>
        <h2 className="qQ">{q.q}</h2>
        <div className="qOs">{q.opts.map((opt,i)=>{let cls="qO";if(revealed){if(i===q.correct)cls+=" qOOk";else if(i===sel)cls+=" qOBd";else cls+=" qODm";}else if(i===sel)cls+=" qOSl";return<button key={i} className={cls} onClick={()=>pick(i)}><span className="qOL">{String.fromCharCode(65+i)}</span><span className="qOT">{opt}</span></button>;})}</div>
        {!revealed?<button className="bP qSb" onClick={reveal} disabled={sel===null}>Check answer</button>:(
          <div className="qRs">
            <div className={`qRsB ${correct?"qRsOk":"qRsBd"}`}>{correct?"Correct.":"Not this time."}</div>
            <div className="qEx"><b>Why:</b> {q.why}</div>
            <div className="qTp"><b>Tip:</b> {q.tip}</div>
            <div className="qAc"><button className="bP" onClick={next}>{total>=10?"See results":"Next"}<ArrowRight size={11}/></button><button className="bS" onClick={()=>{if(typeof navigator!=="undefined"&&navigator.share)navigator.share({title:"Omela Quiz",text:`I scored ${score}/${total}!`,url:"https://omela-rho.vercel.app/quiz"});}}><Share2 size={11}/>Share</button></div>
          </div>
        )}
      </motion.div></AnimatePresence>)}
      <div className="qPr"><p>Managing repeat prescriptions? Laura can help.</p><Link href="/demo" className="bP qPrB">Try Laura<ArrowRight size={11}/></Link></div>
    </div></main>
    <footer className="qFt"><div className="cnt qFtI"><p>&copy; 2026 Omela</p><div style={{display:"flex",gap:"12px"}}><Link href="/privacy" className="qFtL">Privacy</Link><Link href="/terms" className="qFtL">Terms</Link></div></div></footer>
  </div></>);
}
const CSS=`
*{box-sizing:border-box;margin:0;padding:0}body{background:${c.bg};color:${c.text};font-family:'DM Sans',-apple-system,sans-serif;-webkit-font-smoothing:antialiased;font-size:15px}a{color:inherit;text-decoration:none}button,input{font-family:inherit}
.serif{font-family:'Instrument Serif',Georgia,serif}.cnt{max-width:620px;margin:0 auto;padding:0 16px}
.bP{display:inline-flex;align-items:center;gap:5px;background:${c.dark};color:#fff;border:none;border-radius:999px;padding:11px 18px;font-size:13px;font-weight:700;cursor:pointer;white-space:nowrap}.bP:disabled{opacity:0.4;cursor:not-allowed}
.bS{display:inline-flex;align-items:center;gap:5px;background:rgba(255,255,255,0.85);color:${c.text};border:1px solid ${c.border};border-radius:999px;padding:11px 18px;font-size:13px;font-weight:700;cursor:pointer}
.qW{min-height:100vh;display:flex;flex-direction:column}.qN{border-bottom:1px solid ${c.border};background:rgba(248,246,241,0.92);backdrop-filter:blur(16px);position:sticky;top:0;z-index:10}.qNI{display:flex;align-items:center;justify-content:space-between;height:48px}
.qBr{display:flex;align-items:center;gap:5px;font-size:12px;font-weight:800}.qLo{width:22px;height:22px;border-radius:6px;overflow:hidden}.qBrN{letter-spacing:-0.03em}.qBk{display:flex;align-items:center;gap:3px;font-size:11px;font-weight:600;color:${c.muted}}
.qM{flex:1;padding:24px 0 36px}.qHd{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;margin-bottom:20px}.qTi{font-size:clamp(22px,5.5vw,36px);letter-spacing:-0.04em;line-height:1.08}.qBd{font-size:14px;color:${c.sub};margin-top:5px}.qSc{background:#fff;border:1px solid ${c.border};border-radius:10px;padding:8px 14px;flex-shrink:0}.qScN{font-size:20px;font-weight:800;color:${c.accent}}
.qCd{background:#fff;border:1px solid ${c.border};border-radius:18px;padding:22px}.qCdT{display:flex;justify-content:space-between;margin-bottom:8px}.qCt{font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;color:${c.accent}}.qNum{font-size:10px;font-weight:700;color:${c.muted}}
.qQ{font-size:clamp(15px,3.5vw,19px);font-weight:800;letter-spacing:-0.02em;line-height:1.3}
.qOs{display:flex;flex-direction:column;gap:7px;margin-top:14px}
.qO{display:flex;align-items:center;gap:10px;width:100%;padding:12px 14px;background:rgba(255,255,255,0.5);border:2px solid ${c.border};border-radius:12px;cursor:pointer;text-align:left;font-family:inherit;transition:all 0.2s}.qO:hover{border-color:#ccc}
.qOSl{border-color:${c.accent};background:${c.accentSoft}}.qOOk{border-color:${c.green};background:${c.greenSoft}}.qOBd{border-color:${c.red};background:${c.redSoft}}.qODm{opacity:0.4}
.qOL{width:26px;height:26px;border-radius:7px;background:${c.bg};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:${c.muted};flex-shrink:0}.qOT{font-size:13px;font-weight:600;flex:1}
.qSb{margin-top:14px;width:100%}
.qRs{margin-top:14px}.qRsB{padding:10px 14px;border-radius:10px;font-size:14px;font-weight:800}.qRsOk{background:${c.greenSoft};color:${c.greenDk}}.qRsBd{background:${c.redSoft};color:${c.redDk}}
.qEx{margin-top:12px;padding:14px;background:${c.bg};border-radius:10px;font-size:13px;line-height:1.68;color:${c.sub}}
.qTp{margin-top:8px;padding:14px;background:${c.accentSoft};border-radius:10px;font-size:13px;line-height:1.68;color:${c.sub}}
.qAc{display:flex;gap:6px;margin-top:14px;flex-wrap:wrap}
.qDone{background:#fff;border:1px solid ${c.border};border-radius:18px;padding:28px;text-align:center}.qDoneT{font-size:clamp(20px,4.5vw,28px);letter-spacing:-0.04em;margin-top:10px}.qDoneS{font-size:16px;color:${c.sub};margin-top:5px}.qDoneS b{color:${c.accent}}.qDoneB{font-size:13px;color:${c.muted};margin-top:8px;max-width:340px;margin-left:auto;margin-right:auto;line-height:1.6}
.qDoneCal{display:flex;align-items:center;justify-content:center;gap:6px;margin-top:16px;padding:10px 16px;border-radius:12px;background:${c.accentSoft};font-size:13px;font-weight:700;color:${c.accent}}
.qDoneBt{display:flex;gap:6px;justify-content:center;margin-top:14px;flex-wrap:wrap}
.qPr{margin-top:22px;padding:14px;background:#fff;border:1px solid ${c.border};border-radius:14px;display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap}.qPr p{font-size:12px;color:${c.sub};flex:1;min-width:120px}.qPrB{padding:7px 12px!important;font-size:11px!important;flex-shrink:0}
.qFt{border-top:1px solid ${c.border};padding:12px 0}.qFtI{display:flex;align-items:center;justify-content:space-between}.qFtI p{font-size:9px;color:${c.muted}}.qFtL{font-size:9px;color:${c.muted};font-weight:600}
@media(min-width:640px){.cnt{padding:0 20px}.qM{padding:28px 0 44px}.qCd{padding:24px}}
`;
