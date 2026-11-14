// VFX-JS example: waitFor: what to wait for before the new capture
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "waitFor: what to wait for before the new capture",
  summary:
    "After the callback changes the DOM, VFX-JS waits (waitFor) before capturing the new content: 'media' (the default) waits for pending images, videos and fonts for up to about 300 ms, 'none' captures at once, and a function gets the element and returns a promise. The readout is how long each run took, start to finish.",
  section: "Transitions",
  tags: ['vfx.addTransition', 'run()', 'waitFor', 'destroy()'],
  docs: ['repo/docs/TRANSITION.md', 'pages/amagi-dev/vfx-js-transitions/api.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
