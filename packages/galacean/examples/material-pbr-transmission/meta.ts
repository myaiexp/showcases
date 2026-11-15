// galacean example: PBR transmission
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PBR transmission",
  summary: "Glass spheres in front of a patterned wall with transmission from 0 to 1: at 0 they are solid, at 1 the wall shows through. Transmission needs the camera's opaque texture, which the example switches on.",
  section: "Material",
  tags: ['PBRMaterial','transmission','Camera.opaqueTextureEnabled'],
  docs: [
    'repo/docs/en/graphics/material/builtinShaders/pbr.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
