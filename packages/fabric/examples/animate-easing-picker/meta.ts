// fabric example: Animation: Easing functions compared
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Animation: Easing functions compared',
  summary:
    'A picker over every util.ease function draws its curve (easing(t, 0, 1, 1)) and runs a dot and a square that use it, so overshoot, bounce and elastic can be compared.',
  section: 'Animation',
  tags: ['util.ease', 'easing', 'animate', 'Polyline'],
  docs: ['repo/src/content/docs/docs/Old docs/fabric-intro-part-2.md', 'repo/src/content/docs/api/namespaces/util/functions/animate.md', 'repo/src/content/docs/api/namespaces/util/namespaces/ease/functions/easeOutBounce.md', 'repo/src/content/docs/api/namespaces/util/namespaces/ease/functions/easeOutElastic.md', 'repo/src/content/docs/api/namespaces/util/namespaces/ease/functions/easeInOutBack.md', 'repo/src/content/docs/api/namespaces/util/namespaces/ease/functions/easeInQuint.md', 'repo/src/content/docs/api/namespaces/util/namespaces/ease/functions/defaultEasing.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
