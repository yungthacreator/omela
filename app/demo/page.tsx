"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, RotateCcw, Send, Bell, FileText, Package, Globe2, Pill, PhoneOff } from "lucide-react";

const FONT=`@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');`;
const c={bg:"#F8F6F1",dark:"#08090C",text:"#111214",sub:"#4A4F5C",muted:"#888E9C",accent:"#2563EB",accentSoft:"#ECF2FF",border:"#E3DDD2",green:"#22C55E",greenSoft:"#ECFDF3",greenDk:"#15803D",warm:"#C9956B",warmSoft:"#FFF8F0"};

type Msg={from:"user"|"laura";text:string;urgency?:"routine"|"soon"|"urgent"|"emergency";action?:string};
type Scenario={id:string;label:string;emoji:string;desc:string;icon:ReactNode;conversation:Msg[]};

const urgencyMap:Record<string,{bg:string;text:string;label:string}>={
  routine:{bg:c.greenSoft,text:c.greenDk,label:"Routine"},
  soon:{bg:"#FFF8E8",text:"#9A6700",label:"Book soon"},
  urgent:{bg:"#FFF4E8",text:"#C2410C",label:"Needs attention"},
  emergency:{bg:"#FEF2F2",text:"#991B1B",label:"Emergency"},
};

const scenarios:Scenario[]=[
  {id:"refill",label:"Monthly refill chase",emoji:"\u{1F48A}",desc:"You need your regular medication and the usual route is slow.",icon:<Pill size={16}/>,conversation:[
    {from:"user",text:"I need to refill my blood pressure medication but I have been trying to contact my GP for two days. The line is always busy."},
    {from:"laura",text:"I can help you prepare this more clearly. Which medication do you need, and roughly how many days of supply do you have left?",urgency:"routine"},
    {from:"user",text:"Amlodipine 5mg. I take it every morning. I have about three days left."},
    {from:"laura",text:"Thank you. I have captured Amlodipine 5mg, once daily, with about three days remaining."},
    {from:"laura",text:"Here is the draft request:\n\n\"I would like to request a repeat prescription for Amlodipine 5mg, taken once daily. I currently have approximately three days of supply remaining.\"\n\nYou can review this before sharing it through the available channel.",action:"Repeat prescription request prepared"},
    {from:"user",text:"That is exactly what I needed."},
    {from:"laura",text:"I can also set a reminder before your next refill cycle, so this becomes less of a monthly chase.",action:"Refill reminder set for next cycle"},
  ]},
  {id:"carer",label:"Managing for a parent",emoji:"\u{1F9D3}",desc:"You handle prescriptions for a family member and it is hard to keep track.",icon:<Bell size={16}/>,conversation:[
    {from:"user",text:"I manage prescriptions for my mother. She takes four different medications and I keep losing track of which one needs refilling when."},
    {from:"laura",text:"That is a common challenge for carers. I can help you organise the medications and set reminders for each one. Can you list the medications and roughly how much supply is left for each?"},
    {from:"user",text:"Metformin 500mg, about a week left. Ramipril 5mg, two weeks. Atorvastatin 20mg, five days. And Omeprazole 20mg, about ten days."},
    {from:"laura",text:"I have captured all four. Based on supply remaining, the priority order is:\n\n1. Atorvastatin 20mg (5 days)\n2. Metformin 500mg (7 days)\n3. Omeprazole 20mg (10 days)\n4. Ramipril 5mg (14 days)",action:"Multi-medication tracker prepared"},
    {from:"laura",text:"I can prepare the first two refill requests now and set reminders for the others as they approach.",action:"Reminders set for all 4 medications"},
    {from:"user",text:"That would save me so much time."},
  ]},
  {id:"status",label:"Is my prescription ready?",emoji:"\u{1F4E6}",desc:"You submitted a request days ago and have no idea if it is ready.",icon:<Package size={16}/>,conversation:[
    {from:"user",text:"I sent a repeat prescription request three days ago and I still do not know whether it is ready at the pharmacy."},
    {from:"laura",text:"That uncertainty is frustrating. Let me help you check. Which pharmacy are you collecting from, and which medication was requested?"},
    {from:"user",text:"Boots on High Street. It was for Sertraline 50mg."},
    {from:"laura",text:"In this preview, I would now check the status through the available channel and let you know whether it is pending, in progress, or ready for pickup.",action:"Status check: Sertraline 50mg at Boots, High Street"},
    {from:"laura",text:"Once the status is confirmed, I will notify you so you do not waste a trip."},
    {from:"user",text:"That would be great. I went there yesterday for nothing."},
    {from:"laura",text:"Exactly the kind of wasted journey Laura is designed to prevent.",action:"Notification set for pickup readiness"},
  ]},
  {id:"letter",label:"Confusing hospital letter",emoji:"\u{1F4CB}",desc:"You received a referral letter full of unfamiliar terms.",icon:<FileText size={16}/>,conversation:[
    {from:"user",text:"I received a hospital letter about a cardiology referral and an echocardiogram. I do not understand what it means."},
    {from:"laura",text:"I can explain the letter in plain language. An echocardiogram is an ultrasound scan of the heart. It does not hurt and usually takes about 20 minutes."},
    {from:"user",text:"It mentions an appointment in Outpatient Cardiology next month."},
    {from:"laura",text:"That means you will visit the heart department as a day patient. You will not need to stay overnight. The scan helps the doctor see how your heart is working.",action:"Letter explained in plain language"},
    {from:"laura",text:"I can also prepare a list of what to bring and questions to ask your consultant."},
  ]},
  {id:"lang",label:"Language barrier",emoji:"\u{1F30D}",desc:"You need a prescription but explaining yourself in English is hard.",icon:<Globe2 size={16}/>,conversation:[
    {from:"user",text:"Bonjour, j'ai besoin de renouveler mon ordonnance mais je ne parle pas bien anglais."},
    {from:"laura",text:"Bonjour. Je peux vous aider en fran\u00e7ais.\n\nQuel m\u00e9dicament avez-vous besoin de renouveler, et combien de jours de stock vous reste-t-il?",urgency:"routine"},
    {from:"user",text:"Amlodipine 5mg. Il me reste environ 3 jours."},
    {from:"laura",text:"Merci. J'ai pr\u00e9par\u00e9 une demande de renouvellement en deux langues pour votre cabinet m\u00e9dical.",action:"Bilingual prescription request prepared"},
    {from:"laura",text:"The English version reads:\n\n\"I would like to request a repeat prescription for Amlodipine 5mg, taken once daily. Approximately 3 days of supply remaining.\"\n\nYou can share this at the practice."},
  ]},
  {id:"stuck",label:"Cannot get through",emoji:"\u{1F624}",desc:"You have been chasing for weeks and still cannot get a response.",icon:<PhoneOff size={16}/>,conversation:[
    {from:"user",text:"I have been trying to get my prescription sorted for three weeks. Every time I call, nobody answers or they say to try again tomorrow."},
    {from:"laura",text:"That kind of access loop is exhausting. I can help organise what has happened and prepare a stronger request.",urgency:"soon"},
    {from:"user",text:"It is for my inhaler. I am running low and it is getting stressful."},
    {from:"laura",text:"I will prepare a structured request that includes the medication, supply urgency, and a record of previous failed attempts. This is harder for admin to dismiss.",action:"Escalated prescription request prepared"},
    {from:"laura",text:"The request includes:\n\n\u2022 Medication: Inhaler (please specify type)\n\u2022 Supply: Running low\n\u2022 Timeline: 3 weeks of attempts\n\u2022 Action needed: Urgent repeat prescription"},
    {from:"user",text:"Thank you. This makes me feel less alone in the process."},
  ]},
];

