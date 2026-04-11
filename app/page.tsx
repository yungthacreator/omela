"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import { Activity, ArrowRight, Bell, Building2, Check, CheckCircle2, Clock, Copy, Database, Eye, GraduationCap, History, Home, Package, PawPrint, RefreshCw, Scale, Share2, Shield, Sparkles, Stethoscope, Users, Wrench } from "lucide-react";

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400","500","600","700","800"], variable: "--font-dm-sans" });
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--font-instrument-serif" });

const c = { bg:"#F8F6F1", card:"#FFFFFF", cream:"#FAF7F2", dark:"#0A0E1A", navy:"#0F1829", text:"#111214", sub:"#4A4F5C", muted:"#888E9C", accent:"#2563EB", accentSoft:"#ECF2FF", border:"#E3DDD2", borderSoft:"#EDE8DF", green:"#22C55E", greenSoft:"#ECFDF3", greenDk:"#15803D", warm:"#C9956B", warmDk:"#A07545", warmSoft:"#FFF8F0", red:"#EF4444", redSoft:"#FEF2F2", redDk:"#B91C1C" };

type Role = "carer" | "household" | "care_team";

function formatTodayLabel(d: Date) {
  const p = new Intl.DateTimeFormat("en-GB", { weekday:"short", day:"numeric", month:"short" }).formatToParts(d);
  return `${p.find(x=>x.type==="weekday")?.value}, ${p.find(x=>x.type==="day")?.value} ${p.find(x=>x.type==="month")?.value}`;
}

function useTodayLabel() {
  const [l, setL] = useState("");
  useEffect(() => { const u = () => setL(formatTodayLabel(new Date())); u(); const id = window.setInterval(u, 60000); return () => window.clearInterval(id); }, []);
  return l;
}

function FI({ children, delay=0, className="" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.08 });
  return <motion.div ref={ref} initial={{ opacity:0, y:16 }} animate={visible ? { opacity:1, y:0 } : {}} transition={{ duration:0.55, delay, ease:[0.22,1,0.36,1] }} className={className}>{children}</motion.div>;
}

function Overline({ children, tone="default", className="" }: { children: ReactNode; tone?: "default"|"warm"|"blue"|"green"; className?: string }) {
  return <span className={`overline overline--${tone} ${className}`.trim()}>{children}</span>;
}

