// Handle responses by status example metadata for the wretch package
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Handle responses by status',
  summary:
    'Pick a status code and a simulated server returns it. Wretch routes each code to its matching helper and only the relevant one fires. No real network involved.',
  section: 'Basics',
  tags: ['notFound', 'unauthorized', 'polyfills'],
  docs: [],
  provenance: 'legacy',
  added: '2026-06-14',
});
