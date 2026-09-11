"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bot,
  BrainCircuit,
  ChevronRight,
  CircleHelp,
  Clock3,
  Gauge,
  GitBranch,
  LayoutDashboard,
  Menu,
  Pause,
  Play,
  RotateCcw,
  Search,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  TrainFront,
  TriangleAlert,
  X,
  Zap,
} from "lucide-react";

type Risk = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
const navGroups = [
  {
    label: "",
    items: [
      ["Overview", LayoutDashboard],
      ["Live Network", GitBranch],
      ["Train Operations", TrainFront],
      ["Track Status", Activity],
      ["Junction Status", GitBranch],
    ],
  },
  {
    label: "TRAFFIC MANAGEMENT",
    items: [
      ["Conflicts", TriangleAlert],
      ["ETA Forecast", Clock3],
      ["Scenario Simulator", SlidersHorizontal],
      ["Recommendations", BrainCircuit],
    ],
  },
  {
    label: "ANALYTICS",
    items: [
      ["Network Analytics", BarChart3],
      ["Train Performance", Gauge],
      ["Delay Analysis", BarChart3],
      ["Railway Operations Assistant", Bot],
    ],
  },
  {
    label: "SYSTEM",
    items: [
      ["System Logs", Search],
      ["Settings", Settings2],
    ],
  },
] as const;
const initialTrains = [
  [
    "12951",
    "Mumbai Rajdhani",
    "J1 / Main line",
    "86 km/h",
    "+08m",
    "JODHPUR",
    "HIGH",
  ],
  [
    "12424",
    "Dibrugarh Rajdhani",
    "J2 / Loop 3",
    "72 km/h",
    "+03m",
    "NEW DELHI",
    "MEDIUM",
  ],
  [
    "12952",
    "Mumbai Central Rajdhani",
    "J1 / Main line",
    "84 km/h",
    "+12m",
    "MUMBAI",
    "HIGH",
  ],
  [
    "12841",
    "Coromandel Express",
    "J4 / East line",
    "91 km/h",
    "+01m",
    "CHENNAI",
    "LOW",
  ],
  [
    "12302",
    "Howrah Rajdhani",
    "J3 / Main line",
    "78 km/h",
    "+06m",
    "HOWRAH",
    "MEDIUM",
  ],
];
const defaultAlerts = [
  [
    "C-104",
    "Junction J1",
    "12951 vs 12952",
    "14:42 / 14:47",
    "04 min",
    "78%",
    "CRITICAL",
  ],
  [
    "C-107",
    "Junction J3",
    "12302 vs 12424",
    "14:56 / 15:01",
    "06 min",
    "64%",
    "HIGH",
  ],
  [
    "C-109",
    "Junction J4",
    "12841 vs 12259",
    "15:12 / 15:14",
    "02 min",
    "83%",
    "HIGH",
  ],
];
const riskClass = (risk: string) =>
  ({
    CRITICAL: "risk-critical",
    HIGH: "risk-high",
    MEDIUM: "risk-medium",
    LOW: "risk-low",
  })[risk] || "risk-low";

function Pill({
  children,
  risk,
}: {
  children: React.ReactNode;
  risk?: string;
}) {
  return (
    <span className={risk ? `risk-pill ${riskClass(risk)}` : "status-pill"}>
      {children}
    </span>
  );
}
function Panel({
  title,
  eyebrow,
  children,
  action,
  onAction,
}: {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <section className="panel">
      <div className="panel-head">
        <div>
          {eyebrow && <div className="eyebrow">{eyebrow}</div>}
          <h2>{title}</h2>
        </div>
        {action && (
          <button className="text-action" onClick={onAction}>
            {action}
            <ChevronRight size={15} />
          </button>
        )}
      </div>
      {children}
    </section>
  );
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("operator@railmind.ai");
  const [password, setPassword] = useState("railmind-demo");
  const [error, setError] = useState("");

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email === "operator@railmind.ai" && password === "railmind-demo") {
      window.sessionStorage.setItem("railmind-authenticated", "true");
      onLogin();
    } else {
      setError("Use the demo operator credentials shown below.");
    }
  };

  return (
    <main className="login-shell">
      <div className="login-grid" />
      <section className="login-panel">
        <div className="login-brand">
          <div className="brand-mark">
            <TrainFront size={21} />
          </div>
          <div>
            <strong>
              RailMind <em>AI</em>
            </strong>
          </div>
        </div>
        <div className="login-copy">
          <div className="eyebrow">SECURE CONTROL CENTER</div>
          <h1>Welcome back, operator.</h1>
          <p>
            Sign in to monitor railway flow, resolve conflicts, and review live
            network intelligence.
          </p>
        </div>
        <form className="login-form" onSubmit={submit}>
          <label>
            Email address
            <input
              aria-label="Email address"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              aria-label="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          {error && (
            <div className="login-error" role="alert">
              {error}
            </div>
          )}
          <button
            className="primary-button login-button"
            type="button"
            onClick={() =>
              submit({
                preventDefault: () => {},
              } as React.FormEvent<HTMLFormElement>)
            }
          >
            <ShieldCheck size={16} /> Enter control center
          </button>
        </form>
        <div className="demo-credentials">
          <span>DEMO OPERATOR ACCESS</span>
          <strong>operator@railmind.ai</strong>
          <small>Password: railmind-demo</small>
        </div>
        <p className="login-footer">
          Synthetic environment · Authorized personnel only
        </p>
      </section>
    </main>
  );
}

