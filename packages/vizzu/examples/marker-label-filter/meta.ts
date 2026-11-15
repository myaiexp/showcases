// Vizzu example: style.plot.marker.label.filter derives label colour from marker colour
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Marker label colour filter',
  summary:
    "plot.marker.label.filter derives each label's colour from its marker's colour: lightness() lightens or darkens it, color() overrides it, grayscale() drains it. Labels here sit inside coloured stacks, so the change is easy to see.",
  section: 'Style',
  tags: ['style', 'plot.marker.label.filter', 'ColorTransform'],
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
