# Fabric Capacity Copilot

A reference accelerator that turns Microsoft Fabric capacity telemetry into a focused investigation and remediation workflow.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-5B4BD6)

![Fabric Capacity Copilot overview](docs/screenshots/overview.png)

> [!IMPORTANT]
> This repository is an accelerator/reference implementation, not a Microsoft product. The UI ships with clearly labelled sample telemetry. Connect an approved data source and complete your organization's security, privacy, and operational reviews before production use.

## What it demonstrates

| Experience | Outcome |
| --- | --- |
| Executive overview | Understand capacity health, utilization, workload mix, and priority hotspots at a glance. |
| Capacity explorer | Review time-series consumption and filter the investigation scope. |
| Evidence-backed investigation | Turn a selected hotspot into deterministic guidance grounded in observed signals. |
| Action center | Assign, track, and resolve remediation work without losing operational context. |
| Rayfin data model | Extend investigations, recommendations, and actions into durable application entities. |

## Product walkthrough

### Investigate the highest-priority signal

![Evidence-backed hotspot investigation](docs/screenshots/investigation.png)

### Track remediation to completion

![Remediation action center](docs/screenshots/actions.png)

For an executive-ready walkthrough, download the
[Fabric Capacity Copilot overview presentation](docs/Fabric-Capacity-Copilot-Overview.pptx).

## Run locally

Prerequisites: Node.js 20 or later and npm.

```bash
npm ci
npm run dev
```

Open the local URL shown by Vite. To create an optimized build:

```bash
npm run build
npm run preview
```

## Architecture

```text
Approved telemetry source
          |
          v
  Capacity adapter  --->  Investigation engine  --->  Action workflow
          |                         |
          +-------------------------+
                    |
                    v
             React experience
```

The sample adapter is intentionally isolated from the recommendation engine so teams can replace demonstration telemetry without rewriting the investigation experience.

## Documentation

- [Deployment guide](docs/DEPLOYMENT.md)
- [Data integration guide](docs/DATA-INTEGRATION.md)
- [Security guidance](docs/SECURITY.md)
- [GitHub repository guide](docs/GITHUB.md)

## Technology

- React and TypeScript
- Vite
- Recharts
- Lucide icons
- Optional Rayfin entity examples

## License

Licensed under the [MIT License](LICENSE).
