import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/command")({
  component: CommandRedirect,
});

function CommandRedirect() {
  return <Navigate to="/archetypes" replace />;
}