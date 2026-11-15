// Vizzu example: style set with dot paths, 'plot.xAxis.label.fontSize', instead of nested objects
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Style dot paths',
  summary:
    "A style can be written as flat keys such as 'plot.xAxis.label.fontSize' instead of nested objects. The x-axis labels grow to 150% and the plot gets a lighter background; a null on a path resets just that property.",
  section: 'Shorthands & Store',
  tags: ['animate', 'shorthands', 'style', 'fontSize'],
  docs: [
    'repo/docs/tutorial/shorthands_store.md',
    'repo/docs/tutorial/shorthands_store/07_a.js',
    'repo/docs/tutorial/shorthands_store/07_b.js',
    'repo/docs/tutorial/shorthands_store/config.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/ts-api/plugins/shorthands.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
