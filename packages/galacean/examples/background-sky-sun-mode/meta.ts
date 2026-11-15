// galacean example: Procedural sky sun modes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Procedural sky sun modes",
  summary:
    "The three sunMode values of SkyProceduralMaterial: None draws no sun, Simple a plain disc and HighQuality a sun whose edge is shaped by sunSize and sunSizeConvergence.",
  section: "Background",
  tags: ['SkyProceduralMaterial', 'SunMode', 'sunSize', 'sunSizeConvergence'],
  docs: [
    'repo/docs/en/graphics/background/sky.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
