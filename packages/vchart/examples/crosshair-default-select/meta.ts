// vchart example: Crosshair defaultSelect across two axes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Crosshair defaultSelect across two axes',
  summary:
    'A chart with a left and a right value axis and a bottom category axis; crosshair.xField and yField use bindingAxesIndex to choose their axes and defaultSelect to show the crosshair before any hover. The selects change the default datum.',
  section: 'Concepts: Components',
  tags: ['crosshair', 'defaultSelect', 'bindingAxesIndex', 'axes'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Crosshair.md',
    'repo/docs/assets/option/en/component/crosshair.md',
    'repo/docs/assets/option/en/component/crosshair-common/crosshair-data-bind.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
