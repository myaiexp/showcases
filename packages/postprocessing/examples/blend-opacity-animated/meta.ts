// postprocessing example: blendMode.opacity animated per frame
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Blend opacity, animated',
  summary:
    'An OVERLAY layer fades in and out because the example writes blendMode.opacity.value every frame. Opacity is a uniform, so unlike changing the blend function it costs no shader recompile.',
  section: 'Blending',
  tags: ['blendMode', 'opacity', 'Uniform', 'BlendFunction', 'OVERLAY', 'TextureEffect'],
  docs: ['repo/README.md', 'repo/src/effects/blending/BlendMode.js', 'repo/src/enums/BlendFunction.js', 'repo/src/effects/TextureEffect.js', 'repo/src/effects/blending/glsl/overlay.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
