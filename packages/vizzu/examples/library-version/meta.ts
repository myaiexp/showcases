// Vizzu example: chart.version() returns the version string of the library that is running
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Library version',
  summary:
    'chart.version() returns the version string of the Vizzu library that is loaded (here "0.18.0" followed by a build id and date), available once initializing has resolved. It is written into the chart title here, which is how a page can show or check the version it runs.',
  section: 'Code reference',
  tags: ['version', 'initializing'],
  docs: [
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/ts-api/vizzu.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
