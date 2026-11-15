// postprocessing example: swapping a pass's fullscreenMaterial
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pass.fullscreenMaterial: swap the shader',
  summary:
    'One ShaderPass, three ShaderMaterials (invert, duotone, threshold). Assigning pass.fullscreenMaterial replaces the material on the pass\'s fullscreen triangle, so the effect changes without touching the composer.',
  section: 'Passes',
  tags: ['ShaderPass', 'fullscreenMaterial', 'Pass', 'ShaderMaterial'],
  docs: ['repo/src/passes/ShaderPass.js', 'repo/src/passes/Pass.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
