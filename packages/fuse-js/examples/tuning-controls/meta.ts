// Fuse.js example: threshold, location and distance turned together on one list of notes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Three dials of fuzziness',
  summary:
    'One query against a list of notes, with the three dials that decide what counts as a match: threshold (how sloppy a match may be), location (where in the text it is expected) and distance (how far from there it may wander). Matching notes light up; the rest fade.',
  section: 'Fuzzy Search',
  tags: ['threshold', 'location', 'distance', 'ignoreLocation', 'includeScore'],
  docs: ['repo/docs/fuzzy-search.md', 'repo/docs/articles/how-fuzzy-search-works.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
