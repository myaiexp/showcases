// galacean example: Canvas: resizeByClientSize
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Canvas: resizeByClientSize",
  summary:
    "resizeByClientSize(pixelRatio) sets the drawing buffer from the element's CSS size. A low pixel ratio gives a chunky image that costs far fewer pixels; the readout shows the buffer size.",
  section: "Core",
  tags: ['WebCanvas', 'resizeByClientSize', 'width', 'height'],
  docs: [
    'repo/docs/en/core/canvas.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
