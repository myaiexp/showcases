// fabric example: Animation: object.animate() on one property
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Animation: object.animate() on one property',
  summary:
    'rect.animate({ left: 290 }) tweens the property from its current value and returns its animation context; onChange asks the canvas to redraw every frame.',
  section: 'Animation',
  tags: ['animate', 'onChange', 'duration', 'easing'],
  docs: ['repo/src/content/docs/docs/Old docs/fabric-intro-part-2.md', 'repo/src/content/docs/api/classes/FabricObject.md', 'repo/src/content/docs/api/namespaces/util/namespaces/ease/functions/easeInOutCubic.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
