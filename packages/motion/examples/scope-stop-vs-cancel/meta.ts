// motion example: Freeze or reset a dashboard with scope stop and cancel
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Freeze or reset a dashboard with scope stop and cancel',
  summary: 'A dashboard of a spinner, a pulsing bar, a hover orb and a draggable chip, all started inside one scope. stop() freezes everything where it is and switches the gestures off; cancel() does that and puts the styles back; refresh() restarts it. The state readout shows what the scope thinks.',
  section: 'Utils',
  tags: ['scopeMotion', 'scope.stop', 'scope.cancel', 'scope.refresh', 'scope.state'],
  docs: ['pages/motion-dev/docs/scope-motion.md', 'pages/motion-dev/docs/animate.md', 'pages/motion-dev/docs/delay.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
