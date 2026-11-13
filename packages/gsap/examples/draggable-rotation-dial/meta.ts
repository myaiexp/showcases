// gsap example: Draggable rotation type with min/maxRotation, endRotation and inertia
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Draggable rotation dial',
  summary:
    'A dial you spin with type: "rotation", limited to -135 to 135 degrees with minRotation and maxRotation. On release a marker shows endRotation, the angle an inertia throw (snapped to 30 degrees) will stop at.',
  section: 'Draggable',
  tags: ['Draggable', 'rotation', 'minRotation', 'maxRotation', 'endRotation', 'inertia', 'dial'],
  docs: [
    'pages/gsap-com/docs/v3/Plugins/Draggable/rotation.md',
    'pages/gsap-com/docs/v3/Plugins/Draggable/endRotation.md',
    'pages/gsap-com/docs/v3/Plugins/Draggable/minRotation.md',
    'pages/gsap-com/docs/v3/Plugins/Draggable/maxRotation.md',
    'pages/gsap-com/docs/v3/Plugins/Draggable/deltaX.md',
    'pages/gsap-com/docs/v3/Plugins/Draggable/static-create-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
