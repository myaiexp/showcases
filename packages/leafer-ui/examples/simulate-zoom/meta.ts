// leafer-ui example: Simulate: interaction.zoom on a viewport
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Simulate: interaction.zoom on a viewport",
  summary: "On a Leafer of type viewport, interaction.zoom({ x, y, scale }) zooms about the point (x, y) as a pinch would; ZoomEvent listeners hear it. The script zooms in and out; the readout shows the layer's scale.",
  section: "Interaction",
  tags: ["interaction","zoom","ZoomEvent","viewport"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/event/simulation.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
