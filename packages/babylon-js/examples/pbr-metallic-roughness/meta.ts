// babylon-js example: PBR metallic and roughness
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PBR metallic and roughness",
  summary:
    "A 5 by 3 grid of PBRMaterial spheres: metallic rises left to right and roughness top to bottom, lit by plain lights with no environment texture.",
  section: 'Materials',
  tags: ['PBRMaterial', 'metallic', 'roughness', 'albedoColor'],
  docs: [
    'repo/content/features/featuresDeepDive/materials/using/introToPBR.md',
    'repo/content/features/featuresDeepDive/materials/using/masterPBR.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
