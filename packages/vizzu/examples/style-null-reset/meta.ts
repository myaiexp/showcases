// Vizzu example: style: null throws away every style setting, the dark colours too
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Style null resets to the light defaults",
  summary:
    "Passing null as the whole style resets every style parameter to Vizzu's own default, and Vizzu's default is a light chart. This gallery's dark colours are style settings too, so they go with it; the loop then restores them.",
  section: "Color palette & fonts",
  tags: ['style','null'],
  docs: [
    'repo/docs/tutorial/color_palette_fonts.md',
    'repo/docs/tutorial/color_palette_fonts/05_a.js',
    'repo/docs/tutorial/color_palette_fonts/05_b.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/typeschema-api/anim.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
