// leafer-ui example: Lifecycle: engine events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Lifecycle: engine events",
  summary:
    "The engine reports its life through LeaferEvent: START, BEFORE_READY, READY, AFTER_READY, VIEW_READY, VIEW_COMPLETED, then STOP and RESTART when it is stopped and started again. waitReady() and friends run a function once a stage has passed.",
  section: "Advanced",
  tags: ['Leafer', 'LeaferEvent', 'READY', 'VIEW_READY', 'waitReady', 'start', 'stop'],
  docs: ['pages/www-leaferjs-com/ui/en/guide/life/leafer.md', 'pages/www-leaferjs-com/ui/en/reference/display/Leafer.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
