// dexie-js example: Dexie.addons: plug-ins for every new database
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dexie.addons: plug-ins for every new database",
  summary: "An addon is a small function that decorates each new Dexie instance. Here one adds forEach to collections: a database created while it is registered has it, and one created with addons: [] opts out. The card registers the addon only for an instant and removes it again.",
  section: 'Dexie class',
  tags: ["Dexie.addons","addons option","Collection","plug-in"],
  docs: ["repo/docs/Dexie/Dexie.addons.md","repo/docs/Dexie/Dexie.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
