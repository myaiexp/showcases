// Vizzu example: style.title.fontSize changes only the title
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Title font size",
  summary:
    "Setting title.fontSize to 50 makes the title bigger and leaves every other text on the chart at its size.",
  section: "Color palette & fonts",
  tags: ['style','title.fontSize'],
  docs: [
    'repo/docs/tutorial/color_palette_fonts.md',
    'repo/docs/tutorial/color_palette_fonts/02_a.js',
    'repo/docs/tutorial/color_palette_fonts/02_b.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/typeschema-api/styles.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
