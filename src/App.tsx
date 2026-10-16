import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  Bot,
  CheckCircle2,
  CircleGauge,
  ClipboardList,
  Database,
  LoaderCircle,
  RefreshCw,
  Search,
  ShieldCheck,
  WifiOff,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { initialActions } from "./data/sampleActions";
import { recommend } from "./services/recommendationEngine";
import {
  TelemetryProviderError,
  type TelemetryErrorKind,
} from "./services/telemetry/CapacityTelemetryProvider";
import { createCapacityTelemetryProvider } from "./services/telemetry/createCapacityTelemetryProvider";
import type {
  ActionItem,
  CapacitySummary,
  Hotspot,
  Point,
  Status,
} from "./types";

type Page = "Overview" | "Explorer" | "Investigation" | "Actions";

type TelemetryState =
  | { status: "loading" }
  | {
      status: "ready";
      summary: CapacitySummary;
      points: Point[];
      hotspots: Hotspot[];
    }
  | { status: "empty"; summary: CapacitySummary }
  | { status: "error"; kind: TelemetryErrorKind; message: string };

const capacityId = "contoso-f64";

export default function App() {
  const [page, setPage] = useState<Page>("Overview");
  const [selected, setSelected] = useState<Hotspot | null>(null);
  const [actions, setActions] = useState<ActionItem[]>(initialActions);
  const [telemetry, setTelemetry] = useState<TelemetryState>({
    status: "loading",
  });
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadTelemetry() {
      setTelemetry({ status: "loading" });

      try {
        const provider = createCapacityTelemetryProvider();
        const to = new Date();
        const from = new Date(to.getTime() - 14 * 60 * 60 * 1000);
        const [summary, points, hotspots] = await Promise.all([
          provider.getSummary(capacityId),
          provider.getTimeSeries(capacityId, from, to),
          provider.getHotspots(capacityId, from, to),
        ]);

        if (cancelled) {
          return;
        }

        if (points.length === 0 && hotspots.length === 0) {
          setTelemetry({ status: "empty", summary });
          setSelected(null);
          return;
        }

        setTelemetry({ status: "ready", summary, points, hotspots });
        setSelected((current) => {
          if (!current) {
            return hotspots[0] ?? null;
          }
          return (
            hotspots.find((hotspot) => hotspot.id === current.id) ??
            hotspots[0] ??
            null
          );
        });
      } catch (error) {
        if (cancelled) {
          return;
        }

        if (error instanceof TelemetryProviderError) {
          setTelemetry({
            status: "error",
            kind: error.kind,
            message: error.message,
          });
          return;
        }

        setTelemetry({
          status: "error",
          kind: "unavailable",
          message:
            error instanceof Error
              ? error.message
              : "The telemetry source returned an unknown error.",
        });
      }
    }

    void loadTelemetry();
    return () => {
      cancelled = true;
    };
  }, [retryKey]);

  const createAction = () => {
    if (!selected || actions.some((action) => action.hotspotId === selected.id)) {
      return;
    }

    setActions((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        title: `Investigate ${selected.item}`,
        owner: "Unassigned",
        priority: selected.severity,
        status: "Open",
        hotspotId: selected.id,
      },
    ]);
    setPage("Actions");
  };

  const updateAction = (id: string, status: Status) => {
    setActions((current) =>
      current.map((action) =>
        action.id === id ? { ...action, status } : action,
      ),
    );
  };

  const inspect = (hotspot: Hotspot) => {
    setSelected(hotspot);
    setPage("Investigation");
  };

  const capacityName =
    telemetry.status === "ready" || telemetry.status === "empty"
      ? telemetry.summary.capacityName
      : "Capacity telemetry";

  return (
    <div className="shell">
      <aside>
        <div className="brand">
          <CircleGauge />{" "}
          <span>
            Capacity
            <br />
            <b>Copilot</b>
          </span>
        </div>
        {(["Overview", "Explorer", "Investigation", "Actions"] as Page[]).map(
          (item) => (
            <button
              className={page === item ? "active" : ""}
              onClick={() => setPage(item)}
              key={item}
            >
              {item === "Overview" ? (
                <Activity />
              ) : item === "Explorer" ? (
                <Search />
              ) : item === "Investigation" ? (
                <ShieldCheck />
              ) : (
                <ClipboardList />
              )}
              {item}
            </button>
          ),
        )}
        <div className="preview">
          REFERENCE ACCELERATOR
          <br />
          <b>
            {telemetry.status === "ready"
              ? telemetry.summary.source.label
              : "Telemetry boundary"}
          </b>
        </div>
      </aside>

      <main>
        <header>
          <div>
            <p>FABRIC CAPACITY COPILOT</p>
            <h1>{page}</h1>
          </div>
          <div className="source-meta">
            {(telemetry.status === "ready" ||
              telemetry.status === "empty") && (
              <span className={`source-badge ${telemetry.summary.source.mode}`}>
                {telemetry.summary.source.mode === "sample"
                  ? "Sample data"
                  : "Live source"}
              </span>
            )}
            <select aria-label="Selected capacity" disabled>
              <option>{capacityName}</option>
            </select>
          </div>
        </header>

        {telemetry.status === "loading" && (
          <StatePanel
            icon={<LoaderCircle className="spinner" />}
            title="Loading capacity telemetry"
            description="Resolving the configured telemetry provider and selected capacity window."
          />
        )}

        {telemetry.status === "error" && (
          <StatePanel
            icon={
              telemetry.kind === "unauthorized" ? (
                <ShieldCheck />
              ) : telemetry.kind === "unavailable" ? (
                <WifiOff />
              ) : (
                <AlertCircle />
              )
            }
            title={errorTitle(telemetry.kind)}
            description={telemetry.message}
            action={
              <button onClick={() => setRetryKey((value) => value + 1)}>
                <RefreshCw />
                Retry telemetry
              </button>
            }
          />
        )}

        {telemetry.status === "empty" && (
          <StatePanel
            icon={<Database />}
            title="No telemetry for this period"
            description={`${telemetry.summary.source.label} returned no time-series points or hotspots. Select another period after a live provider is connected.`}
            action={
              <button onClick={() => setRetryKey((value) => value + 1)}>
                <RefreshCw />
                Refresh
              </button>
            }
          />
        )}

        {telemetry.status === "ready" && (
          <>
            {page === "Overview" && (
              <Overview
                summary={telemetry.summary}
                points={telemetry.points}
                hotspots={telemetry.hotspots}
                openActions={
                  actions.filter((action) => action.status !== "Resolved").length
                }
                inspect={inspect}
              />
            )}
            {page === "Explorer" && (
              <Explorer
                points={telemetry.points}
                hotspots={telemetry.hotspots}
                inspect={inspect}
              />
            )}
            {page === "Investigation" &&
              (selected ? (
                <Investigation
                  hotspot={selected}
                  onCreate={createAction}
                />
              ) : (
                <StatePanel
                  icon={<Search />}
                  title="No hotspot selected"
                  description="The telemetry source did not return an investigation candidate for this period."
                />
              ))}
            {page === "Actions" && (
              <Actions actions={actions} update={updateAction} />
            )}
          </>
        )}
      </main>
    </div>
  );
}

