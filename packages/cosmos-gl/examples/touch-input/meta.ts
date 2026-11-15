// cosmos-gl example: Touch input
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Touch input',
  summary:
    'cosmos.gl reads pointer events, so a finger or pen works like a mouse: a tap fires onPointClick, and holding for half a second fires the context-menu callbacks instead (the click that follows is dropped). The canvas claims touches (touch-action none) only while enableDrag or enableZoom is on. A pretend finger sends the same events.',
  section: 'Performance',
  tags: ['onPointClick', 'onPointContextMenu', 'onBackgroundContextMenu', 'onBackgroundClick', 'enableDrag', 'enableZoom'],
  docs: [
    'repo/history/2026/2026-06-03-touch-input.md',
    'repo/src/stories/configuration.mdx',
    'repo/src/stories/api-reference.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
