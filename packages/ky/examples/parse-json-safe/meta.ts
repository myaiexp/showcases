// ky example: a parseJson that drops __proto__ keys
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Safe parsing against sneaky keys',
  summary:
    'An answer can carry a hidden __proto__ key. If your page merges it into its own settings, the hidden part can leak into every object, such as turning everyone into an admin. A parseJson function that drops that key while reading keeps the settings clean; the readme names this use for a safe parser.',
  section: 'JSON',
  tags: ['parseJson', 'prototype pollution', '__proto__', 'reviver'],
  docs: ['repo/readme.md', 'repo/source/types/options.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
