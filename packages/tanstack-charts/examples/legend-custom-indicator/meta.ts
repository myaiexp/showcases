// tanstack-charts example: Custom legend indicator with render
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom legend indicator with render',
  summary:
    'indicator.render gets the categorical value and the resolved color, label and bounds, and returns scene nodes. This one draws a small rect with a rule through it for every item. The legend still does the measuring, wrapping and placement of each item, so only the symbol is yours.',
  section: 'Legends and Color',
  tags: ['colorLegendItems', 'indicator.render', 'SceneNode', 'ColorLegendIndicatorRenderContext'],
  docs: ['repo/docs/guides/legends-and-color.md', 'repo/docs/reference/scales-guides-and-color.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
