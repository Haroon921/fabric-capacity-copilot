import type { CapacitySummary, Hotspot, Point } from "../types";

export const sampleSummary: CapacitySummary = {
  capacityId: "contoso-f64",
  capacityName: "Contoso-F64",
  healthScore: 78,
  utilization: 76,
  source: {
    mode: "sample",
    label: "Demonstration telemetry",
    freshness: "Bundled sample snapshot",
  },
};

export const sampleHotspots: Hotspot[] = [
  {
    id: "h1",
    workspace: "Finance Analytics",
    item: "Finance-Warehouse",
    workload: "Warehouse",
    cu: 84,
    severity: "High",
    signal: "Sustained interactive consumption",
    operation: "SQL query",
    time: "10:30–10:45",
  },
  {
    id: "h2",
    workspace: "IoT Platform",
    item: "Operations-Eventhouse",
    workload: "Real-Time Intelligence",
    cu: 61,
    severity: "Medium",
    signal: "Background activity increase",
    operation: "Eventhouse ingest",
    time: "11:00–11:15",
  },
  {
    id: "h3",
    workspace: "Sales Intelligence",
    item: "Sales-Semantic-Model",
    workload: "Power BI",
    cu: 47,
    severity: "Medium",
    signal: "Repeated interactive activity",
    operation: "Semantic query",
    time: "13:00–13:15",
  },
];

export const samplePoints: Point[] = [
  { time: "08:00", cu: 31 },
  { time: "09:00", cu: 43 },
  { time: "10:00", cu: 57 },
  { time: "10:30", cu: 84 },
  { time: "11:00", cu: 61 },
  { time: "12:00", cu: 42 },
  { time: "13:00", cu: 53 },
  { time: "14:00", cu: 38 },
];
