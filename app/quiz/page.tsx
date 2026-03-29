"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, RotateCcw, Share2, Heart } from "lucide-react";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');`;

const c = {
  bg: "#F8F6F1", card: "#FFFFFF", dark: "#08090C",
  text: "#111214", sub: "#4A4F5C", muted: "#888E9C",
  accent: "#2563EB", accentSoft: "#ECF2FF",
  border: "#E3DDD2",
  green: "#22C55E", greenSoft: "#ECFDF3", greenDk: "#15803D",
  red: "#EF4444", redSoft: "#FEF2F2", redDk: "#991B1B",
};

type Question = {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  tip: string;
  category: string;
};

const questions: Question[] = [
  {
    question: "How long should you wash your hands to effectively remove germs?",
    options: ["5 seconds", "10 seconds", "20 seconds", "60 seconds"],
    correct: 2,
    explanation: "The WHO and CDC recommend washing hands for at least 20 seconds with soap and water. This is roughly the time it takes to hum the \"Happy Birthday\" song twice.",
    tip: "Wash your hands before eating, after using the bathroom, and after touching public surfaces.",
    category: "Hygiene",
  },
  {
    question: "What is the recommended daily water intake for an average adult?",
    options: ["1 litre", "2 litres", "4 litres", "6 litres"],
    correct: 1,
    explanation: "Most health authorities recommend approximately 2 litres (8 glasses) of water per day for adults. This can vary based on activity level, climate, and individual health conditions.",
    tip: "Carry a reusable water bottle to track your intake throughout the day.",
    category: "Nutrition",
  },
  {
    question: "How many hours of sleep do most adults need per night?",
    options: ["4 to 5 hours", "5 to 6 hours", "7 to 9 hours", "10 to 12 hours"],
    correct: 2,
    explanation: "The National Sleep Foundation recommends 7 to 9 hours of sleep for adults aged 18 to 64. Consistent sleep deprivation is linked to increased risk of heart disease, obesity, and mental health issues.",
    tip: "Keep a consistent sleep schedule, even on weekends. Avoid screens 30 minutes before bed.",
    category: "Sleep",
  },
  {
    question: "What percentage of your body weight is water?",
    options: ["About 30%", "About 45%", "About 60%", "About 80%"],
    correct: 2,
    explanation: "The human body is approximately 60% water. This water is essential for regulating temperature, transporting nutrients, and removing waste products.",
    tip: "Even mild dehydration (1-2% loss) can impair concentration, mood, and physical performance.",
    category: "Body",
  },
  {
    question: "Which vitamin does your body produce when exposed to sunlight?",
    options: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"],
    correct: 3,
    explanation: "Your skin produces Vitamin D when exposed to UVB sunlight. Vitamin D is crucial for bone health, immune function, and mood regulation. Deficiency is common in northern climates.",
    tip: "Aim for 10 to 30 minutes of midday sunlight several times per week. In winter, consider a supplement.",
    category: "Vitamins",
  },
  {
    question: "What is a normal resting heart rate for adults?",
    options: ["40 to 50 bpm", "60 to 100 bpm", "100 to 120 bpm", "120 to 140 bpm"],
    correct: 1,
    explanation: "A normal resting heart rate for adults ranges from 60 to 100 beats per minute. Athletes may have a resting rate as low as 40 bpm. A consistently elevated resting rate may indicate a health concern.",
    tip: "Check your resting heart rate first thing in the morning before getting out of bed for the most accurate reading.",
    category: "Heart",
  },
  {
    question: "How often should adults get at least 150 minutes of moderate exercise?",
    options: ["Per day", "Per week", "Per month", "Per year"],
    correct: 1,
    explanation: "The WHO recommends at least 150 minutes of moderate-intensity aerobic activity per week for adults. This works out to about 22 minutes per day or 30 minutes five times a week.",
    tip: "Walking briskly counts as moderate exercise. You do not need a gym membership to meet this target.",
    category: "Exercise",
  },
];

