// Vizzu example: chart.feature('shorthands', false) leaves only the long form of animate() working
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Switching shorthands off',
  summary:
    "feature('shorthands', false) turns the shorthand plugin off, so animate() accepts only the full form: a list of keyframes, each with a target, and series written as { name } objects rather than strings. A bare config object throws while it is off, so the example calls only the full form then and switches the feature back on.",
  section: 'Shorthands & Store',
  tags: ['feature', 'shorthands', 'animate'],
  docs: [
    'repo/docs/tutorial/shorthands_store.md',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/ts-api/vizzu.ts',
    'repo/src/apps/weblib/ts-api/plugins/shorthands.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
