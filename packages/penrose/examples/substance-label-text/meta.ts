// penrose example: Text labels with Label
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Text labels with Label',
  summary:
    '`Label p "a point"` gives one object a plain-text label, written in double quotes. Style reads it as `p.label` in a `Text` shape, so each set shows its own phrase, and the label need not be the object\'s name.',
  section: 'Substance',
  tags: ['Label', 'label', 'Text', 'string'],
  docs: [
    'repo/packages/docs-site/docs/ref/substance/statements.md',
    'repo/packages/core/src/lib/Functions.ts',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
