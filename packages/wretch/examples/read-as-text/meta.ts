// Read as text example metadata for the wretch package
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Read as text',
  summary:
    '.text() gives back the answer exactly as the server wrote it: a plain string with its quotes, spaces and line breaks. Even an answer that is JSON stays a string when you ask for text.',
  section: 'Response types',
  tags: ['text'],
  docs: ['repo/src/types.ts', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
