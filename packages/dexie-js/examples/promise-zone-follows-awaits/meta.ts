// dexie-js example: A zone value follows every await
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A zone value follows every await",
  summary: "Dexie keeps a hidden slot of data that travels with a chain of promises, called a zone. A value set in it is still there after a database call and a timer wait, two flows keep separate values, but a plain timer callback loses it.",
  section: 'Promise',
  tags: ["Promise.PSD", "Promise.newPSD", "get"],
  docs: ["repo/docs/Promise/Promise.PSD.md", "repo/docs/Promise/Promise.md", "repo/docs/Dexie/Dexie.transaction().md", "repo/docs/Table/Table.get().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
