// force-graph example: Render control: zoomToFit on a subset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Render control: zoomToFit on a subset',
  summary:
    'The third argument of zoomToFit is a node filter. Fitting only the nodes of one group frames that cluster and leaves the others off screen; the card cycles through the groups.',
  section: 'Render control',
  tags: ['zoomToFit', 'nodeAutoColorBy'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
