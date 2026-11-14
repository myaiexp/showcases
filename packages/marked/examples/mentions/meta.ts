// marked example: Mention chips
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Mention chips",
  summary:
    "Typing @ana in a team note turns the name into a chip with a coloured avatar, while unknown names stay plain text. A custom inline extension adds the syntax.",
  section: 'Custom extensions',
  tags: ['extensions','inline','tokenizer','renderer'],
  docs: ['repo/docs/USING_PRO.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
