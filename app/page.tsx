"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useCallback, type ReactNode } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowRight, Mic, ChevronLeft, ChevronRight, Search, FileCheck, Languages, Users, Building2, Code2, Shield } from "lucide-react";
const FONT=`@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');`;
const c={bg:"#F8F6F1",card:"#fff",dark:"#08090C",text:"#111214",sub:"#4A4F5C",muted:"#888E9C",accent:"#2563EB",accentSoft:"#ECF2FF",border:"#E3DDD2",borderDk:"#222633",green:"#22C55E",greenSoft:"#ECFDF3",greenDk:"#15803D",warm:"#C9956B"};
type Role="patient"|"provider"|"developer";
function FI({children,delay=0,className=""}:{children:ReactNode;delay?:number;className?:string}){const ref=useRef<HTMLDivElement>(null);const v=useInView(ref,{once:true,amount:0.05});return<motion.div ref={ref} initial={{opacity:0,y:18}} animate={v?{opacity:1,y:0}:{}} transition={{duration:0.6,delay,ease:[0.22,1,0.36,1]}} className={className}>{children}</motion.div>;}
function Soon(){return<span className="soon">Coming soon</span>;}
function Chk({dark=false}:{dark?:boolean}){return<motion.span initial={{scale:0}} whileInView={{scale:1}} viewport={{once:true}} transition={{type:"spring",stiffness:500,damping:18}} className={`chk${dark?" chkD":""}`}>&#10003;</motion.span>;}
function Typewriter(){const lines=useMemo(()=>["You sit on hold for 45 minutes.","You chase prescriptions for days.","You get a letter you do not understand.","You move cities with no doctor."],[]);const [li,setLi]=useState(0);const [ci,setCi]=useState(0);const [del,setDel]=useState(false);const [pause,setPause]=useState(false);useEffect(()=>{if(pause){const t=setTimeout(()=>{setPause(false);setDel(true);},1400);return()=>clearTimeout(t);}const cur=lines[li];if(!del){if(ci<cur.length){const t=setTimeout(()=>setCi(p=>p+1),28);return()=>clearTimeout(t);}else setPause(true);}else{if(ci>0){const t=setTimeout(()=>setCi(p=>p-1),14);return()=>clearTimeout(t);}else{setDel(false);setLi(p=>(p+1)%lines.length);}}},[li,ci,del,pause,lines]);return<span className="tw">{lines[li].slice(0,ci)}<span className="twC">|</span></span>;}
function StatusBar(){return<div className="stBar"><div className="container stIn"><motion.span animate={{scale:[1,1.3,1]}} transition={{duration:2,repeat:Infinity}} className="stDot"/><span className="stLbl">All systems operational</span><Link href="/status" className="stLnk">View status</Link></div></div>;}

/* Phone */
const convos=[
  {lang:"English",flag:"\u{1F1EC}\u{1F1E7}",msgs:[{f:"u",t:"I just moved to Manchester and need to register with a GP. I also need my asthma inhaler."},{f:"l",t:"I will find practices near you accepting new patients. What is your postcode?"},{f:"u",t:"M1, near Piccadilly."},{f:"l",t:"Found 3 practices near M1."},{f:"a",t:"City Health Centre \u00b7 0.3mi \u00b7 Accepting patients"},{f:"l",t:"I have requested a registration callback for you. Bring photo ID and proof of address. Once registered, I will draft your inhaler request."},{f:"a",t:"Callback requested \u00b7 Response in 1 to 2 days"}]},
  {lang:"Fran\u00e7ais",flag:"\u{1F1EB}\u{1F1F7}",msgs:[{f:"u",t:"J'ai besoin de renouveler mon ordonnance. Amlodipine 5mg."},{f:"l",t:"Combien de jours de stock vous reste-t-il?"},{f:"u",t:"Environ 3 jours."},{f:"l",t:"J'ai prepare une demande de renouvellement pour votre cabinet."},{f:"a",t:"Demande soumise \u00b7 Rappel dans 25 jours"},{f:"l",t:"Je vous rappellerai 5 jours avant la fin de votre stock."}]},
  {lang:"Yor\u00f9b\u00e1",flag:"\u{1F1F3}\u{1F1EC}",msgs:[{f:"u",t:"Mo ni iba ati efori lati ana. Mo wa ni HD1."},{f:"l",t:"Mo ti ri ile-iwosan meji nitosi re."},{f:"a",t:"Spring Street Surgery \u00b7 0.4 maili"},{f:"l",t:"Se o fe ki n pe won fun o lati gba ipade?"},{f:"u",t:"Beeni, e seun."},{f:"a",t:"Ti a ti beere ipe-pada \u00b7 Idahun laarin ojo 1"}]},
];
function PhoneMockup(){const [li,setLi]=useState(0);const [vi,setVi]=useState(0);const [typing,setTyping]=useState(false);const cv=convos[li];useEffect(()=>{if(vi>=cv.msgs.length){const t=setTimeout(()=>{setLi(p=>(p+1)%convos.length);setVi(0);},2400);return()=>clearTimeout(t);}const msg=cv.msgs[vi];if(msg.f==="u"){setVi(p=>p+1);}else{setTyping(true);const t=setTimeout(()=>{setTyping(false);setVi(p=>p+1);},400+Math.random()*400);return()=>clearTimeout(t);}},[vi,li,cv.msgs]);return(
  <div className="phW"><motion.div className="phGlow" animate={{opacity:[0.12,0.3,0.12]}} transition={{duration:5,repeat:Infinity}}/>
    <motion.div className="phF" initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
      <div className="phB"><div className="phDI"/>
        <div className="phS">
          <div className="phH"><div className="phAv"><Image src="/laura-avatar.png" alt="Laura" fill sizes="22px" style={{objectFit:"cover"}}/></div><div><div className="phN">Laura <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M12 1L14.9 3.6L18.6 3.2L19.4 6.8L22.5 8.7L21.2 12.2L22.5 15.7L19.4 17.6L18.6 21.2L14.9 20.8L12 23.4L9.1 20.8L5.4 21.2L4.6 17.6L1.5 15.7L2.8 12.2L1.5 8.7L4.6 6.8L5.4 3.2L9.1 3.6L12 1Z" fill="#22C55E"/><path d="M8.5 12.5L10.5 14.5L15.5 9.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div><div className="phOn"><span className="phOnD"/>online</div></div></div>
          <AnimatePresence mode="wait"><motion.div key={li} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="phLang">{cv.flag} {cv.lang}</motion.div></AnimatePresence>
          <div className="phBdy">{cv.msgs.slice(0,vi).map((msg,i)=>(<motion.div key={`${li}-${i}`} initial={{opacity:0,y:3}} animate={{opacity:1,y:0}} className={`phR ${msg.f==="u"?"phRR":"phRL"}`}>{msg.f==="a"?<div className="phAct">{msg.t}</div>:<div className={`phBb ${msg.f==="u"?"phBbU":"phBbL"}`}>{msg.t}{msg.f==="u"&&<span className="phMt"><svg width="10" height="7" viewBox="0 0 20 14" fill="none"><path d="M1.5 7.6L4.7 10.8L10.2 5.2" stroke="#53BDEB" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/><path d="M7.3 7.6L10.5 10.8L18.2 3.2" stroke="#53BDEB" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>}</div>}</motion.div>))}{typing&&<div className="phR phRL"><div className="phBb phBbL phTy"><span/><span/><span/></div></div>}</div>
          <div className="phCo"><div className="phCoF"><span className="phCoT">Message</span></div><div className="phCoM"><Mic size={10} color="#fff"/></div></div>
        </div>
      </div>
    </motion.div>
  </div>);}

/* Globe */
const gs=[{country:"United Kingdom",flag:"\u{1F1EC}\u{1F1E7}",name:"Sarah, 34, Leeds",quote:"I called at 8:01am. Busy. By 8:15 all slots were gone. Three weeks of this.",laura:"Laura submits a structured callback request to your GP overnight. You wake up with a confirmed slot.",cx:48,cy:28},{country:"United States",flag:"\u{1F1FA}\u{1F1F8}",name:"Marcus, 28, Chicago",quote:"I delayed seeing a doctor for six months because I was terrified of the cost.",laura:"Laura surfaces lower-cost options and community clinics near you automatically.",cx:28,cy:35},{country:"Nigeria",flag:"\u{1F1F3}\u{1F1EC}",name:"Amina, 41, Lagos",quote:"Four doctors for ten thousand people. I spent two days trying to find someone.",laura:"Laura searches provider availability in real time and routes you to whoever can see you soonest.",cx:50,cy:52},{country:"India",flag:"\u{1F1EE}\u{1F1F3}",name:"Priya, 55, Jaipur",quote:"My mother lives two hours from the nearest clinic. She never knows when to worry.",laura:"Laura runs an urgency assessment remotely and tells you whether to travel now or monitor at home.",cx:68,cy:42},{country:"Brazil",flag:"\u{1F1E7}\u{1F1F7}",name:"Lucas, 23, London",quote:"I moved to London and could not explain my symptoms in English.",laura:"Laura captures symptoms in your language, generates a bilingual clinical note, and sends it before you arrive.",cx:32,cy:58}];
function GlobeSection(){const [a,setA]=useState(0);const tr=useRef<ReturnType<typeof setTimeout>|null>(null);const reset=useCallback(()=>{if(tr.current)clearTimeout(tr.current);tr.current=setTimeout(()=>setA(p=>(p+1)%gs.length),6000);},[]);useEffect(()=>{reset();return()=>{if(tr.current)clearTimeout(tr.current);};},[a,reset]);const s=gs[a];return(
  <section className="globeSec"><div className="container">
    <FI><div className="shW"><h2 className="serif shT">How people struggle to reach care.</h2></div></FI>
    <div className="globeW">
      <div className="globeV"><svg viewBox="0 0 100 100" className="globeSvg">
        <circle cx="50" cy="50" r="47" fill="none" stroke="#C0B8A4" strokeWidth="0.6"/>
        <circle cx="50" cy="50" r="47" fill="url(#gG)"/>
        {[18,28,38,50,62,72,82].map(y=><ellipse key={y} cx="50" cy="50" rx={Math.sqrt(Math.max(0,2209-(y-50)*(y-50)))} ry="3.5" fill="none" stroke="#C8C0AC" strokeWidth="0.22" opacity="0.5" transform={`translate(0,${y-50})`}/>)}
        {[-30,-15,0,15,30].map(x=><ellipse key={x} cx="50" cy="50" rx="3.5" ry="47" fill="none" stroke="#C8C0AC" strokeWidth="0.22" opacity="0.4" transform={`rotate(${x},50,50)`}/>)}
        {/* Continents */}
        <path d="M43,20 L49,18 L54,21 L55,27 L51,32 L46,30 L43,25 Z" fill="#CFC7B4" opacity="0.5"/>
        <path d="M45,32 L53,31 L56,40 L52,45 L44,42 L42,36 Z" fill="#CFC7B4" opacity="0.45"/>
        <path d="M18,28 L36,26 L40,34 L34,42 L24,40 L16,34 Z" fill="#CFC7B4" opacity="0.4"/>
        <path d="M26,48 L36,44 L38,56 L34,64 L24,60 Z" fill="#CFC7B4" opacity="0.35"/>
        <path d="M60,30 L76,28 L80,38 L74,50 L66,46 L58,36 Z" fill="#CFC7B4" opacity="0.4"/>
        <path d="M70,50 L80,48 L82,56 L76,60 L68,56 Z" fill="#CFC7B4" opacity="0.3"/>
        {/* Arcs */}
        {gs.map((st,i)=>{const nx=gs[(i+1)%gs.length];return<motion.path key={`a${i}`} d={`M${st.cx},${st.cy} Q50,${Math.min(st.cy,nx.cy)-14} ${nx.cx},${nx.cy}`} fill="none" stroke={c.warm} strokeWidth={i===a?"0.8":"0.2"} opacity={i===a?0.6:0.08} strokeDasharray="3 2" animate={i===a?{strokeDashoffset:[0,-5]}:{}} transition={{duration:1.2,repeat:Infinity,ease:"linear"}}/>})}
        {[0,1].map(p=><motion.circle key={`p${p}`} r="0.9" fill={c.warm} opacity="0.55" animate={{cx:[gs[a].cx,50,gs[(a+1)%gs.length].cx],cy:[gs[a].cy,Math.min(gs[a].cy,gs[(a+1)%gs.length].cy)-14,gs[(a+1)%gs.length].cy]}} transition={{duration:2.5,delay:p*1.2,repeat:Infinity,ease:"linear"}}/>)}
        {gs.map((st,i)=>(<g key={st.country}>{i===a&&<motion.circle cx={st.cx} cy={st.cy} r="4" fill={c.warm} opacity="0.15" animate={{r:[4,8,4],opacity:[0.15,0.3,0.15]}} transition={{duration:2,repeat:Infinity}}/>}<circle cx={st.cx} cy={st.cy} r={i===a?3:1.5} fill={i===a?c.warm:"#B0A894"} style={{cursor:"pointer",transition:"all 0.4s"}} onClick={()=>setA(i)}/></g>))}
        <defs><radialGradient id="gG" cx="38%" cy="33%"><stop offset="0%" stopColor="#F8F6F1" stopOpacity="0.02"/><stop offset="100%" stopColor="#E0DAC8" stopOpacity="0.12"/></radialGradient></defs>
      </svg></div>
      <div className="globeC">
        <AnimatePresence mode="wait"><motion.div key={a} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}} transition={{duration:0.3}} className="globeStory">
          <div className="globeCtry"><span style={{fontSize:"18px"}}>{s.flag}</span><span className="globeCtryN">{s.country}</span></div>
          <p className="serif globeQ">&ldquo;{s.quote}&rdquo;</p>
          <p className="globeNm">{s.name}</p>
          <div className="globeL"><div className="globeLA"><Image src="/laura-avatar.png" alt="Laura" fill sizes="22px" style={{objectFit:"cover"}}/></div><p className="globeLT">{s.laura}</p></div>
        </motion.div></AnimatePresence>
        <div className="globeNav"><div className="globeDs">{gs.map((_,i)=><button key={i} className={`globeD${i===a?" globeDA":""}`} onClick={()=>setA(i)}/>)}</div><div className="globeAs"><button className="globeA" onClick={()=>setA(p=>(p-1+5)%5)}><ChevronLeft size={15}/></button><button className="globeA" onClick={()=>setA(p=>(p+1)%5)}><ChevronRight size={15}/></button></div></div>
      </div>
    </div>
  </div></section>);}