function errorTitle(kind: TelemetryErrorKind) {
  if (kind === "unauthorized") {
    return "Telemetry access denied";
  }
  if (kind === "invalid-configuration") {
    return "Telemetry configuration is invalid";
  }
  if (kind === "invalid-response") {
    return "Telemetry response is invalid";
  }
  return "Telemetry source unavailable";
}

function StatePanel({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <section className="panel state-panel">
      <span>{icon}</span>
      <h2>{title}</h2>
      <p>{description}</p>
      {action}
    </section>
  );
}

function Overview({
  summary,
  points,
  hotspots,
  openActions,
  inspect,
}: {
  summary: CapacitySummary;
  points: Point[];
  hotspots: Hotspot[];
  openActions: number;
  inspect: (hotspot: Hotspot) => void;
}) {
  return (
    <>
      <div className={`notice ${summary.source.mode}`}>
        <AlertTriangle />
        {summary.source.mode === "sample"
          ? "Demonstration telemetry only. Connect an approved source before using this accelerator for decisions."
          : `${summary.source.label} · ${summary.source.freshness}`}
      </div>
      <section className="cards">
        <Metric
          icon={<CircleGauge />}
          label="Capacity health"
          value={`${summary.healthScore}/100`}
          note="Accelerator indicator"
        />
        <Metric
          icon={<Activity />}
          label="CU utilization"
          value={`${summary.utilization}%`}
          note={summary.source.freshness}
        />
        <Metric
          icon={<AlertTriangle />}
          label="Hotspots"
          value={`${hotspots.length}`}
          note="Rule-generated"
        />
        <Metric
          icon={<ClipboardList />}
          label="Open actions"
          value={`${openActions}`}
          note="Application state"
        />
      </section>
      <section className="grid">
        <div className="panel wide">
          <h2>Capacity utilization</h2>
          <Chart points={points} />
        </div>
        <div className="panel">
          <h2>Workload mix</h2>
          {[
            ["Warehouse", 42],
            ["Power BI", 27],
            ["RTI", 19],
            ["Data Factory", 12],
          ].map(([name, value]) => (
            <div className="bar" key={name}>
              <span>{name}</span>
              <div>
                <i style={{ width: `${value}%` }} />
              </div>
              <b>{value}%</b>
            </div>
          ))}
        </div>
      </section>
      <HotspotTable hotspots={hotspots} inspect={inspect} />
    </>
  );
}

