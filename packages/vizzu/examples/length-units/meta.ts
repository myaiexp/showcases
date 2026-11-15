// Vizzu example: size parameters take px, % or em, given as strings
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pixels, percent and em',
  summary:
    'Every size style accepts a number of pixels, a percentage of the chart, or em, relative to the font size. The legend width is set in all three in turn: "120px", "25%" and "8em".',
  section: 'Chart layout',
  tags: ['style', 'legend.width', 'units', 'px', '%', 'em'],
  docs: [
    'repo/docs/tutorial/chart_layout.md',
    'repo/docs/tutorial/chart_layout/01.js',
    'repo/docs/tutorial/chart_layout/02_a.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/typeschema-api/styles.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
