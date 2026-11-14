// dexie-js example: An updating hook keeps updatedAt current
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "An updating hook keeps updatedAt current",
  summary: "Three friends have never been changed. Each time one is updated the hook adds an updatedAt time to the change, even though the caller only asked for a new age or name. The extra column fills in and refreshes on its own.",
  section: "Hooks and middleware",
  tags: ["hook","updating","updatedAt"],
  docs: ["repo/docs/Table/Table.hook('updating').md","repo/docs/Tutorial/Design.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
