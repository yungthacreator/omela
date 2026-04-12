"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import { Search, Bell, LogOut, Plus, ChevronRight, AlertCircle, CheckCircle2, Filter, Inbox, X, Settings, HelpCircle } from "lucide-react";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm", weight: ["400","500","600","700","800"] });
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--font-serif" });

type Urgency = "critical" | "warning" | "ok";
type Stage = "draft" | "submitted" | "approved" | "ready" | "delayed";
type Tone = "warm" | "blue" | "green";

type Item = { id: string; title: string; initials: string; subject: string; detail: string; task: string; daysLeft: number; stage: Stage; counterparty: string; fulfiller: string; owner: string; updated: string; tone: Tone };

const seed: Item[] = [
  { id: "RQ-20814", title: "Margaret Littlewood", initials: "ML", subject: "Room 04", detail: "Amlodipine 5mg", task: "Once daily", daysLeft: 2, stage: "delayed", counterparty: "Greenfield Medical", fulfiller: "Boots, High St", owner: "Ada Kelly", updated: "3 days ago", tone: "warm" },
  { id: "RQ-20819", title: "David Reyes", initials: "DR", subject: "Room 11", detail: "Metformin 500mg", task: "Twice daily", daysLeft: 6, stage: "submitted", counterparty: "Northgate Surgery", fulfiller: "Well, Market Sq", owner: "Dr. Reyes", updated: "Today 10:15", tone: "blue" },
  { id: "RQ-20806", title: "Irene Kowalski", initials: "IK", subject: "Room 07", detail: "Sertraline 50mg", task: "Once daily", daysLeft: 14, stage: "ready", counterparty: "Hillside Practice", fulfiller: "Boots, High St", owner: "Jamie Marsh", updated: "Today 12:44", tone: "green" },
  { id: "RQ-20821", title: "Thomas Callahan", initials: "TC", subject: "Room 02", detail: "Ramipril 10mg", task: "Once daily", daysLeft: 1, stage: "delayed", counterparty: "Grove Lane Practice", fulfiller: "Grove Pharmacy", owner: "Ada Kelly", updated: "5 days ago", tone: "warm" },
  { id: "RQ-20825", title: "Sylvia Drummond", initials: "SD", subject: "Room 09", detail: "Atorvastatin 40mg", task: "Each evening", daysLeft: 7, stage: "approved", counterparty: "Oakwood GP", fulfiller: "Day Lewis", owner: "Dr. Reyes", updated: "Today 09:20", tone: "blue" },
  { id: "RQ-20827", title: "George Nkemdirim", initials: "GN", subject: "Room 14", detail: "Bisoprolol 5mg", task: "Once daily", daysLeft: 9, stage: "draft", counterparty: "Northgate Surgery", fulfiller: "LloydsPharmacy", owner: "Jamie Marsh", updated: "Yesterday", tone: "green" },
];

const stageLabels: Record<Stage, string> = { draft: "Draft", submitted: "Submitted", approved: "Approved", ready: "Ready", delayed: "Delayed" };

const initialOf = (v?: string | null) => v?.trim().charAt(0).toUpperCase() ?? "O";
const urg = (d: number): Urgency => d <= 2 ? "critical" : d <= 7 ? "warning" : "ok";
const urgLbl = (d: number) => d === 1 ? "1 day" : `${d} days`;

