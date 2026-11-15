// galacean example: Model: match the modelling software's lighting
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Model: match the modelling software's lighting",
  summary:
    "One robot under the default scene, a DirectLight, an image-based ambient light and both, the setups the restoration guide compares.",
  section: "Model",
  tags: ['AmbientLight','DirectLight','EnvLoader','scene.ambientLight'],
  docs: [
    'repo/docs/en/graphics/model/restoration.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
