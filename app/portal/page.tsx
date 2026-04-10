import Image from "next/image";
import Link from "next/link";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import {
  Search,
  Bell,
  LogOut,
  Plus,
  ChevronRight,
  AlertCircle,
  Clock,
  CheckCircle2,
  Package,
  Filter,
} from "lucide-react";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  weight: ["400", "500", "600", "700", "800"],
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
});

// ── Single source of truth: 12 residents, rich realistic data ──
type Urgency = "critical" | "warning" | "ok";
type Stage = "draft" | "submitted" | "approved" | "dispensed" | "ready" | "delayed";

type Refill = {
  id: string;
  resident: string;
  initials: string;
  room: string;
  medication: string;
  strength: string;
  dose: string;
  daysLeft: number;
  stage: Stage;
  pharmacy: string;
  practice: string;
  owner: string;
  updated: string;
  tone: "warm" | "blue" | "green";
};

const refills: Refill[] = [
  { id: "RX-20814", resident: "Margaret Littlewood", initials: "ML", room: "Room 04", medication: "Amlodipine", strength: "5mg", dose: "Once daily", daysLeft: 2, stage: "delayed", pharmacy: "Boots, High St", practice: "Greenfield Medical", owner: "Ada Kelly", updated: "3 days ago", tone: "warm" },
  { id: "RX-20819", resident: "David Reyes", initials: "DR", room: "Room 11", medication: "Metformin", strength: "500mg", dose: "Twice daily", daysLeft: 6, stage: "submitted", pharmacy: "Well, Market Sq", practice: "Northgate Surgery", owner: "Dr. Reyes", updated: "Today 10:15", tone: "blue" },
  { id: "RX-20806", resident: "Irene Kowalski", initials: "IK", room: "Room 07", medication: "Sertraline", strength: "50mg", dose: "Once daily", daysLeft: 14, stage: "ready", pharmacy: "Boots, High St", practice: "Hillside Practice", owner: "Jamie Marsh", updated: "Today 12:44", tone: "green" },
  { id: "RX-20821", resident: "Thomas Callahan", initials: "TC", room: "Room 02", medication: "Ramipril", strength: "10mg", dose: "Once daily", daysLeft: 1, stage: "delayed", pharmacy: "Grove Pharmacy", practice: "Grove Lane Practice", owner: "Ada Kelly", updated: "5 days ago", tone: "warm" },
  { id: "RX-20825", resident: "Sylvia Drummond", initials: "SD", room: "Room 09", medication: "Atorvastatin", strength: "40mg", dose: "Each evening", daysLeft: 7, stage: "approved", pharmacy: "Day Lewis, King St", practice: "Oakwood GP", owner: "Dr. Reyes", updated: "Today 09:20", tone: "blue" },
  { id: "RX-20827", resident: "George Nkemdirim", initials: "GN", room: "Room 14", medication: "Bisoprolol", strength: "5mg", dose: "Once daily", daysLeft: 9, stage: "draft", pharmacy: "LloydsPharmacy", practice: "Northgate Surgery", owner: "Jamie Marsh", updated: "Yesterday", tone: "green" },
  { id: "RX-20830", resident: "Beatrice Ofori", initials: "BO", room: "Room 05", medication: "Levothyroxine", strength: "75mcg", dose: "Before food", daysLeft: 4, stage: "submitted", pharmacy: "Boots, High St", practice: "Greenfield Medical", owner: "Ada Kelly", updated: "Yesterday", tone: "warm" },
  { id: "RX-20833", resident: "Henry Whitmore", initials: "HW", room: "Room 12", medication: "Omeprazole", strength: "20mg", dose: "Once daily", daysLeft: 18, stage: "ready", pharmacy: "Well, Market Sq", practice: "Hillside Practice", owner: "Dr. Reyes", updated: "Today 08:55", tone: "green" },
];

const stageLabels: Record<Stage, string> = {
  draft: "Draft",
  submitted: "Submitted",
  approved: "Approved",
  dispensed: "Dispensing",
  ready: "Ready",
  delayed: "Delayed",
};

const stats = [
  { label: "Due this week", value: "8", delta: "+2 from last week", tone: "warm" as const },
  { label: "Awaiting GP", value: "3", delta: "avg 2.1 days", tone: "blue" as const },
  { label: "Ready to collect", value: "2", delta: "in 4 pharmacies", tone: "green" as const },
  { label: "Delayed", value: "2", delta: "needs attention", tone: "red" as const },
];

