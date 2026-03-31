"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Send,
  RotateCcw,
  Pill,
  MapPin,
  Clock,
  Phone,
  Globe,
  FileText,
  Sparkles,
} from "lucide-react";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');`;

const c = {
  bg: "#F8F6F1",
  card: "#FFFFFF",
  dark: "#08090C",
  text: "#111214",
  sub: "#4A4F5C",
  muted: "#888E9C",
  accent: "#2563EB",
  accentSoft: "#ECF2FF",
  border: "#E3DDD2",
  green: "#22C55E",
  greenSoft: "#ECFDF3",
  greenDk: "#15803D",
  amber: "#F59E0B",
  amberSoft: "#FFFBEB",
  red: "#EF4444",
  redSoft: "#FEF2F2",
};

type Msg = {
  from: "user" | "laura";
  text: string;
  urgency?: "routine" | "soon" | "urgent" | "emergency";
  action?: string;
};

type Scenario = {
  id: string;
  label: string;
  emoji: string;
  desc: string;
  cta: string;
  icon: "pill" | "pin" | "clock" | "file" | "globe" | "phone";
  conversation: Msg[];
};

const urgencyColors = {
  routine: { bg: c.greenSoft, text: c.greenDk, label: "Routine" },
  soon: { bg: c.amberSoft, text: "#92400E", label: "Book soon" },
  urgent: { bg: "#FFF7ED", text: "#C2410C", label: "Needs attention" },
  emergency: { bg: c.redSoft, text: "#991B1B", label: "Emergency" },
};

