// force-graph example: Render control: zoomToFit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Render control: zoomToFit',
  summary:
    'zoomToFit(ms, padding) pans and zooms so every node fits, over a transition and with a margin at the edges. The card throws the view off and fits it again with growing padding.',
  section: 'Render control',
  tags: ['zoomToFit', 'centerAt', 'zoom'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
