// penrose example: repelPt: two points pushed apart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "repelPt: two points pushed apart",
  summary:
    'Both dots are pulled to the middle of the canvas. `encourage repelPt(weight, a.icon.center, b.icon.center)` adds a push that grows as they come close, and the weight sets where the two forces balance.',
  section: "Objective Functions",
  tags: ['repelPt', 'encourage', 'objective', 'weight', 'nearPt'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Objectives.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
