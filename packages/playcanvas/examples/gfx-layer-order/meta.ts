// PlayCanvas example: Custom layers and sub-layer order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Custom layers and sub-layer order",
  summary:
    "A custom Overlay layer joins the layer composition with push(); its marker sits partly behind scene content. Cards flip its position and depthTest; the full view also toggles the layer and whether the sun lights it.",
  section: "Graphics",
  tags: ["Layer", "LayerComposition", "push", "insert", "remove", "CameraComponent", "layers", "depthTest", "LightComponent"],
  docs: ["repo/docs/user-manual/graphics/layers/index.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
