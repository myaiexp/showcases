// zephyr3d example: A custom VFS that paints textures, mounted under a path
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A custom VFS that paints textures, mounted under a path',
  summary:
    'PaintFS extends VFS by implementing its abstract methods: it holds no files and paints a PNG for whatever name is read. It is mounted at /assets/@paint inside a MemoryFS, so fetchTexture paths under it go to the painter. The read log shows that fetchTexture caches by path.',
  section: 'Advanced Topics',
  tags: ['VFS', 'VFSError', 'mount', 'MemoryFS', 'fetchTexture', 'runtimeOptions.VFS'],
  docs: ['repo/apps/doc/web/en/vfs.md', 'repo/apps/doc/web/en/first-scene.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
