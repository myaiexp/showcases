// galacean example: Model: lights inside a glTF
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Model: lights inside a glTF",
  summary:
    "KHR_lights_punctual: a point light declared in the glTF is parsed into a PointLight on its node and listed in GLTFResource.lights, lighting the scene as it orbits.",
  section: "Model",
  tags: ['KHR_lights_punctual','PointLight','GLTFResource.lights'],
  docs: [
    'repo/docs/en/graphics/model/glTF.mdx',
    'repo/docs/en/graphics/model/restoration.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
