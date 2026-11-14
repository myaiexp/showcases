// vchart example: Polar axes: angle and radius
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Polar axes: angle and radius',
  summary:
    'A radar chart has a band axis with orient angle and a linear axis with orient radius. The controls smooth the radius grid, colour its rings with alternateColor, show the angle domain line and change the radius range.',
  section: 'Concepts: Axes',
  tags: ['orient: angle', 'orient: radius', 'grid.smooth', 'grid.alternateColor', 'radar', 'polar axes'],
  docs: ['repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Axes.md', 'repo/docs/assets/option/en/component/polar-axis.md', 'repo/docs/assets/option/en/component/axis-common/polar-axis.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
