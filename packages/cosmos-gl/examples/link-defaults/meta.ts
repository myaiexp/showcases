// cosmos-gl example: Link defaults
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link defaults',
  summary:
    'A NaN channel in a setLinkColors array, or a NaN in a setLinkWidths array, means use linkDefaultColor or linkDefaultWidth. The defaults are looked up when drawing, so changing them restyles those links without touching the arrays.',
  section: 'Link styling',
  tags: ['linkDefaultColor', 'linkDefaultWidth', 'setLinkColors', 'setLinkWidths'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx', 'repo/history/2026/2026-11-04-link-defaults.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
