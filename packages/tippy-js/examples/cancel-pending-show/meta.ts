// Tippy.js example: typing or scrolling cancels tips that are waiting to open
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Cancelling a tip that's about to open",
  summary:
    'Toolbar buttons wait a moment before showing their tip. If you start typing or scrolling in that moment, the waiting tip is cancelled so it does not pop up in the middle of your work.',
  section: 'Methods',
  tags: ['clearDelayTimeouts()', 'delay', 'onTrigger', 'onShow'],
  docs: ['repo/website/src/pages/v6/methods.mdx', 'repo/website/src/pages/v6/all-props.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
