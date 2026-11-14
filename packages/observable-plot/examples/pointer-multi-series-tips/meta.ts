// observable-plot example: Pointer: tips across several series
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pointer: tips across several series',
  summary:
    'pointerX on a multi-series line chart chooses the nearest date; vertical distance breaks ties so you can focus different lines.',
  section: 'Interaction: Pointer',
  tags: ['lineY', 'tip', 'pointerX'],
  docs: ['repo/docs/interactions/pointer.md', 'repo/docs/data/bls-industry-unemployment.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
