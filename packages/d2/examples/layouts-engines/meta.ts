// d2 example: Layout engines: dagre and ELK
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Layout engines: dagre and ELK',
  summary:
    'The `layout` compile option picks the engine: dagre (the default, curved routes) or ELK (orthogonal routes, fewer crossings). The same graph is laid out by each. TALA is not part of the WASM build.',
  section: 'Layouts',
  tags: ['layout', 'dagre', 'elk'],
  docs: ['repo/docs/tour/layouts.md', 'repo/docs/tour/dagre.md', 'repo/docs/tour/elk.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
