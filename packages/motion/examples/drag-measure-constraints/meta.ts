// motion example: Widget kept clear of a header strip
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Widget kept clear of a header strip',
  summary: 'A dashboard widget you can drag around a board, but never over the header at the top. Motion measures the board, and a callback trims the top edge to fit the header.',
  section: 'Gestures',
  tags: ['drag', 'constraints', 'onMeasureConstraints', 'elastic'],
  docs: ['pages/motion-dev/docs/drag.md', 'pages/motion-dev/docs/scope-motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
