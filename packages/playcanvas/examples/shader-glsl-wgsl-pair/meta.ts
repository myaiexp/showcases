// playcanvas example: ShaderMaterial with GLSL and WGSL
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ShaderMaterial with a GLSL and WGSL pair',
  summary:
    'A shader description can hold vertexGLSL/fragmentGLSL and vertexWGSL/fragmentWGSL for the same effect: WebGL 2 compiles the GLSL, WebGPU compiles the WGSL natively instead of transpiling. The WGSL uses the engine\'s simplified attribute, varying and uniform declarations. The full view says which language this browser ran.',
  section: 'Graphics: Shaders',
  tags: ['vertexWGSL', 'fragmentWGSL', 'ShaderMaterial', 'VertexInput', 'VertexOutput', 'FragmentOutput', 'DEVICETYPE_WEBGPU'],
  docs: [
    'repo/docs/user-manual/graphics/shaders/index.md',
    'repo/docs/user-manual/graphics/shaders/wgsl-vertex-fragment-shaders.md',
    'repo/docs/user-manual/graphics/shaders/wgsl-reflection.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
