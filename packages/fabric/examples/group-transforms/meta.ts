// fabric example: Groups: group transform versus member transform
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Groups: group transform versus member transform',
  summary:
    'A group\'s scaleX and angle apply to every member on top of the member\'s own. Sliders move each independently; calcTransformMatrix() with util.qrDecompose shows the combined transform a member is drawn with.',
  section: 'Groups',
  tags: ['Group', 'scaleX', 'angle', 'calcTransformMatrix', 'qrDecompose', 'triggerLayout'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-3.md',
    'repo/src/content/docs/api/classes/Group.md',
    'repo/src/content/docs/api/classes/FabricObject.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
