// galacean example: Post-process effect enabled flags
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Post-process effect enabled flags",
  summary: "One PostProcess holds a Bloom and a Tonemapping effect, each with its own enabled flag, found again through getEffect. The card runs through every combination; the full view has a checkbox per effect.",
  section: "Post Process",
  tags: ['PostProcessEffect.enabled','getEffect','removeEffect','BloomEffect','TonemappingEffect'],
  docs: [
    'repo/docs/en/graphics/postProcess/postProcess.mdx',
    'repo/docs/en/graphics/postProcess/effects.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
