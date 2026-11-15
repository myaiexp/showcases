// cosmos-gl example: Highlighted links
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Highlighted links',
  summary:
    'highlightedLinkIndices lists the links to keep at full strength and greys out the others, dimmed to linkGreyoutOpacity. It works on its own: the points stay untouched unless highlightedPointIndices is set too.',
  section: 'Highlight & focus',
  tags: ['highlightedLinkIndices', 'linkGreyoutOpacity', 'highlightedPointIndices', 'setConfigPartial'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
