// penrose example: has label relations
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Select objects that have a label',
  summary:
    'The object property relation `s has label` keeps a selector from touching a set with no label, and `has math label` or `has text label` narrows it to one kind. Four sets carry a math label, a text label, no label and an automatic label; each tab draws labels for the sets its header accepts.',
  section: 'Style: Selectors',
  tags: ['has label', 'has math label', 'has text label', 'NoLabel', 'Equation'],
  docs: ['repo/packages/docs-site/docs/ref/style/selectors.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
