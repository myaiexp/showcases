// dexie-js example: bulkGet(): many keys, answers in order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "bulkGet(): many keys, answers in order",
  summary: "Ask for several keys at once and get an array back that lines up with your request, position by position. A key that does not exist gives undefined in its slot, and asking for the same key twice answers twice.",
  section: 'Table',
  tags: ["bulkGet"],
  docs: ["repo/docs/Table/Table.bulkGet().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
