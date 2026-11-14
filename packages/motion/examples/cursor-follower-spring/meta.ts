// motion example: Cursor follower with a spring
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Cursor follower with a spring',
  summary: 'A soft ring that trails your pointer with a little bounce, the kind of custom cursor seen on portfolio sites. springValue wraps the raw pointer position, so every jump in the input is turned into a spring-driven glide with no animate() calls.',
  section: 'Motion values',
  tags: ['springValue', 'motionValue', 'styleEffect', 'stiffness', 'damping'],
  docs: ['pages/motion-dev/docs/spring-value.md', 'pages/motion-dev/docs/motion-value.md', 'pages/motion-dev/docs/style-effect.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
