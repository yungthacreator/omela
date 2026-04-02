"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useCallback, type ReactNode } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowRight, Mic, ChevronLeft, ChevronRight } from "lucide-react";
const FONT=`@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');`;
const c={bg:"#F8F6F1",card:"#fff",dark:"#08090C",text:"#111214",sub:"#4A4F5C",muted:"#888E9C",accent:"#2563EB",accentSoft:"#ECF2FF",border:"#E3DDD2",borderDk:"#222633",green:"#22C55E",greenSoft:"#ECFDF3",greenDk:"#15803D",warm:"#C9956B"};
type Role="patient"|"provider"|"developer";
function FI({children,delay=0,className=""}:{children:ReactNode;delay?:number;className?:string}){const ref=useRef<HTMLDivElement>(null);const v=useInView(ref,{once:true,amount:0.05});return<motion.div ref={ref} initial={{opacity:0,y:18}} animate={v?{opacity:1,y:0}:{}} transition={{duration:0.6,delay,ease:[0.22,1,0.36,1]}} className={className}>{children}</motion.div>;}
function Tag({children}:{children:ReactNode}){return<div className="tag">{children}</div>;}
function CS(){return<span className="cs"><span className="csS"/>Soon</span>;}
function Chk({dark=false}:{dark?:boolean}){return<motion.span initial={{scale:0}} whileInView={{scale:1}} viewport={{once:true}} transition={{type:"spring",stiffness:400,damping:15}} className={`chk${dark?" chkD":""}`}>&#10003;</motion.span>;}

/* Typewriter */
function Typewriter(){const lines=useMemo(()=>["You sit on hold for 45 minutes.","You chase prescriptions for days.","You get a letter you do not understand.","You move cities with no doctor."],[]);const [li,setLi]=useState(0);const [ci,setCi]=useState(0);const [del,setDel]=useState(false);const [pause,setPause]=useState(false);useEffect(()=>{if(pause){const t=setTimeout(()=>{setPause(false);setDel(true);},1400);return()=>clearTimeout(t);}const cur=lines[li];if(!del){if(ci<cur.length){const t=setTimeout(()=>setCi(p=>p+1),28);return()=>clearTimeout(t);}else setPause(true);}else{if(ci>0){const t=setTimeout(()=>setCi(p=>p-1),14);return()=>clearTimeout(t);}else{setDel(false);setLi(p=>(p+1)%lines.length);}}},[li,ci,del,pause,lines]);return<span className="tw">{lines[li].slice(0,ci)}<span className="twC">|</span></span>;}

/* Status */
function StatusBar(){return<div className="stBar"><div className="container stIn"><motion.span animate={{scale:[1,1.3,1]}} transition={{duration:2,repeat:Infinity}} className="stDot"/><span className="stLbl">All systems operational</span><Link href="/status" className="stLnk">View status</Link></div></div>;}

/* Phone with outcome-focused conversation */
const convos=[
  {lang:"English",flag:"\u{1F1EC}\u{1F1E7}",msgs:[{f:"u",t:"I just moved to Manchester and need to register with a GP."},{f:"l",t:"I found 3 practices near you accepting new patients."},{f:"a",t:"City Health Centre \u00b7 0.3 miles \u00b7 Accepting patients"},{f:"l",t:"Callback requested. You should hear back within 1 to 2 working days. Bring photo ID and proof of address."}]},
  {lang:"Fran\u00e7ais",flag:"\u{1F1EB}\u{1F1F7}",msgs:[{f:"u",t:"J'ai besoin de renouveler mon ordonnance."},{f:"l",t:"Quel m\u00e9dicament prenez-vous?"},{f:"u",t:"Amlodipine 5mg, tous les jours."},{f:"a",t:"Demande de renouvellement pr\u00e9par\u00e9e pour votre cabinet"}]},
  {lang:"Yor\u00f9b\u00e1",flag:"\u{1F1F3}\u{1F1EC}",msgs:[{f:"u",t:"Mo ni iba ati efori lati ana."},{f:"l",t:"Mo le ran o lowo. Je ki n wa dokita to sun mo o."},{f:"u",t:"Mo wa ni HD1."},{f:"a",t:"Ile-iwosan meji nitosi re \u00b7 0.4 maili"}]},
  {lang:"Espa\u00f1ol",flag:"\u{1F1EA}\u{1F1F8}",msgs:[{f:"u",t:"Mi hijo tiene fiebre. Son las 11pm."},{f:"l",t:"\u00bfResponde cuando le hablas? \u00bfBebe l\u00edquidos?"},{f:"u",t:"S\u00ed, pero cansado."},{f:"a",t:"Urgencias m\u00e1s cercana: 0.6 millas \u00b7 Abierto ahora"}]},
];
function PhoneMockup(){
  const [li,setLi]=useState(0);const [vi,setVi]=useState(0);const [typing,setTyping]=useState(false);const cv=convos[li];
  useEffect(()=>{if(vi>=cv.msgs.length){const t=setTimeout(()=>{setLi(p=>(p+1)%convos.length);setVi(0);},2200);return()=>clearTimeout(t);}const msg=cv.msgs[vi];if(msg.f==="u"){setVi(p=>p+1);}else{setTyping(true);const t=setTimeout(()=>{setTyping(false);setVi(p=>p+1);},600+Math.random()*500);return()=>clearTimeout(t);}},[vi,li,cv.msgs]);
  return(
    <div className="phW"><motion.div className="phGlow" animate={{opacity:[0.15,0.35,0.15]}} transition={{duration:5,repeat:Infinity}}/>
      <motion.div className="phF" initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.8}}>
        <div className="phB"><div className="phDI"/>
          <div className="phS">
            <div className="phH"><div className="phAv"><Image src="/laura-avatar.png" alt="Laura" fill sizes="26px" style={{objectFit:"cover"}}/></div><div><div className="phN">Laura <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 1L14.9 3.6L18.6 3.2L19.4 6.8L22.5 8.7L21.2 12.2L22.5 15.7L19.4 17.6L18.6 21.2L14.9 20.8L12 23.4L9.1 20.8L5.4 21.2L4.6 17.6L1.5 15.7L2.8 12.2L1.5 8.7L4.6 6.8L5.4 3.2L9.1 3.6L12 1Z" fill="#22C55E"/><path d="M8.5 12.5L10.5 14.5L15.5 9.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div><div className="phOn"><span className="phOnD"/>online</div></div></div>
            <AnimatePresence mode="wait"><motion.div key={li} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="phLang">{cv.flag} {cv.lang}</motion.div></AnimatePresence>
            <div className="phBdy">
              {cv.msgs.slice(0,vi).map((msg,i)=>(
                <motion.div key={`${li}-${i}`} initial={{opacity:0,y:3}} animate={{opacity:1,y:0}} className={`phR ${msg.f==="u"?"phRR":"phRL"}`}>
                  {msg.f==="a"?<div className="phAct">{msg.t}</div>:<div className={`phBb ${msg.f==="u"?"phBbU":"phBbL"}`}>{msg.t}{msg.f==="u"&&<span className="phMt"><svg width="12" height="8" viewBox="0 0 20 14" fill="none"><path d="M1.5 7.6L4.7 10.8L10.2 5.2" stroke="#53BDEB" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/><path d="M7.3 7.6L10.5 10.8L18.2 3.2" stroke="#53BDEB" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>}</div>}
                </motion.div>
              ))}
              {typing&&<div className="phR phRL"><div className="phBb phBbL phTy"><span/><span/><span/></div></div>}
            </div>
            <div className="phCo"><div className="phCoF"><span className="phCoT">Message</span></div><div className="phCoM"><Mic size={11} color="#fff"/></div></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* Globe with continent hints */
const globeStories=[
  {country:"United Kingdom",flag:"\u{1F1EC}\u{1F1E7}",quote:"I called at 8:01am. Busy. By 8:15 all slots were gone. Three weeks of this.",laura:"Laura queues your request overnight so you wake up with a confirmed callback.",cx:48,cy:28},
  {country:"United States",flag:"\u{1F1FA}\u{1F1F8}",quote:"I delayed seeing a doctor for six months because I was terrified of the cost.",laura:"Laura helps people understand options earlier, before delay makes everything harder.",cx:28,cy:35},
  {country:"Nigeria",flag:"\u{1F1F3}\u{1F1EC}",quote:"Four doctors for ten thousand people. I spent two days trying to find someone.",laura:"Laura routes people to available care faster, even where providers are scarce.",cx:50,cy:52},
  {country:"India",flag:"\u{1F1EE}\u{1F1F3}",quote:"My mother lives two hours from the nearest clinic. She never knows when to worry.",laura:"Laura helps assess urgency from anywhere, in any language.",cx:68,cy:42},
  {country:"Brazil",flag:"\u{1F1E7}\u{1F1F7}",quote:"I moved to London and could not explain my symptoms in English.",laura:"Laura speaks 40+ languages and prepares bilingual notes for the receptionist.",cx:32,cy:58},
];
function GlobeSection(){
  const [a,setA]=useState(0);const tr=useRef<ReturnType<typeof setTimeout>|null>(null);
  const reset=useCallback(()=>{if(tr.current)clearTimeout(tr.current);tr.current=setTimeout(()=>setA(p=>(p+1)%globeStories.length),5500);},[]);
  useEffect(()=>{reset();return()=>{if(tr.current)clearTimeout(tr.current);};},[a,reset]);
  const s=globeStories[a];
  return(
    <section className="globeSec"><div className="container">
      <FI><div className="shW"><Tag>Care access, around the world</Tag><h2 className="serif shT" style={{marginTop:"14px"}}>How people struggle to reach care.</h2></div></FI>
      <div className="globeW">
        <div className="globeV"><svg viewBox="0 0 100 100" className="globeSvg">
          <circle cx="50" cy="50" r="47" fill="none" stroke="#C8BFA8" strokeWidth="0.5"/>
          <circle cx="50" cy="50" r="47" fill="url(#gG)"/>
          {/* Grid */}
          {[20,30,40,50,60,70,80].map(y=><ellipse key={y} cx="50" cy="50" rx={Math.sqrt(Math.max(0,2209-(y-50)*(y-50)))} ry="3.5" fill="none" stroke="#D0C9B8" strokeWidth="0.18" opacity="0.5" transform={`translate(0,${y-50})`}/>)}
          {[-30,-15,0,15,30].map(x=><ellipse key={x} cx="50" cy="50" rx="3.5" ry="47" fill="none" stroke="#D0C9B8" strokeWidth="0.18" opacity="0.4" transform={`rotate(${x},50,50)`}/>)}
          {/* Continent hints */}
          <path d="M44,22 L48,20 L52,22 L53,26 L50,30 L46,28 Z" fill="#D8D0C0" opacity="0.35"/>
          <path d="M46,30 L52,30 L54,38 L50,42 L44,38 L43,34 Z" fill="#D8D0C0" opacity="0.3"/>
          <path d="M20,30 L35,28 L38,34 L32,40 L22,38 L18,34 Z" fill="#D8D0C0" opacity="0.25"/>
          <path d="M28,50 L34,46 L36,54 L32,62 L26,58 Z" fill="#D8D0C0" opacity="0.25"/>
          <path d="M62,34 L74,32 L78,40 L72,48 L64,44 L60,38 Z" fill="#D8D0C0" opacity="0.25"/>
          {/* Arcs */}
          {globeStories.map((st,i)=>{const nx=globeStories[(i+1)%globeStories.length];return<motion.path key={`a${i}`} d={`M${st.cx},${st.cy} Q50,${Math.min(st.cy,nx.cy)-12} ${nx.cx},${nx.cy}`} fill="none" stroke={c.warm} strokeWidth={i===a?"0.7":"0.2"} opacity={i===a?0.6:0.1} strokeDasharray="3 2" animate={i===a?{strokeDashoffset:[0,-5]}:{}} transition={{duration:1.2,repeat:Infinity,ease:"linear"}}/>})}
          {/* Particles */}
          {[0,1].map(p=><motion.circle key={`p${p}`} r="0.8" fill={c.warm} opacity="0.5" animate={{cx:[globeStories[a].cx,50,globeStories[(a+1)%globeStories.length].cx],cy:[globeStories[a].cy,Math.min(globeStories[a].cy,globeStories[(a+1)%globeStories.length].cy)-12,globeStories[(a+1)%globeStories.length].cy]}} transition={{duration:2.5,delay:p*1.2,repeat:Infinity,ease:"linear"}}/>)}
          {/* Dots */}
          {globeStories.map((st,i)=>(<g key={st.country}>
            {i===a&&<motion.circle cx={st.cx} cy={st.cy} r="4" fill={c.warm} opacity="0.12" animate={{r:[4,7,4],opacity:[0.12,0.25,0.12]}} transition={{duration:2,repeat:Infinity}}/>}
            <circle cx={st.cx} cy={st.cy} r={i===a?2.8:1.3} fill={i===a?c.warm:"#B0A894"} style={{cursor:"pointer",transition:"all 0.4s"}} onClick={()=>setA(i)}/>
          </g>))}
          <defs><radialGradient id="gG" cx="38%" cy="33%"><stop offset="0%" stopColor="#F8F6F1" stopOpacity="0.02"/><stop offset="100%" stopColor="#E5DFD2" stopOpacity="0.08"/></radialGradient></defs>
        </svg></div>
        <div className="globeC">
          <AnimatePresence mode="wait"><motion.div key={a} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}} transition={{duration:0.3}} className="globeStory">
            <div className="globeCtry"><span style={{fontSize:"18px"}}>{s.flag}</span><span className="globeCtryN">{s.country}</span></div>
            <p className="serif globeQ">&ldquo;{s.quote}&rdquo;</p>
            <div className="globeL"><div className="globeLA"><Image src="/laura-avatar.png" alt="Laura" fill sizes="22px" style={{objectFit:"cover"}}/></div><p className="globeLT">{s.laura}</p></div>
          </motion.div></AnimatePresence>
          <div className="globeNav"><div className="globeDs">{globeStories.map((_,i)=><button key={i} className={`globeD${i===a?" globeDA":""}`} onClick={()=>setA(i)}/>)}</div><div className="globeAs"><button className="globeA" onClick={()=>setA(p=>(p-1+5)%5)}><ChevronLeft size={15}/></button><button className="globeA" onClick={()=>setA(p=>(p+1)%5)}><ChevronRight size={15}/></button></div></div>
        </div>
      </div>
    </div></section>
  );
}

