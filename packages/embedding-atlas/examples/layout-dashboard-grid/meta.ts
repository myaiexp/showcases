// embedding-atlas example: dashboard grids placements for overlapping charts
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dashboard placements and order",
  summary:
    "A dashboard layout places each chart on a 24 by 18 grid with x, y, width and height cells. The first variant is a tidy three-chart arrangement; the second overlaps two charts and the grid order list decides which one is on top.",
  section: "State & Layouts",
  tags: ['layouts', 'type: dashboard', 'grids', 'placements', 'order', 'Placement'],
  docs: [
    'repo/packages/viewer/src/layouts/dashboard/types.ts',
    'repo/packages/viewer/src/layouts/layout_types.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
