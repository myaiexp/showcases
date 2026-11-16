// fabric example: Animation: util.animate on a plain value
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Animation: util.animate on a plain value',
  summary:
    'A number counted by util.animate drives twelve bars; with no target the animation is aborted by hand when the example ends.',
  section: 'Animation',
  tags: ['util.animate', 'onComplete', 'abort'],
  docs: ['repo/src/content/docs/api/namespaces/util/functions/animate.md', 'repo/src/content/docs/docs/core-concepts.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
