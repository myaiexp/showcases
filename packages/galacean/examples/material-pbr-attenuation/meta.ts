// galacean example: PBR attenuation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PBR attenuation",
  summary: "Tinted glass: with attenuationColor set, light picks up the colour the further it travels inside. attenuationDistance falls from long to short along the row, so the glass deepens from clear to saturated.",
  section: "Material",
  tags: ['PBRMaterial','attenuationColor','attenuationDistance','thickness'],
  docs: [
    'repo/docs/en/graphics/material/builtinShaders/pbr.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
