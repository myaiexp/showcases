// tanstack-charts example: Retargeting a spring in flight
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Retargeting a spring in flight',
  summary:
    'A spring that is retargeted while moving keeps its sampled value and its velocity, so there is no jump and no restart. The data changes every 450 ms, much faster than the spring settles, and the bars sweep through the changes like a floating object. A tween retargeted this way would restart its curve.',
  section: 'Motion',
  tags: ['motion', 'spring', 'interruption', 'velocity'],
  docs: ['repo/docs/reference/motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
