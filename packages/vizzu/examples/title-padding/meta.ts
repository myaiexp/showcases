// Vizzu example: style.title paddings move the title inside its area
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Title padding',
  summary:
    'The title sits centred above the chart by default. Adding paddingLeft 200 pushes the text to the right, and paddingTop and paddingBottom 20 make the title area taller; null on all three puts it back.',
  section: 'Chart layout',
  tags: ['style', 'title.paddingLeft', 'title.paddingTop', 'title.paddingBottom'],
  docs: [
    'repo/docs/tutorial/chart_layout.md',
    'repo/docs/tutorial/chart_layout/03.js',
    'repo/docs/tutorial/chart_layout/04_a.js',
    'repo/docs/tutorial/chart_layout/04_b.js',
    'repo/docs/tutorial/chart_layout/05.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/typeschema-api/styles.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
