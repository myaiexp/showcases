// force-graph example: Interaction: onLinkRightClick
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Interaction: onLinkRightClick',
  summary:
    'A right-click on a link removes it: the handler sets graphData again with that link filtered out, and the layout carries on from where the nodes were. The card deletes links one by one, then restores them.',
  section: 'Interaction',
  tags: ['onLinkRightClick', 'graphData', 'linkLabel'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
