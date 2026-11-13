// Spark example: decoding in-memory .spz bytes with the fileBytes option
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Loading from fileBytes',
  summary:
    'A procedural butterfly is encoded to real .spz bytes with writeSpz, then handed to a new SplatMesh as fileBytes, so Spark decodes a compressed file without any request. The label shows the file size and the decoded splat count; the slider re-encodes with a different number of splats.',
  section: 'Loading Splats',
  tags: ['SplatMesh', 'fileBytes', 'writeSpz', 'SPZ'],
  docs: ['repo/docs/docs/loading-splats.md', 'repo/docs/docs/packed-splats.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
