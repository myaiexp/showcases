// galacean example: Shadow distance and fade border
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Shadow distance and fade border",
  summary:
    "shadowDistance is how far from the camera shadows are drawn, and shadowFadeBorder the fraction of it over which they fade. The card pulls the distance in and out along a line of pillars.",
  section: "Light",
  tags: ['scene.shadowDistance', 'scene.shadowFadeBorder'],
  docs: [
    'repo/docs/en/graphics/light/shadow.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
