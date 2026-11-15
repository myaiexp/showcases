// Vizzu example: an array of targets is an array of keyframes, with no { target } wrapper
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Keyframes without the keyframe object',
  summary:
    'When no keyframe has its own animation options, each array item can be the target itself instead of { target: ... }. One animate() call here plays two such keyframes, the long form kept as a comment.',
  section: 'Shorthands & Store',
  tags: ['animate', 'shorthands', 'keyframes'],
  docs: [
    'repo/docs/tutorial/shorthands_store.md',
    'repo/docs/tutorial/shorthands_store/06_a.js',
    'repo/docs/tutorial/shorthands_store/06_b.js',
    'repo/docs/tutorial/shorthands_store/config.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/ts-api/plugins/shorthands.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
