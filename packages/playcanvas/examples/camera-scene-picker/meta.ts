// playcanvas example: Scene picker with depth
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Scene picker with depth",
  summary:
    "A Picker renders mesh instance IDs and depth into a pick buffer; getSelectionAsync names the shape under a probe and getWorldPointAsync returns the exact point on its surface. The probe follows the pointer, or sweeps on its own in a card.",
  section: "Graphics: Cameras",
  tags: ["Picker","prepare","getSelectionAsync","getWorldPointAsync","resize","destroy"],
  docs: ["repo/docs/user-manual/graphics/cameras/scene-picker.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
