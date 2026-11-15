// vega example: clamp
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "clamp",
  summary:
    "Values from -20 to 120 pushed through a [0, 100] domain onto a 200 pixel range, shaded behind the dots. Unclamped dots spill out of the shaded range; clamped ones pile up at its edges.",
  section: "Scales",
  tags: ['scale.clamp','scale.domain','scale.range'],
  docs: ['repo/docs/docs/scales.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
