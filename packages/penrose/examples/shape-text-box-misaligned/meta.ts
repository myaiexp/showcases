// penrose example: A Text box misaligned by textAnchor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A Text box misaligned by textAnchor',
  summary:
    'The docs warn that a Rectangle built from `t.text.center` only fits while the text keeps `textAnchor : "middle"`. The tabs show the fit, then `start` and `end`, where the text slips out of its box because `center` is then the anchor point rather than the middle.',
  section: 'Shape: Text',
  tags: ['Text', 'textAnchor', 'width', 'center', 'trap'],
  docs: ['repo/packages/docs-site/docs/ref/style/shapes/text.md', 'repo/packages/core/src/shapes/Text.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
