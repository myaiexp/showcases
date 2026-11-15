// galacean example: Model: metallic and roughness
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Model: metallic and roughness",
  summary:
    "Five balls from metallic 0 to 1 and a roughness slider show the PBR behaviour the restoration guide describes: metal reflects the environment, roughness blurs it.",
  section: "Model",
  tags: ['PBRMaterial','metallic','roughness'],
  docs: [
    'repo/docs/en/graphics/model/restoration.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
