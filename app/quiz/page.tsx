"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Share2, Heart, Calendar, Trophy } from "lucide-react";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');`;
const c = { bg:"#F8F6F1",card:"#FFFFFF",dark:"#08090C",text:"#111214",sub:"#4A4F5C",muted:"#888E9C",accent:"#2563EB",accentSoft:"#ECF2FF",border:"#E3DDD2",green:"#22C55E",greenSoft:"#ECFDF3",greenDk:"#15803D",red:"#EF4444",redSoft:"#FEF2F2",redDk:"#991B1B" };

type Q = { q:string; opts:string[]; correct:number; why:string; tip:string; cat:string };

const questions: Q[] = [
  {q:"Your GP says take antibiotics for 5 days. You feel better after 3. Should you stop?",opts:["Yes, you feel better","No, finish the full course","Depends on the antibiotic","Ask a pharmacist"],correct:1,why:"Stopping early can leave resistant bacteria. Always finish the course unless your doctor says otherwise.",tip:"If side effects bother you, call your GP before stopping. They can often switch to something gentler.",cat:"Medication"},
  {q:"You Google a persistent headache and see 'brain tumour.' How likely is that?",opts:["Very likely","About 50/50","Less than 1%","Impossible to say"],correct:2,why:"Less than 1% of headaches indicate anything serious. Tension headaches and migraines are far more common.",tip:"Write down when headaches happen and what helps. This is more useful to your GP than anything online.",cat:"Myth vs Fact"},
  {q:"A friend says drink 8 glasses of water daily or you will dehydrate. True?",opts:["Yes, everyone needs 8","No, needs vary by person","You need even more","Only athletes need that"],correct:1,why:"The '8 glasses' rule has no strong scientific basis. Needs vary by size, activity, climate, and diet.",tip:"Check urine colour. Pale yellow is good. Dark yellow means drink more.",cat:"Nutrition"},
  {q:"You cut your finger cooking. Bleeding steadily but you can move it. First step?",opts:["Go to A&E","Apply pressure for 10 minutes","Run under cold water","Put a plaster on"],correct:1,why:"Firm pressure with a clean cloth for 10 minutes lets blood clot. Most cuts do not need A&E.",tip:"Keep a basic first aid kit at home. Knowing when injuries need a doctor is the real skill.",cat:"First Aid"},
  {q:"Your elderly parent fell but says they are fine. No head impact. Concerned?",opts:["No, trust them","Monitor for 24 hours","Take to A&E regardless","Only if they cannot walk"],correct:1,why:"Falls in elderly people can cause injuries not immediately obvious. Watch for pain or bruising over 24 hours.",tip:"Ask your GP about a falls risk assessment. Grab rails, better lighting, and medication reviews reduce risk.",cat:"Elderly Care"},
  {q:"Feeling low and unmotivated for 3 weeks. See a GP about it?",opts:["No, everyone gets sad","Yes, 2+ weeks is worth discussing","Only if you cannot function","Mental health is not a GP issue"],correct:1,why:"The NHS recommends speaking to your GP if low mood persists more than 2 weeks. GPs are trained to help.",tip:"You do not need a reason to feel low. Asking for help is not weakness, it is self-care.",cat:"Mental Health"},
  {q:"Your child has a temperature of 38.2. Give paracetamol immediately?",opts:["Yes, bring fever down fast","Only if they seem distressed","Never give children paracetamol","Only above 40"],correct:1,why:"Fever is natural. The goal is comfort, not elimination. If eating, drinking, and playing normally, medication may not be needed.",tip:"Never give aspirin to children under 16. Check dosage for age and weight.",cat:"Children"},
  {q:"You read not to eat after 8pm for weight loss. Supported by science?",opts:["Yes, late eating causes gain","No, total calories matter more","Depends on metabolism","Do not eat after 6pm"],correct:1,why:"Weight is about total intake vs expenditure, not timing. Late eating can disrupt sleep, which indirectly affects weight.",tip:"Focus on eating when genuinely hungry and stopping when satisfied. Sustainable habits beat strict rules.",cat:"Nutrition"},
  {q:"You notice a new mole on your arm. When should you worry?",opts:["All new moles are dangerous","If asymmetrical, uneven borders, or growing","Only if it hurts","New moles after 30 are fine"],correct:1,why:"Use ABCDE: Asymmetry, Border irregularity, Colour variation, Diameter over 6mm, Evolving. Most moles are harmless.",tip:"Take photos of moles to monitor. A before photo helps your GP assess changes.",cat:"Skin Health"},
  {q:"You have a cold. Should you ask your GP for antibiotics?",opts:["Yes, to recover faster","No, colds are viral and antibiotics treat bacteria","Only if it lasts a week","Yes, to prevent it getting worse"],correct:1,why:"Colds are caused by viruses. Antibiotics only work against bacteria. Taking them unnecessarily contributes to antibiotic resistance.",tip:"Rest, fluids, and paracetamol are the best treatment for a cold. See a GP if symptoms worsen after 7-10 days.",cat:"Medication"},
];

