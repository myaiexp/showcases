// motion example: Springy scoreboard
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Springy scoreboard',
  summary: 'A match scoreboard where the numbers roll to each new score with a bouncy overshoot instead of jumping. springValue(0) is a number that springs to wherever you set() it; tune stiffness and damping to taste.',
  section: 'Motion values',
  tags: ['springValue', 'set', 'on', 'stiffness', 'damping', 'mass'],
  docs: ['pages/motion-dev/docs/spring-value.md', 'pages/motion-dev/docs/motion-value.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
