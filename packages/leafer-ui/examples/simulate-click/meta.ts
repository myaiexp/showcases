// leafer-ui example: Simulate: left, middle and right clicks on the interaction
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Simulate: left, middle and right clicks on the interaction",
  summary: "interaction.pointerDown and pointerUp drive the engine like a mouse: a down then an up makes a tap, which only the left button produces. The script presses the middle, right and then the left button; the left tap restores the colour.",
  section: "Interaction",
  tags: ["interaction","pointerDown","pointerUp","PointerButton","tap"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/event/simulation.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
