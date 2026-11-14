// Read raw bytes example metadata for the wretch package
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Read raw bytes',
  summary:
    '.arrayBuffer() hands you the answer as raw bytes, with no interpretation. A hex dump lays them out; the first few bytes of a file say what kind of file it is, and they are highlighted.',
  section: 'Response types',
  tags: ['arrayBuffer'],
  docs: ['repo/src/types.ts', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
