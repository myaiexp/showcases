// playcanvas example: Shadow pass in a custom shader
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Shadow pass in a custom shader',
  summary:
    'Under SHADOW_PASS a ShaderMaterial includes shadowCasterPS and writes getShadowOutput(), and its vertex shader (the same one, so a swaying bend follows into the shadow map) skips the lighting that needs matrix_normal. Three bending columns cast live shadows from a directional light onto a standard floor; the full view sways them harder or stops them casting.',
  section: 'Graphics: Shaders',
  tags: ['SHADOW_PASS', 'shadowCasterPS', 'getShadowOutput', 'transformCoreVS', 'normalCoreVS', 'castShadows', 'CylinderGeometry'],
  docs: ['repo/docs/user-manual/graphics/shaders/index.md', 'repo/docs/user-manual/graphics/shaders/preprocessor.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
