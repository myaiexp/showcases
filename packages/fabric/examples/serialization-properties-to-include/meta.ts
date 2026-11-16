// fabric example: Serialization: propertiesToInclude for custom properties
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Serialization: propertiesToInclude for custom properties',
  summary:
    'Fabric writes its own properties only. canvas.toObject([...names]) copies the listed extra properties (here name and zone) from every object into the JSON; the checkboxes change the list.',
  section: 'Serialization',
  tags: ['toObject', 'propertiesToInclude', 'includeDefaultValues'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-3.md',
    'repo/src/content/docs/api/classes/StaticCanvas.md',
    'repo/src/content/docs/api/classes/FabricObject.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
