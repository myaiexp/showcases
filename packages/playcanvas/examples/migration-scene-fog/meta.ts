// playcanvas example: Migration: fog lives on scene.fog
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Migration: fog lives on scene.fog",
  summary: "Fog settings moved under scene.fog as a FogParams object. A runner crosses a road of pillars while the full view switches fog.type between none, linear, exp and exp2 and sets start, end and density.",
  section: "Engine",
  tags: ["Scene.fog","FogParams","FOG_LINEAR","FOG_EXP","FOG_EXP2"],
  docs: ["repo/docs/user-manual/engine/migrations.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
