// galacean example: PBR roughness
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PBR roughness",
  summary: "A row of metal spheres from roughness 0 to 1: the reflection of the studio blurs from a sharp mirror to a soft sheen. A slider changes metallic; the card sweeps it by itself.",
  section: "Material",
  tags: ['PBRMaterial','roughness'],
  docs: [
    'repo/docs/en/graphics/material/builtinShaders/pbr.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
