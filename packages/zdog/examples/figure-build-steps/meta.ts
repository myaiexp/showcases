// Zdog example: Figure build steps, the modeling tutorial in order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Figure build steps',
  summary:
    'A cheerful little character assembled in eight steps: a ball head, a face, a body, legs, arms, then kicking legs, a leaning spine and swung arms. Each step adds or rotates one thing, which is how most Zdog models are put together. Step through them to see what each part contributes.',
  section: 'Modeling',
  tags: ['Shape', 'Ellipse', 'RoundedRect', 'Anchor', 'copy', 'copyGraph', 'addTo', 'rotate'],
  docs: ['repo/modules/docs/modeling-tutorial.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
