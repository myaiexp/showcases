// vega example: Extensibility: Transform
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Extensibility: Custom Data Transform',
  summary:
    'A running-maximum transform added through vega.transforms with its own Definition and used in a spec like a built-in: streaming readings arrive, the oldest leave, and the orange peak line follows.',
  section: 'Extensibility',
  tags: ['extensibility.transforms', 'transform.type', 'view.change'],
  docs: ['repo/docs/docs/api/extensibility.md', 'repo/docs/docs/api/view.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
