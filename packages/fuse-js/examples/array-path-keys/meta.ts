// Fuse.js example: array-notation keys for field names that contain a dot
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Field names with a dot in them',
  summary:
    'Some records have field names like "file.name". A dotted key would be split in two and find nothing; writing the key as an array keeps the name whole. Fuse.js then reports the match as a dotted string.',
  section: 'Keys and results',
  tags: ['keys', 'array path', 'matches key', 'includeMatches'],
  docs: ['repo/src/types.ts', 'repo/src/helpers/get.ts', 'repo/CHANGELOG.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
