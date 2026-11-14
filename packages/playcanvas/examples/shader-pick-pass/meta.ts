// playcanvas example: Picker pass in a custom shader
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Picker pass in a custom shader',
  summary:
    'A ShaderMaterial is invisible to the Picker unless its fragment shader handles PICK_PASS: it includes pickPS and writes getPickOutput() there. With that branch, six custom-shaded shapes are found under a probe (the pointer in the full view, a sweeping path in a card) and the picked one turns gold through a mesh instance parameter.',
  section: 'Graphics: Shaders',
  tags: ['PICK_PASS', 'pickPS', 'getPickOutput', 'Picker', 'MeshInstance.setParameter', 'ShaderMaterial'],
  docs: ['repo/docs/user-manual/graphics/shaders/index.md', 'repo/docs/user-manual/graphics/shaders/preprocessor.md', 'repo/docs/user-manual/graphics/shaders/shader-parameters.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
