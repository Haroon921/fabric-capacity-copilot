# Security and governance checklist

- Use Fabric/Entra authentication from the current Rayfin scaffold.
- Apply least privilege at workspace, item, API and row levels.
- Separate Viewer, Analyst and Admin application capabilities.
- Do not store access tokens, secrets, tenant IDs or workspace IDs in source control.
- Treat capacity and item names as customer operational metadata.
- Log recommendation creation, acknowledgement, ownership and resolution.
- Validate that every backend request enforces authorization; frontend hiding is not security.
- Run dependency, secret and code scanning in CI.
- Complete internal compliance/security review before customer scaling.
- Clearly disclose preview dependencies and accelerator/support boundaries.
