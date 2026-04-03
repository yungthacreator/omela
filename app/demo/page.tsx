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
const uc:Record<string,{bg:string;text:string;label:string}>={routine:{bg:c.greenSoft,text:c.greenDk,label:"Routine"},soon:{bg:"#FFFBEB",text:"#92400E",label:"Book soon"},urgent:{bg:"#FFF7ED",text:"#C2410C",label:"Needs attention"},emergency:{bg:"#FEF2F2",text:"#991B1B",label:"Emergency"}};
const scenarios:Scenario[]=[
  {id:"rx",label:"Repeat prescription",emoji:"\u{1F48A}",desc:"You need medication but the GP line is always busy",conversation:[
    {from:"user",text:"I need to refill my blood pressure medication but I have been trying to call the GP for two days. The line is always busy."},
    {from:"laura",text:"I can help you skip the phone queue entirely. Which medication do you need refilled?",urgency:"routine"},
    {from:"user",text:"Amlodipine 5mg. I take it every morning. I have about three days left."},
    {from:"laura",text:"Amlodipine 5mg, once daily, three days remaining. Let me find your practice."},
    {from:"laura",text:"I found Parkside Medical Centre, 0.4 miles from you. They accept online repeat prescription requests.",action:"Practice found: Parkside Medical Centre, 0.4 miles"},
    {from:"laura",text:"Here is your draft refill request:\n\n\"I would like to request a repeat prescription for Amlodipine 5mg (once daily, morning). I have approximately three days of supply remaining. Thank you.\"\n\nYou can submit this through their online portal or read it over the phone. Would you like me to set a reminder for your next refill?"},
    {from:"user",text:"Yes please. That would be really helpful."},
    {from:"laura",text:"Done. I will remind you 5 days before your estimated run-out date. You should not have to chase this every month.",action:"Reminder set: refill reminder in 25 days"},
  ]},
  {id:"gp",label:"New city, no doctor",emoji:"\u{1F4CD}",desc:"You just moved and have no idea how to register",conversation:[
    {from:"user",text:"I just moved to Manchester from Lagos. I do not have a GP and I need my asthma inhaler refilled. I do not really know how the system works here."},
    {from:"laura",text:"Welcome to Manchester. In the UK, everyone can register with a GP practice near where they live. This is free through the NHS. No insurance needed.\n\nWhat is your postcode?"},
    {from:"user",text:"I am in M1, near Piccadilly."},
    {from:"laura",text:"I found 3 practices near M1 that are accepting new patients.",action:"3 practices found near M1"},
    {from:"laura",text:"The closest is City Health Centre, 0.3 miles away.\n\nTo register, you will need proof of address (a utility bill or tenancy agreement) and photo ID (passport or driving licence). Your previous medical records are helpful but not required.\n\nOnce registered, you can request your inhaler at your first appointment. If you need an interpreter, the practice provides one for free.\n\nShall I request a registration callback from City Health Centre?"},
    {from:"user",text:"Yes, that would be great. Thank you."},
    {from:"laura",text:"I have submitted a registration callback request. You should hear back within one to two working days. I will check in with you if you have not heard back by then.",action:"Registration callback submitted to City Health Centre"},
  ]},
  {id:"child",label:"Worried about your child",emoji:"\u{1F319}",desc:"It is late, your child has a fever, and you are not sure what to do",conversation:[
    {from:"user",text:"My three year old has had a temperature of 38.5 for two days. She is not eating much and seems really tired. It is 11pm and I do not know if I should take her to A&E or wait until morning."},
    {from:"laura",text:"I can hear how worried you are. Let me help you work through this calmly.\n\nCan you tell me:\n\nIs she responding to you when you talk to her?\nHas she had any fluids in the last few hours?\nDoes she have a rash anywhere?",urgency:"urgent"},
    {from:"user",text:"She is responding but seems sleepy. She had some water about an hour ago. No rash that I can see."},
    {from:"laura",text:"That is reassuring. A child who is responsive and taking fluids is generally a good sign.\n\nBased on what you have told me, this does not sound like an A&E emergency tonight. But it does need attention.\n\nTonight: Keep her comfortable, offer small sips of water regularly, and use children's paracetamol if she seems distressed. Do not use ibuprofen unless your GP has previously approved it for her.\n\nIf anything changes overnight (she becomes difficult to wake, develops a rash that does not fade when you press a glass against it, or has trouble breathing), take her straight to A&E."},
    {from:"laura",text:"I found your nearest out-of-hours service in case you need it.",action:"Manchester Urgent Care Centre, open until midnight, reopens 7am"},
    {from:"laura",text:"Tomorrow morning at 8am, call your GP for a same-day appointment. I can set a reminder if that would help.\n\nYou are doing a great job looking after her."},
  ]},
  {id:"letter",label:"Hospital letter confusion",emoji:"\u{1F4CB}",desc:"You received a referral full of medical jargon",conversation:[
    {from:"user",text:"I received a letter from the hospital about a cardiology referral. It says I need an echocardiogram. I have no idea what that is or what I am supposed to do."},
    {from:"laura",text:"An echocardiogram is an ultrasound scan of your heart. It is completely painless and non-invasive.\n\nA technician places a small device on your chest that uses sound waves to create moving images of your heart. The whole thing usually takes 15 to 30 minutes.\n\nNo needles. You stay awake the entire time. You can drive yourself home afterwards.\n\nDo you have the appointment date and hospital name?"},
    {from:"user",text:"It says Royal Infirmary, 15 April, Outpatient Cardiology."},
    {from:"laura",text:"Here is everything you need to know:\n\nWhat to bring: your referral letter, a list of any medications you take, your NHS number, and photo ID.\n\nWhat to wear: something you can easily remove from the waist up. You will be asked to lie on your left side during the scan.\n\nWhen you arrive: follow signs to Outpatient Cardiology and check in at the reception desk.\n\nAfter the scan: results are usually sent to your referring doctor within one to two weeks. They will contact you to discuss the findings.",action:"Appointment guide prepared for 15 April"},
    {from:"laura",text:"Would you like me to send you a reminder the day before your appointment?"},
  ]},
  {id:"lang",label:"Language barrier",emoji:"\u{1F30D}",desc:"You cannot explain your symptoms in English",conversation:[
    {from:"user",text:"Bonjour, j'ai besoin d'un medecin mais je ne parle pas bien anglais. J'ai tres mal au ventre depuis trois jours."},
    {from:"laura",text:"Bonjour. Je vais vous aider en francais, pas de souci.\n\nAvez-vous de la fievre ou des nausees avec cette douleur au ventre?",urgency:"soon"},
    {from:"user",text:"Pas de fievre mais un peu de nausees. La douleur va et vient."},
    {from:"laura",text:"Merci pour ces details. Je vais chercher un cabinet medical pres de chez vous qui accepte les patients sans rendez-vous."},
    {from:"laura",text:"J'ai trouve: Waterloo Health Centre, a 0.2 miles de vous. Ils acceptent les patients sans rendez-vous le matin entre 8h et 11h.",action:"Waterloo Health Centre, 0.2 miles, sans rendez-vous le matin"},
    {from:"laura",text:"J'ai prepare une note bilingue que vous pouvez montrer a l'accueil:\n\n\"This patient has had intermittent abdominal pain with mild nausea for three days. No fever. They speak French and would benefit from an interpreter or translated communication.\"\n\nVoulez-vous que je vous rappelle demain matin avant l'ouverture?",action:"Note bilingue preparee pour l'accueil"},
  ]},
  {id:"stuck",label:"Stuck in callback hell",emoji:"\u{1F624}",desc:"Three weeks of being told to try again tomorrow",conversation:[
    {from:"user",text:"I have been trying to get a GP appointment for three weeks. Every single morning I call at 8am and they tell me there are no slots. My knee is getting worse and I cannot keep taking time off work to sit on the phone."},
    {from:"laura",text:"Three weeks without being seen is not acceptable, especially with a worsening condition. Let me help you break out of this cycle.\n\nFirst, can you tell me more about your knee? Is it swollen or red? Can you put weight on it? Did it start after an injury?",urgency:"soon"},
    {from:"user",text:"It is a bit swollen. I can walk but stairs are painful. No injury, it just gradually got worse over about a month."},
    {from:"laura",text:"Thank you. Based on what you have described, this is not an emergency, but it does need attention soon and you should not be waiting three weeks.\n\nHere are three routes past the phone queue:\n\n1. Online booking: Many practices release same-day slots at midnight through their online portal. Check yours tonight.\n\n2. Walk-in clinic: City Walk-In Centre, 0.6 miles from you. Open 8am to 8pm, no appointment needed.\n\n3. Structured request: I can submit a callback request to your GP that flags three weeks of failed attempts and worsening symptoms. This is harder for them to dismiss.",action:"3 alternative routes identified"},
    {from:"user",text:"Can you submit the callback request?"},
    {from:"laura",text:"Done. I submitted the following:\n\n\"Patient has attempted to book for three weeks without success. Gradually worsening knee pain with visible swelling for one month. No injury. Difficulty with stairs. Requesting same-day or next-day appointment.\"\n\nIf you do not hear back within 24 hours, I would recommend going to the walk-in centre directly. You should not wait any longer.\n\nI will check in with you tomorrow to see if they responded.",action:"Structured callback request submitted to your GP"},
  ]},
];
export default function DemoPage(){
  const [sc,setSc]=useState<Scenario|null>(null);const [vi,setVi]=useState(0);const [typing,setTyping]=useState(false);
  const [freeInput,setFreeInput]=useState("");const [freeMsgs,setFreeMsgs]=useState<Msg[]>([{from:"laura",text:"Hello. I am Laura. I help people navigate the healthcare system. Tell me what you are dealing with and I will figure out the right next step.\n\nI can find doctors near you, help with prescriptions, explain hospital letters, assess urgency, or work with you in your own language."}]);
  const [mode,setMode]=useState<"pick"|"scenario"|"free">("pick");const btm=useRef<HTMLDivElement>(null);
  useEffect(()=>{btm.current?.scrollIntoView({behavior:"smooth"});},[vi,freeMsgs,typing]);
  function start(s:Scenario){setSc(s);setVi(0);setMode("scenario");adv(s,0);}
  function adv(s:Scenario,idx:number){if(idx>=s.conversation.length)return;const msg=s.conversation[idx];if(msg.from==="user"){setVi(idx+1);setTimeout(()=>{setTyping(true);setTimeout(()=>{setTyping(false);setVi(idx+2);setTimeout(()=>adv(s,idx+2),900);},600+Math.random()*700);},400);}else{setVi(idx+1);setTimeout(()=>adv(s,idx+1),800);}}
  function getResp(input:string):Msg{const l=input.toLowerCase();if(l.match(/chest|breathe|unconscious|stroke|seizure/))return{from:"laura",text:"This sounds like it could need emergency attention. Please call 999 (UK) or 911 (US) now. Do not wait.",urgency:"emergency"};if(l.match(/prescription|refill|medication|medicine|inhaler/))return{from:"laura",text:"I can help with that. I will find your practice and check if they accept online refill requests. What medication do you need, and roughly how many days of supply do you have left?",urgency:"routine"};if(l.match(/move|new|register|no.*gp|no.*doctor/))return{from:"laura",text:"I can find GP practices near you that are accepting new patients and walk you through registration. What is your postcode or area?"};if(l.match(/referral|hospital|letter|scan|echocardiogram|mri/))return{from:"laura",text:"I can explain referral letters and help you prepare for appointments. What does the referral say, or what kind of appointment has been booked?"};if(l.match(/fever|child|baby|kid|son|daughter|worried/))return{from:"laura",text:"I understand the worry. Can you tell me their age, what temperature they have, and how long it has been going on? Are they responsive and drinking fluids?",urgency:"urgent"};if(l.match(/anxious|depressed|mental|stressed|panic|sad|low/))return{from:"laura",text:"Thank you for sharing that. What you are feeling matters. Many GP practices now offer same-day mental health consultations. I can help you find one near you and prepare what to say when you call. Would that help?",urgency:"soon"};if(l.match(/callback|no.*slots|waiting|weeks|busy|cannot.*get/))return{from:"laura",text:"Being stuck in that cycle is exhausting. I can find alternative routes for you: walk-in clinics, online booking portals, or I can submit a structured request to your GP that is harder to dismiss. What have you been trying to get seen for?",urgency:"soon"};if(l.match(/hello|hi|hey|morning|afternoon/))return{from:"laura",text:"Hello. I am here to help. I can find doctors near you, help with prescriptions, explain hospital letters, assess urgency, or help you communicate in your own language. What do you need?"};return{from:"laura",text:"Could you tell me more about what you are experiencing? I can help with finding a doctor, prescription refills, understanding referral letters, assessing whether something needs urgent attention, or navigating the healthcare system in general."};}
  function sendFree(t:string){if(!t.trim())return;setFreeMsgs(p=>[...p,{from:"user",text:t.trim()}]);setFreeInput("");setTyping(true);setTimeout(()=>{setTyping(false);setFreeMsgs(p=>[...p,getResp(t)]);},600+Math.random()*700);}
  function reset(){setSc(null);setVi(0);setMode("pick");setFreeMsgs([{from:"laura",text:"Hello. I am Laura. Tell me what you need help with and I will figure out the right next step."}]);setFreeInput("");setTyping(false);}
  const msgs=mode==="scenario"&&sc?sc.conversation.slice(0,vi):freeMsgs;
  return(<><style>{FONT}</style><style>{CSS}</style><div className="dW">
    <nav className="dN"><div className="cnt dNI">
      <Link href="/" className="dBr"><div className="dLo"><Image src="/omela-logo-mark.png" alt="Omela" width={26} height={26} style={{width:"100%",height:"100%",objectFit:"contain"}}/></div><div><div className="dBrN">Omela</div><div className="dBrS">Try Laura</div></div></Link>
      <div className="dNR"><button onClick={reset} className="dRst" type="button"><RotateCcw size={11}/>Reset</button><Link href="/#waitlist" className="bP dNC">Join waitlist<ArrowRight size={11}/></Link></div>
    </div></nav>
    <div className="dBn">Preview experience. The full product is launching soon.</div>
    <div className="dM"><div className="dIn">
      {mode==="pick"&&(<motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="dSc">
        <h2 className="serif dScT">Real problems. Real navigation.</h2>
        <p className="dScB">Choose a scenario to see how Laura handles everyday healthcare frustrations. These are previews of what the full product will do.</p>
        <div className="dScG">{scenarios.map(s=>(<button key={s.id} className="dScC" onClick={()=>start(s)} type="button"><span className="dScE">{s.emoji}</span><div className="dScCT"><span className="dScL">{s.label}</span><span className="dScD">{s.desc}</span></div><ArrowRight size={14} color={c.accent}/></button>))}</div>
        <button className="dFr" onClick={()=>setMode("free")} type="button">Or ask Laura anything <ArrowRight size={14}/></button>
      </motion.div>)}
      {(mode==="scenario"||mode==="free")&&(<div className="dCh">
        {mode==="scenario"&&sc&&<div className="dChL"><span>{sc.emoji}</span>{sc.label}</div>}
        <div className="dMs">
          <AnimatePresence initial={false}>{msgs.map((msg,i)=>(
            <motion.div key={i} initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} className={`dMg ${msg.from==="user"?"dMgR":"dMgL"}`}>
              {msg.from==="laura"&&<div className="dMgAv"><Image src="/laura-avatar.png" alt="Laura" fill sizes="28px" style={{objectFit:"cover"}}/></div>}
              <div className={`dMgC ${msg.from==="user"?"dMgU":"dMgLa"}`}>
                <p className="dMgT" style={{whiteSpace:"pre-line"}}>{msg.text}</p>
                {msg.urgency&&uc[msg.urgency]&&<div className="dUr" style={{background:uc[msg.urgency].bg,color:uc[msg.urgency].text}}><span className="dUrD" style={{background:uc[msg.urgency].text}}/>{uc[msg.urgency].label}</div>}
                {msg.action&&<div className="dAc">{msg.action}</div>}
              </div>
            </motion.div>
          ))}</AnimatePresence>
          {typing&&<div className="dMg dMgL"><div className="dMgAv"><Image src="/laura-avatar.png" alt="Laura" fill sizes="28px" style={{objectFit:"cover"}}/></div><div className="dMgLa dTy"><span/><span/><span/></div></div>}
          <div ref={btm}/>
        </div>
        {mode==="scenario"&&sc&&vi>=sc.conversation.length&&!typing&&(<motion.div initial={{opacity:0}} animate={{opacity:1}} className="dEn"><div className="dEnB"><button className="bP" onClick={reset} type="button">Try another scenario</button><button className="bS" onClick={()=>{setSc(null);setMode("free");}} type="button">Ask Laura anything</button></div></motion.div>)}
        {mode==="free"&&<div className="dIp"><input type="text" placeholder="Describe what you need help with..." value={freeInput} onChange={e=>setFreeInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!typing)sendFree(freeInput);}} disabled={typing} className="dIpF"/><button onClick={()=>sendFree(freeInput)} disabled={typing||!freeInput.trim()} className="dSd" type="button"><Send size={15}/></button></div>}
      </div>)}
    </div></div>
  </div></>);
}
const CSS=`
*{box-sizing:border-box;margin:0;padding:0}html,body{height:100%;max-width:100%;overflow:hidden}body{background:${c.bg};color:${c.text};font-family:'DM Sans',-apple-system,sans-serif;-webkit-font-smoothing:antialiased;font-size:16px}a{color:inherit;text-decoration:none}button,input{font-family:inherit}.serif{font-family:'Instrument Serif',Georgia,serif}.cnt{max-width:720px;margin:0 auto;padding:0 16px}
.bP{display:inline-flex;align-items:center;gap:5px;background:${c.dark};color:#fff;border:none;border-radius:999px;padding:9px 16px;font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap}
.bS{display:inline-flex;align-items:center;gap:5px;background:rgba(255,255,255,0.85);color:${c.text};border:1px solid ${c.border};border-radius:999px;padding:9px 16px;font-size:12px;font-weight:700;cursor:pointer}
.dW{display:flex;flex-direction:column;height:100vh;height:100dvh}.dN{background:rgba(248,246,241,0.94);backdrop-filter:blur(16px);border-bottom:1px solid ${c.border};flex-shrink:0}.dNI{display:flex;align-items:center;justify-content:space-between;height:48px;gap:6px}
.dBr{display:flex;align-items:center;gap:5px;flex-shrink:0}.dLo{width:22px;height:22px;border-radius:6px;overflow:hidden}.dBrN{font-size:12px;font-weight:800}.dBrS{font-size:9px;color:${c.accent};font-weight:700}
.dNR{display:flex;gap:4px;align-items:center}.dRst{display:flex;align-items:center;gap:3px;background:none;border:1px solid ${c.border};border-radius:999px;padding:5px 10px;font-size:10px;font-weight:600;color:${c.muted};cursor:pointer}.dNC{padding:6px 12px!important;font-size:10px!important}
.dBn{background:rgba(37,99,235,0.04);padding:5px 10px;font-size:10px;color:${c.muted};text-align:center;font-weight:600;flex-shrink:0;border-bottom:1px solid rgba(37,99,235,0.06)}
.dM{flex:1;display:flex;flex-direction:column;overflow:hidden}.dIn{max-width:720px;width:100%;margin:0 auto;display:flex;flex-direction:column;height:100%;padding:0 12px}
.dSc{padding:14px 0;overflow-y:auto;flex:1}.dScT{font-size:clamp(22px,5vw,32px);letter-spacing:-0.04em;line-height:1.1}.dScB{font-size:13px;color:${c.sub};line-height:1.6;margin-top:6px}.dScG{display:flex;flex-direction:column;gap:7px;margin-top:16px}
.dScC{display:flex;align-items:center;gap:10px;width:100%;padding:12px 14px;background:${c.card};border:1px solid ${c.border};border-radius:14px;cursor:pointer;text-align:left;font-family:inherit;transition:all 0.2s}.dScC:hover{border-color:#ccc;box-shadow:0 4px 14px rgba(0,0,0,0.04)}
.dScE{font-size:22px;flex-shrink:0}.dScCT{flex:1;min-width:0}.dScL{font-size:14px;font-weight:700;display:block}.dScD{font-size:11px;color:${c.muted};margin-top:1px;display:block}
.dFr{display:flex;align-items:center;gap:5px;margin-top:14px;background:none;border:none;color:${c.accent};font-size:13px;font-weight:700;cursor:pointer;padding:0}
.dCh{flex:1;display:flex;flex-direction:column;overflow:hidden;padding-top:4px}.dChL{display:flex;align-items:center;gap:5px;padding:6px 10px;background:${c.accentSoft};border-radius:10px;font-size:11px;font-weight:700;color:${c.accent};margin-bottom:4px;flex-shrink:0}
.dMs{flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:10px;padding:6px 0}
.dMg{display:flex;gap:7px;align-items:flex-start}.dMgR{flex-direction:row-reverse}.dMgL{flex-direction:row}
.dMgAv{position:relative;width:26px;height:26px;border-radius:999px;overflow:hidden;flex-shrink:0;border:1.5px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.06)}
.dMgC{max-width:82%;padding:10px 12px;border-radius:14px}.dMgU{background:${c.dark};color:#fff;border-radius:14px 14px 4px 14px}.dMgLa{background:${c.card};border:1px solid ${c.border};border-radius:14px 14px 14px 4px}
.dMgT{font-size:13px;line-height:1.68}
.dUr{display:inline-flex;align-items:center;gap:4px;margin-top:7px;padding:3px 9px;border-radius:999px;font-size:10px;font-weight:700}.dUrD{width:4px;height:4px;border-radius:999px;flex-shrink:0}
.dAc{margin-top:7px;padding:7px 10px;border-radius:8px;background:${c.accentSoft};color:${c.accent};font-size:10px;font-weight:700;border:1px solid rgba(37,99,235,0.08)}
.dTy{display:flex;gap:3px;padding:10px 14px}.dTy span{width:5px;height:5px;border-radius:999px;background:${c.muted};animation:tD 1.2s infinite}.dTy span:nth-child(2){animation-delay:0.2s}.dTy span:nth-child(3){animation-delay:0.4s}
@keyframes tD{0%,80%{opacity:0.3;transform:scale(0.8)}40%{opacity:1;transform:scale(1)}}
.dEn{padding:8px 0;flex-shrink:0;border-top:1px solid ${c.border}}.dEnB{display:flex;gap:5px;flex-wrap:wrap}
.dIp{display:flex;gap:5px;padding:6px 0 max(6px,env(safe-area-inset-bottom));flex-shrink:0;border-top:1px solid ${c.border}}.dIpF{flex:1;height:42px;border-radius:12px;border:1px solid ${c.border};background:#fff;padding:0 12px;font-size:13px;color:${c.text};outline:none;min-width:0}.dIpF:focus{border-color:${c.accent}}.dIpF:disabled{opacity:0.5}
.dSd{width:42px;height:42px;border-radius:12px;background:${c.accent};color:#fff;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0}.dSd:disabled{opacity:0.3}
@media(min-width:640px){.cnt{padding:0 20px}.dIn{padding:0 16px}.dMgC{max-width:72%}.dNI{height:54px}.dScG{display:grid;grid-template-columns:repeat(2,1fr)}}
@media(min-width:960px){.dScG{grid-template-columns:repeat(3,1fr)}}
`;
