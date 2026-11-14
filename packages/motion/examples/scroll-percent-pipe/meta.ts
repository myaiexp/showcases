// motion example: Download meter that pipes a number into a percentage
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Download meter that pipes a number into a percentage',
  summary: 'A file download that turns megabytes received into a tidy "73%". pipe() chains three small functions, progress, clamp and round, and the steps underneath show what each hands to the next. Remove the clamp and a resumed transfer reads over 100%.',
  section: 'Utils',
  tags: ['pipe', 'progress', 'clamp', 'motionValue'],
  docs: ['pages/motion-dev/docs/pipe.md', 'pages/motion-dev/docs/progress.md', 'pages/motion-dev/docs/clamp.md', 'pages/motion-dev/docs/scope-motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
