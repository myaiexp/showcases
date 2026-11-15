// 3d-force-graph example: Node styling: nodeThreeObjectExtend
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Node styling: nodeThreeObjectExtend',
  summary:
    'With nodeThreeObjectExtend true the custom object is added to the default sphere instead of replacing it. Each node keeps its sphere and gains a text sprite lifted above it. Switch it off and the spheres go, leaving only the labels.',
  section: 'Node styling',
  tags: ['nodeThreeObject', 'nodeThreeObjectExtend'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
