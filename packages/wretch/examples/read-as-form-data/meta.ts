// Read a form back example metadata for the wretch package
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Read a form back',
  summary:
    'Servers can answer with a multipart form, the same format a file upload uses. .formData() reads it into named fields, including files, which are listed here as a table.',
  section: 'Response types',
  tags: ['formData'],
  docs: ['repo/src/types.ts', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
