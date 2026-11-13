// Adapters example: a custom adapter animating a plain class through getters and setters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom adapter: registerTargetAdapter and a property resolver',
  summary: 'An equalizer class with only getter and setter methods is animated like a DOM element: registerProperty() exposes "hue", and a registerPropertyResolver() maps any bar_N name to bar N. A canvas redraws the bars from the animated values.',
  section: 'Adapters',
  tags: ['adapter', 'registerAdapter', 'registerTargetAdapter', 'registerProperty', 'registerPropertyResolver', 'canvas'],
  docs: [
    'pages/animejs-com/documentation/adapters.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
