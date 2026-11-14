// Zdog example: Cylinder bar chart, round bars with a lighter top cap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Cylinder bar chart',
  summary:
    'A 3D bar chart of five round bars that grow to new values. Each bar is a Cylinder set by its diameter and length, with a lighter colour on its top cap through frontFace and the body colour on the other end. Press new data to make the bars move.',
  section: 'Shapes',
  tags: ['Cylinder', 'diameter', 'length', 'frontFace', 'backface', 'rotate'],
  docs: ['repo/modules/docs/shapes-composite.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
