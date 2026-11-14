// dexie-js example: put() fires creating or updating, depending on the id
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "put() fires creating or updating, depending on the id",
  summary: "put() can mean 'add' or 'replace'. The event log shows which hook fires: creating when the id is new, updating when it exists, even if nothing actually changes. It explains why a hook may see put() as either.",
  section: "Hooks and middleware",
  tags: ["hook","put","creating","updating"],
  docs: ["repo/docs/Table/Table.hook('creating').md","repo/docs/Table/Table.hook('updating').md","repo/docs/Table/Table.put().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
