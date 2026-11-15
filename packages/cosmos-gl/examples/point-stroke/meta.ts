// cosmos-gl example: Point stroke
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Point stroke',
  summary:
    'pointDefaultStrokeWidth turns on a thin band along the inside edge of every point, in a lighter or darker shade of its own color, which separates points that overlap. It stays the same width on screen and never makes a point bigger.',
  section: 'Point styling',
  tags: ['pointDefaultStrokeWidth', 'pointDefaultStrokeColor', 'pointStrokeContrast'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/history/2026/2026-09-15-point-stroke.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
