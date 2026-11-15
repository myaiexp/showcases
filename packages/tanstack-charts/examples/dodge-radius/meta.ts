// tanstack-charts example: Swarm with different radii
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Swarm with different radii',
  summary:
    'Collision distance is the sum of both circle radii plus padding, using the same radii that are drawn. With r as a channel, the largest dots are placed first and smaller ones pack around them. Hover a dot to see its row.',
  section: 'Dodge Layouts',
  tags: ['dodgeY', 'r', 'rScale', 'collision'],
  docs: ['repo/docs/reference/marks/dodge.md', 'repo/docs/guides/tooltips-and-focus.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
