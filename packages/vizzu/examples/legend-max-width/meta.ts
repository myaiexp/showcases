// Vizzu example: style.legend.maxWidth caps how wide the legend can grow
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Legend maximum width',
  summary:
    "The legend sizes itself automatically and stops at about a fifth of the chart, so a larger maxWidth alone changes nothing. With width: '60%' the legend opens up, and maxWidth then limits how far it may grow, handing the space back to the plot.",
  section: 'Style',
  tags: ['style', 'legend.maxWidth', 'legend.width'],
  docs: [
    'repo/docs/tutorial/style.md',
    'repo/src/apps/weblib/typeschema-api/styles.yaml',
    'repo/docs/tutorial/chart_layout.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
