"use client";

import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Bell,
  Building2,
  CalendarCheck,
  Check,
  ChevronRight,
  Circle,
  ClipboardCheck,
  Clock3,
  FileText,
  Home,
  LogOut,
  MapPin,
  MessageCircle,
  Navigation,
  Plus,
  Search,
  Send,
  UserRound,
  UsersRound,
} from "lucide-react";

type PortalClientProps = {
  userName: string;
  userImage: string | null;
  signOutAction: () => Promise<void>;
};

type Status = "needs-action" | "sent" | "ready" | "in-progress";
type Role = "manager" | "support" | "family" | "pharmacy";

type Person = {
  id: string;
  name: string;
  initials: string;
  psw: string;
  medicine: string;
  room: string;
  requestId: string;
  dose: string;
  owner: string;
  supportWorker: string;
  supplyLeft: string;
  status: Status;
  statusLabel: string;
  nextAction: string;
  progress: number;
  timeline: {
    label: string;
    time: string;
    done: boolean;
  }[];
};

type Pharmacy = {
  name: string;
  distance: string;
  status: string;
  address: string;
  travel: string;
};

const people: Person[] = [
  {
    id: "margaret",
    name: "Margaret Littlewood",
    initials: "ML",
    psw: "PSW 1",
    medicine: "Amlodipine 5mg",
    room: "Room 04",
    requestId: "RX-20814",
    dose: "Once daily",
    owner: "Ada Kelly",
    supportWorker: "Tomi Adebayo",
    supplyLeft: "2 days",
    status: "needs-action",
    statusLabel: "Needs action",
    nextAction: "Call Greenfield Medical to confirm whether the request was approved.",
    progress: 58,
    timeline: [
      { label: "Cycle detected", time: "Today 08:10", done: true },
      { label: "Request prepared", time: "Today 08:24", done: true },
      { label: "Sent to practice", time: "Today 09:03", done: true },
      { label: "Approval confirmation", time: "Next step", done: false },
    ],
  },
  {
    id: "david",
    name: "David Morgan",
    initials: "DR",
    psw: "PSW 2",
    medicine: "Metformin 500mg",
    room: "Room 11",
    requestId: "RX-20822",
    dose: "Twice daily",
    owner: "Ben Carter",
    supportWorker: "Hannah Cole",
    supplyLeft: "6 days",
    status: "sent",
    statusLabel: "Request sent",
    nextAction: "Check Lockwood Pharmacy received the request before the evening handover.",
    progress: 46,
    timeline: [
      { label: "Cycle detected", time: "Yesterday 16:40", done: true },
      { label: "Request prepared", time: "Today 09:15", done: true },
      { label: "Sent to practice", time: "Today 10:02", done: true },
      { label: "Pharmacy receipt", time: "Waiting", done: false },
    ],
  },
  {
    id: "irene",
    name: "Irene Kowalski",
    initials: "IK",
    psw: "PSW 3",
    medicine: "Sertraline 50mg",
    room: "Room 07",
    requestId: "RX-20806",
    dose: "Once daily",
    owner: "James Kowalski",
    supportWorker: "Maya Singh",
    supplyLeft: "14 days",
    status: "ready",
    statusLabel: "Ready",
    nextAction: "Collect from Boots before 6pm and mark the request as collected.",
    progress: 92,
    timeline: [
      { label: "Request prepared", time: "Fri 14:20", done: true },
      { label: "Sent to practice", time: "Mon 09:03", done: true },
      { label: "Dispensed", time: "Today 11:20", done: true },
      { label: "Ready at pharmacy", time: "Today 12:44", done: true },
    ],
  },
  {
    id: "samuel",
    name: "Samuel Wright",
    initials: "SW",
    psw: "PSW 4",
    medicine: "Apixaban 5mg",
    room: "Room 02",
    requestId: "RX-20901",
    dose: "Twice daily",
    owner: "Clara Moss",
    supportWorker: "Ben Carter",
    supplyLeft: "4 days",
    status: "in-progress",
    statusLabel: "In progress",
    nextAction: "Confirm the medication list before preparing the next request.",
    progress: 42,
    timeline: [
      { label: "Cycle detected", time: "Today 08:10", done: true },
      { label: "Reminder sent", time: "Today 08:11", done: true },
      { label: "Confirm list", time: "Today", done: false },
      { label: "Prepare request", time: "Next", done: false },
    ],
  },
];

const pharmacies: Pharmacy[] = [
  {
    name: "Dalton Pharmacy",
    distance: "0.4 miles",
    status: "Open until 6pm",
    address: "Market Street, Huddersfield",
    travel: "8 min drive",
  },
  {
    name: "Lockwood Pharmacy",
    distance: "0.8 miles",
    status: "Collection available",
    address: "Lockwood Road, Huddersfield",
    travel: "12 min drive",
  },
  {
    name: "Boots",
    distance: "1.2 miles",
    status: "Open until 7pm",
    address: "Town Centre, Huddersfield",
    travel: "15 min drive",
  },
  {
    name: "Well Pharmacy",
    distance: "1.6 miles",
    status: "Prescription desk open",
    address: "Bradford Road, Huddersfield",
    travel: "18 min drive",
  },
  {
    name: "PharmacyWise Heckmondwike",
    distance: "3.4 miles",
    status: "Open until 6:30pm",
    address: "Heckmondwike",
    travel: "22 min drive",
  },
];

const activity: { icon: LucideIcon; text: string; time: string }[] = [
  {
    icon: MessageCircle,
    text: "Tomi updated Margaret’s request note",
    time: "Now",
  },
  {
    icon: Check,
    text: "Irene was marked ready for collection",
    time: "14m",
  },
  {
    icon: Send,
    text: "David’s request was sent to Northgate Surgery",
    time: "34m",
  },
  {
    icon: MessageCircle,
    text: "Samuel’s medication list needs confirmation",
    time: "1h",
  },
];

