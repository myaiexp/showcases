// galacean example: Post-process layer and camera mask
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Post-process layer and camera mask",
  summary: "Two global volumes sit on different layers with different bloom tints; the camera's postProcessMask picks which layers count. The card cycles Layer1 only, Layer2 only, and none.",
  section: "Post Process",
  tags: ['PostProcess.layer','Camera.postProcessMask','Layer'],
  docs: [
    'repo/docs/en/graphics/postProcess/postProcess.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
