// zephyr3d example: Refraction: march, offset, scale, blur, reflection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Refraction: march, offset, scale, blur, reflection",
  summary:
    "refractionMode picks how submerged objects are located: march (about 24 depth reads per pixel, correct) or offset (cheap, smears, uses cheapRefractionDepth). refractionScale, reflectionStrength and refractionBlur tune the look.",
  section: "Environment",
  tags: ['refractionMode', 'cheapRefractionDepth', 'refractionScale', 'reflectionStrength', 'refractionBlur'],
  docs: ['repo/apps/doc/web/en/water.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
