// cobe example: The Usage snippet, the docs' first globe as written
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The Usage snippet',
  summary:
    "The docs' Usage code as written: a white dotted globe tilted 0.2 radians toward you, blue markers on San Francisco and New York, and a blue arc between them. A requestAnimationFrame loop turns it by raising phi a little each frame.",
  section: 'Usage',
  tags: ['createGlobe', 'update', 'phi', 'theta', 'markers', 'arcs', 'requestAnimationFrame'],
  docs: ['pages/cobe-vercel-app.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
