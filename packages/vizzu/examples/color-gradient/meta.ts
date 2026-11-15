// Vizzu example: style.plot.marker.colorGradient colours a measure on the color channel
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Colour gradient',
  summary:
    'A measure on the color channel is drawn with a gradient. plot.marker.colorGradient lists colour stops, each a colour and a position between 0 and 1, and the columns change colour with it.',
  section: 'Style',
  tags: ['style', 'plot.marker.colorGradient', 'color'],
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
