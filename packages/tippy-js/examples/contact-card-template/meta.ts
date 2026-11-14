// Tippy.js example: one hidden template reused for every contact tip
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One template, many tips',
  summary:
    'Write the layout of a contact card once, hidden on the page, and every name in the team list borrows it. Only the blanks (name, role, email) change from tip to tip.',
  section: 'HTML content',
  tags: ['content()', 'template', 'innerHTML', 'placement'],
  docs: ['repo/website/src/pages/v6/html-content.mdx', 'repo/website/src/pages/v6/all-props.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
