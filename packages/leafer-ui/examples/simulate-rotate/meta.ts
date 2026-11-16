// leafer-ui example: Simulate: interaction.rotate turns an element
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Simulate: interaction.rotate turns an element",
  summary: "interaction.rotate({ x, y, rotation }) sends a rotation gesture and RotateEvent listeners receive e.rotation. The rect adds each turn to its own rotation, so the script spins it.",
  section: "Interaction",
  tags: ["interaction","rotate","RotateEvent","viewport"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/event/simulation.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
