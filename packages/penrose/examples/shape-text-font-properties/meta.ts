// penrose example: Text font properties
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Text font properties',
  summary:
    'Each tab sets three rows of Text with different font attributes: `fontFamily` (serif, monospace, sans-serif), `fontWeight` and `fontStyle`. They are plain strings handed to SVG, so any CSS value works.',
  section: 'Shape: Text',
  tags: ['Text', 'fontFamily', 'fontWeight', 'fontStyle', 'fontSize'],
  docs: ['repo/packages/docs-site/docs/ref/style/shapes/text.md', 'repo/packages/core/src/shapes/Text.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
