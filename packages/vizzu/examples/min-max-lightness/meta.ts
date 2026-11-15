// Vizzu example: minLightness and maxLightness set the range of the lightness channel
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Lightness range',
  summary:
    'With a measure on the lightness channel, minLightness and maxLightness say how dark the smallest value and how light the largest value get, from -1 (black) to 1 (white).',
  section: 'Style',
  tags: ['style', 'plot.marker.minLightness', 'plot.marker.maxLightness', 'lightness'],
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
