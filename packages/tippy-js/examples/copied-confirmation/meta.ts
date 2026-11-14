// Tippy.js example: a "Copied!" tip shown by code after a button click
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Copied!',
  summary:
    'A share link with a Copy button. Clicking it pops a small "Copied!" confirmation over the button, which fades away after a second. Here the tip is opened and closed by code rather than by hovering.',
  section: 'Props: behaviour',
  tags: ['trigger: manual', 'show()', 'hide()', 'theme'],
  docs: ['repo/website/src/pages/v6/all-props.mdx', 'repo/website/src/pages/v6/methods.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
