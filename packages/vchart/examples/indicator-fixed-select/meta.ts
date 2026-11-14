// vchart example: Indicator fixed, select trigger and offset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Indicator fixed, select trigger and offset',
  summary:
    'With trigger \'select\' the indicator shows the clicked slice; fixed true keeps the card on screen when nothing is selected, fixed false hides it. title and content read their text with `field`, and offsetY moves the card.',
  section: 'Concepts: Components',
  tags: ['indicator', 'fixed', 'trigger', 'offsetY', 'field', 'setSelected'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Indicator.md',
    'repo/docs/assets/option/en/component/indicator/indicator.md',
    'repo/docs/assets/option/en/component/indicator/indicator-item.md',
    'repo/docs/assets/api/en/API/vchart.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
