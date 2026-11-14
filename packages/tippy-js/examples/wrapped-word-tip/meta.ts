// Tippy.js example: pointing a tip at the right piece of a link that wraps
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tip on a word that wraps',
  summary:
    'A link in running text that breaks across two lines is really two separate pieces. Without help the tip aims at the empty middle of both. With the inline option it picks the piece that suits its side.',
  section: 'Props: position',
  tags: ['inlinePositioning', 'plugins', 'placement'],
  docs: ['repo/website/src/pages/v6/all-props.mdx', 'repo/website/src/pages/v6/plugins.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
