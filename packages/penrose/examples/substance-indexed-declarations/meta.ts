// penrose example: Indexed declarations: v_i for i in […]
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Indexed declarations: v_i for i in […]',
  summary:
    '`Node n_i for i in [0, 4]` is one line that expands into `Node n_0, n_1, n_2, n_3, n_4`. The tabs change the range to [0, 2], [0, 4] and [0, 6], and the diagram grows by one circle per index.',
  section: 'Substance',
  tags: ['indexed', 'for', 'range', 'AutoLabel'],
  docs: ['repo/packages/docs-site/docs/ref/substance/indexed-statements.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
