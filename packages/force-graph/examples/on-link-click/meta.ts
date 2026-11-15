// force-graph example: Interaction: onLinkClick
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Interaction: onLinkClick',
  summary:
    'onLinkClick selects the clicked link, which the colour and width accessors then draw thicker and in its kind\'s colour. Clicking empty space clears it with onBackgroundClick.',
  section: 'Interaction',
  tags: ['onLinkClick', 'onBackgroundClick', 'linkColor', 'linkWidth', 'linkLabel'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
