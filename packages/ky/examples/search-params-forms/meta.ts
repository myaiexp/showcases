// ky example: the four forms of searchParams
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Four ways to write a query',
  summary:
    'Your filters may already exist as text, an object, a list of pairs or a URLSearchParams, depending on where they came from. Ky accepts all four in searchParams and builds the same address from each, so you never convert first. Pick a colour and size and compare the four.',
  section: 'URLs',
  tags: ['searchParams', 'URLSearchParams', 'query string'],
  docs: ['repo/readme.md', 'repo/source/types/options.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
