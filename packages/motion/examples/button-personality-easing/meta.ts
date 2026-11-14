// motion example: Buttons with different personalities
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Buttons with different personalities',
  summary: 'Three buttons with the exact same animation (squash on press, spring back, arrow flies off and returns) and three different easings: backOut overshoots and feels playful, anticipate winds up and feels eager, circOut glides and feels calm. The easing alone changes the character.',
  section: 'Easing',
  tags: ['ease', 'backOut', 'anticipate', 'circOut', 'press', 'animate'],
  docs: ['pages/motion-dev/docs/easing-functions.md', 'pages/motion-dev/docs/animate.md', 'pages/motion-dev/docs/press.md', 'pages/motion-dev/docs/delay.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