function NetworkDiagram() {
  return (
    <div className="network-map" aria-label="Live railway network map">
      <svg
        viewBox="0 0 720 235"
        role="img"
        aria-label="Live railway network map showing corridors, stations, junctions and train positions"
      >
        <defs>
          <pattern
            id="map-grid"
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <path d="M28 0H0V28" fill="none" stroke="#dfe9e8" strokeWidth="1" />
          </pattern>
          <filter id="map-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="2"
              floodColor="#163b4a"
              floodOpacity=".16"
            />
          </filter>
        </defs>
        <rect width="720" height="235" rx="5" fill="#f4f8f7" />
        <rect
          width="720"
          height="235"
          rx="5"
          fill="url(#map-grid)"
          opacity=".72"
        />
        <path
          className="map-water"
          d="M570 -10C532 28 588 56 551 89C518 118 545 151 514 181C497 198 506 222 490 245H720V-10Z"
        />
        <path
          className="corridor-shadow"
          d="M38 182C128 170 157 143 235 125S350 73 430 90S550 145 684 105"
        />
        <path
          className="rail"
          d="M38 182C128 170 157 143 235 125S350 73 430 90S550 145 684 105"
        />
        <path className="rail branch" d="M235 125C272 95 290 55 354 40H477" />
        <path className="rail branch" d="M430 90C465 112 482 160 528 198H640" />
        <path
          className="rail active"
          d="M38 182C128 170 157 143 235 125S350 73 430 90S550 145 684 105"
        />
        <g className="map-region-labels">
          <text x="74" y="40">
            WESTERN CORRIDOR
          </text>
          <text x="552" y="216">
            EASTERN LOOP
          </text>
          <text x="20" y="220">
            LIVE NETWORK · 14:38 IST
          </text>
        </g>
        <g className="junctions">
          <circle cx="235" cy="125" r="11" className="junction-halo" />
          <circle cx="235" cy="125" r="6" className="junction-conflict" />
          <circle cx="430" cy="90" r="11" className="junction-halo" />
          <circle cx="430" cy="90" r="6" className="junction-open" />
          <circle cx="38" cy="182" r="6" className="junction-open" />
          <circle cx="684" cy="105" r="6" className="junction-open" />
        </g>
        <g className="station-labels">
          <g transform="translate(22 188)">
            <text className="station-code">BCT</text>
            <text className="station-name" y="13">
              Mumbai Central
            </text>
          </g>
          <g transform="translate(215 103)">
            <text className="station-code">J1</text>
            <text className="station-name" y="13">
              Bharat Junction
            </text>
          </g>
          <g transform="translate(410 68)">
            <text className="station-code">J2</text>
            <text className="station-name" y="13">
              Central Loop
            </text>
          </g>
          <g transform="translate(466 25)">
            <text className="station-code">NDLS</text>
            <text className="station-name" y="13">
              New Delhi
            </text>
          </g>
          <g transform="translate(606 121)">
            <text className="station-code">HWH</text>
            <text className="station-name" y="13">
              Howrah
            </text>
          </g>
        </g>
        <g className="map-trains" filter="url(#map-shadow)">
          <g transform="translate(310 94)">
            <rect width="58" height="22" rx="5" />
            <circle cx="9" cy="11" r="3" />
            <text x="17" y="15">
              12951
            </text>
          </g>
          <g transform="translate(491 139)">
            <rect width="58" height="22" rx="5" />
            <circle cx="9" cy="11" r="3" />
            <text x="17" y="15">
              12841
            </text>
          </g>
        </g>
      </svg>
      <div className="map-legend">
        <span>
          <i className="dot green" /> Open route
        </span>
        <span>
          <i className="dot red" /> Conflict at J1
        </span>
        <span>
          <i className="dot teal" /> Live train
        </span>
        <span className="map-updated">Updated just now</span>
      </div>
    </div>
  );
}

