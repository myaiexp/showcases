// d2 example: Lifelines inherit the actor style
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Lifelines inherit the actor style',
  summary:
    'The vertical lifeline takes the actor\'s `stroke` and `stroke-dash`. The second variant sets `alice.style` to a red stroke with no dashes; bob keeps the default.',
  section: 'Sequence Diagrams',
  tags: ['sequence_diagram', 'style', 'lifeline'],
  docs: ['repo/docs/tour/sequence-diagrams.md', 'repo/static/d2/sequence-diagrams-lifeline.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
