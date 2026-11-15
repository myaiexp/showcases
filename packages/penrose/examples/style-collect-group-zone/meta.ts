// penrose example: Collected shapes as a group
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Collected shapes constrained as one group',
  summary:
    '`listof icon from es` collects the shapes themselves into a list, and a `Group` can hold it, so one `ensure contains` puts every member of every Special set inside the green zone. Members of Plain sets are kept out of the zone by an ordinary selector, and `with Set s` lets the collector test `s` without collecting it.',
  section: 'Style: Collectors',
  tags: ['collect', 'with', 'listof', 'Group', 'contains', 'namespace'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/collectors.md',
    'repo/packages/docs-site/docs/ref/style/value-types.md',
    'repo/packages/core/src/lib/Functions.ts',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
