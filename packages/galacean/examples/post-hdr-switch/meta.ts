// galacean example: HDR camera and tonemapping
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "HDR camera and tonemapping",
  summary: "Tonemapping is meant for HDR cameras: with enableHDR on, colours above 1 reach the tonemapper intact; with it off the camera clamps them first. The card toggles enableHDR with ACES tonemapping applied.",
  section: "Post Process",
  tags: ['Camera.enableHDR','TonemappingEffect','Camera.enablePostProcess'],
  docs: [
    'repo/docs/en/graphics/postProcess/postProcess.mdx',
    'repo/docs/en/graphics/postProcess/effects.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
