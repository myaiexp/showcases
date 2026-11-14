// playcanvas example: Light shadow update mode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Light shadow update mode",
  summary: "Realtime shadows redraw every frame, while the Once mode renders the shadow map one time and holds it, so shadows freeze under moving shapes until you ask for one more update.",
  section: "Components",
  tags: ["shadowUpdateMode","SHADOWUPDATE_REALTIME","SHADOWUPDATE_THISFRAME","castShadows"],
  docs: ["repo/docs/user-manual/editor/scenes/components/light.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
