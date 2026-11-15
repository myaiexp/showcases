// penrose example: sameCenter: concentric shapes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "sameCenter: concentric shapes",
  summary:
    'The rectangle is fixed. `encourage sameCenter(a.icon, b.icon)` moves the blue circle until the two centres coincide; the circle keeps its size, so the pair ends up concentric.',
  section: "Objective Functions",
  tags: ['sameCenter', 'encourage', 'objective', 'Circle', 'Rectangle'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Objectives.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