function LauraWorkspace() {
  type Person = { initials:string; name:string; age:number; med:string; dose:string; tone:"warm"|"blue"|"green"; owner:string; ownerRole:string; status:string; statusSub:string; practice:string; pharmacy:string; rxId:string; supply:number; supplyMax:number; timeline:{state:"done"|"active";label:string;meta:string}[]; next:string };
  const people: Person[] = [
    { initials:"ML", name:"Margaret Littlewood", age:78, med:"Amlodipine", dose:"5mg, once daily", tone:"warm", owner:"Ada Kelly", ownerRole:"daughter", status:"Needs follow-up", statusSub:"No update from practice in 3 days", practice:"Greenfield Medical", pharmacy:"Boots, High Street", rxId:"RX-20814", supply:2, supplyMax:30,
      timeline:[{state:"done",label:"Draft prepared",meta:"Mon 09:14"},{state:"done",label:"Sent to practice",meta:"Tue 11:32"},{state:"done",label:"Practice acknowledged",meta:"Tue 16:05"},{state:"active",label:"Awaiting response",meta:"3 days"}], next:"Ada to call the practice before 4pm today." },
    { initials:"DR", name:"David Reyes", age:64, med:"Metformin", dose:"500mg, twice daily", tone:"blue", owner:"Dr. Reyes", ownerRole:"prescriber", status:"Request sent", statusSub:"Pharmacy processing", practice:"Northgate Surgery", pharmacy:"Well, Market Square", rxId:"RX-20819", supply:6, supplyMax:30,
      timeline:[{state:"done",label:"Draft prepared",meta:"Tue 08:02"},{state:"done",label:"Approved by Jamie",meta:"Tue 09:41"},{state:"done",label:"Sent to pharmacy",meta:"Wed 10:15"},{state:"active",label:"Awaiting confirmation",meta:"today"}], next:"No action needed. Omela will alert on any change." },
    { initials:"IK", name:"Irene Kowalski", age:81, med:"Sertraline", dose:"50mg, once daily", tone:"green", owner:"Jamie Marsh", ownerRole:"support worker", status:"Ready to collect", statusSub:"Boots, 12 High Street", practice:"Hillside Practice", pharmacy:"Boots, High Street", rxId:"RX-20806", supply:14, supplyMax:30,
      timeline:[{state:"done",label:"Draft prepared",meta:"Fri 14:20"},{state:"done",label:"Sent to practice",meta:"Mon 09:03"},{state:"done",label:"Dispensed",meta:"today 11:20"},{state:"done",label:"Ready at pharmacy",meta:"today 12:44"}], next:"Collection window open until 6pm." },
  ];
  const stats = [{label:"Due soon",value:5,tone:"warm"as const},{label:"Delayed",value:1,tone:"red"as const},{label:"Ready",value:2,tone:"green"as const}];
  const activity = [
    { who:"Dr. Reyes", what:"drafted Metformin refill for David", when:"just now", tone:"blue" as const, fresh:true },
    { who:"Ada Kelly", what:"approved amlodipine request", when:"14m", tone:"warm" as const, fresh:false },
    { who:"Jamie M.", what:"marked Sertraline ready at Boots", when:"42m", tone:"green" as const, fresh:false },
  ];
  const [active, setActive] = useState(0);
  const [evaluating, setEvaluating] = useState(false);
  const [evalTask, setEvalTask] = useState(0);
  const today = useTodayLabel();
  useEffect(() => { const t = window.setInterval(() => setActive(p => (p+1) % people.length), 4400); return () => window.clearInterval(t); }, [people.length]);
  useEffect(() => {
    const tasks = ["Checking Margaret's amlodipine supply", "Drafting Metformin refill for David", "Confirming Sertraline collection at Boots"];
    const loop = () => {
      setEvaluating(true);
      setEvalTask(t => (t + 1) % tasks.length);
      window.setTimeout(() => setEvaluating(false), 2600);
    };
    loop();
    const id = window.setInterval(loop, 7200);
    return () => window.clearInterval(id);
  }, []);
  const evalTasks = ["Checking Margaret's amlodipine supply", "Drafting Metformin refill for David", "Confirming Sertraline collection at Boots"];
  const cur = people[active];

  return (
    <div className="wsWrap">
      <div className="wsGlow" />
      <div className="wsShell">
        <div className="wsHead">
          <div className="wsBrand">
            <div className="wsMark"><Image src="/omela-logo-mark.png" alt="" width={22} height={22} style={{width:"100%",height:"100%",objectFit:"contain"}}/></div>
            <div className="wsBrandTx">
              <div className="wsName serif">Omela</div>
              <div className="wsBrandSub"><span className="wsLive"><span className="wsLiveDot"/>Live</span><span className="wsBrandSep">·</span><span className="wsBrandDate">{today || "..."}</span></div>
            </div>
          </div>
          <div className="wsHeadAvatars"><span className="wsHeadAv wsHeadAv--warm">AK</span><span className="wsHeadAv wsHeadAv--blue">DR</span><span className="wsHeadAv wsHeadAv--green">JM</span></div>
        </div>

        <AnimatePresence>
          {evaluating ? (
            <motion.div
              className="wsEval"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease: [0.22,1,0.36,1] }}
            >
              <div className="wsEvalInner">
                <div className="wsEvalIcon">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}>
                    <RefreshCw size={11}/>
                  </motion.div>
                </div>
                <div className="wsEvalText">
                  <div className="wsEvalLbl">Omela is evaluating</div>
                  <div className="wsEvalTask">{evalTasks[evalTask]}</div>
                </div>
                <div className="wsEvalBar">
                  <motion.div className="wsEvalBarFill" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 2.4, ease: "easeInOut" }}/>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="wsStats">
          {stats.map(s => <div key={s.label} className={`wsStat wsStat--${s.tone}`}><div className="wsStatVal">{s.value}</div><div className="wsStatLbl">{s.label}</div></div>)}
        </div>

        <div className="wsBody">
          <div className="wsList">
            <div className="wsListHd"><span>Residents</span><span className="wsListCt">{people.length}</span></div>
            {people.map((p, i) => (
              <button key={p.initials} type="button" onClick={() => setActive(i)} className={`wsRow ${i===active ? "wsRowA" : ""}`}>
                <div className={`wsAv wsAv--${p.tone}`}>{p.initials}</div>
                <div className="wsRowTx">
                  <div className="wsRowNm">{p.name}<span className="wsRowAge">, {p.age}</span></div>
                  <div className="wsRowMd">{p.med} <span className="wsRowDose">{p.dose}</span></div>
                  <div className={`wsRowSt wsRowSt--${p.tone}`}><span className="wsRowStDot"/>{p.status}</div>
                  <div className="wsRowSupply" aria-label={`${p.supply} days of supply remaining`}>
                    <div className="wsRowSupplyTrack">
                      <div className={`wsRowSupplyFill wsRowSupplyFill--${p.tone}`} style={{ width: `${Math.min(100, (p.supply / p.supplyMax) * 100)}%` }}/>
                    </div>
                    <span className="wsRowSupplyLbl">{p.supply}d left</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="wsDetail">
            <AnimatePresence mode="wait">
              <motion.div key={cur.initials} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}} transition={{duration:0.36,ease:[0.22,1,0.36,1]}}>
                <div className="wsDtHd">
                  <div className={`wsAv wsAvLg wsAv--${cur.tone}`}>{cur.initials}</div>
                  <div className="wsDtHdTx"><div className="wsDtNm">{cur.name}</div><div className="wsDtMd">{cur.med} {cur.dose}</div></div>
                  <div className="wsDtRx"><div className="wsDtRxLbl">Rx</div><div className="wsDtRxVal">{cur.rxId}</div></div>
                </div>
                <div className="wsDtMeta">
                  <div className="wsDtMetaRow"><span className="wsDtMetaLbl">Status</span><span className={`wsDtMetaVal wsDtMetaVal--${cur.tone}`}>{cur.status}</span></div>
                  <div className="wsDtMetaRow"><span className="wsDtMetaLbl">Owner</span><span className="wsDtMetaVal">{cur.owner}<span className="wsDtMetaSub"> · {cur.ownerRole}</span></span></div>
                  <div className="wsDtMetaRow"><span className="wsDtMetaLbl">Practice</span><span className="wsDtMetaVal wsDtMetaValSub">{cur.practice}</span></div>
                  <div className="wsDtMetaRow"><span className="wsDtMetaLbl">Pharmacy</span><span className="wsDtMetaVal wsDtMetaValSub">{cur.pharmacy}</span></div>
                </div>
                <div className="wsDtTl">
                  <div className="wsDtTlHd">Timeline</div>
                  <div className="wsDtTlList">
                    {cur.timeline.map((s, i) => (
                      <div key={i} className={`wsTlStep wsTlStep--${s.state}`}>
                        <div className="wsTlMark">{s.state === "done" ? <Check size={11} strokeWidth={3}/> : <span className="wsTlPulse"/>}</div>
                        <span className="wsTlLbl">{s.label}</span><span className="wsTlMeta">{s.meta}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="wsDtNext">
                  <div className="wsDtNextHd"><span className="wsDtNextLbl">Next action</span><span className="wsDtNextClock"><Clock size={10}/> today</span></div>
                  <div className="wsDtNextTx">{cur.next}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="wsFeed">
          <div className="wsNarr" aria-hidden="true">
            <Sparkles size={11}/>
            <span>Drafting next refill</span>
          </div>
          <div className="wsFeedHd"><Activity size={11}/><span>Recent activity</span></div>
          <div className="wsFeedList">
            {activity.map((a, i) => (
              <div key={i} className={`wsFeedItem ${a.fresh ? "wsFeedItemFresh" : ""}`}>
                <span className={`wsFeedDot wsFeedDot--${a.tone}`}/>
                <span className="wsFeedWho">{a.who}</span>
                <span className="wsFeedWhat">{a.what}</span>
                <span className={`wsFeedWhen ${a.fresh ? "wsFeedWhenFresh" : ""}`}>{a.when}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SuccessModal({ open, onClose, referralCode }: { open: boolean; onClose: () => void; referralCode: string }) {
  const [copied, setCopied] = useState(false);
  const link = typeof window !== "undefined" && referralCode ? `${window.location.origin}?ref=${referralCode}` : "";
  async function copyLink() { if (!link) return; await navigator.clipboard.writeText(link); setCopied(true); window.setTimeout(() => setCopied(false), 2000); }
  async function shareLink() { if (!link) return; if (navigator.share) { try { await navigator.share({ title:"Omela early access", text:"Join Omela early access", url:link }); } catch { return; } } else { await copyLink(); } }
  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="modO" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose}>
          <motion.div className="modB" initial={{opacity:0,y:18,scale:0.97}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:10}} transition={{type:"spring",damping:22,stiffness:300}} onClick={e => e.stopPropagation()}>
            <div className="modSeal"><CheckCircle2 size={22}/></div>
            <h3 className="serif modTi">You&apos;re on the list.</h3>
            <p className="modBd">We&apos;ll be in touch as Omela opens up, starting with carers, households, and selected care teams in the UK.</p>
            {referralCode ? (
              <div className="modRef">
                <p className="modRefLbl">Share with a family member or care team</p>
                <div className="modRefBox"><span className="modRefUrl">{link.replace("https://","").replace("http://","")}</span><button onClick={copyLink} className="modRefCp" type="button">{copied ? <Check size={13}/> : <Copy size={13}/>}</button></div>
                <div className="modRefBts"><button onClick={shareLink} className="btnP modShareBtn" type="button"><Share2 size={13}/>Share</button></div>
              </div>
            ) : null}
            <button type="button" className="modClose" onClick={onClose}>Close</button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default function Page() {
  const [role, setRole] = useState<Role>("carer");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [refParam, setRefParam] = useState("");

  useEffect(() => { if (typeof window !== "undefined") { const p = new URLSearchParams(window.location.search); const r = p.get("ref"); if (r) setRefParam(r); } }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!agreed) return;
    setSubmitting(true); setSuccess(""); setError("");
    try {
      const res = await fetch("/api/waitlist", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ email, role, website, source:"landing-page", marketingOptIn:false, ref: refParam || undefined }) });
      const data = await res.json();
      if (!res.ok) { if (data.referralCode) setReferralCode(data.referralCode); setError(data.error || "Something went wrong."); return; }
      setSuccess(data.message || "You are in.");
      if (data.referralCode) setReferralCode(data.referralCode);
      setEmail(""); setRole("carer"); setWebsite(""); setAgreed(false); setModalOpen(true);
    } catch { setError("Something went wrong."); } finally { setSubmitting(false); }
  }

  const features = [
    { icon:<Bell size={22}/>, title:"See what needs attention", body:"Know what is due soon, what is delayed, and what needs follow-up right now, across every person you care for.", tone:"warm" as const },
    { icon:<RefreshCw size={22}/>, title:"Keep ownership clear", body:"See who handled the request last, who owns the next step, and what should happen next without calls or guesswork.", tone:"blue" as const },
    { icon:<Package size={22}/>, title:"Follow every update", body:"Track progress from preparation through GP approval to ready-for-collection without losing the thread.", tone:"green" as const },
  ];

  const industries = [
    { icon:<Users size={22}/>, title:"Family carers", body:"Helping a parent, partner, or relative stay on top of repeat prescriptions without carrying every detail alone.", live:true, players:"Family · GP · Pharmacy" },
    { icon:<Building2 size={22}/>, title:"Residential care", body:"Coordinating repeat-prescription workflows across many residents, practices, and pharmacies in one place.", live:true, players:"Care team · GP · Pharmacy" },
    { icon:<Home size={22}/>, title:"Supported living", body:"Giving staff and families a shared view of medication admin across residents and shift handovers.", live:true, players:"Staff · Family · GP" },
    { icon:<Stethoscope size={22}/>, title:"Community pharmacies", body:"A clearer incoming queue with context on who ordered what, for whom, and the collection window.", live:true, players:"Pharmacy · Patients · GPs" },
    { icon:<PawPrint size={22}/>, title:"Veterinary repeat meds", body:"Pet owners, vets, and pharmacies coordinating chronic care prescriptions on the same cycle pattern.", live:false, players:"Owner · Vet · Pharmacy" },
    { icon:<Scale size={22}/>, title:"Recurring legal filings", body:"Visa renewals, trademark renewals, and annual returns where paralegals chase clients, lawyers, and registries.", live:false, players:"Paralegal · Lawyer · Client" },
    { icon:<Wrench size={22}/>, title:"Compliance and maintenance", body:"Gas safety, EICR, PAT testing, lift servicing. Recurring certifications coordinated across managers, contractors, and tenants.", live:false, players:"Manager · Vendor · Tenant" },
    { icon:<GraduationCap size={22}/>, title:"Childcare medication plans", body:"Nurseries, parents, and GPs keeping allergy plans and recurring medications visible across handovers.", live:false, players:"Nursery · Parent · GP" },
  ];

  const pricing = [
    { name:"Family", price:"£9", per:"per month", desc:"For one carer managing repeat prescriptions for up to 3 people.", features:["Up to 3 people","Unlimited requests","SMS and email reminders","Activity history"], cta:"Start free trial", featured:false },
    { name:"Care team", price:"£49", per:"per month", desc:"For supported living, residential care, and small care teams.", features:["Up to 25 residents","Shared workspace","Role permissions","Audit log","Email support"], cta:"Book a demo", featured:true },
    { name:"Organisation", price:"Custom", per:"annual contract", desc:"For care groups, NHS trusts, and multi-site providers.", features:["Unlimited residents","SSO and Microsoft Entra","Onboarding support","SLA and dedicated CSM","Data residency in UK"], cta:"Talk to sales", featured:false },
  ];

  const stats = [
    { value:"1.1B", label:"NHS repeat prescription items issued each year in England" },
    { value:"77%", label:"of all prescription items in England are repeats" },
    { value:"£300M+", label:"estimated annual cost of prescription waste in the NHS" },
    { value:"3 to 5", label:"separate people typically involved in a single repeat request" },
  ];

  const trustCards = [
    { icon:<Shield size={18}/>, title:"Protected access", body:"Secure sign-in and controlled access from day one, with clear role boundaries." },
    { icon:<Eye size={18}/>, title:"Clear visibility", body:"The right people see the right information, across family and care teams." },
    { icon:<History size={18}/>, title:"Audit history", body:"A clear record of updates, ownership changes, and follow-through over time." },
    { icon:<Database size={18}/>, title:"Focused data", body:"Designed to collect only what is needed for the coordination workflow." },
  ];

  return (
    <>
      <style>{CSS}</style>
      <SuccessModal open={modalOpen} onClose={() => setModalOpen(false)} referralCode={referralCode}/>

      <div className={`${dmSans.variable} ${instrumentSerif.variable} wrap`}>
        <nav className="nav">
          <div className="container navR">
            <Link href="/" className="navBr">
              <div className="navLo"><Image src="/omela-logo-mark.png" alt="Omela" width={34} height={34} style={{width:"100%",height:"100%",objectFit:"contain"}}/></div>
              <span className="navNm serif">Omela</span>
            </Link>
            <div className="navLks">
              <a href="#product" className="navLk">Product</a>
              <a href="#industries" className="navLk">Industries</a>
              <a href="#pricing" className="navLk">Pricing</a>
              <a href="#trust" className="navLk">Trust</a>
            </div>
            <div className="navRight">
              <Link href="/login" className="navSignIn">Sign in</Link>
              <a href="mailto:hello@omela.ai?subject=Omela%20pilot%20conversation" className="btnP navCt">Book a demo<ArrowRight size={13}/></a>
            </div>
          </div>
        </nav>

        <section className="heroSec">
          <div className="container heroGrid">
            <div className="heroTxt">
              <FI delay={0.1}><h1 className="serif heroTi">The coordination platform for repeat prescriptions.</h1></FI>
              <FI delay={0.16}><p className="heroSub">Omela helps carers, households, and care teams keep repeat prescription requests visible across multiple people, with clearer ownership and less admin friction.</p></FI>
              <FI delay={0.22}>
                <div className="heroBt">
                  <a href="mailto:hello@omela.ai?subject=Omela%20pilot%20conversation" className="btnP heroBtP">Book a demo<ArrowRight size={14}/></a>
                  <a href="#waitlist" className="btnS heroBtS">Join early access</a>
                </div>
              </FI>
              <FI delay={0.28}><p className="heroFoot">Built with carers, households, and care teams across the UK.</p></FI>
            </div>
            <FI delay={0.18} className="heroBoardCol"><LauraWorkspace/></FI>
          </div>
        </section>

        <section className="processStrip">
          <div className="container">
            <FI>
              <div className="processHd">
                <Overline>How Omela works</Overline>
                <h2 className="serif processTi">Three steps from due soon to resolved.</h2>
              </div>
              <div className="processGrid">
                <div className="processStep">
                  <div className="processNum">01</div>
                  <h3 className="processStepTi">Omela spots what is due</h3>
                  <p className="processStepBd">Supply, timing, and repeat cycles are tracked in one place, so nothing drifts into a last-minute scramble.</p>
                </div>
                <div className="processLine" aria-hidden="true"/>
                <div className="processStep">
                  <div className="processNum">02</div>
                  <h3 className="processStepTi">A request is prepared</h3>
                  <p className="processStepBd">Drafts are ready for review with clear context on who it is for, what is needed, and who owns the next step.</p>
                </div>
                <div className="processLine" aria-hidden="true"/>
                <div className="processStep">
                  <div className="processNum">03</div>
                  <h3 className="processStepTi">Status stays visible</h3>
                  <p className="processStepBd">From sent, to approved, to ready for collection, everyone with access sees the same truth at the same time.</p>
                </div>
              </div>
            </FI>
          </div>
        </section>

        <section id="product" className="sec">
          <div className="container">
            <FI>
              <div className="shW">
                <Overline>Product</Overline>
                <h2 className="serif shT">One workflow from due soon to ready.</h2>
                <p className="shB">Omela is the coordination layer around repeat-prescription admin. Not a pharmacy. Not telehealth. Not a diagnosis tool.</p>
              </div>
            </FI>
            <div className="featGrid">
              {features.map((f, i) => (
                <FI key={f.title} delay={i * 0.06}>
                  <div className="featCard">
                    <div className={`featIc featIc--${f.tone}`}>{f.icon}</div>
                    <h3 className="featTi">{f.title}</h3>
                    <p className="featBd">{f.body}</p>
                  </div>
                </FI>
              ))}
            </div>
          </div>
        </section>

        <section id="industries" className="sec secTinted">
          <div className="container">
            <FI>
              <div className="shW">
                <Overline tone="warm">Built on a pattern, not a niche</Overline>
                <h2 className="serif shT">One coordination layer. Many recurring requests.</h2>
                <p className="shB">Omela starts with repeat prescriptions because the cost of a missed handoff is highest there. The same shape applies anywhere a recurring request crosses households, professionals, and fulfillers.</p>
              </div>
            </FI>
            <div className="indGrid">
              {industries.map((ind, i) => (
                <FI key={ind.title} delay={i * 0.04}>
                  <div className={`indCard ${ind.live ? "indCardLive" : "indCardSoon"}`}>
                    <div className="indCardTop">
                      <div className="indIc">{ind.icon}</div>
                      <span className={`indTag ${ind.live ? "indTagLive" : "indTagSoon"}`}>
                        {ind.live ? <><span className="indTagDot"/>Live</> : "Coming soon"}
                      </span>
                    </div>
                    <h3 className="indTi">{ind.title}</h3>
                    <p className="indBd">{ind.body}</p>
                    <div className="indPlayers">{ind.players}</div>
                  </div>
                </FI>
              ))}
            </div>
          </div>
        </section>

        <section id="results" className="statBand">
          <div className="container">
            <FI>
              <div className="statHd">
                <Overline tone="warm">The market we're in</Overline>
                <h2 className="serif statTi">Repeat prescriptions are the largest unfixed admin workflow in UK healthcare.</h2>
                <p className="statSub">Sources: NHS Business Services Authority, OECD prescribing data, Health Foundation analysis.</p>
              </div>
            </FI>
            <div className="statGrid">
              {stats.map((s, i) => (
                <FI key={s.label} delay={i * 0.06}>
                  <div className="statCard">
                    <div className="statVal serif">{s.value}</div>
                    <div className="statLbl">{s.label}</div>
                  </div>
                </FI>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="sec">
          <div className="container">
            <FI>
              <div className="shW">
                <Overline tone="warm">Simple pricing</Overline>
                <h2 className="serif shT">Pay for the people you coordinate, not the seats.</h2>
                <p className="shB">Transparent monthly pricing. No hidden setup fees. Cancel any time during early access.</p>
              </div>
            </FI>
            <div className="prGrid">
              {pricing.map((p, i) => (
                <FI key={p.name} delay={i * 0.06}>
                  <div className={`prCard ${p.featured ? "prCardFeat" : ""}`}>
                    {p.featured ? <div className="prBadge"><Sparkles size={11}/>Most popular</div> : null}
                    <div className="prName">{p.name}</div>
                    <div className="prPrice"><span className="prPriceVal serif">{p.price}</span><span className="prPricePer">{p.per}</span></div>
                    <p className="prDesc">{p.desc}</p>
                    <ul className="prFeats">
                      {p.features.map(f => <li key={f}><Check size={14}/><span>{f}</span></li>)}
                    </ul>
                    <a href="#waitlist" className={p.featured ? "btnP prBt" : "btnS prBt"}>{p.cta}{p.featured ? <ArrowRight size={14}/> : null}</a>
                  </div>
                </FI>
              ))}
            </div>
            <FI delay={0.2}>
              <p className="prFoot">All plans include UK data residency, role-based access, and full audit history. Need something different? <a href="mailto:hello@omela.ai">Contact sales.</a></p>
            </FI>
          </div>
        </section>

        <section id="trust" className="sec">
          <div className="container">
            <FI>
              <div className="shW">
                <Overline>Trust and boundaries</Overline>
                <h2 className="serif shT">Built to sit alongside existing care workflows.</h2>
                <p className="shB">Omela is the coordination layer. It does not replace pharmacies, practices, or clinical judgement.</p>
              </div>
            </FI>
            <div className="trustGrid">
              {trustCards.map((t, i) => (
                <FI key={t.title} delay={i * 0.05}>
                  <div className="trustCard">
                    <div className="trustCardTop"><div className="trustNo">{String(i+1).padStart(2,"0")}</div><div className="trustIc">{t.icon}</div></div>
                    <h4 className="trustTi">{t.title}</h4>
                    <p className="trustBd">{t.body}</p>
                  </div>
                </FI>
              ))}
            </div>
          </div>
        </section>

        <section id="waitlist" className="sec secTinted">
          <div className="container">
            <FI>
              <div className="wlC">
                <Overline>Early access</Overline>
                <h2 className="serif wlTi">Join the first Omela pilots.</h2>
                <p className="wlSub">Starting in the UK with repeat prescription coordination for carers, households, and selected care teams.</p>
                <form className="wlF" onSubmit={handleSubmit}>
                  <input className="inp" type="email" placeholder="Your email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email"/>
                  <select className="inp" value={role} onChange={e => setRole(e.target.value as Role)}>
                    <option value="carer">I manage for a family member</option>
                    <option value="household">I manage across my household</option>
                    <option value="care_team">I work in a care team</option>
                  </select>
                  <input type="text" name="website" value={website} onChange={e => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{position:"absolute",left:"-9999px",opacity:0,pointerEvents:"none",height:0,width:0}}/>
                  <button type="submit" className="btnP wlBt" disabled={submitting || !agreed}>{submitting ? "Submitting..." : "Join early access"}</button>
                </form>
                <label className="pvL">
                  <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} required className="pvC"/>
                  <span>I agree to the <Link href="/privacy" className="pvLk">Privacy Notice</Link> and <Link href="/terms" className="pvLk">Terms</Link>.</span>
                </label>
                {success ? <div className="fmOk">{success}</div> : null}
                {error ? <div className="fmEr">{error}</div> : null}
              </div>
            </FI>
          </div>
        </section>

        <footer className="ft">
          <div className="container ftIn">
            <div className="ftTop">
              <div className="ftBrand">
                <Link href="/" className="ftBr">
                  <div className="navLo ftLoW"><Image src="/omela-logo-mark.png" alt="Omela" width={24} height={24} style={{width:"100%",height:"100%",objectFit:"contain"}}/></div>
                  <span className="ftBrN serif">Omela</span>
                </Link>
                <p className="ftBrDesc">The coordination platform for repeat-prescription admin. Built for the people doing the follow-through.</p>
              </div>
              <div className="ftCols">
                <div className="ftCol"><div className="ftColT">Product</div><a href="#product" className="ftLk">How it works</a><a href="#industries" className="ftLk">Industries</a><a href="#pricing" className="ftLk">Pricing</a><a href="#waitlist" className="ftLk">Early access</a></div>
                <div className="ftCol"><div className="ftColT">Company</div><span className="ftLk ftLkStatic">Omela Ltd.</span><a href="mailto:hello@omela.ai" className="ftLk">Contact</a><a href="mailto:hello@omela.ai?subject=Omela%20pilot%20conversation" className="ftLk">Book a demo</a></div>
                <div className="ftCol"><div className="ftColT">Legal</div><Link href="/privacy" className="ftLk">Privacy</Link><Link href="/terms" className="ftLk">Terms</Link><a href="mailto:notice@omela.ai" className="ftLk">Notices</a></div>
              </div>
            </div>
            <div className="ftDsc">Omela is a coordination layer for repeat-prescription admin, ownership, and next-step guidance. It does not provide diagnosis, treatment, or emergency care. In an emergency, call 999.</div>
            <div className="ftBtm"><p>&copy; 2026 Omela Ltd.</p><p className="ftBtmRt">Made with care in the UK.</p></div>
          </div>
        </footer>
      </div>
    </>
  );
}

const CSS = `
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
html,body{max-width:100%;overflow-x:clip}
body{background:${c.bg};color:${c.text};font-family:var(--font-dm-sans),-apple-system,sans-serif;-webkit-font-smoothing:antialiased;font-size:16px}
a{color:inherit;text-decoration:none}
button,input,select{font-family:inherit}
::selection{background:${c.accent};color:#fff}
.serif{font-family:var(--font-instrument-serif),Georgia,serif}
.wrap{width:100%;overflow-x:clip}
.container{max-width:1200px;margin:0 auto;padding:0 20px}
.sec{padding:72px 0}
.secTinted{background:linear-gradient(180deg,#F5F1EA,${c.bg})}

.overline{display:inline-block;font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:${c.muted};line-height:1}
.overline--warm{color:${c.warm}}
.overline--blue{color:${c.accent}}
.overline--green{color:${c.greenDk}}

.btnP{display:inline-flex;align-items:center;justify-content:center;gap:7px;background:${c.dark};color:#fff;border:none;border-radius:999px;padding:15px 26px;font-size:15px;font-weight:700;cursor:pointer;transition:all .25s;white-space:nowrap;box-shadow:0 3px 10px rgba(0,0,0,.08)}
.btnP:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 8px 24px rgba(0,0,0,.13)}
.btnP:disabled{opacity:.5;cursor:not-allowed}
.btnS{display:inline-flex;align-items:center;justify-content:center;gap:7px;background:#fff;color:${c.text};border:1.5px solid ${c.border};border-radius:999px;padding:15px 26px;font-size:15px;font-weight:700;cursor:pointer;transition:all .25s;white-space:nowrap}
.btnS:hover{border-color:${c.text}}

.shW{text-align:center;max-width:760px;margin:0 auto 40px}
.shT{font-size:clamp(32px,5vw,54px);line-height:1.05;letter-spacing:-.045em;margin-top:14px}
.shB{font-size:17px;line-height:1.65;margin-top:16px;max-width:640px;margin-left:auto;margin-right:auto;color:${c.sub}}

.nav{position:sticky;top:0;z-index:100;background:rgba(248,246,241,.92);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid rgba(227,221,210,.5)}
.navR{display:flex;align-items:center;justify-content:space-between;gap:8px;height:68px}
.navBr{display:flex;align-items:center;gap:10px;flex-shrink:0}
.navLo{width:34px;height:34px;border-radius:9px;overflow:hidden;flex-shrink:0}
.navNm{font-size:22px;font-weight:400;letter-spacing:-.025em;color:${c.text}}
.navLks{display:none;align-items:center;gap:28px}
.navLk{font-size:14px;font-weight:600;color:${c.sub};transition:color .2s}
.navLk:hover{color:${c.text}}
.navRight{display:flex;align-items:center;gap:16px}
.navSignIn{display:inline-flex;font-size:14px;font-weight:700;color:${c.sub};transition:color .2s}
.navSignIn:hover{color:${c.text}}
.navCt{padding:11px 18px!important;font-size:13px!important}

.heroSec{padding:56px 0 64px;position:relative;overflow:hidden}
.heroGrid{display:grid;grid-template-columns:1fr;gap:40px;align-items:center;position:relative}
.heroTxt{max-width:640px;margin:0 auto;text-align:center}
.heroTi{margin-top:22px;font-size:clamp(40px,7.5vw,72px);line-height:1;letter-spacing:-.04em;color:#3A2817}
.heroSub{margin-top:22px;font-size:clamp(16px,2vw,19px);line-height:1.6;color:${c.sub};max-width:600px;margin-left:auto;margin-right:auto}
.heroBt{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:28px}
.heroBtP,.heroBtS{min-height:54px;padding:16px 28px;font-size:15.5px}
.heroFoot{margin-top:22px;font-size:13px;color:${c.muted};font-weight:500}
.heroBoardCol{display:flex;justify-content:center;width:100%}

.wsWrap{width:100%;max-width:580px;position:relative}
.wsGlow{position:absolute;inset:-36px;border-radius:52px;background:radial-gradient(circle,rgba(201,149,107,.08),transparent 68%);z-index:0;pointer-events:none}
.wsShell{position:relative;z-index:1;background:#fff;border:1px solid rgba(227,221,210,.92);border-radius:24px;padding:18px;box-shadow:0 1px 0 rgba(255,255,255,.9) inset,0 24px 50px rgba(14,18,26,.09),0 4px 14px rgba(14,18,26,.04)}
.wsHead{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:6px 6px 14px;border-bottom:1px solid rgba(227,221,210,.7)}
.wsBrand{display:flex;align-items:center;gap:11px}
.wsMark{width:36px;height:36px;border-radius:11px;background:${c.warmSoft};border:1px solid rgba(201,149,107,.16);display:flex;align-items:center;justify-content:center;padding:5px}
.wsBrandTx{display:flex;flex-direction:column;line-height:1}
.wsName{font-size:19px;letter-spacing:-.03em;color:${c.text}}
.wsBrandSub{display:flex;align-items:center;gap:6px;margin-top:5px;font-size:10.5px;color:${c.muted};font-weight:700}
.wsLive{display:inline-flex;align-items:center;gap:5px;color:${c.greenDk};text-transform:uppercase;letter-spacing:.04em;font-size:9.5px}
.wsLiveDot{width:6px;height:6px;border-radius:50%;background:${c.green};box-shadow:0 0 0 2px rgba(34,197,94,.2)}
.wsBrandSep{color:${c.border}}
.wsBrandDate{color:${c.sub}}
.wsHeadAvatars{display:inline-flex;align-items:center}
.wsHeadAv{width:28px;height:28px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:9.5px;font-weight:800;border:2px solid #fff}
.wsHeadAv+.wsHeadAv{margin-left:-8px}
.wsHeadAv--warm{background:linear-gradient(135deg,#F7E7D2,#F0D5B6);color:${c.warmDk}}
.wsHeadAv--blue{background:linear-gradient(135deg,#E3EDFB,#C9DBF6);color:#1E40AF}
.wsHeadAv--green{background:linear-gradient(135deg,#DFF3E4,#C7E8CF);color:${c.greenDk}}

.wsStats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:14px}
.wsStat{padding:12px 14px;border-radius:14px;border:1px solid ${c.borderSoft}}
.wsStat--warm{background:linear-gradient(180deg,#FFF8F0,#FDF3E6);border-color:rgba(201,149,107,.22)}
.wsStat--red{background:linear-gradient(180deg,#FEF6F6,#FCECEC);border-color:rgba(239,68,68,.2)}
.wsStat--green{background:linear-gradient(180deg,#F3FBF5,#E8F5EC);border-color:rgba(34,197,94,.22)}
.wsStatVal{font-family:var(--font-instrument-serif),Georgia,serif;font-size:26px;line-height:1;letter-spacing:-.02em}
.wsStat--warm .wsStatVal{color:${c.warmDk}}
.wsStat--red .wsStatVal{color:${c.redDk}}
.wsStat--green .wsStatVal{color:${c.greenDk}}
.wsStatLbl{margin-top:5px;font-size:10.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:${c.muted}}

.wsBody{display:grid;grid-template-columns:1fr;gap:12px;margin-top:12px}
.wsList{background:${c.cream};border:1px solid ${c.borderSoft};border-radius:18px;padding:8px}
.wsListHd{display:flex;justify-content:space-between;font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.11em;color:${c.muted};padding:8px 10px 10px}
.wsRow{display:flex;align-items:flex-start;gap:11px;width:100%;padding:11px;border:none;background:transparent;border-radius:12px;cursor:pointer;text-align:left;transition:background .25s,box-shadow .25s}
.wsRow+.wsRow{margin-top:3px}
.wsRowA{background:#fff;box-shadow:0 4px 14px rgba(14,18,26,.05),0 0 0 1px rgba(201,149,107,.1);position:relative}
.wsRowA::before{content:"";position:absolute;left:0;top:10px;bottom:10px;width:3px;border-radius:0 3px 3px 0;background:linear-gradient(180deg,${c.warm},${c.warmDk});opacity:.7}
.wsAv{width:34px;height:34px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;letter-spacing:.03em}
.wsAv--warm{background:linear-gradient(135deg,#F7E7D2,#F0D5B6);color:${c.warmDk}}
.wsAv--blue{background:linear-gradient(135deg,#E3EDFB,#C9DBF6);color:#1E40AF}
.wsAv--green{background:linear-gradient(135deg,#DFF3E4,#C7E8CF);color:${c.greenDk}}
.wsAvLg{width:46px;height:46px;font-size:13.5px}
.wsRowTx{flex:1;min-width:0}
.wsRowNm{font-size:13px;font-weight:800;letter-spacing:-.015em;color:${c.text}}
.wsRowAge{font-size:11px;color:${c.muted};font-weight:500;margin-left:3px}
.wsRowMd{margin-top:3px;font-size:11.5px;color:${c.sub};font-weight:600}
.wsRowDose{color:${c.muted};font-weight:500}
.wsRowSt{margin-top:6px;font-size:10.5px;font-weight:700;display:inline-flex;align-items:center;gap:5px}
.wsRowStDot{width:5px;height:5px;border-radius:50%}
.wsRowSt--warm{color:${c.warmDk}}
.wsRowSt--warm .wsRowStDot{background:${c.warm}}
.wsRowSt--blue{color:${c.accent}}
.wsRowSt--blue .wsRowStDot{background:${c.accent}}
.wsRowSt--green{color:${c.greenDk}}
.wsRowSt--green .wsRowStDot{background:${c.green}}

.wsDetail{background:${c.cream};border:1px solid ${c.borderSoft};border-radius:18px;padding:18px;min-height:380px;position:relative}
.wsDtHd{display:flex;align-items:center;gap:12px;padding-bottom:14px;border-bottom:1px solid rgba(227,221,210,.7)}
.wsDtHdTx{flex:1;min-width:0}
.wsDtNm{font-size:14.5px;font-weight:800;letter-spacing:-.02em;color:${c.text}}
.wsDtMd{margin-top:3px;font-size:12px;color:${c.sub};font-weight:500}
.wsDtRx{text-align:right;line-height:1.1}
.wsDtRxLbl{font-size:8.5px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:${c.muted}}
.wsDtRxVal{margin-top:4px;font-size:11px;font-weight:800;color:${c.text};font-variant-numeric:tabular-nums}
.wsDtMeta{display:flex;flex-direction:column;gap:8px;margin-top:14px}
.wsDtMetaRow{display:flex;align-items:baseline;gap:10px;font-size:11.5px}
.wsDtMetaLbl{flex-shrink:0;width:64px;font-size:9.5px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:${c.muted}}
.wsDtMetaVal{font-weight:700;color:${c.text};min-width:0;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.wsDtMetaSub{color:${c.muted};font-weight:500}
.wsDtMetaVal--warm{color:${c.warmDk}}
.wsDtMetaVal--blue{color:${c.accent}}
.wsDtMetaVal--green{color:${c.greenDk}}
.wsDtMetaValSub{font-weight:600;color:${c.sub}}
.wsDtTl{margin-top:16px;padding-top:14px;border-top:1px solid rgba(227,221,210,.7)}
.wsDtTlHd{font-size:9.5px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:${c.muted};margin-bottom:10px}
.wsDtTlList{display:flex;flex-direction:column;gap:8px}
.wsTlStep{display:flex;align-items:center;gap:10px;font-size:11.5px}
.wsTlMark{width:17px;height:17px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:#fff;border:1px solid ${c.border}}
.wsTlStep--done .wsTlMark{background:${c.greenSoft};border-color:rgba(34,197,94,.3);color:${c.greenDk}}
.wsTlStep--active .wsTlMark{background:${c.warmSoft};border-color:rgba(201,149,107,.35)}
.wsTlPulse{width:5px;height:5px;border-radius:50%;background:${c.warm}}
.wsTlLbl{flex:1;color:${c.text};font-weight:600}
.wsTlStep--done .wsTlLbl{color:${c.sub}}
.wsTlMeta{font-size:10.5px;color:${c.muted};font-weight:600;font-variant-numeric:tabular-nums}
.wsDtNext{margin-top:14px;padding:12px 14px;background:#fff;border:1px solid rgba(227,221,210,.8);border-radius:12px}
.wsDtNextHd{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}
.wsDtNextLbl{font-size:9.5px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:${c.muted}}
.wsDtNextClock{display:inline-flex;align-items:center;gap:4px;font-size:9.5px;font-weight:700;color:${c.warmDk};letter-spacing:.04em;text-transform:uppercase}
.wsDtNextTx{font-size:12.5px;line-height:1.55;color:${c.text};font-weight:600}

.wsEval{position:absolute;top:72px;left:50%;transform:translateX(-50%);z-index:20;width:calc(100% - 48px);max-width:420px;pointer-events:none}
.wsEvalInner{display:flex;align-items:center;gap:11px;padding:11px 14px;background:rgba(255,255,255,.98);border:1px solid rgba(201,149,107,.3);border-radius:14px;box-shadow:0 10px 32px rgba(14,18,26,.12),0 2px 8px rgba(14,18,26,.04);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}
.wsEvalIcon{width:26px;height:26px;border-radius:50%;background:#fff;border:1px solid rgba(201,149,107,.28);display:flex;align-items:center;justify-content:center;color:${c.warm};flex-shrink:0}
.wsEvalText{flex:1;min-width:0;line-height:1.2}
.wsEvalLbl{font-size:9.5px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:${c.warmDk}}
.wsEvalTask{margin-top:3px;font-size:12px;font-weight:700;color:${c.text};overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.wsEvalBar{width:64px;height:4px;background:rgba(201,149,107,.15);border-radius:999px;overflow:hidden;flex-shrink:0}
.wsEvalBarFill{height:100%;background:linear-gradient(90deg,${c.warm},${c.warmDk});border-radius:999px}

.wsRowSupply{margin-top:7px;display:flex;align-items:center;gap:8px}
.wsRowSupplyTrack{flex:1;height:3px;background:rgba(17,18,20,.06);border-radius:999px;overflow:hidden;min-width:60px}
.wsRowSupplyFill{height:100%;border-radius:999px;transition:width .4s ease}
.wsRowSupplyFill--warm{background:linear-gradient(90deg,${c.red},${c.warm})}
.wsRowSupplyFill--blue{background:linear-gradient(90deg,${c.warm},${c.accent})}
.wsRowSupplyFill--green{background:${c.green}}
.wsRowSupplyLbl{font-size:9.5px;font-weight:700;color:${c.muted};letter-spacing:.02em;font-variant-numeric:tabular-nums;flex-shrink:0}

.wsFeedItemFresh .wsFeedWho{position:relative}
.wsFeedItemFresh .wsFeedWho::before{content:"";position:absolute;left:-10px;top:50%;transform:translateY(-50%);width:5px;height:5px;border-radius:50%;background:${c.accent};box-shadow:0 0 0 3px rgba(37,99,235,.18);animation:wsPulse 1.6s ease-in-out infinite}
.wsFeedWhenFresh{color:${c.accent}!important;font-weight:800!important;text-transform:uppercase;letter-spacing:.04em;font-size:9.5px!important}
@keyframes wsPulse{0%,100%{opacity:.5;transform:translateY(-50%) scale(.9)}50%{opacity:1;transform:translateY(-50%) scale(1.15)}}

.wsFeed{margin-top:12px;padding:13px 15px;background:${c.cream};border:1px solid ${c.borderSoft};border-radius:18px;position:relative}
.wsNarr{position:absolute;top:-14px;right:18px;display:inline-flex;align-items:center;gap:6px;padding:7px 13px;background:${c.dark};color:#fff;border-radius:999px;font-size:10.5px;font-weight:800;letter-spacing:.02em;box-shadow:0 8px 22px rgba(14,18,26,.22);z-index:5;animation:wsNarrFloat 3.6s ease-in-out infinite}
.wsNarr svg{color:${c.warm}}
@keyframes wsNarrFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
.wsFeedHd{display:flex;align-items:center;gap:6px;font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:${c.muted};margin-bottom:9px}
.wsFeedList{display:flex;flex-direction:column;gap:7px}
.wsFeedItem{display:flex;align-items:center;gap:8px;font-size:11px;line-height:1.4;color:${c.sub}}
.wsFeedDot{width:6px;height:6px;border-radius:50%;flex-shrink:0}
.wsFeedDot--warm{background:${c.warm}}
.wsFeedDot--blue{background:${c.accent}}
.wsFeedDot--green{background:${c.green}}
.wsFeedWho{font-weight:800;color:${c.text};flex-shrink:0}
.wsFeedWhat{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.wsFeedWhen{flex-shrink:0;color:${c.muted};font-weight:600;font-variant-numeric:tabular-nums}

.processStrip{padding:64px 0;border-top:1px solid rgba(227,221,210,.55);border-bottom:1px solid rgba(227,221,210,.55);background:rgba(255,255,255,.45)}
.processHd{text-align:center;max-width:680px;margin:0 auto 44px}
.processTi{margin-top:14px;font-size:clamp(28px,4.4vw,44px);line-height:1.08;letter-spacing:-.04em;color:${c.text}}
.processGrid{display:grid;grid-template-columns:1fr;gap:28px;align-items:start;max-width:1100px;margin:0 auto}
.processStep{text-align:center;padding:0 12px}
.processNum{font-family:var(--font-instrument-serif),Georgia,serif;font-size:44px;line-height:1;color:${c.warm};letter-spacing:-.03em;margin-bottom:14px}
.processStepTi{font-size:19px;font-weight:800;letter-spacing:-.02em;color:${c.text}}
.processStepBd{margin-top:10px;font-size:14.5px;line-height:1.68;color:${c.sub};max-width:300px;margin-left:auto;margin-right:auto}
.processLine{display:none;height:1px;background:linear-gradient(90deg,transparent,rgba(201,149,107,.4),transparent);align-self:center;margin-top:28px}

.featGrid{display:grid;grid-template-columns:1fr;gap:18px;margin-top:20px}
.featCard{padding:28px;border-radius:22px;background:#fff;border:1px solid ${c.border};box-shadow:0 2px 14px rgba(0,0,0,.02);transition:transform .3s,box-shadow .3s}
.featCard:hover{transform:translateY(-2px);box-shadow:0 14px 32px rgba(0,0,0,.06)}
.featIc{width:52px;height:52px;border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:16px}
.featIc--warm{background:${c.warmSoft};color:${c.warm}}
.featIc--blue{background:${c.accentSoft};color:${c.accent}}
.featIc--green{background:${c.greenSoft};color:${c.greenDk}}
.featTi{font-size:19px;font-weight:800;letter-spacing:-.02em;color:${c.text}}
.featBd{margin-top:8px;font-size:15px;line-height:1.68;color:${c.sub}}

.indGrid{display:grid;grid-template-columns:1fr;gap:14px;margin-top:20px}
.indCard{padding:24px;border-radius:20px;background:#fff;border:1px solid ${c.border};position:relative;transition:all .3s;display:flex;flex-direction:column}
.indCardLive:hover{transform:translateY(-2px);box-shadow:0 14px 32px rgba(0,0,0,.06);border-color:rgba(201,149,107,.4)}
.indCardSoon{background:rgba(255,255,255,.55);border-style:dashed;border-color:rgba(201,149,107,.25)}
.indCardSoon:hover{background:#fff;border-style:solid}
.indCardSoon .indIc{opacity:.55}
.indCardSoon .indTi{opacity:.7}
.indCardSoon .indBd{opacity:.55}
.indCardTop{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:14px}
.indIc{width:44px;height:44px;border-radius:12px;background:${c.warmSoft};color:${c.warmDk};display:flex;align-items:center;justify-content:center;border:1px solid rgba(201,149,107,.2);transition:opacity .25s}
.indTag{display:inline-flex;align-items:center;gap:5px;font-size:9.5px;font-weight:800;letter-spacing:.09em;text-transform:uppercase;padding:4px 9px;border-radius:999px;border:1px solid}
.indTagLive{background:${c.greenSoft};color:${c.greenDk};border-color:rgba(34,197,94,.25)}
.indTagDot{width:5px;height:5px;border-radius:50%;background:${c.green};box-shadow:0 0 0 2px rgba(34,197,94,.18);animation:wsPulse 1.6s ease-in-out infinite}
.indTagSoon{background:${c.warmSoft};color:${c.warmDk};border-color:rgba(201,149,107,.3)}
.indTi{font-size:18px;font-weight:800;letter-spacing:-.02em;color:${c.text}}
.indBd{margin-top:8px;font-size:14px;line-height:1.65;color:${c.sub};flex:1}
.indPlayers{margin-top:14px;padding-top:12px;border-top:1px solid ${c.borderSoft};font-size:11px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:${c.muted}}

.prGrid{display:grid;grid-template-columns:1fr;gap:18px;margin-top:24px;max-width:1080px;margin-left:auto;margin-right:auto}
.prCard{padding:32px 28px;border-radius:24px;background:#fff;border:1px solid ${c.border};position:relative;display:flex;flex-direction:column;transition:transform .3s,box-shadow .3s}
.prCard:hover{transform:translateY(-2px);box-shadow:0 14px 32px rgba(0,0,0,.06)}
.prCardFeat{border:1.5px solid ${c.warm};box-shadow:0 14px 40px rgba(201,149,107,.18);background:linear-gradient(180deg,#fff,#FFFCF8)}
.prBadge{position:absolute;top:-12px;left:50%;transform:translateX(-50%);display:inline-flex;align-items:center;gap:5px;padding:5px 12px;background:${c.dark};color:#fff;border-radius:999px;font-size:10.5px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;box-shadow:0 6px 16px rgba(0,0,0,.18)}
.prName{font-size:13px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:${c.warmDk}}
.prPrice{display:flex;align-items:baseline;gap:8px;margin-top:14px}
.prPriceVal{font-size:52px;line-height:1;letter-spacing:-.04em;color:${c.text}}
.prPricePer{font-size:13px;color:${c.muted};font-weight:600}
.prDesc{margin-top:14px;font-size:14px;line-height:1.6;color:${c.sub};min-height:42px}
.prFeats{list-style:none;margin:22px 0;padding:0;display:flex;flex-direction:column;gap:10px;flex:1}
.prFeats li{display:flex;align-items:flex-start;gap:9px;font-size:13.5px;color:${c.text};line-height:1.5}
.prFeats li svg{color:${c.greenDk};flex-shrink:0;margin-top:3px}
.prBt{width:100%;justify-content:center}
.prFoot{margin-top:30px;text-align:center;font-size:13px;color:${c.muted};line-height:1.65}
.prFoot a{color:${c.text};font-weight:700;text-decoration:underline;text-underline-offset:2px}

.statBand{background:${c.navy};padding:80px 0;color:#fff}
.statHd{text-align:center;max-width:720px;margin:0 auto 44px}
.statHd .overline{color:${c.warm}}
.statTi{margin-top:14px;font-size:clamp(30px,4.5vw,46px);line-height:1.08;letter-spacing:-.04em;color:#fff}
.statSub{margin-top:14px;font-size:16px;line-height:1.65;color:rgba(255,255,255,.7)}
.statGrid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
.statCard{padding:32px 24px;border-radius:20px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);text-align:left}
.statVal{font-size:clamp(48px,7vw,76px);line-height:1;letter-spacing:-.035em;color:#fff}
.statLbl{margin-top:14px;font-size:14px;line-height:1.55;color:rgba(255,255,255,.7);font-weight:500}

.trustGrid{display:grid;grid-template-columns:1fr;gap:14px;margin-top:20px}
.trustCard{padding:24px;border-radius:20px;background:#fff;border:1px solid ${c.border};transition:transform .25s,box-shadow .25s,border-color .25s}
.trustCard:hover{transform:translateY(-2px);box-shadow:0 14px 32px rgba(0,0,0,.05);border-color:rgba(201,149,107,.35)}
.trustCardTop{display:flex;align-items:center;gap:12px;margin-bottom:14px}
.trustNo{font-family:var(--font-instrument-serif),Georgia,serif;font-size:24px;line-height:1;color:${c.warm};letter-spacing:-.02em;min-width:28px}
.trustIc{width:36px;height:36px;border-radius:11px;background:${c.warmSoft};color:${c.warmDk};display:flex;align-items:center;justify-content:center;border:1px solid rgba(201,149,107,.2)}
.trustTi{font-size:17px;font-weight:800;letter-spacing:-.02em;color:${c.text}}
.trustBd{margin-top:8px;font-size:14px;line-height:1.68;color:${c.sub}}

.wlC{background:#fff;border:1px solid ${c.border};border-radius:28px;padding:40px 32px;max-width:760px;margin:0 auto;box-shadow:0 4px 24px rgba(0,0,0,.04);text-align:center}
.wlTi{font-size:clamp(28px,4.5vw,44px);letter-spacing:-.045em;margin-top:14px}
.wlSub{margin-top:14px;font-size:16px;line-height:1.68;color:${c.sub};max-width:540px;margin-left:auto;margin-right:auto}
.wlF{display:grid;grid-template-columns:1fr;gap:10px;margin-top:26px;position:relative}
.wlBt{height:52px;width:100%;font-size:15px}
.inp{width:100%;height:52px;border-radius:12px;border:1.5px solid ${c.border};background:#fff;padding:0 16px;font-size:15px;color:${c.text};outline:none;transition:all .2s}
.inp:focus{border-color:${c.accent};box-shadow:0 0 0 3px rgba(37,99,235,.08)}
.pvL{display:flex;align-items:flex-start;gap:7px;margin-top:14px;color:${c.sub};font-size:12px;line-height:1.55;cursor:pointer;max-width:460px;margin-left:auto;margin-right:auto}
.pvC{margin-top:2px;width:14px;height:14px;accent-color:${c.accent};flex-shrink:0}
.pvLk{color:${c.text};font-weight:700;text-decoration:underline;text-underline-offset:2px}
.fmOk{margin-top:14px;background:${c.greenSoft};color:${c.greenDk};border-radius:12px;padding:13px;font-size:13.5px;font-weight:600}
.fmEr{margin-top:14px;background:${c.redSoft};color:${c.redDk};border-radius:12px;padding:13px;font-size:13.5px;font-weight:600}

.modO{position:fixed;inset:0;z-index:220;background:rgba(9,10,13,.55);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);display:flex;align-items:center;justify-content:center;padding:14px}
.modB{width:100%;max-width:420px;background:#fff;border:1px solid ${c.border};border-radius:24px;padding:30px;box-shadow:0 20px 50px rgba(0,0,0,.18);text-align:center}
.modSeal{width:54px;height:54px;border-radius:999px;background:linear-gradient(135deg,#FFF8F0,#ECFDF3);border:1px solid rgba(34,197,94,.14);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;color:${c.greenDk}}
.modTi{font-size:clamp(24px,4.5vw,30px);letter-spacing:-.045em}
.modBd{margin-top:8px;color:${c.sub};font-size:14px;line-height:1.68}
.modRef{margin-top:20px;padding:15px;border-radius:14px;background:rgba(37,99,235,.03);border:1px solid rgba(37,99,235,.08)}
.modRefLbl{font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:${c.muted};margin-bottom:8px}
.modRefBox{display:flex;align-items:center;gap:6px;background:#fff;border:1px solid ${c.border};border-radius:8px;padding:7px 9px}
.modRefUrl{flex:1;font-size:12px;color:${c.sub};font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:left}
.modRefCp{width:32px;height:32px;border-radius:7px;background:${c.accentSoft};border:1px solid rgba(37,99,235,.1);color:${c.accent};display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0}
.modRefBts{display:flex;gap:6px;margin-top:10px}
.modShareBtn{flex:1;padding:9px 12px!important;font-size:12.5px!important}
.modClose{margin-top:14px;background:none;border:none;color:${c.muted};font-size:12px;font-weight:600;cursor:pointer}

.ft{background:${c.dark};padding:60px 0 28px;color:#fff}
.ftTop{display:grid;grid-template-columns:1fr;gap:32px;padding-bottom:32px;border-bottom:1px solid rgba(255,255,255,.08)}
.ftBrand{max-width:340px}
.ftBr{display:flex;align-items:center;gap:11px;color:#fff}
.ftLoW{background:rgba(255,255,255,.08);border-radius:8px;padding:3px}
.ftBrN{font-size:22px;letter-spacing:-.03em;color:#fff}
.ftBrDesc{margin-top:16px;font-size:13.5px;line-height:1.7;color:rgba(255,255,255,.5);max-width:300px}
.ftCols{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.ftCol{display:flex;flex-direction:column;gap:10px}
.ftColT{font-size:10.5px;font-weight:800;color:rgba(255,255,255,.3);text-transform:uppercase;letter-spacing:.12em;margin-bottom:6px}
.ftLk{font-size:13px;color:rgba(255,255,255,.58);font-weight:500;transition:color .2s}
.ftLk:hover{color:#fff}
.ftLkStatic{cursor:default}
.ftDsc{margin-top:24px;padding:16px 0;font-size:11.5px;color:rgba(255,255,255,.35);line-height:1.7;text-align:center;max-width:680px;margin-left:auto;margin-right:auto}
.ftBtm{border-top:1px solid rgba(255,255,255,.06);padding-top:18px;display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;font-size:11px;color:rgba(255,255,255,.35)}

@media(max-width:639px){
  .sec{padding:56px 0}
  .heroSec{padding:36px 0 44px}
  .heroTi{font-size:clamp(30px,9vw,48px)}
  .heroBt{flex-wrap:nowrap;gap:8px;justify-content:center}
  .heroBtP,.heroBtS{flex:1;min-width:0;min-height:50px;padding:14px 14px;font-size:13.5px}
  .heroBtP{gap:5px}
  .navR{gap:6px;height:60px}
  .navNm{font-size:18px}
  .navLo{width:30px;height:30px}
  .navRight{gap:10px}
  .navCt{padding:9px 14px!important;font-size:12px!important}
  .navSignIn{font-size:13px}
  .processStrip{padding:48px 0}
  .processGrid{gap:32px}
  .statBand{padding:60px 0}
  .statGrid{grid-template-columns:1fr;gap:12px}
  .statCard{padding:26px 22px}
  .wlC{padding:30px 22px}
  .wsDetail{min-height:340px}
  .wsEval{width:calc(100% - 32px);top:64px}
  .wsEvalInner{padding:10px 12px;gap:9px}
  .wsEvalTask{font-size:11px}
  .wsEvalBar{width:48px}
  .wsRowSupply{margin-top:6px}
  .wsRowSupplyTrack{min-width:50px}
}

@media(min-width:640px){
  .container{padding:0 28px}
  .navR{height:72px}
  .navLks{display:flex}
  .processGrid{grid-template-columns:1fr 40px 1fr 40px 1fr;gap:12px}
  .processLine{display:block}
  .featGrid{grid-template-columns:repeat(3,1fr)}
  .indGrid{grid-template-columns:repeat(2,1fr)}
  .prGrid{grid-template-columns:repeat(3,1fr);gap:16px}
  .statGrid{grid-template-columns:repeat(4,1fr)}
  .trustGrid{grid-template-columns:repeat(2,1fr)}
  .wlF{grid-template-columns:1.2fr .9fr auto}
  .wlBt{width:auto}
  .ftTop{grid-template-columns:1.1fr 2fr;gap:48px}
  .wsBody{grid-template-columns:.92fr 1.08fr}
}

@media(min-width:960px){
  .container{padding:0 36px}
  .sec{padding:96px 0}
  .heroSec{padding:64px 0 80px}
  .heroGrid{grid-template-columns:minmax(0,1fr) minmax(540px,580px);gap:48px;align-items:center}
  .heroTxt{max-width:620px;margin:0;text-align:left}
  .heroSub{margin-left:0;margin-right:0}
  .heroBt{justify-content:flex-start}
  .heroBoardCol{justify-content:flex-end}
  .indGrid{grid-template-columns:repeat(4,1fr)}
  .trustGrid{grid-template-columns:repeat(4,1fr)}
  .statBand{padding:104px 0}
}

@media(min-width:1180px){
  .heroTi{font-size:clamp(56px,5.6vw,78px)}
}
`;
