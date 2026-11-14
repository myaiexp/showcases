// dexie-js example: finally(): always runs, changes nothing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "finally(): always runs, changes nothing",
  summary: "A spinner goes on, a database call runs, and finally() turns the spinner off whether the call worked or failed. It does not change the outcome: a failure stays a failure.",
  section: 'Promise',
  tags: ["finally", "then", "catch", "add"],
  docs: ["repo/docs/Promise/Promise.finally().md", "repo/docs/Promise/Promise.catch().md", "repo/docs/Promise/Promise.md", "repo/docs/Table/Table.add().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
