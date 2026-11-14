// vchart example: Pie indicator updated on hover
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pie indicator updated on hover',
  summary:
    'An indicator card in the hole of a donut chart: title and content text callbacks receive the hovered slice\'s datum (undefined when none), and trigger decides how the card updates: hover, select or none. The card uses select and setSelected.',
  section: 'Concepts: Components',
  tags: ['indicator', 'trigger', 'title', 'content', 'limitRatio', 'setSelected'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Indicator.md',
    'repo/docs/assets/option/en/component/indicator/indicator.md',
    'repo/docs/assets/option/en/component/indicator/indicator-item.md',
    'repo/docs/assets/api/en/API/vchart.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
