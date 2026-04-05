"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  FileText,
  Globe2,
  MapPinned,
  RotateCcw,
  Send,
  ShieldAlert,
  Sparkles,
  Stethoscope,
} from "lucide-react";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');`;

const c = {
  bg: "#F8F6F1",
  surface: "#FFFFFF",
  dark: "#0A0B0F",
  text: "#121317",
  sub: "#4D5360",
  muted: "#858C9B",
  accent: "#2563EB",
  accentSoft: "#ECF2FF",
  warm: "#C9956B",
  warmSoft: "#FFF5EC",
  green: "#22C55E",
  greenSoft: "#ECFDF3",
  greenText: "#166534",
  border: "#E4DDD2",
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
  icon: ReactNode;
  conversation: Msg[];
};

const urgencyMap: Record<
  NonNullable<Msg["urgency"]>,
  { bg: string; text: string; label: string }
> = {
  routine: { bg: c.greenSoft, text: c.greenText, label: "Routine" },
  soon: { bg: "#FFF8E8", text: "#9A6700", label: "Book soon" },
  urgent: { bg: "#FFF4E8", text: "#C2410C", label: "Needs attention" },
  emergency: { bg: "#FEF2F2", text: "#991B1B", label: "Emergency" },
};

const scenarios: Scenario[] = [
  {
    id: "rx",
    label: "Repeat prescription",
    emoji: "💊",
    desc: "You need medication and the usual route is slow and frustrating.",
    icon: <FileText size={16} />,
    conversation: [
      {
        from: "user",
        text: "I need to refill my blood pressure medication but I have been trying to contact my GP for two days. The line is always busy.",
      },
      {
        from: "laura",
        text: "I can help you prepare this more clearly. Which medication do you need, and roughly how many days of supply do you have left?",
        urgency: "routine",
      },
      {
        from: "user",
        text: "Amlodipine 5mg. I take it every morning. I have about three days left.",
      },
      {
        from: "laura",
        text: "Thank you. I have captured Amlodipine 5mg, once daily, with about three days remaining.",
      },
      {
        from: "laura",
        text: "In this preview, I would now help you identify the most relevant contact route and prepare the request for review.",
        action: "Prepared refill request draft ready for review",
      },
      {
        from: "laura",
        text: "Here is the draft request:\n\n“I would like to request a repeat prescription for Amlodipine 5mg, taken once daily. I currently have approximately three days of supply remaining. Thank you.”\n\nYou can review this before sharing it through the available channel.",
      },
      {
        from: "user",
        text: "Yes, that is exactly what I needed.",
      },
      {
        from: "laura",
        text: "I can also help you set a reminder before the next refill cycle, so this becomes less of a monthly chase.",
        action: "Refill reminder prepared for next cycle",
      },
    ],
  },
  {
    id: "gp",
    label: "New city, no doctor",
    emoji: "📍",
    desc: "You have moved and do not know where to start with registration.",
    icon: <MapPinned size={16} />,
    conversation: [
      {
        from: "user",
        text: "I just moved to Manchester and I do not have a GP yet. I need my asthma inhaler and I do not really know how registration works here.",
      },
      {
        from: "laura",
        text: "I can help you navigate that. The first step is finding relevant nearby practices and understanding what registration usually requires. What area or postcode are you in?",
      },
      {
        from: "user",
        text: "I am near M1, close to Piccadilly.",
      },
      {
        from: "laura",
        text: "In this preview, I would now narrow relevant nearby options and help you prepare the next contact step.",
        action: "Nearby registration options prepared for review",
      },
      {
        from: "laura",
        text: "I can also help you prepare a cleaner registration request, explain typical documents people are asked for, and help you keep track of what to do next.",
      },
      {
        from: "user",
        text: "That would make this much easier.",
      },
      {
        from: "laura",
        text: "Good. The goal is to replace guesswork with a clearer route and a clearer request.",
        action: "Registration note prepared for review",
      },
    ],
  },
  {
    id: "child",
    label: "Worried about your child",
    emoji: "🌙",
    desc: "It is late, your child is unwell, and you feel overwhelmed.",
    icon: <ShieldAlert size={16} />,
    conversation: [
      {
        from: "user",
        text: "My three year old has had a temperature for two days and seems very tired. It is late and I do not know what I am supposed to do next.",
      },
      {
        from: "laura",
        text: "I can help you organise the situation calmly. Is your child responsive when spoken to, taking any fluids, and showing any new symptoms like a rash or breathing difficulty?",
        urgency: "urgent",
      },
      {
        from: "user",
        text: "She is responsive. She had some water recently. I have not noticed a rash.",
      },
      {
        from: "laura",
        text: "Thank you. In a case like this, I would help organise the key details, point you toward the right next contact option, and highlight warning signs that should not be ignored.",
      },
      {
        from: "laura",
        text: "For example, I can prepare a short summary for an urgent care call or appointment and help you keep track of what changes overnight.",
        action: "Urgent care summary prepared for review",
      },
      {
        from: "laura",
        text: "If your child becomes difficult to wake, develops breathing difficulty, or you become seriously concerned, contact emergency services or urgent care immediately.",
        urgency: "emergency",
      },
    ],
  },
  {
    id: "letter",
    label: "Hospital letter confusion",
    emoji: "📋",
    desc: "You received a referral or appointment letter full of unfamiliar language.",
    icon: <Stethoscope size={16} />,
    conversation: [
      {
        from: "user",
        text: "I received a hospital letter about a cardiology referral and an echocardiogram. I do not really understand what it means.",
      },
      {
        from: "laura",
        text: "I can help explain the letter in plain language and prepare you for the next step.",
      },
      {
        from: "user",
        text: "It mentions an appointment in Outpatient Cardiology next month.",
      },
      {
        from: "laura",
        text: "In this preview, I would now turn the letter into a simple summary, explain what the appointment is about, and help you prepare what to bring and ask.",
        action: "Appointment guide prepared from letter",
      },
      {
        from: "laura",
        text: "That way, the letter becomes something you understand and can act on, rather than something stressful you keep rereading.",
      },
    ],
  },
  {
    id: "lang",
    label: "Language barrier",
    emoji: "🌍",
    desc: "You need care but explaining yourself in English feels hard under pressure.",
    icon: <Globe2 size={16} />,
    conversation: [
      {
        from: "user",
        text: "Bonjour, j'ai besoin d'un medecin mais je ne parle pas bien anglais. J'ai tres mal au ventre depuis trois jours.",
      },
      {
        from: "laura",
        text: "Bonjour. Je peux vous aider en francais.\n\nPouvez-vous me dire si vous avez de la fievre, des nausees, ou d'autres symptomes?",
        urgency: "soon",
      },
      {
        from: "user",
        text: "Un peu de nausees. Pas de fievre. La douleur va et vient.",
      },
      {
        from: "laura",
        text: "Merci. Dans ce type de situation, je peux preparer une note structuree en deux langues, afin que vous puissiez expliquer plus clairement votre situation.",
        action: "Structured bilingual note prepared for review",
      },
      {
        from: "laura",
        text: "That note can then help reduce pressure at the front desk or during the first conversation.",
      },
    ],
  },
  {
    id: "stuck",
    label: "Stuck in callback hell",
    emoji: "😤",
    desc: "You have been trying for weeks and still cannot get through the system.",
    icon: <Sparkles size={16} />,
    conversation: [
      {
        from: "user",
        text: "I have been trying to get a GP appointment for three weeks. Every morning I am told to try again tomorrow and my knee is getting worse.",
      },
      {
        from: "laura",
        text: "That kind of access loop is exhausting. I can help organise what has happened, capture the worsening issue clearly, and prepare a stronger next request.",
        urgency: "soon",
      },
      {
        from: "user",
        text: "It is swollen and stairs are painful. It has just been getting worse over time.",
      },
      {
        from: "laura",
        text: "Thank you. In this preview, I would now prepare a structured summary of the issue, the time already spent trying to get seen, and the next available routes to pursue.",
        action: "Structured callback request prepared for review",
      },
      {
        from: "laura",
        text: "The aim is to make the request harder to dismiss and reduce the emotional cost of repeating the same story every day.",
      },
    ],
  },
];

