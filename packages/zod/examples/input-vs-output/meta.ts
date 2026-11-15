// Zod example: a transform makes the output a different type from the input
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Input type vs output type',
  summary:
    'A schema can take one kind of value and hand back another. z.string().transform(val => val.length) takes text and returns a number, so its input type (z.input) is string and its output type (z.output, the same as z.infer) is number.',
  section: 'Basic usage',
  tags: ['z.infer', 'z.input', 'z.output', 'transform'],
  docs: ['repo/packages/docs/content/basics.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
