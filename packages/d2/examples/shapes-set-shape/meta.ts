// d2 example: Setting the shape field
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Setting the shape field',
  summary:
    'The default shape type is `rectangle`. Giving the key a `shape` field, as in `Cloud.shape: cloud`, swaps the outline while the label stays the same.',
  section: 'Shapes',
  tags: ['shape', 'label'],
  docs: ['repo/docs/tour/shapes.md', 'repo/static/d2/shapes-2.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
