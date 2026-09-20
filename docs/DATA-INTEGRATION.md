# Data integration boundary

## Current state

The checked-in application uses `SampleCapacityTelemetryProvider`. Its synthetic telemetry exists only to make the frontend immediately runnable. The React UI loads data through `CapacityTelemetryProvider`; it no longer imports sample telemetry directly.

The repository does not contain a live Microsoft Fabric connector, authentication implementation, tenant credentials, or production fallback behavior.

## Provider contract

```ts
export interface CapacityTelemetryProvider {
  getSummary(capacityId: string): Promise<CapacitySummary>;
  getTimeSeries(capacityId: string, from: Date, to: Date): Promise<Point[]>;
  getHotspots(capacityId: string, from: Date, to: Date): Promise<Hotspot[]>;
}
```

Provider implementations are selected using:

```env
VITE_TELEMETRY_MODE=sample
VITE_TELEMETRY_API_URL=http://localhost:7071/api
```

Only `sample` mode is currently implemented. Selecting `api` produces an explicit unavailable-source state. It never falls back to synthetic data.

## Production architecture

```text
Approved Fabric telemetry source
              |
              v
Secure backend with Microsoft Entra authentication
              |
              v
Authorization and capacity scope enforcement
              |
              v
Normalization into CapacitySummary, Point, and Hotspot
              |
              v
CapacityTelemetryProvider API consumed by the React application
```

GitHub Pages is static hosting and must not contain service-principal secrets, access tokens, or direct privileged access to Fabric administration APIs.

## Source selection

Choose the authoritative source with the customer's Fabric and security administrators. Candidate patterns can include:

- An approved query path to the Fabric Capacity Metrics semantic model
- Power BI REST `executeQueries`, when supported and authorized
- An approved XMLA endpoint
- Telemetry exported into OneLake or Eventhouse
- An existing organizational monitoring API

Do not implement a connector until its API support, permissions, licensing, retention, and data-governance requirements are verified.

## Normalization requirements

The backend should map source telemetry into:

- Capacity identity and display name
- Source label and freshness timestamp
- CU consumption points with preserved timestamps and units
- Workspace, item, workload, operation, and time-window identifiers
- Derived hotspot severity and the rule that produced it

Preserve authoritative identifiers even when the UI displays friendly names.

## Required failure behavior

The application has explicit states for:

- Loading
- Empty results
- Unauthorized access
- Unavailable source
- Invalid configuration
- Invalid provider response

A production provider must classify failures accordingly. Never:

- Substitute sample telemetry after a live request fails
- Return an empty array for an authorization or connectivity failure
- Expose credentials or raw access tokens to the browser
- Present stale data without a source-freshness indicator

## Separation of concerns

Capacity telemetry, investigations, recommendations, and action state have different ownership and retention requirements. Keep them separate:

- Telemetry remains read-only evidence from the approved source.
- Recommendations record the deterministic rule and supporting evidence.
- Investigations capture analyst context.
- Actions capture assignment, status, and resolution history.

Before production use, add backend integration tests covering authorization, empty periods, stale telemetry, malformed responses, throttling, and upstream outages.
