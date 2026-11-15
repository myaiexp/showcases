// Vizzu example: a stacked area chart over years becoming lines and back
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "From area to line and back",
  summary:
    "Revenue by year, stacked by region, drawn as an area. Switching the geometry to line keeps the stacking, so the lines are running totals. Detaching Region from the y-axis gives one line per region, and putting it back stacks them into areas again.",
  section: "Geometry",
  tags: ['geometry','area','line','attach','detach'],
  docs: [
    'repo/docs/tutorial/geometry.md',
    'repo/docs/tutorial/geometry/01.js',
    'repo/docs/tutorial/geometry/02_b.js',
    'repo/docs/tutorial/assets/setup/setup_b.js',
    'repo/src/apps/weblib/typeschema-api/data.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