const freeIntro: Msg = {
  from: "laura",
  text:
    "Hello. I am Laura by Omela. I help people navigate the messy part of healthcare access.\n\nYou can describe what is going on, and I will help with the next administrative step, such as finding a practice, preparing a request, explaining a letter, or creating a clearer note to share.",
};

export default function DemoPage() {
  const [mode, setMode] = useState<"pick" | "scenario" | "free">("pick");
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const [freeInput, setFreeInput] = useState("");
  const [freeMessages, setFreeMessages] = useState<Msg[]>([freeIntro]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<number[]>([]);

  const messages =
    mode === "scenario" && currentScenario
      ? currentScenario.conversation.slice(0, visibleCount)
      : freeMessages;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    return () => clearTimers();
  }, []);

  function clearTimers() {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }

  function schedule(fn: () => void, delay: number) {
    const id = window.setTimeout(fn, delay);
    timersRef.current.push(id);
  }

  function startScenario(scenario: Scenario) {
    clearTimers();
    setMode("scenario");
    setCurrentScenario(scenario);
    setVisibleCount(0);
    setTyping(false);

    playScenario(scenario, 0);
  }

  function playScenario(scenario: Scenario, index: number) {
    if (index >= scenario.conversation.length) return;

    const current = scenario.conversation[index];

    if (current.from === "user") {
      setVisibleCount(index + 1);

      const next = scenario.conversation[index + 1];
      if (!next) return;

      schedule(() => {
        setTyping(true);

        schedule(() => {
          setTyping(false);
          setVisibleCount(index + 2);

          schedule(() => {
            playScenario(scenario, index + 2);
          }, 900);
        }, 650 + Math.random() * 350);
      }, 520);

      return;
    }

    setTyping(true);

    schedule(() => {
      setTyping(false);
      setVisibleCount(index + 1);

      schedule(() => {
        playScenario(scenario, index + 1);
      }, 850);
    }, 650 + Math.random() * 350);
  }

  function getFreeResponse(input: string): Msg {
    const text = input.toLowerCase();

    if (/(chest pain|cannot breathe|can't breathe|unconscious|stroke|seizure)/.test(text)) {
      return {
        from: "laura",
        text:
          "Some symptoms can need urgent emergency attention. Please contact emergency services or urgent care now rather than relying on this preview.",
        urgency: "emergency",
      };
    }

    if (/(prescription|refill|medication|medicine|inhaler)/.test(text)) {
      return {
        from: "laura",
        text:
          "I can help with that. Tell me which medication you need, how much you have left, and whether you already know your usual practice or pharmacy.",
        urgency: "routine",
      };
    }

    if (/(move|moved|new city|register|no gp|no doctor)/.test(text)) {
      return {
        from: "laura",
        text:
          "I can help you narrow relevant nearby practices and prepare the registration step. What area or postcode are you in?",
      };
    }

    if (/(referral|hospital letter|appointment letter|scan|echocardiogram|mri)/.test(text)) {
      return {
        from: "laura",
        text:
          "I can help explain letters in plain language and prepare you for the next step. What does the letter say or what type of appointment is mentioned?",
      };
    }

    if (/(child|baby|fever|worried|daughter|son)/.test(text)) {
      return {
        from: "laura",
        text:
          "I can help organise the situation calmly. Tell me the age, what has changed, and whether they are responsive, taking fluids, or showing any new symptoms.",
        urgency: "urgent",
      };
    }

    if (/(language|translate|english|french|arabic|yoruba|hindi)/.test(text)) {
      return {
        from: "laura",
        text:
          "I can help prepare a clearer note in the right language so the next conversation is easier. Tell me what you want to explain and which language you prefer.",
      };
    }

    if (/(callback|no slots|waiting|weeks|busy line|can't get through|cannot get through)/.test(text)) {
      return {
        from: "laura",
        text:
          "That kind of loop is exhausting. I can help organise what has happened and prepare a stronger next request. What have you been trying to get seen for?",
        urgency: "soon",
      };
    }

    if (/(hello|hi|hey|good morning|good afternoon)/.test(text)) {
      return {
        from: "laura",
        text:
          "Hello. Tell me what is getting in the way, and I will help with the next care-navigation step.",
      };
    }

    return {
      from: "laura",
      text:
        "Tell me a bit more about what you are dealing with. I can help with finding relevant practices, preparing requests, explaining letters, or creating a clearer note to share.",
    };
  }

  function sendFreeMessage(value: string) {
    const trimmed = value.trim();
    if (!trimmed || typing) return;

    setFreeMessages((prev) => [...prev, { from: "user", text: trimmed }]);
    setFreeInput("");
    setTyping(true);

    schedule(() => {
      setTyping(false);
      setFreeMessages((prev) => [...prev, getFreeResponse(trimmed)]);
    }, 650 + Math.random() * 350);
  }

  function resetDemo() {
    clearTimers();
    setMode("pick");
    setCurrentScenario(null);
    setVisibleCount(0);
    setTyping(false);
    setFreeInput("");
    setFreeMessages([freeIntro]);
  }

  return (
    <>
      <style>{FONT}</style>
      <style>{CSS}</style>

      <div className="page">
        <nav className="nav">
          <div className="container navInner">
            <Link href="/" className="brand">
              <div className="brandMark">
                <Image
                  src="/omela-logo-mark.png"
                  alt="Omela"
                  width={28}
                  height={28}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>

              <div>
                <div className="brandName">Omela</div>
                <div className="brandSub">LAURA DEMO</div>
              </div>
            </Link>

            <div className="navRight">
              <button type="button" className="resetButton" onClick={resetDemo}>
                <RotateCcw size={12} />
                Reset
              </button>

              <Link href="/#waitlist" className="joinButton">
                Join waitlist
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </nav>

        <div className="banner">
          Simulated preview. Example routes, practices, and outputs shown here are for
          demonstration only. Laura is a care navigation assistant, not a medical
          professional.
        </div>

        <main className="main">
          <div className="shell">
            {mode === "pick" ? (
              <motion.section
                className="picker"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="pickerHero">
                  <span className="pickerEyebrow">Interactive demo</span>
                  <h1 className="pickerTitle serif">See Laura in action.</h1>
                  <p className="pickerBody">
                    Choose a guided scenario or try the free preview. The goal here is
                    simple: show how Laura turns stress and confusion into a clearer next
                    step.
                  </p>
                </div>

                <div className="pickerTabs">
                  <span className="pickerTab pickerTabActive">Guided scenarios</span>
                  <button
                    type="button"
                    className="pickerTab pickerTabButton"
                    onClick={() => setMode("free")}
                  >
                    Free preview
                    <ArrowRight size={13} />
                  </button>
                </div>

                <div className="scenarioGrid">
                  {scenarios.map((scenario) => (
                    <button
                      key={scenario.id}
                      type="button"
                      className="scenarioCard"
                      onClick={() => startScenario(scenario)}
                    >
                      <div className="scenarioCardTop">
                        <div className="scenarioEmoji">{scenario.emoji}</div>

                        <div className="scenarioIcon">{scenario.icon}</div>
                      </div>

                      <div className="scenarioCardCopy">
                        <h2>{scenario.label}</h2>
                        <p>{scenario.desc}</p>
                      </div>

                      <span className="scenarioCardLink">
                        Run scenario
                        <ArrowRight size={14} />
                      </span>
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className="freeLink"
                  onClick={() => setMode("free")}
                >
                  Or ask Laura anything
                  <ArrowRight size={14} />
                </button>
              </motion.section>
            ) : (
              <section className="chatShell">
                <div className="chatTop">
                  <div className="chatTopLeft">
                    <div className="chatAvatar">
                      <Image
                        src="/laura-avatar.png"
                        alt="Laura"
                        fill
                        sizes="34px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>

                    <div>
                      <div className="chatName">Laura</div>
                      <div className="chatMeta">
                        {mode === "scenario" && currentScenario
                          ? `${currentScenario.emoji} ${currentScenario.label}`
                          : "Free preview"}
                      </div>
                    </div>
                  </div>

                  <div className="chatTopRight">
                    <button
                      type="button"
                      className={`modePill${mode === "scenario" ? " modePillActive" : ""}`}
                      onClick={() => {
                        if (currentScenario) {
                          startScenario(currentScenario);
                        } else {
                          setMode("pick");
                        }
                      }}
                    >
                      Guided
                    </button>

                    <button
                      type="button"
                      className={`modePill${mode === "free" ? " modePillActive" : ""}`}
                      onClick={() => {
                        clearTimers();
                        setTyping(false);
                        setMode("free");
                      }}
                    >
                      Free
                    </button>
                  </div>
                </div>

                <div className="messages">
                  <AnimatePresence initial={false}>
                    {messages.map((msg, index) => (
                      <motion.div
                        key={`${msg.from}-${index}-${msg.text.slice(0, 12)}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`messageRow ${
                          msg.from === "user" ? "messageRowUser" : "messageRowLaura"
                        }`}
                      >
                        {msg.from === "laura" ? (
                          <div className="messageAvatar">
                            <Image
                              src="/laura-avatar.png"
                              alt="Laura"
                              fill
                              sizes="28px"
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                        ) : null}

                        <div
                          className={`messageBubble ${
                            msg.from === "user" ? "messageBubbleUser" : "messageBubbleLaura"
                          }`}
                        >
                          <p className="messageText" style={{ whiteSpace: "pre-line" }}>
                            {msg.text}
                          </p>

                          {msg.urgency ? (
                            <div
                              className="urgencyPill"
                              style={{
                                background: urgencyMap[msg.urgency].bg,
                                color: urgencyMap[msg.urgency].text,
                              }}
                            >
                              <span
                                className="urgencyDot"
                                style={{ background: urgencyMap[msg.urgency].text }}
                              />
                              {urgencyMap[msg.urgency].label}
                            </div>
                          ) : null}

                          {msg.action ? <div className="actionCard">{msg.action}</div> : null}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {typing ? (
                    <div className="messageRow messageRowLaura">
                      <div className="messageAvatar">
                        <Image
                          src="/laura-avatar.png"
                          alt="Laura"
                          fill
                          sizes="28px"
                          style={{ objectFit: "cover" }}
                        />
                      </div>

                      <div className="typingBubble">
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  ) : null}

                  <div ref={bottomRef} />
                </div>

                {mode === "scenario" &&
                currentScenario &&
                visibleCount >= currentScenario.conversation.length &&
                !typing ? (
                  <motion.div
                    className="scenarioEnd"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="scenarioEndButtons">
                      <button type="button" className="joinButton" onClick={resetDemo}>
                        Try another scenario
                      </button>

                      <button
                        type="button"
                        className="secondaryButton"
                        onClick={() => {
                          clearTimers();
                          setTyping(false);
                          setMode("free");
                        }}
                      >
                        Ask Laura anything
                      </button>
                    </div>
                  </motion.div>
                ) : null}

                {mode === "free" ? (
                  <div className="inputBar">
                    <input
                      type="text"
                      className="input"
                      placeholder="Describe what you need help with..."
                      value={freeInput}
                      onChange={(e) => setFreeInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          sendFreeMessage(freeInput);
                        }
                      }}
                      disabled={typing}
                    />

                    <button
                      type="button"
                      className="sendButton"
                      disabled={typing || !freeInput.trim()}
                      onClick={() => sendFreeMessage(freeInput)}
                    >
                      <Send size={15} />
                    </button>
                  </div>
                ) : null}
              </section>
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
body{
  background:${c.bg};
  color:${c.text};
  font-family:'DM Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
  -webkit-font-smoothing:antialiased;
  font-size:16px;
}
a{color:inherit;text-decoration:none}
button,input{font-family:inherit}
::selection{background:${c.accent};color:#fff}
.serif{font-family:'Instrument Serif',Georgia,serif}

.page{
  display:flex;
  flex-direction:column;
  height:100vh;
  height:100dvh;
}
.container{
  width:100%;
  max-width:980px;
  margin:0 auto;
  padding:0 18px;
}

.nav{
  flex-shrink:0;
  background:rgba(248,246,241,0.88);
  backdrop-filter:blur(18px);
  -webkit-backdrop-filter:blur(18px);
  border-bottom:1px solid rgba(228,221,210,0.78);
}
.navInner{
  min-height:62px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:10px;
}
.brand{
  display:flex;
  align-items:center;
  gap:8px;
  min-width:0;
}
.brandMark{
  width:30px;
  height:30px;
  border-radius:10px;
  overflow:hidden;
  flex-shrink:0;
  box-shadow:0 3px 10px rgba(0,0,0,0.06);
}
.brandName{
  font-size:13px;
  font-weight:800;
  letter-spacing:-0.03em;
}
.brandSub{
  margin-top:1px;
  font-size:8px;
  font-weight:800;
  letter-spacing:0.14em;
  color:${c.accent};
}
.navRight{
  display:flex;
  align-items:center;
  gap:6px;
}
.resetButton,
.joinButton,
.secondaryButton{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:6px;
  border-radius:999px;
  white-space:nowrap;
  font-weight:700;
  cursor:pointer;
  transition:transform .2s ease,box-shadow .2s ease,background .2s ease;
}
.resetButton{
  padding:8px 12px;
  font-size:11px;
  color:${c.muted};
  background:transparent;
  border:1px solid rgba(228,221,210,0.92);
}
.joinButton{
  padding:9px 14px;
  font-size:11px;
  border:none;
  background:${c.dark};
  color:#fff;
  box-shadow:0 8px 18px rgba(10,11,15,0.12);
}
.secondaryButton{
  padding:9px 14px;
  font-size:11px;
  border:1px solid rgba(228,221,210,0.92);
  background:rgba(255,255,255,0.86);
  color:${c.text};
}
.resetButton:hover,
.joinButton:hover,
.secondaryButton:hover{
  transform:translateY(-1px);
}

.banner{
  flex-shrink:0;
  padding:8px 16px;
  text-align:center;
  font-size:11px;
  line-height:1.5;
  color:${c.muted};
  background:rgba(37,99,235,0.04);
  border-bottom:1px solid rgba(37,99,235,0.08);
}

.main{
  flex:1;
  min-height:0;
  display:flex;
}
.shell{
  width:100%;
  max-width:980px;
  margin:0 auto;
  padding:14px 12px 0;
  display:flex;
  flex-direction:column;
  min-height:0;
}

.picker{
  flex:1;
  min-height:0;
  overflow-y:auto;
  padding-bottom:20px;
}
.pickerHero{
  max-width:760px;
}
.pickerEyebrow{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  font-size:11px;
  font-weight:800;
  letter-spacing:.12em;
  text-transform:uppercase;
  color:${c.muted};
}
.pickerTitle{
  margin-top:10px;
  font-size:clamp(30px,6vw,54px);
  line-height:1.02;
  letter-spacing:-0.05em;
}
.pickerBody{
  margin-top:12px;
  max-width:640px;
  font-size:15px;
  line-height:1.75;
  color:${c.sub};
}
.pickerTabs{
  margin-top:20px;
  display:flex;
  align-items:center;
  gap:8px;
  flex-wrap:wrap;
}
.pickerTab{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  min-height:36px;
  padding:0 14px;
  border-radius:999px;
  font-size:12px;
  font-weight:700;
}
.pickerTabActive{
  background:${c.accentSoft};
  color:${c.accent};
  border:1px solid rgba(37,99,235,0.08);
}
.pickerTabButton{
  border:none;
  background:rgba(255,255,255,0.82);
  color:${c.text};
  cursor:pointer;
  border:1px solid rgba(228,221,210,0.92);
}

.scenarioGrid{
  margin-top:18px;
  display:grid;
  grid-template-columns:1fr;
  gap:10px;
}
.scenarioCard{
  width:100%;
  text-align:left;
  padding:18px;
  border-radius:20px;
  background:rgba(255,255,255,0.94);
  border:1px solid rgba(228,221,210,0.92);
  box-shadow:0 12px 26px rgba(17,18,20,0.04);
  cursor:pointer;
  transition:transform .22s ease,box-shadow .22s ease,border-color .22s ease;
}
.scenarioCard:hover{
  transform:translateY(-1px);
  box-shadow:0 16px 30px rgba(17,18,20,0.06);
  border-color:rgba(201,149,107,0.35);
}
.scenarioCardTop{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:10px;
}
.scenarioEmoji{
  font-size:26px;
  line-height:1;
}
.scenarioIcon{
  width:34px;
  height:34px;
  border-radius:12px;
  display:flex;
  align-items:center;
  justify-content:center;
  background:rgba(37,99,235,0.06);
  color:${c.accent};
  border:1px solid rgba(37,99,235,0.08);
  flex-shrink:0;
}
.scenarioCardCopy{
  margin-top:12px;
}
.scenarioCardCopy h2{
  font-size:16px;
  font-weight:800;
  letter-spacing:-0.02em;
}
.scenarioCardCopy p{
  margin-top:5px;
  font-size:12px;
  line-height:1.65;
  color:${c.muted};
}
.scenarioCardLink{
  margin-top:14px;
  display:inline-flex;
  align-items:center;
  gap:6px;
  color:${c.accent};
  font-size:12px;
  font-weight:700;
}
.freeLink{
  margin-top:16px;
  padding:0;
  background:none;
  border:none;
  color:${c.accent};
  font-size:14px;
  font-weight:700;
  display:inline-flex;
  align-items:center;
  gap:6px;
  cursor:pointer;
}

.chatShell{
  flex:1;
  min-height:0;
  display:flex;
  flex-direction:column;
  border:1px solid rgba(228,221,210,0.92);
  background:rgba(255,255,255,0.7);
  border-radius:26px 26px 0 0;
  overflow:hidden;
  box-shadow:0 16px 30px rgba(17,18,20,0.04);
}
.chatTop{
  flex-shrink:0;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:10px;
  padding:14px 14px 12px;
  background:rgba(255,255,255,0.8);
  border-bottom:1px solid rgba(228,221,210,0.85);
}
.chatTopLeft{
  display:flex;
  align-items:center;
  gap:10px;
  min-width:0;
}
.chatAvatar{
  position:relative;
  width:34px;
  height:34px;
  border-radius:999px;
  overflow:hidden;
  flex-shrink:0;
  border:1px solid rgba(255,255,255,0.9);
}
.chatName{
  font-size:13px;
  font-weight:800;
  letter-spacing:-0.02em;
}
.chatMeta{
  margin-top:2px;
  font-size:11px;
  font-weight:700;
  color:${c.accent};
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.chatTopRight{
  display:flex;
  align-items:center;
  gap:6px;
}
.modePill{
  min-height:32px;
  padding:0 12px;
  border-radius:999px;
  border:1px solid rgba(228,221,210,0.92);
  background:rgba(255,255,255,0.78);
  color:${c.sub};
  font-size:11px;
  font-weight:700;
  cursor:pointer;
}
.modePillActive{
  background:${c.accentSoft};
  color:${c.accent};
  border-color:rgba(37,99,235,0.08);
}

.messages{
  flex:1;
  min-height:0;
  overflow-y:auto;
  padding:14px;
  display:flex;
  flex-direction:column;
  gap:10px;
  background:
    radial-gradient(circle at top, rgba(255,255,255,0.22), transparent 28%),
    linear-gradient(180deg, #F8F6F1, #F3EFE8);
}
.messageRow{
  display:flex;
  gap:8px;
  align-items:flex-start;
}
.messageRowUser{
  flex-direction:row-reverse;
}
.messageRowLaura{
  flex-direction:row;
}
.messageAvatar{
  position:relative;
  width:28px;
  height:28px;
  border-radius:999px;
  overflow:hidden;
  flex-shrink:0;
  border:1px solid rgba(255,255,255,0.94);
}
.messageBubble{
  max-width:min(82%, 560px);
  padding:11px 13px;
  border-radius:16px;
}
.messageBubbleUser{
  background:${c.dark};
  color:#fff;
  border-radius:16px 16px 5px 16px;
}
.messageBubbleLaura{
  background:#fff;
  color:${c.text};
  border:1px solid rgba(228,221,210,0.92);
  border-radius:16px 16px 16px 5px;
  box-shadow:0 6px 16px rgba(17,18,20,0.03);
}
.messageText{
  font-size:13px;
  line-height:1.72;
}
.urgencyPill{
  margin-top:8px;
  display:inline-flex;
  align-items:center;
  gap:6px;
  min-height:28px;
  padding:0 10px;
  border-radius:999px;
  font-size:11px;
  font-weight:700;
}
.urgencyDot{
  width:5px;
  height:5px;
  border-radius:999px;
  flex-shrink:0;
}
.actionCard{
  margin-top:8px;
  padding:8px 10px;
  border-radius:10px;
  background:${c.accentSoft};
  color:${c.accent};
  font-size:11px;
  line-height:1.5;
  font-weight:700;
  border:1px solid rgba(37,99,235,0.08);
}
.typingBubble{
  display:flex;
  gap:4px;
  align-items:center;
  padding:11px 14px;
  border-radius:16px 16px 16px 5px;
  background:#fff;
  border:1px solid rgba(228,221,210,0.92);
}
.typingBubble span{
  width:6px;
  height:6px;
  border-radius:999px;
  background:${c.muted};
  animation:typingPulse 1.2s infinite;
}
.typingBubble span:nth-child(2){animation-delay:.2s}
.typingBubble span:nth-child(3){animation-delay:.4s}

@keyframes typingPulse{
  0%,80%{opacity:.3;transform:scale(.82)}
  40%{opacity:1;transform:scale(1)}
}

.scenarioEnd{
  flex-shrink:0;
  padding:10px 14px;
  border-top:1px solid rgba(228,221,210,0.92);
  background:rgba(255,255,255,0.84);
}
.scenarioEndButtons{
  display:flex;
  gap:8px;
  flex-wrap:wrap;
}

.inputBar{
  flex-shrink:0;
  display:flex;
  gap:8px;
  padding:10px 14px max(12px, env(safe-area-inset-bottom));
  border-top:1px solid rgba(228,221,210,0.92);
  background:rgba(255,255,255,0.88);
}
.input{
  flex:1;
  min-width:0;
  height:44px;
  border-radius:14px;
  border:1px solid rgba(228,221,210,0.92);
  background:#fff;
  padding:0 14px;
  color:${c.text};
  font-size:13px;
  outline:none;
  transition:border-color .2s ease,box-shadow .2s ease;
}
.input:focus{
  border-color:${c.accent};
  box-shadow:0 0 0 3px rgba(37,99,235,0.08);
}
.input:disabled{
  opacity:.6;
}
.sendButton{
  width:44px;
  height:44px;
  border:none;
  border-radius:14px;
  background:${c.accent};
  color:#fff;
  display:flex;
  align-items:center;
  justify-content:center;
  cursor:pointer;
  flex-shrink:0;
}
.sendButton:disabled{
  opacity:.34;
  cursor:not-allowed;
}

@media(min-width:640px){
  .container{padding:0 22px}
  .navInner{min-height:68px}
  .shell{padding:18px 18px 0}
  .scenarioGrid{
    grid-template-columns:repeat(2,1fr);
  }
  .messageBubble{
    max-width:min(74%, 620px);
  }
}

@media(min-width:960px){
  .container{padding:0 28px}
  .shell{padding:22px 22px 0}
  .scenarioGrid{
    grid-template-columns:repeat(3,1fr);
  }
}

@media(max-width:639px){
  .navInner{min-height:58px}
  .brandName{font-size:12px}
  .joinButton{padding:8px 12px;font-size:10px}
  .resetButton{padding:7px 10px;font-size:10px}
  .messages{padding:12px}
  .messageBubble{max-width:86%}
}
`;