const CSS = `
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#F8F6F1;color:#2A1F14;font-family:var(--font-dm),Arial,sans-serif;-webkit-font-smoothing:antialiased;font-size:15px}
a{color:inherit;text-decoration:none}
button,input,select{font-family:inherit}
::selection{background:#C9956B;color:#fff}
.serif{font-family:var(--font-serif),Georgia,serif}
.nav{position:sticky;top:0;z-index:100;background:rgba(248,246,241,.95);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid #E3DDD2}
.navR{max-width:1400px;margin:0 auto;padding:0 24px;display:flex;align-items:center;gap:20px;height:64px}
.brand{display:flex;align-items:center;gap:10px;flex-shrink:0}
.logoW{width:32px;height:32px;flex-shrink:0}
.brandName{font-family:var(--font-serif),Georgia,serif;font-size:22px;letter-spacing:-.025em;color:#2A1F14}
.navDiv{width:1px;height:26px;background:#E3DDD2;flex-shrink:0}
.navTabs{display:none;align-items:center;gap:4px;flex:1}
.navTab{padding:9px 16px;font-size:14px;font-weight:600;color:#4A4F5C;border-radius:9px;cursor:pointer;background:none;border:none;transition:all .2s}
.navTab:hover{background:rgba(227,221,210,.5);color:#2A1F14}
.navTabActive{background:#fff;color:#2A1F14;border:1px solid #E3DDD2;box-shadow:0 1px 3px rgba(0,0,0,.03)}
.navRight{display:flex;align-items:center;gap:8px;margin-left:auto}
.navIcBtn{width:36px;height:36px;border-radius:9px;border:1px solid #E3DDD2;background:#fff;display:flex;align-items:center;justify-content:center;color:#4A4F5C;cursor:pointer;transition:all .2s;position:relative}
.navIcBtn:hover{border-color:#2A1F14;color:#2A1F14}
.navIcBtnDot{position:absolute;top:7px;right:7px;width:7px;height:7px;border-radius:50%;background:#EF4444;border:2px solid #fff}
.userChip{display:flex;align-items:center;gap:10px;padding:5px 14px 5px 5px;border:1px solid #E3DDD2;background:#fff;border-radius:999px;cursor:pointer;transition:border-color .2s}
.userChip:hover{border-color:#2A1F14}
.userAv{width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#F7E7D2,#F0D5B6);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:#A07545;overflow:hidden;flex-shrink:0}
.userAv img{width:100%;height:100%;object-fit:cover}
.userChipName{display:none;font-size:13.5px;font-weight:700;color:#2A1F14;max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.signOutBtn{background:none;border:none;cursor:pointer;display:flex;align-items:center;gap:5px;padding:9px 11px;font-size:13px;font-weight:600;color:#4A4F5C;border-radius:8px;transition:all .2s}
.signOutBtn:hover{color:#2A1F14;background:rgba(227,221,210,.5)}
.shell{max-width:1400px;margin:0 auto;padding:32px 24px 64px}
.pageHead{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;margin-bottom:28px;flex-wrap:wrap}
.pageHeadL h1{font-family:var(--font-serif),Georgia,serif;font-size:clamp(32px,3.8vw,42px);letter-spacing:-.035em;color:#2A1F14;line-height:1.1}
.pageHeadSub{margin-top:8px;font-size:15px;color:#4A4F5C;font-weight:500}
.pageHeadR{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.searchBox{display:flex;align-items:center;gap:8px;padding:0 14px;height:42px;background:#fff;border:1px solid #E3DDD2;border-radius:10px;min-width:260px;transition:all .2s}
.searchBox:focus-within{border-color:#2A1F14;box-shadow:0 0 0 3px rgba(42,31,20,.06)}
.searchBox input{flex:1;border:none;outline:none;background:none;font-size:14px;color:#2A1F14}
.searchBox input::placeholder{color:#888E9C}
.primaryBtn{display:inline-flex;align-items:center;gap:6px;padding:0 18px;height:42px;background:#08090C;color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;transition:all .2s;white-space:nowrap}
.primaryBtn:hover{background:#1a1a1e;transform:translateY(-1px);box-shadow:0 6px 18px rgba(0,0,0,.12)}
.statRow{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin-bottom:24px}
.statC{padding:20px 22px;background:#fff;border:1px solid #E3DDD2;border-radius:14px;position:relative;overflow:hidden;transition:transform .2s,border-color .2s}
.statC:hover{transform:translateY(-1px);border-color:#D4CCBE}
.statC::before{content:"";position:absolute;left:0;top:14px;bottom:14px;width:3px;border-radius:0 3px 3px 0}
.statC--warm::before{background:#C9956B}
.statC--blue::before{background:#2563EB}
.statC--green::before{background:#22C55E}
.statC--red::before{background:#EF4444}
.statC--muted::before{background:#D4CCBE}
.statLbl{font-size:11px;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#888E9C}
.statVal{margin-top:10px;font-family:var(--font-serif),Georgia,serif;font-size:44px;line-height:1;letter-spacing:-.035em;color:#2A1F14}
.statDelta{margin-top:8px;font-size:12px;color:#888E9C;font-weight:500}
.mainGrid{display:grid;grid-template-columns:1fr;gap:20px}
.card{background:#fff;border:1px solid #E3DDD2;border-radius:16px;overflow:hidden}
.cardHd{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:20px 24px;border-bottom:1px solid #EDE8DF}
.cardTi{font-size:16px;font-weight:800;letter-spacing:-.015em;color:#2A1F14;display:flex;align-items:center;gap:10px}
.cardCount{display:inline-flex;align-items:center;justify-content:center;min-width:24px;height:24px;padding:0 8px;background:#F2EDE4;color:#4A4F5C;border-radius:999px;font-size:11.5px;font-weight:800}
.cardAct{display:flex;align-items:center;gap:6px}
.cardActBtn{display:inline-flex;align-items:center;gap:5px;padding:7px 12px;background:none;border:1px solid #E3DDD2;border-radius:8px;font-size:12px;font-weight:600;color:#4A4F5C;cursor:pointer;transition:all .2s}
.cardActBtn:hover{border-color:#2A1F14;color:#2A1F14}
.emptyCard{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:72px 24px;text-align:center}
.emptyIc{width:60px;height:60px;border-radius:16px;background:linear-gradient(180deg,#FFF8F0,#F7E7D2);border:1px solid rgba(201,149,107,.2);display:flex;align-items:center;justify-content:center;color:#A07545;margin-bottom:22px}
.emptyTi{font-family:var(--font-serif),Georgia,serif;font-size:28px;line-height:1.1;letter-spacing:-.03em;color:#2A1F14}
.emptyBd{margin-top:12px;font-size:15px;line-height:1.6;color:#4A4F5C;max-width:380px}
.emptyActs{display:flex;gap:10px;margin-top:26px;flex-wrap:wrap;justify-content:center}
.emptySec{display:inline-flex;align-items:center;gap:6px;padding:0 18px;height:42px;background:#fff;color:#2A1F14;border:1px solid #E3DDD2;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;transition:all .2s}
.emptySec:hover{border-color:#2A1F14}
.alertList{display:flex;flex-direction:column}
.alertItem{display:flex;align-items:flex-start;gap:12px;padding:18px 24px;border-bottom:1px solid #EDE8DF;transition:background .15s;cursor:pointer;border-left:3px solid transparent}
.alertItem:last-child{border-bottom:none}
.alertItem:hover{background:#FAF7F2}
.alertItem--critical{border-left-color:#B91C1C}
.alertItem--critical:hover{background:#FEF6F6}
.alertIc{width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.alertIc--critical{background:#FEF2F2;color:#B91C1C}
.alertIc--info{background:#ECF2FF;color:#2563EB}
.alertBody{flex:1;min-width:0}
.alertTop{display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap}
.alertName{font-size:14px;font-weight:800;color:#2A1F14;letter-spacing:-.01em}
.alertTag{font-size:9.5px;font-weight:800;letter-spacing:.09em;text-transform:uppercase;padding:2px 8px;border-radius:4px}
.alertTag--critical{background:#FEF2F2;color:#B91C1C}
.alertTag--info{background:#ECF2FF;color:#2563EB}
.alertAction{font-size:13.5px;color:#4A4F5C;line-height:1.5}
.alertMeta{margin-top:4px;font-size:12px;color:#888E9C;font-weight:500}
.alertChev{color:#888E9C;flex-shrink:0;align-self:center}
.alertEmpty{padding:40px 24px;text-align:center;font-size:14px;color:#888E9C;line-height:1.6}
.tableWrap{overflow-x:auto}
.tbl{width:100%;border-collapse:collapse;min-width:860px;table-layout:fixed}
.tbl col.colSubj{width:28%}
.tbl col.colItem{width:22%}
.tbl col.colRef{width:18%}
.tbl col.colStage{width:14%}
.tbl col.colDue{width:18%}
.tbl thead th{font-size:10.5px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#888E9C;padding:14px 20px;text-align:left;background:#FAF7F2;border-bottom:1px solid #EDE8DF;white-space:nowrap}
.tbl thead th:last-child{text-align:right;padding-right:24px}
.tbl tbody tr{border-bottom:1px solid #F2EDE4;transition:background .14s;cursor:pointer;border-left:3px solid transparent}
.tbl tbody tr:last-child{border-bottom:none}
.tbl tbody tr:hover{background:#FAF7F2}
.tbl tbody tr.rowCrit{border-left-color:#B91C1C;background:rgba(254,242,242,.4)}
.tbl tbody tr.rowCrit:hover{background:#FEF6F6}
.tbl tbody tr.rowActive{background:#FAF7F2;box-shadow:inset 3px 0 0 #A07545}
.tbl td{padding:16px 20px;vertical-align:middle;overflow:hidden;text-overflow:ellipsis}
.tbl td:last-child{text-align:right;padding-right:24px}
.tblRes{display:flex;align-items:center;gap:12px;min-width:0}
.tblAv{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;flex-shrink:0}
.tblAv--warm{background:linear-gradient(135deg,#F7E7D2,#F0D5B6);color:#A07545}
.tblAv--blue{background:linear-gradient(135deg,#E3EDFB,#C9DBF6);color:#1E40AF}
.tblAv--green{background:linear-gradient(135deg,#DFF3E4,#C7E8CF);color:#15803D}
.tblResTx{min-width:0;overflow:hidden}
.tblResNm{font-size:14px;font-weight:800;color:#2A1F14;letter-spacing:-.015em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tblResSub{font-size:12px;color:#888E9C;font-weight:600;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tblMed{font-size:14px;font-weight:700;color:#2A1F14;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tblMedSub{font-size:12px;color:#888E9C;margin-top:2px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tblId{font-size:12.5px;color:#4A4F5C;font-variant-numeric:tabular-nums;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tblDays{display:inline-flex;align-items:center;gap:6px;padding:5px 11px;border-radius:999px;font-size:12px;font-weight:800;border:1px solid;white-space:nowrap}
.tblDaysDot{width:6px;height:6px;border-radius:50%}
.tblDays--critical{background:#FEF2F2;color:#B91C1C;border-color:rgba(185,28,28,.15)}
.tblDays--critical .tblDaysDot{background:#B91C1C}
.tblDays--warning{background:#FFF8F0;color:#A07545;border-color:rgba(160,117,69,.18)}
.tblDays--warning .tblDaysDot{background:#C9956B}
.tblDays--ok{background:#ECFDF3;color:#15803D;border-color:rgba(21,128,61,.15)}
.tblDays--ok .tblDaysDot{background:#22C55E}
.stagePill{display:inline-flex;align-items:center;padding:5px 10px;border-radius:6px;font-size:11px;font-weight:800;letter-spacing:.02em;border:1px solid;white-space:nowrap}
.stage--draft{background:#F2EDE4;color:#4A4F5C;border-color:#E3DDD2}
.stage--submitted{background:#FFF8F0;color:#A07545;border-color:rgba(201,149,107,.2)}
.stage--approved{background:#ECF2FF;color:#2563EB;border-color:rgba(37,99,235,.14)}
.stage--ready{background:#ECFDF3;color:#15803D;border-color:rgba(34,197,94,.2)}
.stage--delayed{background:#FEF2F2;color:#B91C1C;border-color:rgba(185,28,28,.16)}
.drawerBg{position:fixed;inset:0;background:rgba(8,9,12,.3);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);z-index:200;opacity:0;pointer-events:none;transition:opacity .25s}
.drawerBgOpen{opacity:1;pointer-events:auto}
.drawer{position:fixed;top:0;right:0;bottom:0;width:100%;max-width:500px;background:#FAF7F2;z-index:210;transform:translateX(100%);transition:transform .35s cubic-bezier(.22,1,.36,1);display:flex;flex-direction:column;box-shadow:-24px 0 60px rgba(0,0,0,.1)}
.drawerOpen{transform:translateX(0)}
.drawerHd{display:flex;align-items:center;justify-content:space-between;padding:22px 26px;border-bottom:1px solid #EDE8DF;background:#fff}
.drawerTi{font-family:var(--font-serif),Georgia,serif;font-size:24px;letter-spacing:-.025em;color:#2A1F14}
.drawerX{width:34px;height:34px;border-radius:8px;border:1px solid #E3DDD2;background:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#4A4F5C;transition:all .2s}
.drawerX:hover{border-color:#2A1F14;color:#2A1F14}
.drawerBody{flex:1;overflow-y:auto;padding:26px}
.drawerSec{margin-bottom:26px}
.drawerSec:last-child{margin-bottom:0}
.drawerSecTi{font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#888E9C;margin-bottom:12px}
.drawerField{display:grid;grid-template-columns:120px 1fr;gap:12px;padding:12px 0;border-bottom:1px solid #EDE8DF;font-size:14px}
.drawerField:last-child{border-bottom:none}
.drawerFieldLbl{color:#888E9C;font-weight:700}
.drawerFieldVal{color:#2A1F14;font-weight:700;min-width:0;word-break:break-word}
.drawerActs{display:flex;gap:10px;flex-wrap:wrap;padding-top:12px}
.drawerActs button{flex:1;min-width:130px}
@media(min-width:720px){.statRow{grid-template-columns:repeat(4,1fr)}.userChipName{display:block}.navTabs{display:flex}}
@media(min-width:1100px){.mainGrid{grid-template-columns:1.6fr 1fr}}
`;

