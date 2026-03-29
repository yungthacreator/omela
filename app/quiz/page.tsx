"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Share2, Heart, RotateCcw } from "lucide-react";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');`;

const c = {
  bg: "#F8F6F1", card: "#FFFFFF", dark: "#08090C",
  text: "#111214", sub: "#4A4F5C", muted: "#888E9C",
  accent: "#2563EB", accentSoft: "#ECF2FF",
  border: "#E3DDD2",
  green: "#22C55E", greenSoft: "#ECFDF3", greenDk: "#15803D",
  red: "#EF4444", redSoft: "#FEF2F2", redDk: "#991B1B",
};

type Q = { q: string; opts: string[]; correct: number; why: string; tip: string; cat: string };

const questions: Q[] = [
  { q: "Your GP says 'take this antibiotic for 5 days.' You feel better after 3 days. Should you stop?", opts: ["Yes, if you feel better you can stop", "No, always finish the full course", "It depends on the type of antibiotic", "Ask a pharmacist first"], correct: 1, why: "Stopping antibiotics early can leave resistant bacteria behind, making future infections harder to treat. Always finish the full course unless your doctor specifically tells you otherwise.", tip: "If antibiotics give you side effects, call your GP before stopping. They can often switch you to something gentler.", cat: "Medication" },
  { q: "You have a persistent headache. You Google it and see 'brain tumour.' How likely is that actually?", opts: ["Very likely", "About 50/50", "Less than 1% of headaches are tumours", "Impossible to say without a scan"], correct: 2, why: "Less than 1% of headaches indicate anything serious. Tension headaches and migraines are overwhelmingly the most common causes. However, a sudden, severe headache unlike any you have had before does warrant urgent attention.", tip: "Write down when headaches happen, how long they last, and what helps. This information is far more useful to your GP than anything you found online.", cat: "Myth vs Fact" },
  { q: "A friend says 'drink 8 glasses of water a day or you will get dehydrated.' Is this true?", opts: ["Yes, everyone needs exactly 8 glasses", "No, water needs vary by person, activity, and climate", "You should drink even more than 8 glasses", "Only athletes need that much"], correct: 1, why: "The '8 glasses' rule has no strong scientific basis. Your body needs different amounts depending on your size, activity level, climate, and diet. Many fruits and vegetables also contain significant water.", tip: "The simplest way to check hydration: look at the colour of your urine. Pale yellow is good. Dark yellow means drink more.", cat: "Nutrition" },
  { q: "You cut your finger while cooking. It is bleeding steadily but you can move the finger. What should you do first?", opts: ["Go to A&E immediately", "Apply pressure with a clean cloth for 10 minutes", "Run it under cold water only", "Put a plaster on immediately"], correct: 1, why: "For most cuts, firm pressure with a clean cloth for 10 minutes is the correct first step. This allows the blood to clot. Going to A&E for a minor cut wastes your time and theirs. However, if the bleeding does not stop after 10 minutes of pressure, the cut is very deep, or you cannot move the finger, then seek medical help.", tip: "Keep a basic first aid kit at home. Most minor injuries do not need a doctor. Knowing when they do is the real skill.", cat: "First Aid" },
  { q: "Your elderly parent fell but says they are fine. They did not hit their head. Should you still be concerned?", opts: ["No, if they say they are fine, trust them", "Monitor for 24 hours, watch for pain or bruising", "Take them to A&E regardless", "Only worry if they cannot walk"], correct: 1, why: "Falls in elderly people can cause injuries that are not immediately obvious, including hairline fractures and internal bruising. Pain, swelling, or difficulty moving may appear hours later. Watch for changes over 24 hours.", tip: "Ask your GP about a falls risk assessment. Simple changes like grab rails, better lighting, and medication reviews can significantly reduce fall risk.", cat: "Elderly Care" },
  { q: "You have been feeling low and unmotivated for 3 weeks. Is this something to see a GP about?", opts: ["No, everyone feels sad sometimes", "Yes, persistent low mood for 2+ weeks is worth discussing", "Only if you cannot get out of bed", "Mental health is not a GP issue"], correct: 1, why: "The NHS recommends speaking to your GP if you have been feeling low, anxious, or hopeless for more than 2 weeks. GPs are trained to help with mental health and can offer support, therapy referrals, or medication if appropriate.", tip: "You do not need to have a 'reason' to feel low. Mental health conditions are medical conditions. Asking for help is not weakness, it is self-care.", cat: "Mental Health" },
  { q: "Your child has a temperature of 38.2. Should you give them paracetamol immediately?", opts: ["Yes, always bring the fever down as fast as possible", "Only if they seem uncomfortable or distressed", "Never give children paracetamol", "Only if the temperature is above 40"], correct: 1, why: "Fever is the body's natural response to infection. The goal is not to eliminate the fever but to keep the child comfortable. If they are eating, drinking, and playing normally, medication may not be needed even with a mild fever.", tip: "Never give aspirin to children under 16. Use children's paracetamol or ibuprofen, and always check the dosage for their age and weight.", cat: "Children" },
  { q: "You read that you should not eat after 8pm to lose weight. Is this supported by science?", opts: ["Yes, eating late causes weight gain", "No, total calories matter more than timing", "It depends on your metabolism", "You should not eat after 6pm"], correct: 1, why: "Weight gain is primarily about total calorie intake versus expenditure, not when you eat. A calorie at 9pm is the same as a calorie at 9am. However, late-night eating can disrupt sleep quality, which can indirectly affect weight.", tip: "Instead of timing rules, focus on eating when you are genuinely hungry and stopping when you are satisfied. Sustainable habits beat strict rules every time.", cat: "Nutrition" },
  { q: "You notice a new mole on your arm. When should you be concerned?", opts: ["All new moles are dangerous", "If it is asymmetrical, has uneven borders, multiple colours, or is growing", "Only if it hurts", "New moles after 30 are always fine"], correct: 1, why: "Use the ABCDE rule: Asymmetry, Border irregularity, Colour variation, Diameter larger than 6mm, and Evolving (changing shape, size, or colour). Most moles are harmless, but any mole that changes should be checked by a GP.", tip: "Take photos of moles you want to monitor. When you see your GP, having a 'before' photo makes it much easier for them to assess whether it has changed.", cat: "Skin Health" },
];

