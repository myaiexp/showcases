// vega example: Signal: Update Expression and Dependencies
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Signal: Update Expression and Dependencies',
  summary:
    'One slider-driven signal and two derived ones whose update expressions read it. Three bars grow together, because Vega re-evaluates dependents in specification order.',
  section: 'Signals',
  tags: ['signal.update', 'signal.value', 'signal.bind', 'signal.description'],
  docs: ['repo/docs/docs/signals.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
