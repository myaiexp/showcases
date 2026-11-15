// galacean example: PBR thickness texture
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PBR thickness texture",
  summary: "A glass sphere whose thicknessTexture (green channel ramp) makes one side thick, so the wall behind bends strongly there and hardly at all on the other side.",
  section: "Material",
  tags: ['PBRMaterial','thicknessTexture','thickness'],
  docs: [
    'repo/docs/en/graphics/material/builtinShaders/pbr.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
