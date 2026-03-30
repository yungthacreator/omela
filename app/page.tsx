"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useCallback, type ReactNode } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Mic, Globe, ArrowRight, Phone, FileText, Clock, MapPin, Pill as PillIcon, ChevronLeft, ChevronRight } from "lucide-react";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');`;
const c = {bg:"#F8F6F1",card:"#FFFFFF",dark:"#08090C",darkCard:"#111318",text:"#111214",sub:"#4A4F5C",muted:"#888E9C",accent:"#2563EB",accentSoft:"#ECF2FF",border:"#E3DDD2",borderDk:"#222633",green:"#22C55E",greenSoft:"#ECFDF3",greenDk:"#15803D",warm:"#D4A574"};
type Role = "patient"|"provider"|"developer";

function FI({children,delay=0,className=""}:{children:ReactNode;delay?:number;className?:string}) {
  const ref=useRef<HTMLDivElement>(null);const v=useInView(ref,{once:true,amount:0.06});
  return <motion.div ref={ref} initial={{opacity:0,y:24,filter:"blur(3px)"}} animate={v?{opacity:1,y:0,filter:"blur(0px)"}:{}} transition={{duration:0.7,delay,ease:[0.22,1,0.36,1]}} className={className}>{children}</motion.div>;
}
function Tag({children}:{children:ReactNode}){return <div className="tag">{children}</div>;}
function CS(){return <span className="cs"><span className="csS"/>Soon</span>;}
function Chk({dark=false}:{dark?:boolean}){return <span className={`chk${dark?" chkD":""}`}>&#10003;</span>;}

/* ── Typewriter ── */
function Typewriter() {
  const lines = useMemo(()=>["You sit on hold for 45 minutes.","You chase prescriptions for days.","You get a hospital letter you do not understand.","You move to a new city with no doctor."],[]);
  const [li,setLi]=useState(0);const [ci,setCi]=useState(0);const [del,setDel]=useState(false);const [pause,setPause]=useState(false);
  useEffect(()=>{
    if(pause){const t=setTimeout(()=>{setPause(false);setDel(true);},1400);return ()=>clearTimeout(t);}
    const cur=lines[li];
    if(!del){if(ci<cur.length){const t=setTimeout(()=>setCi(p=>p+1),28);return ()=>clearTimeout(t);}else setPause(true);}
    else{if(ci>0){const t=setTimeout(()=>setCi(p=>p-1),14);return ()=>clearTimeout(t);}else{setDel(false);setLi(p=>(p+1)%lines.length);}}
  },[li,ci,del,pause,lines]);
  return <span className="tw">{lines[li].slice(0,ci)}<span className="twC">|</span></span>;
}

/* ── Status Bar ── */
function StatusBar() {
  const items=["Laura Chat","Urgency Engine","Provider Search","Translation","Laura Chat","Urgency Engine","Provider Search","Translation"];
  return (<div className="stBar"><div className="container stIn"><div className="stL"><motion.span animate={{scale:[1,1.3,1]}} transition={{duration:2,repeat:Infinity}} className="stDot"/><span className="stLbl">All systems operational</span><Link href="/status" className="stLnk">View status</Link></div><div className="stTk"><motion.div className="stTkTr" animate={{x:["0%","-50%"]}} transition={{duration:22,ease:"linear",repeat:Infinity}}>{items.map((s,i)=><span key={`${s}-${i}`} className="stSvc"><span className="stSvcD"/>{s}</span>)}</motion.div></div></div></div>);
}

/* ── Phone Mockup with read receipts ── */
const langConvos=[
  {lang:"English",flag:"\u{1F1EC}\u{1F1E7}",msgs:[{f:"u",t:"I need to refill my blood pressure medication but the GP line is always busy."},{f:"l",t:"I can help. Let me find your practice and draft a refill request so you skip the queue."}]},
  {lang:"Fran\u00e7ais",flag:"\u{1F1EB}\u{1F1F7}",msgs:[{f:"u",t:"J'ai mal \u00e0 la gorge et de la fi\u00e8vre depuis hier."},{f:"l",t:"Je comprends. Je vais chercher un m\u00e9decin pr\u00e8s de chez vous."}]},
  {lang:"Espa\u00f1ol",flag:"\u{1F1EA}\u{1F1F8}",msgs:[{f:"u",t:"Llevo 3 semanas intentando conseguir cita."},{f:"l",t:"Puedo buscar cl\u00ednicas sin cita previa cerca de ti."}]},
  {lang:"Portugu\u00eas",flag:"\u{1F1E7}\u{1F1F7}",msgs:[{f:"u",t:"Recebi uma carta de encaminhamento mas n\u00e3o entendo."},{f:"l",t:"Posso explicar tudo sobre a consulta."}]},
  {lang:"\u0627\u0644\u0639\u0631\u0628\u064a\u0629",flag:"\u{1F1F8}\u{1F1E6}",msgs:[{f:"u",t:"\u0639\u0646\u062f\u064a \u0635\u062f\u0627\u0639 \u0634\u062f\u064a\u062f"},{f:"l",t:"\u0633\u0623\u0633\u0627\u0639\u062f\u0643 \u0639\u0644\u0649 \u062a\u062d\u062f\u064a\u062f \u0627\u0644\u062d\u0627\u062c\u0629."}]},
  {lang:"Hindi",flag:"\u{1F1EE}\u{1F1F3}",msgs:[{f:"u",t:"\u092e\u0941\u091d\u0947 \u092c\u0941\u0916\u093e\u0930 \u0914\u0930 \u0938\u093f\u0930 \u0926\u0930\u094d\u0926 \u0939\u0948\u0964"},{f:"l",t:"\u092e\u0948\u0902 \u0928\u091c\u0926\u0940\u0915\u0940 \u0921\u0949\u0915\u094d\u091f\u0930 \u0922\u0942\u0902\u0922 \u0930\u0939\u0940 \u0939\u0942\u0901\u0964"}]},
  {lang:"Yor\u00f9b\u00e1",flag:"\u{1F1F3}\u{1F1EC}",msgs:[{f:"u",t:"Mo ni iba ati efori."},{f:"l",t:"Mo le ran o lowo. Je ki n wa dokita."}]},
  {lang:"Polski",flag:"\u{1F1F5}\u{1F1F1}",msgs:[{f:"u",t:"Mam silny b\u00f3l brzucha."},{f:"l",t:"Pomog\u0119 znale\u017a\u0107 lekarza."}]},
  {lang:"Deutsch",flag:"\u{1F1E9}\u{1F1EA}",msgs:[{f:"u",t:"Ich habe seit drei Tagen Halsschmerzen."},{f:"l",t:"Soll ich einen Arzt suchen?"}]},
  {lang:"\u4e2d\u6587",flag:"\u{1F1E8}\u{1F1F3}",msgs:[{f:"u",t:"\u6211\u80a9\u8180\u75bc\u4e86\u4e00\u5468\u3002"},{f:"l",t:"\u8ba9\u6211\u67e5\u627e\u9644\u8fd1\u7684\u8bca\u6240\u3002"}]},
];

function PhoneMockup() {
  const [li,setLi]=useState(0);const [phase,setPhase]=useState<"u"|"l"|"done">("u");const [cU,setCU]=useState(0);const [cL,setCL]=useState(0);
  const cv=langConvos[li];const uMsg=cv.msgs[0].t,lMsg=cv.msgs[1].t;
  useEffect(()=>{
    if(phase==="u"){if(cU<uMsg.length){const t=setTimeout(()=>setCU(p=>p+1),16);return ()=>clearTimeout(t);}else{const t=setTimeout(()=>setPhase("l"),400);return ()=>clearTimeout(t);}}
    if(phase==="l"){if(cL<lMsg.length){const t=setTimeout(()=>setCL(p=>p+1),11);return ()=>clearTimeout(t);}else setPhase("done");}
    if(phase==="done"){const t=setTimeout(()=>{setLi(p=>(p+1)%langConvos.length);setPhase("u");setCU(0);setCL(0);},1800);return ()=>clearTimeout(t);}
  },[phase,cU,cL,uMsg,lMsg]);
  const uDone=cU>=uMsg.length;const lDone=cL>=lMsg.length;
  return (
    <div className="phW"><motion.div className="phGlow" animate={{opacity:[0.3,0.5,0.3],scale:[1,1.05,1]}} transition={{duration:4,repeat:Infinity,ease:"easeInOut"}}/>
      <motion.div className="phF" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.9,ease:[0.22,1,0.36,1]}}>
        <div className="phB"><div className="phDI"><div className="phDIC"/></div>
          <div className="phS">
            <div className="phH"><div className="phHL"><div className="phAv"><Image src="/laura-avatar.png" alt="Laura" fill sizes="28px" style={{objectFit:"cover"}}/></div><div><div className="phN">Laura <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 1L14.9 3.6L18.6 3.2L19.4 6.8L22.5 8.7L21.2 12.2L22.5 15.7L19.4 17.6L18.6 21.2L14.9 20.8L12 23.4L9.1 20.8L5.4 21.2L4.6 17.6L1.5 15.7L2.8 12.2L1.5 8.7L4.6 6.8L5.4 3.2L9.1 3.6L12 1Z" fill="#22C55E"/><path d="M8.5 12.5L10.5 14.5L15.5 9.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div><div className="phOn"><span className="phOnD"/>online</div></div></div></div>
            <AnimatePresence mode="wait"><motion.div key={li} initial={{opacity:0,y:4}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-4}} transition={{duration:0.2}} className="phLang">{cv.flag} {cv.lang}</motion.div></AnimatePresence>
            <div className="phBdy">
              {cU>0&&<motion.div initial={{opacity:0,y:5}} animate={{opacity:1,y:0}} className="phR phRR"><div className="phBb phBbU">{uMsg.slice(0,cU)}<span className="phMt"><span>9:30</span>{uDone&&<svg width="14" height="10" viewBox="0 0 20 14" fill="none"><path d="M1.5 7.6L4.7 10.8L10.2 5.2" stroke={phase!=="u"?"#53BDEB":"#8B919F"} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/><path d="M7.3 7.6L10.5 10.8L18.2 3.2" stroke={phase!=="u"?"#53BDEB":"#8B919F"} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>}</span></div></motion.div>}
              {cL>0&&<motion.div initial={{opacity:0,y:5}} animate={{opacity:1,y:0}} className="phR phRL"><div className="phBb phBbL">{lMsg.slice(0,cL)}<span className="phMt">9:31</span></div></motion.div>}
            </div>
            <div className="phCo"><div className="phCoF"><span style={{fontSize:"13px",opacity:0.4}}>&#128522;</span><span className="phCoT">Message</span></div><div className="phCoM"><Mic size={13} color="#fff" strokeWidth={2.2}/></div></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Globe ── */
