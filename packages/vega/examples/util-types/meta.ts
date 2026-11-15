// vega example: Utilities: Type Checks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Utilities: Type Checks',
  summary:
    'A grid of nine sample values against the nine is* type checkers, so the overlaps (an array is also an object and iterable, a string is iterable) show at a glance.',
  section: 'Util',
  tags: ['util.isNumber', 'util.isDate', 'util.isIterable'],
  docs: ['repo/docs/docs/api/util.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
