// playcanvas example: Migration: tint colours always apply
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Migration: tint colours always apply",
  summary: "Since engine 2.x the diffuse and emissive colours multiply their textures every time. A checker diffuse map is tinted by sliders, and the same emissive map shows nothing under the default black emissive colour and glows once it is white.",
  section: "Engine",
  tags: ["StandardMaterial","diffuseMap","emissiveMap","emissive","PIXELFORMAT_SRGBA8"],
  docs: ["repo/docs/user-manual/engine/migrations.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
