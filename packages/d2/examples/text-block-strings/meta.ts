// d2 example: Block strings and delimiters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Block strings and delimiters',
  summary:
    'The closing `|` ends a block string, so TypeScript that uses `|` or `||` needs a longer delimiter. D2 accepts any run of special symbols after the first pipe, such as a backtick on both ends.',
  section: 'Text & Code',
  tags: ['block string', 'code'],
  docs: ['repo/docs/tour/text.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
