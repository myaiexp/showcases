// dexie-js example: Uncaught errors reach unhandledrejection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Uncaught errors reach unhandledrejection",
  summary: "A failed database call that nobody catches is announced to the page through the unhandledrejection event, which this example listens to and removes again when done. If the call is caught, the page hears nothing.",
  section: 'Promise',
  tags: ["unhandledrejection", "catch", "add"],
  docs: ["repo/docs/Promise/unhandledrejection-event.md", "repo/docs/Promise/Promise.catch().md", "repo/docs/Tutorial/Best-Practices.md", "repo/docs/Table/Table.add().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
