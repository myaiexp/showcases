// Zod example: A function that checks its own inputs and output
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A function that checks its own inputs and output',
  summary:
    'A division function is wrapped by z.function(): the arguments must be two numbers and the answer must be a whole number. Calls with text, a missing argument or an answer with decimals throw a ZodError that says which one.',
  section: 'Defaults, catch and more',
  tags: ['z.function', 'implement'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
