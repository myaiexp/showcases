// globe-gl example: Render: lights
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Render: lights",
  summary:
    "lights() returns the scene's lights (an ambient and a directional light from above by default) and lights([...]) replaces them with any Three.js lights. A dim ambient light and a low sun that circles the globe give it a day side and a night side; the full view also tries coloured point lamps and a hemisphere light.",
  section: "Render Control",
  tags: ["lights", "getGlobeRadius", "DirectionalLight", "PointLight", "HemisphereLight"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
