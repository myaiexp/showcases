// galacean example: PBR metallic
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PBR metallic",
  summary: "Five spheres from metallic 0 to 1: as the value rises the surface stops showing its own colour and mirrors the studio light around it. The full view has a roughness slider; the card sweeps roughness by itself.",
  section: "Material",
  tags: ['PBRMaterial','metallic'],
  docs: [
    'repo/docs/en/graphics/material/builtinShaders/pbr.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
