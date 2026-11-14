// PlayCanvas example: Texture addressing modes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Texture addressing modes",
  summary:
    "The same lettered picture on three planes with UVs running past 1: repeat, clamp to edge and mirrored repeat. The full view sets addressU and addressV on all and the UV range.",
  section: "Graphics",
  tags: ["Texture", "addressU", "addressV", "ADDRESS_REPEAT", "ADDRESS_CLAMP_TO_EDGE", "ADDRESS_MIRRORED_REPEAT"],
  docs: ["repo/docs/user-manual/graphics/textures.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
