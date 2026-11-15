// postprocessing example: BlendFunction SRC, DST and the deprecated SET and SKIP
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Blend functions: SRC, DST, SET, SKIP',
  summary:
    'At opacity 0.4, NORMAL mixes the layer into the scene, SRC shows only the layer and DST only the scene: both ignore opacity. SET and SKIP are the deprecated names of SRC and DST (the same numbers), and SKIP does not fully disable an effect.',
  section: 'Blending',
  tags: ['BlendFunction', 'SRC', 'DST', 'SET', 'SKIP', 'NORMAL', 'blendMode', 'TextureEffect'],
  docs: ['repo/README.md', 'repo/src/enums/BlendFunction.js', 'repo/src/effects/blending/BlendMode.js', 'repo/src/effects/TextureEffect.js', 'repo/src/effects/blending/glsl/src.frag', 'repo/src/effects/blending/glsl/normal.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
