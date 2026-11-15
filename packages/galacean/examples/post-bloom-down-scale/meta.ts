// galacean example: Bloom down scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Bloom down scale",
  summary: "downScale picks the bloom's starting resolution: Half (the default) or Quarter of the canvas. Quarter is cheaper and gives a coarser, softer glow. The card flips between them.",
  section: "Post Process",
  tags: ['BloomEffect','downScale','BloomDownScaleMode'],
  docs: [
    'repo/docs/en/graphics/postProcess/effects.mdx',
    'repo/docs/en/graphics/postProcess/postProcess.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