export default function PortalClient({ userName, userImage, signOutAction }: { userName?: string; userImage?: string | null; signOutAction: () => Promise<void> }) {
  const [items, setItems] = useState<Item[]>(seed);
  const [selected, setSelected] = useState<Item | null>(null);
  const [query, setQuery] = useState("");

  const displayName = userName ?? "Your workspace";
  const filtered = items.filter((i) => !query || i.title.toLowerCase().includes(query.toLowerCase()) || i.detail.toLowerCase().includes(query.toLowerCase()) || i.id.toLowerCase().includes(query.toLowerCase()));

  const counts = {
    due: items.filter((i) => i.daysLeft <= 7 && i.stage !== "ready").length,
    waiting: items.filter((i) => i.stage === "submitted" || i.stage === "approved").length,
    ready: items.filter((i) => i.stage === "ready").length,
    delayed: items.filter((i) => i.stage === "delayed").length,
  };

  const alerts = items.filter((i) => i.stage === "delayed" || i.stage === "ready" || (i.stage === "draft" && i.daysLeft <= 7)).slice(0, 4).map((i) => ({
    id: i.id, priority: (i.stage === "delayed" ? "critical" : "info") as "critical" | "info", title: i.title,
    action: i.stage === "delayed" ? `${i.detail} is overdue. Last update ${i.updated.toLowerCase()}.` : i.stage === "ready" ? `${i.detail} ready at ${i.fulfiller}. Assign pickup.` : `${i.detail} drafted, awaiting review.`,
    meta: `${i.counterparty} · ${i.owner}`, tag: i.stage === "delayed" ? "Urgent" : i.stage === "ready" ? "Action" : "Review",
  }));

  const hasItems = items.length > 0;

  return (
    <main className={`${dmSans.variable} ${instrumentSerif.variable}`}>
      <style>{CSS}</style>
      <nav className="nav">
        <div className="navR">
          <Link href="/" className="brand">
            <div className="logoW"><Image src="/omela-logo-mark.png" alt="Omela" width={32} height={32} style={{ width: "100%", height: "100%", objectFit: "contain" }} priority /></div>
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
            <button type="button" className="navIcBtn" aria-label="Help"><HelpCircle size={15} /></button>
            <button type="button" className="navIcBtn" aria-label="Settings"><Settings size={15} /></button>
            <button type="button" className="navIcBtn" aria-label="Notifications"><Bell size={15} />{counts.delayed > 0 ? <span className="navIcBtnDot" /> : null}</button>
            <div className="userChip"><div className="userAv">{userImage ? <Image src={userImage} alt={displayName} width={28} height={28} /> : initialOf(displayName)}</div><span className="userChipName">{displayName}</span></div>
            <form action={signOutAction}><button type="submit" className="signOutBtn" aria-label="Sign out"><LogOut size={14} /></button></form>
          </div>
        </div>
      </nav>

      <div className="shell">
        <div className="pageHead">
          <div className="pageHeadL">
            <h1 className="serif">Overview</h1>
            <p className="pageHeadSub">{hasItems ? `${items.length} active ${items.length === 1 ? "request" : "requests"} in your workspace` : "Your workspace is empty. Start by adding your first request."}</p>
          </div>
          <div className="pageHeadR">
            <div className="searchBox"><Search size={15} color="#888E9C" /><input type="text" placeholder="Search requests..." value={query} onChange={(e) => setQuery(e.target.value)} /></div>
            <button type="button" className="primaryBtn"><Plus size={15} />New request</button>
          </div>
        </div>

        <div className="statRow">
          <Stat label="Due this week" value={counts.due} tone={hasItems && counts.due > 0 ? "warm" : "muted"} delta={hasItems ? (counts.due === 0 ? "Nothing pressing" : "Need prep") : "No data yet"} />
          <Stat label="Waiting on others" value={counts.waiting} tone={hasItems && counts.waiting > 0 ? "blue" : "muted"} delta={hasItems ? "Submitted or approved" : "No data yet"} />
          <Stat label="Ready to close" value={counts.ready} tone={hasItems && counts.ready > 0 ? "green" : "muted"} delta={hasItems ? "Awaiting pickup" : "No data yet"} />
          <Stat label="Delayed" value={counts.delayed} tone={hasItems && counts.delayed > 0 ? "red" : "muted"} delta={hasItems ? (counts.delayed > 0 ? "Needs action" : "All on track") : "No data yet"} />
        </div>

        <div className="mainGrid">
          <div className="card">
            <div className="cardHd">
              <div className="cardTi">Active requests<span className="cardCount">{filtered.length}</span></div>
              <div className="cardAct">
                <button type="button" className="cardActBtn" onClick={() => hasItems ? setItems([]) : setItems(seed)}>{hasItems ? <>Clear <X size={12} /></> : <>Load demo</>}</button>
                <button type="button" className="cardActBtn"><Filter size={12} />Filter</button>
              </div>
            </div>
            {filtered.length === 0 ? (
              <div className="emptyCard">
                <div className="emptyIc"><Inbox size={26} /></div>
                <h3 className="emptyTi">{hasItems ? "No matches found" : "No requests yet"}</h3>
                <p className="emptyBd">{hasItems ? "Try adjusting your search, or clear the query to see everything." : "Your workspace is fresh. Add your first request, or load demo data to see how Omela works."}</p>
                <div className="emptyActs">
                  <button type="button" className="primaryBtn"><Plus size={15} />New request</button>
                  {!hasItems ? <button type="button" className="emptySec" onClick={() => setItems(seed)}>Load demo data</button> : null}
                </div>
              </div>
            ) : (
              <div className="tableWrap">
                <table className="tbl">
                  <colgroup><col className="colSubj" /><col className="colItem" /><col className="colRef" /><col className="colStage" /><col className="colDue" /></colgroup>
                  <thead><tr><th>Subject</th><th>Item</th><th>Reference</th><th>Stage</th><th>Due</th></tr></thead>
                  <tbody>
                    {filtered.map((r) => {
                      const u = urg(r.daysLeft);
                      const isActive = selected?.id === r.id;
                      const rowClass = isActive ? "rowActive" : u === "critical" ? "rowCrit" : "";
                      return (
                        <tr key={r.id} className={rowClass} onClick={() => setSelected(r)}>
                          <td>
                            <div className="tblRes">
                              <div className={`tblAv tblAv--${r.tone}`}>{r.initials}</div>
                              <div className="tblResTx"><div className="tblResNm">{r.title}</div><div className="tblResSub">{r.subject}</div></div>
                            </div>
                          </td>
                          <td><div className="tblMed">{r.detail}</div><div className="tblMedSub">{r.task}</div></td>
                          <td><div className="tblId">{r.id}</div><div className="tblMedSub">{r.updated}</div></td>
                          <td><span className={`stagePill stage--${r.stage}`}>{stageLabels[r.stage]}</span></td>
                          <td><span className={`tblDays tblDays--${u}`}><span className="tblDaysDot" />{urgLbl(r.daysLeft)}</span></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="card">
            <div className="cardHd"><div className="cardTi">Needs attention<span className="cardCount">{alerts.length}</span></div></div>
            {alerts.length === 0 ? (<div className="alertEmpty">Nothing needs attention right now.</div>) : (
              <div className="alertList">
                {alerts.map((a) => {
                  const Icon = a.priority === "critical" ? AlertCircle : CheckCircle2;
                  const item = items.find((i) => i.id === a.id);
                  return (
                    <div key={a.id} className={`alertItem alertItem--${a.priority}`} onClick={() => item && setSelected(item)}>
                      <div className={`alertIc alertIc--${a.priority}`}><Icon size={16} /></div>
                      <div className="alertBody">
                        <div className="alertTop"><span className="alertName">{a.title}</span><span className={`alertTag alertTag--${a.priority}`}>{a.tag}</span></div>
                        <div className="alertAction">{a.action}</div>
                        <div className="alertMeta">{a.meta}</div>
                      </div>
                      <ChevronRight size={16} className="alertChev" />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`drawerBg ${selected ? "drawerBgOpen" : ""}`} onClick={() => setSelected(null)} />
      <aside className={`drawer ${selected ? "drawerOpen" : ""}`} aria-hidden={!selected}>
        {selected ? (
          <>
            <div className="drawerHd">
              <h2 className="drawerTi serif">{selected.title}</h2>
              <button className="drawerX" onClick={() => setSelected(null)} aria-label="Close"><X size={16} /></button>
            </div>
            <div className="drawerBody">
              <DSec title="Request"><DF label="Reference" value={selected.id} /><DF label="Subject" value={selected.subject} /><DF label="Item" value={selected.detail} /><DF label="Instruction" value={selected.task} /></DSec>
              <DSec title="Coordination"><DF label="Owner" value={selected.owner} /><DF label="Counterparty" value={selected.counterparty} /><DF label="Fulfiller" value={selected.fulfiller} /><DF label="Last update" value={selected.updated} /></DSec>
              <DSec title="Status">
                <DF label="Stage" value={<span className={`stagePill stage--${selected.stage}`}>{stageLabels[selected.stage]}</span>} />
                <DF label="Supply" value={<span className={`tblDays tblDays--${urg(selected.daysLeft)}`}><span className="tblDaysDot" />{urgLbl(selected.daysLeft)}</span>} />
                <div className="drawerActs"><button className="primaryBtn">Mark complete</button><button className="emptySec">Reassign</button></div>
              </DSec>
            </div>
          </>
        ) : null}
      </aside>
    </main>
  );
}

function Stat({ label, value, tone, delta }: { label: string; value: number; tone: "warm" | "blue" | "green" | "red" | "muted"; delta: string }) {
  return (<div className={`statC statC--${tone}`}><div className="statLbl">{label}</div><div className="statVal">{value}</div><div className="statDelta">{delta}</div></div>);
}
function DSec({ title, children }: { title: string; children: ReactNode }) { return (<div className="drawerSec"><div className="drawerSecTi">{title}</div>{children}</div>); }
function DF({ label, value }: { label: string; value: ReactNode }) { return (<div className="drawerField"><span className="drawerFieldLbl">{label}</span><span className="drawerFieldVal">{value}</span></div>); }
