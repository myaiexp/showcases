// observable-plot example: Accessibility: hiding decorative marks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Accessibility: hiding decorative marks',
  summary:
    'ariaHidden on a rule or a connecting line removes it from the accessibility tree; the readout marks the groups screen readers skip.',
  section: 'Accessibility',
  tags: ['ariaHidden', 'ruleY', 'lineY'],
  docs: ['repo/docs/features/accessibility.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
