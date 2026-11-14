// Spark example: decoding a ReadableStream with stream and streamLength
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Loading from a ReadableStream',
  summary:
    'A ReadableStream hands a .spz file to Spark a few kilobytes at a time with a pause before each chunk, like a slow connection. new SplatMesh({ stream, streamLength, onProgress }) decodes as the bytes arrive and the label shows the progress until the butterfly appears. The slider sets the delay between chunks.',
  section: 'Loading Splats',
  tags: ['SplatMesh', 'stream', 'streamLength', 'onProgress', 'ReadableStream'],
  docs: ['repo/docs/docs/packed-splats.md', 'repo/docs/docs/splat-mesh.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
