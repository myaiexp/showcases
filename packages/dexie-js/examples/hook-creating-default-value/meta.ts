// dexie-js example: A creating hook fills in a missing field
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A creating hook fills in a missing field",
  summary: "A friend added without a role still gets one: the hook notices the field is missing and sets it to 'friend'. A row that does bring a role keeps it. This is a tidy way to guarantee a default whatever code does the adding.",
  section: "Hooks and middleware",
  tags: ["hook","creating","default"],
  docs: ["repo/docs/Table/Table.hook('creating').md"],
  provenance: 'pure',
  added: '2026-11-14',
});
