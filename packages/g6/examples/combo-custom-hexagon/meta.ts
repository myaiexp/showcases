// g6 example: Custom combo: a hexagon with its own button
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom combo: a hexagon with its own button',
  summary:
    'A combo registered under a showcase- name that extends BaseCombo, draws a hexagon path and its own collapse button.',
  section: 'Combo',
  tags: ['register', 'BaseCombo', 'getKeyPath', 'getKeyStyle', 'drawKeyShape', 'onCreate'],
  docs: [
    'repo/packages/site/docs/manual/element/combo/custom-combo.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
