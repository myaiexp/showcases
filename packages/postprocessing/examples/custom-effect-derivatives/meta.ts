// postprocessing example: a custom effect using the DERIVATIVES extension
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom effect: extensions and fwidth',
  summary:
    'An effect lists the WebGL extensions its shader needs in the `extensions` Set; this one asks for WebGLExtension.DERIVATIVES and uses `fwidth()` on the luminance to glow along edges. The manual calls these WebGL 1 extensions: under WebGL 2, which three 0.187 uses, derivatives are always on and the Set is harmless.',
  section: 'Custom effects',
  tags: ['Effect', 'extensions', 'WebGLExtension', 'DERIVATIVES', 'fwidth'],
  docs: ['repo/README.md', 'repo/manual/content/custom-effects.en.md', 'repo/src/effects/Effect.js', 'repo/src/passes/EffectPass.js', 'repo/src/materials/glsl/effect.frag', 'repo/src/enums/WebGLExtension.js', 'repo/src/materials/EffectMaterial.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
