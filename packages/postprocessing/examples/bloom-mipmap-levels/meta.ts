// postprocessing example: bloom mip levels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bloom mip levels',
  summary:
    'The mipmap blur halves the image once per level and mixes the levels back up. With few levels the glow stays tight; each extra level reaches twice as far. The default is 8; the slider sets BloomEffect\'s levels, which rebuilds the chain.',
  section: 'Bloom',
  tags: ['BloomEffect', 'levels', 'mipmapBlurPass', 'MipmapBlurPass'],
  docs: ['repo/README.md', 'repo/src/effects/BloomEffect.js', 'repo/src/passes/MipmapBlurPass.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
