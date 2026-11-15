// Vizzu example: new Vizzu('<id>') finds its placeholder by id
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Initialize by element id',
  summary:
    "The Vizzu constructor takes the id of the placeholder element as a string, as the tutorial's markup does with myVizzu, and chart.initializing.then() starts the first animate() once the library has loaded. The chart then morphs between two states.",
  section: 'Initialization',
  tags: ['Vizzu', 'initializing', 'element id'],
  docs: [
    'repo/docs/tutorial/initialization.md',
    'repo/src/apps/weblib/ts-api/vizzu.ts',
    'repo/docs/assets/data/music_data.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
