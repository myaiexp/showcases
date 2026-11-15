// penrose example: Typed assignments
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Type annotations on assignments',
  summary:
    'An assignment may start with a type: `scalar`, `vec2`, `color`, `string` or `int`. A circle takes its radius from a scalar, its place from a vec2 whose first component is unknown, its fill from a color and its caption from a string built with `+`.',
  section: 'Style: Selector Blocks',
  tags: ['type annotation', 'scalar', 'vec2', 'color', 'string', 'int'],
  docs: ['repo/packages/docs-site/docs/ref/style/selector-blocks.md', 'repo/packages/docs-site/docs/ref/style/expressions.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
