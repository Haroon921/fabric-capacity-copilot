# GitHub repository guide

## GitHub.com UI
1. Create a new repository named `fabric-capacity-copilot`.
2. Choose the visibility required by your organization's policy. Do not initialize it with a README because this package already includes one.
3. Extract this ZIP locally and open a terminal in the extracted folder.
4. Run:
```bash
git init
git branch -M main
git add .
git commit -m "Initial Fabric Capacity Copilot accelerator"
git remote add origin <repository-url>
git push -u origin main
```
5. Enable branch protection, pull-request review and secret scanning according to your organization's policy.

## Optional GitHub CLI
If `gh` is installed and authenticated:
```bash
gh repo create fabric-capacity-copilot --private --source=. --remote=origin --push
```
Change `--private` only when organizational approval permits wider visibility.

## Recommended repository topics
`microsoft-fabric`, `rayfin`, `capacity-management`, `finops`, `typescript`, `react`, `accelerator`

## Repository presentation

- Set the website URL to `https://haroon921.github.io/fabric-capacity-copilot/`.
- In **Settings → General → Social preview**, upload `docs/assets/social-preview.png`.
- Use `docs/assets/product-walkthrough.gif` in the README for the product walkthrough.
- Publish the PowerPoint from `docs/Fabric-Capacity-Copilot-Overview.pptx` with each release.
