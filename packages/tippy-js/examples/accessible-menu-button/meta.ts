// Tippy.js example: A menu button keyboards can use
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A menu that keyboards can use',
  summary:
    'A menu button opens a list you can Tab straight into, because the menu sits right after the button in the page. The readout shows the button announcing that it can expand, and where the menu really is.',
  section: 'Accessibility',
  tags: ['interactive', 'appendTo: "parent"', 'aria.expanded', 'trigger: click'],
  docs: ['repo/website/src/pages/v6/accessibility.mdx', 'repo/website/src/pages/v6/all-props.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
