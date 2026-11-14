// motion example: Percent read and minutes left
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Percent read and minutes left',
  summary: 'A "34% read, about 2 min left" header for an article. scroll() can take a plain function instead of an animation: it is called on every scroll with the progress as a number from 0 to 1, which this turns into a percentage and a reading-time estimate.',
  section: 'scroll',
  tags: ['scroll', 'callback', 'progress', 'container'],
  docs: ['pages/motion-dev/docs/scroll.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
