// galacean example: Ambient light from an .env file
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Ambient light from an .env file",
  summary:
    "A grid of PBR spheres lit only by an ambient light loaded through AssetType.Env (a baked studio environment generated in code): metallic grows left to right and roughness top to bottom.",
  section: "Light",
  tags: ['AmbientLight', 'AssetType.Env', 'scene.ambientLight', 'PBRMaterial'],
  docs: [
    'repo/docs/en/graphics/light/ambient.mdx',
    'repo/docs/en/graphics/light/light.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
