// galacean example: PBR iridescence IOR
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PBR iridescence IOR",
  summary: "Full iridescence with iridescenceIOR from 1.0 to 2.3: the thin film's index of refraction changes which colours the interference produces.",
  section: "Material",
  tags: ['PBRMaterial','iridescence','iridescenceIOR'],
  docs: [
    'repo/docs/en/graphics/material/builtinShaders/pbr.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
