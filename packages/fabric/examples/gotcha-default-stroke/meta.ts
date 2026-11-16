// fabric example: Gotchas: the invisible default stroke width
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Gotchas: the invisible default stroke width',
  summary:
    'The guide says objects have a transparent stroke of width 1. In v7 stroke is null, so nothing is painted, but strokeWidth is still 1 and the 20×20 rect measures 21×21 in its bounding box and selection border. strokeWidth: 0 makes it exact.',
  section: 'Gotchas',
  tags: ['strokeWidth', 'stroke', 'getScaledWidth', 'getBoundingRect'],
  docs: [
    'repo/src/content/docs/docs/Old docs/gotchas.md',
    'repo/src/content/docs/api/classes/Rect.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
