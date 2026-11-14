// vchart example: FAQ: value labels pinned to the right edge
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: value labels pinned to the right edge",
  summary:
    "The built-in labels sit beside each bar. An extensionMark text mark with x from the region's layout width and y from valueToY plus half yBandwidth puts every value in a right-aligned column.",
  section: 'FAQ',
  tags: ['extensionMark','text','getLayoutRect','yBandwidth','label'],
  docs: [
    'repo/docs/assets/faq/en/179- Bar chart value labels aligned to the right display.md',
    'repo/docs/assets/option/en/series/bar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
