// cosmos-gl example: Link arrows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link arrows',
  summary:
    'setLinkArrows takes one true or false per link to show an arrowhead at the target end. linkDefaultArrows turns arrows on for every link that has no setting of its own, and linkArrowsSizeScale makes the arrowheads bigger or smaller.',
  section: 'Link styling',
  tags: ['setLinkArrows', 'linkDefaultArrows', 'linkArrowsSizeScale'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
