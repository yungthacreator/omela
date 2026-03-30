"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const FONT=`@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');`;
const c={bg:"#F8F6F1",card:"#fff",dark:"#08090C",text:"#111214",sub:"#4A4F5C",muted:"#888E9C",accent:"#2563EB",border:"#E3DDD2",green:"#22C55E",greenSoft:"#ECFDF3",greenDk:"#15803D"};

function FI({children,delay=0}:{children:ReactNode;delay?:number}){const ref=useRef<HTMLDivElement>(null);const v=useInView(ref,{once:true,amount:0.06});return<motion.div ref={ref} initial={{opacity:0,y:20}} animate={v?{opacity:1,y:0}:{}} transition={{duration:0.6,delay,ease:[0.22,1,0.36,1]}}>{children}</motion.div>;}

const scenarios=[
  {emoji:"\u{1F48A}",title:"Chasing repeat prescriptions",body:"You depend on daily medication. Every month you call the GP, wait on hold, repeat the same information, and pray it is ready at the pharmacy. Laura drafts the refill request, tracks the status, and reminds you before you run out. You should not have to chase your own medication every single time.",how:"Laura asks which medication you need and how many days of supply you have left. She finds your registered practice, drafts a refill request you can submit through their online portal, and offers to set a reminder for your next refill."},
  {emoji:"\u{1F4CD}",title:"Moving to a new city with no doctor",body:"You just arrived. You do not know how the healthcare system works, which practices accept patients, or what documents you need. Laura finds practices near your postcode, walks you through registration step by step, and tells you exactly what to bring.",how:"Laura asks for your postcode, searches for GP practices accepting new patients nearby, explains the registration process, lists what documents you need, and can request a registration callback on your behalf."},
  {emoji:"\u{1F319}",title:"It is 11pm and you are worried about your child",body:"Your child has a fever. Is it serious? Should you go to A&E or wait until morning? You are exhausted and scared. Laura helps you assess the situation calmly, tells you what to watch for overnight, and finds the nearest out-of-hours service just in case.",how:"Laura asks targeted questions: Is the child responsive? Drinking fluids? Any rash? Based on your answers, she advises whether to monitor overnight or seek urgent care, finds the nearest out-of-hours service, and can set an 8am reminder to call your GP."},
  {emoji:"\u{1F4CB}",title:"A hospital letter you do not understand",body:"You got a referral for something called an echocardiogram. What does that mean? Where do you go? What do you bring? Laura explains everything in plain language so you walk in prepared, not panicking.",how:"Laura explains the procedure in simple terms, tells you what to wear, what to bring, where to go when you arrive, and what happens with the results afterwards. She can also send you a reminder the day before."},
  {emoji:"\u{1F30D}",title:"Explaining pain in a language that is not yours",body:"You are in a new country. You know something is wrong but you cannot find the words. The receptionist is kind but you cannot understand each other. Laura speaks your language, translates your concern, and prepares a bilingual note the receptionist can read.",how:"Laura detects your language and responds in it. She captures your symptoms, assesses urgency, finds practices nearby, and generates a note in both your language and English that you can show at the front desk."},
  {emoji:"\u{1F624}",title:"Three weeks of being told to try again tomorrow",body:"Your condition is getting worse. Every morning you call at 8am. Every morning they say there are no slots. You cannot keep taking time off work to sit on the phone. Laura finds alternative routes: walk-in clinics, online booking portals, or she submits a structured request that is harder for the practice to ignore.",how:"Laura identifies walk-in clinics and online booking alternatives near you. She can also submit a structured callback request to your GP that includes how long you have been trying, your worsening symptoms, and the urgency level, making it much harder to dismiss."},
];

