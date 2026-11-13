// mermaid example: Sequence diagram config as live controls
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sequence diagram config as live controls',
  summary:
    'Sliders and toggles for mirrorActors, actorMargin, messageMargin, boxMargin, messageAlign, noteAlign, wrap, rightAngles and message font size; the sequence: frontmatter they generate is shown under the diagram.',
  section: 'Sequence Diagram',
  tags: ['sequence', 'config', 'frontmatter', 'mirrorActors', 'wrap'],
  docs: ['repo/packages/mermaid/src/docs/syntax/sequenceDiagram.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
