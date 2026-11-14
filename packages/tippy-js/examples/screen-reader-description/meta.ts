// Tippy.js example: What a screen reader hears from a tooltip
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'What a screen reader hears',
  summary:
    'A tooltip is not just for eyes: while it is open, the button points at it so a screen reader can read it out. The panel shows the button\'s attributes and the sentence a screen reader would speak, changing as the tip opens and closes.',
  section: 'Accessibility',
  tags: ['aria', 'aria-describedby', 'role', 'MutationObserver'],
  docs: ['repo/website/src/pages/v6/accessibility.mdx', 'repo/website/src/pages/v6/all-props.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
