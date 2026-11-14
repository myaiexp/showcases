// vchart example: Ticks, sub ticks and sub grid lines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Ticks, sub ticks and sub grid lines',
  summary:
    'Beyond the main ticks and grid, an axis can draw sub ticks between them (subTick) and thinner sub grid lines (subGrid). Controls set the tick size, the number of sub ticks and whether the grids are dashed.',
  section: 'Concepts: Axes',
  tags: ['tick.tickSize', 'subTick.visible', 'subTick.tickCount', 'grid.style', 'subGrid.visible'],
  docs: ['repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Axes.md', 'repo/docs/assets/option/en/component/axis-common/base-axis.md', 'repo/docs/assets/option/en/component/axis-common/axis-grid.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
