// galacean example: PBR render face
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PBR render face",
  summary: "Three turning planes with RenderFace.Front, Back and Double: the front-only plane vanishes when it turns away, the back-only one shows only its far side, the double-sided one never disappears.",
  section: "Material",
  tags: ['PBRMaterial','renderFace','RenderFace'],
  docs: [
    'repo/docs/en/graphics/material/builtinShaders/pbr.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
