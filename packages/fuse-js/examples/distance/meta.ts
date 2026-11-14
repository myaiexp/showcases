// Fuse.js example: distance decides how fast a far-away match is penalised
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'How far is too far',
  summary:
    'Five lines with "coffee" further and further from the start. A small distance drops every line whose word is far from where you expect it; a large distance forgives them, with a worse score the further away they are.',
  section: 'Fuzzy Search',
  tags: ['distance', 'threshold', 'location', 'includeScore', 'ignoreFieldNorm'],
  docs: ['repo/docs/fuzzy-search.md', 'repo/src/types.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
