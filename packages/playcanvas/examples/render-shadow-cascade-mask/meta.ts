// playcanvas example: Render shadow cascade mask
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Render shadow cascade mask",
  summary: "Posts running away from the camera cast into only the cascades of a directional light that a shadowCascadeMask names. Tick cascades 0 to 3 in the full view; cards step through masks.",
  section: "Components",
  tags: ["RenderComponent","shadowCascadeMask","SHADOW_CASCADE_0","SHADOW_CASCADE_ALL","numCascades"],
  docs: ["repo/docs/user-manual/editor/scenes/components/render.md","repo/docs/user-manual/editor/scenes/components/light.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
