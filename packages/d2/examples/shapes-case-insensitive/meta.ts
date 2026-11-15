// d2 example: Keys are case-insensitive
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Keys are case-insensitive',
  summary:
    'D2 compares keys without regard to case, so the two spellings below both refer to one shape. The first spelling to appear supplies the label.',
  section: 'Shapes',
  tags: ['key', 'case'],
  docs: ['repo/docs/tour/shapes.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
