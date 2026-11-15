// d2 example: Classes as SVG tags
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Classes as SVG tags',
  summary:
    'Every class applied to a shape is written into its SVG element as a `class` attribute, so page CSS or script can select it. The caption lists the class attributes found in the rendered SVG.',
  section: 'Classes',
  tags: ['classes', 'svg', 'tags'],
  docs: ['repo/docs/tour/classes.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
