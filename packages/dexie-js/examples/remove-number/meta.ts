// dexie-js example: Withdraw with remove()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Withdraw with remove()',
  summary:
    'Bank-style withdrawals: remove(395) takes 395 off the stored balance, and add(395) puts it back. An account with no balance stored counts as zero, so its first withdrawal leaves it at −395.',
  section: 'Prop modifications',
  tags: ['remove()', 'add()', 'update()'],
  docs: ['repo/docs/PropModification/remove().md', 'repo/docs/PropModification/add().md', 'repo/docs/Table/Table.update().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
