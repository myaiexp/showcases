// Spark example: loading by url with onProgress and onLoad callbacks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Loading from a url with progress',
  summary:
    'new SplatMesh({ url, onProgress, onLoad }) downloads and decodes a file while the progress callback drives a bar and onLoad reports the splat count. The full view fetches the docs\' butterfly.spz (flipped from OpenCV to OpenGL axes); the card loads a blob: URL of a procedural .spz instead, so it never touches the network.',
  section: 'Loading Splats',
  tags: ['SplatMesh', 'url', 'onProgress', 'onLoad', 'initialized'],
  docs: ['repo/docs/docs/loading-splats.md', 'repo/docs/docs/splat-mesh.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
