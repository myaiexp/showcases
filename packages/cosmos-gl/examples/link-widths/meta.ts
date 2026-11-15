// cosmos-gl example: Link widths
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link widths',
  summary:
    'setLinkWidths gives each link its own width in pixels, animated by the next render(). linkWidthScale then multiplies every width at once, and getLinkWidths reads the widths back.',
  section: 'Link styling',
  tags: ['setLinkWidths', 'linkWidthScale', 'getLinkWidths'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
