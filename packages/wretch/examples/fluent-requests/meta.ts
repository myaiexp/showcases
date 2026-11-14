// Fluent requests example metadata for the wretch package
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fluent requests',
  summary:
    'One base client remembers the server address; each request only names the page it wants and asks for .json(). Watch the request go out, the answer come back, and the post appear.',
  section: 'Quick start',
  tags: ['wretch()', 'get', 'json', 'base client'],
  docs: ['repo/README.md', 'repo/src/types.ts'],
  provenance: 'pure',
  added: '2026-06-14',
});