/* Terminal */
function SDKTerminal(){const lines=useMemo(()=>['$ npm install @omela/laura-sdk','','  import { Laura } from "@omela/laura-sdk";','','  const laura = new Laura({','    apiKey: process.env.OMELA_KEY,','    region: "eu-west-2"','  });','','  const session = await laura.navigate({','    userId: "patient_4102",','    lang: "fr",','    concern: "prescription renewal"','  });','','  // Laura found 2 practices, drafted request','  Done in 1.1s'],[]);const [vl,setVl]=useState(0);const [ci,setCi]=useState(0);useEffect(()=>{if(vl>=lines.length){const t=setTimeout(()=>{setVl(0);setCi(0);},3000);return()=>clearTimeout(t);}const line=lines[vl];if(ci<line.length){const t=setTimeout(()=>setCi(p=>p+1),line.startsWith("  //")?36:18);return()=>clearTimeout(t);}else{const t=setTimeout(()=>{setVl(p=>p+1);setCi(0);},line===""?50:140);return()=>clearTimeout(t);}},[vl,ci,lines]);return<div className="trm"><div className="trmT"><div className="trmD"><span/><span/><span/></div><span className="trmTi">Laura SDK</span><Soon/></div><div className="trmB">{lines.slice(0,vl+1).map((line,i)=>{const a2=i===vl;return<div key={i} className="trmL" style={{color:line.startsWith("  Done")||line.startsWith("  //")?"#4ADE80":line.startsWith("$")?"#E2E8F0":"#94A3B8"}}>{a2?line.slice(0,ci):line}{a2&&<span className="trmC">|</span>}</div>;})}</div></div>;}

