// the separable blur from EFFECT.md
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A separable blur in two draws',
  summary:
    'EFFECT.md\'s multi-pass example: a 9-tap blur runs along x into an intermediate render target made in init(), then along y into the effect\'s output. The slider scales the tap spacing, a small addition to the guide\'s fixed one texel.',
  section: 'Custom Effects',
  tags: ['createRenderTarget', 'ctx.draw', 'multi-pass', 'ctx.dims.elementPixel', 'uvSrc', 'params'],
  docs: ['repo/docs/EFFECT.md', 'pages/amagi-dev/vfx-js/custom-effects.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
