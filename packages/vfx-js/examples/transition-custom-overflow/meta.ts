// Drawing outside the box
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Drawing outside the box",
  summary:
    "A transition draws only inside its element unless overflow gives it room: a class can set it, and a run's value wins. Here a ring expands from the middle past the box edges, so it needs overflow. The shader also wraps its reads with fract(); with the inRange guard off, that wrapped content shows outside the box.",
  section: "Custom transitions",
  tags: ['ShaderTransition', 'overflow', 'inRange', 'show()'],
  docs: ['pages/amagi-dev/vfx-js-transitions/custom.md', 'repo/docs/TRANSITION.md', 'repo/packages/vfx-js/src/transition/shader.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
