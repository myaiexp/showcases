// galacean example: Replacement shader
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Replacement shader",
  summary:
    "setReplacementShader draws every object in the camera with one global shader, here one that paints the surface normals; resetReplacementShader brings the original materials back.",
  section: "Camera",
  tags: ['Camera', 'setReplacementShader', 'resetReplacementShader', 'Shader'],
  docs: [
    'repo/docs/en/graphics/camera/component.mdx',
    'repo/docs/en/graphics/material/variables.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
