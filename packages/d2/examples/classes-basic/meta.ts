// d2 example: Classes: reusable attributes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Classes: reusable attributes',
  summary:
    'A `classes` map names a bundle of attributes (here a label, size and style) and `class: name` applies the bundle to any shape. Two load balancers and one unhealthy API server share two classes.',
  section: 'Classes',
  tags: ['classes', 'class', 'reuse'],
  docs: ['repo/docs/tour/classes.md', 'repo/static/d2/style-classes-1.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
