// Vizzu example: channels named at the top level of the config, with no channels object around them
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Channels without the channels object',
  summary:
    'Vizzu recognises channel names, so x, y, color and the rest can sit beside title and other config properties. The first step swaps the axes this way; the long form with channels: {...} is kept in a comment.',
  section: 'Shorthands & Store',
  tags: ['animate', 'shorthands', 'channels'],
  docs: [
    'repo/docs/tutorial/shorthands_store.md',
    'repo/docs/tutorial/shorthands_store/05_a.js',
    'repo/docs/tutorial/shorthands_store/05_b.js',
    'repo/docs/tutorial/shorthands_store/config.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/ts-api/plugins/shorthands.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
