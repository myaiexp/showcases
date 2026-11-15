// cosmos-gl example: Link colors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link colors',
  summary:
    'setLinkColors takes one RGBA color per link as a flat Float32Array and animates to it on the next render(). getLinkColors returns the colors as drawn, with any defaults filled in.',
  section: 'Link styling',
  tags: ['setLinkColors', 'getLinkColors', 'linkDefaultColor'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
