// fabric example: Utilities: util.ease functions called by hand
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Utilities: util.ease functions called by hand',
  summary:
    'Every function in util.ease takes (t, b, c, d). The curve is sampled by calling it directly, and a scrubber shows the same call moving a dot from b by c over d. Pick any of the dozens of easings.',
  section: 'Utilities',
  tags: ['util.ease', 'easeOutBounce', 'easeInOutCubic', 'easeOutElastic'],
  docs: [
    'repo/src/content/docs/api/namespaces/util/namespaces/ease/functions/easeOutBounce.md',
    'repo/src/content/docs/api/namespaces/util/namespaces/ease/functions/easeInOutCubic.md',
    'repo/src/content/docs/api/namespaces/util/namespaces/ease/functions/easeOutElastic.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
