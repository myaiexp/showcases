// motion example: Toast burst scheduled on the frame loop
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Toast burst scheduled on the frame loop',
  summary: 'Five "saved" and "sent" toasts are scheduled one after another, then cancelled before the last ones fire. delay() is setTimeout locked to the animation frame loop, hands back a cancel function, and lets the toast be measured and drawn in the same frame.',
  section: 'Utils',
  tags: ['delay', 'cancel', 'frame.render', 'scopeMotion'],
  docs: ['pages/motion-dev/docs/delay.md', 'pages/motion-dev/docs/frame.md', 'pages/motion-dev/docs/scope-motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