/* Terminal */
function SDKTerminal(){const lines=useMemo(()=>['$ npm install @omela/laura-sdk','','  import { Laura } from "@omela/laura-sdk";','','  const laura = new Laura({','    apiKey: process.env.OMELA_KEY,','    region: "eu-west-2"','  });','','  const session = await laura.navigate({','    userId: "patient_4102",','    lang: "fr",','    concern: "prescription renewal"','  });','','  // Laura found 2 practices, drafted request','  Done in 1.1s'],[]);const [vl,setVl]=useState(0);const [ci,setCi]=useState(0);useEffect(()=>{if(vl>=lines.length){const t=setTimeout(()=>{setVl(0);setCi(0);},3000);return()=>clearTimeout(t);}const line=lines[vl];if(ci<line.length){const t=setTimeout(()=>setCi(p=>p+1),line.startsWith("  //")?36:18);return()=>clearTimeout(t);}else{const t=setTimeout(()=>{setVl(p=>p+1);setCi(0);},line===""?50:140);return()=>clearTimeout(t);}},[vl,ci,lines]);return<div className="trm"><div className="trmT"><div className="trmD"><span/><span/><span/></div><span className="trmTi">Laura SDK</span><CS/></div><div className="trmB">{lines.slice(0,vl+1).map((line,i)=>{const a2=i===vl;return<div key={i} className="trmL" style={{color:line.startsWith("  Done")||line.startsWith("  //")?"#4ADE80":line.startsWith("$")?"#E2E8F0":"#94A3B8"}}>{a2?line.slice(0,ci):line}{a2&&<span className="trmC">|</span>}</div>;})}</div></div>;}

