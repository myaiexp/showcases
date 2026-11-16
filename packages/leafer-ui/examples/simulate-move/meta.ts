// leafer-ui example: Simulate: interaction.move pans a viewport
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Simulate: interaction.move pans a viewport",
  summary: "interaction.move({ x, y, moveX, moveY }) pans like a two-finger drag on a viewport Leafer, and MoveEvent listeners hear the offset. The script pans left and back.",
  section: "Interaction",
  tags: ["interaction","move","MoveEvent","viewport"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/event/simulation.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
