// Vizzu example: style.logo.width and filter resize and recolour the logo
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Logo width and filter',
  summary:
    'The Vizzu logo sits in the bottom right corner. logo.width resizes it and logo.filter recolours it with a colour transform such as color(), lightness() or grayscale().',
  section: 'Style',
  tags: ['style', 'logo.width', 'logo.filter', 'ColorTransform'],
  docs: [
    'repo/docs/tutorial/style.md',
    'repo/src/apps/weblib/typeschema-api/styles.yaml',
    'repo/docs/tutorial/chart_layout.md',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
