// cobe example: markerElevation: lift off the surface
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "markerElevation: lift off the surface",
  summary:
    "The dots rise off the globe as markerElevation grows from 0 to 0.2, and the arcs begin and end at the lifted height. Seen near the rim, the markers float clear of the surface. Arcs are re-sent in every update to pick up the new elevation.",
  section: 'Options',
  tags: ['markerElevation', 'update()', 'arcs'],
  docs: ['pages/cobe-vercel-app.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
