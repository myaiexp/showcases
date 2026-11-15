// postprocessing example: PixelationEffect granularity animated every frame
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pixelation: animated granularity',
  summary:
    'Writing PixelationEffect.granularity each frame makes the picture resolve out of fat blocks and collapse back into them. The setter floors the value and rounds odd numbers up, so the blocks grow in even steps.',
  section: 'Pixelation',
  tags: ['PixelationEffect', 'granularity', 'EffectComposer'],
  docs: ['repo/README.md', 'repo/src/effects/PixelationEffect.js', 'repo/src/effects/glsl/pixelation.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
