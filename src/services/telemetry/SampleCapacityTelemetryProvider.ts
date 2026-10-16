import {
  sampleHotspots,
  samplePoints,
  sampleSummary,
} from "../../data/sampleData";
import type { CapacitySummary, Hotspot, Point } from "../../types";
import type { CapacityTelemetryProvider } from "./CapacityTelemetryProvider";

export class SampleCapacityTelemetryProvider
  implements CapacityTelemetryProvider
{
  async getSummary(capacityId: string): Promise<CapacitySummary> {
    return { ...sampleSummary, capacityId };
  }

  async getTimeSeries(
    _capacityId: string,
    _from: Date,
    _to: Date,
  ): Promise<Point[]> {
    return samplePoints.map((point) => ({ ...point }));
  }

  async getHotspots(
    _capacityId: string,
    _from: Date,
    _to: Date,
  ): Promise<Hotspot[]> {
    return sampleHotspots.map((hotspot) => ({ ...hotspot }));
  }
}
