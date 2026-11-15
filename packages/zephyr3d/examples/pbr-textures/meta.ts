// zephyr3d example: PBR planet: albedo and normal maps from the VFS
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PBR planet: albedo and normal maps from the VFS',
  summary:
    'A PBRMetallicRoughnessMaterial with metallic, roughness, an albedo map and a normal map loaded with fetchTexture. The normal map passes linearColorSpace: true because it holds data, not colour. Both maps are generated PNGs in a MemoryFS.',
  section: 'Getting Started',
  tags: ['PBRMetallicRoughnessMaterial', 'fetchTexture', 'linearColorSpace', 'albedoTexture', 'normalTexture', 'MemoryFS'],
  docs: ['repo/apps/doc/web/en/first-scene.md', 'repo/apps/doc/src/tut-6/main.js', 'repo/apps/doc/web/en/mesh-material.md', 'repo/apps/doc/web/en/vfs.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
