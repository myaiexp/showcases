// playcanvas example: Clustered lighting with many lights
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Clustered lighting with many lights",
  summary:
    "Up to hundreds of omni and spot lights drift over a field of shapes, all evaluated from a 3D grid. The full view sets the light count, the grid cells and the maximum lights per cell; maxLights is raised above 255.",
  section: "Graphics: Lighting",
  tags: ["scene.lighting","LightingParams","cells","maxLightsPerCell","maxLights"],
  docs: ["repo/docs/user-manual/graphics/lighting/clustered-lighting.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
