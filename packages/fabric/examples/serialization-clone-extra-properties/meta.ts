// fabric example: Serialization: clone with extra properties
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Serialization: clone with extra properties',
  summary:
    'object.clone() goes through toObject(), so custom properties such as name are lost. object.clone(["name", "zone"]) passes the list on and the copy keeps them.',
  section: 'Serialization',
  tags: ['clone', 'propertiesToInclude', 'toObject', 'fromObject'],
  docs: [
    'repo/src/content/docs/docs/Old docs/gotchas.md',
    'repo/src/content/docs/api/classes/FabricObject.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
