// Zod example: toJSONSchema with io input versus output
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'io: input or output',
  summary:
    'The same schema, converted twice. By default JSON Schema describes what parse() returns (a defaulted field is always there, a text-to-number pipe ends as a number). With io: "input" it describes what arrives instead. Changed lines are highlighted.',
  section: 'JSON Schema',
  tags: ['z.toJSONSchema', 'io', '.default()', '.transform()', '.pipe()'],
  docs: ['repo/packages/docs/content/json-schema.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
