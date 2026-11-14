// A caught error skips the response type example metadata for the wretch package
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A caught error skips the response type',
  summary:
    'If a catcher takes an error, the .json() callback is not called afterwards. Two counters tally how often each ran: good pages add to the callback, missing pages add to the catcher, and never both for one request.',
  section: 'Catchers',
  tags: ['notFound', 'json'],
  docs: ['repo/README.md', 'repo/src/resolver.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
