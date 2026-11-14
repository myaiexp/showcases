// motion example: Search results that pop in one by one
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Search results that pop in one by one',
  summary: 'Type in a city search and the matches appear in a quick cascade, each one a beat after the last, while the old results fade away. One .add() on the result class plus stagger() in enter() sets the rhythm.',
  section: 'animateView',
  tags: ['animateView', 'add', 'enter', 'exit', 'stagger'],
  docs: ['pages/motion-dev/docs/animate-view.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
