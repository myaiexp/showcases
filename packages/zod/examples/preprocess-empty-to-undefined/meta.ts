// Zod example: preprocess: empty form fields mean missing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'preprocess: empty form fields mean missing',
  summary:
    "A web form sends empty fields as empty text, not as missing. Left alone, an empty nickname fails its length rule and an empty age quietly becomes 0. A preprocess that turns empty text into undefined lets optional really mean optional.",
  section: 'Transforms and pipes',
  tags: ['z.preprocess', 'optional', 'z.coerce.number', 'z.object'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
