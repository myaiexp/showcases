// dexie-js example: TimeoutError: waitFor() gives up on a slow promise
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "TimeoutError: waitFor() gives up on a slow promise",
  summary: "A friend is added inside a transaction, then it waits on something slow with a 0.3 second limit. The wait times out with a red TimeoutError and the whole transaction is undone, so the grid is unchanged. With a roomier limit it is saved.",
  section: "Errors",
  tags: ["TimeoutError","waitFor","transaction"],
  docs: ['repo/docs/Table/Table.add().md', 'repo/docs/Table/Table.put().md', "repo/docs/DexieErrors/Dexie.TimeoutError.md","repo/docs/Dexie/Dexie.waitFor().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