/* Modal */
function SuccessModal({open,onClose}:{open:boolean;onClose:()=>void}){return<AnimatePresence>{open&&<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose} className="modO"><motion.div initial={{opacity:0,y:14,scale:0.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:10}} onClick={e=>e.stopPropagation()} className="modB"><h3 className="serif modTi">You are on the list.</h3><p className="modBd">Laura will reach out as access opens. Follow @joinomela for updates.</p><div style={{marginTop:"14px",display:"flex",gap:"8px",flexWrap:"wrap"}}><a href="https://x.com/joinomela" target="_blank" rel="noreferrer" className="btnP">Follow on X</a><button type="button" className="btnS" onClick={onClose}>Close</button></div></motion.div></motion.div>}</AnimatePresence>;}

/* ══════════ MAIN ══════════ */
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

      {/* HERO */}
      <section className="heroSec"><div className="container">
        <div className="heroTxt">
          <FI><h1 className="serif heroTi">Getting care<br/><span className="heroAc">should not be this hard.</span></h1></FI>
          <FI delay={0.05}><div className="heroBd"><Typewriter/></div></FI>
          <FI delay={0.1}><p className="heroSub">Laura is a care navigator that finds doctors, explains referrals, drafts prescriptions, and works in 40+ languages. Available 24/7, with no phone queue.</p></FI>
          <FI delay={0.14}><div className="heroBt"><Link href="/demo" className="btnP">See how Laura works <ArrowRight size={14}/></Link><a href="#waitlist" className="btnS">Join waitlist</a></div></FI>
        </div>
        <div className="heroPh"><PhoneMockup/></div>
      </div></section>

      {/* 3 PROBLEMS */}
      <section id="how" className="sec"><div className="container">
        <FI><div className="shW"><h2 className="serif shT">People do not just suffer because they are sick. They suffer because reaching care is exhausting.</h2></div></FI>
        <div className="probGrid">{[
          {emoji:"\u{1F48A}",title:"Chasing repeat prescriptions",body:"Every month: call, hold, repeat. Laura drafts the refill and reminds you before you run out."},
          {emoji:"\u{1F4CD}",title:"New city, no doctor",body:"You just arrived. Laura finds practices near you and guides registration step by step."},
          {emoji:"\u{1F30D}",title:"Explaining pain in another language",body:"Laura speaks your language and prepares a bilingual note for the receptionist."},
        ].map((item,i)=>(<FI key={item.title} delay={i*0.06}><div className="probCard"><span className="probE">{item.emoji}</span><h3 className="probTi">{item.title}</h3><p className="probBd">{item.body}</p></div></FI>))}</div>
        <FI delay={0.2}><div style={{textAlign:"center",marginTop:"24px"}}><Link href="/how-laura-helps" className="seeAll">See all care scenarios <ArrowRight size={14}/></Link></div></FI>
      </div></section>

      {/* BEFORE / AFTER */}
      <section className="sec" style={{paddingTop:0}}><div className="container">
        <FI><div className="shW"><h2 className="serif shT">Less chasing. Less confusion.<br/>More control when you feel unwell.</h2></div></FI>
        <FI><div className="baGrid">
          <div className="baCard baBf"><h3 className="baTi">Without Laura</h3>{["Call GP, get busy signal","Chase prescription emails","Travel to ask simple questions","Wait in confusion at hospital","Repeat yourself every time"].map(item=><div key={item} className="baIt"><span className="baX">&#10007;</span>{item}</div>)}</div>
          <div className="baCard baAf"><h3 className="baTi">With Laura</h3>{["Describe what you need, anytime","Prescription drafted and tracked","Get guidance from home","Walk in prepared and calm","Laura remembers context"].map(item=><div key={item} className="baIt"><Chk/><span>{item}</span></div>)}</div>
        </div></FI>
      </div></section>

      <GlobeSection/>

      {/* AUDIENCES */}
      <section className="sec"><div className="container">
        <FI><div className="shW"><h2 className="serif shT">Three audiences. One platform.</h2></div></FI>
        <div className="g3" style={{marginTop:"28px"}}>{[
          {title:"For people",desc:"You are sick, confused, or stuck. Laura gives you a way through.",bullets:["Skip the phone queue","Draft prescription refills","Find doctors near you","Understand referral letters"],ico:"1"},
          {title:"For care teams",desc:"Your receptionists are drowning. Laura handles intake so your team handles patients.",bullets:["Reduce reception pressure","Urgency at a glance","Structured callbacks","Multilingual access"],ico:"2"},
          {title:"For developers",desc:"Embed Laura into your health app. Care-access intelligence without building from scratch.",bullets:["API and SDK access","Embeddable widget","Workflow triggers","Audit logs"],ico:"3",soon:true},
        ].map((card,i)=>(<FI key={card.title} delay={i*0.06}><div className="card"><div className="cardN">{card.ico}{card.soon&&<CS/>}</div><h3 className="cardTi">{card.title}</h3><p className="cardBd">{card.desc}</p><div className="ftL">{card.bullets.map(b=><div key={b} className="ftR"><Chk/><span>{b}</span></div>)}</div></div></FI>))}</div>
      </div></section>

      {/* LANGUAGE */}
      <section className="sec" style={{paddingTop:0}}><div className="container"><FI><div className="glC"><div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",flexWrap:"wrap"}}><h2 className="serif glT">Laura speaks your language.</h2><CS/></div><p className="glB">40+ languages. No translators. No barriers. Laura replies in the language you start with.</p><div className="glF">{["\u{1F1EC}\u{1F1E7} UK","\u{1F1FA}\u{1F1F8} US","\u{1F1EB}\u{1F1F7} France","\u{1F1F3}\u{1F1EC} Nigeria","\u{1F1EE}\u{1F1F3} India","\u{1F30D} 40+ more"].map(f=><span key={f} className="glFi">{f}</span>)}</div></div></FI></div></section>

      {/* DEVELOPERS */}
      <section id="developers" className="secDk"><div className="container">
        <FI><div className="shW"><h2 className="serif shT" style={{color:"#fff"}}>Build with Laura.</h2><p className="shB" style={{color:"rgba(255,255,255,0.5)"}}>Embed urgency checks, provider routing, and multilingual care access.</p></div></FI>
        <div className="g2" style={{marginTop:"28px"}}><FI><SDKTerminal/></FI><FI delay={0.08}><div className="dkC"><h3 className="dkCT">Built for integration teams</h3><p className="dkCB">Add Laura to patient portals, health apps, or internal tooling.</p><div className="ftL" style={{marginTop:"14px"}}>{["REST API and SDK","Embeddable chat","Workflow triggers","Auth and audit trails"].map(f=><div key={f} className="ftR" style={{color:"rgba(255,255,255,0.7)"}}><Chk dark/><span>{f}</span></div>)}</div><div className="dkP">Developer access on the roadmap <CS/></div></div></FI></div>
      </div></section>

      {/* PRICING */}
      <section id="pricing" className="sec"><div className="container">
        <FI><div className="shW"><h2 className="serif shT">Simple, transparent access.</h2></div></FI>
        <div className="g3" style={{marginTop:"28px"}}>{[
          {name:"People",price:"Free",period:"during early access",desc:"Symptom checks, provider search, prescription support, referral guidance.",ft:["Urgency checks","GP and dental search","Prescription support","Referral guidance"],hl:false,cta:"Join waitlist"},
          {name:"Care Teams",price:"Starting at \u00A32,500",period:"/mo",desc:"Laura handles intake so your team handles patients.",ft:["Structured intake","Urgency dashboard","Multilingual access","Request management"],hl:true,badge:"Best for practices",cta:"Request demo"},
          {name:"Developer",price:"Custom",period:"",desc:"Embed Laura into your health product.",ft:["API and SDK access","Embeddable components","Usage analytics","Technical onboarding"],hl:false,cta:"Talk to us",soon:true},
        ].map((p,i)=>(<FI key={p.name} delay={i*0.06}><div className={`card${p.hl?" cardDk":""}`} style={{position:"relative"}}>
          {p.badge&&<div className="prBg">{p.badge}</div>}
          <div style={{fontSize:"15px",fontWeight:700,display:"flex",alignItems:"center",gap:"6px"}}>{p.name}{p.soon&&<CS/>}</div>
          <div style={{display:"flex",alignItems:"baseline",gap:"4px",marginTop:"10px"}}><span className="serif" style={{fontSize:"clamp(30px,6vw,44px)",letterSpacing:"-0.05em"}}>{p.price}</span>{p.period&&<span style={{fontSize:"13px",color:p.hl?"rgba(255,255,255,0.4)":c.muted}}>{p.period}</span>}</div>
          <p style={{marginTop:"6px",color:p.hl?"rgba(255,255,255,0.5)":c.sub,fontSize:"14px",lineHeight:1.7}}>{p.desc}</p>
          <div style={{marginTop:"14px",paddingTop:"12px",borderTop:`1px solid ${p.hl?c.borderDk:c.border}`,display:"flex",flexDirection:"column",gap:"6px",flex:1}}>{p.ft.map(f=><div key={f} className="ftR" style={{color:p.hl?"rgba(255,255,255,0.7)":c.sub}}><Chk dark={p.hl}/><span>{f}</span></div>)}</div>
          <a href="#waitlist" className="btnP" style={{marginTop:"16px",width:"100%",background:p.hl?"#fff":c.dark,color:p.hl?c.dark:"#fff",border:"none"}}>{p.cta}</a>
        </div></FI>))}</div>
      </div></section>

      {/* WAITLIST */}
      <section id="waitlist" className="sec"><div className="container"><FI><div className="wlC">
        <div className="shW"><h2 className="serif shT">Join the waitlist.</h2><p className="shB">Tell us who you are. We will prioritize your access.</p></div>
        <form className="wlF" onSubmit={handleSubmit}>
          <input className="inp" type="email" placeholder="Your email" value={email} onChange={e=>setEmail(e.target.value)} required autoComplete="email"/>
          <select className="inp" value={role} onChange={e=>setRole(e.target.value as Role)}><option value="patient">I need care access</option><option value="provider">I run a practice</option><option value="developer">I am a developer</option></select>
          <input type="text" name="website" value={website} onChange={e=>setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{position:"absolute",left:"-9999px",opacity:0,pointerEvents:"none",height:0,width:0}}/>
          <button type="submit" className="btnP wlBt" disabled={submitting||!agreed}>{submitting?"Submitting...":"Join waitlist"}</button>
        </form>
        <label className="pvL"><input type="checkbox" checked={agreed} onChange={e=>setAgreed(e.target.checked)} required className="pvC"/><span>I agree to the <Link href="/privacy" className="pvLk">Privacy Notice</Link> and <Link href="/terms" className="pvLk">Terms</Link>.</span></label>
        {success&&<div className="fmOk">{success}</div>}{error&&<div className="fmEr">{error}</div>}
      </div></FI></div></section>

      {/* FOOTER */}
      <footer className="ft"><div className="container ftIn">
        <div className="ftTop">
          <div><Link href="/" className="ftBr"><div className="navLo" style={{width:"26px",height:"26px"}}><Image src="/omela-logo-mark.png" alt="Omela" width={26} height={26} style={{width:"100%",height:"100%",objectFit:"contain"}}/></div><div><div className="ftBrN">Omela</div><div className="ftBrS">POWERED BY LAURA</div></div></Link><p className="ftFd">by Opeyemi Akinbohun</p></div>
          <div className="ftCols">
            <div className="ftCol"><div className="ftColT">Product</div><Link href="/demo" className="ftLk">Try Laura</Link><Link href="/how-laura-helps" className="ftLk">Use cases</Link><Link href="/quiz" className="ftLk">Health Quiz</Link><Link href="/status" className="ftLk">Status</Link></div>
            <div className="ftCol"><div className="ftColT">Legal</div><Link href="/privacy" className="ftLk">Privacy</Link><Link href="/terms" className="ftLk">Terms</Link><a href="mailto:notice@omela.ai" className="ftLk">Contact</a></div>
          </div>
        </div>
        <div className="ftBtm"><p>&copy; 2026 Omela. Laura is a care navigator, not a medical professional. For emergencies, call 999 or 911.</p></div>
      </div></footer>
    </div>
  </>);
}

