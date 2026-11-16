// fabric example: Serialization: includeDefaultValues off for smaller JSON
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Serialization: includeDefaultValues off for smaller JSON',
  summary:
    'With canvas.includeDefaultValues set to false, toJSON() drops every property that equals the object class default, so the text is a fraction of the size. left, top and type always stay.',
  section: 'Serialization',
  tags: ['includeDefaultValues', 'toJSON', 'toObject'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-3.md',
    'repo/src/content/docs/api/classes/StaticCanvas.md',
    'repo/src/content/docs/api/classes/FabricObject.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
