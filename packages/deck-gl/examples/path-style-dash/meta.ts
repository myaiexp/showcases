// deck-gl example: PathStyleExtension dash
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PathStyleExtension dash',
  summary:
    'PathStyleExtension with dash: true draws paths dashed by getDashArray [dash, gap]. Sliders set the lengths and a select changes dashUnits between widths, pixels and meters.',
  section: 'Extensions',
  tags: ['PathStyleExtension', 'getDashArray', 'dashUnits', 'PathLayer'],
  docs: [
    'repo/docs/api-reference/extensions/path-style-extension.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
