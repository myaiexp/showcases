// Spark example: animated SplatEditSdf displace vectors rippling a garden
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Edit displacement',
  summary:
    'Fifty small sphere SDFs in one SplatEdit, each with a displace vector rewritten every frame from a travelling phase. In wind mode the treetops sway sideways more than the ground; in wave mode a ripple rolls the garden up and down. Sliders change amplitude and speed, and sdfSmooth and softEdge control how smoothly the vectors blend between spheres.',
  section: 'Splat Editing',
  tags: ['SplatEdit', 'SplatEditSdf', 'displace', 'sdfSmooth', 'softEdge', 'SPHERE'],
  docs: ['repo/docs/docs/splat-editing.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
