// penrose example: Boxing Text with its width and height
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Boxing Text with its width and height',
  summary:
    'Every Text knows its own measured `width` and `height`, so a Rectangle can say `width : t.text.width + 28` and `center : t.text.center` and wrap its label. The three boxes are kept apart with `disjoint`, which moves the text along with them.',
  section: 'Shape: Text',
  tags: ['Text', 'width', 'height', 'center', 'Rectangle', 'disjoint'],
  docs: ['repo/packages/docs-site/docs/ref/style/shapes/text.md', 'repo/packages/core/src/shapes/Text.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