const freeIntro:Msg={from:"laura",text:"Hello. I am Laura by Omela.\n\nI help people manage repeat prescriptions with less stress. Tell me what medication you need, and I will help with the next step, whether that is preparing a request, tracking status, or setting a reminder."};

export default function DemoPage(){
  const[mode,setMode]=useState<"pick"|"scenario"|"free">("pick");
  const[cs,setCs]=useState<Scenario|null>(null);
  const[vc,setVc]=useState(0);
  const[typing,setTyping]=useState(false);
  const[fi,setFi]=useState("");
  const[fm,setFm]=useState<Msg[]>([freeIntro]);
  const bottomRef=useRef<HTMLDivElement>(null);
  const timers=useRef<number[]>([]);
  const msgs=mode==="scenario"&&cs?cs.conversation.slice(0,vc):fm;

  useEffect(()=>{bottomRef.current?.scrollIntoView({behavior:"smooth"});},[msgs,typing]);
  useEffect(()=>()=>clr(),[]);

  function clr(){timers.current.forEach(id=>window.clearTimeout(id));timers.current=[];}
  function sched(fn:()=>void,d:number){const id=window.setTimeout(fn,d);timers.current.push(id);}

  function startSc(sc:Scenario){clr();setMode("scenario");setCs(sc);setVc(0);setTyping(false);playSc(sc,0);}
  function playSc(sc:Scenario,idx:number){
    if(idx>=sc.conversation.length)return;
    const cur=sc.conversation[idx];
    if(cur.from==="user"){setVc(idx+1);const next=sc.conversation[idx+1];if(!next)return;sched(()=>{setTyping(true);sched(()=>{setTyping(false);setVc(idx+2);sched(()=>playSc(sc,idx+2),900);},650+Math.random()*350);},520);return;}
    setTyping(true);sched(()=>{setTyping(false);setVc(idx+1);sched(()=>playSc(sc,idx+1),850);},650+Math.random()*350);
  }

  function getFreeResp(input:string):Msg{
    const t=input.toLowerCase();
    if(/(chest pain|cannot breathe|unconscious|stroke|seizure)/.test(t))return{from:"laura",text:"Some symptoms need urgent emergency attention. Please contact emergency services now rather than relying on this preview.",urgency:"emergency"};
    if(/(prescription|refill|medication|medicine|inhaler|tablet|pill)/.test(t))return{from:"laura",text:"I can help with that. Tell me which medication you need, how much you have left, and whether you know your usual practice or pharmacy.",urgency:"routine"};
    if(/(remind|reminder|forget|forgot|running low)/.test(t))return{from:"laura",text:"I can set a reminder before you run low. Tell me the medication and how often you take it, and I will work out the right timing."};
    if(/(status|ready|pharmacy|pickup|collect)/.test(t))return{from:"laura",text:"I can help check prescription status. Which pharmacy are you collecting from, and which medication?"};
    if(/(carer|parent|mother|father|manage|multiple)/.test(t))return{from:"laura",text:"Managing prescriptions for someone else is hard. Tell me who you are helping and which medications are involved, and I will help organise them."};
    if(/(letter|referral|hospital|appointment|scan)/.test(t))return{from:"laura",text:"I can explain letters in plain language and help you prepare for what comes next. What does the letter say?"};
    if(/(hello|hi|hey|good morning)/.test(t))return{from:"laura",text:"Hello. Tell me what prescription you need help with, and I will help with the next step."};
    return{from:"laura",text:"Tell me more about what you need. I can help with refill requests, reminders, tracking status, or explaining letters."};
  }

  function sendFree(val:string){const tr=val.trim();if(!tr||typing)return;setFm(p=>[...p,{from:"user",text:tr}]);setFi("");setTyping(true);sched(()=>{setTyping(false);setFm(p=>[...p,getFreeResp(tr)]);},650+Math.random()*350);}
  function reset(){clr();setMode("pick");setCs(null);setVc(0);setTyping(false);setFi("");setFm([freeIntro]);}

  return(<><style>{FONT}</style><style>{CSS}</style>
    <div className="pg">
      <nav className="nav"><div className="cnt navR">
        <Link href="/" className="navBr"><div className="navLo"><Image src="/omela-logo-mark.png" alt="Omela" width={28} height={28} style={{width:"100%",height:"100%",objectFit:"contain"}}/></div><div><div className="navNm">Omela</div><div className="navSb">LAURA DEMO</div></div></Link>
        <div className="navAc"><button type="button" className="resetBtn" onClick={reset}><RotateCcw size={11}/>Reset</button><Link href="/#waitlist" className="joinBtn">Join waitlist <ArrowRight size={11}/></Link></div>
      </div></nav>
      <div className="banner">Simulated preview. Example outputs shown here are for demonstration only. Laura coordinates repeat prescriptions. She does not provide diagnosis or treatment.</div>
      <main className="main"><div className="shell">
        {mode==="pick"?(<motion.section className="picker" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}>
          <div className="pickHd"><span className="eyebrow">Interactive demo</span><h1 className="serif pickTi">See Laura in action.</h1><p className="pickBd">Choose a guided scenario or try the free preview. Each one shows how Laura turns prescription stress into a clearer next step.</p></div>
          <div className="pickTabs"><span className="pickTab pickTabA">Guided scenarios</span><button type="button" className="pickTab pickTabB" onClick={()=>setMode("free")}>Free preview <ArrowRight size={12}/></button></div>
          <div className="scGrid">{scenarios.map(sc=>(<button key={sc.id} type="button" className="scCard" onClick={()=>startSc(sc)}>
            <div className="scCardTop"><span className="scEmoji">{sc.emoji}</span><div className="scIcon">{sc.icon}</div></div>
            <div className="scCardCopy"><h2>{sc.label}</h2><p>{sc.desc}</p></div>
            <span className="scCardLink">Run scenario <ArrowRight size={13}/></span>
          </button>))}</div>
          <button type="button" className="freeLink" onClick={()=>setMode("free")}>Or ask Laura anything <ArrowRight size={13}/></button>
        </motion.section>):(
        <section className="chatShell">
          <div className="chatTop"><div className="chatTopL"><div className="chatAv"><Image src="/laura-avatar.png" alt="Laura" fill sizes="32px" style={{objectFit:"cover"}}/></div><div><div className="chatNm">Laura</div><div className="chatMeta">{mode==="scenario"&&cs?`${cs.emoji} ${cs.label}`:"Free preview"}</div></div></div>
            <div className="chatTopR"><button type="button" className={`modePill${mode==="scenario"?" modePillA":""}`} onClick={()=>{if(cs)startSc(cs);else setMode("pick");}}>Guided</button><button type="button" className={`modePill${mode==="free"?" modePillA":""}`} onClick={()=>{clr();setTyping(false);setMode("free");}}>Free</button></div>
          </div>
          <div className="messages">
            <AnimatePresence initial={false}>{msgs.map((msg,i)=>(<motion.div key={`${msg.from}-${i}-${msg.text.slice(0,10)}`} initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} className={`msgRow ${msg.from==="user"?"msgRowU":"msgRowL"}`}>
              {msg.from==="laura"&&<div className="msgAv"><Image src="/laura-avatar.png" alt="Laura" fill sizes="26px" style={{objectFit:"cover"}}/></div>}
              <div className={`msgBub ${msg.from==="user"?"msgBubU":"msgBubL"}`}>
                <p className="msgTxt" style={{whiteSpace:"pre-line"}}>{msg.text}</p>
                {msg.urgency&&<div className="urgPill" style={{background:urgencyMap[msg.urgency].bg,color:urgencyMap[msg.urgency].text}}><span className="urgDot" style={{background:urgencyMap[msg.urgency].text}}/>{urgencyMap[msg.urgency].label}</div>}
                {msg.action&&<div className="actCard">{msg.action}</div>}
              </div>
            </motion.div>))}</AnimatePresence>
            {typing&&<div className="msgRow msgRowL"><div className="msgAv"><Image src="/laura-avatar.png" alt="Laura" fill sizes="26px" style={{objectFit:"cover"}}/></div><div className="typBub"><span/><span/><span/></div></div>}
            <div ref={bottomRef}/>
          </div>
          {mode==="scenario"&&cs&&vc>=cs.conversation.length&&!typing&&(<motion.div className="scEnd" initial={{opacity:0}} animate={{opacity:1}}><div className="scEndBt"><button type="button" className="joinBtn" onClick={reset}>Try another scenario</button><button type="button" className="secBtn" onClick={()=>{clr();setTyping(false);setMode("free");}}>Ask Laura anything</button></div></motion.div>)}
          {mode==="free"&&(<div className="inputBar"><input type="text" className="input" placeholder="Describe what you need help with..." value={fi} onChange={e=>setFi(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")sendFree(fi);}} disabled={typing}/><button type="button" className="sendBtn" disabled={typing||!fi.trim()} onClick={()=>sendFree(fi)}><Send size={14}/></button></div>)}
        </section>)}
      </div></main>
    </div>
  </>);
}

const CSS=`
*{box-sizing:border-box;margin:0;padding:0}html,body{height:100%;max-width:100%;overflow:hidden}
body{background:${c.bg};color:${c.text};font-family:'DM Sans',-apple-system,sans-serif;-webkit-font-smoothing:antialiased;font-size:15px}
a{color:inherit;text-decoration:none}button,input{font-family:inherit}::selection{background:${c.accent};color:#fff}
@keyframes tPulse{0%,80%{opacity:.3;transform:scale(.82)}40%{opacity:1;transform:scale(1)}}
.serif{font-family:'Instrument Serif',Georgia,serif}
.pg{display:flex;flex-direction:column;height:100vh;height:100dvh}
.cnt{width:100%;max-width:960px;margin:0 auto;padding:0 16px}
.nav{flex-shrink:0;background:rgba(248,246,241,0.9);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border-bottom:1px solid rgba(227,221,210,0.5)}
.navR{min-height:56px;display:flex;align-items:center;justify-content:space-between;gap:8px}
.navBr{display:flex;align-items:center;gap:6px}.navLo{width:26px;height:26px;border-radius:8px;overflow:hidden;flex-shrink:0;box-shadow:0 1px 4px rgba(0,0,0,0.06)}.navNm{font-size:12px;font-weight:800;letter-spacing:-0.03em}.navSb{font-size:7px;font-weight:800;letter-spacing:0.12em;color:${c.accent};margin-top:1px}
.navAc{display:flex;align-items:center;gap:5px}
.resetBtn,.joinBtn,.secBtn{display:inline-flex;align-items:center;justify-content:center;gap:5px;border-radius:999px;white-space:nowrap;font-weight:700;cursor:pointer;transition:all 0.2s}
.resetBtn{padding:7px 11px;font-size:10px;color:${c.muted};background:transparent;border:1px solid ${c.border}}
.joinBtn{padding:8px 14px;font-size:10px;border:none;background:${c.dark};color:#fff;box-shadow:0 4px 12px rgba(0,0,0,0.1)}
.secBtn{padding:8px 14px;font-size:10px;border:1px solid ${c.border};background:rgba(255,255,255,0.85);color:${c.text}}
.resetBtn:hover,.joinBtn:hover,.secBtn:hover{transform:translateY(-1px)}
.banner{flex-shrink:0;padding:7px 14px;text-align:center;font-size:10px;line-height:1.5;color:${c.muted};background:rgba(37,99,235,0.03);border-bottom:1px solid rgba(37,99,235,0.06)}
.main{flex:1;min-height:0;display:flex}.shell{width:100%;max-width:960px;margin:0 auto;padding:12px 10px 0;display:flex;flex-direction:column;min-height:0}
.eyebrow{display:inline-flex;font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:${c.muted}}
/* Picker */
.picker{flex:1;min-height:0;overflow-y:auto;padding-bottom:16px}
.pickHd{max-width:680px}.pickTi{margin-top:8px;font-size:clamp(28px,5.5vw,48px);line-height:1.04;letter-spacing:-0.04em}.pickBd{margin-top:10px;max-width:540px;font-size:14px;line-height:1.72;color:${c.sub}}
.pickTabs{margin-top:16px;display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.pickTab{display:inline-flex;align-items:center;justify-content:center;min-height:32px;padding:0 12px;border-radius:999px;font-size:11px;font-weight:700}.pickTabA{background:${c.accentSoft};color:${c.accent};border:1px solid rgba(37,99,235,0.08)}.pickTabB{border:1px solid ${c.border};background:rgba(255,255,255,0.8);color:${c.text};cursor:pointer;gap:4px}
.scGrid{margin-top:14px;display:grid;grid-template-columns:1fr;gap:8px}
.scCard{width:100%;text-align:left;padding:16px;border-radius:18px;background:rgba(255,255,255,0.94);border:1px solid ${c.border};box-shadow:0 4px 16px rgba(0,0,0,0.03);cursor:pointer;transition:all 0.25s}.scCard:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(0,0,0,0.05);border-color:rgba(201,149,107,0.3)}
.scCardTop{display:flex;align-items:center;justify-content:space-between;gap:8px}.scEmoji{font-size:22px}.scIcon{width:30px;height:30px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:rgba(37,99,235,0.05);color:${c.accent};border:1px solid rgba(37,99,235,0.07);flex-shrink:0}
.scCardCopy{margin-top:10px}.scCardCopy h2{font-size:14px;font-weight:800;letter-spacing:-0.02em}.scCardCopy p{margin-top:4px;font-size:11px;line-height:1.6;color:${c.muted}}
.scCardLink{margin-top:10px;display:inline-flex;align-items:center;gap:4px;color:${c.accent};font-size:11px;font-weight:700}
.freeLink{margin-top:14px;padding:0;background:none;border:none;color:${c.accent};font-size:13px;font-weight:700;display:inline-flex;align-items:center;gap:5px;cursor:pointer}
/* Chat */
.chatShell{flex:1;min-height:0;display:flex;flex-direction:column;border:1px solid ${c.border};background:rgba(255,255,255,0.7);border-radius:22px 22px 0 0;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,0.03)}
.chatTop{flex-shrink:0;display:flex;align-items:center;justify-content:space-between;gap:8px;padding:12px;background:rgba(255,255,255,0.8);border-bottom:1px solid rgba(228,221,210,0.7)}
.chatTopL{display:flex;align-items:center;gap:8px;min-width:0}.chatAv{position:relative;width:30px;height:30px;border-radius:999px;overflow:hidden;flex-shrink:0;border:1px solid #fff}.chatNm{font-size:12px;font-weight:800;letter-spacing:-0.02em}.chatMeta{margin-top:1px;font-size:10px;font-weight:700;color:${c.accent};white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.chatTopR{display:flex;align-items:center;gap:4px}.modePill{min-height:28px;padding:0 10px;border-radius:999px;border:1px solid ${c.border};background:rgba(255,255,255,0.75);color:${c.sub};font-size:10px;font-weight:700;cursor:pointer}.modePillA{background:${c.accentSoft};color:${c.accent};border-color:rgba(37,99,235,0.07)}
.messages{flex:1;min-height:0;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;background:linear-gradient(180deg,#F8F6F1,#F3EFE8)}
.msgRow{display:flex;gap:6px;align-items:flex-start}.msgRowU{flex-direction:row-reverse}.msgRowL{flex-direction:row}
.msgAv{position:relative;width:24px;height:24px;border-radius:999px;overflow:hidden;flex-shrink:0;border:1px solid #fff}
.msgBub{max-width:min(82%,520px);padding:10px 12px;border-radius:14px}.msgBubU{background:${c.dark};color:#fff;border-radius:14px 14px 4px 14px}.msgBubL{background:#fff;color:${c.text};border:1px solid rgba(228,221,210,0.7);border-radius:14px 14px 14px 4px;box-shadow:0 3px 10px rgba(0,0,0,0.02)}
.msgTxt{font-size:12px;line-height:1.7}
.urgPill{margin-top:6px;display:inline-flex;align-items:center;gap:4px;min-height:24px;padding:0 8px;border-radius:999px;font-size:10px;font-weight:700}.urgDot{width:4px;height:4px;border-radius:999px;flex-shrink:0}
.actCard{margin-top:6px;padding:7px 9px;border-radius:8px;background:${c.accentSoft};color:${c.accent};font-size:10px;line-height:1.4;font-weight:700;border:1px solid rgba(37,99,235,0.07)}
.typBub{display:flex;gap:3px;align-items:center;padding:10px 12px;border-radius:14px 14px 14px 4px;background:#fff;border:1px solid rgba(228,221,210,0.7)}.typBub span{width:5px;height:5px;border-radius:999px;background:${c.muted};animation:tPulse 1.2s infinite}.typBub span:nth-child(2){animation-delay:.2s}.typBub span:nth-child(3){animation-delay:.4s}
.scEnd{flex-shrink:0;padding:8px 12px;border-top:1px solid ${c.border};background:rgba(255,255,255,0.8)}.scEndBt{display:flex;gap:6px;flex-wrap:wrap}
.inputBar{flex-shrink:0;display:flex;gap:6px;padding:8px 12px max(10px,env(safe-area-inset-bottom));border-top:1px solid ${c.border};background:rgba(255,255,255,0.85)}
.input{flex:1;min-width:0;height:40px;border-radius:12px;border:1px solid ${c.border};background:#fff;padding:0 12px;color:${c.text};font-size:12px;outline:none;transition:all 0.2s}.input:focus{border-color:${c.accent};box-shadow:0 0 0 2px rgba(37,99,235,0.06)}.input:disabled{opacity:.5}
.sendBtn{width:40px;height:40px;border:none;border-radius:12px;background:${c.accent};color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0}.sendBtn:disabled{opacity:.3;cursor:not-allowed}
@media(min-width:640px){.cnt{padding:0 20px}.shell{padding:14px 14px 0}.scGrid{grid-template-columns:repeat(2,1fr)}.msgBub{max-width:min(74%,560px)}}
@media(min-width:960px){.cnt{padding:0 24px}.shell{padding:18px 18px 0}.scGrid{grid-template-columns:repeat(3,1fr)}}
`;
