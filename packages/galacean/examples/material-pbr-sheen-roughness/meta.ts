// galacean example: PBR sheen roughness
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PBR sheen roughness",
  summary: "White sheen with sheenRoughness from 0 to 1: low values give a tight bright rim, high values a broad soft one.",
  section: "Material",
  tags: ['PBRMaterial','sheenColor','sheenRoughness'],
  docs: [
    'repo/docs/en/graphics/material/builtinShaders/pbr.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
