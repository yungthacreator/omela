"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useCallback, type ReactNode } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Bell, FileText, Package, Users, Building2, Pill, Copy, Check, Share2 } from "lucide-react";

const FONT=`@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');`;
const c={bg:"#F8F6F1",card:"#fff",dark:"#08090C",text:"#111214",sub:"#4A4F5C",muted:"#888E9C",accent:"#2563EB",accentSoft:"#ECF2FF",border:"#E3DDD2",borderDk:"#1E2130",green:"#22C55E",greenSoft:"#ECFDF3",greenDk:"#15803D",warm:"#C9956B",warmSoft:"#FFF8F0",red:"#EF4444"};
type Role="patient"|"provider"|"pharmacy";

function FI({children,delay=0,className=""}:{children:ReactNode;delay?:number;className?:string}){const ref=useRef<HTMLDivElement>(null);const v=useInView(ref,{once:true,amount:0.05});return<motion.div ref={ref} initial={{opacity:0,y:16}} animate={v?{opacity:1,y:0}:{}} transition={{duration:0.55,delay,ease:[0.22,1,0.36,1]}} className={className}>{children}</motion.div>;}
function Chk({dark=false}:{dark?:boolean}){return<span className={`chk${dark?" chkD":""}`}>&#10003;</span>;}
function Soon(){return<span className="soon">Coming soon</span>;}

/* ─── Phone Mockup (prescription flow) ─── */
function PhoneMockup(){
  const cards=[
    {type:"reminder",badge:"Reminder",title:"Amlodipine 5mg",body:"3 days of supply remaining. Time to request your refill.",time:"Mon 9:15am",color:c.warm},
    {type:"request",badge:"Request prepared",title:"Repeat prescription",body:"Clean request drafted for Parkside Medical. Ready for your review.",time:"Mon 9:16am",color:c.accent},
    {type:"status",badge:"Status update",title:"Sent to practice",body:"Your request has been received. Estimated ready: Wednesday.",time:"Mon 11:02am",color:c.accent},
    {type:"ready",badge:"Ready",title:"Pickup confirmed",body:"Your prescription is ready at Boots, 12 High Street. Open until 6pm.",time:"Wed 2:14pm",color:c.green},
  ];
  const[active,setActive]=useState(0);
  useEffect(()=>{const t=setInterval(()=>setActive(p=>(p+1)%cards.length),3200);return()=>clearInterval(t);},[cards.length]);
  return(
    <div className="phW">
      <motion.div className="phGlow" animate={{opacity:[0.1,0.22,0.1]}} transition={{duration:6,repeat:Infinity}}/>
      <motion.div className="phF" initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
        <div className="phB"><div className="phNotch"/><div className="phS">
          <div className="phHead"><div className="phAv"><Image src="/laura-avatar.png" alt="Laura" fill sizes="28px" style={{objectFit:"cover"}}/></div><div><div className="phName">Laura</div><div className="phSub">Prescription coordination</div></div></div>
          <div className="phBody">
            <AnimatePresence mode="wait">{cards.map((card,i)=>i===active&&(
              <motion.div key={i} className="phCard" initial={{opacity:0,y:10,scale:0.97}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:-8}} transition={{duration:0.35}}>
                <div className="phCardBadge" style={{background:`${card.color}12`,color:card.color,borderColor:`${card.color}20`}}>{card.badge}</div>
                <h4 className="phCardTitle">{card.title}</h4>
                <p className="phCardBody">{card.body}</p>
                <span className="phCardTime">{card.time}</span>
              </motion.div>
            ))}</AnimatePresence>
            <div className="phDots">{cards.map((_,i)=><span key={i} className={`phDot${i===active?" phDotA":""}`}/>)}</div>
          </div>
          <div className="phFoot">Repeat prescriptions, handled.</div>
        </div></div>
      </motion.div>
    </div>
  );
}

/* ─── Cityscape Journey ─── */
function Cityscape(){
  return(
    <div className="cityW">
      <svg viewBox="0 0 800 120" className="citySvg" preserveAspectRatio="xMidYMax slice">
        {/* Ground */}
        <rect x="0" y="100" width="800" height="20" fill="#E8E0D4" rx="2"/>
        <line x1="0" y1="100" x2="800" y2="100" stroke="#D4CCC0" strokeWidth="0.5"/>
        {/* Houses */}
        <g opacity="0.4">
          <rect x="40" y="60" width="36" height="40" rx="2" fill="#C9B99A"/><rect x="48" y="70" width="8" height="10" rx="1" fill="#B8A888"/><polygon points="38,60 76,60 58,44" fill="#BBA98A"/>
          <rect x="100" y="55" width="28" height="45" rx="2" fill="#CBBFA0"/><rect x="106" y="62" width="6" height="8" rx="1" fill="#B8A888"/><polygon points="98,55 128,55 114,42" fill="#BBA98A"/>
          <rect x="620" y="58" width="34" height="42" rx="2" fill="#C9B99A"/><rect x="628" y="66" width="7" height="9" rx="1" fill="#B8A888"/><polygon points="618,58 654,58 636,44" fill="#BBA98A"/>
          <rect x="700" y="52" width="40" height="48" rx="2" fill="#CBBFA0"/><rect x="710" y="60" width="8" height="10" rx="1" fill="#B8A888"/><polygon points="698,52 740,52 720,38" fill="#BBA98A"/>
        </g>
        {/* Pharmacy */}
        <g opacity="0.5">
          <rect x="360" y="48" width="80" height="52" rx="3" fill="#D4CCB8"/>
          <rect x="370" y="56" width="14" height="16" rx="1.5" fill="#C4BBAA"/>
          <rect x="392" y="56" width="14" height="16" rx="1.5" fill="#C4BBAA"/>
          <rect x="414" y="56" width="14" height="16" rx="1.5" fill="#C4BBAA"/>
          <rect x="388" y="80" width="24" height="20" rx="1.5" fill="#C4BBAA"/>
          <text x="400" y="45" textAnchor="middle" fontSize="7" fontWeight="700" fill="#A09480" fontFamily="DM Sans,sans-serif">PHARMACY</text>
          <circle cx="400" cy="38" r="4" fill="none" stroke="#A09480" strokeWidth="0.8"/>
          <path d="M398,38 L402,38 M400,36 L400,40" stroke="#A09480" strokeWidth="0.8"/>
        </g>
        {/* Trees */}
        <g opacity="0.3">
          {[160,220,540,580,680].map(x=><g key={x}><circle cx={x} cy="78" r="12" fill="#B8C4A0"/><rect x={x-1.5} y="88" width="3" height="12" rx="1" fill="#A09480"/></g>)}
        </g>
        {/* Animated bus */}
        <motion.g animate={{x:[-100,900]}} transition={{duration:18,repeat:Infinity,ease:"linear"}}>
          <rect x="0" y="82" width="44" height="18" rx="3" fill="#C9956B" opacity="0.5"/>
          <rect x="4" y="85" width="10" height="8" rx="1" fill="#B8864A" opacity="0.4"/>
          <rect x="18" y="85" width="10" height="8" rx="1" fill="#B8864A" opacity="0.4"/>
          <circle cx="10" cy="100" r="3" fill="#A09480" opacity="0.4"/>
          <circle cx="34" cy="100" r="3" fill="#A09480" opacity="0.4"/>
        </motion.g>
        {/* Animated car */}
        <motion.g animate={{x:[900,-100]}} transition={{duration:14,repeat:Infinity,ease:"linear"}}>
          <rect x="0" y="88" width="26" height="12" rx="3" fill="#8E99A8" opacity="0.35"/>
          <rect x="3" y="86" width="8" height="6" rx="1.5" fill="#7A8494" opacity="0.3"/>
          <rect x="14" y="86" width="8" height="6" rx="1.5" fill="#7A8494" opacity="0.3"/>
          <circle cx="6" cy="100" r="2.5" fill="#A09480" opacity="0.35"/>
          <circle cx="20" cy="100" r="2.5" fill="#A09480" opacity="0.35"/>
        </motion.g>
        {/* Person walking */}
        <motion.g animate={{x:[-20,820]}} transition={{duration:28,repeat:Infinity,ease:"linear"}} opacity="0.3">
          <circle cx="0" cy="88" r="3" fill="#A09480"/>
          <line x1="0" y1="91" x2="0" y2="99" stroke="#A09480" strokeWidth="1.5" strokeLinecap="round"/>
        </motion.g>
      </svg>
    </div>
  );
}

