// Send an object, get an object: wretch example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Send an object, get an object',
  summary:
    'Hand .post() a plain object and it goes out as JSON with the right content-type; .json() turns the answer back into an object. Watch what the server received, and the new post join the list under the number the server gave it.',
  section: 'Quick start',
  tags: ['post', 'json', 'serialization'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
