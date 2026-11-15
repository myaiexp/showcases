// cosmos-gl example: Highlighted points
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Highlighted points',
  summary:
    'highlightedPointIndices lists the points to keep at full strength; every other point is greyed out. An empty array greys out all of them and undefined clears the highlight. pointGreyoutOpacity and pointGreyoutColor style the greyed-out points.',
  section: 'Highlight & focus',
  tags: ['highlightedPointIndices', 'pointGreyoutColor', 'pointGreyoutOpacity', 'setConfigPartial'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
