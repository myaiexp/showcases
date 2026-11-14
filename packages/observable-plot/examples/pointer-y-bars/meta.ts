// observable-plot example: Pointer: pointerY on bars
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pointer: pointerY on bars',
  summary:
    'pointerY on horizontal bars picks the letter under the pointer, whatever its bar length, and shows a tip.',
  section: 'Interaction: Pointer',
  tags: ['barX', 'tip', 'pointerY'],
  docs: ['repo/docs/interactions/pointer.md', 'repo/docs/data/alphabet.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
