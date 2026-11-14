// Tippy.js example: why editing data-tippy-content later changes nothing, and the fix
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Why changing the HTML attribute does nothing',
  summary:
    'Tippy reads data-tippy-content once, when the tip is made. Type a new text below: the left button still shows the old one, while the right one uses a MutationObserver to pass every change on with setProps().',
  section: 'FAQ',
  tags: ['data-tippy-content', 'setProps()', 'MutationObserver', 'content'],
  docs: ['repo/website/src/pages/v6/faq.mdx', 'repo/website/src/pages/v6/methods.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
