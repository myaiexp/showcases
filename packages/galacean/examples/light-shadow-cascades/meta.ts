// galacean example: Cascaded shadows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Cascaded shadows",
  summary:
    "A long avenue of pillars lit with hard shadows: with NoCascades one map covers it all and the near shadows are coarse; two and four cascades split the map by distance so near shadows sharpen. Split sliders are in the full view.",
  section: "Light",
  tags: ['scene.shadowCascades', 'ShadowCascadesMode', 'shadowTwoCascadeSplits', 'shadowFourCascadeSplits', 'shadowDistance'],
  docs: [
    'repo/docs/en/graphics/light/shadow.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
