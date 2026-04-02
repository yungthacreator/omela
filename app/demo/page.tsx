"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Send, RotateCcw } from "lucide-react";
const FONT=`@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');`;
const c={bg:"#F8F6F1",card:"#fff",dark:"#08090C",text:"#111214",sub:"#4A4F5C",muted:"#888E9C",accent:"#2563EB",accentSoft:"#ECF2FF",border:"#E3DDD2",green:"#22C55E",greenSoft:"#ECFDF3",greenDk:"#15803D"};
type Msg={from:"user"|"laura";text:string;urgency?:string;action?:string};
type Scenario={id:string;label:string;emoji:string;desc:string;conversation:Msg[]};
const urgColors:Record<string,{bg:string;text:string;label:string}>={routine:{bg:c.greenSoft,text:c.greenDk,label:"Routine"},soon:{bg:"#FFFBEB",text:"#92400E",label:"Book soon"},urgent:{bg:"#FFF7ED",text:"#C2410C",label:"Needs attention"},emergency:{bg:"#FEF2F2",text:"#991B1B",label:"Emergency"}};
const scenarios:Scenario[]=[
  {id:"rx",label:"Repeat prescription",emoji:"\u{1F48A}",desc:"The GP line is busy and you need medication",conversation:[{from:"user",text:"I need to refill my blood pressure medication. The GP line has been busy for two days."},{from:"laura",text:"I can help you skip the phone queue. Which medication do you need refilled?",urgency:"routine"},{from:"user",text:"Amlodipine 5mg. I take it daily. About 3 days left."},{from:"laura",text:"Got it. I found your practice: Parkside Medical Centre, 0.4 miles away. They accept online refill requests.\n\nHere is your draft request:\n\n\"I would like to request a repeat prescription for Amlodipine 5mg (once daily). I have approximately 3 days of supply remaining.\"\n\nShall I set a reminder for your next refill?",action:"Refill request drafted"}]},
  {id:"gp",label:"New city, no doctor",emoji:"\u{1F4CD}",desc:"You just moved and need to register",conversation:[{from:"user",text:"I just moved to Manchester from Lagos. I need a GP and my asthma inhaler."},{from:"laura",text:"Welcome to Manchester. In the UK, GP registration is free through the NHS. What is your postcode?"},{from:"user",text:"M1, near Piccadilly."},{from:"laura",text:"I found 3 practices near M1 accepting new patients:\n\n1. City Health Centre (0.3 miles)\n2. Piccadilly Medical Practice (0.5 miles)\n3. Northern Quarter Surgery (0.6 miles)\n\nBring proof of address and photo ID. Once registered, request your inhaler at your first appointment.\n\nShall I request a registration callback from City Health Centre?",action:"3 practices found near M1",urgency:"routine"}]},
  {id:"child",label:"Worried about your child",emoji:"\u{1F319}",desc:"Late at night with a sick child",conversation:[{from:"user",text:"My 3 year old has had a temperature of 38.5 for two days. It is 11pm. Should I go to A&E?"},{from:"laura",text:"I understand your worry. Can you tell me: Is she responsive? Drinking fluids? Any rash?",urgency:"urgent"},{from:"user",text:"Responsive but tired. Had water an hour ago. No rash."},{from:"laura",text:"A responsive child taking fluids is reassuring. This does not sound like an A&E emergency tonight, but it does need attention.\n\nTonight: Keep her comfortable, offer sips of water, use children's paracetamol.\n\nTomorrow at 8am: Call your GP for a same-day slot.\n\nIf anything changes (hard to wake, rash, breathing difficulty), go straight to A&E.\n\nNearest out-of-hours: Manchester Urgent Care Centre.",action:"Out-of-hours service found",urgency:"urgent"}]},
  {id:"letter",label:"Hospital letter confusion",emoji:"\u{1F4CB}",desc:"Medical jargon you do not understand",conversation:[{from:"user",text:"I got a referral for an echocardiogram. What does that mean?"},{from:"laura",text:"An echocardiogram is an ultrasound of your heart. Completely painless. A technician places a small device on your chest that uses sound waves to create images. Takes 15 to 30 minutes. No needles, you stay awake.\n\nDo you have the appointment date?"},{from:"user",text:"Royal Infirmary, 15 April."},{from:"laura",text:"Here is everything you need:\n\nBring: Referral letter, medication list, NHS number, photo ID.\nWear: Something easy to remove from the waist up.\nWhen you arrive: Follow signs to Outpatient Cardiology, check in at reception.\n\nResults go to your referring doctor within 1 to 2 weeks.",action:"Appointment guide prepared"}]},
  {id:"lang",label:"Language barrier",emoji:"\u{1F30D}",desc:"Cannot explain symptoms in English",conversation:[{from:"user",text:"Bonjour, j'ai besoin d'un medecin mais je ne parle pas bien anglais."},{from:"laura",text:"Bonjour. Je vais vous aider en francais.\n\nDepuis combien de temps avez-vous ce probleme? Avez-vous de la fievre?",urgency:"soon"},{from:"user",text:"Mal au ventre depuis 3 jours. Pas de fievre."},{from:"laura",text:"J'ai trouve: Waterloo Health Centre, 0.2 miles. Sans rendez-vous le matin.\n\nVoici une note pour l'accueil:\n\n\"This patient has had abdominal pain for 3 days. No fever. They speak French and would benefit from an interpreter.\"",action:"Bilingual note prepared"}]},
  {id:"stuck",label:"Stuck in callback hell",emoji:"\u{1F624}",desc:"Three weeks of no appointments",conversation:[{from:"user",text:"I have been trying to get an appointment for 3 weeks. Every time I call they say no slots."},{from:"laura",text:"Three weeks is unacceptable. Let me help you break out of this cycle.\n\nIs your concern getting worse?",urgency:"soon"},{from:"user",text:"Yes, my knee is swelling more."},{from:"laura",text:"Here are three routes past the phone queue:\n\n1. Online booking: Many practices release same-day slots at midnight.\n2. Walk-in clinic: City Walk-In Centre, 0.6 miles, open 8am to 8pm.\n3. Structured request: I can submit a callback request flagging 3 weeks of failed attempts and worsening symptoms.\n\nWhich works best?",action:"3 alternative routes identified"}]},
];
export default function DemoPage(){
  const [sc,setSc]=useState<Scenario|null>(null);const [vi,setVi]=useState(0);const [typing,setTyping]=useState(false);
  const [freeInput,setFreeInput]=useState("");const [freeMsgs,setFreeMsgs]=useState<Msg[]>([{from:"laura",text:"Hello. I am Laura. Tell me what you are dealing with and I will help you figure out the next step."}]);
  const [mode,setMode]=useState<"pick"|"scenario"|"free">("pick");const btm=useRef<HTMLDivElement>(null);
  useEffect(()=>{btm.current?.scrollIntoView({behavior:"smooth"});},[vi,freeMsgs,typing]);
  function start(s:Scenario){setSc(s);setVi(0);setMode("scenario");adv(s,0);}
  function adv(s:Scenario,idx:number){if(idx>=s.conversation.length)return;const msg=s.conversation[idx];if(msg.from==="user"){setVi(idx+1);setTimeout(()=>{setTyping(true);setTimeout(()=>{setTyping(false);setVi(idx+2);setTimeout(()=>adv(s,idx+2),1000);},700+Math.random()*800);},500);}else{setVi(idx+1);setTimeout(()=>adv(s,idx+1),1000);}}
  function getResp(input:string):Msg{const l=input.toLowerCase();if(l.match(/chest|breathe|unconscious|stroke/))return{from:"laura",text:"This sounds like it could need emergency attention. Please call 999 (UK) or 911 (US) now.",urgency:"emergency"};if(l.match(/prescription|refill|medication|medicine/))return{from:"laura",text:"I can help with that. Let me find your practice and check if they accept online refill requests. What medication do you need?",urgency:"routine"};if(l.match(/move|new|register|no.*gp|no.*doctor/))return{from:"laura",text:"I can find GP practices near you accepting new patients. What is your postcode?"};if(l.match(/referral|hospital|letter|scan/))return{from:"laura",text:"I can explain referral letters in plain language. What is the referral for?"};if(l.match(/fever|child|baby|kid|son|daughter/))return{from:"laura",text:"I understand the worry. Can you tell me their age and temperature?",urgency:"urgent"};if(l.match(/hello|hi|hey/))return{from:"laura",text:"Hello. Tell me what you need help with. I can find doctors, explain letters, help with prescriptions, or navigate the system."};return{from:"laura",text:"Could you tell me more? I can help with finding a doctor, prescriptions, hospital referrals, or navigating the healthcare system."};}
  function sendFree(t:string){if(!t.trim())return;setFreeMsgs(p=>[...p,{from:"user",text:t.trim()}]);setFreeInput("");setTyping(true);setTimeout(()=>{setTyping(false);setFreeMsgs(p=>[...p,getResp(t)]);},700+Math.random()*800);}
  function reset(){setSc(null);setVi(0);setMode("pick");setFreeMsgs([{from:"laura",text:"Hello. I am Laura. Tell me what you need help with."}]);setFreeInput("");setTyping(false);}
  const msgs=mode==="scenario"&&sc?sc.conversation.slice(0,vi):freeMsgs;
  return(<><style>{FONT}</style><style>{CSS}</style><div className="dW">
    <nav className="dN"><div className="cnt dNI">
      <Link href="/" className="dBr"><div className="dLo"><Image src="/omela-logo-mark.png" alt="Omela" width={28} height={28} style={{width:"100%",height:"100%",objectFit:"contain"}}/></div><div><div className="dBrN">Omela</div><div className="dBrS serif">Try Laura</div></div></Link>
      <div className="dNR"><button onClick={reset} className="dRst"><RotateCcw size={12}/>Reset</button><Link href="/#waitlist" className="bP dNC">Join waitlist<ArrowRight size={12}/></Link></div>
    </div></nav>
    <div className="dBn">Simulation preview. The full product is launching soon.</div>
    <div className="dM"><div className="dIn">
      {mode==="pick"&&(<motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="dSc">
        <h2 className="serif dScT">Real problems. Real help.</h2>
        <p className="dScB">Choose a scenario to see how Laura navigates everyday healthcare frustrations.</p>
        <div className="dScG">{scenarios.map(s=>(<button key={s.id} className="dScC" onClick={()=>start(s)}><span className="dScE">{s.emoji}</span><div className="dScCT"><span className="dScL">{s.label}</span><span className="dScD">{s.desc}</span></div><ArrowRight size={14} color={c.accent}/></button>))}</div>
        <button className="dFr" onClick={()=>setMode("free")}>Or ask Laura anything <ArrowRight size={14}/></button>
      </motion.div>)}
      {(mode==="scenario"||mode==="free")&&(<div className="dCh">
        {mode==="scenario"&&sc&&<div className="dChL"><span>{sc.emoji}</span>{sc.label}</div>}
        <div className="dMs">
          <AnimatePresence initial={false}>{msgs.map((msg,i)=>(
            <motion.div key={i} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className={`dMg ${msg.from==="user"?"dMgR":"dMgL"}`}>
              {msg.from==="laura"&&<div className="dMgAv"><Image src="/laura-avatar.png" alt="Laura" fill sizes="28px" style={{objectFit:"cover"}}/></div>}
              <div className={`dMgC ${msg.from==="user"?"dMgU":"dMgLa"}`}>
                <p className="dMgT" style={{whiteSpace:"pre-line"}}>{msg.text}</p>
                {msg.urgency&&urgColors[msg.urgency]&&<div className="dUr" style={{background:urgColors[msg.urgency].bg,color:urgColors[msg.urgency].text}}><span className="dUrD" style={{background:urgColors[msg.urgency].text}}/>{urgColors[msg.urgency].label}</div>}
                {msg.action&&<div className="dAc">{msg.action}</div>}
              </div>
            </motion.div>
          ))}</AnimatePresence>
          {typing&&<div className="dMg dMgL"><div className="dMgAv"><Image src="/laura-avatar.png" alt="Laura" fill sizes="28px" style={{objectFit:"cover"}}/></div><div className="dMgLa dTy"><span/><span/><span/></div></div>}
          <div ref={btm}/>
        </div>
        {mode==="scenario"&&sc&&vi>=sc.conversation.length&&!typing&&(<motion.div initial={{opacity:0}} animate={{opacity:1}} className="dEn"><div className="dEnB"><button className="bP" onClick={reset}>Try another</button><button className="bS" onClick={()=>{setSc(null);setMode("free");}}>Ask Laura anything</button></div></motion.div>)}
        {mode==="free"&&<div className="dIp"><input type="text" placeholder="Describe what you need help with..." value={freeInput} onChange={e=>setFreeInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!typing)sendFree(freeInput);}} disabled={typing} className="dIpF"/><button onClick={()=>sendFree(freeInput)} disabled={typing||!freeInput.trim()} className="dSd"><Send size={15}/></button></div>}
      </div>)}
    </div></div>
  </div></>);
}
const CSS=`
*{box-sizing:border-box;margin:0;padding:0}html,body{height:100%;max-width:100%;overflow:hidden}body{background:${c.bg};color:${c.text};font-family:'DM Sans',-apple-system,sans-serif;-webkit-font-smoothing:antialiased;font-size:16px}a{color:inherit;text-decoration:none}button,input{font-family:inherit}.serif{font-family:'Instrument Serif',Georgia,serif}.cnt{max-width:720px;margin:0 auto;padding:0 16px}
.bP{display:inline-flex;align-items:center;gap:5px;background:${c.dark};color:#fff;border:none;border-radius:999px;padding:10px 18px;font-size:13px;font-weight:700;cursor:pointer;white-space:nowrap}
.bS{display:inline-flex;align-items:center;gap:5px;background:rgba(255,255,255,0.85);color:${c.text};border:1px solid ${c.border};border-radius:999px;padding:10px 18px;font-size:13px;font-weight:700;cursor:pointer}
.dW{display:flex;flex-direction:column;height:100vh;height:100dvh}.dN{background:rgba(248,246,241,0.94);backdrop-filter:blur(16px);border-bottom:1px solid ${c.border};flex-shrink:0}.dNI{display:flex;align-items:center;justify-content:space-between;height:50px;gap:6px}
.dBr{display:flex;align-items:center;gap:6px;flex-shrink:0}.dLo{width:24px;height:24px;border-radius:7px;overflow:hidden}.dBrN{font-size:12px;font-weight:800}.dBrS{font-size:9px;color:${c.accent};font-weight:700}
.dNR{display:flex;gap:5px;align-items:center}.dRst{display:flex;align-items:center;gap:3px;background:none;border:1px solid ${c.border};border-radius:999px;padding:6px 12px;font-size:11px;font-weight:600;color:${c.muted};cursor:pointer}.dNC{padding:7px 14px!important;font-size:11px!important}
.dBn{background:${c.accentSoft};padding:6px 12px;font-size:11px;color:${c.sub};text-align:center;font-weight:600;flex-shrink:0;border-bottom:1px solid rgba(37,99,235,0.08)}
.dM{flex:1;display:flex;flex-direction:column;overflow:hidden}.dIn{max-width:720px;width:100%;margin:0 auto;display:flex;flex-direction:column;height:100%;padding:0 12px}
.dSc{padding:16px 0;overflow-y:auto;flex:1}.dScT{font-size:clamp(24px,5vw,36px);letter-spacing:-0.04em;line-height:1.1}.dScB{font-size:14px;color:${c.sub};line-height:1.6;margin-top:6px}.dScG{display:flex;flex-direction:column;gap:8px;margin-top:18px}
.dScC{display:flex;align-items:center;gap:12px;width:100%;padding:14px 16px;background:${c.card};border:1px solid ${c.border};border-radius:16px;cursor:pointer;text-align:left;font-family:inherit;transition:all 0.2s}.dScC:hover{border-color:#ccc;box-shadow:0 4px 16px rgba(0,0,0,0.04)}
.dScE{font-size:24px;flex-shrink:0}.dScCT{flex:1;min-width:0}.dScL{font-size:15px;font-weight:700;display:block}.dScD{font-size:12px;color:${c.muted};margin-top:1px;display:block}
.dFr{display:flex;align-items:center;gap:5px;margin-top:16px;background:none;border:none;color:${c.accent};font-size:14px;font-weight:700;cursor:pointer;padding:0}
.dCh{flex:1;display:flex;flex-direction:column;overflow:hidden;padding-top:6px}.dChL{display:flex;align-items:center;gap:5px;padding:8px 12px;background:${c.accentSoft};border-radius:12px;font-size:12px;font-weight:700;color:${c.accent};margin-bottom:6px;flex-shrink:0}
.dMs{flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:12px;padding:8px 0}
.dMg{display:flex;gap:8px;align-items:flex-start}.dMgR{flex-direction:row-reverse}.dMgL{flex-direction:row}
.dMgAv{position:relative;width:28px;height:28px;border-radius:999px;overflow:hidden;flex-shrink:0;border:1.5px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.06)}
.dMgC{max-width:80%;padding:12px 14px;border-radius:16px}.dMgU{background:${c.dark};color:#fff;border-radius:16px 16px 4px 16px}.dMgLa{background:${c.card};border:1px solid ${c.border};border-radius:16px 16px 16px 4px}
.dMgT{font-size:14px;line-height:1.7}
.dUr{display:inline-flex;align-items:center;gap:4px;margin-top:8px;padding:4px 10px;border-radius:999px;font-size:11px;font-weight:700}.dUrD{width:4px;height:4px;border-radius:999px;flex-shrink:0}
.dAc{margin-top:8px;padding:8px 12px;border-radius:10px;background:${c.accentSoft};color:${c.accent};font-size:11px;font-weight:700;border:1px solid rgba(37,99,235,0.08)}
.dTy{display:flex;gap:3px;padding:12px 16px}.dTy span{width:6px;height:6px;border-radius:999px;background:${c.muted};animation:tD 1.2s infinite}.dTy span:nth-child(2){animation-delay:0.2s}.dTy span:nth-child(3){animation-delay:0.4s}
@keyframes tD{0%,80%{opacity:0.3;transform:scale(0.8)}40%{opacity:1;transform:scale(1)}}
.dEn{padding:10px 0;flex-shrink:0;border-top:1px solid ${c.border}}.dEnB{display:flex;gap:6px;flex-wrap:wrap}
.dIp{display:flex;gap:6px;padding:8px 0 max(8px,env(safe-area-inset-bottom));flex-shrink:0;border-top:1px solid ${c.border}}.dIpF{flex:1;height:44px;border-radius:12px;border:1px solid ${c.border};background:#fff;padding:0 14px;font-size:14px;color:${c.text};outline:none;min-width:0}.dIpF:focus{border-color:${c.accent}}.dIpF:disabled{opacity:0.5}
.dSd{width:44px;height:44px;border-radius:12px;background:${c.accent};color:#fff;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0}.dSd:disabled{opacity:0.3}
@media(min-width:640px){.cnt{padding:0 20px}.dIn{padding:0 16px}.dMgC{max-width:70%}.dNI{height:56px}.dScG{display:grid;grid-template-columns:repeat(2,1fr)}}
@media(min-width:960px){.dScG{grid-template-columns:repeat(3,1fr)}}
`;
