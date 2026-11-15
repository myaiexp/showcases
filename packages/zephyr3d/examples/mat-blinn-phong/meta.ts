// zephyr3d example: A custom material on mixinBlinnPhong
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A custom material on mixinBlinnPhong',
  summary:
    'applyMaterialMixins(MeshMaterial, mixinBlinnPhong) hands the material light handling and blinnPhongLight(); the shaders only supply the diffuse colour from a texture and a colour uniform. shininess comes from the mixin.',
  section: 'Custom Materials',
  tags: ['applyMaterialMixins', 'mixinBlinnPhong', 'blinnPhongLight', 'calculateNormal', 'shininess', 'uniformChanged'],
  docs: ['repo/apps/doc/web/en/user-material-lit.md', 'repo/apps/doc/web/en/user-material.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
