// playcanvas example: Light type: directional, omni and spot
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Light type: directional, omni and spot",
  summary: "One lamp entity whose light component changes type over the same scene: directional ignores position, omni ignores direction, spot uses both. Cards cycle the three; the full view picks the type and intensity.",
  section: "Components",
  tags: ["LightComponent","type","directional","omni","spot","intensity"],
  docs: ["repo/docs/user-manual/editor/scenes/components/light.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
