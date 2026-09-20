# Data integration boundary

The checked-in `sampleData.ts` is synthetic and exists only to make the frontend immediately runnable.

Create an adapter with this contract:
```ts
export interface CapacityTelemetryProvider {
  getSummary(capacityId: string): Promise<CapacitySummary>;
  getTimeSeries(capacityId: string, from: Date, to: Date): Promise<Point[]>;
  getHotspots(capacityId: string, from: Date, to: Date): Promise<Hotspot[]>;
}
```

Implementation rules:
- Obtain the telemetry source and access method through the customer's approved Fabric/admin architecture.
- Preserve source timestamps, unit definitions and operation identifiers.
- Display source freshness and the selected period.
- Return explicit unauthorized, unavailable and empty states.
- Never substitute synthetic data during a live failure.
- Keep investigation/action state separate from capacity telemetry.
- Record why each recommendation fired and link it back to evidence.
