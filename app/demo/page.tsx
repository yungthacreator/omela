"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Send, RotateCcw, Pill, MapPin, Clock, Phone, Globe, FileText, Baby } from "lucide-react";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');`;

const c = {
  bg: "#F8F6F1", card: "#FFFFFF", dark: "#08090C",
  text: "#111214", sub: "#4A4F5C", muted: "#888E9C",
  accent: "#2563EB", accentSoft: "#ECF2FF",
  border: "#E3DDD2",
  green: "#22C55E", greenSoft: "#ECFDF3", greenDk: "#15803D",
  amber: "#F59E0B", amberSoft: "#FFFBEB",
  red: "#EF4444", redSoft: "#FEF2F2",
};

type Msg = { from: "user" | "laura"; text: string; urgency?: "routine" | "soon" | "urgent" | "emergency"; action?: string };

type Scenario = {
  id: string;
  icon: React.ReactNode;
  label: string;
  emoji: string;
  desc: string;
  color: string;
  conversation: Msg[];
};

const scenarios: Scenario[] = [
  {
    id: "prescription",
    icon: <Pill size={16} />,
    label: "Repeat prescription",
    emoji: "💊",
    desc: "You need a refill but the GP line is busy",
    color: "#7C3AED",
    conversation: [
      { from: "user", text: "I need to refill my blood pressure medication. I have been trying to call my GP for two days but the line is always busy." },
      { from: "laura", text: "I understand how frustrating that is, especially for medication you depend on daily. Let me help you get this sorted without the phone queue.\n\nFirst, which medication do you need refilled?", urgency: "routine" },
      { from: "user", text: "Amlodipine 5mg. I take it every morning. I have about 3 days left." },
      { from: "laura", text: "Got it. Amlodipine 5mg, daily. With 3 days remaining, we have a short window but enough time to get this processed.\n\nI have found your registered practice: Parkside Medical Centre (0.4 miles from you). They accept repeat prescription requests online and by phone.\n\nI can do two things right now:\n\n1. Draft a refill request message you can submit through their online portal\n2. Request a callback from the dispensary team\n\nWhich would you prefer?", action: "Provider found: Parkside Medical Centre" },
      { from: "user", text: "Can you draft the request? That would save me so much time." },
      { from: "laura", text: "Here is your draft refill request:\n\n\"Dear Parkside Medical Centre,\n\nI would like to request a repeat prescription for Amlodipine 5mg (once daily). I have approximately 3 days of supply remaining. My date of birth is [your DOB] and my NHS number is [your number].\n\nPlease let me know if anything further is needed.\n\nThank you.\"\n\nYou can submit this through their online portal or email it to prescriptions@parkside.nhs.uk. Most practices process repeats within 48 hours.\n\nWould you also like me to set a reminder for your next refill so you never have to chase this again?" },
    ],
  },
  {
    id: "moved",
    icon: <MapPin size={16} />,
    label: "Just moved, need a GP",
    emoji: "📍",
    desc: "New city, no doctor, no idea where to start",
    color: "#059669",
    conversation: [
      { from: "user", text: "I just moved to Manchester from Lagos two weeks ago. I do not have a GP here and I am not sure how the system works. I also need to get my asthma inhaler." },
      { from: "laura", text: "Welcome to Manchester. I know navigating a new healthcare system in a new country can feel overwhelming, so let me walk you through this step by step.\n\nIn the UK, everyone is entitled to register with a GP practice near where they live. This is free through the NHS. You do not need to have settled status or pay anything upfront.\n\nWhat is your postcode or the area you are living in?" },
      { from: "user", text: "I am in M1, near Piccadilly." },
      { from: "laura", text: "I found 5 GP practices near M1 that are currently accepting new patients:\n\n1. City Health Centre (0.3 miles) - Open registration\n2. Piccadilly Medical Practice (0.5 miles) - Open registration\n3. Northern Quarter Surgery (0.6 miles) - Open registration\n\nTo register, you will need:\n- Proof of address (utility bill, tenancy agreement)\n- Photo ID (passport or BRP card)\n- Your previous medical records are helpful but not required\n\nOnce registered, you can request your asthma inhaler as a new patient. Most practices can process this within your first appointment.\n\nWould you like me to request a registration callback from City Health Centre? They can guide you through the rest.", action: "3 practices found near M1", urgency: "routine" },
      { from: "user", text: "Yes please. Also, is there anything I should know before I go?" },
      { from: "laura", text: "A few things that will make your first visit smoother:\n\n- Appointments are usually 10 minutes. Write down your main concerns beforehand so you cover everything.\n- Mention your asthma history and which inhaler you use (brand and strength). If you have the packaging, bring it.\n- Ask about repeat prescriptions so next time you can request refills without booking an appointment.\n- If you need an interpreter, the practice can arrange one for free. You have the right to this.\n\nI have submitted a registration callback request to City Health Centre. They typically respond within 1-2 working days.\n\nIs there anything else I can help with as you settle in?" },
    ],
  },
  {
    id: "afterhours",
    icon: <Clock size={16} />,
    label: "It is 11pm and I am worried",
    emoji: "🌙",
    desc: "After-hours anxiety about your child",
    color: "#DC2626",
    conversation: [
      { from: "user", text: "My 3 year old has had a temperature of 38.5 for two days. She is not eating much. It is 11pm and I do not know if I should go to A&E or wait until morning." },
      { from: "laura", text: "I can hear how worried you are, and you are doing the right thing by asking. Let me help you think through this carefully.\n\nA temperature of 38.5 in a 3-year-old for two days is worth monitoring closely. Before I suggest next steps, can you tell me:\n\n- Is she responsive and making eye contact when you talk to her?\n- Is she drinking any fluids?\n- Does she have a rash? (Press a glass against any spots and see if they fade)", urgency: "urgent" },
      { from: "user", text: "She is responding to me but seems tired. She had some water an hour ago. No rash that I can see." },
      { from: "laura", text: "That is reassuring. A child who is responsive, making eye contact, and taking some fluids is a good sign, even when they have a fever.\n\nBased on what you have described, this does not sound like an emergency that needs A&E tonight. However, it does need clinical attention soon.\n\nHere is what I recommend:\n\n1. Tonight: Keep her comfortable, offer small sips of water, and use children's paracetamol if you have not already (check the dosage for her age).\n\n2. Tomorrow morning: Call your GP at 8am for a same-day appointment. Tell them about the 2-day fever.\n\n3. If anything changes tonight (she becomes difficult to wake, develops a rash that does not fade under glass, has trouble breathing, or seems confused), go straight to A&E or call 999.\n\nWould you like me to find the nearest out-of-hours GP service near you, just in case you need it overnight?", urgency: "urgent", action: "Urgency: monitor tonight, GP in the morning" },
      { from: "user", text: "Yes, and can you set a reminder for me to call the GP at 8am?" },
      { from: "laura", text: "I have found your nearest out-of-hours service:\n\nManchester Urgent Care Centre\nOpen until midnight, reopens at 7am\nPhone: 0161 XXX XXXX\nAddress: Oxford Road, M13\n\nIf her condition worsens before the GP opens, call them or go to A&E.\n\nI will send you a reminder at 7:50am to call your GP. When you call, here is exactly what to say:\n\n\"My 3-year-old daughter has had a temperature of 38.5 for two days. She is drinking a little but not eating. I need a same-day appointment please.\"\n\nYou are doing a great job looking after her. Try to rest when she does." },
    ],
  },
  {
    id: "referral",
    icon: <FileText size={16} />,
    label: "Hospital referral confusion",
    emoji: "📋",
    desc: "You got a letter but do not understand what happens next",
    color: "#0284C7",
    conversation: [
      { from: "user", text: "I received a hospital referral letter for a cardiology appointment but I do not understand most of it. It mentions an echocardiogram. What does that mean? What do I need to do?" },
      { from: "laura", text: "Referral letters can feel confusing, especially when they use medical terms. Let me help you understand everything.\n\nAn echocardiogram is an ultrasound scan of your heart. It is completely painless and non-invasive. A technician places a small device on your chest that uses sound waves to create images of your heart. The whole thing usually takes 15-30 minutes.\n\nThere is nothing to be anxious about. You do not need any needles, you stay fully awake, and you can drive home afterwards.\n\nDo you have the appointment date and hospital name from the letter?" },
      { from: "user", text: "It says Royal Infirmary, 15 April, Outpatient Cardiology. But I do not know where to go when I get there or what to bring." },
      { from: "laura", text: "Here is everything you need to know for that day:\n\nWhat to bring:\n- The referral letter itself\n- A list of any medications you take (names and doses)\n- Your NHS number (usually on the letter)\n- Photo ID\n\nWhen you arrive at Royal Infirmary:\n- Follow signs to Outpatient Cardiology (usually has its own reception desk)\n- Check in at the reception. Give them your name and appointment time.\n- You will be called to a waiting area. Typical wait is 15-30 minutes past your appointment time.\n\nWhat to wear:\n- Something easy to remove from the waist up, since they need to place the device on your chest.\n\nAfter the scan:\n- Results go to your referring doctor, usually within 1-2 weeks\n- If anything needs attention sooner, they will contact you directly\n\nWould you like me to save these instructions and send you a reminder the day before your appointment?", action: "Appointment guide: Royal Infirmary, 15 April" },
    ],
  },
  {
    id: "language",
    icon: <Globe size={16} />,
    label: "I do not speak English well",
    emoji: "🌍",
    desc: "Language barrier when trying to access care",
    color: "#7C3AED",
    conversation: [
      { from: "user", text: "Bonjour, j'ai besoin d'un medecin mais je ne parle pas bien anglais. Je suis a Londres depuis une semaine et j'ai tres mal au ventre." },
      { from: "laura", text: "Bonjour. Je vais vous aider en francais, ne vous inquietez pas.\n\nJe comprends que vous avez des douleurs au ventre et que vous etes a Londres depuis une semaine. Quelques questions pour mieux vous orienter:\n\n- Depuis combien de temps avez-vous mal au ventre?\n- La douleur est-elle constante ou va-t-elle et vient-elle?\n- Avez-vous de la fievre, des nausees ou des vomissements?", urgency: "soon" },
      { from: "user", text: "Ca fait 3 jours. La douleur va et vient. Pas de fievre mais un peu de nausees." },
      { from: "laura", text: "Merci. Des douleurs abdominales intermittentes avec nausees depuis 3 jours meritent une consultation, mais ce n'est probablement pas une urgence.\n\nVoici ce que je peux faire pour vous:\n\n1. Trouver un cabinet medical pres de chez vous qui accepte les patients sans rendez-vous\n2. Demander un rappel pour vous, avec une note en anglais expliquant vos symptomes pour le medecin\n\nImportant: en tant que ressortissant europeen au Royaume-Uni, vous avez le droit a un interprete gratuit dans les cabinets NHS. Vous n'avez pas besoin de parler anglais pour etre soigne.\n\nQuel est votre code postal a Londres?", action: "Langue: Francais. Interprete disponible." },
      { from: "user", text: "Je suis pres de SE1." },
      { from: "laura", text: "J'ai trouve 3 cabinets pres de SE1 qui acceptent les visites sans rendez-vous:\n\n1. Waterloo Health Centre (0.2 miles) - Sans rendez-vous le matin\n2. Borough Medical Centre (0.4 miles) - Sans rendez-vous toute la journee\n\nJe vais preparer une note en anglais que vous pourrez montrer a l'accueil:\n\n\"This patient has had intermittent abdominal pain with mild nausea for 3 days. No fever. They speak French and would benefit from an interpreter if available.\"\n\nVoulez-vous que je demande un rappel de Waterloo Health Centre pour vous?" },
    ],
  },
  {
    id: "callback",
    icon: <Phone size={16} />,
    label: "They keep telling me to call back",
    emoji: "😤",
    desc: "Stuck in callback hell for weeks",
    color: "#EA580C",
    conversation: [
      { from: "user", text: "I have been trying to get a doctor appointment for 3 weeks. Every time I call they say there are no slots and to try again tomorrow. I have a knee problem that is getting worse and I cannot keep taking time off work to sit on the phone." },
      { from: "laura", text: "That is genuinely exhausting, and you should not have to fight this hard to be seen. Three weeks of daily calling for a worsening knee is unacceptable, and I want to help you break out of this cycle.\n\nLet me ask a few things so I can find the fastest route for you:\n\n- Is your knee swollen, red, or warm to the touch?\n- Can you put weight on it?\n- Did this start after an injury, or did it come on gradually?", urgency: "soon" },
      { from: "user", text: "It is a bit swollen. I can walk on it but it hurts going up stairs. No injury, it just started getting worse over the last month." },
      { from: "laura", text: "A gradually worsening, swollen knee that has been getting worse for a month needs to be seen, but it is not an emergency. The problem is clearly the access bottleneck, not the urgency.\n\nHere are three ways to get past the phone queue:\n\n1. Online booking: Many GP practices now have online appointment systems. Does your practice have an NHS app or online portal? You can often book same-day or next-day slots at midnight when they release.\n\n2. Alternative route: I found a walk-in clinic near you (City Walk-In Centre, 0.6 miles) that sees patients without appointments. Wait times are typically 30-60 minutes. This might be faster than 3 more weeks of calling.\n\n3. Callback request: I can submit a structured request to your GP on your behalf, flagging that you have been trying for 3 weeks and the condition is worsening. Practices take these more seriously than phone queue requests.\n\nWhich option works best for you?", action: "3 access routes identified" },
      { from: "user", text: "Please submit the callback request. And the walk-in centre sounds good as a backup." },
      { from: "laura", text: "Done. I have submitted a callback request to your practice with the following summary:\n\n\"Patient has been attempting to book for 3 weeks without success. Gradually worsening knee pain with visible swelling for 1 month. Able to weight-bear but pain increasing, especially on stairs. No acute injury. Requesting same-day or next-day appointment.\"\n\nI have also saved the walk-in centre details:\nCity Walk-In Centre\nOpen 8am-8pm, 7 days\n0.6 miles from you\nNo appointment needed\n\nIf you do not hear back from your GP within 24 hours, I would recommend going to the walk-in centre. You should not have to wait any longer.\n\nI will check in with you tomorrow. Would that be helpful?" },
    ],
  },
];

