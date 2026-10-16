# Roadmap

Fabric Capacity Copilot is a reference accelerator. The roadmap describes intended evolution, not committed product delivery dates.

## Phase 1 — Local MVP

- [x] Executive capacity overview
- [x] Time-series explorer
- [x] Evidence-backed hotspot investigation
- [x] Remediation action workflow
- [x] Sample Rayfin entity definitions
- [x] CI, security scanning, and GitHub Pages demonstration

## Phase 2 — Approved telemetry integration

- [x] Introduce a typed capacity telemetry provider boundary
- [x] Move synthetic telemetry behind an explicit sample provider
- [x] Add loading, empty, unavailable, unauthorized and configuration states
- [x] Add environment-based telemetry mode selection without live fallback
- [ ] Select and document the approved authoritative telemetry source
- [ ] Implement a secure server-side telemetry API
- [ ] Map source fields into capacity summary, time-series and hotspot contracts
- [ ] Add authentication and tenant-aware authorization
- [ ] Introduce configurable capacity and time-window selection
- [ ] Display authoritative freshness timestamps and source identifiers
- [ ] Persist investigations, recommendations, and actions
- [ ] Add integration tests for authorization, empty data, malformed responses, throttling and outages
- [ ] Add accessibility tests

## Phase 3 — Production hardening

- [ ] Add audit logging and operational monitoring
- [ ] Define retention, privacy, and data-governance controls
- [ ] Add role-based workflows and approval gates
- [ ] Prevent sample mode in production deployments through a release policy
- [ ] Validate performance against representative capacity volumes
- [ ] Complete organizational security and compliance reviews
