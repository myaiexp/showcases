// d2 example: Clouds and users
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Clouds and users',
  summary:
    'Two labelled containers sit inside `clouds`. Connections from outside address a nested shape by its dotted path, such as `clouds.aws.load_balancer`, or a whole container with `ci.deploys -> clouds`.',
  section: 'Containers',
  tags: ['container', 'connection'],
  docs: ['repo/docs/tour/containers.md', 'repo/static/d2/containers-3.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
