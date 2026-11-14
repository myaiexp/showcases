// Tippy.js example: a chart tooltip that follows the cursor sideways
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Chart readout that follows the cursor',
  summary:
    'One tooltip on a whole chart. As the cursor slides across, the tip slides with it along the top edge and shows the temperature for the day underneath, the way chart readouts work on weather and finance sites.',
  section: 'Props: position',
  tags: ['followCursor', 'plugins', 'moveTransition', 'setContent', 'getReferenceClientRect'],
  docs: [
    'repo/website/src/pages/v6/all-props.mdx',
    'repo/website/src/pages/v6/plugins.mdx',
    'repo/website/src/pages/v6/methods.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
