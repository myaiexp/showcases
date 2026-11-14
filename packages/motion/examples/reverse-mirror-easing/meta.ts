// motion example: Reversed and mirrored easing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Reversed and mirrored easing',
  summary: 'Make three easings out of one. Start from an ease-in, then reverseEasing() turns it into an ease-out and mirrorEasing() into an ease-in-out. Each curve is plotted with a dot travelling along it, and a bar below runs with the function itself passed as ease.',
  section: 'Easing',
  tags: ['reverseEasing', 'mirrorEasing', 'ease', 'easeIn', 'circIn', 'backIn', 'animate'],
  docs: ['pages/motion-dev/docs/easing-functions.md', 'pages/motion-dev/docs/animate.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
