// copying VFX output into a 2D canvas with preserveDrawingBuffer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'preserveDrawingBuffer: read the output',
  summary:
    'new VFX({ preserveDrawingBuffer: true }) keeps the WebGL drawing buffer between frames, so other code can read vfx.canvas outside the frame it was drawn in. The Snapshot button copies the glitching portrait into a plain 2D canvas beside it.',
  section: 'How it Works',
  tags: ['preserveDrawingBuffer', 'vfx.canvas', 'snapshot', 'VFXOpts'],
  docs: ['repo/packages/vfx-js/src/types.ts', 'repo/packages/vfx-js/src/vfx.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
