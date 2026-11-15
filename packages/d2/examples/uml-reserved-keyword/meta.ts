// d2 example: Reserved keywords as class members
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Reserved keywords as class members',
  summary:
    'In a class, a bare `label` sets the shape\'s label, whereas `"label": string` is a field called label.',
  section: 'UML Classes',
  tags: ['class', 'escape'],
  docs: ['repo/docs/tour/uml-classes.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
