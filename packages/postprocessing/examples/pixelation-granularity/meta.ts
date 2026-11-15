// postprocessing example: PixelationEffect granularity from fine to chunky
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pixelation: granularity',
  summary:
    'PixelationEffect snaps the picture to blocks, granularity pixels on a side. Odd values round up to the next even number and 0 turns the effect off.',
  section: 'Pixelation',
  tags: ['PixelationEffect', 'granularity'],
  docs: ['repo/README.md', 'repo/src/effects/PixelationEffect.js', 'repo/src/effects/glsl/pixelation.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
