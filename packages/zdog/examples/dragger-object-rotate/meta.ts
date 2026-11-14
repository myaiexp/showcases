// Zdog example: a globe turned by a Dragger while its stand stays put
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dragger: rotate objects apart from the scene',
  summary:
    'A desk globe sits in a fixed ring and base. Dragging turns only the globe, and the ring and pin light up for as long as you hold it. A bare Dragger with onDragStart, onDragMove and onDragEnd does the pointer work, so the Illustration itself never rotates.',
  section: 'API: Dragger',
  tags: ['Dragger', 'startElement', 'onDragStart', 'onDragMove', 'onDragEnd', 'Vector'],
  docs: ['repo/modules/docs/api-dragger.hbs', 'repo/modules/docs/api-vector.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
