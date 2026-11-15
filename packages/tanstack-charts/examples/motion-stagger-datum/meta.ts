// tanstack-charts example: Staggering entrances by datum
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Staggering entrances by datum',
  summary:
    'stagger() returns a delay field that is spread into a motion policy. With each: 60 every bar waits 60 ms more than the one before. offset delays the first bar. The chart is mounted again every few seconds to replay the entrance.',
  section: 'Motion',
  tags: ['stagger', 'each', 'offset', 'motion/definition'],
  docs: ['repo/docs/reference/motion.md', 'repo/docs/guides/dynamic-data-and-animation.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
