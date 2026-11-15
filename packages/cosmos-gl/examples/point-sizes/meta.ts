// cosmos-gl example: Point sizes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Point sizes',
  summary:
    'setPointSizes gives each point its own size in pixels, animated by the next render(). pointSizeScale then multiplies every size at once, which is handy for a zoom-like slider.',
  section: 'Point styling',
  tags: ['setPointSizes', 'pointSizeScale', 'getPointSizes'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
