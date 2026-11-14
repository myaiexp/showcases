// motion example: Equaliser bars with an eased stagger wave
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Equaliser bars with an eased stagger wave',
  summary: 'A music equaliser where every bar bounces with the same motion but starts at a different moment. The ease option on stagger() redistributes those start times: even for linear, bunched early for easeIn, bunched late for easeOut, or any bezier or function of your own.',
  section: 'Utils',
  tags: ['stagger', 'ease', 'cubic bezier', 'repeat'],
  docs: ['pages/motion-dev/docs/stagger.md', 'pages/motion-dev/docs/animate.md', 'pages/motion-dev/docs/scope-motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
