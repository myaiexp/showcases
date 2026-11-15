// Vizzu example: style.plot.marker.colorPalette sets the colours a dimension cycles through
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Colour palette",
  summary:
    "Vizzu picks marker colours from a palette, one colour per item of the dimension on the color channel, in data order. Setting plot.marker.colorPalette to three colours swaps the default palette, and the columns and legend recolour.",
  section: "Color palette & fonts",
  tags: ['style','plot.marker.colorPalette','color'],
  docs: [
    'repo/docs/tutorial/color_palette_fonts.md',
    'repo/docs/tutorial/color_palette_fonts/01_a.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/typeschema-api/styles.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
