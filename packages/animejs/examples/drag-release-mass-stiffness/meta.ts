// Draggable example: releaseMass and releaseStiffness shape the physics of the release
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Draggable releaseMass and releaseStiffness',
  summary: 'Four squares are flicked identically and released with a very light mass, a heavy mass, a soft stiffness and a stiff stiffness. They differ in how fast and how far they travel after release.',
  section: 'Draggable',
  tags: ['createDraggable', 'releaseMass', 'releaseStiffness', 'reset'],
  docs: [
    'pages/animejs-com/documentation/draggable/draggable-settings.md',
    'pages/animejs-com/documentation/draggable/draggable-settings/releasemass.md',
    'pages/animejs-com/documentation/draggable/draggable-settings/releasestiffness.md',
    'pages/animejs-com/documentation/draggable/draggable-methods/reset.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
