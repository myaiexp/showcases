// cosmos-gl example: Point default shape
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Point default shape',
  summary:
    'pointDefaultShape is the fallback shape for points that setPointShapes leaves out or gives an invalid value. Hub and outer ring keep their stars while the default changes for all the others.',
  section: 'Point styling',
  tags: ['pointDefaultShape', 'PointShape', 'setPointShapes'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
