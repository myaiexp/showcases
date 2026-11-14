// PlayCanvas example: Opacity dithering
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Opacity dithering",
  summary:
    "Six spheres fade in and out through opacityDither with each of the six patterns, staying in the opaque pass so nothing needs sorting, and casting dithered shadows. The full view sets opacity and the shadow pattern.",
  section: "Graphics",
  tags: ["StandardMaterial", "opacityDither", "opacityShadowDither", "DITHER_BAYER8", "DITHER_BLUENOISE", "DITHER_IGNNOISE", "opacity"],
  docs: ["repo/docs/user-manual/graphics/transparency.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
