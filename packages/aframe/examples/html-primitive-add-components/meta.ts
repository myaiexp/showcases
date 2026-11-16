// aframe example: Attaching components to primitives: a falling box and sphere
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Attaching components to primitives: a falling box and sphere',
  summary:
    'Primitives are entities, so any component can be an attribute on them. A small dynamic-body component of our own (standing in for the docs\' physics component) drops an <a-box> and an <a-sphere> and bounces them.',
  section: 'Introduction',
  tags: ['a-box', 'a-sphere', 'custom component', 'tick', 'attach components'],
  docs: ['repo/docs/introduction/html-and-primitives.md', 'repo/docs/introduction/writing-a-component.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
