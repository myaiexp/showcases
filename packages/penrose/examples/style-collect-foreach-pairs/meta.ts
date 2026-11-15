// penrose example: Several foreach declarations
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'foreach with two declarations',
  summary:
    'When `foreach` lists two objects the collector runs once for every distinct pair, here a course and the room it is held in. Each run gathers the students taking that course and draws a bar as long as `numberof students`, captioned by joining two labels with `+`.',
  section: 'Style: Collectors',
  tags: ['collect', 'foreach', 'numberof', 'string', 'Rectangle'],
  docs: ['repo/packages/docs-site/docs/ref/style/collectors.md', 'repo/packages/docs-site/docs/ref/style/expressions.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
