// Vizzu example: chart.feature('logging', true) makes the library write to the browser console
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Logging feature',
  summary:
    "feature('logging', true) is the switch for the library's own console logging, which is off by default. The full view turns it on and has buttons for both states; the card leaves it off. In the 0.18.0 build the gallery loads, nothing appeared in the console with it on, and the panel says so.",
  section: 'Code reference',
  tags: ['feature', 'logging'],
  docs: [
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/ts-api/vizzu.ts',
    'repo/src/apps/weblib/ts-api/plugins/logging.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
