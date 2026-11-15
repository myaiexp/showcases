// galacean example: ShaderLab replacement tags
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ShaderLab replacement tags",
  summary: "SubShader Tags carry a replacementTag; camera.setReplacementShader(shader, 'replacementTag') draws every object with the replacement SubShader whose tag matches its own: rocks turn red and ice turns green. The card toggles the replacement.",
  section: "ShaderLab",
  tags: ['SubShader Tags','replacementTag','Camera.setReplacementShader'],
  docs: [
    'repo/docs/en/graphics/material/shader.mdx',
    'repo/docs/en/graphics/material/variables.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
