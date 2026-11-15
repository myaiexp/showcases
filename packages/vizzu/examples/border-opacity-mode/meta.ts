// Vizzu example: borderOpacityMode blends a half-opaque border straight or premultiplied
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Border opacity mode',
  summary:
    "borderOpacityMode decides how a half-opaque border blends with the fill beneath it. In 'straight' the border is drawn over the fill, so a lighter ring shows where the two overlap; in 'premultiplied' the border reads as one flat band with no ring.",
  section: 'Style',
  tags: ['style', 'plot.marker.borderOpacityMode', 'plot.marker.borderOpacity'],
  docs: [
    'repo/docs/tutorial/style.md',
    'repo/src/apps/weblib/typeschema-api/styles.yaml',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
