// vega example: Pack: Explicit Radius
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Pack: Explicit Radius",
  summary:
    "The same tree packed twice: by area from the field with a sort, and with a radius field that sets leaf radii directly.",
  section: "Transforms: Hierarchy",
  tags: ["transform.pack.radius", "transform.pack.sort"],
  docs: ["repo/docs/docs/transforms/pack.md", "repo/docs/docs/transforms/stratify.md", "repo/docs/docs/transforms/pack.vg.json", "repo/docs/docs/signals.md", "repo/docs/docs/marks.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
