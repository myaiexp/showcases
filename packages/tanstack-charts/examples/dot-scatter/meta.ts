// tanstack-charts example: Scatter plot with dot
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scatter plot with dot',
  summary:
    'dot places a fixed-pixel circle at each x/y value. Colour comes from the chart colour scale through the color channel, so the legend and the dots agree. The slider changes the constant radius r, and the circles keep their pixel size when the chart resizes.',
  section: 'Dot and Hexagon Marks',
  tags: ['dot', 'color', 'r', 'fillOpacity', 'colorLegend'],
  docs: [
    'repo/docs/reference/marks/dot-and-hexagon.md',
    'repo/docs/guides/legends-and-color.md',
    'repo/docs/guides/tooltips-and-focus.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
