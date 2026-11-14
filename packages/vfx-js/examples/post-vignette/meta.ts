// VFX-JS example: the post effect guide's animated vignette
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Animated vignette post effect',
  summary:
    'The animated vignette from the post effect guide darkens the canvas with distance from the centre, scaled by vignetteStrength, and lifts and lowers the whole vignette with a sine of time. The centre is a uniform pointing at this stage, because the canvas covers the window.',
  section: 'Post effects',
  tags: ['postEffect', 'vignette', 'time', 'uniforms'],
  docs: ['repo/docs/POSTEFFECT_EXAMPLE.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
