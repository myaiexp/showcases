// vega example: Usage: Custom Loader
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Usage: A Custom Data Loader',
  summary:
    'A loader object passed in the View constructor options answers a spec\'s CSV urls from memory and logs each request in a console under the chart; pick another file and a new view loads it the same way.',
  section: 'Usage',
  tags: ['view.loader', 'data.url', 'data.format'],
  docs: ['repo/docs/docs/api/view.md', 'repo/docs/usage/index.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
