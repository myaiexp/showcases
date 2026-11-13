// animejs example: timeline lifecycle callbacks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Timeline lifecycle callbacks log',
  summary: 'Counts how often onBegin, onUpdate, onLoop, onComplete and onPause fire while a timeline loops twice, then restarts it.',
  section: 'Timeline',
  tags: ['onBegin', 'onUpdate', 'onLoop', 'onComplete', 'onPause', 'loop', 'loopDelay', 'restart'],
  docs: [
    'pages/animejs-com/documentation/timeline/timeline-callbacks.md',
    'pages/animejs-com/documentation/timeline/timeline-callbacks/onbegin.md',
    'pages/animejs-com/documentation/timeline/timeline-callbacks/onupdate.md',
    'pages/animejs-com/documentation/timeline/timeline-callbacks/onloop.md',
    'pages/animejs-com/documentation/timeline/timeline-callbacks/oncomplete.md',
    'pages/animejs-com/documentation/timeline/timeline-callbacks/onpause.md',
    'pages/animejs-com/documentation/timeline/timeline-methods/restart.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
