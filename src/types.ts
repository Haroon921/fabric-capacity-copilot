export type Severity = "High" | "Medium" | "Low";
export type Status = "Open" | "Investigating" | "Resolved";
export type TelemetryMode = "sample" | "api";

export interface Hotspot {
  id: string;
  workspace: string;
  item: string;
  workload: string;
  cu: number;
  severity: Severity;
  signal: string;
  operation: string;
  time: string;
}

export interface Point {
  time: string;
  cu: number;
}

export interface ActionItem {
  id: string;
  title: string;
  owner: string;
  priority: Severity;
  status: Status;
  hotspotId: string;
}

export interface CapacitySummary {
  capacityId: string;
  capacityName: string;
  healthScore: number;
  utilization: number;
  source: {
    mode: TelemetryMode;
    label: string;
    freshness: string;
  };
}
