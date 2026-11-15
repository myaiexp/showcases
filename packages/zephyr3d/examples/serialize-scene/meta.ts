// zephyr3d example: Save a scene to the VFS and load it back
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Save a scene to the VFS and load it back',
  summary:
    'A twisting tower of boxes. saveScene writes the whole scene graph as JSON into a writable MemoryFS; loadScene builds a new Scene from the file, which is made the renderable for two seconds: its twist is frozen at the moment of saving.',
  section: 'Advanced Topics',
  tags: ['saveScene', 'loadScene', 'setRenderable', 'MemoryFS', 'readFile'],
  docs: ['repo/apps/doc/web/en/serialization.md', 'repo/apps/doc/web/en/vfs.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
