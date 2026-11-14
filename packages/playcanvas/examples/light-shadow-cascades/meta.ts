// playcanvas example: Directional light shadow cascades
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Directional light shadow cascades",
  summary: "A walker crosses a road of posts under a directional light with a small shadow map. numCascades, cascadeDistribution and shadowDistance decide where the shadow detail goes; one cascade smears it across the whole distance.",
  section: "Components",
  tags: ["numCascades","cascadeDistribution","shadowDistance","shadowResolution","directional"],
  docs: ["repo/docs/user-manual/editor/scenes/components/light.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
