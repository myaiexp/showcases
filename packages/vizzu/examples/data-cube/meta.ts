// Vizzu example: a data set as a data cube: dimensions, and measures as nested arrays
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Data cube',
  summary:
    "In cube form each dimension lists its categories once, and each measure is a grid of values indexed by those categories (here Kinds by Genres). It only fits data where every combination exists, which is why this cube has Smooth Rock instead of the tutorial table's Experimental Rock.",
  section: 'Data',
  tags: ['data', 'dimensions', 'measures', 'data cube'],
  docs: [
    'repo/docs/tutorial/data.md',
    'repo/src/apps/weblib/ts-api/plugins/unpivot.ts',
    'repo/src/apps/weblib/ts-api/plugins/pivotdata.ts',
    'repo/docs/assets/data/music_data.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
