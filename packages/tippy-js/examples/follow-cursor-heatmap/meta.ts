// Tippy.js example: a tooltip that follows the cursor over an activity calendar
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Readout on a heatmap',
  summary:
    'An activity calendar made of small squares, with a single tooltip on the whole grid. It trails the cursor and names the day and the number of commits under it, so there is no need for a separate tip on every square.',
  section: 'Props: position',
  tags: ['followCursor', 'plugins', 'setContent', 'getReferenceClientRect'],
  docs: [
    'repo/website/src/pages/v6/all-props.mdx',
    'repo/website/src/pages/v6/plugins.mdx',
    'repo/website/src/pages/index.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
