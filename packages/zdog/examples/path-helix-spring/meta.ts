// Zdog example: Helix spring, a coil built from path points with z
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Helix spring',
  summary:
    'A weight hanging from a coil spring. The coil is one Shape whose path has a hundred points, each given an x, y and z from a bit of trigonometry, so the line winds around an invisible pole. Change the length, coil count and radius.',
  section: 'Shapes',
  tags: ['Shape', 'path', 'closed', 'stroke', 'z'],
  docs: ['repo/modules/docs/shapes-shape.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
