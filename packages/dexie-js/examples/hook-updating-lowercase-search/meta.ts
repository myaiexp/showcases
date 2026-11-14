// dexie-js example: Hooks keep a lowercase copy of a field in sync
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Hooks keep a lowercase copy of a field in sync",
  summary: "Each name has a lowercase twin stored next to it, so a search can ignore capital letters. A creating hook makes the twin for new rows and an updating hook rewrites it whenever the name changes. The search then finds the renamed friend by typing in any case.",
  section: "Hooks and middleware",
  tags: ["hook","creating","updating","search"],
  docs: ["repo/docs/Table/Table.hook('creating').md","repo/docs/Table/Table.hook('updating').md"],
  provenance: 'pure',
  added: '2026-11-14',
});
