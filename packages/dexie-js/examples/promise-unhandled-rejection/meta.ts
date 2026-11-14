// dexie-js example: Uncaught errors reach unhandledrejection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Uncaught errors reach unhandledrejection",
  summary: "An async function whose failed database call nobody catches is announced to the page through the unhandledrejection event, which this example listens to and removes again when done. If the failure is caught, the page hears nothing. (Dexie 4 does not raise the event for its own promises; it is the native async function that does.)",
  section: 'Promise',
  tags: ["unhandledrejection", "catch", "add"],
  docs: ["repo/docs/Promise/unhandledrejection-event.md", "repo/docs/Promise/Promise.catch().md", "repo/docs/Tutorial/Best-Practices.md", "repo/docs/Table/Table.add().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
