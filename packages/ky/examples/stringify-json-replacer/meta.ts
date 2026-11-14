// ky example: stringifyJson rewrites values before sending
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Send dates the way the server wants',
  summary:
    'By default the json option sends every value as plain JSON text, so a date goes out as a long ISO string. If your server expects seconds, or just a day, give Ky a stringifyJson function with a replacer and every *_at field is converted on the way out. Pick the format and compare what the server received.',
  section: 'JSON',
  tags: ['stringifyJson', 'json', 'replacer', 'JSON.stringify'],
  docs: ['repo/readme.md', 'repo/source/types/options.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
