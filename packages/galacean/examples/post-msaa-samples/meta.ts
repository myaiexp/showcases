// galacean example: Camera MSAA with post-processing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Camera MSAA with post-processing",
  summary: "With post-processing on, the camera renders to an internal target whose edges are smoothed by msaaSamples. Thin rotating geometry is drawn at None, 2x, 4x and 8x so the jagged edges can be compared.",
  section: "Post Process",
  tags: ['Camera.msaaSamples','MSAASamples','Camera.enablePostProcess'],
  docs: [
    'repo/docs/en/graphics/postProcess/postProcess.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