const CSS=`
*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}html,body{max-width:100%;overflow-x:clip}
body{background:${c.bg};color:${c.text};font-family:'DM Sans',-apple-system,sans-serif;-webkit-font-smoothing:antialiased;font-size:16px}
a{color:inherit;text-decoration:none}button,input,select{font-family:inherit}::selection{background:${c.accent};color:#fff}
@keyframes blink{0%,50%{opacity:1}50.01%,100%{opacity:0}}@keyframes csA{0%{transform:translateX(-100%)}100%{transform:translateX(200%)}}@keyframes tDot{0%,80%{opacity:0.3;transform:scale(0.8)}40%{opacity:1;transform:scale(1)}}
.serif{font-family:'Instrument Serif',Georgia,serif}.wrap{width:100%;overflow-x:clip}.container{max-width:1100px;margin:0 auto;padding:0 20px}
.sec{padding:60px 0}.secDk{padding:60px 0;background:${c.dark};color:#fff}
.cs{display:inline-flex;padding:2px 7px;border-radius:999px;background:linear-gradient(135deg,#FEF3C7,#FDE68A);color:#92400E;font-size:8px;font-weight:800;text-transform:uppercase;letter-spacing:0.06em;position:relative;overflow:hidden;margin-left:3px;flex-shrink:0}.csS{position:absolute;top:0;left:0;width:60%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent);animation:csA 2.5s ease-in-out infinite}
.stBar{background:${c.greenSoft};border-bottom:1px solid rgba(34,197,94,0.12);padding:6px 0}.stIn{display:flex;align-items:center;gap:7px}.stDot{width:6px;height:6px;border-radius:999px;background:${c.green};display:inline-block;box-shadow:0 0 5px ${c.green}44}.stLbl{font-size:12px;font-weight:700;color:${c.greenDk}}.stLnk{font-size:11px;font-weight:700;color:${c.accent};text-decoration:underline;text-underline-offset:2px}
.tag{display:inline-flex;padding:7px 14px;border-radius:999px;border:1px solid ${c.border};background:rgba(255,255,255,0.75);font-size:12px;font-weight:700;color:${c.sub}}
.chk{width:18px;height:18px;border-radius:999px;background:${c.greenSoft};color:${c.green};display:inline-flex;align-items:center;justify-content:center;font-size:9px;font-weight:800;flex-shrink:0;margin-top:2px}.chkD{background:rgba(34,197,94,0.12);color:#4ADE80}
.shW{text-align:center;max-width:700px;margin:0 auto}.shT{font-size:clamp(24px,5vw,46px);line-height:1.1;letter-spacing:-0.04em}.shB{font-size:clamp(14px,2.5vw,16px);line-height:1.75;margin-top:10px;max-width:500px;margin-left:auto;margin-right:auto;color:${c.sub}}
.btnP{display:inline-flex;align-items:center;justify-content:center;gap:7px;background:${c.dark};color:#fff;border:none;border-radius:999px;padding:13px 22px;font-size:14px;font-weight:700;cursor:pointer;transition:all 0.25s;white-space:nowrap}.btnP:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 8px 24px rgba(0,0,0,0.12)}.btnP:disabled{opacity:0.5;cursor:not-allowed;transform:none}
.btnS{display:inline-flex;align-items:center;justify-content:center;gap:7px;background:rgba(255,255,255,0.85);color:${c.text};border:1px solid ${c.border};border-radius:999px;padding:13px 22px;font-size:14px;font-weight:700;cursor:pointer;transition:all 0.25s;white-space:nowrap}.btnS:hover{background:#fff}
.nav{position:sticky;top:0;z-index:100;background:rgba(248,246,241,0.9);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid rgba(227,221,210,0.5)}.navR{display:flex;align-items:center;justify-content:space-between;gap:8px;height:56px}.navBr{display:flex;align-items:center;gap:7px;flex-shrink:0}.navLo{width:32px;height:32px;border-radius:9px;overflow:hidden;flex-shrink:0;box-shadow:0 2px 6px rgba(0,0,0,0.05)}.navNm{font-size:14px;font-weight:800;letter-spacing:-0.03em}.navSb{font-size:8px;font-weight:800;letter-spacing:0.1em;color:${c.accent};margin-top:1px}.navLks{display:none;align-items:center;gap:20px}.navLk{font-size:13px;font-weight:600;color:${c.sub}}.navCt{padding:9px 16px!important;font-size:12px!important;flex-shrink:0}
.heroSec{padding:44px 0 16px}.heroTxt{max-width:540px}.heroTi{font-size:clamp(34px,8.5vw,76px);line-height:0.96;letter-spacing:-0.05em}.heroAc{color:${c.accent};font-style:italic}.tw{font-size:clamp(16px,2.8vw,20px);line-height:1.5;color:${c.text};font-weight:600;min-height:1.4em;display:block;margin-top:14px}.twC{color:${c.accent};animation:blink 1s step-end infinite;font-weight:300}.heroSub{font-size:clamp(14px,2.2vw,16px);line-height:1.72;color:${c.sub};max-width:460px;margin-top:8px}.heroBd{min-height:44px}.heroBt{display:flex;flex-direction:column;gap:8px;margin-top:20px}.heroBt .btnP,.heroBt .btnS{width:100%;text-align:center}
.heroPh{margin-top:28px;width:100%;display:flex;justify-content:center;position:relative}
/* Phone */
.phW{width:100%;max-width:220px;position:relative}.phGlow{position:absolute;inset:-28px;border-radius:999px;background:radial-gradient(circle,rgba(37,99,235,0.06),transparent 70%);z-index:0}.phF{position:relative;z-index:1}.phB{background:#1A1A1E;border-radius:30px;padding:4px;box-shadow:0 16px 36px rgba(0,0,0,0.12)}.phDI{width:60px;height:16px;border-radius:999px;background:#000;margin:0 auto 2px}.phS{background:#FAFAFA;border-radius:27px;overflow:hidden}
.phH{display:flex;align-items:center;gap:5px;padding:6px 8px;background:#fff;border-bottom:1px solid #f0f0f0}.phAv{position:relative;width:22px;height:22px;border-radius:999px;overflow:hidden;flex-shrink:0;border:1px solid #fff}.phN{display:flex;align-items:center;gap:2px;font-size:10px;font-weight:700}.phOn{display:flex;align-items:center;gap:2px;font-size:7px;color:${c.green};font-weight:600;margin-top:0}.phOnD{width:3px;height:3px;border-radius:999px;background:${c.green};display:inline-block}
.phLang{display:flex;align-items:center;justify-content:center;gap:3px;padding:3px 0;background:#F7F7FB;font-size:8px;font-weight:700;color:${c.accent}}
.phBdy{display:flex;flex-direction:column;gap:3px;padding:6px 5px;height:260px;overflow:hidden;justify-content:flex-end;background:linear-gradient(180deg,#F5F5F0,#ECE5DA)}
.phR{display:flex}.phRR{justify-content:flex-end}.phRL{justify-content:flex-start}
.phBb{max-width:85%;padding:5px 8px;font-size:8.5px;line-height:1.4;word-break:break-word}.phBbU{background:#E7FFDB;color:#111;border-radius:8px 8px 2px 8px}.phBbL{background:#fff;color:#111;border-radius:8px 8px 8px 2px;box-shadow:0 1px 2px rgba(0,0,0,0.03)}.phMt{display:flex;justify-content:flex-end;margin-top:1px}
.phAct{width:88%;margin:2px auto;padding:6px 8px;background:${c.accentSoft};border:1px solid rgba(37,99,235,0.1);border-radius:8px;font-size:8px;font-weight:700;color:${c.accent};text-align:center}
.phTy{display:flex;gap:2px;padding:8px 12px}.phTy span{width:4px;height:4px;border-radius:999px;background:${c.muted};animation:tDot 1.2s infinite}.phTy span:nth-child(2){animation-delay:0.2s}.phTy span:nth-child(3){animation-delay:0.4s}
.phCo{padding:4px 4px 7px;display:flex;align-items:center;gap:3px;background:#F0EBE3}.phCoF{flex:1;height:20px;border-radius:999px;background:#fff;display:flex;align-items:center;padding:0 6px}.phCoT{color:${c.muted};font-size:8px}.phCoM{width:20px;height:20px;border-radius:999px;background:#25D366;display:flex;align-items:center;justify-content:center;flex-shrink:0}
/* Prob cards */
.probGrid{display:grid;grid-template-columns:1fr;gap:10px;margin-top:28px}.probCard{padding:22px;border:1px solid ${c.border};border-radius:18px;background:rgba(255,255,255,0.9);transition:all 0.25s}.probCard:hover{box-shadow:0 10px 28px rgba(0,0,0,0.05);transform:translateY(-2px)}.probE{font-size:26px;display:block;margin-bottom:6px}.probTi{font-size:17px;font-weight:800;letter-spacing:-0.03em}.probBd{font-size:13px;line-height:1.68;color:${c.sub};margin-top:4px}.seeAll{display:inline-flex;align-items:center;gap:5px;font-size:14px;font-weight:700;color:${c.accent}}
/* BA */
.baGrid{display:grid;grid-template-columns:1fr;gap:10px;margin-top:28px}.baCard{border-radius:20px;padding:24px;border:1px solid ${c.border}}.baBf{background:rgba(254,242,242,0.3)}.baAf{background:rgba(236,253,243,0.3)}.baTi{font-size:17px;font-weight:800;margin-bottom:12px}.baIt{display:flex;align-items:flex-start;gap:7px;font-size:13px;line-height:1.6;color:${c.sub};margin-bottom:7px}.baX{color:#EF4444;font-weight:800;flex-shrink:0;margin-top:1px}
/* Globe */
.globeSec{padding:68px 0;background:linear-gradient(180deg,${c.bg},#EDE8DD,${c.bg})}.globeW{display:flex;flex-direction:column;align-items:center;gap:24px;margin-top:28px}.globeV{width:100%;max-width:340px;aspect-ratio:1;margin:0 auto}.globeSvg{width:100%;height:100%}.globeC{width:100%;max-width:480px;text-align:center}.globeStory{min-height:160px}.globeCtry{display:flex;align-items:center;justify-content:center;gap:6px;margin-bottom:10px}.globeCtryN{font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;color:${c.muted};background:rgba(255,255,255,0.8);padding:3px 9px;border-radius:5px}.globeQ{font-size:clamp(16px,3.5vw,22px);line-height:1.35;letter-spacing:-0.02em;font-style:italic}.globeL{display:flex;align-items:flex-start;gap:7px;margin-top:12px;background:rgba(255,255,255,0.8);border:1px solid ${c.border};border-radius:12px;padding:10px 12px;text-align:left}.globeLA{position:relative;width:22px;height:22px;border-radius:999px;overflow:hidden;flex-shrink:0;border:1px solid #fff}.globeLT{font-size:13px;line-height:1.6;color:${c.sub}}.globeNav{display:flex;align-items:center;justify-content:center;gap:14px;margin-top:16px}.globeDs{display:flex;gap:4px}.globeD{width:6px;height:6px;border-radius:999px;background:${c.border};border:none;cursor:pointer;transition:all 0.3s;padding:0}.globeDA{background:${c.warm};width:18px}.globeAs{display:flex;gap:4px}.globeA{width:30px;height:30px;border-radius:999px;background:rgba(255,255,255,0.9);border:1px solid ${c.border};display:flex;align-items:center;justify-content:center;cursor:pointer;color:${c.sub};transition:all 0.2s}.globeA:hover{background:#fff}
/* Cards */
.g3{display:grid;grid-template-columns:1fr;gap:10px}.g2{display:grid;grid-template-columns:1fr;gap:16px}
.card{background:rgba(255,255,255,0.92);border:1px solid ${c.border};border-radius:20px;padding:22px;display:flex;flex-direction:column;transition:all 0.25s}.card:hover{box-shadow:0 8px 24px rgba(0,0,0,0.04)}.cardDk{background:linear-gradient(180deg,#111318,#0D0F14)!important;border:1px solid ${c.borderDk}!important;color:#fff!important;box-shadow:0 14px 36px rgba(0,0,0,0.18)!important}.cardN{display:flex;align-items:center;gap:5px;width:fit-content;padding:0 11px;height:30px;border-radius:9px;background:${c.accentSoft};color:${c.accent};font-size:14px;font-weight:800}.cardTi{font-size:18px;font-weight:800;letter-spacing:-0.03em;margin-top:10px}.cardBd{margin-top:3px;color:${c.sub};font-size:13px;line-height:1.68}.ftL{display:flex;flex-direction:column;gap:5px;margin-top:10px}.ftR{display:flex;align-items:flex-start;gap:6px;font-size:13px;line-height:1.5;color:${c.sub}}
.dkC{background:linear-gradient(180deg,rgba(16,19,24,0.98),rgba(13,15,20,0.98));border:1px solid ${c.borderDk};border-radius:20px;padding:22px;box-shadow:0 12px 30px rgba(0,0,0,0.16)}.dkCT{font-size:clamp(17px,3vw,22px);font-weight:800;color:#fff}.dkCB{margin-top:6px;color:rgba(255,255,255,0.5);font-size:13px;line-height:1.8}.dkP{display:inline-flex;align-items:center;margin-top:12px;padding:6px 10px;border-radius:999px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.04);color:rgba(255,255,255,0.55);font-size:10px;font-weight:700;gap:3px}
.glC{border:1px solid ${c.border};background:rgba(255,255,255,0.9);border-radius:20px;padding:22px;text-align:center}.glT{font-size:clamp(22px,4.5vw,38px);letter-spacing:-0.04em;display:inline}.glB{margin-top:6px;color:${c.sub};font-size:14px;line-height:1.7;max-width:440px;margin-left:auto;margin-right:auto}.glF{display:flex;flex-wrap:wrap;justify-content:center;gap:5px;margin-top:14px}.glFi{padding:5px 10px;border-radius:999px;border:1px solid ${c.border};background:rgba(255,255,255,0.8);font-size:11px;font-weight:600;color:${c.sub}}
.trm{background:#07080B;border:1px solid #1F2330;border-radius:14px;overflow:hidden;box-shadow:0 10px 28px rgba(0,0,0,0.14)}.trmT{display:flex;align-items:center;gap:6px;padding:8px 11px;border-bottom:1px solid #1B1F2B;background:#0E1118}.trmD{display:flex;gap:4px}.trmD span{width:7px;height:7px;border-radius:999px;display:inline-block}.trmD span:nth-child(1){background:#FF5F57}.trmD span:nth-child(2){background:#FEBC2E}.trmD span:nth-child(3){background:#28C840}.trmTi{font-size:9px;color:#6B7280;font-weight:700;flex:1}.trmB{padding:10px;height:280px;overflow:hidden}.trmL{white-space:pre-wrap;word-break:break-all;font-size:10px;line-height:1.7;font-family:'SF Mono',ui-monospace,Menlo,Consolas,monospace}.trmC{color:#60A5FA;animation:blink 0.8s step-end infinite}
.prBg{position:absolute;top:10px;right:10px;border-radius:999px;padding:3px 8px;background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.65);font-size:8px;font-weight:800;text-transform:uppercase;letter-spacing:0.06em}
.wlC{background:rgba(255,255,255,0.92);border:1px solid ${c.border};border-radius:20px;padding:22px;max-width:720px;margin:0 auto}.wlF{display:grid;grid-template-columns:1fr;gap:8px;margin-top:14px}.wlBt{height:48px;width:100%}.inp{width:100%;height:48px;border-radius:12px;border:1px solid ${c.border};background:#fff;padding:0 14px;font-size:14px;color:${c.text};outline:none}.inp:focus{border-color:${c.accent};box-shadow:0 0 0 3px rgba(37,99,235,0.05)}.pvL{display:flex;align-items:flex-start;gap:6px;margin-top:8px;color:${c.sub};font-size:11px;line-height:1.6;cursor:pointer;max-width:480px;margin-left:auto;margin-right:auto}.pvC{margin-top:1px;width:14px;height:14px;accent-color:${c.accent};flex-shrink:0}.pvLk{color:${c.text};font-weight:700;text-decoration:underline;text-underline-offset:2px}.fmOk{margin-top:8px;background:${c.greenSoft};color:${c.greenDk};border-radius:10px;padding:10px;text-align:center;font-size:13px;font-weight:600}.fmEr{margin-top:8px;background:#FFF7F7;color:#B91C1C;border-radius:10px;padding:10px;text-align:center;font-size:13px;font-weight:600}
.modO{position:fixed;inset:0;z-index:220;background:rgba(9,10,13,0.4);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;padding:14px}.modB{width:100%;max-width:380px;background:rgba(255,255,255,0.96);border:1px solid ${c.border};border-radius:20px;padding:22px;box-shadow:0 24px 56px rgba(0,0,0,0.14)}.modTi{font-size:clamp(20px,4vw,28px);letter-spacing:-0.04em}.modBd{margin-top:4px;color:${c.sub};font-size:13px;line-height:1.7}
.ft{background:${c.dark};padding:32px 0 20px;color:#fff}.ftIn{}.ftTop{display:flex;flex-direction:column;gap:20px}.ftBr{display:flex;align-items:center;gap:7px;text-decoration:none;color:#fff}.ftBrN{font-size:13px;font-weight:800}.ftBrS{font-size:8px;font-weight:800;letter-spacing:0.1em;color:${c.accent};margin-top:1px}.ftFd{font-size:11px;color:rgba(255,255,255,0.3);margin-top:6px;font-style:italic}.ftCols{display:flex;gap:32px}.ftCol{display:flex;flex-direction:column;gap:6px}.ftColT{font-size:10px;font-weight:800;color:rgba(255,255,255,0.3);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:2px}.ftLk{font-size:12px;color:rgba(255,255,255,0.5);font-weight:500;transition:color 0.2s}.ftLk:hover{color:#fff}.ftBtm{border-top:1px solid rgba(255,255,255,0.06);padding-top:14px;margin-top:20px;font-size:10px;color:rgba(255,255,255,0.2)}
@media(min-width:640px){.container{padding:0 24px}.sec{padding:72px 0}.secDk{padding:72px 0}.navR{height:64px}.navLks{display:flex}.navCt{padding:10px 18px!important;font-size:13px!important}.heroBt{flex-direction:row}.heroBt .btnP,.heroBt .btnS{width:auto}.g3{grid-template-columns:repeat(3,1fr);gap:12px}.g2{grid-template-columns:repeat(2,1fr);gap:20px}.probGrid{grid-template-columns:repeat(3,1fr);gap:12px}.baGrid{grid-template-columns:repeat(2,1fr)}.wlF{grid-template-columns:1.2fr 0.8fr auto}.wlBt{width:auto}.wlC{padding:28px}.phW{max-width:240px}.ftTop{flex-direction:row;justify-content:space-between}.trmB{height:300px}.globeW{flex-direction:row;align-items:center;gap:36px}.globeV{max-width:320px;flex-shrink:0}.globeC{text-align:left}.globeCtry{justify-content:flex-start}.globeQ{text-align:left}}
@media(min-width:960px){.container{padding:0 36px}.sec{padding:84px 0}.secDk{padding:84px 0}.navR{height:72px}.heroSec{padding:56px 0 28px}.heroSec .container{display:grid;grid-template-columns:1.1fr 0.9fr;gap:0 40px;align-items:start}.heroTxt{grid-column:1}.heroPh{grid-column:2;margin-top:0;align-self:start}.phW{max-width:260px}.phB{border-radius:36px;padding:5px}.phS{border-radius:32px}.phBdy{height:280px}.card{padding:24px}.dkC{padding:24px}.trmB{height:320px}.globeV{max-width:380px}}
@media(min-width:1100px){.heroTi{font-size:clamp(56px,7vw,76px)}}
`;
