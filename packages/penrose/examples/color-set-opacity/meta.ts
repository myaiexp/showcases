// penrose example: setOpacity on one colour
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'setOpacity on one colour',
  summary:
    '`setOpacity(color, frac)` keeps a colour and replaces its alpha. Five discs share one sampled colour at 0.2, 0.4, 0.6, 0.8 and 1; the black stripes behind show through the fainter ones.',
  section: 'Computation: Colors & Sampling',
  tags: ['setOpacity', 'rgba'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
