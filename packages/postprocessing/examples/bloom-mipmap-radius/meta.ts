// postprocessing example: bloom mipmap blur radius
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bloom radius',
  summary:
    'The default bloom blurs through a chain of mipmaps. Its radius, set through the option or on mipmapBlurPass, controls how much of the coarse levels is mixed in: small keeps a tight halo, close to 1 spreads it wide.',
  section: 'Bloom',
  tags: ['BloomEffect', 'radius', 'mipmapBlur', 'mipmapBlurPass'],
  docs: ['repo/README.md', 'repo/src/effects/BloomEffect.js', 'repo/src/passes/MipmapBlurPass.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
