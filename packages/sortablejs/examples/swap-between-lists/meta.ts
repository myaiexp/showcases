// Sortable.js example: two teams trading players one for one
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Swap players between two teams',
  summary:
    'Two teams, three players each. Drop a player on a player from the other team and they change sides one-for-one, so both squads stay the same size. Power totals show whether the trade was fair.',
  section: 'Swap',
  tags: ['swap', 'swapClass', 'group', 'onSort'],
  docs: ['repo/plugins/Swap/README.md', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
