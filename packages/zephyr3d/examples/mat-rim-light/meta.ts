// zephyr3d example: An unlit rim-light material
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'An unlit rim-light material',
  summary:
    'A MeshMaterial subclass whose shaders are written with the shader builder: vertexShader outputs the world position and normal, fragmentShader turns 1 - N.V into an edge glow, and applyUniformValues uploads the colour.',
  section: 'Custom Materials',
  tags: ['MeshMaterial', 'vertexShader', 'fragmentShader', 'applyUniformValues', 'supportLighting', 'ShaderHelper', 'uniformChanged', 'outputFragmentColor'],
  docs: ['repo/apps/doc/web/en/user-material.md', 'repo/apps/doc/web/en/user-material-unlit.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