const alerts = [
  { id: 1, priority: "critical" as const, resident: "Thomas Callahan", action: "Ramipril has 1 day of supply and no GP response in 5 days", meta: "Grove Lane Practice · Ada" },
  { id: 2, priority: "critical" as const, resident: "Margaret Littlewood", action: "Amlodipine follow-up overdue, practice has not acknowledged request", meta: "Greenfield Medical · Ada" },
  { id: 3, priority: "info" as const, resident: "George Nkemdirim", action: "Draft prepared and ready for review", meta: "Jamie Marsh · Northgate" },
  { id: 4, priority: "info" as const, resident: "Irene Kowalski", action: "Ready at Boots, assign collection before 18:00", meta: "Jamie Marsh · High Street" },
];

function getInitial(v?: string | null) {
  return v?.trim().charAt(0).toUpperCase() ?? "O";
}

const CSS = `
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#F8F6F1;color:#2A1F14;font-family:var(--font-dm),Arial,sans-serif;-webkit-font-smoothing:antialiased;font-size:14px}
a{color:inherit;text-decoration:none}
button,input,select{font-family:inherit}
::selection{background:#2563EB;color:#fff}
.serif{font-family:var(--font-serif),Georgia,serif}

/* ============ Top bar ============ */
.nav{position:sticky;top:0;z-index:100;background:rgba(248,246,241,.95);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid #E3DDD2}
.navR{max-width:1320px;margin:0 auto;padding:0 24px;display:flex;align-items:center;gap:20px;height:60px}
.brand{display:flex;align-items:center;gap:10px;flex-shrink:0}
.logoW{width:30px;height:30px;flex-shrink:0}
.brandName{font-family:var(--font-serif),Georgia,serif;font-size:20px;letter-spacing:-.025em;color:#2A1F14}
.navDiv{width:1px;height:24px;background:#E3DDD2;flex-shrink:0}
.navTabs{display:none;align-items:center;gap:4px;flex:1}
.navTab{padding:8px 14px;font-size:13px;font-weight:600;color:#4A4F5C;border-radius:8px;transition:all .2s;cursor:pointer}
.navTab:hover{background:rgba(227,221,210,.5);color:#2A1F14}
.navTabActive{background:#fff;color:#2A1F14;border:1px solid #E3DDD2;box-shadow:0 1px 3px rgba(0,0,0,.03)}
.navRight{display:flex;align-items:center;gap:10px;margin-left:auto}
.navIcBtn{width:34px;height:34px;border-radius:9px;border:1px solid #E3DDD2;background:#fff;display:flex;align-items:center;justify-content:center;color:#4A4F5C;cursor:pointer;transition:all .2s;position:relative}
.navIcBtn:hover{border-color:#2A1F14;color:#2A1F14}
.navIcBtnDot{position:absolute;top:7px;right:7px;width:7px;height:7px;border-radius:50%;background:#EF4444;border:2px solid #fff}
.userChip{display:flex;align-items:center;gap:9px;padding:5px 12px 5px 5px;border:1px solid #E3DDD2;background:#fff;border-radius:999px;cursor:pointer;transition:all .2s}
.userChip:hover{border-color:#2A1F14}
.userAv{width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#F7E7D2,#F0D5B6);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:#A07545;overflow:hidden;flex-shrink:0}
.userAv img{width:100%;height:100%;object-fit:cover}
.userChipName{display:none;font-size:12.5px;font-weight:700;color:#2A1F14;max-width:130px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.signOutBtn{background:none;border:none;cursor:pointer;display:flex;align-items:center;gap:5px;padding:8px 10px;font-size:12.5px;font-weight:600;color:#4A4F5C;border-radius:8px;transition:all .2s}
.signOutBtn:hover{color:#2A1F14;background:rgba(227,221,210,.5)}

/* ============ Shell ============ */
.shell{max-width:1320px;margin:0 auto;padding:28px 24px 64px}

.pageHead{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;margin-bottom:24px;flex-wrap:wrap}
.pageHeadL h1{font-family:var(--font-serif),Georgia,serif;font-size:clamp(28px,3.5vw,36px);letter-spacing:-.035em;color:#2A1F14;line-height:1.1}
.pageHeadSub{margin-top:6px;font-size:13.5px;color:#4A4F5C;font-weight:500}
.pageHeadR{display:flex;align-items:center;gap:10px}
.searchBox{display:flex;align-items:center;gap:8px;padding:0 14px;height:38px;background:#fff;border:1px solid #E3DDD2;border-radius:10px;min-width:240px;transition:all .2s}
.searchBox:focus-within{border-color:#2A1F14;box-shadow:0 0 0 3px rgba(42,31,20,.06)}
.searchBox input{flex:1;border:none;outline:none;background:none;font-size:13px;color:#2A1F14}
.searchBox input::placeholder{color:#888E9C}
.primaryBtn{display:inline-flex;align-items:center;gap:6px;padding:0 16px;height:38px;background:#08090C;color:#fff;border:none;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;transition:all .2s;white-space:nowrap}
.primaryBtn:hover{background:#1a1a1e;transform:translateY(-1px);box-shadow:0 6px 18px rgba(0,0,0,.12)}

/* ============ Stat row ============ */
.statRow{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-bottom:20px}
.statC{padding:18px 20px;background:#fff;border:1px solid #E3DDD2;border-radius:14px;position:relative;overflow:hidden}
.statC::before{content:"";position:absolute;left:0;top:12px;bottom:12px;width:3px;border-radius:0 3px 3px 0}
.statC--warm::before{background:#C9956B}
.statC--blue::before{background:#2563EB}
.statC--green::before{background:#22C55E}
.statC--red::before{background:#EF4444}
.statLbl{font-size:10.5px;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#888E9C}
.statVal{margin-top:8px;font-family:var(--font-serif),Georgia,serif;font-size:40px;line-height:1;letter-spacing:-.035em;color:#2A1F14}
.statDelta{margin-top:6px;font-size:11.5px;color:#4A4F5C;font-weight:500}

/* ============ Grid ============ */
.mainGrid{display:grid;grid-template-columns:1fr;gap:20px}

/* ============ Card base ============ */
.card{background:#fff;border:1px solid #E3DDD2;border-radius:16px;overflow:hidden}
.cardHd{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:18px 22px;border-bottom:1px solid #EDE8DF}
.cardTi{font-size:15px;font-weight:800;letter-spacing:-.015em;color:#2A1F14;display:flex;align-items:center;gap:8px}
.cardCount{display:inline-flex;align-items:center;justify-content:center;min-width:22px;height:22px;padding:0 7px;background:#F2EDE4;color:#4A4F5C;border-radius:999px;font-size:11px;font-weight:800}
.cardAct{display:flex;align-items:center;gap:6px}
.cardActBtn{display:inline-flex;align-items:center;gap:5px;padding:6px 11px;background:none;border:1px solid #E3DDD2;border-radius:8px;font-size:11.5px;font-weight:600;color:#4A4F5C;cursor:pointer;transition:all .2s}
.cardActBtn:hover{border-color:#2A1F14;color:#2A1F14}

/* ============ Alerts ============ */
.alertList{display:flex;flex-direction:column}
.alertItem{display:flex;align-items:flex-start;gap:12px;padding:16px 22px;border-bottom:1px solid #EDE8DF;transition:background .15s}
.alertItem:last-child{border-bottom:none}
.alertItem:hover{background:#FAF7F2}
.alertIc{width:32px;height:32px;border-radius:9px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.alertIc--critical{background:#FEF2F2;color:#B91C1C}
.alertIc--info{background:#ECF2FF;color:#2563EB}
.alertBody{flex:1;min-width:0}
.alertTop{display:flex;align-items:center;gap:8px;margin-bottom:3px}
.alertName{font-size:13px;font-weight:800;color:#2A1F14;letter-spacing:-.01em}
.alertTag{font-size:9px;font-weight:800;letter-spacing:.09em;text-transform:uppercase;padding:2px 7px;border-radius:4px}
.alertTag--critical{background:#FEF2F2;color:#B91C1C}
.alertTag--info{background:#ECF2FF;color:#2563EB}
.alertAction{font-size:12.5px;color:#4A4F5C;line-height:1.5}
.alertMeta{margin-top:4px;font-size:11px;color:#888E9C;font-weight:500}
.alertChev{color:#888E9C;flex-shrink:0;align-self:center}

/* ============ Refill table ============ */
.tableWrap{overflow-x:auto}
.tbl{width:100%;border-collapse:collapse;min-width:760px}
.tbl thead th{font-size:10px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#888E9C;padding:12px 18px;text-align:left;background:#FAF7F2;border-bottom:1px solid #EDE8DF}
.tbl thead th:last-child{text-align:right;padding-right:22px}
.tbl tbody tr{border-bottom:1px solid #F2EDE4;transition:background .14s}
.tbl tbody tr:last-child{border-bottom:none}
.tbl tbody tr:hover{background:#FAF7F2;cursor:pointer}
.tbl td{padding:14px 18px;vertical-align:middle}
.tbl td:last-child{text-align:right;padding-right:22px}

.tblRes{display:flex;align-items:center;gap:11px}
.tblAv{width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex-shrink:0}
.tblAv--warm{background:linear-gradient(135deg,#F7E7D2,#F0D5B6);color:#A07545}
.tblAv--blue{background:linear-gradient(135deg,#E3EDFB,#C9DBF6);color:#1E40AF}
.tblAv--green{background:linear-gradient(135deg,#DFF3E4,#C7E8CF);color:#15803D}
.tblResTx{min-width:0}
.tblResNm{font-size:13px;font-weight:800;color:#2A1F14;letter-spacing:-.015em;white-space:nowrap}
.tblResRoom{font-size:11px;color:#888E9C;font-weight:600;margin-top:1px}
.tblMed{font-size:13px;font-weight:700;color:#2A1F14}
.tblMedDose{font-size:11px;color:#888E9C;margin-top:2px;font-weight:500}
.tblRxId{font-size:11px;color:#888E9C;font-family:var(--font-dm),monospace;font-variant-numeric:tabular-nums;font-weight:600}
.tblDays{display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:999px;font-size:11px;font-weight:800;border:1px solid}
.tblDaysDot{width:5px;height:5px;border-radius:50%}
.tblDays--critical{background:#FEF2F2;color:#B91C1C;border-color:rgba(185,28,28,.15)}
.tblDays--critical .tblDaysDot{background:#B91C1C}
.tblDays--warning{background:#FFF8F0;color:#A07545;border-color:rgba(160,117,69,.18)}
.tblDays--warning .tblDaysDot{background:#C9956B}
.tblDays--ok{background:#ECFDF3;color:#15803D;border-color:rgba(21,128,61,.15)}
.tblDays--ok .tblDaysDot{background:#22C55E}

.stagePill{display:inline-flex;align-items:center;gap:5px;padding:4px 9px;border-radius:6px;font-size:10.5px;font-weight:800;letter-spacing:.02em;border:1px solid}
.stage--draft{background:#F2EDE4;color:#4A4F5C;border-color:#E3DDD2}
.stage--submitted{background:#FFF8F0;color:#A07545;border-color:rgba(201,149,107,.2)}
.stage--approved{background:#ECF2FF;color:#2563EB;border-color:rgba(37,99,235,.14)}
.stage--dispensed{background:#EFF6FF;color:#1D4ED8;border-color:rgba(29,78,216,.14)}
.stage--ready{background:#ECFDF3;color:#15803D;border-color:rgba(34,197,94,.2)}
.stage--delayed{background:#FEF2F2;color:#B91C1C;border-color:rgba(185,28,28,.16)}

/* ============ Responsive ============ */
@media(min-width:720px){
  .statRow{grid-template-columns:repeat(4,1fr)}
  .userChipName{display:block}
  .navTabs{display:flex}
}
@media(min-width:1080px){
  .mainGrid{grid-template-columns:1.65fr 1fr}
}
`;

