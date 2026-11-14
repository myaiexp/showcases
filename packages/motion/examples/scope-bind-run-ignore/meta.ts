// motion example: Which work a stopped scope takes with it
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Which work a stopped scope takes with it',
  summary: 'Four moving dots show who owns an animation. One started from a bind()-wrapped click and one started after an await with run() freeze when the scope stops. A plain click handler, and work started inside ignore(), keep going, which is the bug in the first case and the point of the second.',
  section: 'Utils',
  tags: ['scopeMotion', 'scope.bind', 'scope.run', 'scope.ignore', 'scope.state'],
  docs: ['pages/motion-dev/docs/scope-motion.md', 'pages/motion-dev/docs/animate.md', 'pages/motion-dev/docs/delay.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