/* ─── Canvas Globe ─── */
const gs=[{country:"United Kingdom",flag:"\u{1F1EC}\u{1F1E7}",name:"Sarah, Leeds",quote:"I only remember my prescription when the last tablet is gone.",laura:"Laura reminds you days before you run low and prepares the refill request automatically.",lat:54,lng:-1.5},{country:"United States",flag:"\u{1F1FA}\u{1F1F8}",name:"Marcus, Chicago",quote:"Refill admin is different here, but the stress is exactly the same.",laura:"The coordination problem is universal. Laura is designed to adapt across systems.",lat:41.8,lng:-87.6},{country:"Nigeria",flag:"\u{1F1F3}\u{1F1EC}",name:"Amina, Lagos",quote:"I manage prescriptions for my mother and two aunts. It is a second job.",laura:"Laura helps carers track multiple refills without losing track of who needs what.",lat:6.5,lng:3.4},{country:"India",flag:"\u{1F1EE}\u{1F1F3}",name:"Priya, Jaipur",quote:"The nearest pharmacy is an hour away. I cannot waste a trip on a prescription that is not ready.",laura:"Laura tracks status so you know exactly when to make the journey.",lat:26.9,lng:75.8},{country:"Germany",flag:"\u{1F1E9}\u{1F1EA}",name:"Lena, Berlin",quote:"Every country handles prescriptions differently, but the frustration is the same.",laura:"Laura is being built to work across different prescription systems, starting in the UK.",lat:52.5,lng:13.4}];
function latLngToXYZ(lat:number,lng:number){const phi=(90-lat)*(Math.PI/180);const theta=(lng+180)*(Math.PI/180);return{x:-Math.sin(phi)*Math.cos(theta),y:Math.cos(phi),z:Math.sin(phi)*Math.sin(theta)};}
function CanvasGlobe({active}:{active:number}){const canvasRef=useRef<HTMLCanvasElement>(null);const rotRef=useRef(0.4);const frameRef=useRef(0);useEffect(()=>{const canvas=canvasRef.current;if(!canvas)return;const ctx=canvas.getContext("2d");if(!ctx)return;const dpr=window.devicePixelRatio||1;function resize(){if(!canvas)return;const r=canvas.getBoundingClientRect();canvas.width=r.width*dpr;canvas.height=r.height*dpr;}resize();const N=280;const gold=Math.PI*(3-Math.sqrt(5));const dots:{x:number;y:number;z:number}[]=[];for(let i=0;i<N;i++){const t=gold*i;const p=Math.acos(1-2*(i+0.5)/N);dots.push({x:Math.cos(t)*Math.sin(p),y:Math.cos(p),z:Math.sin(t)*Math.sin(p)});}const cXYZ=gs.map(g=>latLngToXYZ(g.lat,g.lng));function draw(){if(!canvas||!ctx)return;const w=canvas.width/dpr;const h=canvas.height/dpr;const R=Math.min(w,h)*0.42;const cx=w/2;const cy=h/2;const rot=rotRef.current;const cosR=Math.cos(rot);const sinR=Math.sin(rot);ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);const gl=ctx.createRadialGradient(cx-R*0.2,cy-R*0.2,0,cx,cy,R*1.3);gl.addColorStop(0,"rgba(201,149,107,0.06)");gl.addColorStop(1,"transparent");ctx.fillStyle=gl;ctx.fillRect(0,0,w,h);ctx.beginPath();ctx.arc(cx,cy,R,0,Math.PI*2);ctx.strokeStyle="rgba(192,184,164,0.2)";ctx.lineWidth=0.7;ctx.stroke();ctx.strokeStyle="rgba(200,192,172,0.06)";ctx.lineWidth=0.4;for(let lat=-60;lat<=60;lat+=30){const p2=(90-lat)*Math.PI/180;const rr=Math.sin(p2)*R;const ry=cy-Math.cos(p2)*R;ctx.beginPath();ctx.ellipse(cx,ry,rr,rr*0.12,0,0,Math.PI*2);ctx.stroke();}for(const p of dots){const x=p.x*cosR+p.z*sinR;const z=-p.x*sinR+p.z*cosR;if(z<-0.05)continue;const sx=cx+x*R;const sy=cy-p.y*R;const a=Math.max(0,Math.min(1,(z+0.3)*0.55));ctx.beginPath();ctx.arc(sx,sy,0.9+z*0.7,0,Math.PI*2);ctx.fillStyle=`rgba(180,168,148,${a*0.5})`;ctx.fill();}const proj:{sx:number;sy:number;z:number}[]=[];for(let i=0;i<cXYZ.length;i++){const p=cXYZ[i];const x=p.x*cosR+p.z*sinR;const z=-p.x*sinR+p.z*cosR;const sx=cx+x*R;const sy=cy-p.y*R;proj.push({sx,sy,z});if(z<0)continue;if(i===active){ctx.beginPath();ctx.arc(sx,sy,7,0,Math.PI*2);ctx.fillStyle="rgba(201,149,107,0.12)";ctx.fill();}ctx.beginPath();ctx.arc(sx,sy,i===active?3.5:2,0,Math.PI*2);ctx.fillStyle=i===active?c.warm:"rgba(176,168,148,0.6)";ctx.fill();}for(let i=0;i<cXYZ.length;i++){const n=(i+1)%cXYZ.length;const a2=proj[i];const b=proj[n];if(a2.z<-0.2||b.z<-0.2)continue;ctx.beginPath();ctx.moveTo(a2.sx,a2.sy);ctx.quadraticCurveTo((a2.sx+b.sx)/2,(a2.sy+b.sy)/2-Math.abs(a2.sx-b.sx)*0.18,b.sx,b.sy);ctx.strokeStyle=i===active?"rgba(201,149,107,0.28)":"rgba(201,149,107,0.05)";ctx.lineWidth=i===active?1:0.4;ctx.setLineDash(i===active?[3,3]:[]);ctx.stroke();ctx.setLineDash([]);}rotRef.current+=0.0018;frameRef.current=requestAnimationFrame(draw);}frameRef.current=requestAnimationFrame(draw);const ro=new ResizeObserver(()=>resize());ro.observe(canvas);return()=>{cancelAnimationFrame(frameRef.current);ro.disconnect();};},[active]);return<canvas ref={canvasRef} className="globeCanvas"/>;}
function GlobeSection(){const[a,setA]=useState(0);const tr=useRef<ReturnType<typeof setTimeout>|null>(null);const reset=useCallback(()=>{if(tr.current)clearTimeout(tr.current);tr.current=setTimeout(()=>setA(p=>(p+1)%gs.length),6000);},[]);useEffect(()=>{reset();return()=>{if(tr.current)clearTimeout(tr.current);};},[a,reset]);const s=gs[a];return(<section className="globeSec"><div className="container"><FI><div className="shW"><h2 className="serif shT">A UK-first workflow with global relevance.</h2><p className="shB">Repeat-prescription admin is painful in different ways across different systems, but the core problem is familiar everywhere.</p></div></FI><div className="globeW"><div className="globeV"><CanvasGlobe active={a}/></div><div className="globeC"><AnimatePresence mode="wait"><motion.div key={a} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}} transition={{duration:0.3}} className="globeStory"><div className="globeCtry"><span style={{fontSize:"17px"}}>{s.flag}</span><span className="globeCtryN">{s.country}</span></div><p className="serif globeQ">&ldquo;{s.quote}&rdquo;</p><p className="globeNm">{s.name}</p><div className="globeL"><div className="globeLA"><Image src="/laura-avatar.png" alt="Laura" fill sizes="20px" style={{objectFit:"cover"}}/></div><p className="globeLT">{s.laura}</p></div></motion.div></AnimatePresence><div className="globeNav"><div className="globeDs">{gs.map((_,i)=><button key={i} className={`globeD${i===a?" globeDA":""}`} onClick={()=>setA(i)}/>)}</div><div className="globeAs"><button className="globeA" onClick={()=>setA(p=>(p-1+gs.length)%gs.length)}><ChevronLeft size={14}/></button><button className="globeA" onClick={()=>setA(p=>(p+1)%gs.length)}><ChevronRight size={14}/></button></div></div></div></div></div></section>);}

