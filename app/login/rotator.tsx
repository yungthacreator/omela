"use client";

import { useEffect, useState } from "react";

const testimonials = [
  { quote: "Omela is the first thing I open on a Monday morning. I can see what needs attention across every resident in one place.", author: "Care team lead", domain: "Residential care, UK" },
  { quote: "We used to miss gas safety deadlines across a 40-property portfolio. Now every cert, every renewal, every remedial sits in one view.", author: "Property manager", domain: "Lettings, Manchester" },
  { quote: "I stopped chasing clients for signatures over email. They get a reminder, I see the status, and the deadline stops being my problem.", author: "Paralegal", domain: "Corporate filings, London" },
  { quote: "Three of us manage prescriptions for my mum. Before Omela we were triple-calling the GP. Now we just see who did what.", author: "Family carer", domain: "Supporting a parent" },
  { quote: "Every trademark renewal used to need a spreadsheet and two reminders. One dashboard replaced both, and the nudges go out automatically.", author: "IP paralegal", domain: "Trademark firm" },
];

export default function Rotator() {
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => {
      setFading(true);
      window.setTimeout(() => {
        setIdx((i) => (i + 1) % testimonials.length);
        setFading(false);
      }, 250);
    }, 5600);
    return () => window.clearInterval(id);
  }, []);

  const pick = (n: number) => {
    if (n === idx) return;
    setFading(true);
    window.setTimeout(() => {
      setIdx(n);
      setFading(false);
    }, 250);
  };

  const cur = testimonials[idx];

  return (
    <>
      <div className="quoteWrap">
        <div
          className="quote"
          style={{
            opacity: fading ? 0 : 1,
            transform: fading ? "translateY(-6px)" : "translateY(0)",
            transition: "opacity 0.25s ease, transform 0.25s ease",
          }}
        >
          <p className="quoteTx">&ldquo;{cur.quote}&rdquo;</p>
          <div className="quoteBy">
            {cur.author}
            <span className="quoteBySep">·</span>
            <span className="quoteByDomain">{cur.domain}</span>
          </div>
        </div>
      </div>
      <div className="quoteDots" role="tablist" aria-label="Testimonial">
        {testimonials.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`quoteDot ${i === idx ? "quoteDotActive" : ""}`}
            onClick={() => pick(i)}
            aria-label={`Testimonial ${i + 1}`}
            aria-selected={i === idx}
            role="tab"
          />
        ))}
      </div>
    </>
  );
}