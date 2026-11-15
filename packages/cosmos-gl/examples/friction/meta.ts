// cosmos-gl example: Friction
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Friction',
  summary:
    'simulationFriction scales how much speed points keep from one tick to the next: 0 stops them at once, 1 lets them coast. The same scattered graph is restarted at three values, from sluggish to bouncy.',
  section: 'Simulation forces',
  tags: ['simulationFriction', 'setConfigPartial', 'render'],
  docs: ['repo/src/stories/configuration.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