export default function HowLauraHelps(){
  return(
    <><style>{FONT}</style><style>{CSS}</style>
    <div className="hlW">
      <nav className="hlN"><div className="container hlNI">
        <Link href="/" className="hlBr"><div className="hlLo"><Image src="/omela-logo-mark.png" alt="Omela" width={30} height={30} style={{width:"100%",height:"100%",objectFit:"contain"}}/></div><div><div className="hlBrN">Omela</div><div className="hlBrS">POWERED BY LAURA</div></div></Link>
        <Link href="/" className="btnP hlBk">Back to Omela <ArrowRight size={12}/></Link>
      </div></nav>

      <main className="hlM"><div className="container">
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} className="hlHd">
          <h1 className="serif hlTi">How Laura helps.</h1>
          <p className="hlBd">Real healthcare frustrations that millions of people recognize. Here is how Laura handles each one.</p>
        </motion.div>

        <div className="hlGrid">
          {scenarios.map((s,i)=>(
            <FI key={s.title} delay={i*0.06}>
              <div className="hlCard">
                <span className="hlE">{s.emoji}</span>
                <h2 className="hlCT">{s.title}</h2>
                <p className="hlCB">{s.body}</p>
                <div className="hlHow">
                  <h3 className="hlHowT">How Laura handles this</h3>
                  <p className="hlHowB">{s.how}</p>
                </div>
                <Link href="/demo" className="hlCta">Try this scenario in the demo <ArrowRight size={13}/></Link>
              </div>
            </FI>
          ))}
        </div>

        <div className="hlBottom">
          <p className="hlBottomTxt">These are simulated scenarios showing what the full product will do. The real product with AI is launching soon.</p>
          <div className="hlBottomBtns">
            <Link href="/demo" className="btnP">Try Laura demo <ArrowRight size={14}/></Link>
            <Link href="/#waitlist" className="btnS">Get early access</Link>
          </div>
        </div>
      </div></main>

      <footer className="hlFt"><div className="container hlFtI"><p>&copy; 2026 Omela</p><div style={{display:"flex",gap:"12px"}}><Link href="/privacy" className="hlFtL">Privacy</Link><Link href="/terms" className="hlFtL">Terms</Link></div></div></footer>
    </div>
    </>
  );
}

const CSS=`
*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}
body{background:${c.bg};color:${c.text};font-family:'DM Sans',-apple-system,sans-serif;-webkit-font-smoothing:antialiased;font-size:16px}
a{color:inherit;text-decoration:none}button,input{font-family:inherit}
.serif{font-family:'Instrument Serif',Georgia,serif}
.container{max-width:900px;margin:0 auto;padding:0 20px}
.btnP{display:inline-flex;align-items:center;gap:6px;background:${c.dark};color:#fff;border:none;border-radius:999px;padding:13px 22px;font-size:15px;font-weight:700;cursor:pointer;white-space:nowrap;transition:all 0.2s}
.btnP:hover{transform:translateY(-1px);box-shadow:0 8px 20px rgba(0,0,0,0.12)}
.btnS{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,0.85);color:${c.text};border:1px solid ${c.border};border-radius:999px;padding:13px 22px;font-size:15px;font-weight:700;cursor:pointer}

.hlW{min-height:100vh;display:flex;flex-direction:column}
.hlN{background:rgba(248,246,241,0.94);backdrop-filter:blur(16px);border-bottom:1px solid ${c.border}}
.hlNI{display:flex;align-items:center;justify-content:space-between;height:60px;gap:8px}
.hlBr{display:flex;align-items:center;gap:7px;text-decoration:none}
.hlLo{width:28px;height:28px;border-radius:8px;overflow:hidden;box-shadow:0 2px 6px rgba(0,0,0,0.06)}
.hlBrN{font-size:13px;font-weight:800}.hlBrS{font-size:9px;font-weight:800;letter-spacing:0.1em;color:${c.accent}}
.hlBk{padding:8px 16px!important;font-size:12px!important}

.hlM{flex:1;padding:40px 0 56px}
.hlHd{margin-bottom:36px}
.hlTi{font-size:clamp(32px,7vw,56px);letter-spacing:-0.04em;line-height:1.06}
.hlBd{font-size:17px;color:${c.sub};line-height:1.7;margin-top:10px;max-width:540px}

.hlGrid{display:flex;flex-direction:column;gap:16px}
.hlCard{background:${c.card};border:1px solid ${c.border};border-radius:22px;padding:28px;transition:all 0.25s}
.hlCard:hover{box-shadow:0 10px 30px rgba(0,0,0,0.04)}
.hlE{font-size:32px;display:block;margin-bottom:10px}
.hlCT{font-size:22px;font-weight:800;letter-spacing:-0.03em}
.hlCB{font-size:15px;line-height:1.72;color:${c.sub};margin-top:8px}
.hlHow{margin-top:16px;padding:18px;background:${c.bg};border-radius:14px;border:1px solid ${c.border}}
.hlHowT{font-size:13px;font-weight:800;color:${c.accent};margin-bottom:6px}
.hlHowB{font-size:14px;line-height:1.72;color:${c.sub}}
.hlCta{display:inline-flex;align-items:center;gap:6px;margin-top:16px;font-size:14px;font-weight:700;color:${c.accent}}

.hlBottom{margin-top:40px;text-align:center;padding:28px;background:${c.card};border:1px solid ${c.border};border-radius:22px}
.hlBottomTxt{font-size:14px;color:${c.muted};line-height:1.6;margin-bottom:16px}
.hlBottomBtns{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}

.hlFt{border-top:1px solid ${c.border};padding:18px 0}
.hlFtI{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px}
.hlFtI p{font-size:11px;color:${c.muted}}.hlFtL{font-size:11px;color:${c.muted};font-weight:600}
@media(min-width:640px){.container{padding:0 28px}.hlM{padding:52px 0 64px}}
`;
