// Zdog example: Hello Zdog, a circle and a square orbiting in 3D
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hello Zdog',
  summary:
    'Two flat shapes, a circle in front and a square behind, become a 3D scene the moment they turn. Zdog draws plain 2D shapes but keeps track of where they sit in space. Drag to look around.',
  section: 'Getting started',
  tags: ['Illustration', 'Ellipse', 'Rect', 'translate', 'dragRotate', 'onDragStart'],
  docs: ['repo/content/index.hbs', 'repo/content/getting-started.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
