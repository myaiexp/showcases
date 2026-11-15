// vega example: Square Root Scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Square Root Scale",
  summary:
    "The same six values drawn as circles twice: radius from a linear scale (top) and from a sqrt scale (bottom), where the area grows in step with the value. The domain maximum rescales both.",
  section: "Scales",
  tags: ['scale.type','scale.domain','mark.symbol'],
  docs: ['repo/docs/docs/scales.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
