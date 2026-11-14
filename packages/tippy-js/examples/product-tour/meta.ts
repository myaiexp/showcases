// Tippy.js example: a guided tour opened with show() and hide()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A guided tour',
  summary:
    'A mock app walks a newcomer through four of its parts. Next and Back close the current tip and open the next one, all by code, so tips become a step-by-step tour instead of hover hints.',
  section: 'Methods',
  tags: ['show()', 'hide()', 'trigger: manual', 'hideOnClick: false', 'interactive'],
  docs: ['repo/website/src/pages/v6/methods.mdx', 'repo/website/src/pages/v6/all-props.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
