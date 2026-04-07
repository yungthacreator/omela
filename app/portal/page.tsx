import Image from "next/image";
import Link from "next/link";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import {
  ArrowRight,
  AlertTriangle,
  Bell,
  CheckCircle2,
  ChevronRight,
  FileText,
  LogOut,
  PackageCheck,
  RefreshCw,
  ShieldCheck,
  Truck,
  Pill,
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
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const overviewStats = [
  { label: "Due this week", value: "9", sub: "need refill soon" },
  { label: "Waiting on GP", value: "4", sub: "submitted" },
  { label: "Ready", value: "3", sub: "at pharmacy" },
  { label: "Needs action", value: "5", sub: "today" },
];

const dueSoon = [
  {
    resident: "Evelyn Marsh",
    room: "Room 4",
    medication: "Amlodipine",
    strength: "10mg",
    form: "Tablet",
    instruction: "Once daily",
    daysLeft: 2,
    urgency: "critical",
  },
  {
    resident: "Bernard Okafor",
    room: "Room 11",
    medication: "Metformin",
    strength: "500mg",
    form: "MR tablet",
    instruction: "Twice daily with meals",
    daysLeft: 4,
    urgency: "high",
  },
  {
    resident: "Irene Whitfield",
    room: "Room 7",
    medication: "Levothyroxine",
    strength: "75 mcg",
    form: "Tablet",
    instruction: "Once daily before food",
    daysLeft: 5,
    urgency: "high",
  },
  {
    resident: "Thomas Callahan",
    room: "Room 2",
    medication: "Ramipril",
    strength: "10mg",
    form: "Capsule",
    instruction: "Once daily",
    daysLeft: 6,
    urgency: "medium",
  },
  {
    resident: "Sylvia Drummond",
    room: "Room 9",
    medication: "Atorvastatin",
    strength: "40mg",
    form: "Tablet",
    instruction: "Each evening",
    daysLeft: 7,
    urgency: "medium",
  },
  {
    resident: "George Nkemdirim",
    room: "Room 14",
    medication: "Bisoprolol fumarate",
    strength: "5mg",
    form: "Tablet",
    instruction: "Once daily with food",
    daysLeft: 7,
    urgency: "medium",
  },
];

const pipeline = [
  {
    resident: "Evelyn Marsh",
    medication: "Amlodipine 10mg",
    stage: "ready" as const,
    stageLabel: "Ready to collect",
    pharmacy: "Boots, 12 High Street",
    updated: "Today, 10:44am",
  },
  {
    resident: "Bernard Okafor",
    medication: "Metformin 500mg MR",
    stage: "approved" as const,
    stageLabel: "GP approved",
    pharmacy: "LloydsPharmacy, Park Rd",
    updated: "Today, 9:12am",
  },
  {
    resident: "Irene Whitfield",
    medication: "Sertraline 50mg",
    stage: "submitted" as const,
    stageLabel: "Submitted to GP",
    pharmacy: "Boots, 12 High Street",
    updated: "Yesterday, 3:30pm",
  },
  {
    resident: "Sylvia Drummond",
    medication: "Omeprazole 20mg",
    stage: "transit" as const,
    stageLabel: "Out for delivery",
    pharmacy: "Day Lewis, King St",
    updated: "Today, 8:55am",
  },
  {
    resident: "Thomas Callahan",
    medication: "Ramipril 10mg",
    stage: "delayed" as const,
    stageLabel: "Delayed 72 hrs",
    pharmacy: "Grove Pharmacy",
    updated: "Mon, 2:00pm",
  },
];

const actionQueue = [
  {
    priority: "urgent" as const,
    tag: "Overdue",
    title: "Thomas Callahan",
    body: "Ramipril 10mg has no GP response. Chase Grove Lane Practice.",
    Icon: AlertTriangle,
  },
  {
    priority: "action" as const,
    tag: "Review",
    title: "Two drafts ready",
    body: "George Nkemdirim and Sylvia Drummond are ready for sign-off.",
    Icon: FileText,
  },
  {
    priority: "action" as const,
    tag: "Confirm",
    title: "Collection needed",
    body: "Evelyn Marsh is ready at Boots. Assign pickup or delivery.",
    Icon: PackageCheck,
  },
  {
    priority: "info" as const,
    tag: "Note",
    title: "Levothyroxine timing",
    body: "Take before food. Add to the morning handover note.",
    Icon: Bell,
  },
];

const recentActivity = [
  {
    label: "Prescription ready",
    note: "Amlodipine 10mg ready for Evelyn Marsh.",
    time: "10:44am",
    type: "success" as const,
  },
  {
    label: "GP approved",
    note: "Metformin 500mg approved for Bernard Okafor.",
    time: "9:12am",
    type: "success" as const,
  },
  {
    label: "Out for delivery",
    note: "Omeprazole 20mg dispatched for Sylvia Drummond.",
    time: "8:55am",
    type: "info" as const,
  },
  {
    label: "Draft prepared",
    note: "Bisoprolol 5mg drafted for George Nkemdirim.",
    time: "Yesterday",
    type: "neutral" as const,
  },
  {
    label: "Reminder sent",
    note: "6 medications flagged within 7 days.",
    time: "Yesterday",
    type: "neutral" as const,
  },
];

function getInitial(v?: string | null) {
  return v?.trim().charAt(0).toUpperCase() ?? "O";
}

function urgencyLabel(days: number) {
  if (days <= 2) return `${days}d urgent`;
  if (days === 1) return "1 day left";
  return `${days} days left`;
}

const PIPE_ICONS = {
  ready: CheckCircle2,
  approved: ShieldCheck,
  submitted: RefreshCw,
  transit: Truck,
  delayed: AlertTriangle,
};

const CSS = `
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{
  background:#F8F6F1;color:#111214;
  font-family:var(--font-dm),-apple-system,sans-serif;
  -webkit-font-smoothing:antialiased;font-size:15px;
}
a{color:inherit;text-decoration:none}
button,input,select{font-family:inherit}

.nav{
  position:sticky;top:0;z-index:100;
  background:rgba(248,246,241,0.94);
  backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
  border-bottom:1px solid rgba(227,221,210,0.55);
}
.navR{
  max-width:1200px;margin:0 auto;padding:0 28px;
  display:flex;align-items:center;justify-content:space-between;
  height:62px;gap:12px;
}
.brand{display:flex;align-items:center;gap:9px;flex-shrink:0}
.logoW{
  width:32px;height:32px;overflow:hidden;
  flex-shrink:0;background:transparent;
}
.brandName{font-size:16px;font-weight:800;letter-spacing:-.03em}
.navMid{display:flex;align-items:center;gap:22px}
.navLink{font-size:13px;font-weight:600;color:#4A4F5C}
.navRight{display:flex;align-items:center;gap:10px}
.homeBtn{display:inline-flex;align-items:center;gap:5px;font-size:13px;font-weight:600;color:#4A4F5C}
.signOutBtn{
  display:inline-flex;align-items:center;gap:7px;
  height:38px;padding:0 16px;
  background:#08090C;color:#fff;
  border:none;border-radius:999px;
  font-size:13px;font-weight:700;cursor:pointer;
  box-shadow:0 2px 8px rgba(0,0,0,0.10);
  transition:transform .2s,box-shadow .2s;
}
.signOutBtn:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(0,0,0,0.14)}

.shell{max-width:1200px;margin:0 auto;padding:36px 28px 80px}

.heroBand{display:grid;grid-template-columns:1fr 304px;gap:18px;margin-bottom:18px}
.heroMain{
  background:#fff;border:1px solid #E3DDD2;border-radius:28px;
  padding:40px 44px 36px;position:relative;overflow:hidden;
}
.heroMain::after{
  content:"";position:absolute;inset:0;pointer-events:none;
  background:
    radial-gradient(ellipse at top right,rgba(201,149,107,0.08),transparent 32%),
    radial-gradient(ellipse at bottom left,rgba(37,99,235,0.03),transparent 28%);
}
.heroTitle{
  font-family:var(--font-serif),Georgia,serif;
  font-size:clamp(42px,5.8vw,74px);
  line-height:.92;letter-spacing:-.055em;font-weight:400;
  color:#111214;max-width:700px;margin-bottom:14px;
  position:relative;z-index:1;
}
.heroTitle em{font-style:italic;color:#2563EB}
.heroSub{
  font-size:15.5px;line-height:1.72;color:#4A4F5C;
  max-width:520px;margin-bottom:30px;
  position:relative;z-index:1;
}
.statsRow{display:grid;grid-template-columns:repeat(4,1fr);gap:13px;position:relative;z-index:1}
.statBox{
  background:#F2EDE4;border:1px solid #E3DDD2;
  border-radius:20px;padding:18px 18px 15px;
}
.statLbl{font-size:10px;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#888E9C;margin-bottom:10px}
.statVal{font-size:36px;line-height:1;letter-spacing:-.055em;font-weight:800;color:#111214;margin-bottom:4px}
.statSub{font-size:11.5px;color:#888E9C}

.userCard{
  background:#fff;border:1px solid #E3DDD2;border-radius:28px;padding:26px;
  display:flex;flex-direction:column;
}
.avatar{
  width:58px;height:58px;border-radius:18px;
  background:linear-gradient(135deg,#F5E8D8,#EAD9C4);
  border:1px solid #E3DDD2;
  display:flex;align-items:center;justify-content:center;
  font-size:22px;font-weight:800;color:#C9956B;
  overflow:hidden;margin-bottom:18px;flex-shrink:0;
}
.avatarImg{width:100%;height:100%;object-fit:cover}
.userRole{font-size:10px;font-weight:800;letter-spacing:.10em;text-transform:uppercase;color:#888E9C;margin-bottom:5px}
.userName{font-size:17px;font-weight:800;letter-spacing:-.025em;color:#111214;margin-bottom:4px;line-height:1.2}
.userEmail{font-size:12.5px;color:#4A4F5C;word-break:break-word;line-height:1.5}
.secBadge{
  display:flex;align-items:center;gap:7px;
  margin-top:18px;padding-top:16px;
  border-top:1px solid #E3DDD2;
  font-size:12px;font-weight:700;color:#15803D;
}
.quickLinks{display:flex;flex-direction:column;gap:8px;margin-top:14px}
.quickLink{
  display:flex;align-items:center;justify-content:space-between;gap:10px;
  height:44px;padding:0 14px;
  background:#F2EDE4;border:1px solid #E3DDD2;border-radius:14px;
  font-size:12.5px;font-weight:600;color:#4A4F5C;
  cursor:pointer;transition:all .18s;
}
.quickLink:hover{border-color:#D4CCBE;color:#111214;background:#EDE8DF}

.contentGrid{display:grid;grid-template-columns:1.45fr 1fr;gap:18px}

.card{background:#fff;border:1px solid #E3DDD2;border-radius:24px;padding:30px 32px}
.cardEye{font-size:10px;font-weight:800;letter-spacing:.10em;text-transform:uppercase;color:#888E9C;margin-bottom:8px}
.cardTitle{
  font-family:var(--font-serif),Georgia,serif;
  font-size:26px;line-height:1.08;letter-spacing:-.035em;font-weight:400;
  color:#111214;margin-bottom:24px;
}
.cardTitle em{font-style:italic;color:#C9956B}

.medTable{width:100%;border-collapse:collapse}
.medTable thead th{
  font-size:9.5px;font-weight:800;letter-spacing:.10em;text-transform:uppercase;
  color:#888E9C;padding:0 14px 12px 0;text-align:left;
  border-bottom:1px solid #E3DDD2;
}
.medTable thead th:last-child{text-align:right;padding-right:0}
.medTable tbody tr{border-bottom:1px solid rgba(227,221,210,0.55);transition:background .14s}
.medTable tbody tr:last-child{border-bottom:none}
.medTable tbody tr:hover{background:rgba(242,237,228,0.5)}
.medTable td{padding:14px 14px 14px 0;vertical-align:middle}
.medTable td:last-child{text-align:right;padding-right:0}

.resName{font-size:13.5px;font-weight:800;letter-spacing:-.015em;color:#111214;display:block;margin-bottom:1px}
.resRoom{font-size:11px;color:#888E9C;font-weight:600}
.medName{font-size:13.5px;font-weight:800;letter-spacing:-.015em;color:#111214;display:block}
.medStrPill{
  display:inline-flex;align-items:center;
  background:#F2EDE4;border:1px solid #E3DDD2;border-radius:5px;
  padding:1px 6px;font-size:10px;font-weight:700;color:#4A4F5C;
  letter-spacing:.02em;margin-top:2px;
}
.medForm{font-size:11px;color:#888E9C;display:block;margin-top:2px}
.medInstr{font-size:11.5px;color:#888E9C;line-height:1.45;max-width:180px}
.urgBadge{
  display:inline-flex;align-items:center;justify-content:center;
  padding:5px 12px;border-radius:999px;
  font-size:11.5px;font-weight:800;white-space:nowrap;border:1px solid;
}
.urg-critical{background:#FEF2F2;color:#DC2626;border-color:rgba(220,38,38,.15)}
.urg-high{background:#FFFBEB;color:#D97706;border-color:rgba(217,119,6,.15)}
.urg-medium{background:#ECFDF3;color:#15803D;border-color:rgba(34,197,94,.15)}

.queueList{display:flex;flex-direction:column;gap:10px}
.queueItem{
  padding:17px;border-radius:18px;
  border:1px solid #E3DDD2;background:#fff;
  transition:border-color .18s,box-shadow .18s;
}
.queueItem:hover{border-color:#D4CCBE;box-shadow:0 4px 16px rgba(0,0,0,0.03)}
.queueTop{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:8px}
.queueIconRow{display:flex;align-items:center;gap:9px}
.queueIconBox{
  width:30px;height:30px;border-radius:9px;flex-shrink:0;
  display:flex;align-items:center;justify-content:center;
}
.q-urgent .queueIconBox{background:#FEF2F2;color:#DC2626}
.q-action .queueIconBox{background:#FFF8F0;color:#C9956B}
.q-info .queueIconBox{background:#ECF2FF;color:#2563EB}
.queueItemTitle{font-size:13px;font-weight:800;letter-spacing:-.015em;color:#111214;line-height:1.3}
.queueTag{
  font-size:10px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;
  padding:3px 8px;border-radius:5px;flex-shrink:0;border:1px solid;
}
.qt-urgent{background:#FEF2F2;color:#DC2626;border-color:rgba(220,38,38,.15)}
.qt-action{background:#FFF8F0;color:#C9956B;border-color:rgba(201,149,107,.20)}
.qt-info{background:#ECF2FF;color:#2563EB;border-color:rgba(37,99,235,.12)}
.queueBody{font-size:12.5px;line-height:1.72;color:#4A4F5C;padding-left:39px}

.fullRow{margin-top:18px}
.fullRowGrid{display:grid;grid-template-columns:1.35fr 0.65fr;gap:18px}

.pipeList{display:flex;flex-direction:column;gap:10px}
.pipeItem{
  display:flex;align-items:center;gap:14px;
  padding:14px 16px;border-radius:16px;
  background:#F2EDE4;border:1px solid #E3DDD2;
  transition:border-color .18s;
}
.pipeItem:hover{border-color:#D4CCBE}
.pipeIconWrap{
  width:36px;height:36px;border-radius:11px;flex-shrink:0;
  display:flex;align-items:center;justify-content:center;
}
.pipeBody{flex:1;min-width:0}
.pipeMed{font-size:13px;font-weight:800;color:#111214;letter-spacing:-.015em}
.pipeRes{font-size:11.5px;color:#888E9C;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pipeRight{text-align:right;flex-shrink:0}
.pipeStatus{
  display:inline-flex;padding:3px 10px;border-radius:6px;
  font-size:10.5px;font-weight:800;letter-spacing:.02em;border:1px solid;
}
.pipeTime{font-size:10.5px;color:#888E9C;margin-top:4px;display:block}

.s-ready{background:#ECFDF3;color:#15803D;border-color:rgba(34,197,94,.2)}
.s-approved{background:#ECF2FF;color:#2563EB;border-color:rgba(37,99,235,.15)}
.s-submitted{background:#FFF8F0;color:#C9956B;border-color:rgba(201,149,107,.2)}
.s-transit{background:#EFF6FF;color:#1D4ED8;border-color:rgba(29,78,216,.12)}
.s-delayed{background:#FEF2F2;color:#DC2626;border-color:rgba(220,38,38,.15)}

.pi-ready{background:#ECFDF3;color:#15803D}
.pi-approved{background:#ECF2FF;color:#2563EB}
.pi-submitted{background:#FFF8F0;color:#C9956B}
.pi-transit{background:#EFF6FF;color:#1D4ED8}
.pi-delayed{background:#FEF2F2;color:#DC2626}

.actList{display:flex;flex-direction:column}
.actItem{
  display:grid;grid-template-columns:auto 1fr auto;
  gap:13px;align-items:start;
  padding:13px 0;border-bottom:1px solid rgba(227,221,210,0.6);
}
.actItem:last-child{border-bottom:none}
.actDotCol{padding-top:5px}
.actDot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.d-success{background:#22C55E;box-shadow:0 0 0 4px #ECFDF3}
.d-info{background:#2563EB;box-shadow:0 0 0 4px #ECF2FF}
.d-neutral{background:#D4CCBE}
.actLabel{font-size:13px;font-weight:800;letter-spacing:-.01em;color:#111214;margin-bottom:3px}
.actNote{font-size:12px;line-height:1.6;color:#4A4F5C}
.actTime{font-size:11px;color:#888E9C;padding-top:3px;white-space:nowrap;font-weight:600}

@media(max-width:1100px){
  .heroBand{grid-template-columns:1fr}
  .contentGrid{grid-template-columns:1fr}
  .fullRowGrid{grid-template-columns:1fr}
}
@media(max-width:880px){
  .statsRow{grid-template-columns:repeat(2,1fr)}
  .navMid{display:none}
}
@media(max-width:680px){
  .shell{padding:20px 16px 56px}
  .heroMain{padding:26px 22px}
  .heroTitle{font-size:50px}
  .card{padding:24px 20px}
  .statsRow{grid-template-columns:1fr 1fr}
}
@media(max-width:480px){
  .statsRow{grid-template-columns:1fr}
  .medTable thead{display:none}
  .medTable tbody tr{display:flex;flex-wrap:wrap;gap:8px;padding:14px 0;border-bottom:1px solid rgba(227,221,210,0.55)}
  .medTable td{padding:0;border:none}
}
`;

export default async function PortalPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const displayName = session.user.name ?? "Care organisation";
  const displayEmail = session.user.email ?? "";
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
                width={32}
                height={32}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                priority
              />
            </div>
            <span className="brandName">Omela</span>
          </Link>

          <div className="navMid">
            <span className="navLink">Residents</span>
            <span className="navLink">Requests</span>
            <span className="navLink">Prescriptions</span>
          </div>

          <div className="navRight">
            <Link href="/" className="homeBtn">
              Back to home <ArrowRight size={13} />
            </Link>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/login" });
              }}
            >
              <button type="submit" className="signOutBtn">
                <LogOut size={14} />
                Sign out
              </button>
            </form>
          </div>
        </div>
      </nav>

      <div className="shell">
        <section className="heroBand">
          <div className="heroMain">
            <h1 className="heroTitle">
              Every refill,<br />
              <em>accounted for.</em>
            </h1>

            <p className="heroSub">
              See what is due, what is waiting, and what is ready.
            </p>

            <div className="statsRow">
              {overviewStats.map((s) => (
                <div className="statBox" key={s.label}>
                  <div className="statLbl">{s.label}</div>
                  <div className="statVal">{s.value}</div>
                  <div className="statSub">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="userCard">
            <div className="avatar">
              {displayImage ? (
                <Image
                  src={displayImage}
                  alt={displayName}
                  width={58}
                  height={58}
                  className="avatarImg"
                />
              ) : (
                getInitial(displayName)
              )}
            </div>
            <div className="userRole">Workspace account</div>
            <div className="userName">{displayName}</div>
            <div className="userEmail">{displayEmail}</div>

            <div className="secBadge">
              <ShieldCheck size={14} />
              Protected session active
            </div>

            <div className="quickLinks">
              <div className="quickLink">
                <span>Residents</span>
                <ChevronRight size={14} />
              </div>
              <div className="quickLink">
                <span>Requests</span>
                <ChevronRight size={14} />
              </div>
              <div className="quickLink">
                <span>History</span>
                <ChevronRight size={14} />
              </div>
            </div>
          </div>
        </section>

        <div className="contentGrid">
          <div className="card">
            <div className="cardEye">Due soon</div>
            <div className="cardTitle">
              Refill list
            </div>

            <table className="medTable">
              <thead>
                <tr>
                  <th>Resident</th>
                  <th>Medication</th>
                  <th>Instructions</th>
                  <th>Remaining</th>
                </tr>
              </thead>
              <tbody>
                {dueSoon.map((m) => (
                  <tr key={`${m.resident}-${m.medication}`}>
                    <td>
                      <span className="resName">{m.resident}</span>
                      <span className="resRoom">{m.room}</span>
                    </td>
                    <td>
                      <span className="medName">
                        {m.medication} <span className="medStrPill">{m.strength}</span>
                      </span>
                      <span className="medForm">{m.form}</span>
                    </td>
                    <td>
                      <span className="medInstr">{m.instruction}</span>
                    </td>
                    <td>
                      <span className={`urgBadge urg-${m.urgency}`}>
                        {urgencyLabel(m.daysLeft)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card">
            <div className="cardEye">Queue</div>
            <div className="cardTitle">
              Today
            </div>
            <div className="queueList">
              {actionQueue.map(({ priority, tag, title, body, Icon }) => (
                <div className={`queueItem q-${priority}`} key={title}>
                  <div className="queueTop">
                    <div className="queueIconRow">
                      <div className="queueIconBox">
                        <Icon size={14} />
                      </div>
                      <div className="queueItemTitle">{title}</div>
                    </div>
                    <span
                      className={`queueTag qt-${
                        priority === "urgent" ? "urgent" : priority === "info" ? "info" : "action"
                      }`}
                    >
                      {tag}
                    </span>
                  </div>
                  <div className="queueBody">{body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="fullRow">
          <div className="fullRowGrid">
            <div className="card">
              <div className="cardEye">Pipeline</div>
              <div className="cardTitle">
                Active requests
              </div>
              <div className="pipeList">
                {pipeline.map((item) => {
                  const Icon = PIPE_ICONS[item.stage] ?? Pill;
                  return (
                    <div className="pipeItem" key={`${item.resident}-${item.medication}`}>
                      <div className={`pipeIconWrap pi-${item.stage}`}>
                        <Icon size={15} />
                      </div>
                      <div className="pipeBody">
                        <div className="pipeMed">{item.medication}</div>
                        <div className="pipeRes">
                          {item.resident} · {item.pharmacy}
                        </div>
                      </div>
                      <div className="pipeRight">
                        <span className={`pipeStatus s-${item.stage}`}>{item.stageLabel}</span>
                        <span className="pipeTime">{item.updated}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="card">
              <div className="cardEye">Activity</div>
              <div className="cardTitle">
                Latest
              </div>
              <div className="actList">
                {recentActivity.map((item) => (
                  <div className="actItem" key={item.label}>
                    <div className="actDotCol">
                      <div className={`actDot d-${item.type}`} />
                    </div>
                    <div>
                      <div className="actLabel">{item.label}</div>
                      <div className="actNote">{item.note}</div>
                    </div>
                    <div className="actTime">{item.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}