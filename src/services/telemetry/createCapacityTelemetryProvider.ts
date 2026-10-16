import type { CapacityTelemetryProvider } from "./CapacityTelemetryProvider";
import { TelemetryProviderError } from "./CapacityTelemetryProvider";
import { SampleCapacityTelemetryProvider } from "./SampleCapacityTelemetryProvider";

export function createCapacityTelemetryProvider(): CapacityTelemetryProvider {
  const mode = import.meta.env.VITE_TELEMETRY_MODE ?? "sample";

  if (mode === "sample") {
    return new SampleCapacityTelemetryProvider();
  }

  if (mode === "api") {
    const endpoint = import.meta.env.VITE_TELEMETRY_API_URL;
    const endpointDetail = endpoint ? ` at ${endpoint}` : "";
    throw new TelemetryProviderError(
      "unavailable",
      `API telemetry mode is configured${endpointDetail}, but an approved backend connector has not been implemented.`,
    );
  }

  throw new TelemetryProviderError(
    "invalid-configuration",
    `Unsupported VITE_TELEMETRY_MODE value: ${mode}`,
  );
}
