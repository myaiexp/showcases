// Vizzu example: background colours reveal the plot, legend and title areas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layout parts shown by background colour",
  summary:
    "A chart is three areas: the plot, the title on top and the legend on the left. Giving each its own background colour shows where they sit and how they share the chart.",
  section: "Chart layout",
  tags: ['style','backgroundColor','plot','legend','title'],
  docs: [
    'repo/docs/tutorial/chart_layout.md',
    'repo/docs/tutorial/chart_layout/01.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/typeschema-api/styles.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
