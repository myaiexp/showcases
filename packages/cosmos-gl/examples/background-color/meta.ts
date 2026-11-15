// cosmos-gl example: Background color
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Background color',
  summary:
    'The canvas color behind the graph. backgroundColor takes any CSS color string and setConfigPartial changes it while the graph is on screen, without touching the points or links.',
  section: 'Configuration',
  tags: ['backgroundColor', 'setConfigPartial'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