function Overview({
  onNavigate,
  trains,
  kpis,
  alerts,
}: {
  onNavigate: (page: string) => void;
  trains: string[][];
  kpis: string[][];
  alerts: string[][];
}) {
  return (
    <div className="content-stack">
      <div className="kpi-grid">
        {kpis.map(([label, value, tone]) => (
          <div className="kpi" key={label}>
            <span>{label}</span>
            <strong className={tone}>{value}</strong>
          </div>
        ))}
      </div>
      <Panel
        title="Active Operational Alerts"
        eyebrow="LIVE PRIORITY QUEUE"
        action="View all conflicts"
        onAction={() => onNavigate("Conflicts")}
      >
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>RISK</th>
                <th>JUNCTION</th>
                <th>TRAIN/ISSUE</th>
                <th>TIME</th>
                <th>DELAY</th>
                <th>OCCUPANCY</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {alerts.map((row, idx) => (
                <tr key={row[0] + "-" + idx}>
                  <td>
                    <Pill risk={row[6]}>{row[6]}</Pill>
                  </td>
                  <td>
                    <strong>{row[1]}</strong>
                    <small>{row[0]}</small>
                  </td>
                  <td>{row[2]}</td>
                  <td className="mono">{row[3]}</td>
                  <td className="mono warning-text">{row[4]}</td>
                  <td>
                    <div className="meter">
                      <i style={{ width: row[5] }} />
                    </div>
                    <span className="mono">{row[5]}</span>
                  </td>
                  <td>
                    <button
                      className="icon-button"
                      aria-label="Open alert"
                      onClick={() => onNavigate("Conflicts")}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
      <div className="two-col">
        <Panel title="Live Network Status" eyebrow="SYSTEM TELEMETRY">
          <div className="network-summary">
            <div>
              <div className="big-status">NORMAL</div>
              <p>All monitored corridors operational</p>
            </div>
            <div className="summary-stat">
              <strong>68%</strong>
              <span>Congestion</span>
            </div>
            <div className="summary-stat">
              <strong>97.4%</strong>
              <span>On-time rate</span>
            </div>
          </div>
          <div className="network-map">
            <NetworkDiagram />
          </div>
        </Panel>
        <Panel
          title="Train Movement"
          eyebrow="LAST UPDATED 14:38:22"
          action="Train operations"
          onAction={() => onNavigate("Train Operations")}
        >
          <div className="compact-list">
            {trains.slice(0, 4).map((t, idx) => (
              <div className="train-row" key={t[0] + "-" + idx}>
                <span className="train-code">{t[0]}</span>
                <div className="train-name">
                  <strong>{t[1]}</strong>
                  <small>{t[2]}</small>
                </div>
                <span className="mono">{t[3]}</span>
                <span
                  className={
                    t[4] === "+01m" ? "green-text mono" : "warning-text mono"
                  }
                >
                  {t[4]}
                </span>
                <Pill risk={t[6]}>{t[6]}</Pill>
              </div>
            ))}
          </div>
        </Panel>
      </div>
      <Panel
        title="Operational Recommendations"
        eyebrow="AI DECISION SUPPORT"
        action="View recommendations"
      >
        <div className="recommendations">
          <div className="recommendation">
            <span className="rec-icon">
              <Zap size={17} />
            </span>
            <div>
              <strong>Hold Train 12951 at J1 for 3 minutes</strong>
              <p>
                Prevent crossing conflict with 12952. Estimated network delay
                reduction: <b>11 minutes</b>.
              </p>
            </div>
            <Pill risk="CRITICAL">HIGH CONFIDENCE</Pill>
            <button
              className="outline-button"
              onClick={() => onNavigate("Recommendations")}
            >
              Review
            </button>
          </div>
          <div className="recommendation">
            <span className="rec-icon">
              <BrainCircuit size={17} />
            </span>
            <div>
              <strong>Reroute 12424 via Loop 4 at J3</strong>
              <p>
                Maintains priority movement and clears platform approach.
                Confidence: <b>89%</b>.
              </p>
            </div>
            <Pill risk="LOW">LOW RISK</Pill>
            <button
              className="outline-button"
              onClick={() => onNavigate("What-If Analysis")}
            >
              Compare
            </button>
          </div>
        </div>
      </Panel>
    </div>
  );
}

function GenericPage({
  page,
  onNavigate,
  trains,
  alerts,
  rawData,
}: {
  page: string;
  onNavigate: (page: string) => void;
  trains: string[][];
  alerts: string[][];
  rawData: any[];
}) {
  const [search, setSearch] = useState("");
  const [selectedTrain, setSelectedTrain] = useState(trains[0]?.[0] || "");
  const [holdDuration, setHoldDuration] = useState(15);
  const [simulationResult, setSimulationResult] = useState("");
  const [assistantInput, setAssistantInput] = useState("");
  const [assistantMessages, setAssistantMessages] = useState<{role: string, content: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [approvedRecommendations, setApprovedRecommendations] = useState<
    number[]
  >([]);
  const [compactMode, setCompactMode] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [settingsSaved, setSettingsSaved] = useState(false);
  if (page === "Live Network")
    return (
      <div className="content-stack">
        <Panel title="Live Network" eyebrow="SCHEMATIC VIEW">
          <NetworkDiagram />
          <div className="node-grid">
            {[
              "BCT · OPEN",
              "J1 · CONFLICT DETECTED",
              "J2 · NORMAL",
              "J3 · CONGESTED",
              "JP · OPEN",
              "HWH · OPEN",
            ].map((n, i) => (
              <div className="node-card" key={n}>
                <span
                  className={`dot ${i === 1 ? "red" : i === 3 ? "amber" : "green"}`}
                />
                <strong>{n.split(" · ")[0]}</strong>
                <span>{n.split(" · ")[1]}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    );
  if (page === "Train Operations" || page === "ETA Forecast")
    return (
      <div className="content-stack">
        <Panel
          title={page}
          eyebrow={
            page === "ETA Forecast" ? "DYNAMIC ETA MODEL" : "FLEET MONITORING"
          }
        >
          <div className="formula">
            Dynamic ETA = Scheduled + Current Delay + ML Predicted Delay
          </div>
          <div style={{ marginBottom: "10px" }}>
            <input
              type="text"
              placeholder="Search trains..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: "8px",
                width: "100%",
                borderRadius: "4px",
                border: "1px solid #ccc",
                background: "var(--panel-bg)",
                color: "inherit",
              }}
            />
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>TRAIN ID</th>
                  <th>NAME</th>
                  <th>POSITION</th>
                  <th>SPEED</th>
                  <th>DELAY</th>
                  <th>DESTINATION</th>
                  <th>ETA FORECAST</th>
                </tr>
              </thead>
              <tbody>
                {trains
                  .filter((t) =>
                    t.join(" ").toLowerCase().includes(search.toLowerCase()),
                  )
                  .slice(0, 100)
                  .map((t, idx) => (
                    <tr key={t[0] + "-" + idx}>
                      <td className="mono accent-text">{t[0]}</td>
                      <td>
                        <strong>{t[1]}</strong>
                      </td>
                      <td>{t[2]}</td>
                      <td className="mono">{t[3]}</td>
                      <td className="mono warning-text">{t[4]}</td>
                      <td>{t[5]}</td>
                      <td>
                        <Pill risk={t[6] || "LOW"}>
                          {t[6] === "HIGH" ? "15:04" : "15:18"}
                        </Pill>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    );

  const number = (value: unknown) =>
    Number.parseInt(String(value || 0), 10) || 0;
  const formatCount = (value: number) =>
    new Intl.NumberFormat("en-IN").format(value);
  const delayStatus = (minutes: number) =>
    minutes === 0
      ? ["ON TIME", "LOW"]
      : minutes <= 15
        ? ["MINOR DELAY", "MEDIUM"]
        : minutes <= 60
          ? ["DELAYED", "HIGH"]
          : ["SEVERE DELAY", "CRITICAL"];
  const average = (items: any[], field: string) =>
    items.length
      ? Math.round(
          items.reduce((sum, item) => sum + number(item[field]), 0) /
            items.length,
        )
      : 0;
  const delayedTrains = rawData.filter(
    (train) => number(train.delay_minutes) > 0,
  );
  const groupedBy = (field: string) =>
    Object.entries(
      rawData.reduce<Record<string, any[]>>((groups, train) => {
        const key = train[field] || "Unknown";
        (groups[key] ||= []).push(train);
        return groups;
      }, {}),
    );

  if (page === "Track Status") {
    const trackGroups = groupedBy("weather_condition");
    return (
      <div className="content-stack">
        <div className="kpi-grid">
          <div className="kpi">
            <span>Sections monitored</span>
            <strong className="network-ok">{rawData.length}</strong>
          </div>
          <div className="kpi">
            <span>Maintenance flags</span>
            <strong className="network-warn">
              {
                rawData.filter((train) => number(train.maintenance_flag) > 0)
                  .length
              }
            </strong>
          </div>
          <div className="kpi">
            <span>Visibility avg</span>
            <strong>{average(rawData, "visibility_m")} m</strong>
          </div>
        </div>
        <Panel title="Track Status" eyebrow="INFRASTRUCTURE TELEMETRY">
          <div className="node-grid">
            {trackGroups.map(([condition, items]) => (
              <div className="node-card" key={condition}>
                <span
                  className={`dot ${condition === "Rain" ? "amber" : "green"}`}
                />
                <strong>{condition}</strong>
                <span>{items.length} monitored corridors</span>
                <small>Avg visibility {average(items, "visibility_m")} m</small>
              </div>
            ))}
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>SECTION</th>
                  <th>CONDITION</th>
                  <th>VISIBILITY</th>
                  <th>MAINTENANCE</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {rawData.slice(0, 20).map((train, index) => (
                  <tr key={train.record_id || index}>
                    <td>
                      <strong>
                        {train.origin_station_code} →{" "}
                        {train.destination_station_code}
                      </strong>
                      <small>{train.origin_station}</small>
                    </td>
                    <td>{train.weather_condition}</td>
                    <td className="mono">{train.visibility_m} m</td>
                    <td>
                      {number(train.maintenance_flag) > 0 ? (
                        <Pill risk="HIGH">REQUIRED</Pill>
                      ) : (
                        <Pill risk="LOW">CLEAR</Pill>
                      )}
                    </td>
                    <td>
                      <span className="green-text">● Operational</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    );
  }

  if (page === "Junction Status") {
    const junctions = groupedBy("origin_station_code");
    return (
      <div className="content-stack">
        <Panel title="Junction Status" eyebrow="NODE CAPACITY AND FLOW">
          <div className="node-grid">
            {junctions.slice(0, 12).map(([junction, items]) => (
              <div className="node-card" key={junction}>
                <span
                  className={`dot ${average(items, "delay_minutes") > 10 ? "red" : "green"}`}
                />
                <strong>{junction}</strong>
                <span>{items.length} services routed</span>
                <small>
                  Avg delay {average(items, "delay_minutes")} min ·{" "}
                  {average(items, "occupancy_percent")}% load
                </small>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    );
  }

  if (page === "Network Analytics") {
    const causes = groupedBy("delay_cause")
      .filter(([cause]) => cause !== "No Delay")
      .sort((a, b) => b[1].length - a[1].length);
    const onTime = rawData.filter(
      (train) => number(train.delay_minutes) === 0,
    ).length;
    const anomalyCount = rawData.filter(
      (train) => number(train.anomaly_detected) > 0,
    ).length;
    return (
      <div className="content-stack">
        <div className="kpi-grid">
          <div className="kpi">
            <span>On-time rate</span>
            <strong className="network-ok">
              {rawData.length ? Math.round((onTime / rawData.length) * 100) : 0}
              %
            </strong>
            <small>
              {formatCount(onTime)} of {formatCount(rawData.length)} services
            </small>
          </div>
          <div className="kpi">
            <span>Average delay</span>
            <strong className="network-warn">
              {average(rawData, "delay_minutes")} min
            </strong>
            <small>Across all services</small>
          </div>
          <div className="kpi">
            <span>Average passenger load</span>
            <strong>{average(rawData, "occupancy_percent")}%</strong>
            <small>Mean occupied capacity</small>
          </div>
          <div className="kpi">
            <span>Anomaly signals</span>
            <strong className="network-crit">
              {formatCount(anomalyCount)}
            </strong>
            <small>Flagged telemetry events</small>
          </div>
        </div>
        <div className="two-col">
          <Panel title="Delay Cause Mix" eyebrow="DELAYED SERVICES ONLY">
            <div className="analytics-bars">
              {causes.slice(0, 6).map(([cause, items]) => {
                const share = rawData.length
                  ? Math.round((items.length / rawData.length) * 100)
                  : 0;
                return (
                  <div className="analytics-bar" key={cause}>
                    <div>
                      <span>{cause}</span>
                      <strong>
                        {formatCount(items.length)} trains · {share}%
                      </strong>
                    </div>
                    <i style={{ width: `${Math.max(8, share)}%` }} />
                  </div>
                );
              })}
            </div>
            {causes.length === 0 && (
              <div className="empty-state">
                <p>No delay causes recorded.</p>
              </div>
            )}
          </Panel>
          <Panel title="Risk Distribution" eyebrow="CURRENT FEED">
            <div className="compact-list">
              {["Critical", "High", "Medium", "Low"].map((level) => {
                const levelTrains = rawData.filter(
                  (train) => train.risk_level === level,
                );
                const share = rawData.length
                  ? Math.round((levelTrains.length / rawData.length) * 100)
                  : 0;
                const score = average(levelTrains, "risk_score");
                return (
                  <div className="train-row" key={level}>
                    <Pill risk={level.toUpperCase()}>
                      {level.toUpperCase()}
                    </Pill>
                    <div className="train-name">
                      <strong>
                        {formatCount(levelTrains.length)} trains · {share}%
                      </strong>
                      <small>Share of monitored fleet</small>
                    </div>
                    <span className="mono">{score}/100 avg risk</span>
                  </div>
                );
              })}
            </div>
          </Panel>
        </div>
      </div>
    );
  }

  if (page === "Train Performance") {
    const performanceRows = [...rawData].sort((a, b) => {
      const aCancelled = a.train_status === "Cancelled" ? 1 : 0;
      const bCancelled = b.train_status === "Cancelled" ? 1 : 0;
      return (
        aCancelled - bCancelled || number(a.record_id) - number(b.record_id)
      );
    });
    return (
      <div className="content-stack">
        <Panel title="Train Performance" eyebrow="FLEET BENCHMARKING">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>TRAIN</th>
                  <th>STATUS</th>
                  <th>DELAY STATUS</th>
                  <th>ETA DRIFT</th>
                  <th>OCCUPANCY</th>
                  <th>RISK SCORE</th>
                </tr>
              </thead>
              <tbody>
                {performanceRows.slice(0, 30).map((train, index) => {
                  const cancelled = train.train_status === "Cancelled";
                  const [delayLabel, delayRisk] = delayStatus(
                    number(train.delay_minutes),
                  );
                  return (
                    <tr key={train.record_id || index}>
                      <td>
                        <strong>{train.train_number}</strong>
                        <small>{train.train_name}</small>
                      </td>
                      <td>
                        <Pill
                          risk={
                            cancelled
                              ? "MEDIUM"
                              : String(train.risk_level || "Low").toUpperCase()
                          }
                        >
                          {train.train_status}
                        </Pill>
                      </td>
                      <td>
                        {cancelled ? (
                          <span className="muted-text mono">N/A</span>
                        ) : (
                          <div className="delay-status">
                            <Pill risk={delayRisk}>{delayLabel}</Pill>
                            <small className="mono">
                              +{number(train.delay_minutes)} min
                            </small>
                          </div>
                        )}
                      </td>
                      <td className="mono">
                        {cancelled
                          ? "N/A"
                          : `+${number(train.eta_delay_minutes)} min`}
                      </td>
                      <td>
                        <div className="meter">
                          <i
                            style={{
                              width: `${cancelled ? 0 : train.occupancy_percent || 0}%`,
                            }}
                          />
                        </div>
                        <span className="mono">
                          {cancelled
                            ? "N/A"
                            : `${number(train.occupancy_percent)}%`}
                        </span>
                      </td>
                      <td className="mono">
                        {cancelled ? "N/A" : `${number(train.risk_score)}/100`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    );
  }

  if (page === "Delay Analysis") {
    const delayCauses = groupedBy("delay_cause")
      .filter(([cause]) => cause !== "No Delay")
      .sort(
        (a, b) =>
          average(b[1], "delay_minutes") - average(a[1], "delay_minutes"),
      );
    return (
      <div className="content-stack">
        <Panel title="Delay Analysis" eyebrow="ROOT CAUSE EXPLORER">
          <div className="kpi-grid">
            <div className="kpi">
              <span>Delayed services</span>
              <strong className="network-warn">{delayedTrains.length}</strong>
            </div>
            <div className="kpi">
              <span>Total delay minutes</span>
              <strong className="network-crit">
                {delayedTrains.reduce(
                  (sum, train) => sum + number(train.delay_minutes),
                  0,
                )}
              </strong>
            </div>
            <div className="kpi">
              <span>Worst average cause</span>
              <strong>{delayCauses[0]?.[0] || "None"}</strong>
            </div>
          </div>
          <div className="analytics-bars">
            {delayCauses.map(([cause, items]) => (
              <div className="analytics-bar" key={cause}>
                <div>
                  <span>{cause}</span>
                  <strong>
                    {average(items, "delay_minutes")} min avg · {items.length}{" "}
                    trains
                  </strong>
                </div>
                <i
                  style={{
                    width: `${Math.max(8, (average(items, "delay_minutes") / Math.max(1, average(rawData, "delay_minutes"))) * 20)}%`,
                  }}
                />
              </div>
            ))}
          </div>
        </Panel>
      </div>
    );
  }

  if (page === "System Logs") {
    const logs = rawData
      .slice(0, 18)
      .map((train, index) => ({
        time:
          train.scheduled_departure || `14:${String(index).padStart(2, "0")}`,
        event:
          number(train.anomaly_detected) > 0
            ? "Anomaly signal detected"
            : number(train.delay_minutes) > 0
              ? "Delay update received"
              : "Telemetry heartbeat",
        detail: `${train.train_number} · ${train.origin_station_code} → ${train.destination_station_code}`,
        level:
          number(train.anomaly_detected) > 0
            ? "HIGH"
            : number(train.delay_minutes) > 0
              ? "MEDIUM"
              : "LOW",
      }));
    return (
      <div className="content-stack">
        <Panel title="System Logs" eyebrow="AUDIT STREAM">
          <div className="log-list">
            {logs.map((log, index) => (
              <div className="log-row" key={`${log.time}-${index}`}>
                <span className="mono">{log.time}</span>
                <span
                  className={`dot ${log.level === "HIGH" ? "red" : log.level === "MEDIUM" ? "amber" : "green"}`}
                />
                <div>
                  <strong>{log.event}</strong>
                  <small>{log.detail}</small>
                </div>
                <Pill risk={log.level}>{log.level}</Pill>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    );
  }

  if (page === "Conflicts") {
    return (
      <div className="content-stack">
        <Panel title="Active Conflicts" eyebrow="NETWORK ALERTS">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>RISK</th>
                  <th>JUNCTION</th>
                  <th>TRAIN/ISSUE</th>
                  <th>TIME</th>
                  <th>DELAY</th>
                  <th>OCCUPANCY</th>
                </tr>
              </thead>
              <tbody>
                {alerts.map((row, idx) => (
                  <tr key={row[0] + "-" + idx}>
                    <td>
                      <Pill risk={row[6]}>{row[6]}</Pill>
                    </td>
                    <td>
                      <strong>{row[1]}</strong>
                      <small>{row[0]}</small>
                    </td>
                    <td>{row[2]}</td>
                    <td className="mono">{row[3]}</td>
                    <td className="mono warning-text">{row[4]}</td>
                    <td>
                      <div className="meter">
                        <i style={{ width: row[5] }} />
                      </div>
                      <span className="mono">{row[5]}</span>
                    </td>
                  </tr>
                ))}
                {alerts.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      style={{ textAlign: "center", padding: "2rem" }}
                    >
                      No active conflicts detected.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    );
  }

  if (page === "Recommendations") {
    const recs = rawData
      .filter((t) => t.recommended_action && t.recommended_action !== "Monitor")
      .slice(0, 20);
    return (
      <div className="content-stack">
        <Panel title="AI Recommendations" eyebrow="DECISION SUPPORT">
          <div className="recommendations">
            {recs.map((t, i) => (
              <div className="recommendation" key={i}>
                <span className="rec-icon">
                  <BrainCircuit size={17} />
                </span>
                <div>
                  <strong>
                    {t.recommended_action} - Train {t.train_number}
                  </strong>
                  <p>
                    Issue: {t.delay_cause}. Delay: {t.delay_minutes}m. Risk
                    Level: {t.risk_level}.
                  </p>
                </div>
                <Pill risk={t.risk_level?.toUpperCase()}>
                  {t.risk_level?.toUpperCase()} RISK
                </Pill>
                <button
                  className="outline-button"
                  disabled={approvedRecommendations.includes(i)}
                  onClick={() =>
                    setApprovedRecommendations((current) => [...current, i])
                  }
                >
                  {approvedRecommendations.includes(i) ? "Approved" : "Approve"}
                </button>
              </div>
            ))}
            {recs.length === 0 && (
              <p style={{ padding: "1rem" }}>No pending recommendations.</p>
            )}
          </div>
        </Panel>
      </div>
    );
  }

  if (page === "Scenario Simulator" || page === "What-If Analysis") {
    return (
      <div className="content-stack">
        <Panel title="Scenario Simulator" eyebrow="SCENARIO PLANNING">
          <div
            style={{
              padding: "1rem",
              background: "var(--panel-bg)",
              borderRadius: "8px",
              border: "1px solid var(--border)",
            }}
          >
            <h4>Select Train to Delay/Hold</h4>
            <select
              value={selectedTrain}
              onChange={(e) => setSelectedTrain(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "8px",
                marginBottom: "16px",
                background: "var(--bg)",
                color: "inherit",
                border: "1px solid var(--border)",
                borderRadius: "4px",
              }}
            >
              {trains.slice(0, 10).map((t, i) => (
                <option key={i} value={t[0]}>
                  {t[0]} - {t[1]}
                </option>
              ))}
            </select>
            <h4>Hold Duration (minutes)</h4>
            <div className="range-row">
              <input
                type="range"
                min="0"
                max="60"
                value={holdDuration}
                onChange={(e) => setHoldDuration(Number(e.target.value))}
                style={{ width: "100%", margin: "16px 0" }}
              />
              <output>{holdDuration} min</output>
            </div>
            <button
              className="primary-button"
              onClick={() =>
                setSimulationResult(
                  `${selectedTrain} held for ${holdDuration} minutes. Estimated network impact: ${Math.max(1, Math.round(holdDuration * 0.6))} minutes downstream delay.`,
                )
              }
            >
              Simulate Impact
            </button>
            {simulationResult && (
              <div className="simulation-result" role="status">
                <ShieldCheck size={17} />
                <span>{simulationResult}</span>
              </div>
            )}
          </div>
        </Panel>
      </div>
    );
  }

  if (page === "Railway Operations Assistant") {
    return (
      <div className="content-stack">
        <Panel title="AI Assistant" eyebrow="RAILMIND BOT">
          <div className="assistant-thread" aria-live="polite">
            <div
              style={{
                background: "var(--surface)",
                padding: "1rem",
                borderRadius: "8px",
                alignSelf: "flex-start",
                border: "1px solid var(--border)",
              }}
            >
              <strong>RailMind AI</strong>
              <p style={{ marginTop: "4px" }}>
                Hello! I am currently monitoring {rawData.length || 3500} trains on the
                network. There are {alerts.length} high-priority conflicts
                requiring attention. How can I help you today?
              </p>
            </div>
            {assistantMessages.map((msg, index) => (
              <div 
                className="assistant-message" 
                key={`${msg.content}-${index}`}
                style={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  background: msg.role === 'user' ? 'var(--surface-2)' : 'var(--surface)',
                }}
              >
                <strong>{msg.role === 'user' ? 'YOU' : 'RailMind AI'}</strong>
                <p>{msg.content}</p>
              </div>
            ))}
            {isTyping && (
               <div className="assistant-message" style={{ alignSelf: 'flex-start' }}>
                 <strong>RailMind AI</strong>
                 <p className="muted-text">Analyzing network data...</p>
               </div>
            )}
          </div>
          <form
            className="assistant-compose"
            onSubmit={async (e) => {
              e.preventDefault();
              const message = assistantInput.trim();
              if (!message || isTyping) return;
              
              const newMessages = [...assistantMessages, { role: "user", content: message }];
              setAssistantMessages(newMessages);
              setAssistantInput("");
              setIsTyping(true);

              try {
                const res = await fetch("/api/chat", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    messages: newMessages,
                    context: { trains: rawData.length || 3500, alerts: alerts.length }
                  })
                });
                const data = await res.json();
                if (data.reply) {
                  setAssistantMessages([...newMessages, { role: "assistant", content: data.reply }]);
                }
              } catch (err) {
                setAssistantMessages([...newMessages, { role: "assistant", content: "Connection error. Unable to reach language model API." }]);
              } finally {
                setIsTyping(false);
              }
            }}
          >
            <input
              type="text"
              placeholder="Ask about delays, conflicts, or ETAs"
              value={assistantInput}
              onChange={(e) => setAssistantInput(e.target.value)}
              disabled={isTyping}
            />
            <button className="primary-button" type="submit" disabled={isTyping}>
              Send
            </button>
          </form>
        </Panel>
      </div>
    );
  }

  if (page === "Settings") {
    return (
      <div className="content-stack">
        <Panel title="Settings" eyebrow="DASHBOARD PREFERENCES">
          <div className="settings-list">
            <label className="setting-row">
              <span>
                <strong>Auto-refresh data</strong>
                <small>
                  Keep the operational feed synchronized with the latest API
                  data.
                </small>
              </span>
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => {
                  setAutoRefresh(e.target.checked);
                  setSettingsSaved(false);
                }}
              />
            </label>
            <label className="setting-row">
              <span>
                <strong>Priority notifications</strong>
                <small>
                  Show alerts for high-risk conflicts and anomaly signals.
                </small>
              </span>
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => {
                  setNotifications(e.target.checked);
                  setSettingsSaved(false);
                }}
              />
            </label>
            <label className="setting-row">
              <span>
                <strong>Compact data density</strong>
                <small>
                  Reduce row spacing when scanning large operational tables.
                </small>
              </span>
              <input
                type="checkbox"
                checked={compactMode}
                onChange={(e) => {
                  setCompactMode(e.target.checked);
                  setSettingsSaved(false);
                }}
              />
            </label>
          </div>
          <div className="settings-footer">
            <span className="mono">
              {autoRefresh ? "LIVE SYNC ON" : "MANUAL SYNC"} ·{" "}
              {notifications ? "ALERTS ON" : "ALERTS MUTED"}
            </span>
            <button
              className="primary-button"
              onClick={() => setSettingsSaved(true)}
            >
              Save settings
            </button>
          </div>
          {settingsSaved && (
            <div className="simulation-result" role="status">
              <ShieldCheck size={17} />
              <span>Settings saved for this dashboard session.</span>
            </div>
          )}
        </Panel>
      </div>
    );
  }

  const text = `${page} is connected to the simulation feed. Review synthetic operational data and use the controls to explore decision-support scenarios.`;
  return (
    <div className="content-stack">
      <Panel title={page} eyebrow="RAILMIND DECISION SUPPORT">
        <div className="empty-state">
          <div className="empty-icon">
            <ShieldCheck />
          </div>
          <h3>Monitor {page.toLowerCase()}</h3>
          <p>{text}</p>
        </div>
      </Panel>
    </div>
  );
}

export default function RailMindDashboard() {
  const [page, setPage] = useState("Overview");
  const [running, setRunning] = useState(true);
  const [notice, setNotice] = useState(true);
  const [mobileNav, setMobileNav] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const [time, setTime] = useState("00:00:00");
  const [trains, setTrains] = useState(initialTrains);
  const [rawData, setRawData] = useState<any[]>([]);
  const [liveKpis, setLiveKpis] = useState([
    ["Trains Active", "24", "network-ok"],
    ["Delayed Trains", "07", "network-warn"],
    ["Active Conflicts", "03", "network-crit"],
    ["High Risk Conflicts", "02", "network-crit"],
    ["Network Delay", "+42 min", "network-warn"],
    ["Avg Congestion", "68%", "network-warn"],
  ]);
  const [liveAlerts, setLiveAlerts] = useState(defaultAlerts);

  useEffect(() => {
    setAuthenticated(
      window.sessionStorage.getItem("railmind-authenticated") === "true",
    );
    setAuthReady(true);
  }, []);

  useEffect(() => {
    const updateTime = () =>
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        }).format(new Date()),
      );

    updateTime();
    const interval = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch(`/api/trains`)
      .then((res) => res.json())
      .then((data) => {
        if (data.trains && data.trains.length > 0) {
          const fetchedData = data.trains;
          setRawData(fetchedData);
          const formatted = fetchedData.map((t: any) => [
            t.train_number || "N/A",
            t.train_name || "Unknown",
            `${t.origin_station_code || "UNK"} / ${t.destination_station_code || "UNK"}`,
            `${t.temperature_c || 60} km/h`,
            `+${t.delay_minutes || 0}m`,
            t.destination_station?.toUpperCase() || "UNKNOWN",
            t.risk_level?.toUpperCase() || "LOW",
          ]);
          setTrains(formatted);

          const delayedCount = fetchedData.filter(
            (t: any) => parseInt(t.delay_minutes || "0") > 0,
          ).length;
          const criticalCount = fetchedData.filter(
            (t: any) => t.risk_level === "Critical" || t.risk_level === "High",
          ).length;
          const avgDelay = Math.round(
            fetchedData.reduce(
              (acc: number, t: any) => acc + parseInt(t.delay_minutes || "0"),
              0,
            ) / fetchedData.length,
          );
          const avgOccupancy = Math.round(
            fetchedData.reduce(
              (acc: number, t: any) =>
                acc + parseInt(t.occupancy_percent || "0"),
              0,
            ) / fetchedData.length,
          );

          setLiveKpis([
            ["Trains Active", fetchedData.length.toString(), "network-ok"],
            [
              "Delayed Trains",
              delayedCount.toString(),
              delayedCount > 0 ? "network-warn" : "network-ok",
            ],
            [
              "Active Conflicts",
              fetchedData
                .filter((t: any) => t.train_status === "At Risk")
                .length.toString(),
              "network-crit",
            ],
            [
              "High Risk Conflicts",
              criticalCount.toString(),
              criticalCount > 0 ? "network-crit" : "network-ok",
            ],
            [
              "Network Delay",
              `+${avgDelay} min avg`,
              avgDelay > 10 ? "network-warn" : "network-ok",
            ],
            [
              "Avg Congestion",
              `${avgOccupancy}%`,
              avgOccupancy > 70 ? "network-warn" : "network-ok",
            ],
          ]);

          const generatedAlerts = fetchedData
            .filter((t: any) => ["High", "Critical"].includes(t.risk_level))
            .slice(0, 5)
            .map((t: any) => [
              `C-${t.record_id || Math.floor(Math.random() * 1000)}`,
              t.origin_station_code || "UNK",
              `${t.train_number} - ${t.delay_cause || "Unknown issue"}`,
              t.scheduled_departure || "N/A",
              `${t.delay_minutes || 0} min`,
              `${t.occupancy_percent || 0}%`,
              t.risk_level?.toUpperCase() || "HIGH",
            ]);

          if (generatedAlerts.length > 0) setLiveAlerts(generatedAlerts);
        }
      })
      .catch((err) => console.error("Failed to fetch trains:", err));
  }, []);

  if (!authReady) return null;
  if (!authenticated)
    return <LoginScreen onLogin={() => setAuthenticated(true)} />;

  return (
    <div className="railmind-app">
      {mobileNav && (
        <div className="mobile-backdrop" onClick={() => setMobileNav(false)} />
      )}
      <aside className={`sidebar ${mobileNav ? "mobile-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">
            <TrainFront size={21} />
          </div>
          <div>
            <strong>
              RailMind <em>AI</em>
            </strong>
          </div>
          <button className="mobile-close" onClick={() => setMobileNav(false)}>
            <X size={18} />
          </button>
        </div>
        <nav>
          {navGroups.map((group) => (
            <div className="nav-group" key={group.label || "overview"}>
              {group.label && <div className="nav-label">{group.label}</div>}
              {group.items.map(([label, Icon]) => (
                <button
                  className={`nav-item ${page === label ? "active" : ""}`}
                  key={label}
                  onClick={() => {
                    setPage(label);
                    setMobileNav(false);
                  }}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                  {label === "Conflicts" && <b className="nav-count">3</b>}
                </button>
              ))}
            </div>
          ))}
        </nav>

      </aside>
      <main className="main">
        <header className="topbar">
          <button className="menu-button" onClick={() => setMobileNav(true)}>
            <Menu size={19} />
          </button>
          <div className="breadcrumb">
            <span>CONTROL CENTER</span>
            <ChevronRight size={13} />
            <strong>{page}</strong>
          </div>
          <div className="top-actions">
            <span className="live-clock">
              <Clock3 size={15} />
              {time} IST
            </span>
            <button
              className="logout-button"
              onClick={() => {
                window.sessionStorage.removeItem("railmind-authenticated");
                setAuthenticated(false);
              }}
            >
              <X size={14} /> Sign out
            </button>
          </div>
        </header>
        {notice && (
          <div className="disclaimer">
            <AlertTriangle size={16} />
            <span>
              <b>Simulation & research prototype.</b> AI recommendations are for
              authorized human operators only. Uses synthetic data and does not
              control live signals, tracks, or trains.
            </span>
            <button
              className="icon-button"
              aria-label="Dismiss disclaimer"
              onClick={() => setNotice(false)}
            >
              <X size={15} />
            </button>
          </div>
        )}
        <div className="page-content">
          <div className="page-title">
            <div>
              <div className="eyebrow">
                RAILWAY OPERATIONS DECISION SUPPORT SYSTEM
              </div>
              <h1>{page}</h1>
              <p>Synthetic operational view · last synchronized 14:38:22 IST</p>
            </div>
            <div className="system-note">
              <span className="dot green" />
              All systems nominal
            </div>
          </div>
          {page === "Overview" ? (
            <Overview
              onNavigate={setPage}
              trains={trains}
              kpis={liveKpis}
              alerts={liveAlerts}
            />
          ) : (
            <GenericPage
              page={page}
              onNavigate={setPage}
              trains={trains}
              alerts={liveAlerts}
              rawData={rawData}
            />
          )}
        </div>
      </main>
    </div>
  );
  return (
    <div className="railmind-app">
      {mobileNav && (
        <div className="mobile-backdrop" onClick={() => setMobileNav(false)} />
      )}
      <aside className={`sidebar ${mobileNav ? "mobile-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">
            <TrainFront size={21} />
          </div>
          <div>
            <strong>
              RailMind <em>AI</em>
            </strong>
          </div>
          <button className="mobile-close" onClick={() => setMobileNav(false)}>
            <X size={18} />
          </button>
        </div>
        <nav>
          {navGroups.map((group) => (
            <div className="nav-group" key={group.label || "overview"}>
              {group.label && <div className="nav-label">{group.label}</div>}
              {group.items.map(([label, Icon]) => (
                <button
                  className={`nav-item ${page === label ? "active" : ""}`}
                  key={label}
                  onClick={() => {
                    setPage(label);
                    setMobileNav(false);
                  }}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                  {label === "Conflicts" && <b className="nav-count">3</b>}
                </button>
              ))}
            </div>
          ))}
        </nav>

      </aside>
      <main className="main">
        <header className="topbar">
          <button className="menu-button" onClick={() => setMobileNav(true)}>
            <Menu size={19} />
          </button>
          <div className="breadcrumb">
            <span>CONTROL CENTER</span>
            <ChevronRight size={13} />
            <strong>{page}</strong>
          </div>
          <div className="top-actions">
            <span className="live-clock">
              <Clock3 size={15} />
              {time} IST
            </span>
          </div>
        </header>
        {notice && (
          <div className="disclaimer">
            <AlertTriangle size={16} />
            <span>
              <b>Simulation & research prototype.</b> AI recommendations are for
              authorized human operators only. Uses synthetic data and does not
              control live signals, tracks, or trains.
            </span>
            <button
              onClick={() => setNotice(false)}
              aria-label="Dismiss disclaimer"
            >
              <X size={15} />
            </button>
          </div>
        )}
        <div className="page-content">
          <div className="page-title">
            <div>
              <div className="eyebrow">
                RAILWAY OPERATIONS DECISION SUPPORT SYSTEM
              </div>
              <h1>{page}</h1>
              <p>
                {page === "Overview"
                  ? "Real-time network awareness and AI-assisted traffic management."
                  : "Synthetic operational view · last synchronized 14:38:22 IST"}
              </p>
            </div>
            <div className="title-status">
              <span className="dot green" />
              All systems nominal
            </div>
          </div>
          {page === "Overview" ? (
            <Overview
              onNavigate={setPage}
              trains={trains}
              kpis={liveKpis}
              alerts={liveAlerts}
            />
          ) : (
            <GenericPage
              page={page}
              onNavigate={setPage}
              trains={trains}
              alerts={liveAlerts}
              rawData={rawData}
            />
          )}
        </div>
      </main>
    </div>
  );
}
