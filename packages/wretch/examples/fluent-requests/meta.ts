// Fluent requests example metadata for the wretch package
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fluent requests',
  summary:
    'Configure with one chain, resolve with another. A base client holds the host and .get(path).json() finishes the job. Click to fetch a random to-do from a public test API.',
  section: 'Basics',
  tags: ['get', 'json', 'base client'],
  docs: [],
  provenance: 'legacy',
  added: '2026-06-14',
});
