// d2 example: Databases as shapes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Databases as shapes',
  summary:
    'Five shapes in one source: a relabelled key (`pg: PostgreSQL`), a cloud made by setting `shape`, and two plain keys. D2 lays them out with no connections between them.',
  section: 'Shapes',
  tags: ['shape', 'label'],
  docs: ['repo/docs/tour/shapes.md', 'repo/static/d2/shapes-2.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