export default function QuizPage() {
  const todayIdx = useMemo(()=>{const d=new Date();return(d.getFullYear()*366+d.getMonth()*31+d.getDate())%questions.length;},[]);
  const [qi,setQi] = useState(todayIdx);
  const [sel,setSel] = useState<number|null>(null);
  const [revealed,setRevealed] = useState(false);
  const [score,setScore] = useState(0);
  const [total,setTotal] = useState(0);
  const [showStreak,setShowStreak] = useState(false);

  const q=questions[qi];
  const correct=sel===q.correct;

  function pick(i:number){if(!revealed)setSel(i);}
  function reveal(){if(sel===null||revealed)return;setRevealed(true);setTotal(p=>p+1);if(sel===q.correct)setScore(p=>p+1);}
  function next(){
    if(total>=10&&!showStreak){setShowStreak(true);return;}
    setQi(p=>(p+1)%questions.length);setSel(null);setRevealed(false);
  }

  return (
    <>
      <style>{FONT}</style>
      <style>{CSS}</style>
      <div className="qW">
        <nav className="qN"><div className="container qNI">
          <Link href="/" className="qBr"><div className="qLo"><Image src="/omela-logo-mark.png" alt="Omela" width={30} height={30} style={{width:"100%",height:"100%",objectFit:"contain"}}/></div><div><div className="qBrN">Omela</div><div className="qBrS serif">Health Quiz</div></div></Link>
          <Link href="/" className="btnP qBk">Back to Omela <ArrowRight size={12}/></Link>
        </div></nav>

        <main className="qM"><div className="container">
          <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} className="qHd">
            <div><div className="qPl"><Heart size={13} color={c.accent}/> Health Knowledge Check</div><h1 className="serif qTi">Would you know what to do?</h1><p className="qBd">Real health scenarios. See if you would make the right call.</p></div>
            {total>0&&<div className="qSc"><div className="qScN">{score}/{total}</div><div className="qScL">correct</div></div>}
          </motion.div>

          {showStreak ? (
            <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} className="qStreak">
              <div className="qStreakIcon"><Trophy size={40} color="#F59E0B"/></div>
              <h2 className="serif qStreakTitle">10 questions completed!</h2>
              <p className="qStreakScore">You scored <b>{score}/10</b></p>
              <p className="qStreakBody">Come back tomorrow for a new set of questions. Building health knowledge is a daily habit.</p>
              <div className="qStreakCal"><Calendar size={20} color={c.accent}/><span>Check in tomorrow for your next challenge</span></div>
              <div className="qStreakBtns">
                <button className="btnP" onClick={()=>{setShowStreak(false);setTotal(0);setScore(0);setQi(0);setSel(null);setRevealed(false);}}>Start over</button>
                <button className="btnS" onClick={()=>{if(navigator.share)navigator.share({title:"Omela Health Quiz",text:`I scored ${score}/10 on the Omela health quiz!`,url:"https://omela-rho.vercel.app/quiz"});}}><Share2 size={14}/> Share result</button>
              </div>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div key={qi} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:0.3}} className="qCd">
                <div className="qCdTop"><span className="qCt">{q.cat}</span><span className="qNum">{total+1} of 10</span></div>
                <h2 className="qQ">{q.q}</h2>
                <div className="qOs">{q.opts.map((opt,i)=>{
                  let cls="qO";
                  if(revealed){if(i===q.correct)cls+=" qOOk";else if(i===sel)cls+=" qOBd";else cls+=" qODm";}
                  else if(i===sel)cls+=" qOSl";
                  return <button key={i} className={cls} onClick={()=>pick(i)}><span className="qOL">{String.fromCharCode(65+i)}</span><span className="qOT">{opt}</span>{revealed&&i===q.correct&&<span style={{color:c.green,fontWeight:800,fontSize:"18px"}}>&#10003;</span>}{revealed&&i===sel&&i!==q.correct&&<span style={{color:c.red,fontWeight:800,fontSize:"18px"}}>&#10007;</span>}</button>;
                })}</div>
                {!revealed?<button className="btnP qSb" onClick={reveal} disabled={sel===null}>Check my answer</button>:(
                  <div className="qRs">
                    <div className={`qRsB ${correct?"qRsOk":"qRsBd"}`}><span>{correct?"&#10003;":"&#10007;"}</span> {correct?"You got it right.":"Not this time."}</div>
                    <div className="qEx"><h3>Why?</h3><p>{q.why}</p></div>
                    <div className="qTp"><h3>Practical tip</h3><p>{q.tip}</p></div>
                    <div className="qAc"><button className="btnP" onClick={next}>{total>=10?"See your results":"Next question"} <ArrowRight size={13}/></button><button className="btnS" onClick={()=>{if(navigator.share)navigator.share({title:"Omela Health Quiz",text:`I scored ${score}/${total}!`,url:"https://omela-rho.vercel.app/quiz"});}}><Share2 size={13}/> Share</button></div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}

          <div className="qPr"><p>Have a real health concern? Laura can help you figure out the right next step.</p><Link href="/demo" className="btnP qPrB">Try Laura <ArrowRight size={12}/></Link></div>
        </div></main>

        <footer className="qFt"><div className="container qFtI"><p>&copy; 2026 Omela</p><div style={{display:"flex",gap:"12px"}}><Link href="/privacy" className="qFtL">Privacy</Link><Link href="/terms" className="qFtL">Terms</Link></div></div></footer>
      </div>
    </>
  );
}