const globeStories=[
  {country:"United Kingdom",flag:"\u{1F1EC}\u{1F1E7}",quote:"I called my GP at 8:01am. Busy. 8:02. Busy. By 8:15 all the slots were gone. I have been doing this every morning for three weeks.",laura:"Laura queues your request overnight so you wake up with a confirmed callback.",cx:48,cy:28},
  {country:"United States",flag:"\u{1F1FA}\u{1F1F8}",quote:"I delayed seeing a doctor for six months because I was terrified of what it might cost.",laura:"Laura helps people understand options earlier, before delay makes everything harder.",cx:28,cy:35},
  {country:"Nigeria",flag:"\u{1F1F3}\u{1F1EC}",quote:"There are four doctors for every ten thousand people here. I spent two days trying to find someone.",laura:"Laura routes people to available care faster, even where providers are scarce.",cx:50,cy:52},
  {country:"India",flag:"\u{1F1EE}\u{1F1F3}",quote:"My mother lives two hours from the nearest clinic. She does not know when to worry and when to wait.",laura:"Laura helps people assess urgency from anywhere, in their own language.",cx:68,cy:42},
  {country:"Brazil",flag:"\u{1F1E7}\u{1F1F7}",quote:"I moved to London and could not explain my symptoms in English. We could not understand each other.",laura:"Laura speaks 40+ languages and prepares bilingual notes for the receptionist.",cx:32,cy:58},
];

function GlobeSection() {
  const [active,setActive]=useState(0);
  const timerRef=useRef<ReturnType<typeof setTimeout>|null>(null);
  const resetTimer=useCallback(()=>{if(timerRef.current)clearTimeout(timerRef.current);timerRef.current=setTimeout(()=>setActive(p=>(p+1)%globeStories.length),6000);},[]);
  useEffect(()=>{resetTimer();return ()=>{if(timerRef.current)clearTimeout(timerRef.current);};},[active,resetTimer]);
  function go(d:number){setActive(p=>(p+d+globeStories.length)%globeStories.length);}
  const story=globeStories[active];
  return (
    <section className="globeSec"><div className="container">
      <FI><div className="shW"><Tag>Care access, around the world</Tag><h2 className="serif shT" style={{marginTop:"18px"}}>How people struggle to reach care.</h2></div></FI>
      <div className="globeW">
        <div className="globeV">
          <svg viewBox="0 0 100 100" className="globeSvg">
            <circle cx="50" cy="50" r="48" fill="none" stroke="#D4CBB8" strokeWidth="0.3" opacity="0.5"/>
            <circle cx="50" cy="50" r="48" fill="url(#gG)"/>
            {[20,35,50,65,80].map(y=><ellipse key={y} cx="50" cy="50" rx={Math.sqrt(Math.max(0,2304-(y-50)*(y-50)))} ry="3" fill="none" stroke="#D4CBB8" strokeWidth="0.15" opacity="0.3" transform={`translate(0,${y-50})`}/>)}
            {[-30,-15,0,15,30].map(x=><ellipse key={x} cx="50" cy="50" rx="3" ry="48" fill="none" stroke="#D4CBB8" strokeWidth="0.15" opacity="0.25" transform={`rotate(${x},50,50)`}/>)}
            {/* Connection lines */}
            {globeStories.map((s,i)=>{const next=globeStories[(i+1)%globeStories.length];return <motion.line key={`l${i}`} x1={s.cx} y1={s.cy} x2={next.cx} y2={next.cy} stroke={c.warm} strokeWidth="0.3" opacity={i===active?0.4:0.08} strokeDasharray="2 2" animate={i===active?{strokeDashoffset:[0,-4]}:{}} transition={{duration:1.5,repeat:Infinity,ease:"linear"}}/>;})}
            {/* Dots */}
            {globeStories.map((s,i)=>(<g key={s.country}>
              {i===active&&<motion.circle cx={s.cx} cy={s.cy} r="5" fill={c.warm} opacity="0.12" animate={{r:[5,9,5],opacity:[0.12,0.22,0.12]}} transition={{duration:2,repeat:Infinity}}/>}
              <circle cx={s.cx} cy={s.cy} r={i===active?2.5:1.2} fill={i===active?c.warm:"#B8B0A0"} opacity={i===active?1:0.4} style={{transition:"all 0.5s",cursor:"pointer"}} onClick={()=>setActive(i)}/>
            </g>))}
            <defs><radialGradient id="gG" cx="40%" cy="35%"><stop offset="0%" stopColor="#F8F6F1" stopOpacity="0.02"/><stop offset="100%" stopColor="#E8E2D6" stopOpacity="0.06"/></radialGradient></defs>
          </svg>
        </div>
        <div className="globeC">
          <AnimatePresence mode="wait"><motion.div key={active} initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:0.4,ease:[0.22,1,0.36,1]}} className="globeStory">
            <div className="globeCtry"><span className="globeFlg">{story.flag}</span><span className="globeCtryN">{story.country}</span></div>
            <p className="serif globeQ">&ldquo;{story.quote}&rdquo;</p>
            <div className="globeL"><div className="globeLA"><Image src="/laura-avatar.png" alt="Laura" fill sizes="24px" style={{objectFit:"cover"}}/></div><p className="globeLT">{story.laura}</p></div>
          </motion.div></AnimatePresence>
          <div className="globeNav"><div className="globeDs">{globeStories.map((_,i)=><button key={i} className={`globeD${i===active?" globeDA":""}`} onClick={()=>setActive(i)}/>)}</div><div className="globeAs"><button className="globeA" onClick={()=>go(-1)}><ChevronLeft size={18}/></button><button className="globeA" onClick={()=>go(1)}><ChevronRight size={18}/></button></div></div>
        </div>
      </div>
    </div></section>
  );
}

