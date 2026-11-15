// Zod example: Pipe: text, then number, then range check
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pipe: text, then number, then range check',
  summary:
    "A pipe feeds the output of one schema into the next. A quantity typed in a form goes text to number to a whole-number range check, and the rows show what each stage handed on or why the chain stopped there.",
  section: 'Transforms and pipes',
  tags: ['pipe', 'z.coerce.number', 'z.string', 'z.int'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
