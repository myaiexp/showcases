// Fuse.js example: the top-level getFn option reads values from an unusual shape
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Teaching Fuse where to look',
  summary:
    'When your data is not plain text fields, a single getFn tells Fuse.js how to read them. Here every dish has its name in three languages, and the language you pick decides which names are searched.',
  section: 'Keys and results',
  tags: ['getFn', 'keys', 'includeMatches', 'FuseGetFunction'],
  docs: ['repo/src/types.ts', 'repo/src/helpers/get.ts', 'repo/src/core/config.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
