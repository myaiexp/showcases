// Tippy.js example: Labels for icon-only buttons
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Labels for icon-only buttons',
  summary:
    'A button with only an icon has no name a screen reader can read. In the first row the tip becomes the button\'s label; in the second it is only a description, so the button stays unnamed. The panel shows both.',
  section: 'Accessibility',
  tags: ['aria', 'aria-labelledby', 'aria-describedby', 'role'],
  docs: ['repo/website/src/pages/v6/all-props.mdx', 'repo/website/src/pages/v6/accessibility.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