/* ─── Roadmap ─── */
const roadmap=[{step:"Now",title:"Repeat prescriptions",desc:"Reminders, request prep, tracking to pickup or delivery.",color:c.green},{step:"Next",title:"Pharmacy status updates",desc:"Acknowledge, in progress, ready, delayed.",color:c.accent},{step:"Next",title:"Letters and referrals",desc:"Turn confusing paperwork into clear next steps.",color:c.warm},{step:"Later",title:"Appointments and follow-ups",desc:"Prep, reminders, and next-step coordination.",color:c.muted}];
function Roadmap(){const ref=useRef<HTMLDivElement>(null);const[active,setActive]=useState(0);function onScroll(){const el=ref.current;if(!el)return;const ch=Array.from(el.children) as HTMLElement[];const mid=el.scrollLeft+el.clientWidth/2;let n=0,s=Infinity;ch.forEach((c2,i)=>{const d=Math.abs(c2.offsetLeft+c2.clientWidth/2-mid);if(d<s){s=d;n=i;}});setActive(n);}function go(i:number){const el=ref.current;if(!el)return;const ch=el.children[i] as HTMLElement;if(ch)el.scrollTo({left:ch.offsetLeft-12,behavior:"smooth"});setActive(i);}return(<section className="sec"><div className="container"><FI><div className="shW"><h2 className="serif shT">Start with prescriptions. Expand into the rest of the admin people hate.</h2></div></FI><div className="roadScroll" ref={ref} onScroll={onScroll}>{roadmap.map((item,i)=>(<motion.div key={item.title} className="roadCard" initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.07}}><div className="roadStep" style={{background:`${item.color}10`,color:item.color,borderColor:`${item.color}20`}}>{item.step}</div><h4 className="roadTi">{item.title}</h4><p className="roadDs">{item.desc}</p></motion.div>))}</div><div className="roadDots">{roadmap.map((_,i)=><button key={i} className={`roadDot${i===active?" roadDotA":""}`} onClick={()=>go(i)}/>)}</div></div></section>);}

