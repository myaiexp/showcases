// dexie-js example: Which table methods fire which hooks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Which table methods fire which hooks",
  summary: "Five calls are run in turn: add, update, modify, delete and clear. The event log shows which of the three hooks each one triggers and for how many rows. clear() and modify() reach hooks too, once per row.",
  section: "Hooks and middleware",
  tags: ["hook","creating","updating","deleting"],
  docs: ["repo/docs/Table/Table.hook('creating').md","repo/docs/Table/Table.hook('updating').md","repo/docs/Table/Table.hook('deleting').md"],
  provenance: 'pure',
  added: '2026-11-14',
});
