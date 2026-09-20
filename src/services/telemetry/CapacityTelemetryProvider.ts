import type { CapacitySummary, Hotspot, Point } from "../../types";

export type TelemetryErrorKind =
  | "unauthorized"
  | "unavailable"
  | "invalid-configuration"
  | "invalid-response";

export class TelemetryProviderError extends Error {
  constructor(
    public readonly kind: TelemetryErrorKind,
    message: string,
  ) {
    super(message);
    this.name = "TelemetryProviderError";
  }
}

export interface CapacityTelemetryProvider {
  getSummary(capacityId: string): Promise<CapacitySummary>;
  getTimeSeries(capacityId: string, from: Date, to: Date): Promise<Point[]>;
  getHotspots(capacityId: string, from: Date, to: Date): Promise<Hotspot[]>;
}
