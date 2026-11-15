// galacean example: PBR clear coat
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PBR clear coat",
  summary: "A rough red metal sphere gets a glossy lacquer layer as clearCoat rises from 0 to 1 along the row: a second, sharp highlight appears over the dull base.",
  section: "Material",
  tags: ['PBRMaterial','clearCoat'],
  docs: [
    'repo/docs/en/graphics/material/builtinShaders/pbr.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
