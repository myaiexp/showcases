// cobe example: the context option
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'context: WebGL context attributes',
  summary:
    'Three globes over a striped backdrop. With the default context the stripes show around the globe; with alpha: false the canvas is opaque and the corners go black. The third pane uses antialias: false, which only changes the edges of markers and arcs. In the full view, checkboxes recreate the third globe with new attributes.',
  section: 'Options',
  tags: ['context', 'WebGLContextAttributes', 'antialias', 'alpha', 'destroy()'],
  docs: ['pages/cobe-vercel-app.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