/* ── Logos ── */
function LogoMarquee(){
  const logos=[{n:"AWS",s:"/logos/aws-logo.png"},{n:"Microsoft",s:"/logos/microsoft-logo.png"},{n:"Google",s:"/logos/google-logo.png"},{n:"Salesforce",s:"/logos/salesforce-logo.png"},{n:"Twilio",s:"/logos/twilio-logo.png"},{n:"Epic",s:"/logos/epic-logo.png"},{n:"Veradigm",s:"/logos/veradigm-logo.png"},{n:"GitHub",s:"/logos/github-logo.png",b:true}];
  const d=useMemo(()=>[...logos,...logos],[]);
  return (<div className="mqS"><p className="mqL">Built for the systems behind modern care</p><div className="mqV"><motion.div className="mqT" animate={{x:["0%","-50%"]}} transition={{duration:30,ease:"linear",repeat:Infinity}}>{d.map((l,i)=><div key={`${l.n}-${i}`} className="mqC"><Image src={l.s} alt={l.n} width={120} height={36} className={`mqI${l.b?" mqBl":""}`}/></div>)}</motion.div></div></div>);
}

/* ── Terminal (fixed height) ── */
function SDKTerminal(){
  const lines=useMemo(()=>['$ npm install @omela/laura-sdk','','  import { Laura } from "@omela/laura-sdk";','','  const laura = new Laura({','    apiKey: process.env.OMELA_KEY,','    region: "eu-west-2"','  });','','  const res = await laura.chat({','    userId: "patient_4102",','    lang: "fr",','    message: "J\'ai besoin de renouveler."','  });','','  > Laura responds in French...','  Done in 1.1s'],[]);
  const [vl,setVl]=useState(0);const [ci,setCi]=useState(0);
  useEffect(()=>{
    if(vl>=lines.length){const t=setTimeout(()=>{setVl(0);setCi(0);},3000);return ()=>clearTimeout(t);}
    const line=lines[vl];
    if(ci<line.length){const t=setTimeout(()=>setCi(p=>p+1),line.startsWith("  >")?36:18);return ()=>clearTimeout(t);}
    else{const t=setTimeout(()=>{setVl(p=>p+1);setCi(0);},line===""?60:160);return ()=>clearTimeout(t);}
  },[vl,ci,lines]);
  return (<div className="trm"><div className="trmT"><div className="trmD"><span/><span/><span/></div><span className="trmTi">Laura SDK</span><CS/></div><div className="trmB">{lines.slice(0,vl+1).map((line,i)=>{const a=i===vl;return(<div key={i} className="trmL" style={{color:line.startsWith("  Done")?"#4ADE80":line.startsWith("  >")?"\#FBBF24":line.startsWith("$")?"#E2E8F0":"#94A3B8"}}>{a?line.slice(0,ci):line}{a&&<span className="trmC">|</span>}</div>);})}</div></div>);
}

/* ── Success Modal ── */
function SuccessModal({open,role,onClose}:{open:boolean;role:Role;onClose:()=>void}){
  const copy={patient:"You are in early.",provider:"Your place is reserved.",developer:"You are on the list."}[role];
  return <AnimatePresence>{open&&(<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose} className="modO"><motion.div initial={{opacity:0,y:16,scale:0.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:12}} onClick={e=>e.stopPropagation()} className="modB"><div className="modI"><svg width="24" height="24" viewBox="0 0 32 32" fill="none"><path d="M7 16.5L12.8 22L25 9.5" stroke={c.green} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></div><h3 className="serif modTi">{copy}</h3><p className="modBd">Laura will reach out as access opens. Follow @joinomela on X.</p><div style={{marginTop:"16px",display:"flex",gap:"10px",flexWrap:"wrap"}}><a href="https://x.com/joinomela" target="_blank" rel="noreferrer" className="btnP">Follow on X</a><button type="button" className="btnS" onClick={onClose}>Continue</button></div></motion.div></motion.div>)}</AnimatePresence>;
}

