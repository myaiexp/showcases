// dexie-js example: update() with a dotted key path
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "update() with a dotted key path",
  summary: "Each friend has an address with a city and a zip code. Handing update() a whole new address object replaces the entire address, so the city is lost. Writing the path 'address.zip' changes only the zip and keeps the city.",
  section: 'Table',
  tags: ["update", "key path"],
  docs: ["repo/docs/Table/Table.update().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
