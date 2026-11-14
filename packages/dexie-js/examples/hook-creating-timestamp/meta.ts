// dexie-js example: A creating hook stamps each new row with the time
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A creating hook stamps each new row with the time",
  summary: "Nobody types the time when a friend is added, yet every new row ends up with a createdAt value. A creating hook runs just before each row is stored and writes the current time onto it. It is how an app keeps a reliable 'added at' column without trusting every caller.",
  section: "Hooks and middleware",
  tags: ["hook","creating","createdAt"],
  docs: ["repo/docs/Table/Table.hook('creating').md","repo/docs/Tutorial/Design.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
