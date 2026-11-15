// postprocessing example: Blend functions: ALPHA against NORMAL
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Blend functions: ALPHA against NORMAL',
  summary:
    'A layer whose alpha fades out from the centre. ALPHA mixes by the layer alpha, so the scene shows through the edges; NORMAL mixes only by opacity and ignores the alpha, so the layer keeps its full rectangle.',
  section: 'Blending',
  tags: ['BlendFunction', 'blendMode', 'TextureEffect', 'opacity', 'ALPHA', 'NORMAL'],
  docs: ['repo/README.md', 'repo/src/enums/BlendFunction.js', 'repo/src/effects/blending/BlendMode.js', 'repo/src/effects/TextureEffect.js', 'repo/src/effects/blending/glsl/alpha.frag', 'repo/src/effects/blending/glsl/normal.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
