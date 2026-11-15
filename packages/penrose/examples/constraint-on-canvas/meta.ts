// penrose example: onCanvas: keeping a shape inside the canvas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "onCanvas: keeping a shape inside the canvas",
  summary:
    'Penrose already adds an on-canvas rule to every shape; here it is switched off with `ensureOnCanvas: false`, and the circle is pulled past the right edge of the canvas (the grey frame). `ensure onCanvas(a.icon, canvas.width, canvas.height)` writes the rule by hand and holds the whole circle inside.',
  section: "Constraint Functions",
  tags: ['onCanvas', 'ensure', 'constraint', 'ensureOnCanvas', 'canvas'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Constraints.ts',
    'repo/packages/core/src/lib/Functions.ts',
    'repo/packages/core/src/lib/Objectives.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