function SuccessModal({open,onClose}:{open:boolean;onClose:()=>void}){return<AnimatePresence>{open&&<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose} className="modO"><motion.div initial={{opacity:0,y:14,scale:0.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:10}} onClick={e=>e.stopPropagation()} className="modB"><h3 className="serif modTi">You are on the list.</h3><p className="modBd">Laura will reach out as access opens.</p><div style={{marginTop:"14px",display:"flex",gap:"8px",flexWrap:"wrap"}}><a href="https://x.com/joinomela" target="_blank" rel="noreferrer" className="btnP">Follow @joinomela</a><button type="button" className="btnS" onClick={onClose}>Close</button></div></motion.div></motion.div>}</AnimatePresence>;}

export default function Page(){
  const [role,setRole]=useState<Role>("patient");const [email,setEmail]=useState("");const [website,setWebsite]=useState("");const [agreed,setAgreed]=useState(false);const [submitting,setSubmitting]=useState(false);const [success,setSuccess]=useState("");const [error,setError]=useState("");const [modalOpen,setModalOpen]=useState(false);
  async function handleSubmit(e:React.FormEvent<HTMLFormElement>){e.preventDefault();if(!agreed)return;setSubmitting(true);setSuccess("");setError("");try{const res=await fetch("/api/waitlist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,role,website,source:"landing-page",marketingOptIn:false})});const data=await res.json();if(!res.ok){setError(data.error||"Something went wrong.");return;}setSuccess(data.message||"You are in.");setEmail("");setRole("patient");setWebsite("");setAgreed(false);setModalOpen(true);}catch{setError("Something went wrong.");}finally{setSubmitting(false);}}

  return(<><style>{FONT}</style><style>{CSS}</style>
    <SuccessModal open={modalOpen} onClose={()=>setModalOpen(false)}/>
    <div className="wrap">
      <StatusBar/>
      <motion.nav initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} className="nav"><div className="container navR">
        <Link href="/" className="navBr"><div className="navLo"><Image src="/omela-logo-mark.png" alt="Omela" width={34} height={34} style={{width:"100%",height:"100%",objectFit:"contain"}}/></div><div><div className="navNm">Omela</div><div className="navSb">POWERED BY LAURA</div></div></Link>
        <div className="navLks"><a href="#how" className="navLk">How it works</a><a href="#pricing" className="navLk">Pricing</a><Link href="/how-laura-helps" className="navLk">Use cases</Link></div>
        <a href="#waitlist" className="btnP navCt">Join waitlist <ArrowRight size={13}/></a>
      </div></motion.nav>

      <section className="heroSec"><div className="container">
        <div className="heroTxt">
          <FI><h1 className="serif heroTi">Getting care<br/><span className="heroAc">should not be this hard.</span></h1></FI>
          <FI delay={0.05}><div className="heroBd"><Typewriter/></div></FI>
          <FI delay={0.1}><p className="heroSub">Laura is a care navigation platform that finds doctors, submits prescription requests, explains referral letters, and prepares bilingual clinical notes. She does not just answer questions. She handles the work.</p></FI>
          <FI delay={0.14}><div className="heroBt"><Link href="/demo" className="btnP">See Laura in action <ArrowRight size={14}/></Link><a href="#waitlist" className="btnS">Join waitlist</a></div></FI>
        </div>
        <div className="heroPh"><PhoneMockup/></div>
      </div></section>

      <section id="how" className="sec"><div className="container">
        <FI><div className="shW"><h2 className="serif shT">Laura does not just answer health questions.<br/>She handles the work.</h2></div></FI>
        <div className="capGrid">{[
          {icon:<Search size={22}/>,title:"Finds doctors and submits requests",body:"Laura searches practices near you, checks availability, and submits registration or callback requests on your behalf."},
          {icon:<FileCheck size={22}/>,title:"Drafts prescriptions and tracks refills",body:"Laura prepares your repeat prescription request, submits it to your practice portal, and reminds you before you run out."},
          {icon:<Languages size={22}/>,title:"Prepares bilingual clinical notes",body:"Laura captures your symptoms in your language, translates them into a structured clinical note, and sends it to the receptionist."},
        ].map((item,i)=>(<FI key={item.title} delay={i*0.07}><div className="capCard"><motion.div className="capIc" animate={{y:[0,-4,0]}} transition={{duration:3+i*0.5,repeat:Infinity,ease:"easeInOut"}}>{item.icon}</motion.div><h3 className="capTi">{item.title}</h3><p className="capBd">{item.body}</p></div></FI>))}</div>
        <FI delay={0.2}><div style={{textAlign:"center",marginTop:"22px"}}><Link href="/how-laura-helps" className="seeAll">See all care scenarios <ArrowRight size={14}/></Link></div></FI>
      </div></section>

      <section className="sec" style={{paddingTop:0}}><div className="container">
        <FI><div className="shW"><h2 className="serif shT">A chatbot answers questions.<br/>Laura handles the work.</h2></div></FI>
        <FI><div className="baGrid">
          <div className="baCard baBf"><h3 className="baTi">Without Laura</h3>{["You call the GP. Busy signal. Try again tomorrow.","You email the pharmacy. No reply for three days.","You get a referral full of medical jargon with no guidance.","You arrive in a new city with zero medical contacts.","You try to explain symptoms in a language that is not yours."].map(item=><div key={item} className="baIt"><span className="baX">&#10007;</span>{item}</div>)}</div>
          <div className="baCard baAf"><h3 className="baTi">With Laura</h3>{["Laura submits a structured callback request to your GP overnight.","Laura drafts your refill, submits it, and tracks the status for you.","Laura translates your referral into plain language with appointment prep.","Laura finds 3 accepting practices near you and requests registration.","Laura prepares a bilingual clinical note and sends it to the practice."].map(item=><div key={item} className="baIt"><Chk/><span>{item}</span></div>)}</div>
        </div></FI>
      </div></section>

      <GlobeSection/>

      <section className="sec"><div className="container">
        <FI><div className="shW"><h2 className="serif shT">Who Laura is for.</h2></div></FI>
        <div className="audGrid">{[
          {icon:<Users size={22}/>,title:"People",desc:"Laura acts on your behalf. She finds your next GP, drafts your prescription request, explains your hospital letter, and submits your callback. You do not lift the phone.",color:c.accent},
          {icon:<Building2 size={22}/>,title:"Care teams",desc:"Laura intercepts and structures incoming patient demand before it hits reception. She triages by urgency, captures symptoms in structured format, and routes callbacks intelligently.",color:c.green},
          {icon:<Code2 size={22}/>,title:"Developers",desc:"Embed Laura's care-navigation engine into your product via API. Provider search, urgency assessment, prescription routing, and multilingual intake.",color:c.warm,soon:true},
        ].map((item,i)=>(<FI key={item.title} delay={i*0.07}><div className="audCard"><motion.div className="audIc" style={{background:`${item.color}10`,color:item.color}} animate={{rotate:[0,3,-3,0]}} transition={{duration:4+i,repeat:Infinity,ease:"easeInOut"}}>{item.icon}</motion.div><div style={{display:"flex",alignItems:"center",gap:"6px"}}><h3 className="audTi">{item.title}</h3>{item.soon&&<Soon/>}</div><p className="audBd">{item.desc}</p></div></FI>))}</div>
      </div></section>

      <section className="sec" style={{paddingTop:0}}><div className="container"><FI><div className="glC"><div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",flexWrap:"wrap"}}><h2 className="serif glT">Laura speaks your language.</h2><Soon/></div><p className="glB">40+ languages. Laura responds in the language you start with and generates bilingual clinical notes for the practice.</p><div className="glF">{["\u{1F1EC}\u{1F1E7} UK","\u{1F1FA}\u{1F1F8} US","\u{1F1EB}\u{1F1F7} France","\u{1F1F3}\u{1F1EC} Nigeria","\u{1F1EE}\u{1F1F3} India","\u{1F30D} 40+ more"].map(f=><span key={f} className="glFi">{f}</span>)}</div></div></FI></div></section>

      <section className="secDk"><div className="container">
        <FI><div className="shW"><h2 className="serif shT" style={{color:"#fff"}}>Build with Laura.</h2><p className="shB" style={{color:"rgba(255,255,255,0.5)"}}>Embed care navigation, provider routing, and multilingual intake into your product.</p></div></FI>
        <div className="g2" style={{marginTop:"28px"}}><FI><SDKTerminal/></FI><FI delay={0.08}><div className="dkC"><h3 className="dkCT">Infrastructure for health apps</h3><p className="dkCB">Add Laura to patient portals, telehealth platforms, or internal tooling.</p><div className="ftL" style={{marginTop:"14px"}}>{["Provider search and availability API","Urgency assessment engine","Prescription and callback routing","Multilingual intake with bilingual notes"].map(f=><div key={f} className="ftR" style={{color:"rgba(255,255,255,0.7)"}}><Chk dark/><span>{f}</span></div>)}</div></div></FI></div>
      </div></section>

      <section id="pricing" className="sec"><div className="container">
        <FI><div className="shW"><h2 className="serif shT">Credits-based pricing.</h2><p className="shB">Every action Laura takes uses credits. Start free. Pay as you grow.</p></div></FI>
        <div className="prGrid">{[
          {name:"People",price:"50 free credits",period:"then 4.99 GBP / 200 credits",desc:"Provider search, prescription drafts, urgency checks, referral guidance.",cta:"Join waitlist",hl:false},
          {name:"Care Teams",price:"From 2,500 GBP",period:"/mo",desc:"Structured intake, urgency triage, multilingual access, callback routing.",cta:"Request demo",hl:true,badge:"Best for practices"},
          {name:"Developer",price:"Custom",period:"usage-based",desc:"API access to Laura's care-navigation engine.",cta:"Talk to us",hl:false,soon:true},
        ].map((p,i)=>(<FI key={p.name} delay={i*0.06}><div className={`prCard${p.hl?" prCardDk":""}`}>
          {p.badge&&<div className="prBg">{p.badge}</div>}
          <div style={{display:"flex",alignItems:"center",gap:"6px"}}><span className="prNm">{p.name}</span>{p.soon&&<Soon/>}</div>
          <div className="prPr"><span className="serif prAmt">{p.price}</span></div>
          <p className="prPd2">{p.period}</p>
          <p className="prDs">{p.desc}</p>
          <a href="#waitlist" className={`btnP prBt${p.hl?" prBtW":""}`}>{p.cta}</a>
        </div></FI>))}</div>
      </div></section>

      <section id="waitlist" className="sec"><div className="container"><FI><div className="wlC">
        <div className="shW"><h2 className="serif shT">Join the waitlist.</h2><p className="shB">We are onboarding in batches. Early members receive 50 free credits.</p></div>
        <form className="wlF" onSubmit={handleSubmit}>
          <input className="inp" type="email" placeholder="Your email" value={email} onChange={e=>setEmail(e.target.value)} required autoComplete="email"/>
          <select className="inp" value={role} onChange={e=>setRole(e.target.value as Role)}><option value="patient">I need care access</option><option value="provider">I run a practice</option><option value="developer">I am a developer</option></select>
          <input type="text" name="website" value={website} onChange={e=>setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{position:"absolute",left:"-9999px",opacity:0,pointerEvents:"none",height:0,width:0}}/>
          <button type="submit" className="btnP wlBt" disabled={submitting||!agreed}>{submitting?"Submitting...":"Join waitlist"}</button>
        </form>
        <label className="pvL"><input type="checkbox" checked={agreed} onChange={e=>setAgreed(e.target.checked)} required className="pvC"/><span>I agree to the <Link href="/privacy" className="pvLk">Privacy Notice</Link> and <Link href="/terms" className="pvLk">Terms</Link>.</span></label>
        <div className="wlBadges"><span className="wlBadge"><Shield size={11}/>UK GDPR Compliant</span><span className="wlBadge"><Shield size={11}/>ICO Registered</span></div>
        {success&&<div className="fmOk">{success}</div>}{error&&<div className="fmEr">{error}</div>}
      </div></FI></div></section>

      <footer className="ft"><div className="container ftIn">
        <div className="ftTop">
          <div><Link href="/" className="ftBr"><div className="navLo ftLoW"><Image src="/omela-logo-mark.png" alt="Omela" width={26} height={26} style={{width:"100%",height:"100%",objectFit:"contain"}}/></div><div><div className="ftBrN">Omela</div><div className="ftBrS">POWERED BY LAURA</div></div></Link></div>
          <div className="ftCols">
            <div className="ftCol"><div className="ftColT">Product</div><Link href="/demo" className="ftLk">Try Laura</Link><Link href="/how-laura-helps" className="ftLk">Use cases</Link><Link href="/quiz" className="ftLk">Health Quiz</Link><Link href="/status" className="ftLk">Status</Link></div>
            <div className="ftCol"><div className="ftColT">Legal</div><Link href="/privacy" className="ftLk">Privacy</Link><Link href="/terms" className="ftLk">Terms</Link><a href="mailto:notice@omela.ai" className="ftLk">Contact</a></div>
          </div>
        </div>
        <div className="ftBtm"><p>&copy; 2026 Omela. Laura is a care navigation platform, not a medical professional. For emergencies, call 999 or 911.</p></div>
      </div></footer>
    </div>
  </>);
}

const CSS=`
*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}html,body{max-width:100%;overflow-x:clip}
body{background:${c.bg};color:${c.text};font-family:'DM Sans',-apple-system,sans-serif;-webkit-font-smoothing:antialiased;font-size:16px}
a{color:inherit;text-decoration:none}button,input,select{font-family:inherit}::selection{background:${c.accent};color:#fff}
@keyframes blink{0%,50%{opacity:1}50.01%,100%{opacity:0}}@keyframes tDot{0%,80%{opacity:0.3;transform:scale(0.8)}40%{opacity:1;transform:scale(1)}}
.serif{font-family:'Instrument Serif',Georgia,serif}.wrap{width:100%;overflow-x:clip}.container{max-width:1100px;margin:0 auto;padding:0 20px}
.sec{padding:60px 0}.secDk{padding:60px 0;background:${c.dark};color:#fff}
.soon{display:inline-flex;padding:3px 8px;border-radius:6px;background:rgba(37,99,235,0.06);color:${c.accent};font-size:10px;font-weight:700;border:1px solid rgba(37,99,235,0.1)}
.stBar{background:${c.greenSoft};border-bottom:1px solid rgba(34,197,94,0.12);padding:6px 0}.stIn{display:flex;align-items:center;gap:7px}.stDot{width:6px;height:6px;border-radius:999px;background:${c.green};display:inline-block;box-shadow:0 0 5px ${c.green}44}.stLbl{font-size:12px;font-weight:700;color:${c.greenDk}}.stLnk{font-size:11px;font-weight:700;color:${c.accent};text-decoration:underline;text-underline-offset:2px}
.chk{width:18px;height:18px;border-radius:999px;background:${c.greenSoft};color:${c.green};display:inline-flex;align-items:center;justify-content:center;font-size:9px;font-weight:800;flex-shrink:0;margin-top:2px}.chkD{background:rgba(34,197,94,0.12);color:#4ADE80}
.shW{text-align:center;max-width:700px;margin:0 auto}.shT{font-size:clamp(24px,5vw,46px);line-height:1.1;letter-spacing:-0.04em}.shB{font-size:clamp(14px,2.5vw,16px);line-height:1.75;margin-top:10px;max-width:500px;margin-left:auto;margin-right:auto;color:${c.sub}}
.btnP{display:inline-flex;align-items:center;justify-content:center;gap:7px;background:${c.dark};color:#fff;border:none;border-radius:999px;padding:13px 22px;font-size:14px;font-weight:700;cursor:pointer;transition:all 0.25s;white-space:nowrap}.btnP:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 8px 24px rgba(0,0,0,0.12)}.btnP:disabled{opacity:0.5;cursor:not-allowed;transform:none}
.btnS{display:inline-flex;align-items:center;justify-content:center;gap:7px;background:rgba(255,255,255,0.85);color:${c.text};border:1px solid ${c.border};border-radius:999px;padding:13px 22px;font-size:14px;font-weight:700;cursor:pointer;transition:all 0.25s;white-space:nowrap}.btnS:hover{background:#fff}
.nav{position:sticky;top:0;z-index:100;background:rgba(248,246,241,0.9);backdrop-filter:blur(20px);border-bottom:1px solid rgba(227,221,210,0.5)}.navR{display:flex;align-items:center;justify-content:space-between;gap:8px;height:56px}.navBr{display:flex;align-items:center;gap:7px;flex-shrink:0}.navLo{width:32px;height:32px;border-radius:9px;overflow:hidden;flex-shrink:0;box-shadow:0 2px 6px rgba(0,0,0,0.05)}.navNm{font-size:14px;font-weight:800;letter-spacing:-0.03em}.navSb{font-size:8px;font-weight:800;letter-spacing:0.1em;color:${c.accent};margin-top:1px}.navLks{display:none;align-items:center;gap:20px}.navLk{font-size:13px;font-weight:600;color:${c.sub}}.navCt{padding:9px 16px!important;font-size:12px!important;flex-shrink:0}
.heroSec{padding:44px 0 16px}.heroTxt{max-width:540px}.heroTi{font-size:clamp(34px,8.5vw,76px);line-height:0.96;letter-spacing:-0.05em}.heroAc{color:${c.accent};font-style:italic}.tw{font-size:clamp(16px,2.8vw,20px);line-height:1.5;color:${c.text};font-weight:600;min-height:1.4em;display:block;margin-top:14px}.twC{color:${c.accent};animation:blink 1s step-end infinite;font-weight:300}.heroSub{font-size:clamp(14px,2.2vw,16px);line-height:1.72;color:${c.sub};max-width:460px;margin-top:8px}.heroBd{min-height:44px}.heroBt{display:flex;flex-direction:column;gap:8px;margin-top:20px}.heroBt .btnP,.heroBt .btnS{width:100%;text-align:center}
.heroPh{margin-top:28px;width:100%;display:flex;justify-content:center;position:relative}
.phW{width:100%;max-width:220px;position:relative}.phGlow{position:absolute;inset:-28px;border-radius:999px;background:radial-gradient(circle,rgba(37,99,235,0.06),transparent 70%);z-index:0}.phF{position:relative;z-index:1}.phB{background:#1A1A1E;border-radius:30px;padding:4px;box-shadow:0 16px 36px rgba(0,0,0,0.12)}.phDI{width:60px;height:16px;border-radius:999px;background:#000;margin:0 auto 2px}.phS{background:#FAFAFA;border-radius:27px;overflow:hidden}
.phH{display:flex;align-items:center;gap:4px;padding:5px 7px;background:#fff;border-bottom:1px solid #f0f0f0}.phAv{position:relative;width:20px;height:20px;border-radius:999px;overflow:hidden;flex-shrink:0;border:1px solid #fff}.phN{display:flex;align-items:center;gap:2px;font-size:9px;font-weight:700}.phOn{display:flex;align-items:center;gap:2px;font-size:7px;color:${c.green};font-weight:600}.phOnD{width:3px;height:3px;border-radius:999px;background:${c.green};display:inline-block}
.phLang{display:flex;align-items:center;justify-content:center;gap:3px;padding:3px 0;background:#F7F7FB;font-size:8px;font-weight:700;color:${c.accent}}
.phBdy{display:flex;flex-direction:column;gap:2px;padding:5px 4px;height:310px;overflow:hidden;justify-content:flex-end;background:linear-gradient(180deg,#F5F5F0,#ECE5DA)}
.phR{display:flex}.phRR{justify-content:flex-end}.phRL{justify-content:flex-start}
.phBb{max-width:88%;padding:5px 7px;font-size:8px;line-height:1.38;word-break:break-word}.phBbU{background:#E7FFDB;color:#111;border-radius:8px 8px 2px 8px}.phBbL{background:#fff;color:#111;border-radius:8px 8px 8px 2px}.phMt{display:flex;justify-content:flex-end;margin-top:1px}
.phAct{width:90%;margin:2px auto;padding:5px 7px;background:${c.accentSoft};border:1px solid rgba(37,99,235,0.1);border-radius:7px;font-size:7.5px;font-weight:700;color:${c.accent};text-align:center}
.phTy{display:flex;gap:2px;padding:7px 10px}.phTy span{width:4px;height:4px;border-radius:999px;background:${c.muted};animation:tDot 1.2s infinite}.phTy span:nth-child(2){animation-delay:0.2s}.phTy span:nth-child(3){animation-delay:0.4s}
.phCo{padding:3px 4px 6px;display:flex;align-items:center;gap:3px;background:#F0EBE3}.phCoF{flex:1;height:18px;border-radius:999px;background:#fff;display:flex;align-items:center;padding:0 6px}.phCoT{color:${c.muted};font-size:7px}.phCoM{width:18px;height:18px;border-radius:999px;background:#25D366;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.capGrid{display:grid;grid-template-columns:1fr;gap:12px;margin-top:28px}.capCard{padding:24px;border:1px solid ${c.border};border-radius:20px;background:rgba(255,255,255,0.92);transition:all 0.25s}.capCard:hover{box-shadow:0 12px 32px rgba(0,0,0,0.05);transform:translateY(-2px)}.capIc{width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;background:${c.accentSoft};color:${c.accent};border:1px solid rgba(37,99,235,0.08);margin-bottom:12px}.capTi{font-size:17px;font-weight:800;letter-spacing:-0.03em}.capBd{font-size:13px;line-height:1.68;color:${c.sub};margin-top:4px}
.seeAll{display:inline-flex;align-items:center;gap:5px;font-size:14px;font-weight:700;color:${c.accent}}
.baGrid{display:grid;grid-template-columns:1fr;gap:12px;margin-top:28px}.baCard{border-radius:20px;padding:24px;border:1px solid ${c.border}}.baBf{background:rgba(254,242,242,0.3)}.baAf{background:rgba(236,253,243,0.3)}.baTi{font-size:17px;font-weight:800;margin-bottom:14px}.baIt{display:flex;align-items:flex-start;gap:7px;font-size:13px;line-height:1.6;color:${c.sub};margin-bottom:8px}.baX{color:#EF4444;font-weight:800;flex-shrink:0;margin-top:1px}
.globeSec{padding:68px 0;background:linear-gradient(180deg,${c.bg},#EDE8DD,${c.bg})}.globeW{display:flex;flex-direction:column;align-items:center;gap:24px;margin-top:28px}.globeV{width:100%;max-width:340px;aspect-ratio:1;margin:0 auto}.globeSvg{width:100%;height:100%}.globeC{width:100%;max-width:480px;text-align:center}.globeStory{min-height:180px}.globeCtry{display:flex;align-items:center;justify-content:center;gap:6px;margin-bottom:8px}.globeCtryN{font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;color:${c.muted};background:rgba(255,255,255,0.8);padding:3px 9px;border-radius:5px}.globeQ{font-size:clamp(15px,3.2vw,20px);line-height:1.35;letter-spacing:-0.02em;font-style:italic}.globeNm{font-size:11px;color:${c.muted};font-weight:600;margin-top:6px;font-style:italic}.globeL{display:flex;align-items:flex-start;gap:7px;margin-top:12px;background:rgba(255,255,255,0.8);border:1px solid ${c.border};border-radius:12px;padding:10px 12px;text-align:left}.globeLA{position:relative;width:22px;height:22px;border-radius:999px;overflow:hidden;flex-shrink:0;border:1px solid #fff}.globeLT{font-size:12px;line-height:1.6;color:${c.sub}}.globeNav{display:flex;align-items:center;justify-content:center;gap:14px;margin-top:16px}.globeDs{display:flex;gap:4px}.globeD{width:6px;height:6px;border-radius:999px;background:${c.border};border:none;cursor:pointer;transition:all 0.3s;padding:0}.globeDA{background:${c.warm};width:18px}.globeAs{display:flex;gap:4px}.globeA{width:30px;height:30px;border-radius:999px;background:rgba(255,255,255,0.9);border:1px solid ${c.border};display:flex;align-items:center;justify-content:center;cursor:pointer;color:${c.sub}}
.audGrid{display:grid;grid-template-columns:1fr;gap:12px;margin-top:28px}.audCard{padding:24px;border:1px solid ${c.border};border-radius:20px;background:rgba(255,255,255,0.92);transition:all 0.25s}.audCard:hover{box-shadow:0 8px 24px rgba(0,0,0,0.04)}.audIc{width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:12px;border:1px solid rgba(0,0,0,0.04)}.audTi{font-size:18px;font-weight:800;letter-spacing:-0.03em}.audBd{font-size:13px;line-height:1.72;color:${c.sub};margin-top:6px}
.g2{display:grid;grid-template-columns:1fr;gap:16px}
.dkC{background:linear-gradient(180deg,rgba(16,19,24,0.98),rgba(13,15,20,0.98));border:1px solid ${c.borderDk};border-radius:20px;padding:22px}.dkCT{font-size:clamp(17px,3vw,22px);font-weight:800;color:#fff}.dkCB{margin-top:6px;color:rgba(255,255,255,0.5);font-size:13px;line-height:1.8}
.ftL{display:flex;flex-direction:column;gap:5px;margin-top:10px}.ftR{display:flex;align-items:flex-start;gap:6px;font-size:13px;line-height:1.5;color:${c.sub}}
.glC{border:1px solid ${c.border};background:rgba(255,255,255,0.9);border-radius:20px;padding:22px;text-align:center}.glT{font-size:clamp(22px,4.5vw,38px);letter-spacing:-0.04em;display:inline}.glB{margin-top:6px;color:${c.sub};font-size:14px;line-height:1.7;max-width:440px;margin-left:auto;margin-right:auto}.glF{display:flex;flex-wrap:wrap;justify-content:center;gap:5px;margin-top:14px}.glFi{padding:5px 10px;border-radius:999px;border:1px solid ${c.border};background:rgba(255,255,255,0.8);font-size:11px;font-weight:600;color:${c.sub}}
.trm{background:#07080B;border:1px solid #1F2330;border-radius:14px;overflow:hidden}.trmT{display:flex;align-items:center;gap:6px;padding:8px 11px;border-bottom:1px solid #1B1F2B;background:#0E1118}.trmD{display:flex;gap:4px}.trmD span{width:7px;height:7px;border-radius:999px;display:inline-block}.trmD span:nth-child(1){background:#FF5F57}.trmD span:nth-child(2){background:#FEBC2E}.trmD span:nth-child(3){background:#28C840}.trmTi{font-size:9px;color:#6B7280;font-weight:700;flex:1}.trmB{padding:10px;height:280px;overflow:hidden}.trmL{white-space:pre-wrap;word-break:break-all;font-size:10px;line-height:1.7;font-family:'SF Mono',ui-monospace,Menlo,Consolas,monospace}.trmC{color:#60A5FA;animation:blink 0.8s step-end infinite}
.prGrid{display:grid;grid-template-columns:1fr;gap:12px;margin-top:28px}.prCard{background:rgba(255,255,255,0.92);border:1px solid ${c.border};border-radius:20px;padding:24px;position:relative;transition:all 0.25s}.prCard:hover{box-shadow:0 8px 24px rgba(0,0,0,0.04)}.prCardDk{background:linear-gradient(180deg,#111318,#0D0F14)!important;border:1px solid ${c.borderDk}!important;color:#fff!important}.prBg{position:absolute;top:12px;right:12px;border-radius:6px;padding:3px 8px;background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.6);font-size:9px;font-weight:700}.prNm{font-size:15px;font-weight:800}.prPr{margin-top:8px}.prAmt{font-size:clamp(24px,5vw,36px);letter-spacing:-0.04em}.prPd2{font-size:12px;color:${c.muted};margin-top:2px}.prCardDk .prPd2{color:rgba(255,255,255,0.35)}.prDs{margin-top:8px;font-size:13px;line-height:1.68;color:${c.sub}}.prCardDk .prDs{color:rgba(255,255,255,0.5)}.prBt{margin-top:16px;width:100%}.prBtW{background:#fff!important;color:${c.dark}!important}
.wlC{background:rgba(255,255,255,0.92);border:1px solid ${c.border};border-radius:20px;padding:22px;max-width:720px;margin:0 auto}.wlF{display:grid;grid-template-columns:1fr;gap:8px;margin-top:14px}.wlBt{height:48px;width:100%}.inp{width:100%;height:48px;border-radius:12px;border:1px solid ${c.border};background:#fff;padding:0 14px;font-size:14px;color:${c.text};outline:none}.inp:focus{border-color:${c.accent};box-shadow:0 0 0 3px rgba(37,99,235,0.05)}
.pvL{display:flex;align-items:flex-start;gap:6px;margin-top:8px;color:${c.sub};font-size:11px;line-height:1.6;cursor:pointer;max-width:480px;margin-left:auto;margin-right:auto}.pvC{margin-top:1px;width:14px;height:14px;accent-color:${c.accent};flex-shrink:0}.pvLk{color:${c.text};font-weight:700;text-decoration:underline;text-underline-offset:2px}
.wlBadges{display:flex;gap:6px;justify-content:center;margin-top:12px;flex-wrap:wrap}.wlBadge{display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:8px;background:rgba(37,99,235,0.04);border:1px solid rgba(37,99,235,0.08);color:${c.accent};font-size:10px;font-weight:700}
.fmOk{margin-top:8px;background:${c.greenSoft};color:${c.greenDk};border-radius:10px;padding:10px;text-align:center;font-size:13px;font-weight:600}.fmEr{margin-top:8px;background:#FFF7F7;color:#B91C1C;border-radius:10px;padding:10px;text-align:center;font-size:13px;font-weight:600}
.modO{position:fixed;inset:0;z-index:220;background:rgba(9,10,13,0.4);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;padding:14px}.modB{width:100%;max-width:380px;background:rgba(255,255,255,0.96);border:1px solid ${c.border};border-radius:20px;padding:22px;box-shadow:0 24px 56px rgba(0,0,0,0.14)}.modTi{font-size:clamp(20px,4vw,28px);letter-spacing:-0.04em}.modBd{margin-top:4px;color:${c.sub};font-size:13px;line-height:1.7}
.ft{background:${c.dark};padding:32px 0 20px;color:#fff}.ftIn{}.ftTop{display:flex;flex-direction:column;gap:20px}.ftBr{display:flex;align-items:center;gap:7px;text-decoration:none;color:#fff}.ftLoW{background:rgba(255,255,255,0.12);border-radius:9px;padding:2px}.ftBrN{font-size:13px;font-weight:800}.ftBrS{font-size:8px;font-weight:800;letter-spacing:0.1em;color:${c.accent};margin-top:1px}.ftCols{display:flex;gap:32px}.ftCol{display:flex;flex-direction:column;gap:6px}.ftColT{font-size:10px;font-weight:800;color:rgba(255,255,255,0.3);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:2px}.ftLk{font-size:12px;color:rgba(255,255,255,0.5);font-weight:500;transition:color 0.2s}.ftLk:hover{color:#fff}.ftBtm{border-top:1px solid rgba(255,255,255,0.06);padding-top:14px;margin-top:20px;font-size:10px;color:rgba(255,255,255,0.2)}
@media(min-width:640px){.container{padding:0 24px}.sec{padding:72px 0}.secDk{padding:72px 0}.navR{height:64px}.navLks{display:flex}.heroBt{flex-direction:row}.heroBt .btnP,.heroBt .btnS{width:auto}.capGrid{grid-template-columns:repeat(3,1fr)}.baGrid{grid-template-columns:repeat(2,1fr)}.audGrid{grid-template-columns:repeat(3,1fr)}.prGrid{grid-template-columns:repeat(3,1fr)}.g2{grid-template-columns:repeat(2,1fr);gap:20px}.wlF{grid-template-columns:1.2fr 0.8fr auto}.wlBt{width:auto}.wlC{padding:28px}.phW{max-width:240px}.ftTop{flex-direction:row;justify-content:space-between}.trmB{height:300px}.globeW{flex-direction:row;align-items:center;gap:36px}.globeV{max-width:320px;flex-shrink:0}.globeC{text-align:left}.globeCtry{justify-content:flex-start}.globeQ{text-align:left}.globeNm{text-align:left}}
@media(min-width:960px){.container{padding:0 36px}.sec{padding:84px 0}.secDk{padding:84px 0}.navR{height:72px}.heroSec{padding:56px 0 28px}.heroSec .container{display:grid;grid-template-columns:1.1fr 0.9fr;gap:0 40px;align-items:start}.heroTxt{grid-column:1}.heroPh{grid-column:2;margin-top:0;align-self:start}.phW{max-width:260px}.phB{border-radius:36px;padding:5px}.phS{border-radius:32px}.phBdy{height:340px}.trmB{height:320px}.globeV{max-width:380px}}
@media(min-width:1100px){.heroTi{font-size:clamp(56px,7vw,76px)}}
`;
