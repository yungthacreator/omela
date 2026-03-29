"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');`;

const c = {
  bg: "#F8F6F1",
  text: "#141517",
  sub: "#555B69",
  muted: "#8B919F",
  border: "#E3DDD2",
  accent: "#2563EB",
  accentSoft: "#ECF2FF",
  green: "#22C55E",
  greenSoft: "#ECFDF3",
  red: "#DC2626",
  redSoft: "#FEF2F2",
  dark: "#08090C",
};

const question = {
  prompt: "Which of these can be a sign that urgent medical help may be needed?",
  options: [
    "A mild headache after a long day",
    "Chest pain with shortness of breath",
    "Feeling sleepy late at night",
    "Being thirsty after exercise",
  ],
  correct: 1,
  explanation:
    "Chest pain with shortness of breath can be a red-flag symptom and may require urgent assessment. Laura is not emergency care. In a real emergency, call your local emergency number immediately.",
};

export default function QuizPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const revealed = selected !== null;

  return (
    <>
      <style>{FONT}</style>
      <style>{CSS}</style>

      <div className="wrap">
        <nav className="nav">
          <div className="container navRow">
            <Link href="/" className="brand">
              <div className="logo">
                <Image src="/omela-logo-mark.png" alt="Omela" width={34} height={34} />
              </div>
              <div>
                <div className="brandName">Omela</div>
                <div className="brandSub">Daily health quiz</div>
              </div>
            </Link>
            <div className="navActions">
              <Link href="/demo" className="btnGhost">Demo</Link>
              <Link href="/status" className="btnGhost">Status</Link>
              <a href="/#waitlist" className="btnPrimary">Get early access</a>
            </div>
          </div>
        </nav>

        <section className="hero">
          <div className="container heroGrid">
            <div>
              <div className="pill">One question a day</div>
              <h1 className="serif title">Build healthier instincts in under 30 seconds.</h1>
              <p className="body">
                A simple daily question to help people learn more about symptoms, urgency, and how to think more clearly about care.
              </p>

              <div className="stats">
                <div className="statCard">
                  <div className="statValue">1</div>
                  <div className="statLabel">Question today</div>
                </div>
                <div className="statCard">
                  <div className="statValue">30s</div>
                  <div className="statLabel">To complete</div>
                </div>
                <div className="statCard">
                  <div className="statValue">Daily</div>
                  <div className="statLabel">Learning habit</div>
                </div>
              </div>
            </div>

            <div className="quizCard">
              <div className="quizEyebrow">Today’s health check</div>
              <h2 className="quizPrompt">{question.prompt}</h2>

              <div className="options">
                {question.options.map((opt, i) => {
                  const isCorrect = i === question.correct;
                  const isSelected = i === selected;

                  let cls = "option";
                  if (revealed && isCorrect) cls += " correct";
                  if (revealed && isSelected && !isCorrect) cls += " wrong";

                  return (
                    <button
                      key={opt}
                      type="button"
                      className={cls}
                      onClick={() => setSelected(i)}
                      disabled={revealed}
                    >
                      <span className="optionKey">{String.fromCharCode(65 + i)}</span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {revealed && (
                <div className="answerCard">
                  <div className="answerTitle">
                    {selected === question.correct ? "Correct" : "Not quite"}
                  </div>
                  <p className="answerBody">{question.explanation}</p>
                </div>
              )}

              <div className="ctaRow">
                <a href="/#waitlist" className="btnPrimary">Join Laura waitlist</a>
                <button
                  type="button"
                  className="btnSecondary"
                  onClick={() => setSelected(null)}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

const CSS = `
*{box-sizing:border-box;margin:0;padding:0}
html,body{max-width:100%;overflow-x:clip;background:${c.bg};color:${c.text};font-family:'DM Sans',sans-serif}
a{text-decoration:none;color:inherit}
button{font-family:inherit}
.serif{font-family:'Instrument Serif',serif}
.container{max-width:1200px;margin:0 auto;padding:0 20px}
.nav{position:sticky;top:0;z-index:50;background:rgba(248,246,241,0.88);backdrop-filter:blur(14px);border-bottom:1px solid ${c.border}}
.navRow{height:72px;display:flex;align-items:center;justify-content:space-between;gap:20px}
.brand{display:flex;align-items:center;gap:10px}
.logo{width:34px;height:34px;border-radius:10px;overflow:hidden}
.brandName{font-weight:800;font-size:14px}
.brandSub{font-size:11px;color:${c.muted}}
.navActions{display:flex;gap:10px}
.btnPrimary,.btnGhost,.btnSecondary{display:inline-flex;align-items:center;justify-content:center;height:46px;padding:0 18px;border-radius:999px;font-size:13px;font-weight:700}
.btnPrimary{background:${c.dark};color:#fff}
.btnGhost,.btnSecondary{border:1px solid ${c.border};background:#fff;color:${c.sub}}
.hero{padding:72px 0}
.heroGrid{display:grid;grid-template-columns:1fr;gap:30px;align-items:start}
.pill{display:inline-flex;padding:8px 14px;border-radius:999px;border:1px solid ${c.border};background:#fff;font-size:12px;font-weight:700;color:${c.sub}}
.title{font-size:clamp(40px,7vw,74px);line-height:0.95;letter-spacing:-0.06em;margin-top:16px;max-width:760px}
.body{margin-top:16px;max-width:620px;font-size:17px;line-height:1.85;color:${c.sub}}
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:24px}
.statCard{background:#fff;border:1px solid ${c.border};border-radius:20px;padding:16px;text-align:center}
.statValue{font-size:20px;font-weight:800}
.statLabel{margin-top:6px;font-size:12px;color:${c.sub}}
.quizCard{background:rgba(255,255,255,0.92);border:1px solid ${c.border};border-radius:28px;padding:24px;box-shadow:0 20px 50px rgba(0,0,0,0.04)}
.quizEyebrow{font-size:11px;font-weight:800;color:${c.muted};text-transform:uppercase;letter-spacing:0.12em}
.quizPrompt{margin-top:12px;font-size:24px;line-height:1.25;letter-spacing:-0.03em}
.options{display:flex;flex-direction:column;gap:10px;margin-top:18px}
.option{width:100%;display:flex;align-items:center;gap:12px;border:1px solid ${c.border};background:#fff;border-radius:18px;padding:14px;text-align:left;cursor:pointer;font-size:14px;color:${c.text}}
.optionKey{width:28px;height:28px;border-radius:999px;background:${c.accentSoft};display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:${c.accent};flex-shrink:0}
.option.correct{border-color:${c.green};background:${c.greenSoft}}
.option.wrong{border-color:${c.red};background:${c.redSoft}}
.answerCard{margin-top:16px;border:1px solid ${c.border};background:#fff;border-radius:18px;padding:16px}
.answerTitle{font-size:14px;font-weight:800}
.answerBody{margin-top:8px;font-size:14px;line-height:1.8;color:${c.sub}}
.ctaRow{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px}
@media(min-width:980px){
  .heroGrid{grid-template-columns:1fr 0.92fr}
}
`;