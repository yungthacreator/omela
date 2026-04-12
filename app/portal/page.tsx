import Image from "next/image";
import Link from "next/link";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import { Bell, LogOut, Plus, Settings, HelpCircle, Inbox, UserPlus, Check, Circle } from "lucide-react";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm", weight: ["400","500","600","700","800"] });
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--font-serif" });

function getInitial(v?: string | null) { return v?.trim().charAt(0).toUpperCase() ?? "O"; }
function getFirstName(v?: string | null) { return v?.trim().split(" ")[0] ?? "there"; }

const CSS = `
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#F8F6F1;color:#2A1F14;font-family:var(--font-dm),Arial,sans-serif;-webkit-font-smoothing:antialiased;font-size:15px}
a{color:inherit;text-decoration:none}
button,input,select{font-family:inherit}
::selection{background:#C9956B;color:#fff}
.serif{font-family:var(--font-serif),Georgia,serif}

.nav{position:sticky;top:0;z-index:100;background:rgba(248,246,241,.95);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid #E3DDD2}
.navR{max-width:1100px;margin:0 auto;padding:0 20px;display:flex;align-items:center;gap:16px;height:64px}
.brand{display:flex;align-items:center;gap:10px;flex-shrink:0}
.logoW{width:32px;height:32px}
.brandName{font-family:var(--font-serif),Georgia,serif;font-size:22px;letter-spacing:-.025em;color:#2A1F14}
.navDiv{width:1px;height:24px;background:#E3DDD2;display:none}
.navTabs{display:none;align-items:center;gap:4px;flex:1}
.navTab{padding:9px 14px;font-size:14px;font-weight:600;color:#4A4F5C;border-radius:8px;background:none;border:none;cursor:pointer;transition:all .2s}
.navTab:hover{background:rgba(227,221,210,.5);color:#2A1F14}
.navTabActive{background:#fff;color:#2A1F14;border:1px solid #E3DDD2;box-shadow:0 1px 3px rgba(0,0,0,.03)}
.navRight{display:flex;align-items:center;gap:8px;margin-left:auto}
.navIcBtn{width:36px;height:36px;border-radius:9px;border:1px solid #E3DDD2;background:#fff;display:flex;align-items:center;justify-content:center;color:#4A4F5C;cursor:pointer;transition:all .2s}
.navIcBtn:hover{border-color:#2A1F14;color:#2A1F14}
.userChip{display:flex;align-items:center;gap:10px;padding:5px 14px 5px 5px;border:1px solid #E3DDD2;background:#fff;border-radius:999px}
.userAv{width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#F7E7D2,#F0D5B6);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:#A07545;overflow:hidden}
.userChipName{display:none;font-size:13px;font-weight:700;color:#2A1F14}
.signOutBtn{background:none;border:none;cursor:pointer;display:flex;align-items:center;padding:9px 10px;color:#4A4F5C;border-radius:8px;transition:all .2s}
.signOutBtn:hover{color:#2A1F14;background:rgba(227,221,210,.5)}

.shell{max-width:1000px;margin:0 auto;padding:56px 20px 80px}

.hd{display:flex;flex-direction:column;gap:6px;margin-bottom:36px}
.hdSub{font-size:13px;font-weight:700;color:#888E9C;letter-spacing:.02em}
.hdTi{font-family:var(--font-serif),Georgia,serif;font-size:clamp(34px,5vw,52px);line-height:1.05;letter-spacing:-.035em;color:#2A1F14}
.hdBd{font-size:16px;line-height:1.6;color:#4A4F5C;max-width:560px;margin-top:10px}

.emptyCard{background:linear-gradient(180deg,#fff,#FDFBF7);border:1px solid #E3DDD2;border-radius:22px;padding:48px 32px;text-align:center;position:relative;overflow:hidden;margin-bottom:40px}
.emptyCard::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(201,149,107,.1),transparent 60%);pointer-events:none}
.emptyIc{width:72px;height:72px;border-radius:20px;background:linear-gradient(180deg,#FFF8F0,#F7E7D2);border:1px solid rgba(201,149,107,.22);display:flex;align-items:center;justify-content:center;color:#A07545;margin:0 auto 24px;box-shadow:0 10px 28px rgba(201,149,107,.18);position:relative;z-index:1}
.emptyTi{font-family:var(--font-serif),Georgia,serif;font-size:clamp(26px,3.4vw,32px);line-height:1.1;letter-spacing:-.03em;color:#2A1F14;margin-bottom:12px;position:relative;z-index:1}
.emptyBd{font-size:15.5px;line-height:1.6;color:#4A4F5C;max-width:460px;margin:0 auto 26px;position:relative;z-index:1}
.emptyActs{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;position:relative;z-index:1}

.primaryBtn{display:inline-flex;align-items:center;gap:8px;padding:0 22px;height:46px;background:#08090C;color:#fff;border:none;border-radius:11px;font-size:14.5px;font-weight:700;cursor:pointer;transition:all .2s;white-space:nowrap}
.primaryBtn:hover{background:#1a1a1e;transform:translateY(-1px);box-shadow:0 10px 24px rgba(0,0,0,.16)}
.secBtn{display:inline-flex;align-items:center;gap:8px;padding:0 20px;height:46px;background:#fff;color:#2A1F14;border:1px solid #E3DDD2;border-radius:11px;font-size:14.5px;font-weight:700;cursor:pointer;transition:all .2s;white-space:nowrap}
.secBtn:hover{border-color:#2A1F14}

.checklist{background:#fff;border:1px solid #E3DDD2;border-radius:16px;overflow:hidden}
.checkHd{padding:20px 24px;border-bottom:1px solid #EDE8DF;display:flex;align-items:center;justify-content:space-between;gap:12px}
.checkTi{font-size:15.5px;font-weight:800;letter-spacing:-.015em;color:#2A1F14}
.checkProgress{font-size:12px;font-weight:700;color:#888E9C;letter-spacing:.02em}
.checkList{display:flex;flex-direction:column}
.checkItem{display:flex;align-items:center;gap:14px;padding:18px 24px;border-bottom:1px solid #EDE8DF;cursor:pointer;transition:background .15s;text-align:left;background:none;border-left:none;border-right:none;border-top:none;width:100%;font-family:inherit}
.checkItem:last-child{border-bottom:none}
.checkItem:hover{background:#FAF7F2}
.checkIc{width:26px;height:26px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;border:1.5px solid #D4CCBE;color:#D4CCBE;background:#fff;transition:all .2s}
.checkItemDone .checkIc{background:#22C55E;border-color:#22C55E;color:#fff}
.checkBody{flex:1;min-width:0}
.checkItemTi{font-size:14.5px;font-weight:700;color:#2A1F14;letter-spacing:-.01em}
.checkItemDone .checkItemTi{color:#888E9C;text-decoration:line-through;text-decoration-color:rgba(136,142,156,.5)}
.checkItemBd{font-size:13px;color:#4A4F5C;margin-top:3px;line-height:1.5}
.checkItemCta{font-size:12.5px;font-weight:700;color:#2A1F14;padding:7px 14px;border:1px solid #E3DDD2;border-radius:8px;background:#fff;cursor:pointer;transition:all .2s;flex-shrink:0}
.checkItemCta:hover{border-color:#2A1F14}
.checkItemDone .checkItemCta{opacity:.4}

.foot{margin-top:48px;padding-top:20px;border-top:1px solid #EDE8DF;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;font-size:12.5px;color:#888E9C}
.foot a{color:#4A4F5C;font-weight:600;transition:color .2s}
.foot a:hover{color:#2A1F14}
.footLinks{display:flex;gap:18px}

@media(min-width:820px){.navTabs{display:flex}.navDiv{display:block}.userChipName{display:inline}}
`;

