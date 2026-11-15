// Vizzu example: style.tooltip sets the tooltip's layout and colours, seen on hover
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tooltip layout and colours',
  summary:
    "The tooltip has its own style block: layout ('singleLine' or 'multiLine'), color, backgroundColor, borderColor and borderRadius. With the tooltip feature on, hover a column in the full view to see each style applied; the chart changes shape as the style changes.",
  section: 'Style',
  tags: ['style', 'tooltip.layout', 'tooltip.backgroundColor', 'tooltip.borderRadius', 'tooltip'],
  docs: [
    'repo/docs/tutorial/style.md',
    'repo/src/apps/weblib/typeschema-api/styles.yaml',
    'repo/docs/tutorial/axes_title_tooltip.md',
    'repo/docs/tutorial/axes_title_tooltip/04_a.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