const CSS = `
*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}
body{background:${c.bg};color:${c.text};font-family:'DM Sans',-apple-system,sans-serif;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}button,input{font-family:inherit}
.serif{font-family:'Instrument Serif',Georgia,serif}
.container{max-width:700px;margin:0 auto;padding:0 20px}
.btnP{display:inline-flex;align-items:center;gap:6px;background:${c.dark};color:#fff;border:none;border-radius:999px;padding:13px 22px;font-size:15px;font-weight:700;cursor:pointer;white-space:nowrap;transition:all 0.2s}
.btnP:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 8px 20px rgba(0,0,0,0.12)}.btnP:disabled{opacity:0.4;cursor:not-allowed}
.btnS{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,0.85);color:${c.text};border:1px solid ${c.border};border-radius:999px;padding:13px 22px;font-size:15px;font-weight:700;cursor:pointer}

.qW{min-height:100vh;display:flex;flex-direction:column}
.qN{background:rgba(248,246,241,0.94);backdrop-filter:blur(16px);border-bottom:1px solid ${c.border}}
.qNI{display:flex;align-items:center;justify-content:space-between;height:56px;gap:8px}
.qBr{display:flex;align-items:center;gap:7px;text-decoration:none}
.qLo{width:28px;height:28px;border-radius:8px;overflow:hidden;box-shadow:0 2px 6px rgba(0,0,0,0.06)}
.qBrN{font-size:13px;font-weight:800}.qBrS{font-size:10px;color:${c.accent};font-weight:700}
.qBk{padding:8px 16px!important;font-size:12px!important}

.qM{flex:1;padding:32px 0 48px}

.qHd{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:28px}
.qPl{display:inline-flex;align-items:center;gap:5px;padding:7px 14px;border-radius:999px;border:1px solid ${c.border};background:rgba(255,255,255,0.8);font-size:12px;font-weight:700;color:${c.sub}}
.qTi{font-size:clamp(28px,6vw,44px);letter-spacing:-0.04em;line-height:1.08;margin-top:12px}
.qBd{font-size:16px;color:${c.sub};line-height:1.6;margin-top:8px}
.qSc{text-align:center;flex-shrink:0;background:#fff;border:1px solid ${c.border};border-radius:16px;padding:14px 20px;box-shadow:0 3px 10px rgba(0,0,0,0.03)}
.qScN{font-size:28px;font-weight:800;color:${c.accent}}.qScL{font-size:11px;color:${c.muted};font-weight:600}

.qCd{background:#fff;border:1px solid ${c.border};border-radius:24px;padding:28px;box-shadow:0 6px 24px rgba(0,0,0,0.03)}
.qCdTop{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
.qCt{font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;color:${c.accent}}
.qNum{font-size:12px;font-weight:700;color:${c.muted}}
.qQ{font-size:clamp(18px,4vw,24px);font-weight:800;letter-spacing:-0.02em;line-height:1.3}
.qOs{display:flex;flex-direction:column;gap:10px;margin-top:22px}
.qO{display:flex;align-items:center;gap:14px;width:100%;padding:16px 18px;background:rgba(255,255,255,0.6);border:2px solid ${c.border};border-radius:16px;cursor:pointer;text-align:left;font-family:inherit;transition:all 0.2s}
.qO:hover{border-color:#D0CBBD;background:#fff}
.qOSl{border-color:${c.accent};background:${c.accentSoft}}
.qOOk{border-color:${c.green};background:${c.greenSoft};cursor:default}
.qOBd{border-color:${c.red};background:${c.redSoft};cursor:default}
.qODm{opacity:0.45;cursor:default}
.qOL{width:32px;height:32px;border-radius:10px;background:${c.bg};display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:${c.muted};flex-shrink:0}
.qOT{font-size:15px;font-weight:600;color:${c.text};flex:1}

.qSb{margin-top:22px;width:100%}

.qRs{margin-top:22px}
.qRsB{display:flex;align-items:center;gap:8px;padding:16px 20px;border-radius:14px;font-size:16px;font-weight:800}
.qRsOk{background:${c.greenSoft};color:${c.greenDk}}.qRsBd{background:${c.redSoft};color:${c.redDk}}
.qEx{margin-top:18px;padding:20px;background:${c.bg};border-radius:14px}
.qEx h3{font-size:14px;font-weight:800;margin-bottom:6px}.qEx p{font-size:15px;line-height:1.72;color:${c.sub}}
.qTp{margin-top:14px;padding:20px;background:${c.accentSoft};border-radius:14px;border:1px solid rgba(37,99,235,0.08)}
.qTp h3{font-size:14px;font-weight:800;color:${c.accent};margin-bottom:6px}.qTp p{font-size:15px;line-height:1.72;color:${c.sub}}
.qAc{display:flex;gap:10px;margin-top:20px;flex-wrap:wrap}

/* Streak / Calendar */
.qStreak{background:#fff;border:1px solid ${c.border};border-radius:24px;padding:40px;text-align:center;box-shadow:0 8px 32px rgba(0,0,0,0.04)}
.qStreakIcon{margin-bottom:16px}
.qStreakTitle{font-size:clamp(24px,5vw,36px);letter-spacing:-0.04em}
.qStreakScore{font-size:20px;color:${c.sub};margin-top:8px}
.qStreakScore b{color:${c.accent}}
.qStreakBody{font-size:16px;color:${c.muted};line-height:1.7;margin-top:12px;max-width:400px;margin-left:auto;margin-right:auto}
.qStreakCal{display:flex;align-items:center;justify-content:center;gap:10px;margin-top:24px;padding:16px 24px;border-radius:16px;background:${c.accentSoft};border:1px solid rgba(37,99,235,0.1);font-size:15px;font-weight:700;color:${c.accent}}
.qStreakBtns{display:flex;gap:10px;justify-content:center;margin-top:24px;flex-wrap:wrap}

.qPr{margin-top:32px;padding:22px;background:#fff;border:1px solid ${c.border};border-radius:18px;display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap}
.qPr p{font-size:14px;color:${c.sub};line-height:1.6;flex:1;min-width:180px}
.qPrB{padding:10px 18px!important;font-size:13px!important;flex-shrink:0}

.qFt{border-top:1px solid ${c.border};padding:18px 0}
.qFtI{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px}
.qFtI p{font-size:11px;color:${c.muted}}.qFtL{font-size:11px;color:${c.muted};font-weight:600}

@media(min-width:640px){.container{padding:0 28px}.qM{padding:40px 0 56px}.qCd{padding:36px}}
`;