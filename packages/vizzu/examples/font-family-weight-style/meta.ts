// Vizzu example: fontFamily, fontStyle and fontWeight on the root and on one text
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Font family, weight and style',
  summary:
    "fontFamily set on the chart root is inherited by every text; the same properties on the title override it. fontStyle takes 'normal', 'italic' or 'oblique', and fontWeight takes 'normal', 'bold' or a CSS number such as 300.",
  section: 'Style',
  tags: ['style', 'fontFamily', 'fontStyle', 'fontWeight', 'title'],
  docs: [
    'repo/docs/tutorial/style.md',
    'repo/src/apps/weblib/typeschema-api/styles.yaml',
    'repo/docs/tutorial/color_palette_fonts.md',
    'repo/docs/tutorial/color_palette_fonts/01_a.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
