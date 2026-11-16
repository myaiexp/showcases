// fabric example: Animation: Animate on mouse over
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Animation: Animate on mouse over',
  summary:
    'mouse:over grows the hovered object with animate() and mouse:out shrinks it back, cancelling the half-done move first; cards hover through a fake pointer.',
  section: 'Animation',
  tags: ['mouse:over', 'mouse:out', 'animate', 'cancelByTarget', 'scaleX'],
  docs: ['repo/src/content/docs/docs/Old docs/fabric-intro-part-2.md', 'repo/src/content/docs/docs/core-concepts.md', 'repo/src/content/docs/api/variables/runningAnimations.md', 'repo/src/content/docs/api/classes/FabricObject.md', 'repo/src/content/docs/api/namespaces/util/namespaces/ease/functions/easeOutBack.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
