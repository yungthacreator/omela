import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import {
  ArrowLeft,
  ArrowUpRight,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { signIn } from "@/auth";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

const CSS = `
:root{
  --bg:#F8F6F1;
  --cream:#FAF7F2;
  --card:#FFFCF7;
  --text:#171717;
  --sub:#4B5563;
  --muted:#8A9099;
  --border:#E5DED2;
  --border-soft:#EFE8DD;
  --teal:#57CEC5;
  --teal-dark:#087B73;
  --teal-soft:#E8FAF7;
  --shadow:0 24px 80px rgba(23,23,23,.08);
}

*{
  box-sizing:border-box;
  margin:0;
  padding:0;
}

html,body{
  min-height:100%;
  background:var(--bg);
}

body{
  overflow-x:hidden;
}

a{
  color:inherit;
  text-decoration:none;
}

button,input{
  font-family:inherit;
}

::selection{
  background:var(--teal);
  color:#fff;
}

.loginPage{
  min-height:100svh;
  width:100%;
  font-family:var(--font-inter), Inter, Arial, sans-serif;
  color:var(--text);
  background:
    radial-gradient(circle at 50% 0%, rgba(87,206,197,.16), transparent 34%),
    radial-gradient(circle at 50% 42%, rgba(87,206,197,.08), transparent 28%),
    radial-gradient(circle at 10% 18%, rgba(255,255,255,.82), transparent 28%),
    radial-gradient(circle at 92% 82%, rgba(87,206,197,.08), transparent 32%),
    var(--bg);
  display:flex;
  flex-direction:column;
}

.topShell{
  width:100%;
  max-width:1180px;
  margin:0 auto;
  padding:30px 24px 0;
  display:flex;
  align-items:center;
  justify-content:flex-start;
}

.homeLink{
  display:inline-flex;
  align-items:center;
  gap:12px;
  color:#344054;
  font-size:15px;
  line-height:1;
  font-weight:600;
  transition:transform .2s ease, color .2s ease;
}

.homeLink:hover{
  color:var(--text);
  transform:translateX(-2px);
}

.homeIcon{
  width:42px;
  height:42px;
  border:1px solid var(--border);
  border-radius:999px;
  background:rgba(255,252,247,.82);
  box-shadow:0 12px 34px rgba(23,23,23,.05);
  display:inline-flex;
  align-items:center;
  justify-content:center;
}

.center{
  width:100%;
  flex:1;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:48px 20px 34px;
}

.card{
  width:100%;
  max-width:468px;
  position:relative;
}

.card::before{
  content:"";
  position:absolute;
  inset:-42px -48px;
  background:
    radial-gradient(circle at 50% 0%, rgba(87,206,197,.13), transparent 42%),
    radial-gradient(circle at 18% 88%, rgba(255,255,255,.85), transparent 34%);
  pointer-events:none;
  z-index:0;
}

.logoBlock{
  position:relative;
  z-index:1;
  display:flex;
  flex-direction:column;
  align-items:center;
  text-align:center;
  margin-bottom:24px;
}

.logoMark{
  width:58px;
  height:58px;
  display:flex;
  align-items:center;
  justify-content:center;
  margin-bottom:18px;
}

.logoMark img{
  width:58px;
  height:58px;
  object-fit:contain;
}

.title{
  font-size:36px;
  line-height:1.06;
  letter-spacing:-.052em;
  font-weight:650;
  color:var(--text);
}

.subtitle{
  margin-top:13px;
  max-width:410px;
  font-size:15.5px;
  line-height:1.68;
  color:#4B5563;
  font-weight:400;
}

.formSurface{
  position:relative;
  z-index:1;
  width:100%;
  background:rgba(255,252,247,.82);
  border:1px solid var(--border);
  border-radius:28px;
  box-shadow:var(--shadow);
  backdrop-filter:blur(18px);
  padding:24px;
}

.fieldGroup{
  display:grid;
  gap:18px;
}

.field{
  display:grid;
  gap:9px;
}

.label{
  font-size:14px;
  line-height:1;
  color:var(--text);
  font-weight:650;
}

.inputWrap{
  position:relative;
}

.input{
  width:100%;
  height:56px;
  border:1px solid var(--border);
  border-radius:14px;
  background:#fff;
  color:var(--text);
  font-size:15px;
  font-weight:400;
  outline:none;
  padding:0 18px 0 46px;
  transition:border-color .2s ease, box-shadow .2s ease, background .2s ease;
}

.input::placeholder{
  color:#9BA1AD;
}

.input:focus{
  border-color:rgba(87,206,197,.86);
  box-shadow:0 0 0 5px rgba(87,206,197,.14);
  background:#fff;
}

.inputIcon{
  position:absolute;
  left:16px;
  top:50%;
  transform:translateY(-50%);
  color:#7B8190;
  display:flex;
  align-items:center;
  justify-content:center;
}

.primaryButton{
  margin-top:22px;
  width:100%;
  height:56px;
  border:0;
  border-radius:14px;
  background:var(--teal);
  color:#10201F;
  font-size:15px;
  font-weight:650;
  cursor:pointer;
  box-shadow:0 20px 46px rgba(87,206,197,.25);
  transition:transform .2s ease, box-shadow .2s ease, filter .2s ease;
}

.primaryButton:hover{
  transform:translateY(-1px);
  filter:saturate(1.06);
  box-shadow:0 24px 56px rgba(87,206,197,.32);
}

.primaryButton:active{
  transform:translateY(0);
}

.divider{
  margin:25px 0;
  display:flex;
  align-items:center;
  gap:14px;
  color:#7B8190;
  font-size:13px;
  font-weight:500;
}

.divider::before,
.divider::after{
  content:"";
  height:1px;
  flex:1;
  background:var(--border-soft);
}

.oauthStack{
  display:grid;
  gap:10px;
}

.oauthButton{
  width:100%;
  height:56px;
  border:1px solid var(--border);
  border-radius:14px;
  background:#fff;
  color:var(--text);
  display:grid;
  grid-template-columns:28px 1fr 24px;
  align-items:center;
  gap:12px;
  padding:0 16px;
  font-size:15px;
  font-weight:650;
  cursor:pointer;
  transition:transform .2s ease, border-color .2s ease, box-shadow .2s ease;
}

.oauthButton:hover{
  transform:translateY(-1px);
  border-color:#D8D0C2;
  box-shadow:0 14px 30px rgba(23,23,23,.06);
}

.oauthIcon{
  width:24px;
  height:24px;
  display:flex;
  align-items:center;
  justify-content:center;
}

.oauthText{
  text-align:center;
}

.arrowIcon{
  color:#8B909A;
  display:flex;
  align-items:center;
  justify-content:center;
}

.helper{
  margin-top:25px;
  display:grid;
  gap:12px;
  text-align:center;
}

.helperText{
  font-size:14.5px;
  color:#4B5563;
  line-height:1.55;
}

.helperText a{
  color:var(--teal-dark);
  font-weight:700;
  text-decoration:underline;
  text-underline-offset:4px;
  text-decoration-thickness:1.5px;
  text-decoration-color:rgba(87,206,197,.75);
}

.footer{
  width:100%;
  max-width:1180px;
  margin:0 auto;
  padding:0 24px 26px;
  display:flex;
  justify-content:center;
  align-items:center;
  gap:18px;
  flex-wrap:wrap;
  color:#7B8190;
  font-size:12px;
}

.footer a{
  transition:color .2s ease;
}

.footer a:hover{
  color:var(--text);
}

@media(max-width:700px){
  .topShell{
    padding:22px 18px 0;
  }

  .homeLink{
    font-size:14px;
  }

  .homeIcon{
    width:39px;
    height:39px;
  }

  .center{
    align-items:flex-start;
    padding:42px 14px 34px;
  }

  .card{
    max-width:100%;
  }

  .card::before{
    inset:-26px -18px;
  }

  .logoMark,
  .logoMark img{
    width:50px;
    height:50px;
  }

  .title{
    font-size:32px;
    letter-spacing:-.045em;
  }

  .subtitle{
    font-size:14.5px;
    line-height:1.62;
    max-width:340px;
  }

  .formSurface{
    padding:18px;
    border-radius:24px;
  }

  .input,
  .primaryButton,
  .oauthButton{
    height:53px;
  }

  .footer{
    padding:0 18px 22px;
    font-size:11.5px;
    gap:13px;
  }
}

@media(max-width:420px){
  .topShell{
    padding:20px 16px 0;
  }

  .homeLink span:last-child{
    display:none;
  }

  .center{
    padding:36px 12px 30px;
  }

  .logoBlock{
    margin-bottom:21px;
  }

  .logoMark{
    margin-bottom:15px;
  }

  .logoMark,
  .logoMark img{
    width:48px;
    height:48px;
  }

  .title{
    font-size:30px;
  }

  .subtitle{
    font-size:14px;
  }

  .formSurface{
    padding:16px;
    border-radius:22px;
  }

  .oauthButton{
    grid-template-columns:24px 1fr 20px;
    padding:0 13px;
    font-size:14px;
  }

  .helperText{
    font-size:14px;
  }
}

@media(max-width:360px){
  .title{
    font-size:28px;
  }

  .subtitle{
    font-size:13.5px;
  }

  .input{
    font-size:14px;
  }

  .primaryButton,
  .oauthButton{
    font-size:14px;
  }
}
`;

export default function LoginPage() {
  return (
    <main className={`${inter.variable} loginPage`}>
      <style>{CSS}</style>

      <header className="topShell">
        <Link href="/" className="homeLink">
          <span className="homeIcon">
            <ArrowLeft size={17} />
          </span>
          <span>Back to home</span>
        </Link>
      </header>

      <section className="center">
        <div className="card">
          <div className="logoBlock">
            <Link href="/" className="logoMark" aria-label="Omela home">
              <Image
                src="/omela-logo-mark.png"
                alt="Omela"
                width={58}
                height={58}
                priority
              />
            </Link>

            <h1 className="title">Sign in</h1>
            <p className="subtitle">
              Continue to your Omela workspace and keep every request, owner,
              update, and next action in one calm place.
            </p>
          </div>

          <div className="formSurface">
            <form
              action={async (formData: FormData) => {
                "use server";

                const email = String(formData.get("email") ?? "");
                const password = String(formData.get("password") ?? "");

                await signIn("credentials", {
                  email,
                  password,
                  redirectTo: "/portal",
                });
              }}
            >
              <div className="fieldGroup">
                <label className="field">
                  <span className="label">Email address</span>
                  <span className="inputWrap">
                    <span className="inputIcon">
                      <Mail size={17} />
                    </span>
                    <input
                      className="input"
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                    />
                  </span>
                </label>

                <label className="field">
                  <span className="label">Password</span>
                  <span className="inputWrap">
                    <span className="inputIcon">
                      <LockKeyhole size={17} />
                    </span>
                    <input
                      className="input"
                      type="password"
                      name="password"
                      placeholder="Your password"
                      autoComplete="current-password"
                      required
                    />
                  </span>
                </label>
              </div>

              <button type="submit" className="primaryButton">
                Sign in
              </button>
            </form>

            <div className="divider">or</div>

            <div className="oauthStack">
              <form
                action={async () => {
                  "use server";
                  await signIn("google", { redirectTo: "/portal" });
                }}
              >
                <button type="submit" className="oauthButton">
                  <span className="oauthIcon">
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83Z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z"
                        fill="#EA4335"
                      />
                    </svg>
                  </span>
                  <span className="oauthText">Sign in with Google</span>
                  <span className="arrowIcon">
                    <ArrowUpRight size={16} />
                  </span>
                </button>
              </form>

              <form
                action={async () => {
                  "use server";
                  await signIn("microsoft-entra-id", {
                    redirectTo: "/portal",
                  });
                }}
              >
                <button type="submit" className="oauthButton">
                  <span className="oauthIcon">
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 23 23"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <rect x="1" y="1" width="10" height="10" fill="#F25022" />
                      <rect x="12" y="1" width="10" height="10" fill="#7FBA00" />
                      <rect x="1" y="12" width="10" height="10" fill="#00A4EF" />
                      <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
                    </svg>
                  </span>
                  <span className="oauthText">Sign in with Microsoft</span>
                  <span className="arrowIcon">
                    <ArrowUpRight size={16} />
                  </span>
                </button>
              </form>
            </div>

            <div className="helper">
              <p className="helperText">
                New to Omela? <Link href="/signup">Sign up</Link>
              </p>

              <p className="helperText">
                <Link href="/forgot-password">Forgot password?</Link>
              </p>

              <p className="helperText">
                Having trouble signing in?{" "}
                <a href="mailto:hello@omela.ai?subject=Omela%20sign%20in%20support">
                  Contact support
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <span>© 2026 Omela Ltd.</span>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <a href="mailto:hello@omela.ai">hello@omela.ai</a>
      </footer>
    </main>
  );
}