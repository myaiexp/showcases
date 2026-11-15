// galacean example: Procedural sky
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Procedural sky",
  summary:
    "The atmospheric-scattering sky from the docs: a SkyProceduralMaterial on a sphere mesh in Sky mode, with the main directional light placing the sun. The light slowly swings, so the sun rises and sets.",
  section: "Background",
  tags: ['SkyProceduralMaterial', 'BackgroundMode.Sky', 'PrimitiveMesh.createSphere'],
  docs: [
    'repo/docs/en/graphics/background/sky.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
