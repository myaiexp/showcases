// leafer-ui example: Simulate: a drag from pointerDown and pointerMove
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Simulate: a drag from pointerDown and pointerMove",
  summary: "pointerDown followed by pointerMove triggers a drag, here with the simulated pointer moving a draggable rect while a DragEvent listener logs it. The button replays it from the start.",
  section: "Interaction",
  tags: ["interaction","pointerMove","DragEvent","draggable"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/event/simulation.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
