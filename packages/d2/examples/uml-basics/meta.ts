// d2 example: UML class basics
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'UML class basics',
  summary:
    'In a `class` shape a key\'s value is the field\'s type. Any key containing `(` is a method whose value is the return type, and a method with no value returns void.',
  section: 'UML Classes',
  tags: ['class', 'method', 'field'],
  docs: ['repo/docs/tour/uml-classes.md', 'repo/static/d2/classes-1.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
