// g6 example: Layout option iterations: how far the simulation runs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layout option iterations: how far the simulation runs",
  summary: "iterations caps the ticks of an iterative layout. With animation off, a d3-force run of 5 ticks is still tangled and one of 300 is settled. A slider sets the count.",
  section: 'Layout',
  tags: ["layout.iterations", "d3-force", "layout()"],
  docs: [
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
    "repo/packages/site/docs/manual/layout/D3ForceLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
