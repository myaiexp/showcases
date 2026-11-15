// tanstack-charts example: Beeswarm with dodgeY
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Beeswarm with dodgeY',
  summary:
    'dodgeY keeps each dot\'s x position and works out a collision-free y in final plot pixels, so overlapping values fan out into a swarm. The chart needs only an x scale: the y scale is null because dodge generates the vertical position.',
  section: 'Dodge Layouts',
  tags: ['dot', 'dodgeY', 'layout', 'color', 'y: null'],
  docs: [
    'repo/docs/reference/marks/dodge.md',
    'repo/docs/reference/marks/dot-and-hexagon.md',
    'repo/docs/guides/legends-and-color.md',
    'repo/docs/guides/tooltips-and-focus.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
