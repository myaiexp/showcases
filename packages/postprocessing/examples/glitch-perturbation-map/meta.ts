// postprocessing example: GlitchEffect perturbationMap with maps painted in code
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Glitch: perturbation map',
  summary:
    'The perturbationMap decides how pixels are pushed sideways during a glitch: the shader reads its red and green channels as a 2D offset. Three DataTextures painted in code (sine waves, hard blocks, a smooth ramp) replace the default random noise, so the same glitch shows three different characters.',
  section: 'Glitch',
  tags: ['GlitchEffect', 'perturbationMap', 'DataTexture', 'GlitchMode.CONSTANT_WILD'],
  docs: ['repo/README.md', 'repo/src/effects/GlitchEffect.js', 'repo/src/effects/glsl/glitch.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
