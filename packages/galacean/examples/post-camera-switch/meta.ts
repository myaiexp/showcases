// galacean example: Camera post-processing switch
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Camera post-processing switch",
  summary: "Camera.enablePostProcess gates all post-processing for that camera: the same volume with bloom and ACES is applied or ignored as the flag flips. The card toggles it; the full view has a checkbox.",
  section: "Post Process",
  tags: ['Camera.enablePostProcess','PostProcess'],
  docs: [
    'repo/docs/en/graphics/postProcess/postProcess.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
