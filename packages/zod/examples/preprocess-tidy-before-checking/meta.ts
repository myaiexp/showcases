// Zod example: preprocess: tidy the text before the check
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'preprocess: tidy the text before the check',
  summary:
    "z.preprocess runs your function first and hands its result to the real schema. An email typed with stray spaces fails z.email() as it is; tidied up by a preprocess step it passes, and the output is the clean, lowercased address.",
  section: 'Transforms and pipes',
  tags: ['z.preprocess', 'z.email', 'trim'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