const urgencyColors = {
  routine: { bg: c.greenSoft, text: c.greenDk, label: "Routine" },
  soon: { bg: c.amberSoft, text: "#92400E", label: "Book soon" },
  urgent: { bg: "#FFF7ED", text: "#C2410C", label: "Needs attention" },
  emergency: { bg: c.redSoft, text: "#991B1B", label: "Emergency" },
};

export default function DemoPage() {
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);
  const [visibleMsgs, setVisibleMsgs] = useState(0);
  const [typing, setTyping] = useState(false);
  const [freeInput, setFreeInput] = useState("");
  const [freeMessages, setFreeMessages] = useState<Msg[]>([
    { from: "laura", text: "Hello. I am Laura. Tell me what you are dealing with and I will help you figure out the next step. You can describe symptoms, ask about prescriptions, find a doctor near you, or just tell me what is stressing you out about getting care." },
  ]);
  const [mode, setMode] = useState<"scenarios" | "free">("scenarios");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleMsgs, freeMessages, typing]);

  function startScenario(s: Scenario) {
    setActiveScenario(s);
    setVisibleMsgs(0);
    setMode("scenarios");
    advanceScenario(s, 0);
  }

  function advanceScenario(s: Scenario, idx: number) {
    if (idx >= s.conversation.length) return;
    const msg = s.conversation[idx];
    if (msg.from === "user") {
      setVisibleMsgs(idx + 1);
      setTimeout(() => {
        setTyping(true);
        setTimeout(() => {
          setTyping(false);
          setVisibleMsgs(idx + 2);
          setTimeout(() => advanceScenario(s, idx + 2), 1200);
        }, 800 + Math.random() * 1000);
      }, 600);
    } else {
      setVisibleMsgs(idx + 1);
      setTimeout(() => advanceScenario(s, idx + 1), 1200);
    }
  }

  function getResponse(input: string): Msg {
    const lower = input.toLowerCase();
    if (lower.match(/chest\s*pain|can'?t\s*breathe|unconscious|stroke|seizure/)) return { from: "laura", text: "This sounds like it could be a medical emergency. Please call 999 (UK) or 911 (US) immediately. Do not wait.", urgency: "emergency" };
    if (lower.match(/prescription|refill|medication|medicine|inhaler|repeat/)) return { from: "laura", text: "I can help with that. Chasing repeat prescriptions is one of the most frustrating parts of the system.\n\nLet me find your registered practice and check if they accept online refill requests. What medication do you need, and roughly how many days of supply do you have left?", urgency: "routine" };
    if (lower.match(/move|moved|new|register|no\s*gp|no\s*doctor/)) return { from: "laura", text: "Welcome. Moving to a new area and not having a doctor can feel stressful, especially when you actually need one.\n\nI can find GP practices near you that are accepting new patients and walk you through the registration process step by step. What is your postcode or area?", urgency: "routine" };
    if (lower.match(/referral|hospital|letter|appointment|specialist|echo|scan|mri/)) return { from: "laura", text: "Hospital referral letters can feel confusing. I can help you understand what the appointment involves, what to bring, where to go, and what to expect on the day.\n\nCould you tell me a bit more about what the referral is for?", urgency: "routine" };
    if (lower.match(/callback|call\s*back|no\s*slots|can'?t\s*get|waiting|weeks|busy/)) return { from: "laura", text: "Being stuck in the phone queue cycle is genuinely exhausting. You should not have to call every morning just to be told there is nothing available.\n\nI can help you find alternative routes: walk-in clinics, online booking portals, or I can submit a structured callback request to your practice that is harder to ignore. What have you been trying to get seen for?", urgency: "soon" };
    if (lower.match(/fever|temperature|child|baby|kid|son|daughter/)) return { from: "laura", text: "I understand the worry. Let me help you figure out whether this needs attention tonight or can wait until morning.\n\nCan you tell me their age, how high the temperature is, and how long it has been going on?", urgency: "urgent" };
    if (lower.match(/dentist|tooth|teeth|dental/)) return { from: "laura", text: "Dental pain is awful. I can find dentists near you that are accepting patients, including emergency dental services if the pain is severe.\n\nIs this an emergency (severe pain, swelling, or bleeding) or something you can wait a day or two for?", urgency: "soon" };
    if (lower.match(/anxious|anxiety|depressed|depression|mental|stressed|panic|lonely|sad/)) return { from: "laura", text: "Thank you for sharing that. What you are feeling matters, and you deserve support.\n\nI can help you find a GP appointment to talk about how you are feeling. Many practices now offer same-day mental health consultations. I can also point you to free helplines that are available right now.\n\nWhat feels most helpful to you?", urgency: "soon" };
    if (lower.match(/hello|hi|hey|morning|afternoon|evening/)) return { from: "laura", text: "Hello. I am here to help. You can tell me about any health concern, ask me to find a doctor near you, help with a repeat prescription, explain a hospital letter, or just describe what is going on. What do you need today?" };
    return { from: "laura", text: "I understand. Could you tell me a bit more about what you are experiencing or what you need help with? I can help with symptoms, finding a doctor, repeat prescriptions, hospital referrals, or just getting through a frustrating system." };
  }

  function sendFree(text: string) {
    if (!text.trim()) return;
    setFreeMessages(prev => [...prev, { from: "user", text: text.trim() }]);
    setFreeInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setFreeMessages(prev => [...prev, getResponse(text)]);
    }, 800 + Math.random() * 1000);
  }

  function resetAll() {
    setActiveScenario(null);
    setVisibleMsgs(0);
    setMode("scenarios");
    setFreeMessages([{ from: "laura", text: "Hello. I am Laura. Tell me what you are dealing with and I will help you figure out the next step." }]);
    setFreeInput("");
    setTyping(false);
  }

  const currentMsgs = mode === "scenarios" && activeScenario ? activeScenario.conversation.slice(0, visibleMsgs) : freeMessages;

  return (
    <>
      <style>{FONT}</style>
      <style>{CSS}</style>
      <div className="dWrap">
        <nav className="dNav">
          <div className="container dNavIn">
            <Link href="/" className="dBrand">
              <div className="dLogo"><Image src="/omela-logo-mark.png" alt="Omela" width={30} height={30} style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
              <div><div className="dBrandN">Omela</div><div className="dBrandS serif">Try Laura</div></div>
            </Link>
            <div className="dNavR">
              <button onClick={resetAll} className="dResetBtn"><RotateCcw size={13} /> Reset</button>
              <Link href="/#waitlist" className="btnP dNavCta">Get early access <ArrowRight size={13} /></Link>
            </div>
          </div>
        </nav>

        <div className="dDisclaimer">This is a preview demo with simulated responses. Laura is not providing real medical advice.</div>

        <div className="dMain">
          <div className="dInner">
            {/* Scenario picker */}
            {!activeScenario && mode === "scenarios" && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="dScenarios">
                <h2 className="serif dScTitle">Real problems. Real help.</h2>
                <p className="dScBody">Choose a scenario to see how Laura handles everyday healthcare frustrations.</p>
                <div className="dScGrid">
                  {scenarios.map(s => (
                    <button key={s.id} className="dScCard" onClick={() => startScenario(s)}>
                      <span className="dScEmoji">{s.emoji}</span>
                      <span className="dScLabel">{s.label}</span>
                      <span className="dScDesc">{s.desc}</span>
                    </button>
                  ))}
                </div>
                <button className="dFreeBtn" onClick={() => setMode("free")}>Or just type your own question <ArrowRight size={14} /></button>
              </motion.div>
            )}

            {/* Chat messages */}
            {(activeScenario || mode === "free") && (
              <div className="dChat">
                {activeScenario && mode === "scenarios" && (
                  <div className="dScenarioLabel">
                    <span>{activeScenario.emoji}</span>
                    <span>{activeScenario.label}</span>
                  </div>
                )}

                <div className="dMessages">
                  <AnimatePresence initial={false}>
                    {currentMsgs.map((msg, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className={`dMsg ${msg.from === "user" ? "dMsgR" : "dMsgL"}`}>
                        {msg.from === "laura" && <div className="dMsgAv"><Image src="/laura-avatar.png" alt="Laura" fill sizes="30px" style={{ objectFit: "cover" }} /></div>}
                        <div className={`dMsgC ${msg.from === "user" ? "dMsgU" : "dMsgLa"}`}>
                          <p className="dMsgTxt" style={{ whiteSpace: "pre-line" }}>{msg.text}</p>
                          {msg.urgency && (
                            <div className="dUrg" style={{ background: urgencyColors[msg.urgency].bg, color: urgencyColors[msg.urgency].text }}>
                              <span className="dUrgDot" style={{ background: urgencyColors[msg.urgency].text }} />
                              {urgencyColors[msg.urgency].label}
                            </div>
                          )}
                          {msg.action && <div className="dAction">{msg.action}</div>}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {typing && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="dMsg dMsgL">
                      <div className="dMsgAv"><Image src="/laura-avatar.png" alt="Laura" fill sizes="30px" style={{ objectFit: "cover" }} /></div>
                      <div className="dMsgLa dTyping"><span /><span /><span /></div>
                    </motion.div>
                  )}
                  <div ref={bottomRef} />
                </div>

                {/* Scenario end */}
                {mode === "scenarios" && activeScenario && visibleMsgs >= activeScenario.conversation.length && !typing && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="dEnd">
                    <p className="dEndTxt">End of scenario. Try another or type your own question.</p>
                    <div className="dEndBtns">
                      <button className="btnP" onClick={resetAll}>Try another scenario</button>
                      <button className="btnS" onClick={() => { setActiveScenario(null); setMode("free"); }}>Type my own question</button>
                    </div>
                  </motion.div>
                )}

                {/* Free input */}
                {mode === "free" && (
                  <div className="dInput">
                    <input type="text" placeholder="Tell Laura what you need help with..." value={freeInput} onChange={e => setFreeInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !typing) sendFree(freeInput); }} disabled={typing} className="dInputField" />
                    <button onClick={() => sendFree(freeInput)} disabled={typing || !freeInput.trim()} className="dSendBtn"><Send size={16} /></button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const CSS = `
*{box-sizing:border-box;margin:0;padding:0}html,body{height:100%;max-width:100%;overflow:hidden}
body{background:${c.bg};color:${c.text};font-family:'DM Sans',-apple-system,sans-serif;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}button,input{font-family:inherit}
.serif{font-family:'Instrument Serif',Georgia,serif}
.container{max-width:1200px;margin:0 auto;padding:0 16px}
.btnP{display:inline-flex;align-items:center;gap:6px;background:${c.dark};color:#fff;border:none;border-radius:999px;padding:10px 18px;font-size:13px;font-weight:700;cursor:pointer;white-space:nowrap}
.btnS{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,0.85);color:${c.text};border:1px solid ${c.border};border-radius:999px;padding:10px 18px;font-size:13px;font-weight:700;cursor:pointer;white-space:nowrap}

.dWrap{display:flex;flex-direction:column;height:100vh;height:100dvh}
.dNav{background:rgba(248,246,241,0.94);backdrop-filter:blur(16px);border-bottom:1px solid ${c.border};flex-shrink:0}
.dNavIn{display:flex;align-items:center;justify-content:space-between;height:52px;gap:8px}
.dBrand{display:flex;align-items:center;gap:7px;text-decoration:none;flex-shrink:0}
.dLogo{width:28px;height:28px;border-radius:8px;overflow:hidden;box-shadow:0 2px 6px rgba(0,0,0,0.06)}
.dBrandN{font-size:12px;font-weight:800}.dBrandS{font-size:9px;color:${c.accent};font-weight:700}
.dNavR{display:flex;gap:6px;align-items:center}
.dResetBtn{display:inline-flex;align-items:center;gap:4px;background:rgba(255,255,255,0.8);border:1px solid ${c.border};border-radius:999px;padding:6px 12px;font-size:11px;font-weight:600;color:${c.sub};cursor:pointer}
.dNavCta{padding:7px 14px!important;font-size:11px!important}

.dDisclaimer{background:${c.amberSoft};border-bottom:1px solid #FDE68A;padding:6px 16px;flex-shrink:0;font-size:10px;color:#92400E;font-weight:600;text-align:center;line-height:1.5}

.dMain{flex:1;display:flex;flex-direction:column;overflow:hidden}
.dInner{max-width:720px;width:100%;margin:0 auto;display:flex;flex-direction:column;height:100%;padding:0 12px}

/* Scenarios */
.dScenarios{padding:20px 0;overflow-y:auto;flex:1}
.dScTitle{font-size:clamp(24px,5vw,36px);letter-spacing:-0.04em;line-height:1.1}
.dScBody{font-size:14px;color:${c.sub};line-height:1.6;margin-top:6px}
.dScGrid{display:grid;grid-template-columns:1fr;gap:8px;margin-top:20px}
.dScCard{display:flex;align-items:flex-start;gap:12px;width:100%;padding:16px;background:${c.card};border:1px solid ${c.border};border-radius:16px;cursor:pointer;text-align:left;font-family:inherit;transition:all 0.2s;flex-wrap:wrap}
.dScCard:hover{border-color:#D0CBBD;box-shadow:0 6px 20px rgba(0,0,0,0.05);transform:translateY(-1px)}
.dScEmoji{font-size:24px;flex-shrink:0;margin-top:2px}
.dScLabel{font-size:14px;font-weight:700;color:${c.text};flex:1;min-width:120px}
.dScDesc{font-size:12px;color:${c.muted};width:100%;margin-top:2px}
.dFreeBtn{display:flex;align-items:center;gap:6px;margin-top:16px;background:none;border:none;color:${c.accent};font-size:14px;font-weight:700;cursor:pointer;padding:0}

/* Chat */
.dChat{flex:1;display:flex;flex-direction:column;overflow:hidden;padding-top:8px}
.dScenarioLabel{display:flex;align-items:center;gap:6px;padding:8px 14px;background:${c.accentSoft};border-radius:12px;font-size:12px;font-weight:700;color:${c.accent};margin-bottom:8px;flex-shrink:0}
.dMessages{flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:14px;padding:8px 0;scrollbar-width:thin;scrollbar-color:${c.border} transparent}
.dMessages::-webkit-scrollbar{width:4px}.dMessages::-webkit-scrollbar-thumb{background:${c.border};border-radius:4px}

.dMsg{display:flex;gap:8px;align-items:flex-start}
.dMsgR{flex-direction:row-reverse}
.dMsgL{flex-direction:row}
.dMsgAv{position:relative;width:30px;height:30px;border-radius:999px;overflow:hidden;flex-shrink:0;border:1.5px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.08)}
.dMsgC{max-width:80%;padding:14px 16px;border-radius:18px}
.dMsgU{background:${c.dark};color:#fff;border-radius:18px 18px 6px 18px}
.dMsgLa{background:${c.card};border:1px solid ${c.border};border-radius:18px 18px 18px 6px;box-shadow:0 2px 8px rgba(0,0,0,0.03)}
.dMsgTxt{font-size:14px;line-height:1.72}

.dUrg{display:inline-flex;align-items:center;gap:5px;margin-top:10px;padding:5px 11px;border-radius:999px;font-size:11px;font-weight:700}
.dUrgDot{width:5px;height:5px;border-radius:999px;flex-shrink:0}

.dAction{margin-top:8px;padding:8px 12px;border-radius:10px;background:${c.accentSoft};color:${c.accent};font-size:11px;font-weight:700;border:1px solid rgba(37,99,235,0.1)}

.dTyping{display:flex;gap:4px;padding:14px 18px}
.dTyping span{width:6px;height:6px;border-radius:999px;background:${c.muted};animation:tDot 1.2s infinite}
.dTyping span:nth-child(2){animation-delay:0.2s}
.dTyping span:nth-child(3){animation-delay:0.4s}
@keyframes tDot{0%,80%{opacity:0.3;transform:scale(0.8)}40%{opacity:1;transform:scale(1)}}

.dEnd{padding:14px 0;flex-shrink:0;border-top:1px solid ${c.border}}
.dEndTxt{font-size:13px;color:${c.muted};margin-bottom:10px}
.dEndBtns{display:flex;gap:8px;flex-wrap:wrap}

.dInput{display:flex;gap:6px;padding:10px 0 16px;flex-shrink:0;border-top:1px solid ${c.border}}
.dInputField{flex:1;height:48px;border-radius:14px;border:1px solid ${c.border};background:#fff;padding:0 16px;font-size:14px;color:${c.text};outline:none}
.dInputField:focus{border-color:${c.accent};box-shadow:0 0 0 3px rgba(37,99,235,0.06)}
.dInputField:disabled{opacity:0.5}
.dSendBtn{width:48px;height:48px;border-radius:14px;background:${c.accent};color:#fff;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.dSendBtn:disabled{opacity:0.3;cursor:not-allowed}

@media(min-width:640px){
  .container{padding:0 24px}.dInner{padding:0 20px}
  .dScGrid{grid-template-columns:repeat(2,1fr);gap:10px}
  .dMsgC{max-width:70%}
  .dNavIn{height:60px}
}
@media(min-width:960px){
  .dScGrid{grid-template-columns:repeat(3,1fr)}
}
`;
