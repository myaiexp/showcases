// ky example: error.data holds the body of an error answer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The reason inside an error answer',
  summary:
    'When a server refuses a request it usually explains why in the body of its answer, such as which form field is wrong. Ky reads that body for you before it throws and puts it on error.data: parsed when it is JSON, plain text otherwise, undefined when there is nothing readable.',
  section: 'HTTP errors',
  tags: ['HTTPError', 'error.data', 'isHTTPError', 'error body'],
  docs: ['repo/readme.md', 'repo/source/errors/HTTPError.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
