// Vizzu example: attach and detach take a series name, not an array, when there is only one
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Single series without an array',
  summary:
    'set, attach and detach accept a bare series name when only one series is involved. The code keeps the array form in a comment above each call; the chart moves the same way, Kinds going from the y-axis to the x-axis and back.',
  section: 'Shorthands & Store',
  tags: ['animate', 'shorthands', 'attach', 'detach'],
  docs: [
    'repo/docs/tutorial/shorthands_store.md',
    'repo/docs/tutorial/shorthands_store/03_a.js',
    'repo/docs/tutorial/shorthands_store/03_b.js',
    'repo/docs/tutorial/shorthands_store/config.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/ts-api/plugins/shorthands.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
