// vchart example: Storyline: clock layout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Storyline: clock layout',
  summary:
    'The clock layout places the nodes clockwise around an orbit with dashed lead lines, text extending outward on both sides; it calculates its own angles and radius. More nodes crowd the orbit, so the count is the control.',
  section: 'Extensions',
  tags: ['storyline', 'layout clock', 'themeColor', 'data'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Extensions/storyline.md',
    'repo/docs/assets/option/en/chart/storyline.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
