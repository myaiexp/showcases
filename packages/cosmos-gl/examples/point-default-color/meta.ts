// cosmos-gl example: Point default color
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Point default color',
  summary:
    'pointDefaultColor is the color of every point that gets none from setPointColors, or whose entry is empty. It takes a hex string or an array of four numbers from 0 to 1, and changes live through setConfigPartial.',
  section: 'Point styling',
  tags: ['pointDefaultColor', 'setPointColors', 'setConfigPartial'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
