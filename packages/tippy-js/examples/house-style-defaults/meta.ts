// Tippy.js example: set default props once so every new tip shares a house style
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A house style for every tooltip',
  summary:
    'Change the defaults once and every tip made afterwards follows them: below, wider-spaced, no arrow, a short wait. The left toolbar was made with a house style, the right one with the factory settings, so you can feel the difference.',
  section: 'Customization',
  tags: ['setDefaultProps', 'defaultProps', 'delay', 'placement', 'maxWidth', 'arrow', 'duration'],
  docs: ['repo/website/src/pages/v6/customization.mdx', 'repo/website/src/pages/v6/methods.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
