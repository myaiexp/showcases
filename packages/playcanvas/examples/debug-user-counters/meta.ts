// playcanvas example: MiniStats user counters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'MiniStats user counters',
  summary:
    "app.stats.user is a Map of application-defined numbers, and MiniStats graphs any of them from a path such as user.wave, under their own User section. Three counters: a sine wave written every frame, the number of balls moved this frame (the engine never resets user counters, so it is cleared in a frameupdate listener), and the milliseconds a busy loop took, measured with two performance.now() calls. Sliders change the load and the graphs follow.",
  section: 'Debugging and Optimization',
  tags: ['AppStats', 'stats.user', 'MiniStats', 'getDefaultOptions', 'options.stats', 'frameupdate', 'watermark'],
  docs: ['repo/docs/user-manual/optimization/mini-stats.md', 'repo/docs/user-manual/optimization/app-stats.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
