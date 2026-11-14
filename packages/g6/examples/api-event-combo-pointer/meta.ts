// g6 example: API event: combo events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "API event: combo events",
  summary:
    "ComboEvent pointerover, pointerout, click and dragstart, drag and dragend are logged for a combo; its nodes raise node events instead.",
  section: 'API',
  tags: ['ComboEvent.POINTER_OVER', 'ComboEvent.CLICK', 'ComboEvent.DRAG_START', 'ComboEvent.DRAG', 'ComboEvent.DRAG_END'],
  docs: ['repo/packages/site/docs/api/event.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
