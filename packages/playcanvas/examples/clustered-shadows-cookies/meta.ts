// playcanvas example: Clustered shadows and cookies
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Clustered shadows and cookies",
  summary:
    "Spot lights with shadows and cookie textures, plus an omni light, share one shadow atlas and one cookie atlas. The full view sets the scene-wide shadow type, the atlas resolution and the manual atlas split.",
  section: "Graphics: Lighting",
  tags: ["shadowsEnabled","cookiesEnabled","shadowAtlasResolution","cookieAtlasResolution","atlasSplit","shadowType","cookie"],
  docs: ["repo/docs/user-manual/graphics/lighting/clustered-lighting.md","repo/docs/user-manual/graphics/lighting/shadows.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
