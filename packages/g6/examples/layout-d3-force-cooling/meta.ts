// g6 example: D3Force layout: alpha, alphaDecay and velocityDecay
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "D3Force layout: alpha, alphaDecay and velocityDecay",
  summary: "alpha is the simulation energy, alphaDecay how fast it cools and velocityDecay the friction on nodes. Sliders set them and the layout is re-run with animation so the settling speed shows.",
  section: 'Layout',
  tags: ["d3-force", "alpha", "alphaDecay", "velocityDecay", "alphaMin"],
  docs: [
    "repo/packages/site/docs/manual/layout/D3ForceLayout.en.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
