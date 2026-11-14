// Read as a Blob (an image) example metadata for the wretch package
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Read as a Blob (an image)',
  summary:
    'A picture is not text, so .blob() reads the answer as a file-like object. The page turns that Blob into an address the <img> tag can show, and you see its type and size.',
  section: 'Response types',
  tags: ['blob'],
  docs: ['repo/src/types.ts', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