export default function QuizPage() {
  const todayIdx = useMemo(() => {
    const d = new Date();
    return (d.getFullYear() * 366 + d.getMonth() * 31 + d.getDate()) % questions.length;
  }, []);

  const [qi, setQi] = useState(todayIdx);
  const [sel, setSel] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  const q = questions[qi];
  const correct = sel === q.correct;

  function pick(i: number) { if (!revealed) setSel(i); }
  function reveal() {
    if (sel === null || revealed) return;
    setRevealed(true);
    setTotal(p => p + 1);
    if (sel === q.correct) setScore(p => p + 1);
  }
  function next() { setQi(p => (p + 1) % questions.length); setSel(null); setRevealed(false); }

  return (
    <>
      <style>{FONT}</style>
      <style>{CSS}</style>
      <div className="qzWrap">
        <nav className="qzNav">
          <div className="container qzNavIn">
            <Link href="/" className="qzBrand">
              <div className="qzLogo"><Image src="/omela-logo-mark.png" alt="Omela" width={30} height={30} style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
              <div><div className="qzBrandN">Omela</div><div className="qzBrandS serif">Health Quiz</div></div>
            </Link>
            <Link href="/" className="btnP qzBack">Back to Omela <ArrowRight size={12} /></Link>
          </div>
        </nav>

        <main className="qzMain">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="qzHeader">
              <div>
                <div className="qzPill"><Heart size={13} color={c.accent} /> Health Knowledge Check</div>
                <h1 className="serif qzTitle">Would you know what to do?</h1>
                <p className="qzBody">Real health scenarios. See if you would make the right call.</p>
              </div>
              {total > 0 && <div className="qzScore"><div className="qzScoreN">{score}/{total}</div><div className="qzScoreL">correct</div></div>}
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div key={qi} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="qzCard">
                <div className="qzCat">{q.cat}</div>
                <h2 className="qzQ">{q.q}</h2>
                <div className="qzOpts">
                  {q.opts.map((opt, i) => {
                    let cls = "qzOpt";
                    if (revealed) { if (i === q.correct) cls += " qzOptOk"; else if (i === sel) cls += " qzOptBad"; else cls += " qzOptDim"; }
                    else if (i === sel) cls += " qzOptSel";
                    return (
                      <button key={i} className={cls} onClick={() => pick(i)}>
                        <span className="qzOptL">{String.fromCharCode(65 + i)}</span>
                        <span className="qzOptT">{opt}</span>
                        {revealed && i === q.correct && <span className="qzOptI" style={{ color: c.green }}>&#10003;</span>}
                        {revealed && i === sel && i !== q.correct && <span className="qzOptI" style={{ color: c.red }}>&#10007;</span>}
                      </button>
                    );
                  })}
                </div>

                {!revealed ? (
                  <button className="btnP qzSubmit" onClick={reveal} disabled={sel === null}>Check my answer</button>
                ) : (
                  <div className="qzResult">
                    <div className={`qzBanner ${correct ? "qzBannerOk" : "qzBannerBad"}`}>
                      <span>{correct ? "&#10003;" : "&#10007;"}</span>
                      <span>{correct ? "You got it right." : "Not this time."}</span>
                    </div>
                    <div className="qzExplain"><h3>Why?</h3><p>{q.why}</p></div>
                    <div className="qzTip"><h3>Practical tip</h3><p>{q.tip}</p></div>
                    <div className="qzActions">
                      <button className="btnP" onClick={next}>Next question <ArrowRight size={13} /></button>
                      <button className="btnS" onClick={() => { if (navigator.share) navigator.share({ title: "Omela Health Quiz", text: `I scored ${score}/${total} on the Omela health quiz!`, url: "https://omela-rho.vercel.app/quiz" }); }}><Share2 size={13} /> Share</button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="qzPromo">
              <p>Have a real health concern? Laura can help you figure out the right next step.</p>
              <Link href="/demo" className="btnP qzPromoBtn">Try Laura <ArrowRight size={12} /></Link>
            </div>
          </div>
        </main>

        <footer className="qzFt"><div className="container qzFtIn"><p>&copy; 2026 Omela</p><div style={{ display: "flex", gap: "12px" }}><Link href="/privacy" className="qzFtL">Privacy</Link><Link href="/terms" className="qzFtL">Terms</Link></div></div></footer>
      </div>
    </>
  );
}

const CSS = `
*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}
body{background:${c.bg};color:${c.text};font-family:'DM Sans',-apple-system,sans-serif;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}button,input{font-family:inherit}
.serif{font-family:'Instrument Serif',Georgia,serif}
.container{max-width:680px;margin:0 auto;padding:0 16px}
.btnP{display:inline-flex;align-items:center;gap:6px;background:${c.dark};color:#fff;border:none;border-radius:999px;padding:12px 20px;font-size:14px;font-weight:700;cursor:pointer;white-space:nowrap;transition:all 0.2s}
.btnP:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 8px 20px rgba(0,0,0,0.12)}
.btnP:disabled{opacity:0.4;cursor:not-allowed}
.btnS{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,0.85);color:${c.text};border:1px solid ${c.border};border-radius:999px;padding:12px 20px;font-size:14px;font-weight:700;cursor:pointer}

.qzWrap{min-height:100vh;display:flex;flex-direction:column}
.qzNav{background:rgba(248,246,241,0.94);backdrop-filter:blur(16px);border-bottom:1px solid ${c.border}}
.qzNavIn{display:flex;align-items:center;justify-content:space-between;height:56px;gap:8px}
.qzBrand{display:flex;align-items:center;gap:7px;text-decoration:none}
.qzLogo{width:28px;height:28px;border-radius:8px;overflow:hidden;box-shadow:0 2px 6px rgba(0,0,0,0.06)}
.qzBrandN{font-size:12px;font-weight:800}.qzBrandS{font-size:9px;color:${c.accent};font-weight:700}
.qzBack{padding:7px 14px!important;font-size:11px!important}

.qzMain{flex:1;padding:28px 0 40px}

.qzHeader{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:24px}
.qzPill{display:inline-flex;align-items:center;gap:5px;padding:7px 12px;border-radius:999px;border:1px solid ${c.border};background:rgba(255,255,255,0.8);font-size:11px;font-weight:700;color:${c.sub}}
.qzTitle{font-size:clamp(26px,6vw,40px);letter-spacing:-0.04em;line-height:1.08;margin-top:10px}
.qzBody{font-size:14px;color:${c.sub};line-height:1.6;margin-top:6px}
.qzScore{text-align:center;flex-shrink:0;background:#fff;border:1px solid ${c.border};border-radius:14px;padding:12px 16px;box-shadow:0 3px 10px rgba(0,0,0,0.03)}
.qzScoreN{font-size:24px;font-weight:800;color:${c.accent}}.qzScoreL{font-size:10px;color:${c.muted};font-weight:600}

.qzCard{background:#fff;border:1px solid ${c.border};border-radius:22px;padding:24px;box-shadow:0 6px 24px rgba(0,0,0,0.03)}
.qzCat{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;color:${c.accent};margin-bottom:10px}
.qzQ{font-size:clamp(18px,4vw,24px);font-weight:800;letter-spacing:-0.02em;line-height:1.3}
.qzOpts{display:flex;flex-direction:column;gap:8px;margin-top:20px}
.qzOpt{display:flex;align-items:center;gap:12px;width:100%;padding:14px 16px;background:rgba(255,255,255,0.6);border:2px solid ${c.border};border-radius:14px;cursor:pointer;text-align:left;font-family:inherit;transition:all 0.2s}
.qzOpt:hover{border-color:#D0CBBD;background:#fff}
.qzOptSel{border-color:${c.accent};background:${c.accentSoft}}
.qzOptOk{border-color:${c.green};background:${c.greenSoft};cursor:default}
.qzOptBad{border-color:${c.red};background:${c.redSoft};cursor:default}
.qzOptDim{opacity:0.45;cursor:default}
.qzOptL{width:28px;height:28px;border-radius:8px;background:${c.bg};display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:${c.muted};flex-shrink:0}
.qzOptT{font-size:14px;font-weight:600;color:${c.text};flex:1}
.qzOptI{font-size:18px;font-weight:800;flex-shrink:0}

.qzSubmit{margin-top:20px;width:100%}

.qzResult{margin-top:20px}
.qzBanner{display:flex;align-items:center;gap:8px;padding:14px 18px;border-radius:12px;font-size:15px;font-weight:800}
.qzBannerOk{background:${c.greenSoft};color:${c.greenDk}}
.qzBannerBad{background:${c.redSoft};color:${c.redDk}}
.qzExplain{margin-top:16px;padding:18px;background:${c.bg};border-radius:12px}
.qzExplain h3{font-size:13px;font-weight:800;margin-bottom:6px}
.qzExplain p{font-size:14px;line-height:1.72;color:${c.sub}}
.qzTip{margin-top:12px;padding:18px;background:${c.accentSoft};border-radius:12px;border:1px solid rgba(37,99,235,0.08)}
.qzTip h3{font-size:13px;font-weight:800;color:${c.accent};margin-bottom:6px}
.qzTip p{font-size:14px;line-height:1.72;color:${c.sub}}
.qzActions{display:flex;gap:8px;margin-top:18px;flex-wrap:wrap}

.qzPromo{margin-top:28px;padding:20px;background:#fff;border:1px solid ${c.border};border-radius:16px;display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap}
.qzPromo p{font-size:13px;color:${c.sub};line-height:1.6;flex:1;min-width:180px}
.qzPromoBtn{padding:9px 16px!important;font-size:12px!important;flex-shrink:0}

.qzFt{border-top:1px solid ${c.border};padding:16px 0}
.qzFtIn{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px}
.qzFtIn p{font-size:10px;color:${c.muted}}
.qzFtL{font-size:10px;color:${c.muted};font-weight:600}

@media(min-width:640px){.container{padding:0 24px}.qzMain{padding:36px 0 52px}.qzCard{padding:32px}}
`;
