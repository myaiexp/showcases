// d2 example: Sequence diagrams inside containers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sequence diagrams inside containers',
  summary:
    'Two sequence diagrams sit in one container and are joined by an ordinary connection labelled "Five years later". Messages that target `bob.play` use nested objects as spans.',
  section: 'Sequence Diagrams',
  tags: ['sequence_diagram', 'container', 'connection'],
  docs: ['repo/docs/tour/sequence-diagrams.md', 'repo/static/d2/sequence-diagrams-2.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
