// observable-plot example: Group, facet, then stack
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Group, facet, then stack',
  summary:
    'Why Plot? builds one chart three ways: barX with groupY counts penguins per species; adding fy breaks the counts down by island; adding fill colours them by sex and the bar mark stacks them.',
  section: 'Introduction',
  tags: ['barX', 'groupY', 'count', 'fy', 'fill', 'implicit stack'],
  docs: ['repo/docs/why-plot.md', 'repo/docs/data/penguins.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
