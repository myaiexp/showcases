// playcanvas example: Runtime device pixel ratio
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Runtime device pixel ratio',
  summary:
    "Rendering at the screen's native pixel ratio looks crisp but fills many more pixels, which can sink the frame rate of a phone with a big, weak screen. graphicsDevice.maxPixelRatio can be changed at any time: set it to window.devicePixelRatio for a high-tier device and 1 for a low one, then update the canvas size. A fine checker makes the resolution visible, a readout shows the drawing buffer size, and the docs' isLowQualityGPU() check reads unmaskedRenderer to pick a tier. The card swings between a coarse and a full ratio.",
  section: 'Debugging and Optimization',
  tags: ['maxPixelRatio', 'unmaskedRenderer', 'devicePixelRatio', 'updateCanvasSize', 'platform.mobile', 'GraphicsDevice'],
  docs: ['repo/docs/user-manual/optimization/runtime-devicepixelratio.md', 'repo/docs/user-manual/optimization/guidelines.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
