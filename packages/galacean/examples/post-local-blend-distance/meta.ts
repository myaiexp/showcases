// galacean example: Post-process blend distance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Post-process blend distance",
  summary: "With the camera held just outside a local volume, blendDistance decides how much of the effect leaks out: zero keeps it hard-edged, a large distance blends it in from afar. The readout shows the blended bloom intensity.",
  section: "Post Process",
  tags: ['PostProcess.blendDistance','getBlendEffect'],
  docs: [
    'repo/docs/en/graphics/postProcess/postProcess.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
