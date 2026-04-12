import Image from "next/image";
import Link from "next/link";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import { ArrowLeft } from "lucide-react";
import { signIn } from "@/auth";
import Rotator from "./rotator";

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400","500","600","700","800"], variable: "--font-dm" });
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--font-serif" });

const CSS = `
:root{--bg:#F8F6F1;--cream:#FAF7F2;--text:#2A1F14;--sub:#4A4F5C;--muted:#888E9C;--dark:#08090C;--border:#E3DDD2;--borderSoft:#EDE8DF;--warm:#C9956B;--warmDk:#A07545;--warmSoft:#FFF8F0}
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%;background:var(--bg)}
a{text-decoration:none;color:inherit}
button{font-family:inherit}
::selection{background:var(--warm);color:#fff}
.serif{font-family:var(--font-serif),Georgia,serif}
.page{min-height:100vh;display:grid;grid-template-columns:1fr;background:var(--bg);color:var(--text);font-family:var(--font-dm),Arial,sans-serif;font-size:15px;-webkit-font-smoothing:antialiased}
.left{display:none;position:relative;padding:40px;background:radial-gradient(ellipse at 20% 10%,rgba(201,149,107,0.12),transparent 55%),radial-gradient(ellipse at 80% 90%,rgba(201,149,107,0.06),transparent 60%),var(--cream);border-right:1px solid var(--borderSoft);overflow:hidden}
.leftGrid{position:absolute;inset:0;background-image:linear-gradient(rgba(201,149,107,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(201,149,107,0.06) 1px,transparent 1px);background-size:48px 48px;mask-image:radial-gradient(ellipse at center,#000 30%,transparent 80%);-webkit-mask-image:radial-gradient(ellipse at center,#000 30%,transparent 80%);pointer-events:none}
.leftInner{position:relative;z-index:1;height:100%;max-width:540px;margin:0 auto;display:flex;flex-direction:column;gap:32px}
.brand{display:inline-flex;align-items:center;gap:11px;padding-top:4px}
.brandMark{width:36px;height:36px;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0}
.brandLogo{width:100%;height:100%;object-fit:contain}
.brandName{font-family:var(--font-serif),Georgia,serif;font-size:22px;letter-spacing:-.025em;color:var(--text)}
.leftBody{flex:1;display:flex;flex-direction:column;justify-content:center}
.leftHeadline{font-family:var(--font-serif),Georgia,serif;font-size:clamp(38px,4.5vw,56px);line-height:1.02;letter-spacing:-.045em;color:var(--text);max-width:480px}
.right{position:relative;display:flex;flex-direction:column;padding:28px;min-height:100vh}
.rightTop{display:flex;align-items:center;justify-content:space-between;gap:16px}
.rightBrand{display:inline-flex;align-items:center;gap:10px}
.rightBrandMark{width:30px;height:30px;display:inline-flex;align-items:center;justify-content:center}
.rightBrandName{font-family:var(--font-serif),Georgia,serif;font-size:20px;letter-spacing:-.025em;color:var(--text)}
.back{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:700;color:var(--muted);transition:color .2s ease}
.back:hover{color:var(--text)}
.rightBody{flex:1;display:flex;align-items:center;justify-content:center;padding:40px 0}
.formWrap{width:100%;max-width:400px}
.formTitle{font-family:var(--font-serif),Georgia,serif;font-size:clamp(36px,5.2vw,48px);line-height:1.02;letter-spacing:-.04em;color:var(--text)}
.formSub{margin-top:14px;font-size:15px;line-height:1.65;color:var(--sub);max-width:360px}
.authBtn{position:relative;width:100%;min-height:54px;display:flex;align-items:center;justify-content:center;background:#fff;color:var(--text);border:1.5px solid var(--border);border-radius:14px;font-size:15px;font-weight:700;cursor:pointer;transition:all .2s ease;letter-spacing:-.005em;padding:0 56px}
.authBtn:hover{border-color:var(--text);box-shadow:0 6px 18px rgba(0,0,0,.05);transform:translateY(-1px)}
.authBtn:active{transform:translateY(0)}
.authIcon{position:absolute;left:18px;top:50%;transform:translateY(-50%);width:20px;height:20px;display:flex;align-items:center;justify-content:center}
.authTag{position:absolute;right:14px;top:50%;transform:translateY(-50%);padding:3px 8px;background:var(--warmSoft);color:var(--warmDk);font-size:9px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;border-radius:5px;border:1px solid rgba(201,149,107,.2)}
.form{margin-top:36px}
.formAlt{margin-top:10px}
.divider{display:flex;align-items:center;gap:14px;margin-top:28px;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.dividerLine{flex:1;height:1px;background:var(--border)}
.helpLinks{margin-top:22px;display:flex;flex-direction:column;gap:10px}
.helpLink{font-size:13.5px;color:var(--sub);line-height:1.6}
.helpLink strong{color:var(--text);font-weight:700;text-decoration:underline;text-underline-offset:3px;text-decoration-color:var(--warm);text-decoration-thickness:1.5px;transition:color .2s}
.helpLink:hover strong{color:var(--warmDk)}
.rightFoot{display:flex;justify-content:space-between;align-items:center;font-size:11.5px;color:var(--muted);padding-top:20px;border-top:1px solid var(--borderSoft);flex-wrap:wrap;gap:10px}
.rightFootLinks{display:inline-flex;gap:16px}
.rightFootLinks a{transition:color .2s}
.rightFootLinks a:hover{color:var(--text)}
.quoteWrap{margin-top:32px;position:relative;min-height:140px;max-width:480px}
.quote{padding:4px 0 4px 22px;border-left:2px solid var(--warm);background:transparent}
.quoteTx{font-family:var(--font-serif),Georgia,serif;font-size:18px;line-height:1.5;color:var(--text);font-style:italic}
.quoteBy{margin-top:14px;font-size:11px;font-weight:800;letter-spacing:.08em;color:var(--warmDk);text-transform:uppercase}
.quoteBySep{color:var(--muted);margin:0 6px;font-weight:600}
.quoteByDomain{color:var(--muted);font-weight:700}
.quoteDots{display:flex;gap:6px;margin-top:20px;margin-left:22px}
.quoteDot{width:6px;height:6px;border-radius:50%;background:rgba(42,31,20,.18);border:none;cursor:pointer;padding:0;transition:all .3s}
.quoteDot:hover{background:rgba(42,31,20,.35)}
.quoteDotActive{background:var(--warmDk);width:22px;border-radius:999px}
@media(min-width:900px){.page{grid-template-columns:minmax(0,1.05fr) minmax(520px,1fr)}.left{display:flex;padding:48px}.rightBrand{display:none}.right{padding:40px 48px}}
@media(min-width:1200px){.left{padding:56px 64px}.right{padding:48px 80px}}
@media(max-width:899px){.rightTop{margin-bottom:20px}.formTitle{font-size:clamp(34px,8vw,44px)}}
`;

