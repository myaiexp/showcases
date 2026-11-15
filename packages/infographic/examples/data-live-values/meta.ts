// AntV Infographic example: Data: change the data and render again
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Data: change the data and render again',
  summary:
    'Data is just an object, so a new infographic is one render() call away. Every second the values of a small chart are changed at random and the options are rendered again, and the side panel shows the data that was passed.',
  section: 'Data',
  tags: ['data', 'values', 'render', 'chart-column-simple'],
  docs: [
    'repo/site/src/content/learn/data.en.md',
    'repo/site/src/content/reference/infographic-api.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
