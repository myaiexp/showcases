// penrose example: notTooClose: keeping two shapes apart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "notTooClose: keeping two shapes apart",
  summary:
    'Both circles are pulled to the middle of the canvas. `encourage notTooClose(a.icon, b.icon)` repels their centres, so they settle apart. In 3.3.1 the `weight` argument only matters when the first shape is a Line; for other shapes a fixed weight is used.',
  section: "Objective Functions",
  tags: ['notTooClose', 'encourage', 'objective', 'weight', 'nearPt'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Objectives.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