function urgency(days: number): Urgency {
  if (days <= 2) return "critical";
  if (days <= 7) return "warning";
  return "ok";
}

function urgencyLabel(days: number) {
  if (days === 1) return "1 day";
  return `${days} days`;
}

export default async function PortalPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const displayName = session.user.name ?? "Care team";
  const displayImage = session.user.image ?? null;

  return (
    <main className={`${dmSans.variable} ${instrumentSerif.variable}`}>
      <style>{CSS}</style>

      <nav className="nav">
        <div className="navR">
          <Link href="/" className="brand">
            <div className="logoW">
              <Image
                src="/omela-logo-mark.png"
                alt="Omela"
                width={30}
                height={30}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                priority
              />
            </div>
            <span className="brandName">Omela</span>
          </Link>

          <div className="navDiv" />

          <div className="navTabs">
            <span className="navTab navTabActive">Overview</span>
            <span className="navTab">Residents</span>
            <span className="navTab">Requests</span>
            <span className="navTab">Pharmacies</span>
            <span className="navTab">Activity</span>
          </div>

          <div className="navRight">
            <button type="button" className="navIcBtn" aria-label="Notifications">
              <Bell size={15} />
              <span className="navIcBtnDot" />
            </button>

            <div className="userChip">
              <div className="userAv">
                {displayImage ? (
                  <Image src={displayImage} alt={displayName} width={26} height={26} />
                ) : (
                  getInitial(displayName)
                )}
              </div>
              <span className="userChipName">{displayName}</span>
            </div>

            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/login" });
              }}
            >
              <button type="submit" className="signOutBtn" aria-label="Sign out">
                <LogOut size={14} />
              </button>
            </form>
          </div>
        </div>
      </nav>

      <div className="shell">
        <div className="pageHead">
          <div className="pageHeadL">
            <h1 className="serif">Overview</h1>
            <p className="pageHeadSub">
              {refills.length} active requests across 4 pharmacies and 3 practices
            </p>
          </div>
          <div className="pageHeadR">
            <div className="searchBox">
              <Search size={14} color="#888E9C" />
              <input type="text" placeholder="Search residents, requests..." />
            </div>
            <button type="button" className="primaryBtn">
              <Plus size={14} />
              New request
            </button>
          </div>
        </div>

        <div className="statRow">
          {stats.map((s) => (
            <div key={s.label} className={`statC statC--${s.tone}`}>
              <div className="statLbl">{s.label}</div>
              <div className="statVal">{s.value}</div>
              <div className="statDelta">{s.delta}</div>
            </div>
          ))}
        </div>

        <div className="mainGrid">
          {/* Active requests table */}
          <div className="card">
            <div className="cardHd">
              <div className="cardTi">
                Active requests
                <span className="cardCount">{refills.length}</span>
              </div>
              <div className="cardAct">
                <button type="button" className="cardActBtn">
                  <Filter size={12} />
                  Filter
                </button>
                <button type="button" className="cardActBtn">
                  Sort
                  <ChevronRight size={12} />
                </button>
              </div>
            </div>
            <div className="tableWrap">
              <table className="tbl">
                <thead>
                  <tr>
                    <th>Resident</th>
                    <th>Medication</th>
                    <th>Request</th>
                    <th>Stage</th>
                    <th>Supply</th>
                  </tr>
                </thead>
                <tbody>
                  {refills.map((r) => {
                    const u = urgency(r.daysLeft);
                    return (
                      <tr key={r.id}>
                        <td>
                          <div className="tblRes">
                            <div className={`tblAv tblAv--${r.tone}`}>{r.initials}</div>
                            <div className="tblResTx">
                              <div className="tblResNm">{r.resident}</div>
                              <div className="tblResRoom">{r.room}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="tblMed">
                            {r.medication} {r.strength}
                          </div>
                          <div className="tblMedDose">{r.dose}</div>
                        </td>
                        <td>
                          <div className="tblRxId">{r.id}</div>
                          <div className="tblMedDose">{r.updated}</div>
                        </td>
                        <td>
                          <span className={`stagePill stage--${r.stage}`}>
                            {stageLabels[r.stage]}
                          </span>
                        </td>
                        <td>
                          <span className={`tblDays tblDays--${u}`}>
                            <span className="tblDaysDot" />
                            {urgencyLabel(r.daysLeft)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Needs attention */}
          <div className="card">
            <div className="cardHd">
              <div className="cardTi">
                Needs attention
                <span className="cardCount">{alerts.length}</span>
              </div>
              <button type="button" className="cardActBtn">
                View all
                <ChevronRight size={12} />
              </button>
            </div>
            <div className="alertList">
              {alerts.map((a) => {
                const Icon = a.priority === "critical" ? AlertCircle : CheckCircle2;
                return (
                  <div key={a.id} className="alertItem">
                    <div className={`alertIc alertIc--${a.priority}`}>
                      <Icon size={15} />
                    </div>
                    <div className="alertBody">
                      <div className="alertTop">
                        <span className="alertName">{a.resident}</span>
                        <span className={`alertTag alertTag--${a.priority}`}>
                          {a.priority === "critical" ? "Urgent" : "Review"}
                        </span>
                      </div>
                      <div className="alertAction">{a.action}</div>
                      <div className="alertMeta">{a.meta}</div>
                    </div>
                    <ChevronRight size={15} className="alertChev" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
