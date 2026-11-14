// playcanvas example: Render on demand
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Render on demand',
  summary:
    "For apps where little changes, such as a product configurator, set app.autoRender to false and call app.renderNextFrame = true only when the picture changes: a colour swap, a drag of the camera. The app still ticks every frame, but the counters show it rendering a fraction of them, saving CPU and GPU time and battery. The card changes colour every 1.5 seconds; in the full view, drag to orbit or press the buttons, and turn autoRender back on to see every tick render.",
  section: 'Debugging and Optimization',
  tags: ['autoRender', 'renderNextFrame', 'frameupdate', 'framerender'],
  docs: ['repo/docs/user-manual/optimization/guidelines.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
