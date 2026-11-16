// fabric example: Serialization: toObject and fromObject for one object
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Serialization: toObject and fromObject for one object',
  summary:
    'rect.toObject() turns one object into plain data and the static Rect.fromObject(data) returns a promise of a new Rect with the same look. The right pane is rebuilt from that data on every change.',
  section: 'Serialization',
  tags: ['toObject', 'fromObject', 'Rect', 'includeDefaultValues'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-3.md',
    'repo/src/content/docs/docs/core-concepts.md',
    'repo/src/content/docs/api/classes/Rect.md',
    'repo/src/content/docs/api/classes/FabricObject.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
