// Zod example: .enum exposes the values as an object
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Enum values as constants: .enum',
  summary:
    "Typing the same strings again and again invites typos. The .enum property of a z.enum() schema is a plain object with one entry per value, so Role.enum.editor gives the text editor and a misspelling is an error in the editor, not a surprise at runtime.",
  section: 'Numbers, dates and enums',
  tags: ['z.enum', 'enum'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
