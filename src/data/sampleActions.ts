import type { ActionItem } from "../types";

export const initialActions: ActionItem[] = [
  {
    id: "a1",
    title: "Review Finance Warehouse interactive operations",
    owner: "Capacity Admin",
    priority: "High",
    status: "Investigating",
    hotspotId: "h1",
  },
  {
    id: "a2",
    title: "Validate IoT ingestion schedule and concurrency",
    owner: "Platform Team",
    priority: "Medium",
    status: "Open",
    hotspotId: "h2",
  },
];
