// Vizzu example: a channel can be just its series, y: ['Kinds', 'Popularity'], instead of { set: [...] }
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Channel as a series name',
  summary:
    "A channel that only uses set, with no range or other option, can be written as its series: an array, or a bare name for a single series. A channel with an option such as range still needs the object. Each shorthand has its long form in a comment.",
  section: 'Shorthands & Store',
  tags: ['animate', 'shorthands', 'set', 'range'],
  docs: [
    'repo/docs/tutorial/shorthands_store.md',
    'repo/docs/tutorial/shorthands_store/04_a.js',
    'repo/docs/tutorial/shorthands_store/04_b.js',
    'repo/docs/tutorial/shorthands_store/config.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/ts-api/plugins/shorthands.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
