// embedding-atlas example: dashboard numColumns, numRows and grids key
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dashboard grid size",
  summary:
    "numColumns and numRows size the dashboard grid (24 by 18 by default); the placements live under the key \"<columns>x<rows>\". The same three charts are laid out on a 12 by 6 grid, a 6 by 4 grid, and a taller 12 by 12 grid.",
  section: "State & Layouts",
  tags: ['layouts', 'type: dashboard', 'numColumns', 'numRows', 'grids'],
  docs: [
    'repo/packages/viewer/src/layouts/dashboard/types.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
