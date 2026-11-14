// Tippy.js example: your own mouse listeners driving an interactive tip
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Closing on your own terms',
  summary:
    'The tip is opened and closed by listeners written by hand, not by Tippy\'s own triggers. When the pointer leaves, one call asks the tip to close only if the pointer is not on its way into it, so the share menu inside stays reachable.',
  section: 'Methods',
  tags: ['hideWithInteractivity()', 'show()', 'trigger: manual', 'interactive'],
  docs: ['repo/website/src/pages/v6/methods.mdx', 'repo/website/src/pages/v6/all-props.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
