// Tippy.js example: three different rules for what closes a tip on click
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Closing on click',
  summary:
    'Three buttons, three rules for closing a tip. One closes on any click anywhere. One only closes when you click its own button. The last stays open for as long as the cursor is on it, whatever you click.',
  section: 'Props: behaviour',
  tags: ['hideOnClick', 'trigger: click', 'trigger: mouseenter'],
  docs: ['repo/website/src/pages/v6/all-props.mdx', 'repo/website/src/pages/v6/faq.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
