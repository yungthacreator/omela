import Image from "next/image";
import Link from "next/link";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import { ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";
import { signIn } from "@/auth";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
});

const CSS = `
:root{
  --bg:#F8F6F1;
  --card:rgba(255,255,255,0.94);
  --text:#111214;
  --sub:#4A4F5C;
  --muted:#888E9C;
  --dark:#08090C;
  --border:#E3DDD2;
  --warm:#C9956B;
  --warmSoft:#FFF8F0;
}

*{box-sizing:border-box}
a{text-decoration:none;color:inherit}

.page{
  min-height:100vh;
  position:relative;
  overflow:hidden;
  background:
    radial-gradient(circle at top left, rgba(201,149,107,0.10), transparent 34%),
    radial-gradient(circle at bottom right, rgba(37,99,235,0.05), transparent 28%),
    var(--bg);
  color:var(--text);
  font-family:var(--font-dm), Arial, sans-serif;
  padding:28px;
}

.blur{
  position:absolute;
  border-radius:999px;
  filter:blur(56px);
  pointer-events:none;
}

.blurA{
  width:260px;
  height:260px;
  left:-60px;
  top:5%;
  background:rgba(201,149,107,0.12);
}

.blurB{
  width:320px;
  height:320px;
  right:-100px;
  bottom:4%;
  background:rgba(37,99,235,0.05);
}

.shell{
  position:relative;
  z-index:1;
  max-width:1120px;
  margin:0 auto;
  min-height:calc(100vh - 56px);
  display:flex;
  flex-direction:column;
}

.top{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:16px;
  margin-bottom:40px;
}

.brand{
  display:inline-flex;
  align-items:center;
  gap:12px;
}

.logoWrap{
  width:32px;
  height:32px;
  border-radius:0;
  overflow:visible;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  background:transparent;
  border:none;
  box-shadow:none;
  flex-shrink:0;
}

.logo{
  width:100%;
  height:100%;
  object-fit:contain;
  filter:drop-shadow(0 4px 10px rgba(201,149,107,0.10));
}

.brandText{
  font-size:20px;
  font-weight:800;
  letter-spacing:-0.03em;
}

.back{
  display:inline-flex;
  align-items:center;
  gap:6px;
  font-size:14px;
  font-weight:700;
  color:var(--sub);
  transition:color .2s ease, transform .2s ease;
}

.back:hover{
  color:var(--text);
  transform:translateY(-1px);
}

.panel{
  width:100%;
  max-width:580px;
  margin:auto;
  background:var(--card);
  border:1px solid rgba(227,221,210,0.92);
  border-radius:34px;
  padding:44px 40px;
  box-shadow:
    0 20px 60px rgba(14,18,26,0.06),
    0 2px 0 rgba(255,255,255,0.68) inset;
  backdrop-filter:blur(16px);
  -webkit-backdrop-filter:blur(16px);
}

.eyebrowWrap{
  display:flex;
  justify-content:center;
}

.eyebrow{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  min-height:32px;
  padding:0 14px;
  border-radius:999px;
  background:var(--warmSoft);
  border:1px solid rgba(201,149,107,0.16);
  color:var(--warm);
  font-size:11px;
  font-weight:800;
  letter-spacing:.08em;
  text-transform:uppercase;
}

.title{
  margin:18px 0 0;
  text-align:center;
  font-family:var(--font-serif), Georgia, serif;
  font-size:clamp(48px,7vw,74px);
  line-height:.94;
  letter-spacing:-.05em;
  font-weight:400;
}

.sub{
  max-width:450px;
  margin:18px auto 0;
  text-align:center;
  font-size:16px;
  line-height:1.82;
  color:var(--sub);
}

.row{
  margin-top:28px;
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:12px;
}

.pill{
  min-height:48px;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:8px;
  border-radius:18px;
  background:rgba(255,255,255,0.74);
  border:1px solid rgba(227,221,210,0.9);
  color:var(--sub);
  font-size:13px;
  font-weight:700;
}

.form{
  margin-top:24px;
}

.button{
  width:100%;
  min-height:56px;
  border:none;
  border-radius:999px;
  background:var(--dark);
  color:#fff;
  font-size:15px;
  font-weight:800;
  cursor:pointer;
  box-shadow:0 10px 28px rgba(8,9,12,0.12);
  transition:transform .2s ease, box-shadow .2s ease;
}

.button:hover{
  transform:translateY(-1px);
  box-shadow:0 16px 34px rgba(8,9,12,0.16);
}

.note{
  margin:18px auto 0;
  max-width:430px;
  text-align:center;
  font-size:12px;
  line-height:1.8;
  color:var(--muted);
}

@media (max-width:640px){
  .page{padding:20px}
  .top{margin-bottom:26px}
  .panel{padding:30px 22px;border-radius:28px}
  .row{grid-template-columns:1fr}
  .back{font-size:13px}
  .title{font-size:58px}
}
`;

export default function LoginPage() {
  return (
    <main className={`${dmSans.variable} ${instrumentSerif.variable} page`}>
      <style>{CSS}</style>

      <div className="blur blurA" />
      <div className="blur blurB" />

      <div className="shell">
        <div className="top">
          <Link href="/" className="brand">
            <span className="logoWrap">
              <Image
                src="/omela-logo-mark.png"
                alt="Omela"
                width={32}
                height={32}
                className="logo"
                priority
              />
            </span>
            <span className="brandText">Omela</span>
          </Link>

          <Link href="/" className="back">
            Back to home <ArrowRight size={14} />
          </Link>
        </div>

        <section className="panel">
          <div className="eyebrowWrap">
            <span className="eyebrow">Secure portal access</span>
          </div>

          <h1 className="title">Welcome back.</h1>

          <p className="sub">
            Sign in to your private Omela workspace for calm, secure prescription
            coordination.
          </p>

          <div className="row">
            <div className="pill">
              <ShieldCheck size={16} />
              <span>Private access</span>
            </div>

            <div className="pill">
              <LockKeyhole size={16} />
              <span>Google-secured sign-in</span>
            </div>
          </div>

          <form
            className="form"
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/portal" });
            }}
          >
            <button type="submit" className="button">
              Continue with Google
            </button>
          </form>

          <p className="note">
            Omela coordinates repeat-prescription admin. She does not provide
            diagnosis or treatment.
          </p>
        </section>
      </div>
    </main>
  );
}