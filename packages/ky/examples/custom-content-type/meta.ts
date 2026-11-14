// ky example: custom-content-type
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Use your own content-type',
  summary:
    'Ky labels a json body as application/json, but some services insist on their own label, such as application/x-amz-json-1.1, and refuse everything else. A content-type you put in the headers option always wins over the one Ky would pick, so the same data gets through.',
  section: 'Tips',
  tags: ['content-type', 'headers', 'json', 'application/x-amz-json-1.1'],
  docs: ['repo/readme.md', 'repo/source/types/options.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
