// d2 example: Shape keys with spaces and symbols
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Shape keys with spaces and symbols',
  summary:
    'Each line that is only a key declares a shape, and the key doubles as its label. Spaces, underscores, apostrophes and a single hyphen all stay inside the key; two hyphens in a row (`a--b`) would be a connection instead.',
  section: 'Shapes',
  tags: ['shape', 'key'],
  docs: ['repo/docs/tour/shapes.md', 'repo/static/d2/shapes-1.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
