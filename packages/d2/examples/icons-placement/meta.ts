// d2 example: Automatic icon placement
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Automatic icon placement',
  summary:
    'D2 picks where the icon goes so it does not cover the label: a container gets it in the top-left corner, a non-container in the middle. Here the outer container and the shape inside it each have their own icon.',
  section: 'Icons & Images',
  tags: ['icon', 'container'],
  docs: ['repo/docs/tour/icons.md', 'repo/static/d2/icon-placement.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