const scenarios: Scenario[] = [
  {
    id: "prescription",
    label: "Repeat prescription",
    emoji: "💊",
    icon: "pill",
    desc: "The GP line is busy and you need your medication",
    cta: "Watch Laura draft a refill",
    conversation: [
      {
        from: "user",
        text: "I need to refill my blood pressure medication. I have been trying to call my GP for two days but the line is always busy.",
      },
      {
        from: "laura",
        text: "I understand how frustrating that is, especially for medication you depend on daily. Let me help you get this sorted without the phone queue.\n\nWhich medication do you need refilled?",
        urgency: "routine",
      },
      {
        from: "user",
        text: "Amlodipine 5mg. I take it every morning. I have about 3 days left.",
      },
      {
        from: "laura",
        text: 'Got it. Amlodipine 5mg, daily. With 3 days remaining, we have a short window but enough time.\n\nI found your practice: Parkside Medical Centre (0.4 miles). They accept repeat prescription requests online.\n\nHere is your draft refill request:\n\n"Dear Parkside Medical Centre,\nI would like to request a repeat prescription for Amlodipine 5mg (once daily). I have approximately 3 days of supply remaining.\nThank you."\n\nShall I also set a reminder for your next refill?',
        action: "Refill request drafted for Parkside Medical Centre",
      },
    ],
  },
  {
    id: "moved",
    label: "New city, no doctor",
    emoji: "📍",
    icon: "pin",
    desc: "You just arrived and need to register",
    cta: "Watch Laura guide registration",
    conversation: [
      {
        from: "user",
        text: "I just moved to Manchester from Lagos. I do not have a GP and I need my asthma inhaler.",
      },
      {
        from: "laura",
        text: "Welcome to Manchester. In the UK, everyone can register with a GP practice near where they live. This is free through the NHS.\n\nWhat is your postcode or area?",
      },
      {
        from: "user",
        text: "I am in M1, near Piccadilly.",
      },
      {
        from: "laura",
        text: "I found 3 GP practices near M1 accepting new patients:\n\n1. City Health Centre (0.3 miles)\n2. Piccadilly Medical Practice (0.5 miles)\n3. Northern Quarter Surgery (0.6 miles)\n\nTo register, bring: proof of address and photo ID. Your previous records are helpful but not required.\n\nOnce registered, you can request your inhaler at your first appointment. If you need an interpreter, the practice arranges one for free.\n\nShall I request a registration callback from City Health Centre?",
        action: "3 practices found near M1",
        urgency: "routine",
      },
    ],
  },
  {
    id: "afterhours",
    label: "11pm and worried",
    emoji: "🌙",
    icon: "clock",
    desc: "Your child has a fever and you are unsure what to do",
    cta: "Watch Laura assess calmly",
    conversation: [
      {
        from: "user",
        text: "My 3 year old has had a temperature of 38.5 for two days. She is not eating much. It is 11pm and I do not know if I should go to A&E.",
      },
      {
        from: "laura",
        text: "I can hear how worried you are. Let me help you think through this.\n\nCan you tell me:\n- Is she responsive and making eye contact?\n- Is she drinking any fluids?\n- Does she have a rash?",
        urgency: "urgent",
      },
      {
        from: "user",
        text: "She is responding to me but seems tired. She had some water an hour ago. No rash.",
      },
      {
        from: "laura",
        text: "That is reassuring. A child who is responsive and taking fluids is a good sign.\n\nThis does not sound like an A&E emergency tonight, but it does need attention soon.\n\nTonight: Keep her comfortable, offer small sips of water, use children's paracetamol.\n\nTomorrow at 8am: Call your GP for a same-day appointment.\n\nIf anything changes tonight (difficult to wake, rash that does not fade, trouble breathing), go straight to A&E.\n\nI found your nearest out-of-hours service:\nManchester Urgent Care Centre\nOpen until midnight, reopens 7am\n\nYou are doing a great job looking after her.",
        action: "Out-of-hours service found",
        urgency: "urgent",
      },
    ],
  },
  {
    id: "referral",
    label: "Hospital letter confusion",
    emoji: "📄",
    icon: "file",
    desc: "Medical jargon you do not understand",
    cta: "Watch Laura explain clearly",
    conversation: [
      {
        from: "user",
        text: "I received a hospital referral for a cardiology appointment. It mentions an echocardiogram. What does that mean?",
      },
      {
        from: "laura",
        text: "An echocardiogram is an ultrasound scan of your heart. It is painless and non-invasive. A technician places a small device on your chest that uses sound waves to create images. It usually takes 15 to 30 minutes.\n\nNo needles. You stay awake. You can usually go home straight after.\n\nDo you have the appointment date and hospital?",
      },
      {
        from: "user",
        text: "Royal Infirmary, 15 April, Outpatient Cardiology.",
      },
      {
        from: "laura",
        text: "Here is everything you need:\n\nBring: your referral letter, medication list, NHS number, and photo ID.\n\nWear: something easy to remove from the waist up.\n\nWhen you arrive: follow signs to Outpatient Cardiology and check in at reception.\n\nResults are usually sent to your referring doctor within 1 to 2 weeks.\n\nWould you like me to send you a reminder the day before?",
        action: "Appointment guide prepared",
      },
    ],
  },
  {
    id: "language",
    label: "Language barrier",
    emoji: "🌍",
    icon: "globe",
    desc: "You cannot explain your symptoms in English",
    cta: "Watch Laura speak French",
    conversation: [
      {
        from: "user",
        text: "Bonjour, j'ai besoin d'un medecin mais je ne parle pas bien anglais. J'ai tres mal au ventre.",
      },
      {
        from: "laura",
        text: "Bonjour. Je vais vous aider en francais.\n\nDepuis combien de temps avez-vous mal au ventre ? La douleur est-elle constante ? Avez-vous de la fievre ou des nausees ?",
        urgency: "soon",
      },
      {
        from: "user",
        text: "Ca fait 3 jours. Pas de fievre mais un peu de nausees.",
      },
      {
        from: "laura",
        text: `Merci. Je vais chercher un cabinet medical pres de chez vous.\n\nJ'ai trouve : Waterloo Health Centre (0.2 miles) - sans rendez-vous le matin.\n\nVoici une note en anglais pour l'accueil :\n\n"This patient has had intermittent abdominal pain with mild nausea for 3 days. No fever. They speak French and would benefit from an interpreter."\n\nVoulez-vous que je demande un rappel ?`,
        action: "Bilingual note prepared",
      },
    ],
  },
  {
    id: "callback",
    label: "Stuck in callback hell",
    emoji: "📞",
    icon: "phone",
    desc: "Three weeks of being told to try again tomorrow",
    cta: "Watch Laura find alternatives",
    conversation: [
      {
        from: "user",
        text: "I have been trying to get an appointment for 3 weeks. Every time I call they say no slots. My knee is getting worse and I cannot keep taking time off work.",
      },
      {
        from: "laura",
        text: "Three weeks is unacceptable. Let me help you break out of this cycle.\n\nIs your knee swollen or red? Can you put weight on it? Did this start after an injury?",
        urgency: "soon",
      },
      {
        from: "user",
        text: "A bit swollen. I can walk but it hurts on stairs. No injury, it just got worse over a month.",
      },
      {
        from: "laura",
        text: "Here are three ways past the phone queue:\n\n1. Online booking: many practices release same-day slots at midnight through their portal.\n\n2. Walk-in clinic: City Walk-In Centre (0.6 miles), open 8am to 8pm, no appointment needed.\n\n3. Structured request: I can submit a callback request to your GP flagging 3 weeks of failed attempts and worsening symptoms.\n\nWhich works best for you?",
        action: "3 alternative access routes identified",
      },
      {
        from: "user",
        text: "Submit the callback request please.",
      },
      {
        from: "laura",
        text: `Done. I submitted:\n\n"Patient has attempted to book for 3 weeks without success. Gradually worsening knee pain with visible swelling for 1 month. Requesting same-day or next-day appointment."\n\nIf you do not hear back within 24 hours, go to the walk-in centre. You should not wait any longer.\n\nI will check in with you tomorrow.`,
        action: "Callback request submitted",
      },
    ],
  },
];

