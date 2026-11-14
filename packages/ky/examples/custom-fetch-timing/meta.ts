// ky example: a custom fetch measures every request
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Time every request',
  summary:
    'To find out which calls are slow, you would have to add timing code to each of them. Give Ky a custom fetch function instead: it wraps every request, measures how long the answer took and passes the answer on untouched. Here the wrapper draws a bar per call, including the 404 that Ky then turns into an error.',
  section: 'Fetch and context',
  tags: ['fetch', 'instrumentation', 'ky.create', 'timing'],
  docs: ['repo/readme.md', 'repo/source/types/options.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
