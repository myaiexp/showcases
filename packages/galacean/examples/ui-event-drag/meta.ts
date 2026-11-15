// galacean example: UI event drag
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UI event drag",
  summary:
    "onPointerDrag bubbles from a small handle to the panel that owns the script, so dragging the handle moves the whole panel. Drag it yourself in the full view; the card drags with a scripted pointer.",
  section: "UI",
  tags: ['onPointerDrag', 'Pointer.deltaPosition', 'UITransform.position'],
  docs: [
    'repo/docs/en/UI/quickStart/event.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
