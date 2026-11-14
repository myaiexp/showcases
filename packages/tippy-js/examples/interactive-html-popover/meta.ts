// Tippy.js example: a click-to-open account menu built from a tippy
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Interactive HTML popover',
  summary:
    'The same tool that makes tooltips makes dropdown menus. Click the account button and a menu drops down; its items are real buttons you can click, and picking one closes the menu.',
  section: 'Overview',
  tags: ['interactive', 'trigger: click', 'content: Element', 'hide()', 'dropdown'],
  docs: [
    'repo/website/src/pages/index.mdx',
    'repo/website/src/pages/v6/html-content.mdx',
    'repo/website/src/pages/v6/all-props.mdx',
    'repo/website/src/pages/v6/methods.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
