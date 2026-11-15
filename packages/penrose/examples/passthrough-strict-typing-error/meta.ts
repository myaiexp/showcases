// penrose example: Passthrough values must be strings or numbers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Passthrough values must be strings or numbers',
  summary:
    'The docs\' example: `colorInterpolation : true` is a boolean, and passthrough values must be a string or a number, so compile reports that the property expects StrV or FloatV and does not accept BoolV. The second tab uses a string, which draws fine.',
  section: 'Passthrough SVG',
  tags: ['passthrough', 'colorInterpolation', 'error', 'strict typing'],
  docs: ['repo/packages/docs-site/docs/ref/style/passthrough.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