const tasks = [
  {
    title: "Confirm Margaret’s approval with Greenfield Medical",
    owner: "Ada Kelly",
    due: "Before 4pm",
  },
  {
    title: "Check Lockwood Pharmacy received David’s request",
    owner: "Ben Carter",
    due: "Today",
  },
  {
    title: "Collect Irene’s prescription from Boots",
    owner: "Maya Singh",
    due: "Before 6pm",
  },
];

const statusMeta: Record<
  Status,
  {
    className: string;
    label: string;
  }
> = {
  "needs-action": {
    className: "danger",
    label: "Needs action",
  },
  sent: {
    className: "blue",
    label: "Request sent",
  },
  ready: {
    className: "green",
    label: "Ready",
  },
  "in-progress": {
    className: "amber",
    label: "In progress",
  },
};

const roleLabels: Record<Role, string> = {
  manager: "Manager",
  support: "Support worker",
  family: "Family carer",
  pharmacy: "Pharmacy",
};

function firstNameOf(name: string) {
  const clean = name?.trim();
  if (!clean) return "Pavium";
  return clean.split(" ")[0] || clean;
}

function Logo() {
  return (
    <div className="brand">
      <div className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 64 64" role="img">
          <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="5" />
          <path
            d="M12 33h10l4-10 8 22 6-26 7 14h5"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span>Omela</span>
    </div>
  );
}

