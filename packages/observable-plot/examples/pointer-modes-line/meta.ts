// observable-plot example: Pointer: pointing modes on a line
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pointer: pointing modes on a line',
  summary:
    'pointer (xy), pointerX and pointerY pick the nearest point differently; switch the tip mode on an Apple stock line to feel the difference.',
  section: 'Interaction: Pointer',
  tags: ['lineY', 'tip', 'pointer', 'pointerX', 'pointerY'],
  docs: ['repo/docs/interactions/pointer.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
