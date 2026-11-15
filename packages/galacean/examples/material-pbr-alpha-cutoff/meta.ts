// galacean example: PBR alpha cutoff
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PBR alpha cutoff",
  summary: "A soft-edged dot texture on spheres with alphaCutoff 0, 0.25, 0.5 and 0.75: fragments below the cutoff are discarded, so the dots shrink and the sphere behind shows through the holes.",
  section: "Material",
  tags: ['PBRMaterial','alphaCutoff','baseTexture'],
  docs: [
    'repo/docs/en/graphics/material/builtinShaders/pbr.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
