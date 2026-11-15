// cobe example: README Quick Start, every option the README lists
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'README Quick Start',
  summary:
    "The README's Quick Start options on a grey globe: a small pink marker on San Francisco, a large red one on New York, and a salmon arc between them, raised 0.02 off the surface. The README spins it with onRender, which version 2 dropped, so the same step runs in a frame loop through update().",
  section: 'Usage',
  tags: ['createGlobe', 'update', 'onRender', 'markers', 'arcs', 'markerElevation', 'color'],
  docs: ['repo/README.md', 'pages/cobe-vercel-app.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
