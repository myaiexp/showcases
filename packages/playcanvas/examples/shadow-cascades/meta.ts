// playcanvas example: Shadow cascades, distance and resolution
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Shadow cascades, distance and resolution",
  summary:
    "A directional light shadowing a long avenue: numCascades splits the view frustum into separate shadow maps, cascadeDistribution and cascadeBlend shape the split, and shadowDistance and shadowResolution trade range against sharpness.",
  section: "Graphics: Lighting",
  tags: ["numCascades","cascadeDistribution","cascadeBlend","shadowDistance","shadowResolution"],
  docs: ["repo/docs/user-manual/graphics/lighting/shadows.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
