// Tippy.js example: switching every tip's theme when the page switches dark or light
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Following dark and light mode',
  summary:
    'A mock page with a dark-mode switch. The page recolours itself with CSS, but tips already exist, so the switch also calls setProps({ theme }) on each of them. Open a tip, flip the switch, and the next one matches.',
  section: 'FAQ',
  tags: ['setProps()', 'theme', 'setContent()', 'custom themes'],
  docs: ['repo/website/src/pages/v6/faq.mdx', 'repo/website/src/pages/v6/themes.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
