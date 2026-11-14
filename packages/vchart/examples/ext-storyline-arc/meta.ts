// vchart example: Storyline: arc layout, dome and bowl
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Storyline: arc layout, dome and bowl',
  summary:
    'The arc layout runs the nodes along an arc: direction up makes a dome over the theme image, down a bowl under it. radiusRatio, startAngle and endAngle shape the curve; a select flips the direction and the card alternates it.',
  section: 'Extensions',
  tags: ['storyline', 'layout arc', 'direction', 'radiusRatio', 'startAngle', 'endAngle'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Extensions/storyline.md',
    'repo/docs/assets/option/en/chart/storyline.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
