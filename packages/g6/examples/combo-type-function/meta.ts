// g6 example: Combo type from a function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Combo type from a function',
  summary:
    'combo.type as a function of the combo datum: each combo reads data.comboType. A select changes one combo between rect and circle.',
  section: 'Combo',
  tags: ['combo.type', 'callback', 'updateComboData'],
  docs: [
    'repo/packages/site/docs/manual/element/combo/BaseCombo.en.md',
    'repo/packages/site/docs/manual/element/combo/overview.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
