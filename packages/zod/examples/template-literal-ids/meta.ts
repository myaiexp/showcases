// Zod example: Text built from parts: user ids
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Text built from parts: user ids',
  summary:
    'A template literal can describe an id like "user-123": the word user-, then a number. It checks the shape only: limits put on the inner number, such as positive, are not enforced on the text.',
  section: 'Strings and formats',
  tags: ['z.templateLiteral', 'z.literal', 'z.number'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
