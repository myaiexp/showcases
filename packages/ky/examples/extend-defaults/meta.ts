// ky example: ky.extend sets defaults for every call
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A client with built-in defaults',
  summary:
    'Most calls in an app share the same address start, headers and query. ky.extend() makes a new client with those set once, so each call only names what is different. The server\'s side shows that every call through the client carries the prefix, the headers and the language.',
  section: 'Instances',
  tags: ['ky.extend', 'prefix', 'headers', 'searchParams'],
  docs: ['repo/readme.md', 'repo/source/types/options.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
