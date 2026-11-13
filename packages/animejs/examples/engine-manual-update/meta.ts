// Engine example: driving engine.update() from your own loop
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Engine manual update with your own loop',
  summary: 'In the full view the example sets engine.useDefaultMainLoop to false and calls engine.update() from its own requestAnimationFrame loop. Switch the loop between every frame, every 20th frame and stopped, or call update() by hand, and watch the dots follow. The card is a passive picture so it never touches the shared engine; the example restores the setting when you leave.',
  section: 'Engine',
  tags: ['engine', 'update', 'useDefaultMainLoop', 'requestAnimationFrame'],
  docs: [
    'pages/animejs-com/documentation/engine/engine-methods/update.md',
    'pages/animejs-com/documentation/engine/engine-methods.md',
    'pages/animejs-com/documentation/engine/engine-parameters.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
