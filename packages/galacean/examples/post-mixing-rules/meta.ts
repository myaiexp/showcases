// galacean example: Post-process mixing rules
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Post-process mixing rules",
  summary: "The docs' mixing example in numbers: a global volume with bloom intensity 0.5 and a local one with 1, blend distance 4. As the camera nears the box the blended intensity follows mix(0.5, 1, 1 - distance / blendDistance), and the readout compares it with the formula.",
  section: "Post Process",
  tags: ['PostProcess','PostProcessManager.getBlendEffect','blendDistance','priority'],
  docs: [
    'repo/docs/en/graphics/postProcess/postProcess.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
