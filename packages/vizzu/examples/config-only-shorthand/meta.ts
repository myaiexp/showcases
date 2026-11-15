// Vizzu example: animate({ y: {...} }) is animate({ config: { channels: { y: {...} } } }) without the wrappers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Config-only shorthand',
  summary:
    "When animate()'s first argument has no data or style, the config object can be passed directly, and channels can sit at its top level. The code keeps the long form as a comment next to each shorthand call; both mean the same.",
  section: 'Shorthands & Store',
  tags: ['animate', 'shorthands', 'align'],
  docs: [
    'repo/docs/tutorial/shorthands_store.md',
    'repo/docs/tutorial/shorthands_store/01.js',
    'repo/docs/tutorial/shorthands_store/config.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/ts-api/plugins/shorthands.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
