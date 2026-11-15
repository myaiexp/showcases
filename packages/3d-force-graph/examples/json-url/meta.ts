// 3d-force-graph example: Data input: jsonUrl
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Data input: jsonUrl',
  summary:
    'jsonUrl loads graph data from a URL instead of graphData: it fetches the JSON, shows Loading... in the corner while it waits, then hands the result to graphData. The JSON here is built in code and served from a blob: URL, so nothing leaves the page.',
  section: 'Data input',
  tags: ['jsonUrl', 'graphData'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