export default function PortalClient({
  userName,
  userImage,
  signOutAction,
}: PortalClientProps) {
  const [selectedPersonId, setSelectedPersonId] = useState("margaret");
  const [query, setQuery] = useState("");
  const [role, setRole] = useState<Role>("manager");
  const [postcode, setPostcode] = useState("HD1");

  const selectedPerson =
    people.find((person) => person.id === selectedPersonId) ?? people[0];

  const filteredPeople = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) return people;

    return people.filter((person) => {
      return (
        person.name.toLowerCase().includes(value) ||
        person.psw.toLowerCase().includes(value) ||
        person.medicine.toLowerCase().includes(value) ||
        person.room.toLowerCase().includes(value)
      );
    });
  }, [query]);

  const counts = useMemo(() => {
    return {
      needsAction: people.filter((person) => person.status === "needs-action").length,
      inProgress: people.filter(
        (person) => person.status === "sent" || person.status === "in-progress"
      ).length,
      ready: people.filter((person) => person.status === "ready").length,
      supported: people.length,
    };
  }, []);

  const firstName = firstNameOf(userName);
  const currentStatus = statusMeta[selectedPerson.status];

  return (
    <main className="portal-page">
      <style jsx global>{CSS}</style>

      <header className="portal-header">
        <Logo />

        <nav className="portal-nav" aria-label="Portal navigation">
          <a href="#overview">Overview</a>
          <a href="#requests">Requests</a>
          <a href="#people">People</a>
          <a href="#pharmacy">Pharmacy</a>
          <a href="#tasks">Tasks</a>
        </nav>

        <div className="header-actions">
          <button className="icon-button desktop-only" type="button" aria-label="Notifications">
            <Bell size={20} />
            <span className="notify-dot" />
          </button>

          <div className="profile-pill desktop-only">
            {userImage ? (
              <img src={userImage} alt="" />
            ) : (
              <span>{firstName.charAt(0).toUpperCase()}</span>
            )}
            <strong>{firstName}</strong>
          </div>

          <form action={signOutAction}>
            <button className="icon-button" type="submit" aria-label="Sign out">
              <LogOut size={22} />
            </button>
          </form>
        </div>
      </header>

      <section className="portal-shell" id="overview">
        <div className="top-grid">
          <section className="hero-card">
            <p className="eyebrow">Today</p>
            <h1>Welcome back, {firstName}</h1>
            <p className="hero-copy">
              See who needs support, which requests are moving, and what needs to
              be followed through before handover.
            </p>

            <div className="hero-actions">
              <button className="primary-button" type="button">
                <Plus size={19} />
                New request
              </button>

              <button className="secondary-button" type="button">
                <MessageCircle size={19} />
                Open handover
              </button>

              <label className="role-select">
                <span className="sr-only">Select view</span>
                <select value={role} onChange={(event) => setRole(event.target.value as Role)}>
                  <option value="manager">Manager</option>
                  <option value="support">Support worker</option>
                  <option value="family">Family carer</option>
                  <option value="pharmacy">Pharmacy</option>
                </select>
              </label>
            </div>
          </section>

          <aside className="shift-card">
            <div className="shift-top">
              <div>
                <p className="eyebrow">{roleLabels[role]} view</p>
                <strong>15:00</strong>
              </div>
              <span className="shift-icon">
                <Clock3 size={22} />
              </span>
            </div>

            <p>
              Review requests, ownership, pharmacy status, and tasks before the
              next handover.
            </p>

            <div className="shift-actions">
              <button className="primary-button compact" type="button">
                Start round
              </button>
              <button className="small-button" type="button" aria-label="More actions">
                ...
              </button>
            </div>
          </aside>
        </div>

        <section className="stats-grid" aria-label="Workspace status">
          <article className="stat-card danger">
            <span>Needs action</span>
            <strong>{counts.needsAction}</strong>
            <p>Request needs follow-up</p>
          </article>

          <article className="stat-card amber">
            <span>In progress</span>
            <strong>{counts.inProgress}</strong>
            <p>Sent or being prepared</p>
          </article>

          <article className="stat-card green">
            <span>Ready</span>
            <strong>{counts.ready}</strong>
            <p>Ready to collect or close</p>
          </article>

          <article className="stat-card">
            <span>People supported</span>
            <strong>{counts.supported}</strong>
            <p>Visible in this workspace</p>
          </article>
        </section>

        <section className="workspace-grid" id="requests">
          <aside className="panel people-panel" id="people">
            <div className="panel-heading">
              <span className="panel-icon">
                <UsersRound size={20} />
              </span>
              <div>
                <h2>People supported</h2>
                <p>Select a person to view their request.</p>
              </div>
            </div>

            <label className="search-box">
              <Search size={18} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search people, PSW, request"
              />
            </label>

            <div className="people-list">
              {filteredPeople.map((person) => {
                const meta = statusMeta[person.status];
                const isActive = person.id === selectedPerson.id;

                return (
                  <button
                    key={person.id}
                    className={`person-row ${isActive ? "active" : ""}`}
                    type="button"
                    onClick={() => setSelectedPersonId(person.id)}
                  >
                    <span className="avatar-wrap">
                      <span className="person-avatar">
                        <UserRound size={18} />
                      </span>
                      <span className="initial-badge">{person.initials}</span>
                    </span>

                    <span className="person-main">
                      <span className="person-name">
                        {person.name.split(" ")[0]}
                        <em>{person.psw}</em>
                      </span>
                      <span className="person-med">{person.medicine}</span>
                      <span className="person-room">{person.room}</span>
                    </span>

                    <span className={`status-pill ${meta.className}`}>{meta.label}</span>
                  </button>
                );
              })}
            </div>
          </aside>

          <section className="panel request-panel">
            <div className="request-head">
              <div>
                <p className="eyebrow">Current request</p>
                <h2>{selectedPerson.name}</h2>
                <p>
                  {selectedPerson.medicine} · {selectedPerson.requestId} ·{" "}
                  {selectedPerson.dose}
                </p>
              </div>

              <span className={`status-pill large ${currentStatus.className}`}>
                {currentStatus.label}
              </span>
            </div>

            <div className="next-action-card">
              <span>Next action</span>
              <strong>{selectedPerson.nextAction}</strong>
            </div>

            <div className="detail-grid">
              <article>
                <span>Owner</span>
                <strong>{selectedPerson.owner}</strong>
              </article>

              <article>
                <span>Support worker</span>
                <strong>{selectedPerson.supportWorker}</strong>
              </article>

              <article>
                <span>Supply left</span>
                <strong>{selectedPerson.supplyLeft}</strong>
              </article>
            </div>

            <div className="timeline-card">
              <div className="timeline-top">
                <span>Timeline</span>
                <strong>{selectedPerson.progress}% complete</strong>
              </div>

              <div className="progress-track">
                <span style={{ width: `${selectedPerson.progress}%` }} />
              </div>

              <div className="timeline-list">
                {selectedPerson.timeline.map((item) => (
                  <article key={`${selectedPerson.id}-${item.label}`}>
                    <span className={`timeline-dot ${item.done ? "done" : ""}`}>
                      {item.done ? <Check size={15} /> : <Circle size={15} />}
                    </span>
                    <div>
                      <strong>{item.label}</strong>
                      <p>{item.time}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="request-actions">
              <button className="primary-button compact" type="button">
                <Check size={18} />
                Mark ready
              </button>

              <button className="secondary-button compact" type="button">
                <Send size={18} />
                Send update
              </button>
            </div>
          </section>

          <aside className="side-stack">
            <section className="panel check-panel">
              <div className="panel-heading compact-heading">
                <span className="panel-icon">
                  <Activity size={20} />
                </span>
                <div>
                  <h2>Request check</h2>
                  <p>Owner, practice, pharmacy, and next action.</p>
                </div>
              </div>

              <div className="check-stats">
                <article>
                  <strong>5</strong>
                  <span>Due soon</span>
                </article>
                <article>
                  <strong>3</strong>
                  <span>Follow-up</span>
                </article>
                <article>
                  <strong>2</strong>
                  <span>Ready</span>
                </article>
              </div>
            </section>

            <section className="panel activity-panel">
              <div className="panel-heading compact-heading">
                <span className="panel-icon">
                  <Clock3 size={20} />
                </span>
                <div>
                  <h2>Recent activity</h2>
                </div>
              </div>

              <div className="activity-list">
                {activity.map((item) => {
                  const Icon = item.icon;

                  return (
                    <article key={`${item.text}-${item.time}`}>
                      <span>
                        <Icon size={17} />
                      </span>
                      <div>
                        <strong>{item.text}</strong>
                        <p>{item.time}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          </aside>
        </section>

        <section className="pharmacy-grid" id="pharmacy">
          <section className="panel pharmacy-panel">
            <div className="panel-heading">
              <span className="panel-icon">
                <MapPin size={20} />
              </span>
              <div>
                <h2>Pharmacy selection</h2>
                <p>
                  Search by postcode, compare nearby options, then choose where
                  the request should go.
                </p>
              </div>
            </div>

            <div className="pharmacy-search-row">
              <label className="postcode-box">
                <Search size={17} />
                <input
                  value={postcode}
                  onChange={(event) => setPostcode(event.target.value)}
                  aria-label="Postcode"
                />
              </label>

              <button className="dark-button" type="button">
                Search
              </button>
            </div>

            <div className="route-card" aria-label="Pharmacy route preview">
              <div className="map-soft-grid" />
              <div className="road road-one" />
              <div className="road road-two" />
              <div className="road road-three" />

              <span className="map-pin home-pin">
                <Building2 size={18} />
              </span>

              <span className="map-pin pharmacy-pin">
                <MapPin size={20} />
              </span>

              <span className="small-map-dot dot-one" />
              <span className="small-map-dot dot-two" />
              <span className="small-map-dot dot-three" />

              <article className="selected-pharmacy-card">
                <strong>{pharmacies[0].name}</strong>
                <p>
                  {pharmacies[0].distance} · {pharmacies[0].status}
                </p>
                <span>
                  {pharmacies[0].address} · {pharmacies[0].travel}
                </span>
              </article>
            </div>
          </section>

          <aside className="panel options-panel">
            <div className="panel-heading">
              <span className="panel-icon">
                <Navigation size={20} />
              </span>
              <div>
                <h2>Nearby options</h2>
              </div>
            </div>

            <div className="pharmacy-options">
              {pharmacies.map((pharmacy, index) => (
                <button
                  key={pharmacy.name}
                  className={`pharmacy-option ${index === 0 ? "active" : ""}`}
                  type="button"
                >
                  <span>
                    <strong>{pharmacy.name}</strong>
                    <em>
                      {pharmacy.distance} · {pharmacy.status}
                    </em>
                  </span>
                  <ChevronRight size={20} />
                </button>
              ))}
            </div>
          </aside>
        </section>

        <section className="bottom-grid" id="tasks">
          <section className="panel tasks-panel">
            <div className="panel-heading">
              <span className="panel-icon">
                <ClipboardCheck size={20} />
              </span>
              <div>
                <h2>Tasks</h2>
                <p>Actions assigned across the care team.</p>
              </div>
            </div>

            <div className="task-list">
              {tasks.map((task) => (
                <article key={task.title}>
                  <span>
                    <Check size={18} />
                  </span>
                  <div>
                    <strong>{task.title}</strong>
                    <p>{task.owner}</p>
                    <em>{task.due}</em>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="panel tools-panel">
            <article>
              <span>
                <FileText size={21} />
              </span>
              <div>
                <h3>Documents</h3>
                <p>Keep notes, pharmacy updates, and handover context attached to the right person.</p>
                <button type="button">View documents</button>
              </div>
            </article>

            <article>
              <span>
                <CalendarCheck size={21} />
              </span>
              <div>
                <h3>Care team</h3>
                <p>Manage roles, access, ownership, and visibility across the workspace.</p>
                <button type="button">Manage team</button>
              </div>
            </article>
          </section>
        </section>
      </section>

      <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
        <a href="#overview" className="active">
          <Home size={21} />
          <span>Home</span>
        </a>
        <a href="#requests">
          <ClipboardCheck size={21} />
          <span>Requests</span>
        </a>
        <a href="#people">
          <UsersRound size={21} />
          <span>People</span>
        </a>
        <a href="#pharmacy">
          <MapPin size={21} />
          <span>Pharmacy</span>
        </a>
      </nav>
    </main>
  );
}

const CSS = `
:root {
  --portal-bg: #f8f6f1;
  --portal-cream: #faf7f2;
  --portal-card: rgba(255,255,255,0.88);
  --portal-text: #101827;
  --portal-muted: #667085;
  --portal-soft: #eaf8f5;
  --portal-teal: #57cbc4;
  --portal-teal-dark: #087b75;
  --portal-navy: #101827;
  --portal-border: #e6dfd5;
  --portal-shadow: 0 24px 70px rgba(28, 35, 38, 0.08);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--portal-bg);
}

button,
input,
select {
  font: inherit;
}

button {
  cursor: pointer;
}

.portal-page {
  min-height: 100vh;
  overflow-x: hidden;
  color: var(--portal-text);
  background:
    radial-gradient(circle at 50% 0%, rgba(87, 203, 196, 0.16), transparent 34rem),
    linear-gradient(180deg, #fbfaf6 0%, #f8f6f1 55%, #f6f1e9 100%);
  font-family: var(--font-portal), Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.portal-header {
  position: sticky;
  top: 0;
  z-index: 30;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 clamp(20px, 4vw, 56px);
  border-bottom: 1px solid var(--portal-border);
  background: rgba(250, 247, 242, 0.9);
  backdrop-filter: blur(22px);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  color: #05070a;
  font-weight: 800;
  letter-spacing: -0.04em;
  font-size: 28px;
}

.brand-mark {
  width: 48px;
  height: 48px;
  color: #05070a;
  display: grid;
  place-items: center;
}

.brand-mark svg {
  width: 100%;
  height: 100%;
}

.portal-nav {
  display: flex;
  align-items: center;
  gap: clamp(24px, 4vw, 50px);
  font-size: 15px;
  font-weight: 700;
}

.portal-nav a {
  color: #111827;
  text-decoration: none;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon-button {
  width: 54px;
  height: 54px;
  border: 1px solid var(--portal-border);
  border-radius: 18px;
  background: rgba(255,255,255,0.75);
  color: var(--portal-text);
  display: inline-grid;
  place-items: center;
  position: relative;
}

.notify-dot {
  position: absolute;
  top: 13px;
  right: 14px;
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: #c53939;
}

.profile-pill {
  min-height: 54px;
  border: 1px solid var(--portal-border);
  border-radius: 999px;
  background: rgba(255,255,255,0.72);
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 7px 16px 7px 7px;
}

.profile-pill img,
.profile-pill span {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background: #8aa0aa;
  color: white;
  display: grid;
  place-items: center;
  font-weight: 800;
}

.profile-pill strong {
  font-size: 15px;
}

.portal-shell {
  width: min(100%, 1500px);
  margin: 0 auto;
  padding: 30px clamp(18px, 3vw, 34px) 56px;
}

.top-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(320px, 0.72fr);
  gap: 24px;
  align-items: stretch;
}

.hero-card,
.shift-card,
.panel,
.stat-card {
  border: 1px solid var(--portal-border);
  background: var(--portal-card);
  box-shadow: var(--portal-shadow);
}

.hero-card {
  border-radius: 30px;
  padding: clamp(28px, 4vw, 54px);
}

.eyebrow {
  margin: 0 0 18px;
  color: var(--portal-teal-dark);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.hero-card h1 {
  max-width: 850px;
  margin: 0;
  color: #0b1220;
  font-size: clamp(44px, 5vw, 74px);
  line-height: 0.96;
  letter-spacing: -0.07em;
  font-weight: 800;
}

.hero-copy {
  max-width: 760px;
  margin: 28px 0 0;
  color: #475467;
  font-size: clamp(17px, 1.5vw, 21px);
  line-height: 1.6;
}

.hero-actions,
.shift-actions,
.request-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 32px;
}

.primary-button,
.secondary-button,
.dark-button,
.small-button {
  border: 0;
  border-radius: 18px;
  min-height: 54px;
  padding: 0 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 800;
  font-size: 15px;
}

.primary-button {
  background: var(--portal-teal);
  color: #071113;
  box-shadow: 0 18px 40px rgba(87, 203, 196, 0.28);
}

.secondary-button {
  background: rgba(255,255,255,0.78);
  border: 1px solid var(--portal-border);
  color: var(--portal-text);
}

.dark-button {
  background: var(--portal-navy);
  color: white;
}

.primary-button.compact,
.secondary-button.compact {
  min-height: 50px;
}

.small-button {
  width: 58px;
  padding: 0;
  background: rgba(255,255,255,0.74);
  border: 1px solid var(--portal-border);
  font-size: 20px;
}

.role-select {
  position: relative;
}

.role-select select {
  min-height: 54px;
  min-width: 190px;
  border-radius: 18px;
  border: 1px solid var(--portal-border);
  background: rgba(255,255,255,0.78);
  color: var(--portal-text);
  padding: 0 44px 0 20px;
  font-size: 15px;
  font-weight: 800;
  outline: none;
  appearance: auto;
}

.shift-card {
  border-radius: 30px;
  padding: 30px;
}

.shift-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
}

.shift-card strong {
  display: block;
  color: var(--portal-text);
  font-size: clamp(44px, 5vw, 58px);
  line-height: 0.95;
  letter-spacing: -0.07em;
  font-weight: 500;
}

.shift-icon {
  width: 64px;
  height: 64px;
  border-radius: 20px;
  background: var(--portal-navy);
  color: white;
  display: grid;
  place-items: center;
}

.shift-card p {
  margin: 28px 0 0;
  color: #475467;
  font-size: 17px;
  line-height: 1.55;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin: 24px 0;
}

.stat-card {
  border-radius: 24px;
  padding: 22px;
  min-height: 130px;
}

.stat-card span {
  display: block;
  color: #7b8492;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.stat-card strong {
  display: block;
  margin-top: 12px;
  font-size: 36px;
  line-height: 1;
  letter-spacing: -0.04em;
}

.stat-card p {
  margin: 12px 0 0;
  color: #536173;
  font-size: 14px;
  line-height: 1.45;
}

.stat-card.danger strong {
  color: #b43b3b;
}

.stat-card.amber strong {
  color: #a96b00;
}

.stat-card.green strong {
  color: #087f4d;
}

.workspace-grid {
  display: grid;
  grid-template-columns: minmax(260px, 340px) minmax(0, 1fr) minmax(280px, 360px);
  gap: 20px;
  align-items: start;
}

.panel {
  border-radius: 28px;
  overflow: hidden;
}

.people-panel,
.request-panel,
.check-panel,
.activity-panel,
.pharmacy-panel,
.options-panel,
.tasks-panel,
.tools-panel {
  padding: 24px;
}

.panel-heading {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.compact-heading {
  align-items: center;
}

.panel-icon {
  flex: 0 0 auto;
  width: 48px;
  height: 48px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  background: #e4f8f5;
  color: var(--portal-teal-dark);
}

.panel-heading h2 {
  margin: 0;
  color: var(--portal-text);
  font-size: 22px;
  line-height: 1.1;
  letter-spacing: -0.04em;
  font-weight: 800;
}

.panel-heading p {
  margin: 6px 0 0;
  color: var(--portal-muted);
  font-size: 15px;
  line-height: 1.45;
}

.search-box,
.postcode-box {
  width: 100%;
  margin-top: 22px;
  min-height: 54px;
  border: 1px solid var(--portal-border);
  border-radius: 18px;
  background: rgba(255,255,255,0.78);
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
  color: #98a2b3;
}

.search-box input,
.postcode-box input {
  width: 100%;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--portal-text);
  font-size: 15px;
  font-weight: 500;
}

.people-list {
  margin-top: 18px;
  display: grid;
  gap: 12px;
}

.person-row {
  width: 100%;
  min-height: 104px;
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr);
  grid-template-areas:
    "avatar main"
    "avatar status";
  gap: 4px 14px;
  align-items: center;
  border: 1px solid var(--portal-border);
  border-radius: 20px;
  background: rgba(255,255,255,0.72);
  padding: 14px;
  text-align: left;
}

.person-row.active {
  border-color: var(--portal-teal);
  box-shadow: 0 18px 40px rgba(87, 203, 196, 0.13);
}

.avatar-wrap {
  grid-area: avatar;
  width: 48px;
  height: 48px;
  position: relative;
}

.person-avatar {
  width: 48px;
  height: 48px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: #e4f8f5;
  color: var(--portal-teal-dark);
}

.initial-badge {
  position: absolute;
  right: -5px;
  bottom: -5px;
  min-width: 25px;
  height: 25px;
  padding: 0 5px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  border: 2px solid white;
  background: #f7fffd;
  color: var(--portal-teal-dark);
  font-size: 11px;
  font-weight: 800;
}

.person-main {
  grid-area: main;
  min-width: 0;
}

.person-name {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  color: var(--portal-text);
  font-size: 16px;
  font-weight: 800;
  line-height: 1.15;
}

.person-name em {
  flex: 0 0 auto;
  border: 1px solid var(--portal-border);
  background: #f6f2eb;
  color: #667085;
  border-radius: 999px;
  padding: 3px 8px;
  font-size: 11px;
  font-style: normal;
  font-weight: 800;
}

.person-med,
.person-room {
  display: block;
  margin-top: 5px;
  color: #536173;
  font-size: 14px;
  line-height: 1.25;
}

.person-room {
  font-weight: 700;
  color: #7b8492;
}

.status-pill {
  grid-area: status;
  width: fit-content;
  max-width: 100%;
  border-radius: 999px;
  padding: 7px 12px;
  font-size: 12px;
  line-height: 1;
  font-weight: 800;
  white-space: nowrap;
}

.status-pill.large {
  grid-area: auto;
  font-size: 13px;
  padding: 9px 14px;
}

.status-pill.danger {
  background: #ffe7e7;
  color: #a43131;
}

.status-pill.blue {
  background: #eaf1ff;
  color: #2459c9;
}

.status-pill.green {
  background: #def8ea;
  color: #087f4d;
}

.status-pill.amber {
  background: #fff2d8;
  color: #976100;
}

.request-panel {
  min-width: 0;
}

.request-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
}

.request-head h2 {
  margin: 8px 0 0;
  color: var(--portal-text);
  font-size: clamp(30px, 3vw, 42px);
  line-height: 1;
  letter-spacing: -0.06em;
  font-weight: 800;
}

.request-head p:not(.eyebrow) {
  margin: 10px 0 0;
  color: #536173;
  font-size: 17px;
  line-height: 1.35;
}

.next-action-card {
  margin-top: 22px;
  border-radius: 24px;
  background: var(--portal-navy);
  color: white;
  padding: 24px;
  text-align: center;
}

.next-action-card span {
  display: block;
  color: rgba(255,255,255,0.62);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.next-action-card strong {
  display: block;
  max-width: 720px;
  margin: 12px auto 0;
  font-size: clamp(20px, 2.1vw, 28px);
  line-height: 1.26;
  letter-spacing: -0.04em;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: 16px;
}

.detail-grid article {
  min-height: 92px;
  border: 1px solid var(--portal-border);
  border-radius: 18px;
  background: rgba(255,255,255,0.66);
  padding: 18px;
}

.detail-grid span,
.timeline-top span {
  display: block;
  color: #7b8492;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.detail-grid strong {
  display: block;
  margin-top: 12px;
  color: var(--portal-text);
  font-size: 16px;
  line-height: 1.25;
}

.timeline-card {
  margin-top: 16px;
  border: 1px solid var(--portal-border);
  border-radius: 22px;
  background: rgba(255,255,255,0.68);
  padding: 20px;
}

.timeline-top {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
}

.timeline-top strong {
  font-size: 14px;
  color: #344054;
}

.progress-track {
  width: 100%;
  height: 9px;
  border-radius: 999px;
  background: #eee9df;
  overflow: hidden;
  margin-top: 16px;
}

.progress-track span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--portal-teal);
}

.timeline-list {
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px 24px;
}

.timeline-list article {
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr);
  gap: 12px;
  align-items: start;
}

.timeline-dot {
  width: 34px;
  height: 34px;
  border-radius: 999px;
  border: 1px solid var(--portal-border);
  display: grid;
  place-items: center;
  color: #98a2b3;
  background: white;
}

.timeline-dot.done {
  border-color: var(--portal-teal);
  background: var(--portal-teal);
  color: #073532;
}

.timeline-list strong {
  display: block;
  color: var(--portal-text);
  font-size: 15px;
  line-height: 1.25;
}

.timeline-list p {
  margin: 5px 0 0;
  color: #667085;
  font-size: 13px;
}

.request-actions {
  margin-top: 16px;
}

.request-actions > button {
  flex: 1 1 220px;
}

.side-stack {
  display: grid;
  gap: 20px;
}

.check-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-top: 20px;
}

.check-stats article {
  min-height: 90px;
  border: 1px solid var(--portal-border);
  border-radius: 18px;
  display: grid;
  place-items: center;
  text-align: center;
  padding: 12px 8px;
  background: rgba(255,255,255,0.68);
}

.check-stats strong {
  font-size: 30px;
  line-height: 1;
  letter-spacing: -0.04em;
}

.check-stats span {
  color: #667085;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.activity-list {
  margin-top: 20px;
  border-top: 1px solid var(--portal-border);
}

.activity-list article {
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr);
  gap: 12px;
  padding: 16px 0;
  border-bottom: 1px solid var(--portal-border);
}

.activity-list article:last-child {
  border-bottom: 0;
}

.activity-list span {
  width: 34px;
  height: 34px;
  border-radius: 999px;
  background: #e4f8f5;
  color: var(--portal-teal-dark);
  display: grid;
  place-items: center;
}

.activity-list strong {
  display: block;
  font-size: 14px;
  line-height: 1.32;
  color: var(--portal-text);
}

.activity-list p {
  margin: 5px 0 0;
  color: #667085;
  font-size: 13px;
  font-weight: 700;
}

.pharmacy-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(320px, 0.8fr);
  gap: 20px;
  margin-top: 24px;
  align-items: start;
}

.pharmacy-search-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 120px;
  gap: 12px;
  margin-top: 22px;
}

.postcode-box {
  margin-top: 0;
}

.route-card {
  position: relative;
  min-height: 330px;
  margin-top: 18px;
  overflow: hidden;
  border: 1px solid var(--portal-border);
  border-radius: 24px;
  background:
    radial-gradient(circle at 25% 70%, rgba(87, 203, 196, 0.22), transparent 16rem),
    radial-gradient(circle at 82% 26%, rgba(230, 217, 194, 0.72), transparent 17rem),
    #efeee8;
}

.map-soft-grid {
  position: absolute;
  inset: 0;
  opacity: 0.55;
  background-image:
    linear-gradient(rgba(255,255,255,0.82) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.82) 1px, transparent 1px);
  background-size: 64px 64px;
}

.road {
  position: absolute;
  height: 8px;
  border-radius: 999px;
  background: rgba(255,255,255,0.72);
  transform-origin: center;
}

.road-one {
  width: 78%;
  left: 10%;
  top: 60%;
  transform: rotate(-9deg);
}

.road-two {
  width: 52%;
  left: 5%;
  top: 33%;
  transform: rotate(16deg);
}

.road-three {
  width: 46%;
  right: 5%;
  top: 42%;
  transform: rotate(38deg);
}

.map-pin {
  position: absolute;
  z-index: 2;
  width: 52px;
  height: 52px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  box-shadow: 0 16px 34px rgba(16, 24, 39, 0.16);
}

.home-pin {
  left: 23%;
  bottom: 31%;
  background: var(--portal-navy);
  color: white;
}

.pharmacy-pin {
  right: 25%;
  top: 34%;
  background: var(--portal-teal);
  color: #063b37;
}

.small-map-dot {
  position: absolute;
  z-index: 2;
  width: 15px;
  height: 15px;
  border-radius: 999px;
  background: rgba(87, 203, 196, 0.65);
  box-shadow: 0 0 0 10px rgba(87, 203, 196, 0.12);
}

.dot-one {
  left: 35%;
  top: 42%;
}

.dot-two {
  left: 58%;
  bottom: 24%;
}

.dot-three {
  right: 16%;
  bottom: 38%;
}

.selected-pharmacy-card {
  position: absolute;
  z-index: 3;
  top: 20%;
  right: 6%;
  width: min(380px, 52%);
  border-radius: 20px;
  border: 1px solid var(--portal-border);
  background: rgba(255,255,255,0.9);
  box-shadow: 0 20px 50px rgba(16, 24, 39, 0.12);
  padding: 20px;
}

.selected-pharmacy-card strong {
  display: block;
  font-size: 19px;
  letter-spacing: -0.03em;
}

.selected-pharmacy-card p,
.selected-pharmacy-card span {
  display: block;
  margin: 8px 0 0;
  color: #475467;
  font-size: 14px;
  line-height: 1.4;
}

.pharmacy-options {
  display: grid;
  gap: 10px;
  margin-top: 20px;
}

.pharmacy-option {
  min-height: 74px;
  width: 100%;
  border-radius: 18px;
  border: 1px solid var(--portal-border);
  background: rgba(255,255,255,0.72);
  color: var(--portal-text);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  text-align: left;
  padding: 16px 18px;
}

.pharmacy-option.active {
  border-color: var(--portal-teal);
  box-shadow: 0 18px 40px rgba(87, 203, 196, 0.12);
}

.pharmacy-option strong {
  display: block;
  font-size: 15px;
  line-height: 1.2;
}

.pharmacy-option em {
  display: block;
  margin-top: 6px;
  color: #536173;
  font-size: 13px;
  font-style: normal;
}

.bottom-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 0.8fr);
  gap: 20px;
  margin-top: 24px;
}

.task-list {
  display: grid;
  gap: 12px;
  margin-top: 20px;
}

.task-list article {
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr);
  gap: 14px;
  border: 1px solid var(--portal-border);
  border-radius: 20px;
  background: rgba(255,255,255,0.72);
  padding: 18px;
}

.task-list span {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: #e4f8f5;
  color: var(--portal-teal-dark);
}

.task-list strong {
  display: block;
  font-size: 15px;
  line-height: 1.35;
}

.task-list p,
.task-list em {
  display: block;
  margin: 8px 0 0;
  color: #667085;
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
}

.tools-panel {
  display: grid;
  gap: 14px;
}

.tools-panel article {
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr);
  gap: 16px;
  border: 1px solid var(--portal-border);
  border-radius: 22px;
  background: rgba(255,255,255,0.7);
  padding: 20px;
}

.tools-panel article > span {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: var(--portal-navy);
  color: white;
  display: grid;
  place-items: center;
}

.tools-panel h3 {
  margin: 0;
  font-size: 18px;
  letter-spacing: -0.04em;
}

.tools-panel p {
  margin: 8px 0 0;
  color: #536173;
  font-size: 14px;
  line-height: 1.45;
}

.tools-panel button {
  margin-top: 14px;
  border: 0;
  background: transparent;
  color: var(--portal-text);
  font-size: 14px;
  font-weight: 800;
  padding: 0;
}

.mobile-bottom-nav {
  display: none;
}

.desktop-only {
  display: inline-flex;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 1180px) {
  .workspace-grid {
    grid-template-columns: 310px minmax(0, 1fr);
  }

  .side-stack {
    grid-column: 1 / -1;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .pharmacy-grid,
  .bottom-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .portal-header {
    height: 92px;
    padding: 0 20px;
  }

  .portal-nav,
  .desktop-only {
    display: none;
  }

  .brand {
    gap: 12px;
    font-size: 28px;
  }

  .brand-mark {
    width: 50px;
    height: 50px;
  }

  .portal-shell {
    padding: 16px 16px calc(130px + env(safe-area-inset-bottom));
  }

  .top-grid,
  .workspace-grid,
  .side-stack,
  .stats-grid,
  .pharmacy-grid,
  .bottom-grid {
    grid-template-columns: 1fr;
  }

  .hero-card,
  .shift-card,
  .people-panel,
  .request-panel,
  .check-panel,
  .activity-panel,
  .pharmacy-panel,
  .options-panel,
  .tasks-panel,
  .tools-panel {
    border-radius: 24px;
    padding: 20px;
  }

  .hero-card h1 {
    font-size: clamp(34px, 9vw, 42px);
    line-height: 1;
    letter-spacing: -0.065em;
  }

  .hero-copy {
    margin-top: 18px;
    font-size: 16px;
    line-height: 1.55;
  }

  .hero-actions,
  .shift-actions {
    display: grid;
    grid-template-columns: 1fr;
    margin-top: 24px;
  }

  .primary-button,
  .secondary-button,
  .role-select select,
  .dark-button {
    width: 100%;
    min-height: 52px;
    border-radius: 17px;
    font-size: 15px;
  }

  .shift-card strong {
    font-size: 44px;
  }

  .shift-card p {
    margin-top: 20px;
    font-size: 16px;
  }

  .stats-grid {
    gap: 10px;
  }

  .stat-card {
    min-height: 112px;
    padding: 18px;
  }

  .stat-card strong {
    font-size: 31px;
  }

  .panel-heading {
    gap: 14px;
  }

  .panel-icon {
    width: 50px;
    height: 50px;
    border-radius: 17px;
  }

  .panel-heading h2 {
    font-size: 22px;
  }

  .panel-heading p {
    font-size: 15px;
  }

  .person-row {
    min-height: 112px;
    padding: 14px;
  }

  .request-head {
    display: block;
  }

  .request-head h2 {
    font-size: 34px;
    line-height: 1.02;
  }

  .request-head p:not(.eyebrow) {
    font-size: 16px;
  }

  .request-head .status-pill {
    margin-top: 16px;
  }

  .next-action-card {
    padding: 22px 18px;
    border-radius: 22px;
  }

  .next-action-card strong {
    font-size: 22px;
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }

  .detail-grid article {
    min-height: 82px;
  }

  .timeline-list {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .request-actions {
    display: grid;
    grid-template-columns: 1fr;
  }

  .check-stats {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .check-stats article {
    min-height: 84px;
  }

  .pharmacy-search-row {
    grid-template-columns: 1fr;
  }

  .route-card {
    min-height: 320px;
  }

  .selected-pharmacy-card {
    top: 10%;
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    width: calc(100% - 48px);
  }

  .home-pin {
    left: 26%;
    bottom: 24%;
  }

  .pharmacy-pin {
    right: 18%;
    bottom: 33%;
    top: auto;
  }

  .pharmacy-option {
    min-height: 76px;
  }

  .tools-panel {
    grid-template-columns: 1fr;
  }

  .mobile-bottom-nav {
    position: fixed;
    left: 16px;
    right: 16px;
    bottom: calc(14px + env(safe-area-inset-bottom));
    z-index: 40;
    height: 76px;
    border-radius: 28px;
    background: #1b2533;
    box-shadow: 0 20px 55px rgba(16, 24, 39, 0.32);
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    padding: 8px;
  }

  .mobile-bottom-nav a {
    border-radius: 22px;
    color: rgba(255,255,255,0.68);
    display: grid;
    place-items: center;
    gap: 3px;
    text-decoration: none;
    font-size: 12px;
    font-weight: 800;
  }

  .mobile-bottom-nav a.active {
    background: rgba(87, 203, 196, 0.18);
    color: white;
  }
}

@media (max-width: 520px) {
  .portal-header {
    height: 86px;
    padding: 0 16px;
  }

  .brand {
    font-size: 25px;
  }

  .brand-mark {
    width: 46px;
    height: 46px;
  }

  .icon-button {
    width: 50px;
    height: 50px;
    border-radius: 17px;
  }

  .portal-shell {
    padding-inline: 14px;
  }

  .hero-card,
  .shift-card,
  .people-panel,
  .request-panel,
  .check-panel,
  .activity-panel,
  .pharmacy-panel,
  .options-panel,
  .tasks-panel,
  .tools-panel,
  .stat-card {
    border-radius: 22px;
  }

  .hero-card h1 {
    font-size: 36px;
  }

  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .stat-card {
    min-height: 106px;
  }

  .stat-card p {
    display: none;
  }

  .person-row {
    grid-template-columns: 46px minmax(0, 1fr);
    min-height: 106px;
  }

  .avatar-wrap,
  .person-avatar {
    width: 46px;
    height: 46px;
  }

  .status-pill {
    font-size: 11px;
    padding: 7px 10px;
  }

  .request-head h2 {
    font-size: 31px;
  }

  .next-action-card strong {
    font-size: 20px;
  }

  .detail-grid strong,
  .timeline-list strong {
    font-size: 15px;
  }

  .check-stats strong {
    font-size: 27px;
  }

  .route-card {
    min-height: 300px;
  }

  .selected-pharmacy-card strong {
    font-size: 17px;
  }

  .mobile-bottom-nav {
    left: 14px;
    right: 14px;
    height: 74px;
  }
}
`;