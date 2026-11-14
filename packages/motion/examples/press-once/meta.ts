// motion example: Claim-your-reward button that fires once
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Claim-your-reward button that fires once',
  summary: 'Three reward cards you can each claim a single time. After the first press a card goes grey and ignores further presses; Reset hands them back.',
  section: 'Gestures',
  tags: ['press', 'once'],
  docs: ['pages/motion-dev/docs/press.md', 'pages/motion-dev/docs/animate.md', 'pages/motion-dev/docs/scope-motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
