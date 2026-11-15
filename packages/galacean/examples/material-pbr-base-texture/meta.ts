// galacean example: PBR base color and texture
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PBR base color and texture",
  summary: "The base texture is multiplied by the base colour: five spheres share one painted texture but carry different base colours. The full view has a colour picker for them all; the card cycles the hue.",
  section: "Material",
  tags: ['PBRMaterial','baseColor','baseTexture'],
  docs: [
    'repo/docs/en/graphics/material/builtinShaders/pbr.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
