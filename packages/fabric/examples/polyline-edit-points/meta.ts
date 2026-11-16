// fabric example: Paths: editing points and setDimensions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Paths: editing points and setDimensions',
  summary:
    'Changing polyline.points does not update the object size; setDimensions() recomputes width, height and offset so the controls and hit area match again.',
  section: 'Paths',
  tags: ['Polyline', 'points', 'setDimensions', 'setCoords'],
  docs: ['repo/src/content/docs/api/classes/Polyline.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
