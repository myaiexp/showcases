// Fuse.js example: numbers and BigInt values searched like text
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Numbers are searchable too',
  summary:
    'Order numbers and 64-bit tracking ids are not strings, yet Fuse.js indexes them as text, so typing part of one finds the order. Plain numbers have always worked; BigInt support arrived in 7.3.0.',
  section: 'Keys and results',
  tags: ['keys', 'number', 'BigInt', 'includeMatches', 'threshold'],
  docs: ['repo/CHANGELOG.md', 'repo/src/helpers/get.ts', 'repo/src/types.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
