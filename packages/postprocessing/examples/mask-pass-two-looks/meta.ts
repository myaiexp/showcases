// postprocessing example: a MaskPass and an inverted one split the screen
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'MaskPass: inside and outside',
  summary:
    'The same sphere is used as a stencil twice. A normal MaskPass pixelates what is inside it, then a ClearMaskPass ends that section; an inverted MaskPass sepia-tones everything outside it.',
  section: 'Passes',
  tags: ['MaskPass', 'ClearMaskPass', 'inverted', 'PixelationEffect', 'SepiaEffect', 'stencilBuffer'],
  docs: ['repo/README.md', 'repo/src/passes/MaskPass.js', 'repo/src/passes/ClearMaskPass.js', 'repo/src/core/EffectComposer.js', 'repo/src/effects/PixelationEffect.js', 'repo/src/effects/SepiaEffect.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
