// force-graph example: Interaction: enableZoomInteraction with a predicate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Interaction: enableZoomInteraction with a predicate',
  summary:
    'enableZoomInteraction takes a function of the wheel event. This one allows zooming only when Ctrl or Cmd is held, so a plain scroll over the graph does nothing; the card sends both kinds of wheel event.',
  section: 'Interaction',
  tags: ['enableZoomInteraction', 'onZoom'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
