// penrose example: String concatenation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'String concatenation',
  summary:
    'Strings join with `+`. The caption of each set is built from its label and a few literal pieces, such as `"(" + x.label + ")"`, and a second string adds a prefix to that, so one label becomes several captions.',
  section: 'Style: Expressions',
  tags: ['string', 'concatenation', 'label', 'Text'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/expressions.md',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
