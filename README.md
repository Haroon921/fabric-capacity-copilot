<div align="center">
  <img src="docs/assets/brand-mark.svg" width="84" alt="Fabric Capacity Copilot logo">

  # Fabric Capacity Copilot

  **Turn Microsoft Fabric capacity telemetry into evidence-backed investigation and accountable remediation.**

  [![Launch demo](https://img.shields.io/badge/Launch_live_demo-5B4BD6?style=for-the-badge&logo=github)](https://haroon921.github.io/fabric-capacity-copilot/)
  [![Download presentation](https://img.shields.io/badge/Download_presentation-201D45?style=for-the-badge&logo=microsoftpowerpoint)](docs/Fabric-Capacity-Copilot-Overview.pptx)

  [![CI](https://github.com/Haroon921/fabric-capacity-copilot/actions/workflows/ci.yml/badge.svg)](https://github.com/Haroon921/fabric-capacity-copilot/actions/workflows/ci.yml)
  [![Deploy](https://github.com/Haroon921/fabric-capacity-copilot/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/Haroon921/fabric-capacity-copilot/actions/workflows/deploy-pages.yml)
  [![CodeQL](https://github.com/Haroon921/fabric-capacity-copilot/actions/workflows/codeql.yml/badge.svg)](https://github.com/Haroon921/fabric-capacity-copilot/actions/workflows/codeql.yml)
  ![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
  ![License](https://img.shields.io/badge/license-MIT-5B4BD6)
</div>

![Fabric Capacity Copilot product walkthrough](docs/assets/product-walkthrough.gif)

> [!IMPORTANT]
> This repository is an accelerator/reference implementation, not a Microsoft product. The interface uses clearly labelled sample telemetry. Connect an approved source and complete your organization's security, privacy, accessibility, and operational reviews before production use.

## Why it matters

Capacity teams often have the signal but lack a consistent path from telemetry to ownership. This accelerator demonstrates one connected workflow:

| Experience | Outcome |
| --- | --- |
| Executive overview | Understand capacity health, utilization, workload mix, and priority hotspots at a glance. |
| Capacity explorer | Review time-series consumption and narrow the investigation scope. |
| Evidence-backed investigation | Translate a selected hotspot into deterministic guidance grounded in observed signals. |
| Action center | Assign, track, and resolve remediation work without losing operational context. |
| Rayfin data model | Extend investigations, recommendations, and actions into durable application entities. |

## Product experience

<table>
  <tr>
    <td width="50%" valign="top">
      <b>Evidence-backed investigation</b><br><br>
      <img src="docs/screenshots/investigation.png" alt="Evidence-backed hotspot investigation">
    </td>
    <td width="50%" valign="top">
      <b>Operational action center</b><br><br>
      <img src="docs/screenshots/actions.png" alt="Remediation action center">
    </td>
  </tr>
</table>

<details>
  <summary><b>View the complete capacity overview</b></summary>
  <br>
  <img src="docs/screenshots/overview.png" alt="Complete Fabric Capacity Copilot overview">
</details>

## Architecture

```mermaid
flowchart LR
    A["Approved Fabric<br/>telemetry source"] --> B["Telemetry adapter"]
    B --> C["Capacity signals"]
    C --> D["Deterministic<br/>recommendation engine"]
    D --> E["Evidence-backed<br/>investigation"]
    E --> F["Remediation<br/>action workflow"]
    F --> G["Owner and status"]
    C --> H["React experience"]
    E --> H
    G --> H

    classDef source fill:#EAE7FF,stroke:#5B4BD6,color:#201D45,stroke-width:2px;
    classDef engine fill:#201D45,stroke:#201D45,color:#FFFFFF,stroke-width:2px;
    classDef workflow fill:#FFFFFF,stroke:#8B82DB,color:#201D45,stroke-width:2px;
    class A,B,C source;
    class D engine;
    class E,F,G,H workflow;
```

The sample adapter is intentionally separated from the recommendation engine so teams can replace demonstration telemetry without rewriting the investigation experience.

## Run locally

Prerequisites: Node.js 20 or later and npm.

```bash
npm ci
npm run dev
```

Open the local URL shown by Vite. To validate the optimized build:

```bash
npm run build
npm run preview
```

## Explore and extend

- [Live demonstration](https://haroon921.github.io/fabric-capacity-copilot/)
- [Executive presentation](docs/Fabric-Capacity-Copilot-Overview.pptx)
- [Roadmap](ROADMAP.md)
- [Contributing guide](CONTRIBUTING.md)
- [Deployment guide](docs/DEPLOYMENT.md)
- [Data integration guide](docs/DATA-INTEGRATION.md)
- [Security guidance](docs/SECURITY.md)
- [Latest release](https://github.com/Haroon921/fabric-capacity-copilot/releases/latest)

## Technology

React · TypeScript · Vite · Recharts · Lucide · optional Rayfin entities

## License

Licensed under the [MIT License](LICENSE).