/* ─── Logo Marquee ─── */
function LogoMarquee(){
  const logos=[
    {src:"/logos/openai-wordmark.svg",alt:"OpenAI",w:120,h:28},
    {src:"/logos/stripe.svg",alt:"Stripe",w:72,h:28},
    {src:"/logos/twilio.svg",alt:"Twilio",w:88,h:28},
    {src:"/logos/vercel.svg",alt:"Vercel",w:96,h:24},
    {src:"/logos/microsoft-logo.png",alt:"Microsoft",w:120,h:26}
  ];
  const doubled=[...logos,...logos];

  return(
    <section className="logoSec">
      <div className="container logoHd">
        <p className="logoLbl">Built on trusted infrastructure</p>
      </div>
      <div className="logoMarqueeW">
        <div className="logoFadeL"/>
        <div className="logoFadeR"/>
        <motion.div className="logoTrack" animate={{x:["0%","-50%"]}} transition={{duration:24,repeat:Infinity,ease:"linear"}}>
          {doubled.map((l,i)=>(
            <div key={i} className="logoItem">
              <Image
                src={l.src}
                alt={l.alt}
                width={l.w}
                height={l.h}
                unoptimized={l.src.endsWith(".svg")}
                style={{
                  width:l.w,
                  height:l.h,
                  objectFit:"contain",
                  opacity:l.src.endsWith(".png") ? 0.4 : 0.35,
                  filter:"grayscale(1)"
                }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── SDK Terminal ─── */
function SDKTerminal(){const lines=useMemo(()=>['$ npm install @omela/laura-sdk','','  const laura = new Laura({','    apiKey: process.env.OMELA_KEY,','    region: "eu-west-2"','  });','','  const refill = await laura.prescription({','    patient: "patient_4102",','    medication: "Amlodipine 5mg",','    action: "prepare-request"','  });','','  // Request prepared, status: pending','  Done in 0.9s'],[]);const[vl,setVl]=useState(0);const[ci,setCi]=useState(0);useEffect(()=>{if(vl>=lines.length){const t=setTimeout(()=>{setVl(0);setCi(0);},3000);return()=>clearTimeout(t);}const line=lines[vl];if(ci<line.length){const t=setTimeout(()=>setCi(p=>p+1),line.startsWith("  //")?36:18);return()=>clearTimeout(t);}else{const t=setTimeout(()=>{setVl(p=>p+1);setCi(0);},line===""?50:140);return()=>clearTimeout(t);}},[vl,ci,lines]);return<div className="trm"><div className="trmT"><div className="trmD"><span/><span/><span/></div><span className="trmTi">Laura SDK</span><Soon/></div><div className="trmB">{lines.slice(0,vl+1).map((line,i)=>{const a2=i===vl;return<div key={i} className="trmL" style={{color:line.startsWith("  Done")||line.startsWith("  //")?"#4ADE80":line.startsWith("$")?"#E2E8F0":"#94A3B8"}}>{a2?line.slice(0,ci):line}{a2&&<span className="trmC">|</span>}</div>;})}</div></div>;}

/* ─── Confetti + Modal ─── */
const CONFETTI_PARTICLES = Array.from({length:18},(_,i)=>({
  id:i,
  emoji:["\u{1F389}","\u{2728}","\u{1F38A}","\u{1F31F}"][i%4],
  left:(i*17)%100,
  delay:(i%6)*0.08,
  dur:1.4+(i%5)*0.12,
  rot:(i*43)%360,
}));
function Confetti(){return<div className="confW">{CONFETTI_PARTICLES.map(p=><motion.span key={p.id} className="confP" initial={{opacity:1,y:0,scale:0}} animate={{opacity:[1,1,0],y:-110,scale:[0,1.1,0.7],rotate:p.rot}} transition={{duration:p.dur,delay:p.delay,ease:"easeOut"}} style={{left:`${p.left}%`}}>{p.emoji}</motion.span>)}</div>;}
function SuccessModal({open,onClose,referralCode}:{open:boolean;onClose:()=>void;referralCode:string}){const[copied,setCopied]=useState(false);const link=typeof window!=="undefined"?`${window.location.origin}?ref=${referralCode}`:"";function copyLink(){navigator.clipboard.writeText(link).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);});}async function shareLink(){if(navigator.share){try{await navigator.share({title:"Join Omela",text:"Stop chasing repeat prescriptions. Try Laura.",url:link});}catch{}}else{copyLink();}}return<AnimatePresence>{open&&<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose} className="modO"><motion.div initial={{opacity:0,y:18,scale:0.96}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:10}} transition={{type:"spring",damping:22,stiffness:300}} onClick={e=>e.stopPropagation()} className="modB"><Confetti/><motion.div className="modCel" initial={{scale:0}} animate={{scale:1}} transition={{type:"spring",delay:0.2,stiffness:400,damping:15}}><span style={{fontSize:"28px"}}>{"\u{1F389}"}</span></motion.div><h3 className="serif modTi">You are on the list!</h3><p className="modBd">We will reach out as access opens. Invite 3 friends to move up the waitlist and unlock bonus credits.</p>{referralCode&&<div className="modRef"><p className="modRefLbl">Your referral link</p><div className="modRefBox"><span className="modRefUrl">{link.replace("https://","").replace("http://","")}</span><button onClick={copyLink} className="modRefCp" type="button">{copied?<Check size={13}/>:<Copy size={13}/>}</button></div><div className="modRefBts"><button onClick={shareLink} className="btnP modShareBtn" type="button"><Share2 size={12}/>Share</button><a href="https://x.com/joinomela" target="_blank" rel="noreferrer" className="btnS modXBtn">Follow @joinomela</a></div></div>}<button type="button" className="modClose" onClick={onClose}>Close</button></motion.div></motion.div>}</AnimatePresence>;}

/* ═════════════ PAGE ═════════════ */
export default function Page(){
  const[role,setRole]=useState<Role>("patient");const[email,setEmail]=useState("");const[website,setWebsite]=useState("");const[agreed,setAgreed]=useState(false);const[submitting,setSubmitting]=useState(false);const[success,setSuccess]=useState("");const[error,setError]=useState("");const[modalOpen,setModalOpen]=useState(false);const[referralCode,setReferralCode]=useState("");const[refParam,setRefParam]=useState("");
  useEffect(()=>{if(typeof window!=="undefined"){const p=new URLSearchParams(window.location.search);const r=p.get("ref");if(r)setRefParam(r);}},[]);
  async function handleSubmit(e:React.FormEvent<HTMLFormElement>){e.preventDefault();if(!agreed)return;setSubmitting(true);setSuccess("");setError("");try{const res=await fetch("/api/waitlist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,role,website,source:"landing-page",marketingOptIn:false,ref:refParam||undefined})});const data=await res.json();if(!res.ok){if(data.referralCode)setReferralCode(data.referralCode);setError(data.error||"Something went wrong.");return;}setSuccess(data.message||"You are in.");if(data.referralCode)setReferralCode(data.referralCode);setEmail("");setRole("patient");setWebsite("");setAgreed(false);setModalOpen(true);}catch{setError("Something went wrong.");}finally{setSubmitting(false);}}

  return(<><style>{FONT}</style><style>{CSS}</style>
    <SuccessModal open={modalOpen} onClose={()=>setModalOpen(false)} referralCode={referralCode}/>
    <div className="wrap">

      {/* ─── NAV ─── */}
      <motion.nav initial={{opacity:0,y:-6}} animate={{opacity:1,y:0}} className="nav"><div className="container navR">
        <Link href="/" className="navBr"><div className="navLo"><Image src="/omela-logo-mark.png" alt="Omela" width={34} height={34} style={{width:"100%",height:"100%",objectFit:"contain"}}/></div><span className="navNm">Omela</span></Link>
        <div className="navLks"><a href="#how" className="navLk">How it works</a><Link href="/demo" className="navLk">Demo</Link><a href="#pricing" className="navLk">Pricing</a></div>
        <a href="#waitlist" className="btnP navCt">Join waitlist <ArrowRight size={13}/></a>
      </div></motion.nav>

      {/* ─── HERO ─── */}
      <section className="heroSec"><div className="container heroGrid">
        <div className="heroTxt">
          <FI><h1 className="serif heroTi">Stop chasing<br/><span className="heroAc">repeat prescriptions.</span></h1></FI>
          <FI delay={0.06}><p className="heroSub">Laura reminds you before you run low, prepares the request, and helps you track it through to pickup or delivery.</p></FI>
          <FI delay={0.1}><p className="heroCredLine">Built for people first. Useful for care teams too. Starting in the UK, with a workflow designed to expand globally.</p></FI>
          <FI delay={0.14}><div className="heroBt"><Link href="/demo" className="btnP">See Laura in action <ArrowRight size={14}/></Link><a href="#waitlist" className="btnS">Join waitlist</a></div></FI>
        </div>
        <FI delay={0.08} className="heroPhCol"><PhoneMockup/></FI>
      </div><Cityscape/></section>

      {/* ─── PROOF: Reminder → Request → Track ─── */}
      <section id="how" className="sec"><div className="container">
        <FI><div className="shW"><h2 className="serif shT">Reminder. Request. Pickup.</h2><p className="shB">Laura turns the monthly refill chase into three calm steps.</p></div></FI>
        <div className="proofGrid">{[
          {icon:<Bell size={22}/>,title:"Get reminded before you run low",body:"Choose when Laura reminds you. A week before, three days before, or your own custom timing.",tone:"warm"},
          {icon:<FileText size={22}/>,title:"Prepare the request faster",body:"Laura helps turn the monthly refill chase into a cleaner, repeatable request ready for your review.",tone:"blue"},
          {icon:<Package size={22}/>,title:"Track it to pickup or delivery",body:"Know whether it is sent, in progress, ready for pickup, or on the way. No more guessing.",tone:"green"},
        ].map((item,i)=>(<FI key={item.title} delay={i*0.06}><div className="proofCard"><motion.div className={`proofIc proofIc--${item.tone}`} animate={{y:[0,-3,0]}} transition={{duration:3.5+i*0.5,repeat:Infinity,ease:"easeInOut"}}>{item.icon}</motion.div><h3 className="proofTi">{item.title}</h3><p className="proofBd">{item.body}</p></div></FI>))}</div>
      </div></section>

      {/* ─── PAIN ─── */}
      <section className="sec secTinted"><div className="container">
        <FI><div className="shW"><h2 className="serif shT">Why repeat prescriptions still feel harder than they should.</h2></div></FI>
        <FI><div className="painGrid">{[
          "You only remember when you are nearly out.",
          "You keep sending the same request again and again.",
          "You are not sure whether it was received.",
          "You do not know when it will be ready.",
          "Care teams end up calling and chasing for multiple people.",
        ].map((item,i)=>(<motion.div key={i} className="painItem" initial={{opacity:0,x:-8}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*0.05}}><span className="painNum">{String(i+1).padStart(2,"0")}</span><p>{item}</p></motion.div>))}</div></FI>
      </div></section>

      {/* ─── WHO IT IS FOR ─── */}
      <section className="sec"><div className="container">
        <FI><div className="shW"><h2 className="serif shT">Built for the people in the loop.</h2></div></FI>
        <div className="audGrid">{[
          {icon:<Users size={22}/>,title:"People",desc:"For anyone managing their own repeat prescriptions and tired of the monthly chase.",color:c.accent},
          {icon:<Building2 size={22}/>,title:"Care teams",desc:"For supported living, care homes, and residential teams managing multiple refill workflows.",color:c.green},
          {icon:<Pill size={22}/>,title:"Pharmacies",desc:"For cleaner incoming requests and better coordination over time.",color:c.warm},
        ].map((item,i)=>(<FI key={item.title} delay={i*0.06}><div className="audCard"><div className="audIc" style={{background:`${item.color}0A`,color:item.color}}>{item.icon}</div><h3 className="audTi">{item.title}</h3><p className="audBd">{item.desc}</p></div></FI>))}</div>
      </div></section>

      {/* ─── GLOBE ─── */}
      <GlobeSection/>

      {/* ─── ROADMAP ─── */}
      <Roadmap/>

      {/* ─── BUILD WITH LAURA ─── */}
      <section className="secDk"><div className="container">
        <FI><div className="shW"><h2 className="serif shT" style={{color:"#fff"}}>Build with Laura.</h2><p className="shB" style={{color:"rgba(255,255,255,0.45)"}}>Embed prescription coordination, status tracking, and refill workflows into your product.</p></div></FI>
        <div className="g2" style={{marginTop:"28px"}}><FI><SDKTerminal/></FI><FI delay={0.06}><div className="dkC"><h3 className="dkCT">Infrastructure for health products</h3><p className="dkCB">Add Laura to patient portals, pharmacy platforms, or care-team tooling.</p><div className="ftL">{["Prescription coordination API","Refill status tracking","Multi-person workflow support","Pharmacy integration pathways"].map(f=><div key={f} className="ftR"><Chk dark/><span>{f}</span></div>)}</div></div></FI></div>
      </div></section>

      {/* ─── LOGOS ─── */}
      <LogoMarquee/>

      {/* ─── PRICING ─── */}
      <section id="pricing" className="sec"><div className="container">
        <FI><div className="shW"><h2 className="serif shT">Clear plans. Real value.</h2><p className="shB">Every action Laura takes uses credits. Start free. Pay as you grow.</p></div></FI>
        <div className="prGrid">{([
          {name:"People",price:"20 free credits",period:"then \u00a34.99 / 100 credits",desc:"For individuals managing their own repeat prescriptions.",features:["Refill reminders","Request drafting","Medication timing preferences","Status tracking","Pickup or delivery updates","Refill history","Notes and follow-up context"],cta:"Join waitlist",featured:false,badge:"",soon:false},
          {name:"Care Teams",price:"From \u00a32,500",period:"/month",desc:"For supported living, care homes, and residential care teams.",features:["Multi-person refill tracking","Due-soon dashboard","Request drafting for residents","Handover visibility","Status tracking across requests","Pickup coordination","Operational alerts"],cta:"Request demo",featured:true,badge:"Best for teams",soon:false},
          {name:"Pharmacy",price:"Custom",period:"usage-based",desc:"For pharmacies wanting cleaner inbound requests and coordination.",features:["Structured incoming requests","Status acknowledgement tools","Ready and delayed notifications","Multi-source request handling","Coordination dashboard","Integration pathways","Priority onboarding"],cta:"Talk to us",featured:false,badge:"",soon:true},
        ] as {name:string;price:string;period:string;desc:string;features:string[];cta:string;featured:boolean;badge:string;soon:boolean}[]).map((p,i)=>(<FI key={p.name} delay={i*0.05}><div className={`prCard${p.featured?" prCardDk":""}`}>{p.badge&&<div className="prBg">{p.badge}</div>}<div style={{display:"flex",alignItems:"center",gap:"6px"}}><span className="prNm">{p.name}</span>{p.soon&&<Soon/>}</div><div className="prPr"><span className="serif prAmt">{p.price}</span></div><p className="prPd">{p.period}</p><p className="prDs">{p.desc}</p><div className="prFts">{p.features.map(f=><div key={f} className="prFt"><Chk dark={p.featured}/><span>{f}</span></div>)}</div><a href="#waitlist" className={`btnP prBt${p.featured?" prBtW":""}`}>{p.cta}</a></div></FI>))}</div>
      </div></section>

      {/* ─── WAITLIST ─── */}
      <section id="waitlist" className="sec secTinted"><div className="container"><FI><div className="wlC">
        <h2 className="serif wlTi">Join the waitlist.</h2>
        <p className="wlSub">Be first to try Laura as we open repeat-prescription coordination in stages, starting in the UK.</p>
        <form className="wlF" onSubmit={handleSubmit}><input className="inp" type="email" placeholder="Your email" value={email} onChange={e=>setEmail(e.target.value)} required autoComplete="email"/><select className="inp" value={role} onChange={e=>setRole(e.target.value as Role)}><option value="patient">I manage my own prescriptions</option><option value="provider">I work in a care team</option><option value="pharmacy">I work in a pharmacy</option></select><input type="text" name="website" value={website} onChange={e=>setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{position:"absolute",left:"-9999px",opacity:0,pointerEvents:"none",height:0,width:0}}/><button type="submit" className="btnP wlBt" disabled={submitting||!agreed}>{submitting?"Submitting...":"Join waitlist"}</button></form>
        <label className="pvL"><input type="checkbox" checked={agreed} onChange={e=>setAgreed(e.target.checked)} required className="pvC"/><span>I agree to the <Link href="/privacy" className="pvLk">Privacy Notice</Link> and <Link href="/terms" className="pvLk">Terms</Link>.</span></label>
        {success&&<div className="fmOk">{success}</div>}{error&&<div className="fmEr">{error}</div>}
      </div></FI></div></section>

      {/* ─── FOOTER ─── */}
      <footer className="ft"><div className="container ftIn">
        <div className="ftTop"><div><Link href="/" className="ftBr"><div className="navLo ftLoW"><Image src="/omela-logo-mark.png" alt="Omela" width={24} height={24} style={{width:"100%",height:"100%",objectFit:"contain"}}/></div><span className="ftBrN">Omela</span></Link></div><div className="ftCols"><div className="ftCol"><div className="ftColT">Product</div><Link href="/demo" className="ftLk">Demo</Link><Link href="/how-laura-helps" className="ftLk">Use cases</Link><Link href="/status" className="ftLk">Status</Link></div><div className="ftCol"><div className="ftColT">Legal</div><Link href="/privacy" className="ftLk">Privacy</Link><Link href="/terms" className="ftLk">Terms</Link><a href="mailto:notice@omela.ai" className="ftLk">Contact</a></div></div></div>
        <div className="ftDsc">Laura coordinates repeat-prescription admin. She does not provide diagnosis or treatment. For emergencies, call 999 or 911.</div>
        <div className="ftBtm"><p>&copy; 2026 Omela.</p></div>
      </div></footer>
    </div>
  </>);
}

const CSS=`
*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}html,body{max-width:100%;overflow-x:clip}
body{background:${c.bg};color:${c.text};font-family:'DM Sans',-apple-system,sans-serif;-webkit-font-smoothing:antialiased;font-size:15px}
a{color:inherit;text-decoration:none}button,input,select{font-family:inherit}::selection{background:${c.accent};color:#fff}
@keyframes blink{0%,50%{opacity:1}50.01%,100%{opacity:0}}
.serif{font-family:'Instrument Serif',Georgia,serif}.wrap{width:100%;overflow-x:clip}.container{max-width:1080px;margin:0 auto;padding:0 20px}
.sec{padding:68px 0}.secTinted{padding:68px 0;background:linear-gradient(180deg,#F5F1EA,${c.bg})}.secDk{padding:68px 0;background:${c.dark};color:#fff}
.soon{display:inline-flex;padding:2px 7px;border-radius:5px;background:rgba(37,99,235,0.06);color:${c.accent};font-size:9px;font-weight:700;border:1px solid rgba(37,99,235,0.1)}
.chk{width:18px;height:18px;border-radius:999px;background:${c.greenSoft};color:${c.greenDk};display:inline-flex;align-items:center;justify-content:center;font-size:9px;font-weight:800;flex-shrink:0;margin-top:1px}.chkD{background:rgba(34,197,94,0.12);color:#4ADE80}
.shW{text-align:center;max-width:680px;margin:0 auto}.shT{font-size:clamp(24px,4.8vw,44px);line-height:1.08;letter-spacing:-0.04em}.shB{font-size:clamp(14px,2.2vw,16px);line-height:1.76;margin-top:12px;max-width:500px;margin-left:auto;margin-right:auto;color:${c.sub}}
/* Buttons */
.btnP{display:inline-flex;align-items:center;justify-content:center;gap:6px;background:${c.dark};color:#fff;border:none;border-radius:999px;padding:13px 22px;font-size:14px;font-weight:700;cursor:pointer;transition:all 0.25s;white-space:nowrap;box-shadow:0 3px 10px rgba(0,0,0,0.08)}.btnP:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 8px 24px rgba(0,0,0,0.13)}.btnP:disabled{opacity:0.5;cursor:not-allowed}
.btnS{display:inline-flex;align-items:center;justify-content:center;gap:6px;background:rgba(255,255,255,0.88);color:${c.text};border:1px solid ${c.border};border-radius:999px;padding:13px 22px;font-size:14px;font-weight:700;cursor:pointer;transition:all 0.25s;white-space:nowrap}.btnS:hover{background:#fff;box-shadow:0 4px 14px rgba(0,0,0,0.05)}
/* Nav */
.nav{position:sticky;top:0;z-index:100;background:rgba(248,246,241,0.9);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid rgba(227,221,210,0.45)}.navR{display:flex;align-items:center;justify-content:space-between;gap:8px;height:58px}.navBr{display:flex;align-items:center;gap:7px;flex-shrink:0}.navLo{width:30px;height:30px;border-radius:8px;overflow:hidden;flex-shrink:0;box-shadow:0 1px 4px rgba(0,0,0,0.06)}.navNm{font-size:15px;font-weight:800;letter-spacing:-0.03em}.navLks{display:none;align-items:center;gap:22px}.navLk{font-size:13px;font-weight:600;color:${c.sub};transition:color 0.2s}.navLk:hover{color:${c.text}}.navCt{padding:9px 16px!important;font-size:12px!important;flex-shrink:0}
/* Hero */
.heroSec{padding:48px 0 0;position:relative;overflow:hidden}.heroGrid{display:grid;grid-template-columns:1fr;gap:28px;align-items:center}
.heroTxt{max-width:540px}.heroTi{font-size:clamp(34px,8vw,68px);line-height:0.96;letter-spacing:-0.05em}.heroAc{color:${c.accent};font-style:italic}
.heroSub{margin-top:16px;font-size:clamp(15px,2.2vw,17px);line-height:1.72;color:${c.sub};max-width:460px}
.heroCredLine{margin-top:10px;font-size:13px;line-height:1.6;color:${c.muted};font-weight:600}
.heroBt{display:flex;flex-wrap:wrap;gap:8px;margin-top:20px}
.heroPhCol{display:flex;justify-content:center}
/* Cityscape */
.cityW{width:100%;margin-top:8px;overflow:hidden;opacity:0.7}.citySvg{width:100%;height:auto;display:block}
/* Phone */
.phW{width:100%;max-width:280px;position:relative}
.phGlow{position:absolute;inset:-24px;border-radius:999px;background:radial-gradient(circle,rgba(37,99,235,0.05),transparent 65%);z-index:0}
.phF{position:relative;z-index:1}
.phB{background:#111;border-radius:32px;padding:5px;box-shadow:0 18px 44px rgba(0,0,0,0.14),0 0 0 1px rgba(255,255,255,0.04) inset}
.phNotch{width:80px;height:22px;border-radius:999px;background:#000;margin:0 auto 3px}
.phS{background:#FAFAF8;border-radius:28px;overflow:hidden;min-height:420px;display:flex;flex-direction:column}
.phHead{display:flex;align-items:center;gap:9px;padding:14px 16px 12px;background:rgba(255,255,255,0.9);border-bottom:1px solid rgba(228,221,210,0.6)}
.phAv{position:relative;width:28px;height:28px;border-radius:999px;overflow:hidden;flex-shrink:0;border:1.5px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.06)}
.phName{font-size:13px;font-weight:800;letter-spacing:-0.02em}.phSub{font-size:10px;color:${c.accent};font-weight:700;margin-top:1px}
.phBody{flex:1;display:flex;flex-direction:column;justify-content:center;padding:16px;gap:10px}
.phCard{padding:18px;border-radius:18px;background:rgba(255,255,255,0.92);border:1px solid rgba(228,221,210,0.7);box-shadow:0 4px 16px rgba(0,0,0,0.03)}
.phCardBadge{display:inline-flex;padding:3px 9px;border-radius:999px;font-size:10px;font-weight:800;border:1px solid}
.phCardTitle{margin-top:10px;font-size:14px;font-weight:800;letter-spacing:-0.02em}
.phCardBody{margin-top:5px;font-size:11.5px;line-height:1.6;color:${c.sub}}
.phCardTime{display:block;margin-top:8px;font-size:10px;color:${c.muted};font-weight:600}
.phDots{display:flex;gap:4px;justify-content:center;margin-top:4px}.phDot{width:5px;height:5px;border-radius:999px;background:${c.border}}.phDotA{background:${c.accent};width:14px}
.phFoot{padding:12px 16px;font-size:10px;color:${c.muted};font-weight:700;text-align:center;border-top:1px solid rgba(228,221,210,0.4)}
/* Proof cards */
.proofGrid{display:grid;grid-template-columns:1fr;gap:14px;margin-top:32px}
.proofCard{padding:26px;border-radius:22px;background:rgba(255,255,255,0.94);border:1px solid ${c.border};box-shadow:0 4px 18px rgba(0,0,0,0.02);transition:all 0.3s}.proofCard:hover{box-shadow:0 10px 32px rgba(0,0,0,0.05);transform:translateY(-1px)}
.proofIc{width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:14px}.proofIc--warm{background:${c.warmSoft};color:${c.warm}}.proofIc--blue{background:${c.accentSoft};color:${c.accent}}.proofIc--green{background:${c.greenSoft};color:${c.greenDk}}
.proofTi{font-size:17px;font-weight:800;letter-spacing:-0.02em}.proofBd{margin-top:6px;font-size:13.5px;line-height:1.72;color:${c.sub}}
/* Pain */
.painGrid{display:flex;flex-direction:column;gap:10px;max-width:640px;margin:28px auto 0}
.painItem{display:flex;align-items:flex-start;gap:12px;padding:16px 18px;border-radius:16px;background:rgba(255,255,255,0.7);border:1px solid rgba(228,221,210,0.5)}
.painNum{font-size:11px;font-weight:800;color:${c.muted};flex-shrink:0;margin-top:1px;width:20px}
.painItem p{font-size:14px;line-height:1.68;color:${c.sub}}
/* Audience */
.audGrid{display:grid;grid-template-columns:1fr;gap:14px;margin-top:32px}
.audCard{padding:26px;border:1px solid ${c.border};border-radius:22px;background:rgba(255,255,255,0.94);transition:all 0.3s}.audCard:hover{box-shadow:0 8px 24px rgba(0,0,0,0.04)}
.audIc{width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:12px}
.audTi{font-size:17px;font-weight:800;letter-spacing:-0.02em}.audBd{margin-top:6px;font-size:13.5px;line-height:1.76;color:${c.sub}}
/* Globe */
.globeSec{padding:68px 0;background:linear-gradient(180deg,${c.bg},#EDE8DD,${c.bg})}
.globeW{display:flex;flex-direction:column;align-items:center;gap:20px;margin-top:28px}.globeV{width:100%;max-width:320px;aspect-ratio:1;margin:0 auto}.globeCanvas{width:100%;height:100%;display:block}
.globeC{width:100%;max-width:460px;text-align:center}.globeStory{min-height:170px}.globeCtry{display:flex;align-items:center;justify-content:center;gap:5px;margin-bottom:8px}.globeCtryN{font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;color:${c.muted};background:rgba(255,255,255,0.75);padding:2px 8px;border-radius:4px}
.globeQ{font-size:clamp(15px,3vw,19px);line-height:1.34;letter-spacing:-0.02em;font-style:italic}.globeNm{font-size:11px;color:${c.muted};font-weight:600;margin-top:6px;font-style:italic}
.globeL{display:flex;align-items:flex-start;gap:7px;margin-top:12px;background:rgba(255,255,255,0.85);border:1px solid ${c.border};border-radius:14px;padding:11px 12px;text-align:left}.globeLA{position:relative;width:20px;height:20px;border-radius:999px;overflow:hidden;flex-shrink:0;border:1px solid #fff}.globeLT{font-size:12px;line-height:1.65;color:${c.sub}}
.globeNav{display:flex;align-items:center;justify-content:center;gap:12px;margin-top:14px}.globeDs{display:flex;gap:4px}.globeD{width:6px;height:6px;border-radius:999px;background:${c.border};border:none;cursor:pointer;transition:all 0.3s;padding:0}.globeDA{background:${c.warm};width:16px}.globeAs{display:flex;gap:4px}.globeA{width:28px;height:28px;border-radius:999px;background:rgba(255,255,255,0.88);border:1px solid ${c.border};display:flex;align-items:center;justify-content:center;cursor:pointer;color:${c.sub}}
/* Roadmap */
.roadScroll{display:flex;gap:12px;margin-top:24px;overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;padding:4px 0 6px;scrollbar-width:none}.roadScroll::-webkit-scrollbar{display:none}
.roadCard{min-width:240px;max-width:280px;flex-shrink:0;scroll-snap-align:start;background:rgba(255,255,255,0.6);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.65);border-radius:18px;padding:22px;transition:all 0.3s;box-shadow:0 3px 16px rgba(0,0,0,0.03)}.roadCard:hover{box-shadow:0 8px 28px rgba(0,0,0,0.06);transform:translateY(-1px)}
.roadStep{display:inline-flex;padding:3px 9px;border-radius:999px;font-size:10px;font-weight:800;border:1px solid;margin-bottom:12px}
.roadTi{font-size:15px;font-weight:800;letter-spacing:-0.02em}.roadDs{margin-top:5px;font-size:12.5px;line-height:1.65;color:${c.sub}}
.roadDots{display:flex;gap:4px;justify-content:center;margin-top:12px}.roadDot{width:6px;height:6px;border-radius:999px;background:${c.border};border:none;cursor:pointer;transition:all 0.3s;padding:0}.roadDotA{background:${c.warm};width:16px}
/* Terminal */
.trm{background:#07080B;border:1px solid #1E2130;border-radius:16px;overflow:hidden;height:320px;display:flex;flex-direction:column}
.trmT{display:flex;align-items:center;gap:5px;padding:9px 12px;border-bottom:1px solid #1B1F2B;background:#0E1118;flex-shrink:0}.trmD{display:flex;gap:4px}.trmD span{width:7px;height:7px;border-radius:999px;display:inline-block}.trmD span:nth-child(1){background:#FF5F57}.trmD span:nth-child(2){background:#FEBC2E}.trmD span:nth-child(3){background:#28C840}.trmTi{font-size:9px;color:#5B6270;font-weight:700;flex:1}
.trmB{padding:12px;flex:1;overflow:hidden}.trmL{white-space:pre-wrap;word-break:break-all;font-size:10px;line-height:1.7;font-family:'SF Mono',ui-monospace,Menlo,monospace}.trmC{color:#60A5FA;animation:blink 0.8s step-end infinite}
.g2{display:grid;grid-template-columns:1fr;gap:14px}.dkC{background:linear-gradient(180deg,rgba(14,17,24,0.98),rgba(10,13,19,0.98));border:1px solid ${c.borderDk};border-radius:20px;padding:24px}.dkCT{font-size:clamp(16px,2.8vw,20px);font-weight:800;color:#fff}.dkCB{margin-top:6px;color:rgba(255,255,255,0.45);font-size:13px;line-height:1.78}.ftL{display:flex;flex-direction:column;gap:6px;margin-top:12px}.ftR{display:flex;align-items:flex-start;gap:6px;font-size:12.5px;line-height:1.5;color:rgba(255,255,255,0.6)}
/* Logos */
.logoSec{padding:32px 0;border-top:1px solid rgba(228,221,210,0.6);border-bottom:1px solid rgba(228,221,210,0.6);overflow:hidden}
.logoHd{text-align:center;margin-bottom:16px}.logoLbl{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:${c.muted}}
.logoMarqueeW{position:relative;width:100%;overflow:hidden}.logoFadeL,.logoFadeR{position:absolute;top:0;bottom:0;width:60px;z-index:2;pointer-events:none}.logoFadeL{left:0;background:linear-gradient(90deg,${c.bg},transparent)}.logoFadeR{right:0;background:linear-gradient(270deg,${c.bg},transparent)}
.logoTrack{display:flex;width:max-content;gap:52px;align-items:center;padding:4px 0}
.logoItem{flex:0 0 auto;display:flex;align-items:center;justify-content:center}
/* Pricing */
.prGrid{display:grid;grid-template-columns:1fr;gap:14px;margin-top:32px}
.prCard{background:rgba(255,255,255,0.96);border:1px solid ${c.border};border-radius:22px;padding:28px;position:relative;transition:all 0.3s;display:flex;flex-direction:column}.prCard:hover{box-shadow:0 10px 32px rgba(0,0,0,0.05)}
.prCardDk{background:linear-gradient(180deg,#111318,#0D0F14)!important;border:1px solid ${c.borderDk}!important;color:#fff!important}
.prBg{position:absolute;top:12px;right:12px;border-radius:6px;padding:4px 10px;background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.65);font-size:9px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase}
.prNm{font-size:16px;font-weight:800}.prPr{margin-top:10px}.prAmt{font-size:clamp(22px,4.5vw,34px);letter-spacing:-0.04em}.prPd{font-size:12px;color:${c.muted};margin-top:3px}.prCardDk .prPd{color:rgba(255,255,255,0.3)}.prDs{margin-top:10px;font-size:13px;line-height:1.72;color:${c.sub}}.prCardDk .prDs{color:rgba(255,255,255,0.5)}
.prFts{display:flex;flex-direction:column;gap:6px;margin-top:16px;padding-top:16px;border-top:1px solid ${c.border};flex:1}.prCardDk .prFts{border-top-color:rgba(255,255,255,0.07)}
.prFt{display:flex;align-items:flex-start;gap:6px;font-size:12.5px;line-height:1.5;color:${c.sub}}.prCardDk .prFt{color:rgba(255,255,255,0.6)}
.prBt{margin-top:18px;width:100%}.prBtW{background:#fff!important;color:${c.dark}!important}
/* Waitlist */
.wlC{background:rgba(255,255,255,0.94);border:1px solid ${c.border};border-radius:24px;padding:28px;max-width:680px;margin:0 auto;box-shadow:0 4px 18px rgba(0,0,0,0.03);text-align:center}
.wlTi{font-size:clamp(24px,4.5vw,38px);letter-spacing:-0.04em}.wlSub{margin-top:10px;font-size:14px;line-height:1.72;color:${c.sub};max-width:440px;margin-left:auto;margin-right:auto}
.wlF{display:grid;grid-template-columns:1fr;gap:8px;margin-top:16px;position:relative}.wlBt{height:48px;width:100%}
.inp{width:100%;height:48px;border-radius:12px;border:1px solid ${c.border};background:#fff;padding:0 14px;font-size:14px;color:${c.text};outline:none;transition:all 0.2s}.inp:focus{border-color:${c.accent};box-shadow:0 0 0 3px rgba(37,99,235,0.05)}
.pvL{display:flex;align-items:flex-start;gap:5px;margin-top:10px;color:${c.sub};font-size:11px;line-height:1.55;cursor:pointer;max-width:420px;margin-left:auto;margin-right:auto}.pvC{margin-top:1px;width:14px;height:14px;accent-color:${c.accent};flex-shrink:0}.pvLk{color:${c.text};font-weight:700;text-decoration:underline;text-underline-offset:2px}
.fmOk{margin-top:10px;background:${c.greenSoft};color:${c.greenDk};border-radius:12px;padding:12px;text-align:center;font-size:13px;font-weight:600}.fmEr{margin-top:10px;background:#FFF7F7;color:#B91C1C;border-radius:12px;padding:12px;text-align:center;font-size:13px;font-weight:600}
/* Modal */
.modO{position:fixed;inset:0;z-index:220;background:rgba(9,10,13,0.5);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);display:flex;align-items:center;justify-content:center;padding:14px}
.modB{width:100%;max-width:400px;background:rgba(255,255,255,0.98);border:1px solid ${c.border};border-radius:22px;padding:28px;box-shadow:0 20px 50px rgba(0,0,0,0.16);position:relative;overflow:hidden;text-align:center}
.modCel{width:52px;height:52px;border-radius:999px;background:linear-gradient(135deg,#FFF8F0,#ECFDF3);border:1px solid rgba(34,197,94,0.12);display:flex;align-items:center;justify-content:center;margin:0 auto 14px}
.modTi{font-size:clamp(20px,4.5vw,28px);letter-spacing:-0.04em}.modBd{margin-top:6px;color:${c.sub};font-size:13px;line-height:1.7}
.modRef{margin-top:18px;padding:14px;border-radius:14px;background:rgba(37,99,235,0.03);border:1px solid rgba(37,99,235,0.07)}
.modRefLbl{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:${c.muted};margin-bottom:6px}
.modRefBox{display:flex;align-items:center;gap:6px;background:#fff;border:1px solid ${c.border};border-radius:8px;padding:6px 8px}
.modRefUrl{flex:1;font-size:11px;color:${c.sub};font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:left}
.modRefCp{width:30px;height:30px;border-radius:7px;background:${c.accentSoft};border:1px solid rgba(37,99,235,0.08);color:${c.accent};display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0}
.modRefBts{display:flex;gap:6px;margin-top:10px}.modShareBtn{flex:1;padding:8px 12px!important;font-size:12px!important}.modXBtn{flex:1;padding:8px 12px!important;font-size:12px!important}
.modClose{margin-top:12px;background:none;border:none;color:${c.muted};font-size:11px;font-weight:600;cursor:pointer;padding:3px 6px}
.confW{position:absolute;inset:0;pointer-events:none;overflow:hidden}.confP{position:absolute;bottom:40%;font-size:14px;pointer-events:none}
/* Footer */
.ft{background:${c.dark};padding:34px 0 18px;color:#fff}.ftTop{display:flex;flex-direction:column;gap:20px}.ftBr{display:flex;align-items:center;gap:6px;text-decoration:none;color:#fff}.ftLoW{background:rgba(255,255,255,0.1);border-radius:7px;padding:2px}.ftBrN{font-size:13px;font-weight:800}.ftCols{display:flex;gap:32px}.ftCol{display:flex;flex-direction:column;gap:6px}.ftColT{font-size:9px;font-weight:800;color:rgba(255,255,255,0.25);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:2px}.ftLk{font-size:12px;color:rgba(255,255,255,0.45);font-weight:500;transition:color 0.2s}.ftLk:hover{color:#fff}
.ftDsc{margin-top:22px;padding:12px 0;border-top:1px solid rgba(255,255,255,0.05);font-size:10px;color:rgba(255,255,255,0.25);line-height:1.65;text-align:center}
.ftBtm{border-top:1px solid rgba(255,255,255,0.05);padding-top:12px;font-size:9px;color:rgba(255,255,255,0.18);text-align:center}
/* Responsive */
@media(max-width:639px){.heroBt{flex-direction:column}.heroBt .btnP,.heroBt .btnS{width:100%;text-align:center}.heroSec{padding:32px 0 0}.navR{height:50px}.roadScroll{padding-right:18vw}}
@media(min-width:640px){.container{padding:0 24px}.sec{padding:76px 0}.secTinted{padding:76px 0}.secDk{padding:76px 0}.navR{height:62px}.navLks{display:flex}.heroGrid{grid-template-columns:1.1fr 0.9fr;gap:36px}.heroPhCol{align-self:start}.proofGrid{grid-template-columns:repeat(3,1fr)}.audGrid{grid-template-columns:repeat(3,1fr)}.prGrid{grid-template-columns:repeat(3,1fr)}.g2{grid-template-columns:repeat(2,1fr);gap:16px}.wlF{grid-template-columns:1.2fr 0.8fr auto}.wlBt{width:auto}.wlC{padding:32px}.ftTop{flex-direction:row;justify-content:space-between}.globeW{flex-direction:row;align-items:center;gap:32px}.globeV{max-width:320px;flex-shrink:0}.globeC{text-align:left}.globeCtry{justify-content:flex-start}.globeQ{text-align:left}.globeNm{text-align:left}}
@media(min-width:960px){.container{padding:0 32px}.sec{padding:84px 0}.secTinted{padding:84px 0}.secDk{padding:84px 0}.navR{height:68px}.heroSec{padding:56px 0 0}.phW{max-width:300px}.phS{min-height:460px}.globeV{max-width:360px}}
@media(min-width:1100px){.heroTi{font-size:clamp(52px,6.5vw,68px)}}
`;