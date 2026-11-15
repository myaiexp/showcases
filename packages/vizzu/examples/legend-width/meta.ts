// Vizzu example: style.legend.width sets how wide the legend area is
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Legend width",
  summary:
    "The legend is as wide as Vizzu decides until legend.width is set. Setting 50 squeezes it, a larger value gives it room, and null returns to the automatic width. The plot takes whatever the legend leaves.",
  section: "Chart layout",
  tags: ['style','legend.width','null'],
  docs: [
    'repo/docs/tutorial/chart_layout.md',
    'repo/docs/tutorial/chart_layout/01.js',
    'repo/docs/tutorial/chart_layout/02_a.js',
    'repo/docs/tutorial/chart_layout/02_b.js',
    'repo/docs/tutorial/chart_layout/03.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/typeschema-api/styles.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
