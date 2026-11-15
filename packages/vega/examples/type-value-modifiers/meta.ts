// vega example: Type: Value Modifiers and Signals
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Type: Value Modifiers and Signals',
  summary:
    'Eleven bars whose tops come from one value reference: a scale lookup, then exponent, mult and offset, each driven by a slider through a signal reference, so the profile bends from root to power curve.',
  section: 'Types',
  tags: ['types.Value', 'value.exponent', 'value.mult', 'value.offset', 'types.Signal'],
  docs: ['repo/docs/docs/types.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
