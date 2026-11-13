// gsap example: Draggable trigger, lockAxis, lockedAxis, onLockAxis and zIndex
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Draggable lockAxis and trigger',
  summary:
    'Three small windows in a box, dragged by their title bars (the trigger). One locks to the first direction you drag and reports lockedAxis, one never rises above the others, and Draggable.zIndex sets the stacking start.',
  section: 'Draggable',
  tags: ['Draggable', 'lockAxis', 'lockedAxis', 'onLockAxis', 'trigger', 'zIndex', 'zIndexBoost'],
  docs: [
    'pages/gsap-com/docs/v3/Plugins/Draggable/lockAxis.md',
    'pages/gsap-com/docs/v3/Plugins/Draggable/lockedAxis.md',
    'pages/gsap-com/docs/v3/Plugins/Draggable/zIndex.md',
    'pages/gsap-com/docs/v3/Plugins/Draggable/static-create-.md',
    'pages/gsap-com/docs/v3/Plugins/Draggable.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
