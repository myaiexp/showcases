// force-graph example: Interaction: enablePanInteraction
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Interaction: enablePanInteraction',
  summary:
    'enablePanInteraction takes a boolean or a function of the mouse event. With a Shift-only rule a background drag moves the view only while Shift is held; the select swaps in always or never.',
  section: 'Interaction',
  tags: ['enablePanInteraction', 'zoomToFit'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
