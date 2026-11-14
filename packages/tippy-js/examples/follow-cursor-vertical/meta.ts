// Tippy.js example: a tooltip that follows the cursor up and down a gauge
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Readout on a vertical gauge',
  summary:
    'A tall depth gauge with a tooltip that stays beside it and slides up and down with the cursor, reading out the depth at that height. Locking one axis keeps the tip tidy against the edge.',
  section: 'Props: position',
  tags: ['followCursor: vertical', 'plugins', 'setContent', 'getReferenceClientRect'],
  docs: ['repo/website/src/pages/v6/all-props.mdx', 'repo/website/src/pages/v6/plugins.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
