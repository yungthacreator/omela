"use client";

import { Inter } from "next/font/google";
import { useMemo, useState, type ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

type Role = "manager" | "support" | "family" | "pharmacy";
type Status = "needs-action" | "request-sent" | "ready" | "in-progress";

type Person = {
  id: string;
  tag: string;
  name: string;
  initials: string;
  medicine: string;
  dose: string;
  room: string;
  requestCode: string;
  status: Status;
  statusText: string;
  owner: string;
  supportWorker: string;
  familyContact: string;
  practice: string;
  pharmacy: string;
  supplyLeft: string;
  nextAction: string;
  progress: number;
  timeline: { title: string; time: string; done: boolean }[];
};

type Pharmacy = {
  name: string;
  distance: string;
  status: string;
  address: string;
  eta: string;
};

type PortalClientProps = {
  userName: string;
  userImage: string | null;
  signOutAction: (formData: FormData) => Promise<void>;
};

const people: Person[] = [
  {
    id: "margaret",
    tag: "PSW 1",
    name: "Margaret Littlewood",
    initials: "ML",
    medicine: "Amlodipine",
    dose: "5mg",
    room: "Room 04",
    requestCode: "RX-20814",
    status: "needs-action",
    statusText: "Needs action",
    owner: "Ada Kelly",
    supportWorker: "Tomi Adebayo",
    familyContact: "James Littlewood",
    practice: "Greenfield Medical",
    pharmacy: "Dalton Pharmacy",
    supplyLeft: "2 days",
    nextAction: "Call Greenfield Medical to confirm whether the request was approved.",
    progress: 58,
    timeline: [
      { title: "Cycle detected", time: "Today 08:10", done: true },
      { title: "Request prepared", time: "Today 08:24", done: true },
      { title: "Sent to practice", time: "Today 09:03", done: true },
      { title: "Approval confirmation", time: "Next step", done: false },
    ],
  },
  {
    id: "david",
    tag: "PSW 2",
    name: "David Reyes",
    initials: "DR",
    medicine: "Metformin",
    dose: "500mg",
    room: "Room 11",
    requestCode: "RX-20837",
    status: "request-sent",
    statusText: "Request sent",
    owner: "Ben Carter",
    supportWorker: "Ruth Ndlovu",
    familyContact: "Maria Reyes",
    practice: "Northgate Surgery",
    pharmacy: "Lockwood Pharmacy",
    supplyLeft: "6 days",
    nextAction: "Check that Northgate Surgery received the request.",
    progress: 46,
    timeline: [
      { title: "Cycle detected", time: "Yesterday 16:20", done: true },
      { title: "Request prepared", time: "Today 09:00", done: true },
      { title: "Sent to practice", time: "Today 09:15", done: true },
      { title: "Pharmacy update", time: "Waiting", done: false },
    ],
  },
  {
    id: "irene",
    tag: "PSW 3",
    name: "Irene Kowalski",
    initials: "IK",
    medicine: "Sertraline",
    dose: "50mg",
    room: "Room 07",
    requestCode: "RX-20806",
    status: "ready",
    statusText: "Ready",
    owner: "James Kowalski",
    supportWorker: "Maya Singh",
    familyContact: "Clara Moss",
    practice: "Hillside Practice",
    pharmacy: "Boots",
    supplyLeft: "14 days",
    nextAction: "Collection window open until 6pm.",
    progress: 92,
    timeline: [
      { title: "Request prepared", time: "Fri 14:20", done: true },
      { title: "Sent to practice", time: "Mon 09:03", done: true },
      { title: "Dispensed", time: "Today 11:20", done: true },
      { title: "Ready at pharmacy", time: "Today 12:44", done: true },
    ],
  },
  {
    id: "samuel",
    tag: "PSW 4",
    name: "Samuel Wright",
    initials: "SW",
    medicine: "Apixaban",
    dose: "5mg",
    room: "Room 02",
    requestCode: "RX-20901",
    status: "in-progress",
    statusText: "In progress",
    owner: "Clara Moss",
    supportWorker: "Ben Carter",
    familyContact: "Elaine Wright",
    practice: "Riverbank Surgery",
    pharmacy: "Well Pharmacy",
    supplyLeft: "4 days",
    nextAction: "Confirm the medication list before noon.",
    progress: 42,
    timeline: [
      { title: "Cycle detected", time: "Today 08:10", done: true },
      { title: "Reminder sent", time: "Today 08:11", done: true },
      { title: "Confirm medication list", time: "Today", done: false },
      { title: "Prepare request", time: "Next", done: false },
    ],
  },
];

const pharmacies: Pharmacy[] = [
  {
    name: "Dalton Pharmacy",
    distance: "0.4 miles",
    status: "Open until 6pm",
    address: "Market Street, Huddersfield",
    eta: "8 min drive",
  },
  {
    name: "Lockwood Pharmacy",
    distance: "0.8 miles",
    status: "Collection available",
    address: "Lockwood Road, Huddersfield",
    eta: "11 min drive",
  },
  {
    name: "Boots",
    distance: "1.2 miles",
    status: "Open until 7pm",
    address: "Town Centre",
    eta: "14 min drive",
  },
  {
    name: "Well Pharmacy",
    distance: "1.6 miles",
    status: "Prescription desk open",
    address: "Leeds Road",
    eta: "18 min drive",
  },
  {
    name: "PharmacyWise Heckmondike",
    distance: "3.4 miles",
    status: "Open until 6:30pm",
    address: "Heckmondwike",
    eta: "24 min drive",
  },
];

const roleLabels: Record<Role, string> = {
  manager: "Manager",
  support: "Support worker",
  family: "Family carer",
  pharmacy: "Pharmacy",
};

const activity = [
  { title: "Tomi updated Margaret’s request note", time: "Now" },
  { title: "Irene was marked ready for collection", time: "14m" },
  { title: "David’s request was sent to Northgate Surgery", time: "34m" },
  { title: "Samuel’s medication list needs confirmation", time: "1h" },
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

export default function PortalClient({
  userName,
  userImage,
  signOutAction,
}: PortalClientProps) {
  const [selectedId, setSelectedId] = useState("margaret");
  const [role, setRole] = useState<Role>("manager");
  const [selectedPharmacy, setSelectedPharmacy] = useState("Dalton Pharmacy");

  const selectedPerson = useMemo(
    () => people.find((person) => person.id === selectedId) ?? people[0],
    [selectedId]
  );

  const selectedPharmacyDetails = useMemo(
    () =>
      pharmacies.find((pharmacy) => pharmacy.name === selectedPharmacy) ??
      pharmacies[0],
    [selectedPharmacy]
  );

  const firstName = getFirstName(userName);

  const stats = {
    needsAction: people.filter((person) => person.status === "needs-action").length,
    inProgress: people.filter(
      (person) => person.status === "in-progress" || person.status === "request-sent"
    ).length,
    ready: people.filter((person) => person.status === "ready").length,
    supported: people.length,
  };

  return (
    <main className={`${inter.className} omela-portal`}>
      <header className="portal-topbar">
        <a href="/" className="portal-brand">
          <OmelaLogo />
          <span>Omela</span>
        </a>

        <nav className="portal-nav">
          <a href="#overview">Overview</a>
          <a href="#requests">Requests</a>
          <a href="#people">People</a>
          <a href="#pharmacy">Pharmacy</a>
          <a href="#tasks">Tasks</a>
        </nav>

        <div className="portal-actions">
          <button className="icon-button" aria-label="Notifications">
            <BellIcon />
            <span className="alert-dot" />
          </button>

          <div className="user-pill">
            {userImage ? <img src={userImage} alt="" /> : <span>{getInitial(userName)}</span>}
            <strong>{firstName}</strong>
          </div>

          <form action={signOutAction}>
            <button className="icon-button" type="submit" aria-label="Sign out">
              <LogOutIcon />
            </button>
          </form>
        </div>
      </header>

      <section className="portal-shell overview-grid" id="overview">
        <div className="hero-card">
          <span className="eyebrow">Today</span>
          <h1>Welcome back, {firstName}</h1>
          <p>
            See who needs support, which requests are moving, and what needs to be
            followed through before handover.
          </p>

          <div className="hero-actions">
            <button className="primary-btn">
              <PlusIcon />
              New request
            </button>

            <button className="secondary-btn">
              <MessageIcon />
              Open handover
            </button>

            <label className="view-select">
              <select
                value={role}
                onChange={(event) => setRole(event.target.value as Role)}
                aria-label="Choose workspace view"
              >
                <option value="manager">{roleLabels.manager}</option>
                <option value="support">{roleLabels.support}</option>
                <option value="family">{roleLabels.family}</option>
                <option value="pharmacy">{roleLabels.pharmacy}</option>
              </select>
            </label>
          </div>
        </div>

        <aside className="round-card">
          <div className="round-top">
            <div>
              <span>{roleLabels[role]} view</span>
              <strong>15:00</strong>
            </div>
            <div className="dark-icon">
              <ClockIcon />
            </div>
          </div>

          <p>
            Review requests, owners, pharmacy status, and tasks before the next
            handover.
          </p>

          <div className="round-actions">
            <button className="primary-btn">Start round</button>
            <button className="small-action" aria-label="More actions">
              <MoreIcon />
            </button>
          </div>
        </aside>
      </section>

      <section className="portal-shell stats-row">
        <Stat label="Needs action" value={stats.needsAction} tone="red" />
        <Stat label="In progress" value={stats.inProgress} tone="amber" />
        <Stat label="Ready" value={stats.ready} tone="green" />
        <Stat label="People supported" value={stats.supported} tone="dark" />
      </section>

      <section className="portal-shell workspace-grid" id="requests">
        <aside className="panel people-panel" id="people">
          <SectionTitle
            icon={<PeopleIcon />}
            title="People supported"
            subtitle="Select a person to view their request."
          />

          <label className="search-field">
            <SearchIcon />
            <input placeholder="Search people, PSW, request" />
          </label>

          <div className="people-list">
            {people.map((person) => (
              <button
                key={person.id}
                className={`person-row ${person.id === selectedId ? "is-active" : ""}`}
                onClick={() => {
                  setSelectedId(person.id);
                  setSelectedPharmacy(person.pharmacy);
                }}
              >
                <span className="person-avatar">
                  <UserIcon />
                  <small>{person.initials}</small>
                </span>

                <span className="person-copy">
                  <span className="person-title">
                    <strong>{person.name.split(" ")[0]}</strong>
                    <em>{person.tag}</em>
                  </span>
                  <span>
                    {person.medicine} {person.dose}
                  </span>
                  <small>{person.room}</small>
                </span>

                <span className={`portal-status person-status portal-status-${person.status}`}>
                  {person.statusText}
                </span>
              </button>
            ))}
          </div>
        </aside>

        <section className="panel request-panel">
          <div className="request-header">
            <div>
              <span className="eyebrow">Current request</span>
              <h2>{selectedPerson.name}</h2>
              <p>
                {selectedPerson.medicine} {selectedPerson.dose} ·{" "}
                {selectedPerson.requestCode} · Once daily
              </p>
            </div>

            <span className={`portal-status portal-status-${selectedPerson.status}`}>
              {selectedPerson.statusText}
            </span>
          </div>

          <div className="next-action">
            <span>Next action</span>
            <strong>{selectedPerson.nextAction}</strong>
          </div>

          <div className="request-meta">
            <InfoTile label="Owner" value={selectedPerson.owner} />
            <InfoTile label="Support worker" value={selectedPerson.supportWorker} />
            <InfoTile label="Supply left" value={selectedPerson.supplyLeft} />
          </div>

          <div className="timeline-card">
            <div className="timeline-top">
              <span>Timeline</span>
              <strong>{selectedPerson.progress}% complete</strong>
            </div>

            <div className="progress-bar">
              <span style={{ width: `${selectedPerson.progress}%` }} />
            </div>

            <div className="timeline-grid">
              {selectedPerson.timeline.map((step) => (
                <div className="timeline-item" key={step.title}>
                  <span className={`timeline-dot ${step.done ? "done" : ""}`}>
                    {step.done ? <CheckIcon /> : null}
                  </span>
                  <div>
                    <strong>{step.title}</strong>
                    <small>{step.time}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="request-actions">
            <button className="primary-btn">
              <CheckIcon />
              Mark ready
            </button>
            <button className="secondary-btn">
              <SendIcon />
              Send update
            </button>
          </div>
        </section>

        <aside className="side-column">
          <div className="panel compact-panel">
            <SectionTitle
              icon={<PulseIcon />}
              title="Request check"
              subtitle="Owner, practice, pharmacy, and next action."
            />

            <div className="mini-stats">
              <MiniStat value="5" label="Due soon" />
              <MiniStat value="3" label="Follow-up" />
              <MiniStat value="2" label="Ready" />
            </div>
          </div>

          <div className="panel compact-panel">
            <SectionTitle icon={<ActivityIcon />} title="Recent activity" />

            <div className="activity-list">
              {activity.map((item) => (
                <div className="activity-row" key={item.title}>
                  <span>
                    <MessageIcon />
                  </span>
                  <div>
                    <strong>{item.title}</strong>
                    <small>{item.time}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="portal-shell pharmacy-grid" id="pharmacy">
        <div className="panel map-panel">
          <div className="map-head">
            <SectionTitle
              icon={<MapPinIcon />}
              title="Pharmacy selection"
              subtitle="Search by postcode, compare nearby options, then choose where the request should go."
            />

            <button className="secondary-btn compact-btn">
              <RouteIcon />
              Route
            </button>
          </div>

          <div className="postcode-search">
            <SearchIcon />
            <input placeholder="Search postcode, town, or pharmacy" defaultValue="HD1" />
            <button>Search</button>
          </div>

          <div className="route-map">
            <span className="map-label map-label-home">Care home</span>
            <span className="map-label map-label-town">Huddersfield</span>
            <span className="map-label map-label-pharmacy">Selected pharmacy</span>

            <svg className="route-svg" viewBox="0 0 900 330" preserveAspectRatio="none">
              <path
                d="M110 215 C260 190, 320 135, 450 158 C590 184, 655 92, 790 118"
                className="route-path route-shadow"
              />
              <path
                d="M110 215 C260 190, 320 135, 450 158 C590 184, 655 92, 790 118"
                className="route-path route-main"
              />
            </svg>

            <span className="map-pin home-pin">
              <BuildingIcon />
            </span>

            <span className="moving-dot dot-one" />
            <span className="moving-dot dot-two" />
            <span className="moving-dot dot-three" />

            <span className="map-pin pharmacy-pin">
              <MapPinIcon />
            </span>

            <div className="pharmacy-popover">
              <strong>{selectedPharmacyDetails.name}</strong>
              <span>
                {selectedPharmacyDetails.distance} · {selectedPharmacyDetails.status}
              </span>
              <small>
                {selectedPharmacyDetails.address} · {selectedPharmacyDetails.eta}
              </small>
            </div>
          </div>
        </div>

        <aside className="panel pharmacy-panel">
          <SectionTitle icon={<RouteIcon />} title="Nearby options" />

          <div className="pharmacy-list">
            {pharmacies.map((pharmacy) => (
              <button
                key={pharmacy.name}
                className={`pharmacy-row ${
                  pharmacy.name === selectedPharmacy ? "is-active" : ""
                }`}
                onClick={() => setSelectedPharmacy(pharmacy.name)}
              >
                <span>
                  <strong>{pharmacy.name}</strong>
                  <small>
                    {pharmacy.distance} · {pharmacy.status}
                  </small>
                </span>
                <ChevronRightIcon />
              </button>
            ))}
          </div>
        </aside>
      </section>

      <section className="portal-shell bottom-grid" id="tasks">
        <div className="panel tasks-panel">
          <SectionTitle
            icon={<ChecklistIcon />}
            title="Tasks"
            subtitle="Actions assigned across the care team."
          />

          <div className="task-list">
            {tasks.map((task) => (
              <div className="task-row" key={task.title}>
                <span>
                  <CheckIcon />
                </span>
                <div>
                  <strong>{task.title}</strong>
                  <small>{task.owner}</small>
                </div>
                <em>{task.due}</em>
              </div>
            ))}
          </div>
        </div>

        <ModuleCard
          icon={<FileIcon />}
          title="Documents"
          text="Keep notes, handover context, and pharmacy updates attached to the right person."
          cta="View documents"
        />

        <ModuleCard
          icon={<PeopleIcon />}
          title="Care team"
          text="Manage roles, owners, visibility, and who can update each request."
          cta="Manage team"
        />
      </section>

      <nav className="mobile-tabs">
        <a href="#overview">
          <HomeIcon />
          Home
        </a>
        <a href="#requests">
          <ChecklistIcon />
          Requests
        </a>
        <a href="#people">
          <PeopleIcon />
          People
        </a>
        <a href="#pharmacy">
          <MapPinIcon />
          Pharmacy
        </a>
      </nav>

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #f8f6f1;
        }

        button,
        input,
        select {
          font: inherit;
        }

        .omela-portal {
          min-height: 100vh;
          color: #101827;
          background:
            radial-gradient(circle at 50% 0%, rgba(83, 203, 194, 0.12), transparent 32rem),
            linear-gradient(180deg, #fbfaf7 0%, #f6f2eb 100%);
          padding-bottom: 56px;
        }

        .portal-topbar {
          position: sticky;
          top: 0;
          z-index: 50;
          height: 74px;
          padding: 0 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 22px;
          background: rgba(250, 247, 242, 0.92);
          border-bottom: 1px solid rgba(16, 24, 39, 0.08);
          backdrop-filter: blur(18px);
        }

        .portal-brand {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #0b0b0b;
          text-decoration: none;
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.05em;
          white-space: nowrap;
        }

        .portal-nav {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .portal-nav a {
          color: #171717;
          text-decoration: none;
          font-size: 14px;
          font-weight: 700;
        }

        .portal-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .icon-button,
        .small-action {
          position: relative;
          width: 42px;
          height: 42px;
          border: 1px solid rgba(16, 24, 39, 0.1);
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.74);
          color: #101827;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .alert-dot {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: #c43d3d;
          border: 2px solid #fff;
        }

        .user-pill {
          height: 42px;
          padding: 5px 14px 5px 6px;
          border: 1px solid rgba(16, 24, 39, 0.1);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.74);
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .user-pill img,
        .user-pill span {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #dbe9ec;
          color: #29434a;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 800;
        }

        .user-pill strong {
          font-size: 14px;
          font-weight: 700;
        }

        .portal-shell {
          width: min(1500px, calc(100% - 56px));
          margin: 0 auto;
        }

        .overview-grid {
          padding-top: 24px;
          display: grid;
          grid-template-columns: minmax(0, 1.45fr) minmax(300px, 0.65fr);
          gap: 20px;
        }

        .hero-card,
        .round-card,
        .stat-card,
        .panel,
        .module-card {
          background: rgba(255, 255, 255, 0.76);
          border: 1px solid rgba(16, 24, 39, 0.09);
          box-shadow: 0 22px 60px rgba(15, 23, 42, 0.05);
        }

        .hero-card {
          border-radius: 24px;
          padding: 30px;
        }

        .eyebrow {
          display: inline-flex;
          color: #007c78;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .hero-card h1 {
          max-width: 720px;
          margin: 12px 0 14px;
          font-size: clamp(32px, 4vw, 48px);
          line-height: 0.98;
          letter-spacing: -0.07em;
          font-weight: 800;
        }

        .hero-card p {
          max-width: 760px;
          margin: 0;
          color: #405064;
          font-size: 15px;
          line-height: 1.58;
        }

        .hero-actions {
          margin-top: 24px;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .primary-btn,
        .secondary-btn {
          height: 46px;
          border-radius: 15px;
          padding: 0 18px;
          border: 1px solid transparent;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
        }

        .primary-btn {
          background: #55cbc3;
          color: #071b1b;
          box-shadow: 0 16px 34px rgba(83, 203, 194, 0.2);
        }

        .secondary-btn {
          background: rgba(255, 255, 255, 0.78);
          border-color: rgba(16, 24, 39, 0.1);
          color: #101827;
        }

        .compact-btn {
          height: 42px;
          padding: 0 14px;
        }

        .view-select select {
          height: 46px;
          min-width: 168px;
          border-radius: 15px;
          padding: 0 16px;
          border: 1px solid rgba(16, 24, 39, 0.1);
          background: rgba(255, 255, 255, 0.78);
          color: #101827;
          font-size: 14px;
          font-weight: 700;
          outline: none;
        }

        .round-card {
          border-radius: 24px;
          padding: 26px;
        }

        .round-top {
          display: flex;
          justify-content: space-between;
          gap: 18px;
        }

        .round-top span {
          display: block;
          color: #778292;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .round-top strong {
          display: block;
          margin-top: 8px;
          font-size: 38px;
          line-height: 1;
          letter-spacing: -0.06em;
          font-weight: 600;
        }

        .dark-icon {
          width: 52px;
          height: 52px;
          border-radius: 17px;
          background: #101827;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .round-card p {
          margin: 20px 0 24px;
          color: #405064;
          font-size: 14px;
          line-height: 1.55;
        }

        .round-actions {
          display: grid;
          grid-template-columns: 1fr 52px;
          gap: 12px;
        }

        .stats-row {
          margin-top: 16px;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
        }

        .stat-card {
          border-radius: 18px;
          padding: 17px;
        }

        .stat-card span {
          display: block;
          color: #778292;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .stat-card strong {
          display: block;
          margin-top: 8px;
          font-size: 25px;
          line-height: 1;
          letter-spacing: -0.05em;
          font-weight: 750;
        }

        .stat-red strong {
          color: #a63333;
        }

        .stat-amber strong {
          color: #a66405;
        }

        .stat-green strong {
          color: #087a42;
        }

        .workspace-grid {
          margin-top: 16px;
          display: grid;
          grid-template-columns: minmax(270px, 0.78fr) minmax(0, 1.6fr) minmax(270px, 0.78fr);
          gap: 18px;
          align-items: start;
        }

        .panel,
        .module-card {
          border-radius: 23px;
          overflow: hidden;
          padding: 22px;
        }

        .section-title {
          display: flex;
          align-items: flex-start;
          gap: 13px;
          margin-bottom: 16px;
        }

        .soft-icon {
          flex: 0 0 auto;
          width: 40px;
          height: 40px;
          border-radius: 14px;
          background: rgba(83, 203, 194, 0.14);
          color: #007c78;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .section-title h2,
        .section-title h3,
        .module-card h3 {
          margin: 0;
          font-size: 18px;
          line-height: 1.12;
          letter-spacing: -0.04em;
          font-weight: 750;
        }

        .section-title p {
          margin: 5px 0 0;
          color: #657386;
          font-size: 13px;
          line-height: 1.42;
        }

        .search-field,
        .postcode-search {
          height: 44px;
          border-radius: 15px;
          border: 1px solid rgba(16, 24, 39, 0.09);
          background: rgba(255, 255, 255, 0.78);
          padding: 0 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          color: #94a3b8;
        }

        .search-field input,
        .postcode-search input {
          width: 100%;
          border: 0;
          outline: 0;
          background: transparent;
          color: #101827;
          font-size: 14px;
        }

        .postcode-search button {
          height: 32px;
          border: 0;
          border-radius: 11px;
          background: #101827;
          color: white;
          padding: 0 12px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .people-list {
          margin-top: 14px;
          display: grid;
          gap: 11px;
        }

        .person-row {
          width: 100%;
          min-height: 86px;
          border: 1px solid rgba(16, 24, 39, 0.09);
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.75);
          padding: 12px;
          display: grid;
          grid-template-columns: 40px minmax(0, 1fr);
          gap: 10px;
          color: #101827;
          text-align: left;
          cursor: pointer;
        }

        .person-row.is-active {
          border-color: rgba(83, 203, 194, 0.85);
          box-shadow: 0 16px 34px rgba(83, 203, 194, 0.1);
        }

        .person-avatar {
          position: relative;
          width: 40px;
          height: 40px;
          border-radius: 999px;
          background: rgba(83, 203, 194, 0.14);
          color: #007c78;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .person-avatar small {
          position: absolute;
          right: -5px;
          bottom: -5px;
          width: 22px;
          height: 22px;
          border-radius: 999px;
          background: white;
          border: 1px solid rgba(83, 203, 194, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 800;
        }

        .person-copy {
          min-width: 0;
        }

        .person-title {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .person-title strong {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 14px;
          line-height: 1.15;
          font-weight: 750;
          letter-spacing: -0.03em;
        }

        .person-title em {
          flex: 0 0 auto;
          padding: 4px 7px;
          border-radius: 999px;
          background: #f4f0e8;
          border: 1px solid rgba(16, 24, 39, 0.08);
          color: #667085;
          font-size: 10px;
          line-height: 1;
          font-style: normal;
          font-weight: 800;
        }

        .person-copy > span:not(.person-title),
        .person-copy > small {
          display: block;
          margin-top: 5px;
          color: #405064;
          font-size: 13px;
          line-height: 1.2;
        }

        .person-copy > small {
          color: #7b8493;
          font-weight: 650;
        }

        .portal-status {
          display: inline-flex;
          align-items: center;
          width: fit-content;
          max-width: 100%;
          border-radius: 999px;
          white-space: nowrap;
          font-size: 11px;
          line-height: 1;
          font-weight: 750;
        }

        .person-status {
          grid-column: 2;
          margin-top: 8px;
          padding: 6px 9px;
        }

        .request-header .portal-status {
          padding: 8px 11px;
        }

        .portal-status-needs-action {
          background: #ffeaea;
          color: #a63333;
        }

        .portal-status-request-sent {
          background: #eaf1ff;
          color: #2457c5;
        }

        .portal-status-ready {
          background: #e5f8ed;
          color: #087a42;
        }

        .portal-status-in-progress {
          background: #fff4dc;
          color: #9a6208;
        }

        .request-header {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          align-items: flex-start;
        }

        .request-header h2 {
          margin: 8px 0 5px;
          font-size: clamp(24px, 2.7vw, 32px);
          line-height: 1;
          letter-spacing: -0.06em;
          font-weight: 800;
        }

        .request-header p {
          margin: 0;
          color: #405064;
          font-size: 14px;
          line-height: 1.45;
        }

        .next-action {
          margin-top: 18px;
          border-radius: 19px;
          padding: 20px 22px;
          background: #101827;
          color: white;
          text-align: center;
        }

        .next-action span {
          display: block;
          margin-bottom: 8px;
          color: #aab3c0;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .next-action strong {
          display: block;
          max-width: 620px;
          margin: 0 auto;
          font-size: clamp(16px, 1.8vw, 20px);
          line-height: 1.35;
          letter-spacing: -0.035em;
          font-weight: 750;
        }

        .request-meta {
          margin-top: 13px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 11px;
        }

        .info-tile {
          min-width: 0;
          border: 1px solid rgba(16, 24, 39, 0.09);
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.7);
          padding: 14px;
        }

        .info-tile span {
          display: block;
          color: #778292;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .info-tile strong {
          display: block;
          margin-top: 8px;
          font-size: 14px;
          line-height: 1.25;
          font-weight: 750;
        }

        .timeline-card {
          margin-top: 13px;
          border: 1px solid rgba(16, 24, 39, 0.09);
          border-radius: 19px;
          background: rgba(255, 255, 255, 0.7);
          padding: 17px;
        }

        .timeline-top {
          display: flex;
          justify-content: space-between;
          gap: 14px;
        }

        .timeline-top span {
          color: #778292;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .timeline-top strong {
          color: #405064;
          font-size: 13px;
          font-weight: 750;
        }

        .progress-bar {
          height: 8px;
          margin: 13px 0 16px;
          border-radius: 999px;
          background: #ede9df;
          overflow: hidden;
        }

        .progress-bar span {
          display: block;
          height: 100%;
          border-radius: inherit;
          background: #55cbc3;
        }

        .timeline-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .timeline-item {
          display: grid;
          grid-template-columns: 28px 1fr;
          gap: 10px;
          align-items: start;
        }

        .timeline-dot {
          width: 27px;
          height: 27px;
          border-radius: 999px;
          border: 1px solid rgba(16, 24, 39, 0.12);
          background: #fff;
          color: #063635;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .timeline-dot.done {
          border-color: #55cbc3;
          background: #55cbc3;
        }

        .timeline-item strong {
          display: block;
          font-size: 13px;
          line-height: 1.25;
          font-weight: 750;
        }

        .timeline-item small {
          display: block;
          margin-top: 3px;
          color: #667085;
          font-size: 12px;
          font-weight: 600;
        }

        .request-actions {
          margin-top: 14px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .side-column {
          display: grid;
          gap: 18px;
        }

        .mini-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 9px;
          margin-top: 16px;
        }

        .mini-stat {
          border: 1px solid rgba(16, 24, 39, 0.09);
          border-radius: 16px;
          padding: 12px 7px;
          text-align: center;
          background: rgba(255, 255, 255, 0.72);
        }

        .mini-stat strong {
          display: block;
          font-size: 23px;
          line-height: 1;
          font-weight: 750;
          letter-spacing: -0.05em;
        }

        .mini-stat span {
          display: block;
          margin-top: 6px;
          color: #667085;
          font-size: 10px;
          line-height: 1.15;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .activity-list {
          display: grid;
          border-top: 1px solid rgba(16, 24, 39, 0.08);
        }

        .activity-row {
          display: grid;
          grid-template-columns: 32px 1fr;
          gap: 11px;
          padding: 13px 0;
          border-bottom: 1px solid rgba(16, 24, 39, 0.08);
        }

        .activity-row > span {
          width: 30px;
          height: 30px;
          border-radius: 999px;
          background: rgba(83, 203, 194, 0.14);
          color: #007c78;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .activity-row strong {
          display: block;
          font-size: 13px;
          line-height: 1.35;
          font-weight: 650;
        }

        .activity-row small {
          display: block;
          margin-top: 3px;
          color: #667085;
          font-size: 12px;
          font-weight: 600;
        }

        .pharmacy-grid {
          margin-top: 16px;
          display: grid;
          grid-template-columns: minmax(0, 1.35fr) minmax(340px, 0.85fr);
          gap: 18px;
          align-items: start;
        }

        .map-head {
          display: flex;
          justify-content: space-between;
          gap: 18px;
          align-items: flex-start;
        }

        .postcode-search {
          margin-top: 4px;
          margin-bottom: 14px;
        }

        .route-map {
          position: relative;
          height: 320px;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(16, 24, 39, 0.09);
          background:
            linear-gradient(rgba(255, 255, 255, 0.55) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.55) 1px, transparent 1px),
            radial-gradient(circle at 26% 58%, rgba(83, 203, 194, 0.22), transparent 13rem),
            radial-gradient(circle at 72% 34%, rgba(16, 24, 39, 0.11), transparent 15rem),
            linear-gradient(135deg, #e7eadf, #ece4d8);
          background-size: 46px 46px, 46px 46px, auto, auto, auto;
        }

        .route-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .route-path {
          fill: none;
          stroke-linecap: round;
        }

        .route-shadow {
          stroke: rgba(255, 255, 255, 0.9);
          stroke-width: 10;
        }

        .route-main {
          stroke: rgba(83, 203, 194, 0.65);
          stroke-width: 4;
          stroke-dasharray: 10 10;
          animation: routeDash 16s linear infinite;
        }

        .map-label {
          position: absolute;
          z-index: 3;
          padding: 5px 8px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.7);
          color: #667085;
          font-size: 11px;
          font-weight: 700;
          backdrop-filter: blur(8px);
        }

        .map-label-home {
          left: 11%;
          top: 63%;
        }

        .map-label-town {
          left: 42%;
          top: 18%;
        }

        .map-label-pharmacy {
          right: 12%;
          top: 38%;
        }

        .map-pin {
          position: absolute;
          z-index: 5;
          width: 42px;
          height: 42px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 16px 32px rgba(15, 23, 42, 0.16);
        }

        .home-pin {
          left: 21%;
          top: 58%;
          background: #101827;
          color: white;
        }

        .pharmacy-pin {
          right: 20%;
          top: 34%;
          background: #55cbc3;
          color: #063635;
        }

        .moving-dot {
          position: absolute;
          z-index: 4;
          width: 9px;
          height: 9px;
          border-radius: 999px;
          background: #55cbc3;
          box-shadow: 0 0 0 8px rgba(83, 203, 194, 0.15);
          animation: pulseDot 1.8s ease-in-out infinite;
        }

        .dot-one {
          left: 36%;
          top: 48%;
        }

        .dot-two {
          left: 50%;
          top: 43%;
          animation-delay: 0.35s;
        }

        .dot-three {
          left: 64%;
          top: 36%;
          animation-delay: 0.7s;
        }

        .pharmacy-popover {
          position: absolute;
          z-index: 6;
          right: 7%;
          top: 15%;
          width: min(330px, calc(100% - 42px));
          border-radius: 17px;
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid rgba(16, 24, 39, 0.09);
          box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12);
          padding: 16px;
        }

        .pharmacy-popover strong {
          display: block;
          font-size: 16px;
          font-weight: 750;
        }

        .pharmacy-popover span,
        .pharmacy-popover small {
          display: block;
          margin-top: 6px;
          color: #405064;
          font-size: 13px;
          line-height: 1.42;
        }

        .pharmacy-list {
          display: grid;
          gap: 10px;
        }

        .pharmacy-row {
          width: 100%;
          min-height: 68px;
          border-radius: 17px;
          border: 1px solid rgba(16, 24, 39, 0.09);
          background: rgba(255, 255, 255, 0.74);
          color: #101827;
          padding: 13px 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          text-align: left;
          cursor: pointer;
        }

        .pharmacy-row.is-active {
          border-color: rgba(83, 203, 194, 0.85);
          box-shadow: 0 14px 30px rgba(83, 203, 194, 0.1);
        }

        .pharmacy-row strong {
          display: block;
          font-size: 14px;
          font-weight: 750;
        }

        .pharmacy-row small {
          display: block;
          margin-top: 5px;
          color: #405064;
          font-size: 13px;
        }

        .bottom-grid {
          margin-top: 16px;
          display: grid;
          grid-template-columns: minmax(0, 1.35fr) repeat(2, minmax(260px, 0.8fr));
          gap: 18px;
        }

        .task-list {
          display: grid;
          gap: 10px;
        }

        .task-row {
          min-height: 64px;
          border-radius: 17px;
          border: 1px solid rgba(16, 24, 39, 0.09);
          background: rgba(255, 255, 255, 0.72);
          padding: 13px;
          display: grid;
          grid-template-columns: 30px 1fr auto;
          gap: 11px;
          align-items: center;
        }

        .task-row > span {
          width: 28px;
          height: 28px;
          border-radius: 999px;
          background: rgba(83, 203, 194, 0.14);
          color: #007c78;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .task-row strong {
          display: block;
          font-size: 13px;
          line-height: 1.32;
          font-weight: 650;
        }

        .task-row small {
          display: block;
          margin-top: 4px;
          color: #667085;
          font-size: 12px;
          font-weight: 600;
        }

        .task-row em {
          color: #667085;
          font-size: 12px;
          font-style: normal;
          font-weight: 700;
          white-space: nowrap;
        }

        .module-card {
          display: flex;
          flex-direction: column;
        }

        .module-card .soft-icon {
          margin-bottom: 16px;
          background: #101827;
          color: white;
        }

        .module-card p {
          margin: 10px 0 20px;
          color: #405064;
          font-size: 14px;
          line-height: 1.55;
        }

        .module-card a {
          margin-top: auto;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #101827;
          text-decoration: none;
          font-size: 14px;
          font-weight: 700;
        }

        .mobile-tabs {
          display: none;
        }

        @keyframes routeDash {
          to {
            stroke-dashoffset: -160;
          }
        }

        @keyframes pulseDot {
          0%,
          100% {
            transform: scale(0.82);
            opacity: 0.55;
          }
          50% {
            transform: scale(1.25);
            opacity: 1;
          }
        }

        @media (max-width: 1180px) {
          .portal-nav {
            display: none;
          }

          .overview-grid,
          .workspace-grid,
          .pharmacy-grid,
          .bottom-grid {
            grid-template-columns: 1fr;
          }

          .stats-row {
            grid-template-columns: repeat(2, 1fr);
          }

          .side-column {
            grid-template-columns: repeat(2, 1fr);
          }

          .bottom-grid {
            grid-template-columns: 1fr 1fr;
          }

          .tasks-panel {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 720px) {
          .omela-portal {
            padding-bottom: 92px;
          }

          .portal-topbar {
            height: 70px;
            padding: 0 16px;
          }

          .portal-brand {
            font-size: 21px;
          }

          .portal-actions .icon-button:first-child,
          .user-pill {
            display: none;
          }

          .portal-shell {
            width: min(100% - 28px, 620px);
          }

          .overview-grid {
            padding-top: 16px;
          }

          .hero-card,
          .round-card,
          .panel,
          .module-card {
            padding: 18px;
          }

          .hero-card h1 {
            font-size: 31px;
            line-height: 1.02;
          }

          .hero-card p,
          .round-card p {
            font-size: 14px;
          }

          .hero-actions,
          .request-actions {
            display: grid;
            grid-template-columns: 1fr;
          }

          .primary-btn,
          .secondary-btn,
          .view-select select {
            width: 100%;
          }

          .stats-row,
          .side-column,
          .request-meta,
          .timeline-grid,
          .pharmacy-grid,
          .bottom-grid {
            grid-template-columns: 1fr;
          }

          .request-header {
            display: grid;
          }

          .request-header h2 {
            font-size: 27px;
          }

          .next-action {
            padding: 18px;
          }

          .next-action strong {
            font-size: 16px;
          }

          .map-head {
            display: grid;
          }

          .route-map {
            height: 300px;
          }

          .pharmacy-popover {
            left: 18px;
            right: 18px;
            top: 18px;
            width: auto;
          }

          .home-pin {
            left: 18%;
            top: 66%;
          }

          .pharmacy-pin {
            right: 18%;
            top: 48%;
          }

          .map-label {
            display: none;
          }

          .task-row {
            grid-template-columns: 30px 1fr;
          }

          .task-row em {
            grid-column: 2;
          }

          .mobile-tabs {
            position: fixed;
            left: 12px;
            right: 12px;
            bottom: 12px;
            z-index: 80;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 6px;
            padding: 8px;
            border-radius: 24px;
            background: rgba(16, 24, 39, 0.93);
            box-shadow: 0 22px 60px rgba(15, 23, 42, 0.28);
            backdrop-filter: blur(18px);
          }

          .mobile-tabs a {
            min-height: 52px;
            border-radius: 17px;
            color: rgba(255, 255, 255, 0.74);
            text-decoration: none;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 3px;
            font-size: 11px;
            font-weight: 700;
          }

          .mobile-tabs a:first-child {
            color: #fff;
            background: rgba(83, 203, 194, 0.18);
          }
        }
      `}</style>
    </main>
  );
}

function SectionTitle({
  icon,
  title,
  subtitle,
}: {
  icon: ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="section-title">
      <div className="soft-icon">{icon}</div>
      <div>
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "red" | "amber" | "green" | "dark";
}) {
  return (
    <div className={`stat-card stat-${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="info-tile">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="mini-stat">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function ModuleCard({
  icon,
  title,
  text,
  cta,
}: {
  icon: ReactNode;
  title: string;
  text: string;
  cta: string;
}) {
  return (
    <div className="module-card">
      <div className="soft-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
      <a href="#">
        {cta}
        <ChevronRightIcon />
      </a>
    </div>
  );
}

function getFirstName(value?: string | null) {
  const cleaned = value?.trim();
  if (!cleaned) return "there";
  if (cleaned.includes("@")) return cleaned.split("@")[0];
  return cleaned.split(" ")[0];
}

function getInitial(value?: string | null) {
  const cleaned = value?.trim();
  if (!cleaned) return "O";
  return cleaned.charAt(0).toUpperCase();
}

function OmelaLogo() {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" aria-hidden="true">
      <circle cx="21" cy="21" r="19" stroke="currentColor" strokeWidth="3" />
      <path
        d="M9 21h5l2.3-7.5 5.1 16 3.2-10.4 2 5.7H33"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {children}
    </svg>
  );
}

function BellIcon() {
  return (
    <Icon>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M13.7 21a2 2 0 0 1-3.4 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </Icon>
  );
}

function LogOutIcon() {
  return (
    <Icon>
      <path d="M10 17l5-5-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M21 4v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </Icon>
  );
}

function PlusIcon() {
  return (
    <Icon>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </Icon>
  );
}

function MessageIcon() {
  return (
    <Icon>
      <path d="M21 12a8 8 0 0 1-8 8H7l-4 2 1.4-4A8 8 0 1 1 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  );
}

function ClockIcon() {
  return (
    <Icon>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </Icon>
  );
}

function MoreIcon() {
  return (
    <Icon>
      <path d="M6 12h.01M12 12h.01M18 12h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </Icon>
  );
}

function PeopleIcon() {
  return (
    <Icon>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </Icon>
  );
}

function SearchIcon() {
  return (
    <Icon>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </Icon>
  );
}

function UserIcon() {
  return (
    <Icon>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M5 21a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </Icon>
  );
}

function PulseIcon() {
  return (
    <Icon>
      <path d="M3 12h4l2-6 4 12 2-6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  );
}

function ActivityIcon() {
  return (
    <Icon>
      <path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    </Icon>
  );
}

function CheckIcon() {
  return (
    <Icon>
      <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  );
}

function SendIcon() {
  return (
    <Icon>
      <path d="M22 2 11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M22 2 15 22l-4-9-9-4 20-7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  );
}

function MapPinIcon() {
  return (
    <Icon>
      <path d="M12 21s7-5.1 7-12a7 7 0 1 0-14 0c0 6.9 7 12 7 12Z" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
    </Icon>
  );
}

function RouteIcon() {
  return (
    <Icon>
      <path d="M6 19c3.5 0 4-3 6-3s2.5 3 6 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="6" cy="5" r="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="2" />
    </Icon>
  );
}

function BuildingIcon() {
  return (
    <Icon>
      <path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 9h2a2 2 0 0 1 2 2v10M8 7h4M8 11h4M8 15h4M3 21h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </Icon>
  );
}

function ChevronRightIcon() {
  return (
    <Icon>
      <path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  );
}

function ChecklistIcon() {
  return (
    <Icon>
      <path d="M9 6h11M9 12h11M9 18h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="m3 6 1 1 2-2M3 12l1 1 2-2M3 18l1 1 2-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  );
}

function FileIcon() {
  return (
    <Icon>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 2v6h6M8 13h8M8 17h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </Icon>
  );
}

function HomeIcon() {
  return (
    <Icon>
      <path d="m3 11 9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  );
}