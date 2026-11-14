// g6 example: Custom combo: state-aware key style
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom combo: state-aware key style',
  summary:
    'A CircleCombo subclass that switches to a dashed glowing outline in getKeyStyle when its state list has selected.',
  section: 'Combo',
  tags: ['register', 'CircleCombo', 'getKeyStyle', 'states'],
  docs: [
    'repo/packages/site/docs/manual/element/combo/custom-combo.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
