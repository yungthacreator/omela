import Image from "next/image";
import Link from "next/link";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import { ArrowLeft } from "lucide-react";
import { signIn } from "@/auth";

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
.page{min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--bg);color:var(--text);font-family:var(--font-dm),Arial,sans-serif;font-size:15px;-webkit-font-smoothing:antialiased;padding:28px;position:relative;overflow:hidden}
.page::before,.page::after{content:"";position:absolute;border-radius:50%;filter:blur(60px);pointer-events:none;z-index:0}
.page::before{width:380px;height:380px;background:rgba(201,149,107,.12);top:-120px;left:-120px}
.page::after{width:420px;height:420px;background:rgba(201,149,107,.08);bottom:-160px;right:-160px}
.topNav{position:absolute;top:0;left:0;right:0;padding:24px 28px;display:flex;align-items:center;justify-content:space-between;z-index:2}
.brand{display:inline-flex;align-items:center;gap:10px}
.brandMark{width:32px;height:32px;display:inline-flex;align-items:center;justify-content:center}
.brandLogo{width:100%;height:100%;object-fit:contain}
.brandName{font-family:var(--font-serif),Georgia,serif;font-size:22px;letter-spacing:-.025em;color:var(--text)}
.back{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:700;color:var(--muted);transition:color .2s}
.back:hover{color:var(--text)}
.card{position:relative;z-index:1;width:100%;max-width:420px;padding:44px 38px}
.cardTitle{font-family:var(--font-serif),Georgia,serif;font-size:clamp(34px,5vw,44px);line-height:1.05;letter-spacing:-.04em;color:var(--text)}
.cardSub{margin-top:14px;font-size:15px;line-height:1.65;color:var(--sub)}
.authBtn{position:relative;width:100%;min-height:54px;display:flex;align-items:center;justify-content:center;gap:12px;background:#fff;color:var(--text);border:1.5px solid var(--border);border-radius:14px;font-size:15px;font-weight:700;cursor:pointer;transition:all .2s;padding:0 20px}
.authBtn:hover{border-color:var(--text);box-shadow:0 6px 18px rgba(0,0,0,.05);transform:translateY(-1px)}
.authBtn:active{transform:translateY(0)}
.authIcon{width:20px;height:20px;flex-shrink:0;display:flex;align-items:center;justify-content:center}
.form{margin-top:32px}
.formAlt{margin-top:10px}
.divider{display:flex;align-items:center;gap:14px;margin-top:28px;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.dividerLine{flex:1;height:1px;background:var(--border)}
.helpLinks{margin-top:22px;display:flex;flex-direction:column;gap:10px}
.helpLink{font-size:13.5px;color:var(--sub);line-height:1.6}
.helpLink strong{color:var(--text);font-weight:700;text-decoration:underline;text-underline-offset:3px;text-decoration-color:var(--warm);text-decoration-thickness:1.5px;transition:color .2s}
.helpLink:hover strong{color:var(--warmDk)}
.foot{position:absolute;bottom:24px;left:0;right:0;display:flex;justify-content:space-between;align-items:center;padding:0 28px;font-size:11.5px;color:var(--muted);z-index:2}
.footLinks{display:inline-flex;gap:16px}
.footLinks a{transition:color .2s}
.footLinks a:hover{color:var(--text)}
@media(max-width:599px){.card{padding:32px 8px}.topNav{padding:20px}.foot{position:static;margin-top:24px;padding:0;flex-wrap:wrap;gap:12px;justify-content:center}}
`;

export default function LoginPage() {
  return (
    <main className={`${dmSans.variable} ${instrumentSerif.variable} page`}>
      <style>{CSS}</style>

      <div className="topNav">
        <Link href="/" className="brand">
          <span className="brandMark"><Image src="/omela-logo-mark.png" alt="Omela" width={32} height={32} className="brandLogo" priority /></span>
          <span className="brandName">Omela</span>
        </Link>
        <Link href="/" className="back"><ArrowLeft size={14} />Back to home</Link>
      </div>

      <div className="card">
        <h1 className="cardTitle">Sign in to Omela</h1>
        <p className="cardSub">Continue to your workspace to review what needs attention today.</p>

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
            Continue with Microsoft
          </button>
        </form>

        <div className="divider">
          <span className="dividerLine" /><span>Need access?</span><span className="dividerLine" />
        </div>

        <div className="helpLinks">
          <p className="helpLink">New to Omela? <Link href="/#waitlist"><strong>Join early access</strong></Link></p>
          <p className="helpLink">Running a team? <Link href="mailto:hello@omela.ai"><strong>Book a pilot conversation</strong></Link></p>
        </div>
      </div>

      <div className="foot">
        <span>&copy; 2026 Omela Ltd.</span>
        <div className="footLinks">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <a href="mailto:hello@omela.ai">Contact</a>
        </div>
      </div>
    </main>
  );
}
