// g6 example: Combo style priority
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Combo style priority',
  summary:
    'One combo sets its stroke and padding in data, the global style reads the stroke with a callback, and setCombo can override it with a plain value.',
  section: 'Combo',
  tags: ['graph.setCombo', 'combo.style', 'priority', 'callback'],
  docs: [
    'repo/packages/site/docs/manual/element/combo/overview.en.md',
    'repo/packages/site/docs/api/element.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
