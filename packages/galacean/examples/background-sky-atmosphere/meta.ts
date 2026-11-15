// galacean example: Procedural sky atmosphere and exposure
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Procedural sky atmosphere and exposure",
  summary:
    "atmosphereThickness sets how much air the light passes through, from thin and dark blue to thick and hazy, and exposure brightens or darkens the whole sky. The card sweeps both.",
  section: "Background",
  tags: ['SkyProceduralMaterial', 'atmosphereThickness', 'exposure'],
  docs: [
    'repo/docs/en/graphics/background/sky.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
