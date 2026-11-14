// observable-plot example: Tick: barcode of age shares
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tick: barcode of age shares',
  summary:
    'One tickX per state and age bracket, normalised so each state sums to 100%, forms a barcode of the age distribution.',
  section: 'Mark: Tick',
  tags: ['tickX', 'normalizeX', 'band scale', 'ruleX'],
  docs: ['repo/docs/marks/tick.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
