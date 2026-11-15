// Vizzu example: two Vizzu instances side by side, sharing one loaded module
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Two charts, one module',
  summary:
    'Vizzu.initialize() loads the WebAssembly module once; every chart created afterwards uses it. Two charts sit side by side, each with its own data and config, and one step animates both at the same time.',
  section: 'Initialization',
  tags: ['Vizzu.initialize', 'Vizzu', 'initializing'],
  docs: [
    'repo/src/apps/weblib/ts-api/vizzu.ts',
    'repo/docs/tutorial/initialization.md',
    'repo/docs/assets/data/music_data.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
