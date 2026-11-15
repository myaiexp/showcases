// penrose example: Text stroke, fill and rotation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Text stroke, fill and rotation',
  summary:
    'Text has the fill and stroke of any shape. One tab draws solid bold letters, one outlines them with `fillColor : none()` and `strokeColor`, and one turns the filled word by `rotation : -20` degrees about its centre.',
  section: 'Shape: Text',
  tags: ['Text', 'fillColor', 'strokeColor', 'strokeWidth', 'rotation'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/shapes/text.md',
    'repo/packages/core/src/shapes/Text.ts',
    'repo/packages/core/src/lib/Functions.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
