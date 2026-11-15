// zephyr3d example: A prefab built in code, instantiated many times
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A prefab built in code, instantiated many times',
  summary:
    'A lamp post made of three meshes under one SceneNode is serialized with serializeObject, wrapped in the { type: "SceneNode", data } envelope and written to a MemoryFS as a .zprefab. instantiatePrefab then places copies of it around a ring. The full view shows the JSON.',
  section: 'Advanced Topics',
  tags: ['serializeObject', 'instantiatePrefab', 'zprefab', 'VFS.writeFile', 'MemoryFS'],
  docs: ['repo/apps/doc/web/en/serialization.md', 'repo/apps/doc/web/en/vfs.md', 'repo/apps/doc/web/en/posteffect-bloom.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
