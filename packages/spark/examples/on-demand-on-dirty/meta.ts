// Spark example: on-demand rendering driven by onDirty, with counters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Render on demand with onDirty',
  summary:
    'There is no animation loop here. The SparkRenderer’s onDirty callback fires when a sort or load finishes, possibly several times a frame, and a requestRender() that sets a scheduled flag turns any number of requests into one requestAnimationFrame render. The overlay counts frames rendered against requests and onDirty calls; the knot turns only when the app nudges it and asks for a frame, and a drag requests one frame per move. A checkbox switches to a continuous loop to compare.',
  section: 'On-demand Rendering',
  tags: ['SparkRenderer', 'onDirty', 'requestRender', 'on-demand rendering'],
  docs: ['repo/docs/docs/on-demand-rendering.md', 'repo/docs/docs/spark-renderer.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
