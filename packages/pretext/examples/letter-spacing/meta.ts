// Pretext example: prepare() with a letterSpacing option matching CSS letter-spacing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Letter spacing',
  summary:
    'prepare(text, font, { letterSpacing }) takes the same px value as CSS letter-spacing, negative values included. A painted paragraph with that CSS sits under the predicted box.',
  section: 'Measure height',
  tags: ['letterSpacing', 'prepare', 'layout', 'tracking'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
