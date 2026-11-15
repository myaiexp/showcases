// tanstack-charts example: Different motion for enter, update and exit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Different motion for enter, update and exit',
  summary:
    'A motion function sees context.phase. Entering bars fade in on a 40 ms stagger, updates use a spring and exiting bars leave on a quick tween. Rows come and go and values change on each step, so all three phases run in one card.',
  section: 'Motion',
  tags: ['motion', 'phase', 'enter', 'update', 'exit', 'ChartMotionContext'],
  docs: ['repo/docs/reference/motion.md', 'repo/docs/reference/marks/bar-and-rect.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
