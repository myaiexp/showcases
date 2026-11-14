// Catch any status with .error() example metadata for the wretch package
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Catch any status with .error()',
  summary:
    'Wretch has named helpers for the common failures, but any status number can get a handler. A café machine answers 418 (I am a teapot) or 429 (too many orders), and each goes to the handler written for that number.',
  section: 'Catchers',
  tags: ['error', 'json'],
  docs: ['repo/README.md', 'repo/src/types.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