function Metric({
  icon,
  label,
  value,
  note,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="metric">
      <span>{icon}</span>
      <p>{label}</p>
      <strong>{value}</strong>
      <small>{note}</small>
    </div>
  );
}

function Chart({ points }: { points: Point[] }) {
  if (points.length === 0) {
    return <div className="inline-empty">No time-series data available.</div>;
  }

  return (
    <div className="chart">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={points}>
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7160e8" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#7160e8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e7e5f2" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="cu"
            stroke="#5b4bd6"
            fill="url(#g)"
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function HotspotTable({
  hotspots,
  inspect,
}: {
  hotspots: Hotspot[];
  inspect: (hotspot: Hotspot) => void;
}) {
  return (
    <section className="panel">
      <h2>Priority hotspots</h2>
      {hotspots.length === 0 ? (
        <div className="inline-empty">
          No hotspots were identified for this period.
        </div>
      ) : (
        <div className="table">
          <div className="tr head">
            <span>Workspace / item</span>
            <span>Workload</span>
            <span>Signal</span>
            <span>Severity</span>
            <span />
          </div>
          {hotspots.map((hotspot) => (
            <div className="tr" key={hotspot.id}>
              <span>
                <b>{hotspot.workspace}</b>
                <small>{hotspot.item}</small>
              </span>
              <span>{hotspot.workload}</span>
              <span>{hotspot.signal}</span>
              <span>
                <em className={hotspot.severity.toLowerCase()}>
                  {hotspot.severity}
                </em>
              </span>
              <span>
                <button onClick={() => inspect(hotspot)}>Investigate</button>
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function Explorer({
  points,
  hotspots,
  inspect,
}: {
  points: Point[];
  hotspots: Hotspot[];
  inspect: (hotspot: Hotspot) => void;
}) {
  return (
    <>
      <section className="filters">
        <select aria-label="Workspace filter">
          <option>All workspaces</option>
        </select>
        <select aria-label="Workload filter">
          <option>All workloads</option>
        </select>
        <select aria-label="Time period">
          <option>Sample 14-hour period</option>
        </select>
      </section>
      <section className="panel">
        <h2>Consumption timeline</h2>
        <Chart points={points} />
      </section>
      <HotspotTable hotspots={hotspots} inspect={inspect} />
    </>
  );
}

function Investigation({
  hotspot,
  onCreate,
}: {
  hotspot: Hotspot;
  onCreate: () => void;
}) {
  const advice = useMemo(() => recommend(hotspot), [hotspot]);

  return (
    <div className="invest">
      <section className="panel hero">
        <div>
          <em className={hotspot.severity.toLowerCase()}>
            {hotspot.severity}
          </em>
          <h2>{hotspot.item}</h2>
          <p>
            {hotspot.workspace} · {hotspot.workload}
          </p>
        </div>
        <button onClick={onCreate}>Create action</button>
      </section>
      <section className="grid">
        <div className="panel">
          <h2>Observed evidence</h2>
          {advice.evidence.map((item) => (
            <div className="evidence" key={item}>
              <Database />
              {item}
            </div>
          ))}
        </div>
        <div className="panel advisor">
          <h2>
            <Bot /> Advisor
          </h2>
          <p>{advice.summary}</p>
          <h3>Suggested investigation</h3>
          <ol>
            {advice.actions.map((action) => (
              <li key={action}>{action}</li>
            ))}
          </ol>
          <small>
            Deterministic MVP guidance. Validate against authoritative
            telemetry.
          </small>
        </div>
      </section>
    </div>
  );
}

function Actions({
  actions,
  update,
}: {
  actions: ActionItem[];
  update: (id: string, status: Status) => void;
}) {
  return (
    <section className="panel">
      <h2>Remediation actions</h2>
      {actions.map((action) => (
        <div className="action" key={action.id}>
          <CheckCircle2 />
          <div>
            <b>{action.title}</b>
            <p>
              {action.owner} · {action.priority} · {action.status}
            </p>
          </div>
          <select
            aria-label={`Status for ${action.title}`}
            value={action.status}
            onChange={(event) =>
              update(action.id, event.target.value as Status)
            }
          >
            <option>Open</option>
            <option>Investigating</option>
            <option>Resolved</option>
          </select>
        </div>
      ))}
    </section>
  );
}
