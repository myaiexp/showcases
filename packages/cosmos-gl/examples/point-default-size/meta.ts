// cosmos-gl example: Point default size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Point default size',
  summary:
    'pointDefaultSize is the size of every point that setPointSizes leaves empty. Here only the outer ring has sizes of its own, so changing the default resizes everything else.',
  section: 'Point styling',
  tags: ['pointDefaultSize', 'setPointSizes', 'setConfigPartial'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
