// Get the Response itself example metadata for the wretch package
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Get the Response itself',
  summary:
    'Sometimes the body does not matter and the envelope does. .res() gives you the browser\'s own Response, so you can read its status, address, type and headers, before anyone has opened the body.',
  section: 'Response types',
  tags: ['res'],
  docs: ['repo/src/types.ts', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
