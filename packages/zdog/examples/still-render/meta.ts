// Zdog example: Still render, one drawing with no animation loop
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Still render',
  summary:
    'A coffee mug drawn once, like an icon, with no animation loop at all. Zdog only draws when you call updateRenderGraph(), so each press of the button turns the mug and draws one fresh snapshot.',
  section: 'Getting started',
  tags: ['Illustration', 'updateRenderGraph', 'Cylinder', 'Ellipse', 'Shape', 'rotate'],
  docs: ['repo/content/getting-started.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
