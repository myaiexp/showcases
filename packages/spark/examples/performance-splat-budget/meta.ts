// Spark example: splat count, maxStdDev and pixel ratio against a live FPS counter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Splat budget and the three knobs',
  summary:
    'A procedural nebula whose splat count you raise from 100k to 3 million while an FPS counter runs, next to the three settings the performance page names: maxStdDev (the default sqrt(8) against the sqrt(5) it suggests for VR), the device pixel ratio, and how tightly the splats are packed on screen. Compare the numbers with the per-device budgets in the docs.',
  section: 'Performance Tuning',
  tags: ['maxStdDev', 'setPixelRatio', 'splat budget', 'antialias'],
  docs: ['repo/docs/docs/performance.md', 'repo/docs/docs/spark-renderer.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
