// penrose example: Text alignmentBaseline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Text alignmentBaseline',
  summary:
    'A horizontal guide runs through the Text `center`. The default `alphabetic` baseline sits the letters on it, `hanging` hangs them from it, and `central` centres them on it. `dominantBaseline` is set to the same value, since Firefox reads only that one.',
  section: 'Shape: Text',
  tags: ['Text', 'alignmentBaseline', 'dominantBaseline', 'center'],
  docs: ['repo/packages/docs-site/docs/ref/style/shapes/text.md', 'repo/packages/core/src/shapes/Text.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
