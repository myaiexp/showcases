// the docs' WaveEffect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "The docs' WaveEffect",
  summary:
    'An effect written as a class: update() eases an internal value toward params.amount every frame, and render() draws the picture through a wave shader with ctx.draw. The slider writes the public params object; no re-init is needed.',
  section: 'Custom Effects',
  tags: ['Effect', 'update', 'render', 'ctx.draw', 'params', 'uvContent', 'srcRectUv', 'ctx.deltaTime'],
  docs: ['pages/amagi-dev/vfx-js/custom-effects.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
