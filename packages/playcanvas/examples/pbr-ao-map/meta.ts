// PlayCanvas example: Ambient occlusion map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Ambient occlusion map",
  summary:
    "A generated occlusion map darkens mortar-like crevices of a sphere and box lit by the environment alone. The full view sets aoIntensity and occludeSpecularIntensity and toggles the map.",
  section: "Graphics: Physically Based Rendering",
  tags: ["StandardMaterial", "aoMap", "aoIntensity", "occludeSpecularIntensity"],
  docs: ["repo/docs/user-manual/graphics/physical-rendering/physical-materials.md", "repo/docs/user-manual/graphics/physical-rendering/environment-lighting.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
