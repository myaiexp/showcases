// tanstack-charts example: A custom legend
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A custom legend',
  summary:
    'A custom ChartColorLegend has two functions: height returns the reserved pixels before bounds are final, and render returns one keyed scene node. This one writes the series name and its latest share as a row of labels, using the resolved colors and the legend bounds it is given.',
  section: 'Legends and Color',
  tags: ['ChartColorLegend', 'height', 'render', 'SceneNode', 'color.legend'],
  docs: ['repo/docs/guides/legends-and-color.md', 'repo/docs/reference/scales-guides-and-color.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