export default function QuizPage() {
  const todayIndex = useMemo(() => {
    const day = new Date();
    return (day.getFullYear() * 366 + day.getMonth() * 31 + day.getDate()) % questions.length;
  }, []);

  const [qIndex, setQIndex] = useState(todayIndex);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  const q = questions[qIndex];
  const isCorrect = selected === q.correct;

  function handleSelect(idx: number) {
    if (revealed) return;
    setSelected(idx);
  }

  function handleReveal() {
    if (selected === null || revealed) return;
    setRevealed(true);
    setTotal(prev => prev + 1);
    if (selected === q.correct) setScore(prev => prev + 1);
  }

  function handleNext() {
    setQIndex(prev => (prev + 1) % questions.length);
    setSelected(null);
    setRevealed(false);
  }

  return (
    <>
      <style>{FONT}</style>
      <style>{CSS}</style>
      <div className="quizWrap">
        <nav className="quizNav">
          <div className="container quizNavInner">
            <Link href="/" className="quizNavBrand">
              <div className="quizNavLogo"><Image src="/omela-logo-mark.png" alt="Omela" width={32} height={32} style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
              <div><div className="quizNavName">Omela</div><div className="quizNavSub serif">Health Quiz</div></div>
            </Link>
            <Link href="/" className="btnP quizBackBtn">Back to Omela <ArrowRight size={13} /></Link>
          </div>
        </nav>

        <main className="quizMain">
          <div className="container">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="quizHeader">
              <div className="quizHeaderLeft">
                <span className="quizPill"><Heart size={14} color={c.accent} /> Daily Health Check</span>
                <h1 className="serif quizPageTitle">Test your health knowledge.</h1>
                <p className="quizPageBody">One question at a time. Learn something new about your health in 30 seconds.</p>
              </div>
              {total > 0 && (
                <div className="quizScore">
                  <div className="quizScoreNum">{score}/{total}</div>
                  <div className="quizScoreLabel">correct</div>
                </div>
              )}
            </motion.div>

            {/* Question card */}
            <AnimatePresence mode="wait">
              <motion.div key={qIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }} className="qCard">
                <div className="qCategory">{q.category}</div>
                <h2 className="qQuestion">{q.question}</h2>

                <div className="qOptions">
                  {q.options.map((opt, i) => {
                    let optClass = "qOpt";
                    if (revealed) {
                      if (i === q.correct) optClass += " qOptCorrect";
                      else if (i === selected) optClass += " qOptWrong";
                      else optClass += " qOptDim";
                    } else if (i === selected) {
                      optClass += " qOptSelected";
                    }

                    return (
                      <motion.button key={i} className={optClass} onClick={() => handleSelect(i)} whileHover={!revealed ? { scale: 1.01 } : {}} whileTap={!revealed ? { scale: 0.99 } : {}}>
                        <span className="qOptLetter">{String.fromCharCode(65 + i)}</span>
                        <span className="qOptText">{opt}</span>
                        {revealed && i === q.correct && <span className="qOptCheck">&#10003;</span>}
                        {revealed && i === selected && i !== q.correct && <span className="qOptX">&#10007;</span>}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Action button */}
                {!revealed ? (
                  <button className="btnP qSubmit" onClick={handleReveal} disabled={selected === null}>
                    Check answer
                  </button>
                ) : (
                  <div className="qResult">
                    <div className={`qResultBanner ${isCorrect ? "qResultOk" : "qResultWrong"}`}>
                      <span className="qResultIcon">{isCorrect ? "&#10003;" : "&#10007;"}</span>
                      <span className="qResultTxt">{isCorrect ? "Correct!" : "Not quite."}</span>
                    </div>

                    <div className="qExplanation">
                      <h3 className="qExpTitle">Why?</h3>
                      <p className="qExpText">{q.explanation}</p>
                    </div>

                    <div className="qTip">
                      <h3 className="qTipTitle">Health tip</h3>
                      <p className="qTipText">{q.tip}</p>
                    </div>

                    <div className="qActions">
                      <button className="btnP" onClick={handleNext}>Next question <ArrowRight size={14} /></button>
                      <button className="btnS qShareBtn" onClick={() => {
                        if (navigator.share) {
                          navigator.share({ title: "Omela Health Quiz", text: `I scored ${score}/${total} on the Omela health quiz! Try it:`, url: "https://omela-rho.vercel.app/quiz" });
                        }
                      }}>
                        <Share2 size={14} /> Share
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Laura promo */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="quizPromo">
              <p className="quizPromoTxt">Have a real health concern? Laura can help you check your symptoms and find a doctor near you.</p>
              <Link href="/demo" className="btnP quizPromoBtn">Try Laura <ArrowRight size={13} /></Link>
            </motion.div>
          </div>
        </main>

        <footer className="quizFooter">
          <div className="container quizFooterInner">
            <p className="quizFooterTxt">&copy; 2026 Omela</p>
            <div style={{ display: "flex", gap: "14px" }}>
              <Link href="/privacy" className="quizFooterLink">Privacy</Link>
              <Link href="/terms" className="quizFooterLink">Terms</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

const CSS = `
*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}
body{background:${c.bg};color:${c.text};font-family:'DM Sans',-apple-system,sans-serif;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}button,input{font-family:inherit}
.serif{font-family:'Instrument Serif',Georgia,serif}
.container{max-width:700px;margin:0 auto;padding:0 20px}
.btnP{display:inline-flex;align-items:center;gap:7px;background:${c.dark};color:#fff;border:none;border-radius:999px;padding:13px 22px;font-size:14px;font-weight:700;cursor:pointer;white-space:nowrap;transition:all 0.2s}
.btnP:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 8px 24px rgba(0,0,0,0.12)}
.btnP:disabled{opacity:0.4;cursor:not-allowed}
.btnS{display:inline-flex;align-items:center;gap:7px;background:rgba(255,255,255,0.85);color:${c.text};border:1px solid ${c.border};border-radius:999px;padding:13px 22px;font-size:14px;font-weight:700;cursor:pointer;transition:all 0.2s}
.btnS:hover{background:#fff}

.quizWrap{min-height:100vh;display:flex;flex-direction:column}
.quizNav{background:rgba(248,246,241,0.94);backdrop-filter:blur(16px);border-bottom:1px solid ${c.border};flex-shrink:0}
.quizNavInner{display:flex;align-items:center;justify-content:space-between;height:60px;gap:10px}
.quizNavBrand{display:flex;align-items:center;gap:8px;text-decoration:none}
.quizNavLogo{width:30px;height:30px;border-radius:9px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06)}
.quizNavName{font-size:13px;font-weight:800}
.quizNavSub{font-size:10px;color:${c.accent};font-weight:700;margin-top:1px}
.quizBackBtn{padding:8px 16px!important;font-size:12px!important}

.quizMain{flex:1;padding:36px 0 48px}

.quizHeader{display:flex;align-items:flex-start;justify-content:space-between;gap:20px;margin-bottom:32px}
.quizHeaderLeft{flex:1}
.quizPill{display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border-radius:999px;border:1px solid ${c.border};background:rgba(255,255,255,0.8);font-size:12px;font-weight:700;color:${c.sub}}
.quizPageTitle{font-size:clamp(28px,6vw,44px);letter-spacing:-0.04em;line-height:1.08;margin-top:14px}
.quizPageBody{font-size:15px;color:${c.sub};line-height:1.7;margin-top:8px}
.quizScore{text-align:center;flex-shrink:0;background:${c.card};border:1px solid ${c.border};border-radius:16px;padding:14px 20px;box-shadow:0 4px 12px rgba(0,0,0,0.03)}
.quizScoreNum{font-size:28px;font-weight:800;letter-spacing:-0.04em;color:${c.accent}}
.quizScoreLabel{font-size:11px;color:${c.muted};font-weight:600;margin-top:2px}

.qCard{background:${c.card};border:1px solid ${c.border};border-radius:24px;padding:28px;box-shadow:0 8px 28px rgba(0,0,0,0.03)}
.qCategory{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;color:${c.accent};margin-bottom:12px}
.qQuestion{font-size:clamp(20px,4vw,28px);font-weight:800;letter-spacing:-0.03em;line-height:1.25}

.qOptions{display:flex;flex-direction:column;gap:10px;margin-top:24px}
.qOpt{display:flex;align-items:center;gap:14px;width:100%;padding:16px 20px;background:rgba(255,255,255,0.6);border:2px solid ${c.border};border-radius:16px;cursor:pointer;transition:all 0.2s;text-align:left;font-family:inherit}
.qOpt:hover{border-color:#D0CBBD;background:#fff}
.qOptSelected{border-color:${c.accent};background:${c.accentSoft}}
.qOptCorrect{border-color:${c.green};background:${c.greenSoft};cursor:default}
.qOptWrong{border-color:${c.red};background:${c.redSoft};cursor:default}
.qOptDim{opacity:0.5;cursor:default}
.qOptLetter{width:32px;height:32px;border-radius:10px;background:${c.bg};display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:${c.muted};flex-shrink:0}
.qOptText{font-size:15px;font-weight:600;color:${c.text};flex:1}
.qOptCheck{font-size:18px;color:${c.green};font-weight:800}
.qOptX{font-size:18px;color:${c.red};font-weight:800}

.qSubmit{margin-top:24px;width:100%}

.qResult{margin-top:24px}
.qResultBanner{display:flex;align-items:center;gap:10px;padding:16px 20px;border-radius:14px;font-size:16px;font-weight:800}
.qResultOk{background:${c.greenSoft};color:${c.greenDk}}
.qResultWrong{background:${c.redSoft};color:${c.redDk}}
.qResultIcon{font-size:20px}

.qExplanation{margin-top:20px;padding:20px;background:${c.bg};border-radius:14px}
.qExpTitle{font-size:14px;font-weight:800;margin-bottom:6px}
.qExpText{font-size:14px;line-height:1.7;color:${c.sub}}

.qTip{margin-top:14px;padding:20px;background:${c.accentSoft};border-radius:14px;border:1px solid rgba(37,99,235,0.1)}
.qTipTitle{font-size:14px;font-weight:800;color:${c.accent};margin-bottom:6px}
.qTipText{font-size:14px;line-height:1.7;color:${c.sub}}

.qActions{display:flex;gap:10px;margin-top:20px;flex-wrap:wrap}

.quizPromo{margin-top:32px;padding:24px;background:${c.card};border:1px solid ${c.border};border-radius:18px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;box-shadow:0 4px 12px rgba(0,0,0,0.02)}
.quizPromoTxt{font-size:14px;color:${c.sub};line-height:1.6;flex:1;min-width:200px}
.quizPromoBtn{flex-shrink:0;padding:10px 18px!important;font-size:13px!important}

.quizFooter{border-top:1px solid ${c.border};padding:18px 0}
.quizFooterInner{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px}
.quizFooterTxt{font-size:11px;color:${c.muted}}
.quizFooterLink{font-size:11px;color:${c.muted};font-weight:600;transition:color 0.2s}
.quizFooterLink:hover{color:${c.text}}

@media(min-width:640px){
  .container{padding:0 28px}
  .quizMain{padding:48px 0 64px}
  .qCard{padding:36px}
  .quizHeader{margin-bottom:40px}
}
`;
