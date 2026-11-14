// motion example: Stickers dragged around a photo frame
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stickers dragged around a photo frame',
  summary: 'Decorate a photo: three stickers can be dragged anywhere inside the frame. Pull one past the edge and it stretches, then springs back inside, so nothing gets lost off-photo.',
  section: 'Gestures',
  tags: ['drag', 'constraints', 'elastic'],
  docs: ['pages/motion-dev/docs/drag.md', 'pages/motion-dev/docs/scope-motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
