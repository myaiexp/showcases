// Pretext example: shrink-wrap chat bubbles with walkLineRanges()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Shrink-wrapped chat bubbles',
  summary:
    'walkLineRanges() on a plain prepare() handle finds each message\'s widest line; the bubble is Math.ceil of that, capped at maxWidth. Behind each bubble, the naive full-width one shows the space wasted.',
  section: 'Manual line layout',
  tags: ['walkLineRanges', 'shrink-wrap', 'chat', 'bubbles'],
  docs: ['repo/README.md', 'repo/CHANGELOG.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
