// motion example: Draggable chips inside a draggable panel
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Draggable chips inside a draggable panel',
  summary: 'A card you can move, holding chips you can also move. Dragging a chip moves only the chip, and a switch lets the card travel with it too.',
  section: 'Gestures',
  tags: ['drag', 'propagation', 'constraints', 'onStart'],
  docs: ['pages/motion-dev/docs/drag.md', 'pages/motion-dev/docs/scope-motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
