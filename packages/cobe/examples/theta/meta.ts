// cobe example: theta: vertical tilt
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "theta: vertical tilt",
  summary:
    "The globe nods from showing its south pole to showing its north pole while it keeps turning. Theta is the vertical tilt in radians, from -π/2 to π/2; the caption shows the current value.",
  section: 'Options',
  tags: ['theta', 'update()'],
  docs: ['pages/cobe-vercel-app.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
