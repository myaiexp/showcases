// d2 example: Globs: nested
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Globs: nested',
  summary:
    'A glob block may hold another glob. The outer `**` with `&shape: sequence_diagram` finds the two conversation diagrams, and the inner `**: {shape: person}` then turns every actor in them into a person.',
  section: 'Globs',
  tags: ['globs', 'nested', 'sequence_diagram'],
  docs: ['repo/docs/tour/globs.md', 'repo/static/d2/globs-nested.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
