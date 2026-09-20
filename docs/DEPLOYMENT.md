# Deployment guide

## 1. Validate prerequisites
- A Fabric workspace assigned to Fabric capacity.
- Contributor, Member, or Admin access to that workspace.
- Fabric Apps enabled by a tenant administrator.
- Node.js and npm installed.
- An approved Git repository and branch policy.

## 2. Test the included UI
```bash
npm install
npm run build
npm run dev
```
Confirm that the banner says the app uses sample data.

## 3. Create the official Rayfin scaffold
Because Fabric Apps and Rayfin are preview capabilities, create a fresh scaffold with the current CLI rather than treating this ZIP's illustrative `rayfin` folder as version-locked configuration.
```bash
npm create @microsoft/rayfin@latest -- capacity-copilot --workspace <workspace-name>
```
Copy `src/` from this accelerator into the scaffold, preserve the scaffold's current `rayfin.yml`, and install any UI dependencies listed in this repository's `package.json`.

## 4. Add application entities
Use the three `.example` entity files as a model. Rename them to `.ts` only after checking the decorators against the CLI-generated sample. Add authorization policies before storing tenant-related investigation state.

## 5. Connect telemetry
Follow `DATA-INTEGRATION.md`. Keep sample mode enabled until the adapter returns validated authoritative data. Never silently fall back from live telemetry to sample data.

## 6. Local validation
```bash
npm run build
npm run dev
```
Validate sign-in, least-privilege access, empty/error states, hotspot selection, action creation and no cross-user data leakage.

## 7. Preview and deploy
```bash
npx rayfin up --dry-run
npx rayfin up
npx rayfin up status
```
Use the hosted URL returned by the CLI. Validate permissions in the Fabric portal and monitor the app's own CU consumption.

## 8. Release gate
Do not label this production-ready until security/compliance review, dependency scanning, accessibility validation, telemetry-source approval, threat modeling, and load testing are complete.
