// dexie-js example: An addon extends only the Dexie it is given
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "An addon extends only the Dexie it is given",
  summary: "An addon is just a function that receives a database and adds a method to its Collection class. Two connections to the same database start alike; after the addon is applied to one, only that one gains forEach(). The other fails, proving the change is per instance.",
  section: "Hooks and middleware",
  tags: ["addons","extend","Collection"],
  docs: ["repo/docs/Dexie/Dexie.addons.md","repo/docs/Tutorial/Building-Addons.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
