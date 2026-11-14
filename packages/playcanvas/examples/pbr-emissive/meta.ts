// PlayCanvas example: Emissive map and intensity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Emissive map and intensity",
  summary:
    "Glowing circuit lines from a generated emissive map on a dark sphere and box in a dim scene, plus a plain emissive cone. The full view changes emissiveIntensity and the emissive tint and toggles the map.",
  section: "Graphics: Physically Based Rendering",
  tags: ["StandardMaterial", "emissive", "emissiveMap", "emissiveIntensity"],
  docs: ["repo/docs/user-manual/graphics/physical-rendering/physical-materials.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
