// dexie-js example: put() replaces the whole row, update() only the change
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "put() replaces the whole row, update() only the change",
  summary: "Each friend has a city. put() swaps the entire stored object for the one you give, so a city you leave out is gone. update() applies only the changes you name, so the city stays. Pick update() when you mean to edit.",
  section: 'Table',
  tags: ["put", "update"],
  docs: ["repo/docs/Table/Table.put().md", "repo/docs/Table/Table.update().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