/* ══════════ MAIN ══════════ */
export default function Page(){
  const [role,setRole]=useState<Role>("patient");const [email,setEmail]=useState("");const [website,setWebsite]=useState("");const [agreed,setAgreed]=useState(false);const [submitting,setSubmitting]=useState(false);const [success,setSuccess]=useState("");const [error,setError]=useState("");const [modalOpen,setModalOpen]=useState(false);
  async function handleSubmit(e:React.FormEvent<HTMLFormElement>){e.preventDefault();if(!agreed)return;setSubmitting(true);setSuccess("");setError("");try{const res=await fetch("/api/waitlist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,role,website,source:"landing-page",marketingOptIn:false})});const data=await res.json();if(!res.ok){setError(data.error||"Something went wrong.");return;}setSuccess(data.message||"You are in.");setEmail("");setRole("patient");setWebsite("");setAgreed(false);setModalOpen(true);}catch{setError("Something went wrong.");}finally{setSubmitting(false);}}

  const probCards=[
    {emoji:"\u{1F48A}",title:"Chasing repeat prescriptions",body:"Every month: call, hold, repeat. Laura drafts the refill, tracks status, reminds you before you run out.",cta:"Watch Laura draft a refill"},
    {emoji:"\u{1F4CD}",title:"New city, no doctor",body:"You just arrived. Laura finds practices near you, walks you through registration, tells you what to bring.",cta:"Watch Laura guide registration"},
    {emoji:"\u{1F319}",title:"11pm and worried about your child",body:"Is it serious? Laura helps you assess calmly and finds the nearest out-of-hours service.",cta:"Watch Laura assess calmly"},
    {emoji:"\u{1F4CB}",title:"A hospital letter you do not understand",body:"What is an echocardiogram? Laura explains everything in plain language.",cta:"Watch Laura explain clearly"},
    {emoji:"\u{1F30D}",title:"Explaining pain in another language",body:"Laura speaks your language and prepares a bilingual note for the receptionist.",cta:"Watch Laura speak French"},
    {emoji:"\u{1F624}",title:"Three weeks of try again tomorrow",body:"Laura finds alternative routes: walk-in clinics, online portals, or a structured request they cannot ignore.",cta:"Watch Laura find alternatives"},
  ];

  const capItems=[
    {icon:<Phone size={22}/>,title:"Skip the phone queue",body:"Talk to Laura anytime. No busy signals, no 8am rush. 24/7 in 40+ languages."},
    {icon:<PillIcon size={22}/>,title:"Stop chasing prescriptions",body:"Laura drafts refill requests, tracks status, and reminds you before you run out."},
    {icon:<MapPin size={22}/>,title:"Find care wherever you are",body:"New city, new country. Laura finds practices near you and guides registration."},
    {icon:<FileText size={22}/>,title:"Understand hospital letters",body:"Laura explains appointments, what to bring, and what to expect. In plain language."},
    {icon:<Globe size={22}/>,title:"Speak your own language",body:"Laura responds in your language and prepares bilingual notes for the receptionist."},
    {icon:<Clock size={22}/>,title:"Know if it can wait",body:"Laura helps you assess urgency so you make the right call without panic."},
  ];

  return (
    <>
      <style>{FONT}</style><style>{CSS}</style>
      <SuccessModal open={modalOpen} role={role} onClose={()=>setModalOpen(false)}/>
      <div className="wrap">
        <StatusBar/>
        <motion.nav initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} transition={{duration:0.5}} className="nav"><div className="container navR">
          <Link href="/" className="navBr"><div className="navLo"><Image src="/omela-logo-mark.png" alt="Omela" width={36} height={36} style={{width:"100%",height:"100%",objectFit:"contain"}}/></div><div><div className="navNm">Omela</div><div className="navSb">POWERED BY LAURA</div></div></Link>
          <div className="navLks">{["People","Providers","Developers","Pricing"].map(i=><a key={i} href={`#${i.toLowerCase()}`} className="navLk">{i}</a>)}</div>
          <a href="#waitlist" className="btnP navCt"><span className="navCtL">Get early access</span><span className="navCtS">Early access</span><ArrowRight size={13}/></a>
        </div></motion.nav>

        {/* HERO */}
        <section className="heroSec"><div className="heroAmb"/><div className="container">
          <div className="heroTxt">
            <FI><Tag><span className="tagStar">&#10038;</span>Now onboarding early access users</Tag></FI>
            <FI delay={0.06}><h1 className="serif heroTi">Getting care<br/><span className="heroAc">should not be this hard.</span></h1></FI>
            <FI delay={0.12}><div className="heroBd"><Typewriter/></div></FI>
            <FI delay={0.16}><p className="heroSub">Laura removes the exhausting parts of reaching care. She finds doctors, explains referrals, drafts prescription requests, and works in 40+ languages. Available 24/7, with no queue.</p></FI>
            <FI delay={0.2}><div className="heroBt"><Link href="/demo" className="btnP heroBtn">See how Laura helps <ArrowRight size={15}/></Link><a href="#waitlist" className="btnS">Get early access</a></div></FI>
          </div>
          <div className="heroPh"><PhoneMockup/></div>
        </div></section>

        {/* REAL PROBLEMS */}
        <section className="sec"><div className="container">
          <FI><div className="shW"><Tag>Real problems Laura solves</Tag><h2 className="serif shT" style={{marginTop:"18px"}}>People do not just suffer because they are sick.<br/>They suffer because reaching care is exhausting.</h2></div></FI>
          <div className="probGrid">{probCards.map((item,i)=>(<FI key={item.title} delay={i*0.05}><Link href="/demo" className="probCard"><span className="probE">{item.emoji}</span><h3 className="probTi">{item.title}</h3><p className="probBd">{item.body}</p><span className="probCta">{item.cta} <ArrowRight size={13}/></span></Link></FI>))}</div>
        </div></section>

        <GlobeSection/>

        {/* BIG STATEMENT */}
        <section className="sec" style={{paddingTop:0}}><div className="container"><FI><div className="bigSt"><h2 className="serif bigT">Care should feel private, calm, and clear. Not public, chaotic, and exhausting.</h2><p className="bigB">Laura does not replace doctors. She replaces the phone queue, the language barrier, the referral confusion, and the prescription chase.</p></div></FI></div></section>

        {/* CAPABILITIES */}
        <section id="people" className="sec"><div className="container">
          <FI><div className="shW"><h2 className="serif shT">Less chasing. Less confusion.<br/>More control when you feel unwell.</h2></div></FI>
          <div className="capSec">{capItems.map((item,i)=>(<FI key={item.title} delay={i*0.04}><div className="capRow"><motion.div className="capIc" animate={{y:[0,-3,0]}} transition={{duration:2.5+i*0.3,repeat:Infinity,ease:"easeInOut"}}>{item.icon}</motion.div><div><h3 className="capTi">{item.title}</h3><p className="capBd">{item.body}</p></div></div></FI>))}</div>
          <FI delay={0.2}><LogoMarquee/></FI>
        </div></section>

        {/* AUDIENCES */}
        <section id="providers" className="sec"><div className="container">
          <FI><div className="shW"><Tag>Who is Laura for?</Tag><h2 className="serif shT" style={{marginTop:"18px"}}>Three audiences. One platform.</h2></div></FI>
          <div className="g3" style={{marginTop:"40px"}}>{[
            {title:"For people",desc:"You are sick, confused, or stuck. Laura gives you a way through.",bullets:["Skip the phone queue","Draft prescription refills","Find doctors near you","Understand referral letters"],ico:"1"},
            {title:"For care teams",desc:"Your receptionists are drowning. Laura handles intake so your team handles patients.",bullets:["Reduce reception pressure","See urgency at a glance","Structured callbacks","Multilingual access"],ico:"2"},
            {title:"For developers",desc:"Embed Laura into your health app. Add care-access intelligence without building from scratch.",bullets:["API and SDK access","Embeddable widget","Workflow triggers","Audit logs"],ico:"3",soon:true},
          ].map((card,i)=>(<FI key={card.title} delay={i*0.07}><div className="card"><div className="cardN">{card.ico}{card.soon&&<CS/>}</div><h3 className="cardTi">{card.title}</h3><p className="cardBd">{card.desc}</p><div className="ftL">{card.bullets.map(b=><div key={b} className="ftR"><Chk/><span>{b}</span></div>)}</div></div></FI>))}</div>
        </div></section>

        {/* LANGUAGE */}
        <section className="sec" style={{paddingTop:0}}><div className="container"><FI><div className="glC"><div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",flexWrap:"wrap"}}><h2 className="serif glT">Laura speaks your language.</h2><CS/></div><p className="glB">Whether you speak English, French, Spanish, Arabic, Hindi, Mandarin, Yoruba, Polish, Portuguese, or German. Laura replies in your language. No translators. No barriers.</p><div className="glF">{["\u{1F1EC}\u{1F1E7} UK","\u{1F1FA}\u{1F1F8} US","\u{1F1EB}\u{1F1F7} France","\u{1F1F3}\u{1F1EC} Nigeria","\u{1F1EE}\u{1F1F3} India","\u{1F1E7}\u{1F1F7} Brazil","\u{1F1F8}\u{1F1E6} Saudi Arabia","\u{1F1E8}\u{1F1F3} China","\u{1F1F5}\u{1F1F1} Poland","\u{1F1E9}\u{1F1EA} Germany","\u{1F30D} 40+ more"].map(f=><span key={f} className="glFi">{f}</span>)}</div></div></FI></div></section>

        {/* DEVELOPERS */}
        <section id="developers" className="secDk"><div className="container">
          <FI><div className="shW"><Tag>Developer platform</Tag><h2 className="serif shT" style={{marginTop:"18px",color:"#fff"}}>Build with Laura.</h2><p className="shB" style={{color:"rgba(255,255,255,0.6)"}}>Embed urgency checks, provider routing, and multilingual care access into your products.</p></div></FI>
          <div className="g2" style={{marginTop:"40px"}}><FI><SDKTerminal/></FI><FI delay={0.08}><div className="dkC"><h3 className="dkCT">Built for integration teams</h3><p className="dkCB">Add Laura to patient portals, health apps, or internal tooling.</p><div className="ftL" style={{marginTop:"18px"}}>{["REST API and SDK access","Embeddable chat widgets","Patient workflow triggers","Secure auth and audit trails"].map(f=><div key={f} className="ftR" style={{color:"rgba(255,255,255,0.8)"}}><Chk dark/><span>{f}</span></div>)}</div><div className="dkP">Developer access on the roadmap <CS/></div></div></FI></div>
        </div></section>

        {/* PRICING */}
        <section id="pricing" className="sec"><div className="container">
          <FI><div className="shW"><Tag>Pricing</Tag><h2 className="serif shT" style={{marginTop:"18px"}}>Simple, transparent access.</h2></div></FI>
          <div className="g3" style={{marginTop:"40px"}}>{[
            {name:"People",price:"\u00A34.99",period:"/mo",desc:"Stop chasing prescriptions, sitting on hold, and feeling lost.",ft:["Urgency checks","GP and dental search","Prescription support","Referral guidance"],hl:false,cta:"Join waitlist"},
            {name:"Care Teams",price:"\u00A32,599.99",period:"/mo",desc:"Give your receptionists their sanity back.",ft:["Structured intake","Urgency dashboard","Multilingual access","Request management"],hl:true,badge:"Best for practices",cta:"Request demo"},
            {name:"Developer",price:"Custom",period:"",desc:"Embed Laura into your health product.",ft:["API and SDK access","Embeddable components","Usage analytics","Technical onboarding"],hl:false,cta:"Talk to us",soon:true},
          ].map((p,i)=>(<FI key={p.name} delay={i*0.07}><div className={`card${p.hl?" cardDk":""}`} style={{position:"relative"}}>
            {p.badge&&<div className="prBg">{p.badge}</div>}
            <div style={{fontSize:"17px",fontWeight:700,display:"flex",alignItems:"center",gap:"8px"}}>{p.name}{p.soon&&<CS/>}</div>
            <div style={{display:"flex",alignItems:"baseline",gap:"4px",marginTop:"14px"}}><span className="serif" style={{fontSize:"clamp(34px,6vw,50px)",letterSpacing:"-0.05em"}}>{p.price}</span>{p.period&&<span style={{fontSize:"15px",color:p.hl?"rgba(255,255,255,0.5)":c.muted}}>{p.period}</span>}</div>
            <p style={{marginTop:"8px",color:p.hl?"rgba(255,255,255,0.6)":c.sub,fontSize:"15px",lineHeight:1.7}}>{p.desc}</p>
            <div style={{marginTop:"18px",paddingTop:"16px",borderTop:`1px solid ${p.hl?c.borderDk:c.border}`,display:"flex",flexDirection:"column",gap:"8px",flex:1}}>{p.ft.map(f=><div key={f} className="ftR" style={{color:p.hl?"rgba(255,255,255,0.8)":c.sub}}><Chk dark={p.hl}/><span>{f}</span></div>)}</div>
            <a href="#waitlist" className="btnP" style={{marginTop:"20px",width:"100%",background:p.hl?"#fff":c.dark,color:p.hl?c.dark:"#fff",border:"none"}}>{p.cta}</a>
          </div></FI>))}</div>
        </div></section>

        {/* BEFORE/AFTER */}
        <section className="sec" style={{paddingTop:0}}><div className="container"><FI><div className="baGrid">
          <div className="baCard baBf"><h3 className="baTi">Without Laura</h3><div className="baLst">{["Call GP, get busy signal","Chase prescription emails","Travel to ask simple questions","Wait in confusion at hospital","Struggle with language barriers","Repeat yourself every time"].map(item=><div key={item} className="baIt"><span className="baX">&#10007;</span>{item}</div>)}</div></div>
          <div className="baCard baAf"><h3 className="baTi">With Laura</h3><div className="baLst">{["Describe what you need, anytime","Prescription drafted and tracked","Get guidance from home","Walk in prepared and calm","Speak your own language","One conversation, Laura remembers"].map(item=><div key={item} className="baIt"><span className="baCk">&#10003;</span>{item}</div>)}</div></div>
        </div></FI></div></section>

        {/* QUIZ + METRICS */}
        <section className="sec" style={{paddingTop:0}}><div className="container">
          <FI><Link href="/quiz" className="qzCd"><div><Tag>Daily health check</Tag><h3 className="serif qzTi">Would you know what to do?</h3><p className="qzBd">Real health scenarios. Test yourself in 30 seconds.</p><span className="btnP qzBtn">Take today&apos;s quiz <ArrowRight size={14}/></span></div><div className="qzEm">&#129657;</div></Link></FI>
          <FI><div className="metG" style={{marginTop:"20px"}}>{[{v:"24/7",l:"Always available"},{v:"40+",l:"Languages"},{v:"<2s",l:"Response time"},{v:"0",l:"Time on hold"}].map(m=><div key={m.l} className="metC"><div className="serif metV">{m.v}</div><div className="metLb">{m.l}</div></div>)}</div></FI>
        </div></section>

        {/* WAITLIST */}
        <section id="waitlist" className="sec"><div className="container"><FI><div className="wlC">
          <div className="shW"><Tag>Get early access</Tag><h2 className="serif shT" style={{marginTop:"18px"}}>Be the first to use Laura.</h2><p className="shB">Tell us who you are. We will prioritize your access.</p></div>
          <form className="wlF" onSubmit={handleSubmit}>
            <input className="inp" type="email" placeholder="Your email" value={email} onChange={e=>setEmail(e.target.value)} required autoComplete="email"/>
            <select className="inp" value={role} onChange={e=>setRole(e.target.value as Role)}><option value="patient">I am a patient</option><option value="provider">I am a provider</option><option value="developer">I am a developer</option></select>
            <input type="text" name="website" value={website} onChange={e=>setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{position:"absolute",left:"-9999px",opacity:0,pointerEvents:"none",height:0,width:0}}/>
            <button type="submit" className="btnP wlBt" disabled={submitting||!agreed}>{submitting?"Submitting...":"Get early access"}</button>
          </form>
          <label className="pvL"><input type="checkbox" checked={agreed} onChange={e=>setAgreed(e.target.checked)} required className="pvC"/><span>I agree that Omela may use my information to manage my request. <Link href="/privacy" className="pvLk">Privacy Notice</Link>.</span></label>
          {success&&<div className="fmOk">{success}</div>}{error&&<div className="fmEr">{error}</div>}
        </div></FI></div></section>

        <section style={{padding:"0 0 32px"}}><div className="container"><div className="emN">Laura is an AI care-access assistant. She is not a substitute for emergency services or clinical diagnosis. If you are experiencing an emergency, call 999 (UK), 911 (US), or your local emergency number immediately.</div></div></section>

        {/* FOOTER - dark like Anthropic */}
        <footer className="ft"><div className="container ftIn">
          <div className="ftTop">
            <Link href="/" className="ftBr"><div className="navLo" style={{width:"30px",height:"30px"}}><Image src="/omela-logo-mark.png" alt="Omela" width={30} height={30} style={{width:"100%",height:"100%",objectFit:"contain"}}/></div><div><div className="ftBrN">Omela</div><div className="ftBrS">POWERED BY LAURA</div></div></Link>
            <div className="ftCols">
              <div className="ftCol"><div className="ftColT">Product</div><Link href="/demo" className="ftLk">Try Laura</Link><Link href="/quiz" className="ftLk">Health Quiz</Link><Link href="/status" className="ftLk">Status</Link></div>
              <div className="ftCol"><div className="ftColT">Legal</div><Link href="/privacy" className="ftLk">Privacy Notice</Link><Link href="/terms" className="ftLk">Terms</Link><a href="mailto:notice@omela.ai" className="ftLk">Contact</a></div>
            </div>
          </div>
          <div className="ftBtm"><p className="ftCp">&copy; 2026 Omela. Built for modern care access.</p></div>
        </div></footer>
      </div>
    </>
  );
}

const CSS = `
*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}html,body{max-width:100%;overflow-x:clip}
body{background:${c.bg};color:${c.text};font-family:'DM Sans',-apple-system,sans-serif;-webkit-font-smoothing:antialiased;font-size:16px}
a{color:inherit;text-decoration:none}button,input,select{font-family:inherit}::selection{background:${c.accent};color:#fff}
@keyframes blink{0%,50%{opacity:1}50.01%,100%{opacity:0}}
@keyframes csA{0%{transform:translateX(-100%)}100%{transform:translateX(200%)}}
.serif{font-family:'Instrument Serif',Georgia,serif}.wrap{width:100%;overflow-x:clip}.container{max-width:1200px;margin:0 auto;padding:0 20px}
.sec{padding:72px 0}.secDk{padding:72px 0;background:radial-gradient(circle at 16% 20%,rgba(37,99,235,0.08) 0%,transparent 28%),${c.dark};color:#fff}

.cs{display:inline-flex;padding:3px 8px;border-radius:999px;background:linear-gradient(135deg,#FEF3C7,#FDE68A);color:#92400E;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.06em;position:relative;overflow:hidden;margin-left:4px;flex-shrink:0}
.csS{position:absolute;top:0;left:0;width:60%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent);animation:csA 2.5s ease-in-out infinite}

.stBar{background:${c.greenSoft};border-bottom:1px solid rgba(34,197,94,0.15);padding:7px 0}
.stIn{display:flex;align-items:center;gap:8px}.stL{display:flex;align-items:center;gap:8px;flex-shrink:0}
.stDot{width:7px;height:7px;border-radius:999px;background:${c.green};display:inline-block;box-shadow:0 0 6px ${c.green}44}
.stLbl{font-size:13px;font-weight:700;color:${c.greenDk};white-space:nowrap}.stLnk{font-size:12px;font-weight:700;color:${c.accent};white-space:nowrap;text-decoration:underline;text-underline-offset:2px}
.stTk{flex:1;min-width:0;overflow:hidden;mask-image:linear-gradient(90deg,transparent,black 10%,black 90%,transparent);-webkit-mask-image:linear-gradient(90deg,transparent,black 10%,black 90%,transparent)}
.stTkTr{display:flex;gap:14px;width:max-content}.stSvc{font-size:11px;color:${c.muted};font-weight:600;display:flex;align-items:center;gap:4px;white-space:nowrap}.stSvcD{width:4px;height:4px;border-radius:999px;background:${c.green};display:inline-block;flex-shrink:0}

.tag{display:inline-flex;align-items:center;gap:8px;padding:9px 18px;border-radius:999px;border:1px solid ${c.border};background:rgba(255,255,255,0.8);backdrop-filter:blur(8px);font-size:14px;font-weight:700;color:${c.sub}}
.tagStar{color:${c.accent};font-size:16px}
.chk{width:22px;height:22px;border-radius:999px;background:${c.greenSoft};color:${c.green};display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex-shrink:0;margin-top:2px}.chkD{background:rgba(34,197,94,0.12);color:#4ADE80}
.shW{text-align:center;max-width:760px;margin:0 auto}.shT{font-size:clamp(28px,5.5vw,56px);line-height:1.08;letter-spacing:-0.04em}.shB{font-size:clamp(16px,2.5vw,19px);line-height:1.8;margin-top:14px;max-width:580px;margin-left:auto;margin-right:auto}
.btnP{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:${c.dark};color:#fff;border:none;border-radius:999px;padding:15px 26px;font-size:16px;font-weight:700;cursor:pointer;transition:all 0.3s;white-space:nowrap}
.btnP:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 12px 32px rgba(0,0,0,0.16)}.btnP:disabled{opacity:0.5;cursor:not-allowed;transform:none}
.btnS{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:rgba(255,255,255,0.85);color:${c.text};border:1px solid ${c.border};border-radius:999px;padding:15px 26px;font-size:16px;font-weight:700;cursor:pointer;transition:all 0.3s;white-space:nowrap}.btnS:hover{background:#fff;box-shadow:0 8px 24px rgba(0,0,0,0.06)}

.nav{position:sticky;top:0;z-index:100;background:rgba(248,246,241,0.88);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid rgba(227,221,210,0.6)}
.navR{display:flex;align-items:center;justify-content:space-between;gap:10px;height:64px}
.navBr{display:flex;align-items:center;gap:8px;text-decoration:none;flex-shrink:0}.navLo{width:36px;height:36px;border-radius:10px;overflow:hidden;flex-shrink:0;box-shadow:0 3px 10px rgba(0,0,0,0.06)}
.navNm{font-size:15px;font-weight:800;letter-spacing:-0.03em}
.navSb{font-size:9px;font-weight:800;letter-spacing:0.12em;color:${c.accent};margin-top:1px}
.navLks{display:none;align-items:center;gap:24px}.navLk{font-size:15px;font-weight:600;color:${c.sub};transition:color 0.2s}.navLk:hover{color:${c.text}}
.navCt{padding:11px 20px!important;font-size:14px!important;flex-shrink:0}.navCtL{display:none}.navCtS{display:inline}

/* HERO */
.heroSec{padding:52px 0 24px;position:relative;overflow:hidden}
.heroAmb{position:absolute;top:-120px;right:-80px;width:500px;height:500px;border-radius:999px;background:radial-gradient(circle,rgba(37,99,235,0.06) 0%,transparent 70%);pointer-events:none}
.heroTxt{max-width:640px;position:relative;z-index:1}
.heroTi{font-size:clamp(38px,9vw,88px);line-height:0.96;letter-spacing:-0.05em;margin-top:18px}.heroAc{color:${c.accent};font-style:italic}
.tw{font-size:clamp(18px,3vw,24px);line-height:1.6;color:${c.text};font-weight:600;min-height:1.6em;display:block;margin-top:20px}
.twC{color:${c.accent};animation:blink 1s step-end infinite;font-weight:300}
.heroSub{font-size:clamp(15px,2.5vw,18px);line-height:1.78;color:${c.sub};max-width:540px;margin-top:12px}
.heroBd{min-height:60px}
.heroBt{display:flex;flex-direction:column;gap:10px;margin-top:28px}.heroBt .btnP,.heroBt .btnS{width:100%;text-align:center}
.heroBtn{background:linear-gradient(135deg,${c.dark},#1a1d28);box-shadow:0 8px 24px rgba(0,0,0,0.12)}

/* PHONE */
.heroPh{margin-top:36px;width:100%;display:flex;justify-content:center;position:relative;z-index:1}
.phW{width:100%;max-width:260px;position:relative}.phGlow{position:absolute;inset:-40px;border-radius:999px;background:radial-gradient(circle,rgba(37,99,235,0.08),transparent 70%);z-index:0}
.phF{position:relative;z-index:1;width:100%}.phB{background:#1A1A1E;border-radius:36px;padding:6px;box-shadow:0 0 0 1px rgba(255,255,255,0.06),0 24px 48px rgba(0,0,0,0.14),inset 0 1px 0 rgba(255,255,255,0.04)}
.phDI{width:80px;height:22px;border-radius:999px;background:#000;margin:0 auto 4px;display:flex;align-items:center;justify-content:flex-end;padding-right:12px}.phDIC{width:6px;height:6px;border-radius:999px;background:radial-gradient(circle,#1a2540,#0a1025);border:1px solid rgba(255,255,255,0.08)}
.phS{background:#FAFAFA;border-radius:32px;overflow:hidden;display:flex;flex-direction:column}
.phH{display:flex;align-items:center;padding:8px 10px;background:#fff;border-bottom:1px solid #f0f0f0}.phHL{display:flex;align-items:center;gap:6px}
.phAv{position:relative;width:28px;height:28px;border-radius:999px;overflow:hidden;flex-shrink:0;border:1.5px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.06)}
.phN{display:flex;align-items:center;gap:3px;font-size:12px;font-weight:700}.phOn{display:flex;align-items:center;gap:3px;font-size:9px;color:${c.green};font-weight:600;margin-top:1px}.phOnD{width:4px;height:4px;border-radius:999px;background:${c.green};display:inline-block}
.phLang{display:flex;align-items:center;justify-content:center;gap:4px;padding:5px 0;background:#F7F7FB;font-size:11px;font-weight:700;color:${c.accent}}
.phBdy{display:flex;flex-direction:column;gap:6px;padding:10px 8px;height:230px;overflow:hidden;justify-content:flex-end;background:linear-gradient(180deg,#F5F5F0,#ECE5DA)}
.phR{display:flex}.phRR{justify-content:flex-end}.phRL{justify-content:flex-start}
.phBb{max-width:85%;padding:7px 10px;font-size:10.5px;line-height:1.45;word-break:break-word}.phBbU{background:#E7FFDB;color:#111;border-radius:10px 10px 3px 10px}.phBbL{background:#fff;color:#111;border-radius:10px 10px 10px 3px;box-shadow:0 1px 2px rgba(0,0,0,0.04)}
.phMt{display:flex;align-items:center;gap:3px;justify-content:flex-end;margin-top:2px;font-size:8px;color:#8B919F;font-weight:500}
.phCo{padding:6px 6px 10px;display:flex;align-items:center;gap:5px;background:#F0EBE3}.phCoF{flex:1;height:28px;border-radius:999px;background:#fff;display:flex;align-items:center;gap:6px;padding:0 8px}.phCoT{color:${c.muted};font-size:11px}.phCoM{width:28px;height:28px;border-radius:999px;background:#25D366;display:flex;align-items:center;justify-content:center;flex-shrink:0}

/* GLOBE */
.globeSec{padding:88px 0;background:linear-gradient(180deg,${c.bg},#F0EBE0,${c.bg});position:relative;overflow:hidden}
.globeW{display:flex;flex-direction:column;align-items:center;gap:32px;margin-top:40px}
.globeV{width:100%;max-width:420px;aspect-ratio:1;margin:0 auto}.globeSvg{width:100%;height:100%}
.globeC{width:100%;max-width:560px;margin:0 auto;text-align:center}
.globeStory{min-height:200px}
.globeCtry{display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:14px}
.globeFlg{font-size:22px}.globeCtryN{font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;color:${c.muted};background:rgba(255,255,255,0.8);padding:4px 12px;border-radius:6px}
.globeQ{font-size:clamp(18px,4vw,28px);line-height:1.35;letter-spacing:-0.03em;font-style:italic}
.globeL{display:flex;align-items:flex-start;gap:10px;margin-top:18px;background:rgba(255,255,255,0.8);border:1px solid ${c.border};border-radius:16px;padding:14px 18px;text-align:left}
.globeLA{position:relative;width:28px;height:28px;border-radius:999px;overflow:hidden;flex-shrink:0;border:1.5px solid #fff}
.globeLT{font-size:15px;line-height:1.65;color:${c.sub}}
.globeNav{display:flex;align-items:center;justify-content:center;gap:20px;margin-top:24px}
.globeDs{display:flex;gap:6px}.globeD{width:8px;height:8px;border-radius:999px;background:${c.border};border:none;cursor:pointer;transition:all 0.3s;padding:0}.globeDA{background:${c.warm};width:24px}
.globeAs{display:flex;gap:6px}.globeA{width:38px;height:38px;border-radius:999px;background:rgba(255,255,255,0.9);border:1px solid ${c.border};display:flex;align-items:center;justify-content:center;cursor:pointer;color:${c.sub};transition:all 0.2s}.globeA:hover{background:#fff;box-shadow:0 4px 12px rgba(0,0,0,0.06)}

/* PROBLEMS */
.probGrid{display:grid;grid-template-columns:1fr;gap:14px;margin-top:40px}
.probCard{display:block;padding:26px;border:1px solid ${c.border};border-radius:22px;background:rgba(255,255,255,0.92);transition:all 0.3s;text-decoration:none}
.probCard:hover{border-color:#D0CBBD;box-shadow:0 16px 44px rgba(0,0,0,0.06);transform:translateY(-3px)}
.probE{font-size:30px;display:block;margin-bottom:10px}
.probTi{font-size:19px;font-weight:800;letter-spacing:-0.03em;line-height:1.25}
.probBd{font-size:15px;line-height:1.72;color:${c.sub};margin-top:8px}
.probCta{display:inline-flex;align-items:center;gap:6px;margin-top:14px;font-size:14px;font-weight:700;color:${c.accent}}

/* CAPABILITIES */
.capSec{max-width:800px;margin:40px auto 0;display:flex;flex-direction:column;gap:12px}
.capRow{display:flex;align-items:flex-start;gap:18px;padding:22px 24px;border:1px solid ${c.border};border-radius:20px;background:rgba(255,255,255,0.9);transition:all 0.25s}
.capRow:hover{box-shadow:0 8px 24px rgba(0,0,0,0.04);transform:translateY(-1px)}
.capIc{width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(180deg,#F5F8FF,#EAF0FF);border:1px solid rgba(190,210,250,0.5);color:${c.accent}}
.capTi{font-size:18px;font-weight:800;letter-spacing:-0.02em}.capBd{font-size:15px;line-height:1.65;color:${c.sub};margin-top:4px}

/* BIG STATEMENT */
.bigSt{max-width:900px;margin:0 auto;text-align:center;padding:36px;border-radius:28px;background:linear-gradient(135deg,rgba(255,255,255,0.6),rgba(255,255,255,0.3));border:1px solid rgba(227,221,210,0.5);backdrop-filter:blur(12px)}
.bigT{font-size:clamp(22px,4vw,38px);line-height:1.2;letter-spacing:-0.03em}.bigB{margin-top:16px;font-size:clamp(15px,2vw,18px);line-height:1.8;color:${c.sub};max-width:640px;margin-left:auto;margin-right:auto}

/* LOGOS */
.mqS{margin-top:48px}.mqL{text-align:center;font-size:11px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;color:${c.muted};margin-bottom:16px}
.mqV{overflow:hidden;mask-image:linear-gradient(90deg,transparent,black 8%,black 92%,transparent);-webkit-mask-image:linear-gradient(90deg,transparent,black 8%,black 92%,transparent)}
.mqT{display:flex;align-items:center;gap:12px;width:max-content}
.mqC{display:flex;align-items:center;justify-content:center;min-width:160px;height:64px;border:1px solid ${c.border};background:rgba(255,255,255,0.95);border-radius:14px;padding:12px 20px;box-shadow:0 2px 8px rgba(0,0,0,0.02)}
.mqI{width:auto;max-width:100px;height:auto;max-height:24px;object-fit:contain}.mqBl{mix-blend-mode:multiply}

.g3{display:grid;grid-template-columns:1fr;gap:14px}.g2{display:grid;grid-template-columns:1fr;gap:20px}
.card{background:rgba(255,255,255,0.92);border:1px solid ${c.border};border-radius:24px;padding:26px;min-width:0;box-shadow:0 6px 20px rgba(0,0,0,0.025);display:flex;flex-direction:column;transition:all 0.3s}.card:hover{box-shadow:0 12px 36px rgba(0,0,0,0.05)}
.cardDk{background:linear-gradient(180deg,#111318,#0D0F14)!important;border:1px solid ${c.borderDk}!important;color:#fff!important;box-shadow:0 20px 50px rgba(0,0,0,0.2)!important}
.cardN{display:flex;align-items:center;gap:6px;width:fit-content;padding:0 14px;height:36px;border-radius:11px;background:${c.accentSoft};color:${c.accent};font-size:17px;font-weight:800}
.cardTi{font-size:22px;font-weight:800;letter-spacing:-0.03em;margin-top:14px}.cardBd{margin-top:6px;color:${c.sub};font-size:16px;line-height:1.72}
.dkC{background:linear-gradient(180deg,rgba(16,19,24,0.98),rgba(13,15,20,0.98));border:1px solid ${c.borderDk};border-radius:24px;padding:26px;box-shadow:0 18px 44px rgba(0,0,0,0.2)}
.dkCT{font-size:clamp(20px,3vw,26px);font-weight:800;letter-spacing:-0.03em;color:#fff}.dkCB{margin-top:10px;color:rgba(255,255,255,0.6);font-size:15px;line-height:1.9}
.dkP{display:inline-flex;align-items:center;margin-top:18px;padding:9px 14px;border-radius:999px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.04);color:rgba(255,255,255,0.7);font-size:12px;font-weight:700;gap:4px;flex-wrap:wrap}
.ftL{display:flex;flex-direction:column;gap:8px;margin-top:14px}.ftR{display:flex;align-items:flex-start;gap:8px;font-size:15px;line-height:1.6;color:${c.sub}}

.glC{border:1px solid ${c.border};background:rgba(255,255,255,0.9);border-radius:24px;padding:32px;text-align:center;backdrop-filter:blur(8px)}
.glT{font-size:clamp(26px,5vw,44px);letter-spacing:-0.04em;line-height:1.06;display:inline}
.glB{margin-top:12px;color:${c.sub};font-size:16px;line-height:1.8;max-width:560px;margin-left:auto;margin-right:auto}
.glF{display:flex;flex-wrap:wrap;justify-content:center;gap:7px;margin-top:22px}
.glFi{padding:7px 14px;border-radius:999px;border:1px solid ${c.border};background:rgba(255,255,255,0.8);font-size:13px;font-weight:600;color:${c.sub};white-space:nowrap;transition:all 0.2s}.glFi:hover{background:#fff;box-shadow:0 2px 8px rgba(0,0,0,0.04)}

/* BEFORE/AFTER */
.baGrid{display:grid;grid-template-columns:1fr;gap:14px}
.baCard{border-radius:24px;padding:30px;border:1px solid ${c.border}}
.baBf{background:rgba(254,242,242,0.4)}.baAf{background:rgba(236,253,243,0.4)}
.baTi{font-size:20px;font-weight:800;margin-bottom:18px}
.baLst{display:flex;flex-direction:column;gap:12px}
.baIt{display:flex;align-items:flex-start;gap:10px;font-size:15px;line-height:1.6;color:${c.sub}}
.baX{color:#EF4444;font-weight:800;flex-shrink:0;margin-top:1px}.baCk{color:${c.green};font-weight:800;flex-shrink:0;margin-top:1px}

/* TERMINAL - FIXED HEIGHT */
.trm{background:#07080B;border:1px solid #1F2330;border-radius:16px;overflow:hidden;box-shadow:0 16px 40px rgba(0,0,0,0.18)}
.trmT{display:flex;align-items:center;gap:8px;padding:10px 14px;border-bottom:1px solid #1B1F2B;background:#0E1118}
.trmD{display:flex;gap:5px}.trmD span{width:9px;height:9px;border-radius:999px;display:inline-block}
.trmD span:nth-child(1){background:#FF5F57}.trmD span:nth-child(2){background:#FEBC2E}.trmD span:nth-child(3){background:#28C840}
.trmTi{font-size:11px;color:#6B7280;font-weight:700;flex:1}
.trmB{padding:14px;height:320px;overflow:hidden}
.trmL{white-space:pre-wrap;word-break:break-all;font-size:12px;line-height:1.75;font-family:'SF Mono',ui-monospace,Menlo,Consolas,monospace}
.trmC{color:#60A5FA;animation:blink 0.8s step-end infinite}

.prBg{position:absolute;top:14px;right:14px;border-radius:999px;padding:5px 10px;background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.75);font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em}

.qzCd{display:flex;align-items:center;justify-content:space-between;gap:20px;border:1px solid ${c.border};background:rgba(255,255,255,0.9);border-radius:24px;padding:30px;transition:all 0.3s;text-decoration:none}
.qzCd:hover{box-shadow:0 16px 44px rgba(0,0,0,0.06);transform:translateY(-3px)}
.qzTi{font-size:clamp(22px,4vw,34px);letter-spacing:-0.04em;line-height:1.1;margin-top:10px}.qzBd{margin-top:8px;color:${c.sub};font-size:15px;line-height:1.7}.qzBtn{margin-top:14px}.qzEm{font-size:56px;flex-shrink:0}

.metG{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:${c.border};border:1px solid ${c.border};border-radius:16px;overflow:hidden}
.metC{background:#fff;padding:24px 14px;text-align:center}.metV{font-size:clamp(30px,6vw,44px);letter-spacing:-0.05em;line-height:1}.metLb{margin-top:5px;font-size:13px;color:${c.sub}}

.wlC{background:rgba(255,255,255,0.92);border:1px solid ${c.border};border-radius:24px;padding:28px;max-width:820px;margin:0 auto;box-shadow:0 12px 32px rgba(0,0,0,0.03)}
.wlF{display:grid;grid-template-columns:1fr;gap:10px;margin-top:18px}.wlBt{height:54px;width:100%}
.inp{width:100%;height:54px;border-radius:14px;border:1px solid ${c.border};background:#fff;padding:0 18px;font-size:16px;color:${c.text};outline:none;transition:all 0.2s}
.inp:focus{border-color:${c.accent};box-shadow:0 0 0 4px rgba(37,99,235,0.06)}
.pvL{display:flex;align-items:flex-start;gap:8px;margin-top:12px;color:${c.sub};font-size:13px;line-height:1.7;cursor:pointer;max-width:600px;margin-left:auto;margin-right:auto}
.pvC{margin-top:2px;width:16px;height:16px;accent-color:${c.accent};flex-shrink:0}.pvLk{color:${c.text};font-weight:700;text-decoration:underline;text-underline-offset:2px}
.fmOk{margin-top:12px;background:${c.greenSoft};color:${c.greenDk};border-radius:12px;padding:14px;text-align:center;font-size:15px;font-weight:600}
.fmEr{margin-top:12px;background:#FFF7F7;color:#B91C1C;border-radius:12px;padding:14px;text-align:center;font-size:15px;font-weight:600}
.emN{text-align:center;font-size:12px;line-height:1.7;color:${c.muted};max-width:640px;margin:0 auto;padding:14px;border:1px solid ${c.border};border-radius:14px;background:rgba(255,255,255,0.6)}

.modO{position:fixed;inset:0;z-index:220;background:rgba(9,10,13,0.4);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;padding:16px}
.modB{width:100%;max-width:420px;background:rgba(255,255,255,0.96);border:1px solid ${c.border};border-radius:24px;padding:28px;box-shadow:0 32px 72px rgba(0,0,0,0.18)}
.modI{width:48px;height:48px;border-radius:14px;background:linear-gradient(180deg,#F7FBFF,${c.accentSoft});border:1px solid ${c.border};display:flex;align-items:center;justify-content:center}
.modTi{font-size:clamp(24px,4vw,34px);line-height:1.04;letter-spacing:-0.04em;margin-top:8px}.modBd{margin-top:6px;color:${c.sub};font-size:15px;line-height:1.8}

/* FOOTER - Anthropic-style dark */
.ft{background:${c.dark};padding:40px 0 28px;color:#fff}
.ftIn{display:flex;flex-direction:column;gap:28px}
.ftTop{display:flex;flex-direction:column;gap:28px}
.ftBr{display:flex;align-items:center;gap:8px;text-decoration:none;color:#fff}.ftBrN{font-size:14px;font-weight:800}.ftBrS{font-size:9px;font-weight:800;letter-spacing:0.12em;color:${c.accent};margin-top:1px}
.ftCols{display:flex;gap:40px}
.ftCol{display:flex;flex-direction:column;gap:8px}.ftColT{font-size:12px;font-weight:800;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:4px}
.ftLk{font-size:14px;color:rgba(255,255,255,0.6);font-weight:500;transition:color 0.2s}.ftLk:hover{color:#fff}
.ftBtm{border-top:1px solid rgba(255,255,255,0.08);padding-top:20px}.ftCp{font-size:12px;color:rgba(255,255,255,0.3)}

@media(min-width:640px){
  .container{padding:0 28px}.sec{padding:88px 0}.secDk{padding:88px 0}
  .navR{height:72px}.navCt{padding:12px 22px!important;font-size:15px!important}.navCtL{display:inline}.navCtS{display:none}
  .heroSec{padding:60px 0 32px}.heroBt{flex-direction:row}.heroBt .btnP,.heroBt .btnS{width:auto}
  .g3{grid-template-columns:repeat(2,1fr);gap:16px}.g2{grid-template-columns:repeat(2,1fr);gap:28px}
  .probGrid{grid-template-columns:repeat(2,1fr);gap:16px}
  .metG{grid-template-columns:repeat(4,1fr)}
  .wlF{grid-template-columns:1.2fr 0.8fr auto}.wlBt{height:54px;width:auto}.wlC{padding:36px}
  .phW{max-width:280px}.phBdy{height:260px}
  .ftTop{flex-direction:row;justify-content:space-between;align-items:flex-start}
  .mqC{min-width:180px;height:72px}.mqI{max-width:110px;max-height:26px}
  .trmB{height:340px}.glC{padding:40px}
  .globeW{flex-direction:row;align-items:center;gap:48px}.globeV{max-width:380px;flex-shrink:0}.globeC{text-align:left}.globeCtry{justify-content:flex-start}.globeQ{text-align:left}
  .baGrid{grid-template-columns:repeat(2,1fr)}
}
@media(min-width:960px){
  .container{padding:0 44px}.sec{padding:100px 0}.secDk{padding:100px 0}
  .navLks{display:flex}.navR{height:80px}
  .heroSec{padding:76px 0 40px}
  .heroSec .container{display:grid;grid-template-columns:1.1fr 0.9fr;gap:0 52px;align-items:start}
  .heroTxt{grid-column:1;grid-row:1}.heroPh{grid-column:2;grid-row:1;margin-top:0;align-self:start}
  .probGrid{grid-template-columns:repeat(3,1fr);gap:18px}
  .g3{grid-template-columns:repeat(3,1fr);gap:18px}
  .phW{max-width:300px}.phB{border-radius:42px;padding:8px}.phS{border-radius:36px}.phBdy{height:280px}
  .card{padding:30px;border-radius:26px}.dkC{padding:30px;border-radius:26px}
  .mqC{min-width:200px;height:76px}.mqI{max-width:120px;max-height:28px}
  .trmB{height:360px}.glC{padding:48px}
  .capRow{gap:22px;padding:26px 30px}.capTi{font-size:20px}.capBd{font-size:16px}
  .globeV{max-width:440px}
}
@media(min-width:1100px){.heroTi{font-size:clamp(68px,7.5vw,88px)}}
`;
