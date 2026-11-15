// postprocessing example: ShaderPass with a custom ShaderMaterial
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ShaderPass with a ShaderMaterial',
  summary:
    'A ShaderPass renders any ShaderMaterial as a fullscreen effect. This one wobbles the picture and splits the colour channels; the pass puts the previous pass\'s buffer into the uniform named inputBuffer, and the example animates its own time and amount uniforms.',
  section: 'Passes',
  tags: ['ShaderPass', 'ShaderMaterial', 'inputBuffer', 'fullscreenMaterial', 'uniforms'],
  docs: ['repo/src/passes/ShaderPass.js', 'repo/src/passes/Pass.js', 'repo/src/materials/glsl/common.vert'],
  provenance: 'pure',
  added: '2026-11-15',
});
