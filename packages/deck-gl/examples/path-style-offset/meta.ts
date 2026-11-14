// deck-gl example: PathStyleExtension offset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PathStyleExtension offset',
  summary:
    'offset: true adds getOffset, a sideways shift in stroke widths: each route is drawn twice, one copy to the left and one to the right, like the two lanes of a road.',
  section: 'Extensions',
  tags: ['PathStyleExtension', 'offset', 'getOffset'],
  docs: [
    'repo/docs/api-reference/extensions/path-style-extension.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
