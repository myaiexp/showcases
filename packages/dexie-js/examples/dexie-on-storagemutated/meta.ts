// dexie-js example: Dexie.on('storagemutated'): every write, page-wide
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dexie.on('storagemutated'): every write, page-wide",
  summary: "This low-level event fires after every committed write, in any database on the page, and says which table and which indexes may have changed. It is what live queries are built on. The card listens only for its own database and unsubscribes when it closes.",
  section: 'Dexie class',
  tags: ["Dexie.on('storagemutated')","ObservabilitySet","unsubscribe","liveQuery"],
  docs: ['repo/docs/Table/Table.add().md', 'repo/docs/Table/Table.update().md', 'repo/docs/Table/Table.delete().md', "repo/docs/Dexie/Dexie.on.storagemutated.md","repo/docs/Dexie/Dexie.on().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
