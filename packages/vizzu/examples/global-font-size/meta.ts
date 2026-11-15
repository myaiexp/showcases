// Vizzu example: the top-level style.fontSize scales every text together
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One font size for the whole chart',
  summary:
    'Top-level fontSize scales the title, legend, labels and axis texts in proportion; the number is the axis label size. Setting it to 20 makes every text on the chart bigger at once.',
  section: 'Color palette & fonts',
  tags: ['style', 'fontSize'],
  docs: [
    'repo/docs/tutorial/color_palette_fonts.md',
    'repo/docs/tutorial/color_palette_fonts/04_a.js',
    'repo/docs/tutorial/color_palette_fonts/04_b.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/typeschema-api/styles.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
