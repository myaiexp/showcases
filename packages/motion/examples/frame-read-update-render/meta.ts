// motion example: Equal-height cards without layout thrash
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Equal-height cards without layout thrash',
  summary: 'Weather notes in a row that all stretch to the height of the tallest one as the width changes. The heights are measured in frame.read, the tallest worked out in frame.update and every card written in frame.render, so measuring and writing never interleave. cancelFrame drops the work a resize made redundant.',
  section: 'Utils',
  tags: ['frame.read', 'frame.update', 'frame.render', 'cancelFrame', 'animate'],
  docs: ['pages/motion-dev/docs/frame.md', 'pages/motion-dev/docs/scope-motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
