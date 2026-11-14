// Sortable.js example: counting the hidden stand-in copy in a clone-pull list
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hidden clone stays in the DOM',
  summary:
    'A menu that hands out copies of dishes to an order tray. A live count shows that, while you hold a dish, a hidden stand-in either stays in the menu\'s markup or is removed, depending on one option.',
  section: 'Nesting and empty lists',
  tags: ['removeCloneOnHide', 'group', 'pull: clone'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
