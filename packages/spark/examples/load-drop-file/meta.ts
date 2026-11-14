// Spark example: loading a user-supplied splat file by bytes or stream
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dropping in a local splat file',
  summary:
    'Drop or pick a .ply, .spz, .splat, .ksplat or .sog file and it is decoded in the browser, either from its bytes (fileBytes) or from file.stream() with streamLength, with the file name as the type hint. getBoundingBox then scales and centres the splats to fit the camera. Until a file arrives a procedural butterfly stands in, and the card only shows that stand-in.',
  section: 'Loading Splats',
  tags: ['fileBytes', 'stream', 'streamLength', 'fileName', 'getBoundingBox', 'SplatMesh'],
  docs: ['repo/docs/docs/loading-splats.md', 'repo/docs/docs/splat-mesh.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
