// aframe example: Modifying the material of a loaded glTF model
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Modifying the material of a loaded glTF model',
  summary:
    'A modify-materials component waits for model-loaded, then traverses getObject3D(\'mesh\') and recolours the nodes whose name matches. The windmill\'s sails change colour, and the full view has a colour picker.',
  section: 'Introduction',
  tags: ['gltf-model', 'model-loaded', 'getObject3D', 'traverse', 'material.color'],
  docs: ['repo/docs/introduction/models.md', 'repo/docs/components/gltf-model.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
