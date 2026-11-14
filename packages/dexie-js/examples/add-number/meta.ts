// dexie-js example: Birthdays with add(1)
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Birthdays with add(1)',
  summary:
    'Each birthday adds one year to a friend\'s age right inside the database, without first reading the old age. Ulf has no age stored at all, so his first add(1) simply sets it to 1.',
  section: 'Prop modifications',
  tags: ['add()', 'update()', 'PropModification'],
  docs: ['repo/docs/PropModification/add().md', 'repo/docs/Table/Table.update().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