function ScenarioIcon({ type }: { type: Scenario["icon"] }) {
  const props = { size: 18, strokeWidth: 2.2, color: c.accent };

  if (type === "pill") return <Pill {...props} />;
  if (type === "pin") return <MapPin {...props} />;
  if (type === "clock") return <Clock {...props} />;
  if (type === "file") return <FileText {...props} />;
  if (type === "globe") return <Globe {...props} />;
  return <Phone {...props} />;
}

export default function DemoPage() {
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);
  const [visibleMsgs, setVisibleMsgs] = useState(0);
  const [typing, setTyping] = useState(false);
  const [freeInput, setFreeInput] = useState("");
  const [freeMessages, setFreeMessages] = useState<Msg[]>([
    {
      from: "laura",
      text: "Hello. I am Laura. Tell me what you are dealing with and I will help you figure out the next step.",
    },
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
        }, 850 + Math.random() * 1000);
      }, 550);
    } else {
      setVisibleMsgs(idx + 1);
      setTimeout(() => advanceScenario(s, idx + 1), 1200);
    }
  }

  function getResponse(input: string): Msg {
    const l = input.toLowerCase();

    if (l.match(/chest|breathe|unconscious|stroke|seizure/)) {
      return {
        from: "laura",
        text: "This sounds like it could be a medical emergency. Please call 999 (UK) or 911 (US) immediately.",
        urgency: "emergency",
      };
    }

    if (l.match(/prescription|refill|medication|medicine|inhaler/)) {
      return {
        from: "laura",
        text: "I can help with that. Let me find your practice and check if they accept online refill requests. What medication do you need?",
        urgency: "routine",
      };
    }

    if (l.match(/move|new|register|no\s*gp|no\s*doctor/)) {
      return {
        from: "laura",
        text: "I can find GP practices near you that accept new patients. What is your postcode?",
        urgency: "routine",
      };
    }

    if (l.match(/referral|hospital|letter|scan|mri/)) {
      return {
        from: "laura",
        text: "I can help you understand referral letters. Could you tell me what the referral is for?",
        urgency: "routine",
      };
    }

    if (l.match(/callback|call\s*back|no\s*slots|waiting|weeks|busy/)) {
      return {
        from: "laura",
        text: "Being stuck in callback hell is exhausting. I can find alternative routes: walk-in clinics, online portals, or a structured request. What have you been trying to get seen for?",
        urgency: "soon",
      };
    }

    if (l.match(/fever|child|baby|kid|son|daughter/)) {
      return {
        from: "laura",
        text: "I understand the worry. Can you tell me their age, temperature, and how long it has been going on?",
        urgency: "urgent",
      };
    }

    if (l.match(/anxious|depressed|mental|stressed|panic/)) {
      return {
        from: "laura",
        text: "Thank you for sharing that. What you are feeling matters. I can help you find a GP appointment. Many practices now offer same-day mental health consultations.",
        urgency: "soon",
      };
    }

    if (l.match(/hello|hi|hey|morning/)) {
      return {
        from: "laura",
        text: "Hello. I am here to help. Tell me about any health concern, or I can find a doctor near you, help with prescriptions, or explain a hospital letter.",
      };
    }

    return {
      from: "laura",
      text: "Could you tell me more about what you are experiencing? I can help with symptoms, finding a doctor, prescriptions, hospital referrals, or navigating the system.",
    };
  }

  function sendFree(text: string) {
    if (!text.trim()) return;

    setFreeMessages((prev) => [...prev, { from: "user", text: text.trim() }]);
    setFreeInput("");
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      setFreeMessages((prev) => [...prev, getResponse(text)]);
    }, 850 + Math.random() * 1000);
  }

  function resetAll() {
    setActiveScenario(null);
    setVisibleMsgs(0);
    setMode("scenarios");
    setFreeMessages([
      {
        from: "laura",
        text: "Hello. I am Laura. Tell me what you are dealing with and I will help you figure out the next step.",
      },
    ]);
    setFreeInput("");
    setTyping(false);
  }

  const currentMsgs =
    mode === "scenarios" && activeScenario
      ? activeScenario.conversation.slice(0, visibleMsgs)
      : freeMessages;

  return (
    <>
      <style>{FONT}</style>
      <style>{CSS}</style>

      <div className="dW">
        <nav className="dN">
          <div className="container dNI">
            <Link href="/" className="dBr">
              <div className="dLo">
                <Image
                  src="/omela-logo-mark.png"
                  alt="Omela"
                  width={32}
                  height={32}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>

              <div>
                <div className="dBrN">Omela</div>
                <div className="dBrS">Try Laura</div>
              </div>
            </Link>

            <div className="dNR">
              <button onClick={resetAll} className="dRst" type="button">
                <RotateCcw size={13} />
                <span className="dRstTxt">Reset</span>
              </button>

              <Link href="/#waitlist" className="btnP dNC">
                Get early access
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </nav>

        <section className="dPv">
          <div className="container dPvIn">
            <motion.div
              className="dPvOrb"
              animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="dPvEyebrow">Preview experience</span>
            <p className="dPvText">
              Explore how Laura could guide common care-access situations. The
              live product experience is still on the way.
            </p>
          </div>
        </section>

        <main className="dM">
          <div className="dIn">
            {!activeScenario && mode === "scenarios" && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                className="dSc"
              >
                <div className="dHe">
                  <div className="dEy">
                    <Sparkles size={14} />
                    <span>Simulation walkthrough</span>
                  </div>

                  <h1 className="serif dHeT">
                    See how Laura could help in real moments of care friction.
                  </h1>

                  <p className="dHeB">
                    These scenario previews show how Laura could reduce
                    confusion, cut through admin, and help people reach care
                    with more clarity and less stress.
                  </p>

                  <div className="dSwitch">
                    <button
                      type="button"
                      className="dSw dSwA"
                      onClick={() => {
                        setActiveScenario(null);
                        setMode("scenarios");
                      }}
                    >
                      Scenario walkthroughs
                    </button>
                    <button
                      type="button"
                      className="dSw"
                      onClick={() => {
                        setActiveScenario(null);
                        setMode("free");
                      }}
                    >
                      Type your own question
                    </button>
                  </div>
                </div>

                <div className="dScG">
                  {scenarios.map((s) => (
                    <button
                      key={s.id}
                      className="dScC"
                      onClick={() => startScenario(s)}
                      type="button"
                    >
                      <div className="dScTop">
                        <div className="dScI">
                          <ScenarioIcon type={s.icon} />
                        </div>
                        <span className="dScEmoji">{s.emoji}</span>
                      </div>

                      <div className="dScCT">
                        <span className="dScL">{s.label}</span>
                        <span className="dScD">{s.desc}</span>
                      </div>

                      <span className="dScCta">
                        {s.cta}
                        <ArrowRight size={13} />
                      </span>
                    </button>
                  ))}
                </div>

                <div className="dHeFt">
                  <p className="dHeFtT">
                    Want to try your own prompt instead of a preset scenario?
                  </p>
                  <button
                    className="btnS"
                    type="button"
                    onClick={() => setMode("free")}
                  >
                    Open free demo
                  </button>
                </div>
              </motion.div>
            )}

            {mode === "free" && !activeScenario && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                className="dFreeIntro"
              >
                <div className="dEy">
                  <Sparkles size={14} />
                  <span>Free demo</span>
                </div>

                <h1 className="serif dHeT">Ask Laura your own question.</h1>

                <p className="dHeB">
                  Try a symptom, a referral question, a prescription issue, or
                  a care-access problem. This is still a guided preview, not the
                  final live product.
                </p>
              </motion.div>
            )}

            {(activeScenario || mode === "free") && (
              <div className="dCh">
                <div className="dChTop">
                  <div className="dChTopL">
                    <div className="dChLogo">
                      <Image
                        src="/laura-avatar.png"
                        alt="Laura"
                        fill
                        sizes="40px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div>
                      <div className="dChName">
                        Laura
                        <span className="dChLive">
                          <span className="dChLiveDot" />
                          Preview
                        </span>
                      </div>
                      <div className="dChMeta">
                        {activeScenario
                          ? activeScenario.label
                          : "General care-access assistant"}
                      </div>
                    </div>
                  </div>

                  <div className="dChTopR">
                    <button
                      type="button"
                      className="dTopGhost"
                      onClick={() => {
                        setActiveScenario(null);
                        setMode("scenarios");
                      }}
                    >
                      All scenarios
                    </button>
                  </div>
                </div>

                <div className="dMs">
                  <AnimatePresence initial={false}>
                    {currentMsgs.map((msg, i) => (
                      <motion.div
                        key={`${msg.from}-${i}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`dMg ${msg.from === "user" ? "dMgR" : "dMgL"}`}
                      >
                        {msg.from === "laura" && (
                          <div className="dMgAv">
                            <Image
                              src="/laura-avatar.png"
                              alt="Laura"
                              fill
                              sizes="34px"
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                        )}

                        <div className={`dMgC ${msg.from === "user" ? "dMgU" : "dMgLa"}`}>
                          <p className="dMgT" style={{ whiteSpace: "pre-line" }}>
                            {msg.text}
                          </p>

                          {msg.urgency && (
                            <div
                              className="dUr"
                              style={{
                                background: urgencyColors[msg.urgency].bg,
                                color: urgencyColors[msg.urgency].text,
                              }}
                            >
                              <span
                                className="dUrD"
                                style={{
                                  background: urgencyColors[msg.urgency].text,
                                }}
                              />
                              {urgencyColors[msg.urgency].label}
                            </div>
                          )}

                          {msg.action && <div className="dAc">{msg.action}</div>}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {typing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="dMg dMgL"
                    >
                      <div className="dMgAv">
                        <Image
                          src="/laura-avatar.png"
                          alt="Laura"
                          fill
                          sizes="34px"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div className="dMgLa dTy">
                        <span />
                        <span />
                        <span />
                      </div>
                    </motion.div>
                  )}

                  <div ref={bottomRef} />
                </div>

                {mode === "scenarios" &&
                  activeScenario &&
                  visibleMsgs >= activeScenario.conversation.length &&
                  !typing && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="dEn"
                    >
                      <p className="dEnT">End of walkthrough.</p>
                      <p className="dEnBdy">
                        The full product would continue from here with live data,
                        real conversation, and next-step actions.
                      </p>
                      <div className="dEnBtns">
                        <button className="btnP" onClick={resetAll} type="button">
                          Try another scenario
                        </button>
                        <button
                          className="btnS"
                          type="button"
                          onClick={() => {
                            setActiveScenario(null);
                            setMode("free");
                          }}
                        >
                          Type my own question
                        </button>
                      </div>
                    </motion.div>
                  )}

                {mode === "free" && (
                  <div className="dIp">
                    <input
                      type="text"
                      placeholder="Tell Laura what you need help with..."
                      value={freeInput}
                      onChange={(e) => setFreeInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !typing) sendFree(freeInput);
                      }}
                      disabled={typing}
                      className="dIpF"
                    />
                    <button
                      onClick={() => sendFree(freeInput)}
                      disabled={typing || !freeInput.trim()}
                      className="dSd"
                      type="button"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

const CSS = `
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%;max-width:100%;overflow:hidden}
body{background:${c.bg};color:${c.text};font-family:'DM Sans',-apple-system,sans-serif;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
button,input{font-family:inherit}
.serif{font-family:'Instrument Serif',Georgia,serif}
.container{max-width:1280px;margin:0 auto;padding:0 18px}

.btnP{display:inline-flex;align-items:center;justify-content:center;gap:7px;background:${c.dark};color:#fff;border:none;border-radius:999px;padding:12px 20px;font-size:14px;font-weight:700;cursor:pointer;white-space:nowrap;transition:transform .22s ease,box-shadow .22s ease,background .22s ease}
.btnP:hover{transform:translateY(-1px);box-shadow:0 12px 28px rgba(0,0,0,.14)}
.btnS{display:inline-flex;align-items:center;justify-content:center;gap:7px;background:rgba(255,255,255,.82);color:${c.text};border:1px solid ${c.border};border-radius:999px;padding:12px 20px;font-size:14px;font-weight:700;cursor:pointer;white-space:nowrap}

.dW{display:flex;flex-direction:column;height:100vh;height:100dvh;background:
radial-gradient(circle at top right, rgba(37,99,235,.04), transparent 28%),
${c.bg}}
.dN{background:rgba(248,246,241,.92);backdrop-filter:blur(16px);border-bottom:1px solid ${c.border};flex-shrink:0}
.dNI{display:flex;align-items:center;justify-content:space-between;height:68px;gap:8px}
.dBr{display:flex;align-items:center;gap:10px;min-width:0}
.dLo{width:32px;height:32px;border-radius:10px;overflow:hidden;flex-shrink:0;box-shadow:0 2px 10px rgba(0,0,0,.08)}
.dBrN{font-size:14px;font-weight:800;letter-spacing:-.02em}
.dBrS{font-size:11px;font-weight:700;color:${c.accent}}
.dNR{display:flex;align-items:center;gap:8px}
.dRst{display:inline-flex;align-items:center;gap:5px;background:rgba(255,255,255,.78);border:1px solid ${c.border};border-radius:999px;padding:9px 15px;font-size:12px;font-weight:600;color:${c.sub};cursor:pointer}
.dNC{padding:10px 18px!important;font-size:13px!important}
.dRstTxt{display:none}

.dPv{padding:14px 0 10px;flex-shrink:0}
.dPvIn{max-width:980px;margin:0 auto;padding:0 18px}
.dPvIn{position:relative;display:flex;flex-direction:column;align-items:center;gap:10px;text-align:center;background:linear-gradient(180deg, rgba(236,242,255,.95), rgba(255,255,255,.8));border:1px solid rgba(37,99,235,.10);border-radius:26px;padding:22px 18px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.04)}
.dPvIn:before{content:"";position:absolute;inset:auto -10% -40% auto;width:180px;height:180px;border-radius:999px;background:radial-gradient(circle, rgba(37,99,235,.12), transparent 70%)}
.dPvOrb{width:10px;height:10px;border-radius:999px;background:${c.accent};box-shadow:0 0 0 10px rgba(37,99,235,.08)}
.dPvEyebrow{display:inline-flex;align-items:center;justify-content:center;padding:8px 14px;border-radius:999px;background:rgba(255,255,255,.78);border:1px solid rgba(37,99,235,.10);font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:${c.accent}}
.dPvText{max-width:760px;font-size:clamp(17px,2.8vw,23px);line-height:1.45;letter-spacing:-.025em;color:${c.sub}}
.dPvText b{color:${c.text}}

.dM{flex:1;display:flex;flex-direction:column;overflow:hidden}
.dIn{max-width:1180px;width:100%;margin:0 auto;display:flex;flex-direction:column;height:100%;padding:0 18px 18px}

.dSc,.dFreeIntro{padding:20px 0 24px;overflow-y:auto;flex:1}
.dHe{max-width:860px}
.dEy{display:inline-flex;align-items:center;gap:8px;padding:8px 12px;border-radius:999px;background:rgba(255,255,255,.84);border:1px solid ${c.border};font-size:12px;font-weight:800;color:${c.sub}}
.dHeT{margin-top:18px;font-size:clamp(36px,7vw,72px);line-height:.96;letter-spacing:-.055em;max-width:900px}
.dHeB{margin-top:14px;max-width:760px;font-size:clamp(15px,2.5vw,18px);line-height:1.8;color:${c.sub}}
.dSwitch{display:flex;gap:8px;flex-wrap:wrap;margin-top:22px}
.dSw{display:inline-flex;align-items:center;justify-content:center;height:44px;padding:0 18px;border-radius:999px;border:1px solid ${c.border};background:rgba(255,255,255,.78);font-size:13px;font-weight:700;color:${c.sub};cursor:pointer}
.dSwA{background:${c.dark};color:#fff;border-color:${c.dark}}

.dScG{display:grid;grid-template-columns:1fr;gap:12px;margin-top:26px}
.dScC{display:flex;flex-direction:column;justify-content:space-between;gap:18px;min-height:220px;padding:22px;background:${c.card};border:1px solid ${c.border};border-radius:24px;cursor:pointer;text-align:left;transition:transform .22s ease,border-color .22s ease,box-shadow .22s ease}
.dScC:hover{transform:translateY(-3px);border-color:#D4CEBF;box-shadow:0 18px 40px rgba(0,0,0,.05)}
.dScTop{display:flex;align-items:center;justify-content:space-between;gap:10px}
.dScI{width:42px;height:42px;border-radius:14px;display:flex;align-items:center;justify-content:center;background:${c.accentSoft};border:1px solid rgba(37,99,235,.08)}
.dScEmoji{font-size:23px;line-height:1}
.dScCT{display:flex;flex-direction:column;gap:6px}
.dScL{font-size:18px;font-weight:800;letter-spacing:-.03em;color:${c.text}}
.dScD{font-size:14px;line-height:1.7;color:${c.sub}}
.dScCta{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:800;color:${c.accent}}
.dHeFt{margin-top:18px;padding:18px 20px;border-radius:20px;background:rgba(255,255,255,.72);border:1px solid ${c.border};display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
.dHeFtT{font-size:14px;color:${c.sub};line-height:1.6}

.dCh{flex:1;display:flex;flex-direction:column;overflow:hidden;min-height:0}
.dChTop{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 0 14px;flex-shrink:0}
.dChTopL{display:flex;align-items:center;gap:12px;min-width:0}
.dChLogo{position:relative;width:40px;height:40px;border-radius:999px;overflow:hidden;flex-shrink:0;border:1.5px solid #fff;box-shadow:0 2px 10px rgba(0,0,0,.08)}
.dChName{display:flex;align-items:center;gap:8px;font-size:18px;font-weight:800;letter-spacing:-.02em}
.dChLive{display:inline-flex;align-items:center;gap:5px;padding:5px 10px;border-radius:999px;background:${c.greenSoft};color:${c.greenDk};font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.06em}
.dChLiveDot{width:6px;height:6px;border-radius:999px;background:${c.green}}
.dChMeta{margin-top:4px;font-size:13px;color:${c.muted}}
.dTopGhost{display:inline-flex;align-items:center;justify-content:center;height:40px;padding:0 14px;border-radius:999px;border:1px solid ${c.border};background:rgba(255,255,255,.78);font-size:12px;font-weight:700;color:${c.sub};cursor:pointer}

.dMs{flex:1;min-height:0;overflow-y:auto;display:flex;flex-direction:column;gap:18px;padding:8px 0 18px;scrollbar-width:thin;scrollbar-color:${c.border} transparent}
.dMs::-webkit-scrollbar{width:5px}
.dMs::-webkit-scrollbar-thumb{background:${c.border};border-radius:999px}

.dMg{display:flex;gap:10px;align-items:flex-start}
.dMgR{flex-direction:row-reverse}
.dMgL{flex-direction:row}
.dMgAv{position:relative;width:34px;height:34px;border-radius:999px;overflow:hidden;flex-shrink:0;border:1.5px solid #fff;box-shadow:0 2px 10px rgba(0,0,0,.08)}
.dMgC{max-width:84%;padding:16px 18px;border-radius:22px}
.dMgU{background:${c.dark};color:#fff;border-radius:22px 22px 8px 22px;box-shadow:0 6px 18px rgba(8,9,12,.12)}
.dMgLa{background:${c.card};border:1px solid ${c.border};border-radius:22px 22px 22px 8px;box-shadow:0 4px 16px rgba(0,0,0,.035)}
.dMgT{font-size:15px;line-height:1.78}

.dUr{display:inline-flex;align-items:center;gap:6px;margin-top:11px;padding:6px 12px;border-radius:999px;font-size:12px;font-weight:800}
.dUrD{width:6px;height:6px;border-radius:999px;flex-shrink:0}
.dAc{margin-top:12px;padding:11px 14px;border-radius:14px;background:${c.accentSoft};color:${c.accent};font-size:12px;font-weight:800;border:1px solid rgba(37,99,235,.10)}

.dTy{display:flex;gap:4px;padding:16px 20px}
.dTy span{width:7px;height:7px;border-radius:999px;background:${c.muted};animation:tD 1.2s infinite}
.dTy span:nth-child(2){animation-delay:.2s}
.dTy span:nth-child(3){animation-delay:.4s}
@keyframes tD{0%,80%{opacity:.28;transform:scale(.82)}40%{opacity:1;transform:scale(1)}}

.dEn{padding:16px 0 18px;flex-shrink:0;border-top:1px solid ${c.border}}
.dEnT{font-size:14px;font-weight:800;color:${c.text}}
.dEnBdy{margin-top:6px;font-size:14px;line-height:1.65;color:${c.sub};max-width:640px}
.dEnBtns{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}

.dIp{display:flex;gap:8px;padding:14px 0 18px;flex-shrink:0;border-top:1px solid ${c.border}}
.dIpF{flex:1;height:54px;border-radius:18px;border:1px solid ${c.border};background:#fff;padding:0 18px;font-size:15px;color:${c.text};outline:none}
.dIpF:focus{border-color:${c.accent};box-shadow:0 0 0 3px rgba(37,99,235,.06)}
.dIpF:disabled{opacity:.5}
.dSd{width:54px;height:54px;border-radius:18px;background:${c.accent};color:#fff;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.dSd:disabled{opacity:.35;cursor:not-allowed}

@media(min-width:640px){
  .container{padding:0 26px}
  .dPvIn{padding:26px 28px}
  .dRstTxt{display:inline}
  .dHeT{font-size:clamp(44px,7vw,78px)}
  .dScG{grid-template-columns:repeat(2,1fr)}
  .dMgC{max-width:72%}
}

@media(min-width:980px){
  .dNI{height:74px}
  .dIn{padding:0 26px 20px}
  .dScG{grid-template-columns:repeat(3,1fr)}
  .dMgC{max-width:64%}
}
`;