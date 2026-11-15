// Vizzu example: chart.store() saves a state and control.store() an animation, both replayed with animate()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Store a state and an animation',
  summary:
    "chart.store() keeps the current config, style and data filter as a snapshot, and the control object's store() keeps a whole animation. Passing either back to animate() returns to that state or plays that animation again.",
  section: 'Shorthands & Store',
  tags: ['store', 'animate', 'activated', 'Snapshot', 'CAnimation'],
  docs: [
    'repo/docs/tutorial/shorthands_store.md',
    'repo/docs/tutorial/shorthands_store/02.js',
    'repo/docs/tutorial/shorthands_store/03_b.js',
    'repo/docs/tutorial/shorthands_store/08.js',
    'repo/docs/tutorial/shorthands_store/09.js',
    'repo/docs/tutorial/shorthands_store/config.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/ts-api/vizzu.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
