// ky example: the trailing slash in baseUrl
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The slash at the end of baseUrl',
  summary:
    'A baseUrl of /api and one of /api/ look almost the same but behave differently. Without the final slash, Ky treats "api" like a file name and replaces it, so users lands at /users and misses. With the slash, "api/" is a folder and users goes inside it. Ky\'s docs recommend always ending a baseUrl path with a slash.',
  section: 'URLs',
  tags: ['baseUrl', 'trailing slash', 'URL resolution'],
  docs: ['repo/readme.md', 'repo/source/types/options.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
