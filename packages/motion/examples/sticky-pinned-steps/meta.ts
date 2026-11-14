// motion example: Pinned feature tour that steps as you scroll
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pinned feature tour that steps as you scroll',
  summary: 'The landing-page trick where a section stays put while its content changes: three feature panels swap one after another as you scroll through a tall track. The pinning is plain CSS (position: sticky); scroll() watches the track as its target and reports how far through the pinned stretch you are.',
  section: 'scroll',
  tags: ['scroll', 'target', 'container', 'sticky', 'callback', 'animate'],
  docs: ['pages/motion-dev/docs/scroll.md', 'pages/motion-dev/docs/animate.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
