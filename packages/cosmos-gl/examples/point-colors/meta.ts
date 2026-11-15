// cosmos-gl example: Point colors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Point colors',
  summary:
    'setPointColors takes one RGBA color per point as a flat Float32Array with values from 0 to 1, and the next render() blends from the old colors to the new ones. getPointColors returns the colors as drawn.',
  section: 'Point styling',
  tags: ['setPointColors', 'getPointColors', 'transitionDuration'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
