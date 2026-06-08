import { createFileRoute, Outlet } from "@tanstack/react-router";

// Layout route — renders the matched child route (index list or $slug detail)
export const Route = createFileRoute("/sectors")({
  component: Outlet,
});
