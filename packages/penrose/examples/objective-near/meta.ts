// penrose example: near: shapes moved onto each other
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "near: shapes moved onto each other",
  summary:
    'The rectangle is fixed. `encourage near(b.icon, a.icon)` is documented as placing the shapes with an offset between them, but 3.3.1 minimises |distance^2| minus offset^2, so the circle ends up centred on the rectangle for any offset.',
  section: "Objective Functions",
  tags: ['near', 'encourage', 'objective', 'offset'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Objectives.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
