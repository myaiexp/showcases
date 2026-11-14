// playcanvas example: Runtime lightmap baking
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Runtime lightmap baking",
  summary:
    "Lights flagged bake are rendered into lightmaps for lightmapped render components by app.lightmapper.bake, then cost nothing at runtime, while a dynamic ball is still lit live. The key light can be baked only, baked plus dynamic, dynamic plus lightmapped, or dynamic only; every change rebakes.",
  section: "Graphics: Lighting",
  tags: ["app.lightmapper","bake","affectDynamic","affectLightmapped","bakeNumSamples","bakeArea","lightmapped","lightmapSizeMultiplier","BAKE_COLORDIR","lightmapFilterEnabled"],
  docs: ["repo/docs/user-manual/graphics/lighting/runtime-lightmaps.md","repo/docs/user-manual/graphics/lighting/index.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
