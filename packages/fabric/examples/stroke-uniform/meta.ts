// fabric example: Objects: strokeUniform
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Objects: strokeUniform',
  summary:
    'With strokeUniform the stroke keeps its pixel width when the object is scaled; without it the stroke stretches with scaleX and scaleY.',
  section: 'Objects',
  tags: ['strokeUniform', 'strokeWidth', 'scaleX'],
  docs: ['repo/src/content/docs/api/classes/FabricObject.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