// These would come from your DB in production — stubbed to false for empty-state demo
const checklistSeed = [
  { id: "create", title: "Create your first request", body: "A request is anything recurring you need to coordinate across people.", cta: "Create", done: false },
  { id: "invite", title: "Invite a teammate", body: "Share your workspace with the people who own follow-through with you.", cta: "Invite", done: false },
  { id: "connect", title: "Connect a notification channel", body: "Pick how Omela reaches you when something needs attention.", cta: "Connect", done: false },
];

export default async function PortalPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const firstName = getFirstName(session.user.name);
  const displayName = session.user.name ?? "Your workspace";
  const displayImage = session.user.image ?? null;

  const completed = checklistSeed.filter(i => i.done).length;

  return (
    <main className={`${dmSans.variable} ${instrumentSerif.variable}`}>
      <style>{CSS}</style>

      <nav className="nav">
        <div className="navR">
          <Link href="/" className="brand">
            <div className="logoW"><Image src="/omela-logo-mark.png" alt="Omela" width={32} height={32} style={{width:"100%",height:"100%",objectFit:"contain"}} priority /></div>
            <span className="brandName">Omela</span>
          </Link>
          <div className="navDiv" />
          <div className="navTabs">
            <button className="navTab navTabActive">Overview</button>
            <button className="navTab">Requests</button>
            <button className="navTab">Contacts</button>
            <button className="navTab">Activity</button>
          </div>
          <div className="navRight">
            <button type="button" className="navIcBtn" aria-label="Help"><HelpCircle size={16} /></button>
            <button type="button" className="navIcBtn" aria-label="Settings"><Settings size={16} /></button>
            <button type="button" className="navIcBtn" aria-label="Notifications"><Bell size={16} /></button>
            <div className="userChip">
              <div className="userAv">{displayImage ? <Image src={displayImage} alt={displayName} width={28} height={28} /> : getInitial(displayName)}</div>
              <span className="userChipName">{displayName}</span>
            </div>
            <form action={async () => { "use server"; await signOut({ redirectTo: "/login" }); }}>
              <button type="submit" className="signOutBtn" aria-label="Sign out"><LogOut size={15} /></button>
            </form>
          </div>
        </div>
      </nav>

      <div className="shell">
        <div className="hd">
          <span className="hdSub">Overview</span>
          <h1 className="hdTi serif">Hi {firstName}.</h1>
          <p className="hdBd">Your workspace is empty. Take three steps below and you&apos;ll have a working coordination layer ready to run.</p>
        </div>

        <div className="emptyCard">
          <div className="emptyIc"><Inbox size={28} strokeWidth={1.8} /></div>
          <h2 className="emptyTi serif">Nothing here yet.</h2>
          <p className="emptyBd">Create your first request, or bring a teammate in to set things up together.</p>
          <div className="emptyActs">
            <button type="button" className="primaryBtn"><Plus size={16} />Create first request</button>
            <button type="button" className="secBtn"><UserPlus size={16} />Invite a teammate</button>
          </div>
        </div>

        <div className="checklist">
          <div className="checkHd">
            <span className="checkTi">Get set up</span>
            <span className="checkProgress">{completed} of {checklistSeed.length} complete</span>
          </div>
          <div className="checkList">
            {checklistSeed.map(item => (
              <button key={item.id} type="button" className={`checkItem ${item.done ? "checkItemDone" : ""}`}>
                <span className="checkIc">{item.done ? <Check size={14} strokeWidth={3} /> : <Circle size={14} strokeWidth={0} fill="none" />}</span>
                <div className="checkBody">
                  <div className="checkItemTi">{item.title}</div>
                  <div className="checkItemBd">{item.body}</div>
                </div>
                <span className="checkItemCta">{item.cta}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="foot">
          <span>Signed in as {displayName}</span>
          <div className="footLinks">
            <a href="mailto:hello@omela.ai">Support</a>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
