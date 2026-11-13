// mermaid example: User journey scored by satisfaction
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'User journey scored by satisfaction',
  summary:
    'Sections group the steps of a task; each step carries a 1-5 satisfaction score and the actors who do it. Two journeys show how scores and shared steps read.',
  section: 'User Journey',
  tags: ['journey', 'sections', 'score', 'actors'],
  docs: ['repo/packages/mermaid/src/docs/syntax/userJourney.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
