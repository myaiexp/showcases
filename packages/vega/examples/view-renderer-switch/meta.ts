// vega example: View: Renderer Switch
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'View: Switching Renderers',
  summary:
    'A pulsing row of dots that keeps animating while view.renderer() flips the same live view between canvas and SVG output; in the full view a select makes the switch, and hover keeps working after it.',
  section: 'View API',
  tags: ['view.renderer', 'view.runAsync', 'signal', 'encode.hover'],
  docs: ['repo/docs/docs/api/view.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
