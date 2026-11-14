// g6 example: API event: pointerenter and pointerover on a combo
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "API event: pointerenter and pointerover on a combo",
  summary:
    "Combo and node pointerover, pointerenter, pointerout and pointerleave logged as the pointer moves onto the nodes of a combo.",
  section: 'API',
  tags: ['ComboEvent.POINTER_ENTER', 'ComboEvent.POINTER_OVER', 'NodeEvent.POINTER_ENTER', 'NodeEvent.POINTER_LEAVE'],
  docs: ['repo/packages/site/docs/api/event.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
