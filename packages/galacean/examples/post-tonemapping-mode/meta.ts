// galacean example: Tonemapping modes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tonemapping modes",
  summary: "Tonemapping remaps HDR colour into display range: bright emissive gradients clip to flat colour without it, Neutral keeps hue with a gentle roll-off and ACES adds filmic contrast. The card cycles off, Neutral and ACES.",
  section: "Post Process",
  tags: ['TonemappingEffect','TonemappingMode','mode'],
  docs: [
    'repo/docs/en/graphics/postProcess/effects.mdx',
    'repo/docs/en/graphics/postProcess/postProcess.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
