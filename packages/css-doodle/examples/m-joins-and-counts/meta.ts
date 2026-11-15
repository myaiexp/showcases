// css-doodle example: How @m, @M and @rep join
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'How @m, @M and @rep join',
  summary:
    '@m joins the copies with commas, @M with spaces and @rep with nothing. With several arguments every one is emitted per step, a fractional count rounds up and a count of 0 repeats nothing.',
  section: 'Sequence',
  tags: ['@m', '@M', '@rep', '@multiple', '@repeat'],
  docs: [
    'pages/css-doodle-com/reference/function-m.md',
    'repo/docs/grammar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
