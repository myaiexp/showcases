// echarts example: Enter and update transitions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Enter and update transitions',
  summary:
    'Each setOption adds, updates and removes items diffed by name, with separate enter and update durations, a chosen easing and index-staggered delays, plus the finished event.',
  section: 'Animation',
  tags: ['animationDurationUpdate', 'animationEasing', 'animationDelay', 'finished'],
  docs: ['repo/contents/en/how-to/animation/transition.md', 'repo/en/api/events.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
