// babylon-js example: ImageFilter custom shader, real time
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ImageFilter custom shader, real time",
  summary:
    "A custom fragment shader wrapped in an EffectWrapper filters a generated picture every frame with ImageFilter.render(): a second sampler and two uniforms are bound each frame, with a swirl and colour offset that animate.",
  section: "2D Controls",
  tags: ['ImageFilter', 'EffectWrapper', 'render', 'samplerNames', 'uniformNames', 'ThinEngine'],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/content/features/featuresDeepDive/controls/imageFilter.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
