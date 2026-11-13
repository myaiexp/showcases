// Sigma.js example: animating the camera with easings and durations
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Animated camera transitions',
  summary:
    'camera.animate() glides to a target state, and zoomIn(), zoomOut() and reset() are shortcuts over it. Pick any of the named easings and a duration, or interrupt a running animation.',
  section: 'Adding interactivity',
  tags: ['camera', 'animate', 'easing', 'zoomIn', 'reset'],
  docs: [`${DOCS}/how-to/interactivity/camera-viewport.mdx`, `${DOCS}/reference/camera-api.md`],
  provenance: 'pure',
  added: '2026-11-13',
});
