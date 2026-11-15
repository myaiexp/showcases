// Zod example: A codec goes both ways
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A codec goes both ways',
  summary:
    "Unlike a transform, a codec ties two schemas together with a decode and an encode function. Here ISO date text decodes to a Date and a Date encodes back to the text; each direction checks its own side and refuses the wrong kind of value.",
  section: 'Transforms and pipes',
  tags: ['z.codec', 'z.iso.datetime', 'z.safeEncode', 'decode', 'encode'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
