// 3d-force-graph example: Data input: incremental updates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Data input: incremental updates',
  summary:
    'graphData() returns the current data, so a new node and link can be appended and the result set again. Existing nodes keep their positions and the layout reheats around the newcomer.',
  section: 'Data input',
  tags: ['graphData'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