export default function LoginPage() {
  return (
    <main className={`${dmSans.variable} ${instrumentSerif.variable} page`}>
      <style>{CSS}</style>

      <aside className="left">
        <div className="leftGrid" aria-hidden="true" />
        <div className="leftInner">
          <Link href="/" className="brand">
            <span className="brandMark"><Image src="/omela-logo-mark.png" alt="Omela" width={36} height={36} className="brandLogo" priority /></span>
            <span className="brandName">Omela</span>
          </Link>
          <div className="leftBody">
            <h1 className="leftHeadline">Coordination without the chasing.</h1>
            <Rotator />
          </div>
        </div>
      </aside>

      <section className="right">
        <div className="rightTop">
          <Link href="/" className="rightBrand">
            <span className="rightBrandMark"><Image src="/omela-logo-mark.png" alt="Omela" width={30} height={30} className="brandLogo" priority /></span>
            <span className="rightBrandName">Omela</span>
          </Link>
          <Link href="/" className="back"><ArrowLeft size={14} />Back to home</Link>
        </div>

        <div className="rightBody">
          <div className="formWrap">
            <h2 className="formTitle serif">Sign in to Omela</h2>
            <p className="formSub">Continue to your workspace to review requests and what needs attention today.</p>

            <form className="form" action={async () => { "use server"; await signIn("google", { redirectTo: "/portal" }); }}>
              <button type="submit" className="authBtn">
                <span className="authIcon">
                  <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z" fill="#34A853" />
                    <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84Z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" fill="#EA4335" />
                  </svg>
                </span>
                Continue with Google
              </button>
            </form>

            <form className="formAlt" action={async () => { "use server"; await signIn("microsoft-entra-id", { redirectTo: "/portal" }); }}>
              <button type="submit" className="authBtn">
                <span className="authIcon">
                  <svg width="20" height="20" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <rect x="1" y="1" width="10" height="10" fill="#F25022" />
                    <rect x="12" y="1" width="10" height="10" fill="#7FBA00" />
                    <rect x="1" y="12" width="10" height="10" fill="#00A4EF" />
                    <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
                  </svg>
                </span>
                Continue with work account
                <span className="authTag">Microsoft</span>
              </button>
            </form>

            <div className="divider">
              <span className="dividerLine" /><span>Need access?</span><span className="dividerLine" />
            </div>

            <div className="helpLinks">
              <p className="helpLink">New to Omela? <Link href="/#waitlist"><strong>Join early access</strong></Link></p>
              <p className="helpLink">Running a team? <Link href="mailto:hello@omela.ai?subject=Omela%20pilot%20conversation"><strong>Book a pilot conversation</strong></Link></p>
            </div>
          </div>
        </div>

        <div className="rightFoot">
          <span>&copy; 2026 Omela Ltd.</span>
          <div className="rightFootLinks">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <a href="mailto:hello@omela.ai">Contact</a>
          </div>
        </div>
      </section>
    </main>
  );
}
