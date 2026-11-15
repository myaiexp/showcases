// penrose example: hsva hue, saturation and value
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'hsva hue, saturation and value',
  summary:
    'The colour `hsva(h, s, v, a)` uses hue 0 to 360, saturation and value 0 to 100 and alpha 0 to 1. Six swatches sweep one component at a time while the others stay fixed: the hue around the wheel, then saturation, then value, then alpha over a dark stripe.',
  section: 'Style: Expressions',
  tags: ['color', 'hsva', 'hue', 'saturation'],
  docs: ['repo/packages/docs-site/docs/ref/style/expressions.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
