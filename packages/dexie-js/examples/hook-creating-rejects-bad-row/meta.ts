// dexie-js example: A creating hook can refuse a row by throwing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A creating hook can refuse a row by throwing",
  summary: "Every new friend passes through a check. A row with no name, or a negative age, makes the hook throw, so the add fails with that message and nothing is stored. The grid proves it: only the good row appears.",
  section: "Hooks and middleware",
  tags: ["hook","creating","validation"],
  docs: ["repo/docs/Table/Table.hook('creating').md"],
  provenance: 'pure',
  added: '2026-11-14',
});
