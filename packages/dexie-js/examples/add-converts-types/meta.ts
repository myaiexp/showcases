// dexie-js example: add() converts what it finds
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'add() converts what it finds',
  summary:
    'add(1) always leaves a number behind, whatever was stored before. Text that reads as a number is converted, text that does not counts as zero, and an empty or missing value becomes the amount added. Adding a bigint turns the value into a bigint.',
  section: 'Prop modifications',
  tags: ['add()', 'bigint', 'type conversion'],
  docs: ['repo/docs/PropModification/add().md', 'repo/docs/Table/Table.update().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
