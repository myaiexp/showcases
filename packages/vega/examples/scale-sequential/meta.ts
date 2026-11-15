// vega example: Sequential Scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sequential Scale",
  summary:
    "A 14 by 8 grid of values coloured by a sequential scale, whose range is a scheme rather than two numbers. The domain maximum moves, so the same cells slide along the colour ramp.",
  section: "Scales",
  tags: ['scale.type','scale.range.scheme','scale.domainMax'],
  docs: ['repo/docs/docs/scales.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
