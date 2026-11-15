// zephyr3d example: Shader variants with defineFeature
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Shader variants with defineFeature',
  summary:
    'MeshMaterial.defineFeature declares a variant and useFeature selects it just before apply: a Lambert material builds one program with a texture lookup and one without. Toggling diffuseTexture switches programs.',
  section: 'Custom Materials',
  tags: ['defineFeature', 'useFeature', 'featureUsed', 'apply', 'mixinLambert', 'lambertLight'],
  docs: ['repo/apps/doc/web/en/user-material-var.md', 'repo/apps/doc/web/en/user-material.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
