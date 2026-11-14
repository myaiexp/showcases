// Tippy.js example: a tip that is already open when the page appears
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pointing out what\'s new',
  summary:
    'A dashboard opens with a "New: export to PDF" tip already showing over the Export button, with no hovering needed. Using the button dismisses it for good, a handy way to announce a new feature.',
  section: 'Props: behaviour',
  tags: ['showOnCreate', 'trigger: manual', 'destroy()', 'hide()'],
  docs: [
    'repo/website/src/pages/v6/all-props.mdx',
    'repo/website/src/pages/v6/methods.mdx',
    'repo/website/src/pages/v6/tippy-instance.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
