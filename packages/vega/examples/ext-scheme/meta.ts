// vega example: Extensibility: Scheme
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Extensibility: Custom Colour Schemes',
  summary:
    'Two schemes added with vega.scheme and referenced by name: an interpolator function drawn as an 80-step ramp with a sliding marker, and a four-colour array that an ordinal scale applies to five bars.',
  section: 'Extensibility',
  tags: ['extensibility.scheme', 'scale.range.scheme', 'scale.type'],
  docs: ['repo/docs/docs/api/extensibility.md', 'repo/docs/docs/schemes.md', 'repo/docs/docs/scales.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
